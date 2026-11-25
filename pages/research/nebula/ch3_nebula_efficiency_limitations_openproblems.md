## Complexity and Limitations of Nebula

### Complexity Metrics and Parameter Dependencies

* **Prover Space Complexity**: The prover's space requirements are $O(|F| + |M|)$, where $|M|$ is the size of the global memory and $|F|$ is the field size [1].
* **Prover Time/Constraint Complexity**: 
  * For **Nebula**, the committed elements per operation are 6 small and 6 arbitrary, with 6 constraints per operation, and $4|H| + 4|G|$ constraints per folding step (where $|H|$ is the cost of hashing commitments and $|G|$ is the cost of group scalar multiplication) [2].
  * For **Nebula-Opt**, the committed elements per operation are 6 small, with 6 constraints per operation, and $4|H| + 4|G| + O(\log |M|)$ constraints per folding step [3].
  * The cost of proving $F_{scan}$ is incurred only once when a proof is finalized in Layer 1, amortizing over all memory operations [4].
* **Proof Size**: The IVC proof size is succinct and independent of the iteration count [5].
* **Communication Complexity**: Succinctness dictates that the communication complexity is at most poly-logarithmic in the size of the structure and witness [6].
* **Switchboard Circuit Complexity**: The switchboard circuit introduces $0$ degree increase, $\ell(|x| + 1) + 1$ added constraints, and $O(n)$ active variables [7].

---

### Limitations, Weaknesses, and Caveats

* **Field Size and Memory Operations Assumption**: The security of the offline memory checking protocol relies on the assumption that the total number of memory operations issued ($N$) is strictly smaller than the field characteristic $|F|$ [8].
* **Public-Coin Challenges and Incremental Updateability**: Standard offline memory checking does not easily split into separate 'commit' and 'prove' phases in an IVC setting. Because witness values are committed incrementally, it is challenging to ensure that proofs are incrementally updateable since public-coin security requires all witnesses to be known before the challenge is sampled [9].
* **Recursion Overhead Trade-offs**: While systems like SuperNova achieve pay-per-use costs, they must execute exactly one instruction per step, incurring a high recursion overhead of approximately 10,000 gates at every single program step [10].
* **Implementation Benchmarks and Memory Constraints**: In comparative benchmarks, the baseline Nova prover runs out of memory when attempting to batch more than one EVM step per Nova step, whereas Nebula's prover is capable of batching up to 20 EVM steps per Nova step [11]. However, the switchboard circuit still requires careful optimization to avoid multiplexer-based overheads [12].

## References

[1]“File: 5-Nebula 2024-1605.pdf,” File.