---
tags: [quant, ict, price-action, retail]
status: growing
---
# Time-Based Liquidity

> ⚠️ Đọc [[Quant Critique of ICT]] trước khi áp dụng.

> Giá là **chủ quan** — hai người nhìn cùng biểu đồ thấy hai thứ khác nhau, và không có cách khách quan nào nói ai đúng. Thời gian thì **không**. Đây là lập luận cho bộ lọc duy nhất mang tính cơ học trong khung ICT.

## 1. Vì sao dùng thời gian làm bộ lọc

Vấn đề mà mọi ICT trader gặp: *đỉnh nào? đáy nào? mua ở đâu? bán ở đâu?*

Lập luận: **thị trường không ngẫu nhiên, và thời gian đóng vai trò lớn hơn bạn nghĩ.** Có các mẫu hình lặp lại qua tuần, qua ngày, qua session — và chúng cho một cách **cơ học** để chọn mức, thay vì chọn theo cảm tính.

Đây được mô tả là **bước ngoặt lớn nhất** trong sự nghiệp của người dạy khung này.

## 2. Bộ mức cần đánh dấu

Đây là **toàn bộ** danh sách — không cần gì thêm:

| Khung | Mức |
|---|---|
| **Tuần** | Đỉnh và đáy tuần trước |
| **Ngày** | Đỉnh và đáy ngày hôm trước |
| **Session** | Đỉnh/đáy phiên **Asia** và **London** |
| **1h / 4h / Ngày** | Swing point và fair value gap |

**Cách đánh dấu session** (giờ New York / EST — bắt buộc):
1. Vào khung **15 phút**.
2. Dùng công cụ **vertical line**.
3. Đánh dấu **18:00 hôm trước**, **00:00**, và **06:00**.
4. Vùng giữa các mốc đó là session Asia và London.
5. Đánh dấu đỉnh/đáy của mỗi session.

**Quan trọng:** chỉ chú ý các mức **chưa bị giao dịch vào**. Đánh dấu lúc **09:00**, giao dịch từ **09:30**.

*(Người dạy thừa nhận cách chia session này khác định nghĩa thông thường của Asia/London, và bảo vệ nó bằng kết quả thay vì bằng chuẩn ngành.)*

**Mẹo tổ chức:** dùng **template** trong TradingView — mã màu theo khung thời gian (ví dụ tím cho weekly/daily) để khi xuống khung nhỏ bạn biết mức nào đến từ khung lớn.

## 3. SMT Divergence

Với các thị trường **tương quan** — NASDAQ (NQ), S&P 500 (ES), Dow (YM) — bạn kỳ vọng chúng đi cùng nhau.

**SMT divergence** = một thị trường tạo đáy thấp hơn trong khi thị trường kia tạo đáy cao hơn.

| Divergence ở | Diễn giải |
|---|---|
| **Đáy** | Cú đi xuống chỉ là manipulation để smart money vào vị thế → **bullish** |
| **Đỉnh** | → **bearish** |

Cũng áp dụng cho cặp nghịch: EUR/USD và DXY di chuyển ngược nhau. Nếu tương quan bị phá vỡ → SMT divergence → khả năng có chuyển động lớn.

⚠️ Điểm mấu chốt: **không phải chỉ phát hiện SMT divergence, mà là biết ở đâu và khi nào nó quan trọng.** Thời gian giúp làm điều đó chính xác hơn giá đơn thuần.

**Cheat sheet tương quan:**
- Cùng chiều: NQ / ES / YM.
- Ngược chiều: EUR-USD vs DXY, vàng vs DXY, bond vs equity.

*(Có tranh luận trong cộng đồng về việc nên trade thị trường nào — cái tạo đáy thấp hơn hay cái tạo đỉnh cao hơn. Quan điểm thực dụng: trade cái nào có setup tốt hơn.)*

## 4. Market Maker Model — bản đơn giản hoá

Đây là một khái niệm bị làm phức tạp quá mức (distribution, redistribution, SMR…). Bản chất đơn giản:

> Khi bạn chạm một **key level khung lớn**, hãy xuống **khung nhỏ** và tìm một cú đảo chiều từ đó.

Có consolidation trên đường tới key level, có thanh khoản ở các vùng đó, và có một consolidation gốc nơi khung lớn bắt đầu đảo chiều.

**Giá trị thật:** nó giúp bạn **tránh overtrade** và **giữ lệnh tốt lâu hơn**, vì bạn biết mình đang đi từ key level này tới key level kế tiếp.

