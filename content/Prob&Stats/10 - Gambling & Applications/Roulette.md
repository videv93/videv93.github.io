---
tags: [probability, gambling, application]
status: growing
---
# Roulette

> Trò casino minh bạch nhất về mặt toán: **mọi cược đều có cùng house edge**. Không có cược nào "tốt hơn" — chỉ có cược biến động nhiều hơn hay ít hơn.

## 1. Hai loại bàn

| Loại | Số ô | Ô xanh | House edge |
|---|---|---|---|
| **Châu Âu** | 37 | 0 | $1/37 = 2.70\%$ |
| **Mỹ** | 38 | 0, 00 | $2/38 = 5.26\%$ |
| Châu Âu + *La Partage* | 37 | 0 | 1.35% cho cược even-money |

Chênh lệch giữa hai loại là **gần gấp đôi**. Đây là quyết định quan trọng nhất của người chơi roulette — quan trọng hơn mọi "hệ thống cược" nào.

## 2. Bảng cược (bàn châu Âu, 37 ô)

| Cược | Trả | $P(\text{thắng})$ | EV mỗi \$1 |
|---|---|---|---|
| Straight (1 số) | 35:1 | 1/37 | $-0.027$ |
| Split (2 số) | 17:1 | 2/37 | $-0.027$ |
| Street (3 số) | 11:1 | 3/37 | $-0.027$ |
| Corner (4 số) | 8:1 | 4/37 | $-0.027$ |
| Dozen / Column | 2:1 | 12/37 | $-0.027$ |
| Đỏ/Đen, Chẵn/Lẻ, Cao/Thấp | 1:1 | 18/37 | $-0.027$ |

**Mọi dòng đều $-2.70\%$.** Lý do: tỉ lệ trả thưởng được tính theo bàn 36 ô (không có số 0), còn bánh xe có 37 ô. Toàn bộ biên nhà cái nằm ở ô số 0.

Tính mẫu cho straight bet: $EV = 35\cdot\frac{1}{37} - 1\cdot\frac{36}{37} = -\frac{1}{37}$.

## 3. Cùng EV, khác variance

| Cược | SD mỗi \$1 | Đặc điểm |
|---|---|---|
| Đỏ/đen | 1.00 | Thắng thường xuyên, số nhỏ |
| Dozen | 1.39 | |
| Straight | 5.76 | Hiếm thắng, thắng lớn |

Đây là lựa chọn thật sự duy nhất của người chơi: **nhiều biến động hay ít**. Muốn "một cơ hội lớn" thì cược 1 số; muốn chơi lâu bằng cùng số vốn thì cược even-money.

## 4. Vận hành thực tế (từ seed Wikipedia)

Khi số thắng và màu đã xác định, croupier đặt một **dolly** (điểm đánh dấu) lên số thắng trên bố trí bàn. **Khi dolly còn trên bàn, không người chơi nào được đặt cược, thu tiền thắng, hay rút bất kỳ cược nào khỏi bàn.** Dolly được nhấc lên sau khi croupier thanh toán xong — đó là tín hiệu bắt đầu vòng cược mới.

Quy tắc này tồn tại để chống gian lận **past posting** (đặt cược sau khi đã biết kết quả).

## 5. Vì sao không hệ thống nào hoạt động

- Các vòng quay **độc lập** và **memoryless** → [[Geometric & Negative Binomial]]
- Bảng "số nóng/lạnh" mà casino trưng ra là để **khuyến khích** gambler's fallacy
- EV có tính cộng ([[Linearity of Expectation]]) → tổng các cược âm là âm
- Martingale gặp trần bàn cược và vốn hữu hạn → [[Gambler's Ruin]]
- Chi tiết → [[Expected Value in Gambling]]

**Ngoại lệ lịch sử**: bánh xe lệch (biased wheel). Joseph Jagger (1873, Monte Carlo) và nhóm Eudaemons (1970s, máy tính giấu trong giày dự đoán quỹ đạo bi) thật sự đánh bại roulette — bằng cách khai thác **sai lệch vật lý**, tức là thay đổi $p$, chứ không phải bằng hệ thống cược. Bánh xe hiện đại được cân chỉnh và giám sát để loại trừ điều này.

## 6. Cạm bẫy

1. **Tin bảng số nóng/lạnh.**
2. **Chơi bàn Mỹ khi có bàn châu Âu** — mất gấp đôi không lý do.
3. **Nghĩ cược straight "đáng giá hơn"** vì trả 35:1. Cùng EV.
4. **Martingale / D'Alembert / Fibonacci** — không hệ thống nào đổi được EV.
5. **Quên la partage / en prison** — nếu bàn có luật này thì cược even-money tốt gấp đôi.
6. **Nhầm "xác suất trong 100 ván có ít nhất một lần trúng số của tôi"** ($1-(36/37)^{100}\approx93\%$) với "tôi sẽ có lãi".

## 7. Checklist
- [ ] Bàn châu Âu hay Mỹ? (1 hay 2 ô xanh)
- [ ] Có luật la partage / en prison không?
- [ ] EV cược này bao nhiêu? (luôn $-2.70\%$ hoặc $-5.26\%$)
- [ ] Muốn variance cao hay thấp?
- [ ] Ngân sách coi là chi phí giải trí là bao nhiêu?
- [ ] Có đang mắc gambler's fallacy không?

## Tham khảo
- Wikipedia (tiếng Việt) — *Roulette*: https://vi.wikipedia.org/wiki/Roulette
- Wikipedia — *Roulette*: https://en.wikipedia.org/wiki/Roulette
- Wizard of Odds — *Roulette*: https://wizardofodds.com/games/roulette/
- Bass — *The Eudaemonic Pie*: https://en.wikipedia.org/wiki/The_Eudaemonic_Pie

## Liên kết
[[Expected Value in Gambling]] · [[Gambler's Ruin]] · [[Số đề & Lô]] · [[Bankroll & Kelly Criterion]] · [[Law of Large Numbers]] · [[Prob&Stats]]
