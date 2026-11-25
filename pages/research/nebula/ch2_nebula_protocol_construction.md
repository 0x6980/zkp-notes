## Nebula: Protocol and Mathematical Construction

### 1. Commitment-Carrying IVC (CC-IVC)
Commitment-carrying incrementally verifiable computation (CC-IVC) is a primitive designed to carry an incremental commitment to the prover's non-deterministic advice across different steps of an IVC execution [1]. Formally, a CC-IVC scheme is defined by the PPT algorithms $(G, K, P, V)$ and a deterministic polynomial-time encoder $\mathcal{K}$ [1]:
* **$G(1^\lambda, N) \rightarrow pp$**: Takes a security parameter $\lambda$ and size bounds $N$, and samples public parameters $pp$ (which includes $pp_{IC} \leftarrow IC.Gen$) [2].
* **$K(pp, F) \rightarrow (pk, vk)$**: Takes public parameters $pp$ and a step function $F$, and deterministically outputs a prover key $pk$ and a verifier key $vk$ [3].
* **$P(pk, (i, z_0, z_i, [C_i]), \omega_i, \Pi_i) \rightarrow \Pi_{i+1}$**: Takes the prover key $pk$, a step counter $i$, initial input $z_0$, initial commitment $C_0 = \perp$, claimed output $z_i$, claimed commitment $C_i$, non-deterministic advice $\omega_i$, and an IVC proof $\Pi_i$. It produces a new proof $\Pi_{i+1}$ attesting that $z_{i+1} = F(z_i, \omega_i)$ and $C_{i+1} = IC.Commit(pp_{IC}, C_i, \omega_i)$ [4].
* **$V(vk, (i, z_0, z_i, [C_i]), \Pi_i) \rightarrow \{0, 1\}$**: Takes the verifier key $vk$, counter $i$, initial input $z_0$, claimed output $z_i$, claimed commitment $C_i$, and proof $\Pi_i$, and outputs $1$ if the proof is accepting, and $0$ otherwise [5].

---

### 2. Incremental Commitment and Multiset-Hash Mechanism
An incremental commitment scheme $IC$ is defined by the tuple of algorithms $(Gen, Commit, Open)$ [6]:
* **$Gen(\lambda) \rightarrow pp$**: Produces public parameters $pp$ given the security parameter $\lambda$ [7].
* **$Commit(pp, C_i, \omega_i) \rightarrow C_{i+1}$**: Updates a prior commitment $C_i$ (with $C_0 = \perp$) using a new message $\omega_i$ to output $C_{i+1}$ [8].
* **$Open(pp, C_{i+1}, [\omega_0, \dots, \omega_i]) \rightarrow \{0, 1\}$**: Verifies a commitment $C_{i+1}$ against a sequence of messages $[\omega_0, \dots, \omega_i]$ [9].

To verify memory consistency, Nebula uses a randomized public-coin multiset hash (fingerprint) [10]. For a multiset $S = \{e_1, \dots, e_n\}$ where each element is a 3-tuple $e_i = (a_i, v_i, t_i)$ from a finite field $\mathbb{F}$, and given public-coin challenges $\gamma_1, \gamma_2 \in \mathbb{F}$, the multiset hash is computed as [10]:
$$\prod_{i=1}^n (a_i + \gamma_1 \cdot v_i + t_i \cdot \gamma_1^2 - \gamma_2)$$

---

### 3. Read-Write Memory Argument
Nebula maintains three multisets: the initial set ($IS$), the read set ($RS$), and the write set ($WS$) [11]. For an $M$-sized memory, $IS$ is initialized with tuples $(i, v_i, it_i)$ for all $i \in [M]$, where $v_i$ is the initial value and $it_i$ is the initial timestamp (typically 0) [11]. $RS$ and $WS$ are initialized to empty sets [11].

