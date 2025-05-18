## Notation
- Finite field $\mathbb{F}$
- Arithmetic circuit $\mathcal{C}$ of depth $d$ and size (number of gates) $s$
- Boolean hypercube $\{0,1\}^n$
- Boolean circuit
- layered circuit
- Sumcheck protocol
- Fan-in: The number of inputs a gate has is known as fan-in.
- Multilinear extension

# Sum-check Protocol
## Example 1
Let $g(x_1, x_2) = x_1 + x_2$ be a 2-variate polynomial defined over a finite field $\mathbb{F}$. The purpose of the sum-check protocol is for prover to provide the verifier with the following sum:
$$
\begin{aligned}
\begin{split}
    H:&= \sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}g(b_1, b_2)\\
\end{split}
\end{aligned}
$$
Some time we show the above sum as 
$$
\begin{aligned}
\begin{split}
    H:&= \sum_{\substack{(b_1, b_2)\in\{0,1\}^{2}}} g(b_1, b_2)\\
\end{split}
\end{aligned}
$$
### Step 1
At the start of the protocol, the prover sends a value $C_1$ claimed to equal the value $H$ defined in above sum. Note that $C_1$ is claimed value by prover and $H$ is the real value of the summation. Recall form our 2-variant polynomial $g(x_1, x_2) = x_1 + x_2$ suppose the prover claimed $C_1 = 4$ is equal to summation.
### Step 2
In the first round, the prover sends the univariate polynomial $g_1(x_1)$ claimed to equal
$$
\begin{aligned}
\begin{split}
    &\sum_{\substack{b_2\in\{0,1\}}}g(x_1, b_2)
\end{split}
\end{aligned}
$$
### Step 3
1. The verifier checks that $C_1 = g_1(0) + g_1(1)$.

    Now, we are going to simple formulation of the above sum as follow to clarify why the verifier checks $C_1 = g_1(0) + g_1(1)$:
    $$
    \begin{aligned}
    \begin{split}
        H:&= \sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}g(b_1, b_2)\\
        &\\
        &=\sum_{\substack{b_1\in\{0,1\}}} \big(g(b_1, 0) + g(b_1, 1)\big)\\
        &\\
        &=\sum_{\substack{b_1\in\{0,1\}}}g_1(b_1)\space\space\space\space\space\space\big(\text{by considering $g(b_1, 0) + g(b_1, 1)=g_1(b_1)$}\big)\\
        &\\
        &= g_1(0) + g_1(1)
    \end{split}
    \end{aligned}
    $$
    We define a univariate polynomial $g_1(x_1) = g(x_1, 0) + g(x_1, 1)$. So, based on above calculation $H$ is equal to $g_1(0) + g_1(1)$. So, the prover if want to pass the first check of the verifier should define claimed $g_1(x_1)$ as we defined above. Back to our example, the prover generate the $g_1$ univariate polynomial as follow:
    $$
    \begin{aligned}
    \begin{split}
        g_1(x_1)&=g(x_1, 0) + g(x_1, 1)\\
        &\\
        &= x_1 + x_1 + 1\\
        &\\
        &= 2x_1 + 1\\
    \end{split}
    \end{aligned}
    $$
2. Moreover the verifier also check that $g_1$ is a univariate polynomial of degree at most $\mathrm{deg}_1(g)$, rejecting if not. Here, $\mathrm{deg}_1(g)$ denotes the degree of $g(x_1,x_2) = x_1 + x_2$ in variable $x_1$. In other words $\mathrm{deg}_1(g) = \mathrm{deg}(x_1) = 1$.

    Then the verifier calculate $g_1(0) + g_1(1)$ as follow:

    $$
    g_1(0) + g_1(1) = (0 + 1) + (2 + 1) = 4
    $$
    which is equal to $C_1 = 4$, claimed value by the prover.

3. The verifier chooses a random element $r_1 = 2 \in\mathbb{F}$, and sends $r_1$ to the prover.

### Step 4
In last round (round 2), the prover sends to the verifier a univariate polynomial $g_2(x_2)$ claimed to equal
$$
g(r_1, x_2) = r_1 + x_2 = 2 + x_2
$$
So, the prover if want to pass verifier checks should choose $g_2$ as follow:
$$
g_2(x_2) = 2+x_2 
$$

### Step 5
The verifier checks that $g_2$ is a univariate polynomial at most degree $\mathrm{deg}_2(g)$, rejecting if not, and also checks that $g_1(r_1) = g_2(0) + g_2(1)$. Lets calculate these values for verifier:
$$
\mathrm{deg}_2(g) = \mathrm{deg}_2(x_1+x_2) = \mathrm{deg}(x_2) = 1
$$
So the degree check will pass.
$$
g_1(r_1) = g_1(2) = 2\times 2 +  1 = 5
$$
and
$$
g_2(0) + g_2(1) = (2 + 0) + (2+1) = 5
$$
Then the equality $g_1(r_1) = g_2(0) + g_2(1)$ holds.
After that the verifier choose $r_2 = 3\in\mathbb{F}$ and evaluates $g(r_1, r_2) = r_1 + r_2 = 2 + 3 = 5$ with a **single oracle query** to $g$. For final action the verifier checks $g_2(r_2) = g(r_1,r_2)$. rejecting if not. Lets do it:
$$
g_2(r_2) = g_2(3) = 2 + 3 = 5
$$
Then the verifier check pass and accept the first claim of prover which is that the value of sum is $c_1 = 4$.

