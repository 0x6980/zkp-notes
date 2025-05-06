## Notation
- Finite field $\mathbb{F}$
- Arithmetic circuit $\mathcal{C}$ of depth $d$ and size (number of gates) $s$
- Boolean hypercube $\{0,1\}^n$
- Boolean circuit
- layered circuit
- Sumcheck protocol
- Fan-in: The number of inputs a gate has is known as fan-in.

Assume without loss of generality that $\mathcal{C}$ is layered which means that each gate belongs to a layer, and each gate in layer $i$ is connected by neighbors only layer $i+1$. Let 0 denotes the output layer and $d$ denotes the input layer. The purpose of iteration $i$ is to reduce a claim about the values of the gates at layer $i$ to a claim about the values of the gates at layer $i+1$, in the sense that it is safe for $\mathcal{V}$ to assume that the first claim is true as long as the second claim is true. This reduction is accomplished by applying the sum-check protocol.

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


