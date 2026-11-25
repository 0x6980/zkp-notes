# Critical Assessment and Future Work: Nebula

**Paper:** *Nebula: Proving Machine Executions via Folding Schemes*  
**Authors:** Arasu Arun and Srinath Setty  
**Source:** supplied PDF `5-Nebula 2024-1605.pdf` and its accompanying bibliographic record.

## 1. Overall assessment

Nebula addresses a concrete bottleneck in folding-based zkVM design: long computations create prover-space pressure, while machine execution requires sequentially consistent memory and a large instruction set can create a substantial per-step circuit cost. The paper’s response is architectural rather than a single isolated optimization: commitment-carrying IVC carries advice commitments, multiset fingerprints support memory checking, and a switchboard circuit enables pay-per-use treatment of instruction circuits. [Nebula PDF, pp. 1–2, 7–11]

The construction is technically coherent at the level presented in the paper. Its principal strength is that the components target distinct sources of overhead and are composed into an IVC architecture rather than evaluated only as independent primitives. The paper also states formal definitions and theorems for CC-IVC, memory consistency, switchboard parsing, and non-uniform IVC. [Nebula PDF, pp. 4–11]

## 2. Strengths

### 2.1 Addresses the right systems bottlenecks

The paper explicitly targets prover space, memory consistency, and unused-instruction overhead. These are not merely verifier-side concerns: they affect whether a zkVM can prove long-running machine executions in practice. [Nebula PDF, pp. 1–2]

### 2.2 Clear separation of responsibilities

The three-layer design assigns different responsibilities to different mechanisms: Layer 1 carries operation advice, Layer 2 checks the finalized memory commitments, and Layer 3 restores incrementality by folding the resulting proofs. This separation makes the source of each cost and each security obligation easier to identify. [Nebula PDF, pp. 7–9]

### 2.3 Formal treatment of non-uniform computation

The switchboard construction provides explicit selector, binary, and input-consistency constraints. The associated parsing lemma connects satisfaction of the universal circuit to satisfaction of one selected subcircuit, while the theorem connects the construction to non-uniform IVC. [Nebula PDF, pp. 10–11]

### 2.4 Practical evidence is directionally strong

The paper reports large improvements for its EVM prototype, including a 30× smaller constraint system relative to standard memory-checking techniques and more than 260× faster proof generation for the standard ERC-20 transfer relative to the baseline Nova implementation. The benchmark discussion also reports that Nebula could batch up to 20 EVM steps per Nova step while the baseline ran out of memory beyond one step per Nova step. [Nebula bibliographic record; Nebula PDF, p. 13]

## 3. Weaknesses and caveats

### 3.1 Finite-field operation bound

The memory-checking result assumes that the number of issued memory operations satisfies $N<|\mathbb{F}|$. This is a meaningful design constraint for workloads whose operation count may approach or exceed the field characteristic. The paper states the assumption explicitly, but the practical parameter-selection consequences require workload-specific analysis. [Nebula PDF, p. 7]

### 3.2 Incrementality is not obtained from CC-IVC alone

The paper explains that commitment-carrying IVC by itself does not solve the incrementality problem for memory checking: public-coin challenges must be generated after the prover has committed to the relevant witnesses and memory operations. Nebula therefore uses finalization and a further folding layer. This is an important conceptual caveat because the extra layers are part of the mechanism that makes the complete system incrementally usable. [Nebula PDF, pp. 2, 7–9]

### 3.3 Memory representation and scan costs

Each memory operation incurs commitments to two address-value-timestamp tuples. In the EVM prototype, values larger than one field element are represented with two field elements, increasing multiset-hash cost. Persistent storage can require a scan over a number of initialized keys ranging from thousands to tens of millions, so the asymptotic memory argument does not by itself eliminate all workload-dependent costs. [Nebula PDF, pp. 9, 12]

### 3.4 Experimental hash does not equal a production SHA3 evaluation

The experiments use a cheaper custom hash instead of SHA3 to make proving more efficient. The authors state that this preserves relative baseline comparisons, but absolute production costs for an EVM deployment using the standard hash should be measured separately. [Nebula PDF, p. 13]