## Example 2
Note that we did the sum-check protocol in 2 round, which is equal to number of variate of polynomial $g$. Lets do the sum-check protocol on a 3-variate polynomial 
$$
g(x_1, x_2, x_3) = 2x_1 + x_1x_2 + 3x_3
$$
which $H$ will be as follow
$$
\begin{aligned}
\begin{split}
    H:&= \sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}g(b_1, b_2, b_3)\\
\end{split}
\end{aligned}
$$

### Step 1
At the start of the protocol, the prover sends a value $C_1$ claimed to equal the value $H$. Note that $C_1$ is claimed value by prover and $H$ is the real value of the summation. Suppose the prover claimed $C_1 = 22$ is equal to the summation.

### Step 2
In the first round, the prover sends the univariate polynomial $g_1(x_1)$ claimed to equal
$$
\begin{aligned}
\begin{split}
    &\sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}g(x_1, b_2, b_3)
\end{split}
\end{aligned}
$$
As mentioned in previous example the prover should choose the $g_1(x_1)$ that the verifier check will pass. Lets do it together as follow:
$$
\begin{aligned}
\begin{split}
    g_1(x_1)&=\sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}g(x_1, b_2, b_3)\\
    &\\
    &=\sum_{\substack{b_2\in\{0,1\}}}\big(g(x_1, b_2, 0) + g(x_1, b_2, 1)\big)\\
    &\\
    &=g(x_1, 0, 0) + g(x_1, 0, 1) + g(x_1, 1, 0) + g(x_1, 1, 1)\\
    &\\
    &=(2x_1) + (2x_1 + 3) + (2x_1 + x_1) + (2x_1 + x_1 + 3)\\
    &\\
    &= 10x_1 + 6
\end{split}
\end{aligned}
$$

### Step 3
The verifier do the 3 below items :
1. The verifier checks that $g_1$ is a univariate polynomial of degree at most $\mathrm{deg}_1(g)$, rejecting if not.
2. The verifier checks that $C_1 = g_1(0) + g_1(1)$.
3. The verifier chooses a random element $r_1 \in\mathbb{F}$, and sends $r_1$ to the prover.
First $\mathrm{deg}_1(g) = 1$ and $\mathrm{deg}(g_1(x_1)) = 1$. 
$$
g_1(0) + g_1(1) = (0 + 6) + (10 + 6) = 22
$$
Which is equal to $C_1 = 22$.
For lat action of the verifier in this step he chooses a random element $r_1 = 4 \in\mathbb{F}$, and sends $r_1 to the prover.

### Step 4
Note that in this example round 2 is not the last round of the protocol. In round 2, the prover sends to the verifier a univariate polynomial $g_2(x_2)$ claimed to equal
$$
\sum_{\substack{b_3\in\{0,1\}}}g(r_1, x_2, b_3)
$$
As always the prover should choose the $g_2(x_2)$ that the verifier checks will pass. Lets do it together as follow:

$$
\begin{aligned}
\begin{split}
    g_2(x_2)&=\sum_{\substack{b_3\in\{0,1\}}}g(r_1, x_2, b_3)\\
    &\\
    &=g(r_1, x_2, 0) + g(r_1, x_2, 1)\\
    &\\
    &=g(4, x_2, 0) + g(4, x_2, 1)\\
    &\\
    &= (2\times 4 + 4x_2 + 3\times 0) + (2\times 4 + 4x_2 + 3\times 1)\\
    &\\
    &=(8 + 4x_2) + (8 + 4x_2 + 3)\\
    &\\
    &= 8x_2 + 19
\end{split}
\end{aligned}
$$

### Step 5
In respond of round 2, the verifier checks that $g_2$ is a univariate polynomial of degree at most $\mathrm{deg}_2(g)$, and $g_1(r_1) = g_2(0) + g_2(1)$, rejecting if not.

First $\mathrm{deg}_2(g) = \mathrm{deg}(x_1x_2) = 1$ and $\mathrm{deg}(g_2(x_2)) = \mathrm{deg}(8x_2+19) = 1$.

Since $g_1(x_1) = 10x_1 + 6$, then
$$
g_1(r_1) = g_1(4) = 10\times 4 + 6 = 46
$$
and,
$$
g_2(0) + g_2(1) = 19 + 8 + 19 = 46
$$

The verifier chooses a random element $r_2 = 5 \in\mathbb{F}$, and sends $r_2$ to the prover.

### Step 6
In last round (Round 3), the prover sends to the verifier a univariate polynomial $g_3(x_3)$ claimed to equal
$$
g(r_1, r_2, x_3) = 2\times r_1 + r_1.r_2 + 3x_3 = 2\times 4 + 4\times 5 + 3x_3 = 3x_3 + 28
$$
So, the prover if want to pass verifier checks should choose $g_2$ as follow:
$$
g_3(x_3) = 3x_3 + 28
$$

