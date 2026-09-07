---
tags: [probability, expectation, moments]
status: evergreen
---
# Variance

> Đo mức phân tán quanh kỳ vọng. Bình phương độ lệch — không phải vì đó là cách duy nhất, mà vì đó là cách duy nhất **cộng được**.

## 1. Định nghĩa

$$\text{Var}(X) = E\!\left[(X-\mu)^2\right] = E[X^2] - (E[X])^2$$

Công thức thứ hai dùng để tính; công thức thứ nhất để hiểu.

**Standard deviation** $\text{SD}(X)=\sqrt{\text{Var}(X)}$ — cùng đơn vị với $X$, nên dùng để báo cáo. Variance dùng để tính toán.

Từ Jensen: $E[X^2]\ge(E[X])^2$ nên $\text{Var}\ge0$, dấu bằng khi $X$ là hằng số → [[LOTUS]].

## 2. Tính chất

| Tính chất | Điều kiện |
|---|---|
| $\text{Var}(aX+b) = a^2\text{Var}(X)$ | luôn — **cộng hằng số không đổi variance** |
| $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)+2\text{Cov}(X,Y)$ | luôn |
| $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)$ | **cần** uncorrelated |
| $\text{Var}(X-Y)=\text{Var}(X)+\text{Var}(Y)$ | uncorrelated — chú ý dấu **cộng** |
| $\text{Var}(\bar X_n) = \sigma^2/n$ | iid |

Dòng cuối là nền tảng của toàn bộ thống kê: **sai số chuẩn giảm theo $1/\sqrt{n}$**. Muốn giảm sai số một nửa, cần gấp **4 lần** dữ liệu.

Đây cũng là điểm khác biệt cơ bản với [[Linearity of Expectation]]: kỳ vọng luôn cộng được, variance thì không.

## 3. Covariance & correlation

$$\text{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)] = E[XY]-E[X]E[Y]$$
$$\rho(X,Y) = \frac{\text{Cov}(X,Y)}{\text{SD}(X)\,\text{SD}(Y)} \in [-1,1]$$

| Tính chất | |
|---|---|
| $\text{Cov}(X,X)=\text{Var}(X)$ | |
| $\text{Cov}(aX+b, cY+d) = ac\,\text{Cov}(X,Y)$ | |
| $X\perp Y \Rightarrow \text{Cov}=0$ | chiều ngược **sai** → [[Independence of Random Variables]] |
| $\rho=\pm1 \iff Y = aX+b$ | quan hệ tuyến tính hoàn hảo |

Correlation chỉ đo quan hệ **tuyến tính**. Anscombe's quartet: bốn tập dữ liệu trông hoàn toàn khác nhau nhưng cùng mean, variance và $\rho$.

## 4. Variance của các phân phối chính

| Phân phối | Variance | Ghi chú |
|---|---|---|
| Bern($p$) | $p(1-p)$ | Cực đại tại $p=1/2$ |
| Bin($n,p$) | $np(1-p)$ | Tổng $n$ Bernoulli **độc lập** |
| HGeom | $np'(1-p')\frac{N-n}{N-1}$ | **Nhỏ hơn** Binomial |
| Pois($\lambda$) | $\lambda$ | = mean |
| Geom($p$) | $(1-p)/p^2$ | |
| Unif($a,b$) | $(b-a)^2/12$ | |
| $N(\mu,\sigma^2)$ | $\sigma^2$ | |
| Expo($\lambda$) | $1/\lambda^2$ | = mean² |
| Cauchy | **không tồn tại** | → [[Central Limit Theorem]] không áp dụng |

## 5. Law of Total Variance (Eve's Law)

$$\text{Var}(X) = E[\text{Var}(X\mid Y)] + \text{Var}(E[X\mid Y])$$

Đọc: "trung bình của biến thiên trong nhóm" + "biến thiên giữa các nhóm trung bình". Đây chính là phân rã ANOVA. → [[Conditional Expectation]]

## 6. Cạm bẫy

1. **Cộng variance khi có tương quan.** Trong danh mục đầu tư, bỏ qua covariance là bỏ qua toàn bộ rủi ro hệ thống.
2. **Nhầm variance với SD** khi truyền tham số (`scipy.stats.norm` nhận SD).
3. **$\text{Var}(X-Y)$ có dấu cộng**, không phải trừ.
4. **$n$ vs $n-1$** trong variance mẫu. Chia $n-1$ (Bessel) cho ước lượng không chệch → [[Estimator Quality]]. `numpy.var` mặc định `ddof=0`; `pandas.var` mặc định `ddof=1`. Đây là lỗi im lặng rất hay gặp.
5. **Dùng SD cho phân phối đuôi dày.** Nếu variance vô hạn hoặc rất lớn, SD không mô tả được rủi ro.
6. **Correlation = 0 rồi kết luận độc lập.**
7. **Nhầm $\text{Var}(\bar X)=\sigma^2/n$ với $\text{Var}(X)$.** Cái đầu là của trung bình mẫu, giảm theo $n$; cái sau là của một quan sát, không đổi.

## 7. Checklist
- [ ] Các thành phần có uncorrelated không? Nếu không → tính covariance
- [ ] Đang báo cáo variance hay SD? (SD mới cùng đơn vị)
- [ ] `ddof` trong thư viện đang là mấy?
- [ ] Variance có tồn tại không? (đuôi dày?)
- [ ] Nếu là trung bình mẫu: đã chia $n$ chưa?
- [ ] Có nhóm/tầng trong dữ liệu không? → Eve's Law
- [ ] Đã vẽ scatter plot chưa, hay chỉ nhìn $\rho$? (Anscombe)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `numpy.var` / `numpy.std` | Chú ý `ddof` | https://numpy.org/doc/stable/reference/generated/numpy.var.html |
| `numpy.cov` / `numpy.corrcoef` | Ma trận hiệp phương sai | https://numpy.org/doc/stable/reference/generated/numpy.cov.html |

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §4.6, Ch.7, §9.5: http://probabilitybook.net
- Stat 110 Lecture 12 (*Variance*): https://www.youtube.com/watch?v=Tci---bVs60
- Wikipedia — *Variance*: https://en.wikipedia.org/wiki/Variance
- Wikipedia — *Law of total variance*: https://en.wikipedia.org/wiki/Law_of_total_variance
- Wikipedia — *Anscombe's quartet*: https://en.wikipedia.org/wiki/Anscombe%27s_quartet

## Liên kết
[[Expectation]] · [[Linearity of Expectation]] · [[Conditional Expectation]] · [[Concentration Inequalities]] · [[Independence of Random Variables]] · [[Estimator Quality]] · [[Prob&Stats]]
