---
tags: [quant, derivatives, pricing, core]
status: evergreen
---
# Black-Scholes Model

> Nghiệm của một phương trình đạo hàm riêng, xuất phát từ lập luận hedge portfolio. Mọi giả định của nó đều sai — và chính vì thế nó cho ta implied volatility.

## 1. Nó đến từ đâu

Model là **nghiệm của phương trình Black-Scholes** — một PDE parabolic, thực chất là **phương trình truyền nhiệt đã biến đổi**.

PDE này được suy ra từ **lập luận replication danh mục** (hedge portfolio):
- Không arbitrage, không transaction cost.
- Tài sản cơ sở theo **geometric Brownian motion**.
- Volatility hằng số.
- Hợp đồng trong danh mục là một European call.

Giải PDE → hàm $V(S_t, t)$ cho giá option tại **bất kỳ** thời điểm nào trong vòng đời hợp đồng, không chỉ tại $T$.

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2\frac{\partial^2 V}{\partial S^2} + rS\frac{\partial V}{\partial S} - rV = 0$$

Công thức nghiệm cho call châu Âu chứa hàm phân phối tích luỹ chuẩn và các số hạng $d_1, d_2$.

## 2. Diễn giải trực giác

> Model đang lấy **mọi price path khả dĩ** đi tới tương lai, tính P&L ở mỗi path, chiết khấu về hiện tại, rồi lấy trung bình.

Nói cách khác: **kỳ vọng P&L đã chiết khấu trên mọi trạng thái thế giới**, với giả định tài sản cơ sở theo GBM.

Đây là lý do xác suất và thống kê là xương sống của định giá — và cũng là lý do góc nhìn này tương đương với [[Feynman-Kac and Risk-Neutral Pricing]].

## 3. Năm input → một giá

$S$, $K$, $\sigma$, $r$, $T-t$. Xem [[European Options]].

Bạn không cần hiểu PDE để **dùng** công thức. Nhưng bạn cần biết giá đó **có điều kiện trên các giả định**.

## 4. Các giả định — và mức độ sai

| Giả định | Thực tế |
|---|---|
| GBM cho tài sản cơ sở | Không có jump; thực tế có gap, flash crash |
| **Volatility hằng số** | **Sai một cách bạo lực.** Vol biến thiên, có clustering, mean-reverting |
| No arbitrage | Hợp lý — mispricing tĩnh bị ăn rất nhanh |
| No transaction cost | Sai nhưng thường chấp nhận được |
| Giao dịch liên tục | Sai — order book rời rạc |
| Lãi suất hằng số | Xấp xỉ chấp nhận được cho kỳ hạn ngắn |

Đổi drift từ dương sang **−50%** thì toàn bộ kết cục chiến lược của bạn đổi. Tham số hoá quan trọng ngang model.

## 5. Nghịch lý hữu ích: giả định sai sinh ra công cụ tốt

Giả định constant volatility sai đến mức **không định giá exotic một cách nhất quán được**.

Nhưng: chính vì giả định đó, ta **đảo ngược được model** — cho giá option thị trường, giải ngược ra $\sigma$. Đó là **implied volatility**, và từ đó là **implied volatility surface** — thước đo trader đang định giá bất định ở mức nào.

Đây là ví dụ chuẩn mực nhất của [[All Models Are Wrong]]. Xem [[Realized vs Implied Volatility]].

## 6. Khi nào cần model khác

| Vấn đề | Model thay thế |
|---|---|
| Volatility ngẫu nhiên | **Heston**, SABR |
| Jump, fat tails | Merton jump diffusion |
| Exotic option | Monte Carlo, finite differences, Fourier (Carr–Madan) |
| Rough volatility | Volterra process, fractional models |
| Option kiểu Mỹ | Binomial tree, finite differences, LSM |

Nhưng lưu ý: **mọi model thay thế cũng có giả định.** Bạn không thoát khỏi trò chơi; bạn chỉ đổi tập giả định. Đây là luật chơi nếu bạn muốn tham gia không gian này.

## 7. Cạm bẫy
- **Dùng Black-Scholes cho exotic với constant vol.** Không nhất quán.
- **Coi implied volatility là dự báo.** Nó là giá, và chứa risk premium. Xem [[Volatility Risk Premium]].
- **Cắm realized vol lịch sử vào công thức rồi coi output là "giá đúng".** Vol lịch sử không phải vol tương lai.
- **Quên rằng vol surface tồn tại.** Một con số $\sigma$ cho mọi strike/maturity là hư cấu — chính smile/skew là bằng chứng model sai.
- **Bỏ qua Greeks.** Nếu không quản delta, gamma, vega, theta thì bạn không quản option, bạn đang cược hướng.

## 8. Checklist áp dụng
- [ ] $\sigma$ tôi cắm vào từ đâu? Nếu là implied, ở strike/maturity nào?
- [ ] Giả định nào bị vi phạm nặng nhất cho tài sản này? (Có jump không? Vol có ổn định không?)
- [ ] Tôi đang định giá vanilla hay exotic? Model có phù hợp không?
- [ ] Tôi có đang so giá model với giá thị trường để tìm mispricing không? Xem [[Trading with a Pricing Model]]
- [ ] Exposure Greeks của tôi là gì? Tôi hedge cái nào?

## Tham khảo
- Black, F. & Scholes, M. — *The Pricing of Options and Corporate Liabilities*, JPE (1973)
- Merton, R. — *Theory of Rational Option Pricing*, Bell Journal (1973)
- Hull, J. — *Options, Futures, and Other Derivatives*
- Quant Guild — *How to Trade with the Black-Scholes Model*: https://youtu.be/ZoWvYpn5eqI
- Quant Guild — *Managing Option Portfolios with Black-Scholes Greeks*: https://youtu.be/K9BaFjVQYiE
- Quant Guild — *Heston Stochastic Volatility Model and Fast Fourier Transforms*: https://youtu.be/2-oAlnZV6hA
- Gatheral, J. — *The Volatility Surface*

## Liên kết
[[European Options]] · [[Feynman-Kac and Risk-Neutral Pricing]] · [[Trading with a Pricing Model]] · [[Brownian Motion and SDEs]] · [[Realized vs Implied Volatility]] · [[All Models Are Wrong]] · [[Quant]]
