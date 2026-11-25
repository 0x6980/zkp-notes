## Cryptographic Assumptions, Security Model, and Formal Security Definitions

---

### 1. Commitment Scheme Definitions
The paper formalizes commitment schemes and their properties under the following definitions:
* **Commitment Scheme**: Defined by a polynomial-time algorithm `Gen` that produces public parameters, and a deterministic polynomial-time algorithm `Commit` that outputs a commitment given public parameters, a message, and a randomness tuple such that binding holds [1].
* **Hiding Property**: A commitment scheme is hiding if, for any probabilistic polynomial-time (PPT) adversary, the commitments to two different messages are computationally indistinguishable [2].
* **Homomorphic Property**: A commitment scheme is homomorphic if the message, randomness, and commitment spaces are groups, and the commitment of the sum of two messages and their randomness equals the sum of their individual commitments [3].
* **Succinct Commitments**: A commitment scheme provides succinct commitments if the size of the commitment is polylogarithmic in the size of the message, denoted as $O_{\lambda}(\text{polylog}(|m|))$ [4].
* **Multilinear Polynomial Commitment Scheme**: Defined over a polynomial ring $\mathbb{F}[X_1, \dots, X_n]$ [5].

---

### 2. Algebraic and Discrete-Log Assumptions
* **Hardness of Discrete Logarithm**: The instantiation of the scheme over a 2-cycle of elliptic curves $(G_1, G_2)$ assumes that each curve in the cycle can be used as a cryptographic group where the discrete logarithm problem is hard [6].
* **Pedersen Commitment Scheme**: The concrete efficiency characteristics of HyperNova are analyzed by instantiating the multi-folding scheme with the Pedersen commitment scheme [7].

---

### 3. Folding-Scheme Definitions
* **Multi-folding Schemes**: Generalizes standard folding schemes. It is defined with respect to relations $R_1$ and $R_2$, a predicate `compat` that structures for instances must satisfy, and size parameters $\mu, \nu \in \mathbb{N}$ [8].
* **Randomizing Property**: A multi-folding scheme is randomizing if there exists a sampling algorithm `sampleR1` for instance-witness pairs such that the folded instance-witness pair is indistinguishable from a randomly sampled one [9].
* **Blinding Property**: A multi-folding scheme is blinding if there exists a simulator $S$ such that, for any honest-but-curious deterministic verifier, the verifier's view (including the cross-term commitment and the folded witness) can be simulated without knowledge of the original witness [10].

---

### 4. Knowledge Soundness
* **Argument of Knowledge**: Defined by PPT algorithms $(G, P, V)$ and a deterministic algorithm $K$ for a relation $R$ [11].
* **Knowledge Soundness Proofs**: The paper proves knowledge soundness for its various constructions:
  * **Construction 1** (Multi-folding scheme for CCS) satisfies knowledge soundness [12].
  * **Construction 2** (NIVC from multi-folding schemes) satisfies knowledge soundness [13].
  * **Construction 7** (Multi-folding scheme for CCS over cycles) satisfies knowledge soundness [14].
  * **Construction 8** (nlookup) satisfies knowledge soundness under the condition that the field size is $|\mathbb{F}| = \Theta(2^{\lambda})$ [15].

---

### 5. Zero-Knowledge Construction
* **NovaBlindFold**: Exploits the blinding property of Nova's folding scheme. By folding a relaxed R1CS instance with a randomly sampled relaxed R1CS instance, the verifier learns nothing about the original witness beyond its validity [16].
* **Honest-Verifier Zero-Knowledge (HVZK)**: Construction 6 (the zero-knowledge argument for $R_{\text{VNIVC}}$) is formally proven to satisfy honest-verifier zero-knowledge [17].

---

### 6. Random-Oracle and Fiat-Shamir Assumptions
* **Fiat-Shamir Transformation**: Construction 5 defines the Fiat-Shamir transformation for multi-folding schemes using a random oracle $\rho$ to construct a non-interactive multi-folding scheme in the random oracle model [18].
* **Non-interactivity Assumptions**: 
  * **Assumption 1**: Assumes the existence of a non-interactive multi-folding scheme for $(R_{\text{LCCCS}}, R_{\text{CCCCS}}, \text{compat}, \mu, \nu)$ in the plain model [19].
  * **Assumption 2**: Assumes the existence of a non-interactive multi-folding scheme for $(R_{\text{LCCCS}} \times R_{\text{CR1CS}}, R_{\text{CCCCS}}, 1, 1)$ in the plain model [20].

---

### 7. Conditions for Recursive Composition (NIVC)
* **Non-uniform IVC (NIVC)**: Defined by PPT algorithms $(G, P, V)$ and a deterministic algorithm $K$ [21].
* **NIVC Requirements**: To support recursive composition, the NIVC scheme must satisfy completeness (where the prover can incrementally prove step-by-step execution) [22], knowledge soundness, succinctness (proof size is independent of the iteration count), and efficiency.