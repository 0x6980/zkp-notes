# Unique Decoding

Now that we can construct and evaluate codes, we arrive at the central question of decoding: if we receive a corrupted vector y, when can we determine the original codeword c with absolute certainty? This is the domain of unique decoding. 

The key insight is that the minimum distance ℓ creates a ”safe zone” or protective bubble around each codeword. As long as the number of errors is small enough that the received vector y remains inside the original codeword’s bubble, we can reverse the damage unambiguously.

## Fact: **A code with minimum distance $d_{\min}$ can detect up to $d_{\min} − 1$ errors**

Error detection is the ability to know that an error has occurred. If the minimum distance between any two codewords is $d_{\min}$, then it takes at least $d_{\min}$ changes to transform one valid codeword into another valid one.

- If **1 to $(d_{\min} - 1)$** errors occur, the received sequence is **not** a valid codeword. We can detect that it's invalid.
- If **$d_{\min}$** or more errors occur, it's possible that the errors have changed the original codeword into a *different* valid codeword. We would then mistakenly accept this erroneous word as correct.

### Example 1

Imagine a simple code with two codewords $\{000, 111\}$. The alphabet is $\Sigma = \{0,1\}$ and $n=3$ and $k=2$. Then the mapping is as follows: 

$$
\begin{aligned}
&0\mapsto 000,\\
&1\mapsto 111.
\end{aligned}
$$

The minimum distance $d_{\min}$ is **3**. We're trying to show that **up to** $d_{\min} - 1 = 3-1 = 2$ errors can be detected. This means that a received codeword with 1 or 2 errors can be detected, but one with 3 errors cannot be detected by our code.

- **Can it detect 2 errors?** ($d_{\min}$ - 1 = 2)
    
    The sender sends $000$. If 2 errors occur, it becomes $110$. Other possibility with 2 errors are $101,011$. Now, the question: Is $110$ a valid codeword? The answer is no. The receiver knows an error happened. **Thus, Detection works.**
    
- **Can it detect 3 errors?** ($d_{\min}$ = 3)
    
    The sender sends $000$. If 3 errors occur, it becomes $111$. There is no other possibility with 3 errors. Now, the question: Is $111$ a valid codeword? The answer is **yes**. The receiver thinks the sender send $111$ and has no idea a massive error occurred. **Thus, Detection fails.**
    

**Conclusion:** This code can detect **up to 2 errors**.

## Fact: **A code with minimum distance $d_{\min}$ can correct up to  $t = \lfloor(d_{\min} − 1)/2\rfloor$ errors**

**Notation $\lfloor x\rfloor$ (Floor Function):** Means round down to the nearest integer. For e*xample:* $\lfloor 7/2 \rfloor = 3, \lfloor 3/2 \rfloor = 1$.

Error correction is the ability to not only detect an error but also *figure out the original intended codeword*. The rule is to find the valid codeword **closest** to the received sequence (this is called maximum likelihood decoding).

For error correction to work, the received sequence must be closer to the intended codeword than to any other codeword. The "sphere" of possible received sequences around each codeword must not overlap.

The formula  $t = \lfloor(d_{\min} − 1)/2\rfloor$ensures this. Let's calculate $t$ for our example where $d_{\min} = 3$:

$t = \lfloor(3 − 1)/2\rfloor = \lfloor 2/2\rfloor = 1$. This means the code can correct **up to 1 error**.

### Example 2

Using the same code as in Example 1. Thus, the valid codewords are $\{000, 111\}$.

- **Can it correct 1 error?** (t = 1)
    
    The sender sends $000$. If 1 error occur, it becomes $010$. Other possibility with 1 error are $100,001$. Now, the question is **what is the closest valid codeword to $010$?**
    
    Hamming Distance from $010$ to $000$ is **1**. Hamming Distance from $010$ to $111$ is **2**.
    The closest is $000$. The receiver correctly decodes to $000$. Therefore, **correction works.**
    
