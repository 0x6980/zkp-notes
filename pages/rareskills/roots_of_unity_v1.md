
# Roots of unity and Primitive roots of unity
In the [previous article]() we talked about multiplicative subgroups and how to find them in a finite field.

In this article we want to introduce concept of *roots of unity* and *primitive roots of unity*, both of which are tightly linked to multiplicative subgroups.

## Roots Of Unity
Let $a\in F$, We say $a$ is an $n$-th root of unity when
$$
a^n = 1
$$
In other words, there exists an positive integer $n$ such that $a$ raised to the power $n$ is 1. We can think of the 2nd root of unity ($n = 2$) as the square root of 1 and the 3rd root of unity ($n = 3$) as the cube root. "unity" just means "1".

### Example 1
Consider field $F_7 =\{0, 1, 2, 3, 4, 5, 6\}$. First we try to check every element in $F_7$ belong to which ($n$-th) roots of unity but you can see we will try another point of view and calculate the all $n$-th roots of unity for $1\le n\le 6$ in $F_7$. Both way have same result but these ways help us for clarification and better understanding.

Since $1^i\equiv 1$ for all $1\le i\le 6$ then, the element $1$ is 1-st, 2-nd, 3-rd, 4-th, 5-th and 6-th roots of unity.

The element $2$ is 3-rd, 6-th roots of unity because there exists $2^3\equiv 1$ and there exists $2^6\equiv 1$, but $2$ is not 4-th root of unity because $2^4$ mod 7 is not $1$. For the same reason $2$ is not a 5-th root of unity.

The element $4$ is a 3-rd root of unity because there exists $4^3 \equiv 1$, but $4$ is not a 2-nd root of unity because $4^2$ mod 7 is not 1. For the same reason $4$ is not a 5-th root of unity. Note that $4$ is a 6-th root of unity too.

As exercise check the element $5$.

In another point of view, for a given $n$ we want to find all $n$-th roots of unity in $F_7$, We will boxed on elements that the power of $n$, results $1$.

Suppose $n=6$
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

So, the 6-th roots of unity is $\{1, 2, 3, 4, 5, 6\}$.

Let $n = 5$
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

So, the 5-th roots of unity has only one element and is $\{1\}$.

Let $n = 4$
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
So, the 4-th roots of unity has two elements and is $\{1, 6\}$.

Let $n = 3$
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
So, the 3-rd roots of unity has three elements and is $\{1, 2, 4\}$.

**Exercise:** For $n=2$, the 2-nd roots of unity is equal to 4-th roots of unity. Check this as exercise.

This code is designed to find the $n$-th roots of unity using brute force in a finite field $F_q$, where $q$ is a prime number:
```python
import galois

GF = galois.GF(7)
n = 3  # looking for 3rd roots of unity

# Iterate over all field elements using GF.elements
roots = [x for x in GF.elements if x**n == 1]
print("3rd roots of unity in GF(7):", roots)
```

### The number of $n$-th roots of unity
The number of $n$-th roots of unity in $F_q$ is **greatest common divisor**: $\mathrm {gcd} (n,q-1)$.

For example, In $F_7$, $q - 1$ is 6. If $n = 3$ then we have $\mathrm {gcd} (3,6) = 3$ roots of unity. The 3-rd roots of unity has three elements and is $\{1, 2, 4\}$. Recall from Example 4, Example 5 and Example 6, since $3 | 6$, so we have a subgroup of order 3
$$
\langle 3^{\frac{n}{k}} = 3^{\frac{6}{3}} = 3^{2} \equiv 2 \rangle =\{1, 2, 4\}
$$
If $n = 4$ then we have $\mathrm {gcd} (4,6) = 2$ roots of unity. The 4-th roots of unity has two elements and is $\{1, 6\}$
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

The below code compute the number of $n$-th roots of unity in a finite field $F_q$:

