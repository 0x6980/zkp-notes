## Limitations, Caveats, and Open Problems in ProtoStar

### Cryptographic Assumptions & Security Reductions
* **Standard Model Gap**: A primary theoretical limitation is that the core IVC transformation requires a NARK and an accumulation scheme in the standard model, which remains an open problem to construct [1]. 
* **Heuristic Security**: To instantiate the system practically, the random oracle must be heuristically replaced with a cryptographic hash function, assuming that the resulting schemes preserve knowledge soundness [2].
* **Underlying Assumptions**: The constructions rely on the discrete logarithm assumption in the random oracle model [3].

---

### Field & Curve Requirements
* **Field Characteristic Constraint**: For the lookup relation, the field $\mathbb{F}$ must have a characteristic $p$ strictly greater than the maximum of the number of lookups $\ell$ and the table size $T$ ($p > \max(\ell, T)$) [4].

---

### Lookup Completeness & Sparseness Issues
* **Completeness Caveat**: The basic lookup protocol does not naturally possess perfect completeness; if $w_i + r = 0$ or $t_i + r = 0$, the prover message becomes undefined [5]. 
* **Verifier Degree Trade-off**: To achieve perfect completeness, additional checks must be introduced, which increases the verifier degree to 3 [6]. Without these checks, there is a negligible completeness error of $(\ell + T)/|\mathbb{F}|$ [6].
* **Accumulator Sparseness**: There is no guarantee that the accumulated lookup vectors ($acc.g$ and $acc.m$) remain sparse, which presents an issue when the prover computes the error term $e_1$ [7].
* **Unresolved Integration**: The algorithm designed for computing cross-error commitments for sparse witnesses is not fully compatible with the verification check compression technique (the CV trick) described in Section 3.5; integrating these two remains an open problem [8].

---

### System Comparisons & Trade-offs

| System | Key Advantages | Limitations & Trade-offs |
| :--- | :--- | :--- |
| **ProtoStar** | Supports high-degree gates, non-uniformity, and vector-valued lookups [9] [10]. | Recursive circuit is dominated by 3 group scalar multiplications (compared to 1G in HyperNova) [9] [10]. |
| **HyperNova** | Recursive circuit is dominated by only 1 group scalar multiplication [10] [1]. | Does not natively support non-uniform circuits, lacks vector-valued lookups, and has more expensive lookup costs [11] [10] [1]. |
| **SuperNova** | Supports non-uniformity natively [10]. | Restricted to R1CS (degree 2) and does not natively support high-degree gates or lookups [10]. |

* **High-Degree Gate Scaling**: In older systems like Sangria, increasing the gate degree $d$ causes the number of group operations to grow by a factor of $d$, canceling out the benefits of high-degree gates [12]. ProtoStar mitigates this by keeping the recursive circuit dominated by 3 group scalar multiplications and $O(\ell_{in} + d)$ field/hash operations [9].
* **Lookup Integration**: Unlike ProtoStar, HyperNova does not explicitly explain how to integrate lookups to Plonk/CCS in its IVC scheme or provide explicit constructions for non-uniform computations [11].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.