### Step 7
The verifier checks that $g_3$ is a univariate polynomial at most degree $\mathrm{deg}_3(g)$, and $g_2(r_2) = g_3(0) + g_3(1)$, rejecting if not. Lets calculate these values for the verifier:
$$
\mathrm{deg}_2(g) = \mathrm{deg}_2(2x_1+ x_1x_2+ 3x_3) = \mathrm{deg}(x_1x_2) = 1
$$
So the degree check will pass. Since $g_2(x_2) = 8x_2 + 19$
$$
g_2(r_2) = g_2(5) = 8\times 5 +  19 = 59
$$
and since $g_3(x_3) = 3x_3 + 28$
$$
g_3(0) + g_3(1) = (0 + 28) + (3+28) = 59
$$
Then the equality $g_2(r_2) = g_3(0) + g_3(1)$ holds.
After that the verifier choose $r_3 = 6\in\mathbb{F}$ and evaluates $g(r_1, r_2, r_3) = 2r_1 + r_1r_2 + 3.r_2 = 2\times 4 + 4\times 5 + 3\times 6 = 46$ with a **single oracle query** to $g$. For final action the verifier checks $g_3(r_3) = g(r_1,r_2,r_3)$. rejecting if not. Lets do it:
$$
g_3(r_3) = g_3(6) = 3\times 6 + 28 = 46
$$
Then the verifier check pass and accept the first claim of prover which is that the value of sum is $C_1 = 22$.














































Suppose we are given a $v$-variate polynomial $g$ defined over a finite field $\mathbb{F}$. The purpose of the sum-check protocol is for prover to provide the verifier with the following sum:
$$
\begin{equation}
\begin{split}
    H:&= \sum_{\substack{(b_1, b_2, \dots,b_v)\in\{0,1\}^{v}}} g(b_1, b_2, \dots,b_v)\\
    &\\
    &=\sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}\dots\sum_{\substack{b_v\in\{0,1\}}}g(b_1, b_2, \dots,b_v)
\end{split}
\end{equation}
$$

## Example 3 
Let $g(x_1, x_2, x_3, x_4) = 2x_1^3 +x_1x_3 +x_2x_3 + x_4$, The sum of $g$'s evaluations over the Boolean hypercube is $H = 26$.

Note that $H$ is a calculated amount and not a polynomial.

## Some facts for above summation
Without use of generality consider the above summation in 4-variant polynomial $g(x_1, x_2, x_3, x_4)$ and we want to define a polynomial named $s_1(x_1)$ as follow:
$$
\begin{aligned}
    s_1(x_1) &=\sum_{\substack{(b_2, b_3, b_4)\in\{0,1\}^{3}}} g(x_1, b_2, b_3, b_4)\\
    &=\sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}\sum_{\substack{b_4\in\{0,1\}}}g(x_1, b_2, b_3, b_4)\\
    &= \sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}\big(g(x_1, b_2, b_3, 0) + g(x_1, b_2, b_3, 1)\big)\\
    &= \sum_{\substack{b_2\in\{0,1\}}}\big((x_1, b_2, 0, 0) + g(x_1, b_2, 0, 1) + g(x_1, b_2, 1, 0) + g(x_1, b_2, 1, 1)\big)\\
    &= \big(g(x_1, 0, 0, 0) + g(x_1, 0, 0, 1) + g(x_1, 0, 1, 0) + g(x_1, 0, 1, 1)\big)\\
    &+ \big((x_1, 1, 0, 0) + g(x_1, 1, 0, 1) + g(x_1, 1, 1, 0) + g(x_1, 1, 1, 1)\big)\\
\end{aligned}
$$
which is a univariate polynomial. Now it is obvious that 
$$
\begin{equation}
    \begin{split}
        H = s_1(0) + s_1(1)
    \end{split}
\end{equation}
$$
because
$$
\begin{aligned}
    s_1(0) + s_1(1) &= \sum_{\substack{b_1\in\{0,1\}}}s_1(b_1)\\
    &= \sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{(b_2, b_3, b_4)\in\{0,1\}^{3}}} g(b_1, b_2, b_3, b_4)\\
    &=\sum_{\substack{(b_1, b_2, b_3, b_4)\in\{0,1\}^{4}}} g(b_1, b_2, b_3, b_4)\\
    &= H
\end{aligned}
$$

### Example 1
Suppose $g(x_1, x_2, x_3, x_4) = 2x_1^3 +x_1x_3 +x_2x_3 + x_4$, then $s_1(x_1)$ is as follow:
$$
\begin{aligned}
    s_1(x_1)&=\sum_{\substack{(b_2, b_3, b_4)\in\{0,1\}^{3}}} g(x_1, b_2, b_3, b_4)\\
            &= 2x_1^3&\text{because $g(x_1, 0, 0, 0)$}\\
            &+ (2x_1^3 + 1)&\text{because $g(x_1, 0, 0, 1)$}\\ 
            &+ (2x_1^3 + x_1)&\text{because $g(x_1, 0, 1, 0)$}\\ 
            &+ (2x_1^3 +x_1 + 1)&\text{because $g(x_1, 0, 1, 1)$}\\
            &+ (2x_1^3)&\text{because $g(x_1, 1, 0, 0)$}\\
            &+ (2x_1^3 + 1)&\text{because $g(x_1, 1, 0, 1)$}\\
            &+ (2x_1^3 + x_1 + 1)&\text{because $g(x_1, 1, 1, 0)$}\\
            &+ (2x_1^3 + x_1 + 1 + 1)&\text{because $g(x_1, 1, 1, 1)$}\\
            &= 14x_1^3 + 4x_1 + 6&
