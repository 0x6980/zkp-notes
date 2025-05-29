Efficient Computable g
## Definition of function g
Let $g : \{0, 1\}^n \times \{0, 1\}^{3m} \rightarrow \{0, 1\}$ be defined as $g(a, b, c, d) = 1$ if and only if $b < d$ and $b = a + c$.
Let $\tilde{g} : \mathbb{F}^{n+3m} \rightarrow \mathbb{F}$ denote the multilinear extension of $g$.

## Claim 1
The function $g$ is computable by a width 4 read-once branching program.

Proof. Recall that $n\le m$. With out loose of generality we assume $n = m$ (otherwise we can just pad the a part of the input with zeros). We will use the fact that the branching program is allowed to read the input in any fixed order. Specifically, we rearrange the input to $g$ to consist of symbols over the alphabet 
$$
\Sigma = \{0,1\}^4 = \{\underbrace{0000}_{\text{0}}, \underbrace{0001}_{\text{1}}, \underbrace{0010}_{\text{2}}, \underbrace{0011}_{\text{3}}, \underbrace{0100}_{\text{4}}, \underbrace{0101}_{\text{5}}, \underbrace{0110}_{\text{6}}, \underbrace{0111}_{\text{7}}, \underbrace{1000}_{\text{8}}, \underbrace{1001}_{\text{9}}, \underbrace{1010}_{\text{10}}, \underbrace{1011}_{\text{11}}, \underbrace{1100}_{\text{12}}, \underbrace{1101}_{\text{13}}, \underbrace{1110}_{\text{14}}, \underbrace{1111}_{\text{15}}\}
$$
consisting of the 4 constituent bits of $a, b, c, d$. 
Thus, $g : (\{0, 1\}^4)^m \rightarrow \{0, 1\}$ is defined as follows: given input 
$$
\begin{aligned}
&(a_0,\dots,a_{m-1}, b_0,\dots, b_{m-1}, c_0, \dots, c_{m-1}, d_0, \dots, d_{m-1})\in(\{0,1\}^4)^m,\\
&\text{where}\space a_i,b_i,c_i,d_i\in\{0,1\}
\end{aligned}
$$
does it hold that $b < d$ and $b = a + c$, where
- $a$ is big-endian representation of $a_0\dots a_{m-1}$. In other words $a = \sum_{i=0}^{m-1}a_i2^i = a_02^0 + a_12^1+ a_22^2 + \dots + a_{m-1}2^{m-1}$.
- $b$ is big-endian representation of $b_0\dots b_{m-1}$. In other words $b = \sum_{i=0}^{m-1}b_i2^i = b_02^0 + b_12^1+ b_22^2 + \dots + b_{m-1}2^{m-1}$.
- $c$ is big-endian representation of $c_0\dots c_{m-1}$. In other words $c = \sum_{i=0}^{m-1}c_i2^i = c_02^0 + c_12^1+ c_22^2 + \dots + c_{m-1}2^{m-1}$.
- $d$ is big-endian representation of $d_0\dots d_{m-1}$. In other words $d = \sum_{i=0}^{m-1}d_i2^i = d_02^0 + d_12^1+ d_22^2 + \dots + d_{m-1}2^{m-1}$.

We will construct a ROBP that computes $g$. The width 4 comes from tracking the following states at each step:
1. $carry_i$: Tracks whether $b = a + c$ has been satisfied for the bits read so far.
2. $lt_i$: Tracks whether $b < d$ holds for the bits read so for.

Read $a_0, b_0, c_0, d_0$, then, $a_1, b_1, c_1, d_1$ up to $a_{m-1}, b_{m-1}, c_{m-1}, d_{m-1}$.

**At step 0:**
Start from the source vertex ($v_0$), which has $carry_0 = 0$, $lt_0 = 0$. Recall from the graph of definition of ROBP, source vertex $v_0$ has exactly $2^4$ outgoing edges, labeled by all of the strings in $\Sigma = \{0,1\}^4$. Read $a_0, b_0, c_0, d_0$, Then the edge label is $a_0b_0c_0d_0$.

