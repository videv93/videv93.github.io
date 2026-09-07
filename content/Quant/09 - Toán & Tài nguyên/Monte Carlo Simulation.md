---
tags: [quant, math, numerical]
status: growing
---
# Monte Carlo Simulation

> Khi lời giải giải tích không tồn tại hoặc quá phức tạp, mô phỏng nhiều lần rồi lấy trung bình. Nền tảng của nó chỉ là **luật số lớn**.

## 1. Vì sao nó hoạt động

Luật số lớn: lặp thí nghiệm đủ nhiều → trung bình mẫu hội tụ về kỳ vọng lý thuyết.

Sai số hội tụ theo $O(1/\sqrt{N})$ — chậm, nhưng **không phụ thuộc số chiều**. Đó là lý do Monte Carlo thắng finite differences khi bài toán nhiều chiều.

## 2. Ứng dụng trong vault này

### a) Định giá option (FTAP)

Theo [[Feynman-Kac and Risk-Neutral Pricing]], giá hợp lý = kỳ vọng risk-neutral đã chiết khấu của payoff.

Quy trình: mô phỏng nhiều path GBM dưới độ đo $\mathbb{Q}$ (drift = $r$) → tính payoff tại $T$ → chiết khấu → lấy trung bình.

Kết quả quan sát được: **khi số path tăng, sai số giá option → 0**, và giá hội tụ về đúng giá trị lý thuyết mà Black-Scholes cho. Không phải trùng hợp — hai khung tương đương.

### b) Hitting probability ([[Gambler's Ruin]])

Mô phỏng đến khi chạm ngưỡng mục tiêu (path xanh) hoặc phá sản (path đỏ), rồi:
$$P(\text{thành công}) \approx \frac{\text{số path xanh}}{\text{tổng số path}}$$

Cực kỳ hữu ích vì cho phép **tự do thay đổi payout, xác suất, vốn ban đầu** — thứ mà lời giải giải tích cổ điển (payout ±\$1) không cho.

### c) Kiểm chứng edge ([[Edge and Expected Value]])

Mô phỏng 100.000 path để xem P&L trung bình có dương không, dù từng path có thể lỗ.

### d) Kiểm chứng ergodicity ([[Ergodicity]])

Mô phỏng 1.000 wealth path và đếm **bao nhiêu %** kết thúc trên vốn ban đầu — chứ không phải chỉ nhìn trung bình. Đây là cách duy nhất thấy được sự khác biệt giữa ensemble average và time average.

### e) Xác nhận model ([[Ornstein-Uhlenbeck Process]])

Sinh path với tham số **đã biết** → chạy estimator (OLS/MLE) → so sánh. Nếu estimator không lấy lại được tham số đã biết, nó có lỗi.

## 3. Kỹ thuật giảm phương sai

Vì hội tụ chậm, các kỹ thuật này đáng giá:

| Kỹ thuật | Ý tưởng |
|---|---|
| **Antithetic variates** | Dùng cặp $(Z, -Z)$ để triệt tiêu một phần nhiễu |
| **Control variates** | Dùng một đại lượng liên quan có kỳ vọng đã biết để hiệu chỉnh |
| **Importance sampling** | Lấy mẫu nhiều hơn ở vùng quan trọng (tail) |
| **Quasi-Monte Carlo** | Dùng dãy low-discrepancy (Sobol, Halton) thay vì pseudo-random |
| **Stratified sampling** | Chia không gian mẫu thành tầng |

## 4. Sinh biến ngẫu nhiên

- **Inverse transform method** — nếu biết CDF nghịch đảo.
- **Box-Muller / Ziggurat** — sinh Gaussian.
- **Euler–Maruyama** — rời rạc hoá SDE. Xem [[Brownian Motion and SDEs]].
- **Davies-Harte** — mô phỏng fractional Brownian motion.

## 5. Cạm bẫy
- **Mô phỏng dưới sai độ đo.** Định giá phải dùng $\mathbb{Q}$ (drift = $r$), không phải $\mathbb{P}$.
- **Quá ít path.** Sai số $O(1/\sqrt{N})$ — muốn giảm sai số 10 lần cần 100 lần số path.
- **Discretization bias.** $\Delta t$ quá lớn gây sai lệch hệ thống, không giảm khi tăng $N$.
- **Seed cố định rồi kết luận.** Chạy lại với seed khác. Xem [[Gambler's Ruin]] — resample cho tham số hoàn toàn khác.
- **Nhầm độ chính xác Monte Carlo với độ đúng của model.** Bạn có thể mô phỏng cực chính xác một model sai.
- **Bỏ qua đường dẫn khi định giá path-dependent option.** Barrier, Asian option cần theo dõi cả path, không chỉ điểm cuối.

## 6. Checklist áp dụng
- [ ] Tôi mô phỏng dưới độ đo nào? Có đúng cho bài toán không?
- [ ] Bao nhiêu path? Sai số chuẩn của ước lượng là bao nhiêu?
- [ ] $\Delta t$ của tôi có đủ nhỏ không? Tôi đã test hội tụ theo $\Delta t$ chưa?
- [ ] Tôi đã chạy với nhiều seed khác nhau chưa?
- [ ] Có kỹ thuật giảm phương sai nào áp dụng được không?
- [ ] Tôi đang nhìn trung bình, hay nhìn **phân phối** kết quả? (Với non-ergodic, phải nhìn phân phối)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.random` Generator | Sinh số ngẫu nhiên hiện đại (PCG64) | https://numpy.org |
| `scipy.stats` | Phân phối, sampling | https://scipy.org |
| `scipy.stats.qmc` | Quasi-Monte Carlo (Sobol, Halton) | https://docs.scipy.org |
| The Gaussian Cookbook | Công thức mô phỏng quá trình ngẫu nhiên | https://gaussiancookbook.com · SSRN 5332011 |

## Tham khảo
- Glasserman, P. — *Monte Carlo Methods in Financial Engineering* (sách chuẩn)
- Quant Guild — *Why Monte Carlo Simulation Works*: https://youtu.be/-4sf43SLL3A
- Quant Guild — *How to Price Options with Monte Carlo Simulation*: https://youtu.be/2-VRYBKfoyE
- Quant Guild — *Control Variates for Variance Reduction*: https://youtu.be/q_oDJF14qD8
- Quant Guild — *Inverse Transform Method for Generating Random Variables*: https://youtu.be/x_O0nCtzEoY
- Quant Guild — *How to Simulate Fractional Brownian Motion (fBm) via Davies-Harte*: https://youtu.be/qQYgbIYz9i0
- Longstaff & Schwartz — *Valuing American Options by Simulation*, RFS (2001)

## Liên kết
[[Feynman-Kac and Risk-Neutral Pricing]] · [[Gambler's Ruin]] · [[Brownian Motion and SDEs]] · [[Ergodicity]] · [[Math for Quantitative Finance]] · [[Quant]]
