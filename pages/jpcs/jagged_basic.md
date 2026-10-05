# Jagged Basic
In previous section we talked about jagged function, non-zero part of jagged function, admissible sequence of cumulative heights, bijection, and dense and sparse representation and the commitment of jagged function.

Recall that, our goal is to efficiently commit to the multilinear extension $\tilde{p} : \mathbb{F}^{n+k} \rightarrow \mathbb{F}$ of $p$ (i.e., the unique multilinear polynomial that agrees with $p$ on $\{0, 1\}^{n+k}$).

Let $p, k\in\mathbb{N}$. We consider a jagged polynomial $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$ with heights $\big\{h_y\in[0,\dots, 2^n − 1]\big\}_{y\in\{0,1\}^k}$. Let $t = \big\{t_y \in \{0, 1\}^m\big\}_{y\in\{0,1\}^k}$ be a admissible sequence of cumulative heights and let $\tilde{q} : \mathbb{F}^m \rightarrow \mathbb{F}$ be the corresponding dense representation of $\tilde{p}$. Recall that $\tilde{p} = sparse(\tilde{q}, t)$. Given $t$, there is a bijection $i \mapsto (row_t(i), col_t(i))$ between $\{0, 1\}^m$ and the non-zero part of $p$ via two functions $row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n$ and $col_t : \{0, 1\}^m \rightarrow \{0, 1\}^k$.

Our goal is to reduce an evaluation claim of the form $\tilde{p}(z_r, z_c) = v$, where $z_r \in \mathbb{F}^n$, $z_c \in \mathbb{F}^k$ and $v \in \mathbb{F}$ to an evaluation claim on $\tilde{q}$. To do so, observe that:
$$
\begin{align}
    \tilde{p}(z_r, z_c) &= \sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)
\end{align}
$$
where the first equality (1) is by the definition of the multilinear extension, and the second (2) by
- The fact that $p$ is a jagged function,
- The definition of $q$ which is, for any $i\in \{0,1\}^m$, $q(i) = p(row_t(i), col_t(i))$ and 
- The bijection between $\{0, 1\}^m$ and the non-zero part of $p$.
We can remove all terms in the sum (1) which $p(x, y) = 0$. Because not effects on summation. And new summation would be like
$$
\begin{aligned}
    \sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c) = \sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k\\ p(x,y)\neq 0}} p(x, y)·eq(x, z_r)·eq(y, z_c)
\end{aligned}
$$
on other hand side, expressions $x\in\{0, 1\}^n, y\in\{0, 1\}^k, p(x,y)\neq 0$ is equal to non-zero part of $p$ which has a bijection with $\{0,1\}^m$. Then using the definition of $q$ which is, for any $i\in \{0,1\}^m$, $q(i) = p(row_t(i), col_t(i))$, we get the equality (2). Note that $row_t(i)\in\{0,1\}^n$ will play as $x\in\{0, 1\}^n$ and $col_t(i)\in\{0, 1\}^k$ will play as $y\in\{0, 1\}^k$.

## Define $f_t$
Define a function $f_t : \{0, 1\}^n \times \{0, 1\}^k \times \{0, 1\}^m \rightarrow \{0, 1\}$ such that $f_t(z_r, z_c, i) = 1$ if and only if $row_t(i) = z_r$ and $col_t(i) = z_c$. We next show that for every index $i \in \{0, 1\}^m$ and $z_r \in \mathbb{F}^n$ and $z_c \in \mathbb{F}^k$, it holds that
$$
\begin{align}
    \tilde{f}_t(z_r, z_c, i) = eq(row_t(i), z_r) · eq(col_t(i), z_c),
\end{align}
$$
where $\tilde{f}_t$ is the multilinear extension of $f_t$.

