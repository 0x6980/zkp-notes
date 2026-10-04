# The Algebra Behind FRI Folding

In the previous chapter, we carefully constructed the kind of evaluation domain that FRI needs.

We started with a domain $D$ whose points can be naturally paired as $\{x,-x\}$.

We then considered the squaring map $x\mapsto x^2$.

Because $x^2=(-x)^2$, each pair of points is mapped to a single point in the squared domain: $D\longrightarrow D^2$.

The domain therefore gets smaller: $n\longrightarrow \frac n2$.

We have not yet explained **why this particular pairing is useful for FRI**.

That is the subject of this chapter.

The key observation is that the algebra of a polynomial has exactly the same structure.

When we evaluate a polynomial at $x$ and $-x$, its even powers behave the same way, while its odd powers change sign.

This allows us to split a polynomial into two parts:

$$
\boxed{
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
}
$$

This simple identity is the algebraic foundation of FRI folding.

---

# 8.1 The question we need to answer

Suppose we have a polynomial $f(X)$ and its evaluations on a domain $D$.

For every pair $\{x,-x\}\subseteq D$, we know two values: $f(x)$ and $f(-x)$.

After squaring, these two points become one point: $x^2=(-x)^2$.

So we would like to somehow turn $f(x),f(-x)$ into **one value associated with $x^2$**.

In other words, we are looking for a transformation of the form

$$
\boxed{
\bigl(f(x),f(-x)\bigr)
\longrightarrow
f_1(x^2)
}
$$

where $f_1$ is a new polynomial of smaller degree.

The natural question is:

> **Does the algebra of $f$ allow us to do this?**

Yes.

To see why, we first need to separate the even and odd powers of $f$.

---

# Splitting a polynomial into even and odd powers

Consider a polynomial

$$
f(X)
=
a_0+a_1X+a_2X^2+a_3X^3+\cdots+a_mX^m.
$$

Separate its even powers from its odd powers:

$$
f(X)
=
(a_0+a_2X^2+a_4X^4+\cdots)
+
(a_1X+a_3X^3+a_5X^5+\cdots).
$$

The first group contains only even powers.

The second group contains only odd powers.

We can therefore write

$$
f(X)=f_{\mathrm{even}}(X)+f_{\mathrm{odd}}(X).
$$

But we can say something more useful.

Every even power of $X$ is a power of $X^2$:

$$
X^2=(X^2)^1,
$$

$$
X^4=(X^2)^2,
$$

$$
X^6=(X^2)^3.
$$

Similarly, every odd power is $X$ multiplied by a power of $X^2$:

$$
X=X(X^2)^0,
$$

$$
X^3=X(X^2)^1,
$$

$$
X^5=X(X^2)^2.
$$

Therefore, there exist polynomials $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$ such that

$$
\boxed{
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
}
$$

This is not an approximation.

It is an exact decomposition of every polynomial.

---

# A simple example

Consider

$$
f(X)=3+5X+2X^2+7X^3+4X^4.
$$

Separate the even and odd powers:

$$
f(X)
=
(3+2X^2+4X^4)
+
(5X+7X^3).
$$

Factor $X$ out of the odd part:

$$
f(X)
=
(3+2X^2+4X^4)
+
X(5+7X^2).
$$

Now introduce a new variable

$$
Y=X^2.
$$

Then

$$
3+2X^2+4X^4
=
3+2Y+4Y^2,
$$

and

$$
5+7X^2
=
5+7Y.
$$

Therefore,

$$
\boxed{
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2)
}
$$

where

$$
\boxed{
f_{\mathrm{even}}(Y)=3+2Y+4Y^2
}
$$

and

$$
\boxed{
f_{\mathrm{odd}}(Y)=5+7Y.
}
$$

The original polynomial has degree \(4\).

The two new polynomials have degrees

$$
\deg f_{\mathrm{even}}=2
$$

and

$$
\deg f_{\mathrm{odd}}=1.
$$

This is the first sign that something useful is happening:

> Splitting a polynomial according to parity turns a degree-$d$ polynomial into two polynomials of roughly half the degree.

But we still have two polynomials.

