## Complexity, Efficiency, and Limitations of Nova

### Complexity and Efficiency Characteristics

* **Folding Scheme (Relaxed R1CS):**
  * **Prover Complexity:** $O_\lambda(N)$ where $N$ is the size of the relaxed R1CS instances [1].
  * **Verifier Complexity:** $O_\lambda(1)$ [1].
  * **Communication Complexity:** $O_\lambda(1)$ [1].
  * **Round Complexity:** Constant-round [1].

* **Incrementally Verifiable Computation (IVC):**
  * **Prover Complexity:** Dominated by two multiexponentiations of size $\approx |F|$ at each step [2].
  * **Verifier Complexity:** $O_\lambda(|F|)$ [2].
  * **Proof Length:** $O(|F|)$ group elements [2], which can be compressed to $O_\lambda(\log |F|)$ using a succinct zero-knowledge proof [3].

* **zkSNARK for Committed Relaxed R1CS:**
  * **Using $\text{PC}_{\text{BP}}$ (Pedersen-based):** Prover runs in $O_\lambda(n)$ time, verifier runs in $O_\lambda(n)$ time, and proof length is $O_\lambda(\log n)$ [4].
  * **Using $\text{PC}_{\text{Dory}}$:** Prover runs in $O_\lambda(n)$ time, verifier runs in $O_\lambda(n)$ time, and proof length is $O_\lambda(\log n)$ [5].
  * **Optimized Variant (Corollary 2):** Prover runs in $O(n) + O_\lambda(m)$ time, verifier runs in $n + O_\lambda(m)$ time, and proof length is $O_\lambda(\log m)$ [6].

* **Dependence on Parameters:**
  * **Field Size:** The finite field $\mathbb{F}$ depends on the security parameter $\lambda$ such that $|\mathbb{F}| = 2^{\Theta(\lambda)}$ [7].
  * **Matrix Dimensions and Sparsity:** $m$ denotes the dimensions of the R1CS matrices, and $n$ denotes the number of non-zero entries (sparsity) [4] [6].
  * **Security Parameter:** Denoted by $\lambda$, which governs the size of commitments and cryptographic operations [1] [7].

---

### Limitations, Caveats, and Open Problems

* **Lack of Zero-Knowledge in Base IVC:** Nova is not inherently a zero-knowledge IVC scheme because its base IVC proofs do not hide the witnesses associated with the steps of the incremental computation [8].
* **Open Problem (Zero-Knowledge IVC):** The authors explicitly leave achieving a true zero-knowledge IVC scheme (without relying on an auxiliary zkSNARK wrapper) to future work [9].
* **Honest Randomization Caveat:** For the zero-knowledge property of the zkSNARK of a valid IVC proof to hold, there is a caveat that the proof $\Pi$ must be honestly randomized [10].

## References

[1]“File: nova 2021-370.pdf,” File.