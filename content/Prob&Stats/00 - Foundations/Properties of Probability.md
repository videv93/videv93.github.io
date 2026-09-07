---
tags: [probability, foundations]
status: evergreen
---
# Properties of Probability

> Bốn hệ quả của [[Axioms of Probability]]. Chúng chiếm phần lớn công việc tính toán thực tế, và cái thứ tư — inclusion–exclusion — là thứ hay bị dùng sai nhất.

## 1. Bảng bốn tính chất

| #   | Tính chất               | Phát biểu                                 | Dùng khi                     |
| --- | ----------------------- | ----------------------------------------- | ---------------------------- |
| 1   | **Complement**          | $P(A^c) = 1 - P(A)$                       | Câu hỏi có chữ "ít nhất một" |
| 2   | **Monotonicity**        | $A \subseteq B \Rightarrow P(A) \le P(B)$ | Chặn trên/dưới, sanity check |
| 3   | **Union of two**        | $P(A \cup B) = P(A) + P(B) - P(A\cap B)$  | Hai event chồng nhau         |
| 4   | **Inclusion–Exclusion** | (xem §3)                                  | $n$ event chồng nhau         |

Thêm một công cụ hay dùng: **union bound** (Boole's inequality)
$$P\!\left(\bigcup_{i=1}^{n} A_i\right) \le \sum_{i=1}^{n} P(A_i),$$
luôn đúng, không cần giả định gì. Rất hữu ích để chặn trên xác suất "có gì đó tệ xảy ra".

## 2. Xác suất như diện tích

Cách hình dung tốt nhất (Blitzstein dùng liên tục trong Lecture 3): coi $S$ là hình vuông diện tích 1, event là vùng bên trong. Khi đó:
- Phần bù = phần còn lại của hình vuông
- $A \subseteq B$ → vùng nhỏ nằm trong vùng lớn
- $P(A\cup B)$: cộng hai vùng thì phần giao bị đếm 2 lần → trừ đi 1 lần

Mọi tính chất trên đều "hiển nhiên" dưới góc nhìn diện tích. Đây không phải chứng minh, nhưng là cách nhớ chắc nhất.

## 3. Inclusion–Exclusion

$$P\!\left(\bigcup_{i=1}^{n} A_i\right) = \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j) + \sum_{i<j<k} P(A_i\cap A_j \cap A_k) - \cdots + (-1)^{n+1} P(A_1 \cap \cdots \cap A_n)$$

Ghi nhớ: **cộng lẻ, trừ chẵn** (theo số phần tử trong giao).

Số hạng: $2^n - 1$ → chỉ khả thi khi có **đối xứng**, tức là mọi giao cùng cỡ có cùng xác suất. Khi đó
$$P\!\left(\bigcup A_i\right) = \sum_{k=1}^{n} (-1)^{k+1}\binom{n}{k} P(A_1 \cap \cdots \cap A_k).$$

Ứng dụng kinh điển: [[Matching Problem]] (bài toán de Montmort).

## 4. Cạm bẫy

1. **Cộng thẳng $P(A) + P(B)$ khi hai event chồng nhau** — lỗi phổ biến nhất trong toàn bộ môn xác suất.
2. **Nhầm disjoint với independent.** Hai khái niệm gần như *đối lập*: nếu $A, B$ disjoint và cùng có xác suất dương thì chúng **phụ thuộc** rất mạnh (biết $A$ xảy ra thì chắc chắn $B$ không). → [[Independence]]
3. **Dùng inclusion–exclusion khi không có đối xứng** → $2^n-1$ số hạng, không tính nổi. Đổi sang union bound hoặc [[Poisson Paradigm]].
4. **Quên đổi dấu** ở các tầng chẵn.
5. **Chặn trên bằng union bound rồi tưởng là đẳng thức.** Nó chỉ là bất đẳng thức, chặt khi các event gần disjoint.

## 5. Truncation của inclusion–exclusion (Bonferroni)

Cắt tổng ở tầng lẻ → được **chặn trên**; cắt ở tầng chẵn → được **chặn dưới**:
$$\sum_i P(A_i) - \sum_{i<j}P(A_i\cap A_j) \;\le\; P\!\left(\bigcup A_i\right) \;\le\; \sum_i P(A_i).$$
Rất hữu ích khi các tầng sâu không tính được.

## 6. Checklist
- [ ] Các event đang cộng có disjoint không? Nếu không → trừ phần giao.
- [ ] Câu hỏi có dạng "ít nhất một"? → thử phần bù trước.
- [ ] Đáp án có nằm trong $[0,1]$ không?
- [ ] Nếu $A \subseteq B$, đáp án có thoả $P(A)\le P(B)$ không?
- [ ] Với inclusion–exclusion: có đối xứng để rút gọn không? Đã đổi dấu đúng chưa?
- [ ] Nếu chỉ cần chặn trên, union bound có đủ không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.6: http://probabilitybook.net
- Stat 110 Lecture 3 (*Properties of Probability*): https://www.youtube.com/watch?v=LZ5Wergp_PA
- Wikipedia — *Inclusion–exclusion principle*: https://en.wikipedia.org/wiki/Inclusion%E2%80%93exclusion_principle
- Wikipedia — *Boole's inequality*: https://en.wikipedia.org/wiki/Boole%27s_inequality

## Liên kết
[[Axioms of Probability]] · [[Matching Problem]] · [[Birthday Problem]] · [[Independence]] · [[Poisson Paradigm]] · [[Prob&Stats]]