\end{aligned}
$$
**Notation.** Let $\mathrm{deg}_i(g)$ denote the degree of variable $x_i$ in $g$. For example in polynomial $2x_1^3 +x_1x_3 +x_2x_3 + x_4$
$$
\begin{aligned}
    &\mathrm{deg}_1(g) = \mathrm{deg}(2x_1^3) = 3\\
    &\mathrm{deg}_2(g) = \mathrm{deg}(x_2x_3) = 1\\
    &\mathrm{deg}_3(g) = \mathrm{deg}(x_1x_3) = 1\\
    &\mathrm{deg}_4(g) = \mathrm{deg}(x_4) = 1\\
\end{aligned}
$$

## Description of the Start of the Protocol
Without use of generality consider $g(x_1, x_2, x_3, x_4)$ is a 4-variant polynomial.

At the start of the sum-check protocol, the prover sends a value
$C_1$ claimed to equal the true answer (i.e., the quantity $H$ defined in Equation (1)). The sum-check protocol proceeds in $v$ rounds, one for each variable of $g$. 
### Description of Round 1
At the start of the first round, the prover sends a polynomial $g_1(x_1)$ claimed to equal the polynomial $s_1(x_1)$.

1. Accordingly, the verifier checks that $C_1 = g_1(0) + g_1(1)$, i.e., the verifier checks that $g_1$ and the claimed answer $C_1$ are consistent with Equation (2).

2. If the prover is honest, the polynomial $g_1(x_1)$ has degree $\mathrm{deg}_1(g)$.

#### Example
In Example 1 we calculated $g_1(x_1)$ which is $14x_1^3 + 4x_1 + 6$. In round 1, $\mathcal{V}$ should check 2 conditions:
1. $C_1 = g_1(0) + g_1(1)$
2. $\mathrm{deg}_1(g) = \mathrm{deg}(g_1)$


The idea of the sum-check protocol is that $\mathcal{V}$ will
probabilistically check this equality of polynomials holds by picking a random field element $r_1\in\mathcal{F}$, and confirming that
$$
    g_1(r_1) = s_1(r_1)
$$
Clearly, if $g_1$ is as claimed, then this equality holds for all $r_1\in\mathbb{F}$

The remaining issue is the following: can $\mathcal{V}$ efficiently compute both $g_1(r_1)$ and $s_1(r_1)$, in order to check that Equation holds? Since $\mathcal{P}$ sends $\mathcal{V}$ an explicit description of the polynomial $g_1$, it is possible for $\mathcal{V}$ to evaluate $g_1(r_1)$ in $\mathrm{O}(deg_1(g))$ time. In contrast, evaluating $s_1(r_1)$ is not an easy task for $\mathcal{V}$, as $s_1$ is defined as a sum over $2^{v−1}$ evaluations of $g$. This is only a factor of two smaller than the number of terms in the sum defining $H$ (Equation (1)). Fortunately, Equation (2) expresses $s_1$ as the sum of the evaluations of a ($v − 1$)-variate polynomial over the Boolean hypercube (the polynomial being $g(r_1,x_2,\dots,x_v)$ that is  defined over the variables $x_2,\dots,x_v$). This is exactly the type of expression that the sum-check protocol
is designed to check. Hence, rather than evaluating $s_1(r_1)$ on her own, $\mathcal{V}$ instead recursively applies the
sum-check protocol to evaluate $s_1(r_1)$.

### Description of Rounds 2
At the start of round 2, variable $x_1$ have already been bound to random field element $r_1$. The prover sends a polynomial $g_2(x_2)$, and claims that
$$
g_2(x_2) = \sum_{\substack{(b_3, b_4)\in\{0,1\}^{2}}} g(r_1, x_2, b_3, b_4)\\
$$
The verifier compares the two most recent polynomials by checking
$$
g_1(r_1) = g_2(0) + g_2(1)
$$
and rejecting otherwise. The verifier also rejects if the degree of $g_2$ is too high: $g_2$ should have degree at most $deg_2(g)$, the degree of variable $x_2$ in $g$. If these checks pass $\mathcal{V}$ chooses a value $r_2$ uniformly at random from
$\mathbb{F}$ and sends $r_2 to $\mathcal{P}$.

### Description of Rounds 3
At the start of round 3, variables $x_1, x_2$ have already been bound to random field elements $r_1, r_2$. The prover sends a polynomial $g_3(x_3)$, and claims that
$$
g_3(x_3) = \sum_{\substack{b_4\in\{0,1\}}} g(r_1, r_2, x_3, b_4)\\
$$
The verifier compares the two most recent polynomials by checking
$$
g_2(r_2) = g_3(0) + g_3(1)
$$
and rejecting otherwise. The verifier also rejects if the degree of $g_3$ is too high: $g_3$ should have degree at most $deg_3(g)$, the degree of variable $x_3$ in $g$. If these checks pass $\mathcal{V}$ chooses a value $r_3$ uniformly at random from
$\mathbb{F}$ and sends $r_3 to $\mathcal{P}$.

### Description of Rounds 4, the final round
In the final round, the prover has sent $g_4(x_4) which is claimed to be $g(r1, r_2, r_3, x_4)$. $\mathcal{V}$ now checks that $g_4(r_4) = g(r1, r_2, r_3, r4)$ (recall that we assumed $\mathcal{V}$ has oracle access to $g$). If this check succeeds, and so do all previous checks, then the verifier is convinced that $H = g_1(0)+g_1(1)$.

