# Fancy Jagged: When Multiple Columns have the Same Height
In fancy jagged we consider a variant of the jagged PCS in which the columns are grouped into “tables” which are simply a sequence of columns of the same height. Due to a technical limitation, we restrict our attention to tables in which the number of columns (also referred to as the “width”) is always a power of two. Rather than employing expensive padding, tables with other sizes can and should be handled by decomposing them into a logarithmic sequence of tables whose width is a power of 2 (i.e., a table of width 9 can be represented by two tables: one of width 8 and one of width 1).

## Structure
We use $2^k$ to denote the number of tables. Each table $y \in \{0, 1\}^k$ consists of some $2^{c_y}$ columns for an integer $c_y$, and the height of each table is $h_y$. We emphasize that $c_y$ denotes the logarithm of the table $y$’s width.

We use $c = \max_y c_y$ so that the maximal number of columns in each table is $2^c$.

## The Accumulative Table Heights
The accumulative table heights $t = (t_y)_{y\in\{0,1\}^k}$ are now defined as $t_y = \sum_{y^{\prime}<y} 2^{c_{y^{\prime}}} · h_{y^{\prime}}$. We
refer to the sequence $(t_{0^k},\dots, t_{1^k}, c_{0^k},\dots, c_{1^k})$ as a configuration of the sparse polynomial since it determines the “non-zero” part of it.

## Number of non-zero Parts
Given the configuration, the number of non-zeros entries in the sparse polynomial $p$ is now
$M = \sum_{y\in\{0,1\}^k} 2^{c_y} · h_y$. Similarly to basic jagged, we assume (via padding) that $M$ is a power of 2, and denote $m = \log_2(M)$.

## $tab, row, col$ functions
For a fixed configuration, we associate indices $i \in \{0, 1\}^m$ with triples $(tab, row, col)$, where
$tab \in \{0, 1\}^k$, $row \in \{0, 1\}^n$, and $col \in \{0, 1\}^c$ by extending the bijection described in basic jagged in the natural way. We use this mapping to define corresponding functions $tab : \{0, 1\}^m \rightarrow \{0, 1\}^k$,
$row : \{0, 1\}^m \rightarrow \{0, 1\}^n$ and $col : \{0, 1\}^m \rightarrow \{0, 1\}^c$.

## Function $q$
The jagged function $p : \{0, 1\}^{k+n+c} \rightarrow \mathbb{F}$ is now represented by the dense $q : \{0, 1\}^m \rightarrow \mathbb{F}$ defined as $q(i) = p(tab(i), row(i), col(i))$.

## Commitment
The commitment is a dense commitment to $q$ together with the sequence $\big(t_y, c_y\big)_{y\in\{0,1\}^k}$ which is sent explicitly.

## The Goal
As in basic jagged, the goal is to given an interactive protocol that reduces an evaluation claim on $\tilde{p}$ to one on $\tilde{q}$.

## Evaluation Proofs
Fix table heights $t = \big(t_y\big)_{y\in\{0,1\}^k}$ and columns counts $c = \big(c_y\big)_{y\in\{0,1\}^k}$.
Suppose we are given from the verifier an evaluation claim of the form $\tilde{p}(z_tab, z_row, z_col) = v$, where $z_tab \in \mathbb{F}^k$, $z_row \in \mathbb{F}^n$ and $z_col \in \mathbb{F}^c$.

Similarly to basic jagged, observe that:
$$
\begin{align}
    \tilde{p}(z_{tab}, z_{row}, z_{col}) = \sum_{i\in\{0,1\}^m} \tilde{q}(i) · f_{t,c}(z_{tab}, z_{row}, z_{col}, i),
\end{align}
$$
where now $f_{t,c}(z_{tab}, z_{row}, z_{col}, i)$ is a function that given the configuration $(t, c)$ outputs 1 if $i$ is mapped via the natural bijection to $(z_{tab}, z_{row}, z_{col})$ and otherwise outputs 0.


## Define $f_{t,c}$
Define a function $f_{t,c} : \{0, 1\}^k \times \{0, 1\}^n \times \{0, 1\}^c \times \{0, 1\}^m \rightarrow \{0, 1\}$ such that $f_{t,c}(z_{tab}, z_{row}, z_{col}, i) = 1$ if and only if $tab_t(i) = z_{tab}$, $row_t(i) = z_{row}$ and $col_t(i) = z_{col}$. In other words $f_{t,c}$ equals to 1, only when index $i$ maps to the given $(tab_t, row_t, col_t)$, and equals 0 elsewhere. We next show that for every index $i \in \{0, 1\}^m$ and $z_{tab} \in \mathbb{F}^k$ and $z_{row} \in \mathbb{F}^n$ and $z_{col} \in \mathbb{F}^c$, it holds that
$$
\begin{align}
    \tilde{f}_{t,c}(z_{tab}, z_{row}, z_{col}, i) = eq(tab_t(i), z_{tab}) . eq(row_t(i), z_{row}) · eq(col_t(i), z_{col}),
\end{align}
$$
where $\tilde{f}_{t,c}$ is the multilinear extension of $f_{t,c}$.

## Sum-check
To check the claim, as expected, we employ the sum-check protocol (Lemma 2.3). 
### The Prover
To do sum-check protocol the prover needs to compute the sequence $\big(f_{t,c}(z_{tab}, z_{row}, z_{col}, i)\big)_{i\in\{0,1\}^m}$ which, similarly to basic jagged, can be computed by first generating the relevant $eq$ evaluations by using $2^m$ multiplications and $2^m$ additions.

### The Verifier
On the verifier’s side, the result of the sum-check is a claim on $\tilde{q}$ at a point $i \in \mathbb{F}^m$ and one on $\tilde{f}(i)$. The former is the output of the protocol. We show that also in this case, the verifier can compute the latter on its own (or employ a similar “jagged assist” sub-protocol).

For the verifier to compute $\tilde{f}$, following the observation above, we observe that
$$
\begin{aligned}
   f_{t,c}(z_{tab}, z_{row}, z_{col}, i) = \sum_{y\in\{0,1\}^k}eq(z_{tab}, y)\sum_{u}eq(u, c_y) · \tilde{g}_u(z_{row}, z_{col}, i, t_y, t_{y−1})
\end{aligned}
$$
where $g(z_{row}, z_{col}, i, t_y, t_{y−1})$ is a function that checks that $i = t_{y−1} + z_{row} · 2^u + z_{col}$ and $i < t_y$.

## Define $g$
Let $g : \{0, 1\}^n \times \{0, 1\}^c \times \{0, 1\}^{4m} \rightarrow \{0, 1\}$ be defined as $g(a, b, c, d, e, f) = 1$ if and only if $c < e$ and $c = a. 2^d + f + b$.
Let $\tilde{g} : \mathbb{F}^{n+c+4m} \rightarrow \mathbb{F}$ denote the multilinear extension of $g$.