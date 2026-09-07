---
tags: [probability, expectation]
status: evergreen
---
# Expectation

> Trung bình **có trọng số**, trọng số là xác suất. Không phải "giá trị hay gặp nhất", không phải "giá trị bạn sẽ nhận được" — mà là trọng tâm của phân phối.

## 1. Định nghĩa

Rời rạc: $\displaystyle E[X] = \sum_x x\,P(X=x)$
Liên tục: $\displaystyle E[X] = \int_{-\infty}^{\infty} x f(x)\,dx$

Diễn giải vật lý: **trọng tâm** (center of mass) của khối lượng xác suất. Đặt phân phối lên một thanh, $E[X]$ là điểm cân bằng.

## 2. Trung bình mẫu vs kỳ vọng

| | Ký hiệu | Là gì |
|---|---|---|
| Kỳ vọng | $E[X]$, $\mu$ | Tham số của **phân phối** — một số cố định |
| Trung bình mẫu | $\bar{X}_n$ | Hàm của **dữ liệu** — một random variable |

$\bar{X}_n \to \mu$ khi $n\to\infty$ ([[Law of Large Numbers]]). Nhầm hai thứ này là nguồn gốc của rất nhiều hiểu lầm trong thống kê.

## 3. Tính chất

| Tính chất | Điều kiện |
|---|---|
| $E[aX+b] = aE[X]+b$ | luôn |
| $E[X+Y]=E[X]+E[Y]$ | **luôn**, không cần độc lập → [[Linearity of Expectation]] |
| $E[XY]=E[X]E[Y]$ | cần $X\perp Y$ (hoặc uncorrelated) |
| $X\ge0 \Rightarrow E[X]\ge0$ | luôn |
| $X\le Y \Rightarrow E[X]\le E[Y]$ | luôn (monotonicity) |
| $E[g(X)] = \sum g(x)p(x)$ | LOTUS → [[LOTUS]] |
| $E[g(X)] \ne g(E[X])$ | trừ khi $g$ tuyến tính |

Dòng cuối là **Jensen's inequality**: nếu $g$ lồi thì $E[g(X)] \ge g(E[X])$; nếu lõm thì ngược lại. Ví dụ: $E[X^2] \ge (E[X])^2$ — đó chính là lý do $\text{Var}\ge0$.

## 4. Kỳ vọng có thể không tồn tại

$E[X]$ tồn tại khi $E|X| < \infty$. Phản ví dụ:

- **Cauchy**: $\int \frac{|x|}{\pi(1+x^2)}dx = \infty$ → không có kỳ vọng. Trung bình mẫu của $n$ mẫu Cauchy **cũng là Cauchy** — lấy thêm dữ liệu không giúp gì. LLN và CLT đều không áp dụng.
- **St. Petersburg paradox**: trò chơi tung xu đến khi ra sấp, thắng $2^n$. $E = \sum \frac{1}{2^n}2^n = \infty$. Nhưng không ai trả $1000\char36 $ để chơi — nghịch lý này dẫn tới khái niệm **utility** thay vì tiền tuyệt đối, và tới [[Bankroll & Kelly Criterion]].

## 5. Cạm bẫy

1. **Coi kỳ vọng là "kết quả điển hình".** $E[X]$ có thể là giá trị $X$ **không bao giờ** nhận (số con trung bình 1.8).
2. **Dùng mean cho phân phối lệch mạnh.** Thu nhập trung bình bị kéo bởi đuôi; median mô tả tốt hơn "người điển hình".
3. **$E[1/X] \ne 1/E[X]$**, $E[\ln X]\ne \ln E[X]$ — Jensen.
4. **Tối ưu hoá kỳ vọng khi rủi ro phá sản là thật.** EV dương vẫn có thể dẫn tới cháy tài khoản → [[Bankroll & Kelly Criterion]].
5. **Quên kiểm tra kỳ vọng có tồn tại không** trước khi dùng LLN/CLT.
6. **Ergodicity.** Trung bình theo tập hợp (ensemble) khác trung bình theo thời gian với một cá nhân trong quá trình nhân — đây là lý do trò có EV dương vẫn có thể phá sản người chơi.

## 6. Checklist
- [ ] $E|X|$ có hữu hạn không?
- [ ] Phân phối có lệch mạnh không? Median có phù hợp hơn không?
- [ ] Đang tính $E[g(X)]$? → dùng [[LOTUS]], đừng thay $E[X]$ vào $g$
- [ ] Có cần độc lập cho bước đang làm không?
- [ ] Sanity check: $E[X]$ có nằm trong khoảng giá trị có thể của $X$ không?
- [ ] Nếu đây là quyết định thật: rủi ro đuôi có được xét không, hay chỉ nhìn trung bình?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, Ch.4: http://probabilitybook.net
- Stat 110 Lecture 9: https://www.youtube.com/watch?v=LX2q356N2rU
- Wikipedia — *Expected value*: https://en.wikipedia.org/wiki/Expected_value
- Wikipedia — *St. Petersburg paradox*: https://en.wikipedia.org/wiki/St._Petersburg_paradox
- Wikipedia — *Jensen's inequality*: https://en.wikipedia.org/wiki/Jensen%27s_inequality

## Liên kết
[[Linearity of Expectation]] · [[LOTUS]] · [[Variance]] · [[Law of Large Numbers]] · [[Expected Value in Gambling]] · [[Prob&Stats]]
