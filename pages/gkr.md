## Notation
- Finite field $\mathbb{F}$
- Arithmetic circuit $\mathcal{C}$ of depth $d$ and size (number of gates) $s$
- Boolean hypercube $\{0,1\}^n$
- Boolean circuit
- layered circuit
- Sumcheck protocol
- Fan-in: The number of inputs a gate has is known as fan-in.
- Multilinear extension

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

![layered circuit](/pages/images/layeredCircuit.png)

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


