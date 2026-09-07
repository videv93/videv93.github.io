---
tags: [probability, gambling, poker, application]
status: evergreen
---
# Pot Odds

> Câu hỏi "call hay fold?" có một đáp án bằng số: **so sánh tỉ lệ tiền phải bỏ ra với xác suất thắng**. Đây là ứng dụng EV trực tiếp và sạch nhất.

## 1. Định nghĩa

$$\text{Pot odds} = \frac{\text{tiền phải call}}{\text{pot sau khi call}} = \frac{C}{P + C}$$

trong đó $P$ = pot hiện tại (đã gồm cược của đối thủ), $C$ = số tiền phải call.

Con số này là **ngưỡng equity tối thiểu**: call có lãi khi
$$\boxed{\text{equity} > \frac{C}{P+C}}$$

## 2. Ví dụ (JHU Poker Lecture 2)

Pot có \$180, đối thủ cược \$20 → pot thành \$200, bạn phải call \$20.

$$\text{Pot odds} = \frac{20}{200+20} = \frac{20}{220} = 9.1\%$$

Nếu bạn thắng > 9.1% số lần thì call có lãi. Kiểm chứng bằng EV:
$$EV_{\text{call}} = 0.091\times(+200) + 0.909\times(-20) = 18.2 - 18.2 = 0$$
Đúng điểm hoà vốn.

Hai cách ghi khác nhau, cùng ý:

| Dạng | Ví dụ trên |
|---|---|
| Tỉ lệ (odds) | $200 : 20 = 10:1$ |
| Phần trăm (equity cần) | $1/(10+1) = 9.1\%$ |

## 3. Tính equity nhanh: quy tắc 2 và 4

**Outs** = số lá bài còn lại giúp bạn thắng.

| Tình huống | Xấp xỉ |
|---|---|
| Còn 2 lá sẽ lật (sau flop) | equity $\approx$ outs $\times$ **4**% |
| Còn 1 lá sẽ lật (sau turn) | equity $\approx$ outs $\times$ **2**% |

Ví dụ flush draw = 9 outs → $\approx36\%$ sau flop, $\approx18\%$ sau turn. Con số chính xác là 35.0% và 19.6% → [[Poker Probability]].

Quy tắc này hơi lạc quan với số outs lớn (>12); công thức sát hơn: $(4\times\text{outs}) - (\text{outs}-8)$ khi outs > 8.

## 4. Giới hạn của pot odds (JHU nhấn mạnh)

Pot odds chỉ đúng nếu ván bài **kết thúc ngay sau lá tiếp theo**. Thực tế còn:

| Yếu tố | Điều chỉnh |
|---|---|
| **Implied odds** | Nếu trúng, còn moi thêm được bao nhiêu ở vòng sau → hạ ngưỡng equity |
| **Reverse implied odds** | Trúng bài nhưng vẫn thua bài lớn hơn → nâng ngưỡng |
| **Fold equity** | Raise có thể làm đối thủ bỏ bài → thêm một cách thắng |
| **Vị trí** | Ở sau thì thông tin nhiều hơn, implied odds tốt hơn |
| **Còn vòng cược sau** | Có thể bị cược tiếp, không được thấy lá miễn phí |
| **Range đối thủ** | Equity thật phụ thuộc họ có gì, không chỉ bài mình |

Công thức đầy đủ hơn với implied odds:
$$\text{equity cần} = \frac{C}{P + C + X}$$
với $X$ = tiền kỳ vọng moi thêm được khi trúng.

## 5. Cạm bẫy

1. **Đếm outs sai.** Outs "bẩn" — lá giúp bạn nhưng cũng giúp đối thủ mạnh hơn (ví dụ lá làm hoàn thành straight của họ).
2. **Quên rằng đối thủ có thể cược tiếp.** Pot odds hiện tại không phản ánh chi phí toàn ván.
3. **Nhầm pot odds với equity.** Pot odds là **ngưỡng**; equity là **khả năng thắng**. Phải so hai cái.
4. **Đưa cược của mình vào pot khi tính.** Pot là tiền đã có + cược của đối thủ.
5. **Áp quy tắc 4 khi sẽ còn vòng cược nữa** — bạn không được xem 2 lá miễn phí.
6. **Bỏ qua reverse implied odds** với draw yếu (ví dụ đuổi straight thấp).
7. **Chỉ dùng pot odds mà không xét range** — với đối thủ chỉ cược khi có bài rất mạnh, equity thật thấp hơn tính toán.

## 6. Checklist trước mỗi quyết định call
- [ ] Pot bao nhiêu (đã gồm cược của họ)? Call bao nhiêu?
- [ ] Pot odds = $C/(P+C)$ bằng bao nhiêu %?
- [ ] Đếm được bao nhiêu outs? Có out nào "bẩn" không?
- [ ] Equity ước tính (quy tắc 2/4) là bao nhiêu?
- [ ] Equity > pot odds không?
- [ ] Còn vòng cược nào sau không? Implied odds thế nào?
- [ ] Nếu trúng, có khả năng vẫn thua không? (reverse implied)
- [ ] Raise có tốt hơn call không? (fold equity)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| PokerStove / Equilab | Tính equity theo range | https://www.pokerstrategy.com/poker-software-tools/equilab-holdem/ |
| `treys` (Python) | Đánh giá bài, mô phỏng equity | https://github.com/ihendley/treys |
| Wizard of Odds — poker | Bảng xác suất chuẩn | https://wizardofodds.com/games/texas-hold-em/ |

## Tham khảo
- Johns Hopkins Poker Course — Lecture 2 (*Pot Odds*, *Pot Odds — some limitations*): https://www.youtube.com/watch?v=0QIwGeLgr20
- Wikipedia — *Pot odds*: https://en.wikipedia.org/wiki/Pot_odds
- Sklansky — *The Theory of Poker*: https://www.twoplustwo.com
- Chen & Ankenman — *The Mathematics of Poker*: https://www.conjelco.com/mathofpoker.html

## Liên kết
[[Poker Probability]] · [[Expected Value in Gambling]] · [[Expectation]] · [[Bankroll & Kelly Criterion]] · [[Conditional Probability]] · [[Prob&Stats]]
