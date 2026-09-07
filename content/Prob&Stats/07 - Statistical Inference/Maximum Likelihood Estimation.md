---
tags: [statistics, inference, estimation]
status: evergreen
---
# Maximum Likelihood Estimation

> Chọn $\theta$ làm cho **dữ liệu đã quan sát trở nên khả dĩ nhất**. Một nguyên lý duy nhất, áp dụng được cho gần như mọi mô hình, và có bảo đảm lý thuyết mạnh.

## 1. Likelihood

Với $X_1,\dots,X_n$ iid theo $\mathbb{P}_\theta$:
$$L_n(\theta) = \prod_{i=1}^{n} p_\theta(X_i), \qquad \ell_n(\theta) = \ln L_n(\theta) = \sum_{i=1}^n \ln p_\theta(X_i)$$

$$\hat\theta^{MLE}_n = \arg\max_{\theta\in\Theta} \ell_n(\theta)$$

**Điểm mấu chốt về ngữ nghĩa**: $L_n$ là hàm của $\theta$ với **dữ liệu cố định** — nó *không* phải phân phối xác suất trên $\theta$ và **không tích phân về 1**. Đây là khác biệt cốt lõi với posterior của Bayes → [[Bayesian vs Frequentist]].

**Vì sao lấy log**: biến tích thành tổng (ổn định số học, tránh underflow), đạo hàm dễ hơn, và bảo toàn điểm cực đại vì $\ln$ tăng ngặt.

Tích các $p_\theta(X_i)$ hợp lệ nhờ **độc lập có điều kiện cho trước $\theta$** → [[Conditional Independence]].

## 2. Công thức MLE của các mô hình chuẩn

| Model | $\hat\theta^{MLE}$ | Ghi chú |
|---|---|---|
| Bern($p$) | $\bar X_n$ | Tỉ lệ mẫu |
| Bin($N,p$), $N$ biết | $\bar X_n / N$ | |
| Pois($\lambda$) | $\bar X_n$ | |
| Expo($\lambda$) | $1/\bar X_n$ | Chệch! $E[1/\bar X]\ne 1/E[X]$ (Jensen) |
| $N(\mu,\sigma^2)$ | $\hat\mu=\bar X_n$, $\hat\sigma^2 = \frac1n\sum(X_i-\bar X)^2$ | $\hat\sigma^2$ chệch → [[Estimator Quality]] |
| Unif($0,\theta$) | $\max_i X_i$ | Không tìm được bằng đạo hàm |

Dòng cuối là ví dụ quan trọng: log-likelihood **không khả vi** ở chỗ cần thiết; cực đại nằm ở biên của miền khả dĩ. Đạo hàm-bằng-0 không phải phương pháp phổ quát.

## 3. Vì sao MLE hoạt động — KL divergence

Rigollet (Lecture 4–5) dẫn MLE từ việc tối thiểu hoá **Kullback–Leibler divergence**:
$$\text{KL}(\mathbb{P}_{\theta^*}\|\mathbb{P}_\theta) = E_{\theta^*}\!\left[\ln\frac{p_{\theta^*}(X)}{p_\theta(X)}\right] \ge 0,\quad =0 \iff \theta=\theta^*$$

Ta không tính được KL (không biết $\theta^*$), nhưng
$$\arg\min_\theta \text{KL} = \arg\max_\theta E_{\theta^*}[\ln p_\theta(X)] \approx \arg\max_\theta \frac1n\sum_i \ln p_\theta(X_i)$$

Bước xấp xỉ cuối chính là [[Law of Large Numbers]]. **Vậy MLE là ước lượng plug-in của bài toán tối thiểu KL** — và đó là lý do nó consistent.

Hệ quả về misspecification: nếu $\theta^*\notin\Theta$, MLE vẫn hội tụ về $\theta$ **gần sự thật nhất theo KL** (quasi-MLE).

## 4. Tính chất tiệm cận

Dưới các điều kiện chính quy (support không phụ thuộc $\theta$, $\ell$ khả vi hai lần, $\theta^*$ nằm trong phần trong của $\Theta$…):

