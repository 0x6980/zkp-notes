# 8. The FRI Protocol (Interactive Version)

In the previous chapters, we developed the mathematical tools behind FRI:

* Reed–Solomon codes and RS proximity
* The structure of the evaluation domain
* The algebraic mechanism of **folding**

Now we put everything together and describe the **FRI protocol itself**.

---

## Goal of the Protocol

Given oracle access to a function $f_0 : D_0 \to \mathbb{F_q}$, the goal is to verify:

> $f_0$ is close to a low-degree polynomial (i.e., close to a Reed–Solomon codeword)

while using only a **small number of queries**.

---

## High-Level Idea

Instead of checking low-degree directly on a large domain, we:

1. Repeatedly apply **folding**
2. Reduce both:

   * the **domain size**
   * the **degree bound**
3. Continue until the domain becomes very small
4. Check the final function directly

---

## Notation

* $f_0$: initial function
* $D_0$: initial domain
* $d_0$: initial degree bound

At round $i$:

* $f_i : D_i \to \mathbb{F_q}$
* $|D_{i+1}| = \frac{1}{2} |D_i|$
* $d_{i+1} \approx \frac{1}{2} d_i$

---

## One Round of FRI

At round $i$, the verifier and prover perform:

### 1. Verifier sends a random challenge

The verifier samples a random value:

$$
\alpha_i \in \mathbb{F_q}
$$

---

### 2. Prover applies folding

The prover defines a new function:

$$
\boxed{
f_{i+1}(x^2)
=
\frac{f_i(x)+f_i(-x)}2
+
\alpha_i
\frac{f_i(x)-f_i(-x)}{2x}.
}
$$

This reduces:

* domain size by half
* effective degree by half

---

### 3. Domain is reduced

The new domain $D_{i+1}$ is derived from $D_{i}$, typically by pairing points $x$ and $-x$.

$$
D_{i+1} = \{x^2\space;\space x\in D_i\}
$$

---

## Recursive Structure

This process repeats for $r$ rounds:

$$
f_0 \rightarrow f_1 \rightarrow f_2 \rightarrow \cdots \rightarrow f_r
$$

where:

* \(|D_r|\) is very small
* \(d_r\) is very small

---

## Final Check

At the last round:

* The prover sends the full evaluation of $f_r$
* The verifier checks directly that:

> $f_r$ is a polynomial of degree $\le d_r$

Since the domain is small, this check is efficient.

---

## Query Phase (Consistency Checks)

To ensure correctness across rounds, the verifier performs **consistency checks**:

1. Sample a random index $x \in D_{i+1}$

2. Query:

   * $f_i(x)$
   * $f_i(-x)$
   * $f_{i+1}(x^2)$

3. Check that:

$$
f_{i+1}(x^2)
=
\frac{f_i(x)+f_i(-x)}2
+
\alpha_i
\frac{f_i(x)-f_i(-x)}{2x}
$$

This ensures that folding was done correctly.

---

## Complete Protocol (Summary)

For $i = 0$ to $r-1$:

1. Verifier samples random $\alpha_i$
2. Prover computes $f_{i+1}$ via folding
3. Verifier performs a small number of consistency queries

At the end:

4. Prover sends full $f_r$
5. Verifier checks low-degree directly

---

## Important Note

This version of the protocol is **interactive and assumes oracle access** to all functions $f_i$.

However, it has a major weakness:

> The prover is not yet forced to commit to the functions $f_i$

This means the prover could potentially **change answers adaptively**.

---

## Transition to the Next Chapter

To fix this issue, we need a mechanism that:

* Forces the prover to commit to each function
* Prevents changing values after queries
* Still allows efficient verification

This leads us to the next topic:

> **Commitment schemes and their role in FRI**

In particular, we will use Merkle trees to turn this interactive protocol into a **sound and non-interactive proof system**.
