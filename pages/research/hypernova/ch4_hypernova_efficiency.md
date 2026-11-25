## Complexity and Efficiency Analysis of HyperNova

### Asymptotic Complexity and Bounds

* **Multi-Folding Scheme for CCS (Theorem 1)**:
  * **Prover Time**: Requires $O(N + t \cdot m + q \cdot m \cdot d \cdot \log^2 d)$ finite field operations [1] and $O(1)$ group operations [2].
  * **Verifier Time**: Requires $O(d \cdot \log m)$ finite field operations and $O(1)$ group operations [3].
  * **Communication Complexity**: Requires $O(d \cdot \log m)$ finite field elements [4].

* **HyperNova with CycleFold (Theorem 2)**:
  * **Prover Time per Step**: Dominated by a single multi-scalar multiplication (MSM) of size $O(n_\varphi + n_j)$ [5] and $O((N_\varphi + N_j) + (t_\varphi + t_j) \cdot (m_\varphi + m_j) + (q_\varphi + q_j) \cdot (m_\varphi + m_j) \cdot d \cdot \log^2 d)$ finite field operations [6].
  * **Verifier Circuit Size**: The verifier circuit size is $o(|\varphi| + 2 \cdot G + (d \cdot \log m_j) \cdot F + \log m_j \cdot R_d + 2 \cdot H_{\ell, t_j} + 2 \cdot M)$ on the first curve, and $G$ on the second curve in a cycle of elliptic curves [7] [8].

---

### Architectural Concepts and Benefits

* **A-la-Carte Cost Profile**: In Non-Uniform Incrementally Verifiable Computation (NIVC), the prover's work at any step $i$ scales proportionally only to the size of the specific invoked instruction circuit $|F_j|$, rather than the sum of all supported instruction circuits $|F_1| + \dots + |F_\ell|$ [9].
* **Multi-Folding Benefits**: The prover's cryptographic cost is reduced to a single MSM of size equal to the number of variables in the constraint system [10]. Additionally, the scheme can fold multiple instances at once, which simplifies building generalizations of IVC such as Proof-Carrying Data (PCD) [11].

---

### Implementation and Comparative Results

* **CycleFold Circuit Size Reduction**: CycleFold uses the second curve in the cycle to represent a single scalar multiplication, requiring only $\approx 1,000$ multiplication gates and $\approx 4,000$ non-zero entries in R1CS matrices [12]. This is a significant reduction compared to Nova's prior state-of-the-art verifier circuit on the second curve, which requires $\approx 10,000$ multiplication gates [13]. Concretely, the auxiliary circuit size $C_{EC}$ is small, containing $\approx 1,000 - 1,500$ multiplication gates [14].
* **Comparison with Protostar**:
  * **Scalar Multiplications**: When folding two instances, Protostar's verifier circuit performs three group scalar multiplications, whereas HyperNova performs only one [15] [16].
  * **Hashing Overhead**: HyperNova performs $O(d \cdot \log m)$ hashes (where $d$ is the constraint degree and $m$ is the number of constraints folded), whereas Protostar performs $O(d)$ hashes [17].
  * **Folding Capacity**: HyperNova can fold $k > 2$ instances at once, whereas Protostar is limited to folding only two instances at once [18] [19].