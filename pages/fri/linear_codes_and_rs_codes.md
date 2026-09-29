# From Large Minimum Distance to Reed–Solomon Codes

## The construction problem

In the previous chapter, we learned that the minimum distance of a code determines its ability to detect and correct errors.

Recall that a code with minimum distance \(d_{\min}\) can correct

$$
t=
\left\lfloor
\frac{d_{\min}-1}{2}
\right\rfloor
$$

errors.

So, naturally, we want a large minimum distance.

This leads to a fundamental question:

> **How can we construct codes whose codewords are far apart?**

But there is another requirement.

A code should not only be powerful. It should also be **useful**.

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

# 2. A first attempt at constructing a code

Suppose our messages consist of two bits.

There are four possible messages:

$$
00,\quad01,\quad10,\quad11.
$$

Suppose we want to protect these messages against errors.

One possibility is to add redundancy.

For example, we could encode

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

Now each message is represented by a word of length \(5\).

We have transformed a message of length \(2\) into a codeword of length \(5\).

This gives us redundancy.

But there is an important question:

> **How did we choose these particular codewords?**

Could we construct them systematically rather than simply choosing them by hand?

This is where algebra becomes useful.

---

# 3. Look for structure

Consider the following code:

$$
C=
\{00000,00111,11001,11110\}.
$$

Something interesting happens if we add two codewords using binary addition.

For example,

$$
00111+11001
$$

where addition is performed modulo \(2\).

We obtain

$$
11110.
$$

And \(11110\) is also a codeword.

Similarly,

$$
00111+11110=11001.
$$

Again, the result is a codeword.

Also,

$$
11001+11110=00111.
$$

So the code has an important algebraic property:

> **Adding two codewords produces another codeword.**

This is the beginning of the idea of a **linear code**.

---

# 4. Binary addition

Before defining linear codes, let's make sure the operation is clear.

In binary arithmetic over \(\mathbb F_2\),

$$
0+0=0,
$$

$$
0+1=1,
$$

$$
1+0=1,
$$

and

$$
1+1=0.
$$

The last rule may look strange.

But it is simply addition modulo \(2\):

$$
1+1=2\equiv0\pmod2.
$$

For example,

$$
1011+1101
$$

is calculated as

$$
0110.
$$

Indeed,

$$
1+1=0,
$$

$$
0+1=1,
$$

$$
1+0=1,
$$

$$
1+1=0.
$$

Thus

$$
1011+1101=0110.
$$

---

# 5. What is a linear code?

Now we can define the idea.

A code \(C\subseteq\mathbb F_q^n\) is called a **linear code** if it is a vector subspace of \(\mathbb F_q^n\).

For a binary code, this means that if

$$
x,y\in C,
$$

then

$$
x+y\in C.
$$

Also, multiplying a codeword by an element of the field must produce another codeword.

For binary codes, the only scalars are \(0\) and \(1\), so this condition is very simple.

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

# 6. Why is linearity useful?

Suppose we have a code containing thousands or millions of codewords.

We don't want to list every codeword individually.

Instead, we want a compact description of the whole code.

Linearity allows us to describe the code using a small number of special codewords called **basis vectors**.

For example, consider

$$
C=
\{00000,00111,11001,11110\}.
$$

We can generate all four codewords from

$$
g_1=00111
$$

and

$$
g_2=11001.
$$

Indeed,

$$
0g_1+0g_2=00000,
$$

$$
0g_1+1g_2=11001,
$$

$$
1g_1+0g_2=00111,
$$

and

$$
1g_1+1g_2=11110.
$$

Thus,

$$
C=
\{u_1g_1+u_2g_2:
u_1,u_2\in\mathbb F_2\}.
$$

Instead of storing four codewords, we only need two generators.

This is a major advantage.

---

# 7. The generator matrix

We can put the generators into a matrix:

$$
G=
\begin{pmatrix}
0&0&1&1&1\\
1&1&0&0&1
\end{pmatrix}.
$$

This is called a **generator matrix**.

If the message is

$$
u=(u_1,u_2),
$$

we encode it by

$$
c=uG.
$$

For example, suppose

$$
u=(1,0).
$$

Then

$$
c=(1,0)
\begin{pmatrix}
0&0&1&1&1\\
1&1&0&0&1
\end{pmatrix}.
$$

Therefore,

$$
c=00111.
$$

For

$$
u=(1,1),
$$

we get

$$
c=00111+11001
$$

and hence

$$
c=11110.
$$

So the generator matrix gives us a systematic way to encode messages.

---

# 8. Dimension and length

A linear code is usually described using parameters such as

$$
[n,k,d].
$$

Let's understand these one at a time.

### \(n\): length

Each codeword has \(n\) symbols.

In our example,

$$
n=5.
$$

### \(k\): dimension

The code has \(k\) independent generator vectors.

In our example,

$$
k=2.
$$

Therefore, there are

$$
q^k
$$

codewords in a \(q\)-ary linear code.

For a binary code,

