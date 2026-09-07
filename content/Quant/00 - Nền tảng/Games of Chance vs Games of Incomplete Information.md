---
tags: [quant, foundation]
status: evergreen
---
# Games of Chance vs Games of Incomplete Information

> Câu hỏi "trading có phải cờ bạc không" được trả lời dứt điểm bằng một câu hỏi khác: **hành động của bạn có thay đổi được expected value không?**

## 1. Khái niệm cốt lõi

| | Game of chance | Game of incomplete information |
|---|---|---|
| Ví dụ | Roulette, slots, Powerball, scratch-off | Poker, trading, market making |
| Edge | Cố định, **chống lại** người chơi | Do hành động người chơi quyết định |
| Xác suất | Cố định, hội tụ (LLN) | Thay đổi theo thời gian |
| Hành động tối ưu | **Không chơi** | Học một [[Optimal Policy Function]] |
| Nghề nghiệp hoá được? | Không (trừ khi bạn *là* nhà cái) | Có — nên mới có poker pro và trader pro |
| Zero-sum? | Có | Gần như (có market maker, hedge, phí…) |

## 2. Bằng chứng thực nghiệm đơn giản

Mô phỏng 5 người chơi roulette 100 ván:
- 4/5 cháy tài khoản trước ván 100.
- 1/5 lãi \$800 → **đó là may mắn, không phải edge**. Chơi tiếp thì cũng cháy.
- Edge âm không *dự đoán* kết quả từng ván; nó nói về **xu hướng của wealth path qua nhiều ván**.

Nhưng: casino vẫn có thể lỗ trong ngắn hạn. Thống kê nghiêng về nhà cái không loại trừ chuỗi xui. Xem [[Gambler's Ruin]].

## 3. Cầu nối giữa hai thế giới

Có thể biến game of chance thành game of incomplete information bằng cách thêm **phụ thuộc trạng thái**: ví dụ roulette có kết quả phụ thuộc vào kết quả trước (mô hình bằng [[Markov Chains]]). Khi đó người chơi *học được* hành động tối ưu và lấy được edge từ nhà cái. Casino thật sẽ không bao giờ để game như vậy tồn tại.

Điểm quan trọng: **ngay cả trong ví dụ này xác suất vẫn cố định**. Poker và trading còn khó hơn một bậc — xác suất *cũng* đổi theo thời gian. Xem [[Randomness vs Uncertainty]].

## 4. Vì sao poker pro thành trader giỏi

Các firm market making và discretionary trading tổ chức giải poker cho intern không phải vì marketing. Poker và trading là **cùng một trò chơi, chỉ khác loại chip**:

1. Cả hai đều là tối ưu hoá EV dưới bất định, không phải dự đoán.
2. Cả hai đều đòi **không quan tâm kết quả một ván/một lệnh**. Nếu kết quả một lệnh quan trọng đến mức đó với bạn, bạn đang hiểu sai không gian.
3. Cả hai đều dùng **model values sai** (pot odds, out probability / implied volatility, implied probability) để ra quyết định tốt hơn.
4. Cả hai đều cho phép **lấy EV từ người chơi kém**. Trong game zero-sum, bạn thậm chí không cần EV dương — chỉ cần EV cao hơn đối thủ.
5. Cả hai đều có tilt: [[Trading Psychology]].

⚠️ Khác biệt cần lưu ý: trong poker bạn lấy tiền từ **một đối thủ cụ thể**. Với option contract, dù về mặt payoff là zero-sum (long call ↔ short call là ảnh của nhau), bạn thường không đối đầu một counterparty — bạn cạnh tranh với *mặt bằng giá của thị trường*, còn market maker thì đang hedge.

## 5. Cạm bẫy

- **"Đây là kỹ năng nên tôi kiểm soát được kết quả."** Không. Bạn kiểm soát *policy*, không kiểm soát *sample path*.
- **Lấy một kết quả để đánh giá một quyết định.** Out probability > pot odds là quyết định +EV kể cả khi bạn thua ván đó.
- **Nghĩ rằng có "bộ luật cố định" để học.** Không tồn tại. Metagame tiến hoá; thị trường tiến hoá theo công cụ, công nghệ, người chơi mới.
- **Kết luận "vậy chẳng học được gì".** Sai theo hướng ngược lại — cái học được là policy, và policy học được thì đo được qua **độ ổn định hiệu suất trên một chuỗi dài**.

## 6. Checklist áp dụng
- [ ] Trong trò tôi đang chơi, hành động của tôi có dịch chuyển EV không?
- [ ] Tôi có đang đánh giá quyết định bằng kết quả (results-oriented thinking) không?
- [ ] Tôi có đang đối đầu với người chơi kém hơn, hay với cả thị trường?
- [ ] Tôi có sẵn sàng chơi thêm 100.000 ván nữa không? Nếu không, size của tôi đang sai.

## Tham khảo
- Quant Guild — *Why Poker Pros Make the Best Traders (It's NOT Luck)*: https://youtu.be/JuD3KGQhofw
- Quant Guild — *Is Quant Trading Gambling — Roulette, Poker, and Trading*: https://youtu.be/fI3UHYD389g
- Brown, N. & Sandholm, T. — *Superhuman AI for multiplayer poker*, Science (2019) — RL agent học chính là optimal policy
- Chen & Ankenman — *The Mathematics of Poker*
- Thorp, E. — *A Man for All Markets*

## Liên kết
[[Randomness vs Uncertainty]] · [[Edge and Expected Value]] · [[Optimal Policy Function]] · [[Gambler's Ruin]] · [[Trading Psychology]] · [[Quant]]