FRI needs to turn them into one.

---

# What happens at $x$ and $-x$?

Now take

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

Evaluate it at $x$:

$$
f(x)
=
f_{\mathrm{even}}(x^2)+xf_{\mathrm{odd}}(x^2).
$$

Now evaluate it at $-x$:

$$
f(-x)
=
f_{\mathrm{even}}((-x)^2)+(-x)f_{\mathrm{odd}}((-x)^2).
$$

Since

$$
(-x)^2=x^2,
$$

this becomes

$$
f(-x)
=
f_{\mathrm{even}}(x^2)-xf_{\mathrm{odd}}(x^2).
$$

So we have the two equations

$$
\boxed{
f(x)=f_{\mathrm{even}}(x^2)+xf_{\mathrm{odd}}(x^2)
}
$$

and

$$
\boxed{
f(-x)=f_{\mathrm{even}}(x^2)-xf_{\mathrm{odd}}(x^2).
}
$$

Now notice what happened.

The even part, $f_{\mathrm{even}}(x^2)$, is the same in both equations.

The odd part, $xf_{\mathrm{odd}}(x^2)$, has opposite signs.

This is precisely why the pair $\{x,-x\}$ is useful.

---

# Recovering the even part

Add the two equations:

$$
f(x)+f(-x)
=
2f_{\mathrm{even}}(x^2).
$$

Therefore,

$$
\boxed{
f_{\mathrm{even}}(x^2)
=
\frac{f(x)+f(-x)}{2}.
}
$$

So if we know the two evaluations $f(x)$ and $f(-x)$, we can recover the even component at $x^2$.

---

# Recovering the odd part

Now subtract the equations:

$$
f(x)-f(-x)
=
2xf_{\mathrm{odd}}(x^2).
$$

Therefore,

$$
\boxed{
f_{\mathrm{odd}}(x^2)
=
\frac{f(x)-f(-x)}{2x}.
}
$$

So the two evaluations allow us to recover **both** components at the squared point.

We have transformed $f(x),f(-x)$ into $f_{\mathrm{even}}(x^2),f_{\mathrm{odd}}(x^2)$.

At this point, the connection between the domain structure and polynomial structure should be clear.

The domain gives us

$$
x\leftrightarrow -x,
$$

while the polynomial decomposition gives us

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

The two structures fit together exactly.

---

# Folded Polynomial

We now have two smaller-degree polynomials:

$$
f_{\mathrm{even}}
\qquad\text{and}\qquad
f_{\mathrm{odd}}.
$$

We want to compress the information from both components into a single polynomial.

This is where a random field element enters.

Choose

$$
\alpha\in\mathbb F_q
$$

and define

$$
\boxed{
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y).
}
$$

This is the **folded polynomial**.

It combines the two approximately half-degree polynomials into one.

---

# The folding formula

Evaluate $f_1$ at $Y=x^2$. We get

$$
f_1(x^2)
=
f_{\mathrm{even}}(x^2)+\alpha f_{\mathrm{odd}}(x^2).
$$

Using the formulas we derived above,

$$
f_{\mathrm{even}}(x^2)
=
\frac{f(x)+f(-x)}2
$$

and

$$
f_{\mathrm{odd}}(x^2)
=
\frac{f(x)-f(-x)}{2x}.
$$

Therefore,

$$
\boxed{
f_1(x^2)
=
\frac{f(x)+f(-x)}2
+
\alpha
\frac{f(x)-f(-x)}{2x}.
}
$$

This is the fundamental FRI folding equation.

It converts the two evaluations $f(x), f(-x)$ into one evaluation $f_1(x^2)$.

TODO: remove the rest of this section or add a new version with better intuition

Schematically,

$$
\boxed{
\{x,-x\}
\quad\longrightarrow\quad
\{x^2\}
}
$$

and simultaneously

$$
\boxed{
\{f(x),f(-x)\}
\quad\longrightarrow\quad
\{f_1(x^2)\}.
}
$$

---

# Why is the new polynomial lower degree?

Suppose

$$
\deg f<d.
$$

The decomposition

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2)
$$

separates the even and odd powers.

