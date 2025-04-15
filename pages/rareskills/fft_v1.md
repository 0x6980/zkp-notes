# FFT multiplication of polynomials

# Fast Fourier Transform
Taking polynomials form the coefficient representation to the value representation which we will call **evaluation**.

We have a degree $d$ polynomial
$$
P(x) = p_0 + p_1x + p_2x^2 + \dots + p_dx^d
$$
and we want to evaluate the polynomial at $n$ points, where $n \ge d + 1$. The most straightforward way to do this is pick $n$ random $x$ coordinates like $1, 2, \cdots, n$ and simply calculate the respective $y$ coordinate.
$$
\begin{aligned}
(1,P(1))&&& (1,p_0 + p_1.1 + p_2.1^2 + \dots + p_d.1^d)\\
(2, P(2))&&& (2,p_0 + p_1.2 + p_2.2^2 + \dots + p_d.2^d)\\
\vdots& \xRightarrow{\text{deconstruct}}&\vdots&&\\
(n, P(n))&&& (2,p_0 + p_1.n + p_2.n^2 + \dots + p_d.n^d)
\end{aligned}
$$
After deconstruct, each evaluation will take $O(d)$ operations. making this method run in $O(nd)$ operations which implies $O(d^2)$ operations to evaluate all $n$ points. So, back we where started. Can we find a way to optimize this?

## Can We Do Better?
Instead of a general polynomial we wanted to instead just evaluate a simple polynomial $P(x) = x^2$ at 8 points. The question now is which points should we pick? Is there any set of points when knowing value of one point **immediately** implies the value of another? In fact, there is. If we pick the point $x=1$, we immediately know the value of the point $x=-1$. Similarly:

$$
\begin{aligned}
(1, 1) \space\space&\text{immediately know the value} \space\space (-1, 1)\\
(2, 4) \space\space&\text{immediately know the value} \space\space (-2, 4)\\
(3, 9) \space\space&\text{immediately know the value} \space\space (-3, 9)\\
(4, 16) \space\space&\text{immediately know the value} \space\space (-4, 16)
\end{aligned}
$$
Extending this idea the key property we want here is that our eight points should be **positive** and **negative** pairs. The reason this works is due to property of even functions where a function evaluated at $-x$ is going to equal the function evaluated at $+x$. $P(-x) = P(x)$.

What about $P(x) = x^3$? Dose the same trick work?
It actually kind of does but one caveat. Each $+x$ value will have the same value as $-x$ value but with sign flipped. $P(-x) = -P(x)$.
    
$$
\begin{aligned}
(1, 1) \space\space&\text{immediately know the value} \space\space (-1, -1)\\
(2, 8) \space\space&\text{immediately know the value} \space\space (-2, -8)\\
(3, 27) \space\space&\text{immediately know the value} \space\space (-3, -27)\\
(4, 64) \space\space&\text{immediately know the value} \space\space (-4, -64)
\end{aligned}
$$
So, in these two cases of odd and even degree single term polynomials **instead of evaluating 8 individual points we can actually get away with evaluating exactly 4 positive points**, which we immediately know the value of the respective negative points.

## Extend above Idea
We can extend the above idea to more general polynomial. 
### Split the Polynomial Into Even and Odd Terms
#### Example 1
Split the $P(x) = 3 + 4x + 5x^2 + 6x^3 + 7x^4 + 8x^5 + 9x^6 + 10x^7$ as below: 
$$
\begin{aligned}
P(x) &= (3 + 5x^2 + 7x^4 + 9x^6) + (4x + 6x^3 + 8x^5 + 10x^7)\\
     &= (3 + 5x^2 + 7x^4 + 9x^6) + x(4 + 6x^2 + 8x^4 + 10x^6)\space\space(\text{factor an $x$ in odd power part})\\
     &= (3 + 5x^2 + 7(x^2)^2 + 9(x^2)^3) + x(4 + 6x^2 + 8(x^2)^2 + 10(x^2)^3)\\
     &= (3 + 5y + 7y^2 + 9y^3) + x(4 + 6y + 8y^2 + 10y^3)\space\space(\text{$y=x^2$, meaning every where change $x^2$ to $y$})\\
     &= P_{\mathrm{even}}(x^2) + xP_{\mathrm{odd}}(x^2)
