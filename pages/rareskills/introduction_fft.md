The Fast Fourier Transform (FFT) represents one of the most important algorithmic breakthroughs in computational mathematics, revolutionizing polynomial manipulation. This introduction explores the mathematical foundations that make FFT possible by examining several interconnected concepts that form its theoretical backbone.

At its core, the FFT provides an efficient algorithm for converting between coefficient representation and point-value representation of polynomials. The first key concept we examine is polynomial multiplication in point form, which reveals why the point-value approach can dramatically reduce the computational complexity from O(n²) to O(n) for multiplication operations. However, this efficiency depends critically on our choice of evaluation points.

This leads us to study Roots of Unity, multiplicative subgroups and primitive elements, which provide the algebraic structure necessary for optimal point selection. The cyclic nature of these subgroups connects directly with the fundamental theorem of cyclic groups, guaranteeing that any cyclic group can be decomposed in ways that the FFT algorithm exploits through its recursive structure.

Finally, we synthesize all these concepts in our examination of the FFT algorithm itself, which combines polynomial evaluation/interpolation at carefully chosen points, the algebraic structure of finite fields, and the computational efficiency gained through recursive decomposition. The remarkable efficiency of FFT stems precisely from how it leverages these interconnected mathematical structures - from group theory to polynomial algebra - to transform what appears to be an O(n²) problem into an O(n log n) solution.

## Table of Contents
Chapter 2 introduces multiplicative subgroups and primitive elements, explaining group structures and the differences between multiplicative and additive groups along with their generators. Chapter 3 presents the fundamental theorem of cyclic groups, which is central to identifying multiplicative subgroups of a given order. Chapters 4-5 define roots of unity and primitive roots of unity, examining their key properties.  Chapter 6 explores the connection between roots of unity and multiplicative subgroups of order n. Chapter 7 demonstrates how to halve the computational domain. Chapter 8 provides the prerequisites for Chapter 9, where we present polynomial multiplication in point-value form. Finally, Chapter 9 details the core FFT algorithm.

1. Introduction to FFT (this chapter)
2. [Multiplicative Subgroups and Primitive Elements]() covers the necessary definitions and core concepts required to fully grasp the algebraic structures such as multiplicative subgroups and primitive elements, explaining group structures and the differences between multiplicative and additive groups along with their generators.
3. [Fundamental Theorem of Cyclic Groups]() guarantees both the existence and uniqueness of the subgroup of given order n. Moreover, a subgroup of order n exists in $\mathbb{F}_q$ if and only if $n$ divides $q−1$.
4. [Roots of Unity]() In this chapter, we introduce the definition of a root of unity. A key property is that the set of a all *n*-th root of unity forms a subgroup of multiplicative group.
5. [Primitive Roots of unity]() In this chapter, we introduce the definition of the primitive root of unity. A key property is that the powers of a primitive *n*-th root of unity generate the entire subgroup of all *n*-th roots of unity.
6. [Exploring the Connection: Roots of Unity and Multiplicative Subgroups of Order n]() We prove that the subgroup of *n*-th roots of unity is equal to a multiplicative subgroup of order *n*. This means that computing the *n*-th roots of unity reduces to finding a multiplicative subgroup of order *n*.
7. [Squaring the Generator]() In this chapter, we explore the divide-and-conquer strategy that lies at the heart of the FFT’s remarkable O(n log n) complexity. A key optimization in this approach arises from squaring the generator (primitive element), which systematically reduces the problem size at each recursive step. By leveraging the algebraic properties of even powers, we demonstrate how evaluations can be mapped to smaller subproblems, effectively halving the computational workload in each iteration. Squaring the generator $\omega$ (i.e., $\omega^2$) yields a new generator, which skips every alternate element in the group. This halves the group size, reducing the domain of $n$-th roots of unity. Repeatedly squaring the generator continues halving the group size, eventually collapsing it to $\{1\}$.
8. [Multiplication of Polynomial in point form]() This chapter introduces different ways of representing polynomials: the coefficient form and the point form. We discuss conversion between these representations, specifically interpolation (point form → coefficient form) and evaluation (coefficient form → point form). Furthermore, multiplication of two polynomials - in both coefficient form and point form - is the main subject.
9. [FFT]() This chapter presents the Fast Fourier Transform (FFT) algorithm, utilizing roots of unity as evaluation points. We further demonstrate how squaring the generator enables a divide-and-conquer approach, effectively halving the computational domain of the FFT.


