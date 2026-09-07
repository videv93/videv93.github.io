---
tags: [probability, gambling, application]
status: evergreen
---
# Expected Value in Gambling

> Mọi trò trong casino đều có EV âm cho người chơi. Không có ngoại lệ, không có hệ thống cược nào sửa được. Điều đáng học không phải "đừng chơi", mà là **cách tính EV cho mọi quyết định có rủi ro**.

## 1. Công thức

$$EV = \sum_i (\text{giá trị}_i) \times P(\text{kết quả}_i)$$

**House edge** = $-EV$ tính theo % số tiền cược:
$$\text{House edge} = \frac{-EV}{\text{tiền cược}}$$

**RTP** (return to player) $= 1 - \text{house edge}$.

## 2. Bảng house edge các trò

| Trò | House edge | Ghi chú |
|---|---|---|
| Blackjack (chơi tối ưu) | 0.5% | Thấp nhất; đếm bài có thể đảo chiều |
| Baccarat (banker) | 1.06% | |
| Craps (pass line) | 1.41% | |
| **Roulette châu Âu** (1 số 0) | **2.70%** | $= 1/37$ |
| **Roulette Mỹ** (0 và 00) | **5.26%** | $= 2/38$ |
| Slot machines | 2–15% | Ít minh bạch nhất |
| Keno | 25–30% | |
| **Xổ số nhà nước** | 40–60% | Tệ nhất trong mọi trò |

Chi tiết roulette → [[Roulette]]; xổ số/số đề Việt Nam → [[Số đề & Lô]].

## 3. Ví dụ tính: roulette châu Âu

Đặt \$1 vào màu đỏ. 37 ô: 18 đỏ, 18 đen, 1 số 0.

$$EV = (+1)\cdot\frac{18}{37} + (-1)\cdot\frac{19}{37} = -\frac{1}{37} \approx -\char36 0.027$$

Mỗi \$1 cược mất trung bình 2.7 xu. Chơi 1000 ván \$1 → kỳ vọng mất \$27.

**Chú ý sự khác biệt giữa EV và độ biến động**: SD mỗi ván $\approx \char36 1$. Sau 1000 ván, SD của tổng $\approx\char36 31.6$ — cùng cỡ với kỳ vọng lỗ \$27. Ngắn hạn ngẫu nhiên áp đảo; dài hạn EV áp đảo. Đó là toàn bộ mô hình kinh doanh của casino → [[Law of Large Numbers]].

## 4. Vì sao không hệ thống cược nào hoạt động

**Martingale** (gấp đôi sau mỗi thua): thắng nhỏ thường xuyên, thua thảm hiếm khi. EV mỗi ván vẫn $-2.7\%$; tổng EV vẫn âm. Trần bàn cược và vốn hữu hạn đảm bảo cú thua thảm chắc chắn đến → [[Gambler's Ruin]].

**Lý do tổng quát**: EV có tính tuyến tính ([[Linearity of Expectation]]). Tổng của các cược EV âm là EV âm, **bất kể chọn cược lúc nào, cỡ bao nhiêu, theo thứ tự gì**. Không có cách sắp xếp nào biến âm thành dương.

Ngoại lệ duy nhất: **thay đổi $p$**, tức có lợi thế thật (đếm bài blackjack, cá cược thể thao có mô hình tốt, poker chơi giỏi hơn đối thủ) → [[Pot Odds]], [[Poker Probability]].

## 5. Các nguỵ biện thường gặp

| Nguỵ biện | Nội dung | Vì sao sai |
|---|---|---|
| **Gambler's fallacy** | "Đỏ 10 lần rồi, sắp đen" | Các ván độc lập; memoryless → [[Geometric & Negative Binomial]] |
| **Hot hand** | "Đang may, cứ chơi tiếp" | Cùng lỗi, chiều ngược |
| **Near miss** | "Suýt trúng, sắp trúng rồi" | Máy slot cố tình thiết kế near miss |
| **Sunk cost** | "Thua nhiều rồi, phải gỡ" | Tiền đã mất không ảnh hưởng EV ván sau |
| **Illusion of control** | Tự chọn số, tự tung xúc xắc | Không đổi xác suất |
| **Availability bias** | Nhớ người trúng, quên hàng triệu người thua | Truyền thông chỉ đưa tin người thắng |

Vụ **Monte Carlo Casino, 18/8/1913**: bi rơi vào ô đen 26 lần liên tiếp; người chơi đổ tiền cược đỏ và thua hàng triệu franc.

## 6. Khi nào EV **không** đủ

1. **Rủi ro phá sản.** EV dương vẫn có thể cháy tài khoản nếu cược quá lớn → [[Bankroll & Kelly Criterion]].
2. **Utility phi tuyến.** \$1 triệu thứ hai không đáng giá bằng \$1 triệu đầu tiên → St. Petersburg paradox → [[Expectation]].
3. **Ergodicity.** Trung bình theo tập hợp người chơi ≠ kết quả của **một** người chơi qua thời gian, trong quá trình nhân (multiplicative).
4. **Giá trị giải trí.** Nếu coi tiền thua là phí giải trí thì bài toán khác — nhưng cần thừa nhận rõ.

## 7. Checklist trước mọi quyết định có rủi ro
- [ ] Đã liệt kê **đủ** mọi kết quả có thể chưa?
- [ ] Xác suất mỗi kết quả lấy từ đâu? Có kiểm chứng được không?
- [ ] EV là bao nhiêu? Tính theo mỗi đơn vị cược?
- [ ] SD là bao nhiêu? Cần bao nhiêu lần lặp để EV áp đảo?
- [ ] Rủi ro phá sản là bao nhiêu?
- [ ] Có đang mắc nguỵ biện nào ở §5 không?
- [ ] Nếu EV âm: mình có chấp nhận đây là chi phí giải trí không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Wizard of Odds | Số liệu house edge chi tiết mọi trò | https://wizardofodds.com |
| Mô phỏng Monte Carlo | Thấy được phân phối kết quả, không chỉ EV | https://numpy.org/doc/stable/reference/random/index.html |

## Tham khảo
- Johns Hopkins Poker Course — Lecture 2 (*Expected value in action*): https://www.youtube.com/watch?v=0QIwGeLgr20
- Wikipedia — *Casino game § House edge*: https://en.wikipedia.org/wiki/Casino_game
- Wikipedia — *Gambler's fallacy*: https://en.wikipedia.org/wiki/Gambler%27s_fallacy
- Wikipedia — *Martingale (betting system)*: https://en.wikipedia.org/wiki/Martingale_(betting_system)
- Peters — *The ergodicity problem in economics*, Nature Physics: https://doi.org/10.1038/s41567-019-0732-0

## Liên kết
[[Expectation]] · [[Pot Odds]] · [[Bankroll & Kelly Criterion]] · [[Gambler's Ruin]] · [[Roulette]] · [[Số đề & Lô]] · [[Law of Large Numbers]] · [[Prob&Stats]]
