
# A new problem appears

> **We want to construct linear codes with very large minimum distance!**

One particularly important idea is to connect coding with **polynomials**.

---

# From vectors to polynomials

Consider a polynomial

$$
f(x)=a_0+a_1x+a_2x^2+\cdots+a_{k-1}x^{k-1}.
$$

There are $k$ coefficients:

$$
a_0,a_1,\ldots,a_{k-1}.
$$

So a message consisting of $k$ symbols can naturally be viewed as the coefficients of a polynomial. For example, suppose our message is

$$
(2,5,1).
$$

We can associate with it the polynomial

$$
f(x)=2+5x+x^2.
$$

Now comes the key idea.

Instead of transmitting the coefficients directly, we can **evaluate the polynomial at several points**.

For example, evaluate $f(x)$ at

$$
x=0,1,2,3,4.
$$

We obtain a sequence

$$
f(0),f(1),f(2),f(3),f(4).
$$

This sequence can be used as a codeword. This is the basic idea behind **Reed–Solomon codes**.

---

# Definition Reed–Solomon codes

Let

$$
D=\{x_1,\ldots,x_n\}\subseteq\mathbb F
$$

be a set of $n$ distinct field elements.

The Reed–Solomon code of dimension $k$ over the evaluation domain $D$ is

$$
\boxed{
RS(D,k)
= C =
\left\{
\bigl(f(x_1),\ldots,f(x_n)\bigr)
:
f\in\mathbb F[X],\ \deg f<k
\right\}.
}
$$

In words:

> A Reed–Solomon code consists of the evaluation vectors of all polynomials whose degree is less than $k$.

This definition is the most important thing to remember from this chapter.

We can summarize it as

$$
\boxed{
\text{polynomial}
\quad
\xrightarrow{\text{evaluate on }D}
\quad
\text{Reed--Solomon codeword}.
}
$$

And something immediately interesting happens.

If

$$
f(X)
$$

and

$$
g(X)
$$

both have degree less than $k$, then

$$
af(X)+bg(X)
$$

also has degree less than $k$.

Moreover,

$$
(af+bg)(x_i)
=
af(x_i)+bg(x_i).
$$

Therefore the corresponding evaluation vectors satisfy

$$
\operatorname{Eval}(af+bg)
=
a\operatorname{Eval}(f)
+
b\operatorname{Eval}(g).
$$

So the set of evaluation vectors is automatically a **linear code**.

This is the connection we were looking for.


---

# Why does evaluating a polynomial help?

This is the crucial insight. Suppose two different messages correspond to two different polynomials:

$$
f(x)
$$

and

$$
g(x).
$$

Consider their difference:

$$
h(x)=f(x)-g(x).
$$

If $f\neq g$, then $h(x)$ is a nonzero polynomial. Suppose both $f$ and $g$ have degree less than $k$.

Then

$$
\deg h<k.
$$

A fundamental theorem about polynomials says:

> **A nonzero polynomial of degree at most $k-1$ can have at most $k-1$ roots.**

This simple fact is the mathematical engine behind Reed–Solomon codes.



---

# The key polynomial idea

Suppose we evaluate polynomials at $n$ distinct points:

$$
\alpha_1,\alpha_2,\ldots,\alpha_n.
$$

Let $f(x)$ and $g(x)$ be two different polynomials of degree less than $k$.

They can agree at at most

$$
k-1
$$

of those evaluation points.

Therefore, they must differ at least

$$
n-(k-1)
$$

positions.

Thus,

$$
d_{\min}\geq n-k+1.
$$

In other hand, Singleton Bound implies that, for Reed–Solomon codes,

$$
\boxed{
d_{\min}=n-k+1.
}
$$

This is an extraordinarily strong result.

---

# A concrete example

Let's temporarily use ordinary arithmetic just to see the mechanism.

Take the message

$$
(2,3).
$$

The corresponding polynomial is

$$
f(x)=2+3x.
$$

Evaluate it at

$$
0,1,2,3,4.
$$

We obtain

$$
f(0)=2,
$$

$$
f(1)=5,
$$

$$
f(2)=8,
$$

$$
f(3)=11,
$$

$$
f(4)=14.
$$

