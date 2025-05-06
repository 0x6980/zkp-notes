## Notation
- Finite field $\mathbb{F}$
- Arithmetic circuit $\mathcal{C}$ of depth $d$ and size (number of gates) $s$
- Boolean hypercube $\{0,1\}^n$
- Boolean circuit
- layered circuit
- Sumcheck protocol
- Fan-in: The number of inputs a gate has is known as fan-in.

# Arithmetic Circuit
An Arithmetic circuit $\mathcal{C}$ over field $\mathbb{F}$ is a directed graph whose nodes are labeled $+$, $*$, computing field element addition and multiplication respectively, for the values on the incoming wires.

# Layered Arithmetic Circuit
A circuit is layered if it can be partitioned into subsets called layers, such that every wire in the circuit is between adjacent layers. Each gate belongs to a layer, and each gate in layer $i$ is connected by neighbors only layer $i+1$.
We call the number of layers the depth of the circuit, which is denoted by $d$. We also assume all the gates in the circuit have two inputs. Let 0 denotes the output layer and $d$ denotes the input layer. Correspondingly, we denote the input vector as $v_d$, and the output vector as $v_0$.  In addition to the public inputs, the circuit may also take in a witness vector that is only known to the prover. We use $w$ to denote the witness vector. 
Fig. 1 depicts two small layered circuits where the left one only has public inputs, while the right one takes in both the public inputs and the witness

# GKR Protocol
Suppose we are given a layered arithmetic circuit $\mathcal{C}$ of size $S$, depth $d$, and fan-in two ($\mathcal{C}$ may have more than one output gate). Number the layers from 0 to $d$, with 0 being the output layer and $d$ being the input layer. Let $S_i$ denote the number of gates at layer $i$ of the circuit $\mathcal{C}$. Assume $S_i$ is a power of 2 and let $S_i = 2^{k_i}$. The GKR protocol makes use of several functions, each of which encodes certain information about the circuit.

Number the gates at layer $i$ from 0 to $S_i − 1$, and let
$$W_i : \{0,1\}^{k_i} \rightarrow \mathbb{F}$$
denote the function that takes as input a binary gate label, and outputs the corresponding gate’s value at layer $i$. As usual, let $\widetilde{W_i}$ denote the multilinear extension of $W_i$.

Consider the below circuit, which depicts an example circuit $\mathcal{C}$ and input to $\mathcal{C}$ and describes the resulting function $W_i$ for each layer $i$ of $\mathcal{C}$

![layered circuit](/pages/images/layeredCircuit.png)

The GKR protocol also makes use of the notion of a “wiring predicate” that encodes which pairs of wires from layer $i+1$ are connected to a given gate at layer $i$ in $\mathcal{C}$. Let
$$
\begin{aligned}
    &\mathrm{in}_{1,i} : \{0,1\}^{k_i} \rightarrow \{0,1\}^{k_i+1}\\
    &\mathrm{in}_{2,i} : \{0,1\}^{k_i} \rightarrow \{0,1\}^{k_i+1}
\end{aligned}
$$
denote the functions that take as input the label $a$ of a gate at layer $i$ of $\mathcal{C}$, and respectively output the label of the first and second in-neighbor of gate $a$. So, for example, if gate $a$ at layer $i$ computes the sum of gates $b$ and $c$ at layer $i+1$, then $\mathrm{in}_{1,i}(a) = b$ and $\mathrm{in}_{2,i}(a) = c$.

Define two functions, $\mathrm{add}_i$ and $\mathrm{mult}_i$, mapping $\{0,1\}^{k_i+2k_i+1}$ to {0,1}, which together constitute the wiring predicate of layer $i$ of $\mathcal{C}$. Specifically, these functions take as input three gate labels $(a,b,c)$, and return 1 if and only if $(b,c) = (\mathrm{in}_{1,i}(a), \mathrm{in}_{2,i}(a))$ and gate $a$ is an addition (respectively, multiplication) gate.
As usual, let $\widetilde{\mathrm{add}}_i$ and $\widetilde{\mathrm{mult}}_i$ denote the multilinear extensions of $\mathrm{add}_i$ and $\mathrm{mult}_i$.

For an example, consider the above figure. Since the circuit contains no addition gates, $\mathrm{add}_0$ and $\mathrm{add}_1$ are the constant 0 function. Meanwhile, $\mathrm{mult}_0$ is the function defined over domain $\{0,1\} \times \{0,1\}^2 \times \{0,1\}^2$ as follows. $\mathrm{mult}_0$ evaluates to 1 on the following two inputs: $(0,(0,0),(0,1))$ and $(1,(1,0),(1,1))$. On all other inputs, $\mathrm{mult}_0$ evaluates to zero. 
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
    &((0,0),(0,0),(0,0))\\
    &((0,1),(0,1),(0,1))\\
    &((1,0),(0,1),(1,0))\\
    &((1,1),(1,1),(1,1))
\end{aligned}
$$
Note that for each layer $i$, $\mathrm{add}_i$ and $\mathrm{mult}_i$ depend only on the circuit $\mathcal{C}$ and not on the input $x$ to $\mathcal{C}$. In contrast, the function $W_i$ does depend on $x$. This is because $W_i$ maps each gate label at layer $i$ to the value of the gate when $\mathcal{C}$ is evaluated on input $x$.

The purpose of iteration $i$ is to reduce the claim about the value of $\widetilde{W}_i(r_i)$ to a claim about $\widetilde{W}_{i+1}(r_{i+1})$ for
some $r_{i+1}\in F^{k_{i+1}}$, in the sense that it is safe for $\mathcal{V}$ to assume that the first claim is true as long as the second claim is true. To accomplish this, the iteration applies the sum-check protocol to a specific polynomial derived from $\widetilde{W}_{i+1}$, $\widetilde{\mathrm{add}}_i$ and $\widetilde{\mathrm{mult}}_i$

**Lemma**.
The GKR protocol exploits an ingenious explicit expression for Wei(ri), captured in the following.
$$
\widetilde{W}_i(z) = \sum_{b,c\in\{0,1\}^{k_{i+1}}} \widetilde{\mathrm{add}}_i(z, b, c)(\widetilde{W}_{i+1}(b) + \widetilde{W}_{i+1}(c)) + \widetilde{\mathrm{mult}}_i(z, b, c)(\widetilde{W}_{i+1}(b) * \widetilde{W}_{i+1}(c))
$$

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


