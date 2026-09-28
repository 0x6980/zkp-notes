# Linear Codes

## Introduction

In the previous article, we talked about block codes and some properties of it. In the block codes, the alphabet sigma was arbitrary. We are interested in such code whose alphabet is a finite field $\mathbb{F}_q$. We already know a block code is a mapping $C:\mathbb{F}_q^k\rightarrow\mathbb{F}_q^n$. Which a message $m$ of length $k$ encodes to a codeword of length $n$. The important difference here is, if the alphabet is a finite field $\mathbb{F}_q$, then $\mathbb{F}_q^k$ and $\mathbb{F}_q^n$ are a vector space. Thus, this gives us authority to use some special properties of vector spaces in the structure of codes.

## Formal Definition of Linear Code

A **linear code** of length $n$ and dimension $k$ is a linear subspace $C$ with dimension $k$ of the vector space  $\mathbb{F}_q^n$ where $\mathbb{F}_q$ is a finite field with $q$ elements. Note that the linear code:

$$
C:\mathbb{F}_q^k\rightarrow\mathbb{F}_q^n,
$$

is a subspace of $\mathbb{F}_q^n$. Because we know that the code maps $\mathbb{F}_q^k$ into a set $C(\mathbb{F}_q^k)\subset\mathbb{F}_q^n$. The vectors in $C$ are called *codewords.* We already know that such code is injective. Thus*,* the **size** of a code is the number of codewords and equals $q^k$.

## **The Hamming Weight** of a Codeword

The **weight** of a codeword $u$, denoted $w(u)$ or $|u|_0$, is the number of its elements that are nonzero. It’s a simple measure of how many positions are **active**. For example, for the vector $u = (0,1,0,1,0,1,0)\in\mathbb{F}_q^7$, we count the numbers of ones. The weight is $w(u) = 3$.

## Hamming Distance (Distance Between Two Codewords)

The Hamming distance between two vectors $u$ and $v$, denoted $d(u,v)$, is the number of positions at which the corresponding symbols are different. For example, the codewords 

$$
\begin{aligned}
&u = (1,1,1,1,1,1,1)\\
&v = (0,0,0,1,1,1,1),
\end{aligned}
$$

They are differed at 3 first positions. Thus, $d(u, v) = 3$

### Fact

Linearity guarantees that the distance between two codewords is simply the weight of their difference: 

$$
d(u,v) = d(u-v,0) = w(u-v).
$$

Using the example above, 

$$
u - v = (1,1,1,1,1,1,1) - (0,0,0,1,1,1,1) = (1,1,1,0,0,0,0).
$$

 Then, $w(u-v) = 3 = d(u,v)$. 

## The Minimum Distance of Linear Code

The **minimum distance** of a linear code is the minimum number of positions in which any two distinct codewords differ. This property imply that :

$$
d_\mathrm{min}:= \min_{c_1,c_2\in C,c_1\neq c_2} d\big(c_1,c_2\big) = \min_{c_1,c_2\in C, c_1-c_2\neq 0} d\big(c_1-c_2, 0\big),
$$

Since $d\big(c_1-c_2, 0\big) = w(c_1-c_2)$, and substituting $c_1-c_2 = c\in C$, we have: 

$$
d_\mathrm{min} = \min_{c\in C, c\neq 0} w(c),
$$

## **Popular Notation**

The notation $[n, k, d_\mathrm{min}]_q$ describes a linear code of the vector space $\mathbb{F}_q^n$, over an alphabet $\mathbb{F}_q$ of size $q$, with a codeword length $n$, dimension $k$, and minimum distance $d_\mathrm{min}$.

## What Properties of Linear Subspace Help Us

