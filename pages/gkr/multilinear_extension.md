# Multilinear Extension
A multivariate polynomial $g$ is multilinear if the degree of the polynomial in each variable is at most one.

For example, the polynomial $g(x_1,x_2) = x_1x_2 + 4x_1 + 3x_2$ is multilinear, but the polynomial $h(x_1,x_2) = x^2_2 + 4x_1 + 3x_2$ is not.

## Fact
Any function $f : \{0,1\}^v\rightarrow \mathbb{F}$ has a unique multilinear extension (MLE) over $\mathbb{F}$, and we reserve the notation $\tilde{f}$ for this special extension of $f$ .

That is, $\tilde{f}$ is the unique multilinear polynomial over $\mathbb{F}$ satisfying $\tilde{f}(x) = f(x)$ for all $x\in\{0,1\}^v$.

## Lagrange interpolation of multilinear polynomials
Let $f : \{0,1\}^v\rightarrow\mathbb{F}$ be any function. Then the following multilinear polynomial $\tilde{f}$ extends $f$:
$$
\begin{aligned}
\begin{split}
\tilde{f} := \mathbb{F}^v\rightarrow\mathbb{F}
\end{split}
\end{aligned}
$$
$$
\begin{equation}
\begin{split}
\tilde{f}(x_1,\dots,x_v) = \sum_{\substack{w\in\{0,1\}^v}}f(w)·\chi_w(x_1,\dots,x_v)
\end{split}
\end{equation}
$$
where for any $w = (w_1,\dots,w_v)$,
$$
\begin{equation}
\begin{split}
\chi_w(x_1,\dots,x_v) := \prod_{i=1}^{v}\big(x_iw_i+(1-x_i)(1-w_i)\big)
\end{split}
\end{equation}
$$
The set $\{\chi_w : w\in\{0,1\}^v\}$ is referred to as the set of multilinear Lagrange basis polynomials with interpolating set $\{0,1\}^v$.

### Example
Let $f : \{0,1\}^2\rightarrow\mathbb{F}_5$ be a 2-variate polynomial with evaluation as below:
$$
\begin{aligned}
\begin{split}
&f(0,0) = 1\\
&f(0,1) = 2\\
&f(1,0) = 1\\
&f(1,1) = 4\\
\end{split}
\end{aligned}
$$
Let start with $\chi_w$,
$$
\begin{aligned}
\begin{split}
\chi_w(x_1,x_2) &= \prod_{i=1}^{2}\big(x_iw_i+(1-x_i)(1-w_i)\big)\\
&= \big(x_1w_1+(1-x_1)(1-w_1)\big) * \big(x_2w_2+(1-x_2)(1-w_2)\big)
\end{split}
\end{aligned}
$$
which $w\in\{(0,0), (0,1), (1,0), (1,1)\}$, then,
$$
\begin{aligned}
\begin{split}
\chi_{(0,0)}(x_1,x_2) &= \big(0+(1-x_1)(1)\big) * \big(0+(1-x_2)(1)\big)\\
&=(1-x_1)(1-x_2)\\
&\\
\chi_{(0,1)}(x_1,x_2) &= \big(0+(1-x_1)(1)\big) * \big(x_2+(1-x_2)(0)\big)\\
&=(1-x_1)(x_2)\\
&\\
\chi_{(1,0)}(x_1,x_2) &= \big(x_1+(1-x_1)(0)\big) * \big(0+(1-x_2)(1)\big)\\
&=(x_1)(1-x_2)\\
&\\
\chi_{(1,1)}(x_1,x_2) &= \big(x_1+(1-x_1)(0)\big) * \big(x_2+(1-x_2)(0)\big)\\
&=(x_1)(x_2)\\
\end{split}
\end{aligned}
$$
Now, recall from (1),
$$
\begin{aligned}
\begin{split}
\tilde{f}(x_1,x_2) &= \sum_{\substack{w\in\{0,1\}^2}}f(w)·\chi_w(x_1,x_2)\\
&=f(0,0)\chi_{(0,0)}(x_1,x_2) + f(0,1)\chi_{(0,1)}(x_1,x_2) + f(1,0)\chi_{(1,0)}(x_1,x_2) + f(1,1)\chi_{(1,1)}(x_1,x_2)\\
&= (1-x_1)(1-x_2) + 2(1-x_1)(x_2) + (x_1)(1-x_2) + 4x_1x_2\\
&=1 -x_1 - x_2 + x_1x_2 + 2x_2-2x_1x_2 + x_1 - x_1x_2 + 4x_1x_2\\
&= 2x_1x_2 + x_2 + 1
\end{split}
\end{aligned}
$$
### Example
Now consider the function $f : \{0,1\}^3\rightarrow\mathbb{F}_{11}$ given by 
$$
\begin{aligned}
\begin{split}
f(0,0,0) = 1,\\
f(0,1,0) = 2,\\
f(1,0,0) = 3,\\
f(1,1,0) = 4,\\
f(0,0,1) = 5,\\
f(0,1,1) = 6,\\
f(1,0,1) = 7,\\
f(1,1,1) = 8\\
\end{split}
\end{aligned}
$$
What is $\tilde{f}(2,4,6)$?

