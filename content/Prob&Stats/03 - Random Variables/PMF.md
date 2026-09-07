---
tags: [probability, random-variable, distribution]
status: evergreen
---
# PMF

> Probability Mass Function — bảng liệt kê "mỗi giá trị nặng bao nhiêu". Với biến rời rạc, PMF là **mô tả đầy đủ**: biết PMF là biết mọi thứ về phân phối.

## 1. Định nghĩa

Với $X$ rời rạc nhận giá trị trong $\{x_1, x_2, \dots\}$:
$$p_X(x) = P(X = x)$$

Hai điều kiện đặc trưng — bất kỳ hàm nào thoả hai điều này đều là PMF hợp lệ:
1. $p_X(x) \ge 0$ với mọi $x$
2. $\sum_{x} p_X(x) = 1$

Và mọi xác suất đều tính được từ đó: $P(X \in A) = \sum_{x \in A} p_X(x)$.

## 2. PMF của các phân phối chính

| Phân phối | PMF | Giá đỡ (support) |
|---|---|---|
| Bernoulli($p$) | $p^x(1-p)^{1-x}$ | $\{0,1\}$ |
| Binomial($n,p$) | $\binom{n}{k}p^k(1-p)^{n-k}$ | $\{0,\dots,n\}$ |
| Geometric($p$) | $(1-p)^{k}p$ | $\{0,1,2,\dots\}$ |
| Hypergeometric | $\dfrac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$ | $\max(0,n-N+K)\le k \le \min(n,K)$ |
| Poisson($\lambda$) | $\dfrac{e^{-\lambda}\lambda^k}{k!}$ | $\{0,1,2,\dots\}$ |

Chi tiết → [[Distribution Cheatsheet]].

## 3. Tổng của hai RV rời rạc — convolution

Nếu $X \perp Y$ rời rạc:
$$P(X+Y = k) = \sum_{j} P(X = j)\,P(Y = k-j)$$

Đây là **convolution**. Blitzstein dùng nó trong Lecture 8 để chứng minh $\text{Bin}(n,p) + \text{Bin}(m,p) = \text{Bin}(n+m,p)$ — nhưng ông cũng chỉ ra rằng **story proof** cho kết quả này ngắn hơn nhiều: gộp $n$ và $m$ phép thử Bernoulli lại thành $n+m$ phép thử. → [[Story Proofs]]

Với các bài tổng phức tạp hơn, [[Moment Generating Functions]] thường gọn hơn convolution.

## 4. PMF vs PDF vs CDF

| | Rời rạc | Liên tục |
|---|---|---|
| Hàm mật độ | **PMF** $p_X(x) = P(X=x)$ | **PDF** $f_X(x)$, và $P(X=x) = 0$ |
| Giá trị | Là xác suất, $\le 1$ | **Không** phải xác suất, có thể $> 1$ |
| Tích luỹ | $F(x) = \sum_{t\le x} p(t)$ | $F(x) = \int_{-\infty}^x f(t)dt$ |
| Dùng chung | [[CDF]] — định nghĩa cho **mọi** RV | |

Chi tiết → [[Discrete vs Continuous]].

## 5. Cạm bẫy

1. **Quên kiểm tra tổng bằng 1.** Cách bắt lỗi nhanh nhất khi tự dẫn công thức.
2. **Nhầm support.** Hypergeometric có support phụ thuộc tham số; Geometric có hai quy ước (đếm số thất bại **trước** thành công đầu, hay đếm cả lần thành công).
3. **Dùng PMF cho biến liên tục** → $P(X=x)=0$ với mọi $x$, không mô tả được gì.
4. **Nhân PMF của $X$ và $Y$ khi chúng không độc lập.** Joint PMF chỉ tách được khi độc lập → [[Independence of Random Variables]].
5. **Nhầm PMF với histogram của dữ liệu.** PMF là mô hình, histogram là ước lượng thực nghiệm của nó.
6. **Convolution với chỉ số ngoài support** — nhớ chặn $j$ trong miền hợp lệ của cả $X$ và $Y$.

## 6. Checklist
- [ ] $\sum_x p(x) = 1$ chưa?
- [ ] $p(x) \ge 0$ với mọi $x$ chứ?
- [ ] Support đã ghi rõ chưa? (kể cả các trường hợp biên)
- [ ] Quy ước nào cho Geometric/Negative Binomial? (đã tuyên bố chưa)
- [ ] Nếu tính tổng hai RV: chúng độc lập chứ? Có cách nào ngắn hơn convolution không?
- [ ] Đã đối chiếu với `scipy.stats` bằng vài giá trị chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.stats.<dist>.pmf` | Tính & kiểm chứng PMF | https://docs.scipy.org/doc/scipy/reference/stats.html |
| `numpy.convolve` | Tính convolution PMF trực tiếp | https://numpy.org/doc/stable/reference/generated/numpy.convolve.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §3.2: http://probabilitybook.net
- Stat 110 Lecture 8 (*PMF*, *Convolution*): https://www.youtube.com/watch?v=k2BB0p8byGA
- Wikipedia — *Probability mass function*: https://en.wikipedia.org/wiki/Probability_mass_function

## Liên kết
[[Random Variable]] · [[CDF]] · [[Discrete vs Continuous]] · [[Distribution Cheatsheet]] · [[Moment Generating Functions]] · [[Prob&Stats]]
