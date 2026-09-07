---
tags: [quant, ict, price-action, critique, core]
status: evergreen
---
# Quant Critique of ICT

> Note bản lề của vault này. Cụm `08` ghi lại một khung retail phổ biến; note này đối chiếu nó với phần còn lại của vault. **Đọc note này trước khi áp dụng bất kỳ note nào trong cụm 08.**

## 1. Vì sao ICT không bị bác bỏ dứt điểm

Lập luận từ phía quant, và nó **công bằng với ICT**:

> Không thể chỉ chạy một backtest đơn giản trên một chỉ báo kỹ thuật rồi kết luận nó "hoạt động" hay "không hoạt động".

Lý do nằm ở [[Randomness vs Uncertainty]]: thị trường là hệ **bất định**, không phải hệ ngẫu nhiên. Trong hệ bất định, một chỉ báo là **thành phần của [[Optimal Policy Function]]** $\pi^*$, không phải một quy tắc độc lập có xác suất cố định để test.

Đây chính xác là điều một ván pocket aces minh hoạ: chiến lược chung nói "fold hơn nửa số lần", nhưng $\pi^*$ tốt có thể biến tỉ lệ thắng thành 60/40. Chiến lược **tăng cường** edge; nó không tự làm edge dương.

Nói cách khác: câu hỏi *"technical analysis có hiệu quả không?"* bị **đặt sai**.

## 2. Chỗ hai khung **đồng thuận**

Đáng chú ý là ICT (ít nhất trong phiên bản trong seed này) và quant đồng ý ở nhiều điểm quan trọng:

| Điểm | ICT nói | Quant nói |
|---|---|---|
| Không có bias / dự đoán | "Việc của bạn là phản ứng, không phải dự đoán" | "Mục tiêu không bao giờ là dự đoán, mà là positioning and survival" — [[Efficient Market Hypothesis]] |
| Không có holy grail | "Không có chiến lược win rate 100%" | "Không có golden goose strategy" — [[Optimal Policy Function]] |
| Chuỗi thua là bình thường | Win rate 70% → 93% khả năng có chuỗi 3 thua | Xem [[Risk Management]] |
| Risk management là tất cả | "Không quản rủi ro thì mọi thứ khác vô nghĩa" | Cắt lỗ sớm/để winner chạy là **cần gạt của EV** |
| Journal có lọc dữ liệu | "Bạn lỗ nhiều nhất ở khung giờ nào?" | Phân rã edge thành 4 thành phần — [[Edge and Expected Value]] |
| Bỏ bớt thay vì thêm vào | "Khi tôi có lãi, là vì tôi **bỏ bớt** thứ" | Cùng nhận định |
| Trading phải nhàm chán | "Nếu nó hào hứng, bạn đang đánh bạc" | Xem [[Trading Psychology]] |
| Không đặt tầm quan trọng lên một lệnh | "Bạn còn hàng trăm nghìn lệnh nữa" | Cùng nhận định, từ [[Games of Chance vs Games of Incomplete Information]] |

**Phần rủi ro và tâm lý của ICT (mục 5–8 của [[Time-Based Liquidity]], và [[Trading Psychology]]) là phần vững nhất của khung này** — và nó gần như trùng khớp với quan điểm quant.

## 3. Chỗ nó gãy

### a) ⚠️ Không có phép kiểm chứng

Toàn bộ bằng chứng trong nguồn là **screenshot P&L và ví dụ được chọn lọc trên biểu đồ**. Không có:
- Quantile plot của tín hiệu so với forward return.
- Alpha regression để kiểm tra nó không chỉ là beta.
- Phân phối sai số out-of-sample.
- Đếm số lần thử (bao nhiêu biến thể đã được thử?).

Đây chính xác là những gì [[Alpha Signals]] và [[Backtesting and Overfitting]] yêu cầu.

**Câu hỏi phải đặt ra:** trong bao nhiêu trường hợp mẫu hình xuất hiện mà giá **không** đi tiếp? Ví dụ trên biểu đồ chỉ cho bạn các trường hợp thành công.

### b) ⚠️ Diễn giải sau sự kiện

Displacement/manipulation chỉ xác định được **sau khi** nến đóng. FVG chỉ tồn tại **sau khi** có gap. Điều này khiến khung rất dễ bị **narrative fitting** — nhìn lại biểu đồ thì mọi thứ đều "hợp lý".

Thử nghiệm tự kiểm: che nửa phải biểu đồ. Bạn có ra được cùng kết luận không?

### c) ⚠️ Cơ chế "smart money" không được kiểm chứng

Câu chuyện — "whale cần thanh khoản nên đẩy giá tới cụm stop" — có phần cơ học đúng: cụm stop **là** thanh khoản, và điều đó được nghiên cứu học thuật dưới tên **order flow** và **adverse selection** (Glosten & Milgrom 1985). Xem [[Market Making]].

Nhưng bước từ "thanh khoản tồn tại ở đó" sang "**do đó** có một tác nhân đang cố ý săn nó và bạn dự đoán được thời điểm" là một bước không có bằng chứng công khai nào chống đỡ.

Đối chiếu với [[Retail vs Institutional Trading]]:
> **Thị trường không quan tâm bạn rút tiền hay mất tiền. Nó không có khả năng quan tâm. Không ai nhắm vào bạn.**

Hai câu chuyện này mâu thuẫn trực tiếp.