| Tính chất | Nội dung |
|---|---|
| **Consistency** | $\hat\theta_n \xrightarrow{P}\theta^*$ |
| **Asymptotic normality** | $\sqrt n(\hat\theta_n-\theta^*)\xrightarrow{d}N\big(0, I(\theta^*)^{-1}\big)$ |
| **Asymptotic efficiency** | Đạt cận Cramér–Rao → [[Fisher Information]] |
| **Invariance** | $\widehat{g(\theta)} = g(\hat\theta)$ với mọi hàm $g$ |

Tính **invariance** rất tiện: muốn MLE của $\sigma$ thì lấy căn MLE của $\sigma^2$, không cần tối ưu lại. (Lưu ý: tính chất này không được bảo toàn với unbiasedness.)

## 5. Quy trình thực hành

1. Viết $L_n(\theta) = \prod p_\theta(X_i)$
2. Lấy log → $\ell_n(\theta)$
3. Kiểm tra $\ell_n$ có **lõm** không → [[Convexity & Optimization]]
4. Nếu lõm và khả vi: giải $\nabla\ell_n(\theta)=0$
5. Nếu không: kiểm tra biên, hoặc tối ưu số (Newton, gradient descent, EM)
6. Kiểm tra Hessian âm xác định (đúng là cực **đại**)
7. Tính $I(\theta)$ để lấy sai số chuẩn → khoảng tin cậy

## 6. Cạm bẫy

1. **Giải đạo hàm = 0 mà không kiểm tra tính lõm** → có thể ra cực tiểu hoặc điểm yên ngựa.
2. **Bỏ qua biên.** Unif($0,\theta$), hay $\hat p = 0$ khi không có thành công nào.
3. **MLE có thể chệch** — nhất là với tham số phương sai và với $n$ nhỏ.
4. **MLE có thể không tồn tại hoặc không duy nhất.** Ví dụ: mixture Gaussian có likelihood **không bị chặn** (đặt một thành phần lên đúng một điểm dữ liệu, cho $\sigma\to0$).
5. **Separation trong logistic regression** → MLE tiến ra vô cực; cần regularization.
6. **Overfitting**: MLE tối đa hoá khớp dữ liệu **đã thấy**; với model giàu tham số cần penalty (AIC/BIC/ridge).
7. **Dùng lý thuyết tiệm cận với $n$ nhỏ.**
8. **Nhân likelihood khi dữ liệu không độc lập** → tự tin quá mức.

## 7. Checklist
- [ ] Model đã viết rõ chưa? Identifiable chưa? → [[Statistical Model]]
- [ ] Dữ liệu có iid không?
- [ ] Support có phụ thuộc $\theta$ không? (nếu có → cẩn thận cả với tối ưu lẫn tiệm cận)
- [ ] $\ell_n$ có lõm không? Đã kiểm tra Hessian chưa?
- [ ] Nghiệm có nằm ở biên không?
- [ ] MLE có tồn tại và duy nhất không?
- [ ] Đã tính sai số chuẩn qua Fisher information chưa?
- [ ] Nếu model có thể sai: kết luận có robust không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.optimize.minimize` | Tối ưu $-\ell_n$ | https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html |
| `scipy.stats.<dist>.fit` | MLE sẵn cho phân phối chuẩn | https://docs.scipy.org/doc/scipy/reference/stats.html |
| `statsmodels` GenericLikelihoodModel | MLE tuỳ biến + sai số chuẩn | https://www.statsmodels.org/stable/generated/statsmodels.base.model.GenericLikelihoodModel.html |

## Tham khảo
- MIT 18.650 Lecture 5 — *Maximum Likelihood Estimation (cont.)*: https://www.youtube.com/watch?v=0Va2dOLqUfM
- MIT OCW 18.650: https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/
- Wasserman — *All of Statistics*, Ch.9: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Wikipedia — *Maximum likelihood estimation*: https://en.wikipedia.org/wiki/Maximum_likelihood_estimation
- Wikipedia — *Kullback–Leibler divergence*: https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence

## Liên kết
[[Statistical Model]] · [[Convexity & Optimization]] · [[Fisher Information]] · [[Estimator Quality]] · [[Bayesian vs Frequentist]] · [[Prob&Stats]]