The degrees of $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$ are roughly half that of $f$.

More precisely, if $d$ is even and

$$
\deg f<d,
$$

then

$$
\deg f_{\mathrm{even}}\leq \frac d2-1
$$

and

$$
\deg f_{\mathrm{odd}}\leq \frac d2-1.
$$

Since

$$
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y),
$$

we have

$$
\deg f_1
\leq
\max(\deg f_{\mathrm{even}},\deg f_{\mathrm{odd}})
<
\frac d2.
$$

Therefore,

$$
\boxed{
\deg f_1<\frac d2.
}
$$

So one fold approximately halves the degree bound.

At the same time as we discoverd it in the previous chapter, the domain size is halved:

$$
|D'|=\frac{|D|}{2}.
$$

Thus one fold simultaneously reduces:

$$
\boxed{
\text{degree}
\quad\text{and}\quad
\text{domain size}.
}
$$

This simultaneous reduction is one of the central ideas behind FRI.

---

# A complete numerical example

We use the field $\mathbb F_{17}$. Consider

$$
f(X)=3+5X+2X^2+X^3.
$$

We first split the even and odd powers:

$$
f(X)
=
(3+2X^2)+X(5+X^2).
$$

Therefore,

$$
\boxed{
f_{\mathrm{even}}(Y)=3+2Y
}
$$

and

$$
\boxed{
f_{\mathrm{odd}}(Y)=5+Y.
}
$$

Now choose the random element

$$
\alpha=4.
$$

The folded polynomial is

$$
f_1(Y)
=
f_{\mathrm{even}}(Y)+4f_{\mathrm{odd}}(Y).
$$

Thus

$$
f_1(Y)
=
(3+2Y)+4(5+Y).
$$

Expanding:

$$
f_1(Y)
=
3+2Y+20+4Y.
$$

Since we are working modulo \(17\),

$$
20\equiv3,
$$

so

$$
\boxed{
f_1(Y)=6+6Y.
}
$$

The original polynomial had degree \(3\).

The folded polynomial has degree \(1\).

---

TODO: the following section not added any value!

# Verify the fold using evaluations

Now let's obtain the same result without using the coefficients of $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$.

Take

$$
x=1.
$$

We have

$$
f(1)
=
3+5+2+1
=
11.
$$

And

$$
f(-1)
=
3-5+2-1
=
-1
\equiv16\pmod{17}.
$$

So the pair of evaluations is

$$
\boxed{
(f(1),f(-1))=(11,16).
}
$$

The corresponding squared point is

$$
1^2=1.
$$

The folding formula gives

$$
f_1(1)
=
\frac{11+16}{2}
+
4\frac{11-16}{2}.
$$

Let's calculate the first term.

$$
11+16=27\equiv10\pmod{17}.
$$

Therefore,

$$
\frac{11+16}{2}
=
10\cdot9
=
90
\equiv5.
$$

For the second term,

$$
11-16=-5\equiv12.
$$

Thus,

$$
\frac{11-16}{2}
=
12\cdot9
=
108
\equiv6.
$$

Multiplying by $\alpha=4$,

$$
4\cdot6=24\equiv7.
$$

Therefore,

$$
f_1(1)=5+7=12.
$$

Now evaluate our folded polynomial directly:

$$
f_1(Y)=6+6Y.
$$

At $Y=1$,

$$
f_1(1)=6+6=12.
$$

Both methods give exactly the same result.

This is the important point:

> We can compute an evaluation of the folded polynomial directly from a pair of evaluations of the original polynomial.

We do not need to reconstruct the polynomial first.

---

# Folding an entire evaluation domain

Suppose the original domain is

$$
D=
\{x_0,-x_0,x_1,-x_1,\ldots,x_{m-1},-x_{m-1}\}.
$$

The evaluation vector is

$$
\begin{aligned}
(&f(x_0),f(-x_0),\\
 &f(x_1),f(-x_1),\\
 &\ldots,\\
 &f(x_{m-1}),f(-x_{m-1})).
\end{aligned}
$$

For every pair, we compute