```python
import galois
import math

def number_of_roots_of_unity(q, n):
    if not galois.is_prime(q):
        raise ValueError("The field size must be a prime number.")

    # The number of n-th roots of unity is gcd(n, q-1)
    return math.gcd(n, q - 1)

# Example usage: Find the number of 6-th roots of unity and primitive 6-th roots in F7
field_size = 7
n = 6
num_roots = number_of_roots_of_unity(field_size, n)
print(f"Number of {n}-th roots of unity in F{field_size}: {num_roots}")
```

## Primitive Roots Of Unity
In set of $n$-th roots of unity those element are primitive $n$-th root of unity which the order of that element is equal to $n$. 

For example in $F_7$:
- $6$ is 2-nd root of unity because $6^2\equiv 1$. Since 2 is smallest positive integer such that $6^2\equiv 1$, then $6$ is primitive $2$-nd root of unity.

- $4$ is a 6-th root of unity because $4^6$ is 1 but it is not a primitive root of unity because $4^3$ is also a solution and 3 is smaller than 6.

- $4$ is a 3-rd root of unity because $4^3$ is 1. Since 3 is smallest positive integer such that $4^3\equiv 1$, then $4$ is primitive $3$-rd root of unity.

- $2$ is a 3-rd root of unity because $2^3$ is 1.Since 3 is smallest positive integer such that $2^3\equiv 1$, then $2$ is primitive $3$-rd root of unity.

- Two above examples shows that we have two primitive 3-rd roots of unity.

### Powers of primitive root of unity
Consider above examples and we want to calculate the powers of primitive $n$-th root of unity.

- $6$ is a primitive 2-nd root of unity,
  $$
  \begin{aligned}
    \{6^{1} = 6, 6^{2}\equiv 1, 6^3 \equiv 6, 6^4 \equiv 1, \dots\}
  \end{aligned}
  $$
  You can see for all $i$ the $6^i$ is equal to $6$ or equal to $1$. Then, the powers of $6$ is $\{1, 6\}$. So, the powers of $6$ is the 2-nd roots of unity.
- $4$ is a primitive 3-rd root of unity, then
  $$
  \begin{aligned}
    \{4^{1} = 4, 4^{2}\equiv 2, 4^3 \equiv 1, 4^4 \equiv 4, \dots\}
  \end{aligned}
  $$
  You can see for all $i$ the $4^i$ is equal to one of $1, 2, 4$. Then, the powers of $4$ is $\{1, 2, 4\}$. So, the powers of $4$ is the 3-rd roots of unity.
- $2$ is a primitive 3-rd root of unity,
  $$
  \begin{aligned}
    \{2^{1} = 2, 2^{2}\equiv 4, 2^3 \equiv 1, 2^4 \equiv 2, \dots\}
  \end{aligned}
  $$
  You can see for all $i$ the $2^i$ is equal to one of $1, 2, 4$. Then, the powers of $2$ is $\{1, 2, 4\}$. So, the powers of $2$ is the 3-rd roots of unity.

### Definition
The below definition is the same as above discussion.

An element $a$ is a *primitive $n$-th root of unity* if
1. $a$ is an $n$-th root of unity. So, $a^n \equiv 1$.
2. $\mathrm {ord} (a) = n$. So, $n$ is the smallest positive integer such that $a^n \equiv 1$.
   
In other words, an $n$-th root of unity is a *primitive $n$-th root of unity* when $\mathrm {ord} (a) = n$.

### Example 11
Consider $F_7$ and the $n$-th roots of unity we calculated before in Example 1. We want to determine the primitive $n$-th roots of unity using the definition. We denote $H_i$ as the set of $i$-th roots of unity

- $H_2 = \{1, 6\}$ is 2-nd roots of unity (Example 2). We want to find primitive 2-nd root of unity. For that we are looking for elements in 2-nd roots of unity such that the order of those element be equal to 2. Since 
  $$
  \begin{aligned}
  &\mathrm {ord} (1) = 1\\
  &\boxed{\mathrm {ord} (6) = 2}\space\space\space\text{because 2 is smallest positive integer s.t. $6^2 = 36\equiv 1$ in $F_7$}
  \end{aligned}
  $$

  Then $6$ is primitive 2-nd root of unity and $1$ is not primitive because the order of $1$ is not 2 (again recall that the order of element $1$ is **smallest** positive integer n such that $1^n=1$).