\end{aligned}
$$

#### Example 2
Split the polynomial $P(y) = 3 + 5y + 7y^2 + 9y^3$ into Even and Odd Parts
$$
\begin{aligned}
P(y) &= 3 + 5y + 7y^2 + 9y^3,\\
     &= (3 + 7y^2) + (5y + 9y^3)\\
     &= (3 + 7y^2) + y(5 + 9y^2)\space\space(\text{factor an $y$ in odd power part})\\
     &= (3 + 7z) + y(5 + 9z)\space\space(\text{$y^2=z$, meaning every where change $y^2$ to $z$})\\
&= P_{\mathrm{even}}(y^2) + yP_{\mathrm{odd}}(y^2)\\
&= P_{\mathrm{even}}(z) + yP_{\mathrm{odd}}(z)
\end{aligned}
$$

So, for even and odd part of the polynomial we have:
$$
\begin{aligned}
&P_{\mathrm{even}}(y^2) = P_{\mathrm{even}}(z) = 3 + 7z\\
&P_{\mathrm{odd}}(y^2) = P_{\mathrm{odd}}(z) = 5 + 9z 
\end{aligned}
$$

#### Example 3
Consider $P(z) = 3 +7z$.
$$
\begin{aligned}
P(z) &= 3 + 7z\\
     &= P_{\mathrm{even}} + z. P_{\mathrm{odd}}\\
\end{aligned}
$$
Then $P_{\mathrm{even}} = 3$ and $P_{\mathrm{odd}} = 7$.

### Generalization
If we have
$$
P(x) = p_0 + p_1x + p_2x^2 + \dots + p_{n-1}x^{n-1}
$$
We want to evaluate at $n$ points $\pm x_1, \pm x_2,\dots, \pm x_{\frac{n}{2}}$. We can split the polynomial into even and odd terms with smaller polynomials $P_e(x^2), P_o(x^2)$ with degree $\frac{n}{2}-1$. So how do we evaluate these polynomials with half the degree of our original polynomial?

This is just another evaluation problem. But this time we need evaluate the polynomials at each of our original inputs squared. Evaluate $P_e(x^2), P_o(x^2)$ each at $x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2$. ($\frac{n}{2}$ points). This works out nicely since our original points were positive and negative pairs. So, if we originally had $n$ points, we now only end up having $\frac{n}{2}$ points. This is starting to smell like the start of a recursive algorithm

### Bigger Picture
We want to evaluate a polynomial $P(x): [p_0, p_1,\dots,p_{n-1}]$ at $n$ points $[\pm x_1, \pm x_2,\dots, \pm x_{\frac{n}{2}}]$.

We split the polynomial to odd and even degree components: 
$$
P(x) = P_e(x^2) + xP_o(x^2)
$$
Where we now have two simpler polynomials of degree $\frac{n}{2} -1$ and only need $\frac{n}{2}$ points to evaluate.
1. Evaluate polynomial $P_e(x^2): [p_0, p_2, p_4,\dots,p_{n-2}]$ on points $[x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2]$. Which is
  $[P_e(x_1^2), P_e(x_2^2), P_e(x_4^2), \dots, P_e(x_{\frac{n}{2}}^2)]$.
2. Evaluate polynomial $P_o(x^2): [p_1, p_3, p_5,\dots,p_{n-1}]$ on points $[x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2]$. Which is $[P_o(x_1^2), P_o(x_2^2), P_o(x_4^2), \dots, P_o(x_{\frac{n}{2}}^2)]$.
   
