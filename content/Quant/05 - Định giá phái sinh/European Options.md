---
tags: [quant, derivatives, pricing]
status: growing
---
# European Options

> Định giá tại thời điểm đáo hạn là chuyện tầm thường — chỉ là hàm payoff. **Câu hỏi thật là: hôm nay nên trả bao nhiêu cho khả năng nhận payoff đó?**

## 1. Cấu trúc

Hợp đồng phái sinh lấy giá trị từ một tài sản cơ sở. Với option **kiểu châu Âu**, ta **chỉ quan tâm giá trị của tài sản cơ sở tại một thời điểm trong tương lai** $T$ (maturity/expiration) — 1 tuần, 1 tháng, 1 năm, không quan trọng.

Payoff tại $T$ (call):
$$V(S_T, T) = \max(S_T - K, 0)$$

Ví dụ: $S_T = 1025$, $K$ thấp hơn → payoff tương ứng, thường nhân 100 (lot size).

## 2. Vấn đề

Ta **không biết** $S_T$. Nếu biết thì đã cắm vào công thức và xong.

Nên ta cần một **hàm** $V(S_t, t)$ cho biết giá option tại **bất kỳ** thời điểm $t$ trong vòng đời hợp đồng, dựa trên giá cơ sở hiện tại (quan sát được — chỉ cần nhìn spot) và vài tham số khác.

Mô phỏng trực quan: chạy một path GBM cho $S$ → giá option biến động theo. Chạy lại → path khác, giá option khác. Tại $t = T$ ta cắm thẳng vào hàm max. Tại $t = 0{,}5$ hay $t = 2$ ta cần $V$.

Toàn bộ [[Black-Scholes Model]] và [[Feynman-Kac and Risk-Neutral Pricing]] là hai lập luận khác nhau để tìm cùng một hàm $V$ này.

## 3. Chỉ có **một** P&L thực hiện

Điểm dễ bị bỏ qua nhất:

> Model cho bạn giá dựa trên **mọi trạng thái thế giới có thể xảy ra** nhìn tới. Nhưng realization chỉ xảy ra **một lần**, trên **một** price path.

Mô phỏng minh hoạ: trả premium 14,23 cho một call.
- Path này: giá kết thúc dưới strike → mất toàn bộ premium.
- Path kia: kết thúc **trên** strike nhưng **không** vượt premium → vẫn lỗ.
- Path khác: lãi 46.

Rủi ro bất đối xứng khi long option: **lỗ tối đa = premium, upside không giới hạn.** Khi short thì ngược lại.

Và đây là **zero-sum ở mức hợp đồng**: nếu bạn long, ai đó short. Long call và short call là ảnh phản chiếu của nhau tại expiration. Xem [[Games of Chance vs Games of Incomplete Information]].

⚠️ Sắc thái: với option, bạn thường **không** đối đầu một counterparty cụ thể. Market maker ở phía bên kia đang hedge và tìm lợi nhuận từ spread. Bạn thực chất đang đặt cược vào một **mispricing rộng** so với mặt bằng giá thị trường.

## 4. Năm input

Cho tôi 5 con số, tôi cho bạn giá option (Black-Scholes):

| Input | Ký hiệu |
|---|---|
| Giá tài sản cơ sở | $S$ |
| Strike price | $K$ |
| Volatility | $\sigma$ |
| Lãi suất phi rủi ro | $r$ |
| Thời gian tới đáo hạn | $T - t$ |

Bạn **không cần** hiểu hedge portfolio argument, PDE, hay geometric Brownian motion để dùng công thức. Nhưng bạn **cần** hiểu rằng giá đó đến kèm một tập giả định. Xem [[Black-Scholes Model]].

## 5. Cạm bẫy
- **Nhầm payoff với P&L.** Kết thúc trên strike không có nghĩa lãi — phải vượt premium đã trả.
- **Nghĩ giá model là "giá đúng".** Nó là giá **có điều kiện trên giả định**.
- **Quên rằng bạn chỉ đi một path.** Model nói về ensemble; bạn sống một realization.
- **Bỏ qua lot size.** Option thường bán theo lô 100.
- **Áp khung châu Âu cho option kiểu Mỹ.** Option Mỹ có quyền thực hiện sớm → định giá khác, thường cần phương pháp số.

## 6. Checklist áp dụng
- [ ] Tôi đã tính điểm hoà vốn (strike ± premium) chưa?
- [ ] Lỗ tối đa của tôi là bao nhiêu? Lãi tối đa?
- [ ] 5 input tôi đang dùng có nguồn từ đâu? $\sigma$ đặc biệt — realized hay implied?
- [ ] Đây là option châu Âu hay châu Mỹ?
- [ ] Tôi đang so giá model với bid/ask nào? (Bán ở bid, mua ở ask)

## Tham khảo
- Quant Guild — *How Physics Accidentally Proved the Black-Scholes Model*: https://youtu.be/IIzGqL3ChEs
- Quant Guild — *How to Read Options Chains*: https://youtu.be/RrRbz6oXwxE
- Quant Guild — *Ultimate Options Trading Crash Course*: https://youtu.be/-lQdlJh8cCE
- Hull, J. — *Options, Futures, and Other Derivatives*, Ch. 1–10
- Natenberg, S. — *Option Volatility and Pricing*

## Liên kết
[[Black-Scholes Model]] · [[Feynman-Kac and Risk-Neutral Pricing]] · [[Trading with a Pricing Model]] · [[Realized vs Implied Volatility]] · [[Quant]]