* **Read Operation at address $a$** (with untrusted memory returning value-timestamp pair $(v, t)$) [12]:
  1. $ts \leftarrow ts + 1$
  2. Assert $t < ts$
  3. $RS \leftarrow RS \cup \{(a, v, t)\}$
  4. Store $(v, ts)$ at address $a$ in untrusted memory
  5. $WS \leftarrow WS \cup \{(a, v, ts)\}$
* **Write Operation at address $a$** (writing value $v'$, with untrusted memory returning value-timestamp pair $(v, t)$) [13]:
  1. $ts \leftarrow ts + 1$
  2. Assert $t < ts$
  3. $RS \leftarrow RS \cup \{(a, v, t)\}$
  4. Store $(v', ts)$ at address $a$ in untrusted memory
  5. $WS \leftarrow WS \cup \{(a, v', ts)\}$

---

### 4. Universal Switchboard Circuit
To support non-uniform IVC efficiently, Nebula constructs a universal "switchboard" circuit $C^*$ from $\ell$ different R1CS subcircuits $C_i = (A_i, B_i, C_i)$ of dimensions $m_i \times n_i$ [14]. 
* **Stitching Submatrices**: The stitched matrices $A^*, B^*, C^*$ have $m = \sum_{i=1}^\ell m_i + 1 + \ell \cdot (1 + |x|)$ rows and $n = 1 + |x| + \sum_{i=1}^\ell n_i$ columns, where $|x|$ is the size of the public input [15].
* **Switch Constraints**: Let $z$ be the witness vector of length $1 + |x| + \sum_{i=1}^\ell n_i$, and let $s_i = 1 + |x| + \sum_{j=1}^{i-1} n_j$ be the index of the first column of each subcircuit matrix [16]. Inactive circuits are "turned off" by enforcing the following constraints [16]:
  1. *Single switch constraint*: $\sum_{i=1}^\ell z[s_i] = 1$ [17].
  2. *Binary switch constraints*: For $i \in [1, \ell]$, $z[s_i] \cdot (1 - z[s_i]) = 0$ [18].
  3. *Input consistency constraints*: For $i \in [1, \ell]$ and $j \in [1, |x|]$, $z[j] = z[s_i] \cdot z[s_i + j]$ [19].

---

### 5. Composition into Nebula
Nebula composes these components into a three-layer architecture [20] [21] [22]:
* **Layer 1**: Uses CC-IVC to execute the step function $F$ and carry untrusted advice (two address-value-timestamp tuples per memory operation) [20].
* **Layer 2**: Finalizes the Layer 1 proof $\Pi_F$ by computing multiset hashes underneath the final commitment $C_n$ to validate sequential consistency [21].
* **Layer 3**: Folds the IVC proofs to restore incrementality, allowing the prover to continue updating the proof beyond $n$ iterations [22].

---

### 6. Main Theorems and Lemmas
* **Theorem 5 (CC-IVC from folding schemes)**: Construction 2 is a CC-IVC scheme [23].
* **Lemma 6 (Overheads of CC-IVC over IVC)**: The size of a CC-IVC proof is larger by two commitments and a hash value compared to Nova's IVC [24].
* **Corollary 8**: Establishes that if the untrusted memory returns the last written tuple, then there exists a final set $FS$ such that the multiset equality holds with probability 1 over the choice of public-coin challenges $\gamma_1, \gamma_2 \in \mathbb{F}$ [25].
* **Theorem 9**: Nebula is an IVC scheme with sequential consistency semantics [26].
* **Lemma 10**: If the switchboard circuit $C^*$ is satisfied by a witness $\omega^*$, then a subcircuit $C_k$ is satisfied by a parsed witness $\omega$ for input $x$ [27].
* **Theorem 11**: Combining the switchboard circuit $C^*$ with Nova's uniform IVC scheme yields a non-uniform IVC scheme that can execute any number of functions per recursive step [28].

## References

[1]“File: 5-Nebula 2024-1605.pdf,” File.