
# Roots of unity and Primitive roots of unity
In the [previous article](https://hackmd.io/6ipdFFwPTTqHkDsSMwSeAw), we talked about multiplicative subgroups and how to find them in a finite field.

In this article, we will introduce the concept of *roots of unity* and *primitive roots of unity*, both of which are tightly linked to multiplicative subgroups.

## Roots Of Unity
Let $a\in \mathbb{F}$. We say $a$ is an $n$-**th root of unity** when
$$
a^n = 1.
$$
In other words, there exists a positive integer $n$ such that $a$ raised to the power $n$ is 1. We can think of the 2nd root of unity ($n = 2$) as the square root of 1 and the 3rd root of unity ($n = 3$) as the cube root. The term "unity" just means "1".

### Example 1
Consider field $\mathbb{F}_7 =\{0, 1, 2, 3, 4, 5, 6\}$:
- **Element-wise perspective:** For each element in $\mathbb{F}_7$, we determine the values of $n$ for which it is an $n$-th root of unity. For example, the element $1$ is an $i$-th root of unity for all $1\le i\le 6$.
- **Fixed-$n$ perspective:** For a fixed $n$, we find all elements that are $n$-th roots of unity (i.e. solutions to $a^n = 1$). 

These two approaches yield the same results but provide complementary insights, aiding in clarification and deeper understanding.

**Element-wise perspective**

Since $1^i\equiv 1$ for all $1\le i\le 6$ then, the element $1$ is 1st, 2nd, 3rd, 4th, 5th and 6th roots of unity.

The element $2$ is 3rd, 6th roots of unity because there exists $2^3\equiv 1$ and there exists $2^6\equiv 1$, but $2$ is not 4th root of unity because $2^4$ mod 7 is not $1$. For the same reason $2$ is not a 5th root of unity.

The element $4$ is a 3rd root of unity because there exists $4^3 \equiv 1$, but $4$ is not a 2nd root of unity because $4^2$ mod 7 is not 1. For the same reason $4$ is not a 5th root of unity. Note that $4$ is a 6th root of unity too.

As exercise check the element $5$.

**Fixed-$n$ perspective**

Alternative perspective, for a given $n$, we can identify all $n$-th roots of unity in $\mathbb{F}_7$, We will box elements that the power of $n$, results $1$ ($a^n \equiv 1$). indicating they are $n$-th roots of unity.

**6th roots of unity ($n=6$):**
$$
\begin{aligned}
&1^6 \equiv 1\\
&2^6 \equiv 64 \equiv 1\\
&3^6 \equiv 9 * 9 * 9 \equiv 2 * 2 * 2 \equiv 8 \equiv 1\\
&4^6 \equiv 16 * 16 * 16 \equiv 2 * 2 * 2 \equiv 8 \equiv 1\\
&5^6 \equiv 25 * 25 * 25 \equiv 4 * 4 * 4 \equiv 64 \equiv 1\\
&6^6 \equiv 36 * 36 * 36 \equiv 1 * 1 * 1 \equiv 1
\end{aligned}
$$

All non-zero elements are 6th roots: $\{1, 2, 3, 4, 5, 6\}$.

**5th roots of unity ($n = 5$):**
$$
\begin{aligned}
&\boxed{1^5 \equiv 1}\\
&2^5 \equiv 32 \equiv 4\\
&3^5 \equiv 9 * 9 * 3 \equiv 2 * 2 * 3 \equiv 12 \equiv 5\\
&4^5 \equiv 16 * 16 * 4 \equiv 2 * 2 * 4 \equiv 16 \equiv 2\\
&5^5 \equiv 25 * 25 * 5 \equiv 4 * 4 * 5 \equiv 2 * 5 \equiv 10 \equiv 3\\
&6^5 \equiv 36 * 36 * 6 \equiv 1 * 1 * 6 \equiv 6
\end{aligned}
$$

So, the 5th roots of unity has only one element and is $\{1\}$.

**4th roots of unity ($n = 4$):**
$$
\begin{aligned}
&\boxed{1^4 \equiv 1}\\
&2^4 \equiv 16 \equiv 2\\
&3^4 \equiv 9 * 9 \equiv 2 * 2 \equiv 4\\
&4^4 \equiv 16 * 16 \equiv 2 * 2 \equiv 4\\
&5^4 \equiv 25 * 25 \equiv 4 * 4 \equiv 16 \equiv 2\\
&\boxed{6^4 \equiv 36 * 36 \equiv 1 * 1 \equiv 1}
\end{aligned}
$$
The 4th roots of unity has two elements and are $\{1, 6\}$.

**3th roots of unity ($n = 3$):**
$$
\begin{aligned}
&\boxed{1^3 \equiv 1}\\
&\boxed{2^3 \equiv 8 \equiv 1}\\
&3^3 \equiv 9 * 3 \equiv 2 * 3 \equiv 6\\
&\boxed{4^3 \equiv 16 * 4 \equiv 2 * 4 \equiv 8 \equiv 1}\\
&5^3 \equiv 25 * 5 \equiv 4 * 5 \equiv 20 \equiv 6\\
&6^3 \equiv 36 * 6 \equiv 1 * 6 \equiv 6
\end{aligned}
$$
The 3rd roots of unity has three elements and are $\{1, 2, 4\}$.

**Exercise:** For $n=2$, the 2nd roots of unity is equal to 4th roots of unity. Check this as exercise.

This code is designed to find the $n$-th roots of unity using brute force in a finite field $\mathbb{F}_q$, where $q$ is a prime number:
```python
import galois

GF = galois.GF(7)
n = 3  # looking for 3rd roots of unity

# Iterate over all field elements using GF.elements
roots = [x for x in GF.elements if x**n == 1]
print("3rd roots of unity in GF(7):", roots)
```

### Corollary
If $\mathbb{F}_q$ is a finite field, any element $a\in \mathbb{F}^*_q$ is a $q-1$-th root of unity.

**Proof.** Appendix 1.

For example, you can see in Example 1 that any nonzero element in $\mathbb{F}^*_7 =\{1, 2, 3, 4, 5, 6\}$ is a 6th roots of unity. We can calculate it using the following Python code:

```python
>>> (1 ** 6) % 7
1
>>> (2 ** 6) % 7
1
>>> (3 ** 6) % 7
1
>>> (4 ** 6) % 7
1
>>> (5 ** 6) % 7
1
>>> (6 ** 6) % 7
1
```

### The number of $n$-th roots of unity
The number of distinct $n$-th roots of unity in $\mathbb{F}_q$ is exactly **the greatest common divisor**: $\mathrm {gcd} (n,q-1)$.

For example, in $\mathbb{F}_7$, where $q - 1 = 6$. If $n = 3$, we compute $\mathrm {gcd} (3,6) = 3$. Indeed, there are exactly three 3rd roots of unity: $\{1, 2, 4\}$, since $1^3 \equiv 1, 2^3 \equiv 1, 4^3 \equiv 1$.

If $n = 4$, we have $\mathrm {gcd} (4,6) = 2$, confirming there are exactly two 4th roots of unity in $\mathbb{F}_7$.
$$
\begin{aligned}
&\boxed{1^4 \equiv 1}\qquad\text{(root)}\\
&2^4 \equiv 16 \equiv 2\\
&3^4 \equiv 9 * 9 \equiv 2 * 2 \equiv 4\\
&4^4 \equiv 16 * 16 \equiv 2 * 2 \equiv 4\\
&5^4 \equiv 25 * 25 \equiv 4 * 4 \equiv 16 \equiv 2\\
&\boxed{6^4 \equiv 36 * 36 \equiv 1 * 1 \equiv 1}\qquad\text{(root)}
\end{aligned}
$$
The 4th roots of unity are $\{1, 6\}$, matching the predicted count of 2 elements.

The Python code below compute the number of $n$-th roots of unity in a finite field $\mathbb{F}_q$:

```python
import galois
import math

def number_of_roots_of_unity(q, n):
    if not galois.is_prime(q):
        raise ValueError("The field size must be a prime number.")

    # The number of n-th roots of unity is gcd(n, q-1)
    return math.gcd(n, q - 1)

# Example usage: Find the number of 6th roots of unity and primitive 6th roots in F7
field_size = 7
n = 6
num_roots = number_of_roots_of_unity(field_size, n)
print(f"Number of {n}-th roots of unity in F{field_size}: {num_roots}")
```

## Order Of An Element
The order of element $a\in G$ is the **smallest** positive integer $k$ such that $a^k = 1$. For example, in any group the order of element $1$ is 1, since $1^1 = 1$.

If there is no such $k$, then $a$ has **infinite order**.

Consider the group of non-zero integers under multiplication modulo 7, $\{1, 2, 3, 4, 5, 6\}$. The powers of $2$ modulo 7 are as follow:
$$
\begin{aligned}
&2^1 = 2\\
&2^2 = 4\\
&\boxed{2^3 = 8 = 1}\qquad\text{(minimal such power)}\\
&2^4 = 16 = 2\\
&2^5 = 32 = 4\\
&\boxed{2^6 = 64 = 1}
\end{aligned}
$$
The smallest positive integer k such that $2^k ≡ 1$ (mod 7) is 3, so the order of $2$ (mod 7) is 3.

The powers of $3$ modulo 7 are as follow:
$$
\begin{aligned}
&3^1 = 3\\
&3^2 = 2\\
&3^3 = 27 = 6\\
&3^4 = 81 = 4\\
&3^5 = 9 * 9 * 3 = 5\\
&\boxed{3^6 = 9 * 9 * 9 = 2 * 2 * 2 = 8 = 1}\qquad\text{(minimal such power)}
\end{aligned}
$$
The smallest positive integer k such that $3^k ≡ 1$ (mod 7) is 6, so the order of $3$ (mod 7) is 6.

The powers of $6$ modulo 7 are as follow:
$$
\begin{aligned}
&6^1 = 6\\
&\boxed{6^2 = 36 = 1}\qquad\text{(minimal such power)}\\
&6^3 = 36 * 6 = 1 * 6 = 6\\
&\boxed{6^4 = 36 * 36 = 1 * 1 = 1}\\
&6^5 = 36 * 36 * 6 = 1 * 1 * 6 = 6\\
&\boxed{6^6 = 36 * 36 * 36 = 1 * 1 * 1 = 1}\\
\end{aligned}
$$
The smallest positive integer k such that $6^k ≡ 1$ (mod 7) is 2, so the order of $6$ (mod 7) is 2.

Note that the **order of an element** is different from the **order of a group**. The order of a group refers to the number of elements in the group, while the order of an element $a$ refers to the smallest positive integer $n$ such that $a^n =1$.

**Corollary**:
When the order of element $a$ is $k$, it means that $a^k = 1$ and no smaller positive power of $a$ equals $1$. Consequently, the cyclic subgroup $\langle a\rangle$ will contain $k$ distinct elements: $1 = a^0, a^1, a^2, \dots, a^{k-1}$. Therefore, the order of the cyclic subgroup $\langle a\rangle$ is also $k$. 

## Primitive Roots Of Unity
An $n$-th root of unity $a$ is a *primitive $n$-th root of unity* when $\mathrm {ord} (a) = n$. In other words an element $a$ is a *primitive $n$-th root of unity* if
1. $a$ is an $n$-th root of unity. So, $a^n \equiv 1$.
2. $\mathrm {ord} (a) = n$. So, $n$ is the smallest positive integer such that $a^n \equiv 1$.

For example in $\mathbb{F}_7$:
- $6$ is 2nd root of unity because $6^2\equiv 1$. Since the smallest positive integer k such that $6^k ≡ 1$ (mod 7) is 2$, then $6$ is primitive $2$-nd root of unity.

- $4$ is a 6th root of unity because $4^6$ is 1 but it is not a primitive root of unity because $4^3$ is also a solution and 3 is smaller than 6.

- $4$ is a 3rd root of unity because $4^3$ is 1. Since the smallest positive integer $k$ such that $4^k\equiv 1$ (mod 7) is 3, then $4$ is primitive $3$-rd root of unity.

- $2$ is a 3rd root of unity because $2^3$ is 1.Since the smallest positive integer $k$ such that $2^k\equiv 1$ (mod 7) is 3, then $2$ is primitive $3$-rd root of unity.

- Two above examples shows that we have two primitive 3rd roots of unity.

### Example 2
Consider $\mathbb{F}_7$ and the $n$-th roots of unity we calculated before in Example 1. We want to determine the primitive $n$-th roots of unity using the definition. We denote $H_i$ as the set of $i$-th roots of unity

- $H_2 = \{1, 6\}$ is 2nd roots of unity (Example 1). We want to find primitive 2nd root of unity. For that we are looking for elements in 2nd roots of unity such that the order of those element be equal to 2. Since 
  $$
  \begin{aligned}
  &\mathrm {ord} (1) = 1\\
  &\boxed{\mathrm {ord} (6) = 2}\space\space\space\text{because 2 is smallest positive integer s.t. $6^2 = 36\equiv 1$ in $\mathbb{F}_7$}
  \end{aligned}
  $$

  Then $6$ is primitive 2nd root of unity and $1$ is not primitive because the order of $1$ is not 2 (again recall that the order of element $1$ is **smallest** positive integer n such that $1^n=1$).
- $H_3 = \{1, 2, 4\}$ is 3rd roots of unity. Since 
  $$
  \begin{aligned}
  &\mathrm {ord} (1) = 1\\
  &\boxed{\mathrm {ord} (2) = 3}\space\space\space\text{because 3 is smallest positive integer s.t. $2^3 = 8\equiv 1$ in $\mathbb{F}_7$}\\
  &\boxed{\mathrm {ord} (4) = 3}\space\space\space\text{because 3 is smallest positive integer s.t. $4^3 \equiv 1$ in $\mathbb{F}_7$}
  \end{aligned}
  $$

  Then $2, 4$ are primitive 3rd roots of unity. In this case we have more than one elements as primitive root of unity.
- $H_4 = \{1, 6\}$ is 4th roots of unity. Since 
  $$
  \begin{aligned}
    \mathrm {ord} (1) = 1\\
    \mathrm {ord} (6) = 2
  \end{aligned}
  $$
  Then there is not an element with order of 4 then $H_4$ does not have any primitive 4th root of unity.
- As Exercise proof that $H_5$ does not have any primitive 5th root of unity.

- $H_6 = \{1, 2, 3, 4, 5, 6\}$ is 6th roots of unity. Since 
  $$
    \begin{aligned}
        \mathrm {ord} (1) = 1\\
        \mathrm {ord} (2) = 3\\
        \boxed{\mathrm {ord} (3) = 6}\\
        \mathrm {ord} (4) = 3\\
        \boxed{\mathrm {ord} (5) = 6}\\
        \mathrm {ord} (6) = 2
    \end{aligned}
  $$
  Then $3, 5$ are primitive 6th roots of unity. Because the order of $3, 5$ is 6. Note that $4^6\equiv 1$ but it is not a primitive 6th root of unity because the lowest $n$ that satisfied $4^n \equiv 1$ is 3. Therefore, it is a 6th root of unity, but not a primitive 6th root of unity. It is however a primitive 3rd root of unity.

The following code uses brute force to find primitive roots of unity:

```python
import galois
GF = galois.GF(7)

def primitive_nth_roots_of_unity_in_finite_field(p, n):
    if not galois.is_prime(p):
        raise ValueError("The field size must be a prime number.")
    
    GF = galois.GF(p)
    field_elements = [GF(i) for i in range(1, p)]  # Elements from 1 to p-1 (excluding 0)
    primitive_roots = []

    for element in field_elements:
        if element ** n == 1:
            order = 1
            while element ** order != 1:
                order += 1
            if order == n:
                primitive_roots.append(int(element))

    return primitive_roots

# Example usage: Find the primitive 6th roots of unity in F7
field_size = 7
n = 6
primitive_roots = primitive_nth_roots_of_unity_in_finite_field(field_size, n)
print(f"The primitive {n}-th roots of unity in F{field_size} are: {primitive_roots}")
```

The following code is a non-brute force version of finding the primitive $n$-th roots of unity in a finite field $\mathbb{F}_q$, where $q$ is a prime number:
```python
# non-brute force code
import galois

GF = galois.GF(7)
GF.primitive_roots_of_unity(3)
# GF([2, 4], order=7)
```

### The number of primitive $n$-th roots of unity
The number of primitive $n$-th roots of unity in $\mathbb{F}_q$ is $\phi (n)$ ([Euler's totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function)).

The code below computes the number of primitive $n$-th roots of unity in the $\mathbb{F}_q$:

```python
import galois
import math

def number_of_roots_of_unity(q, n):
    if not galois.is_prime(q):
        raise ValueError("The field size must be a prime number.")

    # The number of primitive n-th roots of unity is phi(n) if n is a divisor of q-1
    if (q - 1) % n == 0:
        num_primitive_roots_of_unity = galois.euler_phi(n)
    else:
        num_primitive_roots_of_unity = 0

    return num_primitive_roots_of_unity

# Example usage: Find the number of 6th roots of unity and primitive 6th roots in F7
field_size = 7
n = 6
num_primitive_roots = number_of_roots_of_unity(field_size, n)
print(f"Number of primitive {n}-th roots of unity in F{field_size}: {num_primitive_roots}")
```

## Powers of primitive root of unity
Consider the examples above, and we want to calculate the powers of the primitive $n$-th root of unity.

- $6$ is a primitive 2nd root of unity, and powers of $6$ are as follow:
  $$
  \begin{aligned}
    \{6^{1} = 6, 6^{2}\equiv 1, 6^3 \equiv 6, 6^4 \equiv 1, \dots\}
  \end{aligned}
  $$
  You can see that for all $i$, $6^i$ is either equal to $6$ or equal to $1$. Therefore, the powers of $6$ are $\{1, 6\}$. Furthermore, the powers of $6$ are equal to the 2nd roots of unity (Example 1).
- $4$ is a primitive 3rd root of unity, and powers of $4$ are as follow:
  $$
  \begin{aligned}
    \{4^{1} = 4, 4^{2}\equiv 2, 4^3 \equiv 1, 4^4 \equiv 4, \dots\}
  \end{aligned}
  $$
  You can see that for all $i$, $4^i$ is equal to one of $1, 2, 4$. Then, the powers of $4$ is $\{1, 2, 4\}$. Therefore, the powers of $4$ are equal to the 3rd roots of unity (Example 1).
- $2$ is a primitive 3rd root of unity, and powers of $2$ are as follow:
  $$
  \begin{aligned}
    \{2^{1} = 2, 2^{2}\equiv 4, 2^3 \equiv 1, 2^4 \equiv 2, \dots\}
  \end{aligned}
  $$
  You can see for all $i$ the $2^i$ is equal to one of $1, 2, 4$. Then, the powers of $2$ is $\{1, 2, 4\}$. Therefore, the powers of $2$ is equal to the 3rd roots of unity (Example 1).

## Every member of a subgroup of order $n$ is a $n$-th root of unity
If $g$ is a primitive $n$-th root of unity, then $\mathrm{ord}(g)$ is $n$. Every element in $\langle g \rangle$ is an $n$-th root of unity; or in other words, every element of $\langle g \rangle$ raised to the $n$-th power is 1. Here is why:

If $g$ is a primitive $n$-th root of unity, then $g^m$ is a member of the subgroup $\langle g \rangle$. Since $g$ is a primitive $n$-th root of unity, we have that $g^n = 1$. If we raise any member of $\langle g \rangle$ to the $n$-th power, we have that
$$
(g^{m})^{n} = g^{(mn)} = g^{(nm)} = (g^{n})^{m} = 1^m = 1
$$
Therefore, any member of $\langle g \rangle$ raised to the $n$-th power is 1, which is equivalent to saying every member of the $\langle g \rangle$  is an $n$-th root of unity.

### Example 3
Since $\langle 3\rangle = \mathbb{F}^*_7$ and $2|6$, recall from the fundamental theorem of cyclic groups that $3^{\frac{q-1}{n}} = 3^{\frac{6}{2}} = 3^{3} = 27 \equiv 6$ is a generator for the subgroup of order 2. Therefore, $\langle 6\rangle = \{1, 6\}$. On the other hand, since every member of a subgroup of order 2 is a 2nd root of unity, $\langle 6\rangle = \{1, 6\}$ consists of 2nd roots of unity in $\mathbb{F}_7$. The element $6$ called the **primitive 2nd root of unity**.

### Example 4
Since $\langle 3\rangle = \mathbb{F}^*_7$ and $3|6$, recall from the fundamental theorem of cyclic groups that $3^{\frac{q-1}{n}} = 3^{\frac{6}{3}} = 3^{2} = 9 \equiv 2$ is a generator for the subgroup of order 3. Therefore, $\langle 2\rangle = \{1, 2, 4\}$. On the other hand, since every member of a subgroup of order 3 is a 3rd root of unity,  $\langle 2\rangle = \{1, 2, 4\}$ consists of 3rd roots of unity in $\mathbb{F}_7$. The element $2$ called the **primitive 3rd root of unity**.

### Remark: Efficient Computation of Roots of Unity in Finite Fields
For a finite field $\mathbb{F}_q$ and positive integer $n$, the $n$-th roots of unity can be obtained by:
- Finding a primitive $n$-th root of unity $\omega\in\mathbb{F}_q$ if one exists. Primitive $n$-th roots exist in $\mathbb{F}_q$ iff $n$ divides $q-1$. 
- Computing all powers $\omega^k$ for $k = 0,1,\dots,n-1$.
  
In the two examples above (Example 3, 4), we successfully implemented this efficient computation method.

# All in One Example
Consider the finite field $\mathbb{F}_{17} =\{0, 1, 2,\dots, 16\}$. For a given positive integer $n$, we aim to find all $n$-th roots of unity and primitive $n$-th root of unity in $\mathbb{F}_{17}$
- Using their fundamental definitions.
- Using the fundamental theorem of cyclic groups

## The generator of $\mathbb{F}^*_{17}$
We know that $\langle 3 \rangle = \{1, 2, \dots, 16\} = \mathbb{F}^*_{17}$.

## Using Their Fundamental Definitions
Given $n=4$, we determine all 4th roots of unity in $\mathbb{F}^*_{17}$ by applying their fundamental definition.

### 4th roots of unity
$$
\begin{aligned}
    &\boxed{1^4 = 1}\\
    &2^4 = 16\\
    &3^4 = 3^3 * 3 \equiv 10 * 3\equiv 13\\
    &\boxed{4^4 = 16 * 16 \equiv (-1) * (-1) \equiv 1}\\
    &5^4 = 25 * 25 \equiv 8 * 8 \equiv 64 \equiv 13\\
    &6^4 \equiv 36 * 36 \equiv 2 * 2 \equiv 4\\
    &7^4 \equiv 49 * 49 \equiv (-2) * (-2) \equiv 4\\
    &8^4 \equiv 64 * 64 \equiv 13 * 13 \equiv 16\\
    &9^4 \equiv 81 * 81 \equiv 13 * 13 \equiv 16\\
    &10^4 \equiv 4\\
    &11^4 = 121 * 121 \equiv (-2) * (-2) = 4\\
    &12^4 = 144 * 144 \equiv 8 * 8 \equiv 13\\
    &\boxed{13^4 = 169 * 169 \equiv 16 * 16 = (-1) * (-1) \equiv 1}\\
    &14^4 = 196 * 196 \equiv 9 * 9 \equiv 13\\
    &15^4 = 225 * 225 \equiv 4 * 4 \equiv 16\\
    &\boxed{16^4 = 256 * 256 \equiv 16 * 16 \equiv (-1) * (-1) \equiv 1}
\end{aligned}
$$
The 4th roots of unity contains four elements: $H_4 = \{1, 4, 13, 16\}$. We now identify the primitive 4th roots of unity by finding elements in $H_4$ whose order equals 4.

#### Calculating the order of elements in $H_4$
The order of the identity element is trivial: $\mathrm {ord} (1) = 1$.

We calculate the powers of 4 in $\mathbb{F}^*_{17}$ to determine its order:
$$
\begin{aligned}
&4^1 = 4\\
&4^2 = 16\\
&4^3 \equiv 13\\
&\boxed{4^4 = 16 * 16 \equiv (-1) * (-1) =1}
\end{aligned}
$$
Since $4^4 \equiv 1$ and no smaller positive exponent satisfies this condition, we conclude $\mathrm {ord} (4) = 4$.

Calculating successive powers of element $13$:
$$
\begin{aligned}
&13^1 = 13\\
&13^2 \equiv 16\\
&13^3 \equiv 13 * 16 \equiv 4\\
&\boxed{13^4 = 16 * 16 \equiv (-1) * (-1) =1}
\end{aligned}
$$
Therefore, the order of element $13$ is 4: $\mathrm {ord} (13) = 4$.

For completeness, computing the power of element $16$ as below:
$$
\begin{aligned}
&16^1 = 16\\
&\boxed{16^2 \equiv (-1) * (-1) =1}\\
\end{aligned}
$$
Hence, $\mathrm {ord} (16) = 2$.

#### Primitive 4th root of unity
Having computed the orders of all elements in the 4th roots of unity $H_4 = \{1, 4, 13, 16\}$, we observe:
$$
\begin{aligned}
&\mathrm {ord} (1) = 1\\
&\boxed{\mathrm {ord} (4) = 4}\qquad\text{(Primitive)}\\
&\boxed{\mathrm {ord} (13) = 4}\qquad\text{(Primitive)}\\
&\mathrm {ord} (16) = 2
\end{aligned}
$$
We therefore conclude that the elements $4$ and $13$ are the primitive 4th roots of unity in $H_4 = \{1, 4, 13, 16\}$.

## Using The Fundamental Theorem of Finite Cyclic Groups
Recall from the fundamental theorem of finite cyclic groups that when $n$ divides $q-1$ (in this case, 4 divides 16), the element $\omega = g^{\frac{q-1}{n}}$ generates a cyclic subgroup of order $n$ (in this case, 4).
$$
\omega = g^{\frac{q-1}{n}} = 3^{\frac{16}{4}} = 3^4 \equiv 13
$$
this generator $\omega$ is a primitive 4th root of unity. The subgroup generated by $\omega$ is
$$
\langle 13 \rangle = \{13^0 = \boxed{1}, 13^1 = \boxed{13}, 13^2\equiv\boxed{16}, 13^3\equiv\boxed{4}, 13^4\equiv\boxed{1}, 13^5\equiv\boxed{13}, \dots\}
$$
Thus, the complete set of 4th roots of unity in $\mathbb{F}^*_{17}$ is $\{1, 13, 16, 4\}$.

# Summary
The goal is to find the $n$-th roots of unity in the field $\mathbb{F}_q$. Then we proved every member of a subgroup of order $n$ is a $n$-th root of unity. In this case the element $g^{\frac{q-1}{n}}$ called the primitive $n$-th root of unity. So, the multiplicative subgroups of size $n$ in the field $\mathbb{F}_q$ is exactly $n$-th root of unity generated by $g^{\frac{q-1}{n}}$.

# Appendix 1
Since $\mathbb{F}^*_q$ is cyclic group, there is generator $g\in \mathbb{F}^*$ such that
$$
\langle g\rangle = \{1, g^1, g^2, \dots, g^{q-2}\} = \mathbb{F}^*_q
$$
recall from fundamental theorem of cyclic group, since $q-1|q-1$, then $g^{\frac{q-1}{q-1}} = g^{1} = g$ is a generator for $H_{q-1}$ which is $q-1$-th roots of unity in $\mathbb{F}_q$. So any element $a\in \mathbb{F}^*_q$ is $q-1$-th root of unity.

# Appendix 2
## Key points to remember Order of an element and Primitive $n$-th root of unity:
### Primitive $n$-th root of unity:
- A specific type of $n$-th root of unity. 
- Its powers generate all other $n$-th roots of unity. 
- To be primitive, its order must be exactly $n$. 

### Order of an element:
- A general concept in group theory.
- Applies to any element in a group, not just roots of unity. 
- Represents the smallest positive integer where raising the element to that power gives the identity. 
- Also if the order of $a$ is $n$, then $a$ necessarily is a primitive $n$-th root of unity.