Every nth roots of unity belong to langle\omega\rangle.
$a$ is nth roots of unity. Then $a^n = 1$. We want to prove that $a$ belong to $\langle\omega\rangle$. Meaning there exist an $m$ such that $0\lem\le\omega^{n-1}$ implies $a=\omega^m$ for .


























# Removed part

Instead of a general polynomial, we wanted to instead just evaluate a simple polynomial $p(x) = x^2$ at 8 points. The question now is which points should we pick? Is there any set of points when knowing the value of one point **immediately** implies the value of another? In fact, there is. If we pick the point $x=1$, we immediately know the value of the point $x=-1$. Similarly:

$$
\begin{aligned}(1, 1) \space\space&\text{immediately know the value} \space\space (-1, 1)\\(2, 4) \space\space&\text{immediately know the value} \space\space (-2, 4)\\(3, 9) \space\space&\text{immediately know the value} \space\space (-3, 9)\\(4, 16) \space\space&\text{immediately know the value} \space\space (-4, 16)\end{aligned}
$$

Extending this idea, the key property we want here is that our eight points should be **positive** and **negative** pairs. The reason this works is due to the property of even functions, where a function evaluated at $-x$ is going to equal the function evaluated at $+x$. Meaning, $p(-x) = p(x)$.

What about $p(x) = x^3$? Does the same trick work? It actually kind of does but one caveat. Each $+x$ value will have the same value $-x$ value, but with sigh flipped. Therefore, $p(-x) = -p(x)$.

$$
\begin{aligned}(1, 1) \space\space&\text{immediately know the value} \space\space (-1, -1)\\(2, 8) \space\space&\text{immediately know the value} \space\space (-2, -8)\\(3, 27) \space\space&\text{immediately know the value} \space\space (-3, -27)\\(4, 64) \space\space&\text{immediately know the value} \space\space (-4, -64)\end{aligned}
$$

So, in these two cases of odd and even degree single term polynomials **instead of evaluating 8 individual points we can actually get away with evaluating exactly 4 positive points**, which we immediately know the value of the respective negative points.

We can split any polynomial $p(x)$ into even and odd terms with smaller polynomials $p_{\text{even}}(x^2)$ and $p_{\text{odd}}(x^2)$ with degree $\frac{n}{2}-1$. This is just another evaluation problem. But this time, we need to evaluate the polynomials at each of our original inputs squared. 

Evaluate $p_{\text{even}}(x^2)$ and $p_{\text{odd}}(x^2)$ each at $x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2$ ($\frac{n}{2}$ points). This works out nicely since our original points were positive and negative pairs. So, if we originally had $n$ points, we now only end up having $\frac{n}{2}$ points. This is starting to smell like the start of a recursive algorithm.

Once we recursively evaluate these smaller polynomials, we can then go through every point in our original set of $n$ points and calculate the respective values by utilizing the relationship between the positive and negative paired points.

$$
\begin{aligned}&P(x_i) = P_e(x_i^2) + x_iP_o(x_i^2)\\&P(-x_i) = P_e(x_i^2) - x_iP_o(x_i^2)\\&i = {1, 2, \dots, \frac{n}{2}}\end{aligned}
$$

This gives us the **value representation** of our original polynomial $p(x)$.

$$
\big(x_1, p(x_1)\big), \big(-x_1, p(-x_1)\big),\dots,\big(x_{\frac{n}{2}}, p(x_{\frac{n}{2}})\big),\big(-x_{\frac{n}{2}}, p(-x_{\frac{n}{2}})\big)
$$

So, we have **$\mathcal{O}(n \log n)$ Recursive Algorithm**. Since the two recursive sub problems have half the size of the original problem and take linear time to evaluate $n$ points. This would be a huge improvement from our earlier quadratic running time, but there is one **major problem**. The problem occurs at the recursive steps. The entire scheme relies on the fact that the polynomial will have positive and negative paired points for evaluation.