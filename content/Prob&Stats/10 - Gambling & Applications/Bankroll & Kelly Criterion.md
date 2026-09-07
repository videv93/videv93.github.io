---
tags: [probability, gambling, application, finance]
status: growing
---
# Bankroll & Kelly Criterion

> Có lợi thế rồi thì cược **bao nhiêu**? Cược quá ít thì tăng trưởng chậm; quá nhiều thì cháy tài khoản dù EV dương. Kelly cho đáp án chính xác.

## 1. Vì sao EV dương chưa đủ

Trò tung xu: thắng thì $\times2$ vốn, thua thì $\times0$, xác suất 50/50. EV mỗi vòng $= 1.0\times$ vốn — hoà. Nhưng nếu **all-in mỗi vòng**, xác suất còn tiền sau $n$ vòng là $2^{-n}\to0$.

Đây là **ergodicity problem**: trung bình theo tập hợp (nhiều người chơi song song) ≠ kết quả của một người qua thời gian, trong quá trình **nhân** (multiplicative). Tối đa hoá EV của tiền là sai mục tiêu; nên tối đa hoá **tốc độ tăng trưởng log** → [[Expectation]].

## 2. Công thức Kelly

Cược even-money, thắng xác suất $p$, thua $q=1-p$, tỉ lệ trả $b:1$:

$$f^* = \frac{bp - q}{b} = \frac{\text{edge}}{\text{odds}}$$

Với $b=1$ (trả 1:1): $f^* = p - q = 2p-1$.

$f^*$ = **tỉ lệ vốn** nên cược mỗi lần.

| $p$ | $b$ | $f^*$ | Diễn giải |
|---|---|---|---|
| 0.55 | 1 | 10% | Lợi thế 10% → cược 10% vốn |
| 0.50 | 1 | 0% | Không lợi thế → **không cược** |
| 0.49 | 1 | $-2\%$ | Âm → nên cược phía kia (hoặc không chơi) |
| 0.60 | 1 | 20% | |
| 0.10 | 20 | 5.5% | Ít khi thắng, thắng lớn |

Với danh mục nhiều khoản đầu tư có lợi suất liên tục: $f^* = \dfrac{\mu - r}{\sigma^2}$ (Merton).

## 3. Kelly tối đa hoá cái gì

$$\max_f\ E\big[\ln(\text{vốn sau})\big]$$

Tối đa hoá log vốn tương đương tối đa hoá **tốc độ tăng trưởng hình học** dài hạn. Ba tính chất được chứng minh:
1. Kelly tối đa hoá tốc độ tăng trưởng dài hạn hầu chắc chắn
2. Kelly về đích trước mọi chiến lược khác trong thời gian kỳ vọng ngắn nhất
3. Kelly **không bao giờ phá sản** (vì luôn cược một *tỉ lệ*, không phải số tuyệt đối)

Điểm 3 là lý do Kelly khác hẳn martingale doubling → [[Gambler's Ruin]].

## 4. Fractional Kelly

Kelly đầy đủ rất biến động: sụt 50% vốn là chuyện thường xuyên. Thực hành phổ biến là **half-Kelly** ($f^*/2$) hoặc quarter-Kelly.

| Chiến lược | % tốc độ tăng trưởng tối đa | Biến động tương đối |
|---|---|---|
| Full Kelly | 100% | 100% |
| Half Kelly | **75%** | 50% |
| Quarter Kelly | 44% | 25% |

Half-Kelly giữ **3/4 tốc độ tăng trưởng** với **một nửa biến động** — đánh đổi rất tốt, và là lý do gần như không ai chơi full Kelly.

## 5. Cạm bẫy

1. **Overbetting.** Cược quá $f^*$ làm tăng trưởng **giảm**; cược quá $2f^*$ cho tăng trưởng **âm** dù EV dương.
2. **Ước lượng sai $p$.** Kelly cực nhạy với $p$. Nếu bạn nghĩ $p=0.55$ mà thật ra $0.51$, bạn đang overbet gấp 5 lần. Đây là lý do thực dụng nhất để dùng fractional Kelly — nó là hàng rào chống sai số ước lượng.
3. **Áp cho trò EV âm.** $f^*<0$ nghĩa là **đừng chơi**, không phải "cược nhỏ thôi".
4. **Bỏ qua tương quan** khi cược nhiều kèo cùng lúc — cần Kelly nhiều chiều.
5. **Không tính phí/rake/thuế.** Chúng ăn thẳng vào edge.
6. **Cược cố định thay vì theo tỉ lệ.** Cược tỉ lệ mới là thứ đảm bảo không phá sản.
7. **Nhầm bankroll với tổng tài sản.** Bankroll là phần tiền dành riêng cho hoạt động này.

## 6. Ngoài cờ bạc

- **Quản lý vị thế đầu tư** — Kelly là cơ sở của position sizing; Thorp dùng nó ở quỹ Princeton/Newport.
- **Phân bổ ngân sách R&D / thử nghiệm** giữa các dự án rủi ro.
- **Quản trị rủi ro**: nguyên tắc "không đặt cược nào có thể làm bạn ra khỏi cuộc chơi".
- **Multi-armed bandit**: cân bằng explore/exploit → [[Beta-Binomial Conjugacy]].

## 7. Checklist
- [ ] Edge có **thật** không? Ước lượng $p$ từ đâu, độ tin cậy thế nào?
- [ ] Đã trừ phí, rake, thuế chưa?
- [ ] $f^*$ bằng bao nhiêu?
- [ ] Có dùng fractional Kelly để phòng sai số ước lượng không?
- [ ] Bankroll là bao nhiêu, tách biệt với tiền sinh hoạt chứ?
- [ ] Nhiều kèo cùng lúc có tương quan không?
- [ ] Chịu được mức sụt vốn (drawdown) bao nhiêu về mặt tâm lý?
- [ ] Nếu $f^*\le0$: đã chấp nhận là **không chơi** chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Mô phỏng Monte Carlo | Vẽ phân phối tăng trưởng theo từng $f$ | https://numpy.org/doc/stable/reference/random/index.html |
| Wizard of Odds — Kelly | Máy tính & giải thích | https://wizardofodds.com/gambling/money-management/ |

## Tham khảo
- Kelly (1956) — *A New Interpretation of Information Rate*: https://doi.org/10.1002/j.1538-7305.1956.tb03809.x
- Thorp — *The Kelly Criterion in Blackjack, Sports Betting, and the Stock Market*: https://www.eecs.harvard.edu/cs286r/courses/fall12/papers/Thorpe_KellyCriterion2007.pdf
- Peters — *The ergodicity problem in economics*, Nature Physics: https://doi.org/10.1038/s41567-019-0732-0
- Wikipedia — *Kelly criterion*: https://en.wikipedia.org/wiki/Kelly_criterion
- Poundstone — *Fortune's Formula*: https://en.wikipedia.org/wiki/Fortune%27s_Formula

## Liên kết
[[Expected Value in Gambling]] · [[Gambler's Ruin]] · [[Expectation]] · [[LOTUS]] · [[Pot Odds]] · [[Variance]] · [[Prob&Stats]]
