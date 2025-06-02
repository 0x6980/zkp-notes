## Jagged Function
Let $p, k\in\mathbb{N}$. A jagged function with heights $\big\{h_y\in[0,\dots, 2^n − 1]\big\}_{y\in\{0,1\}^k}$ is a function $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$ such that $p(x, y) = 0$ for every $x \in \{0, 1\}^n$ and $y \in \{0, 1\}^k$ for
which $x \ge h_y$.

**Example 1.** Suppose $p : \{0, 1\}^1\times\{0, 1\}^1\rightarrow\mathbb{F}$ with heights
$$
\begin{aligned}
\big\{h_y\in[0,\dots, 2^1 − 1]\big\}_{y\in\{0,1\}^1} &= \big\{h_y\in[0, 1]\big\}_{y\in\{0,1\}}\\
&=\big\{h_0\in[0, 1], h_1\in[0, 1]\big\}\\
&=\big\{h_0 = 0, h_1 = 1\big\}
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
|x\y    |**0**          |**1**          |
|-------|---------------|---------------|
| **0** | $p(0, 0) = 0$ | $p(0, 1) = 3$ |
| **1** | $p(1, 0) = 0$ | $p(1, 1) = 0$ |

Note that height **Column 0** has height equal 0 because all entries in this column are zero. And **Column 1** has height equal 1, because **Row 1** contains a non-zero value, and all rows below row 1 (row 2 onward) contain zeros.

**Example 2.** Suppose $p : \{0, 1\}^2\times\{0, 1\}^2\rightarrow\mathbb{F}$ with heights
$$
\begin{aligned}
\big\{h_y\in[0,\dots, 2^2 − 1]\big\}_{y\in\{0,1\}^2} &= \big\{h_y\in[0, 1, 2, 3]\big\}_{y\in\{0,1\}^2}\\
&=\big\{h_{00}\in[0, 1, 2, 3], h_{01}\in[0, 1, 2, 3], h_{10}\in[0, 1, 2, 3], h_{11}\in[0, 1, 2, 3]\big\}\\
&=\big\{h_{00} = 0, h_{01} = 1, h_{10} = 2, h_{11} = 3\big\}
\end{aligned}
$$
Here and throughout this work we identify bit-strings such as $x \in \{0, 1\}^n$ with integers in $\{0,\dots, 2^n − 1\}$ in the natural way (i.e., via their big-endian binary representation) and freely use notation such as $x < x^{\prime}$ also in the case that both are bit-strings. Note that in big-endian binary representation the **Most Significant Bit** come first (left).

For example, given $x \in \{0, 1\}^2$ we interpret the index $x = x_1x_2$ as binary numbers representing integer $x_12^1 + x_2.2^0$. Thus, in the above example $00$ is binary representation of number $0$, and $01$ is binary representation of $1$, $10$ for $2$, and finally $11$ for $3$.

Com back to our example, by given heights,
$$
\begin{aligned}
    &p(00, 00) = 3,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{00} = 1$}\\
    &p(00, 01) = 4,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{01} = 1$}\\
    &p(00, 10) = 5,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{10} = 3$}\\
    &p(00, 11) = 6,\space\space\space\space\space\text{because $x = 0$ is not greater than or equal to $h_{11} = 3$}\\
    &p(01, 00) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_{00} = 1$}\\
    &p(01, 01) = 0,\space\space\space\space\space\text{because $x = 1 \ge h_{01} = 1$}\\
    &p(01, 10) = 7,\space\space\space\space\space\text{because $x = 1$ is not greater than or equal to $h_{10} = 3$}\\
    &p(01, 11) = 8,\space\space\space\space\space\text{because $x = 1$ is not greater than or equal to $h_{11} = 3$}\\
    &p(10, 00) = 0,\space\space\space\space\space\text{because $x = 2 \ge h_{00} = 1$}\\
    &p(10, 01) = 0,\space\space\space\space\space\text{because $x = 2 \ge h_{01} = 1$}\\
    &p(10, 10) = 1,\space\space\space\space\space\text{because $x = 2$ is not greater than or equal to $h_{10} = 3$}\\
    &p(10, 11) = 9,\space\space\space\space\space\text{because $x = 2$ is not greater than or equal to $h_{11} = 3$}\\
    &p(11, 00) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{00} = 1$}\\
    &p(11, 01) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{01} = 1$}\\
    &p(11, 10) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{10} = 2$}\\
    &p(11, 11) = 0,\space\space\space\space\space\text{because $x = 3 \ge h_{11} = 3$}\\
