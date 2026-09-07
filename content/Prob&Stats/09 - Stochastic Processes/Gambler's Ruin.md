---
tags: [probability, stochastic-process, gambling]
status: evergreen
---
# Gambler's Ruin

> Hai người chơi, mỗi ván ăn 1 đồng. Ai cũng thua sạch cuối cùng — và ngay cả trong trò **hoàn toàn công bằng**, người ít vốn hơn gần như chắc chắn là người cháy trước.

## 1. Bài toán

Bạn có $i$ đồng, đối thủ có $N-i$ đồng. Mỗi ván: thắng 1 đồng với xác suất $p$, thua 1 đồng với $q=1-p$. Chơi đến khi một bên hết tiền.

$p_i$ = xác suất bạn thắng hết (đạt $N$) khi đang có $i$ đồng.

## 2. Lời giải (Stat 110 Lecture 7)

[[First Step Analysis]] — điều kiện theo ván tiếp theo:
$$p_i = p\,p_{i+1} + q\,p_{i-1}, \qquad p_0 = 0,\ p_N = 1$$

Phương trình sai phân tuyến tính, phương trình đặc trưng $px^2 - x + q = 0$ có nghiệm $x=1$ và $x=q/p$.

$$\boxed{p_i = \begin{cases}\dfrac{1-(q/p)^i}{1-(q/p)^N} & p\ne q\\[2ex] \dfrac{i}{N} & p = q = \tfrac12\end{cases}}$$

Trường hợp $p=q$ cần xử lý riêng vì nghiệm đặc trưng **kép** → dạng $A + Bi$.

Kết quả $p_i = i/N$ trong trò công bằng rất đẹp: **xác suất thắng đúng bằng tỉ lệ vốn**. (Hệ quả của martingale optional stopping theorem.)

## 3. Con số gây sốc

Trò công bằng ($p=0.5$), bạn có \$100, casino có \$1.000.000:
$$p = \frac{100}{1000100} \approx 0.01\%$$

Với $p=0.49$ (roulette châu Âu đặt màu), $N$ rất lớn: xác suất thắng $\approx 1-(q/p)^i \cdot$… thực tế **gần như 0**.

| $p$ | Vốn $i=100$, $N=1000$ | Ghi chú |
|---|---|---|
| 0.50 | 10.0% | Công bằng |
| 0.49 | 1.8% | Biên nhà cái nhỏ |
| 0.47 | 0.25% | Roulette Mỹ |
| 0.51 | 98.2% | Bạn có lợi thế |

Chênh lệch 1% ở $p$ làm xác suất thắng đổi ~5 lần. Đây là **hiệu ứng mũ**: biên nhà cái nhỏ nhưng luỹ tiến theo số ván → [[Expected Value in Gambling]].

## 4. Bài học rút ra

1. **Vốn quan trọng ngang kỹ năng.** Người ít vốn hơn cháy trước ngay cả khi trò công bằng.
2. **Biên nhỏ, hậu quả mũ.** Casino không cần thắng nhiều mỗi ván.
3. **Chống lại đối thủ vốn vô hạn, mọi trò có $p\le1/2$ đều dẫn tới phá sản chắc chắn.** Với $p>1/2$, xác suất không phá sản là $1-(q/p)^i$ — dương nhưng không phải 1.
4. **Thời gian chơi kỳ vọng** (trò công bằng): $E[\text{số ván}] = i(N-i)$. Với $i=100$, $N=1000$: 90.000 ván. Rất lâu — cảm giác "đang hoà" kéo dài.
5. **Martingale betting system** (gấp đôi sau mỗi lần thua) không cứu được: nó đổi "thua nhỏ thường xuyên" lấy "thua thảm hiếm khi", EV vẫn âm, và bàn cược có trần.

## 5. Cạm bẫy

1. **Nghĩ trò công bằng nghĩa là an toàn.** Nó chỉ cân bằng EV, không cân bằng rủi ro phá sản.
2. **Quên trường hợp $p=q$** cần công thức riêng.
3. **Áp cho cược không phải 1 đồng mỗi ván.** Nếu kích cỡ cược thay đổi → cần mô hình khác ([[Bankroll & Kelly Criterion]]).
4. **Bỏ qua thời gian.** Kỳ vọng $i(N-i)$ ván có thể vượt cả đời người.
5. **Tin vào hệ thống cược.** Không hệ thống nào biến EV âm thành dương.
6. **Chỉ nhìn xác suất thắng, bỏ qua độ lớn.** Trong tài chính, "xác suất cao thắng nhỏ, xác suất thấp thua lớn" là cấu trúc của rất nhiều chiến lược nổ tung.

## 6. Ứng dụng ngoài cờ bạc

- **Rủi ro phá sản của quỹ đầu tư / công ty bảo hiểm** (ruin theory)
- **Random walk hấp thụ hai biên** trong vật lý, sinh học quần thể (genetic drift, Moran model)
- **Sequential hypothesis testing** (Wald's SPRT) — cùng cấu trúc toán học
- **Thuật toán ngẫu nhiên** có điều kiện dừng hai biên

## 7. Checklist
- [ ] $p$ thật sự là bao nhiêu? (không phải bạn *nghĩ* là bao nhiêu)
- [ ] Vốn của bạn so với đối thủ chênh bao nhiêu?
- [ ] Kích cỡ cược có cố định không?
- [ ] Có biên trên/dưới nào khác không (trần bàn, giới hạn rút)?
- [ ] Thời gian chơi kỳ vọng có thực tế không?
- [ ] Nếu $p>1/2$: có nên dùng Kelly để tối ưu tăng trưởng không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Mô phỏng Python 20 dòng | Kiểm chứng công thức nhanh nhất | https://numpy.org/doc/stable/reference/random/index.html |
| Wizard of Odds | Số liệu xác suất các trò casino | https://wizardofodds.com |

## Tham khảo
- Stat 110 Lecture 7 (*Gambler's Ruin*): https://www.youtube.com/watch?v=PNrqCdslGi4
- Blitzstein & Hwang — *Introduction to Probability*, §2.7: http://probabilitybook.net
- Wikipedia — *Gambler's ruin*: https://en.wikipedia.org/wiki/Gambler%27s_ruin
- Wikipedia — *Martingale (betting system)*: https://en.wikipedia.org/wiki/Martingale_(betting_system)

## Liên kết
[[First Step Analysis]] · [[Random Walk]] · [[Expected Value in Gambling]] · [[Bankroll & Kelly Criterion]] · [[Markov Chains]] · [[Roulette]] · [[Prob&Stats]]
