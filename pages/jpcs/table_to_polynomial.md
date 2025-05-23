## Table to Multilinear polynomial
A table of height $2^n$ and width $2^k$ can be viewed either as $2^k$ multilinear polynomials in $m$ variables each, or as a single multilinear polynomial in $k + m$ variables.

### Jagged Table (Row $= 4 = 2^2$, Column $= 8 = 2^3$)

| \( (x_1,x_2) \) | \( y_1y_2y_3=000 \) | \( 001 \) | \( 010 \) | \( 011 \) | \( 100 \) | \( 101 \) | \( 110 \) | \( 111 \) |
|-----------------|---------------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|
| **00**          | `5`                 | `3`       | `1`       | `8`       | `4`       | `2`       | `7`       | `6`       |
| **01**          | `0`                 | `9`       | `0`       | `0`       | `11`      | `13`      | `0`       | `10`      |
| **10**          | `0`                 | `0`       | `0`       | `12`      | `0`       | `0`       | `0`       | `14`      |
| **11**          | `0`                 | `0`       | `0`       | `0`       | `0`       | `0`       | `0`       | `16`      |

**Column Heights:**
- $h_{000} = 1$ (non-zero only at row `00`)
- $h_{001} = 2$ (non-zero up to row `01`)
- $h_{010} = 1$ (non-zero only at row `00`)
- $h_{011} = 3$ (non-zero up to row `10`)
- $h_{100} = 2$ (non-zero up to row `01`)
- $h_{101} = 2$ (non-zero up to row `01`)
- $h_{110} = 1$ (non-zero only at row `00`)
- $h_{111} = 1$ (non-zero only at row `00`)

$$
\begin{aligned}
p : \{0, 1\}^n\times\{0, 1\}^k\rightarrow\mathbb{F}\\
p : \{0, 1\}^2\times\{0, 1\}^3\rightarrow\mathbb{F}\\
\end{aligned}
$$
In other representation of $p$
$$
p : \{00, 01, 10, 11\}\times\{000, 001, 010, 011, 100, 101, 110, 111\}\rightarrow\mathbb{F}\\
$$
given by
| \( (y_1,y_2) \) | \( x_1x_2x_3=000 \) | \( 001 \)       | \( 010 \)        | \( 011 \) | \( 100 \) | \( 101 \) | \( 110 \) | \( 111 \)     |
|-----------------|---------------------|-----------------|------------------|-----------|-----------|-----------|-----------|---------------|
| **00**          | $p(00,000) = 5$     | $p(00,001) = 3$ | $p(00,010) = 1$ | $p(00,011) = 8$       | $p(00, 100) = 4$      | $p(00, 101) = 2$       | $p(00, 110) = 7$       | $p(00, 111) = 6$        |
| **01**           | $p(01,000) = 0$                  | $p(01,001) = 9$         | $p(01,010) = 0$        | $p(01,011) = 0$       | $p(01, 100) = 11$       | $p(01, 101) = 13$      | $p(01, 110) = 0$       | $p(01, 111) = 10$           |
| **10**           | $p(10,000) = 0$                  | `$p(10,001) = 0$               | $p(10,010) = 0$       | $p(10,011) = 12$      | $p(10, 100) = 0$       | $p(10, 101) = 0$       | $p(10, 110) = 0$       | $p(10, 111) = 14$           |
| **11**           | $p(11,000) = 0$                  | $p(11,001) = 0$               | $p(11,010) = 0$       | $p(11,011) = 0$       | $p(11, 100) = 0$       | $p(11, 101) = 0$       | $p(11, 110) = 0$       | $p(11, 111) = 16$      

In this example we defined a polynomial based on a table of $2^n$ rows and $2^k$ columns. In next section we construct this polynomial with some other properties and will define a jagged polynomial.