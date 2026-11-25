## Research Problem and Motivation for HyperNova

### Limitations of Prior Recursive Arguments (Especially Nova)
Prior recursive arguments, particularly **Nova**, suffer from several key limitations that motivated the development of **HyperNova**:

* **Inability to efficiently handle high-degree constraint systems:** In Nova, each step of an incremental computation is expressed using Rank-1 Constraint Satisfiability (R1CS) [1]. While adaptations like Sangria can handle Plonkish constraints, the prover must commit to cross-terms, incurring $O(n \cdot d)$ cryptographic operations to commit to $O(d)$ cross-terms (where $n$ is the number of constraints and $d$ is the degree) [2]. This eliminates any significant benefit of using high-degree constraints over R1CS [3].
* **Lack of an "a la carte" cost profile for machine executions:** Proving program executions on stateful machines (like the EVM) traditionally relies on a universal circuit [4]. The cost of proving a single step is proportional to the size of the entire universal circuit (the sum of all supported instructions), even if only one instruction is actually invoked [4].
* **Expensive zero-knowledge overheads:** Nova achieves zero-knowledge by producing a zkSNARK (such as Spartan) to prove the validity of IVC proofs [5]. Spartan uses the Cramer-Damgard transformation, which requires the verifier to perform expensive public key operations (group scalar multiplications) that are too costly for on-chain deployment [5] [6].
* **Inefficient cycle-of-curves instantiation:** Nova requires representing the folding scheme verifier as a circuit on both curves in a cycle [7]. On the second curve, this circuit is extremely large (approx. 10,000 multiplication gates and over 100,000 non-zero R1CS entries) [7]. In "half"-pairing cycles (like BN254/Grumpkin), verifying the second curve's proof requires a circuit of over $70 \cdot 10^6$ gates, making it far too expensive to prove [8].

---

### HyperNova's Objectives, Contributions, and Novelty
To address these limitations, the authors introduce **HyperNova**, a new recursive argument designed for proving incremental computations [9]. Its core objectives and contributions include:

* **Customizable Constraint System (CCS) Support:** HyperNova supports CCS, which simultaneously generalizes Plonkish, R1CS, and AIR without overheads [9]. It provides a folding scheme for CCS where the prover's cryptographic cost is a single multi-scalar multiplication (MSM) of size equal to the number of variables, which is optimal [10].
* **"A La Carte" Cost Profile:** Proving a program step on stateful machines (e.g., EVM, RISC-V) incurs a cost proportional only to the size of the circuit representing the specific instruction invoked [11].
* **Zero-Knowledge "For Free" via NovaBlindFold:** The paper introduces **NovaBlindFold**, which leverages a blinding property in Nova's folding scheme to randomize IVC proofs and add zero-knowledge to non-ZK SNARKs without employing expensive zkSNARKs [12].
* **Efficient Instantiation via CycleFold:** The authors present **CycleFold**, a general technique to efficiently instantiate HyperNova (and other folding-scheme-based arguments) over a cycle of elliptic curves [13].

### Intended Application Scope
HyperNova is designed for proving incremental computations, building generalizations of Incrementally Verifiable Computation (IVC) such as Proof-Carrying Data (PCD) [10], and efficiently proving program executions on stateful machines (such as EVM and RISC-V) [11].