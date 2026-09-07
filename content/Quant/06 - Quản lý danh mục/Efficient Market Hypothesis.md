---
tags: [quant, portfolio, theory]
status: evergreen
---
# Efficient Market Hypothesis

> Một ý tưởng hay đã đầu độc cả một thế hệ sinh viên. Cả ba dạng đều **không đúng một cách khách quan** — nhưng hiểu vì sao chúng sai mới là điều có giá trị.

## 1. Ba dạng

| Dạng | Nội dung | Hệ quả | Đúng? |
|---|---|---|---|
| **Weak** | Giá phản ánh mọi dữ liệu giao dịch quá khứ (giá, khối lượng) | Technical analysis không tạo excess return có ý nghĩa thống kê | ❌ |
| **Semi-strong** | Giá phản ánh mọi thông tin công khai (cơ bản, tin tức, giao dịch quá khứ) | Cả technical lẫn fundamental analysis đều không tạo excess return bền vững | ❌ |
| **Strong** | Giá phản ánh **mọi** thông tin, kể cả insider | Không ai tạo được excess return, kể cả có insider information → **mọi** return của mọi ngân hàng và hedge fund đều là may mắn | ❌ |

Dạng strong đặc biệt phi lý: nó khẳng định toàn bộ ngành quản lý tài sản chủ động là ngẫu nhiên thuần.

## 2. Nguồn gốc của sự nhầm lẫn

> Sự nhầm lẫn đến từ việc **giá phản ứng nhanh thế nào** với thông tin mới. Điều đó **không có nghĩa** giá là **đúng**. Đây là hai ý tưởng khác nhau.

Khi thông tin mới ra và giá nhảy — cú nhảy đó **không được biện minh về mặt logic**, và nó hoàn toàn có thể **suy giảm ngược về mức cũ**. Nó chỉ có nghĩa: thông tin mới khiến giá phản ứng, vì lý do gì đó.

## 3. Cơ chế thật: cung và cầu

**Equilibrium price** = giá thị trường hiện tại tại bất kỳ thời điểm nào, được tạo ra bởi **cung và cầu**. Nó là **phỏng đoán tốt nhất của thị trường ngay lúc này** dựa trên mọi thứ hiện có.

Cơ chế này giống nhau cho:
- Tài sản thanh khoản cao (ETF, cổ phiếu trên sàn).
- Tài sản kém thanh khoản (một chiếc đồng hồ \$40.000 trong danh mục của bạn).

Nếu thị trường nghĩ một cổ phiếu sẽ tốt hơn trong tương lai → cầu tăng → giá tăng. Nếu số lượng cổ phiếu khả dụng giảm → khan hiếm tự nhiên → giá tăng.

Với hàng trăm triệu nhà đầu tư hoạt động theo cách này, giá làm khá tốt việc phản ánh thông tin có sẵn — đây là **wisdom of the crowds**.

> Nhưng điều đó **không** có nghĩa thị trường duy lý, và **không** có nghĩa nó đúng mọi lúc. Chính điều đó tạo ra **lượng cơ hội khổng lồ**.

**Lập luận phản chứng đơn giản:** nếu dạng strong đúng thì mọi thứ đã được định giá ngay lập tức và **giá sẽ không bao giờ dịch chuyển**, hoặc chỉ nhảy tĩnh lên xuống. Đó không phải điều ta quan sát.

Ngoài ra: các asset pricing model **không bao giờ** giải thích 100% biến thiên của giá tài sản trong cross-section. Nói "thông tin này giải thích X% biến thiên của giá cổ phiếu" là một nguỵ biện.

## 4. Vấn đề counterfactual — vì sao mọi thứ chỉ là thống kê

Đây là ý tưởng sâu nhất trong note này.

> **Không có counterfactual, trading và investing giỏi lắm cũng chỉ là poker.**

Ta **không bao giờ** phân biệt được kết quả của một giao dịch/khoản đầu tư là do một signal cụ thể, hay do chính luận điểm của ta.

