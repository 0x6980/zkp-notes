## ProtoStar Non-Uniform IVC Compiler and Recursive Verification Architecture

### Compilation of Accumulation into IVC
ProtoStar provides a generic compiler that transforms any $(2k - 1)$-move special-sound interactive argument with an algebraic degree $d$ verifier into an efficient Incremental Verifiable Computation (IVC) scheme [1] [2]. This compilation is executed in four primary steps:
1. **Prover Message Compression**: The prover's messages are compressed by committing to them using a homomorphic commitment scheme [3].
2. **Fiat-Shamir Transformation**: The Fiat-Shamir transform is applied to yield a secure Non-interactive Argument of Knowledge (NARK) [4].
3. **Accumulation Scheme Construction**: A simple and efficient accumulation (or folding) scheme is built, which samples a random challenge $\alpha$ and takes a linear combination between the current accumulator and the new NARK [5].
4. **IVC Compilation**: The compiler from BCLMS21 is applied to the accumulation scheme to yield a secure IVC scheme [6].

---

### Recursive Verification Architecture
The recursive verification architecture in ProtoStar is designed to verify the correct execution of the accumulation step recursively [7].
* **Verification Mechanism**: The IVC transformation from BCLMS21 implements the accumulation verifier ($V_{acc}$) as a recursive circuit, proving that the previous accumulation step was performed correctly [7]. This recursive circuit is independent of the size of the witness and the decider's runtime [7].
* **Efficiency and Group Operations**: The recursive circuit is dominated by only $d + k - 1$ scalar multiplications in the additive group of the commitment scheme [8]. By utilizing the BCLMS21 compiler, the recursive circuit's complexity depends only on the number of rounds and the verifier degree of the underlying special-sound protocol, rather than the proof size or verifier time [9].

---

### Circuit Selection and Program Counters
ProtoStar supports non-uniform IVC, allowing different branch circuits to be executed at each step without incurring overhead proportional to the total number of circuits [10].
* **Program Counter ($pc$)**: Each iteration uses a program counter $pc$ that selects one out of $I$ branch circuits [10]. The public input is represented as $\pi := (pc, \pi')$, where $pc \in [I]$ indicates which instruction or branch circuit is executed in the next step [11].
* **Circuit Selection Subprotocol**: The prover sends a boolean vector $b \in \mathbb{F}^I$, and the verifier checks that $b_{pc} = 1$ and $b_i = 0$ for all $i \neq pc$ using $2I$ degree-2 equations [12] [13]. Each algebraic equation $G$ checked in the protocol is replaced with $\sum_{i=1}^I g_i \cdot b_i$, where $G_i$ is the corresponding gate in the $i$-th branch circuit [12].
* **Prover Efficiency**: The IVC prover only requires one exponentiation per non-zero bit in the witness, making the prover's computation completely independent of the total number of circuits $I$ [10].

---

### Handling High-Degree Gates and Lookups
ProtoStar natively supports Plonk-like constraint systems with high-degree gates and lookup tables [14] [15].
* **High-Degree Gates**: ProtoStar supports degree $d$ gates instead of restricting the system to addition and multiplication [14]. The recursive statement consists of 3 group scalar multiplications and $d + O(1)$ hash and field operations, with no additional cost for gate types of degree less than $d$ or additional selectors [14].
* **Verification Compression**: To optimize high-degree verification, ProtoStar compresses $\ell$ degree-$d$ verification equations into a single degree-$(d+2)$ equation using a random linear combination with powers of a challenge $\beta$ [16] [17]. This reduces the number of group operations to $k+2$, with the trade-off of checking $2\sqrt{\ell}$ additional degree-2 equations [16] [17].
* **Lookup Gates**: ProtoStar supports lookup gates against a precomputed table $T$ [15]. In each step, the prover commits to two vectors of length $\ell_{lk}$ (the number of lookups) [15]. The prover's computation is independent of the table size $T$ (assuming free indexing) [15].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.