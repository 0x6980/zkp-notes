## Research Problem, Cryptographic Assumptions, and Security Definitions in SuperNova

---

### 1. Main Research Problem and Motivation

* **The Research Problem:** The authors address the challenge of producing succinct cryptographic proofs of correct execution of programs on a stateful machine with a pre-defined instruction set (such as EVM, RISC-V, or Wasm) [1].
* **The Motivation:** A key motivating application is enabling 'replicated systems without replicated execution' or 'rollups' [2]. This allows replicated systems like blockchains to safely outsource transaction processing to centralized, untrusted infrastructure (e.g., the cloud) [2]. The cloud executes the virtual machine with a batch of transactions and produces a succinct proof of correct execution, which the replicated system can verify at a lower cost than executing the transactions itself [2].
* **Limitations of Prior Approaches:** Classic approaches rely on Incrementally Verifiable Computation (IVC) using a single 'universal circuit' that implements the fetch-decode-execute loop of the machine [3]. Consequently, the cost of proving each program step is proportional to the size of the entire universal circuit, even though a given step only invokes one instruction [3]. This makes emulating real-world virtual machines with rich instruction sets extremely expensive [3].
* **SuperNova's Core Contribution:** SuperNova introduces a 'non-uniform IVC' (NIVC) scheme where the cost of proving a program step is proportional only to the size of the circuit representing the specific instruction invoked by that step (an 'a la carte' cost profile) [4] [5].

---

### 2. Cryptographic Assumptions

* **Hardness Assumptions:** Soundness in SuperNova holds under cryptographic hardness assumptions [6].
* **Vector Commitment Scheme:** The construction employs a vector commitment scheme over a finite field $\mathbb{F}$ that is additively homomorphic and provides succinct commitments [7]. For instance, the authors mention the Pedersen commitment scheme, which relies on the hardness of the discrete logarithm problem in cryptographic groups [8].
* **Random Oracle Model:** The security proofs are analyzed in the random oracle model [9]. To instantiate the scheme in the plain model, the authors apply the Fiat-Shamir transformation, heuristically replacing the random oracle with a concrete cryptographic hash function [10].

---

### 3. Security Model

* **Adversarial Capabilities:** The security model considers an adaptive adversary that can choose the control function $\varphi$, the set of functions $(F_1, \dots, F_{\ell})$, and the statement after observing the common reference string (CRS) [11].
* **Security Properties:** The scheme is evaluated against expected polynomial-time (PPT) adversaries to satisfy perfect completeness and knowledge soundness [12] [13].

---

### 4. Formal Security Definitions and Mathematical Conditions

#### Definition 1: Incrementally Verifiable Computation (IVC)
An IVC scheme is defined by PPT algorithms $(\mathcal{G}, \mathcal{P}, \mathcal{V})$ and a deterministic encoder $\mathcal{K}$ with the following interfaces [14]:
* $\mathcal{G}(1^{\lambda}) \rightarrow pp$
* $\mathcal{K}(pp, F) \rightarrow (pk, vk)$
* $\mathcal{P}(pk, (i, z_0, z_i), \omega_i, \Pi_i) \rightarrow \Pi_{i+1}$
* $\mathcal{V}(vk, (i, z_0, z_i), \Pi_i) \rightarrow \{0, 1\}$ [12]

It must satisfy [15]:
* **(i) Perfect Completeness:** For any PPT adversary $\mathcal{A}$:
  $$\Pr \left[ \mathcal{V}(vk, (i + 1, z_0, z_{i+1}), \Pi_{i+1}) = 1 \;\middle|\; \begin{array}{l} pp \leftarrow \mathcal{G}(1^{\lambda}), F, (z_0, z_i, \Pi_i) \leftarrow \mathcal{A}(pp), \\ (pk, vk) \leftarrow \mathcal{K}(pp, F), z_{i+1} \leftarrow F(z_i, \omega_i), \\ \mathcal{V}(vk, i, z_0, z_i, \Pi_i) = 1, \\ \Pi_{i+1} \leftarrow \mathcal{P}(pk, (i, z_0, z_i), \omega_i, \Pi_i) \end{array} \right] = 1$$
* **(ii) Knowledge Soundness:** For any constant $n \in \mathbb{N}$ and expected PPT adversary $\mathcal{P}^*$, there exists an expected PPT extractor $\mathcal{E}$ such that [16]:
  $$\Pr \left[ z_n \neq z, \mathcal{V}(vk, n, z_0, z, \Pi) = 1 \;\middle|\; \begin{array}{l} pp \leftarrow \mathcal{G}(1^{\lambda}), F, (z_0, z, \Pi) \leftarrow \mathcal{P}^*(pp), \\ (pk, vk) \leftarrow \mathcal{K}(pp, F), \\ (\omega_0, \dots, \omega_{n-1}) \leftarrow \mathcal{E}(pp, z_0, z), \\ z_{i+1} \leftarrow F(z_i, \omega_i) \; \forall i \in \{0, \dots, n-1\} \end{array} \right] \le \text{negl}(\lambda)$$