Once we recursively evaluate these smaller polynomials we can then go through every point in our original set of $n$ points and calculate the respective values by utilizing the relationship between the positive and negative paired points.
$$
\begin{aligned}
&P(x_i) = P_e(x_i^2) + x_iP_o(x_i^2)\\
&P(-x_i) = P_e(x_i^2) - x_iP_o(x_i^2)\\
&i = {1, 2, \dots, \frac{n}{2}}
\end{aligned}
$$
This gives us the **value representation** of our original polynomial $P(x)$

$$
[P(x_1),P(-x_1), P(x_2),P(-x_2),\dots,P(x_{\frac{n}{2}}),P(-x_{\frac{n}{2}})]
$$
So, we have **$O(n \log n)$ Recursive Algorithm**. Since the two recursive sub problems have half the size of the original problem and take linear time to evaluate $n$ points. This would be huge improvement from our earlier quadratic running time, but there is one **major problem**. Can you spot the issue?
### Major Problem
The problem occurs at the recursive steps. The entire scheme relies on the fact that the polynomial will have positive and negative paired points for evaluation.
$$
[\pm x_1, \pm x_2,\dots, \pm x_{\frac{n}{2}}] \space\space\space\space \text{are} \pm\space\text{paired.}
$$
This works at the top level but next level we are evaluating $\frac{n}{2}$ points where each point is squared value.
$$
[x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2] \space\space\space\space \text{are not} \pm\space\text{paired.}
$$
These all end up being positive so the recursion breaks. **The natural question is can we make these new set of points $[x_1^2, x_2^2,\dots, x_{\frac{n}{2}}^2]$, $\pm$ paired?**

**Ingenious Idea behind FFT**: What possible set of initial $n$ points has this property?

**The answer is using [multiplicative subgroup n-th roots of unity]()**.
The points that we should choose are the multiplicative subgroup of $n$-th roots of unity!

# FFT Formulation
#### General Setup
$P(x)$ is a polynomial of degree $n-1$:
$$
P(x) = p_0 + p_1x + p_2x^2 + \dots + p_{n-1}x^{n-1}
$$
#### Field Overview
All $p_i$ are from finite field $F_q$ and $n$ divides $q-1$.
FFT evaluate $P(x)$ at the $n$-th roots of unity $H = \{1, \omega,\omega^2, \cdots,\omega^{n-1}\}$ which is a subgroup of order $n$. The $\omega$ called primitive $n$-th root of unity.

### Recursive Part
#### Split the polynomial $P(x)$ into **even** and **odd** parts:
$$
\begin{aligned}
P(x) &= (p_0 + p_2x^2 + \dots + p_{n-2}x^{n-2}) + x(p_1 + p_3x^2 + \dots + p_{n-1}x^{n-1}) \\
&= P_e(x^2) + xP_o(x^2)
\end{aligned}
$$
#### Recursive evaluation
- Evaluate $P_e(x^2)$ and $P_o(x^2)$ at the $\frac{n}{2}$-th roots of unity which generated by $\omega^2$.
- In each step consider $n_{new} = \frac{n}{2}$ and $\omega_{new} = \omega^2$.
- The size of problem is halved at each recursive step

#### Combine the results
For $k = 0, 1, \dots, \frac{n}{2}-1$:
$$
\begin{aligned}
   P(\omega^k) = P_{e}(\omega^{2k}) + \omega^k.P_{o}(\omega^{2k})
\end{aligned}
$$
### Base Case
- At the base case (degree 0), the polynomial $P(x)$ is simply a constant $P(x) = p_0$.
- Directly return the constant value for all evaluations.

## Example 1: Polynomial of degree 1
### Polynomial $P(z) = 3 +7z$
Let $P(z) = 3 +7z$ is a polynomial of degree 1 over field $F_{17}$. We want to convert coefficient representation of $P(z)$ into value representation.

$P(z)$ is degree of 1, then we are looking for 2 points to evaluate this polynomial. So, we are looking for multiplicative subgroup 2-nd roots of unity in $F_{17}$.

