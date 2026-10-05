# Error Correcting Code

We want to transfer the information from a sender to a receiver over unreliable or noisy communication channels, for example, a digital bit stream (a sequence of bit), from one or several *senders* to one or several *receivers*. Across this, data transmission, error occurs. This data transmission is a code. Meaning, the information from the sender maps to the receiver's data plain as code. But we intended this transformation to be correct, i.e., when data sends by the sender the receiver get the information correctly. When this data transmission happens over unreliable or noisy communication channels, the errors are not avoidable. And here raises the error correcting codes, where they have ability to correct the corrupted data.

An *error correcting code* is a means to encode data in a way that is robust against errors (noise).

Codes may also be used to represent data in a way more resistant to errors in transmission or storage. This so-called error-correcting code works by including carefully crafted redundancy with the stored (or transmitted) data. 

The central idea is that the sender encodes the message in a redundant way. The redundancy allows the receiver not only to detect errors that may occur anywhere in the message, but often to correct a limited number of errors.

## Example

Suppose $\Sigma = \{0,1\}$. A simplistic example of an error correcting code is to transmit each data bit three times. A receiver might see eight versions of the output, see table below:

| **Interpreted as** | **Triplet received** |
| --- | --- |
| 0 (error free) | 000 |
| 0 | 001 |
| 0 | 010 |
| 0 | 100 |
| 1 (error free) | 111 |
| 1 | 110 |
| 1 | 101 |
| 1 | 011 |

In order to transmit a message that may corrupt the transmission in a few places, the idea is to just repeat the message three times. The hope is that the channel corrupts only a minority of these repetitions. This way the receiver will notice that a transmission error occurred since the received data stream is not the repetition of a single message, and moreover, the receiver can recover the original message by looking at the received message in the data stream that occurs most often.

This decoding logic called **majority decision.** 

Majority decision means, based on the assumption that the largest number of occurrences of a symbol was the transmitted symbol.

Suppose the sender wants to transmit the information bits $101$. Then the encoding maps each bit either to the all ones or all zeros code word, so we get the $111\space000\space 111$ which will be transmitted.

We sample one encoded received sequence with two errors and another with three errors.

### Sample with two errors

Let's say two errors corrupt the transmitted bits and the received sequence is $111\space010\space110$. We boxed on errors as follows: 

$$
111\space0\boxed{1}0\space1\boxed{1}0.
$$

Decoding logic is done by a simple majority decision for each code word:

- In the codeword $111$, not occurred any errors, so the majority of the bits are correct and will decode to the symbol $1$.
- In the codeword $010$, occurred one error on position 2, so the majority of the bits are correct and will decode to the symbol $0$.
- In the codeword $110$, occurred one error at position 3, so the majority of the bits are correct and will decode to the symbol $1$.

Thus, the received sequence $111\space010\space110$, is decoded information bits as to $101$. Therefore, with two errors in the received sequence, we successfully decoded the original message $101$.

### Sample with three errors

Let's say three errors corrupt the transmitted bits and the received sequence is $111\space010\space100$. We boxed on errors as follows: 

$$
111\space0\boxed{1}0\space1\boxed{00}.
$$

Decoding logic is done by a simple majority decision for each code word:

- In the codeword $111$, not occurred any errors, so the majority of the bits are correct and will decode to the symbol $1$.
- In the codeword $010$, occurred one error on position 2, so the majority of the bits are correct and will decode to the symbol $0$.
- In the codeword $100$, two bits are corrupted at positions 2 and 3, so the majority of the bits **are not correct** and will decode the codeword to the symbol $0$.

Thus, the received sequence $111\space010\space100$, is decoded to the information bits as to $100$, which is not correct original message. Therefore, with three errors in the received sequence, we cannot guarantee that the decoded message is the same as the original message $101$.

**Exercise.** Could you sample a received sequence with **two errors** such that the decoded message is **incorrect**?

**Hint:** Put two errors in one triplet codeword.

**Exercise**. What about one error? Could you sample a received sequence with one error such that the decoded message is incorrect?

## Conclusion

In the example above, we see that the code can **only** guarantee that it can decode successfully if there is **only** one error in the received sequence (meaning it can correct **at most** one error).

Based on the above discussions, codes that have a greater capability to correct errors can be considered good.

Therefore, we seek tools to measure how good a code is. For this purpose, in the upcoming chapters, we will introduce these tools and attempt to define codes that possess these capabilities. These tools and features will assist us in constructing more effective codes. For example, as you have seen before, the error-correction capacity of the code in the example above is 1. Can we compute this capacity? Can we create codes for which this kind of capacity is definable?