Let's look at the definition of $eq(x, y)$
$$
\begin{aligned}
\begin{split}
eq(x, y) :=& \prod_{j=1}^{s}\big(x_jy_j+(1-x_j)(1-y_j)\big)
\end{split}
\end{aligned}
$$
in above equation if $x = y$, then for each $j$ we have
$$
\begin{aligned}
\begin{split}
\big(x_jy_j+(1-x_j)(1-y_j)\big) &= \big(x_jx_j+(1-x_j)(1-x_j)\big)\\
&=x_jx_j + 1 + x_jx_j - 2x_jx_j\\
&=1
\end{split}
\end{aligned}
$$
then for $x=y$,
$$
\begin{aligned}
\begin{split}
eq(x, y) :=& \prod_{j=1}^{s} 1\\
=& 1
\end{split}
\end{aligned}
$$
Now, consider the definition of $f_t(z_r, z_c, i) = 1$ if and only if $row_t(i) = z_r$ and $col_t(i) = z_c$. Then,
$$
\begin{aligned}
\begin{split}
eq(row_t(i), z_r) :=& \prod_{j=1}^{k}1 = 1\\
eq(col_t(i), z_c) :=& \prod_{j=1}^{n}1 = 1
\end{split}
\end{aligned}
$$
and finally,
$$
\begin{align}
    f_t(z_r, z_c, i) = eq(row_t(i), z_r) · eq(col_t(i), z_c),
\end{align}
$$
and since 
- for every fixed index $i$, both sides of the equation (3) are multilinear in $z_c$ and $z_r$,
- and this fact, that, two multilinear polynomials $f, g : \mathbb{F}^m \rightarrow \mathbb{F}$ that agree on every input in $\{0, 1\}^m$ (which we show in equality (4)) must also agree on every input in $\mathbb{F}^m$

then the equality (3) holds.

**Remark.** We emphasize that while Eq. (3) holds for $i \in \{0, 1\}^m$, it is unlikely to hold for general $i \in \mathbb{F}^m$ as the right hand side has higher degree in $i$.

Thus, using Eqs. (1), (2) and (3), our claim now simplifies to proving that:
$$
\begin{aligned}
    v = \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)
\end{aligned}
$$
This is done by running the sumcheck protocol for products of multilinears. The sumcheck protocol reduces the above to a claim about a single point of $\tilde{q}$ and a single point of $\tilde{f}_t$.
The former claim is the output of the verifier, and we show how the verifier can compute the latter claim directly.

Completeness and soundness follow immediately from sum-check protocol and so we proceed to the complexity analysis.

On the prover’s side,
- Recall that the prover already has access to $\big\{q(i)\big\}_{i\in\{0,1\}^m}$
- The prover by first using $2^n$ multiplications and $2^n$ additions to generate the sequences $\big\{eq(row_t(i), z_r)\big\}_{row_t(i)\in\{0,1\}^n}$. Because, recall that $row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n$, then every $row_t(i)\in \{0, 1\}^n$. 
- And the prover take $2^k$ multiplications and $2^k$ additions to generate $\big\{eq(col_t(i), z_c)\big\}_{col_t(i)\in\{0,1\}^k}$. Because, recall that $col_t : \{0, 1\}^m\rightarrow \{0, 1\}^k$, then every $col_t(i)\in \{0, 1\}^k$.
- Then, the prover can generate the sequence of values $\big\{\tilde{f}_t(z_r, z_c, i)\big\}_{i\in\{0,1\}^m}$ using equation (4) an $2^m$ additional multiplications (by simply iterating over $i \in \{0, 1\}^m$).
- The total work to generate $\tilde{f}$ is therefore $2^m + 2^n + 2^k$ multiplications and $\mathrm{O}(2^n + 2^k)$ additions.
- The sumcheck itself requires an additional $4 · 2^m$ multiplications and $\mathrm{O}(2^m)$ basic operations.

On the verifier’s side,
- The verifier performs $\mathrm{O}(m)$ field operations during the jagged sum-check.
- At the end of the sum-check, the verifier derives a two claims as follow:
  - A claim of the form $\tilde{q}(i) = \alpha$, for $i \in \mathbb{F}^m$ and $\alpha\in \mathbb{F}$, which is the output of the verifier in the jagged protocol.
  - And one of the form $\tilde{f}(i) = \beta$, for $i \in \mathbb{F}^m$ and $\beta\in \mathbb{F}$, we show in the following section how it can be computed efficiently by the verifier.

## Efficiently Computing $\tilde{f}_t$
Let $g : \{0, 1\}^n \times \{0, 1\}^{3m} \rightarrow \{0, 1\}$ be defined as $g(a, b, c, d) = 1$ if and only if $b < d$ and $b = a + c$.
Let $\tilde{g} : \mathbb{F}^{n+3m} \rightarrow \mathbb{F}$ denote the multilinear extension of $g$. We relate $\tilde{f}_t$ to $\tilde{g}$ via the following claim.

