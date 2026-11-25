## SuperNova Complexity, Costs, and System Characteristics

Based on the SuperNova paper, the extracted complexity metrics, costs, assumptions, comparisons, and limitations are detailed below.

---

### 1. Complexity Metrics and Prover/Verifier Costs

* **Prover Costs per Step:** The cost of proving a step of a program execution is proportional only to the size of the circuit representing the instruction invoked by that specific program step [1] [2]. This cost is dominated by two multiexponentiations of size proportional to the size of the circuit representing the executed instruction [3].
* **Prover Space and Time Complexity:** At any step $i$, the prover's space and time complexity is linear in the size of the function applied at that step, denoted as $O_\lambda(|F_{\varphi(z_{i-1}, \omega_{i-1})}|)$ [4].
* **Verifier Circuit Size:** A natural design of the verifier circuit scales linearly with the number of instructions $\ell$ [5]. However, by employing offline memory-checking techniques, the verifier circuit size can be made independent of $\ell$ [5].
* **Committed Relaxed R1CS Folding Scheme Costs:** For $n$-sized committed relaxed R1CS instances over a finite field $\mathbb{F}$, the prover's time complexity is $O_\lambda(n)$, the verifier's time complexity is $O_\lambda(1)$, and the communication complexity is $O_\lambda(1)$ [6].
* **Pedersen Commitment Scheme Instantiation Costs:** When instantiated with the Pedersen commitment scheme, the size of the augmented function circuit $|F'_j|$ for each $j \in \{1, \dots, \ell\}$ is:
  $$|F'_j| = |\varphi| + |F_j| + o(2 \cdot G + 2 \cdot H + R)$$
  where $|F_j|$ and $|\varphi|$ are the number of R1CS constraints to encode functions $F_j$ and $\varphi$ respectively, $G$ is the number of constraints to encode a group scalar multiplication, $H$ is the number of constraints to encode a hash, and $R$ is the number of constraints to encode the random oracle $p$ [7].
* **NIFS.V and Augmented Function Operations:** The non-interactive folding scheme verifier ($NIFS.V$) computes two group scalar multiplications (since $u.\bar{E} = u_\perp.\bar{E} = 0$, avoiding the computation of $r^2 \cdot u.\bar{E}$) and invokes the random oracle once to obtain a random scalar [8]. The augmented function $F'_j$ makes two additional calls to the hash function and one call to $\varphi$ [8].
* **Hash Cost Optimization:** The cost of hashing scales with $\ell$ because the circuit takes $\ell$ running instances as non-deterministic input [9]. This dependence can be reduced from $O_\lambda(\ell)$ to $O_\lambda(\log \ell)$ constraints by encoding Merkle proofs in the circuit, and further reduced to $O_\lambda(1)$ constraints using multiset-based offline memory checking inside the circuit [9].

---

### 2. Proof Size and Communication Claims

* **Direct Proof Size:** At the end of $N$ steps, the prover holds $\ell$ running instances and one R1CS instance representing the final step [10]. If verified directly by sending the associated witnesses, the proof size is independent of the number of execution steps $N$, but is proportional to the sum of the sizes of the circuits for functions in $(\{F_1, \dots, F_\ell\}, \varphi)$, meaning it is not concretely small [10] [11].
* **Compressed Proofs:** To obtain compressed, concretely succinct proofs and achieve zero-knowledge, the prover must invoke a general-purpose zkSNARK (such as Spartan) [11].

---

### 3. Setup Assumptions

* **Cryptographic Model:** SuperNova is formally defined in the common reference string (CRS) model with preprocessing [12].
* **Field and Parameters:** It assumes a finite field $\mathbb{F}$ with $|\mathbb{F}| = 2^{\Theta(\lambda)}$, where $\lambda$ is the security parameter [13]. Generator algorithms that produce public parameters are assumed to be provided with appropriate size bounds [14].
* **Vector Commitments:** It employs a vector commitment scheme over $\mathbb{F}$ that is additively homomorphic and provides succinct commitments [15].
* **Random Oracle:** The underlying folding scheme is secure in the random oracle model [16]. In the plain model, the random oracle is heuristically instantiated with a concrete cryptographic hash function via the Fiat-Shamir transformation [17] [18].

---

### 4. Implementation and Benchmark Results

* **Missing Information:** The provided pages do not contain any implementation details, experimental evaluations, or benchmark results. No empirical performance numbers or software execution metrics are stated in the text.

---

### 5. Comparisons with Prior Work

| Metric / Feature | Prior Universal Circuits | Nova | Buffet | vRAM / MIRAGE | SuperNova |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Proving Cost per Step** | Proportional to the sum of all supported instruction circuits [1] | Proportional to a single instruction circuit [19] | Proportional to the sum of invoked operations [2] | Proportional to invoked instructions (non-incremental) [20] | Proportional only to the circuit of the invoked instruction [1] [2] |
| **Instruction Set Support** | Multiple instructions [1] | Single instruction only [19] | Multiple instructions [2] | Multiple instructions [20] | Arbitrary instruction set [19] |
| **Incremental Proofs** | Yes [1] | Yes [19] | No (requires static bounds and unrolling) [21] | No (requires global invariants over entire trace) [20] [22] | Yes (Non-uniform IVC) [19] |
| **Zero-Knowledge** | Yes | Yes | Yes | No (reveals instruction invocation counts) [23] | Yes (via zkSNARK) [11] |

---

### 6. Limitations, Weaknesses, and Open Problems

* **Parallel Proof Generation:** SuperNova does not immediately support parallel proof generation [24]. Although a generic compiler exists to transform such constructions to support parallel proving, the authors leave a tailored parallel-proving solution for SuperNova as near-term future work [24].
* **Proof Size and Zero-Knowledge Overhead:** Without a zkSNARK, the proof size is not concretely small and is not zero-knowledge [11]. To resolve this, SuperNova must incorporate a general-purpose zkSNARK (such as Spartan), the formal details of which are deferred to near-term work [25].

## References

[1]“File: 2-SuperNova 2022-1758.pdf,” File.