**Ví dụ đa khung:** Tuần → 4 giờ → 15 phút. Giá vào FVG khung tuần → xuống 4h tìm market maker model → sau CISD, các nến giảm hoạt động như hỗ trợ → xuống 15 phút cho chi tiết hơn. Khi nhiều khung đồng bộ, key level có xác suất chạy cao hơn nhiều.

## 5. Tin tức như bộ lọc thời gian

Kiểm tra Forex Factory mỗi ngày trước khi giao dịch. Lọc theo thị trường (chỉ USD nếu trade futures).

**Quan điểm trái chiều với lời khuyên phổ biến:** *"Đừng bao giờ trade ngày có red folder news"* bị coi là lời khuyên tệ.

> Tôi **muốn** có red folder news vào ngày tôi trade, vì tôi biết ngày đó có khả năng mở rộng hơn. Không có red folder news → tôi giảm rủi ro vì thị trường có khả năng đi ngang.

Nhưng: **không được ở trong lệnh ngay trước tin.** Lý do là **slippage** — khi thanh khoản mỏng (trader có kinh nghiệm đứng ngoài chờ), giá có thể xuyên qua stop của bạn quá nhanh và bạn **mất nhiều hơn mức đã định**.

**Tin quan trọng nhất:** NFP, CPI (lạm phát), FOMC — cụ thể là **federal funds rate**, không phải minutes.

Quy tắc diễn giải thô:
- **Lãi suất**: actual ≤ forecast → bullish. Actual > forecast → **rất** bearish.
- **CPI**: lạm phát thấp hơn dự báo → bearish cho USD → **bullish cho chứng khoán** (vì chứng khoán đi ngược USD). Không tuyệt đối.

## 6. ⚠️ Đừng có "daily bias"

Đây là điểm mạnh nhất của khung này, và nó **đồng thuận với quan điểm quant**:

> **Đừng bao giờ mắc kẹt trong một bias.** Việc của bạn là **phản ứng, không phải dự đoán.**

Thay vì bias, hãy dựng **kịch bản**: *"Nếu giá chạm mức A và không phản ứng đi lên, tôi sẽ trade xuống các đáy."*

Không phải: *"Tôi chỉ bullish hôm nay."*

Lý do: khi bạn khoá não vào một bias, não bạn **chỉ lọc thông tin xác nhận** và bỏ qua mọi thứ mâu thuẫn. Dữ liệu thực tế từ 400+ lệnh: **win rate ~70% khi không có bias vs ~55% khi có bias**; profit factor từ ~1,9 lên ~2,9. Xem [[Trading Psychology]].

Bạn **có thể** nghiêng về một hướng để điều chỉnh rủi ro — thấy đúng cái mình chờ thì size nặng hơn, không thấy thì vẫn vào nhưng nhẹ hơn. Nhưng **không bao giờ ngại đảo chiều**.

## 7. Cạm bẫy
- **Đánh dấu quá nhiều mức.** Danh sách ở mục 2 là **đủ**.
- **Không dùng giờ New York.**
- **Giữ lệnh qua tin lớn.** Slippage.
- **Bám vào daily bias.** Xem mục 6.
- **Nghĩ chia session theo cách này là chuẩn ngành.** Nó không phải.

## 8. Checklist áp dụng
- [ ] Tôi đã đánh dấu đủ và **chỉ** các mức ở mục 2 chưa?
- [ ] Giờ tôi dùng có phải New York/EST không?
- [ ] Mức nào **chưa** bị giao dịch vào?
- [ ] Hôm nay có red folder news không? Lúc mấy giờ?
- [ ] Tôi có đang mắc kẹt trong một bias không, hay tôi đã dựng nhiều kịch bản?
- [ ] Có SMT divergence nào giữa các thị trường tương quan không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| TradingView | Vertical line, Fib, template mức theo màu | https://www.tradingview.com |
| Forex Factory | Lịch tin, lọc red folder | https://www.forexfactory.com |
| TradeZella | Journal lọc theo setup và **khung giờ** | https://www.tradezella.com |

## Tham khảo
- Casper SMC — *Easiest Way To Trade ICT in 2026 as a Beginner*: https://www.youtube.com/watch?v=HC2iUkI8Dh8
- Inner Circle Trader: https://www.youtube.com/@InnerCircleTrader
- Admati & Pfleiderer — *A Theory of Intraday Patterns*, RFS (1988) — nền học thuật cho mẫu hình thanh khoản trong ngày
- ⚠️ Đối chiếu: [[Quant Critique of ICT]]

## Liên kết
[[ICT Liquidity]] · [[Market Structure and Displacement]] · [[Fair Value Gaps and Order Blocks]] · [[Trading Psychology]] · [[Quant Critique of ICT]] · [[Quant]]