* **(iii) Succinctness:** The size of an IVC proof $\Pi$ is independent of the number of iterations $n$ [17].

#### Definition 2: Vector Commitment Scheme
A commitment scheme for $\mathbb{F}^m$ consists of three protocols [18]:
* $\text{Gen}(1^{\lambda}, m) \rightarrow pp$
* $\text{Com}(pp, x, r) \rightarrow C$
* $\text{Open}(pp, C, x, r) \rightarrow \{0, 1\}$ [18]

It must satisfy [19]:
* **(i) Binding:** For any PPT adversary $\mathcal{A}$:
  $$\Pr \left[ b_0 = b_1 = 1, x_0 \neq x_1 \;\middle|\; \begin{array}{l} pp \leftarrow \text{Gen}(1^{\lambda}, m), (C, x_0, r_0, x_1, r_1) \leftarrow \mathcal{A}(pp), \\ b_0 \leftarrow \text{Open}(pp, C, x_0, r_0), b_1 \leftarrow \text{Open}(pp, C, x_1, r_1) \end{array} \right] = \text{negl}(\lambda)$$
* **(ii) Hiding:** For all PPT adversaries $\mathcal{A} = (\mathcal{A}_0, \mathcal{A}_1)$:
  $$\left| \frac{1}{2} - \Pr \left[ b = \tilde{b} \;\middle|\; (x_0, x_1, st) \leftarrow \mathcal{A}_0(pp), \tilde{b} \leftarrow_R \{0, 1\}, r \leftarrow_R \mathbb{F}, C \leftarrow \text{Com}(pp, x_{\tilde{b}}, r), b \leftarrow \mathcal{A}_1(st, C) \right] \right| = \text{negl}(\lambda)$$

#### Definition 3: Additive Homomorphism
A vector commitment scheme is additively homomorphic if for all $pp$ from $\text{Gen}(1^{\lambda}, m)$, any $x_1, x_2 \in \mathbb{F}^m$, and any $r_1, r_2 \in \mathbb{F}$ [20]:
$$\text{Com}(pp, x_1, r_1) + \text{Com}(pp, x_2, r_2) = \text{Com}(pp, x_1 + x_2, r_1 + r_2)$$

#### Definition 4: Succinctness of Commitments
A commitment scheme provides succinct commitments if for all $pp$ from $\text{Gen}(1^{\lambda}, m)$, any $x \in \mathbb{F}^m$, and $r \in \mathbb{F}$ [21]:
$$|\text{Com}(pp, x, r)| = O_{\lambda}(\text{polylog}(|x|))$$

#### Definition 5: Folding Scheme
A folding scheme for a relation $\mathcal{R}$ consists of algorithms $(\mathcal{G}, \mathcal{K}, \mathcal{P}, \mathcal{V})$ with the interfaces [22]:
* $\mathcal{G}(1^{\lambda}) \rightarrow pp$
* $\mathcal{K}(pp, S) \rightarrow (pk, vk)$
* $\mathcal{P}(pk, (u_1, w_1), (u_2, w_2)) \rightarrow (u, w)$
* $\mathcal{V}(vk, u_1, u_2) \rightarrow u$ [22]

It must satisfy [23]:
* **(i) Perfect Completeness:** For all PPT adversaries $\mathcal{A}$:
  $$\Pr \left[ (pp, S, u, w) \in \mathcal{R} \;\middle|\; \begin{array}{l} pp \leftarrow \mathcal{G}(1^{\lambda}), (S, (u_1, w_1), (u_2, w_2)) \leftarrow \mathcal{A}(pp), \\ (pk, vk) \leftarrow \mathcal{K}(pp, S), (u, w) \leftarrow \langle \mathcal{P}(pk, w_1, w_2), \mathcal{V}(vk) \rangle(u_1, u_2) \end{array} \right] = 1$$
* **(ii) Knowledge Soundness:** For any expected PPT adversary $\mathcal{P}^*$, there exists an expected PPT extractor $\mathcal{E}$ such that [24]:
  $$\Pr \left[ (pp, S, u_1, w_1) \in \mathcal{R}, (pp, S, u_2, w_2) \in \mathcal{R} \;\middle|\; pp \leftarrow \mathcal{G}(1^{\lambda}), (S, u_1, u_2) \leftarrow \mathcal{P}^*(pp), (w_1, w_2) \leftarrow \mathcal{E}(pp) \right] \ge$$
  $$\Pr \left[ (pp, S, u, w) \in \mathcal{R} \;\middle|\; pp \leftarrow \mathcal{G}(1^{\lambda}), (S, u_1, u_2) \leftarrow \mathcal{P}^*(pp), (pk, vk) \leftarrow \mathcal{K}(pp, S), (u, w) \leftarrow \langle \mathcal{P}^*(pk), \mathcal{V}(vk) \rangle(u_1, u_2) \right] - \text{negl}(\lambda)$$
