---
tags: [quant, strategy]
status: growing
---
# Quant vs Discretionary Trading

> Hai cách tiếp cận, **một mục tiêu duy nhất**: tối đa hoá expected value bằng cách hành động tối ưu dưới bất định. Cuộc tranh cãi "cái nào tốt hơn" thường là tranh cãi sai.

> [!note] Ghi chú nguồn
> Trong seed gốc, file `Quant vs. Discretionary Trading.md` chỉ có đúng một dòng: *"Discretionary Traders"* — một **header rỗng**. Note này trả lời hứa đó, tổng hợp từ các nguồn trong cùng vault.

## 1. Bảng so sánh

| | Quant / systematic | Discretionary |
|---|---|---|
| Ra quyết định | Thuật toán, quy tắc hoá | Con người, theo bối cảnh |
| Nguồn edge | Bất hiệu quả thống kê có thể đo | Kinh nghiệm, lợi thế thông tin, đọc bối cảnh |
| Đo lường | Quantile plot, alpha regression, backtest | Rất khó — mẫu chỉ thực hiện một lần |
| Khả năng mở rộng | Cao (tới giới hạn capacity) | Thấp — gắn với con người |
| Tốc độ | Micro giây tới ngày | Phút tới tháng |
| Điểm gãy | Regime change, overfit, crowding | Tilt, bias, không nhất quán |
| Học được không | Học được model + pipeline | Học được, nhưng qua **rất nhiều** lần lặp |

## 2. Vì sao discretionary có chỗ đứng chính đáng

Đây là lập luận từ **một quant**, không phải từ người bênh vực TA:

> Không phải mọi thứ đều quy được về chiến lược systematic hay algorithmic. Có lý do rất vững cho các hệ mid-to-high-touch với trader dày dạn hành động tối ưu dưới bất định — đúng như một poker pro chuyên nghiệp.

**Lập luận hình thức:** reinforcement learning agent học chơi poker và học trade **đang học đúng thứ mà con người pro học** — một [[Optimal Policy Function]]. Không có literature nào mâu thuẫn điều này.

Nhưng các model đó **bị giới hạn bởi dữ liệu chúng nạp được**. Con người tiếp cận thông tin ở dạng liên tục hơn nhiều, và hành động linh hoạt hơn. Trong một số trường hợp con người **outperform** nhờ các "intangible" mà model không có.

**Ví dụ về edge định tính không quy được thành thuật toán:** bạn nhờ một poker pro chỉ cách chơi. Anh ta nói "làm cái này". Bạn hỏi "vì sao?". Anh ta có ngồi giải thích 10 triệu lẻ một lý do — người này đang bluff, người kia sắp all-in — không? Không. Quá nhiều mảnh chuyển động.

Bảo rằng nó **không tồn tại** thì vô lý. Bạn có thể cố áp cấu trúc để giải thích một phần biến thiên, và làm khá tốt. Nhưng vẫn có edge định tính.

## 3. Vì sao quant có lợi thế

- **Cấu trúc rõ ràng** → đo được, backtest được, cải thiện có hệ thống.
- **Không tilt.** Máy không revenge trade.
- **Mở rộng theo vốn và theo số chiến lược.** Nhiều team, nhiều chiến lược, mỗi cái tối đa hoá EV riêng → tốt hơn nhiều so với đặt hết trứng một giỏ.
- **Khai thác được big data** — text, news, audio, video, alternative data. Xem [[Alternative Data]].

## 4. Trong thực tế: không ai thuần một phía

Ví dụ cụ thể từ một quant giao dịch vốn cá nhân:
- Có **discretionary trade** — đặt vì tin có edge, không hệ thống nào làm hộ.
- Có **algorithmic trade** — hệ thống thực thi theo quy tắc định trước, **bật/tắt vào những thời điểm khác nhau**.
- Có phần chỉ để tiền ở S&P 500.

> Tôi giao dịch discretionary khi nó phù hợp. Tôi bật hệ thống khi nó phù hợp. Tôi để tiền ở S&P 500 khi nó phù hợp.

Và ngay cả **market maker** — vốn được coi là thuần systematic — vẫn giao dịch discretionary: họ có các cần gạt (skew chẳng hạn) thay đổi ai sẽ giao dịch với họ ở phía nào của spread. Xem [[Market Making]].

Cả hai đều gặp cùng một vấn đề: **đây không phải bài toán tối ưu toàn cục.** Bạn không quyết định được điều kiện thị trường, hay chiến lược nào phù hợp lúc này. EV của mỗi cách tiếp cận thay đổi theo thời gian.

## 5. Điểm chung sâu nhất

Cả hai đều là **games of incomplete information**. Cả hai đều:
- Tối đa hoá EV, không dự đoán giá.
- Dùng **model values sai** (implied volatility, implied probability / pot odds, out probability) để ra quyết định tốt hơn.
- Cần [[Risk Management]] để cắt lỗ sớm và để winner chạy.
- Cần khai tử chiến lược chết và thích nghi với regime mới.
- Đo bằng **độ ổn định hiệu suất qua chuỗi dài**, không phải bằng một kết quả.

> Đây là lý do khi thuê một trader nhiều kinh nghiệm hơn, bạn cấp cho họ nhiều vốn hơn — bạn kỳ vọng sự ổn định tương đối, đúng như kỳ vọng ở một poker pro.

## 6. Cạm bẫy
- **Nghĩ "quant" nghĩa là "không cần phán đoán".** Chọn model, chọn cửa sổ, chọn khi bật/tắt — tất cả đều là phán đoán.
- **Nghĩ "discretionary" nghĩa là "vẽ đường trên biểu đồ".** Discretionary có kỷ luật là hành động theo policy đã học, có SOP.
- **Dùng metric của quant để đánh giá discretionary.** Sharpe của một tài khoản giao dịch nhiều kiểu là con số vô nghĩa. Xem [[Performance Metrics]].
- **Nghĩ phải chọn một phía.**

## 7. Checklist áp dụng
- [ ] Tôi đang ở phía nào? Vì sao?
- [ ] Nếu discretionary — tôi có SOP viết thành văn không? Xem [[Trading Psychology]]
- [ ] Nếu quant — tôi có tiêu chí bật/tắt hệ thống không?
- [ ] Tôi đánh giá mình bằng metric phù hợp với cách tiếp cận của mình không?
- [ ] Tôi có nhiều sleeve, hay đang đặt hết trứng một giỏ?

## Tham khảo
- Quant Guild — *Quant vs. Discretionary Trading*: https://youtu.be/3gblERSSHXI
- Quant Guild — *Why Poker Pros Make the Best Traders*: https://youtu.be/JuD3KGQhofw
- Quant Guild — *Quant Trader on Retail vs. Institutional Trading*: https://youtu.be/j1XAcdEHzbU
- Brown & Sandholm — *Superhuman AI for multiplayer poker*, Science (2019)
- Chan, E. — *Quantitative Trading*

## Liên kết
[[Optimal Policy Function]] · [[Retail vs Institutional Trading]] · [[Market Making]] · [[Risk Management]] · [[Games of Chance vs Games of Incomplete Information]] · [[Quant]]
