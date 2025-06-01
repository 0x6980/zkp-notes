# The Jagged Assist: Delegating MLE Computations
A well known fact in the proofsystem literature, is that a prover can assist a verifier to reduce a large number $K = 2^k$ of claimed evaluations of a multilinear extension $\tilde{f}$ of a function $f$, to a single evaluation of $\tilde{f}$.

Using this approach, rather than having the verifier evaluate $\tilde{g}$ on the $2^k$ inputs, we can delegate this computation to the prover and reduce the cost to a single evaluation of $\tilde{g}$.

In this section we show how a prover can prove to a verifier the correctness of some $k$ evaluations of a multilinear  polynomial $h : \mathbb{F}^m \rightarrow\mathbb{F}$, so that the verifier only need to evaluate the polynomial at one point.

## Lemma 1.
Let $h : \mathbb{F}^m \rightarrow\mathbb{F}$ be a multilinear polynomial. There exists an $m$-round public-coin
interactive proof for the language
$$
\{\big((x_1, \dots, x_K), (y_1, \dots, y_K)\big) \in (\mathbb{F}^m)^K \times \mathbb{F}^K : \forall i\in [K], \tilde{f}(x_i) = y_i\},
$$
with soundness error $\frac{2}{|\mathbb{F}^m|}$. The prover needs to evaluate $h$ on $\mathrm{O}(m · K)$ points and additionally does $\mathrm{O}(m · K)$ arithmetic operations. The verifier needs to do only a single evaluation of $\tilde{h}$ and in addition does $\mathrm{O}(m · K)$ arithmetic operations.

Furthermore, in round $j \in [m]$ the prover only needs to evaluate $h$ on the points $\{(\rho, \lambda, x_i[j +1, \dots, m])\}_{\lambda\in\Lambda}$, where $\rho \in\mathbb{F}^{j-1}$ is the randomness sent by the verifier in the previous rounds and $\Lambda$ is a set of three distinct field elements.

Proof. Let $\big((x_1, \dots, x_k), (y_1, \dots, y_k)\big)\in(\mathbb{F}^m)^k \times \mathbb{F}^k$ be an input. Recall that the goal is to check
that $h(x_i) = y_i$, for every $i \in [k]$. As its first step, the verifier chooses at random $r1, \mathbb{F}, r_k \in \mathbb{F}$ and the claim is reduced to checking that:
$$
\sum_{i\in[k]}r_i · h(x_i) = \sum_{i\in[k]}r_i · y_i
$$
Note that in case the original claim was false, with probability $1−\frac{1}{|\mathbb{F}|}$, the new claim is also false.
The right hand side of the above equation can be computed directly by the verifier using $\mathrm{O}(k)$ field operations. For the left hand side, using the definition of the multilinear equation, we can rewrite it as:
$$
\sum_{i\in[k]}r_i \sum_{b\in\{0,1\}^m} eq(b, x_i) · h(b) = \sum_{b\in\{0,1\}^m} h(b) \sum_{i\in[k]}r_i · eq(b, x_i).
$$
Thus, the prover and verifier engage in the sumcheck protocol, to compute $\sum_{b\in\{0,1\}^m} P(b)$, where 
$$
P(b) = h(b) \sum_{i\in[k]} r_i · eq(b, x_i).
$$
Completeness and soundness follow immediately from the sum-check protocol, and so we proceed to an accounting of the prover and verifier costs.

For the verifier, the sum-check protocol itself only requires $\mathrm{O}(m)$ arithmetic operations. At the end of the sum-check, the verifier needs to compute $P(\rho) = h(\rho) \sum_{i\in[k]}r_i · eq(\rho, x_i)$, where $\rho\in\mathbb{F}^m$ is the verifier’s randomness in the sum-check protocol. Thus, the verifier only needs to perform a single evaluation of $h$ plus an additional $\mathrm{O}(k · m)$ arithmetic work to compute $\sum_{i\in[k]}r_i · eq(\rho, x_i)$.

We next turn to the prover cost. Let $\Lambda$ be a set of three distinct field elements to be used as the evaluation points in the sum-check protocol. In the $j$-th round of sum-check, for $j \in [m]$, a sequence $\rho\in\mathbb{F}^{j−1}$ will have already been fixed by the verifier challenges from the previous rounds. To compute its $j$-th message, the prover needs to compute for every $\lambda\in\Lambda$:
$$
\begin{aligned}
    \sum_{b\in\{0,1\}^{m-j}} P(\rho, \lambda, b) &= \sum_{i\in[k]}r_i\sum_{b\in\{0,1\}^{m-j}}h(\rho, \lambda, b).eq\big((\rho, \lambda, b), x_i\big)\\
    &= \sum_{i\in[k]}r_i.eq\big((\rho, \lambda), x_i[1, \dots, j]\big) \sum_{b\in\{0,1\}^{m-j}}h(\rho, \lambda, b).eq(b, x_i[j+1, \dots, m])\\
    &= \sum_{i\in[k]}r_i.eq\big((\rho, \lambda), x_i[1, \dots, j]\big) . h(\rho, \lambda, x_i[j+1, \dots, m])\\
\end{aligned}
$$
Thus, the $j$-th round message can be computed using $k$ evaluations of $h$ and an additional $\mathrm{O}(k)$ arithmetic work (by reusing the partial evaluation of $eq$ from the previous round). The furthermore part of the lemma follows immediately from the construction.

## Theorem 1
Let $\tilde{f} : \mathbb{F}^m \rightarrow\mathbb{F}$ be a multilinear polynomial. Then, there exists an $m$-round public-coin interactive proof for the language
$$
\{\big((x_1, \dots, x_K), (y_1, \dots, y_K)\big) \in (\mathbb{F}^m)^K \times \mathbb{F}^K : \forall i\in [K], \tilde{f}(x_i) = y_i\},
$$
in which the prover and verifier only have oracle access to $\tilde{f}$, with soundness error $\frac{2}{|\mathbb{F}^m|}$. The prover needs to evaluate $f$ on $\mathrm{O}(m · K)$ points and additionally does $\mathrm{O}(m · K)$ arithmetic operations. The verifier needs to do only a single evaluation of $\tilde{f}$ and in addition does $\mathrm{O}(m · K)$ arithmetic operations.

Furthermore, in case $f$ is computable by a width $w$ read-once branching program, given explicit access to this program, the prover can be implemented using $\mathrm{O}(m·w2·(K+w))$ arithmetic operations.

Using the algorithm of **Matrix Branching Program Lemma** to produce the prover messages within the protocol of Lemma 1 yields the furthermore part of Theorem 1.