$$
f_1(x_i^2)
=
\frac{f(x_i)+f(-x_i)}2
+
\alpha
\frac{f(x_i)-f(-x_i)}{2x_i}.
$$

Therefore, the new evaluation vector is

$$
\boxed{
\left(
f_1(x_0^2),
f_1(x_1^2),
\ldots,
f_1(x_{m-1}^2)
\right).
}
$$

The original vector had $2m$ values. The new vector has $m$ values. So:

$$
\boxed{
2m\longrightarrow m.
}
$$

This is the evaluation-vector version of the fold.

---

# 8.13 The fold as a transformation of two representations

It is useful to keep two perspectives in mind.

### Polynomial perspective

We have

$$
f(X)
=
f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2)
$$

and define

$$
f_1(Y)
=
f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y).
$$

So:

$$
\boxed{
f\longrightarrow f_1.
}
$$

### Evaluation perspective

For every pair \(x,-x\),

$$
\boxed{
(f(x),f(-x))
\longrightarrow
f_1(x^2).
}
$$

These are not two different operations.

They are two descriptions of the same operation.

The polynomial perspective explains **why the new object is still low degree**.

The evaluation perspective explains **how the new evaluations can be computed directly**.

Both are essential for understanding FRI.

---

# What role does the random $\alpha$ play?

We have defined

$$
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y).
$$

Why choose \(\alpha\) randomly?

The immediate algebraic purpose is to combine the two components into a single polynomial.

But there is a deeper reason.

FRI is not merely trying to transform a polynomial that we already know is low degree.

The actual problem is that a prover may provide an arbitrary function

$$
g:D\to\mathbb F_q
$$

and claim that it is close to a low-degree polynomial.

The verifier needs evidence that this claim is true.

If we always selected one fixed component, such as $f_{\mathrm{even}}$, the transformation could systematically discard the other component.

The random linear combination

$$
f_{\mathrm{even}}+\alpha f_{\mathrm{odd}}
$$

mixes the two components.

For a genuinely low-degree polynomial, the result is still low degree.

For a function that is not close to low degree, the randomness becomes important in the soundness argument: it makes it difficult for a cheating prover to arrange that the folding process consistently produces functions that look low degree.

We will study the precise probabilistic argument later.

For now, the important distinction is:

$$
\boxed{
\text{The random }\alpha\text{ is part of the soundness mechanism.}
}
$$

---

# 8.16 One fold is not enough

After one fold, we have $f_{\mathrm{odd}}$ on a smaller domain $D_1$. But we can perform exactly the same operation again. Pair the points of $D_1$:

$$
x\leftrightarrow -x.
$$

Then square them:

$$
D_1\to D_2.
$$

Decompose

$$
f_{\mathrm{odd}}(X)
=
f_{1,0}(X^2)
+
Xf_{1,1}(X^2).
$$

Choose another random field element

$$
\alpha_1
$$

and define

$$
f_2(Y)
=
f_{1,0}(Y)
+
\alpha_1 f_{1,1}(Y).
$$

Then repeat.

Thus we get a sequence

$$
\boxed{
f_{\mathrm{even}}
\longrightarrow
f_{\mathrm{odd}}
\longrightarrow
f_2
\longrightarrow
f_3
\longrightarrow\cdots
}
$$

with corresponding domains

$$
\boxed{
D_0
\longrightarrow
D_1
\longrightarrow
D_2
\longrightarrow
D_3
\longrightarrow\cdots
}
$$

where

$$
D_{i+1}=D_i^2.
$$

---

# 8.17 The domain and degree shrink together

Suppose initially

$$
|D_0|=n
$$

and

$$
\deg f_{\mathrm{even}}<d.
$$

After one fold, roughly,

$$
|D_1|=\frac n2
$$

and

$$
\deg f_{\mathrm{odd}}<\frac d2.
$$

After another fold,

$$
|D_2|=\frac n4
$$

and

$$
\deg f_2<\frac d4.
$$

Continuing:

$$
\begin{array}{c|c|c}
\text{Round} & \text{Domain size} & \text{Degree bound}\\
\hline
0 & n & d\\
1 & n/2 & d/2\\
2 & n/4 & d/4\\
3 & n/8 & d/8\\
4 & n/16 & d/16\\
\vdots & \vdots & \vdots
\end{array}
$$

