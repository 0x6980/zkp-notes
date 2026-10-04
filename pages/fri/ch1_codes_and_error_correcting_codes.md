# Codes and Error-Correcting Codes

## What is a code?
In coding theory, a **code** is a collection of words chosen from an alphabet.

For example, consider the binary alphabet

$$
\mathbb{F}_2=\{0,1\}.
$$

A binary code of length \(3\) could be

$$
C=\{000,111\}.
$$

The elements of \(C\) are called **codewords**.

So, in this example,

$$
000\quad\text{and}\quad111
$$

are the codewords.

Notice that not every possible binary word of length \(3\) belongs to \(C\). There are \(2^3=8\) possible words:

$$
000,001,010,011,100,101,110,111,
$$

but our code contains only two of them:

$$
C=\{000,111\}.
$$

At this point, this might seem rather arbitrary.

Why would we choose only some words?

And more importantly:

> **Why would we use a code when communicating information?**

To answer this, we need to think about what happens when information is transmitted.

---

# Why do we transmit codewords?

Suppose we want to communicate a single bit:

$$
0\quad\text{or}\quad1.
$$

Without coding, we could simply transmit the bit itself:

$$
0\rightarrow0
$$

and

$$
1\rightarrow1.
$$

This seems perfectly reasonable.

But real communication systems are not perfect.

When a message travels through a communication channel, something can go wrong.

For example, suppose we send

$$
1.
$$

Because of noise in the channel, the receiver might receive

$$
0.
$$

The receiver has no way of knowing whether the sender actually transmitted \(0\), or whether the sender transmitted \(1\) and the channel changed it.

The receiver has no additional information.

So we have a problem.

---

# Add redundancy

Instead of transmitting one bit directly, suppose we use the code

$$
C=\{000,111\}.
$$

We agree beforehand that

$$
0\longrightarrow000
$$

and

$$
1\longrightarrow111.
$$

Now, if we want to transmit the message \(1\), we don't transmit \(1\).

We transmit

$$
111.
$$

We have increased the number of transmitted bits from \(1\) to \(3\).

At first this seems inefficient.

Why send three bits when one bit contains the information?

The answer is:

> **The additional bits give us redundancy.**

That redundancy can help us when errors occur.

---

# What happens when an error occurs?

Suppose we want to send

$$
1.
$$

Therefore, we transmit

$$
111.
$$

Now imagine that the communication channel changes the second bit.

The receiver receives

$$
101.
$$

So we have

$$
111\longrightarrow101.
$$

The receiver did not receive the codeword that was transmitted.

But something interesting has happened.

The receiver knows that the only valid codewords are

$$
000\quad\text{and}\quad111.
$$

The received word is

$$
101.
$$

Since

$$
101\notin C,
$$

the receiver immediately knows:

> **An error has occurred.**

This is already useful.

The code has allowed us to **detect** an error.

But can we do something even better?

Can we determine what the original codeword was?

---

# From error detection to error correction

The receiver compares \(101\) with the two possible codewords.

Compare \(101\) with \(111\):

$$
101
$$

$$
111
$$

They differ in only one position.

Now compare \(101\) with \(000\):

$$
101
$$

$$
000
$$

They differ in two positions.

Therefore, \(101\) is closer to \(111\) than to \(000\).

The receiver can reasonably conclude that

$$
101
$$

was obtained from

$$
111
$$

by changing one bit.

So the receiver corrects the received word:

$$
101\longrightarrow111.
$$

And since

$$
111
$$

represents the message \(1\), the receiver recovers the original message:

$$
101\longrightarrow111\longrightarrow1.
$$

This is the basic idea of an **error-correcting code**.

---

# How do we measure "closeness"?

We have just used an important idea without formally defining it.

We said that \(101\) is closer to \(111\) than to \(000\).

But what does "closer" mean?

For binary words of the same length, a natural way to measure distance is to count the positions in which they differ.

This is called the **Hamming distance**.

