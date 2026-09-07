---
tags: [probability, distribution, continuous]
status: evergreen
---
# Uniform Distribution

> Phân phối đơn giản nhất, nhưng cũng là **phân phối gốc**: mọi phân phối khác sinh ra được từ nó. Đó là nội dung của *universality of the uniform*.

## 1. Định nghĩa

$U \sim \text{Unif}(a,b)$:
$$f(x) = \frac{1}{b-a} \text{ với } a\le x\le b, \qquad F(x) = \frac{x-a}{b-a}$$
$$E[U] = \frac{a+b}{2}, \qquad \text{Var}(U) = \frac{(b-a)^2}{12}$$

Trường hợp chuẩn $\text{Unif}(0,1)$: $E=1/2$, $\text{Var}=1/12$.

**Chứng minh variance** (Blitzstein, Lecture 12): dùng [[LOTUS]] tính $E[U^2] = \int_0^1 x^2 dx = 1/3$, rồi $\text{Var} = 1/3 - 1/4 = 1/12$.

## 2. Location–scale

Nếu $U\sim\text{Unif}(0,1)$ thì $a + (b-a)U \sim \text{Unif}(a,b)$. Nên chỉ cần hiểu $\text{Unif}(0,1)$, phần còn lại là biến đổi tuyến tính. Uniform là họ **location–scale** — giống Normal, khác Poisson.

## 3. Universality of the Uniform — kết quả quan trọng nhất

Cho $F$ là CDF liên tục, tăng ngặt:

| Chiều | Phát biểu | Dùng để |
|---|---|---|
| **Thuận** | $U\sim\text{Unif}(0,1) \Rightarrow F^{-1}(U) \sim F$ | **Sinh mẫu** từ phân phối bất kỳ |
| **Nghịch** | $X \sim F \Rightarrow F(X)\sim\text{Unif}(0,1)$ | Kiểm định goodness-of-fit, PIT, p-value |

Chiều thuận là **inverse transform sampling**: mọi bộ sinh số ngẫu nhiên chỉ cần sinh $\text{Unif}(0,1)$, phần còn lại là biến đổi.

Ví dụ: muốn $X\sim\text{Expo}(\lambda)$, giải $F(x)=1-e^{-\lambda x}=u$ → $x = -\frac{1}{\lambda}\ln(1-u)$.

Chiều nghịch giải thích vì sao **p-value có phân phối đều dưới giả thuyết không** — nền tảng của mọi kiểm định.

## 4. Order statistics

Nếu $U_1,\dots,U_n$ iid $\text{Unif}(0,1)$ thì thứ tự thống kê thứ $k$:
$$U_{(k)} \sim \text{Beta}(k, n-k+1), \qquad E[U_{(k)}] = \frac{k}{n+1}$$

Trực giác đẹp: $n$ điểm ngẫu nhiên chia đoạn $[0,1]$ thành $n+1$ mảnh, kỳ vọng mỗi mảnh dài $\frac{1}{n+1}$.

## 5. Cạm bẫy

1. **"Chọn ngẫu nhiên" không tự động nghĩa là uniform.** Bertrand's paradox: cùng một bài toán hình học, ba cách "chọn dây cung ngẫu nhiên" cho ba đáp án khác nhau → [[Naive Definition of Probability]].
2. **Không tồn tại uniform trên tập vô hạn không bị chặn.** Không có "số thực ngẫu nhiên đều trên $\mathbb{R}$", cũng không có "số nguyên dương ngẫu nhiên đều".
3. **Biến đổi phi tuyến không bảo toàn tính đều.** $U$ đều thì $U^2$ **không** đều. Nhớ Jacobian → [[Discrete vs Continuous]].
4. **PRNG không phải RNG thật.** `random.random()` là tất định; đủ cho mô phỏng, **không đủ cho mật mã** (dùng `secrets` / `os.urandom`).
5. **Inverse transform cần $F^{-1}$ ở dạng đóng.** Với Normal thì không có → dùng Box–Muller hoặc thuật toán chuyên dụng.
6. **Nhầm uniform rời rạc với liên tục.** `randint` và `uniform` khác nhau ở biên.

## 6. Checklist
- [ ] "Ngẫu nhiên đều" theo tham số nào? (góc? bán kính? diện tích?)
- [ ] Miền có bị chặn không?
- [ ] Nếu sinh mẫu: $F^{-1}$ có tính được không?
- [ ] Nếu biến đổi biến: đã tính Jacobian chưa?
- [ ] Cần ngẫu nhiên an toàn mật mã không?
- [ ] Nếu kiểm tra mô hình: histogram của $F(x_i)$ có phẳng không? (PIT check)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.random.Generator` | PRNG hiện đại (PCG64) | https://numpy.org/doc/stable/reference/random/generator.html |
| `scipy.stats.uniform` | pdf/cdf/ppf | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.uniform.html |
| `secrets` (Python) | Ngẫu nhiên an toàn mật mã | https://docs.python.org/3/library/secrets.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §5.3: http://probabilitybook.net
- Stat 110 Lecture 12 (*The Uniform*, *Uniform Universality*): https://www.youtube.com/watch?v=Tci---bVs60
- Wikipedia — *Continuous uniform distribution*: https://en.wikipedia.org/wiki/Continuous_uniform_distribution
- Wikipedia — *Inverse transform sampling*: https://en.wikipedia.org/wiki/Inverse_transform_sampling
- Wikipedia — *Probability integral transform*: https://en.wikipedia.org/wiki/Probability_integral_transform

## Liên kết
[[CDF]] · [[Discrete vs Continuous]] · [[Normal Distribution]] · [[Exponential Distribution]] · [[LOTUS]] · [[Prob&Stats]]