\end{aligned}
$$
|x\y     |**00**           |**01**           |**10**           |**11**           |
|--------|-----------------|-----------------|-----------------|-----------------|
| **00** | $p(00, 00) = 3$ | $p(00, 01) = 4$ | $p(00, 10) = 5$ | $p(00, 11) = 6$ |
| **01** | $p(01, 00) = 0$ | $p(01, 01) = 0$ | $p(01, 10) = 7$ | $p(01, 11) = 8$ |
| **10** | $p(10, 00) = 0$ | $p(10, 01) = 0$ | $p(10, 10) = 1$ | $p(10, 11) = 9$ |
| **11** | $p(11, 00) = 0$ | $p(11, 01) = 0$ | $p(11, 10) = 0$ | $p(11, 11) = 0$ |

Note that, columns $00$ and $01$ has height equal to 1, because the last non-zero entry appears in **row 1**. The columns $10$ and $11$ has height equal to 3, because The last non-zero entry appears in **row 3**.

## Non-zero Part of Jagged Function
We refer to the set of coordinates $\big\{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\big\}$ (i.e., the coordinates of $p$ which are not necessarily zero) as the non-zero part of $p$.

Let's specify this coordinates for above two examples.
$$
\begin{aligned}
    \big\{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\big\} &=\big\{(x, y) \in \{0, 1\}^1 \times \{0, 1\}^1\space\space\text{s.t.}\space\space x < h_y\big\}\\
    &=\big\{(0, 1)\big\}\qquad\text{Example 1}\\
    &\\
    \big\{(x, y) \in \{0, 1\}^n \times \{0, 1\}^k\space\space\text{s.t.}\space\space x < h_y\big\} &=\big\{(x, y) \in \{0, 1\}^2 \times \{0, 1\}^2\space\space\text{s.t.}\space\space x < h_y\big\}\\
    &=\big\{(00, 00),(00, 01), (00, 10), (00, 11), (01, 10), (01, 11), (10, 10), (10, 11)\big\}\qquad\text{Example 2}
\end{aligned}
$$
## The Size of The Non-zero Part of $p$
Let $M =\sum_{y\in\{0,1\}^k} h_y = h_{0^k} + \dots + h_{1^k}$ denote the size of the non-zero part of $p$ (where the summation is over integers). We assume (by padding) that $M$ is a power of 2, and denote by $m = \log_2(M)$ ($M = 2^m$). We assume that $m\ge n, k$ (in typical applications $m$ is significantly larger than $n$ and $k$ and this simplifies the notation).

Note that, in above summation, $h_{0^k} = \underbrace{0\dots 0}_{k\space\text{times}}$, and $h_{1^k} = \underbrace{1\dots 1}_{k\space\text{times}}$. The other indexes is between these two indexes. For example $\underbrace{0\dots 0}_{k-1\space\text{times}}1$, $\underbrace{0\dots 0}_{k-2\space\text{times}}11$, $\underbrace{0\dots 0}_{k-3\space\text{times}}111$, $\underbrace{0\dots 0}_{k-3\space\text{times}}101$, and so on. If you consider $k=2$, then the all indexes be equal to $\{00, 01, 10, 11\}$.

Let's calculate $M$ for above two examples.

Recall from Example 1, since $k =1$ and given $h_0 = 0, h_1 = 1$, then $M =\sum_{y\in\{0,1\}^k} h_y = h_0 + h_1 = 0 + 1 = 1 = 2^0$.

Recall from Example 2, since $k =2$ and given $h_{00} = 1, h_{01} = 1, h_{10} = 3, h_{11} = 3$, then:
$$
\begin{aligned}
    M &=\sum_{y\in\{0,1\}^k} h_y\\
      &= h_ {00} + h_{01} + h_{10} + h_{11}\\
      &= 1 + 1 + 3 + 3\\
      &= 8\\
      &= 2^3
