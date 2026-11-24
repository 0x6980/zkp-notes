Based on the provided paper, the proposed protocol and its mathematical construction for the main folding scheme are detailed below: 

### 1. Definition of Relaxed R1CS
* **Relaxed R1CS Structure**: Defined over a finite field $\mathbb{F}$ with public parameters consisting of size bounds $m, n, \ell \in \mathbb{N}$ where $m > \ell$ [1]. The structure consists of sparse matrices $A, B, C \in \mathbb{F}^{m \times m}$ with at most $n = \Omega(m)$ non-zero entries in each matrix [1].
* **Relaxed R1CS Instance**: Consists of an error vector $E \in \mathbb{F}^m$, a scalar $u \in \mathbb{F}$, and public inputs/outputs $x \in \mathbb{F}^\ell$ [1].
* **Satisfying Witness**: An instance $(E, u, x)$ is satisfied by a witness $W \in \mathbb{F}^{m - \ell - 1}$ if:
  $$(A \cdot Z) \circ (B \cdot Z) = u \cdot (C \cdot Z) + E$$
  where $Z = (W, x, u)$ and $\circ$ represents the Hadamard product [1].
* **NP-Completeness**: Any standard R1CS instance can be expressed as a relaxed R1CS instance by setting $u = 1$ and $E = 0$, thereby retaining NP-completeness [2].

---

### 2. Folding of Two Instances and Witnesses
* **The Mechanism**: To fold two instances $(E_1, u_1, x_1)$ and $(E_2, u_2, x_2)$ with corresponding witnesses $W_1$ and $W_2$, the protocol uses a random challenge $r \in \mathbb{F}$ to linearly combine them while absorbing the quadratic cross-terms into the error vector $E$ [3].
* **Mathematical Combinations**:
  * The combined scalar is $u \leftarrow u_1 + r \cdot u_2$ [3].
  * The combined public input/output is $x \leftarrow x_1 + r \cdot x_2$ [4].
  * The combined witness is $W \leftarrow W_1 + r \cdot W_2$ [5].
  * The combined error vector is updated to accumulate the cross-terms:
    $$E \leftarrow E_1 + r \cdot (A Z_1 \circ B Z_2 + A Z_2 \circ B Z_1 - u_1 C Z_2 - u_2 C Z_1) + r^2 \cdot E_2$$
    where $Z_1 = (W_1, x_1, u_1)$ and $Z_2 = (W_2, x_2, u_2)$ [3].
* **Correctness**: This algebraic formulation ensures that the folded witness $W$ satisfies the folded instance $(E, u, x)$ under the relation $A Z \circ B Z = u \cdot C Z + E$ [6] [7].

---

### 3. Commitment and Inner-Product Components
* **Committed Relaxed R1CS**: To make the folding scheme non-trivial and zero-knowledge, the protocol introduces additively homomorphic commitments to $W$ and $E$ (denoted as $\bar{W}$ and $\bar{E}$), treating the actual vectors and their opening random values as the witness [8] [9]. An instance is represented as $(\bar{E}, u, \bar{W}, x)$ and is satisfied by $(E, r_E, W, r_W)$ such that $\bar{E} = \text{Com}(pp_E, E, r_E)$ and $\bar{W} = \text{Com}(pp_W, W, r_W)$ [9].
* **Polynomial Commitments**: Vector commitments are interpreted as polynomial commitments to $\log m$-variate multilinear polynomials [10]. This requires an inner-product argument protocol to prove the computation between a committed vector and a public vector [10]:
  * **$\text{PC}_{\text{BP}}$**: Uses Pedersen commitments and Bulletproofs as the inner-product argument, achieving $O_\lambda(1)$-sized commitments and $O_\lambda(\log m)$ evaluation proof sizes [11].
  * **$\text{PC}_{\text{Dory}}$**: Uses a two-tiered matrix commitment and Dory's inner-product argument under the SXDH assumption, achieving $O_\lambda(1)$-sized commitments and $O_\lambda(\log m)$ evaluation proof sizes with $O_\lambda(\log m)$ verification time [12].

---

### 4. Verifier/Prover Message Flow
For two committed relaxed R1CS instances $(\bar{E}_1, u_1, \bar{W}_1, x_1)$ and $(\bar{E}_2, u_2, \bar{W}_2, x_2)$ and their witnesses [13]:
1. **Prover's Commitment**: The prover $P$ computes the cross-term vector $T = A Z_1 \circ B Z_2 + A Z_2 \circ B Z_1 - u_1 C Z_2 - u_2 C Z_1$ and sends its commitment $\bar{T} \leftarrow \text{Com}(pp_E, T, r_T)$ to the verifier $V$, where $r_T \leftarrow_R \mathbb{F}$ [14].
2. **Verifier's Challenge**: The verifier $V$ samples and sends a random challenge $r \leftarrow_R \mathbb{F}$ [15].
3. **Folding Step**: Both $P$ and $V$ compute the folded instance $(\bar{E}, u, \bar{W}, x)$ [4]:
   * $\bar{E} \leftarrow \bar{E}_1 + r \cdot \bar{T} + r^2 \cdot \bar{E}_2$
   * $u \leftarrow u_1 + r \cdot u_2$
   * $\bar{W} \leftarrow \bar{W}_1 + r \cdot \bar{W}_2$
   * $x \leftarrow x_1 + r \cdot x_2$
4. **Witness Update**: The prover $P$ outputs the folded witness $(E, r_E, W, r_W)$ [5]:
   * $E \leftarrow E_1 + r \cdot T + r^2 \cdot E_2$
   * $r_E \leftarrow r_{E,1} + r \cdot r_T + r^2 \cdot r_{E,2}$
   * $W \leftarrow W_1 + r \cdot W_2$
   * $r_W \leftarrow r_{W,1} + r \cdot r_W_2$

---

### 5. Main Theorems and Corollaries Claimed
* **Theorem 1**: Asserts the existence of a constant-round, public-coin, zero-knowledge folding scheme for relaxed R1CS with $O_\lambda(N)$ prover work and $O_\lambda(1)$ verifier work and communication [16].
* **Theorem 2**: Claims an IVC scheme where the proof size is $O(|F|)$, the prover's step cost is dominated by two multiexponentiations of size $\approx |F|$, and succinct zero-knowledge proofs of valid IVC proofs are of size $O_\lambda(\log |F|)$ [17].
* **Theorem 3**: Confirms that Construction 1 is a public-coin folding scheme for committed relaxed R1CS with perfect completeness, knowledge soundness, and zero-knowledge [18].
* **Theorem 4**: Establishes that Construction 4 is a zkSNARK of a valid IVC proof [19].
* **Theorem 5**: Defines a polynomial IOP for idealized relaxed R1CS with $O(\log m)$ round complexity, $O(\log m)/|\mathbb{F}|$ soundness error, and $O(n)$ prover operations [20].
* **Theorem 6**: Claims a zkSNARK from $\text{PC}_{\text{BP}}$ in the random oracle model with $O_\lambda(\log n)$ proof length and $O_\lambda(n)$ verifier run time [21].
* **Corollary 1**: Claims a zkSNARK from $\text{PC}_{\text{Dory}}$ under the SXDH assumption with $O_\lambda(\log n)$ proof length and $O_\lambda(\log n)$ verifier run time [22].
* **Corollary 2**: Claims a non-interactive zero-knowledge argument of knowledge for committed relaxed R1CS with $O_\lambda(\log m)$ proof length and $n + O_\lambda(m)$ verifier run time [23].

## References

[1]“File: nova 2021-370.pdf,” File.