**Ví dụ.** Bạn nói: *"Tôi bảo X sẽ xảy ra, X xảy ra, danh mục tôi tăng."*
Phản biện: *"Thế còn Z? Z cũng xảy ra, và Z làm danh mục bạn tăng. Bạn không tính đến Z."*

**Bạn không bao giờ tính được Z. Bạn không biết cái mình không biết.**

Counterfactual nghĩa là: mọi thứ chỉ xảy ra **một lần**, và ta không thể tua lại đúng khoảnh khắc đó **có** và **không có** một biến để tách ra tác động độc lập của nó. Không có cỗ máy thời gian.

Đây là vì sao có cả một kho công cụ econometric — regression discontinuity, instrumental variables, difference-in-differences — để cố tách causality khỏi correlation thuần.

> Nếu điều đó nghe nhàm chán — đúng vậy. Nhưng **đây là cách kiếm tiền trong thế giới thực.** Nó không hào nhoáng như high-frequency trading và statistical arbitrage. Nó chủ yếu là **positioning and survival.**

## 5. Vậy làm gì

Mục tiêu **không bao giờ** là dự đoán. Mục tiêu là **positioning and survival**.

Để tạo tài sản, bạn cần vận hành trên một **phân phối return có mean dương hợp lý**, trong **horizon đủ dài** để gộp.

- Không có nghĩa bạn không lỗ ở các thời điểm.
- Có nghĩa **trên trung bình** bạn tích luỹ nhiều hơn mất.

Điều này đúng cho cả trading strategy **lẫn** rủi ro mà danh mục bạn phơi nhiễm. Nếu bạn phơi nhiễm với các mặt rủi ro tạo ra mean âm trong phân phối return, đó là khoản đầu tư tệ — và điều đó thường đến từ việc đuổi theo return quá lớn.

Với danh mục equity, "edge" của bạn thường là **market risk premia**. Nó không loại trừ drawdown, nhưng nếu edge đó bền vững thì bạn tiếp tục tạo tài sản trong dài hạn.

> Cách kiếm tiền: **thống kê, vận hành như casino, làm nhà cái, có một phân phối với edge, và tích luỹ edge đó theo thời gian.**

## 6. Cạm bẫy
- **Chấp nhận EMH như tiên đề trong lớp học rồi mang ra thị trường.**
- **Bác bỏ EMH hoàn toàn.** Nó vẫn là bài tập học thuật hữu ích và giải thích vì sao alpha dễ **khó tìm**.
- **Nhầm "phản ứng nhanh" với "định giá đúng".**
- **Nghĩ mình đã chứng minh được luận điểm của mình.** Bạn không thể. Xem mục 4.
- **Nhầm correlation với causality** mà không dùng công cụ econometric phù hợp.

## 7. Checklist áp dụng
- [ ] Tôi có thể chứng minh signal của tôi *gây ra* return không? Bằng cách nào?
- [ ] Có biến Z nào tôi chưa tính đến không? (Luôn có)
- [ ] Phân phối return của tôi có mean dương không? Ước lượng từ đâu?
- [ ] Horizon của tôi có đủ dài để compounding phát huy không?
- [ ] Tôi đang cố dự đoán, hay đang định vị để sống sót?
- [ ] Rủi ro tôi phơi nhiễm có tạo ra mean dương không, hay tôi đang đuổi theo return phù du?

## Tham khảo
- Fama, E. — *Efficient Capital Markets: A Review of Theory and Empirical Work*, Journal of Finance (1970)
- Grossman & Stiglitz — *On the Impossibility of Informationally Efficient Markets*, AER (1980)
- Lo, A. — *Adaptive Markets: Financial Evolution at the Speed of Thought*
- Quant Guild — *The Ultimate Guide to Quant Portfolio Management*: https://youtu.be/LX4Ugaxx9n0
- Angrist & Pischke — *Mostly Harmless Econometrics* (công cụ causality)
- Surowiecki, J. — *The Wisdom of Crowds*

## Liên kết
[[CAPM Alpha and Beta]] · [[Risk and Return]] · [[Alpha Signals]] · [[Randomness vs Uncertainty]] · [[Backtesting and Overfitting]] · [[Quant]]