**Claim 1.** For every $z_r \in \mathbb{F}^n$, $z_c \in \mathbb{F}^k$ and $i \in \mathbb{F}^m$ it holds that:
$$
\begin{align}
    \tilde{f}_t(z_r, z_c, i) = \sum_{y\in\{0,1\}^k}eq(z_c, y) · \tilde{g}(z_r, i, t_{y−1}, t_y),
\end{align}
$$
where to simplify the notation, we use $t_{0^k−1}$ to denote $0$.

Proof. First consider the below Fact:

Fact: Two multilinear polynomials $f, g : \mathbb{F}^m \rightarrow\mathbb{F}$ that agree on every input in $\{0, 1\}^m$ must also agree on every input in $\mathbb{F}^m$.
Observe that both sides of the equation (5) are multilinear in $z_r$, $z_c$, and $i$. Thus, by above Fact, it suffices to prove the claim when $z_r \in \{0, 1\}^n$, $z_c \in \{0, 1\}^k$ and $i \in \{0, 1\}^m$.
$$
\begin{aligned}
    \tilde{f}_t(z_r, z_c, i) = \sum_{y\in\{0,1\}^k}eq(z_c, y) · \tilde{g}(z_r, i, t_{y−1}, t_y),
\end{aligned}
$$
In this case, the right hand side simplifies to $g(z_r, i, t_{y−1}, t_y)$, where $y = z_c$. Let's a little deep in this case.

Not that, for any $y_1, y_2\in\{0,1\}^k$, the lagrange basis $eq(y_1, y_2)$ is equal to 0 except for $y_1 = y_2$, which is equal to 1. Then the right hand side of equation (5) simplifies to $g(z_r, i, t_{y−1}, t_y)$, where $y = z_c$.

Suppose $g(z_r, i, t_{y−1}, t_y) = 1$. Then, by definition, $i < t_y$ and $i = z_r + t_{y−1}$ (where $t_{0^k−1}$ is defined as 0). As $t$ is admissible, this means that $t_{y−1} \le i < t_y$ and that $z_r = i − t_{y−1}$. Thus, $col_t(i) = y$ and $row_t(i) = z_r$ and so $f_t(z_r, y, i) = 1$.

Similarly, if $f_t(z_r, y, i) = 1$ then $col_t(i) = y$ and $row_t(i) = z_r$, which means that $t_{y−1} \le i < t_y$ and that $z_r = i − t_{y−1}$ and therefore $g(z_r, i, t_{y−1}, t_y) = 1$.

Thus, by above Claim, to compute $\tilde{f}$ it suffices to compute $\tilde{g}$ at $2^k$ points. Computing the multilinear extension of a general function on $n + 3m$ variables takes time $2^{n+3m}$ which we cannot afford.