For two words \(x\) and \(y\), the Hamming distance \(d(x,y)\) is the number of positions in which \(x\) and \(y\) are different.

For example,

$$
x=101
$$

and

$$
y=111.
$$

We compare the positions:

$$
\begin{array}{ccc}
1&0&1\\
1&1&1
\end{array}
$$

Only the second position is different.

Therefore,

$$
d(101,111)=1.
$$

Now consider

$$
x=101,\qquad y=000.
$$

We have

$$
\begin{array}{ccc}
1&0&1\\
0&0&0
\end{array}
$$

The first and third positions are different.

Therefore,

$$
d(101,000)=2.
$$

So we can express our previous reasoning mathematically:

$$
d(101,111)=1<2=d(101,000).
$$

Therefore, the closest codeword to \(101\) is \(111\).

---

# The geometry of a code

This gives us a useful way to think about codes.

Imagine every possible word as a point.

The valid codewords are special points among all possible words.

For our code,

$$
C=\{000,111\},
$$

the two codewords are separated by

$$
d(000,111)=3.
$$

We can think of the situation roughly as

$$
000\qquad\qquad111
$$

with distance \(3\) between them.

If we transmit \(111\), and one bit is changed, the received word must be one of

$$
011,\quad101,\quad110.
$$

Each of these words is at distance \(1\) from \(111\).

So the codeword \(111\) has a "neighborhood" consisting of the words that can be produced by a small number of errors.

The same is true for \(000\).

The important idea is that the codewords are sufficiently far apart that these neighborhoods do not overlap.

---

# Minimum distance

For a general code, there may be many codewords.

For example,

$$
C=\{000,011,101,110\}.
$$

We can calculate the distances between pairs of codewords.

For example,

$$
d(000,011)=2,
$$

$$
d(000,101)=2,
$$

$$
d(000,110)=2.
$$

Also,

$$
d(011,101)=2,
$$

$$
d(011,110)=2,
$$

and

$$
d(101,110)=2.
$$

The smallest distance between two different codewords is therefore

$$
d_{\min}=2.
$$

This is called the **minimum distance** of the code.

Formally,

$$
d_{\min}
=
\min_{\substack{x,y\in C\\x\neq y}}
d(x,y).
$$

The minimum distance is one of the most important properties of an error-correcting code.

Why?

Because it tells us how well separated the codewords are.

---

# Why does minimum distance matter?

Suppose two codewords are very close.

For example,

$$
0000
$$

and

$$
0001.
$$

Their distance is only

$$
d(0000,0001)=1.
$$

If we transmit \(0000\) and one bit changes, we could receive

$$
0001.
$$

But \(0001\) is itself a valid codeword.

The receiver cannot know whether

$$
0000
$$

was transmitted and an error occurred, or whether

$$
0001
$$

was transmitted without an error.

Therefore, the code cannot reliably correct one error.

Now imagine that the codewords are much farther apart.

If every pair of codewords has distance at least \(3\), then a single error cannot take one codeword all the way to another codeword.

That gives us a fundamental principle:

> **The greater the minimum distance between codewords, the more errors the code can detect or correct.**

---

# Error detection

Suppose a code has minimum distance

$$
d_{\min}=3.
$$

Can it detect one error?

Yes.

If one error occurs, the received word is at distance \(1\) from the transmitted codeword.

But another valid codeword is at least distance \(3\) away.

Therefore, the received word cannot be another valid codeword.

So one error can always be detected.

In fact, a code with minimum distance \($d_{\min}$\) can detect up to

$$
d_{\min}-1
$$

errors.

Thus,

$$
\boxed{\text{maximum detectable errors}=d_{\min}-1}.
$$

For example, if

$$
d_{\min}=4,
$$

the code can detect up to

$$
4-1=3
$$

errors.

---

# Error correction

Detection is not the same as correction.

To **detect** an error means:

> "I know something went wrong."

To **correct** an error means:

> "I know what the original codeword was."

Suppose

$$
d_{\min}=3.
$$

If at most one error occurs, the received word is at distance \(1\) from the original codeword.

