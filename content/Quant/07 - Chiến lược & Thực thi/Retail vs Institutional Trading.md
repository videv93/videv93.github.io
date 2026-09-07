---
tags: [quant, strategy, industry]
status: evergreen
---
# Retail vs Institutional Trading

> Hai không gian khác nhau về căn bản, với chức năng kinh doanh và ràng buộc khác nhau. Và một số điều bạn nghe về retail là sai — theo cả hai chiều.

## 1. Retail trading

Retailer = bất kỳ ai tham gia thị trường bằng vốn của mình, dù dùng thuật toán riêng, mà không có hậu thuẫn/công nghệ institution hay chức năng kinh doanh nào.

**Phân phối rất lệch:** kết hợp giữa trader cực kỳ thiếu thông tin và một số trader có thông tin (chuyên gia đã nghỉ hưu, người am hiểu hơn mặt bằng chung).

### ⚠️ Đập bỏ một huyền thoại

> **Thị trường không quan tâm bạn rút tiền ra từ nó hay mất tiền vào nó.** Nó không có khả năng quan tâm.

Nếu bạn rút hàng trăm nghìn — thậm chí hàng triệu đô — từ các công cụ thanh khoản cao, **không ai chớp mắt**. Bạn **không** có vấn đề scalability. **Không ai nhắm vào bạn.**

Đúng là bạn cung cấp thanh khoản cho lệnh lớn và người có thông tin tốt hơn — nhưng điều đó chỉ đúng nếu bạn *mua cao bán thấp*. Đó không phải âm mưu; đó là bạn giao dịch tệ.

> **P&L của bạn hoàn toàn do việc ra quyết định của bạn quyết định.**

### Vấn đề thật của retail

Bạn nhận rủi ro mỗi khi vào lệnh, và kết quả vốn dĩ bất định. Có edge → theo thời gian bạn kiếm được. Không có → theo thời gian bạn mất.

**Cái gì KHÔNG phải edge:** vào lệnh, thấy drawdown, bán vì sợ.
**Cái gì CÓ THỂ là edge:** có một outlook rằng một sự kiện sẽ xảy ra và tạo price action làm tăng giá trị vị thế.

> **Không phải chuyện thông minh. Là chuyện thống kê và khả năng nhận rủi ro.** Rất nhiều trader tôi biết không phải người thông minh nhất — và họ không cần phải thế. Họ cần hiểu edge, và biết khi nào **thích hợp** để nhận rủi ro, khi nào không.

### Sự thật khó nghe

> **Phần lớn mọi người không nên trade.**

Họ nên **đầu tư**. Mục tiêu của họ vốn dĩ là tích luỹ tài sản theo thời gian. Mua SPY và giữ 30 năm sẽ cho tài sản lớn hơn nhiều so với day trade Doge.

*"Tôi thông minh mà, tôi có tiền, tôi tự tìm hiểu được"* — một bác sĩ phẫu thuật chỉnh hình nói vậy sau khi thấy các "crypto millionaire" 20 tuổi. Không hoạt động như thế. Những người tự nhận triệu phú kia có thể chỉ đổ hết tiền vào một meme coin nhảy 10.000%. Đó là đánh bạc.

Đó cũng là lý do trader **không** vay một khoản lớn, đặt hết vào một lệnh, rồi nghỉ hưu tuần sau. Không gian này không vận hành như thế.

## 2. Cảnh giác với cái gì (retail)

| Nguồn | Động cơ thật |
|---|---|
| **Nền tảng tự động hoá** (backtest, tối ưu hoá) | Muốn tiền subscription. Và *vì sao* bạn lại tối ưu hoá backtest? Bạn đang overfit noise |
| **Tin tức** ở mọi dạng | Muốn sự chú ý của bạn. "Ba cổ phiếu này sẽ làm bạn giàu" |
| **Broker và app** | Muốn phí giao dịch. Bạn tải app, nạp tiền, và **giao dịch được trước cả khi tiền về** |
| **Guru** | Muốn bán khoá học |

Đối sách duy nhất: **làm chủ kỹ năng định lượng của chính bạn** để tự ra quyết định. Không quan trọng bạn học ở đâu — nền tảng nào, bằng toán, hay tự học.

## 3. Institutional — sell side

Thường người ta bắt đầu ở sell side rồi chuyển sang buy side, nơi giao dịch đầu cơ có thể sinh lời hơn.

**Sell side quote hai chiều — làm market và thu spread.** Phần lớn đã tự động hoá, đặc biệt ở tần suất cao.

**Edge của họ:** mid price **không cần hoàn hảo**. Không có price prediction. Bạn dự báo một mức kỳ vọng; nếu đủ tốt, bạn quote spread quanh nó và thu lời. Xem [[Market Making]].

**Nhưng họ có rủi ro riêng:**
| Rủi ro | Nội dung |
|---|---|
| **Inventory risk** | Bị hit ở bid mà không được lift ở ask → tích luỹ áp lực một chiều |
| **Adverse selection** | Cái trông như P&L dễ thực ra là một trader có thông tin tốt hơn. Ai đó gom deep OTM call, bạn nghĩ "nhận cả ngày", rồi giá dịch chuyển khổng lồ |
| **Technical error** | Ngân hàng và hedge fund mất **hàng triệu đô mỗi ngày** vì lỗi kỹ thuật. Vì sao họ chia sẻ? Họ không. Bạn chỉ nghe về những vụ đủ lớn để đánh chìm cả tổ chức |
| **Volatility, counterparty** | — |

