## Nebula: Proving Machine Executions via Folding Schemes

### 1. Main Research Problem and Motivation
* **The Space Complexity Bottleneck**: A major bottleneck in zero-knowledge virtual machines (zkVMs) is the prover's space complexity, which grows linearly with the number of program steps, making proofs for long-running computations impractical [1].
* **Challenge 1: Efficient Read-Write Memory**: Program executions on machines like RISC-V or EVM require sequentially consistent memory [2]. Existing offline memory checking techniques are expensive or difficult to adapt to incrementally verifiable computation (IVC) because IVC proof generation does not split cleanly between a "commit" and a "prove" phase [2].
* **Challenge 2: "Pay-per-use" Costs**: Replicating a per-step circuit to capture all possible instructions leads to a per-step circuit size proportional to the sum of all instruction circuits, creating enormous costs for unexecuted instructions [2].

---

### 2. Cryptographic Assumptions
* **Finite Fields**: The authors assume a finite field $\mathbb{F}$ (e.g., the prime field $\mathbb{F}_p$ for a large prime $p$) [3].
* **Negligible Functions**: Security parameters are analyzed using a negligible function $\mathrm{negl}(\lambda)$ [3].
* **Committed Relations**: The scheme works with a variant of relations where a commitment to the witness is included in the instance [4].
* **Multiset Hash Functions**: The authors assume the existence of multiset hash functions, which can be instantiated either as a deterministic hash function based on elliptic curves and cryptographic hashing, or as a randomized public-coin hash function based on Reed-Solomon fingerprints [5].

---

### 3. Security Model
* **PPT Adversaries**: The security model is defined against probabilistic polynomial-time (PPT) adversaries [3] [6] [7].
* **Knowledge Soundness**: The model relies on the existence of an expected polynomial-time (EPT) extractor $\mathcal{E}$ that can extract witnesses from convincing provers [7] [8].

---

### 4. Formal Security Definitions
* **Definition 3 (Incremental Commitment Scheme)**: A tuple of PPT algorithms $\mathrm{IC} = (\mathrm{Gen}, \mathrm{Commit}, \mathrm{Open})$ [6].
* **Definition 4 (Commitment-carrying Verifiable Computation - CC-IVC)**: Defined by PPT algorithms $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ and a deterministic polynomial-time $\mathcal{K}$ denoting the generator, prover, verifier, and encoder, alongside an incremental commitment scheme $\mathrm{IC}$ [7].
* **Definition 12 (Commitment Scheme)**: Defined by a polynomial-time algorithm $\mathrm{Gen} : \mathbb{N}^2 \to \mathcal{P}$ and a deterministic polynomial-time algorithm $\mathrm{Commit} : \mathcal{P} \times \mathcal{M} \times \mathcal{R} \to \mathcal{C}$ such that binding holds [9].
* **Definition 13 (Hiding)**: A commitment scheme is hiding if for any PPT adversary $\mathcal{A}$, the probability of distinguishing commitments is negligible: $\Pr[\mathcal{A}(\mathrm{pp}, C_1) = 1] \approx \Pr[\mathcal{A}(\mathrm{pp}, C_2) = 1]$ [10].
* **Definition 14 (Homomorphic)**: A commitment scheme is homomorphic if $\mathrm{Commit}(\mathrm{pp}, m_1, r_1) + \mathrm{Commit}(\mathrm{pp}, m_2, r_2) = \mathrm{Commit}(\mathrm{pp}, m_1 + m_2, r_1 + r_2)$ [11].
* **Definition 15 (Succinct Commitments)**: A commitment scheme provides succinct commitments if $|\mathrm{Commit}(\mathrm{pp}, m, r)| = O_{\lambda}(\mathrm{polylog}(|m|))$ [12].
* **Definition 17 (Argument of Knowledge)**: Defined by PPT algorithms $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ and a deterministic algorithm $\mathcal{K}$ [13].
* **Definition 18 (Succinctness)**: An argument of knowledge is succinct if the communication and verifier time complexity is at most poly-logarithmic in the size of the structure and witness [14].
* **Definition 19 (Non-Interactivity)**: An argument of knowledge is non-interactive if the interaction consists of a single message from the prover to the verifier [15].
* **Definition 20 (Zero-knowledge)**: Satisfied if for any PPT adversary $\mathcal{V}^*$ there exists an EPT simulator $\mathcal{S}$ [8].
* **Definition 21 (Incrementally Verifiable Computation - IVC)**: Defined by PPT algorithms $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ and a deterministic polynomial-time $\mathcal{K}$ [16].
* **Definition 22 (Folding Schemes)**: Consists of a tuple of PPT algorithms $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ for a relation $\mathcal{R}$ [17].

## References

[1]“File: 5-Nebula 2024-1605.pdf,” File.