# Arithmetic Circuit
An Arithmetic circuit $\mathcal{C}$ over field $\mathbb{F}$ is a directed graph whose nodes are labeled $+$, $*$, computing field element addition and multiplication respectively, for the values on the incoming wires.

# Layered Arithmetic Circuit
A circuit is layered if it can be partitioned into subsets called layers, such that every wire in the circuit is between adjacent layers. Each gate belongs to a layer, and each gate in layer $i$ is connected by neighbors only layer $i+1$.
We call the number of layers the depth of the circuit, which is denoted by $d$. We also assume all the gates in the circuit have two inputs. Let 0 denotes the output layer and $d$ denotes the input layer. Correspondingly, we denote the input vector as $v_d$, and the output vector as $v_0$.  In addition to the public inputs, the circuit may also take in a witness vector that is only known to the prover. We use $w$ to denote the witness vector. 
Fig. 1 depicts two small layered circuits where the left one only has public inputs, while the right one takes in both the public inputs and the witness

# Example
## Overview of GKR rotocol
Suppose we are given a layered arithmetic circuit $\mathcal{C}$ of size $S$, depth $d$, and fan-in two ($\mathcal{C}$ may have more than one output gate). Number the layers from 0 to $d$, with 0 being the output layer and $d$ being the input layer. Let $S_i$ denote the number of gates at layer $i$ of the circuit $\mathcal{C}$. Assume $S_i$ is a power of 2 and let $S_i = 2^{k_i}$. The GKR protocol makes use of several functions, each of which encodes certain information about the circuit.

Consider the below circuit, which depicts an example circuit $\mathcal{C}$ and input to $\mathcal{C}$ and describes the resulting function $W_i$ for each layer $i$ of $\mathcal{C}$

<!-- ![layered circuit](/pages/images/layeredCircuit.png) -->

Consider 2-depth and fan-in 2, arithmetic circuit $\mathcal{C}$ that computing $(x_1\times x_2)\times(x_3\times x_4)$. We know, depth $d=2$, number the layers from 0 to $d$, with 0 being the output layer and $d$ being the input layer where:
- **Layer 0 (Output):** Single gate computing the final result.
- **Layer 1 (Intermediate):** Two multiplication gates ($x_1\times x_2$ and $x_2\times x_4$).
- **Layer 2 (Inputs):** Four inputs gates ($x_1, x_2, x_3, x_4$).

We will use $\mathbb{F}_{11}$ for concreteness and set $x_1 = 2, x_2 = 3, x_3 = 4, x_4 = 5$. So, $(2.3).(4.5) = 6.20 \equiv 6.9\equiv 54\equiv 10$.

## W_i
Let $S_i$ denote the number of gates at layer $i$ of the circuit $\mathcal{C}$ (In general we assume $S_i$ is a power of 2 and $S_i = 2^{k_i}$). You can see that
$$
\begin{aligned}
    &S_0 = 1 = 2^0\space\space\text{implies}\space\space k_0 = 0,\\
    &S_1 = 2 = 2^1 \space\space\text{implies}\space\space k_1 = 1,\\
    &S_2 = 4 = 2^2 \space\space\text{implies}\space\space k_2 = 2
\end{aligned}
$$
Number the gates at each layer with function
$$
W_i : \{0,1\}^{k_i} \rightarrow \mathbb{F}
$$
that takes as input a binary gate label, and outputs the corresponding gate’s value at layer $i$. Let $\widetilde{W_i}$ denote the multilinear extension of $W_i$.

So, based on our example:

For layer 0, we have $W_0 = 10$, a constant function.

For layer 1:
$$
\begin{aligned}
    &W_1 : \{0,1\}^{k_1} = \{0,1\} \rightarrow \mathbb{F},\\
    &W_1(0) = 6,\space\space W_1(1) = 9
\end{aligned}
$$
For layer 2:
$$
\begin{aligned}
    &W_2 : \{0,1\}^{k_2} = \{0,1\}^2 \rightarrow \mathbb{F}\\
    &W_2(0,0) = 2,\space\space W_2(0,1) = 3,\space\space W_2(1,0) = 4,\space\space W_2(1,1) = 5
\end{aligned}
$$
We should write about multilinear extension $\widetilde{W}_i$ of $W_i$

WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

## In1 and In2
The GKR protocol also makes use of the notion of a “wiring predicate” that encodes which pairs of wires from layer $i+1$ are connected to a given gate at layer $i$ in $\mathcal{C}$. Let
$$
\begin{aligned}
    &\mathrm{in}_{1,i} : \{0,1\}^{k_i} \rightarrow \{0,1\}^{k_{i+1}}\\
    &\mathrm{in}_{2,i} : \{0,1\}^{k_i} \rightarrow \{0,1\}^{k_{i+1}}
\end{aligned}
$$
denote the functions that take as input the label $a$ of a gate at layer $i$ of $\mathcal{C}$, and respectively output the label of the first and second in-neighbor of gate $a$. So, for example, if gate $a$ at layer $i$ computes the sum of gates $b$ and $c$ at layer $i+1$, then $\mathrm{in}_{1,i}(a) = b$ and $\mathrm{in}_{2,i}(a) = c$.

For our example in layer 0
$$
\begin{aligned}
    &\mathrm{in}_{1,0}(0) = 0\\
    &\mathrm{in}_{2,0}(0) = 1