### 3.5 Switchboard duplication remains a design cost

The paper notes that common functionality, such as reading the current instruction, is duplicated across opcode subcircuits. The switchboard ensures that the prover pays only for active portions, but duplication remains relevant to circuit construction, implementation complexity, and possible memory use. [Nebula PDF, p. 13]

### 3.6 Equal input/output lengths in the exposition

For ease of exposition, the switchboard construction assumes that the represented R1CS circuits share public input and output lengths, while allowing different matrix dimensions. A general implementation with heterogeneous interfaces needs an explicit encoding or padding strategy and a corresponding cost analysis. [Nebula PDF, p. 11]

## 4. Security assessment questions

The paper’s formal framework uses PPT algorithms, expected-polynomial-time extraction or simulation where applicable, commitment properties, and multiset-hash mechanisms. The main security questions that deserve concrete parameter analysis are:

1. What is the soundness error of the randomized fingerprint for the exact field and challenge-sampling procedure used in a deployment?
2. How do commitment binding and hiding assumptions compose with the memory-checking argument and the folding-scheme security proof?
3. What concrete security margin remains when the field must support the maximum number of memory operations?
4. How should adaptive or maliciously chosen memory-operation sequences be modeled when the operation trace is generated during the computation?
5. If Fiat–Shamir is used in an implementation of the public-coin components, what model and security reduction apply to the resulting non-interactive system?

These are assessment questions and proposed verification targets; they are not presented here as claims that the paper leaves every question unresolved.

## 5. Future research directions

### 5.1 Native support for dynamic workloads

Design parameter-selection methods that remain secure when the maximum number of memory operations is dynamic or not known before proving. A useful result would connect field size, operation-count bounds, fingerprint soundness, and proof cost in one concrete parameter table.

### 5.2 Standard-hash and production-EVM evaluation

Re-run the prototype with standard SHA3 and report separate costs for arithmetic constraints, memory checking, storage scans, recursive folding, proof generation, proof size, and verification. This would distinguish the architectural improvement from the benefit of the cheaper experimental hash.

### 5.3 Shared instruction components

Investigate a circuit architecture that factors common opcode logic into shared components while preserving the switchboard’s pay-per-use property. The objective is to reduce duplication without recreating the multiplexer overhead the switchboard was designed to avoid.

### 5.4 Generalized heterogeneous switchboards

Remove the exposition-only equal input/output length assumption through typed adapters, padding, or interface commitments. The resulting construction should state the additional constraints and prove that inactive branches cannot influence the selected computation.

### 5.5 Portability across folding schemes

The authors expect similar performance gains on other folding schemes. A systematic implementation study should compare proof size, commitment costs, recursion overhead, memory consumption, and concrete security assumptions across several folding back ends. [Nebula PDF, p. 13]

### 5.6 Stronger adversarial models

Extend the analysis to adaptive adversaries that choose operations, memory addresses, and values based on prior commitments or partial transcript information. The goal would be to make the relationship between public-coin challenge timing and incremental witness commitment explicit under the strongest practical adversarial model.

## 6. Bottom line

Nebula’s central contribution is a composition of commitment-carrying IVC, multiset-hash memory checking, and switchboard circuits aimed at making folding-based zkVM proving more scalable for machine executions. The reported prototype improvements are substantial, but the most important follow-up work is to quantify production-hash costs, dynamic-memory parameter constraints, persistent-storage scans, heterogeneous circuit interfaces, and concrete security margins. [Nebula PDF, pp. 1–2, 7–13]

## References

- Arun, A., & Setty, S. (2026). *Nebula: Proving Machine Executions via Folding Schemes*. 2026 IEEE Symposium on Security and Privacy (SP). Supplied PDF: `5-Nebula 2024-1605.pdf`.
- Supplied Nebula PDF, cited pages as indicated throughout this document.
- Supplied bibliographic record: `/home/sandbox/nebula_proving_machine_executions_via_folding_schemes.bib`.