Since $g : (\{0, 1\}^b)^m \rightarrow\mathbb{F}$ can be computed by a width 4 read-once branching program. Then $\tilde{g} : (\mathbb{F}^b)^m \rightarrow \mathbb{F}$ can be computed using $m · (w^2 + 2^b)$ multiplications and $\mathrm{O}(m · w · 2^b)$ additions.[Link](../jpcs/with4_robp.md#efficient-computable-g), [Link](../jpcs/with4_robp.md#efficient-computable-g)

Thus, $\tilde{g}$ can computable by  $m . (4^2 + 2^4) = 32m$ multiplications and $\mathrm{O}(m · 4 · 2^4) = \mathrm{O}(64m)$ additions.

## Example
Suppose $p : \{0, 1\}^2\times\{0, 1\}^2\rightarrow\mathbb{F}$ with heights
$$
\begin{aligned}
\big\{h_y\in[0,\dots, 2^2 − 1]\big\}_{y\in\{0,1\}^2}
=\big\{h_{00} = 0, h_{01} = 1, h_{10} = 2, h_{11} = 3\big\}
\end{aligned}
$$
And table of points as below

|x\y     |**00**           |**01**           |**10**           |**11**           |
|--------|-----------------|-----------------|-----------------|-----------------|
| **00** | $p(00, 00) = 3$ | $p(00, 01) = 4$ | $p(00, 10) = 5$ | $p(00, 11) = 6$ |
| **01** | $p(01, 00) = 0$ | $p(01, 01) = 0$ | $p(01, 10) = 7$ | $p(01, 11) = 8$ |
| **10** | $p(10, 00) = 0$ | $p(10, 01) = 0$ | $p(10, 10) = 1$ | $p(10, 11) = 9$ |
| **11** | $p(11, 00) = 0$ | $p(11, 01) = 0$ | $p(11, 10) = 0$ | $p(11, 11) = 0$ |

As calculated before, $M = 2^m = 8 = 2^3$, thus $m = 3$. Dense representation of $p$ computed as below
$$
\begin{aligned}
    &q : \{0, 1\}^3\rightarrow \mathrm{F}\\
    &q(0) = p(row_t(0), col_t(0)) = p(0, 0) = p(00, 00) = 3,\\ 
    &q(1) = p(row_t(1), col_t(1)) = p(0, 1) = p(00, 01) = 4,\\ 
    &q(2) = p(row_t(2), col_t(2)) = p(0, 2) = p(00, 10) = 5,\\
    &q(3) = p(row_t(3), col_t(3)) = p(1, 2) = p(01, 10) = 7,\\
    &q(4) = p(row_t(4), col_t(4)) = p(2, 2) = p(10, 10) = 1,\\
    &q(5) = p(row_t(5), col_t(5)) = p(0, 3) = p(00, 11) = 6,\\
    &q(6) = p(row_t(6), col_t(6)) = p(1, 3) = p(01, 11) = 8,\\
    &q(7) = p(row_t(7), col_t(7)) = p(2, 3) = p(10, 11) = 9,
\end{aligned}
$$
The multilinear extension of $q$ computed as below:
$$
\begin{aligned}
\tilde{q}(x) &= \sum_{b\in\{0, 1\}^3}q(b)eq(x, b)\\
&=q(000)eq(x, 000) + q(001)eq(x, 001) + q(010)eq(x, 010) + q(011)eq(x, 011)\\
 &\quad+ q(100)eq(x, 100) + q(101)eq(x, 101) + q(110)eq(x, 110) + q(111)eq(x, 111)\\
             &= -5x_1x_2x_3 + 5x_1x_2 + 4x_1x_3 + x_2x_3 - 2x_1 + 2x_2 + x_3 + 3
\end{aligned}
$$
The commitment to $\tilde{p}$ is oracle access to $\tilde{q}$ and $\{t_y\}_{y\in\{0,1\}^k} = \{t_y\}_{y\in\{0,1\}^2} = \{t_0,t_1, t_2, t_3\} = \{1, 2, 5, 8\}$. The prover sends this commitment to the verifier.

The verifier randomly chooses $z_r = (2, 4) \in \mathbb{F}^n$, $z_c = (5, 7)\in \mathbb{F}^k$ and wants to prover evaluate $\tilde{p}(z_r, z_c)$.

For computing $\tilde{p}(z_r, z_c) = \tilde{p}((2,4), (5, 7))$, the prover should compute the sequences $\{q(i)\}_{i\in\{0, 1\}^3}$, and $\big\{eq(row_t(i), z_r)\big\}_{row_t(i)\in\{0, 1\}^n}$, and $\big\{eq(col_t(i), z_c)\big\}_{col_t(i)\in\{0, 1\}^k}$ as you can see at the below
$$
\begin{aligned}
    \tilde{p}(z_r, z_c)&=\sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)\\
    &= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)