The exact degree bounds depend on whether the initial degree bound is even or odd, but the important phenomenon is the same:

$$
\boxed{
\text{domain size decreases exponentially}
}
$$

and

$$
\boxed{
\text{degree bound decreases at roughly the same rate}.
}
$$

This is the central algebraic compression performed by FRI.

---

# 8.18 Why does a low-degree polynomial survive the folding process?

Suppose the prover really starts with a polynomial

$$
f_{\mathrm{even}}
$$

satisfying

$$
\deg f_{\mathrm{even}}<d.
$$

We decompose it:

$$
f_{\mathrm{even}}(X)
=
f_{0,0}(X^2)
+
Xf_{0,1}(X^2).
$$

Both components have approximately half the degree.

Then

$$
f_{\mathrm{odd}}(Y)
=
f_{0,0}(Y)
+
\alpha_0f_{0,1}(Y)
$$

also has approximately half the degree.

Therefore,

$$
f_{\mathrm{odd}}
$$

satisfies the next smaller degree bound.

We can repeat the argument.

Thus:

$$
\boxed{
f_{\mathrm{even}}\text{ is low degree}
\Longrightarrow
f_{\mathrm{odd}}\text{ is low degree}
\Longrightarrow
f_2\text{ is low degree}
\Longrightarrow\cdots
}
$$

This is why folding is useful as a low-degree testing mechanism.

A genuine low-degree polynomial remains within the expected degree bounds as we repeatedly fold it.

---

# What about an arbitrary function?

Now suppose instead that we start with an arbitrary function

$$
g:D\to\mathbb F_q.
$$

There is an important subtlety.

The folding formula can still be applied to its values.

For every pair

$$
(x,-x),
$$

we can calculate

$$
\frac{g(x)+g(-x)}2
+
\alpha
\frac{g(x)-g(-x)}{2x}.
$$

So we can always produce a new vector.

But this does **not** automatically mean that the new vector is the evaluation vector of a low-degree polynomial.

This distinction is fundamental.

$$
\boxed{
\text{Folding can be applied to any suitable evaluation vector.}
}
$$

But:

$$
\boxed{
\text{Folding does not by itself prove low-degree proximity.}
}
$$

The FRI protocol needs additional machinery to test whether the successive folded objects are consistent with low-degree polynomials.

That is where the verifier's random challenges, queries, and commitments enter.

---

# The role of the evaluation domain

We can now finally see why previous chapter spent so much time constructing the special domains.

The algebra requires pairs $x,-x$. The domain provides exactly those pairs. The polynomial decomposition is

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

The domain transformation is

$$
x\mapsto x^2.
$$

The two structures therefore fit together:

$$
\boxed{
x\leftrightarrow -x
}
$$

corresponds to

$$
\boxed{
f(x),f(-x)
}
$$

and both are transformed through

$$
\boxed{
x^2.
}
$$

This gives the complete algebraic correspondence:

$$
\boxed{
\begin{array}{ccc}
\text{Domain} && \text{Polynomial}\\[4pt]
\{x,-x\} &\longrightarrow& f(x),f(-x)\\[4pt]
\downarrow && \downarrow\\[4pt]
\{x^2\} &\longrightarrow& f_1(x^2)
\end{array}
}
$$

That is the core idea behind FRI folding.

---

# 8.21 A complete folding round

Let's put everything together.

Suppose we start with

$$
f(X)
$$

on a domain \(D\).

### Step 1: Pair the domain

For every \(x\in D\), identify its partner

$$
-x.
$$

So we have pairs

$$
\{x,-x\}.
$$

### Step 2: Decompose the polynomial

Write

$$
\boxed{
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
}
$$

### Step 3: Evaluate the pair

For each $x$,

$$
f(x)=f_{\mathrm{even}}(x^2)+xf_{\mathrm{odd}}(x^2)
$$

and

$$
f(-x)=f_{\mathrm{even}}(x^2)-xf_{\mathrm{odd}}(x^2).
$$

### Step 4: Recover the components

Compute

