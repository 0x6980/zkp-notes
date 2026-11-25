## SuperNova Protocol and Mathematical Construction

SuperNova is a recursive proof system designed for incrementally proving the correct execution of programs on stateful machines with a custom instruction set without relying on universal circuits.

---

### 1. Non-Uniform Incremental Verifiable Computation (NIVC)

SuperNova formalizes and realizes **Non-Uniform IVC (NIVC)**, which generalizes standard IVC to support a collection of different functions rather than a single uniform step function [1].

* **Computational Model**: NIVC is defined over a collection of $\ell + 1$ non-deterministic, polynomial-time computable functions $(\{F_1, \dots, F_\ell\}, \varphi)$, where $\ell \ge 1$ [2].
* **Function Signatures**: Each function $F_j$ (for $1 \le j \le \ell$) takes $s$ inputs and produces $s$ outputs, and can accept an arbitrary non-deterministic input [2].
* **Control Function**: $\varphi$ is a function taking $s$ inputs and non-deterministic input to output a selector index in $\mathbb{Z}^*_{\ell+1}$ (the set $\{1, \dots, \ell\}$) [2]. Each of these $\ell + 1$ functions is specified using R1CS [3].
* **NIVC Interface**: The NIVC scheme consists of the following PPT algorithms and deterministic encoder [1]:
  * $\mathcal{G}(1^\lambda) \rightarrow pp$: Samples public parameters $pp$ [4].
  * $\mathcal{K}(pp, (\varphi, (F_1, \dots, F_\ell))) \rightarrow (pk, vk)$: Produces the prover key $pk$ and verifier key $vk$ [5].
  * $\mathcal{P}(pk, (i, z_0, z_i), \omega_i, \Pi_i) \rightarrow \Pi_{i+1}$: Produces a new proof $\Pi_{i+1}$ attesting to $z_{i+1} = F_{\varphi(z_i, \omega_i)}(z_i, \omega_i)$ [6].
  * $\mathcal{V}(vk, (i, z_0, z_i), \Pi_i) \rightarrow \{0, 1\}$: Outputs $1$ if the proof $\Pi_i$ is accepting, and $0$ otherwise [7].

---

### 2. Committed Relaxed R1CS and Shape Commitments

To enable folding of instances representing different steps, SuperNova utilizes a variant of R1CS called **Committed Relaxed R1CS** [8].

* **Structure**: Defined over a finite field $\mathbb{F}$ with size bounds $m, n, \ell \in \mathbb{N}$ (where $m > \ell$) and sparse matrices $A, B, C \in \mathbb{F}^{m \times m}$ [8].
* **Instance**: A committed relaxed R1CS instance is represented as a tuple $(\bar{E}, u, \bar{W}, x)$, where $\bar{E}$ and $\bar{W}$ are vector commitments, $u \in \mathbb{F}$ is a scaling factor, and $x \in \mathbb{F}^\ell$ represents public inputs and outputs [8].
* **Relation**: The instance is satisfied by a witness $(E, r_E, W, r_W)$ if [8]:
  $$\bar{E} = \text{Com}(pp_E, E, r_E)$$
  $$\bar{W} = \text{Com}(pp_W, W, r_W)$$
  $$(A \cdot Z) \circ (B \cdot Z) = u \cdot (C \cdot Z) + E$$
  where $Z = (W, x, u)$ [8].
* **Commitment Scheme**: SuperNova employs additively homomorphic vector commitments that provide succinct commitments (e.g., the Pedersen commitment scheme) [9].

---

### 3. Folding Scheme and Circuit Selection Mechanism

SuperNova uses a non-interactive folding scheme ($\text{NIFS}$) to fold instances of committed relaxed R1CS [10] [11].

* **The Multi-Instance Approach**: Standard folding requires instances to share the same structure [12]. To support non-uniform steps, SuperNova maintains a list $U_i$ of $\ell$ running instances, where each $U_i[j]$ represents the accumulated running instance for the $j$-th instruction circuit [13] [14].
* **Selector Mechanism**: At step $i$, the control function $\varphi$ determines which instruction $pc_{i+1}$ is executed next [15]. The verifier circuit folds the incoming step instance $u_i$ into the appropriate running instance $U_i[pc_i]$ corresponding to the instruction executed in the prior step [16] [17].

---

### 4. Recursion and Component Composition

SuperNova composes these components inside an **augmented function** $F'_j$ which wraps each instruction circuit $F_j$ and performs the recursive folding bookkeeping [18] [14].

