---
tags: [quant, risk, bet-sizing, core]
status: evergreen
---
# Kelly Criterion

> Nghiệm của bài toán **tối ưu hoá time average** của tài sản trong hệ multiplicative. Không phải "công thức đặt cược" — mà là câu trả lời toán học cho vấn đề non-ergodicity.

## 1. Bài toán nó giải

Trong [[Ergodicity]] ta thấy: khi cược theo tỉ lệ bankroll (multiplicative), hệ trở thành **non-ergodic**. Với EV dương, chỉ vài sample path tích luỹ tài sản khổng lồ trong khi phần lớn phá sản.

Câu hỏi đúng do đó **không phải** "tối đa hoá kỳ vọng tài sản" (ensemble average) mà:

> **Tối đa hoá tốc độ tăng trưởng của tài sản dọc theo *một* quỹ đạo** (time average).

Nghiệm của bài toán tối đa hoá đó là **Kelly criterion**.

$$f^* = \frac{bp - q}{b}$$

với $p$ = xác suất thắng, $q = 1-p$, $b$ = tỉ lệ payoff (win/loss). Dạng tổng quát: tối đa hoá $\mathbb{E}[\log(\text{wealth})]$.

## 2. Nó thực sự làm gì

Kelly vẫn cho bet sizing **biến thiên theo bankroll** — nhưng theo cách *có chủ đích và tối ưu*, sao cho ensemble average tiệm cận gần time average hơn.

Đối chiếu mô phỏng cùng edge dương:
| Cách size | Kết quả |
|---|---|
| Tỉ lệ cố định tuỳ tiện với bankroll | Chỉ **~2** path kết thúc trên vốn ban đầu |
| Kelly | **Nhiều hơn hẳn** số path kết thúc trên vốn ban đầu |

> Nếu phải đi một sample path ngẫu nhiên, bạn muốn đi trong mô phỏng nào?

⚠️ **Kelly không biến hệ non-ergodic thành ergodic.** Nó cải thiện trải nghiệm của ensemble. Bạn vẫn không chọn được path mình đi.

## 3. Vì sao full-Kelly quá hung hăng trong thực tế

Công thức Kelly giả định bạn **biết** $p$ và $b$. Bạn không biết.

Trong thực tế cả 4 thành phần edge — average winner, average loser, $P(W)$, $P(L)$ — đều **đổi theo thời gian**, và bạn chỉ **proxy** chúng từ dữ liệu lịch sử hoặc model. Bạn luôn **phản ứng**, không bao giờ đi trước.

Hệ quả trong mô phỏng với edge biến thiên: **full-Kelly cho ensemble average P&L âm so với vốn ban đầu.** Vì khi edge thật tụt xuống, bạn vẫn đang đặt cược như thể nó còn cao.

## 4. Half-Kelly và các biến thể

**Half-Kelly** ($f^*/2$) — chuẩn thực hành phổ biến nhất:
- Không overexpose khi edge thật thấp hơn ước lượng.
- Đánh đổi một phần tốc độ tăng trưởng lý thuyết lấy giảm mạnh xác suất ruin.
- Trong mô phỏng cùng điều kiện: half-Kelly giữ được ensemble dương ở nơi full-Kelly âm.

Các biến thể khác: fractional Kelly tổng quát ($f^*/k$), Kelly có ràng buộc drawdown, Kelly Bayesian (tích hợp bất định về $p$).

## 5. Liên hệ với win rate

Kelly làm rõ vì sao myth "chỉ cần đúng 50,5%" sai: $f^*$ phụ thuộc **cả** $p$ **và** $b$. Chiến lược win rate 30% với $b$ lớn có thể cho $f^* > 0$ trong khi chiến lược win rate 50,5% với $b$ nhỏ cho $f^* < 0$ — tức là **không nên chơi**. Xem [[Trading Myths Busted]].

## 6. Cạm bẫy
- **Dùng full-Kelly.** Gần như luôn sai trong thị trường thật.
- **Cắm ước lượng lịch sử vào công thức rồi coi là chân lý.** Ước lượng có sai số; sai số đó nhân lên trong $f^*$.
- **Kelly trên nhiều chiến lược tương quan.** Công thức đơn biến không xử lý được; cần dạng ma trận và ước lượng covariance — vốn cũng không ổn định.
- **Quên transaction cost và slippage.** Chúng ăn trực tiếp vào $b$.
- **Nghĩ Kelly bảo vệ khỏi ruin.** Không. Nó tối ưu tăng trưởng, không tối thiểu hoá ruin. Xem [[Gambler's Ruin]].
- **Size cố định khi bankroll đã thay đổi nhiều lần.** Có \$1.000 cược \$10, có \$1.000.000 vẫn cược \$10 — vô lý.

## 7. Checklist áp dụng
- [ ] Tôi ước lượng $p$ và $b$ từ bao nhiêu trade? Sai số chuẩn là bao nhiêu?
- [ ] Tôi đang dùng fractional Kelly nào? Vì sao chọn hệ số đó?
- [ ] Tôi cập nhật ước lượng edge theo thời gian bằng cơ chế nào (EWMA / filter / regime)?
- [ ] Nếu edge thật bằng **một nửa** ước lượng của tôi, size hiện tại có còn sống được không?
- [ ] Các chiến lược của tôi có tương quan không? Kelly đơn biến có hợp lệ không?
- [ ] Đã trừ phí, spread, slippage vào $b$ chưa?

## Tham khảo
- Kelly, J.L. — *A New Interpretation of Information Rate*, Bell System Technical Journal (1956)
- Thorp, E. — *The Kelly Criterion in Blackjack, Sports Betting, and the Stock Market*
- MacLean, Thorp & Ziemba — *The Kelly Capital Growth Investment Criterion* (tuyển tập)
- Quant Guild — *How to Trade with the Kelly Criterion*: https://youtu.be/7tvW3NvRnPk
- Quant Guild — *Why Most Traders Lose: Ergodicity for Quant Trading*: https://youtu.be/dryV1qJYUw8
- Peters, O. — *Optimal leverage from non-ergodicity*, Quantitative Finance (2011)

## Liên kết
[[Ergodicity]] · [[Edge and Expected Value]] · [[Gambler's Ruin]] · [[Volatility Drag]] · [[Risk Management]] · [[Quant]]
