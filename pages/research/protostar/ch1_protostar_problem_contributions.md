## Analysis of ProtoStar: Research Problem, Motivation, and Core Innovations

### Research Problem and Motivation
* **Limitations of SNARK-based IVC:** Historically, Incrementally Verifiable Computation (IVC) relied on recursive SNARKs, which require verifying a SNARK at each step of the computation [1]. While accumulation and folding schemes (such as those initiated by Halo) allow accumulating SNARK verification checks to avoid this overhead, existing constructions are limited [1].
* **Rigidity of R1CS-based Schemes:** Prior accumulation schemes build on a fixed, universal R1CS language [2]. This requires fixing R1CS matrices for all computation steps, which limits flexibility [3]. This rigidity is highly problematic for ZK-EVMs, where each virtual machine instruction (OP-CODE) is encoded in a different circuit [3].
* **Inefficiencies with High-Degree and Lookup Gates:** VM circuits frequently utilize high-degree gates and lookup gates [3]. Prior folding approaches for Plonk-like constraint systems, such as Sangria, suffer from limitations: Sangria's proposed solution for high-degree gates lacks a security proof, and its group operations grow by a factor of the gate degree $d$, canceling out the benefits of high-degree gates [4] [5]. Similarly, Origami's lookup folding scheme relies on ad-hoc constructions that require individual security proofs [6].
* **Non-Uniformity Overhead:** Prior non-uniform approaches like SuperNova allow selecting different R1CS instances at runtime, but their recursive circuits still require many hashes and a hash-to-group gadget, and the final proof size scales linearly with the total size of all instances [7].

---

### Core Innovations of ProtoStar
* **Generic Special-Sound Compiler:** The authors introduce a general compiler that transforms any $(2k-1)$-move special-sound interactive argument for an NP-complete relation $\mathcal{R}_{\text{NP}}$ with an algebraic degree $d$ verifier into an efficient IVC scheme [8]. This is achieved in four steps:
  1. Compressing the prover message by committing to them using a homomorphic commitment scheme [9].
  2. Applying the Fiat-Shamir transform to yield a secure NARK [10].
  3. Building an accumulation scheme that samples a random challenge $\alpha$ and takes a linear combination of the current accumulator and the new NARK [11].
  4. Applying the BCLMS21 compiler to obtain a secure IVC scheme [12].
* **The ProtoStar Scheme:** ProtoStar is a simple and efficient IVC scheme for the highly expressive language $\mathcal{R}_{\text{mplkup}}$ (supporting non-uniform circuits, high-degree gates, and lookups) [13]. It can be instantiated from any linearly homomorphic vector commitment (e.g., Pedersen commitments) without requiring a trusted setup or large FFTs [13].
* **Non-Uniformity without Overhead:** ProtoStar supports executing one of $I$ circuits at each step (selected by a program counter `pc`) [14]. The IVC prover's computation is independent of $I$, requiring only one exponentiation per non-zero bit in the witness [14].
* **Flexible High-Degree Gates:** ProtoStar supports degree $d$ gates with a recursive statement consisting of only 3 group scalar multiplications and $d + O(1)$ hash and field operations, avoiding additional costs for extra gate types or selectors [15].
* **Table-Independent Lookups:** ProtoStar supports lookup gates in a precomputed table $T$ where the prover commits to vectors of length $\ell_{\text{lk}}$ (the number of lookups) [16]. The prover's step complexity is independent of the table size $T$ [16].

---

### Comparison with Nova, HyperNova, and SuperNova

| Feature / Metric | ProtoStar | HyperNova | SuperNova |
| :--- | :--- | :--- | :--- |
| **Supported Language** | Degree $d$ Plonk/CCS [17] | Degree $d$ CCS [17] | R1CS (degree 2) [17] |
| **Non-uniform Support** | Yes [17] | No [17] | Yes [17] |
| **Recursive Prover Complexity** | $3\mathbb{G}$ group operations, $(d + O(1))\mathbb{H} + \mathbb{H}_{\text{in}}$ hashes, and $(d + O(1))\mathbb{F}$ field ops [17] | $1\mathbb{G}$ group operations, $d \log n \mathbb{H} + \mathbb{H}_{\text{in}}$ hashes, and $O(d \log n)\mathbb{F}$ field ops [17] | $2\mathbb{G}$ group operations, $\mathbb{H}_{\text{in}} + O(1)\mathbb{H} + 1\mathbb{H}_{\text{G}}$ hashes [17] |
| **Extra Recursive Prover with Lookup** | $1\mathbb{H}$ hash [17] | $O(\log T)\mathbb{H} + O(\ell_{\text{lk}} \log T)\mathbb{F}$ ops [17] | N/A [17] |

* **Comparison with HyperNova:** 
  * HyperNova does not explicitly explain how to integrate lookups into Plonk/CCS in its IVC scheme, nor does it provide explicit constructions for non-uniform computations [18].
  * HyperNova's recursive circuit complexity depends on the number of gates $n$ (dominated by $d \log n$ hashes and $O(d \log n)$ field multiplications), whereas ProtoStar's recursive circuit is independent of $n$ (dominated by 3 group scalar multiplications and $O(\ell_{\text{in}} + d)$ field/hash operations) [19].
  * For lookups, HyperNova's accumulation prover is dominated by $O(T)$ field operations and its verifier by $O(\ell_{\text{lk}} \log T)$ field operations and $O(\log T)$ hashes, which is inefficient when $T \gg \ell_{\text{lk}}$ [20]. In contrast, ProtoStar achieves a prover complexity of $O(\ell_{\text{lk}})$ and a verifier dominated by only 3 group scalar multiplications, 2 hashes, and 2 field multiplications [20].
  * While HyperNova is designed for CCS, the authors show that ProtoStar's compiler can also be directly applied to CCS [21].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.