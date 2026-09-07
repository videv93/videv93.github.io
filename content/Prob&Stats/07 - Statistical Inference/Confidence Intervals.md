---
tags: [statistics, inference]
status: evergreen
---
# Confidence Intervals

> "Khoảng tin cậy 95%" **không** có nghĩa "xác suất $\theta$ nằm trong khoảng này là 95%". Cái ngẫu nhiên là **khoảng**, không phải $\theta$. Hiểu sai câu này là hiểu sai toàn bộ thống kê frequentist.

## 1. Định nghĩa

Một khoảng $\mathcal{I}_n = [\hat L_n, \hat U_n]$ (hai đầu là hàm của **dữ liệu**) là khoảng tin cậy mức $1-\alpha$ nếu
$$\mathbb{P}_\theta\big(\theta \in \mathcal{I}_n\big) \ge 1-\alpha \quad \text{với mọi } \theta\in\Theta$$

Diễn giải đúng: **nếu lặp lại thí nghiệm nhiều lần**, khoảng sinh ra sẽ chứa $\theta^*$ trong 95% số lần. Với một khoảng cụ thể đã tính xong, $\theta^*$ hoặc ở trong hoặc không — không có xác suất nào cả (theo quan điểm frequentist).

Muốn nói "xác suất $\theta$ nằm trong khoảng" thì cần **credible interval** của Bayes → [[Bayesian vs Frequentist]].

## 2. Ba cách xây dựng

**(a) Qua CLT** — thông dụng nhất:
$$\bar X_n \pm z_{1-\alpha/2}\frac{\hat\sigma}{\sqrt n}, \qquad z_{0.975}=1.96$$
Dựa trên [[Central Limit Theorem]]; thay $\sigma$ bằng $\hat\sigma$ hợp lệ nhờ Slutsky → [[Modes of Convergence]].

**(b) Qua Fisher information** (cho MLE):
$$\hat\theta_n \pm z_{1-\alpha/2}\frac{1}{\sqrt{n\,I(\hat\theta_n)}} \quad\to\quad \text{[[Fisher Information]]}$$

**(c) Qua concentration inequality** — không cần giả định phân phối, nhưng rộng hơn nhiều:
$$\bar X_n \pm \sqrt{\frac{(b-a)^2\ln(2/\alpha)}{2n}} \quad\text{(Hoeffding)} \quad\to\quad \text{[[Concentration Inequalities]]}$$

**(d) Bootstrap** — khi không có công thức: lấy mẫu lại có hoàn lại, tính $\hat\theta$ mỗi lần, lấy phân vị 2.5% và 97.5%.

## 3. Bảng đối chiếu ba cách

| Cách | Giả định | Độ rộng | Đúng với $n$ nhỏ |
|---|---|---|---|
| CLT | $\sigma^2<\infty$, $n$ lớn | Hẹp | ❌ |
| Fisher | Điều kiện chính quy, $n$ lớn | Hẹp | ❌ |
| Hoeffding | Biến bị chặn | **Rộng** | ✅ |
| Bootstrap | iid | Vừa | Thường ổn |

Ví dụ so sánh cho tỉ lệ, $n=1000$, $\hat p=0.5$: CLT cho $\pm0.031$; Hoeffding cho $\pm0.043$. Cái sau đúng chắc chắn, cái trước sắc hơn.

## 4. Quan hệ với kiểm định giả thuyết

Khoảng tin cậy $1-\alpha$ và kiểm định hai phía mức $\alpha$ là **hai mặt của một đồng xu**:

$$\theta_0 \notin \mathcal{I}_n \iff \text{bác bỏ } H_0:\theta=\theta_0 \text{ ở mức } \alpha$$

Nên báo cáo khoảng tin cậy thay vì chỉ p-value: nó cho biết cả **hướng**, **độ lớn** và **độ không chắc chắn** của hiệu ứng, thay vì một quyết định nhị phân.

## 5. Cạm bẫy

1. **Hiểu sai ý nghĩa xác suất** (§1). Sai lầm phổ biến nhất trong toàn bộ thống kê ứng dụng.
2. **"Hai khoảng chồng nhau nên không khác biệt".** Sai — cần khoảng tin cậy của **hiệu**, không phải so hai khoảng riêng lẻ.
3. **Dùng CLT với $n$ nhỏ hoặc phân phối lệch** → độ phủ thực tế thấp hơn 95% nhiều.
4. **Wald interval cho tỉ lệ khi $\hat p$ gần 0 hoặc 1** — độ phủ rất tệ, có thể vượt $[0,1]$. Dùng **Wilson** hoặc **Agresti–Coull**.
5. **Multiple comparisons.** Tính 20 khoảng 95% thì kỳ vọng 1 cái không chứa sự thật → cần Bonferroni/FDR → [[Conditional Probability Fallacies]].
6. **Chỉ tính khoảng sau khi đã nhìn dữ liệu và chọn giả thuyết** (p-hacking, garden of forking paths).
7. **Nhầm khoảng tin cậy của trung bình với prediction interval** cho một quan sát mới. Cái sau rộng hơn nhiều: $\hat\sigma\sqrt{1+1/n}$ thay vì $\hat\sigma/\sqrt n$.
8. **Bỏ qua bias.** Khoảng tin cậy chỉ đo variance; mẫu lệch thì khoảng hẹp mà vẫn sai.

## 6. Checklist
- [ ] Đang phát biểu ý nghĩa của khoảng cho đúng chứ?
- [ ] $n$ đủ lớn cho CLT chưa, xét đến độ lệch của dữ liệu?
- [ ] Nếu là tỉ lệ: $\hat p$ có gần 0/1 không? → dùng Wilson
- [ ] Cần khoảng cho **hiệu** giữa hai nhóm hay cho từng nhóm?
- [ ] Đã tính bao nhiêu khoảng? Có cần hiệu chỉnh multiple comparisons không?
- [ ] Cần khoảng cho **tham số** hay cho **quan sát mới**?
- [ ] Có bias hệ thống nào không?
- [ ] Đã đối chiếu với bootstrap chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `statsmodels.stats.proportion.proportion_confint` | Wilson, Agresti–Coull, Jeffreys | https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportion_confint.html |
| `scipy.stats.bootstrap` | BCa bootstrap CI | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html |
| `scipy.stats.t.interval` | CI dựa trên t-distribution | https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.t.html |

## Tham khảo
- MIT 18.650 Lecture 3 — *Parametric Inference*: https://www.youtube.com/watch?v=TSkDZbGS94k
- Brown, Cai & DasGupta — *Interval Estimation for a Binomial Proportion*: https://doi.org/10.1214/ss/1009213286
- Greenland et al. — *Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations*: https://doi.org/10.1007/s10654-016-0149-3
- Wikipedia — *Confidence interval*: https://en.wikipedia.org/wiki/Confidence_interval
- Wasserman — *All of Statistics*, Ch.6, 10: https://link.springer.com/book/10.1007/978-0-387-21736-9

## Liên kết
[[Central Limit Theorem]] · [[Fisher Information]] · [[Estimator Quality]] · [[Concentration Inequalities]] · [[Bayesian vs Frequentist]] · [[Conditional Probability Fallacies]] · [[Prob&Stats]]