\end{aligned}
$$
The prover, already have the sequence 
$$
\begin{aligned}
\{q(i)\}_{i\in\{0, 1\}^3} &= \{q(000), q(001), q(010), q(011), q(100), q(101), q(110), q(111)\}\\
&=\{q(0), q(1), q(2), q(3), q(4), q(5), q(6), q(7)\}\\
&=\{3, 4, 5, 7, 1, 6, 8, 9\}
\end{aligned}
$$
The prover, generate the sequence 
$$
\begin{aligned}
\big\{eq(row_t(i), z_r)\big\}_{row_t(i)\in\{0, 1\}^n} &= \big\{eq(0, z_r), eq(1, z_r), eq(2, z_r), eq(3, z_r),\big\}\\
&= \big\{eq(00, z_r), eq(01, z_r), eq(10, z_r), eq(11, z_r)\big\}\\
&= \big\{eq(00, (2, 4)), eq(01, (2, 4)), eq(10, (2, 4)), eq(11, (2, 4))\big\}
\end{aligned}
$$
with $2^n = 2^2 = 4$ multiplications and $2^n = 2^2 = 4$ additions. Using the definition of lagrange basis 
$$
\begin{aligned}
eq((x_1,x_2), b_1b_2) &= \prod_{i=1}^{2}\big(x_ib_i+(1-x_i)(1-b_i)\big)\\
&= \big(x_1b_1+(1-x_1)(1-b_1)\big) * \big(x_2b_2+(1-x_2)(1-b_2)\big)
\end{aligned}
$$
Thus,
$$
\begin{aligned}
eq(00, z_r) &= eq(00, (2, 4)) = (1 - 2)(1 - 4) = 3\\
eq(01, z_r) &= eq(01, (2, 4)) = (1 - 2)(4) = -4 \equiv 13\\
eq(10, z_r) &= eq(10, (2, 4)) = (2)(1 - 4) = -6 \equiv 11\\
eq(11, z_r) &= eq(11, (2, 4)) = (2)(4) = 8 \qquad\text{In this specific example no need to compute $eq(11, z_r)$}
\end{aligned}
$$
The prover, generate the sequence 
$$
\begin{aligned}
\big\{eq(col_t(i), z_c)\big\}_{col_t(i)\in\{0, 1\}^k} &= \big\{eq(0, z_c), eq(1, z_c), eq(2, z_c), eq(3, z_c),\big\}\\
&= \big\{eq(00, z_c), eq(01, z_c), eq(10, z_c), eq(11, z_c),\big\}
\end{aligned}
$$
with $2^k = 2^2 = 4$ multiplications and $2^k = 2^2 = 4$ additions.
Thus,
$$
\begin{aligned}
eq(00, z_c) &= eq(00, (5, 7)) = (1 - 5)(1 - 7) = 24 \equiv 7\\
eq(01, z_c) &= eq(01, (5, 7)) = (1 - 5)(7) = -28 \equiv 6\\
eq(10, z_c) &= eq(10, (5, 7)) = (5)(1 - 7) = -30 \equiv 4\\
eq(11, z_c) &= eq(11, (5, 7)) = (5)(7) = 35 \equiv 16\qquad\text{Again, no need to compute $eq(11, z_c)$}
\end{aligned}
$$
Given above two sequences, the prover can generate the sequence of values $\big\{\tilde{f}_t(z_r, z_c, i)\big\}_{i\in\{0, 1\}^3}$ by $2^m = 2^3 = 8$ additional multiplications by simply iterating over $i\in\{0, 1\}^3$.