#### Field Overview:
1. The multiplicative group $F^*_{17}$ has $17 - 1 = 16$ elements and is cyclic, $g = 3$ is the generator of this group.
2. Since $n = 2$ divides $q-1 = 17 - 1 =16$, then we have a primitive 2-nd root of unity in $F_{17}$. So 2-nd roots of unity form a subgroup of order 2, generated by $\omega = g^{\frac{q-1}{n}} = g^{\frac{16}{2}} = g^8 = 3^8 = 16$.
$$
H_2 = \{16^0, 16^1\} = \{1, 16\} = \{1, -1\}\space (\text{2-nd roots of unity})
$$
#### Split the Polynomial Into Even and Odd Parts
For our polynomial $P(z) = 3 +7z$ the split is:
$$
P(z) = P_{\mathrm{even}}(z^2) + zP_{\mathrm{odd}}(z^2)
$$
Since  $P(z) = 3 +7z$ is linear, $P_{\mathrm{even}}(z^2)$ and $P_{\mathrm{odd}}(z^2)$ are constants.
$$
\begin{aligned}
&P_{\mathrm{even}}(z^2) = 3\\
&P_{\mathrm{odd}}(z^2) = 7
\end{aligned}
$$

#### Evaluate the Polynomial at the Roots of Unity
The FFT combination formula is:
$$
P(\omega^{k}) = P_{\mathrm{even}}(\omega^{2k}) + \omega^{k}P_{\mathrm{odd}}(\omega^{2k})
$$
We evaluate $P(z)$ at the 2-nd roots of unity $H_2 = \{1, 16\} = \{1, -1\}$

$$
\begin{aligned}
&P(\omega^0) = P(16^0) = P(1) = P_{\mathrm{even}}(1) + P_{\mathrm{odd}}(1) = 3 + 7 = 10\\
&P(\omega^1) = P(16^1) = P(16) = P(-1) = P_{\mathrm{even}}(1) - P_{\mathrm{odd}}(1) = 3 - 7 = -4 = 13\space\space(\text{In $F_{17},\space 16 = -1$})
\end{aligned}
$$

#### Final Value Representation
The value representation of $P(z) = 3 +7z$ at 2-nd roots of unity $\{1, 16\}$ is:
$$
\{10, 13\}
$$
Actually the points $\{(1, 10), (16, 13)\}$ represent the line $3 + 7z$.

### Polynomial $P(z) = 5 +9z$
As above example, we evaluate $P(z)$ at the 2-nd roots of unity $H_2 = \{1, 16\} = \{1, -1\}$

$$
\begin{aligned}
&P(\omega^0) = P(16^0) = P(1) = P_{\mathrm{even}}(1) + P_{\mathrm{odd}}(1) = 5 + 9 = 14\\
&P(\omega^1) = P(16^1) = P(16) = P(-1) = P_{\mathrm{even}}(1) - P_{\mathrm{odd}}(1) = 5 - 9 = -4 = 13\space\space(\text{In $F_{17},\space 16 = -1$})
\end{aligned}
$$
The value representation of $P(z) = P(z) = 5 +9z$ at 2-nd roots of unity $\{1, 16\}$ is:
is $\{(1, 14), (16, 13)\}$.

### Exercise Polynomial $P(z) = 4 + 8z$
### Exercise Polynomial $P(z) = 6 + 10z$

## Example 2: Polynomial of degree 3
### Polynomial $P(y) = 3 + 5y + 7y^2 + 9y^3$
Let $P(y) = 3 + 5y + 7y^2 + 9y^3$ is a polynomial of degree 3 over field $F_{17}$. We want to convert coefficient representation of $P(y)$ into value representation.

$P(y)$ is degree of 3 then we are looking for 4 points to evaluate this polynomial. So, we are looking for multiplicative subgroup 4-th roots of unity in $F_{17}$.

