## Limitations, Caveats, and Assumptions in Nebula

Based on the Nebula paper, the authors explicitly state several assumptions, overheads, experimental simplifications, and areas of expected future applicability:

### Theorem and Construction Assumptions
* **Switchboard Circuit Dimensions**: For the construction of the universal switchboard circuit (Construction 3), the authors assume for ease of exposition that the $l$ R1CS circuits representing the different functions share the exact same public input and output lengths, even though they may have different matrix dimensions [1].

### Overheads and Limitations of Commitment-Carrying IVC
* **Verifier Hash Overheads**: Implementing commitment-carrying IVC introduces minor overheads compared to standard folding schemes, specifically requiring the folding verifier to perform a few extra hashes at each step [2].
* **Incrementality Bottleneck**: Commitment-carrying IVC on its own does not provide incrementality. This is because memory-checking challenges must be generated after the prover commits to all non-deterministic witnesses (and thus all memory operations) for the proof [3]. To resolve this, the authors had to design a more complex two-layered IVC approach [3].

### Prover Costs and Representation Caveats
* **Field Element Commits**: The prover must commit to two (address, value, timestamp) tuples of field elements for every single memory operation [4].
* **EVM Value Representation**: In the prototype EVM implementation, because stack and memory values are larger than the field elements used, they must be represented using two field elements. This representation slightly increases the cost of the multiset hashes performed during memory-checking [5].
* **Persistent Storage Scan Costs**: For persistent storage, the scan cost is directly dependent on the total number of keys initialized for the contract, which can scale from a few thousand to tens of millions of keys [6].

### Experimental Simplifications and Duplications
* **Custom Hash Function**: To simplify running experiments and improve proving efficiency, the authors utilized a cheaper custom hash function instead of the standard SHA3, though they state this does not affect relative baseline comparisons [7].
* **Instruction Duplication**: Common functionality across all opcodes (such as reading the step's instruction) is duplicated across all subcircuits, though the switchboard construction mitigates this by ensuring the prover only pays for active parts [8].

### Future Work and Expectations
* **Applicability to Other Folding Schemes**: The authors note that while their prototype is built on Nova, they expect a similar performance boost when implementing Nebula's techniques on top of other folding schemes [9].

## References

[1]“File: 5-Nebula 2024-1605.pdf,” File.