$$
\begin{aligned}
&\tilde{f}_t(z_r, z_c, i) = eq(row_t(i), z_r) · eq(col_t(i), z_c)\\
&\tilde{f}_t((2, 4), (5, 7), 000) = eq(row_t(000), (2, 4)) · eq(col_t(000), (5, 7)) = eq(00, (2, 4)) · eq(00, (5, 7)) = 3\times 7 = 21 \equiv 4\\
&\tilde{f}_t((2, 4), (5, 7), 001) = eq(row_t(001), (2, 4)) · eq(col_t(001), (5, 7)) = eq(00, (2, 4)) · eq(01, (5, 7)) = 3\times 6 = 18 \equiv 1\\
&\tilde{f}_t((2, 4), (5, 7), 010) = eq(row_t(010), (2, 4)) · eq(col_t(010), (5, 7)) = eq(00, (2, 4)) · eq(10, (5, 7)) = 3\times 4 = 12\\
&\tilde{f}_t((2, 4), (5, 7), 011) = eq(row_t(011), (2, 4)) · eq(col_t(011), (5, 7)) = eq(01, (2, 4)) · eq(10, (5, 7)) = 13\times 4 \equiv 16\\
&\tilde{f}_t((2, 4), (5, 7), 100) = eq(row_t(100), (2, 4)) · eq(col_t(100), (5, 7)) = eq(10, (2, 4)) · eq(10, (5, 7)) = 11\times 4 = 44 \equiv 7\\
&\tilde{f}_t((2, 4), (5, 7), 101) = eq(row_t(101), (2, 4)) · eq(col_t(101), (5, 7)) = eq(00, (2, 4)) · eq(11, (5, 7)) = 3\times 16 = 48\equiv 3\\
&\tilde{f}_t((2, 4), (5, 7), 110) = eq(row_t(110), (2, 4)) · eq(col_t(110), (5, 7)) = eq(01, (2, 4)) · eq(11, (5, 7)) = 13\times 16 = 208 \equiv 13\\
&\tilde{f}_t((2, 4), (5, 7), 111) = eq(row_t(111), (2, 4)) · eq(col_t(111), (5, 7)) = eq(10, (2, 4)) · eq(11, (5, 7)) = 11\times 16 = 176 \equiv 11\\
\end{aligned}
$$
Now, we are going to compute the $\tilde{q}(i).\tilde{f}_t(z_r, z_c, i)$ iterating over $i\in\{0, 1\}^3$, which needs $2^m = 2^3 = 8$ additional multiplications:
q(000), q(001), q(010), q(011), q(100), q(101), q(110), q(111)
{3, 4, 5, 7, 1, 6, 8, 9\}
$$
\begin{aligned}
&q(000) . \tilde{f}_t((2, 4), (5, 7), 000) = 3 \times 4 = 12
&q(001) . \tilde{f}_t((2, 4), (5, 7), 001) = 4 \times 1 = 4
&q(010) . \tilde{f}_t((2, 4), (5, 7), 010) = 5 \times 12 = 60 \equiv 8
&q(011) . \tilde{f}_t((2, 4), (5, 7), 011) = 7 \times 16 = 112 \equiv 7
&q(100) . \tilde{f}_t((2, 4), (5, 7), 100) = 1 \times 7 = 7
&q(101) . \tilde{f}_t((2, 4), (5, 7), 101) = 6 \times 3 = 18 \equiv 1
&q(110) . \tilde{f}_t((2, 4), (5, 7), 110) = 8 \times 13 = 104 \equiv 15
&q(111) . \tilde{f}_t((2, 4), (5, 7), 111) = 9 \times 11 = 99 \equiv 3
\end{aligned}
$$
Finally, the prover evaluate the $\tilde{p}(z_r, z_c) = \tilde{p}((2, 4), (5, 7))$ as following
$$
\begin{aligned}
    \tilde{p}(z_r, z_c)&=\sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)\\
    &= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)\\
    &= \sum_{i\in\{0,1\}^3} \tilde{q}(i) · \tilde{f}_t((2, 4), (5, 7), i)\\
    &= q(000) . \tilde{f}_t((2, 4), (5, 7), 000) + q(001) . \tilde{f}_t((2, 4), (5, 7), 001)\\
        &\quad + q(010) . \tilde{f}_t((2, 4), (5, 7), 010) + q(011) . \tilde{f}_t((2, 4), (5, 7), 011)\\
        &\quad + q(100) . \tilde{f}_t((2, 4), (5, 7), 100) + q(101) . \tilde{f}_t((2, 4), (5, 7), 101)\\
        &\quad + q(110) . \tilde{f}_t((2, 4), (5, 7), 110) + q(111) . \tilde{f}_t((2, 4), (5, 7), 111)\\
    &= 12 + 4 + 8 + 7 + 7 + 1 + 15 + 3\\
    &= 57
    &\equiv 11
\end{aligned}
$$
At this stage, the prover has successfully computed the target value $v$ which is 11. Now, the prover has an evaluation claim of the form $\tilde{p}(z_r, z_c) = v$ which explicitly is $\tilde{p}((2, 4), (5, 7)) = 11$. Since 
$$
\begin{aligned}
    \tilde{p}(z_r, z_c)&=\sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)\\
    &= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)
\end{aligned}
$$
Then the prover and the verifier will apply the sum-check protocol on
$$
\begin{aligned}
    v&= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)\\
\end{aligned}
$$
Explicitly
$$
\begin{aligned}
    11&= \sum_{i\in\{0,1\}^3} \tilde{q}(i) · \tilde{f}_t((2, 4), (5, 7), i)