#### Field Overview:
1. The multiplicative group $F^*_{17}$ has $17 - 1 = 16 elements and is cyclic, $g = 3$ is the generator of this group.
2. Since $n = 4$ divides $q-1 = 17 - 1 =16$, then we have a primitive 4-th root of unity in $F_{17}$. So 4-th roots of unity form a subgroup of order 4, generated by $\omega = g^{\frac{q-1}{n}} = g^{\frac{16}{4}} = g^4 = 3^4 = 13$.
$$
H_4 = \{13^0, 13^1, 13^2, 13^4\} = \{1, 13, 16, 4\} = \{1, -4,-1, 4\}\space (\text{4-th roots of unity})
$$

#### Split the Polynomial Into Even and Odd Parts
For our polynomial $P(y) = 3 + 5y + 7y^2 + 9y^3$ the split is:
$$
\begin{aligned}
P(y) &= 3 + 5y + 7y^2 + 9y^3,\\
     &= (3 + 7y^2) + (5y + 9y^3)\\
     &= (3 + 7y^2) + y(5 + 9y^2)\space\space(\text{factor an $y$ in odd power part})\\
     &= (3 + 7z) + y(5 + 9z)\space\space(\text{$y^2=z$, meaning every where change $y^2$ to $z$})\\
&= P_{\mathrm{even}}(y^2) + yP_{\mathrm{odd}}(y^2)\\
&= P_{\mathrm{even}}(z) + yP_{\mathrm{odd}}(z)
\end{aligned}
$$

So, for even and odd part of the polynomial we have:
$$
\begin{aligned}
&P_{\mathrm{even}}(y^2) = P_{\mathrm{even}}(z) = 3 + 7z\\
&P_{\mathrm{odd}}(y^2) = P_{\mathrm{odd}}(z) = 5 + 9z 
\end{aligned}
$$

#### One More Step When the polynomial has degree 3
For evaluate the polynomial P(y) at the 4-th roots of unity, we need evaluation of polynomials of degree 1, $P_{\mathrm{even}}(z) = 3 + 7z$ and $P_{\mathrm{odd}}(z) = 5 + 9z$ at 2-nd roots of unity.

Note that in this term we can use previous generator and squaring it $13^2 = 16$, and find new primitive 2-nd root of unity(generator).
$$
H_{2} = \{16^0, 16^1\} = \{1, 16\}
$$
We use Example 1 and list the evaluations, which is:
$$
\begin{aligned}
&P_{\mathrm{even}}(1) = 10\\
&P_{\mathrm{even}}(16) = P_{\mathrm{even}}(-1) = 13
\end{aligned}
$$
and
$$
\begin{aligned}
&P_{\mathrm{odd}}(1) = 14\\
&P_{\mathrm{odd}}(16) = P_{\mathrm{odd}}(-1) = 13
\end{aligned}
$$

#### Evaluate the Polynomial P(y) at the 4-th Roots of Unity
The FFT combination formula is:
$$
P(\omega^{k}) = P_{\mathrm{even}}(\omega^{2k}) + \omega^{k}P_{\mathrm{odd}}(\omega^{2k})
$$
We want to evaluate $P(y)$ at the 4-th roots of unity $H_4 = \{1, 13, 16, 4\} = \{1, -4,-1, 4\}$.

Evaluating $P(1)$ and $P(-1) = P(16) = P(13^2)$:
$$
\begin{aligned}
&P(\omega^0) = P(13^0) = P(1) = P_{\mathrm{even}}(1) + P_{\mathrm{odd}}(1) = 10 + 14 = 24 = 7\\
&P(\omega^2) = P(13^2) = P(16) = P(-1) = P_{\mathrm{even}}(1) - P_{\mathrm{odd}}(1) = 13 - 13 = 0\space\space(\text{In $F_{17},\space 16 = -1$})
\end{aligned}
$$