- **Can it correct 2 errors?** (2 > t)
The sender sends $000$. If 2 errors occur, it becomes $110$. Other possibility with 2 errors are $101,011$.  Now, the question is **what is the closest valid codeword to $110$?**
    
    Hamming Distance from $110$ to $000$ is 2. Hamming Distance from $110$ to $111$ is 1.
    The closest is $111$. The receiver incorrectly decodes to $111$. Therefore, **correction fails.**
    

**Conclusion:** This code can correct **up to 1 error.**

These two principles are why powerful codes have large minimum distances. A larger $d_{\min}$ allows them to correct more errors.

## The Unique Decoding Radius

Using the fact above, the maximum number of errors that a code is guaranteed to correct is equal to:

$$
 t = \lfloor(d_{\min} − 1)/2\rfloor.
$$

Any received vector with $t$ or fewer errors will always be closer to the original codeword than to any other. This value t is often called the packing radius or the unique decoding radius of the code. 

## Why This Decoding is Unique

kASdnf

## Singleton Bound

A question arises: for a given length $n$, how much information ($k$) can we pack in while ensuring a certain error-correction capability ($d_{\min}$)? There is a fundamental trade-off, captured by the Singleton Bound.

The expression $A_q(n,d)$ represents the maximum number of possible codewords in a block code 

of length $n$ and minimum distance $d$ and alphabet with $q$ elements. Then the Singleton bound states that

$$
A_q(n,d) < q^{n-d+1}.
$$

**Proof.** If we delete the first $d-1$ letters of each codeword, then all resulting codewords must still be pairwise different, since all the original codewords in $C$ have Hamming distance at least $d$ from each other. Thus, the size of the altered code is the same as the original code. The newly obtained codewords each have length 

$$
n-(d-1) = n-d+1,
$$

and thus, there can be at most $q^{n-d+1}$ of them. Since, this bound must hold for the largest possible code with these parameters, thus: 

$$
|C|\le A_q(n,d)\le q^{n-d+1}.
$$

Since the number of messages in a block code would be $q^k$ and the mapping is injective, so the number of codewords would be $q^k$. Then, the Singleton bound implies: 

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

This inequality sets a hard limit on the efficiency of any code. It tells us that we cannot arbitrarily increase both the dimension $k$ (the amount of information) and the minimum distance $d_{\min}$ (error-correction power) for a fixed block length $n$. Improving one often comes at the cost of the other. 

## The Most Efficient Codes

By the discussion above, the largest possible $d_{\mathrm{min}}$ is $n-k+1$. If we have the largest possible $d_{\mathrm{min}}$then we have more error correction capability. Thus, the most efficient codes are those that achieve equality in the Singleton Bound. A code is called a **Maximum Distance Separable (MDS)** code if its parameters satisfy: 

$$
d_{\mathrm{min}} = n-k+1.
$$

MDS codes are optimal because they offer the largest possible minimum distance for a given length and dimension, perfectly balancing information rate and error resilience.

In the next article, we define new kind of codes and tools to achieve MDS codes.

## $\delta$-close and $\delta$-far

The terminology $\delta$-close and $\delta$-far helpful to describe whether $c$ is a plausible candidate for decoding or not. By the definition of minimum distance $d$, for every two codewords $c_1$, $c_2$ from the code $(n, k, d)_q$, we have: 

$$
d\le d(c_1,c_2),
$$

where $d(u,v)$ is the distance of two codewords $c_1$, $c_2$.

Suppose we have a string $c$ in $\Sigma^n$. We say $c$ is $\delta$-close to the code $(n, k, d)_q$ if there is **at least one** codeword $u$ such that,

$$
d(c,u)\le \delta n.
$$

We say $c$ is $\delta$-far to the code $(n, k, d)_q$ if **every** codeword $u$ has distance  greater than $\delta n.$ i.e., 

$$
d(c,u)>\delta n.
$$

### Example of delta-close and delta-far