# Representation of Polynomials
The most natural way to represent polynomials is through **Coefficient Representation**:

## Coefficients Representation
The most natural way to represent them is through coefficients, where we map coefficients to lists. It helps to arrange our coefficients in the following order mainly because now the k-th index `C[k]` is mapped to coefficient of k-th degree term. We will refer to this representation as **Coefficient Representation** of polynomials.

### Example 1
$$
\begin{aligned}
&A(x) = 2 + 3x + 5x^2\rightarrow A = [2, 3, 5]\\
&B(x) = 2 + x^2 \rightarrow B = [2, 0, 1]\\
&C(x) = 4 + 6x + 10x^2 + 3x^3 + 5x^4 \rightarrow C = [4, 6, 10, 3, 5]
\end{aligned}
$$

### Generalization
$$
P(x) = p_0 + p_1x + p_2x^2 + \dots + p_dx^d \rightarrow P = [p_0, p_1,\dots,p_d]
$$

## Value Representation
Any polynomial of degree $d$ can be uniquely represented by $d+1$ points.
$$
\begin{aligned}
&P(x) = p_0 + p_1x + p_2x^2 + \dots + p_dx^d\\
&\{(x_0, P(x_0)),(x_1, P(x_1)),\dots, (x_d, P(x_d))\}
\end{aligned}
$$

### Example 2
Suppose $P(x) = 5$, so $p_0 =5$, then the $\{(3, 5)\}$ is a value representation of that.

### Example 3
Suppose $P(x) = 2x + 1$ be a polynomial, So $p_1 = 2, p_0 = 1$, then $\{(1,3), (2,5)\}$ is a value representation of the $P(x)$.

### Example 4
Suppose $P(x) = x^2$ be a polynomial, So $p_2 = 1, p_1 =0,p_0 = 0$, then $\{(1,1), (3, 9), (-3, 9)\}$ is a value representation of the $P(x)$.

### Example 5
Suppose $P(x) = x^3$ be a polynomial, So $P_3 = 1, p_2 = 0, p_1 =0,p_0 = 0$, then $\{(1,1), (2, 8), (-2, -8)\}$ is a value representation of the $P(x)$.
