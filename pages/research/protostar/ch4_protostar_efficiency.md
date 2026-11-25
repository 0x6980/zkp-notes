## ProtoStar Complexity and Efficiency Analysis

### 1. Cost Breakdown of ProtoStar Components

*   **Native Prover Cost ($P_{\text{PROTOSTAR}}$ native):** 
    The native prover running time is dominated by $O(|\mathbf{w}| + \ell_{lk})\mathbb{G} + L'(C_{pc}, d + 2) + 2\ell_{lk}\mathbb{F}$ [1]. Here, $|\mathbf{w}|$ is the number of non-zero entries in the witness [2], $\ell_{lk}$ is the number of lookups [3], $\mathbb{G}$ represents group scalar multiplication cost [3], $\mathbb{F}$ is the field multiplication cost [3], and $L'(C_{pc}, d + 2)$ is the cost of computing the coefficients of the error polynomial $e(X)$ [2].
*   **Accumulation Prover / Recursive Verifier Cost ($P_{\text{PROTOSTAR}}$ recursive):** 
    The recursive circuit (which implements the accumulation verifier) is dominated by $3\mathbb{G} + (d + 4)\mathbb{F} + (d + O(1))\mathbb{H} + 1\mathbb{H}_{in}$ [1]. This represents $3$ group scalar multiplications, $d+4$ field operations, $d+O(1)$ hashes, and $1$ public input hash [1].
*   **Decider / Verifier Cost ($V_{\text{PROTOSTAR}}$):** 
    The verifier cost is $O(c \cdot n + T + \ell_{lk})\mathbb{G} + n + \sum_{i=1}^I C_i + T + \ell_{lk}\mathbb{F}$ [1], where $\sum_{i=1}^I C_i$ is the cost of evaluating all circuits on a random input [2].
*   **Proof Size ($|\pi_{\text{PROTOSTAR}}|$):** 
    The proof size is bounded by $O(c \cdot n + T + \ell_{lk})$ [1].

---

### 2. Parameter Dependencies

*   **Circuit Count ($I$):** 
    ProtoStar supports non-uniform IVC without overhead [4]. The prover's computation is independent of the number of circuits $I$ [4].
*   **Witness Size ($|\mathbf{w}|$):** 
    The native prover scales linearly with the number of non-zero entries in the witness ($|\mathbf{w}|$) [3] [1].
*   **Gate Degree ($d$):** 
    The recursive statement scales linearly with the gate degree $d$, requiring $d + O(1)$ hash and field operations [5].
*   **Lookup-Table Size ($T$):** 
    The prover's work in each step is independent of the table size $T$ (assuming free indexing) [6]. This is a major advantage over prior schemes where lookup accumulation depended on $T$ [7].
*   **Verifier Degree:** 
    By separating verification checks, only the high-degree gate checks ($n$ checks of degree $d$) incur high-degree cross-error vector costs, while the remaining checks are kept at degree 2 or lower [8].

---

### 3. Comparison with Prior Schemes

| Metric / Scheme | ProtoStar | HyperNova | SuperNova |
| :--- | :--- | :--- | :--- |
| **Language Support** | Degree $d$ Plonk/CCS [9] | Degree $d$ CCS [9] | R1CS (degree 2) [9] |
| **Non-Uniformity** | Yes [9] | No [9] | Yes [9] |
| **P Native (Base)** | $|\mathbf{w}|\mathbb{G} + O(|\mathbf{w}|\log^2 d)\mathbb{F}$ [9] | $|\mathbf{w}|\mathbb{G} + O(|\mathbf{w}|\log^2 d)\mathbb{F}$ [9] | $|\mathbf{w}|\mathbb{G}$ [9] |
| **Extra P Native (Lookup)** | $O(\ell_{lk})\mathbb{G}$ [9] | $O(T)\mathbb{F}$ [9] | N/A [9] |
| **P Recursive (Base)** | $3\mathbb{G} + (d + O(1))\mathbb{H} + \mathbb{H}_{in} + (d + O(1))\mathbb{F}$ [9] | $1\mathbb{G} + d\log n\mathbb{H} + \mathbb{H}_{in} + O(d\log n)\mathbb{F}$ [9] | $2\mathbb{G} + \mathbb{H}_{in} + O(1)\mathbb{H} + 1\mathbb{H}_{G}$ [9] |
| **Extra P Recursive (Lookup)** | $1\mathbb{H}$ [9] | $O(\log T)\mathbb{H} + O(\ell_{lk}\log T)\mathbb{F}$ [9] | N/A [9] |

*   **Lookup Efficiency vs. HyperNova:** 
    In HyperNova, the lookup accumulation prover is dominated by $O(T)$ field operations, and the verifier is dominated by $O(\ell_{lk} \log T)$ field operations and $O(\log T)$ hashes [7]. In contrast, ProtoStar's lookup accumulation prover complexity is $O(\ell_{lk})$ (independent of $T$), and the verifier is dominated by only $3$ group scalar multiplications, $2$ hashes, and $2$ field multiplications [7].

## References

[1]“File: 4-ProtoStar 2023-620.pdf,” File.