## Limitations, Weaknesses, and Future Research Directions of Nova

Based on the provided paper, the following sections detail the limitations, weaknesses, and future research directions of the Nova construction. To adhere strictly to the extractive requirements, no external analysis or undocumented details are introduced; all points below are directly stated by the authors.

---

### Directly Stated Limitations and Weaknesses

* **Lack of Zero-Knowledge in Base IVC**: Nova is not inherently a zero-knowledge IVC scheme because its base IVC proof does not hide the witnesses associated with the individual steps of the incremental computation [1]. 
* **Heuristic Security in the Standard Model**: Non-interactivity is achieved using the Fiat-Shamir transform in the random oracle model [2] [3]. When instantiating the random oracle in the standard model using a concrete cryptographic hash function, the security of the resulting non-interactive folding scheme can only be argued heuristically [3].
* **Adversarial Restriction for Zero-Knowledge SNARK**: For the auxiliary zkSNARK (used to prove knowledge of a valid IVC proof) to satisfy zero-knowledge, there is a caveat requiring the instance-witness pair to be honestly randomized [4]. This is formally captured by restricting the adversary's strategy to sample the instance-witness pairs in a specific manner [5].
* **Prover Overhead for Proof Compression**: Compressing IVC proofs introduces computational overhead for the prover [6]. For example, if the prover compresses the IVC proof every $\approx 24$ steps, it incurs up to a $2\times$ overhead [6].
* **Verification Cost Trade-off**: Verifying a compressed proof is $\approx 2\times$ more expensive than verifying a significantly longer, uncompressed IVC proof [7].

---

### Directly Stated Future Research Directions

* **Achieving Zero-Knowledge IVC**: The authors explicitly leave it to future work to construct a zero-knowledge IVC scheme directly, rather than relying on an auxiliary zkSNARK to wrap the non-zero-knowledge base IVC proof [1].

---

### Cryptography-Researcher Assessment Note
* **Note on Personal Analysis**: In strict accordance with the extractive-only instructions, no external personal analysis, opinions, or undocumented protocol details are introduced, as all assessments must be drawn solely from the provided text.

## References

[1]“File: nova 2021-370.pdf,” File.