- $H_3 = \{1, 2, 4\}$ is 3-rd roots of unity (Example 3). Since 
  $$
  \begin{aligned}
  &\mathrm {ord} (1) = 1\\
  &\boxed{\mathrm {ord} (2) = 3}\space\space\space\text{because 3 is smallest positive integer s.t. $2^3 = 8\equiv 1$ in $F_7$}\\
  &\boxed{\mathrm {ord} (4) = 3}\space\space\space\text{because 3 is smallest positive integer s.t. $4^3 \equiv 1$ in $F_7$}
  \end{aligned}
  $$

  Then $2, 4$ are primitive 3-rd roots of unity. In this case we have more than one elements as primitive root of unity.
- $H_4 = \{1, 6\}$ is 4-th roots of unity. Since 
  $$
  \begin{aligned}
    \mathrm {ord} (1) = 1\\
    \mathrm {ord} (6) = 2
  \end{aligned}
  $$
  Then there is not an element with order of 4 then $H_4$ does not have any primitive 4-th root of unity.
- As Exercise proof that $H_5$ does not have any primitive 5-th root of unity.

- $H_6 = \{1, 2, 3, 4, 5, 6\}$ is 6-th roots of unity. Since 
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
  Then $3, 5$ are primitive 6-th roots of unity. Because the order of $3, 5$ is 6. Note that $4^6\equiv 1$ but it is not a primitive 6-th root of unity because the lowest $n$ that satisfied $4^n \equiv 1$ is 3. Therefore, it is a 6-th root of unity, but not a primitive 6th root of unity. It is however a primitive 3rd root of unity.

The below code uses brute force to find primitive roots of unity:
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

# Example usage: Find the primitive 6-th roots of unity in F7
field_size = 7
n = 6
primitive_roots = primitive_nth_roots_of_unity_in_finite_field(field_size, n)
print(f"The primitive {n}-th roots of unity in F{field_size} are: {primitive_roots}")
```

This code is non-brute force  version of find the $n$-th roots of unity in a finite field $F_q$, where $q$ is a prime number:
```python
# non-brute force code
import galois

