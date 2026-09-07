---
tags: [quant, derivatives, pricing, execution]
status: evergreen
---
# Trading with a Pricing Model

> Model cho bạn giá lý thuyết. Thị trường cho bạn giá thật. Chênh lệch giữa hai cái **có thể** là edge — nhưng chỉ khai thác được qua **rất nhiều** giao dịch.

## 1. Cơ chế

1. Tính giá lý thuyết từ model. Ví dụ Black-Scholes với $S=100$, $K=100$, $\sigma=30\%$, $r=5\%$, $T=1$ → **14,23**.
2. Nhìn quote thị trường: market maker quote **13,43 / 14,10**.
3. Bạn **mua được ở 14,10** một hợp đồng có giá lý thuyết **14,23**.
4. → Có mispricing lý thuyết → có **trade edge**.

⚠️ Có nhiều lý do chính đáng để market maker dịch quote lên/xuống (inventory, skew, thông tin). Đừng hand-wave điều đó đi.

## 2. Vì sao nó hoạt động — và chỉ ở quy mô lớn

Mua ở 14,10 **không đảm bảo** bạn lãi. Path này có thể lỗ. Path kia cũng vậy.

Nhưng: mô phỏng 100.000 path GBM, tính P&L mỗi path sau khi trừ premium → **trung bình dương**. Bạn thấy nhiều cột xanh hơn cột đỏ.

Vẽ equity qua nhiều lệnh:
- 10 lệnh → nhiễu, có path xuống có path lên.
- 100 lệnh → bắt đầu rõ.
- 1.000 → 10.000 → 100.000 lệnh → **tích luỹ đều đặn**.

> Đừng nghĩ nhỏ. Đây không phải chuyện của **một** lệnh. Bạn cần giao dịch **rất nhiều** hợp đồng để khai thác mispricing này.

**Chính xác là điều casino làm.** Họ sống sót qua ngắn hạn để tới được dài hạn. Tới được dài hạn thì tích luỹ tài sản khổng lồ. Nhưng nếu nổ trong ngắn hạn thì **không có dài hạn nào cả** — xem [[Gambler's Ruin]].

Và: bạn hoàn toàn có thể lỗ trong 1.000 lệnh đầu tiên. Không có gì bắt đường giá phải nằm trên strike.

## 3. Tổng quát hoá: cùng cấu trúc với [[Market Making]]

Đây là cùng một logic:
- Market maker: có mức kỳ vọng "đủ tốt", quote spread quanh nó, thu spread qua nhiều giao dịch.
- Model trader: có giá lý thuyết, giao dịch khi giá thị trường lệch khỏi nó, thu chênh lệch qua nhiều giao dịch.

Cả hai đều **không dự đoán** gì. Cả hai đều dựa vào **đúng trên trung bình**.

## 4. Cùng khung, áp lên xác suất

Ví dụ **implied probability** trong earnings event:
- Thị trường định giá 80% khả năng beat.
- Implied probability **không nói gì** về xác suất thật — nó nói thị trường đang định giá gì, và mức độ tự tin.
- Nếu bạn cho rằng nó nên gần 50/50 → short trước sự kiện.
- Nếu thị trường sai và quá tự tin một chiều, cú sốc realized sẽ lớn.

Làm điều này lặp lại, đúng nhiều hơn sai → tích luỹ EV. Xem [[Edge and Expected Value]].

Tương tự trong poker: **pot odds và out probability** cũng là model values sai, và pro vẫn dùng chúng — có lúc chấp nhận, có lúc bác bỏ. Xem [[Games of Chance vs Games of Incomplete Information]].

> Model **không cần đúng** để hữu ích cho việc tối ưu EV. Chúng nói cho bạn cái gì **đang được kỳ vọng**, không phải cái gì **sẽ xảy ra**.

## 5. Cạm bẫy nghiêm trọng

- **Nhầm với arbitrage.** Đây là mispricing **thống kê**, có rủi ro, có drawdown, có khả năng phá sản. Xem [[Edge and Expected Value]].
- **Nghĩ nhỏ.** Trade 5 hợp đồng rồi kết luận model sai.
- **Tin vào tham số của mình.** Đổi drift từ dương sang −50% là đổi toàn bộ kết cục. Bạn có chắc $\sigma$, $r$ của mình đúng không?
- **Bỏ qua vì sao market maker quote như vậy.** Đôi khi "mispricing" là bạn có ít thông tin hơn — **adverse selection**. Xem [[Market Making]].
- **Bỏ qua transaction cost và spread.** Mua ở ask, bán ở bid. Chênh lệch 0,13 có thể bị phí ăn hết.
- **Bỏ qua non-stationarity của $\sigma$.** Vol không hằng số, có clustering, có jump. Xem [[Stylized Facts of Volatility]].

## 6. Checklist áp dụng
- [ ] Chênh lệch lý thuyết-thị trường của tôi có lớn hơn spread + phí không?
- [ ] Tôi cần bao nhiêu lệnh để edge này hiển hiện? Tôi có sống được tới đó không?
- [ ] $\sigma$ tôi dùng đến từ đâu? Nếu đổi nó ±20%, mispricing còn không?
- [ ] Có lý do nào market maker biết mà tôi không biết không?
- [ ] Size của tôi có phù hợp để chịu được chuỗi lỗ dài không? Xem [[Kelly Criterion]]
- [ ] Tôi đang khai thác edge hay đang cược hướng?

## Tham khảo
- Quant Guild — *How to Trade with the Black-Scholes Model*: https://youtu.be/ZoWvYpn5eqI
- Quant Guild — *Why Quant Traders Care About Pricing*: https://youtu.be/HrwZy_z2Vr8
- Quant Guild — *How to Trade Options with the Black-Scholes Model*: https://youtu.be/1OByexsEJXc
- Quant Guild — *Delta Hedging and Black-Scholes Prices*: https://youtu.be/C5r3C07WgMo
- Natenberg, S. — *Option Volatility and Pricing*
- Interactive Brokers API (dùng cho mọi quant build của Quant Guild): https://www.interactivebrokers.com

## Liên kết
[[Black-Scholes Model]] · [[Market Making]] · [[Edge and Expected Value]] · [[Volatility Risk Premium]] · [[Gambler's Ruin]] · [[Quant]]
