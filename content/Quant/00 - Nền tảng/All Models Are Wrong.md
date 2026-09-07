---
tags: [quant, foundation, modeling]
status: evergreen
---
# All Models Are Wrong

> *"All models are wrong, some are useful"* (George Box). Trong quant finance đây không phải câu nói cửa miệng — nó là điều kiện làm việc. Câu hỏi đúng là: **model sai theo cách nào, và cái sai đó có ngăn tôi ra quyết định tốt hơn không?**

## 1. Vì sao ta xây model

Nếu ta biết dynamics thật thì đã không cần model. Ta xây model **chính vì** không biết. Do đó mọi model đều chứa giả định, và mọi giả định đều là chỗ model sai.

Người vào comment "giả định của anh bị vi phạm trong thực tế" đã bỏ lỡ điểm chính: đưa ra giả định không có nghĩa lập luận không nhất quán nội tại. Xem [[Feynman-Kac and Risk-Neutral Pricing]] — một ví dụ về việc chứng minh model *đúng so với chính khung của nó*.

## 2. Không phải giả định nào cũng sai như nhau

| Giả định | Mức độ "xúc phạm" | Hệ quả thực tế |
|---|---|---|
| No arbitrage | Thấp | Mispricing tĩnh tồn tại nhưng bị ăn rất nhanh bởi bên low-latency. Chấp nhận được |
| Constant volatility (Black-Scholes) | **Rất cao** | Không định giá nhất quán exotic được. Nhưng: đảo ngược model cho ra **implied volatility** — một đại lượng cực kỳ hữu ích |
| Stationarity (time series) | **Rất cao** | Regime đổi, doanh nghiệp đổi. Đây là vấn đề lớn nhất của quant modeling. Xem [[Stationarity and Non-Stationarity]] |
| Homoscedasticity (phương sai không đổi) | Rất cao | Đánh giá thấp nghiêm trọng tail risk. Xem [[ARCH and GARCH Models]] |
| Gaussian returns | Cao | Fat tails → VaR sai lệch tới ~20% |
| Markov property | Trung bình | Bỏ qua long memory / rough volatility |

Điểm mấu chốt: **giả định sai vẫn có thể sinh ra output cực giá trị**. Constant vol là sai một cách hiển nhiên, nhưng chính nó cho ta implied volatility surface — thước đo thị trường đang định giá bất định ở mức nào.

## 3. Model sai vẫn kiếm được tiền — với điều kiện nào?

Điều kiện là: **đúng trên trung bình (correct on average) trong một chuỗi đủ dài giao dịch.**

Hai ví dụ chuẩn:

**Market making trên xúc xắc gian lận.** EV thật đổi ngẫu nhiên theo thời gian, ta không quan sát được. Dùng moving average để ước lượng mức mid, quote spread quanh đó. Kết quả: vẫn tích luỹ P&L, dù model chắc chắn sai. Xem [[Market Making]].

**Trò tung đồng xu có $p$ thay đổi.** Naive trader luôn chơi. Quant trader ước lượng $p$ từ 30 lần tung gần nhất — luôn sai — nhưng chỉ giao dịch khi ước lượng > 50%. Kết quả: tích luỹ wealth dương.

Và mở rộng quan trọng: nếu **hai quant dùng cùng một model**, không ai giao dịch với ai (cả hai đều thấy đối phương có edge). Thực tế thị trường có giao dịch vì **mọi người dùng model khác nhau và ai cũng tin mình đúng**. Trong mô phỏng hai quant dùng cửa sổ 5 ngày vs 60 ngày, người thích ứng nhanh hơn lấy tiền của người kia. **Cả hai model đều sai.**

## 4. Đây chính là "how to trade"

Câu hỏi "làm sao học trade?" ngầm giả định có một đích tĩnh. Không có. Câu hỏi đúng là:

> Làm sao xây được model cho tôi EV dương trong giao dịch tôi đang tham gia?

Đó là lý do Citadel / Jane Street / Jump tuyển PhD toán, thống kê, CS — **không phải** vì họ biết Apple lên hay xuống tuần sau. Không ai biết. Mà vì mục đích của modeling là áp cấu trúc hữu ích lên bất định để có edge so với đối thủ — và đối thủ cũng đang làm đúng như vậy.

## 5. Cạm bẫy

- **"Model sai nên vô dụng."** Sai. Xem mục 3.
- **"Model đúng nên tôi an toàn."** Cũng sai. Model bạn cho là đúng thường chỉ là chưa gãy. Xem [[Model Specification and Parameterization]].
- **Dùng model ngoài phạm vi hợp lệ.** Black-Scholes định giá vanilla European khá tốt; dùng nó cho exotic với constant vol thì hỏng.
- **Không biết mình đang giả định gì.** Nếu bạn nhờ ChatGPT chạy backtest hộ và không hiểu bias nào đang được đưa vào, bạn không có model — bạn có một biểu đồ.
- **Cãi về "model nào đúng" thay vì "model nào hữu ích cho quyết định này".**

## 6. Checklist áp dụng
- [ ] Tôi liệt kê được đủ giả định của model đang dùng chưa?
- [ ] Giả định nào bị vi phạm nặng nhất trong thực tế? Hệ quả cụ thể là gì?
- [ ] Model của tôi có cần **đúng**, hay chỉ cần **đúng trên trung bình**?
- [ ] Output của model đi vào quyết định nào? Nếu không quyết định gì thì model để làm gì?
- [ ] Nếu regime đổi, tôi biết bằng cách nào? Kế hoạch cập nhật là gì?

## Tham khảo
- Box, G.E.P. — *Science and Statistics*, JASA (1976), nguồn gốc câu nói
- Quant Guild — *How to Trade*: https://youtu.be/NqOj__PaMec
- Quant Guild — *Trading with Violated Model Assumptions*: https://youtu.be/2ezWtM8J_os
- Quant Guild — *Why Quant Models Break*: https://youtu.be/brdG1TmsPlw
- Derman, E. — *Models.Behaving.Badly*

## Liên kết
[[Model Specification and Parameterization]] · [[Black-Scholes Model]] · [[Stationarity and Non-Stationarity]] · [[Market Making]] · [[Quant]]
