## Jagged Function
Let $p, k\in\mathbb{N}$. A jagged function with heights $\big(h_y\in[0,\dots, 2^n − 1]\big)_{y\in\{0,1\}^k}$ is a function $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$ such that $p(x, y) = 0$ for every $x \in \{0, 1\}^n$ and $y \in \{0, 1\}^k$ for
which $x \ge h_y$.

**Example 1.** Suppose $p : \{0, 1\}^1\times\{0, 1\}^1\rightarrow\mathbb{F}$ with heights
$$
\begin{aligned}
\big(h_y\in[0,\dots, 2^1 − 1]\big)_{y\in\{0,1\}^1} &= \big(h_y\in[0, 1]\big)_{y\in\{0,1\}}\\
&=\big(h_0\in[0, 1], h_1\in[0, 1]\big)\\
&=\big(h_0 = 0, h_1 = 1\big)\\
\end{aligned}
$$
then by given heights we have
$$
\begin{aligned}
    &p(0, 0) = 0,\space\space\space\space\space\text{because $x = 0 \ge h_0 = 0$}\\
    &p(0, 1) = 3,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_1 = 1$}\\
    &p(1, 0) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_0 = 0$}\\
    &p(1, 1) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_1 = 1$}
\end{aligned}
$$

**Example 2.** Suppose $p : \{0, 1\}^2\times\{0, 1\}^2\rightarrow\mathbb{F}$ with heights
$$
\begin{aligned}
\big(h_y\in[0,\dots, 2^2 − 1]\big)_{y\in\{0,1\}^2} &= \big(h_y\in[0, 1, 2, 3]\big)_{y\in\{0,1\}^2}\\
&=\big(h_{00}\in[0, 1, 2, 3], h_{01}\in[0, 1, 2, 3], h_{10}\in[0, 1, 2, 3], h_{11}\in[0, 1, 2, 3]\big)\\
&=\big(h_{00} = 0, h_{01} = 1, h_{10} = 2, h_{11} = 3\big)
\end{aligned}
$$
Here and throughout this work we identify bit-strings such as $x \in \{0, 1\}^n$ with integers in $\{0,\dots, 2^n − 1\}$ in the natural way (i.e., via their big-endian(Most Significant Bit come first (left)) binary representation) and freely use
notation such as $x < x^{\prime}$ also in the case that both are bit-strings.

So, in the above example $00$ is binary representation of number $0$, and $01$ for $1$, $10$ for $2$, and finally $11$ for $3$.

Com back to our example, by given heights,
$$
\begin{aligned}
    &p(00, 00) = 0,\space\space\space\space\space\text{because $x = 0 \ge h_{00} = 0$}\\
    &p(00, 01) = 4,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{01} = 1$}\\
    &p(00, 10) = 5,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{10} = 2$}\\
    &p(00, 11) = 6,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{11} = 3$}\\
    &p(01, 00) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_{00} = 0$}\\
    &p(01, 01) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_{01} = 1$}\\
    &p(01, 10) = 7,\space\space\space\space\space\text{because $x = 1$ is not greater than or equal to $h_{10} = 2$}\\
    &p(01, 11) = 8,\space\space\space\space\space\text{because $x = 1$ is not greater than or equal to $h_{11} = 3$}\\
    &p(10, 00) = 0,\space\space\space\space\space\text{because $x = 2 \ge h_{00} = 0$}\\
    &p(10, 01) = 0,\space\space\space\space\space\text{because $x = 2 \ge h_{01} = 1$}\\
    &p(10, 10) = 0,\space\space\space\space\space\text{because $x = 2 \ge h_{10} = 2$}\\
    &p(10, 11) = 9,\space\space\space\space\space\text{because $x = 2$ is not greater than or equal to $h_{11} = 3$}\\
    &p(11, 00) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{00} = 0$}\\
    &p(11, 01) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{01} = 1$}\\
    &p(11, 10) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{10} = 2$}\\
    &p(11, 11) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{11} = 3$}\\
