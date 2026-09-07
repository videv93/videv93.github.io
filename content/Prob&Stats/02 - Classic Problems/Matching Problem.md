---
tags: [probability, classic-problem]
status: evergreen
---
# Matching Problem

> Xáo $n$ lá bài đã đánh số rồi lật lần lượt: xác suất có **ít nhất một** lá đúng vị trí là $\approx 1 - 1/e \approx 63\%$ — và con số này gần như **không đổi** dù $n$ là 10 hay 10 triệu.

## 1. Bài toán

Còn gọi là *problème des rencontres* (de Montmort, 1708). Một hoán vị ngẫu nhiên của $\{1,\dots,n\}$; một **fixed point** (match) là vị trí $i$ với $\sigma(i)=i$.

Gọi $A_i$ = "vị trí $i$ khớp". Ta cần $P(\bigcup A_i)$.

## 2. Giải bằng inclusion–exclusion

$$P(A_{i_1}\cap\cdots\cap A_{i_k}) = \frac{(n-k)!}{n!}$$

Có $\binom{n}{k}$ cách chọn $k$ vị trí, nên (→ [[Properties of Probability]]):

$$P\!\left(\bigcup_{i} A_i\right) = \sum_{k=1}^{n}(-1)^{k+1}\binom{n}{k}\frac{(n-k)!}{n!} = \sum_{k=1}^{n}\frac{(-1)^{k+1}}{k!} \longrightarrow 1 - e^{-1}$$

vì $\sum_{k\ge0}\frac{(-1)^k}{k!} = e^{-1}$.

| $n$ | $P(\ge 1 \text{ match})$ |
|---|---|
| 2 | 0.5000 |
| 3 | 0.6667 |
| 4 | 0.6250 |
| 5 | 0.6333 |
| 10 | 0.6321 |
| $\infty$ | 0.632121 |

Hội tụ **cực nhanh** — từ $n=5$ đã chính xác đến 3 chữ số. Đây là ví dụ đẹp nhất cho thấy inclusion–exclusion đầy đủ vẫn tính được **khi có đối xứng**.

## 3. Số match — phân phối Poisson

Gọi $X$ = số fixed point. Dùng [[Indicator Random Variables]]:
$$X = \sum_{i=1}^n I_i, \qquad E[X] = n \cdot \frac{1}{n} = 1$$

Một dòng, không cần độc lập → [[Linearity of Expectation]]. Thêm nữa $\text{Var}(X)=1$, và $X \xrightarrow{d} \text{Pois}(1)$ khi $n\to\infty$ — nên $P(X=0)\approx e^{-1}$, khớp §2. Đây là ví dụ chuẩn của [[Poisson Paradigm]]: các $I_i$ phụ thuộc nhẹ nhưng vẫn cho Poisson.

**Derangement** = hoán vị không có fixed point nào. Số derangement $D_n = n!\sum_{k=0}^n \frac{(-1)^k}{k!} \approx n!/e$.

## 4. Vì sao đáng nhớ

- Là **bài mẫu** cho inclusion–exclusion có đối xứng.
- Cho thấy [[Linearity of Expectation]] hoạt động **bất kể phụ thuộc** — các $I_i$ rõ ràng phụ thuộc nhau ($n-1$ match ⟹ $n$ match).
- Xuất hiện ở đời thực: bốc thăm Secret Santa (xác suất có người bốc trúng tên mình ≈ 63%), kiểm định ghép cặp mù, hashing.

## 5. Cạm bẫy

1. **Nghĩ rằng $n$ lớn thì xác suất → 1.** Sai — nó → $1-1/e$. Nhiều lá hơn nhưng mỗi lá khó khớp hơn, hai hiệu ứng triệt tiêu.
2. **Coi các $I_i$ là độc lập** rồi tính $P(\text{không match}) = (1-1/n)^n$. Ra $\approx e^{-1}$ — đúng số nhưng **sai lập luận**; may mắn trùng.
3. **Quên đổi dấu** trong inclusion–exclusion.
4. **Nhầm $E[X]=1$ với "thường có đúng 1 match".** $P(X=0)\approx 0.37$ cũng rất lớn.
5. Bốc thăm Secret Santa thực tế thường **bắt buộc derangement**, làm phân phối khác hẳn.

## 6. Checklist
- [ ] Bài có đối xứng để rút gọn inclusion–exclusion không?
- [ ] Có thể viết đại lượng cần tính thành tổng indicator không?
- [ ] Nếu chỉ cần $E[X]$ → dùng linearity, bỏ qua phụ thuộc.
- [ ] Nếu cần $P(X=0)$ → thử xấp xỉ Poisson với $\lambda = E[X]$.
- [ ] Đã kiểm tra $n$ nhỏ ($n=2,3$) bằng liệt kê tay chưa?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.6, §4.4: http://probabilitybook.net
- Stat 110 Lecture 3 (*The Matching Problem*): https://www.youtube.com/watch?v=LZ5Wergp_PA
- Wikipedia — *Derangement*: https://en.wikipedia.org/wiki/Derangement
- Wikipedia — *Rencontres numbers*: https://en.wikipedia.org/wiki/Rencontres_numbers
- OEIS A000166 (số derangement): https://oeis.org/A000166

## Liên kết
[[Properties of Probability]] · [[Indicator Random Variables]] · [[Linearity of Expectation]] · [[Poisson Paradigm]] · [[Prob&Stats]]
