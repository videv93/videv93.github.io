---
tags: [quant, ict, price-action, retail]
status: growing
---
# Market Structure and Displacement

> ⚠️ Đọc [[Quant Critique of ICT]] trước khi áp dụng.

> Market structure chỉ là **đỉnh và đáy**. Vấn đề là biết dùng đỉnh/đáy nào — và bộ lọc được đề xuất là **displacement**.

## 1. Định nghĩa swing point (cách đơn giản hoá)

Rất nhiều cách phức tạp tồn tại. Cách đơn giản nhất:
- **Swing high** = mọi nến có **đỉnh thấp hơn ở cả hai bên**.
- **Swing low** = mọi nến có **đáy cao hơn ở cả hai bên**.

Không cần tạo cấu trúc mới, không cần điều kiện phức tạp nào khác.

## 2. Displacement vs Manipulation — bộ lọc trung tâm

| | Displacement | Manipulation |
|---|---|---|
| Hình dạng | Chuyển động **mạnh, dứt khoát** xuyên qua một swing point | Chạm qua mức bằng **wick lớn**, không đóng cửa xuyên qua |
| Dấu hiệu kèm theo | Tạo ra **fair value gap** | **Không** tạo fair value gap |
| Diễn giải | Không có smart money hấp thụ ở mức đó → thị trường tiếp diễn hướng đó | Smart money đang hoạt động trong wick → khả năng đảo chiều |
| Hành động | Kỳ vọng tiếp diễn | Kỳ vọng swing point đối diện bị giao dịch vào |

Lập luận cho wick: **cần rất nhiều áp lực bán để tạo một wick lớn như vậy.**

> Cấu trúc thị trường chỉ **hợp lệ** khi nó đi kèm displacement.

**Lưu ý phản biện quan trọng** (từ chính nguồn): *"Nhiều người sẽ nói 'ồ, nến đóng cửa thân qua rồi nên nó sẽ tiếp diễn'. Điều đó đơn giản là không hoạt động."*

## 3. Mẫu hình lặp lại

Theo khung này, mẫu hình lặp đi lặp lại:
1. **Displace** qua một đáy → kỳ vọng tiếp diễn giảm, đỉnh kế tiếp là mục tiêu.
2. **Fail to displace** qua một đỉnh (không có FVG) → swing point đã thất bại sẽ **bị giao dịch vào lại**.
3. Kết hợp cả hai → xác suất tiếp diễn cao hơn.

Quy tắc thực hành: bất cứ khi nào bạn displace một đáy, hãy nhìn **price leg** đã tạo ra cú displacement đó. Điểm swing do leg đó tạo ra có xu hướng bị giao dịch vào sau này.

## 4. Premium và Discount

Ẩn dụ: coi trading như kinh doanh, nến là hàng hoá của bạn.
- Muốn **bán** (bearish) → bán ở giá **premium** (cao).
- Muốn **mua** (bullish) → mua ở giá **discount** (thấp).

**Cách vẽ:** dùng công cụ Fib trên TradingView, chỉ bật các mức **0, 0.5, 1**. Mức 0,5 chia đôi range.
- Trên midpoint = **premium**.
- Dưới midpoint = **discount**.

Vẽ từ một swing point tới swing point kế tiếp, tại đáy của displacement. Mỗi khi có leg giá mới, kiểm tra: **có displace không?** Nếu có, vẽ lại Fib từ đỉnh mới xuống đáy displacement.

Ứng dụng: nếu bearish, tìm điểm bán ở **fair value gap nằm trong vùng premium**.

## 5. Time frame alignment

Trên khung lớn bạn thường thấy chuyển động khá thẳng. Trên khung nhỏ có nhiều cấu trúc ở giữa — và khung nhỏ cho bạn **tín hiệu sớm** rằng leg khung lớn sắp tiếp diễn.

Nguyên tắc: khi khung nhỏ **bắt đầu dịch chuyển và cũng manipulate đỉnh / displace đáy**, nó đã **đồng bộ** với khung lớn. Đó là lúc tìm setup.

Ví dụ cặp: 15 phút (khung lớn) ↔ 1 phút (khung nhỏ). 4 giờ ↔ 15 phút. Tuần ↔ 4 giờ.

## 6. Giới hạn được thừa nhận

> Market structure nói cho bạn **giá có khả năng đi đâu**. Nó **không** nói **vì sao** hay **khi nào**.

Và biết thị trường đi đâu **không trả tiền cho bạn** — thực thi mới trả. Đây là lý do khung này cần thêm [[Time-Based Liquidity]].

## 7. Cạm bẫy
- **Đánh dấu cấu trúc theo cách phức tạp** → tê liệt khi tới lúc giao dịch.
- **Dựa vào "nến đóng cửa thân qua mức"** — không đủ.
- **Áp dụng ở mọi nơi thay vì tại key level.** Mẫu hình chỉ có ý nghĩa **tại một key level**.
- **Vẽ lại Fib liên tục để hợp lý hoá.** Đây là confirmation bias có công cụ.
- **Nhầm mô tả với dự báo.** Displacement mô tả cái đã xảy ra.

## 8. Checklist áp dụng
- [ ] Swing point tôi dùng có định nghĩa cơ học không (đỉnh thấp hơn ở hai bên)?
- [ ] Chuyển động gần nhất là displacement hay manipulation? Có FVG không?
- [ ] Giá đang ở premium hay discount của range hiện tại?
- [ ] Khung lớn và khung nhỏ của tôi có đồng bộ không?
- [ ] Tôi đang xem mẫu hình này **tại một key level** hay ở giữa hư không?

## Tham khảo
- Casper SMC — *Easiest Way To Trade ICT in 2026 as a Beginner*: https://www.youtube.com/watch?v=HC2iUkI8Dh8
- Inner Circle Trader: https://www.youtube.com/@InnerCircleTrader
- Fibonacci retracement trên TradingView: https://www.tradingview.com
- ⚠️ Đối chiếu: [[Quant Critique of ICT]]

## Liên kết
[[ICT Liquidity]] · [[Fair Value Gaps and Order Blocks]] · [[Time-Based Liquidity]] · [[Quant Critique of ICT]] · [[Quant]]
