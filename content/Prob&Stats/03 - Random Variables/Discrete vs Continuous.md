---
tags: [probability, random-variable]
status: evergreen
---
# Discrete vs Continuous

> Chuyển từ rời rạc sang liên tục là chỗ nhiều người tưởng mình vẫn hiểu nhưng thực ra đã lạc. Quy tắc dịch: **tổng → tích phân, PMF → PDF** — nhưng PDF *không phải* xác suất.

## 1. Bảng dịch

| Khái niệm | Rời rạc | Liên tục |
|---|---|---|
| Mô tả | PMF $p(x) = P(X=x)$ | PDF $f(x)$ |
| Chuẩn hoá | $\sum_x p(x) = 1$ | $\int_{-\infty}^{\infty} f(x)\,dx = 1$ |
| Xác suất một điểm | $p(x)$, có thể $>0$ | $P(X=x) = 0$ **luôn** |
| Xác suất một khoảng | $\sum_{x\in[a,b]} p(x)$ | $\int_a^b f(x)\,dx$ |
| CDF | $\sum_{t\le x}p(t)$ | $\int_{-\infty}^x f(t)\,dt$ |
| Kỳ vọng | $\sum_x x\,p(x)$ | $\int x f(x)\,dx$ |
| LOTUS | $\sum_x g(x)p(x)$ | $\int g(x) f(x)\,dx$ |
| Giá trị hàm | $p(x) \le 1$ | $f(x)$ có thể $> 1$ |

Dòng cuối rất hay bị hiểu sai: $\text{Unif}(0, 0.5)$ có $f(x) = 2$. Không mâu thuẫn — **PDF là mật độ, không phải xác suất**. Chỉ tích phân của nó mới là xác suất.

## 2. Vì sao $P(X = x) = 0$

Với $X$ liên tục, mỗi giá trị cụ thể có xác suất 0, nhưng $P(X \in [0,1]) = 1$. Không nghịch lý — [[Axioms of Probability]] chỉ đòi cộng tính cho hợp **đếm được**, còn $[0,1]$ là hợp không đếm được của các điểm.

Hệ quả thực dụng: với biến liên tục, $P(X\le x) = P(X<x)$, nên các dấu $\le$ và $<$ dùng thay nhau thoải mái. **Với rời rạc thì không.**

Cách diễn giải PDF đúng: $f(x)\,dx \approx P(x < X < x + dx)$ — mật độ nhân độ rộng.

## 3. Trường hợp lai (mixed)

Tồn tại và gặp thường xuyên:
- Thời gian chờ ở quầy: bằng 0 với xác suất dương (không phải xếp hàng), liên tục ở phần còn lại.
- Số tiền bồi thường bảo hiểm: khối lượng tại 0, liên tục ở phần dương.
- Doanh thu mỗi người dùng: phần lớn = 0.

Chỉ [[CDF]] mô tả được các biến này — CDF vừa tăng trơn vừa có bước nhảy.

## 4. Cạm bẫy

1. **Nói "$f(x)$ là xác suất $X$ bằng $x$".** Sai. Nó là mật độ.
2. **Hoảng khi thấy $f(x) > 1$.** Hoàn toàn hợp lệ.
3. **Quên Jacobian khi đổi biến.** Nếu $Y = g(X)$ với $g$ đơn điệu khả vi: $f_Y(y) = f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|$. Bỏ quên $|\cdot|$ là lỗi phổ biến nhất trong bài đổi biến.
4. **Áp công thức rời rạc lên liên tục** (ví dụ tính $\sum$ thay vì $\int$ trong LOTUS).
5. **Dùng $\le$/$<$ bất cẩn với biến rời rạc.** $P(X\le 3) \neq P(X<3)$.
6. **Rời rạc hoá dữ liệu liên tục rồi quên rằng đã mất thông tin** (binning làm đổi kết quả kiểm định).
7. **Nghĩ mọi RV đều rời rạc hoặc liên tục.** Còn có mixed, và (về lý thuyết) cả singular.

## 5. Khi nào chọn mô hình nào

| Đại lượng | Nên mô hình |
|---|---|
| Đếm sự kiện | Rời rạc (Poisson, Binomial) |
| Thời gian, khoảng cách, tiền | Liên tục (Exponential, Normal, Lognormal) |
| Đếm nhưng số lớn | Xấp xỉ liên tục cho tiện (Normal) — nhớ **continuity correction** |
| Có khối lượng tại một điểm | Mixed / mô hình hai phần (hurdle model) |

## 6. Checklist
- [ ] $X$ nhận giá trị trong tập đếm được hay khoảng?
- [ ] Có giá trị nào có xác suất dương không? → mixed
- [ ] Đang dùng $\sum$ hay $\int$ — đúng loại chưa?
- [ ] Nếu đổi biến: đã nhân Jacobian và lấy trị tuyệt đối chưa?
- [ ] Nếu xấp xỉ rời rạc bằng Normal: đã cộng/trừ 0.5 (continuity correction) chưa?
- [ ] Support của biến mới sau khi biến đổi là gì?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.5: http://probabilitybook.net
- Stat 110 Lecture 12 (*Discrete vs. Continuous, the Uniform*): https://www.youtube.com/watch?v=Tci---bVs60
- Wikipedia — *Probability density function*: https://en.wikipedia.org/wiki/Probability_density_function
- Wikipedia — *Continuity correction*: https://en.wikipedia.org/wiki/Continuity_correction

## Liên kết
[[PMF]] · [[CDF]] · [[Uniform Distribution]] · [[Normal Distribution]] · [[LOTUS]] · [[Prob&Stats]]
