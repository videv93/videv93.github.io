---
tags: [probability, random-variable, distribution]
status: evergreen
---
# CDF

> Cumulative Distribution Function — thứ duy nhất định nghĩa được cho **mọi** random variable, rời rạc hay liên tục hay lai. Khi bí, quay về CDF.

## 1. Định nghĩa

$$F_X(x) = P(X \le x), \qquad x \in \mathbb{R}$$

Không cần biết $X$ rời rạc hay liên tục. Đây là ưu thế lớn nhất của CDF so với [[PMF]]/PDF.

## 2. Ba tính chất đặc trưng

Một hàm $F$ là CDF của một RV nào đó **khi và chỉ khi**:

1. **Không giảm**: $x \le y \Rightarrow F(x) \le F(y)$
2. **Giới hạn**: $\lim_{x\to-\infty}F(x) = 0$, $\lim_{x\to+\infty}F(x) = 1$
3. **Liên tục phải**: $\lim_{t \downarrow x} F(t) = F(x)$

Điều kiện 3 là chỗ hay quên: CDF liên tục phải, **không** liên tục trái. Dấu $\le$ trong định nghĩa quyết định điều này — bước nhảy ở $x_0$ có giá trị $F(x_0)$ ở *đỉnh* bước.

## 3. Đọc gì từ CDF

| Cần | Công thức |
|---|---|
| $P(a < X \le b)$ | $F(b) - F(a)$ |
| $P(X > x)$ | $1 - F(x)$ (survival function) |
| $P(X = x)$ | $F(x) - F(x^-)$ = **độ cao bước nhảy** |
| PDF (nếu liên tục) | $f(x) = F'(x)$ |
| Quantile / median | $F^{-1}(q)$ |

Điểm hay của công thức thứ ba: CDF cho biết luôn $X$ có phần rời rạc hay không. **Bước nhảy = khối lượng xác suất tại điểm đó.** Không có bước nhảy nào → $X$ liên tục.

## 4. Hình dạng theo loại biến

| Loại | CDF trông thế nào |
|---|---|
| Rời rạc | Hàm bậc thang, nhảy tại mỗi điểm của support |
| Liên tục | Liên tục, tăng trơn |
| Lai (mixed) | Vừa dốc vừa có bước nhảy — ví dụ: thời gian chờ có thể bằng 0 với xác suất dương |

Trường hợp lai là lý do nên học CDF nghiêm túc: PMF và PDF đều không mô tả nổi nó, CDF thì có.

## 5. Ứng dụng: universality of the uniform

Nếu $F$ liên tục và tăng ngặt:
- $F(X) \sim \text{Unif}(0,1)$ với mọi $X$ có CDF $F$
- Ngược lại, $F^{-1}(U) \sim F$ khi $U\sim\text{Unif}(0,1)$

Đây là cơ sở của **inverse transform sampling** — cách sinh mẫu từ bất kỳ phân phối nào chỉ với một bộ sinh số ngẫu nhiên đều. Chi tiết → [[Uniform Distribution]].

## 6. Cạm bẫy

1. **Nhầm $P(X < x)$ với $P(X \le x)$.** Với biến rời rạc hai cái khác nhau; với liên tục thì bằng nhau. Nguồn lỗi off-by-one kinh điển.
2. **Đạo hàm CDF của biến rời rạc** để tìm PDF — không tồn tại.
3. **Quên rằng CDF liên tục phải**, dẫn đến sai giá trị ngay tại điểm nhảy.
4. **Cho rằng $F$ khả nghịch.** Với biến rời rạc hoặc có đoạn phẳng thì không; cần **generalized inverse** $F^{-1}(q) = \inf\{x: F(x)\ge q\}$.
5. **Nhầm CDF với empirical CDF.** ECDF là ước lượng từ dữ liệu; Glivenko–Cantelli đảm bảo ECDF hội tụ đều về CDF → [[Law of Large Numbers]].
6. **Dùng CDF cho biến nhiều chiều mà quên rằng joint CDF cần điều kiện mạnh hơn** (không chỉ đơn điệu theo từng biến).

## 7. Checklist
- [ ] Hàm này có không giảm không?
- [ ] Giới hạn ở $\pm\infty$ có đúng 0 và 1 không?
- [ ] Liên tục phải chưa? (giá trị tại điểm nhảy là đỉnh trên)
- [ ] Có bước nhảy nào không? → có phần rời rạc
- [ ] Đang cần $\le$ hay $<$?
- [ ] Nếu cần sinh mẫu: $F^{-1}$ có tính được ở dạng đóng không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.<dist>.cdf` / `.ppf` | CDF và nghịch đảo (quantile) | https://docs.scipy.org/doc/scipy/reference/stats.html |
| `statsmodels` ECDF | CDF thực nghiệm từ dữ liệu | https://www.statsmodels.org/stable/generated/statsmodels.distributions.empirical_distribution.ECDF.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §3.6, §5.3: http://probabilitybook.net
- Stat 110 Lecture 8 & 9 (*CDF*, *CDF Properties*): https://www.youtube.com/watch?v=k2BB0p8byGA
- Wikipedia — *Cumulative distribution function*: https://en.wikipedia.org/wiki/Cumulative_distribution_function
- Wikipedia — *Inverse transform sampling*: https://en.wikipedia.org/wiki/Inverse_transform_sampling

## Liên kết
[[PMF]] · [[Random Variable]] · [[Discrete vs Continuous]] · [[Uniform Distribution]] · [[Law of Large Numbers]] · [[Prob&Stats]]
