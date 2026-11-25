## ProtoStar Research Summary

This summary outlines the core components, contributions, and technical specifications of ProtoStar, a generic efficient accumulation/folding scheme for special-sound protocols.

### Research Summary Table

| Dimension | Summary | Citations |
| :--- | :--- | :--- |
| **Problem** | Building efficient incrementally verifiable computation (IVC) schemes without recursive SNARKs for special-sound protocols with degree-$d$ verifiers. | [1] |
| **Motivation** | Enabling high-performance applications like Ethereum's Verifiable Delay Functions (VDFs) and Zero-Knowledge Ethereum Virtual Machines (ZK-EVMs). | [2] |
| **Prior Limitations** | Fixed R1CS matrices limit flexibility in non-uniform VM execution; existing high-degree folding schemes scale poorly or lack security proofs. | [3] |
| **Contributions** | A generic compiler for $(2k-1)$-move special-sound protocols and PROTOSTAR, a non-uniform IVC scheme for Plonk. | [4] [5] |
| **Cryptographic Assumptions** | Discrete logarithm assumption in the random oracle model; no trusted setup, pairings, or FFTs required. | [6] |
| **Security Definitions** | Adaptive knowledge-soundness for the compiled NARK and accumulation scheme completeness/soundness. | [7] |
| **Protocol Construction** | Message compression via homomorphic commitments, Fiat-Shamir transformation, and linear combination accumulation. | [8] |
| **Accumulation Mechanism** | Folds witnesses and instances via random linear combinations, generating $d$ error-correcting terms. | [9] |
| **IVC Compiler** | Utilizes the BCLMS21 compiler to transform the accumulation scheme into a secure IVC scheme. | [10] |
| **Recursion** | Dominated by 3 group scalar multiplications and a hash of $d^*$ field elements. | [11] |
| **Supported Relations** | Plonkup relations (permutation, high-degree custom gate, lookup) and Customizable Constraint Systems (CCS). | [5] |
| **High-Degree Gates** | Supports Plonk-like constraint systems with degree-$d$ gates without additional cost for lower-degree gates. | [12] |
| **Lookups** | Supports lookup gates in precomputed tables independent of table size by committing to vectors of length $\ell_{lk}$. | [13] |
| **Complexity** | Prover complexity is logarithmic in the number of supported circuits and independent of lookup table size. | [14] |
| **Proof Size** | Independent of table size, scaling with the sum of message lengths and $O(\sqrt{\ell})$ for compressed verification. | [14] [15] |
| **Limitations** | The Plonkup relation still requires a permutation argument and copy-constraints. | [16] |
| **Open Problems** | Constructing NARK and accumulation schemes in the standard model (without random oracles). | [17] |
| **Future Directions** | Integrating the sparse witness accumulation algorithm with the compressed verification (CV) trick. | [18] |

---

### Detailed Technical Analysis

* **Problem & Motivation**: Traditional IVC schemes struggle with non-uniform computations where different steps execute different circuits [3]. This is highly relevant for ZK-EVMs, where each VM opcode is represented by a distinct circuit [3]. ProtoStar addresses this by providing a generic folding scheme for any $(2k-1)$-move special-sound protocol [1].
* **Prior Limitations**: Prior R1CS-based accumulation schemes require a fixed circuit structure across all steps [3]. Other high-degree gate folding schemes like Sangria suffer from group operations that scale linearly with the gate degree $d$, canceling out the benefits of high-degree gates [4].
* **Protocol & Accumulation Mechanism**: ProtoStar compresses prover messages using homomorphic commitments [8]. During accumulation, two instances are folded using a random challenge $\alpha$, producing $d$ error-correcting terms to absorb the cross-term "noise" [9]. The recursive verifier's overhead is minimized to 3 group scalar multiplications and a hash of $d^*$ elements [11].
* **Lookups & Complexity**: ProtoStar supports lookups independent of the table size $T$ [13]. The prover only commits to vectors of length $\ell_{lk}$ (the number of lookups) [13], making the step complexity independent of the table size [14].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.