\end{aligned}
$$
However, the verifier must also compute the value $v$ for validation. Direct computation of $\tilde{f}_t(z_r, z_c, i) =  \tilde{f}_t((2, 4), (5, 7), i)$ is computationally prohibitive for the verifier due to its high cost. We will now demonstrate the step-by-step calculation process of $v$ by the verifier.

First, we know
$$
\begin{aligned}
    \tilde{f}_t(z_r, z_c, i) = \sum_{y\in\{0,1\}^k}eq(z_c, y) · \tilde{g}(z_r, i, t_{y−1}, t_y),
\end{aligned}
$$
where $g : \{0, 1\}^n \times \{0, 1\}^{3m} \rightarrow \{0, 1\}$ be defined as $g(a, b, c, d) = 1$ if and only if $b < d$ and $b = a + c$. And $\tilde{g} : \mathbb{F}^{n+3m} \rightarrow \mathbb{F}$ denote the multilinear extension of $g$.

Using $z_r = (2, 4) \in \mathbb{F}^2$, $z_c = (5, 7)\in \mathbb{F}^2$ and $\{t_y\}_{y\in\{0,1\}^k} = \{t_y\}_{y\in\{0,1\}^2} = \{t_0,t_1, t_2, t_3\} = \{1, 2, 5, 8\}$, and recall that $t_{0^k -1} = 0$, we have
$$
\begin{aligned}
    \tilde{f}_t(z_r, z_c, i) &= \sum_{y\in\{0,1\}^k}eq(z_c, y) · \tilde{g}(z_r, i, t_{y−1}, t_y)\\
    &= \sum_{y\in\{0,1\}^2}eq\big((5, 7), y\big) · \tilde{g}\big((2, 4), i, t_{y−1}, t_y\big)\\
    &= eq\big((5, 7), 00\big) · \tilde{g}\big((2, 4), i, t_{0−1}, t_{00}\big) + eq\big((5, 7), 01\big) · \tilde{g}\big((2, 4), i, t_{1−1}, t_{01}\big)\\
    &\quad+ eq\big((5, 7), 10\big) · \tilde{g}\big((2, 4), i, t_{2−1}, t_{10}\big)
    + eq\big((5, 7), 11\big) · \tilde{g}\big((2, 4), i, t_{3−1}, t_{3}\big)\\
    &= eq\big((5, 7), 00\big) · \tilde{g}\big((2, 4), i, 0, 1\big) + eq\big((5, 7), 01\big) · \tilde{g}\big((2, 4), i, 1, 2\big)\\
    &\quad+ eq\big((5, 7), 10\big) · \tilde{g}\big((2, 4), i, 2, 5\big)
    + eq\big((5, 7), 11\big) · \tilde{g}\big((2, 4), i, 5, 8\big)
\end{aligned}
$$
Thus, to compute $\tilde{f}_t$ it suffices to compute $\tilde{g}$ at $2^k = 2^2 = 4$ points. Computing the multilinear extension of a general function on $n + 3m = 2 + 3.3 = 11$ variables takes time $2^{n+3m} = 2^{11}$ which we cannot afford. Since $g : (\{0, 1\}^4)^3 \rightarrow\mathbb{F}$ can be computed by a width 4 read-once branching program. Then $\tilde{g} : (\mathbb{F}^4)^3 \rightarrow \mathbb{F}$ can be computed using $m · (w^2 + 2^b)$ explicitly $3 . (4^2 + 2^4) = 3 . 32 = 96$ multiplications and $\mathrm{O}(m · w · 2^b)$ explicitly $\mathrm{O}(3 · 4 · 2^4) = \mathrm{O}(192)$ additions.

We now aim to demonstrate how the values
$$
\bigg\{\tilde{g}\big((2, 4), i, 0, 1\big), \tilde{g}\big((2, 4), i, 1, 2\big), \tilde{g}\big((2, 4), i, 2, 5\big), \tilde{g}\big((2, 4), i, 5, 8\big)\bigg\}
$$
can be computed efficiently, by a width 4 read-once branching program.















-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------

$$
\begin{aligned}
    v&= \tilde{p}(z_r, z_c)\\
    &=\sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)\\
    &= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)\\
      &=\sum_{i\in\{0,1\}^m} \tilde{q}(i) · \sum_{y\in\{0,1\}^k}eq(z_c, y) · \tilde{g}(z_r, i, t_{y−1}, t_y)
\end{aligned}
$$