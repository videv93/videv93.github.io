---
tags: [quant, strategy, execution]
status: evergreen
---
# Market Making

> Chức năng kinh doanh: quote cả hai chiều và thu spread. Điểm mấu chốt: **mid price của bạn không cần đúng — chỉ cần đúng trên trung bình.**

## 1. Cơ chế cơ bản

Quote một **bid** (giá bạn sẵn sàng mua) và một **ask/offer** (giá bạn sẵn sàng bán) quanh một mức kỳ vọng. Khách hàng bán cho bạn ở bid, mua từ bạn ở ask. Bạn thu chênh lệch.

**Ví dụ dạy học — market cho xúc xắc.** EV của một lần tung = 3,5, và **không đổi theo thời gian**.
- Quote spread quanh 3,5.
- Arrival của khách theo phân phối Poisson, cả hai phía.
- Tích luỹ P&L qua chuỗi giao dịch.

Kết quả: **dù kết quả từng lần tung là ngẫu nhiên, bạn vẫn tích luỹ tài sản** — vì bạn biết mức kỳ vọng.

Ngược lại, đây cũng chính là cơ chế cho thấy [[Edge and Expected Value]] hoạt động thế nào: nếu bạn dựng bàn trên phố quote "bán ở 2, mua ở 5" cho trò xúc xắc, và người qua đường không có khái niệm expected value — bạn **chính là casino**.

## 2. Vấn đề thật: mid price di chuyển

Cổ phiếu không như xúc xắc. Mức kỳ vọng **thay đổi theo thời gian**.

Giải pháp: dùng model time series để ước lượng mức đó, rồi quote spread quanh nó.

**Mô phỏng.** Cùng market, nhưng trọng số của xúc xắc **tiến hoá ngẫu nhiên theo thời gian**. Dùng một moving average đơn thuần để dò mức. Quote spread quanh mức lý thuyết đang di chuyển đó.

Kết quả: **vẫn tích luỹ P&L**, dù không hề biết mức kỳ vọng thật, dù nó đổi ngẫu nhiên.

> Đây là ví dụ hoàn hảo: **model của tôi sai, và tôi chắc chắn nó sai, nhưng tôi vẫn kiếm được tiền.** Vì tôi đúng trên trung bình.

Xem [[All Models Are Wrong]], [[Filtering Smoothing and Forecasting]].

**Đây là gần như trường hợp duy nhất** mà time series analysis / tạo ra một mức kỳ vọng thực sự hữu ích một cách trực tiếp cho việc kiếm tiền. Xem [[Time Series Analysis]].

## 3. Các loại rủi ro

| Rủi ro | Nội dung |
|---|---|
| **Inventory risk** | Bị hit ở bid mà không được lift ở ask → áp lực mua/bán một chiều. Bạn có thể lãi hoặc lỗ ở cả hai chiều |
| **Adverse selection** | Cái trông như P&L dễ thực ra là trader có thông tin tốt hơn. Ai đó gom deep OTM call một cách "ngây thơ" → rồi giá dịch chuyển khổng lồ. Có thể là insider information |
| **Technical error** | Ngân hàng và hedge fund mất hàng triệu đô mỗi ngày vì lỗi kỹ thuật |
| **Volatility risk** | Spread cần rộng ra khi vol tăng |
| **Counterparty risk** | — |

Xem [[Retail vs Institutional Trading]] để so sánh với các loại rủi ro của buy side và retail.

## 4. Market maker vẫn giao dịch discretionary

Là market maker **không** có nghĩa bạn thuần systematic. Bạn có các **cần gạt** ở phía này của thị trường — ví dụ điều chỉnh **skew** — thay đổi ai sẽ giao dịch với bạn ở phía nào của spread.

Mục tiêu vẫn là tích luỹ P&L như mọi người khác; chỉ là edge vận hành khác đi vì bạn đang phục vụ một chức năng kinh doanh.

## 5. Quan hệ với option pricing

Cùng cấu trúc logic với [[Trading with a Pricing Model]]:
- Market maker: mức kỳ vọng "đủ tốt" → quote quanh nó → thu qua nhiều giao dịch.
- Model trader: giá lý thuyết → giao dịch khi thị trường lệch → thu qua nhiều giao dịch.

Cả hai đều không dự đoán. Cả hai đều dựa vào **đúng trên trung bình**.

Với option, market maker ở phía bên kia hợp đồng của bạn đang **hedge** và tìm lợi nhuận từ spread — đó là lý do bạn không thực sự "lấy EV từ một counterparty" như trong poker. Xem [[European Options]].

## 6. Cạm bẫy
- **Quote spread quá hẹp.** Không đủ đệm cho adverse selection và inventory risk.
- **Không điều chỉnh spread theo volatility.** Vol tăng → spread phải rộng ra.
- **Bỏ qua inventory.** Tích luỹ vị thế một chiều mà không skew quote là cách nhanh nhất để bị thổi bay.
- **Nghĩ "P&L dễ" là P&L dễ.** Thường đó là adverse selection.
- **Dùng mức kỳ vọng quá cũ.** Model phải cập nhật kịp với mid di chuyển.

## 7. Checklist áp dụng
- [ ] Mức kỳ vọng của tôi đến từ model nào? Nó cập nhật nhanh thế nào?
- [ ] Spread của tôi có đủ rộng cho adverse selection không?
- [ ] Tôi skew quote theo inventory như thế nào?
- [ ] Spread có mở rộng khi vol tăng không?
- [ ] Tôi có theo dõi được luồng nào là "toxic" (có thông tin) không?
- [ ] Nếu model mid của tôi lệch 1%, tôi lỗ bao nhiêu?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Interactive Brokers API | Dữ liệu thị trường + thực thi (Java/Python/C++) | https://www.interactivebrokers.com |
| Avellaneda-Stoikov model | Mô hình market making kinh điển, dùng cả trong các cuộc thi của Citadel | — |
| Open-source market-making game | Luyện quote hai chiều | https://youtu.be/3KYJlI36Omc |

## Tham khảo
- Avellaneda & Stoikov — *High-frequency trading in a limit order book*, Quantitative Finance (2008)
- Glosten & Milgrom — *Bid, ask and transaction prices in a specialist market with heterogeneously informed traders*, JFE (1985) — adverse selection
- Quant Guild — *Quant Explains Algorithmic Market-Making*: https://youtu.be/aVzFKwyzwM0
- Quant Guild — *Time Series Analysis for Quant Finance*: https://youtu.be/JwqjuUnR8OY
- Cartea, Jaimungal & Penalva — *Algorithmic and High-Frequency Trading*
- Harris, L. — *Trading and Exchanges*

## Liên kết
[[Trading with a Pricing Model]] · [[Retail vs Institutional Trading]] · [[Time Series Analysis]] · [[All Models Are Wrong]] · [[Edge and Expected Value]] · [[Quant]]
