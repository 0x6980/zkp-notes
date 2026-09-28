# Reed-Solomon Codes

As what we learned until now, a Code is a collection of mapping (functions) $C$. This mapping encode a message to a codeword. We called encoder. 

In the structure of block code, we demonstrate that this mapping should have some special properties, which maps a fixed size string (a block) of domain into a fixed size string of co-domain.

In the linear code, we construct this kind of codes with alphabet of finite filed $\mathbb{F}_q$. The result code, was a linear subspace $C$ with dimension $k$ of the vector space  $\mathbb{F}_q^n$. In this case, the encoder (mapping) encodes a message (vector) of size $k$ into a codeword (vector) of size $n$. 

We explored some special properties like generator matrix, Hamming weight, minimum distance and Singleton bound in the previous chapters. 

In this chapter, we want to define a specific Code which follows a specific encoder, and we prove that it is a linear code with some special generator matrix $G$. This encoder works with polynomial. We call it Reed–Solomon code which they have **Maximum Distance Separable. i.e.,** 

$$
d_{\min} = n - k +1.
$$

Because of the above property, Reed–Solomon code is the most efficient code for correcting errors. 

## Constructing Encoder of Reed-Solomon Code

The alphabet is the finite field $\mathbb{F}_q$. The message length is $k$, and the block length is $n$. The key idea of encoder of RS codes is that **representing messages as polynomials.** Let's construct this encoder as follows:

1. Suppose $m = (m_0,m_1,\dots,m_{k-1})$ be a message from $\mathbb{F}_q^k$.
2. Treat this message as $y$-values of a polynomial $P(x)$ at $k$ evaluation points.
3. We can choose the $k$ evaluation points, as $0,1,2,\dots,k-1$.
4. This gives us value representation of the polynomial $P(x)$ at $k$ points as $\big\{(0,m_0),(1,m_1),\dots,(k-1,m_{k-1})\big\}$.
5. We can interpolate these points to find the unique polynomial $P(x)$ of degree at most $k-1$. This is the coefficient representation of the polynomial $P(x)$.
6. “Oversample” the polynomial by evaluating $P(x)$  at $n-k$ new points $k,k+1,\dots,n-1.$ Thus, we compute: 

$$
P(k),P(k+1),\dots,P(n-1).
$$

1. The final codeword $w$ is the list of all $n$ evaluations. Where the first $k$ symbols are the original message $m$, and the next $n-k$ symbols are the parity as follows: 

$$
\begin{aligned}
w &=\big[P(0),P(1),\dots,P(k-1),P(k),P(k+1),\dots,P(n-1)\big]\\
&= \big[m_0,m_1,\dots,m_{k-1},P(k),P(k+1),\dots,P(n-1)\big].
\end{aligned}
$$

## Reed-Solomon Code is a Linear Code

If we construct a generator matrix for the Reed-Solomon Code, then they are linear code. We try to construct a standard form of generator matrix.

Let’s review the above procedure:  We have a message $m = (m_0,m_1,\dots,m_{k-1})\in \mathbb{F}_q^k$. We interpolate polynomial $P(x) =p_0 + p_1x+\cdots+p_{k-1}x^{k-1}$. Then we have: 

$$
\begin{aligned}
P(0) &= m_0,\\
P(1) &= m_1,\\
\qquad\qquad&\vdots\\
P(k-1) &= m_{k-1},\\
P(k) &= p_0 + p_1k+\cdots+p_{k-1}k^{k-1},\\
P(k+1) &= p_0 + p_1(k+1)+\cdots+p_{k-1}(k+1)^{k-1},\\
\qquad\qquad&\vdots\\
P(n-1) &= p_0 + p_1(n-1)+\cdots+p_{k-1}(n-1)^{k-1}.
\end{aligned}
$$

We can compute $\mathrm{P_{\mathrm{eval}}}:=\begin{bmatrix}
   P(k) & P(k+1) & P(k+2) &\dots &P(n-1)
\end{bmatrix}$by matrix multiplications as follows:

$$
\mathrm{P_{\mathrm{eval}}} =
\begin{bmatrix}
   p_0 & p_1 & p_2 & \dots p_{k-1}
\end{bmatrix}
\begin{bmatrix}
   1 & 1 &\dots & 1\\
   k & k+1 & \dots & n-1 \\
   k^2 & (k+1)^2 & \dots & (n-1)^2 \\
    \\
\vdots\\
   k^{k-1} & (k+1)^{k-1} & \dots & (n-1)^{k-1} \\
\end{bmatrix}.
$$

This matrix will play as a parity matrix $M$ in the standard form generator matrix $G=[I_k|M]$. For creating the generator matrix $G$, it is suffices to put matrix $I_k$ in the left-hand side of parity matrix $M$ as follows: 

$$
G =
\begin{bmatrix}
   1 & 0 & \dots & 0 & 1 & 1 &\dots & 1\\
   0 & 1 & \dots & 0 & k & k+1 & \dots & n-1 \\
   0 & 0 & \dots & 0 & k^2 & (k+1)^2 & \dots & (n-1)^2 \\
\vdots & \vdots &\ddots&\vdots&\vdots&\vdots&\vdots&\vdots \\
   0 & 0 & \dots & 1 & k^{k-1} & (k+1)^{k-1} & \dots & (n-1)^{k-1} \\
\end{bmatrix}.
$$

This standard form matrix $G$ will encode every message $m = (m_0,m_1,\dots,m_{k-1})\in \mathbb{F}_q^k$ as follows: 

$$
w = x\cdot G = \big[m_0,m_1,\dots,m_{k-1},P(k),P(k+1),\dots,P(n-1)\big],
$$

where original message $m$ appears unchanged in the first $k$ positions of the codeword $w$. The remaining $n - k$ positions are the added redundancy.

Therefore, the Reed-Solomon code of length $n$ is a linear subspace $C$ with dimension $k$ of the vector space  $\mathbb{F}_q^n$ where $\mathbb{F}_q$ is a finite field with $q$ elements.

## Singleton Bound in Reed-Solomon Codes

Same as linear codes, we have: $d_{\mathrm{min}}\le n-k+1,$ as Singleton bound.

## A Codeword as Polynomial

Since any two *distinct* polynomials of degree less than $k$ agree in at most $k−1$ points, this means that any two codewords of the Reed–Solomon code agree in at most $k-1$ positions. Let's compute step by step the statement above as follows:

1. If two codewords agree in 1 position. So, disagree in $n-1$ positions. Thus, the hamming distance of these two codewords is $d = n-1$. Or,
2. If two codewords agree in 2 positions. So, disagree in $n-2$ positions. Thus, the hamming distance of these two codewords is $d = n-2$. Or,
3. If two codewords agree in 3 positions. So, disagree in $n-3$ positions. Thus, the hamming distance of these two codewords is $d = n-3$. Or,
4. …
5. Two codewords agree in $k-1$ positions. So, disagree in $n-(k-1)$ positions. Thus, the hamming distance is $d = n-k+1$.

Note that, $d = n-k+1$ is less than any other hamming distances in the list above. Therefore, for the minimum distance, we have: 

$$
d_{\mathrm{min}}\ge n-k+1.
$$

Thus, any two codewords of the Reed–Solomon code disagree in at least $n - (k-1) = n-k +1,$ positions. 

Mixing the above inequality with Singleton bound results 

$$
d_{\mathrm{min}}= n-k+1.
$$

## Corollary

Since $d_{\mathrm{min}}= n-k+1$, then the Reed-Solomon code is a **Maximum Distance Separable Code (MDS) which is the most efficient error-correcting code.**