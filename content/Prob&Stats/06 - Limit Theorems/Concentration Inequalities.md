---
tags: [probability, limit-theorems, bounds]
status: growing
---
# Concentration Inequalities

> Cận cho xác suất một biến ngẫu nhiên lệch xa kỳ vọng — **không cần biết phân phối**. Đổi lại: cận thường lỏng. Nhưng chúng đúng *luôn*, kể cả khi $n$ nhỏ.

## 1. Bảng bốn bất đẳng thức

| Tên | Cận | Giả thiết |
|---|---|---|
| **Markov** | $P(X\ge a)\le \dfrac{E[X]}{a}$ | $X\ge0$, $a>0$ |
| **Chebyshev** | $P(|X-\mu|\ge k\sigma)\le \dfrac{1}{k^2}$ | $\sigma^2<\infty$ |
| **Chernoff** | $P(X\ge a)\le e^{-ta}M_X(t)$, $\forall t>0$ | MGF tồn tại |
| **Hoeffding** | $P(|\bar X_n - \mu|\ge \varepsilon)\le 2e^{-2n\varepsilon^2/(b-a)^2}$ | $X_i$ độc lập, $X_i\in[a,b]$ |

Thứ tự chặt dần: Markov (yếu nhất, ít giả thiết nhất) → Chebyshev → Chernoff/Hoeffding (cận **mũ**).

## 2. Markov — viên gạch nền

Chứng minh một dòng bằng indicator: với $X\ge0$, $X \ge a\,I(X\ge a)$; lấy kỳ vọng hai vế → [[Indicator Random Variables]].

Rất lỏng. Ví dụ: thu nhập trung bình 50tr → nhiều nhất 10% người kiếm ≥ 500tr. Đúng, nhưng không hữu ích. Giá trị của Markov là làm **nền** cho các cận mạnh hơn.

## 3. Chebyshev — Markov áp cho $(X-\mu)^2$

$$P(|X-\mu|\ge a) = P\big((X-\mu)^2 \ge a^2\big) \le \frac{\sigma^2}{a^2}$$

| $k$ | Chebyshev | Thực tế nếu Normal |
|---|---|---|
| 2 | $\le 25\%$ | 4.6% |
| 3 | $\le 11\%$ | 0.27% |
| 4 | $\le 6.25\%$ | 0.006% |

Lỏng gấp ~5–1000 lần so với Normal — nhưng **đúng cho mọi phân phối có variance**, kể cả đuôi dày. Đây là công cụ chứng minh weak LLN → [[Law of Large Numbers]].

## 4. Chernoff & Hoeffding — cận mũ

Chernoff: áp Markov cho $e^{tX}$ rồi tối ưu theo $t$. Vì dùng MGF nên khai thác được toàn bộ moment, không chỉ moment bậc hai → [[Moment Generating Functions]].

Hoeffding cho biến bị chặn là dạng dùng nhiều nhất trong thực hành:
$$P\big(|\bar X_n - \mu| \ge \varepsilon\big) \le 2\exp\!\left(\frac{-2n\varepsilon^2}{(b-a)^2}\right)$$

Đảo lại thành **cỡ mẫu cần thiết**: để sai số $\le\varepsilon$ với độ tin cậy $1-\delta$,
$$n \ge \frac{(b-a)^2\ln(2/\delta)}{2\varepsilon^2}$$

Ví dụ: đo tỉ lệ ($b-a=1$), muốn $\varepsilon=0.01$, $\delta=0.05$ → $n\ge 18{,}445$.

## 5. Concentration vs CLT

| | Concentration | CLT |
|---|---|---|
| Đúng với $n$ nhỏ | ✅ | ❌ (tiệm cận) |
| Cần biết phân phối | ❌ | ❌ nhưng cần $\sigma^2$ |
| Chặt | Lỏng | Chặt ở trung tâm |
| Loại kết luận | Cận một phía, đảm bảo | Xấp xỉ |
| Dùng ở đâu | Lý thuyết học máy, thuật toán ngẫu nhiên | Suy diễn thống kê |

Nguyên tắc: **cần bảo đảm chắc chắn → concentration; cần ước lượng chính xác → CLT.**

## 6. Cạm bẫy

1. **Quên $X\ge0$ trong Markov.** Với biến có giá trị âm, cận sai.
2. **Dùng Chebyshev khi đã biết phân phối** — lãng phí, dùng phân phối thật.
3. **Áp Hoeffding cho biến không bị chặn.** Cần biến trong $[a,b]$; nếu chỉ có sub-Gaussian thì dùng phiên bản tương ứng.
4. **Áp cho dữ liệu phụ thuộc.** Cần các phiên bản martingale (Azuma–Hoeffding).
5. **Coi cận lỏng là "kết quả sai".** Nó vẫn đúng — chỉ là không sắc.
6. **Quên nhân 2** cho cận hai phía.
7. **Union bound quá nhiều lần** làm cận trở nên vô dụng — với $m$ giả thuyết, cần $\ln(2m/\delta)$.

## 7. Checklist
- [ ] $X$ có không âm không? (Markov)
- [ ] $\sigma^2$ hữu hạn chứ? (Chebyshev)
- [ ] Biến có bị chặn trong $[a,b]$ không? (Hoeffding)
- [ ] Các biến có độc lập không?
- [ ] Cần cận một phía hay hai phía?
- [ ] Cận có đủ chặt để hữu ích không, hay nên dùng CLT?
- [ ] Nếu kiểm tra nhiều giả thuyết: đã union bound chưa?

## Tham khảo
- Wasserman — *All of Statistics*, Ch.4: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Boucheron, Lugosi & Massart — *Concentration Inequalities*: https://doi.org/10.1093/acprof:oso/9780199535255.001.0001
- Wikipedia — *Markov's inequality*: https://en.wikipedia.org/wiki/Markov%27s_inequality
- Wikipedia — *Chebyshev's inequality*: https://en.wikipedia.org/wiki/Chebyshev%27s_inequality
- Wikipedia — *Hoeffding's inequality*: https://en.wikipedia.org/wiki/Hoeffding%27s_inequality

## Liên kết
[[Law of Large Numbers]] · [[Central Limit Theorem]] · [[Variance]] · [[Moment Generating Functions]] · [[Confidence Intervals]] · [[Prob&Stats]]