\end{aligned}
$$

## Non-zero Part of Jagged Function
We refer to the set of coordinates $\{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\}$ (i.e., the coordinates of $p$ which are not necessarily zero) as the non-zero part of $p$.

Let's specify this coordinates for above two examples.
$$
\begin{aligned}
    \{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\} &=\{(x, y) \in \{0, 1\}^1 \times \{0, 1\}^1\space\space\text{s.t.}\space\space x < h_y\}\\
    &=\{(0, 1)\}\space\space\space\space\space\space\text{Example 1}\\
    &\\
    \{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\} &=\{(x, y) \in \{0, 1\}^2 \times \{0, 1\}^2\space\space\text{s.t.}\space\space x < h_y\}\\
    &=\{(00, 01), (00, 10), (00, 11), (01, 10), (01, 11), (10, 11)\}\space\space\space\space\space\space\text{Example 2}
\end{aligned}
$$

Let $M =\sum_{y\in\{0,1\}^k} h_y$ denote the size of the non-zero part of $p$ (where the summation is over integers). We assume (by padding) that $M$ is a power of 2, and denote by $m = \log_2(M)$ ($M = 2^m$). We assume that $m\ge n, k$ (in typical applications $m$ is significantly larger than $n$ and $k$ and this simplifies the notation).

Let's calculate $M$ for above two examples. For example recall from Example 1, then $M =\sum_{y\in\{0,1\}^k} h_y = h_0 + h_1 = 0 + 1 = 1$. Recall from example 2:
$$
\begin{aligned}
    M &=\sum_{y\in\{0,1\}^k} h_y\\
      &= h_ {00} + h_{01} + h_{10} + h_{11}\\
      &= 0 + 1 + 2 + 3\\
      &= 6
\end{aligned}
$$
We can assume $M = 8 = 2^3$.

## The Cumulative Heights
Recall $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$. For every $y \in \{0, 1\}^k$, let $t_y = h_1 + \dots + h_y$, where the summation is over the integers. In other words, the $t_y$’s denote the cumulative heights
up to (and including) column $y$.

Recall from Example 1, $p : \{0, 1\}^1\times\{0, 1\}^1\rightarrow\mathbb{F}$ with heights $h_0 = 0, h_1 =1$. Then, $t_0 = h_0 = 0$ and $t_1 = h_0 + h_1 = 0 + 1 = 1$. Note that $t_{1^k} = t_{1^1} = t_1 = 1 = M$.

Recall from Example 2, $p : \{0, 1\}^2\times\{0, 1\}^2\rightarrow\mathbb{F}$ with heights $h_{00} = h_0 = 0, h_{01} = h_1 = 1, h_{10} = h_2 = 2, h_{11} = h_3 = 3$. Then, 
$$
\begin{aligned}
&t_0 = h_0 = 0\\
&t_1 = h_0 + h_1 = 0 + 1 = 1\\
&t_2 = h_0 + h_1 + h_2 = 0 + 1 + 2 = 3\\
&t_3 = h_0 + h_1 + h_2 + h_3 = 0 + 1 + 2 + 3 = 6   
\end{aligned}
$$
Note that in this example $t_{1^k} = t_{1^2} = t_{11} t_3 = 6 = M$.

In particular, note that the $t_y$’s are monotonically non-decreasing, and that $t_{1^k} = M = 2^m$. Note that $1^k = \underbrace{1\dots11}_{k\space\space\text{times}}$ is binary representation of $2^k - 1$. Since $2^m$ is greater than or equal to sum of $h_y$'s of non-zero part of function $p$ (definition of $M$), then each $t_y \le 2^m$ and so they can be represented using $m$ bits and indeed we view them as bit strings in $\{0, 1\}^m$.

We say that a sequence of cumulative heights $t = \big(t_y \in \{0, 1\}^m\big)_{y\in\{0,1\}^k}$ is **admissible** if it is of the above form, namely it is non-decreasing and $t_{1^k} = 2^m$.

