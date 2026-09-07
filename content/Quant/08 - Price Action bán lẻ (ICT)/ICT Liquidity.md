---
tags: [quant, ict, price-action, retail]
status: growing
---
# ICT — Liquidity

> ⚠️ **Đọc [[Quant Critique of ICT]] trước khi áp dụng bất kỳ note nào trong thư mục này.** Đây là ghi chép trung thực về một khung phân tích retail phổ biến, không phải sự tán thành.

> Ý tưởng trung tâm của ICT: giá di chuyển **từ vùng thanh khoản này sang vùng thanh khoản kế tiếp**, vì giá di chuyển để **khớp lệnh**.

## 1. Định nghĩa

**Liquidity** = vùng có nhiều người sẵn sàng trao đổi tài sản.

| Loại | Vị trí | Ai ở đó |
|---|---|---|
| **Buyside liquidity** | Phía **trên** các đỉnh | Người short bị stop-out (stop-out của lệnh bán = một lệnh mua), + người mua breakout |
| **Sellside liquidity** | Phía **dưới** các đáy | Người long bị stop-out (= một lệnh bán), + người bán breakdown |

Điểm cơ học quan trọng: **thoát khỏi vị thế bán tương đương với việc mua.** Bạn bán để vào, phải mua để ra. Vì thế cụm stop-loss là cụm lệnh.

## 2. Vì sao "smart money" quan tâm

Lập luận: nếu bạn cần vào vị thế \$10 triệu, bạn **cần đủ người ở phía đối diện**. Muốn bán \$10 triệu thì phải chờ có đủ người mua.

Người mua tập trung ở đâu? Ở **liquidity pool** — nơi nhiều người bị stop hoặc đang mua breakout.

→ Whale/institution nhìn các vùng đó là nơi để offload vị thế.

## 3. Nơi thanh khoản tích tụ

- **Đỉnh và đáy rõ ràng** — nơi ai cũng đặt stop.
- **Equal highs / equal lows** — giá trị rất cao, vì nhiều người cùng định vị ở đó.
- **Trendline** — vẽ được đường qua nhiều đỉnh/đáy → cạnh trơn trên biểu đồ.
- **Chart pattern** (bull flag, pennant) — retail chờ breakout, đặt lệnh mua ở đó.
- **Mức tâm lý / số tròn** — ví dụ Bitcoin ở 100.000. Ai cũng muốn mua trên 100k → thanh khoản dày.

> Bất cứ khi nào bạn thấy một **cạnh trơn** trên biểu đồ — vẽ được một đường qua một loạt đỉnh hoặc đáy — thì đó là vùng giá có xu hướng chạm tới trước khi thực hiện chuyển động thật.

## 4. Trapped traders

Khi giá đi ngược người tham gia, họ đặt stop ở nhiều nơi khác nhau. Khi **tất cả cùng bị stop-out**, đó là một lượng áp lực bán/mua khổng lồ → tạo ra các chuyển động mạnh.

Hệ quả suy luận: nếu người ta **mua** trên một đỉnh, giá có xu hướng **không quay lại đó** — vì "smart money không muốn để họ thoát ra có lãi; họ là nhiên liệu cho chuyển động".

## 5. Nguyên tắc định vị (theo khung ICT)

> Trong thị trường **tăng**: bạn **mua từ người bán ở dưới các đáy** (sellside liquidity).
> Trong thị trường **giảm**: bạn **bán cho người mua ở trên các đỉnh** (buyside liquidity).

Cách đọc thị trường: hỏi *"chúng ta đang manipulate đỉnh hay manipulate đáy?"*
- Manipulate **đỉnh** (chạm lên rồi thất bại) → smart money đang **bán** → bearish.
- Manipulate **đáy** (chạm xuống rồi bật lên) → smart money đang **mua** → bullish.

## 6. ⚠️ Cảnh báo bên trong chính khung này

Ngay cả người dạy ICT cũng nhấn mạnh:

> **Giá KHÔNG đảo chiều ở mọi pool thanh khoản.**

Đây là nơi 90% ICT trader mắc kẹt — họ coi **mọi** lần chạm thanh khoản là tín hiệu đảo chiều. Có rất nhiều equal lows; thị trường cuối cùng sẽ tới đó. Nhưng làm sao bạn biết là **lần này** chứ không phải lần trước hay lần sau?

> **Liquidity không phải tất cả.** Nếu không có cách dùng rõ ràng và một hệ thống nhất quán, nó có thể **gây hại nhiều hơn lợi**, vì bạn bắt đầu nhìn mọi thứ như một cú đảo chiều.

Cần thêm bộ lọc: [[Market Structure and Displacement]] và [[Time-Based Liquidity]].

## 7. Cạm bẫy
- **Coi mọi lần quét thanh khoản là đảo chiều.** Sai lầm phổ biến nhất.
- **Đặt stop ở nơi ai cũng đặt.** Bạn *là* thanh khoản. Xem [[Risk Management]].
- **Đánh dấu quá nhiều mức.** Decision fatigue → tê liệt hoặc overtrade.
- **Nhầm câu chuyện với cơ chế.** "Smart money săn stop của bạn" là một cách kể; nó không được kiểm chứng bằng dữ liệu công khai. Xem [[Quant Critique of ICT]].

## 8. Checklist áp dụng
- [ ] Các vùng thanh khoản rõ ràng nhất trên biểu đồ này ở đâu?
- [ ] Giá đang phản ứng thế nào với đỉnh và đáy? Manipulate hay displace?
- [ ] Stop của tôi có nằm ở nơi ai cũng đặt không?
- [ ] Tôi có bằng chứng gì cho việc **lần này** là đảo chiều, thay vì lần sau?
- [ ] Tôi có đang đánh dấu quá nhiều mức không?

## Tham khảo
- Casper SMC — *Easiest Way To Trade ICT in 2026 as a Beginner*: https://www.youtube.com/watch?v=HC2iUkI8Dh8
- Inner Circle Trader (ICT) — nguồn gốc của khung này: https://www.youtube.com/@InnerCircleTrader
- Harris, L. — *Trading and Exchanges* (Ch. về order flow và liquidity — cái nhìn học thuật về cùng hiện tượng)
- O'Hara, M. — *Market Microstructure Theory*
- Glosten & Milgrom (1985) — adverse selection, mô hình hoá "informed trader" một cách chặt chẽ

## Liên kết
[[Market Structure and Displacement]] · [[Fair Value Gaps and Order Blocks]] · [[Time-Based Liquidity]] · [[Quant Critique of ICT]] · [[Quant]]
