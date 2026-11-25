## HyperNova Technical Construction

### 1. Customizable Constraint Systems (CCS)
* **Relation and Formats**: A Customizable Constraint System (CCS) simultaneously generalizes Plonkish, R1CS, and AIR without overheads [1]. 
* **CCS Structure**: An $\mathcal{R}_{\text{CCS}}$ structure $s$ is defined over size bounds $m, n, N, \ell, t, q, d \in \mathbb{N}$ (where $n > \ell$, $s = \log m$, and $s' = \log n$) and consists of [1]:
  * A sequence of sparse multilinear polynomials $\widetilde{M}_1, \dots, \widetilde{M}_t$ that evaluate to a non-zero value in at most $N = \Omega(m)$ locations over the Boolean hypercube $[2]$.
  * A sequence of $q$ multisets $[S_1, \dots, S_q]$, where each element is from the domain $\{1, \dots, t\}$ and the cardinality of each multiset is at most $d$ $[2]$.
  * A sequence of $q$ constants $[c_1, \dots, c_q]$ from $\mathbb{F}$ $[2]$.
* **CCS Instance and Witness**: An $\mathcal{R}_{\text{CCS}}$ instance consists of a public input/output vector $x \in \mathbb{F}^{\ell}$ $[3]$. The witness consists of a multilinear polynomial $\widetilde{w}$ in $s' - 1$ variables $[3]$. The relation holds if and only if for all $x \in \{0, 1\}^s$ $[3]$:
  $$\sum_{i=1}^{q} c_{i} \cdot \left( \prod_{j \in S_{i}} \left( \sum_{y \in \{0,1\}^{\log m}} \widetilde{M}_{j}(x, y) \cdot \widetilde{z}(y) \right) \right) = 0$$ [4]

---

### 2. Linearized Committed CCS (LCCS)
* **LCCS Structure and Instance**: To enable folding, HyperNova defines a linearized committed variant of CCS (LCCS) [5]. An $\mathcal{R}_{\text{LCCS}}$ instance is represented as a tuple $(u, x, r, v_1, \dots, v_t) \in (\mathbb{F}, \mathbb{F}^{\ell}, \mathbb{F}^s, \mathbb{F}^t)$ [6].
* **LCCS Relation**: The relation holds with witness $\widetilde{w}$ if and only if for all $i \in [t]$ [6]:
  $$v_{i} = \sum_{y \in \{0,1\}^{s'}} \widetilde{M}_{i}(r, y) \cdot \widetilde{z}(y)$$ [7]

---

### 3. The Multi-Folding Scheme
* **Definition**: A multi-folding scheme generalizes standard folding schemes to reduce the task of checking $\mu$ instances in relation $\mathcal{R}_1$ and $\nu$ instances in relation $\mathcal{R}_2$ (under a predicate $\text{compat}$) into checking a single instance in $\mathcal{R}_1$ [8].
* **HyperNova Instantiation**: HyperNova instantiates this for $\mathcal{R}_1 = \mathcal{R}_{\text{LCCCS}}$ (Linearized Committed CCS) and $\mathcal{R}_2 = \mathcal{R}_{\text{CCCCS}}$ (Committed CCS) with $\text{compat}(s_1, s_2)$ requiring $s_1 = s_2$ [9].

---

### 4. Prover and Verifier Interactions & Sum-Check Role
* **High-Level Strategy**: The prover and verifier encode the relation claims as polynomial evaluations and reduce them using the sum-check protocol [10].
* **Sum-Check Reductions**: To assist the verifier, the prover computes and transmits the claimed internal sum values $\sigma_i$ and $\theta_i$ for all $i \in [t]$ [11] [12]:
  $$\sigma_{i} \leftarrow \sum_{y \in \{0,1\}^{s'}} \widetilde{M}_{i}(r'_{x}, y) \cdot \widetilde{z}_{1}(y)$$
  $$\theta_{i} \leftarrow \sum_{y \in \{0,1\}^{s'}} \widetilde{M}_{i}(r'_{x}, y) \cdot \widetilde{z}_{2}(y)$$ [12]
* **Random Challenge**: By linearity, the verifier samples a random challenge $\rho$ to reduce the check of both equations to a single combined check [13]:
  $$\sigma_{i} + \rho \cdot \theta_{i} = \sum_{y \in \{0,1\}^{s'}} \widetilde{M}_{i}(r'_{x}, y) \cdot (\widetilde{z}_{1}(y) + \rho \cdot \widetilde{z}_{2}(y))$$ [14]

---

### 5. Production of the Folded Instance
* **Algorithmic Flow**: The final folded linearized committed CCS instance $(C, u, x, r'_x, v_1, \dots, v_t)$ is produced by combining the instances using the random challenge $\rho$ [15]:
  $$C \leftarrow \sum_{k \in [\mu]} \rho^{k} \cdot L_{k,\phi}.C + \sum_{k \in [\nu]} \rho^{\mu+k} \cdot C_{k,\phi}.C$$
  $$u \leftarrow \sum_{k \in [\mu]} \rho^{k} \cdot L_{k,\phi}.u + \sum_{k \in [\nu]} \rho^{\mu+k} \cdot 1$$
  $$x \leftarrow \sum_{k \in [\mu]} \rho^{k} \cdot L_{k,\phi}.x + \sum_{k \in [\nu]} \rho^{\mu+k} \cdot C_{k,\phi}.x$$
  $$v_{j} \leftarrow \sum_{k \in [\mu]} \rho^{k} \cdot \sigma_{j,k} + \sum_{k \in [\nu]} \rho^{\mu+k} \cdot \theta_{j,k}$$ [16]