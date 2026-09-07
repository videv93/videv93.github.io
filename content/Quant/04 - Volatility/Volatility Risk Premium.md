---
tags: [quant, volatility, alpha]
status: evergreen
---
# Volatility Risk Premium

> **Nỗi sợ luôn bị định giá sai.** Implied volatility có xu hướng realize thấp hơn mức nó ngụ ý — một mispricing hệ thống, và là nguồn thu nhập của rất nhiều hedge fund.

## 1. Hiện tượng

Chạy hồi quy: realized volatility **phía trước** trên implied volatility **hiện tại**.

- Nếu IV dự báo hoàn hảo → slope = 1 (đường $y = x$).
- Thực tế: **slope < 1**.

Diễn giải: tại bất kỳ thời điểm nào, volatility nhìn tới (implied) có xu hướng **realize thấp hơn**. Người ta **định giá quá cao nỗi sợ**.

## 2. Hiệu ứng mạnh hơn ở regime vol cao

Tách mẫu thành hai regime bằng cách giải hệ phương trình tại giao điểm, chạy hai hồi quy riêng:

| Regime | Slope |
|---|---|
| Low volatility | < 1 |
| **High volatility** | **thấp hơn nữa** |

Càng sợ, càng overpay. Đây khớp hoàn hảo với [[Stylized Facts of Volatility]] — leverage effect nói vol tăng bất cân xứng khi giá giảm, và [[Realized vs Implied Volatility]] cho thấy tương quan giữa hai đại lượng tăng khi bất định tăng.

## 3. Vì sao nó tồn tại

Không phải "thị trường ngu". Đây là **risk premium** theo đúng nghĩa: người bán volatility đang gánh rủi ro đuôi (tail risk) và được đền bù cho việc đó.

- Người mua option muốn **bảo hiểm**. Họ sẵn sàng trả phí bảo hiểm.
- Người bán option chấp nhận khả năng lỗ lớn và hiếm, đổi lấy dòng phí đều đặn.
- Cấu trúc payoff: bán vol là **short convexity** — nhiều lần thắng nhỏ, thi thoảng thua rất lớn.

Nói cách khác: bạn đang được trả tiền để làm công ty bảo hiểm. Điều đó **không** miễn phí.

## 4. Khai thác thế nào

- **Bán vol bị định giá quá cao** — đây là cách rất nhiều hedge fund kiếm tiền.
- **Mean reversion về một vol surface đã calibrate.**
- **Variance swap** — giao dịch trực tiếp trên variance realized vs implied.
- **Delta hedging** một vị thế short vega — tách bạch P&L vol khỏi P&L hướng.

Và mặt còn lại: **mua** vol khi nó bị định giá quá **thấp** — ví dụ khi VIX rất rẻ trong giai đoạn thị trường lặng.

## 5. Vì sao đây là "edge định tính" hợp lệ

Xem [[Edge and Expected Value]]. Luận điểm: khi VIX vọt lên 30+, đó là **mispricing do sợ hãi**, không phải tận thế. Hai cách thực thi:
- Lump sum khi VIX > 30 → drawdown 13%, hồi phục +12% sau vài tháng.
- Rải 10% vốn mỗi ngày VIX > 30 → drawdown ~2%, +15%.

Edge ở đây **không** nằm ở tín hiệu, mà ở **khả năng ngồi qua drawdown mà không đổi luận điểm** — vì bạn hiểu vol là quá trình mean-reverting.

## 6. Cạm bẫy — và chúng nghiêm trọng

- **Picking up pennies in front of a steamroller.** Bán vol có payoff lệch: thắng nhỏ đều đặn, thua thảm khốc và hiếm. Sharpe ratio của chiến lược này **trông đẹp giả tạo** vì Sharpe không phạt skewness. Xem [[Performance Metrics]].
- **Full position khi VIX thấp.** Vol thấp không có nghĩa an toàn; nghĩa là premium mỏng và tail risk vẫn còn nguyên.
- **Không giới hạn rủi ro đuôi.** Bán naked option là cách nổi tiếng để mất nhiều hơn tài khoản.
- **Nghĩ VRP là arbitrage.** Không. Đó là risk premium — bạn được trả vì gánh rủi ro thật.
- **Nghĩ premium luôn ở đó.** VRP thay đổi theo regime; đôi khi nó âm.
- **Kích thước quá lớn.** Xem [[Kelly Criterion]] — với payoff lệch trái, size tối ưu nhỏ hơn nhiều so với cảm giác.

## 7. Bối cảnh rộng hơn

> Mispricing tạo ra P&L. Volatility tạo ra mispricing. **Bull market thì nhàm chán.**

Đây là lý do hedge fund hoạt động kém trong bull market — "hedge" nằm ngay trong tên. Khi mặt nước lặng, cơ hội ít. Khi sóng dữ, cơ hội nhiều. Xem [[Retail vs Institutional Trading]].

## 8. Checklist áp dụng
- [ ] Tôi đo VRP bằng cách nào? Hồi quy realized-phía-trước trên implied?
- [ ] Regime hiện tại là high hay low vol? Premium hiện tại có dày không?
- [ ] Payoff của vị thế tôi lệch chiều nào? Tail risk tối đa là bao nhiêu?
- [ ] Tôi có giới hạn tail risk (spread thay vì naked) không?
- [ ] Sharpe ratio của chiến lược này có đang che giấu skewness không?
- [ ] Size của tôi có tính đến khả năng thua thảm khốc không?

## Tham khảo
- Quant Guild — *Master Volatility with ARCH & GARCH Models*: https://youtu.be/iImtlBRcczA
- Quant Guild — *How Goldman Sachs Prices Variance Swaps*: https://youtu.be/24-wC8RI7BA
- Quant Guild — *How to Trade Option Implied Volatility*: https://youtu.be/kqJd3YQAvL4
- Carr & Wu — *Variance Risk Premiums*, Review of Financial Studies (2009)
- Bollerslev, Tauchen & Zhou — *Expected Stock Returns and Variance Risk Premia*, RFS (2009)
- Demeterfi, Derman, Kamal & Zou — *More Than You Ever Wanted to Know About Volatility Swaps*, Goldman Sachs Quantitative Strategies Research Notes (1999)

## Liên kết
[[Realized vs Implied Volatility]] · [[Stylized Facts of Volatility]] · [[Edge and Expected Value]] · [[Performance Metrics]] · [[Trading with a Pricing Model]] · [[Quant]]