$$
\boxed{
f_{\mathrm{even}}(x^2)=
\frac{f(x)+f(-x)}2
}
$$

and

$$
\boxed{
f_{\mathrm{odd}}(x^2)=
\frac{f(x)-f(-x)}{2x}.
}
$$

### Step 5: Choose a random coefficient

Choose

$$
\alpha\in\mathbb F_q.
$$

### Step 6: Combine the components

Define

$$
\boxed{
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y).
}
$$

### Step 7: Compute the new evaluation

For each pair,

$$
\boxed{
f_1(x^2)
=
\frac{f(x)+f(-x)}2
+
\alpha
\frac{f(x)-f(-x)}{2x}.
}
$$

### Step 8: Move to the squared domain

The new evaluations live on

$$
\boxed{
D^2.
}
$$

Thus one round is

$$
\boxed{
(f,D)
\longrightarrow
(f_1,D^2).
}
$$

And approximately,

$$
\boxed{
\deg f_1
\approx
\frac{\deg f}{2}
}
$$

while

$$
\boxed{
|D^2|
=
\frac{|D|}{2}.
}
$$

---

# 8.23 One subtle point about cosets

In Chapter 7, we also saw that the initial domain may be a coset

$$
D_0=aH
$$

of a multiplicative subgroup \(H\).

When we square the domain,

$$
D_0^2
=
\{x^2:x\in D_0\}.
$$

If

$$
D_0=aH,
$$

then

$$
D_0^2=a^2H^2.
$$

So the next domain is again a coset of a subgroup:

$$
\boxed{
D_1=a^2H^2.
}
$$

After another squaring,

$$
D_2=a^4H^4.
$$

More generally,

$$
\boxed{
D_i=a^{2^i}H^{2^i}.
}
$$

The exact notation can vary between FRI implementations, but the important structural fact is simple:

> **Squaring preserves the structured nature of the domain while reducing its size.**

This is what allows the folding process to continue from one round to the next.

---

# 8.24 What have we actually achieved?

It is worth stepping back.

Our original problem was:

> Given a huge evaluation vector, how can we reason about whether it comes from a low-degree polynomial?

We now have an algebraic transformation that turns

$$
f
$$

into

$$
f_1
$$

where

$$
\deg f_1
$$

is roughly half the original degree.

At the same time,

$$
D
$$

becomes

$$
D^2
$$

and the number of evaluations is halved.

So one round performs:

$$
\boxed{
\text{large domain + larger degree bound}
\quad\longrightarrow\quad
\text{smaller domain + smaller degree bound}.
}
$$

And we can repeat this transformation.

This is exactly the kind of recursive reduction we were looking for.

But there is still a major problem.

We have described how **the prover could perform the folding**.

We have not yet described how a **verifier** can be convinced that the prover performed the folding honestly.

The verifier cannot simply ask for the entire evaluation vector at every round.

That would defeat the purpose of FRI.

The next question is therefore:

> **How can a verifier check the consistency of these successive folds by inspecting only a small number of values?**

Answering that question takes us from the algebra of folding to the actual **FRI protocol**.

---

# Exercises

### Exercise 1 — Even/odd decomposition

Write

$$
f(X)=7+3X+5X^2+2X^3+X^4
$$

in the form

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

Find $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$.

---

### Exercise 2 — Recovering the two components

Suppose

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

Starting from

$$
f(x)
$$

and

$$
f(-x),
$$

derive

$$
f_{\mathrm{even}}(x^2)
=
\frac{f(x)+f(-x)}2
$$

and

$$
f_{\mathrm{odd}}(x^2)
=
\frac{f(x)-f(-x)}{2x}.
$$

---

### Exercise 3 — Degree reduction

Suppose

$$
\deg f<16.
$$

What are the largest possible degrees of $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$?

What is the largest possible degree of

$$
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y)?
$$

---

### Exercise 4 — One complete fold

Let

$$
f(X)=1+2X+3X^2+4X^3.
$$

Find $f_{\mathrm{even}}$ and $f_{\mathrm{odd}}$.

Then choose

$$
\alpha=5
$$

and calculate the folded polynomial

