# Critical Assessment and Future Work: SuperNova

**Paper:** *SuperNova: Proving Universal Machine Executions without Universal Circuits*  
**Authors:** Abhiram Kothapalli and Srinath Setty  
**Source:** supplied PDF `2-SuperNova 2022-1758.pdf`.

## 1. Overall assessment

SuperNova addresses a central scalability problem in recursive proofs for stateful machines: a universal fetch-decode-execute circuit makes the cost of proving every step depend on the full supported instruction set, even when the execution invokes only one instruction. SuperNova’s central architectural response is to realize **non-uniform incremental verifiable computation (NIVC)** using folding schemes: it maintains one running relaxed-R1CS instance per instruction circuit and folds each new step into the running instance selected by the control function. This produces an “a la carte” cost profile in which the step cost is tied primarily to the invoked instruction circuit rather than to the sum of all supported instruction circuits. [SuperNova PDF, pp. 0–5, 11–14]

The construction is conceptually strong because it preserves the incremental structure of Nova while generalizing from one step function to a collection of instruction functions. The paper formally defines NIVC, committed relaxed R1CS, and the folding scheme; gives the augmented-circuit construction; and states perfect-completeness, knowledge-soundness, and efficiency results. [SuperNova PDF, pp. 7–12, 16–22]

The principal qualification is that the paper’s most attractive end-to-end properties are layered. The core NIVC proof is not by itself concretely succinct or zero-knowledge, and the paper defers the formal details of the zkSNARK wrapper that supplies those properties. Parallel proving is also not directly supported by the presented construction. [SuperNova PDF, pp. 3, 5–6, 13]

## 2. Strengths

### 2.1 Solves a genuine universal-circuit bottleneck

The paper identifies a concrete mismatch between universal circuits and machine execution: a step invokes one instruction, but a universal circuit includes all supported instructions. SuperNova’s per-step proving cost is proportional to the circuit for the invoked instruction, while the instruction set can remain rich. This is the construction’s clearest systems contribution. [SuperNova PDF, pp. 0–3]

### 2.2 Generalizes Nova without changing the basic recursion paradigm

SuperNova can be viewed as a generalization of Nova. Nova handles a machine with one instruction, whereas SuperNova supports an arbitrary instruction set by keeping multiple running instances. The paper states that SuperNova’s prover costs and recursion overhead are similar to Nova’s, and that the construction is equivalent to Nova when the machine supports one instruction. [SuperNova PDF, pp. 0, 3]

### 2.3 Clean separation between instruction execution and folding state

The augmented function $F'_j$ executes instruction circuit $F_j$ and performs the bookkeeping needed to update the selected running instance. The list $U_i$ stores one accumulated instance for each instruction circuit, while the control function determines which list entry receives the new step instance. This separation makes the non-uniformity explicit and provides a direct link between the program counter and the folding operation. [SuperNova PDF, pp. 13–17]

### 2.4 Formal security treatment

The paper gives formal interfaces and properties for NIVC and folding schemes, including perfect completeness, knowledge soundness, and efficiency. The verifier checks the hash-linked statement, the program-counter range, freshness of the current step instance, the satisfaction of every running instance, and the witness for the current step. [SuperNova PDF, pp. 7–12, 16–19]

### 2.5 Per-step cost avoids dependence on the total execution length

The paper states that the prover’s time and space at step $i$ are linear in the size of the function applied at that step, $O_\lambda(|F_{\varphi(z_{i-1},\omega_{i-1})}|)$. The underlying committed relaxed-R1CS folding scheme has linear prover time in the instance size, constant verifier time, and constant communication under the stated asymptotic notation. [SuperNova PDF, pp. 10–12]

## 3. Weaknesses and caveats

### 3.1 Raw NIVC proofs are not concretely succinct

