# Block Codes

## Introduction

First in this article we define the Block code and some properties that could measure the error correction capability, then in the next article we dive into how the block code can correct errors in transmission.

In the article on Codes, the mapping function defined from a source alphabet $S$ into all concatenation of target alphabet $T^*$. The extension of this code, is a homomorphism of $S^*$ into $T^*$.

We are interested in some sort of codes that encode data in blocks. Now we are going to understand what is the meaning of encode data in blocks: we define the mapping which maps a concatenation of symbols of fixed size $k$ into a fixed size $n$, called codeword.

Let's start with an example:

Suppose the source alphabet and target alphabet are equal $\{0,1\}$. We define the mapping as follows: 

$$
00\mapsto 0000\\
11\mapsto 1111\\
01\mapsto 0101\\
10\mapsto 1010.
$$

Which takes all possible sequence of symbols of size 2 into the codeword of size 4. Note that $0101$ is a single codeword and the mapping $C:\{0,1\}^2\rightarrow\{0,1\}^4$ is a code.

## Formal Definition of Block Codes

A block code is an injective mapping 

$$
C:\Sigma^k\rightarrow\Sigma^n.
$$

Here, $\Sigma$ is a finite and nonempty set and $k$ and $n$ are integers. The meaning and significance of these three parameters and other parameters related to the code are described below.

### The alphabet 
$\Sigma$

The data stream to be encoded is modeled as a string over some **alphabet $\Sigma$.** The size $|\Sigma|$ of the alphabet is often written as $q$. If $q = 2$, then the block code is called a *binary* block code. In many applications, it is useful to consider $q$ to be a prime power, and to identify $\Sigma$ as finite filed $\mathbb{F}_q$. Which in the next article we talk about it in details.

### The Message length $k$

Messages are elements $m$ of $\Sigma^k$, that is, strings of length $k$. Hence, the number $k$ is called the **message length** or **dimension** of a block code.

### The Block length $n$

The **block length** $n$ of a block code is the number of symbols in a block. Hence, the elements $c\in\Sigma^n$ are strings of length $n$ and correspond to blocks that may be received by the receiver. Hence, they are also called received words. If $c = C(m)$ for some message $m$, then $c$ is called the codeword of $m$.

### Ratio $\rho$

The **rate** of a block code is defined as the ratio between its message length and its block length: 

$$
\rho =\frac{k}{n}.
$$

The ratio, measuring how much of the transmitted data is useful information:

A large rate means that the amount of actual message per transmitted block is high. In this sense, the rate measures the transmission speed and the quantity $1 - \rho$ measures the overhead that occurs due to the encoding with the block code.

It is a simple fact that the rate cannot exceed 1 since data cannot in general be losslessly compressed. For example, if a message with size  $k = 4$ encoded to a codeword $c$ size $n = 3$, at least you lose one symbol of message in codeword. Thus, $k\le n$. Formally, this follows from the fact that the code $C$ is an injective map. The block codes are error correction code.

### Example: Binary Block Code

Suppose the alphabet $\Sigma = \{0, 1\}$. Let $k=4$ and $n = 7$. Encodes four bites of a message into seven bits codewords. We define the mapping of  the code as follows:

Since the message is only 4 bits, then there are only $2^4 = 16$ possible messages. 

$$
\begin{aligned}
&0000\mapsto 0000000\\
&1000\mapsto 1110000\\
&0100\mapsto 1001100\\
&1100\mapsto 0111100\\
&0010\mapsto 0101010\\
&1010\mapsto 1011010\\
&0110\mapsto 1100110\\
&1110\mapsto 0010110\\
&0001\mapsto 1101001\\
&1001\mapsto 0011001\\
&0101\mapsto 0100101\\
&1101\mapsto 1010101\\
&0011\mapsto 1000011\\
&1011\mapsto 0110011\\
&0111\mapsto 0001111\\
&1111\mapsto 1111111
\end{aligned}
$$

The left-hand side of the mapping above are all possible messages. The right-hand side are codewords. The ratio of the block code is $\rho =\frac{4}{7}$. It is clear that 4 of the 7 symbols in any codeword are useful information, and the other 3 symbols are not useful.

## Hamming Distance (Distance Between Two Codewords)

The Hamming distance between two equal-length strings of symbols is the number of positions at which the corresponding symbols are different. For example, the codewords 

$$
\begin{aligned}
&1\boxed{1100}00,\\
&1\boxed{0011}00,
\end{aligned}
$$

are different in four positions. Then the hamming distance of these two codeword is 4.

For any two codewords $c_1,c_2\in\Sigma^n$, we denote the hamming distance by $d(c_1, c_2)$.

**The Hamming distance helps us determine the error-correcting capability of a code. It can indicate how many errors a code can detect and how many errors it can correct. We will introduce these concepts in the upcoming sections.**

### Fact

The Hamming distance of two words is 0 if and only if the two words are identical.

The following function, written in Python 3, returns the Hamming distance between two strings:

```python
def hamming_distance(string1: str, string2: str) -> int:
    """Return the Hamming distance between two strings."""
    if len(string1) != len(string2):
        raise ValueError("Strings must be of equal length.")
    dist_counter = 0
    for n in range(len(string1)):
        if string1[n] != string2[n]:
            dist_counter += 1
    return dist_counter
```

## The Minimum Distance of Block Code

The **minimum distance $d_\mathrm{min}$** of a block code is the minimum number of positions in which any two distinct codewords differ. Formally, for received codewords **$c_1 =C(m_1),c_2 = C(m_2)\in\Sigma^n$**, then the minimum distance $d$ of the code $C$ is defined as: 

$$
\begin{aligned}
d_\mathrm{min}:&= \min_{m_1,m_2\in\Sigma^k, m_1\neq m_2} d\big(C(m_1), C(m_2)\big)\\
&= \min_{c_1,c_2\in\Sigma^n} d\big(c_1, c_2\big)
\end{aligned}
$$

### Fact

Since any Block Code has to be injective, any two codewords will disagree in at least one position, so the distance of any code is at least 1.

For example, the minimum distance of example above is 3. Consider the codewords 

$$
\begin{aligned}
&\boxed{000}1111\\
&\boxed{111}1111
\end{aligned}.
$$

Where have 3 differences. The following Python code verify this claim, also find an example of two codewords which have distance 3.

```python
def minimum_hamming_distance(codewords):
 
    if len(codewords) < 2:
        raise ValueError("At least two codewords are required")
    
    min_distance = float('inf')
    min_pair = (None, None)
    
    for i in range(len(codewords)):
        for j in range(i + 1, len(codewords)):
            # Early termination: if we find distance 1, we can't get lower
            if min_distance == 1:
                return min_distance, min_pair[0], min_pair[1]
                
            distance = hamming_distance(codewords[i], codewords[j])
            
            if distance < min_distance:
                min_distance = distance
                min_pair = (codewords[i], codewords[j])
    
    return min_distance, min_pair[0], min_pair[1]
```

## Relative Distance $\mu$

The **relative distance $\mu$** is the fraction **$d_{\mathrm{min}}/n$**, where $n$ is the codeword length. In the example above, ****the relative distance $\mu$ is $d_{\mathrm{min}}/n = 3/7$.

## **Popular Notation**

The notation $(n, k, d_\mathrm{min})_q$ describes a block code over an alphabet $\Sigma$ of size $q$, with a block length $n$, message length $k$, and minimum distance $d_\mathrm{min}$.

Note that the number of messages would be $q^k$.

## Conclusion

We define a new kind of code called block code. We defined Hamming distance between two codewords and minimum distance of block code. In the next article, we demonstrate that how this tool's will measure the error-correcting capability.