# 12. Complexity Analysis of FRI

In the previous chapters, we constructed the full non-interactive FRI protocol using:

* Folding to reduce problem size
* Merkle trees for commitments
* The Fiat–Shamir heuristic to remove interaction

We now analyze the **efficiency** of the protocol.

---

## Parameters

Let:

* $n = |D_0|$: initial domain size
* $d$: initial degree bound
* $r$: number of folding rounds
* $q$: number of queries

Since each round halves the domain:

$$
|D_i| = \frac{n}{2^i}
$$

We typically choose $r \approx \log_2 n$, so that:

$$
|D_r| \approx 1
$$

---

## Proof Size

The proof consists of:

### 1. Merkle Roots

* One root per round
* Total: $r = O(\log n)$ hashes

---

### 2. Query Answers

For each of the $q$ queries:

* At each round $i$, we provide:

  * A constant number of field elements
  * A Merkle proof of size $O(\log |D_i|)$

Total size per query:

$$
\sum_{i=0}^{r-1} O(\log |D_i|) = O(\log n + \log (n/2) + \cdots) = O(\log^2 n)
$$

So total query contribution:

$$
O(q \log^2 n)
$$

---

### 3. Final Polynomial

* The full table of $f_r$, which is very small
* Typically negligible

---

### Total Proof Size

$$
O(\log n) + O(q \log^2 n) = O(q \log^2 n)
$$

---

## Verifier Complexity

The verifier performs:

### 1. Hash Computations

* For each Merkle proof: $O(\log n)$ work
* Total: $O(q \log^2 n)$

---

### 2. Field Operations

* Constant work per query per round
* Total: $O(q \log n)$

---

### 3. Final Check

* Polynomial check on a very small domain
* Negligible cost

---

### Total Verifier Time

$$
O(q \log^2 n)
$$

This is **sublinear in $n$**, which is the key goal.

---

## Prover Complexity

The prover does significantly more work:

### 1. Function Evaluations

* Computes all $f_i$
* Total work across rounds:

  $$
  n + \frac{n}{2} + \frac{n}{4} + \cdots = O(n)
  $$

---

### 2. Merkle Tree Construction

* Each round builds a tree over $|D_i|$ elements
* Total:

  $$
  O(n)
  $$

---

### 3. Query Responses

* Extract values and generate Merkle proofs
* Total: $O(q \log n)$

---

### Total Prover Time

$$
O(n)
$$

---

## Query Complexity and Soundness

The number of queries $q$ controls soundness:

* Larger $q$ → lower soundness error
* Typically:

  $$
  q = O(\log n)
  $$

This gives **negligible probability of accepting an invalid proof**.

---

## Summary of Complexities

| Component     | Complexity        |
| ------------- | ----------------- |
| Proof Size    | $O(q \log^2 n)$   |
| Verifier Time | $O(q \log^2 n)$   |
| Prover Time   | $O(n)$            |
| Queries       | $q = O(\log n)$   |

---

## Key Insight

FRI achieves:

* **Linear-time prover**
* **Sublinear verifier**
* **Polylogarithmic proof size**

This makes it highly suitable for scalable proof systems like STARKs.

---

## Transition to the Final Chapter

We now understand how FRI works and how efficient it is.

The final piece is understanding **why it is secure**.

In the next chapter, we will explore:

> The **soundness intuition** of FRI — why a function that is far from low-degree is detected with high probability.

This will complete the full picture of the protocol.
