---
tags: [probability, gambling, poker, application]
status: growing
---
# Poker Probability

> Poker là bài toán [[Counting & Combinatorics]] có tiền thật. Phần xác suất thì tất định và học được trong một buổi; phần khó là dùng nó dưới áp lực và với thông tin không đầy đủ.

## 1. Xác suất tay bài 5 lá (từ 52 lá)

Tổng số tay: $\binom{52}{5}=2{,}598{,}960$.

| Tay bài | Số tổ hợp | Xác suất |
|---|---|---|
| Royal flush | 4 | 0.000154% |
| Straight flush | 36 | 0.00139% |
| Four of a kind | 624 | 0.0240% |
| Full house | 3.744 | 0.144% |
| Flush | 5.108 | 0.197% |
| Straight | 10.200 | 0.392% |
| Three of a kind | 54.912 | 2.11% |
| Two pair | 123.552 | 4.75% |
| One pair | 1.098.240 | 42.3% |
| High card | 1.302.540 | 50.1% |

Ví dụ tính four of a kind: chọn hạng ($13$) × chọn lá lẻ ($48$) = $624$.

## 2. Texas Hold'em — các con số cần thuộc

| Sự kiện | Xác suất |
|---|---|
| Được một cặp cụ thể (vd AA) | $\binom{4}{2}/\binom{52}{2} = 6/1326 = 0.45\%$ |
| Được bất kỳ cặp nào | $78/1326 = 5.9\%$ (1 trong 17) |
| Được AK (suited hoặc không) | $16/1326 = 1.2\%$ |
| Cặp bỏ túi → trúng set trên flop | 11.8\% (~1 trong 8.5) |
| Hai lá suited → flop ra flush draw | 10.9\% |
| AA thắng KK preflop (all-in) | ~81\% |
| Cặp vs 2 lá cao hơn ("coin flip") | ~55\% / 45\% |

**Combinatorics của range**: mỗi cặp có $\binom42=6$ tổ hợp; mỗi tay không cặp có 16 tổ hợp (4 suited + 12 offsuit). Đếm combo là cách chuẩn để ước lượng range đối thủ.

## 3. Outs và equity

| Draw | Outs | Equity (flop→river) | (turn→river) |
|---|---|---|---|
| Gutshot straight | 4 | 16.5% | 8.7% |
| Two overcards | 6 | 24.1% | 13.0% |
| Open-ended straight | 8 | 31.5% | 17.4% |
| Flush draw | 9 | 35.0% | 19.6% |
| Flush + gutshot | 12 | 45.0% | 26.1% |
| Flush + open-ended | 15 | 54.1% | 32.6% |

Công thức chính xác (flop → river, 2 lá):
$$P(\text{trúng}) = 1 - \frac{\binom{47-o}{2}}{\binom{47}{2}}$$
với $o$ = số outs, 47 = số lá chưa biết.

Xấp xỉ nhanh bằng quy tắc 2 và 4 → [[Pot Odds]].

Lưu ý: xác suất "trúng" giả định các lá chưa biết đồng khả năng — đúng vì bài đã xáo, nhưng là mô hình bỏ qua thông tin từ hành vi cược của đối thủ. Xác suất **có điều kiện** trên hành động của họ mới là cái quan trọng → [[Conditional Probability]].

## 4. Vì sao lấy mẫu ở đây là Hypergeometric

Chia bài là lấy mẫu **không hoàn lại** từ 52 lá. Nên số Át trong 5 lá là $\text{HGeom}(52,4,5)$, không phải Binomial → [[Hypergeometric]]. Với 5 lá từ 52 ($\approx10\%$), sai khác so với Binomial đã đáng kể.

## 5. Phần xác suất **không** giải quyết được

Poker là trò **thông tin không đầy đủ**, không phải bài toán xác suất thuần tuý:

| Thành phần | Bản chất |
|---|---|
| Xác suất bài | Tất định, tính được |
| Range đối thủ | Suy diễn Bayes từ hành động → [[Bayes Rule]] |
| Bet sizing, bluff frequency | **Lý thuyết trò chơi** (GTO, cân bằng Nash) |
| Đọc đối thủ | Khai thác lệch khỏi GTO |
| Quản lý vốn | → [[Bankroll & Kelly Criterion]] |

Kết quả nền tảng của GTO: tần suất bluff tối ưu làm đối thủ **bàng quan** giữa call và fold — nếu bạn bluff đúng tỉ lệ, họ không khai thác được bạn dù chọn gì.

## 6. Cạm bẫy

1. **Tính equity mà quên đối thủ cũng có draw.**
2. **Results-oriented thinking.** Quyết định đúng vẫn có thể thua ván đó. Đánh giá quyết định, không đánh giá kết quả.
3. **Bỏ qua rake.** Nhà cái lấy 2.5–5% mỗi pot — biến nhiều tình huống hoà EV thành âm.
4. **Variance.** Cần hàng chục nghìn ván để kỹ năng lộ ra khỏi nhiễu → [[Law of Large Numbers]].
5. **Nhầm xác suất tiên nghiệm với xác suất có điều kiện.** Xác suất đối thủ có AA là 0.45% — nhưng nếu họ 4-bet all-in thì cao hơn nhiều.
6. **Chơi trên bankroll quá nhỏ** → cháy dù có lợi thế → [[Gambler's Ruin]].
7. **Học GTO mà không khai thác lỗi đối thủ.** GTO là chiến lược không thua; kiếm tiền đến từ khai thác.

## 7. Checklist mỗi quyết định
- [ ] Đếm được bao nhiêu outs? Có out bẩn không?
- [ ] Equity ước tính bao nhiêu?
- [ ] Pot odds bao nhiêu? Equity có vượt không? → [[Pot Odds]]
- [ ] Range đối thủ gồm những gì? Bao nhiêu combo?
- [ ] Hành động của họ làm range thu hẹp thế nào?
- [ ] Implied / reverse implied odds ra sao?
- [ ] Quyết định này có đúng kể cả khi thua ván này không?
- [ ] Bankroll có đủ cho mức cược này không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Equilab | Tính equity vs range | https://www.pokerstrategy.com/poker-software-tools/equilab-holdem/ |
| GTO Wizard / PioSOLVER | Solver cân bằng | https://gtowizard.com |
| `treys` (Python) | Đánh giá bài, mô phỏng | https://github.com/ihendley/treys |
| Wizard of Odds — Texas Hold'em | Bảng xác suất chuẩn | https://wizardofodds.com/games/texas-hold-em/ |

## Tham khảo
- Johns Hopkins Poker Course — Lecture 2: https://www.youtube.com/watch?v=0QIwGeLgr20
- Wikipedia — *Poker probability*: https://en.wikipedia.org/wiki/Poker_probability
- Wikipedia — *Poker probability (Texas hold 'em)*: https://en.wikipedia.org/wiki/Poker_probability_(Texas_hold_%27em)
- Chen & Ankenman — *The Mathematics of Poker*: https://www.conjelco.com/mathofpoker.html
- Sklansky — *The Theory of Poker*: https://www.twoplustwo.com

## Liên kết
[[Pot Odds]] · [[Counting & Combinatorics]] · [[Hypergeometric]] · [[Bayes Rule]] · [[Bankroll & Kelly Criterion]] · [[Expected Value in Gambling]] · [[Prob&Stats]]
