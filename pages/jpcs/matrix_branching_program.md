# Matrix Branching Program
A read-once matrix branching program (MBP) is defined by a sequence of w × w dimensional
matrices M = Mj(σ) ∈ Fw×wσ∈{0,1}b,j∈[n] together with a sink vector u ∈ Fw. Given an input
x ∈ ({0, 1}b)n, the output of the MBP is the first entry of the vector Qn j=1 Mj(xj) · u. That is,
the output is (e1)T ·Qn j=1 Mj(xj)· u, where e1 is the unit vector (1, 0, . . . , 0). In other words, the
input bits act as selectors for matrices for every layer, and the MBP is evaluated by taking the
product of the selected matrices (in the right order).
We refer to the branching program determined by M = Mj(σ)σ∈{0,1}b,j∈[n] and u by (M, u)
and refer to w as its width.