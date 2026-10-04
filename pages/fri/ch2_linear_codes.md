# Linear Codes and Reed–Solomon Codes

## The construction problem

In the previous chapter, we learned that the minimum distance of a code determines its ability to detect and correct errors.

Recall that a code with minimum distance $d_{\min}$ can correct

$$
t=
\left\lfloor
\frac{d_{\min}-1}{2}
\right\rfloor
$$

errors.

So, naturally, we want a large minimum distance. This leads to a fundamental question:

> **How can we construct codes whose codewords are far apart?**

We would like to be able to:

* encode messages efficiently;
* decode received words efficiently;
* describe the code mathematically;
* perform calculations with the code;
* construct codes of different lengths and dimensions.

So the problem becomes:

$$
\boxed{
\text{Large distance}
+
\text{mathematical structure}
+
\text{efficient encoding/decoding}
}
$$

One of the most important ways of obtaining this structure is through **linear codes**.

---

# A first attempt at constructing a code

Suppose our messages consist of two bits $\{0,1\}$. There are four possible messages:

$$
00,\quad01,\quad10,\quad11.
$$

Suppose we want to protect these messages against errors. One possibility is to add redundancy. For example, we could encode

$$
00\rightarrow00000
$$

$$
01\rightarrow00111
$$

$$
10\rightarrow11001
$$

$$
11\rightarrow11110.
$$

Now each message is represented by a word of length \(5\). We have transformed a message of length \(2\) into a codeword of length \(5\). This gives us redundancy. But there is an important question:

> **How did we choose these particular codewords?**

Could we construct them systematically rather than simply choosing them by hand?

This is where algebra becomes useful.

---

# Look for structure

Consider the following code:

$$
C=
\{00000,00111,11001,11110\}.
$$

Something interesting happens if we add two codewords using binary addition. For example,

$$
00111+11001
$$

where addition is performed modulo \(2\). We obtain

$$
11110.
$$

And \(11110\) is also a codeword. Similarly,

$$
00111+11110=11001.
$$

Again, the result is a codeword. Also,

$$
11001+11110=00111.
$$

So the code has an important algebraic property:

> **Adding two codewords produces another codeword.**

This is the beginning of the idea of a **linear code**.

---

# What is a linear code?

A code $C\subseteq\mathbb F_q^n$ is called a **linear code** if it is a vector subspace of $\mathbb F_q^n$. For a binary code, this means that whenever

$$
x,y\in C,
$$

and $a,b\in\mathbb F$, we have

$$
ax+by\in C.
$$

There is another particularly important consequence:

$$
0\in C.
$$

For binary codes, the only scalars are 0 and 1, so this condition is very simple.

Therefore, for a binary code, you can think of linearity as:

$$
\boxed{
x,y\in C
\quad\Longrightarrow\quad
x+y\in C.
}
$$

This simple property gives us a huge amount of structure.

---

## Exercise 1 — Linear or not?

Consider the following binary code:

$$
C=\{000,011,101,110\}.
$$

Check whether $C$ is a linear code.

Try adding different pairs of codewords.

---

# Dimension and length

A linear code is usually described using parameters such as

$$
[n,k,d].
$$

Let's understand these one at a time.

### $n$: length

Each codeword has $n$ symbols. In our example,

$$
n=5.
$$

### $k$: dimension

The code has $k$ independent generator vectors. In our example,

$$
k=2.
$$

Therefore, there are

$$
q^k
$$

codewords in a $q$-ary linear code. For a binary code,

$$
2^k.
$$

So our code contains

$$
2^2=4
$$

codewords.

### $d$: minimum distance

This is the minimum Hamming distance between distinct codewords.

Thus, our code can be described by

$$
[5,2,d].
$$

We still need to calculate $d$.

---

# Hamming distance in linear codes

For a linear code, we can relate distance to Hamming weight.

The **Hamming weight** $wt(x)$ is the number of nonzero positions in $x$. For example,

$$
wt(00111)=3.
$$

Linearity guarantees that the distance between two codewords is simply the weight of their difference: 

$$
d(x,y) = d(x-y,0) = wt(x-y).
$$

Since $x-y$ is itself a codeword, the minimum distance is simply the minimum nonzero weight of all codewords:

$$
\boxed{
d_{\min}
=
\min_{c\in C,\;c\neq0}wt(c).
}
$$

This is an extremely useful property of linear codes.

---

# Example

Consider

$$
C=
\{00000,00111,11001,11110\}.
$$

The nonzero codewords are

$$
00111,
$$

$$
11001,
$$

$$
11110.
$$

Their weights are

$$
wt(00111)=3,
$$

$$
wt(11001)=3,
$$

$$
wt(11110)=4.
$$

Therefore,

$$
d_{\min}=3.
$$

So this is a

$$
\boxed{[5,2,3]}
$$

linear code.

Since

$$
d_{\min}=3,
$$

it can:

$$
\boxed{\text{detect up to 2 errors}}
$$

and

$$
\boxed{\text{correct 1 error}}.
$$

---

## Exercise 3 — Distance and correction

A linear code has parameters

$$
[10,4,d].
$$

Suppose its minimum distance is

$$
d=5.
$$

Determine:

1. How many errors can it detect?
2. How many errors can it correct?

---

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
\boxed{d_{\mathrm{min}}\le n-k+1.}
$$

---

# Code Rate

The code uses $n$ symbols to represent $k$ symbols of information.

This naturally gives us the **rate**

$$
\boxed{R=\frac{k}{n}}.
$$

For example, suppose we have a

$$
[10,6,d]
$$

code.

The encoder takes \(6\) field elements and produces a codeword of \(10\) field elements.

The rate is

$$
R=\frac{6}{10}=0.6.
$$

The remaining \(4\) symbols are redundancy. This brings back an idea from Chapter 1.

We introduced redundancy because redundancy gives us distance, and distance gives us error tolerance.

So we now have a fundamental tension:

$$
\boxed{
\text{more redundancy}
\quad\Longleftrightarrow\quad
\text{potentially more error tolerance}
}
$$

but

$$
\boxed{
\text{more redundancy}
\quad\Longleftrightarrow\quad
\text{lower rate}.
}
$$

A useful code therefore tries to achieve a good balance between:

* how much information it carries,
* how long its codewords are,
* and how far apart its codewords are.

---