## Mathematical Protocol Construction in ProtoStar

---

### 1. Generic Accumulation Scheme for $(2k-1)$-Move Special-Sound Protocols

* **Protocol Parameters**: A $(2k-1)$-move special-sound protocol $\Pi_{sps}$ is defined by parameters $k$ (number of prover messages), $d$ (verifier algebraic degree), and $\ell$ (number of verifier equations) [1].
* **Accumulator Format**: The accumulator instance is represented as $acc.x := \{pi, [C_i]_{i=1}^k, [r_i]_{i=1}^{k-1}, E, \mu\}$, where $pi$ is the accumulated public input, $[C_i]$ are commitments to the prover messages, $[r_i]$ are the verifier challenges, $E$ is the commitment to the error terms, and $\mu$ is a slack variable [2]. The corresponding witness is $acc.w := \{[m_i]_{i=1}^k\}$ [2].
* **Accumulation Predicate**: The accumulated relation is a relaxed version of the verifier check [3]:
  $$\sum_{j=0}^d \mu^{d-j} \cdot f_j^{V_{sps}}(pi, \pi.x, \pi.w, [r_i]_{i=1}^{k-1}) = e$$

---

### 2. Verifier Equations and Error Terms

* **Error Term Computation**: During accumulation, the prover computes the cross-error terms $e_j$ by expanding the polynomial with a challenge $X$ [4]:
  $$\sum_{j=0}^d (X + \mu)^{d-j} \cdot f_j^{V_{sps}}(X \cdot pi + pi', [X \cdot m_i + m_i']_{i=1}^k, [X \cdot r_i + r_i']_{i=1}^{k-1}) = e + \sum_{j=1}^{d-1} e_j X^j$$\ 
* **Verifier Check**: The verifier checks the homomorphic combination of the error commitments using the random challenge $\alpha$ [5]:
  $$acc'.x.E = acc.x.E + \sum_{j=1}^{d-1} \alpha^j \cdot E_j$$

---

### 3. Cross-Error Commitments & High-Degree Verifier Compression

* **Sparse Witnesses**: When the witness is sparse ($m \ll |\pi.w|$), the cross-error commitments can be computed more efficiently without evaluating the full polynomial from scratch [6].
* **High-Degree Verifier Compression**: To avoid committing to $d-1$ error vectors when $d$ is high, ProtoStar compresses the $\ell$ degree-$d$ equations into a single degree-$(d+2)$ equation using a random challenge $\beta$ [7]. This reduces the verifier's work at the cost of checking $2\sqrt{\ell}$ degree-2 equations [7].
* **Compressed Verifier Equation**: The compressed verifier check is defined as [8]:
  $$V'_{sps}(pi, [m_i]_{i=1}^{k+1}, ([r_i]_{i=1}^{k-1}, \beta)) := \sum_{i=0}^{\sqrt{\ell}-1} \sum_{j=0}^{\sqrt{\ell}-1} \beta_i \cdot \beta'_j \cdot V_{sps, i+j\sqrt{\ell}}(pi, [m_i]_{i=1}^k, [r_i]_{i=1}^{k-1})$$

---

### 4. Instantiations

* **Lookups**: Instantiated via the special-sound protocol $\Pi_{LK}$ for the lookup relation $\mathcal{R}_{LK}$ using logarithmic derivatives [9].
* **Plonk & Plonkup**: Instantiated via the parallel composition of permutation, custom gate, and lookup subprotocols to yield $\Pi_{plonkup}$ [10].
* **CCS (Customizable Constraint System)**: Generalizes R1CS and Plonk constraints, supporting high-degree gates without requiring permutation arguments [11].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.