### d) ⚠️ Vấn đề counterfactual

Kể cả khi một lệnh thắng, bạn **không thể chứng minh** nó thắng vì setup ICT chứ không phải vì một biến Z bạn không quan sát. Xem [[Efficient Market Hypothesis]] mục 4.

Và điều này áp cho **mọi** cách tiếp cận discretionary — không riêng ICT.

### e) ⚠️ Nguy cơ chỉ là beta

Nhiều chiến lược retail trông đẹp thực chất chỉ là market exposure. Ví dụ trong [[CAPM Alpha and Beta]]: chiến lược moving average với Sharpe ~1 hoá ra có **beta = 1,14**. Và khi thêm regime filter, alpha **không có ý nghĩa thống kê**.

Chưa ai chạy phép kiểm này cho các setup ICT một cách công khai.

## 4. Cách dùng cụm 08 một cách trung thực

**Có thể dùng như:**
- **Từ vựng về cấu trúc thị trường** — swing point, gap, cụm thanh khoản là những thứ có thật, quan sát được.
- **Một thành phần của $\pi^*$** — không phải bộ quy tắc độc lập.
- **Kỷ luật quy trình** — danh sách mức cố định, mốc thời gian cố định, giờ giao dịch cố định. Điều này giải quyết vấn đề "thiếu quy trình" trong [[Trading Psychology]].
- **Khung quản rủi ro** — phần này vững độc lập với phần price action.

**Không nên dùng như:**
- Bằng chứng về edge.
- Lý do bỏ qua alpha regression.
- Cơ sở cho size lớn.

## 5. Phép kiểm bạn có thể tự chạy

Nếu muốn biết setup ICT của mình có edge thật không:

1. **Định nghĩa cơ học hoá** setup (không được dùng phán đoán). Nếu không định nghĩa cơ học được → nó là edge định tính, và bạn phải đo bằng **độ ổn định hiệu suất trên chuỗi dài**, không phải backtest.
2. **Đếm số lần thử.** Ghi lại mọi biến thể bạn đã thử.
3. **Quantile plot** — chia setup theo một biến liên tục (ví dụ kích thước FVG, số cấu trúc bị phá), xem forward return có đơn điệu không.
4. **Alpha regression** trên chuỗi P&L của bạn với market return. $\alpha$ có ý nghĩa thống kê không?
5. **Out-of-sample thật** — dữ liệu bạn chưa từng nhìn.
6. **Trừ phí, spread, slippage.**

Nếu vượt qua cả 6 bước → bạn có thứ đáng nói. Nếu không → bạn có một khung tổ chức, và điều đó vẫn có giá trị, nhưng đừng gọi nó là edge.

## 6. Kết luận cân bằng

ICT **không** là rác, và cũng **không** là chén thánh.

- Cơ chế nó mô tả (cụm thanh khoản, order flow bất cân xứng) **có thật** và được nghiên cứu học thuật dưới tên khác.
- Câu chuyện nó kể quanh cơ chế đó **không được kiểm chứng**.
- Phần quản rủi ro và tâm lý của nó **vững**, và trùng với quan điểm quant.
- Cái nó **thiếu** là phép kiểm chứng — và đó cũng là điều nó chia sẻ với gần như mọi khung retail.

> Câu hỏi cuối cùng, dùng chung cho cả vault: **tôi có edge, hay tôi có một câu chuyện hay?**

## 7. Checklist áp dụng
- [ ] Tôi đã che nửa phải biểu đồ và thử ra quyết định chưa?
- [ ] Tôi có đếm cả các lần setup **thất bại** không, hay chỉ nhớ các lần thắng?
- [ ] Tôi đã chạy alpha regression trên P&L của mình chưa?
- [ ] Tôi dùng ICT như một thành phần của policy, hay như bộ quy tắc độc lập?
- [ ] Nếu ai đó nói "smart money đang săn stop của bạn" — họ có bằng chứng gì?
- [ ] Size của tôi có phản ánh mức độ **bất định** về edge của tôi không?

## Tham khảo
- Casper SMC — *Easiest Way To Trade ICT in 2026 as a Beginner*: https://www.youtube.com/watch?v=HC2iUkI8Dh8
- Quant Guild — *Quant Busts 3 Trading Myths with Math*: https://youtu.be/wJfIk3VnubE
- Quant Guild — *I Bet You've Never Found Alpha (and I Can Prove It)*: https://youtu.be/UzTJHs3-eT0
- Quant Guild — *Quant Trader on Retail vs. Institutional Trading*: https://youtu.be/j1XAcdEHzbU
- Glosten & Milgrom — *Bid, ask and transaction prices…*, JFE (1985) — nền học thuật cho "informed trader"
- Aronson, D. — *Evidence-Based Technical Analysis* — cách kiểm định TA đúng phương pháp
- Lo, Mamaysky & Wang — *Foundations of Technical Analysis*, Journal of Finance (2000)
- Bailey, Borwein, López de Prado & Zhu — *Pseudo-Mathematics and Financial Charlatanism*, Notices of the AMS (2014)

## Liên kết
[[ICT Liquidity]] · [[Market Structure and Displacement]] · [[Fair Value Gaps and Order Blocks]] · [[Time-Based Liquidity]] · [[Alpha Signals]] · [[Backtesting and Overfitting]] · [[Optimal Policy Function]] · [[Quant]]