\end{aligned}
$$
For layer 1
$$
\begin{aligned}
    &\mathrm{in}_{1,1}(0) = (0,0)\\
    &\mathrm{in}_{2,1}(0) = (0,1)\\
    &\mathrm{in}_{1,1}(1) = (1,0)\\
    &\mathrm{in}_{2,1}(0) = (1,1)
\end{aligned}
$$

## Add and Mul
Define two functions, $\mathrm{add}_i$ and $\mathrm{mult}_i$, mapping $\{0,1\}^{k_i+2k_{i+1}}$ to {0,1},
$$
\begin{aligned}
    &\mathrm{add}_i : \{0,1\}^{k_i}\times \{0,1\}^{k_{i+1}}\times \{0,1\}^{k_{i+1}}\rightarrow\{0,1\}\\
    &\\
    &\mathrm{mul}_i : \{0,1\}^{k_i}\times \{0,1\}^{k_{i+1}}\times \{0,1\}^{k_{i+1}}\rightarrow\{0,1\}\\
\end{aligned}
$$
which together constitute the wiring predicate of layer $i$ of $\mathcal{C}$. Specifically, these functions take as input three gate labels $(a,b,c)$, and return 1 if and only if $(b,c) = (\mathrm{in}_{1,i}(a), \mathrm{in}_{2,i}(a))$ and gate $a$ is an addition (respectively, multiplication) gate.
$$
\begin{aligned}
    &\mathrm{add}_i(a,b,c) = \Bigg\lbrace^{1\space\space\space\space\space b\space = \space\mathrm{in}_{1,i}(a)\space\text{and}\space c\space= \space\mathrm{in}_{2,i}(a)\space\text{and $a$ is a addition gate}}_{0\space\space\space\space\space\text{O.W.}}
\end{aligned}
$$
and 
$$
\begin{aligned}
    &\mathrm{mul}_i(a,b,c) = \Bigg\lbrace^{1\space\space\space\space\space(b,c)\space = \space\big(\mathrm{in}_{1,i}(a),\space \mathrm{in}_{2,i}(a)\big)\space\text{and $a$ is a multiplication gate}}_{0\space\space\space\space\space\text{O.W.}}
\end{aligned}
$$
Note that in above functions $a\in\{0,1\}^{k_i}$ and $b,c\in\{0,1\}^{k_{i+1}}$.

For our example since the circuit contains no addition gates, $\mathrm{add}_0$ and $\mathrm{add}_1$ are the constant $0$ function. Meanwhile, $\mathrm{mult}_0$ is the function defined over domain $\{0,1\} \times \{0,1\}^2 \times \{0,1\}^2$ as follows. $\mathrm{mult}_0$ evaluates to 1 on the following two inputs: $(0,(0,0),(0,1))$ and $(1,(1,0),(1,1))$. On all other inputs, $\mathrm{mult}_0$ evaluates to zero.
$$
\begin{aligned}
&\mathrm{mult}_0: \{0,1\} \times \{0,1\}^2 \times \{0,1\}^2\rightarrow \{0, 1\}\\
&(0,(0,0),(0,1))\rightarrow 1\\
&(1,(1,0),(1,1))\rightarrow 1\\
&\text{On all other inputs, $\mathrm{mult}_0$ evaluates to zero}
\end{aligned}
$$
This is because the first and second in-neighbors of gate 0 at layer 0 are respectively gates (0,0) and (0,1) at layer 1, in other words 
$$
\begin{aligned}
    &\mathrm{in}_{1,0}(0) = (0,0),\\ 
    &\mathrm{in}_{2,0}(0) = (0,1)
\end{aligned}
$$
and similarly the first and
second in-neighbors of gate 1 at layer 0 are respectively gates (1,0) and (1,1) at layer 1, in other words
$$
\begin{aligned}
    &\mathrm{in}_{1,0}(1) = (1,0),\\ 
    &\mathrm{in}_{2,0}(1) = (1,1)
\end{aligned}
$$
Similarly, $\mathrm{mult}_1$ is a function on domain $\{0,1\}^2 \times \{0,1\}^2 \times \{0,1\}^2$. It evaluates to 0 on all inputs except for the following four, on which it evaluates to 1:
$$
\begin{aligned}
    &\big((0,0),(0,0),(0,0)\big)\\
    &\big((0,1),(0,1),(0,1)\big)\\
    &\big((1,0),(0,1),(1,0)\big)\\
    &\big((1,1),(1,1),(1,1)\big)
\end{aligned}
$$
Note that for each layer $i$, $\mathrm{add}_i$ and $\mathrm{mult}_i$ depend only on the circuit $\mathcal{C}$ and not on the input $x$ to $\mathcal{C}$. In contrast, the function $W_i$ does depend on $x$. This is because $W_i$ maps each gate label at layer $i$ to the value of the gate when $\mathcal{C}$ is evaluated on input $x$.

As usual, let $\widetilde{\mathrm{add}}_i$ and $\widetilde{\mathrm{mult}}_i$ denote the multilinear extensions of $\mathrm{add}_i$ and $\mathrm{mult}_i$. 

## Interaction of protocol
**Continue Example.**



**Detailed Description.** The GKR protocol consists of $d$ iterations, one for each layer of the circuit. Each iteration $i$ starts with $\mathcal{P}$ claiming a value for $\widetilde{W}_i(r_i)$ for some point in $r_i\in\mathbb{F}^{k_i}$.