\end{aligned}
$$

## The Cumulative Heights
Let $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$. For every $y \in \{0, 1\}^k$, let $t_y = h_{0} + \dots + h_y$, where the summation is over the integers. In other words, the $t_y$’s denote the cumulative heights
up to (and including) column $y$.

Recall from Example 1, $p : \{0, 1\}^1\times\{0, 1\}^1\rightarrow\mathbb{F}$ with heights $h_0 = 0, h_1 =1$. Then, $t_0 = h_0 = 0$ and $t_1 = h_0 + h_1 = 0 + 1 = 1$. Note that $t_{1^k} = t_{1^1} = t_1 = 1 = M$.

Recall from Example 2, $p : \{0, 1\}^2\times\{0, 1\}^2\rightarrow\mathbb{F}$ with heights $h_{00} = h_0 = 0, h_{01} = h_1 = 1, h_{10} = h_2 = 2, h_{11} = h_3 = 3$. Then, 
$$
\begin{aligned}
&t_0 = h_0 = 1\\
&t_1 = h_0 + h_1 = 1 + 1 = 2\\
&t_2 = h_0 + h_1 + h_2 = 1 + 1 + 3 = 5\\
&t_3 = h_0 + h_1 + h_2 + h_3 = 1 + 1 + 3 + 3 = 8   
\end{aligned}
$$
Note that, in this example $t_{1^k} = t_{1^2} = t_{11} = t_3 = 8 = M$.

In particular, note that the $t_y$’s are monotonically non-decreasing, and that $t_{1^k} = M = 2^m$. Recall that, $1^k = \underbrace{1\dots 11}_{k\space\space\text{times}}$ is binary representation of $2^k - 1$. Since $2^m$ is greater than or equal to sum of $h_y$'s of non-zero part of function $p$ (definition of $M$), then each $t_y \le 2^m$ and so they can be represented using $m$ bits and indeed we view them as bit strings in $\{0, 1\}^m$.

We say that a sequence of cumulative heights $t = \big\{t_y \in \{0, 1\}^m\big\}_{y\in\{0,1\}^k}$ is **admissible** if it is of the above form, namely it is non-decreasing ($t_{y-1}\le t_y$) and $t_{1^k} = 2^m$.

## Bijection between $\{0, 1\}^m$ and non-zero part of $p$
Fixing $t = \big\{t_y \in \{0, 1\}^m\big\}_{y\in\{0,1\}^k}$ as above a admissible sequence of cumulative heights, we construct a (natural) bijection between $\{0, 1\}^m$ and the non-zero part of $p$ via two functions $row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n$ and $col_t : \{0, 1\}^m \rightarrow \{0, 1\}^k$ as follows. Given an index $i \in \{0, 1\}^m$, let $y \in \{0, 1\}^k$ be the smallest such that $i < t_y$. Define $col_t(i) = y$ and $row_t(i) = i − t_{y − 1}$ (where for simplicity of notation we use $t_{0^k−1}$ as a shorthand for 0).
$$
\begin{aligned}
    &row_t : \{0, 1\}^m\rightarrow \{0, 1\}^n\\
    &row_t(i) = i − t_{y − 1}\\
    &\\
    &col_t : \{0, 1\}^m \rightarrow \{0, 1\}^k\\
    &col_t(i) = y
\end{aligned}
$$
Let's apply this bijection to Example 2. Recall that, $\{0,1\}^k = \{0,1\}^2$, and $\{0,1\}^n = \{0,1\}^2$ and since $M = 8 = 2^3 = 2^m$, then $\{0,1\}^m = \{0,1\}^3$. We establish a bijection between:
- **Input Space:** Column indices $i\in\{0,1\}^m = \{0,1\}^3$(binary strings).
- **Output Space:** Non-zero part of jagged function $p$.

