---
tags: [probability, limit-theorems]
status: evergreen
---
# Law of Large Numbers

> Trung bình mẫu hội tụ về kỳ vọng. Định lý nền của toàn bộ thống kê thực nghiệm — và bị hiểu sai thường xuyên nhất trong toàn bộ môn xác suất.

## 1. Hai phiên bản

Cho $X_1, X_2,\dots$ iid, $E[X_i]=\mu$, $E|X_i|<\infty$. Đặt $\bar X_n = \frac1n\sum_{i=1}^n X_i$.

**Weak LLN** (Khinchin): $\bar X_n \xrightarrow{P} \mu$, tức
$$\forall \varepsilon>0:\quad \lim_{n\to\infty}P\big(|\bar X_n - \mu| > \varepsilon\big) = 0$$

**Strong LLN** (Kolmogorov): $\bar X_n \xrightarrow{a.s.} \mu$, tức
$$P\Big(\lim_{n\to\infty}\bar X_n = \mu\Big) = 1$$

Khác biệt: weak nói *với mỗi $n$ lớn, khả năng lệch là nhỏ*; strong nói *hầu như mọi quỹ đạo cuối cùng đều hội tụ và ở lại*. Strong loại trừ việc lệch lớn xảy ra vô hạn lần. → [[Modes of Convergence]]

## 2. Chứng minh weak LLN (khi $\sigma^2<\infty$)

Chebyshev's inequality (→ [[Concentration Inequalities]]) với $\text{Var}(\bar X_n)=\sigma^2/n$:
$$P(|\bar X_n - \mu|>\varepsilon) \le \frac{\sigma^2}{n\varepsilon^2} \longrightarrow 0$$

Ba dòng. Chú ý: kết quả tổng quát chỉ cần $E|X|<\infty$, không cần variance hữu hạn — nhưng chứng minh khó hơn (dùng characteristic function hoặc truncation).

## 3. Điều kiện áp dụng

| Điều kiện | Bắt buộc? |
|---|---|
| Độc lập | Có (hoặc phụ thuộc yếu — có phiên bản cho ergodic process) |
| Cùng phân phối | Có (có phiên bản nới lỏng: Kolmogorov's criterion) |
| $E[X]$ tồn tại hữu hạn | **Bắt buộc** |
| $\text{Var}(X)$ hữu hạn | Không bắt buộc |

**Phản ví dụ Cauchy**: $X_i$ iid Cauchy không có kỳ vọng. Trung bình $\bar X_n$ **cũng là Cauchy** với đúng cùng tham số — lấy 1 triệu mẫu không tốt hơn lấy 1 mẫu. LLN thất bại hoàn toàn.

## 4. LLN nói gì và **không** nói gì

| ✅ Nói | ❌ Không nói |
|---|---|
| $\bar X_n \to \mu$ | $\sum X_i \to n\mu$ |
| Tỉ lệ mặt ngửa → 0.5 | Số mặt ngửa − số mặt sấp → 0 |
| Sai số **tương đối** giảm | Sai số **tuyệt đối** giảm |

Điểm thứ hai rất quan trọng: $|\sum_{i\le n}(X_i-\mu)|$ thực ra **tăng** theo $\sqrt n$ (theo [[Central Limit Theorem]]). Đồng xu không "tự sửa" số sấp thừa; nó chỉ pha loãng chúng bằng số lần tung mới.

## 5. Gambler's fallacy — sai lầm số một

"Đã ra đỏ 10 lần, sắp ra đen rồi." Sai vì các lần quay độc lập; LLN không tạo ra lực kéo về trung bình.

Vụ nổi tiếng: **Monte Carlo Casino, 18/8/1913** — bi rơi vào ô đen 26 lần liên tiếp. Người chơi đổ tiền cược đỏ, thua hàng triệu franc.

Sai lầm ngược lại: **hot hand fallacy** — tin rằng chuỗi thắng sẽ tiếp tục.

Cách hiểu đúng: **regression to the mean**. Các kết quả cực đoan có xu hướng theo sau bởi kết quả gần trung bình hơn — không phải do "bù trừ", mà vì cực đoan vốn hiếm. → [[Expected Value in Gambling]]

## 6. Ứng dụng

- **Monte Carlo integration**: $\int g(x)f(x)dx \approx \frac1n\sum g(X_i)$. Sai số $O(1/\sqrt n)$ **không phụ thuộc số chiều** — đây là lý do Monte Carlo thắng quadrature ở chiều cao.
- **Glivenko–Cantelli**: ECDF hội tụ **đều** về CDF, a.s. → [[CDF]]
- **Bootstrap**: dựa trên việc lấy mẫu lại xấp xỉ được phân phối thật.
- **Bảo hiểm & casino**: nhà cái không cần thắng mỗi ván, chỉ cần đủ số ván.

## 7. Cạm bẫy

1. **Gambler's fallacy** (§5).
2. **Nghĩ "luật số lớn" áp dụng cho $n$ nhỏ** — Tversky & Kahneman gọi là *law of small numbers*.
3. **Dùng khi kỳ vọng không tồn tại** (Cauchy, Pareto $\alpha\le1$).
4. **Dùng khi dữ liệu không độc lập** — chuỗi thời gian có tự tương quan hội tụ chậm hơn nhiều.
5. **Nhầm hội tụ của trung bình với hội tụ của tổng.**
6. **Kỳ vọng $n$ lớn khắc phục được bias.** LLN chỉ khử **variance**, không khử **bias** — dữ liệu lệch thì càng nhiều càng tự tin sai. → [[Estimator Quality]]

## 8. Checklist
- [ ] $E|X|<\infty$ chưa?
- [ ] Dữ liệu có iid không?
- [ ] Có bias hệ thống trong cách thu thập không? (LLN không cứu được)
- [ ] Cần weak hay strong? (mô phỏng dài → strong)
- [ ] Có đang suy luận về **tổng** thay vì **trung bình** không?
- [ ] $n$ đã đủ lớn xét đến độ lệch/đuôi của phân phối chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Seeing Theory — LLN | Mô phỏng trực quan | https://seeing-theory.brown.edu/basic-probability/index.html |
| `numpy.random` + cumsum | Tự vẽ đường hội tụ để cảm nhận tốc độ | https://numpy.org/doc/stable/reference/random/index.html |

## Tham khảo
- Wikipedia — *Law of large numbers*: https://en.wikipedia.org/wiki/Law_of_large_numbers
- Blitzstein & Hwang — *Introduction to Probability*, §10.2: http://probabilitybook.net
- Tversky & Kahneman — *Belief in the law of small numbers*: https://doi.org/10.1037/h0031322
- Wikipedia — *Gambler's fallacy*: https://en.wikipedia.org/wiki/Gambler%27s_fallacy
- Wikipedia — *Monte Carlo method*: https://en.wikipedia.org/wiki/Monte_Carlo_method

## Liên kết
[[Central Limit Theorem]] · [[Modes of Convergence]] · [[Concentration Inequalities]] · [[Expectation]] · [[Expected Value in Gambling]] · [[Prob&Stats]]