$$
f_1(Y)=f_{\mathrm{even}}(Y)+5f_{\mathrm{odd}}(Y).
$$

---

### Exercise 5 — Verify the folding formula

Using the polynomial from Exercise 4, choose a nonzero $x$ and verify that

$$
f_1(x^2)
=
\frac{f(x)+f(-x)}2
+
5\frac{f(x)-f(-x)}{2x}.
$$

---

### Exercise 6 — Evaluation-vector folding

Suppose the evaluations of $f$ are

$$
\begin{array}{c|cccccccc}
x
&
x_0&-x_0&x_1&-x_1&x_2&-x_2&x_3&-x_3
\\
\hline
f(x)
&
a&b&c&d&e&f&g&h
\end{array}
$$

and the folding parameter is \(\alpha\).

Write the complete folded evaluation vector.

---

### Exercise 7 — Domain sizes

Suppose

$$
|D_0|=4096.
$$

What are the domain sizes after

* one fold?
* two folds?
* five folds?
* ten folds?

---

### Exercise 8 — Why do we need the pair \(x,-x\)?

Suppose you know only

$$
f(x)
$$

but not

$$
f(-x).
$$

Can you recover both

$$
f_{\mathrm{even}}(x^2)
$$

and

$$
f_{\mathrm{odd}}(x^2)?
$$

Explain why the pair \(x,-x\) is important.

---

### Exercise 9 — Why not discard $f_{\mathrm{odd}}$?

We have

$$
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
$$

Why would defining the next polynomial simply as

$$
f_1(Y)=f_{\mathrm{even}}(Y)
$$

lose information?

What does

$$
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y)
$$

do differently?

---

### Exercise 10 — Conceptual question

Explain the relationship between these three transformations:

$$
\{x,-x\}\longrightarrow\{x^2\},
$$

$$
(f(x),f(-x))\longrightarrow f_1(x^2),
$$

and

$$
\deg f\longrightarrow\text{roughly }\frac{\deg f}{2}.
$$

Why are these three reductions connected?

---

# Summary

The central algebraic fact of this chapter is that every polynomial can be decomposed as

$$
\boxed{
f(X)=f_{\mathrm{even}}(X^2)+Xf_{\mathrm{odd}}(X^2).
}
$$

Evaluating at $x$ and $-x$ gives

$$
f(x)=f_{\mathrm{even}}(x^2)+xf_{\mathrm{odd}}(x^2)
$$

and

$$
f(-x)=f_{\mathrm{even}}(x^2)-xf_{\mathrm{odd}}(x^2).
$$

Therefore,

$$
\boxed{
f_{\mathrm{even}}(x^2)
=
\frac{f(x)+f(-x)}2
}
$$

and

$$
\boxed{
f_{\mathrm{odd}}(x^2)
=
\frac{f(x)-f(-x)}{2x}.
}
$$

We then choose a random

$$
\alpha\in\mathbb F_q
$$

and combine the two components:

$$
\boxed{
f_1(Y)=f_{\mathrm{even}}(Y)+\alpha f_{\mathrm{odd}}(Y).
}
$$

Consequently,

$$
\boxed{
f_1(x^2)
=
\frac{f(x)+f(-x)}2
+
\alpha\frac{f(x)-f(-x)}{2x}.
}
$$

Thus one pair of evaluations,

$$
\boxed{
f(x),f(-x),
}
$$

becomes one evaluation,

$$
\boxed{
f_1(x^2).
}
$$

At the same time,

$$
\boxed{
|D|\longrightarrow\frac{|D|}{2}
}
$$

and the degree bound is reduced by roughly a factor of two.

Repeating this process gives

$$
\boxed{
(f_{\mathrm{even}},D_0)
\to
(f_{\mathrm{odd}},D_1)
\to
(f_2,D_2)
\to\cdots
}
$$

with progressively smaller domains and degree bounds.

We now understand the **algebraic engine** of FRI.

The remaining question is no longer how to fold.

It is:

> **How can a verifier efficiently check that all these folds are consistent with a low-degree polynomial, without reading the entire evaluation vector?**

That is the question answered by the FRI protocol.