* **(iii) Efficiency:** The communication costs and $\mathcal{V}$'s computation are lower when $\mathcal{V}$ participates in the folding scheme and checks a folded witness than when checking witnesses for each original instance individually [25].

#### Definition 6: Non-interactive Folding Scheme
A folding scheme is non-interactive if the interaction between $\mathcal{P}$ and $\mathcal{V}$ consists of a single message from $\mathcal{P}$ to $\mathcal{V}$ [26].

#### Definition 7: Public Coin Folding Scheme
A folding scheme is public coin if all messages sent from $\mathcal{V}$ to $\mathcal{P}$ are sampled from a uniform distribution [27].

#### Definition 8: R1CS
An R1CS structure over a finite field $\mathbb{F}$ with size bounds $m, n, \ell \in \mathbb{N}$ ($m > \ell$) consists of sparse matrices $A, B, C \in \mathbb{F}^{m \times m}$ [28]. An instance $x \in \mathbb{F}^{\ell}$ is satisfied by a witness $W \in \mathbb{F}^{m - \ell - 1}$ if [28]:
$$(A \cdot Z) \circ (B \cdot Z) = C \cdot Z, \quad \text{where } Z = (W, x, 1)$$

#### Definition 9: Committed Relaxed R1CS
Given a commitment scheme $\text{Com}$, a committed relaxed R1CS instance is a tuple $(\bar{E}, u, \bar{W}, x)$ [29]. It is satisfied by a witness $(E, r_E, W, r_W)$ if $\bar{E} = \text{Com}(pp_E, E, r_E)$, $\bar{W} = \text{Com}(pp_W, W, r_W)$, and [29]:
$$(A \cdot Z) \circ (B \cdot Z) = u \cdot (C \cdot Z) + E, \quad \text{where } Z = (W, x, u)$$

#### Definition 10: Non-uniform IVC (NIVC)
An NIVC scheme is defined by PPT algorithms $(\mathcal{G}, \mathcal{P}, \mathcal{V})$ and a deterministic encoder $\mathcal{K}$ with the interfaces [30]:
* $\mathcal{G}(1^{\lambda}) \rightarrow pp$
* $\mathcal{K}(pp, (\varphi, (F_1, \dots, F_{\ell}))) \rightarrow (pk, vk)$
* $\mathcal{P}(pk, (i, z_0, z_i), \omega_i, \Pi_i) \rightarrow \Pi_{i+1}$
* $\mathcal{V}(vk, (i, z_0, z_i), \Pi_i) \rightarrow \{0, 1\}$ [31]

It must satisfy [13]:
* **(i) Perfect Completeness:** For any PPT adversary $\mathcal{A}$:
  $$\Pr \left[ \mathcal{V}(vk, (i + 1, z_0, z_{i+1}), \Pi_{i+1}) = 1 \;\middle|\; \begin{array}{l} pp \leftarrow \mathcal{G}(1^{\lambda}), (\varphi, (F_1, \dots, F_{\ell})), (z_0, z_i, \omega_i, \Pi_i) \leftarrow \mathcal{A}(pp), \\ (pk, vk) \leftarrow \mathcal{K}(pp, (\varphi, (F_1, \dots, F_{\ell}))), \mathcal{V}(vk, (i, z_0, z_i), \Pi_i) = 1, \\ z_{i+1} \leftarrow F_{\varphi(z_i, \omega_i)}(z_i, \omega_i), \\ \Pi_{i+1} \leftarrow \mathcal{P}(pk, (i, z_0, z_i), \omega_i, \Pi_i) \end{array} \right] = 1$$
* **(ii) Knowledge Soundness:** For any constant $n \in \mathbb{N}$ and expected PPT adversary $\mathcal{P}^*$, there exists an expected PPT extractor $\mathcal{E}$ such that:
  $$\Pr \left[ z_n \neq z, \mathcal{V}(vk, (n, z_0, z), \Pi) = 1 \;\middle|\; \begin{array}{l} pp \leftarrow \mathcal{G}(1^{\lambda}), (\varphi, (F_1, \dots, F_{\ell})), (z_0, z, \Pi) \leftarrow \mathcal{P}^*(pp), \\ (pk, vk) \leftarrow \mathcal{K}(pp, (\varphi, (F_1, \dots, F_{\ell}))), \\ (\omega_0, \dots, \omega_{n-1}) \leftarrow \mathcal{E}(pp), \\ z_{i+1} \leftarrow F_{\varphi(z_i, \omega_i)}(z_i, \omega_i) \; \forall i \in \{0, \dots, n-1\} \end{array} \right] \le \text{negl}(\lambda)$$
* **(iii) Succinctness:** The size of an NIVC proof $\Pi$ is independent of the number of iterations $n$.
* **(iv) Efficiency:** The prover's space and time complexity at any step $i$ is linear in the size of the function applied at step $i$, i.e., $O_{\lambda}(|F_{\varphi(z_{i-1}, \omega_{i-1})}|)$.

## References

[1]“File: 2-SuperNova 2022-1758.pdf,” File.