$$
2^k.
$$

So our code contains

$$
2^2=4
$$

codewords.

### \(d\): minimum distance

This is the minimum Hamming distance between distinct codewords.

Thus, our code can be described by

$$
[5,2,d].
$$

We still need to calculate \(d\).

---

# 9. A beautiful property of linear codes

For a linear code, there is a very useful shortcut.

Because

$$
x,y\in C
$$

implies

$$
x+y\in C,
$$

we can relate distance to Hamming weight.

The **Hamming weight** \(wt(x)\) is the number of nonzero positions in \(x\).

For example,

$$
wt(00111)=3.
$$

Now consider two codewords \(x\) and \(y\).

Over \(\mathbb F_2\),

$$
x-y=x+y.
$$

Therefore,

$$
d(x,y)=wt(x+y).
$$

Since \(x+y\) is itself a codeword, the minimum distance is simply the minimum nonzero weight of a codeword:

$$
\boxed{
d_{\min}
=
\min_{c\in C,\;c\neq0}wt(c).
}
$$

This is an extremely useful property of linear codes.

---

# 10. Example

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

# 11. A new problem appears

Linear codes have given us a beautiful structure.

But we still have our original problem:

> **How can we construct linear codes with very large minimum distance?**

We could try random generator matrices.

Sometimes they work well.

But coding theory gives us much more systematic constructions.

One particularly important idea is to connect coding with **polynomials**.

This may seem surprising at first.

What could polynomials possibly have to do with correcting errors?

The answer is remarkably beautiful.

---

# 12. From vectors to polynomials

Consider a polynomial

$$
f(x)=a_0+a_1x+a_2x^2+\cdots+a_{k-1}x^{k-1}.
$$

There are \(k\) coefficients:

$$
a_0,a_1,\ldots,a_{k-1}.
$$

So a message consisting of \(k\) symbols can naturally be viewed as the coefficients of a polynomial.

For example, suppose our message is

$$
(2,5,1).
$$

We can associate with it the polynomial

$$
f(x)=2+5x+x^2.
$$

Now comes the key idea.

Instead of transmitting the coefficients directly, we can **evaluate the polynomial at several points**.

For example, evaluate \(f(x)\) at

$$
x=0,1,2,3,4.
$$

We obtain a sequence

$$
f(0),f(1),f(2),f(3),f(4).
$$

This sequence can be used as a codeword.

This is the basic idea behind **Reed–Solomon codes**.

---

# 13. Why does evaluating a polynomial help?

This is the crucial insight.

Suppose two different messages correspond to two different polynomials:

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

If \(f\neq g\), then \(h(x)\) is a nonzero polynomial.

Suppose both \(f\) and \(g\) have degree less than \(k\).

Then

$$
\deg h<k.
$$

A fundamental theorem about polynomials says:

> **A nonzero polynomial of degree at most \(k-1\) can have at most \(k-1\) roots.**

This simple fact is the mathematical engine behind Reed–Solomon codes.

---

# 14. The key polynomial idea

Suppose we evaluate polynomials at \(n\) distinct points:

$$
\alpha_1,\alpha_2,\ldots,\alpha_n.
$$

Let

$$
f(x)
$$

and

$$
g(x)
$$

be two different polynomials of degree less than \(k\).

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

In fact, for Reed–Solomon codes,

$$
\boxed{
d_{\min}=n-k+1.
}
$$

This is an extraordinarily strong result.

---

# 15. Constructing a Reed–Solomon code

Let's construct a small example.

Suppose we work over a finite field and want

$$
n=5
$$

symbols per codeword and

$$
k=2
$$

message symbols.

A message

$$
(a,b)
$$

is represented by the polynomial

$$
f(x)=a+bx.
$$

This polynomial has degree at most \(1\).

Now choose five distinct evaluation points:

$$
\alpha_1,\alpha_2,\alpha_3,\alpha_4,\alpha_5.
$$

The codeword is

$$
\boxed{
(f(\alpha_1),
f(\alpha_2),
f(\alpha_3),
f(\alpha_4),
f(\alpha_5))
}.
$$

So

$$
(a,b)
\longrightarrow
f(x)=a+bx
\longrightarrow
(f(\alpha_1),\ldots,f(\alpha_5)).
$$

---

# 16. Why are the codewords far apart?

Take two different messages.

They produce two different linear polynomials:

$$
f(x)=a+bx
$$

and

$$
g(x)=c+dx.
$$

Their difference is

$$
f(x)-g(x)
=
(a-c)+(b-d)x.
$$

This is a nonzero polynomial of degree at most \(1\).

A nonzero linear polynomial has at most one root.

Therefore, \(f\) and \(g\) can agree at at most one evaluation point.

We evaluate at five points.

So the two resulting codewords can agree in at most one position.

Therefore, they must differ in at least

$$
5-1=4
$$

positions.

Hence,

$$
\boxed{d_{\min}=4}.
$$

This code has parameters

$$
\boxed{[5,2,4]}.
$$

It can correct

