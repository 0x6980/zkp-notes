## Cryptographic Foundations and Security Arguments of ProtoStar

### Cryptographic Assumptions
* **Discrete Logarithm Assumption**: The construction of ProtoStar relies on the discrete logarithm assumption in the random oracle model [1]. This allows the scheme to avoid heavy cryptographic machinery such as trusted setups, pairings, or Fast Fourier Transforms (FFTs) [1].
* **Pedersen Commitments**: The protocol can be instantiated using any linearly homomorphic vector commitment scheme, such as the discrete logarithm-based Pedersen commitment [2].

---

### Protocol Models
* **Public-Coin Interactive Proof**: Defined as a protocol $\Pi = (P, V)$ for a relation $\mathcal{R}$ between a prover $P$ and a polynomial-time verifier $V$ [3]. The verifier outputs $0$ to accept and a non-zero value otherwise [3]. A $(2k-1)$-move protocol consists of $k$ prover messages and $k-1$ verifier messages [4].
* **Special-Sound Interactive Protocol**: A $(2\mu + 1)$-move public-coin interactive proof is $(\alpha_1, \dots, \alpha_{\mu})$-out-of-$N$ special-sound if there exists a polynomial-time extractor that can reconstruct the witness $w \in \mathcal{R}(\pi)$ given any $(\alpha_1, \dots, \alpha_{\mu})$-tree of accepting transcripts [5].
* **Random-Oracle Non-Interactive Argument of Knowledge (RO-NARK)**: A pair of probabilistic random-oracle algorithms $(P, V)$ where the prover generates a proof $\pi$ using a random oracle $\rho_{\text{NARK}}$, and the verifier accepts by outputting $0$ using the same oracle [6].

---

### Security Definitions
* **Perfect Completeness**: A NARK satisfies perfect completeness if, for any valid instance-witness pair, the verifier accepts with probability $1$ [7].
* **Knowledge Soundness**: A NARK possesses adaptive knowledge-soundness if there exists an expected polynomial-time extractor $\text{Ext}$ that, given oracle access to a prover making $Q$ queries, outputs a valid witness with high probability [8].
* **Commitment Scheme**: Defined as a pair of algorithms $\text{cm} = (\text{Setup}, \text{Commit})$ where $\text{Setup}$ outputs a commitment key $ck$ and $\text{Commit}$ binds a message $m$ to a commitment $C$ [9].
* **Homomorphic Commitment**: A commitment scheme is homomorphic if the commitment space $(C, +)$ forms an additive group of prime order $p$ [10].
* **Incremental Verifiable Computation (IVC)**: An IVC scheme consists of a prover $P_{\text{IVC}}$ and a verifier $V_{\text{IVC}}$ designed to incrementally prove and verify step-by-step computations [11].
* **Accumulation Scheme**: A triple of algorithms $(\text{P}_{acc}, \text{V}_{acc}, \text{D})$ with access to random oracles that allows combining a new NARK proof and an old accumulator into a new accumulator [12].

---

### Special-Soundness Requirements
* **Fiat-Shamir of Special-Sound Protocols**: The Fiat-Shamir transform of an $(\alpha_1, \dots, \alpha_{\mu})$-out-of-$N$ special-sound interactive proof yields a knowledge-sound RO-NARK with a knowledge error of $\kappa_{fs}(Q) = (Q+1)\kappa$ [13].
* **Commit-and-Open Special-Soundness**: The commit-and-open protocol $\Pi_{cm}$ compiled from a special-sound protocol $\Pi_{sps}$ remains $(\alpha_1, \dots, \alpha_{\mu})$-out-of-$N$ special-sound for the relation $\mathcal{R}_{cm}$ [14].
* **Subprotocol Special-Soundness Bounds**:
  * The lookup protocol $\Pi_{LK}$ is $2(\ell + T)$-special-sound [15].
  * The vector lookup protocol $\Pi_{VLK}$ is $[1 + (v-1)\cdot(\ell + T - 1), 2(\ell + T)]$-special-sound [16].
  * The Plonkup protocol $\Pi_{plonkup}$ is $2(T + |L|)$-special-sound [17].
  * The multi-circuit lookup protocol $\Pi_{mplkup}$ is $2(T + \ell_{lk})$-special-sound [18].

---

### Fiat-Shamir and Commitment Assumptions
* **Adaptive Fiat-Shamir Transform**: Replaces the verifier's random challenges with queries to a random oracle $\rho_{\text{NARK}}$ evaluated on the transcript history [19].
* **Fiat-Shamir Heuristic**: Assumes that replacing the random oracle with a secure cryptographic hash function $H$ preserves the negligible knowledge error of the NARK in the standard model [20].
* **Binding and Homomorphic Commitments**: The accumulation scheme requires a binding, homomorphic commitment scheme to commit to error terms and prover messages [21].

---

### Soundness Arguments and IVC Compiler Assumptions
* **Knowledge-Soundness of Accumulation**: Under Theorem 2, the accumulation scheme for $V_{\text{NARK}}$ achieves perfect completeness and has a knowledge error of $(Q+1)\frac{d+1}{|\mathbb{F}|} + \text{negl}(\lambda)$ against a $Q$-query adversary [21].
* **IVC Compiler Assumptions**: The IVC compiler from BCLMS21 (Theorem 1) requires a NARK and an accumulation scheme in the standard model, both with negligible knowledge error, and assumes that the circuit complexity of the accumulation verifier $V_{acc}$ is sub-linear in its input [22].
* **Random Oracle Heuristic**: Since the constructed NARK and accumulation schemes are in the random oracle model, the compiler heuristically instantiates the random oracle with a cryptographic hash function to preserve knowledge soundness in practice [23].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.