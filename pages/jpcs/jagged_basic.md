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
And table of points as
|x\y     |**00**           |**01**           |**10**           |**11**           |
|--------|-----------------|-----------------|-----------------|-----------------|
| **00** | $p(00, 00) = 3$ | $p(00, 01) = 4$ | $p(00, 10) = 5$ | $p(00, 11) = 6$ |
| **01** | $p(01, 00) = 0$ | $p(01, 01) = 0$ | $p(01, 10) = 7$ | $p(01, 11) = 8$ |
| **10** | $p(10, 00) = 0$ | $p(10, 01) = 0$ | $p(10, 10) = 1$ | $p(10, 11) = 9$ |
| **11** | $p(11, 00) = 0$ | $p(11, 01) = 0$ | $p(11, 10) = 0$ | $p(11, 11) = 0$ |

First, we have an evaluation claim of the form $\tilde{p}(z_r, z_c) = v$, where $z_r \in \mathbb{F}^n$, $z_c \in \mathbb{F}^k$ and $v \in \mathbb{F}$.
$$
\begin{aligned}
    v&= \tilde{p}(z_r, z_c)\\
    &=\sum_{\substack{x\in\{0, 1\}^n\\ y\in\{0, 1\}^k}} p(x, y)·eq(x, z_r)·eq(y, z_c)\\
    &= \sum_{i\in \{0,1\}^m} q(i)·eq(row_t(i), z_r)·eq(col_t(i), z_c)\\
    &= \sum_{i\in\{0,1\}^m} \tilde{q}(i) · \tilde{f}_t(z_r, z_c, i)
\end{aligned}
$$
The prover, already have the sequence 
$$
\begin{aligned}
\{q(i)\}_{i\in\{0, 1\}^3} &= \{q(000), q(001), q(010), q(011), q(100), q(101), q(110)\}\\
&=\{q(0), q(1), q(2), q(3), q(4), q(5), q(6), q(7)\}\\
&=\{3, 4, 5, 7, 1, 6, 8, 9\}
\end{aligned}
$$
The prover, generate the sequence 
$$
\begin{aligned}
\big\{eq(row_t(i), z_r)\big\}_{row_t(i)\in\{0, 1\}^n} &= \big\{eq(0, z_r), eq(1, z_r), eq(2, z_r), eq(3, z_r),\big\}\\
&= \big\{eq(00, z_r), eq(01, z_r), eq(10, z_r), eq(11, z_r)\big\}
\end{aligned}
$$
with $2^n = 2^2 = 4$ multiplications and $2^n = 2^2 = 4$ additions.

The prover, generate the sequence 
$$
\begin{aligned}
\big\{eq(col_t(i), z_c)\big\}_{col_t(i)\in\{0, 1\}^k} &= \big\{eq(0, z_c), eq(1, z_c), eq(2, z_c), eq(3, z_c),\big\}\\
&= \big\{eq(00, z_c), eq(01, z_c), eq(10, z_c), eq(11, z_c),\big\}
\end{aligned}
$$
with $2^k = 2^2 = 4$ multiplications and $2^k = 2^2 = 4$ additions.

Given above two sequences, the prover can generate the sequence of values $\big\{\tilde{f}_t(z_r, z_c, i)\big\}_{i\in\{0, 1\}^3}$ by $2^m = 2^3 = 8$ additional multiplications by simply iterating over $i\in\{0, 1\}^3$.

$$
\begin{aligned}
&\tilde{f}_t(z_r, z_c, i) = eq(row_t(i), z_r) · eq(col_t(i), z_c)\\
&\tilde{f}_t(z_r, z_c, 000) = eq(00, z_r) · eq(00, z_c) =\\
\end{aligned}
$$

At final, the verifier can compute $\tilde{g}$ by $32m$ multiplications and $\mathrm{O}(64m)$ additions.

As calculated before, $M = 2^m = 8 = 2^3$, thus $m = 3$. The multilinear extension of dense representation of $p$ computed as below:
$$
\begin{aligned}
\tilde{q}(x) &= \sum_{b\in\{0, 1\}^3}q(b)eq(x, b)\\
&=q(000)eq(x, 000) + q(001)eq(x, 001) + q(010)eq(x, 010) + q(011)eq(x, 011)\\
 &\quad+ q(100)eq(x, 100) + q(101)eq(x, 101) + q(110)eq(x, 110) + q(111)eq(x, 111)\\
             &= -5x_1x_2x_3 + 5x_1x_2 + 4x_1x_3 + x_2x_3 - 2x_1 + 2x_2 + x_3 + 3
\end{aligned}
$$

The commitment to $\tilde{p}$ is oracle access to $\tilde{q}$ and $\{t_y\}_{y\in\{0,1\}^k} = \{t_y\}_{y\in\{0,1\}^2} = \{t_0,t_1, t_2, t_3\} = \{1, 2, 5, 8\}$. The prover sends this commitment to the verifier.















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