For every $i\in\{0,1\}^3$, we try to first find $y$ such that $i<t_y$ and then we define the $col_t(i)$, and $row_t(i)$:
1. Let $i=0\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 0 < t_y$ holds. We choose $y=0$, and since $t_0 = 1$, the inequality $i < t_0$ is satisfied. Thus, we compute: $row_t(i) = i − t_{0 − 1} = i - 0 = 0 - 0 = 0$ and $col_t(i) = y = 0$. Note that we use $t_{0^k − 1}$ as a shorthand for 0.  
2. Let $i=1\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 1 < t_y$ holds. Since $t_0 = 1$, the inequality $i < t_y$ is not satisfied. Next, we choose $y = 1$, for which $t_1 = 2$. Now the condition $i < t_y$ (i.e. $ 1  < t_1 = 2$) holds. Thus, we compute: $row_t(i) = i − t_{1 − 1} = i- t_0 = 1 - 1 = 0$ and $col_t(i) = y = 1$.
3. Let $i=2\in\{0,1\}^3$. We aim want to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 2 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, the inequality $i < t_y$ is not satisfied. Next, we choose $y = 2$, for which $t_2 = 5$. Now, the condition $i < t_y$ (i.e. $2 < t_2 = 5$) holds. Thus, we compute: $row_t(i) = i − t_{2 − 1} = i-t_1 = 2 - 2 = 0$ and $col_t(i) = y = 2$.
4. Let $i=3\in\{0,1\}^3$, We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 3 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, the inequality $3 < t_y$ is not satisfied. Next, we choose $y = 2$, for which $t_2 = 5$. Now, the condition $i < t_y$ (i.e. $3 < t_2 = 5$) holds. Thus, we compute: $row_t(i) = i − t_{2 − 1} = i - t_1 = 3 - 2 = 1$ and $col_t(i) = y = 2$.
5. Let $i=4\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 4 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, the inequality $4 < t_y$ is not satisfied. Next, we choose $y = 2$, for which $t_2 = 5$. Now, the condition $i < t_y$ (i.e. $4 < t_2 = 5$) holds. Thus, we compute: $row_t(4) = 4 − t_{2 − 1} = 4 - t_1 = 4 - 2 = 2$ and $col_t(4) = y = 2$.
6. Let $i=5\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 5 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, and $t_2 = 5$, the inequality $5 < t_y$ is not satisfied. Next, we choose $y = 3$, for which $t_3 = 8$. Now, the condition $i < t_y$ (i.e. $5 < t_3 = 8$) holds. Thus, we compute: $row_t(5) = 5 − t_{3 − 1} = 5 - t_2 = 5 - 5 = 0$ and $col_t(5) = y = 3$.
7. Let $i=6\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 6 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, and $t_2 = 5$, the inequality $6 < t_y$ is not satisfied. Next, we choose $y = 3$, for which $t_3 = 8$. Now, the condition $i < t_y$ (i.e. $6 < t_3 = 8$) holds. Thus, we compute: $row_t(6) = 6 − t_{3 − 1} = 6 - t_2 = 6 - 5 = 1$ and $col_t(6) = y = 3$.
8. Let $i=7\in\{0,1\}^3$. We aim to find the smallest $y\in\{0,1\}^2$ such that the condition $i = 7 < t_y$ holds. Since $t_0 = 1$ and $t_1 = 2$, and $t_2 = 5$, the inequality $7 < t_y$ is not satisfied. Next, we choose $y = 3$, for which $t_3 = 8$. Now, the condition $i < t_y$ (i.e. $7 < t_3 = 8$) holds.Thus, we compute: $row_t(7) = 7 − t_{3 − 1} = 7 - t_2 = 7 - 5 = 2$ and $col_t(7) = y = 3$.
9. Note that $i = 8$, not belongs to $\{0,1\}^3$.
$$
\begin{aligned}
    &row_t: \{0, 1\}^3\rightarrow \{0, 1\}^2&&&col_t : \{0, 1\}^3\rightarrow \{0, 1\}^2\\
    &row_t(0) = 0,&&&col_t(0) = 0,\\ 
    &row_t(1) = 0,&&&col_t(1) = 1,\\ 
    &row_t(2) = 0,&&&col_t(2) = 2,\\
    &row_t(3) = 1,&&&col_t(3) = 2,\\
    &row_t(4) = 2,&&&col_t(4) = 2,\\
    &row_t(5) = 0,&&&col_t(5) = 3,\\
    &row_t(6) = 1,&&&col_t(6) = 3,\\
    &row_t(7) = 2,&&&col_t(7) = 3