GF = galois.GF(7)
GF.primitive_roots_of_unity(3)
# GF([2, 4], order=7)
```

## Every member of a subgroup of order $n$ is a $n$-th root of unity
If $g$ is a primitive $n$-th root of unity, then $\mathrm{ord}(g)$ is $n$. Every element in $\langle g \rangle$ is a $n$-th root of unity, or in other words, every element of $\langle g \rangle$ raised to the $n$-th power is 1. Here is why:

If $g$ is a primitive $n$-th root of unity, then $g^m$ is a member of the subgroup $\langle g \rangle$. Since $g$ is a primitive $n$-th root of unity, we have that $g^n = 1$. If we raise any member of $\langle g \rangle$ to the $n$-th power, we have that
$$
(g^{m})^{n} = g^{(mn)} = g^{(nm)} = (g^{n})^{m} = 1^m = 1
$$
Therefore, any member of $\langle g \rangle$ raised to the $n$-th power is 1, which is equivalent to saying every member of the $\langle g \rangle$  is a $n$-th root of unity.

### Example 2
Since $\langle 3\rangle = F^*_7$ and $2|6$, then $3^{\frac{q-1}{n}} = 3^{\frac{6}{2}} = 3^{3} = 27 \equiv 6$ is a generator for 2-nd roots of unity $H_2 = \{1, 6\} = \langle 6\rangle$ in $F_7$. The element $6$ called the **primitive 2-nd root of unity**.

### Example 3
Since $\langle 3\rangle = F^*_7$ and $3|6$, then $3^{\frac{q-1}{n}} = 3^{\frac{6}{3}} = 3^{2} = 9 \equiv 2$ is a generator for 3-rd roots of unity $H_3 = \{1, 2, 4\} = \langle 2\rangle$ in $F_7$. The element $2$ called the **primitive 3-rd root of unity**.

### Example 4
- If $F_q$ is a finite field, any element $a\in F^*_q$ is $q-1$-th root of unity.
  - **Proof.** Recall from **Theorem 1** there is $g\in F^*$ such that
    $$
    F^*_q = \{1, g^1, g^2, \dots, g^{q-2}\}
    $$
    Since $\langle g\rangle = F^*_q$ and $q-1|q-1$, then $g^{\frac{q-1}{q-1}} = g^{1} = g$ is a generator for $H_{q-1}$ which is $q-1$-th roots of unity in $F_q$. So any element $a\in F^*_q$ is $q-1$-th root of unity.
- You can see in Example 1 any nonzero element in $F^*_7 =\{1, 2, 3, 4, 5, 6\}$ is a 6-th roots of unity. We calculate it in the following python code:

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

### Key points to remember Order of an element and Primitive $n$-th root of unity:
#### Primitive $n$-th root of unity:
- A specific type of $n$-th root of unity. 
- Its powers generate all other $n$-th roots of unity. 
- To be primitive, its order must be exactly $n$. 

#### Order of an element:
- A general concept in group theory.
- Applies to any element in a group, not just roots of unity. 
- Represents the smallest positive integer where raising the element to that power gives the identity. 
- Also if the order of $a$ is $n$, then $a$ necessarily is a primitive $n$-th root of unity.

### Example 5
Those elements in 2-nd roots of unity are primitive 2-nd root of unity if the order of that element is equal to 2. 
- In other words: $a \in 2$-nd roots of unity is a primitive 2-nd root of unity if $\mathrm{ord} (a) = 2$
- $a \in 3$-rd roots of unity is a primitive 3-rd root of unity if $\mathrm{ord} (a) = 3$
- $a \in 4$-th roots of unity is a primitive 4-th root of unity if $\mathrm{ord} (a) = 4$
- And so on.
- You know by definition of order of element, that $\mathrm{ord}(a) = n$ if $n$ is smallest positive integer such that $a^n =1$. So if $\mathrm{ord} (a) = 3$ means 3 is smallest positive integer such that $a^3 =1$, And so on.

### The number of primitive $n$-th roots of unity
The number of primitive $n$-th roots of unity in $F_q$ is $\phi (n)$ ([Euler's totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function)).

The below code compute the number of primitive $n$-th roots of unity in the $F_q$:

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

# Example usage: Find the number of 6-th roots of unity and primitive 6-th roots in F7
field_size = 7
n = 6
num_primitive_roots = number_of_roots_of_unity(field_size, n)
print(f"Number of primitive {n}-th roots of unity in F{field_size}: {num_primitive_roots}")
```

# Example 6
Consider field $F_{17} =\{0, 1, 2,\dots, 16\}$. For a given $n$ we want to find all $n$-th roots of unity and primitive $n$-th root of unity in $F_{17}$ using roots of unity and primitive roots of unity definitions.

## The generator of $F^*_{17}$
Recall from Theorem 1 the $F^*_{17}$ is a cyclic group. We are proving that $F^*_{17} = \langle 3 \rangle$:

