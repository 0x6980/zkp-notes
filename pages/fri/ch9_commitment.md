# 9. Commitment Schemes in FRI

In the previous chapter, we described the interactive version of the FRI protocol. While it captures the core idea of recursive folding and low-degree testing, it suffers from a critical weakness:

> The prover is not bound to a single function and can change answers adaptively.

In this chapter, we introduce **commitment schemes** as the tool that resolves this issue.

---

## The Problem: Adaptive Prover

Recall that in the interactive FRI protocol:

* The verifier queries values of $f_i$ at random points
* These queries are chosen *after* the protocol begins

Without any restriction, a dishonest prover can:

* Answer each query independently
* Return values that locally satisfy the checks
* But do not correspond to any global low-degree function

This breaks the **soundness** of the protocol.

---

## What Is a Commitment Scheme?

A **commitment scheme** is a cryptographic primitive that allows a prover to:

1. **Commit** to a value (or dataset)
2. Later **reveal** parts of it
3. While being unable to change the committed data

A commitment scheme typically satisfies:

### 1. Binding

Once the prover commits to a value, it cannot change it later.

### 2. (Optional) Hiding

The commitment does not reveal the underlying data.

> In FRI, the **binding property** is essential.

---

## Why FRI Needs Commitments

In FRI, the prover works with multiple functions:

$$
f_0, f_1, f_2, \dots, f_r
$$

To ensure soundness, we need:

* Each $f_i$ to be **fixed before queries are made**
* All answers to queries to be **consistent with that fixed function**

Without commitments:

* The prover could simulate a valid-looking transcript
* Without ever constructing a valid low-degree function

---

## Commitment in the FRI Protocol

We modify the protocol as follows:

At each round $i$:

1. The prover computes the full evaluation vector of $f_i$ over $D_i$
2. The prover **commits** to this vector
3. The verifier receives only the commitment

Later:

When the verifier queries a point, the prover must return all values required to check the folding relation. In particular, for a query point $x\in D_i$, the prover returns:

  * The value $f_i(x)$
  * The value $f_i(-x)$
  * The value $f_{i+1}(x^2)$
  * The corresponding proofs for each value

---

## Requirements for the Commitment Scheme

To be useful in FRI, the commitment scheme must:

### 1. Support Large Data

* The function $f_i$ may have millions of evaluations
* The commitment must be compact

### 2. Allow Efficient Openings

* The prover should be able to reveal individual values efficiently
* The verifier should check them quickly

### 3. Be Binding

* It must be computationally infeasible to open the commitment in two different ways

---

## What We Gain

By adding commitments:

* The prover is forced to **fix all functions $f_i$ in advance**
* Queries now test a **single consistent object**
* Adaptive cheating is prevented

This restores the **soundness** of the FRI protocol.

---

## Transition to the Next Chapter

We now need a concrete commitment scheme that satisfies all these properties.

The most widely used solution in FRI-based systems is:

> Merkle tree

In the next chapter, we will see:

* How Merkle trees are used to commit to function evaluations
* How queries are answered using authentication paths
* Why this approach is both efficient and secure
