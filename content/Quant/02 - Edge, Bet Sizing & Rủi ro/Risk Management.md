---
tags: [quant, risk, execution]
status: evergreen
---
# Risk Management

> Không phải "rủi ro 1% mỗi lệnh". Risk management là **một mặt của việc tối đa hoá EV** — nó tác động trực tiếp lên hai trong bốn thành phần của edge.

## 1. Vì sao nó là một phần của edge, không phải phần bù

$$\mathbb{E} = \bar{W}P(W) + \bar{L}P(L)$$

- **Cắt lỗ sớm** → giảm $|\bar{L}|$.
- **Để winner chạy** → tăng $\bar{W}$.

Cả hai đều dịch chuyển EV trực tiếp. Risk management không phải "phanh" — nó là **cần gạt**.

## 2. Cắt lỗ sớm

> Về mặt thống kê, **bạn phải mất tiền để tiếp tục kiếm tiền.** Không có equity curve tuyến tính đi lên với độ dốc điên rồ.
> **Càng cắt lỗ nhanh và hiệu quả, càng kiếm được nhiều trong dài hạn.**

Đối chứng: trader quản rủi ro tốt cũng có drawdown, nhưng liên tục cắt lỗ khi biết mình sai → tích luỹ tài sản. Trader quản rủi ro kém: "rồi nó sẽ hồi", "rồi nó sẽ hồi" → cắt muộn, hiệu suất kém hẳn.

Điều khó nhất: **biết khi nào bỏ cuộc.** Người mới **định giá quá cao** bài của mình một cách đáng kể. Khả năng fold một bài trông có vẻ tốt đến từ việc đã quan sát rất nhiều ván. Khả năng thoát vị thế lỗ sớm khi lệnh đi ngược kỳ vọng ban đầu đến từ việc đã quan sát rất nhiều lệnh.

Đây là kỹ năng **kinh nghiệm**, không phải kỹ năng quy tắc.

## 3. Để winner chạy

Trường hợp thực tế (một trader tại GETCO): mục tiêu là đưa lệnh về **"free trade" càng nhanh càng tốt** — dời stop về hoà vốn, rồi để chạy bằng trailing stop.

Vì sao hiệu quả: giữ $P(W)$ gần như không đổi nhưng nâng mạnh $\bar{W}$.

| Cách quản                  | $P(W)$ | Average winner | EV   |
| -------------------------- | ------ | -------------- | ---- |
| Trailing stop / free trade | ~0,5   | **145**        | Cao  |
| Fixed profit taking        | ~0,5   | thấp hơn nhiều | Thấp |

⚠️ **Không phải one-size-fits-all.** Đôi khi fixed profit taking tốt hơn — tuỳ regime, tuỳ chiến lược. Đây là quyết định thuộc [[Optimal Policy Function]], không phải quy tắc cố định.

**"Price weighting"** — biến thể thực dụng: khi giá chạm mức bạn định chốt lời, thay vì chốt, **dời stop lên các swing point liên tiếp** và để thị trường quyết định. Nếu giá xuyên thẳng qua mức đó, bạn được nhiều hơn nhiều. Stop trở thành take-profit. Một lệnh 5R có thể thành 8R. Nếu áp dụng được cho **một nửa** số lệnh thắng, riêng điều đó có thể đưa bạn sang vùng có lãi.

## 4. Position sizing theo giai đoạn

| Giai đoạn | Nguyên tắc |
|---|---|
| **Beginner** | Mục tiêu **không phải** kiếm tiền mà là **sống sót**. Size rất nhỏ, cố định, giống nhau mọi lệnh. Mục đích: tìm ra điểm yếu của mình |
| **Intermediate** | Size theo **xác suất/độ tin cậy** của setup. Nhiều confluence → nặng hơn. Ít → nhẹ hơn. Cấu trúc lệnh giống nhau, size phản ánh conviction |
| **Expert** | Size theo dữ liệu **và** trực giác đã hiệu chỉnh. Biết khi nào đạp ga, khi nào chỉ đặt feeler position (ví dụ stop rất chặt + target rất xa → chỉ 1 contract) |

Nền lý thuyết cho việc size: [[Kelly Criterion]].

## 5. Hai trụ cột phải tách bạch

1. **Position sizing** — tôi được mất bao nhiêu trong **một lệnh**?
2. **Rules / loss limit** — tôi được mất bao nhiêu trong **một ngày**?

Sai một trong hai thì cả hệ vỡ. Ví dụ quy tắc thực dụng: **không quá 2 lệnh thua trong một ngày**.

## 6. Chuỗi thua là bình thường — hãy tính trước

Với win rate 70% (rất cao — thực tế thường 55–65%), xác suất gặp chuỗi thua ít nhất 3 lệnh là **~93%**.

Với win rate thấp hơn, xác suất gặp chuỗi thua dài tiến tới 100%. **Chuỗi thua không phải dấu hiệu hệ hỏng.** Ai nói "tôi không bao giờ thua chuỗi" đang nói dối.

Vấn đề duy nhất là: **bạn có bảo vệ được vốn qua chuỗi đó không**, và bạn biết khi nào nhả ga.

## 7. Cạm bẫy
- **Coi drawdown là lời mời gỡ.** Không. Xem [[Trading Psychology]].
- **"Rủi ro 1% mỗi lệnh" như tín điều.** Đó là điểm khởi đầu cho người mới, không phải hệ thống.
- **Không có loss limit ngày.** Position sizing đúng vẫn cháy nếu bạn trade 20 lệnh trong một ngày tệ.
- **Dời stop về entry quá sớm.** Bạn bị quét ra khỏi các lệnh thắng. Có tiêu chí (ví dụ: sau khi một stop-run xảy ra ngược hướng bạn).
- **Đặt stop ở chỗ ai cũng đặt.** Đó chính là liquidity. Xem [[ICT Liquidity]].
- **Giữ lệnh qua tin lớn.** Slippage có thể khiến bạn mất nhiều hơn mức đã định.

## 8. Checklist áp dụng
- [ ] Tôi có **loss limit theo ngày** viết thành văn không?
- [ ] Position size của tôi thay đổi theo conviction, hay cố định mù quáng?
- [ ] Tiêu chí cắt lỗ của tôi là gì? Nó có cơ học không, hay là "cảm thấy"?
- [ ] Tôi có quy tắc dời stop rõ ràng (ví dụ sau stop-run) không?
- [ ] Trong 20 lệnh thắng gần nhất, bao nhiêu lệnh chạy **xa hơn** target của tôi?
- [ ] Tôi đã tính xác suất chuỗi thua ở win rate của mình chưa? Vốn tôi có sống qua nó không?
- [ ] Tôi đang mở vị thế trước tin lớn nào không?

## Tham khảo
- Quant Guild — *Why Poker Pros Make the Best Traders*: https://youtu.be/JuD3KGQhofw
- Quant Guild — *Quant Ranks Retail Trading Mistakes that Blow Up Your Account*: https://youtu.be/1mpNxBaBeOw
- Tharp, V. — *Trade Your Way to Financial Freedom* (position sizing)
- Vince, R. — *The Mathematics of Money Management*
- Forex Factory — lịch tin kinh tế: https://www.forexfactory.com

## Liên kết
[[Kelly Criterion]] · [[Edge and Expected Value]] · [[Trading Psychology]] · [[Optimal Policy Function]] · [[Gambler's Ruin]] · [[Quant]]
