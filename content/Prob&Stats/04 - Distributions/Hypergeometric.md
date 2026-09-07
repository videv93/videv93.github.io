---
tags: [probability, distribution, discrete]
status: evergreen
---
# Hypergeometric

> Binomial khi lấy mẫu **không hoàn lại**. Các phép thử không còn độc lập — nhưng kỳ vọng vẫn giống hệt Binomial, và đó là bài học quan trọng nhất từ phân phối này.

## 1. Story

Hộp có $N$ vật, trong đó $K$ vật "thành công". Lấy ra $n$ vật **không hoàn lại**. $X$ = số vật thành công lấy được.

$$P(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$$

Tử số: chọn $k$ từ nhóm thành công và $n-k$ từ nhóm còn lại. Mẫu số: mọi cách chọn $n$ vật.

Support: $\max(0, n-(N-K)) \le k \le \min(n, K)$ — hay bị quên.

Tổng PMF bằng 1 chính là **Vandermonde's identity** → [[Story Proofs]].

## 2. Kỳ vọng và phương sai

Đặt $p = K/N$:
$$E[X] = n\frac{K}{N} = np, \qquad \text{Var}(X) = np(1-p)\cdot\underbrace{\frac{N-n}{N-1}}_{\text{finite population correction}}$$

**Kỳ vọng giống hệt Binomial**, dù các lần rút phụ thuộc nhau — vì [[Linearity of Expectation]] không cần độc lập. Viết $X=\sum_{i=1}^n I_i$ với $I_i$ = "vật thứ $i$ là thành công"; theo đối xứng $P(I_i=1)=K/N$ với **mọi** $i$, kể cả lần rút cuối.

Đó là một trong những kết quả phản trực giác đẹp nhất: xác suất lá bài thứ 7 là Át bằng đúng xác suất lá đầu tiên là Át.

Phương sai thì **nhỏ hơn** Binomial (hệ số $\frac{N-n}{N-1} < 1$): lấy không hoàn lại làm kết quả bớt biến động. Khi $n=N$ thì variance = 0 (lấy hết thì biết chắc).

## 3. Khi nào Binomial thay được

Khi $n \ll N$, hệ số hiệu chỉnh $\approx 1$ và Hypergeometric $\approx$ Binomial. Quy tắc **10%**: dùng Binomial nếu $n \le 0.1N$.

| $N$ | $n$ | Sai khác đáng kể? |
|---|---|---|
| 1.000.000 | 100 | Không |
| 100 | 50 | Có, rất đáng kể |
| 52 (bộ bài) | 5 | Có |

## 4. Ứng dụng

- **Bài tây**: số Át trong 5 lá — $\text{HGeom}(4, 48, 5)$ → [[Poker Probability]]
- **Xổ số**: số trùng khớp
- **Kiểm tra chất lượng lô hàng** (acceptance sampling)
- **Fisher's exact test**: kiểm định bảng $2\times2$ dựa trực tiếp trên Hypergeometric
- **Gene set enrichment analysis** trong sinh tin học
- **Capture–recapture**: ước lượng cỡ quần thể động vật hoang dã

## 5. Cạm bẫy

1. **Dùng Binomial cho quần thể nhỏ.** Bỏ qua finite population correction → khoảng tin cậy rộng sai.
2. **Quên support bị chặn hai đầu.** Nếu $n > N-K$ thì $k$ không thể nhỏ hơn $n-(N-K)$.
3. **Nhầm vai trò của $n$ và $K$.** Chúng đối xứng trong công thức ($\text{HGeom}$ có tính đối xứng: đổi vai trò "lấy mẫu" và "nhóm thành công" cho nhau vẫn ra cùng phân phối) nhưng dễ điền nhầm tham số vào thư viện.
4. **Cho rằng các lần rút "ngày càng khó đoán".** Theo đối xứng, mọi vị trí đều có cùng xác suất biên.
5. **Tính $\binom{N}{n}$ trực tiếp với $N$ lớn** → tràn số; dùng `scipy.stats.hypergeom` hoặc log-gamma.

## 6. Checklist
- [ ] Lấy mẫu **không** hoàn lại chứ?
- [ ] Quần thể hữu hạn và biết $N$, $K$ chứ?
- [ ] $n / N$ bằng bao nhiêu? Trên 10% → không được dùng Binomial
- [ ] Support đã tính đúng hai biên chưa?
- [ ] Nếu cần variance: đã nhân $\frac{N-n}{N-1}$ chưa?
- [ ] Tham số truyền vào thư viện đúng thứ tự chưa? (scipy dùng `hypergeom(M=N, n=K, N=n)` — dễ nhầm)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.hypergeom` | Chú ý quy ước tên tham số | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.hypergeom.html |
| `scipy.stats.fisher_exact` | Fisher's exact test | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.fisher_exact.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §3.4: http://probabilitybook.net
- Stat 110 Lecture 9 (*Hypergeometric Example*): https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Hypergeometric distribution*: https://en.wikipedia.org/wiki/Hypergeometric_distribution
- Wikipedia — *Vandermonde's identity*: https://en.wikipedia.org/wiki/Vandermonde%27s_identity

## Liên kết
[[Bernoulli & Binomial]] · [[Linearity of Expectation]] · [[Counting & Combinatorics]] · [[Story Proofs]] · [[Poker Probability]] · [[Prob&Stats]]
