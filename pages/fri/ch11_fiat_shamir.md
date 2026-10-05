# 11. Non-Interactive FRI via Fiat–Shamir

So far, the FRI protocol is **interactive**:

* The verifier sends random challenges $\alpha_i$
* The prover responds with folded functions and query answers

However, in many real-world applications (e.g., blockchains and verifiable computation), interaction is impractical.

In this chapter, we show how to eliminate interaction using the **Fiat–Shamir transformation**, turning FRI into a **non-interactive proof**.

---

## The Problem with Interaction

In the interactive version:

* The verifier must be online
* Multiple rounds of communication are required
* This is inefficient and sometimes impossible in practice

We want:

> A single message from the prover that can be verified offline

---

## The Fiat–Shamir Transformation

The Fiat–Shamir heuristic replaces verifier randomness with deterministic values derived from hashing the protocol transcript.

### Core Idea

Instead of the verifier choosing random challenges:

$$
\alpha_i \leftarrow \text{Verifier randomness}
$$

we compute:

$$
\alpha_i = H(\text{transcript so far})
$$

where $H$ is a cryptographic hash function.

---

## What Is the Transcript?

The **transcript** includes all data exchanged so far, such as:

* Merkle roots $\text{root}_0, \text{root}_1, \dots$
* Previous challenges $\alpha_0, \alpha_1, \dots$

At round $i$, we compute:

$$
\alpha_i = H(\text{root}_0 \,\|\, \text{root}_1 \,\|\, \cdots \,\|\, \text{root}_i)
$$

---

## Non-Interactive FRI Protocol

The prover simulates the entire interaction:

### Step 1: Commit Phase

For each round $i$:

1. Compute $f_i$
2. Build a Merkle tree on evaluation of $f_i$ over $D_i$
3. Output $\text{root}_i$
4. Derive challenge:

   $$
   \alpha_i = H(\text{transcript so far})
   $$

---

### Step 2: Query Phase

After all rounds:

1. Derive random query indices using the transcript:

   $$
   x_1, x_2, \dots = H(\text{final transcript})
   $$

2. For each query:

   * Provide values $f_i(x)$ across rounds
   * Provide corresponding Merkle proofs

---

### Step 3: Final Polynomial Check

* Prover sends full $f_r$
* Verifier checks that it has degree $\le d_r$

---

## Verifier Algorithm

Given the proof, the verifier:

1. Recomputes all challenges $\alpha_i$ from the transcript
2. Verifies all Merkle proofs
3. Checks folding consistency:

   $$
   f_{i+1}(x^2)
   =
   \frac{f_i(x)+f_i(-x)}2
   +
   \alpha_i
   \frac{f_i(x)-f_i(-x)}{2x}.
   $$
4. Checks the final low-degree condition

---

## Why This Works

The security intuition is:

* The prover must commit to all data **before knowing the challenges**
* Challenges are unpredictable due to hashing
* The prover cannot adaptively cheat

This relies on modeling the hash function as a **random oracle**.

---

## What We Achieve

By applying Fiat–Shamir:

* Interaction is removed
* The protocol becomes a **single proof string**
* Verification can be done offline

This is essential for systems like STARKs.

---

## Transition to the Next Chapter

Now that we have a complete non-interactive protocol, the next step is to analyze its efficiency.

In the next chapter, we will study:

* Proof size
* Query complexity
* Verifier running time
* Prover overhead

This will give us a full picture of the practicality of FRI.
