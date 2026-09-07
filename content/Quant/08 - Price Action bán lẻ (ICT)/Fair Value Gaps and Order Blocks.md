---
tags: [quant, ict, price-action, retail]
status: growing
---
# Fair Value Gaps and Order Blocks

> ⚠️ Đọc [[Quant Critique of ICT]] trước khi áp dụng.

> Hai "key level" cốt lõi của ICT. Và cảnh báo được lặp lại nhiều nhất trong chính khung này: **chúng chẳng có nghĩa gì nếu không có bối cảnh.**

## 1. Fair Value Gap (FVG)

**Định nghĩa:** khi một nến mở rộng để lại một **khoảng trống** giữa wick của nến trước và wick của nến sau.

**Lập luận đằng sau:** có lượng bán (hoặc mua) mạnh đến mức thị trường mở rộng quá nhanh, **không có thời gian để chào phía đối diện**. Chỉ có một chiều hoạt động. Nên khi giá quay lại vùng đó, có thể tìm dấu hiệu đảo chiều.

### Break in Structure Gap (BSG)

Không phải FVG nào cũng như nhau. FVG xác suất cao là **BSG** — gap xuyên qua **một lượng lớn cấu trúc**, không chỉ một đáy mà nhiều đáy.

Diễn giải: thị trường lao qua tất cả những nơi smart money **có thể đã mua**. Nếu smart money không mua dưới các đáy đó → thị trường bearish.

**Kích thước lớn không phải lý do FVG mạnh** — việc nó phá nhiều cấu trúc mới là lý do.

### Inflection Point (IP)

Bên trong một BSG, có những điểm mà retail đã **bán ở breakout của từng đáy**, rồi khi giá chạy đúng hướng họ, họ **dời stop về entry**. Điều đó tạo ra thanh khoản tập trung tại các điểm đó.

→ Khi giá quay lại FVG, các **inflection point** là nơi có nhiều khả năng cho phản ứng nhất.

*(Thuật ngữ này do người dạy tự đặt, không phải thuật ngữ ICT gốc.)*

### Inverted FVG

Khi một FVG bị **đảo ngược** (giá xuyên qua theo chiều ngược lại), đó là dấu hiệu thị trường **yếu** theo hướng ban đầu. Trong thị trường bullish, bạn **không muốn** thấy FVG bị đảo.

Đây là một trong các **confirmation pattern** chính.

### Internal vs External Range Liquidity

| | Vị trí |
|---|---|
| **Internal Range Liquidity (IRL)** | Bên trong một range — ví dụ FVG giữa một swing high và swing low |
| **External Range Liquidity (ERL)** | Chính các đỉnh và đáy |

> Thị trường luôn di chuyển từ **IRL → ERL**.

Chu trình: chạm key level → tạo IRL → giá vào IRL → tiếp diễn tới ERL → tạo IRL mới → lặp lại.

## 2. Change in the State of Delivery (CISD) / Price Delivery

Price delivery cho biết thị trường đang nhắm tới đỉnh hay đáy.

**Mẹo thực hành:** vào settings TradingView, **tắt wick**, chỉ nhìn thân nến.

Lập luận: **khối lượng của phần lớn nến nằm ở thân**. Nếu người bán tập trung ở các thân nến, và giá đóng cửa **trên** vùng đó, họ đang lỗ. Khi giá quay lại, họ thoát ở hoà vốn — việc thoát khỏi lệnh bán tương đương một lệnh **mua** → tạo áp lực mua.

Đó là lý do trong thị trường bullish, giá tìm được hỗ trợ ở các nến **giảm**.

**CISD** = khi các nến giảm đang engulf nến tăng, rồi đột ngột một nến tăng engulf các nến giảm (hoặc ngược lại) — **tại một key level**.

Đây được mô tả là entry model cho **risk-to-reward tốt nhất**, đặc biệt khi kết hợp với inverted FVG.

## 3. Order Block

**Định nghĩa:** tạo ra khi price delivery dịch chuyển **có lực**, để lại một key level phía sau.

- Thị trường **bearish** → nến **tăng** đóng vai trò kháng cự.
- Thị trường **bullish** → nến **giảm** đóng vai trò hỗ trợ.

**Điều kiện chất lượng:**
- Phải đi kèm **displacement**.
- Order block xác suất cao nhất **tạo ra fair value gap** khi giá rời khỏi nó.
- Phải nằm **tại một key level**.

## 4. Swing Failure Pattern (SFP)

Giá chạm một đỉnh (trong thị trường bạn đã xác định là bearish) và **thậm chí không đóng cửa được vượt qua**. Đó là dấu hiệu **sớm nhất** cho khả năng tiếp diễn xuống.

Vùng phía trên đáy/dưới đỉnh bị quét là nơi trader bị mắc kẹt. Trong thị trường thật sự bullish, người bán dưới một đáy chỉ đóng vai trò thanh khoản → giá **không nên** lảng vảng lâu ở đó.

**Thứ tự xuất hiện:** trước một market structure shift, thường có 4 thứ xảy ra trước — **SFP → inverted FVG → CISD → unicorn**. Chúng cho phép vào lệnh **sớm hơn nhiều** so với chờ market structure shift.

## 5. ⚠️ Cảnh báo lặp lại nhiều nhất

> **Các mức này theo nghĩa đen không có ý nghĩa gì nếu bạn không có bối cảnh.**

> Dùng chúng một cách mù quáng — hay dùng bất cứ thứ gì một cách mù quáng — là công thức để trade tệ. Rất nhiều người nghĩ: *"Ồ, tôi học được pattern này, tôi sẽ trade mọi fair value gap."* Rồi thắc mắc vì sao không có lãi.

> Nếu bạn xoá key level đi và chỉ nhìn pattern — chắc, đôi khi nó chạy, nhưng bạn **đang đánh bạc**. Bạn không hơn gì người trade bull flag.

**Công thức được lặp lại xuyên suốt:** **key levels + confirmation.** Mọi thứ khác là nhiễu.

## 6. Cạm bẫy
- **Trade mọi FVG / mọi order block.** Cạm bẫy số một.
- **Nghĩ FVG lớn = FVG tốt.** Cái quyết định là phá bao nhiêu cấu trúc.
- **Không có key level.** Confirmation không có key level = đánh bạc.
- **Đánh dấu quá nhiều mức** → decision fatigue.
- **Diễn giải sau khi giá đã chạy.** Xem [[Quant Critique of ICT]].

## 7. Checklist áp dụng
- [ ] FVG này có phải BSG không? Nó phá bao nhiêu cấu trúc?
- [ ] Có inflection point nào bên trong nó không?
- [ ] Tôi có đang ở **tại một key level** không?
- [ ] Confirmation của tôi là gì — inverted FVG, CISD, hay SFP?
- [ ] Order block này có kèm displacement + FVG không?
- [ ] Nếu bỏ key level đi, tôi có còn vào lệnh này không? (Nếu có → tôi đang đánh bạc)

## Tham khảo
- Casper SMC — *Easiest Way To Trade ICT in 2026 as a Beginner*: https://www.youtube.com/watch?v=HC2iUkI8Dh8
- Inner Circle Trader: https://www.youtube.com/@InnerCircleTrader
- TradingView (công cụ vẽ, template mức): https://www.tradingview.com
- ⚠️ Đối chiếu: [[Quant Critique of ICT]]

## Liên kết
[[ICT Liquidity]] · [[Market Structure and Displacement]] · [[Time-Based Liquidity]] · [[Quant Critique of ICT]] · [[Quant]]