Lưu ý: market maker **vẫn** giao dịch discretionary. Họ có cần gạt (skew) thay đổi ai giao dịch với họ ở phía nào.

## 4. Institutional — buy side (quant trading)

Tập trung vào **xây dựng signal**. Ví dụ: dùng biểu cảm khuôn mặt CEO, tweet, bài báo, ML/AI để trích xuất sentiment score, gán mỗi score cho một ticker → chuỗi thời gian của score → **signal**.

Phân tích return trong **cross-section**: quantile plot của signal vs average return. Xây danh mục long-short: long quantile cao, short quantile thấp. Đo bằng alpha regression. Xem [[Alpha Signals]].

**Thách thức:**
- **Scalability.** Càng cấp nhiều vốn cho một signal, signal càng suy giảm. Không phải bài toán tầm thường. *Ai nói nó dễ thì không hiểu không gian này.*
- **Quan hệ và cạnh tranh vốn.** "Đây là chiến lược, đây là backtest, giờ tôi cần huy động vốn."

## 5. ⚠️ Institution không bất khả xâm phạm

> Institution và hedge fund **nổ tài khoản suốt**. Họ hết tiền. Họ phá sản.

Phải phân biệt Citadel với một quỹ quant mới thành lập — như phân biệt Microsoft với một startup công nghệ mới. Startup công nghệ đóng cửa mỗi ngày; các quỹ quant nhỏ cũng vậy. **Họ không biết gì mà bạn không biết. Họ gặp đúng những khó khăn như mọi trader khác.**

Bí mật của hedge fund **không** chỉ ra hiệu suất hay kỹ năng. Hedge fund gần đây hoạt động không tốt — và điều đó không bất ngờ: **"hedge" nằm ngay trong tên**. Họ không giỏi trong bull market.

> **Mispricing tạo ra P&L. Volatility tạo ra mispricing. Bull market thì nhàm chán.** Nhìn hiệu suất hedge fund khi mặt nước lặng, so với khi sóng dữ.

## 6. Retail có trade được chiến lược institution không?

**Vừa có vừa không.** Câu hỏi ngược lại là: **ai sẽ xây hạ tầng cho bạn? Ai nhận rủi ro? Ai tối ưu hoá chiến lược của bạn?**

> Tôi sẽ không bao giờ giao dịch trên một nền tảng chạy backtest hộ tôi hoặc deploy chiến lược của tôi hộ tôi. Tôi tự xây hạ tầng đó.

## 7. Phân bổ vốn: tổ hợp tuyến tính

Bất kể bạn dùng hệ nào, bạn luôn đối mặt với một **tổ hợp tuyến tính** của giá trị danh mục: bao nhiêu vào discretionary, bao nhiêu vào algorithmic, bao nhiêu vào thị trường.

Nếu bạn tự tin việc phân bổ chỗ khác là đúng, **vì sao chỉ bán một nửa vị thế?** Bán hết và chuyển. Nếu muốn giảm rủi ro và exposure thì mới bán một nửa.

Chạy min-variance optimization ra 15% / 75% / 10% — **những trọng số đó sai**. Chúng ước lượng từ dữ liệu và không hội tụ. Đây **không phải bài toán tối ưu toàn cục**; không gian biến thiên mạnh theo thời gian. Xem [[Efficient Frontier]].

Tương tự institution: các desk trade chiến lược khác nhau, các team trade chiến lược khác nhau. Hedge fund không chỉ long-short một chiến lược quant duy nhất.

## 8. Checklist áp dụng
- [ ] Tôi **nên** trade, hay nên đầu tư?
- [ ] Tôi có edge không, hay tôi có hy vọng?
- [ ] Nền tảng/nguồn tôi đang dùng kiếm tiền bằng cách nào?
- [ ] Tôi có tự xây hạ tầng của mình không, hay outsource cho một hộp đen?
- [ ] Tôi có nhiều sleeve không? Trọng số hiện tại là gì và vì sao?
- [ ] Nếu tôi khoe hiệu suất, tôi có đang chọn cửa sổ có lợi không? Xem [[Performance Metrics]]

## Tham khảo
- Quant Guild — *Quant Trader on Retail vs. Institutional Trading*: https://youtu.be/j1XAcdEHzbU
- Quant Guild — *Quant Explains Algorithmic Market-Making*: https://youtu.be/aVzFKwyzwM0
- Quant Guild — *Quant on Trading and Investing*: https://youtu.be/CKXp_sMwPuY
- Quant Guild — *Non-Target to Quant: How to Get a Quant Job in 3 Steps*: https://youtu.be/qBSrjoTdQpA
- Harris, L. — *Trading and Exchanges: Market Microstructure for Practitioners*
- Patterson, S. — *The Quants*

## Liên kết
[[Market Making]] · [[Quant vs Discretionary Trading]] · [[Alpha Signals]] · [[Volatility Risk Premium]] · [[Efficient Frontier]] · [[Quant]]
