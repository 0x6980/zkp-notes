# Sum-check Protocol
## Notation
- $\mathcal{V}$ denotes the verifier and $\mathcal{P}$ denotes the prover.
- 
## Example 1
Let $g(x_1, x_2) = x_1 + x_2$ be a 2-variate polynomial defined over a finite field $\mathbb{F}$. The purpose of the sum-check protocol is for prover to provide the verifier with the following sum:
$$
\begin{aligned}
\begin{split}
    H:&= \sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}g(b_1, b_2)\\
\end{split}
\end{aligned}
$$
Some times we show the above sum as 
$$
\begin{aligned}
\begin{split}
    H:&= \sum_{\substack{(b_1, b_2)\in\{0,1\}^{2}}} g(b_1, b_2)\\
\end{split}
\end{aligned}
$$
### Step 1
At the start of the protocol, the prover sends a value $C_1$ claimed to equal the value $H$ defined in above sum. Note that $C_1$ is claimed value by prover and $H$ is the real value of the summation. Recall form our 2-variant polynomial $g(x_1, x_2) = x_1 + x_2$ suppose the prover claimed $C_1 = 4$ is equal to $H$.
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
        &=\sum_{\substack{b_1\in\{0,1\}}}s_1(b_1)\space\space\space\space\space\space\big(\text{by considering $g(b_1, 0) + g(b_1, 1)=s_1(b_1)$}\big)\\
        &\\
        &= s_1(0) + s_1(1)
    \end{split}
    \end{aligned}
    $$
    We define a univariate polynomial $s_1(x_1) = g(x_1, 0) + g(x_1, 1)$. So, based on above calculation $H$ is equal to $g_1(0) + g_1(1)$. So, the prover if want to pass the first check of the verifier should define claimed $g_1(x_1)$ as we defined above. Back to our example, the prover define the $g_1$ univariate polynomial as follow:
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
So, the prover if want to pass verifier checks should define $g_2$ as follow:
$$
g_2(x_2) = 2+x_2 
$$

### Step 5
The verifier checks that $g_2$ is a univariate polynomial at most degree $\mathrm{deg}_2(g)$, rejecting if not, and also checks that $g_1(r_1) = g_2(0) + g_2(1)$. Let's calculate these values for the verifier:
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
After that the verifier choose $r_2 = 3\in\mathbb{F}$ and evaluates $g(r_1, r_2) = r_1 + r_2 = 2 + 3 = 5$ with a **single oracle query** to $g$. For final action the verifier checks $g_2(r_2) = g(r_1,r_2)$. rejecting if not. Let's do it:
$$
g_2(r_2) = g_2(3) = 2 + 3 = 5
$$
Then the verifier check pass and accept the first claim of prover which is that the value of sum is $C_1 = 4$.

## Example 2
Note that we did the sum-check protocol in 2 round, which is equal to number of variate of polynomial $g$. Let's do the sum-check protocol on a 3-variate polynomial 
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
the prover should define 

​
so it passes the verifier's checks
### Step 1
At the start of the protocol, the prover sends a value $C_1$ claimed to equal the value $H$. Note that $C_1$ is claimed value by prover and $H$ is the real value of the summation. Suppose the prover claimed $C_1 = 22$ is equal to the $H$.

### Step 2
In the first round, the prover sends the univariate polynomial $g_1(x_1)$ claimed to equal
$$
\begin{aligned}
\begin{split}
    &\sum_{\substack{b_2\in\{0,1\}}}\sum_{\substack{b_3\in\{0,1\}}}g(x_1, b_2, b_3)
\end{split}
\end{aligned}
$$
As mentioned in previous example the prover should define the $g_1(x_1)$, so it passes the verifier's checks. Let's do it together as follow:
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

First, $\mathrm{deg}_1(g) = 1$ and $\mathrm{deg}(g_1(x_1)) = 1$. 
Second,
$$
g_1(0) + g_1(1) = (0 + 6) + (10 + 6) = 22
$$
Which is equal to $C_1 = 22$.

For last action of the verifier in this step he chooses a random element $r_1 = 4 \in\mathbb{F}$, and sends $r_1$ to the prover.

