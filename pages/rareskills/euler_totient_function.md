# Appendix

In this appendix, we introduce some key concepts in **number theory** and subsequently use them to prove that the number of primitive $n$-th roots of unity is $\phi(n)$, where $\phi$ *denotes* [Euler’s totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function). 

### Number Theory

1. In number theory, the **greatest common divisor (GCD)** of ****two integers $a$ and $b$, denoted by $\mathrm{gcd}(a, b)$ is the largest positive integer that divides each of the integers. For example:

$$
\mathrm{gcd}(4, 6) = 2,\qquad\mathrm{gcd}(8, 12) = 4,\qquad\mathrm{gcd}(3, 4) = 1
$$

1. In number theory, the **least common multiple** (**LCM**) of two integers $a$ and $*b*$, usually denoted by $\mathrm{lcm}(a, b)$, is the smallest positive integer that is divisible by both $a$ and $b$. For example:

$$
\mathrm{lcm}(4,6) = 12,\qquad \mathrm{lcm}(3,4) = 12 
$$

The least common multiple (LCM) can be computed from the greatest common divisor (GCD) with the formula:

$$
\mathrm{lcm}(a, b) =\frac{|ab|}{\mathrm{gcd}(a,b)}
$$

For example:

$$
\mathrm{lcm}(4, 6) =\frac{|4*6|}{\mathrm{gcd}(4,6)} = \frac{24}{2} = 12,\qquad\mathrm{lcm}(3, 4) =\frac{|3*4|}{\mathrm{gcd}(3,4)} = \frac{12}{1} = 12
$$

1. Two integers $a$ and $b$ are **coprime,** or we say ****$a$ **is coprime to** $b$, if $\mathrm{gcd}(a, b) = 1$. For example, 3 and 4 are coprime.
2. In number theory, **Euler's totient function** counts the positive integers up to a given integer $n$ that are coprime to $n$*.*
    
    For example, counting the positive integers up to $n = 9$ that are coprime with 9.
    
    There are six such numbers: 1, 2, 4, 5, 7 and 8. The remaining three numbers in this range— 3, 6, and 9—are not coprime with 9, since $\mathrm{gcd}(9, 3) = \mathrm{gcd}(9, 6) = 3$ and $\mathrm{gcd}(9, 9) = 9$. Therefore, $\phi(9) = 6$. 
    
    As another example, $\phi(1) = 1$ since for $n = 1$ the only integer in the range from 1 to $n$ is 1 itself, and $\mathrm{gcd}(1, 1) = 1$.
    

### Euler’s Totient Function and Primitive $n$-th Roots of Unity

**Lemma**. Suppose $\omega$ is a primitive $n$-th root of unity in a finite field $\mathbb{F}_q$. Lets $m$ be an integer such that $n$ divides m, then $\omega^m\equiv 1\pmod{q}$.

Proof. Since $n$ divides $m$, there exists an integer $k$ such that $nk = m$. Clearly, we have:  

$$
\omega^{m} = \omega^{nk} = (\omega^n)^k\equiv 1^k = 1\pmod{q}
$$

**Theorem**. Let $\omega$ be a primitive $n$-th root of unity, then $\omega^k$ is a primitive $m$-th root of unity, where:

$$
\begin{align}
m = \frac{n}{\mathrm{gcd}(k, n)}
\end{align}
$$

**Proof**. **First**, we prove that:

$$
(\omega^k)^m = \omega^{km}\equiv 1.
$$

Multiplying both sides of equation (1) by $k$ we obtain:

$$
\begin{align}
km = \frac{kn}{\mathrm{gcd}(k, n)} = \mathrm{lcm}(k, n)
\end{align}
$$

By definition of least common multiple, $n$ divides $\mathrm{lcm}(k, n).$ On the other hand, from equation (2), $n$ divides $km$.

Since $n$ divides $km$, we have $\omega^{n}\equiv\omega^{km}$. On the other hand, because $\omega$ is an $n$-th root of unity, we have $\omega^n \equiv 1$. Thus, $\omega^{km}\equiv 1$ (see the proof of the lemma above).

**Second**, the smallest such $m$ is obtained precisely when $km$ equals the **least common multiple (LCM)** of $k$ and $n$ (equation (2)).

**Corollary**. If $\omega$ is a primitive $n$-th root of unity, and $k$ and $n$ are coprime, then $\omega^k$ is also a primitive $n$-th root of unity.

**Proof**. Recall from the theorem, and Equation (1) that $\omega^k$ is a primitive $m$-th root of unity. We show that $m = n$.

Since  $k$ and $n$ are coprime, $\mathrm{gcd}(k, n)=1$. Therefore,

$$
\begin{aligned}
m = \frac{n}{\mathrm{gcd}(k, n)} = \frac{n}{1} = n.
\end{aligned}
$$

**Corollary.** Let $\omega$ be a primitive $n$-th root of unity. To find all primitive $n$-th roots of unity, it suffices to consider all integers $k$ coprime to $n$. By definition of Euler's totient function, the number of all primitive $n$-th roots of unitiy equals to $\phi(n)$.