\end{aligned}
$$
**Animation 1: Calculating the col_t and row_t**

**Fact 1.** Fix an admissible sequence of cumulative heights $t = \big\{t_y \in \{0, 1\}^m\big\}_{y\in\{0,1\}^k}$ and let $p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}$ be a corresponding jagged function. Then, the mapping $i \mapsto (row_t(i), col_t(i))$ is a bijection between $\{0, 1\}^m$ and the non-zero part of $p$.

Returning to Example 2:
$$
\begin{aligned}
    &\mathrm{map} : \{0, 1\}^3\rightarrow \{(00, 00), (00, 01), (00, 10), (00, 11), (01, 10), (01, 11), (10, 10), (10, 11)\}\\
    &0\mapsto(row_t(0), col_t(0)) = (0, 0) = (00, 00),\\ 
    &1\mapsto(row_t(1), col_t(1)) = (0, 1) = (00, 01),\\ 
    &2\mapsto(row_t(2), col_t(2)) = (0, 2) = (00, 10),\\
    &3\mapsto(row_t(3), col_t(3)) = (1, 2) = (01, 10),\\
    &4\mapsto(row_t(4), col_t(4)) = (2, 2) = (10, 10),\\
    &5\mapsto(row_t(5), col_t(5)) = (0, 3) = (00, 11),\\
    &6\mapsto(row_t(6), col_t(6)) = (1, 3) = (01, 11),\\
    &7\mapsto(row_t(7), col_t(7)) = (2, 3) = (10, 11)
\end{aligned}
$$
**Animation 2: show the bijection**

## Dense Representation of Jagged Function $p$
Define a function $q : \{0, 1\}^m \rightarrow\mathbb{F}$ such that $q(i) = p(row_t(i), col_t(i))$, for every $i \in \{0, 1\}^m$. We refer to $q$ as the *dense representation* of $p$, and to $p$ as the *sparse representation*. In other words $p$ is sparse representation of $q$.

Returning to Example 2, aim to define dense representation of $p$.
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

## Commitment
Our goal is to efficiently commit to the multilinear extension $\tilde{p} : \mathbb{F}^{n+k} \rightarrow \mathbb{F}$ of $p$ (i.e., the unique
multilinear polynomial that agrees with $p$ on $\{0, 1\}^{n+k}$).

The commitment to $\tilde{p}$, is the multilinear oracle $\tilde{q} : \mathbb{F}^m \rightarrow \mathbb{F}$ and the cumulative heights $\{t_y\}_{y\in\{0,1\}^k}$, which are sent in the clear (i.e., not as
an oracle — later when consider methods that avoid this).

Observe that by Fact 1, given the polynomial $\tilde{q}$ and the cumulative heights $\{t_y\}_{y\in\{0,1\}^k}$ the multilinear $\tilde{p}$ is well defined and we denote it by $\tilde{p} = sparse(\tilde{q}, t)$. Our main result is a protocol which reduces a claim on the sparse representation of the function, to a claim about the dense representation.