## Bijection between $\{0, 1\}^m$ and non-zero part of $p$
Fixing $t = \big(t_y \in \{0, 1\}^m\big)_{y\in\{0,1\}^k}$ as above a admissible sequence of cumulative heights, we construct a (natural) bijection between $\{0, 1\}^m$ and the non-zero part of $p$ via two functions $row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n$ and $col_t : \{0, 1\}^m \rightarrow \{0, 1\}^k$ as follows. Given an index $i \in \{0, 1\}^m$, let $y \in \{0, 1\}^k$ be the smallest such that $i < t_y$. Define $col_t(i) = y$ and $row_t(i) = i − t_{y − 1}$ (where for simplicity of notation we use $t_{0^k}−1$ as a shorthand for 0).
$$
\begin{aligned}
    &row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n\\
    &row_t(i) = i − t_{y − 1}\\
    &\\
    &col_t : \{0, 1\}^m \rightarrow \{0, 1\}^k\\
    &col_t(i) = y
\end{aligned}
$$
Let's try this bijection in our Example 2:
- Let $i=0\in\{0,1\}^3$, then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 0 < t_y$ holds. Since $t_0 = 0$ not satisfies $i < t_0$. We choose $y = 1$, then $t_1 = 1$ and $i < t_y = t_1 = 1$. So, $row_t(i) = i − t_{1 − 1} = i - t_0 = 0 - 0 = 0$ and $col_t(i) = y = 1$.
- Let $i=1\in\{0,1\}^3$, then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 1 < t_y$ holds. Since $t_0 = 0$ and $t_1 = 1$ not satisfies $i < t_y$. We choose $y = 2$, then $t_2 = 3$ and $i < t_y = t_2 = 3$. So, $row_t(i) = i − t_{2 − 1} = i- t_1 = 1 - 1 = 0$ and $col_t(i) = y = 2$.
- Let $i=2\in\{0,1\}^3$, then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 2 < t_y$ holds. Since $t_0 = 0$ and $t_1 = 1$ not satisfies $i < t_y$. We choose $y = 2$, then $t_2 = 3$ and $i < t_y = t_2 = 3$. So, $row_t(i) = i − t_{2 − 1} = i-t_1 = 2 - 1 = 1$ and $col_t(i) = y = 2$.
- Let $i=3\in\{0,1\}^3$, then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 3 < t_y$ holds. Since $t_0 = 0$ and $t_1 = 1$ and $t_2 = 3$ not satisfies $3 < t_y$. We choose $y = 3$, then $t_3 = 6$ and $i = 3 < t_y = t_3 = 6$. So, $row_t(i) = i − t_{3 − 1} = i - t_2 = 3 - 3 = 0$ and $col_t(i) = y = 3$.
- Let $i=4\in\{0,1\}^3$. Then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 4 < t_y = t_3 = 6$ holds. Then, $row_t(4) = 4 − t_{3 − 1} = 4 - t_2 = 4 - 3 = 1$ and $col_t(4) = y = 3$.
- Let $i=5\in\{0,1\}^3$. Then we want to find a smallest $y\in\{0,1\}^2$ such that $i = 5 < t_y = t_3 = 6$ holds. Then, $row_t(5) = 5 − t_{3 − 1} = 5 - t_2 = 5 - 3 = 2$ and $col_t(5) = y = 3$.
- Let $i=6\in\{0,1\}^3$. Then, $row_t(6) = 6 − t_{3 − 1} 6 - t_2 = 6 - 3 = 3$ and $col_t(6) = y = 3$.
- Let $i=7\in\{0,1\}^3$. Then, $row_t(7) = 7 − t_{3 − 1} = 7 - t_2 = 7 - 3 = 4$ and $col_t(7) = y = 3$.
- Note that $i = 8$, not belongs to $\{0,1\}^3$.
$$
\begin{aligned}
    &row_t: \{0, 1\}^3\rightarrow \{0, 1\}^2\\
    &row_t(0) = 0,\\ 
    &row_t(1) = 0,\\ 
    &row_t(2) = 1,\\
    &row_t(3) = 0,\\
    &row_t(4) = 1,\\
    &row_t(5) = 2,\\
    &row_t(6) = 3,\\
    &row_t(7) = 4
