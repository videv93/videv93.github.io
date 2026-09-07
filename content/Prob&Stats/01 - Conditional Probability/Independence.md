---
tags: [probability, conditioning]
status: evergreen
---
# Independence

> Độc lập là một **giả định mô hình hoá**, không phải một tính chất bạn quan sát được. Và "độc lập đôi một" yếu hơn "độc lập" rất nhiều — đây là chỗ hầu hết mọi người sai.

## 1. Định nghĩa

$A$ và $B$ **độc lập** nếu
$$P(A \cap B) = P(A)\,P(B).$$

Tương đương (khi $P(B)>0$): $P(A\mid B) = P(A)$ — *biết $B$ không thay đổi gì về $A$*.

Định nghĩa qua tích tốt hơn vì nó đối xứng và vẫn dùng được khi $P(B)=0$.

## 2. Ba event trở lên — bẫy lớn nhất

$A, B, C$ độc lập (mutually independent) đòi hỏi **cả bốn** điều kiện:
$$P(AB)=P(A)P(B),\quad P(AC)=P(A)P(C),\quad P(BC)=P(B)P(C),$$
$$P(ABC) = P(A)P(B)P(C).$$

Ba điều kiện đầu = **pairwise independence**. Chúng **không** kéo theo điều kiện thứ tư.

**Phản ví dụ kinh điển.** Tung 2 đồng xu cân. $A$ = đồng 1 ngửa, $B$ = đồng 2 ngửa, $C$ = hai đồng giống nhau. Mỗi cặp độc lập ($1/4 = 1/2\times1/2$), nhưng $P(ABC) = 1/4 \neq 1/8$. Biết $A$ và $B$ thì $C$ được xác định hoàn toàn.

Với $n$ event cần $2^n - n - 1$ điều kiện.

## 3. Độc lập vs disjoint — hai thứ *đối lập*

| | Disjoint | Independent |
|---|---|---|
| Định nghĩa | $P(A\cap B) = 0$ | $P(A\cap B)=P(A)P(B)$ |
| Biết $A$ xảy ra | $B$ chắc chắn **không** xảy ra | Không biết thêm gì về $B$ |
| Cùng đúng khi nào | Chỉ khi $P(A)=0$ hoặc $P(B)=0$ | |

Nếu $A,B$ disjoint và cùng có xác suất dương thì chúng **phụ thuộc mạnh nhất có thể**.

## 4. Tính chất

- $A \perp B \Rightarrow A \perp B^c \Rightarrow A^c \perp B^c$.
- $A$ độc lập với chính nó $\iff P(A) \in \{0,1\}$.
- Với biến ngẫu nhiên: $X \perp Y$ nếu $P(X\le x, Y\le y) = P(X\le x)P(Y\le y)$ với **mọi** $x,y$ → [[Independence of Random Variables]].
- **Uncorrelated ≠ independent.** $\text{Cov}(X,Y)=0$ yếu hơn nhiều (ngoại lệ: joint Normal).

## 5. Cạm bẫy

1. **Giả định độc lập vì "có vẻ chẳng liên quan".** Trong tài chính, các khoản vay tưởng độc lập hoá ra cùng phụ thuộc một yếu tố vĩ mô — đây là cơ chế của khủng hoảng 2008.
2. **Nhầm pairwise với mutual** (§2).
3. **Nhân xác suất khi lấy mẫu không hoàn lại.** Các lần rút bài **không** độc lập → [[Hypergeometric]], không phải Binomial.
4. **Nhầm độc lập với disjoint** (§3).
5. **Cho rằng độc lập được bảo toàn khi conditioning.** Sai — xem [[Conditional Independence]].
6. **Uncorrelated ⇒ independent.** Ví dụ: $X \sim N(0,1)$, $Y = X^2$ — tương quan 0, phụ thuộc hoàn toàn.

## 6. Checklist
- [ ] Độc lập ở đây là **giả định** hay đã **kiểm chứng**?
- [ ] Có yếu tố chung nào (confounder, thời gian, không gian) ảnh hưởng cả hai không?
- [ ] Nếu ≥3 event: đã kiểm tra điều kiện $n$-way chưa, hay chỉ pairwise?
- [ ] Lấy mẫu có hoàn lại hay không?
- [ ] Đang nhầm với disjoint không?
- [ ] Nếu kết quả cuối phụ thuộc mạnh vào giả định độc lập, có thử phá giả định để xem hậu quả không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.5: http://probabilitybook.net
- Stat 110 Lecture 4 (*Independence*, ví dụ 3 event): https://www.youtube.com/watch?v=P7NE4WF8j-Q
- Wikipedia — *Independence (probability theory)*: https://en.wikipedia.org/wiki/Independence_(probability_theory)
- Wikipedia — *Pairwise independence*: https://en.wikipedia.org/wiki/Pairwise_independence

## Liên kết
[[Conditional Independence]] · [[Conditional Probability]] · [[Independence of Random Variables]] · [[Variance]] · [[Prob&Stats]]
