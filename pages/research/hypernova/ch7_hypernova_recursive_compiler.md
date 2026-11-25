## Compiling the HyperNova Folding Scheme into NIVC

HyperNova compiles its multi-folding scheme into Non-Uniform Incrementally Verifiable Computation (NIVC) by utilizing a series of specialized components and protocols designed to handle non-uniform step relations, recursive verification, zero-knowledge, and efficient curve instantiations.

---

### 1. The HyperNova Step Relation and NIVC Compilation
* **NIVC Definition**: NIVC generalizes standard Incrementally Verifiable Computation (IVC) by allowing the prover to prove the satisfiability of a relation chosen dynamically from a set of possible relations at each step of the computation [1]. At step $i$, the prover proves the correct application of a function $F_j$ (where $j = \varphi(z_{i-1}, \omega_{i-1})$) on the previous step's output $z_{i-1}$ and a non-deterministic input $\omega_{i-1}$ to produce the new output $z_i$ [2].
* **NIVC-Compatible Folding Schemes**: To compile a multi-folding scheme into NIVC, the underlying committed relation must satisfy four key properties [3]:
  1. **NP-completeness**: Statements about the correct execution of an efficient function $F$ can be encoded and decoded as statements in the relation.
  2. **Partial functions**: Structures and instances can be encoded and decoded independently of witnesses.
  3. **Monotonicity**: Any efficient function $F$ can be encoded in a way that preserves the size of $F$.
  4. **Default instances**: There exists a default satisfying instance-witness pair to handle the base case of the construction.

---

### 2. Recursive Verification and the Augmented Function
* **Augmented Function ($F'_j$)**: At each step, the prover runs an augmented function $F'_j$ [4]. Instead of directly checking the correctness of the $i$-th step (which is computationally expensive), $F'_j$ takes a list of running instances $U_i$ (attesting to all prior iterations) and a new instance $u_i$ (claiming the correctness of the current step) [5].
* **Folding Step**: The augmented function $F'_j$ folds $u_i$ into the appropriate running instance in $U_i$ according to the control function $\varphi$, producing a new list of running instances $U_{i+1}$ [5].
* **Memory Optimization**: To avoid passing all running instances through each step of $F'_j$, the verifier circuit uses standard memory checking techniques to verifiably read and write the running instances into externalized memory, reducing the verifier circuit's work to $O(\log \ell)$ hashes (using Merkle trees) or $O(1)$ hashes (using multiset-CRHF-based memory) [6].

---

### 3. Zero-Knowledge and Succinctness Layer via NovaBlindFold
* **The Privacy Challenge**: Standard NIVC proofs are linear in the sizes of the circuits for each supported function and can leak information about secret witnesses at each step [7].
* **NovaBlindFold Protocol**: To achieve zero-knowledge without expensive zkSNARKs, HyperNova rerandomizes the NIVC proof using a blinding property [8]. Nova's folding scheme for relaxed R1CS, when folded with a randomly sampled instance, yields a folded instance-witness pair that reveals nothing about the original witness beyond satisfiability [9].
* **NovaBlindFold Sequence** [10]:
  1. The prover samples a random committed relaxed R1CS instance-witness pair $(u_r, w_r)$ and sends $u_r$ to the verifier.
  2. The prover and verifier execute Nova's folding scheme to fold the original instance-witness pair $(u, w)$ with $(u_r, w_r)$, during which the prover sends a single hiding commitment $T$ and the verifier responds with a challenge $r$.
  3. The prover sends the folded witness $w'$ to the verifier.
  4. The verifier checks that $w'$ satisfies the folded instance $u'$.
* **Application to NIVC Proofs**: To hide the last instruction $pc$ and the witness terms, the prover verifiably folds $(u, w)$ into $(U[pc], W[pc])$ and then folds in randomized instances $(U_r, W_r)$ to produce a new set of randomized running instances $(U', W')$ that can be checked in place of the originals [11].

---

### 4. CycleFold and the Two-Cycle-of-Curves Instantiation
* **Avoiding Non-Native Arithmetic**: Traditional recursive proofs over a cycle of curves require representing the verifier of each curve as a circuit on the other curve, which introduces expensive non-native field emulation [12] [13].
* **CycleFold Approach**: CycleFold observes that folding-scheme-based verifiers only require a few scalar multiplications (2 in Nova, 1 in HyperNova) [12]. Instead of representing the entire verifier on the second curve, CycleFold creates a tiny "co-processor" circuit $C_{EC}$ defined over the scalar field of the second curve $E_2$ to perform the scalar multiplication and point addition [13] [14].
* **Co-processor Circuit ($C_{EC}$)**: Because $E_2$ is the base field of $E_1$ in a 2-cycle of curves, $C_{EC}$ executes the scalar multiplication natively without any field emulation [15]. This keeps the size of $C_{EC}$ extremely small (approximately 1,000 to 1,500 multiplication gates) [15]. The satisfiability of this scalar multiplication circuit is then folded back into a running instance on the first curve using Nova's folding scheme [13].