\end{aligned}
$$
$$
\begin{aligned}
    &col_t : \{0, 1\}^3\rightarrow \{0, 1\}^2\\
    &col_t(0) = 1,\\ 
    &col_t(1) = 2,\\ 
    &col_t(2) = 2,\\
    &col_t(3) = 3,\\
    &col_t(4) = 3,\\
    &col_t(5) = 3,\\
    &col_t(6) = 3,\\
    &col_t(7) = 3
\end{aligned}
$$
**Fact.** Fix an admissible sequence of cumulative heights $t = \big(t_y \in \{0, 1\}^m\big)_{y\in\{0,1\}^k}$ and let $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$ be a corresponding jagged function. Then, the mapping $i \mapsto (row_t(i), col_t(i))$ is a bijection between $\{0, 1\}^m$ and the non-zero part of $p$.

Back to our Example 2.
$$
\begin{aligned}
    &\mathrm{map} : \{0, 1\}^3\rightarrow \{(00, 01), (00, 10), (00, 11), (01, 10), (01, 11), (10, 11)\}\\
    &0\mapsto(row_t(0), col_t(0)) = (0, 1) = (00, 01),\\ 
    &1\mapsto(row_t(1), col_t(1)) = (0, 2) = (00, 10),\\ 
    &2\mapsto(row_t(2), col_t(2)) = (1, 2) = (01, 10),\\
    &3\mapsto(row_t(3), col_t(3)) = (0, 3) = (00, 11),\\
    &4\mapsto(row_t(4), col_t(4)) = (1, 3) = (01, 11),\\
    &5\mapsto(row_t(5), col_t(5)) = (2, 3) = (10, 11),\\
    &6\mapsto(row_t(6), col_t(6)) = (3, 3),\\
    &7\mapsto(row_t(7), col_t(7)) = (4, 3)
\end{aligned}
$$

## Dense Representation of Jagged Function $p$
Define a function $q : \{0, 1\}^m \rightarrow\mathbb{F}$ such that $q(i) = p(row_t(i), col_t(i))$, for every $i \in \{0, 1\}^m$. We refer to $q$ as the *dense representation* of $p$, and to $p$ as the *sparse representation*. In other words $p$ is sparse representation of $q$.

Back to our Example 2, want to define dense representation of $p$.
$$
\begin{aligned}
    &q : \{0, 1\}^3\rightarrow \mathrm{F}\\
    &q(0) = p(row_t(0), col_t(0)) = p(0, 1) = p(00, 01) = 4,\\ 
    &q(1) = p(row_t(1), col_t(1)) = p(0, 2) = p(00, 10) = 5,\\ 
    &q(2) = p(row_t(2), col_t(2)) = p(1, 2) = p(01, 10) = 7,\\
    &q(3) = p(row_t(3), col_t(3)) = p(0, 3) = p(00, 11) = 6,\\
    &q(4) = p(row_t(4), col_t(4)) = p(1, 3) = p(01, 11) = 8,\\
    &q(5) = p(row_t(5), col_t(5)) = p(2, 3) = p(10, 11) = 9,\\
    &q(6) = p(row_t(6), col_t(6)) = p(3, 3) = p(11, 11) = 0,\\
    &q(7) = p(row_t(7), col_t(7)) = p(4, 3) = 0
\end{aligned}
$$

## Commitment
The commitment to $\tilde{p}$, is the multilinear
oracle $\tilde{q} : \mathbb{F}^m \rightarrow \mathbb{F}$ and the cumulative heights $\{t_y\}_{y\in\{0,1\}^k}$, which are sent in the clear (i.e., not as
an oracle — later when consider methods that avoid this).