$$
\left\lfloor\frac{4-1}{2}\right\rfloor
=
1
$$

error.

And it can detect up to

$$
4-1=3
$$

errors.

---

# 17. A concrete example

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

# 18. Why do we need finite fields?

The previous example used ordinary integers only to make the idea easy to see.

Real Reed–Solomon codes are normally constructed over a **finite field**.

We denote a finite field with \(q\) elements by

$$
\mathbb F_q.
$$

For example,

$$
\mathbb F_2=\{0,1\}.
$$

There are also larger finite fields such as

$$
\mathbb F_4,\quad
\mathbb F_8,\quad
\mathbb F_{16},\quad
\mathbb F_{256}.
$$

In a Reed–Solomon code, the coefficients and evaluation points belong to the finite field.

This is important because arithmetic must remain inside a finite set.

For example, in

$$
\mathbb F_7,
$$

we calculate modulo \(7\):

$$
5+4=9\equiv2\pmod7.
$$

Thus,

$$
5+4=2
$$

inside \(\mathbb F_7\).

---

# 19. Reed–Solomon parameters

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
* \(n\) = number of symbols transmitted;
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

# 21. A practical example

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

# 22. Why Reed–Solomon codes are powerful

We can now see the complete chain of ideas.

We started with:

> We want a large minimum distance.

Then:

> We want a systematic way to construct such codes.

Linear codes give us algebraic structure.

Then:

> Can we use some mathematical object that naturally produces many well-separated codewords?

Polynomials provide exactly that.

A message becomes the coefficients of a polynomial.

The polynomial is evaluated at several points.

Different polynomials cannot agree at too many points because:

$$
\boxed{
\text{a nonzero polynomial of degree }r
\text{ has at most }r\text{ roots}.
}
$$

Therefore, different messages produce codewords that differ in many positions.

That gives us a large minimum distance.

And that gives us error correction.

---

# 23. The complete conceptual chain

The entire development can now be summarized as

$$
\boxed{\text{Communication}}
$$

↓

$$
\boxed{\text{Errors can occur}}
$$

↓

$$
\boxed{\text{Add redundancy}}
$$

↓

$$
\boxed{\text{Code}}
$$

↓

$$
\boxed{\text{Want large minimum distance}}
$$

↓

$$
\boxed{\text{Introduce algebraic structure}}
$$

↓

$$
\boxed{\text{Linear codes}}
$$

↓

$$
\boxed{\text{Represent messages algebraically}}
$$

↓

$$
\boxed{\text{Polynomials}}
$$

↓

$$
\boxed{\text{Evaluate polynomials at many points}}
$$

↓

$$
\boxed{\text{Reed--Solomon codes}}
$$

And the key mathematical fact is:

$$
\boxed{
\deg(f-g)<k
\quad\Longrightarrow\quad
f-g\text{ has at most }k-1\text{ roots}.
}
$$

Therefore,

$$
\boxed{
d_{\min}=n-k+1.
}
$$

And consequently,

$$
\boxed{
t=
\left\lfloor
\frac{n-k}{2}
\right\rfloor
}
$$

symbol errors can be corrected.

---

# Exercises

## Exercise 1 — Linear or not?

Consider the following binary code:

$$
C=\{000,011,101,110\}.
$$

Check whether \(C\) is a linear code.

Try adding different pairs of codewords.

---

## Exercise 2 — Generator matrix

Consider

$$
G=
\begin{pmatrix}
1&0&1&1\\
0&1&1&0
\end{pmatrix}.
$$

1. List all codewords generated by \(G\).
2. How many codewords are there?
3. What are \(n\) and \(k\)?
4. Calculate the minimum distance.

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

## Exercise 4 — Polynomial representation

Consider the polynomial

$$
f(x)=2+3x+x^2.
$$

Evaluate it at

$$
x=0,1,2,3.
$$

Use ordinary arithmetic first.

Then think about what would change if the calculations were performed in a finite field.

---

## Exercise 5 — Reed–Solomon parameters

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

## Exercise 6 — The central idea

Suppose two different polynomials \(f(x)\) and \(g(x)\) both have degree at most \(4\).

Can they agree at five distinct points?

Explain why or why not.

### Hint

Consider

$$
h(x)=f(x)-g(x).
$$

What can you say about the degree and number of roots of \(h(x)\)?

---

# Final perspective

The most important thing to understand is not a formula.

It is the **idea behind the construction**.

We want different messages to become codewords that are far apart.

For linear codes, algebra gives us a compact and useful structure.

For Reed–Solomon codes, polynomials give us an elegant way to guarantee that different codewords are far apart.

The whole idea rests on one simple fact:

$$
\boxed{
\text{A low-degree polynomial cannot have too many roots.}
}
$$

That simple fact becomes a powerful tool for communication:

$$
\boxed{
\text{polynomial roots}
\rightarrow
\text{distance}
\rightarrow
\text{error correction}.
}
$$

And that is one of the beautiful ideas at the heart of coding theory.