- Linearity guarantee that any combination of codewords is a codeword. For example, if $u$ and $v$ are two codewords, then $u+v$, $u-v$, $ru+sv$, $ru-sv$ are codewords, where the scalars $r,s\in\mathbb{F}_q$. We used this property to show that the distance between two codewords is simply the weight of their difference, as fact above.
- Linear subspace $C$ has basis. Meaning, there is a set of $k$ codewords $B=\{v_1,\dots, v_k\}\subset C$ such that every codeword of $C$ can be written in a unique way as a finite [linear combination](https://en.wikipedia.org/wiki/Linear_combination) of codewords of $*B$.* Formally, if $c\in C$, then there are scalars $a_1,a_2,\dots,a_k\in\mathbb{F}_q$, such that:

$$
c=a_1v_1+a_2v_2+\dots+a_kv_k.
$$

- These basis codewords are often collated in the rows of a matrix $G$.
- A matrix can generate subspaces. If $G$ be a $k\times n$ matrix, then

$$
\{x.G|x\in\mathbb{F}_q^n \},
$$

       Is a subspace of $\mathbb{F}_q^n$.

Using properties above, we can generate a linear code by a generator matrix $G$, which we explain it in the next section.

## Generator Matrix of Linear Code

If G is a $k\times n$ matrix, it generates the codewords of a linear code $*C$ by* 

$$
w=sG
$$

where $w$ is a codeword of length $n$ of the linear code $C$, and $s$ is any input vector from $\mathbb{F}_q^k$.

A generator matrix for a linear code $[n, k, d]_q$ has formatted $k\times n$ where

- $n$  is the length of a codeword,
- $k$ is the number of information bits (the dimension of $*C*$ as a vector subspace),
- $d$ is the minimum distance of the code, and
- $q$ is the size of the finite field $\mathbb{F}_{q}$, that is, the number of symbols in the alphabet.

## Example of Generating Matrix

Let's define a simple linear code $C$ with parameters $n =4$ (length) and $k = 2$ (dimension). This means our codewords will be 4-bit strings, and the code is a 2-dimensional subspace of $\mathbb{F}_2^4$, containing $2^2 = 4$ codewords.

The generator matrix G is:

$$

G=\begin{bmatrix}
   1 & 1 & 0 & 0 \\
   0 & 1 & 1 & 0
\end{bmatrix}
$$

Since the messages are from the subspace of $\mathbb{F}_2^k = \mathbb{F}_2^2$, we have four possible messages, as follows: 

$$
(0,0), (0,1), (1,0), (1,1).
$$

The code $C$ generated by this matrix consists of all $w=sG$, where $s\in\mathbb{F}_2^2$. We compute the codeword for all messages.

- For the message $(1,0)$:

$$

\begin{aligned}
(1,0)\times \begin{bmatrix}
   1 & 1 & 0 & 0 \\
   0 & 1 & 1 & 0
\end{bmatrix}
&=((1,0)\begin{bmatrix}
   1 \\
   0
\end{bmatrix},(1,0)\begin{bmatrix}
   1 \\
   1
\end{bmatrix},(1,0)\begin{bmatrix}
   0 \\
   1
\end{bmatrix},(1,0)\begin{bmatrix}
   0 \\
   0
\end{bmatrix})\\
&=(1.1+0.0\space\space,1.1+0.1\space,1.0+0.1\space,1.0+0.0)\\
&=(1,1,0,0).
\end{aligned}
$$

So, $(1,0)\mapsto(1,1,0,0)$, and $(1,1,0,0)$ is a codeword of weight 2 (there are two 1s).

- For the message $(0,1)$:

$$

\begin{aligned}
(0,1)\times \begin{bmatrix}
   1 & 1 & 0 & 0 \\
   0 & 1 & 1 & 0
\end{bmatrix}
&=((0,1)\begin{bmatrix}
   1 \\
   0
\end{bmatrix},(0,1)\begin{bmatrix}
   1 \\
   1
\end{bmatrix},(0,1)\begin{bmatrix}
   0 \\
   1
\end{bmatrix},(0,1)\begin{bmatrix}
   0 \\
   0
\end{bmatrix})\\
&=(0.1+1.0\space\space,0.1+1.1\space,0.0+1.1\space,0.0+1.0)\\
&=(0,1,1,0).
\end{aligned}
$$

So, $(0,1)\mapsto(0,1,1,0)$, and $(1,1,0,0)$ is a codeword of weight 2 (there are two 1s).

- For the message $(0,0)\mapsto (0,0,0,0)$, and the weight of codeword is 0.
- For the message $(1,1)\mapsto (1,0,1,0)$, and the weight of codeword is 2.

Finally, for all possible messages, we have:

$$
\begin{aligned}
&(0,0)\mapsto (0,0,0,0)\\
&(0,1)\mapsto(0,1,1,0)\\
&(1,0)\mapsto(1,1,0,0)\\
&(1,1)\mapsto(1,0,1,0)
\end{aligned}
$$

So the codewords are: $(0,0,0,0)$, $(0,1,1,0)$, $(1,1,0,0)$, and $(1,0,1,0)$.

The nonzero codewords all have Hamming weight 2. Therefore, the minimum distance is: $d=2$.

The generator matrix $G=\begin{bmatrix}
   1 & 1 & 0 & 0 \\
   0 & 1 & 1 & 0
\end{bmatrix}$ is a generator for linear code $[4,2,2]_2$.

**Summary of Code:**

| # | Message $(a_1, a_2)$ | Codeword | Hamming Weight |
| --- | --- | --- | --- |
| 1 | `(0, 0)` | `(0, 0, 0, 0)` | 0 |
| 2 | `(0, 1)` | `(0, 1, 1, 0)` | 2 |
| 3 | `(1, 0)` | `(1, 1, 0, 0)` | 2 |
| 4 | `(1, 1)` | `(1, 0, 1, 0)` | 2 |

## Standard Form of Generator Matrix

The *standard* form for a generator matrix is:

$$
G=[I_k|P].
$$

Where $I_k$ denotes the $k\times k$ identity matrix, and $P$ is some $k\times(n-k)$ matrix, which called **parity** matrix, then we say $G$ is **standard form**.

A code using such a matrix is called a **systematic code**, because the original message $m$ appears unchanged in the first $k$ positions of the codeword $w$. The remaining $n - k$ positions are the added redundancy, often called parity check symbols. 

## Example of Standard Form Generator Matrix

Consider the example above with the generator matrix $G$:

$$

G=\begin{bmatrix}
   1 & 0 & 1 & 0 \\
   0 & 1 & 1 & 1
\end{bmatrix}.
$$

We can generate a code as example above. Since $G$ has the identity matrix $I_2 =
\begin{bmatrix}
   1 & 1\\
   0 & 1
\end{bmatrix}$, and a parity matrix $P=
\begin{bmatrix}
   1 & 0\\
   1 & 1
\end{bmatrix}$, it is a standard generator matrix. Let's compute the codewords as follows: 

- For message $(0,0)$: $w = 0.(1, 0, 1, 0) + 0.(0,1,1,1) = (0,0,0,0)$.
- For message $(0,1)$: $w = 0.(1, 0, 1, 0) + 1.(0,1,1,1) = (0,1,1,1)$.
- For message $(1,0)$: $w = 1.(1, 0, 1, 0) + 0.(0,1,1,1) = (1,0,1,0)$.
- For message $(1,1)$: $w = 1.(1, 0, 1, 0) + 1.(0,1,1,1) = (1+0, 0+1, 1+1,0+1) = (1,1,0,1)$.

Notice that since this $G$ is in standard form, the original message appears directly in the first 2 positions codeword.

### *Lemma:* Any linear code is a permutation equivalent to a linear code which is in standard form

No need to prove this lemma, for purpose of this article it is enough to know that any linear code somehow is equivalent to a code which is in standard form.

## Singleton Bound in Linear Codes

If $C$ is a linear code with block length $n$, dimension $k$ and minimum distance $d_{\mathrm{min}}$ over the finite filed $\mathbb{F}_q$ with $q$ elements. Then the Singleton bound implies: 

$$
q^k\le q^{n-d_{\mathrm{min}}+1},
$$

so that, 

$$
k\le n-d_{\mathrm{min}}+1,
$$

which is usually written as, 

$$
d_{\mathrm{min}}\le n-k+1.
$$

A simple proof follows from observing that the rows of any generator matrix in standard form have weight at most $n-k+1$. Recall that for a generator matrix in standard form, $G=[I_k|P]$. Each row in the $I_k$ portion has $k-1$ zeros and one element with value of “$1$”. This means each full row of $G$ has at most $n-(k-1) = n-k+1$ elements with a value of $1$.

## **Maximum Distance Separable Codes**

Linear codes that achieve equality in the Singleton bound are called **MDS (maximum distance separable) codes**. Meaning: 

$$
d_{\mathrm{min}} = n-k+1.
$$

The most famous and widely used examples of MDS codes are **Reed-Solomon (RS) codes**. We will **talk** about RS codes **in depth** in **upcoming** articles. For now, **let's** dive into a numerical example.

### **Example of Maximum distance separable Codes**

Let's construct a very small MDS code. We'll work in the $\mathbb{F}_5 = \{0, 1, 2, 3, 4\}$ to keep it manageable.

- **Parameters:** We want $n=4$, $k=2$. The Singleton bound gives us $d_{\mathrm{min}} \leq 4 - 2 + 1 = 3$. We will construct a code where $d_{\mathrm{min}} = 3$.
- **Generator Matrix (G):**
    
    We can use a generator matrix in standard form $G = [I_2 | P]$.
    
    Let's choose $P = \begin{bmatrix} 1 & 1 \\ 1 & 2 \end{bmatrix}$. Our full generator matrix is: 
    

$$
G = \begin{bmatrix} 
1 & 0 & 1 & 1\\ 
0 & 1 & 1 & 2 
\end{bmatrix}.
$$

- **Encoding:** A message $\mathbf{m} = (m_1, m_2)$ is encoded as $\mathbf{w} = \mathbf{m}G$.
    - Example: Encode message $(1, 3)$.
        
        $\mathbf{w} = 1 \cdot [1, 0, 1, 1] + 3 \cdot [0, 1, 1, 2] = [1, 0, 1, 1] + [0, 3, 3, 1] = [1, 3, 4, 2]$ (all mod 5).
        
- **Listing all Codewords:** Let's generate all possible messages and their codewords.

| Index | Message (k=2) | Codeword (n=4) | Weight |
| --- | --- | --- | --- |
| 1 | (0,0) | (0, 0, 0, 0) | 0 |
| 2 | (0,1) | (0, 1, 1, 2) | 3 |
| 3 | (0,2) | (0, 2, 2, 4) | 3 |
| 4 | (0,3) | (0, 3, 3, 1) | 3 |
| 5 | (0,4) | (0, 4, 4, 3) | 3 |
| 6 | (1,0) | (1, 0, 1, 1) | 3 |
| 7 | (1,1) | (1, 1, 2, 3) | 4 |
| 8 | (1,2) | (1, 2, 3, 0) | 3 |
| 9 | (1,3) | (1, 3, 4, 2) | 4 |
| 10 | (1,4) | (1, 4, 0, 4) | 3 |
| 11 | (2,0) | (2, 0, 2, 2) | 3 |
| 12 | (2,1) | (2, 1, 3, 4) | 4 |
| 13 | (2,2) | (2, 2, 4, 1) | 4 |
| 14 | (2,3) | (2, 3, 0, 3) | 3 |
| 15 | (2,4) | (2, 4, 1, 0) | 3 |
| 16 | (3,0) | (3, 0, 3, 3) | 3 |
| 17 | (3,1) | (3, 1, 4, 0) | 3 |
| 18 | (3,2) | (3, 2, 0, 2) | 3 |
| 19 | (3,3) | (3, 3, 1, 4) | 4 |
| 20 | (3,4) | (3, 4, 2, 1) | 4 |
| 21 | (4,0) | (4, 0, 4, 4) | 3 |
| 22 | (4,1) | (4, 1, 0, 1) | 3 |
| 23 | (4,2) | (4, 2, 1, 3) | 4 |
| 24 | (4,3) | (4, 3, 2, 0) | 3 |
| 25 | (4,4) | (4, 4, 3, 2) | 4 |