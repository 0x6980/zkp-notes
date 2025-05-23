## read-once branching program (ROBP) 
For $w \in \mathbb{N}$, a width-$w$ read-once branching program (ROBP) over an alphabet $\Sigma = \{0, 1\}^b$ consists of a layered directed graph $G = (V, E)$, with $n + 1$ layers. The first layer,
denoted layer 0, consists of a single vertex known as the source. Each subsequent layer consists of
at most $w$ vertices. The vertices in the last layer (aka layer n) are called sinks and are each labeled
by a field element.

Each vertex $v$ in layer $i < n$ has exactly $2^b$ outgoing edges, labeled by all of the strings in $\Sigma$ each of which goes into layer $i + 1$ (or directly to a sink). For every symbol $\sigma\in\{0, 1\}^b$, we denote the neighbor of $v$ that is incident to the outgoing edge that is labeled by $\sigma$, by $\varGamma(v, \sigma)$.

```sequence
    v1[x₁] -->|x₁=1| v2[x₂]
    v1 -->|x₁=0| v3[x₂]
    
    v2 -->|x₂=1| v4[x₃]
    v2 -->|x₂=0| v5[x₃]
    
    v3 -->|x₂=1| v6[x₃]
    v3 -->|x₂=0| v7[x₃]
    
    v4 -->|x₃=1| Reject((Reject))
    v4 -->|x₃=0| Accept((Accept))
    
    v5 -->|x₃=1| Accept
    v5 -->|x₃=0| Reject
    
    v6 -->|x₃=1| Reject
    v6 -->|x₃=0| Accept
    
    v7 -->|x₃=1| Accept
    v7 -->|x₃=0| Reject
```