### Step 4
Note that in this example round 2 is not the last round of the protocol. In round 2, the prover sends to the verifier a univariate polynomial $g_2(x_2)$ claimed to equal
$$
\sum_{\substack{b_3\in\{0,1\}}}g(r_1, x_2, b_3)
$$
As always, the prover should define $g_2(x_2)$ so it passes the verifier's checks. Let's do it together as follow:

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

First, $\mathrm{deg}_2(g) = \mathrm{deg}(x_1x_2) = 1$ and $\mathrm{deg}(g_2(x_2)) = \mathrm{deg}(8x_2+19) = 1$.

Since $g_1(x_1) = 10x_1 + 6$, then
$$
g_1(r_1) = g_1(4) = 10\times 4 + 6 = 46
$$
and, since $g_2(x_2) = 8x_2 + 19$, then
$$
g_2(0) + g_2(1) = 19 + 8 + 19 = 46
$$

Final action of the verifier in this step, he chooses a random element $r_2 = 5 \in\mathbb{F}$, and sends $r_2$ to the prover.

### Step 6
In last round (Round 3), the prover sends to the verifier a univariate polynomial $g_3(x_3)$ claimed to equal
$$
g(r_1, r_2, x_3) = 2\times r_1 + r_1.r_2 + 3x_3 = 2\times 4 + 4\times 5 + 3x_3 = 3x_3 + 28
$$
So, the prover if want to pass verifier checks should define $g_3$ as follow:
$$
g_3(x_3) = 3x_3 + 28
$$

### Step 7
The verifier checks that $g_3$ is a univariate polynomial at most degree $\mathrm{deg}_3(g)$, and $g_2(r_2) = g_3(0) + g_3(1)$, rejecting if not. Let's calculate these values for the verifier:
$$
\mathrm{deg}_2(g) = \mathrm{deg}_2(2x_1+ x_1x_2+ 3x_3) = \mathrm{deg}(x_1x_2) = 1
$$
So the degree check will pass. Since $g_2(x_2) = 8x_2 + 19$, then,
$$
g_2(r_2) = g_2(5) = 8\times 5 +  19 = 59
$$
and since $g_3(x_3) = 3x_3 + 28$, then
$$
g_3(0) + g_3(1) = (0 + 28) + (3+28) = 59
$$
The equality $g_2(r_2) = g_3(0) + g_3(1)$ holds.

After that, the verifier choose $r_3 = 6\in\mathbb{F}$ and evaluates $g(r_1, r_2, r_3) = 2r_1 + r_1r_2 + 3.r_2 = 2\times 4 + 4\times 5 + 3\times 6 = 46$ with a **single oracle query** to $g$. For final action, the verifier checks $g_3(r_3) = g(r_1,r_2,r_3)$. rejecting if not. Let's do it:
$$
g_3(r_3) = g_3(6) = 3\times 6 + 28 = 46
$$
Then the verifier checks pass and accept the first claim of prover which is that the value of sum is $C_1 = 22$.

## General Format for 4-variate polynomials

### Description of the Start of the Protocol
Without use of generality consider $g(x_1, x_2, x_3, x_4)$ is a 4-variant polynomial.

At the start of the sum-check protocol, the prover sends a value
$C_1$ claimed to equal the true answer (i.e., the quantity $H$ defined in Equation (1)). The sum-check protocol proceeds in $v$ rounds, one for each variable of $g$. 
#### Description of Round 1
At the start of the first round, the prover sends a polynomial $g_1(x_1)$ claimed to equal the polynomial $s_1(x_1)$ defined as follows:
$$
s_1(x_1):= \sum_{\substack{(b_2, b_3, b_4)\in\{0,1\}^{3}}} g(x_1, b_2, b_3, b_4)
$$
$s_1(x_1)$ is defined to ensure that
$$
\begin{equation}
    \begin{split}
        H = s_1(0) + s_1(1)
    \end{split}
\end{equation}
$$
1. Accordingly, the verifier checks that $C_1 = g_1(0) + g_1(1)$, i.e., the verifier checks that $g_1$ and the claimed answer $C_1$ are consistent with Equation (1).