So the codeword is

$$
\boxed{(2,5,8,11,14)}.
$$

Now suppose a transmission error changes the third symbol:

$$
(2,5,8,11,14)
\longrightarrow
(2,5,99,11,14).
$$

The receiver sees a sequence that does not lie on the original line.

Because the receiver knows that a valid codeword must come from evaluating a polynomial of degree at most \(1\), it can use the other symbols to reconstruct the polynomial and identify the erroneous value.

This is the basic intuition behind polynomial error correction.

---

# Reed–Solomon parameters

A Reed–Solomon code is commonly described by

$$
\boxed{[n,k,d]}
$$

where

$$
d=n-k+1.
$$

Therefore,

$$
\boxed{d=n-k+1}.
$$

This means Reed–Solomon codes achieve the largest possible minimum distance allowed by the Singleton bound.

Such codes are called **Maximum Distance Separable**, or

$$
\boxed{\text{MDS}}
$$

codes.

The important point for now is not the name.

The important point is:

> **Reed–Solomon codes achieve an extremely efficient relationship between message length, codeword length, and minimum distance.**

---

# 20. Understanding the parameters

Suppose we have

$$
RS[n,k].
$$

Then:

* \(k\) = number of symbols containing the original information;
* $n$ = number of symbols transmitted;
* \(n-k\) = number of redundant symbols;
* \(d=n-k+1\) = minimum distance.

The number of errors that can be corrected is

$$
t=
\left\lfloor
\frac{n-k}{2}
\right\rfloor.
$$

If \(n-k\) is even, this becomes

$$
t=\frac{n-k}{2}.
$$

So adding redundancy directly increases the number of correctable errors.

---

# A practical example

Consider a Reed–Solomon code with

$$
n=15
$$

and

$$
k=11.
$$

Then there are

$$
15-11=4
$$

redundant symbols.

The minimum distance is

$$
d=15-11+1=5.
$$

Therefore, the code can correct

$$
t=
\left\lfloor
\frac{5-1}{2}
\right\rfloor
=2
$$

symbol errors.

So:

$$
\boxed{11\text{ information symbols}}
$$

become

$$
\boxed{15\text{ transmitted symbols}}
$$

and the code can correct up to

$$
\boxed{2\text{ erroneous symbols}}.
$$

Notice something important:

A "symbol error" does not necessarily mean a single bit error.

If the symbols belong to \(\mathbb F_{256}\), each symbol represents \(8\) bits.

Therefore, Reed–Solomon codes are particularly useful when errors occur in **groups of bits**, or entire symbols are corrupted.

---

## Exercise 5

Consider a Reed–Solomon code with

$$
n=12,\qquad k=8.
$$

Find:

1. The number of redundant symbols.
2. The minimum distance.
3. The maximum number of errors that can always be corrected.
4. The maximum number of errors that can always be detected.

---

# Exercises

## Exercise 6 — The central idea

Suppose two different polynomials $f(x)$ and $g(x)$ both have degree at most \(4\).

Can they agree at five distinct points?

Explain why or why not.

### Hint

Consider

$$
h(x)=f(x)-g(x).
$$

What can you say about the degree and number of roots of $h(x)$?

---

# The Most Important Mental Model

At this point, there are two ways to look at a Reed–Solomon code.

### Coding-theory viewpoint

A Reed–Solomon code is a linear code with parameters

$$
[n,k,n-k+1].
$$

It has large minimum distance and therefore strong error-correcting properties.

### Algebraic viewpoint

A Reed–Solomon code is the set of functions on $D$ that arise by restricting low-degree polynomials to $D$:

$$
\boxed{
RS(D,k)
=
\{f|_D:\deg f<k\}.
}
$$

For the rest of our journey toward FRI, the **second viewpoint is more important**.

We will increasingly stop thinking of a codeword as just a vector like

$$
(c_1,c_2,\ldots,c_n)
$$

and instead think of it as a function

$$
g:D\to\mathbb F_q.
$$

The special functions are the ones that come from low-degree polynomials.

So we can write:

$$
\boxed{
\text{Reed--Solomon code}
=
\text{low-degree functions on }D.
}
$$

This is the viewpoint we will carry into FRI.

---