At the end of $N$ steps, the prover holds one running instance per supported instruction plus an instance for the last step. Although the raw proof size is independent of $N$, it is proportional to the sum of the circuit sizes for the supported functions and the control function. Thus, the raw object is not concretely small when the instruction set or its circuits are large. [SuperNova PDF, pp. 5–6]

### 3.2 Zero-knowledge requires an additional zkSNARK layer

The raw SuperNova proof is not zero-knowledge. The paper proposes using a general-purpose zkSNARK, such as Spartan, to prove knowledge of a valid NIVC proof and thereby obtain a compressed, zero-knowledge proof. However, the formal details of this zkSNARK of valid NIVC proofs are deferred to near-term work. The end-to-end security and performance of a deployed system therefore depend on the wrapper and its concrete instantiation, not only on the NIVC construction. [SuperNova PDF, pp. 5–6, 13]

### 3.3 Parallel proof generation is not directly supported

The presented construction does not immediately support parallel proof generation. The paper notes that a generic compiler can transform constructions such as SuperNova into a form supporting parallel proving, but leaves a SuperNova-specific solution as future work. This matters for long traces and high-throughput systems where wall-clock proving time is as important as asymptotic per-step cost. [SuperNova PDF, p. 3]

### 3.4 The control and hashing overhead can scale with the instruction count

A natural verifier-circuit design scales linearly with the number of supported instructions $\ell$. In the construction, the hash cost also initially scales with $\ell$ because the circuit receives all $\ell$ running instances even though it updates only one. Merkle proofs can reduce this dependence to $O_\lambda(\log \ell)$ constraints, and multiset-based offline memory checking can reduce it further to $O_\lambda(1)$ constraints, but these are optimization layers rather than the simplest baseline construction. [SuperNova PDF, pp. 5, 22]

### 3.5 Circuit-size and interface assumptions simplify the exposition

The construction assumes, without loss of generality for the presentation, that the functions have identical input/output sizes and circuit sizes. A practical machine with heterogeneous instructions needs padding, typed adapters, or another interface encoding, together with a concrete analysis of the additional constraints and possible leakage. [SuperNova PDF, p. 16]

### 3.6 Running-instance sizing requires a hash/preimage workaround

The paper identifies a subtle growth problem: if the entire updated running-instance list $U_{i+1}$ is placed in the public input/output of the next augmented circuit, folding can make the running instances grow at every step. The construction alleviates this by outputting only a hash of the augmented function’s outputs and supplying a preimage as non-deterministic input in the next step. This is an important implementation detail because the compact recursive state is achieved through hashing and witness handling rather than by directly exposing the full state. [SuperNova PDF, p. 15]

### 3.7 Base-case and auxiliary-advice details are nontrivial

The paper explicitly notes that the high-level proof-update description initially omits the definition of the base proof $\Pi_0$ and the handling of the base case by the prover, verifier, and augmented functions. It also notes that the folding verifier inside $F'_j$ needs additional advice generated by the folding prover, which is supplied as non-deterministic input. These details are addressed in the formal construction, but they are sources of implementation complexity and deserve careful treatment in a production implementation. [SuperNova PDF, p. 15]

### 3.8 No empirical implementation or benchmark evidence in the supplied paper

The supplied paper is theoretical and does not provide a systems benchmark section with concrete proving times, peak memory, proof sizes, or verification measurements. Consequently, the asymptotic “a la carte” advantage cannot be translated from the paper alone into a deployment-level performance claim for a particular instruction set or hardware platform. [SuperNova PDF, pp. 0–22]

## 4. Security assessment questions

The following are assessment questions and proposed verification targets, not claims that the paper’s formal theorems are invalid:

