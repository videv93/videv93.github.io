---
tags: [statistics, inference, estimation]
status: growing
---
# Fisher Information

> Đo **độ cong** của log-likelihood tại nghiệm. Log-likelihood nhọn → dữ liệu nói rõ $\theta$ ở đâu → ước lượng chính xác. Bẹt → nhiều giá trị $\theta$ giải thích dữ liệu gần như nhau.

## 1. Định nghĩa

**Score function**: $s(\theta) = \nabla_\theta \ln p_\theta(X)$. Dưới điều kiện chính quy, $E_\theta[s(\theta)] = 0$.

**Fisher information**:
$$I(\theta) = \text{Var}_\theta\big(s(\theta)\big) = E_\theta\big[s(\theta)s(\theta)^\top\big] = -E_\theta\big[\nabla^2_\theta \ln p_\theta(X)\big]$$

Đẳng thức cuối (**information equality**) là dạng dùng nhiều nhất: information = **âm kỳ vọng của Hessian** = độ cong trung bình.

Rigollet trình bày cả hai dạng ở Lecture 5: outer product của gradient, và âm Hessian. Chúng bằng nhau chỉ khi model **đúng đặc tả**; khi misspecified thì khác nhau, và ta phải dùng **sandwich estimator** (robust standard errors).

Với $n$ quan sát iid: $I_n(\theta) = n\,I(\theta)$ — thông tin **cộng dồn tuyến tính** theo dữ liệu.

## 2. Hai kết quả chính

**(a) Tiệm cận chuẩn của MLE**
$$\sqrt n\big(\hat\theta^{MLE}_n - \theta^*\big) \xrightarrow{d} N\big(0,\ I(\theta^*)^{-1}\big)$$

Từ đó: $\text{SE}(\hat\theta_n) \approx \frac{1}{\sqrt{n\,I(\theta^*)}}$ → cơ sở trực tiếp cho [[Confidence Intervals]].

Thực hành: thay $I(\theta^*)$ bằng $I(\hat\theta_n)$ (hợp lệ nhờ Slutsky → [[Modes of Convergence]]), hoặc dùng **observed information** $-\nabla^2\ell_n(\hat\theta_n)$ — thường tốt hơn ở $n$ hữu hạn (Efron & Hinkley).

**(b) Cramér–Rao lower bound**

Với mọi estimator **không chệch** $\hat\theta$:
$$\text{Var}(\hat\theta) \ge \frac{1}{n\,I(\theta)}$$

MLE đạt cận này tiệm cận → **asymptotically efficient**. Không estimator không chệch nào tốt hơn MLE khi $n$ lớn.

⚠️ Cận này chỉ áp cho estimator **không chệch**. Estimator có bias hoàn toàn có thể có MSE thấp hơn (shrinkage) → [[Estimator Quality]].

## 3. Ví dụ

| Model | $I(\theta)$ | Diễn giải |
|---|---|---|
| Bern($p$) | $\dfrac{1}{p(1-p)}$ | **Cực tiểu tại $p=1/2$** — đồng xu cân khó ước lượng nhất |
| Pois($\lambda$) | $1/\lambda$ | $\lambda$ lớn → khó ước lượng tương đối |
| $N(\mu,\sigma^2)$, $\sigma$ biết | $1/\sigma^2$ | Nhiễu nhiều → ít thông tin |
| Expo($\lambda$) | $1/\lambda^2$ | |

Dòng đầu đáng suy nghĩ: để phân biệt $p=0.50$ với $p=0.51$ cần **nhiều** mẫu hơn hẳn so với phân biệt $p=0.01$ với $p=0.02$.

## 4. Điều kiện chính quy (regularity conditions)

Mọi kết quả trên đòi hỏi:
1. **Support không phụ thuộc $\theta$** — loại Unif($0,\theta$) ra ngoài
2. $\theta^*$ nằm trong **phần trong** của $\Theta$, không phải trên biên
3. $\ln p_\theta$ khả vi hai lần, đổi được thứ tự đạo hàm và tích phân
4. Model **identifiable** → [[Statistical Model]]
5. $I(\theta)$ khả nghịch

Vi phạm bất kỳ điều nào → tốc độ hội tụ và phân phối tiệm cận đều đổi. Ví dụ: với Unif($0,\theta$), $\hat\theta=\max X_i$ hội tụ với tốc độ $1/n$ (nhanh hơn $1/\sqrt n$!) và phân phối giới hạn là Exponential, không phải Normal.

## 5. Cạm bẫy

1. **Dùng khi điều kiện chính quy không thoả** (§4).
2. **Áp Cramér–Rao cho estimator chệch.**
3. **Nhầm information với "lượng dữ liệu".** $I(\theta)$ là thông tin **mỗi quan sát**, phụ thuộc $\theta$.
4. **Dùng expected information khi model có thể sai** → sai số chuẩn không đáng tin; dùng sandwich estimator.
5. **Kiểm định trên biên** (ví dụ $H_0: \sigma^2=0$) — phân phối tiệm cận không phải chi-square chuẩn.
6. **Tin sai số chuẩn tiệm cận với $n$ nhỏ.** Bootstrap thường an toàn hơn.
7. **Nhầm với Shannon entropy / mutual information** — khác hoàn toàn, dù cùng chữ "information".

## 6. Checklist
- [ ] Điều kiện chính quy có thoả không? (support, biên, khả vi)
- [ ] $\theta^*$ có ở biên $\Theta$ không?
- [ ] Đang dùng expected hay observed information?
- [ ] Model có thể misspecified không? → cân nhắc sandwich SE
- [ ] $n$ đủ lớn cho lý thuyết tiệm cận chưa? (đối chiếu bootstrap)
- [ ] $I(\theta)$ có khả nghịch không? (nếu gần suy biến → gần mất identifiability)
- [ ] Đang so sánh với Cramér–Rao trên lớp estimator không chệch chứ?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `statsmodels` `.bse`, `.cov_params()` | Sai số chuẩn từ observed information | https://www.statsmodels.org/stable/index.html |
| `cov_type='HC0'` trong statsmodels | Sandwich / robust standard errors | https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.RegressionResults.get_robustcov_results.html |
| `numdifftools` | Hessian số học cho likelihood tuỳ biến | https://numdifftools.readthedocs.io |

## Tham khảo
- MIT 18.650 Lecture 5 (*Fisher Information*, *Outer Product*, *Covariance Matrix*): https://www.youtube.com/watch?v=0Va2dOLqUfM
- Wasserman — *All of Statistics*, §9.7: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Efron & Hinkley — *Assessing the accuracy of the MLE: observed versus expected Fisher information*: https://doi.org/10.1093/biomet/65.3.457
- Wikipedia — *Fisher information*: https://en.wikipedia.org/wiki/Fisher_information
- Wikipedia — *Cramér–Rao bound*: https://en.wikipedia.org/wiki/Cram%C3%A9r%E2%80%93Rao_bound

## Liên kết
[[Maximum Likelihood Estimation]] · [[Estimator Quality]] · [[Convexity & Optimization]] · [[Confidence Intervals]] · [[Modes of Convergence]] · [[Prob&Stats]]