Evaluating $P(13^1) = P(13)$:
$$
\begin{aligned}
P(\omega^1) = P(13^1) = P(13) &= P_{\mathrm{even}}(13^2) + 13.P_{\mathrm{odd}}(13^2)\\
&= P_{\mathrm{even}}(16) + 13.P_{\mathrm{odd}}(16)\\
&= P_{\mathrm{even}}(-1) + 13.P_{\mathrm{odd}}(-1)\\
&= 13 + 13.13 = 13 - 1 = 12
\end{aligned}
$$

Evaluating $P(13^3) = P(4)$:
$$
\begin{aligned}
P(\omega^3) = P(13^3) = P(4) &= P_{\mathrm{even}}(13^6) +13^3.P_{\mathrm{odd}}(13^6)\\
& = P_{\mathrm{even}}(13^2) +13^3.P_{\mathrm{odd}}(13^2)\\
& = P_{\mathrm{even}}(-1) + 13^3.P_{\mathrm{odd}}(-1)\\
& = 13 + 13^4 = 13 + 1 = 14
\end{aligned}
$$

#### Final Value Representation
The value representation of $3 + 5y + 7y^2 + 9y^3$ at 4-th roots of unity $\{1, 13, 16, 4\}$ is:
$$
\{7, 12, 0, 14\}
$$
Actually the points $\{(1, 7), (13, 12), (16, 0), (4, 14)\}$ represent the polynomial $3 + 5y + 7y^2 + 9y^3$.

### Exercise Polynomial $4 + 6y + 8y^2 + 10y^3$

## Exercise: Polynomial of degree 7
Suppose $P(x) = 3 + 4x + 5x^2 + 6x^3 + 7x^4 + 8x^5 + 9x^6 + 10x^7$ is polynomial of degree 7, where coefficients are elements in $F_{17}$. We want use FFT and covert this polynomial to **value representation**.

### Step 1: Define Multiplicative Subgroup
#### Subgroup of Roots of Unity
The multiplicative group $F^*_{17}$ has 16 elements and is cyclic and $g =3$ is the generator (primitive root) of this 16-th roots of unity.

#### 8-th roots of unity
By squaring the primitive root of unity of previous step, means $3$, we have $\omega = 3^2 = 9$ which is primitive 8-th root of unity and will generate the 8-th roots of unity which is a subgroup of order 8.
$$
H_{8} = \{9^0, 9^1, 9^2, 9^3, 9^4, 9^5, 9^6, 9^7\} = \{1, 9, 13, 15, 16, 8, 4, 2\}
$$
Since in field $F_{17}$ we have
$$
\begin{aligned}
   9 = -8\\
   13 = -4\\
   15 = -2\\
   16 = -1
\end{aligned}
$$
then for the $H_{8}$
$$
H_{8} = \{\pm 1, \pm 2, \pm 4, \pm 8\}
$$
### Step 2: Split Polynomial into Even and Odd Parts
Split $P(x)$ into its even and odd parts:
$$
\begin{aligned}
P(x) &= (3 + 5x^2 + 7x^4 + 9x^6) + (4x + 6x^3 + 8x^5 + 10x^7)\\
     &= (3 + 5x^2 + 7x^4 + 9x^6) + x(4 + 6x^2 + 8x^4 + 10x^6)\space\space(\text{factor an $x$ in odd power part})\\
     &= (3 + 5x^2 + 7(x^2)^2 + 9(x^2)^3) + x(4 + 6x^2 + 8(x^2)^2 + 10(x^2)^3)\\
     &= (3 + 5y + 7y^2 + 9y^3) + x(4 + 6y + 8y^2 + 10y^3)\space\space(\text{$y=x^2$, meaning every where change $x^2$ to $y$})\\
     &= P_{\mathrm{even}}(x^2) + xP_{\mathrm{odd}}(x^2)
\end{aligned}
$$
where:
$$
\begin{aligned}
&P_{\mathrm{even}}(x^2) = P_{\mathrm{even}}(y) = 3 + 5y + 7y^2 + 9y^3,\\
&P_{\mathrm{odd}}(x^2) = P_{\mathrm{odd}}(y) = 4 + 6y + 8y^2 +10y^3
\end{aligned}
$$
The polynomial $P(x)$ should evaluate at $H_8$, meaning should evaluate at 8 points. We split it to two polynomials $P_{even}$ and $P_{odd}$. Now we have two new polynomial with degree 3, then we need 4 points for evaluating these new polynomials.