Returning to our example, we compute $\tilde{q}: \mathbb{F}^3 \rightarrow \mathbb{F}$. Let $x = (x_1,x_2,x_3)\in\mathbb{F}^3$:
$$
\tilde{q}(x) = \sum_{b\in\{0, 1\}^3}q(b)eq(x, b)\qquad\qquad\text{Definition of Multilinear Extension}
$$
First, based on the definition of lagrange basis:
$$
\begin{aligned}
\begin{split}
eq(x_1,x_2,x_3, b) &= \prod_{i=1}^{3}\big(x_ib_i+(1-x_i)(1-b_i)\big)\\
&= \big(x_1b_1+(1-x_1)(1-b_1)\big) * \big(x_2b_2+(1-x_2)(1-b_2)\big) *\big(x_3b_3+(1-x_3)(1-b_3)\big)\\
\end{split}
\end{aligned}
$$
we compute $eq(x,b)$ for all $b\in\{0, 1\}^3 = \{000, 010, 100, 110, 001, 011, 101, 111\}$:
$$
\begin{aligned}
\begin{split}
eq(x_1, x_2, x_3, 000) &= (1-x_1)(1-x_2)(1-x_3) = x_1x_2 - x_1 - x_2 + 1 - x_1x_2x_3 + x_1x_3 + x_2x_3 -x_3,\\
eq(x_1, x_2, x_3, 001) &= (1-x_1)(1-x_2)(x_3) = x_1x_2x_3 - x_1x_3 - x_2x_3 + x_3,\\
eq(x_1, x_2, x_3, 010) &= (1-x_1)(x_2)(1-x_3) = x_1x_2x_3 -x_1x_2 -x_2x_3 + x_2,\\
eq(x_1, x_2, x_3, 011) &= (1-x_1)(x_2)(x_3) = x_2x_3-x_1x_2x_3,\\
eq(x_1, x_2, x_3, 100) &= (x_1)(1-x_2)(1-x_3) = x_1x_2x_3 - x_1x_2 -x_1x_3 + x_1,\\
eq(x_1, x_2, x_3, 101) &= (x_1)(1-x_2)(x_3) = x_1x_3-x_1x_2x_3,\\
eq(x_1, x_2, x_3, 110) &= (x_1)(x_2)(1-x_3) = x_1x_2-x_1x_2x_3,\\
eq(x_1, x_2, x_3, 111) &= (x_1)(x_2)(x_3) = x_1x_2x_3\\
\end{split}
\end{aligned}
$$
Then,
$$
\begin{aligned}
\tilde{q}(x) &= q(000)eq(x, 000) + q(001)eq(x, 001) + q(010)eq(x, 010) + q(011)eq(x, 011)\\
 &\quad+ q(100)eq(x, 100) + q(101)eq(x, 101) + q(110)eq(x, 110) + q(111)eq(x, 111)\\
&=3x_1x_2 - 3x_1 - 3x_2 + 3 - 3x_1x_2x_3 + 3x_1x_3 + 3x_2x_3 - 3x_3\qquad\text{(Since, $q(000) = 3$)}\\
             &\quad + 4x_1x_2x_3 - 4x_1x_3 - 4x_2x_3 + 4x_3\qquad\text{(Since, $q(001) = 4$)}\\
             &\quad + 5x_1x_2x_3 - 5x_1x_2 - 5x_2x_3 + 5x_2\qquad\text{(Since, $q(010) = 5$)}\\
             &\quad + 7x_2x_3 - 7x_1x_2x_3\qquad\text{(Since, $q(011) = 7$)}\\
             &\quad + x_1x_2x_3 - x_1x_2 - x_1x_3 + x_1\qquad\text{(Since, $q(100) = 1$)}\\
             &\quad + 6x_1x_3 - 6x_1x_2x_3\qquad\text{(Since, $q(101) = 6$)}\\
             &\quad + 8x_1x_2 - 8x_1x_2x_3\qquad\text{(Since, $q(110) = 8$)}\\
             &\quad + 9x_1x_2x_3\qquad\text{(Since, $q(111) = 9$)}\\
             &= -5x_1x_2x_3 + 5x_1x_2 + 4x_1x_3 + x_2x_3 - 2x_1 + 2x_2 + x_3 + 3
\end{aligned}
$$
**Verification.** 
To ensure correctness, let's evaluate $\tilde{q}$ at a few points:
- At $(0, 0, 0)$: $\tilde{q}(0, 0, 0) = 3$, matches $q(000) = q(0)$.
- At $(0, 0, 1)$: $\tilde{q}(0, 0, 1) = 1 + 3$, matches $q(001) = q(1)$.
- At $(1, 1, 1)$: $\tilde{q}(1, 1, 1) = -5 + 5 + 4 + 1 - 2 + 2 + 1 + 3 = 9$, matches $q(111) = q(7)$.

The commitment to $\tilde{p}$ is oracle access to $\tilde{q}$ and $\{t_y\}_{y\in\{0,1\}^k} = \{t_y\}_{y\in\{0,1\}^2} = \{t_0,t_1, t_2, t_3\} = \{1, 2, 5, 8\}$.