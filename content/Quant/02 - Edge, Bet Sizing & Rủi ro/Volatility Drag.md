---
tags: [quant, risk, portfolio]
status: evergreen
---
# Volatility Drag

> Thuế mà biến động thu trên tăng trưởng gộp. Đây là lý do toán học vì sao **rủi ro cao hơn không đồng nghĩa lợi nhuận cao hơn**, và vì sao ta tối ưu risk-adjusted return chứ không phải return thô.

## 1. Cơ chế

Tài sản gộp theo cấp số nhân, không cộng. Trung bình **hình học** luôn ≤ trung bình **số học**, và khoảng cách giữa chúng tăng theo phương sai:

$$g \approx \mu - \frac{\sigma^2}{2}$$

$g$ = tốc độ tăng trưởng gộp thực tế (geometric), $\mu$ = return trung bình số học, $\sigma^2$ = phương sai. Số hạng $-\sigma^2/2$ chính là **volatility drag**.

Hệ quả trực quan hơn: **drawdown 10% cần hơn 10% để hồi.** Drawdown 50% cần +100%. Bất đối xứng này là volatility drag nhìn từ góc khác.

## 2. Vì sao nó quyết định

Ví dụ đối chứng qua 10 năm:
- **Danh mục A** — tăng trưởng chậm nhưng mượt. Năm đầu gần như không tăng, có khi giảm nhẹ. Sau 10 năm: đường cong lồi (convex), tài sản lớn.
- **Danh mục B** — đuổi theo return cao với vol cao. Năm đầu +50%. Sau 10 năm: **geometric return xấp xỉ 0 hoặc âm**, dù arithmetic mean cao hơn.

Hai path này không phải ví dụ dựng lên — đây là hệ quả cơ học của việc gộp.

So sánh cụ thể hơn: một AI startup bùng nổ rồi về penny stock có volatility đo được cao hơn Microsoft rất nhiều, nhưng **return thấp hơn**. Bạn gánh nhiều rủi ro hơn mà không được trả công. Xem [[Risk and Return]].

## 3. Liên hệ với ergodicity

Volatility drag là biểu hiện định lượng của **non-ergodicity** trong tăng trưởng multiplicative. Ensemble average (arithmetic) tăng, time average (geometric) có thể giảm. Chính là ví dụ "1,5× hoặc 0,6×" trong [[Ergodicity]].

Và đây cũng là lý do [[Kelly Criterion]] — tối đa hoá $\mathbb{E}[\log W]$ — chính là tối đa hoá geometric growth.

## 4. Hệ quả thực hành

1. **Tối ưu risk-adjusted return, không phải absolute return.** Đây không phải sở thích bảo thủ; đây là toán.
2. **Giảm drawdown có giá trị gộp.** Trailing S&P 500 5–10%/năm nhưng drawdown 10% thay vì 40% có thể tốt hơn về CAGR dài hạn — và chắc chắn tốt hơn về khả năng tiếp cận vốn.
3. **Beta > 1 khuếch đại drag.** Danh mục nhạy quá mức với thị trường sẽ bị kéo nặng mỗi lần thị trường giảm. Xem [[CAPM Alpha and Beta]].
4. **Hedge có thể *tăng* tăng trưởng dài hạn.** Đánh đổi một phần upside lấy bảo vệ downside, rồi monetize vốn đó trong drawdown → CAGR cao hơn danh mục không hedge. Xem [[Physical Decorrelation]].

## 5. Cạm bẫy
- **So sánh chiến lược bằng arithmetic mean return.** Sai đơn vị. Dùng CAGR / geometric return.
- **"Chấp nhận rủi ro cao để giàu nhanh."** Toán nói ngược lại trong dài hạn.
- **Bỏ qua chi phí thời gian.** Tài sản lớn được xây **chậm**. Bạn trả cho convexity bằng thời gian — không có gì miễn phí.
- **Nghĩ leverage luôn tăng return.** Leverage nhân cả $\mu$ lẫn $\sigma$, nhưng drag đi theo $\sigma^2$ → có mức leverage tối ưu, vượt qua là phản tác dụng.

## 6. Checklist áp dụng
- [ ] Tôi báo cáo hiệu suất bằng CAGR hay arithmetic mean?
- [ ] Max drawdown lịch sử của tôi là bao nhiêu? Cần bao nhiêu % để hồi?
- [ ] Beta của danh mục tôi là bao nhiêu? Có > 1 không? Vì sao?
- [ ] Nếu tôi cần tiền trong 6 năm nữa và lúc đó thị trường giảm 30%, tôi có chấp nhận bán ở 70 xu/đô không?
- [ ] Tôi có đang đuổi theo return ngắn hạn với chi phí là vol không?

## Tham khảo
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Quant Guild — free research note on market risk: https://quantguild.com
- Peters, O. — *Optimal leverage from non-ergodicity*, Quantitative Finance 11 (2011)
- Bouchaud & Potters — *Theory of Financial Risk and Derivative Pricing*
- Fernholz, R. — *Stochastic Portfolio Theory* (excess growth rate)

## Liên kết
[[Ergodicity]] · [[Kelly Criterion]] · [[Risk and Return]] · [[CAPM Alpha and Beta]] · [[Physical Decorrelation]] · [[Performance Metrics]] · [[Quant]]