$$
\begin{aligned}
    &3^0 = \boxed{1},\\
    &3^1 = \boxed{3},\\
    &3^2 = \boxed{9},\\
    &3^3 \equiv 9 * 3 \equiv \boxed{10},\space\space (27 - 17 = 10)\\
    &3^4 \equiv 10 * 3\equiv \boxed{13},\space\space(30 - 17 = 13)\\
    &3^5 \equiv 13 * 3 \equiv \boxed{5},\space\space(39 - 2*17 = 5)\\
    &3^6 \equiv 5 * 3 \equiv \boxed{15},\\
    &3^7 \equiv 15 * 3 \equiv \boxed{11},\space\space(45 - 2*17 = 11)\\
    &3^8 \equiv 11 * 3 \equiv \boxed{16},\space\space(33 - 17 = 16)\\
    &3^9 \equiv 16 * 3 \equiv \boxed{14},\space\space(48 - 2*17 = 14)\\
    &3^{10} \equiv 14 * 3 \equiv \boxed{8},\space\space(42 - 2*17 = 8)\\
    &3^{11} \equiv 8 * 3 \equiv \boxed{7},\space\space(24 - 17 = 7)\\
    &3^{12} \equiv 7 * 3 \equiv \boxed{4},\space\space(21 - 17 = 4)\\
    &3^{13} \equiv 4 * 3 \equiv \boxed{12},\\
    &3^{14} \equiv 12 * 3 \equiv \boxed{2},\space\space(36 - 2*17 = 2)\\
    &3^{15} \equiv 2 * 3 \equiv \boxed{6},\\
    &3^{16} = 6 * 3 \equiv \boxed{1},\space\space(18 - 17 = 1)
\end{aligned}
$$
How about $3^{17}$?
$$
    3^{17} = 3^{16} * 3 \equiv 1 * 3 = 3\\
$$
You can see for all $k \ge 17$, the element $3^k$ is equal to one of the $3^0, 3^1, 3^2, \dots, 3^{16}$.

Then $\langle 3 \rangle = \{1, 2, \dots, 16\} = F^*_{17}$.

## Using roots of unity and primitive roots of unity definitions
Suppose $n=4$ and we want use the definition of roots of unity and find the all 4-th roots of unity in $F^*_{17}$
### 4-th roots of unity
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
So, the 4-th roots of unity has four elements and is $H_4 = \{1, 4, 13, 16\}$.
Now we are looking for the primitive 4-th roots of unity by the definition. For that we are looking for elements in 4-th roots of unity such that the order of those element be equal to 4.

#### Calculating the order of elements in $H_4$
It is obvious $\mathrm {ord} (1) = 1$.

The order of element $4$: 
$$
\begin{aligned}
&4^1 = 4\\
&4^2 = 16\\
&4^3 \equiv 13\\
&\boxed{4^4 = 16 * 16 \equiv (-1) * (-1) =1}
\end{aligned}
$$
Then the order of element $4$ is 4. $\mathrm {ord} (4) = 4$.

The order of element $13$:
$$
\begin{aligned}
&13^1 = 13\\
&13^2 \equiv 16\\
&13^3 \equiv 13 * 16 \equiv 4\\
&\boxed{13^4 = 16 * 16 \equiv (-1) * (-1) =1}
\end{aligned}
$$
Then the order of element $13$ is 4. $\mathrm {ord} (13) = 4$.

The order of element $16$:
$$
\begin{aligned}
&16^1 = 16\\
&\boxed{16^2 \equiv (-1) * (-1) =1}\\
\end{aligned}
$$
Then the order of element $16$ is 2. $\mathrm {ord} (16) = 2$.

#### Primitive 4-th root of unity
After calculating the order of elements in $H_4 = \{1, 4, 13, 16\}$, since
$$
\begin{aligned}
&\mathrm {ord} (1) = 1\\
&\boxed{\mathrm {ord} (4) = 4}\\
&\boxed{\mathrm {ord} (13) = 4}\\
&\mathrm {ord} (16) = 2
\end{aligned}
$$
Then $4, 13$ are two primitive 4-th roots of unity in $H_4 = \{1, 4, 13, 16\}$.

# Summary
The goal is to find the $n$-th roots of unity in the field $F_q$. Then we proved every member of a subgroup of order $n$ is a $n$-th root of unity. In this case the element $g^{\frac{q-1}{n}}$ called the primitive $n$-th root of unity. So, the multiplicative subgroups of size $n$ in the field $F_q$ is exactly $n$-th root of unity generated by $g^{\frac{q-1}{n}}$.