#### Augmented Function $F'_j$ Construction [19]
Given inputs $(vk, U_i, u_i, pc_i, (i, z_0, z_i), \omega_i, \bar{T})$:
1. **Compute Next PC**: $pc_{i+1} \leftarrow \varphi(z_i, \omega_i)$ [19].
2. **Compute Next Step**: $z_{i+1} \leftarrow F_j(z_i, \omega_i)$ [19].
3. **Base Case ($i = 0$)**: Instantiates $U_{i+1} \leftarrow [u_\perp]^\ell$ and checks that $z_0 = z_i$ [19].
4. **Recursive Case ($i > 0$)**:
   * Checks that $u_i.x = \text{hash}(vk, i, pc_i, z_0, z_i, U_i)$ [19].
   * Checks that $1 \le pc_i \le \ell$ and that $u_i$ is a fresh R1CS instance (i.e., $(u_i.\bar{E}, u_i.u) = (u_\perp.\bar{E}, 1)$) [19].
   * Updates the running instance list: $U_{i+1} \leftarrow U_i$ and $U_{i+1}[pc_i] \leftarrow \text{NIFS}.\mathcal{V}(vk[pc_i], U_i[pc_i], u_i, \bar{T})$ [19].
5. **Output**: $x \leftarrow \text{hash}(vk, i + 1, pc_{i+1}, z_0, z_{i+1}, U_{i+1})$ [19].

#### Prover Algorithm $\mathcal{P}$ [20]
1. Parses proof $\Pi_i$ as $((U_i, W_i), (u_i, w_i), pc_i)$ [20].
2. If $i = 0$, initializes $(U_{i+1}, W_{i+1}, \bar{T}) \leftarrow ([u_\perp]^\ell, [w_\perp]^\ell, u_\perp.\bar{E})$ [20].
3. If $i > 0$, sets $U_{i+1} \leftarrow U_i, W_{i+1} \leftarrow W_i$ and updates the folded pair: $(U_{i+1}[pc_i], W_{i+1}[pc_i]) \leftarrow \text{NIFS}.\mathcal{P}(pk[pc_i], (U_i[pc_i], W_i[pc_i]), (u_i, w_i))$ [20].
4. Computes $pc_{i+1} \leftarrow \varphi(z_i, \omega_i)$ [20].
5. Generates the next step's trace: $(u_{i+1}, w_{i+1}) \leftarrow \text{trace}(F'_{pc_{i+1}}, (vk, U_i, u_i, pc_i, (i, z_0, z_i), \omega_i, \bar{T}))$ [20].
6. Outputs $\Pi_{i+1} \leftarrow ((U_{i+1}, W_{i+1}), (u_{i+1}, w_{i+1}), pc_{i+1})$ [20].

#### Verifier Algorithm $\mathcal{V}$ [21]
* For $i = 0$, checks $z_i = z_0$ [21].
* For $i > 0$, parses $\Pi_i$ and checks [21]:
  * $u_i.x = \text{hash}(vk, i, pc_i, z_0, z_i, U_i)$ [21].
  * $1 \le pc_i \le \ell$ and $(u_i.\bar{E}, u_i.u) = (u_\perp.\bar{E}, 1)$ [21].
  * All running instances $(U_i[j], W_i[j])$ satisfy the structure $S(F'_j)$ for $j \in [\ell]$ [21].
  * $w_i$ is a satisfying witness to $u_i$ with structure $S(F'_{pc_i})$ [21].

---

### 5. Theoretical Properties and Efficiency

* **Completeness**: Construction 1 is an NIVC scheme satisfying perfect completeness (Lemma 2) [22].
* **Knowledge Soundness**: Construction 1 satisfies knowledge soundness under the specified extractor definitions (Lemma 3) [23].
* **Efficiency (Lemma 4)**: When instantiated with the Pedersen commitment scheme, the size of each augmented circuit $F'_j$ is given by [24]:
  $$|F'_j| = |\varphi| + |F_j| + o(2 \cdot G + 2 \cdot H + R)$$
  where $|F_j|$ and $|\varphi|$ are the R1CS constraints for $F_j$ and $\varphi$, $G$ is the cost of a group scalar multiplication, $H$ is the cost of a hash, and $R$ is the cost of encoding the random oracle $p$ [24].

## References

[1]“File: 2-SuperNova 2022-1758.pdf,” File.