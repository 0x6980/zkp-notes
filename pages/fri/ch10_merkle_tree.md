# 10. Merkle Trees in FRI

In the previous chapter, we introduced commitment schemes and explained why they are necessary for the soundness of the FRI protocol. We now present a concrete and efficient realization of such a scheme using a Merkle tree.

---

## Overview

A Merkle tree is a hash-based data structure that allows us to:

* Commit to a large dataset using a single short value (the **root**)
* Efficiently prove the value of any specific entry
* Ensure that the data cannot be modified after commitment

In FRI, we use Merkle trees to commit to the evaluation tables of functions:

$$
f_0, f_1, f_2, \dots, f_r
$$

---

## Building the Merkle Tree

At round $i$, the prover:

1. Evaluates $f_i$ over the domain $D_i$, producing a list:

   $$
   (f_i(x))_{x \in D_i}
   $$

2. Places these values as the **leaves** of a binary tree

3. Computes internal nodes using a hash function:

   $$
   \text{parent} = H(\text{left child} \,\|\, \text{right child})
   $$

4. Continues until reaching a single value: the **Merkle root**

---

## Commitment Phase

Instead of sending the full table of $f_i$, the prover sends only:

$$
\text{root}_i = \text{MerkleRoot}(f_i)
$$

This root serves as a **binding commitment** to all values of $f_i$.

---

## Query and Opening Phase

When the verifier queries a point $x \in D_i$, the prover must provide:

1. The value $f_i(x)$
2. The value $f_i(-x)$
3. The value $f_{i+1}(x^2)$
4. A **Merkle proof (authentication path)** for each value

### Authentication Path

This consists of:

* The sibling hashes along the path from the leaf to the root

The verifier:

1. Recomputes the hashes up the tree
2. Checks that the resulting root matches $\text{root}_i$

If it matches, the verifier is convinced that:

> The value $f_i(x)$ is consistent with the committed function

---

## Integration into FRI

We now refine the protocol:

For each round $i$:

1. Prover computes $f_i$ using folding formula

2. Prover builds a Merkle tree on all evaluations of $f_i$ over $D_i$, and sends $\text{root}_i$

3. Verifier samples random queries

4. Prover answers queries with:

   * Function values
   * Merkle proofs

5. Verifier checks:

   * Folding consistency
   * Validity of Merkle proofs

---

## Why Merkle Trees Work Well in FRI

Merkle trees satisfy all required properties:

### 1. Compact Commitment

* The root is a single hash value
* Independent of the size of $D_i$

### 2. Efficient Queries

* Each proof has size $O(\log |D_i|)$
* Verification is fast

### 3. Strong Binding

* It is computationally infeasible to change any leaf without changing the root

---

## What We Achieve

By combining FRI with Merkle commitments:

* The prover is bound to a fixed function at each round
* All queries are consistent with that function
* The verifier only reads a **small number of values**

This transforms FRI into a **sound and efficient proof protocol**.

---

## Transition to the Next Chapter

So far, the protocol is still interactive:

* The verifier sends random challenges
* The prover responds

To make the protocol non-interactive, we remove this interaction using:

> The **Fiat–Shamir transformation**

In the next chapter, we will show how to:

* Replace verifier randomness with hash-derived challenges
* Turn FRI into a non-interactive proof suitable for real-world systems