### Calculate the group 4-th roots of unity
By squaring the the generator of $H_8$, we have $9^2 = 81 = 13$, which is primitive $4$-th root of unity and the powers of $13$ generates the subgroup of $4$-th roots of unity:
$$
H_{4} = \{13^0, 13^1, 13^2, 13^3\} = \{1, 13, 16, 4\}
$$

### Split Each Polynomials $P_{even}$ and $P_{odd}$ into Even and Odd Parts
By split $P_{\mathrm{even}}(x^2) = P_{\mathrm{even}}(y)$ we have
$$
\begin{aligned}
P_{\mathrm{even}}(x^2) = P_{\mathrm{even}}(y) &= 3 + 5y + 7y^2 + 9y^3,\\
&= (3 + 7y^2) + (5y + 9y^3)\\
&= (3 + 7y^2) + y(5 + 9y^2)\\
&= (3 + 7z) + y(5 + 9z)\space\space(\text{$y^2=z$, meaning every where change $y^2$ to $z$})\\
&= P_{ee}(y^2) + yP_{eo}(y^2)
\end{aligned}
$$

By split $P_{\mathrm{odd}}(x^2) = P_{\mathrm{odd}}(y)$ we have
$$
\begin{aligned}
P_{\mathrm{odd}}(x^2) = P_{\mathrm{odd}}(y) &= 4 + 6y + 8y^2+10y^3\\
&=  (4 + 8y^2) + (6y + 10y^3)\\
&=  (4 + 8y^2) + y(6 + 10y^2)\\
&=  (4 + 8y^2) + y(6 + 10y^2)\\
&=  (4 + 8z) + y(6 + 10z)\space\space(\text{$y^2=z$, meaning every where change $y^2$ to $z$})\\
&= P_{oe}(y^2) + yP_{oo}(y^2)\\
\end{aligned}
$$

The polynomials $P_{even}$ and $P_{odd}$ should evaluate at $H_4$, meaning should evaluate at 4 points. We split polynomial $P_{even}$ to two polynomials $P_{ee}$ and $P_{eo}$, and split polynomial $P_{odd}$ to two polynomials $P_{oe}$ and $P_{oo}$. Now we have two new polynomial with degree 1, then we need 2 points for evaluating these new polynomials.

### Calculate the group 2-nd roots of unity
By squaring the generator of $H_4$, we have $13^2 = 16$, which is primitive $2$-th root of unity and the powers of $16$ generates the subgroup of $2$-th roots of unity:
$$
H_{2} = \{16^0, 16^1\} = \{1, 16\}
$$

### Split Each Polynomials $P_{ee}, P_{eo}, P_{oe}, P_{oo}$ into Even and Odd Parts Again
By split $P_{\mathrm{ee}}(y^2) = P_{\mathrm{ee}}(z)$ we have
$$
\begin{aligned}
   P_{\mathrm{ee}}(y^2) = P_{\mathrm{ee}}(z) &= 3 + 7z\\
   &= P_{\mathrm{eee}}(z^2) +zP_{\mathrm{eeo}}(z^2)\\
   &\rightarrow P_{\mathrm{eee}}(z^2) = 3,\space P_{\mathrm{eeo}}(z^2) = 7
\end{aligned}
$$
They are constant polynomials. We repeat this for all polynomials of degree 1 and get their constant polynomials


Some Article that I took inspiration from listed below:
- [hackmd @matan](https://hackmd.io/@matan/ffts#FFT-over-Finite-Fields)
- [decentralizedthoughts](https://decentralizedthoughts.github.io/2023-09-01-FFT/)
- [wikipedia](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
- [vitalik](https://vitalik.eth.limo/general/2019/05/12/fft.html)