At the start of the first iteration, this claim is derived from the claimed outputs of the circuit. Specifically, if there are $S_0 = 2^{k_0}$ outputs of $\mathcal{C}$, let $D: {0,1}^{k_0} \rightarrow \mathbb{F}$ denote the function that maps the label of an output gate to the claimed value of that output. Then the verifier can pick a random point $r_0\in\mathbb{F}^{k_0}$, and evaluate $\widetilde{D}(r_0)$ in time $\mathrm{O}(S_0)$ using Lemma [3.8](). By the [Schwartz-Zippel lemma](), if $\widetilde{D}(r_0) = \widetilde{W}_0(r_0)$ (i.e., if the multilinear
extension of the claimed outputs equals the multilinear extension of the correct outputs when evaluated at a randomly chosen point), then it is safe for the verifier to believe that $\widetilde{D}$ and $\widetilde{W}_0$ are the same polynomial, and hence that all of the claimed outputs are correct. **Unfortunately, the verifier cannot evaluate $\widetilde{W}_0(r_0)$ without help from the prover**.

The purpose of iteration $i$ is to reduce the claim about the value of $\widetilde{W}_i(r_i)$ to a claim about $\widetilde{W}_{i+1}(r_{i+1})$ for
some $r_{i+1}\in F^{k_{i+1}}$, in the sense that it is safe for $\mathcal{V}$ to assume that the first claim is true as long as the second claim is true.
$$
\begin{aligned}
    &\text{iteration $0$ starts with $\mathcal{P}$ claiming a value for $\widetilde{W}_0(r_0)$ for some point in $r_0\in\mathbb{F}^{k_0}$}&\\
    &\Downarrow\text{$\mathcal{V}$ cannot evaluate $\widetilde{W}_0(r_0)$}&\\
    &\text{iteration $1$ starts with $\mathcal{P}$ claiming a value for $\widetilde{W}_1(r_1)$ for some point in $r_1\in\mathbb{F}^{k_1}$}&\\
    &\Downarrow\text{$\mathcal{V}$ cannot evaluate $\widetilde{W}_1(r_1)$}&\\
    &\vdots\\
    &\text{iteration $d$ starts with $\mathcal{P}$ claiming a value for $\widetilde{W}_d(r_d)$ for some point in $r_d\in\mathbb{F}^{k_d}$}&\\
    &
\end{aligned}
$$
To accomplish this, the iteration applies the sum-check protocol to a specific polynomial derived from $\widetilde{W}_{i+1}$, $\widetilde{\mathrm{add}}_i$ and $\widetilde{\mathrm{mult}}_i$

## Applying the Sum-Check Protocol
**Lemma**.
The GKR protocol exploits an ingenious explicit expression for $\widetilde{W}_i(r_i)$, captured in the following.
$$
\widetilde{W}_i(z) = \sum_{b,c\in\{0,1\}^{k_{i+1}}} \widetilde{\mathrm{add}}_i(z, b, c)(\widetilde{W}_{i+1}(b) + \widetilde{W}_{i+1}(c)) + \widetilde{\mathrm{mult}}_i(z, b, c)(\widetilde{W}_{i+1}(b) * \widetilde{W}_{i+1}(c))
$$

By above lemma, in order to check the prover’s claim about $\widetilde{W}_i(r_i)$, the verifier applies the sum-check protocol to the polynomial
$$
f^{(i)}_{r_i}(b,c) = \widetilde{\mathrm{add}}_i(r_i, b, c)(\widetilde{W}_{i+1}(b) + \widetilde{W}_{i+1}(c)) + \widetilde{\mathrm{mult}}_i(r_i, b, c)(\widetilde{W}_{i+1}(b) * \widetilde{W}_{i+1}(c))
$$
Note that the verifier does not know the polynomial $\widetilde{W}_{i+1}$ (as this polynomial is defined in terms of gate values
at layer $i + 1$ of the circuit, and unless $i + 1$ is the input layer, the verifier does not have direct access to the values of these gates), and hence the verifier does not actually know the polynomial $f^{(i)}_{r_i}(b,c)$ that it is applying the sum-check protocol to. Nonetheless, it is possible for the verifier to apply the sum-check protocol to $f^{(i)}_{r_i}(b,c)$
because, until the final round, the sum-check protocol does not require the verifier to know anything about the polynomial other than its degree in each variable ([ee Remark 4.2]()). However, there remains the issue that $\mathcal{V}$ can only execute the final check in the sum-check protocol if she can evaluate the polynomial $f^{(i)}_{r_i}(b,c)$ at a random point. This is handled as follows.

Let us denote the random point at which $\mathcal{V}$ must evaluate $f^{(i)}_{r_i}(b,c)$ by $(b^*,c^*)$, where $b^* \in \mathbb{F}^{k_{i+1}}$ is the first $k_{i+1}$ entries and $c^*\in \mathbb{F}^{k_{i+1}}$ the last $k_{i+1}$ entries. Note that $b^*$, and $c^*$ may have non-Boolean entries. Evaluating $f^{(i)}_{r_i}(b^*,c^*)$ requires evaluating $\widetilde{\mathrm{add}}_i(r_i, b^*, c^*)$, $\widetilde{\mathrm{mult}}_i(r_i, b^*, c^*)$, $\widetilde{W}_{i+1}(b^*)$, and $\widetilde{W}_{i+1}(c^*)$.

