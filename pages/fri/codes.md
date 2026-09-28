# Codes

## Introduction

In information theory and computer science, a code is usually considered as an algorithm that uniquely represents symbols from some source alphabet, by *encoded* strings, which may be in some other target alphabet. An extension of the code for representing sequences of symbols over the source alphabet is obtained by concatenating the encoded strings.

Before giving a mathematically precise definition, this is a brief example. The mapping 

$$
C = \{a\mapsto 0, b\mapsto 01, c\mapsto 011\}
$$

is a code, whose source alphabet is the set $\{a,b,c\}$ and whose target alphabet is the set $\{0,1\}$. Using the extension of the code, the encoded string $0011001$ can be grouped into codewords as $0 011 0 01$, and these in turn can be decoded to the sequence of source symbols *$acab$*.

## Formal Definition of Codes

The precise mathematical definition of this concept is as follows: let $S$ and $T$ be two finite sets, called the source and target alphabets, respectively. A **code $C:S\rightarrow T^*$** is a function mapping each symbol from $S$ to a sequence of symbols over $T$. Note that $T^*$ represent all concatenation of alphabet $T$, which naturally maps each sequence of source symbols to a sequence of target symbols.

The extension $C^{'}$of $C$ is a homomorphism of $S^*$ into $T^*$: 

$$
h:S^*\rightarrow T^*
$$

In algebra, a **homomorphism** is a structure-preserving map between two algebraic structures of the same type. Here the structure is concatenation of an alphabet. Thus, a homomorphism will preserve the concatenation structure, meaning: for all $u,v\in S^*$ we have:

$$
\begin{aligned}
h(uv) = h(u)h(v).
\end{aligned}
$$

### Examples

1. Consider the mapping $C_1 = \{a\mapsto 0, b\mapsto 0, c\mapsto 1\}$ is a code, whose source alphabet is the set $\{a,b,c\}$ and whose target alphabet is the set $\{0,1\}$. Furthermore, we say $a$ is encoded to $0$, b is encoded to $0$, and $c$ is encoded to $1$. Also, $0$, $1$ called codewords.
2. The mapping 

$$
C_2 = \{a\mapsto 1, b\mapsto 011, c\mapsto 01110, d\mapsto 1110, e\mapsto 10011, f\mapsto 0\}
$$

is a code, whose source alphabet is the set $\{a,b,c,d, e, f\}$ and whose target alphabet is the set $\{0,1\}$. Furthermore, we say $a$ is encoded to $1$, $b$ is encoded to $011$, $c$ is encoded to $01110$, and so on. Also, each result of mapping called a codeword.

## **Injective (Non-singular) Codes**

A code is **non-singular** if each source symbol is mapped to a different non-empty bit string; that is, the mapping from source symbols to bit strings is injective.

- For example, the mapping $C_1 = \{a\mapsto 0, b\mapsto 0, c\mapsto 1\}$ is *not injective* because both $a$ and $b$ map to the same bit string $0$; any extension of this mapping will generate a lossy (non-lossless) coding.
- The mapping $C_2$ in the example above, is injective. Check it as exercise.

## Uniquely Decodable Codes

A code is **uniquely decodable** if its extension is **injective.** 

- For example, the mapping $C_1 = \{a\mapsto 0, b\mapsto 01, c\mapsto 011\}$ is uniquely decodable. This can be demonstrated by looking at the *follow-set* after each target bit string in the map, because each bit string is terminated as soon as we see a $0$ bit which cannot follow any existing code to create a longer valid code in the map, but unambiguously starts a new code.
- Consider again the code $C_2$ in the example above. This code is *not* uniquely decodable, since the string $011101110011$ can be interpreted as the sequence of codewords

$$
\begin{aligned}
&01110,\\
&1110,\\
&011.
\end{aligned}
$$

       But also as the sequence of codewords 

$$
\begin{aligned}
&011,\\
&1,\\
&011,\\
&10011.
\end{aligned}
$$

Two possible decodings of this encoded string are thus given by $*cdb*$ and $*babe*$.

## Conclusion

In extension of codes, we use the all concatenation of the source and target alphabets and defined our mapping. In the next chapter, we're talking about some sorts of code which encode data in blocks.