Note that for symbol $\sigma\in\Sigma = \{0, 1\}^4$, $\varGamma(v_0, \sigma)$ is equal to one of 4 below possibilities: 
$$
\begin{aligned}
&v_1 = (carry_1 = 0, lt_1 = 0),\\
&v_2 = (carry_1 = 1, lt_1 = 0),\\
&v_3 = (carry_1 = 0, lt_1 = 1),\\
&v_4 = (carry_1 = 1, lt_1 = 1)
\end{aligned}
$$
Then, $\varGamma(v_0, a_0b_0c_0d_0)$ is equal to one of above 4 vertices (the reason of ***width 4*** ROBP), which we check it as follows:
- For $b = a + c$: Check if $b_0 = a_0 + c_0$. If not, transition reject, means $g(a, b, c, d) = 0$. If condition holds we update $carry_1 = \mathrm{MSB}(a_0 + c_0)$.
- For $b < d$: Compare $b_0$ and $d_0$:
  - If $b_0 < d_0$, then $b < d$ holds we update $lt_1 = 1$.
  - If $b_0 > d_0$, then $b < d$ is violated. Then transition reject, means $g(a, b, c, d) = 0$.
  - If $b_0 = d_0$, the comparison depends on future bits, we update $lt_1 = 0$.
  
Note that if $\varGamma(v_0, a_0b_0c_0d_0) = v_4$, transition will continue.

**At step 1:** If the computation not rejected at step 0, we will continue the computation at step 1 (layer 1). Suppose $\varGamma(v_0, a_0b_0c_0d_0) = v_{s0}$, which $v_{s0}$ is one of vertices we mentioned at step 0 ($v_1, v_2, v_3, v_4$). 

Same as step 0, in this layer the vertex $v_{s0}$ has exactly $2^4$ outgoing edges, labeled by all of the strings in $\Sigma = \{0,1\}^4$. The ROBP, read $a_1, b_1, c_1, d_1$ and the edge label in this layer is $a_1b_1c_1d_1$. Then, $\varGamma(v_{s0}, a_1b_1c_1d_1)$ is equal to again one of above 4 vertices, Which we check it as follows:
- For $b = a + c$: Check if $b_1 = a_1 + c_1$. If not, transition reject, means $g(a, b, c, d) = 0$. If condition holds we update $carry_2 = \mathrm{MSB}(a_1 + c_1)$.
- For $b < d$: Compare $b_1$ and $d_1$:
  - If $b_1 < d_1$, then $b < d$ holds we update $lt_2 = 1$.
  - If $b_1 > d_1$, then $b < d$ is violated. Then transition reject, means $g(a, b, c, d) = 0$.
  - If $b_1 = d_1$, the comparison depends on future bits, this time we update $lt_2 = 1$ if $tl_0 = 1$.

**At step $i$:**
Given the registers $carry_i$ and $lt_i$, and the input bits $a_{i+1}$, $b_{i+1}$, $c_{i+1}$, $d_{i+1}$, we show how to update the registers. First, in case we find an inconsistency in the addition (namely, if the LSB of $a_{i+1} + c_{i+1} + carry_i$ is not equal to $b_{i+1}$) then the branching program can immediately move to a rejecting sink. In case the addition was consistent, we can update $carry_{i+1}$ to be the MSB of
$a_{i+1} + c_{i+1} + carry_i$. The branching program can update the second register lti+1 to 1 if and only if either $(d_i = 1) ∧ (b_i = 0)$ or if $(d_i = b_i) ∧ lt_i = 1$.

As our registers can take on a total of $2^2 = 4$ possible values, the width of the branching program is $4$.

Explicit transitions for all 16 possible inputs $a_{i}b_{i}c_{i}d_{i}$

| input | $b_i = a_i + c_i$? | $b_i < d_i$? | Transition |
|-------|--------------------|--------------|------------|
| 0000  |0 = 0 + 0 ✔        | 0 < 0 ❌     | reject     |
| 0001  |0 = 0 + 0 ✔        | 0 < 1 ✔      | accept     |
| 0010  |0 = 0 + 1 ❌       | -------      | reject     |
| 0011  |0 = 0 + 1 ❌       | -------      | reject     |
| 0100  |1 = 0 + 0 ❌       | -------      | reject     |
| 0101  |1 = 0 + 0 ❌       | -------      | reject     |
| 0110  |1 = 0 + 1 ✔        | 1 < 0 ❌     | reject     |
| 0111  |1 = 0 + 1 ✔        | 1 < 1 ❌     | reject     |
| 1000  |0 = 1 + 0 ❌       | -------      | reject     |
| 1001  |0 = 1 + 0 ❌       | -------      | reject     |
| 1010  |0 = 1 + 1 ✔        | 0 < 0 ❌     | reject     |
| 1011  |0 = 1 + 1 ✔        | 0 < 1  ✔     | accept     |
| 1100  |1 = 1 + 0 ✔        | 1 < 0 ❌     | reject     |
| 1101  |1 = 1 + 0 ✔        | 1 < 1 ❌     | reject     |
| 1111  |1 = 1 + 1 ❌       | -----        | reject     |

Only two inputs $0001$, $1011$, transition will accept and all others go to reject.