## Multiplication of Two Polynomials
We are given two polynomials and want to find efficient algorithm for product two polynomial.

### Mathematically
Suppose $A(x) = 5x^2 + 3x + 2$ and $B(x) = x^2 + 2$. Mathematically we know one algorithm to multiply polynomials by repeatedly applying distributive property:

$$
\begin{aligned}
C(x) &= A(x).B(x)\\
     &= (5x^2 + 3x + 2).(x^2 + 2)\\
     &= 5x^2(x^2 + 2) + 3x(x^2 + 2) + 2(x^2 + 2)\\
     &= 5x^4 + 10x^2 + 3x^3 + 6x + 2x^2 + 4\\
     &= 5x^4 + 3x^3 + 10x^2 + 6x + 4
\end{aligned}
$$
In general given two degree $d$ polynomials
$$
\begin{aligned}
&A(x) = a_0 + a_1x + a_2x^2 + \dots + a_dx^d\\
&B(x) = b_0 + b_1x + b_2x^2 + \dots + b_dx^d
\end{aligned}
$$
The product
$$
C(x) = c_0 + c_1x + c_2x^2 + \dots + c_{2d}x^{2d}
$$
would have degree $2d$ and the running time of this algorithm (using distributive property) will be $O(d^2)$, since each term in polynomial $A$ have to be multiply by all terms of polynomial $B$.

### Can We Do Better?
If we use **Value Representation** of polynomial then, the multiplication of two polynomials is much easier.
#### Example
We want multiply two polynomials $A(x) = x^2 + 2x + 2$ and $B(x) = x^2 - 2x + 2$. We know the resulting polynomial $C(x) = A(x).B(x)$ will be degree 4. So, we will need 5 points to uniquely represent the product $C(x)$ based on Value Representation.

Now we take 5 points form each of the two polynomials and simply multiply the values one by one to get the value representation of the product of two polynomials.
$$
\begin{aligned}
&\text{Points of}\space A(x): [(-2, 2), (-1, 1), (0, 2), (1, 5), (2, 10)]\\
&\text{Points of}\space B(x): [(-2, 10), (-1, 5), (0, 2), (1, 1), (2, 2)]\\
&\text{Product Points} : [(-2, 20), (-1, 5), (0, 4), (1, 5), (2, 20)]\\
\end{aligned}
$$
**For better underestanding we should plot polynomials**
| $x$ | $A(x)$ | $B(x)$ | $A(x).B(x)$ |
|--- |--- | ---|--- |
| $-2$ | $2$  | $10$ | $2 \times 10 = 20$|
| $-1$ | $1$  | $5$  | $1 \times 5 = 5$  |
| $0$  | $2$  | $2$  | $2 \times 2 = 4$  |
| $1$  | $5$  | $1$  | $5 \times 1 = 5$  |
| $2$  | $10$ | $2$  | $10 \times 2 = 20$|

Now we have $\{(-2, 20), (-1, 5), (0, 4), (1, 5), (2, 20)\}$ and following the value representation rule, there is only one degree 4 polynomial that passes through these points. That polynomial happens to be the following in the coefficient representation and this is indeed the product of our original $A(x)$ and $B(x)$ polynomials with the multiplication operation being performed using the value representation. We have now reduced the time for multiplication from our original $d^2$ operations to the order of only degree $d$ operations.

**Multiplication in value representation is only $O(d)$!**
#### Generalization
We are given two polynomials in the coefficient representation of degree $d$ each.
$$
\begin{aligned}
&A(x) = a_0 + a_1x + a_2x^2 + \dots + a_dx^d\\
&B(x) = b_0 + b_1x + b_2x^2 + \dots + b_dx^d
\end{aligned}
$$
We know multiplication is faster using the value representation. So, what we will do is evaluate each of these polynomials at $2d +1$ points (because the degree of product $A(x).B(x
)$ is at most $2d$).

Then, multiply each of these points pairwise to get the value representation of the product polynomials and then finally somehow convert the value representation back to the final coefficient representation.

| $x$ | $A(x)$ | $B(x)$ | $A(x).B(x)$ |
|--- |--- | ---|---|
| $x_0$ | $A(x_0)$ | $B(x_0)$ | $A(x_0) \times B(x_0) = C(x_0)$|
| $x_1$ | $A(x_1)$ | $B(x_1)$ | $A(x_1) \times B(x_1) = C(x_1)$|
| $.$   | $.$      | $.$      | $.$                            |
| $.$   | $.$      | $.$      | $.$                            |
| $.$   | $.$      | $.$      | $.$                            |
| $x_d$ | $A(x_d)$ | $B(x_d)$ | $A(x_d) \times B(x_d) = C(x_d)$|

Where ${(x_0, A(x_0)), (x_1, A(x_1)), \cdots (x_d, A(x_d))}$ are value representation of $A(x)$,
and ${(x_0, B(x_0)), (x_1, B(x_1)), \cdots (x_d, B(x_d))}$ are value representation of $B(x)$,
and ${(x_0, C(x_0)), (x_1, C(x_1)), \cdots (x_d, C(x_d))}$ are value representation of $C(x)$ which is product of $A(x)$ and $B(x)$.

There are several pieces of the puzzle we haven't figured out. What we are missing is really some sort of magic box that could take polynomials in the coefficient representation and covert them to the value representation then vice versa.
$$
\begin{CD}
   \text{Coeff of}\space A(x),\space B(x) @>\text{How?}>> \text{Value of}\space A(x),\space B(x) \\
@. @VV\text{Multiply pairwise of}\space A(x), B(x) V \\
   \text{Coeff of}\space C(x) @<\text{How?}<< \text{Value of}\space C(x)
\end{CD}
$$