Any other codeword is at least distance \(3\) away.

Therefore, the original codeword is uniquely identifiable as the closest codeword.

So a code with

$$
d_{\min}=3
$$

can correct

$$
1
$$

error.

More generally, if

$$
d_{\min}
$$

is the minimum distance, then the code can correct

$$
\boxed{
t=
\left\lfloor
\frac{d_{\min}-1}{2}
\right\rfloor
}
$$

errors.

This formula is fundamental in coding theory.

---

# Understanding the formula intuitively

It is worth understanding the formula rather than simply memorizing it.

Suppose

$$
d_{\min}=5.
$$

Then two different codewords are at least five positions apart.

If we allow two errors, a transmitted codeword can move at most distance \(2\).

So around every codeword we can imagine a radius-2 region:

$$
\boxed{\text{radius }2}
$$

Because two codewords are at least distance \(5\) apart, these radius-2 regions do not overlap.

Therefore, if we receive a word that is within distance \(2\) of a codeword, we know which codeword it came from.

Thus,

$$
d_{\min}=5
$$

allows correction of

$$
\left\lfloor\frac{5-1}{2}\right\rfloor
=
2
$$

errors.

---

# A complete example

Consider the code

$$
C=\{00000,11111\}.
$$

The minimum distance is

$$
d(00000,11111)=5.
$$

Therefore,

$$
d_{\min}=5.
$$

The code can correct

$$
\left\lfloor\frac{5-1}{2}\right\rfloor=2
$$

errors.

Suppose we transmit

$$
11111.
$$

The channel introduces two errors:

$$
11111\longrightarrow10101.
$$

The receiver compares the received word with the two codewords.

We have

$$
d(10101,11111)=2
$$

and

$$
d(10101,00000)=3.
$$

Therefore, the closest codeword is

$$
11111.
$$

The receiver corrects

$$
10101\longrightarrow11111.
$$

The original message is recovered.

---

# What if there are too many errors?

Now suppose the same code has

$$
d_{\min}=5,
$$

but three errors occur.

For example,

$$
11111\longrightarrow10000.
$$

We have

$$
d(10000,11111)=4
$$

and

$$
d(10000,00000)=1.
$$

The received word is actually closer to the wrong codeword.

A decoder based on nearest distance would therefore choose

$$
00000.
$$

The original message cannot be reliably recovered.

This is an important point:

> **An error-correcting code does not magically correct any number of errors.**

Its error-correcting capability is determined by its minimum distance.

---

# The communication picture

We can now put the entire process together.

The sender starts with a message:

$$
\boxed{\text{Message}}
$$

The encoder converts it into a codeword:

$$
\boxed{\text{Message}}
\longrightarrow
\boxed{\text{Codeword}}
$$

The codeword travels through a noisy channel:

$$
\boxed{\text{Codeword}}
\longrightarrow
\boxed{\text{Noisy channel}}
\longrightarrow
\boxed{\text{Received word}}
$$

The receiver uses the structure of the code to determine the most likely original codeword:

$$
\boxed{\text{Received word}}
\longrightarrow
\boxed{\text{Decoder}}
\longrightarrow
\boxed{\text{Codeword}}
$$

Finally, the codeword is converted back into the original message:

$$
\boxed{\text{Codeword}}
\longrightarrow
\boxed{\text{Message}}.
$$

So an error-correcting communication system can be viewed as

$$
\boxed{
\text{Message}
\rightarrow
\text{Encoder}
\rightarrow
\text{Codeword}
\rightarrow
\text{Channel}
\rightarrow
\text{Received word}
\rightarrow
\text{Decoder}
\rightarrow
\text{Message}.
}
$$

---

# Why don't we always add lots of redundancy?

At this point, another natural question appears.

If redundancy is useful, why don't we simply make every codeword extremely long?

For example, instead of

$$
0\rightarrow000,
$$

why not use

$$
0\rightarrow000000000000?
$$

More redundancy generally gives us more protection against errors.

But redundancy has a cost.

