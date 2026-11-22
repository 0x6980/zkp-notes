## Research Problem, Cryptographic Assumptions, and Security Definitions in Nova

### 1. Main Research Problem and Motivation
* **Research Problem:** The paper addresses the challenge of efficiently realizing **Incrementally-Verifiable Computation (IVC)** [1]. IVC is a cryptographic primitive that allows a prover to recursively prove the correct execution of long-running computations step-by-step [1].
* **Motivation:** Prior approaches to IVC rely on succinct non-interactive arguments of knowledge (SNARKs) [2]. At each step, the prover must produce a SNARK, and the verifier circuit must partially verify that SNARK [2]. This is highly impractical because SNARK verifiers are expensive both asymptotically and concretely [2]. Nova aims to avoid SNARKs entirely during the recursion steps, replacing them with a simpler, weaker, and more efficient primitive called a **folding scheme** [2].

---

### 2. Cryptographic Assumptions
* **Additively-Homomorphic Commitments:** The folding scheme assumes the existence of an additively-homomorphic commitment scheme providing $O_\lambda(1)$-sized commitments to $N$-sized vectors over a finite field $\mathbb{F}$ (such as Pedersen commitments) [3].
* **Discrete Logarithm (DLOG) Hardness:** Nova's instantiation without a trusted setup relies on the hardness of the discrete logarithm problem [4] [5] [6].
* **Symmetric External Diffie-Hellman (SXDH):** Alternatively, the scheme can be instantiated under the SXDH assumption [7] [8].
* **Random Oracle Model (ROM):** The non-interactive folding scheme is analyzed in the random oracle model using the Fiat-Shamir transform [9] [7] [5].

---

### 3. Security Model
* The security of the non-interactive folding scheme is analyzed in the **Random Oracle Model (ROM)** [9]. 
* It is heuristically instantiated in the **Standard Model** using a concrete cryptographic hash function [9].

---

### 4. Formal Security Definitions

#### Definition 1: Vector Commitment Scheme [10]
Consists of three protocols $(\text{Gen}, \text{Com}, \text{Open})$ [10]:
* $\text{Gen}(1^\lambda, m) \rightarrow pp$: produces public parameters $pp$.
* $\text{Com}(pp, v, r) \rightarrow C$: takes vector $v \in \mathbb{F}^m$ and $r \in \mathbb{F}$, producing commitment $C$.
* $\text{Open}(pp, C, v, r) \rightarrow \{0, 1\}$: verifies the opening.
* **Properties:** Must satisfy *hiding* (reveals no information), *binding* (adversary cannot open to two different values), and *succinctness* (commitment size is logarithmic in the opening size) [10].

#### Definition 2: Non-Interactive Argument of Knowledge (NARK) [11]
Consists of PPT algorithms $(\mathcal{G}, \mathcal{P}, \mathcal{V})$ and deterministic $\mathcal{K}$ [11]:
* $\mathcal{G}(1^\lambda) \rightarrow pp$: samples public parameters.
* $\mathcal{K}(pp, s) \rightarrow (pk, vk)$: outputs prover key $pk$ and verifier key $vk$.
* $\mathcal{P}(pk, u, w) \rightarrow \pi$: outputs proof $\pi$.
* $\mathcal{V}(vk, u, \pi) \rightarrow \{0, 1\}$: checks instance $u$ given proof $\pi$.

#### Definition 3: Zero-Knowledge (for NARK) [12]
An argument of knowledge satisfies zero-knowledge if there exists a PPT simulator $\mathcal{S}$ such that for all PPT adversaries $\mathcal{A}$ [12]:
$$\left\{ (pp, s, u, \pi) \leftarrow \text{Real} \right\} \approx \left\{ (pp, s, u, \pi) \leftarrow \mathcal{S}(1^\lambda) \right\}$$
*(Note: The exact probability distribution equivalence is specified via the $\approx$ relation in the paper's diagram [12].)*

#### Definition 4: Succinctness [13]
An argument system is succinct if the size of the proof $\pi$ is polylogarithmic in the size of the witness $w$ [13]:
$$|\pi| = O_\lambda(\text{polylog}(|w|))$$

#### Definition 5: Incrementally Verifiable Computation (IVC) [14]
Defined by PPT algorithms $(\mathcal{G}, \mathcal{P}, \mathcal{V})$ and deterministic $\mathcal{K}$ [14]. It satisfies perfect completeness and knowledge soundness [14].

#### Definition 6: Folding Scheme [15]
Reduces the task of checking two instances in a relation $\mathcal{R}$ to checking a single instance [15]. Consists of $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ [15].

#### Definition 7: Non-Interactive Folding Scheme [16]
A folding scheme is non-interactive if the interaction between $\mathcal{P}$ and $\mathcal{V}$ consists of a single message from $\mathcal{P}$ to $\mathcal{V}$ [16].

#### Definition 8: Zero-Knowledge Folding Scheme [17]
Satisfies zero-knowledge if there exists a PPT simulator $\mathcal{S}$ that can simulate the verifier's view and the folded instance without knowing the witnesses [17].

#### Definition 9: Public Coin Folding Scheme [18]
A folding scheme is public coin if all messages sent from $\mathcal{V}$ to $\mathcal{P}$ are sampled from a uniform distribution [18].

---

### 5. Specified vs. Not Specified Elements
* **Specified:** The paper explicitly defines the interfaces, completeness, and knowledge soundness conditions for NARKs, IVC, and folding schemes [11] [14] [15]. It also specifies the exact concrete relations (R1CS, Relaxed R1CS, and Committed Relaxed R1CS)   .
* **Not Specified:** The paper does not specify the exact concrete hash function used to instantiate the random oracle in the standard model, leaving it as a generic "concrete hash function" [9].

## References

[1]“File: nova 2021-370.pdf,” File.