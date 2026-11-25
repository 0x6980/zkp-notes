
## Limitations, Caveats, and Open Problems in HyperNova

### Open Problems and Limitations of CCS and Folding Schemes
* **Committing to Sparse CCS Matrices:** A major open problem in the context of incrementally verifiable computation (IVC) and proof-carrying data (PCD) is the ability to efficiently fold commitments to sparse CCS matrices [1]. Existing sparse polynomial commitments do not provide homomorphic commitments, or they require impractical quadratic-sized parameters [1].
* **High-Degree Constraints Overhead:** In prior folding schemes like Sangria, adapting to Plonkish constraints causes the number of cross-terms that the prover must commit to to increase linearly with the constraint degree $d$ [2]. This forces the prover to incur $O(n \cdot d)$ cryptographic operations to commit to $O(d)$ cross-terms, negating the benefits of high-degree constraints over R1CS [2].
* **Exponential Degree Blow-up in Alternative Folding Schemes:** In Protostar, extending the folding procedure to fold $k > 2$ instances at once causes the degree of the involved polynomial to blow up exponentially in $k$ [3].

---

### Zero-Knowledge Approach Limitations and Caveats
* **Lack of Blinding Property in Committed CCS:** The folding scheme for committed CCS, as presented, is not natively a blinding folding scheme because the interaction may reveal information about the witness [4]. To achieve zero-knowledge, a stronger property is required where the transcript and output can be simulated as long as one of the inputs is random [4].
* **Honest-Verifier Zero-Knowledge Constraint:** The zero-knowledge argument constructed in the paper (Construction 6) is proven under the honest-verifier zero-knowledge model [5].

---

### Cycle Construction and Field Emulation Caveats
* **Expensive Non-Native Field Emulation:** If traditional cycle-of-curves approaches are applied to HyperNova, the verifier circuit on the scalar field of $E_2$ must verify a sum-check proof produced on the scalar field of $E_1$ [6]. This requires representing operations of $E_1$ inside $E_2$, which demands concretely expensive field emulation (e.g., thousands of constraints for each field multiplication) [6].
* **Infeasibility of "Half"-Pairing Cycles:** When using a "half"-pairing cycle (such as BN254 and Grumpkin), the IVC proof over $E_2$ must be verified with a circuit $C$ defined over $E_1$ and then proven with a SNARK over $E_1$ [7]. This circuit $C$ requires more than $70 \cdot 10^6$ gates, making it far too expensive to prove in practice [7].

---

### Explicit Technical Assumptions
* **Non-Interactivity in the Plain Model (Assumption 1):** The paper explicitly assumes the existence of a non-interactive multi-folding scheme for $(R_{LCCCS}, R_{CCS}, \text{compat}, \mu, \nu)$ in the plain model [8].
* **Non-Interactivity for Cycle-Compatible Folding (Assumption 2):** The cycle-of-curves construction relies on the assumption that there exists a non-interactive multi-folding scheme for $(R_{LCCCS} \times R_{CRRICS}, R_{CCS}, 1, 1)$ in the plain model [9].