We have to transmit more bits.

This means:

* more transmission time,
* more storage,
* greater bandwidth requirements,
* greater computational requirements in some systems.

Therefore, coding theory is not simply about correcting as many errors as possible.

It is about finding a useful balance between

$$
\boxed{\text{information}}
$$

and

$$
\boxed{\text{redundancy}}.
$$

This is one of the central ideas of coding theory.

---

# A first exercise: detecting an error

Consider

$$
C=\{0000,1111\}.
$$

Suppose the receiver receives

$$
1101.
$$

### Questions

1. Is \(1101\) a valid codeword?
2. Calculate

$$
d(1101,0000)
$$

and

$$
d(1101,1111).
$$

3. Which codeword is closer?
4. If we assume at most one error occurred, what was probably transmitted?

### Solution

We have

$$
d(1101,0000)=3
$$

and

$$
d(1101,1111)=1.
$$

Therefore,

$$
1101
$$

is closer to

$$
1111.
$$

So the decoder chooses

$$
\boxed{1111}.
$$

---

# A second exercise: minimum distance

Consider

$$
C=\{00000,00111,11001,11110\}.
$$

Calculate the Hamming distance between every pair of different codewords.

Then find

$$
d_{\min}.
$$

Finally determine how many errors the code can:

1. detect;
2. correct.

### Hint

You need to find the smallest distance between any two codewords.

Then use

$$
\text{detectable errors}=d_{\min}-1
$$

and

$$
\text{correctable errors}
=
\left\lfloor
\frac{d_{\min}-1}{2}
\right\rfloor.
$$

---

# A third exercise: think like a decoder

Suppose a code has

$$
d_{\min}=7.
$$

Answer the following:

### (a)

What is the maximum number of errors that can always be detected?

### (b)

What is the maximum number of errors that can always be corrected?

### (c)

If the receiver observes a word that differs from one codeword in two positions, can it uniquely identify that codeword, assuming the code has \(d_{\min}=7\)?

### Answers

For (a),

$$
7-1=6.
$$

So up to

$$
\boxed{6}
$$

errors can be detected.

For (b),

$$
\left\lfloor\frac{7-1}{2}\right\rfloor
=
3.
$$

So up to

$$
\boxed{3}
$$

errors can be corrected.

For (c), yes. Since the received word is only distance \(2\) from the codeword, and the correction radius is \(3\), it can be uniquely decoded.

---

# The big picture

We started with a very simple question:

> **What is a code?**

A code is simply a collection of allowed codewords.

Then we asked:

> **Why would we use a code for communication?**

Because a communication channel can introduce errors.

Then:

> **Why does redundancy help?**

Because it gives the receiver additional information about which transmitted words are valid.

Then:

> **How can the receiver decide what was transmitted?**

By comparing the received word with valid codewords.

Then:

> **How do we mathematically measure which word is closer?**

Using **Hamming distance**.

Then:

> **How much protection does a code provide?**

The answer is related to its **minimum distance**.

Finally:

$$
\boxed{
d_{\min}
\quad\Longrightarrow\quad
\text{error detection and correction capability}.
}
$$

The central relationship is

$$
\boxed{
\text{correct }t\text{ errors}
\quad\text{if}\quad
d_{\min}\geq2t+1.
}
$$

So the fundamental picture to remember is:

$$
\boxed{
\text{Codewords}
\quad\overset{\text{distance}}{\longrightarrow}\quad
\text{separation}
\quad\overset{\text{redundancy}}{\longrightarrow}\quad
\text{error protection}.
}
$$

We now understand what makes an error-correcting code useful: distance.
A code whose codewords are far apart can detect and correct many errors.

But this raises a deeper question:

How do we construct codes whose codewords are very far apart, while still encoding a large amount of information?

And, more importantly for what comes next:

Can we build such codes using mathematical structure that we can actually work with?

To answer this, we will move from arbitrary sets of codewords to linear codes, and then from vectors to polynomials over finite fields. This path will eventually lead us to Reed–Solomon codes.