---
tags: [probability, expectation, technique]
status: evergreen
---
# Indicator Random Variables

> Cây cầu nối xác suất và kỳ vọng: $E[I_A] = P(A)$. Một mẹo đơn giản đến mức đáng ngờ, nhưng giải được những bài mà tính trực tiếp là bất khả thi.

## 1. Định nghĩa

$$I_A(s) = \begin{cases} 1 & s \in A\\ 0 & s\notin A\end{cases}$$

Ba đẳng thức cơ bản:
$$E[I_A] = P(A), \qquad I_A^2 = I_A, \qquad E[I_A^2] = P(A)$$

$I_A \sim \text{Bern}(P(A))$, nên $\text{Var}(I_A) = P(A)(1-P(A))$.

## 2. Đại số của indicator

| Biểu thức | Bằng |
|---|---|
| $I_{A^c}$ | $1 - I_A$ |
| $I_{A\cap B}$ | $I_A I_B$ |
| $I_{A\cup B}$ | $I_A + I_B - I_AI_B$ |
| $I_{A\cup B\cup C}$ | $1-(1-I_A)(1-I_B)(1-I_C)$ |

Lấy kỳ vọng dòng cuối rồi khai triển → **inclusion–exclusion rơi ra** ngay. Đây là chứng minh gọn nhất cho công thức đó → [[Properties of Probability]].

## 3. Kỹ thuật lõi: đếm bằng tổng indicator

Muốn tính $E[X]$ với $X$ = "số lần chuyện gì đó xảy ra":

1. Xác định các cơ hội $A_1,\dots,A_n$ để chuyện đó xảy ra.
2. Viết $X = \sum_j I_{A_j}$.
3. $E[X] = \sum_j P(A_j)$ — theo [[Linearity of Expectation]].

**Bước 3 không cần các $A_j$ độc lập.** Đó là toàn bộ giá trị của kỹ thuật này.

## 4. Ví dụ

| Bài | Indicator | $E[X]$ |
|---|---|---|
| Số Át trong 5 lá | $I_j$ = lá $j$ là Át | $5\cdot\frac{4}{52}$ |
| Số cặp trùng sinh nhật | $I_{ij}$ = $i,j$ trùng | $\binom{n}{2}\frac{1}{365}$ |
| Số fixed point hoán vị | $I_j$ = vị trí $j$ khớp | $n\cdot\frac1n = 1$ |
| Số cặp kề nhau trong xáo bài | $I_j$ = vị trí $j,j+1$ liền nhau | $(n-1)p$ |
| Số tam giác trong đồ thị ngẫu nhiên $G(n,p)$ | $I_T$ mỗi bộ ba đỉnh | $\binom{n}{3}p^3$ |

## 5. Tính variance với indicator

Khó hơn, vì cần covariance:
$$\text{Var}\!\left(\sum_j I_j\right) = \sum_j \text{Var}(I_j) + 2\sum_{i<j}\text{Cov}(I_i,I_j)$$
với $\text{Cov}(I_i,I_j) = P(A_i\cap A_j) - P(A_i)P(A_j)$.

Nếu độc lập, các covariance bằng 0 → cộng thẳng. Nếu không, phải tính $P(A_i\cap A_j)$ — **đây mới là chỗ tốn công**, và là lý do kỳ vọng dễ hơn phương sai rất nhiều. → [[Variance]]

## 6. Ứng dụng nâng cao

- **Fundamental bridge**: mọi câu hỏi xác suất viết lại được thành câu hỏi kỳ vọng, và ngược lại.
- **Probabilistic method** (Erdős): muốn chứng minh tồn tại một đối tượng có tính chất $P$, chứng minh $E[\#\text{đối tượng có } P] > 0$.
- **First moment method**: $P(X \ge 1) \le E[X]$ (Markov) — chặn trên cho xác suất tồn tại.
- **Second moment method**: dùng cả variance để chặn dưới $P(X>0)$.
- Là bước đầu tiên của [[Poisson Paradigm]].

## 7. Cạm bẫy

1. **Nghĩ rằng cần độc lập.** Không cần — đây là điểm mấu chốt, nhưng người mới luôn ngần ngại.
2. **Đếm sai số cơ hội.** $\binom{n}{2}$ cặp chứ không phải $n$; $n-1$ vị trí kề chứ không phải $n$.
3. **Áp linearity cho variance** mà quên covariance.
4. **Nhầm $E[X]$ với $P(X\ge1)$.** $E[X]=1$ không có nghĩa gần chắc chắn có ít nhất một.
5. **Quên $I^2 = I$** — mẹo tính nhanh moment bậc hai của Bernoulli.
6. **Chọn indicator quá thô** (một indicator cho toàn bộ sự kiện) → không phân rã được gì.

## 8. Checklist
- [ ] Đại lượng cần tính có phải là **số đếm** không?
- [ ] Đã liệt kê đúng tập các "cơ hội" chưa?
- [ ] $P(A_j)$ có tính được bằng đối xứng không?
- [ ] Chỉ cần $E[X]$ hay cần cả variance? (nếu cần variance → phải tính $P(A_i\cap A_j)$)
- [ ] Nếu cần $P(X=0)$ → cân nhắc [[Poisson Paradigm]] với $\lambda=E[X]$
- [ ] Đã sanity check bằng $n$ nhỏ chưa?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.4: http://probabilitybook.net
- Stat 110 Lecture 9 (*Indicator Random Variables*): https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Indicator function*: https://en.wikipedia.org/wiki/Indicator_function
- Alon & Spencer — *The Probabilistic Method*: https://www.wiley.com/en-us/The+Probabilistic+Method%2C+4th+Edition-p-9781119061953

## Liên kết
[[Linearity of Expectation]] · [[Expectation]] · [[Variance]] · [[Poisson Paradigm]] · [[Properties of Probability]] · [[Story Proofs]] · [[Prob&Stats]]