2. If the prover is honest, the polynomial $g_1(x_1)$ has degree $\mathrm{deg}_1(g)$.

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
$\mathbb{F}$ and sends $r_2$ to $\mathcal{P}$.

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
$\mathbb{F}$ and sends $r_3$ to $\mathcal{P}$.

### Description of Rounds 4, the final round
In the final round, the prover has sent $g_4(x_4)$ which is claimed to be $g(r_1, r_2, r_3, x_4)$. $\mathcal{V}$ now checks that $g_4(r_4) = g(r_1, r_2, r_3, r_4)$ (recall that we assumed $\mathcal{V}$ has oracle access to $g$). If this check succeeds, and so do all previous checks, then the verifier is convinced that $H = g_1(0)+g_1(1)$.



## Self-contained description of the sum-check protocol
- Suppose we are given a $v$-variate polynomial $g$ defined over a finite field $\mathbb{F}$. The purpose of the sum-check protocol is for prover to provide the verifier with the following sum:
$$
\begin{equation}
\begin{split}
    H:&= \sum_{\substack{(b_1, b_2, \dots,b_v)\in\{0,1\}^{v}}} g(b_1, b_2, \dots,b_v)\\
    &\\
    &=\sum_{\substack{b_1\in\{0,1\}}}\sum_{\substack{b_2\in\{0,1\}}}\dots\sum_{\substack{b_v\in\{0,1\}}}g(b_1, b_2, \dots,b_v)
\end{split}
\end{equation}
$$

- At the start of the protocol, the prover sends a value $C_1$ claimed to equal the value $H$ defined in Equation (2).
- In the first round, $\mathcal{P}$ sends the univariate polynomial $g_1(x_1)$ claimed to equal
    $$
    \begin{aligned}
    \begin{split}
        &\sum_{\substack{b_2\in\{0,1\}}}\dots\sum_{\substack{b_v\in\{0,1\}}}g(x_1, b_2, \dots,b_v)
    \end{split}
    \end{aligned}
    $$
    $\mathcal{V}$ checks that $C_1 = g_1(0)+ g_1(1)$, and that $g_1$ is a univariate polynomial of degree at most $deg_1(g)$, rejecting if not. Here, $deg_1(g)$ denotes the degree of $g(x_1,\dots, x_v)$ in variable $x_1$.
- $\mathcal{V}$ chooses a random element $r_1\in\mathbb{F}$, and sends $r_1$ to $\mathcal{P}$.
- In the $j$-th round, for $1 \lt j \lt v$, $\mathcal{P}$ sends to $\mathcal{V}$ a univariate polynomial $g_j(x_j)$ claimed to equal
  $$
    \begin{aligned}
    \begin{split}
        &\sum_{\substack{b_{j+1}\in\{0,1\}}}\dots\sum_{\substack{b_v\in\{0,1\}}}g(r_1,\dots,r_{j-1},x_j,b_{j+1}\dots, b_v)
    \end{split}
    \end{aligned}
  $$
    $\mathcal{V}$ checks that $g_j$ is a univariate polynomial of degree at most $deg_j(g)$, and that $g_{j−1}(r_{j−1}) =
g_j(0)+ g_j(1)$, rejecting if not.
- $\mathcal{V}$ chooses a random element $r_j\in\mathbb{F}$, and sends $r_j$ to $\mathcal{P}$.
- In Round $v$ (last round), $\mathcal{P}$ sends to $\mathcal{V}$ a univariate polynomial $g_v(x_v)$ claimed to equal $g(r_1,\dots,r_{v−1},x_v)$.
    $\mathcal{V}$ checks that $g_v$ is a univariate polynomial of degree at most $deg_v(g)$, rejecting if not, and also checks that $g_{v−1}(r_{v−1}) = g_v(0)+ g_v(1)$.
- $\mathcal{V}$ chooses a random element $r_v\in\mathbb{F}$ and evaluates $g(r_1,\dots,r_{v−1},r_v)$ with a single oracle query to $g$.
    $\mathcal{V}$ checks that $g_v(r_v) = g(r_1,\dots,r_{v−1},r_v)$, rejecting if not.
- If $\mathcal{V}$ has not yet rejected, $\mathcal{V}$ halts and accepts.