Let start with $\chi_w$,
$$
\begin{aligned}
\begin{split}
\chi_w(x_1,x_2,x_3) &= \prod_{i=1}^{3}\big(x_iw_i+(1-x_i)(1-w_i)\big)\\
&= \big(x_1w_1+(1-x_1)(1-w_1)\big) * \big(x_2w_2+(1-x_2)(1-w_2)\big) *\big(x_3w_3+(1-x_3)(1-w_3)\big)
\end{split}
\end{aligned}
$$
Then,
$$
\begin{aligned}
\begin{split}
\chi_{(0,0,0)}(x_1,x_2,x_3) &= (1-x_1)(1-x_2)(1-x_3),\\
&\\
\chi_{(0,1,0)}(x_1,x_2,x_3) &=(1-x_1)(x_2)(1-x_3),\\
&\\
\chi_{(1,0,0)}(x_1,x_2,x_3) &= (x_1)(1-x_2)(1-x_3),\\
&\\
\chi_{(1,1,0)}(x_1,x_2,x_3) &= (x_1)(x_2)(1-x_3),\\
&\\
\chi_{(0,0,1)}(x_1,x_2,x_3) &= (1-x_1)(1-x_2)(x_3),\\
&\\
\chi_{(0,1,1)}(x_1,x_2,x_3) &= (1-x_1)(x_2)(x_3),\\
&\\
\chi_{(1,0,1)}(x_1,x_2,x_3) &= (x_1)(1-x_2)(x_3),\\
&\\
\chi_{(1,1,1)}(x_1,x_2,x_3)&= (x_1)(x_2)(x_3)\\
\end{split}
\end{aligned}
$$
Now we calculate the $f(w)·\chi_w(x_1,x_2,x_3)$ for all $w\in\{0,1\}^3$
$$
\begin{aligned}
\begin{split}
f(0,0,0)\chi_{(0,0,0)}(x_1,x_2,x_3) &= (1-x_1)(1-x_2)(1-x_3),\\
&\\
f(0,1,0)\chi_{(0,1,0)}(x_1,x_2,x_3) &= 2(1-x_1)(x_2)(1-x_3),\\
&\\
f(1,0,0)\chi_{(1,0,0)}(x_1,x_2,x_3) &= 3(x_1)(1-x_2)(1-x_3),\\
&\\
f(1,1,0)\chi_{(1,1,0)}(x_1,x_2,x_3) &= 4(x_1)(x_2)(1-x_3),\\
&\\
f(0,0,1)\chi_{(0,0,1)}(x_1,x_2,x_3) &= 5(1-x_1)(1-x_2)(x_3),\\
&\\
f(0,1,1)\chi_{(0,1,1)}(x_1,x_2,x_3) &= 6(1-x_1)(x_2)(x_3),\\
&\\
f(1,0,1)\chi_{(1,0,1)}(x_1,x_2,x_3) &= 7(x_1)(1-x_2)(x_3),\\
&\\
f(1,1,1)\chi_{(1,1,1)}(x_1,x_2,x_3)&= 8(x_1)(x_2)(x_3)\\
\end{split}
\end{aligned}
$$
Now, recall from (1),
$$
\begin{aligned}
\begin{split}
\tilde{f}(x_1,x_2,x_3) &= \sum_{\substack{w\in\{0,1\}^3}}f(w)·\chi_w(x_1,x_2,x_3)\\
&= f(0,0,0)\chi_{(0,0,0)}(x_1,x_2,x_3) + f(0,1,0)\chi_{(0,1,0)}(x_1,x_2,x_3)\\
&\space\space\space\space\space + f(1,0,0)\chi_{(1,0,0)}(x_1,x_2,x_3) + f(1,1,0)\chi_{(1,1,0)}(x_1,x_2,x_3)\\
&\space\space\space\space\space + f(0,0,1)\chi_{(0,0,1)}(x_1,x_2,x_3)+f(0,1,1)\chi_{(0,1,1)}(x_1,x_2,x_3)\\
&\space\space\space\space\space + f(1,0,1)\chi_{(1,0,1)}(x_1,x_2,x_3)+f(1,1,1)\chi_{(1,1,1)}(x_1,x_2,x_3)\\
&= (1-x_1)(1-x_2)(1-x_3) + 2(1-x_1)(x_2)(1-x_3)\\
&\space\space\space\space\space + 3(x_1)(1-x_2)(1-x_3) + 4(x_1)(x_2)(1-x_3)\\
&\space\space\space\space\space + 5(1-x_1)(1-x_2)(x_3)+6(1-x_1)(x_2)(x_3)+7(x_1)(1-x_2)(x_3)+8(x_1)(x_2)(x_3)
\end{split}
\end{aligned}
$$
Then
$$
\begin{aligned}
\begin{split}
\tilde{f}(2,4,6) &= (-1)(-3)(-5) + 2(-1)(4)(-5) + 3(2)(-3)(-5) + 4(2)(4)(-5)\\
&\space\space\space\space\space+ 5(-1)(-3)(6) + 6(-1)(4)(6) + 7(2)(-3)(6) + 8(2)(4)(6)\\
&=(-15) + 40 + 90 + (-160) + 24 + 90 + (-144) + (-252) + 384\\
&= 57\\
&\equiv 2
\end{split}
\end{aligned}
$$