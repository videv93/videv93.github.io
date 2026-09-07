---
tags: [quant, probability, stochastic]
status: growing
---
# Martingales

> Một quá trình mà **kỳ vọng của tương lai đúng bằng giá trị hiện tại**. Nghe tầm thường, nhưng đây là công cụ mạnh nhất để giải các bài toán hitting probability — và là xương sống của định giá risk-neutral.

## 1. Định nghĩa

Cho quá trình ngẫu nhiên $X_n$ và quá trình dẫn xuất $M_n = f(X_1,\dots,X_n)$:
$$\mathbb{E}[M_n \mid \mathcal{F}_{n-1}] = M_{n-1}$$

Trực giác hình học: **martingale "phẳng" theo nghĩa kỳ vọng** — mọi đường đi tương lai chưa vẽ đều có giá trị trung bình bằng điểm cuối hiện tại.

$\mathcal{F}_n$ = **filtration**, tập thông tin đến thời điểm $n$.

## 2. Bốn ví dụ mẫu

| # | Quá trình | Ghi chú |
|---|---|---|
| 1 | Random walk đơn giản $S_n$ (bước ±1, đều) | Theo CLT, phân phối tại $n$ lớn → chuẩn |
| 2 | $S_n^2 - n\sigma^2$ | Cũng là martingale, nhưng hình dáng khác hẳn: có cận dưới, cận trên không chặn |
| 3 | Tích $M_n = X_1 \cdots X_n$ với $X_i$ độc lập, $\mathbb{E}[X_i]=1$ | **Đây là mô hình wealth khi cược theo tỉ lệ.** Ví dụ Bernoulli 1,5 / 0,5 (được 50% hoặc mất 50%) |
| 4 | $M_n = \dfrac{e^{\lambda\sum Y_i}}{\phi(\lambda)^n}$ với $\phi$ là moment generating function | Kỹ thuật để giải random walk **có bias** |

⚠️ Ví dụ 3 rất đáng chú ý: nó là martingale (kỳ vọng phẳng), nhưng khi vẽ ra sẽ thấy **một số path tăng gấp 5–10 lần vốn, trong khi với xác suất cao bạn mất gần hết**. Đây chính là non-ergodicity — xem [[Ergodicity]].

## 3. Stopping time & martingale transform

**Non-anticipating random variable** $A_n$: xác định bởi $\mathcal{F}_{n-1}$ — tức là quyết định đầu tư cho kỳ $n$ chỉ dùng thông tin đến $n-1$. Đây chính là hình thức hoá một *trading strategy*.

**Martingale transform theorem:**
$$\tilde{M}_n = M_0 + \sum_{j=1}^{n} A_j (M_j - M_{j-1})$$
cũng là martingale. Diễn giải: **không chiến lược non-anticipating nào biến một trò công bằng thành trò có lợi.**

**Stopping time** $\tau$: biến ngẫu nhiên sao cho tại mọi $n$ ta biết được sự kiện $\{\tau \le n\}$ đã xảy ra hay chưa (nó thuộc $\mathcal{F}_n$). Quá trình dừng $M_{n \wedge \tau}$ cũng là martingale.

## 4. Sức mạnh: giải gambler's ruin một cách thanh lịch

**Trường hợp công bằng.** $S_n$ = tổng bước ±1; $\tau$ = lần đầu chạm $+A$ hoặc $-B$.
$$0 = \mathbb{E}[S_\tau] = A\cdot P(S_\tau = A) - B\cdot P(S_\tau = -B)$$
$$\Rightarrow\; P(\text{chạm } A \text{ trước}) = \frac{B}{A+B}$$
Nếu $A=B$ thì bằng ½. Nếu bankroll của bạn ($B$) lớn hơn nhiều → xác suất lấy sạch tiền đối thủ → 1. **Cược công bằng: bankroll lớn hơn là lợi thế.**

**Thời gian chơi.** Dùng martingale $S_n^2 - n$: $\mathbb{E}[\tau] = A\cdot B$. Tích hai bankroll ước lượng số ván tới khi một bên hạ bên kia.

**Trường hợp có bias** ($p \ne q$). Dùng ví dụ 4: chọn $\lambda$ sao cho $\phi(\lambda)=1$, tức $e^\lambda = q/p$. Khi đó $M_n = (q/p)^{S_n}$ là martingale, và:
$$P(\text{chạm } A \text{ trước}) = \frac{(q/p)^{B} - 1}{(q/p)^{A+B} - 1}$$

Sách stochastic processes giải bài này bằng first-step analysis brute force — dài và rối. Martingale cho lời giải trực tiếp và đẹp.

## 5. Vai trò trong định giá

Kết quả trung tâm của option pricing: **quá trình giá option đã chiết khấu là một martingale dưới độ đo risk-neutral.**
$$\tilde{V}_t = e^{-rt}V(S_t,t) \quad\text{là martingale} \iff V \text{ thoả phương trình Black-Scholes}$$
Xem [[Feynman-Kac and Risk-Neutral Pricing]] cho chứng minh đầy đủ.

## 6. Cạm bẫy
- **Nhầm "martingale" (quá trình) với "martingale betting system"** (gấp đôi sau mỗi lần thua). Hai thứ khác nhau hoàn toàn; cái sau bị cấm ở casino và vẫn không tạo edge.
- **Quên điều kiện khả tích.** Optional stopping theorem cần điều kiện (bounded, uniformly integrable…); áp bừa sẽ ra kết quả sai.
- **Nghĩ martingale ⇒ "không đi đâu cả".** Ví dụ 3 cho thấy martingale có thể có phân phối cực kỳ lệch.

## 7. Checklist áp dụng
- [ ] Quá trình tôi quan tâm có phải martingale không? Dưới độ đo nào?
- [ ] Chiến lược của tôi có non-anticipating không? (Nếu không → tôi đang look-ahead bias)
- [ ] Tôi có đang dùng optional stopping mà chưa kiểm tra điều kiện không?
- [ ] Kỳ vọng phẳng có che giấu một phân phối lệch nguy hiểm không?

## Tham khảo
- MIT 18.642 — *Lecture 6: Stochastic Processes I (cont.); Regression Analysis*: https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024
- Williams, D. — *Probability with Martingales*
- Shreve, S. — *Stochastic Calculus for Finance I: The Binomial Asset Pricing Model*, Ch. 2
- Quant Guild — *Martingale Volatility Trading*: https://youtu.be/QB_0sN7Uowk

## Liên kết
[[Gambler's Ruin]] · [[Markov Chains]] · [[Brownian Motion and SDEs]] · [[Feynman-Kac and Risk-Neutral Pricing]] · [[Ergodicity]] · [[Quant]]