1. **End-to-end composition:** What concrete security statement results when NIVC knowledge soundness, the folding scheme, the vector commitment, the Fiat–Shamir transformation, and the zkSNARK wrapper are composed?
2. **Random-oracle dependence:** What security model and reduction apply when the random oracle is replaced by a concrete hash function through Fiat–Shamir? The paper explicitly describes this replacement as heuristic. [SuperNova PDF, pp. 9–10]
3. **Adaptive instruction selection:** How does the knowledge-soundness extractor behave when the adversary adaptively chooses the control function, instruction circuits, and statement after seeing the CRS?
4. **State-hash binding:** What exact collision resistance, domain separation, and transcript-binding requirements are needed for the hashes linking $(i,z_0,z_i,U_i)$ and the next state?
5. **Heterogeneous interfaces:** How should soundness be stated when instruction circuits have different public-input, output, witness, and constraint dimensions rather than the exposition’s equal-size assumption?
6. **Zero-knowledge leakage:** Which metadata, if any, is exposed by the raw NIVC state, the instruction selector, proof size, compression schedule, or the zkSNARK wrapper?

## 5. Future research directions

### 5.1 A native succinct zero-knowledge NIVC layer

Complete and analyze the zkSNARK-of-valid-NIVC construction, including the exact relation being proved, preprocessing requirements, proof size, verifier time, prover overhead, and compositional security theorem. A useful result would compare a direct SuperNova wrapper with alternative recursive compression mechanisms under the same instruction-set workload. [SuperNova PDF, pp. 5–6, 13]

### 5.2 SuperNova-specific parallel proving

Develop a parallelization strategy tailored to the per-instruction running-instance architecture. The design should address dependency scheduling, merging partial running instances, memory usage, and whether parallelism changes the proof transcript or the knowledge-soundness argument. [SuperNova PDF, p. 3]

### 5.3 Constant-overhead instruction selection

Implement and evaluate the proposed Merkle-based and multiset-based offline-memory-checking optimizations. The objective is to make selector and state-maintenance overhead independent of $\ell$ without introducing larger constants, additional assumptions, or hidden leakage. [SuperNova PDF, pp. 5, 22]

### 5.4 Heterogeneous instruction interfaces

Generalize the construction to instructions with different input/output widths, witness layouts, and circuit sizes. Typed interfaces or length-hiding adapters could remove the equal-size exposition assumption while retaining the a-la-carte property. The analysis should quantify padding, selector, and commitment costs separately from the active instruction cost.

### 5.5 Concrete system evaluation

Build an implementation for representative machines such as RISC-V, EVM, or Wasm and report: per-instruction constraint counts; prover time and peak memory; verifier time; raw and wrapped proof sizes; recursion overhead; selector/hash overhead as $\ell$ grows; and the effect of instruction skew and dynamic control flow. The evaluation should include the zkSNARK wrapper rather than measuring only the theoretical NIVC core.

### 5.6 Security under adaptive and malicious workloads

Analyze executions in which the instruction sequence, non-deterministic advice, and memory behavior are adversarially chosen and may depend on earlier transcript values. Concrete bounds should combine commitment security, folding soundness, hash security, and Fiat–Shamir error rather than reporting each assumption in isolation.

### 5.7 Parameter and architecture co-design

Study the trade-off between many small instruction circuits and fewer larger grouped circuits. Grouping may reduce selector and key-management overhead but can weaken the a-la-carte benefit. A workload-aware compiler could choose the circuit partition, memory-checking strategy, and compression schedule jointly.

## 6. Bottom line

SuperNova’s central contribution is a principled way to extend Nova’s folding-based recursion from one instruction circuit to an arbitrary instruction set while retaining a per-step cost tied to the invoked instruction. The construction is technically compelling at the NIVC level, but deployment-level claims require additional work on the zkSNARK wrapper, parallel proving, instruction-count-independent selector overhead, heterogeneous interfaces, and empirical benchmarking. The paper’s strongest research opportunity is to turn the theoretical NIVC core into a fully evaluated, succinct, zero-knowledge, and parallel system for a real virtual machine. [SuperNova PDF, pp. 0–6, 11–22]

## References

- Kothapalli, A., & Setty, S. (2022). *SuperNova: Proving universal machine executions without universal circuits*. 