$\mathcal{V}$ cannot however evaluate $\widetilde{W}_{i+1}(b^*)$, and $\widetilde{W}_{i+1}(c^*)$ on her own without evaluating the circuit. Instead, $\mathcal{V}$ asks $\mathcal{P}$ to simply provide these two values, say, $z_1$ and $z_2$, and uses iteration $i + 1$ to verify that these values are as claimed. However, one complication remains: the precondition for iteration $i + 1$ is that $\mathcal{P}$ claims a value for $\widetilde{W}_{i+1}(r_{i+1})$ for a single point $r_{i+1}\in\mathbb{F}^{k_{i+1}}$. So $\mathcal{V}$ needs to reduce verifying both $\widetilde{W}_{i+1}(b^*) = z_1$ and $\widetilde{W}_{i+1}(c^*) = z_2$ to verifying $\widetilde{W}_{i+1}(r_{i+1})$ at a single point $r_{i+1}\in\mathbb{F}^{k_{i+1}}$, in the sense that it is safe for $\mathcal{V}$ to accept the claimed values of $\widetilde{W}_{i+1}(b^*)$ and $\widetilde{W}_{i+1}(c^*)$ as long as the value of $\widetilde{W}_{i+1}(r_{i+1})$ is as claimed. As per [Section 4.5.2]() this is done as follows.

**Reducing to Verification of a Single Point.** Let $\mathscr{l}: \mathbb{F}\rightarrow\mathbb{F}^{k_{i+1}}$ be the unique line such that $\mathscr{l}(0) = b^∗$ and $\mathscr{l}(1) = c^∗$. $\mathcal{P}$ sends a univariate polynomial $q$ of degree at most $k_{i+1}$ that is claimed to be $\widetilde{W}_{i+1}\circ\mathscr{l}$, the restriction of $\widetilde{W}_{i+1}$ to the line $\mathscr{l}$. $\mathcal{V}$ checks that $q(0) = z_1$ and $q(1) = z_2$ (rejecting if this is not the case),
picks a random point $r^∗\in\mathbb{F}$, and asks $\mathcal{P}$ to prove that $\widetilde{W}_{i+1}(\mathscr{l}(r^∗)) = q(r^∗)$. By [Claim 4.6](), as long as $\mathcal{V}$ is
convinced that $\widetilde{W}_{i+1}(\mathscr{l}(r^∗)) = q(r^∗)$, it is safe for $\mathcal{V}$ to believe that $q$ does in fact equal $\widetilde{W}_{i+1}\circ\mathscr{l}$, and hence that $\widetilde{W}_{i+1}(b^*) = z_1$ and $\widetilde{W}_{i+1}(c^*) = z_2$ as claimed by $\mathcal{P}$. See [Section 4.5.2]() for a picture and example of this sub-protocol.
This completes iteration $i$; $\mathcal{P}$ and $\mathcal{V}$ then move on to the iteration for layer $i + 1$ of the circuit, whose purpose is to verify that $\widetilde{W}_{i+1}(r_{i+1})$ has the claimed value, where $r_{i+1} := \mathscr{l}(r^∗)$.

**The Final Iteration.** At the final iteration $d$, $\mathcal{V}$ must evaluate $\widetilde{W}_{d}(r_{d})$ on her own. But the vector of gate values at layer $d$ of $\mathcal{C}$ is simply the input $x$ to $\mathcal{C}$. By [Lemma 3.8](), $\mathcal{V}$ can compute $\widetilde{W}_{d}(r_{d})$ on her own in $\mathrm{O}(n)$ time, where recall that $n$ is the size of the input $x$ to $\mathcal{C}$.

























## Claim
I know two numbers $a, b$ such that $a^2 + b^2 = 25$. Example solution for this claim is $a=3$, and $b=4$, because $3^2 + 4^2 = 9 + 16 = 25$.

## Arithmetic circuit
We want to design a 2-layer arithmetic circuit for $a^2 + b^2$.

1. Layer 0 (Input layer)
   - The input wires are a, b.
   - **Gate 0**. Compute $a^2$ using a multiplicative gate $a\times a$. 
   - **Gate 1**. Compute $b^2$ using a multiplicative gate $b\times b$.

2. Layer 1 (Output layer)
   - **Gate 2**. Add the squares: $a^2 + b^2$.

## Assign inputs and computes outputs
Let $a=3$, and $b=4$.
1. Layer 0
   - **Gate 0**: $3\times 3 = 9$.
   - **Gate 1**. $4\times 4 = 16$.

2. Layer 1 (Output layer)
   - **Gate 2**: $9 + 16 = 25$.

## GKR Protocol
Now, the prover wants to convince the verifier that the circuit was evaluated correctly without revealing $a, b$.

### Step 1: Multilinear Extensions (MLEs)
Encode each layer's values as polynomial over finite field (e.g. $F_{11}$)
- Layer 0 (Inputs): Truth table for $a=3$, and $b=4$ is $V_0(0) = 3$ and $V_0(1) = 4$. Then MLE $\bar{V}_0(x) = 3(1-x) + 4x = x + 3$
- Layer 1 (Output): Truth table for $a=3$, and $b=4$ is $V_0(0) = 3$ and $V_0(1) = 4$. Then MLE $\bar{V}_0(x) = 3(1-x) + 4x = x + 3$


