---
tags: [statistics, inference]
status: evergreen
---
# Statistical Model

> Xác suất đi từ mô hình → dữ liệu. Thống kê đi ngược lại: từ dữ liệu → mô hình. Bước đầu tiên của chiều ngược là **viết ra mô hình một cách hình thức**.

## 1. Định nghĩa (Rigollet, 18.650)

Cho $X_1,\dots,X_n$ iid, quan sát được. Một **statistical model** là bộ đôi
$$\big(E,\ (\mathbb{P}_\theta)_{\theta\in\Theta}\big)$$

| Thành phần | Là gì | Ví dụ |
|---|---|---|
| $E$ | **Sample space** — tập giá trị dữ liệu có thể nhận | $\{0,1\}$, $\mathbb{N}$, $\mathbb{R}$, $[0,\infty)$ |
| $(\mathbb{P}_\theta)$ | Họ phân phối được xét | $\{\text{Bern}(p)\}$, $\{N(\mu,\sigma^2)\}$ |
| $\Theta$ | **Parameter space** | $[0,1]$, $\mathbb{R}\times(0,\infty)$ |

Giả định nền: tồn tại $\theta^*\in\Theta$ sao cho $X_i \sim \mathbb{P}_{\theta^*}$. $\theta^*$ là **true parameter**, và mục tiêu của thống kê là nói điều gì đó về nó.

## 2. Ví dụ chuẩn

| Tình huống | Model |
|---|---|
| Tung đồng xu $n$ lần | $\big(\{0,1\}, (\text{Bern}(p))_{p\in[0,1]}\big)$ |
| Thời gian chờ xe buýt | $\big([0,\infty), (\text{Expo}(\lambda))_{\lambda>0}\big)$ |
| Số cuộc gọi mỗi giờ | $\big(\mathbb{N}, (\text{Pois}(\lambda))_{\lambda>0}\big)$ |
| Dữ liệu cảm biến có nhiễu | $\big(\mathbb{R}, (N(\mu,\sigma^2))_{\mu\in\mathbb{R},\sigma^2>0}\big)$ |
| Tuổi thọ tối đa quan sát được | $\big([0,\theta], (\text{Unif}(0,\theta))_{\theta>0}\big)$ |

Ví dụ cuối đáng chú ý: support **phụ thuộc tham số**, khiến nhiều kết quả tiệm cận chuẩn (kể cả [[Fisher Information]]) không áp dụng được.

## 3. Identifiability

Model **identifiable** nếu ánh xạ $\theta \mapsto \mathbb{P}_\theta$ là **đơn ánh**:
$$\theta_1 \ne \theta_2 \Rightarrow \mathbb{P}_{\theta_1}\ne\mathbb{P}_{\theta_2}$$

Không identifiable → dù có vô hạn dữ liệu cũng không xác định được $\theta^*$. Không có thuật toán nào cứu được; phải sửa mô hình.

Ví dụ mất identifiability:
- $N(\mu_1+\mu_2, 1)$ với hai tham số — chỉ tổng là xác định được.
- Mixture model không có ràng buộc thứ tự — hoán vị các thành phần cho cùng phân phối (label switching).
- Hồi quy với hai biến giải thích cộng tuyến hoàn hảo.

## 4. Ba câu hỏi thống kê đặt ra trên một model

| Câu hỏi | Tên | Note |
|---|---|---|
| $\theta^*$ bằng bao nhiêu? | **Estimation** | [[Maximum Likelihood Estimation]], [[Estimator Quality]] |
| $\theta^*$ nằm trong khoảng nào? | **Confidence interval** | [[Confidence Intervals]] |
| $\theta^*$ có bằng $\theta_0$ không? | **Hypothesis testing** | [[Confidence Intervals]] |

## 5. "All models are wrong"

Rigollet nhấn mạnh ngay từ bài giảng 3: **giả định mô hình là giả định thật sự**, không phải thủ tục hình thức. Câu nói của George Box: *"All models are wrong, but some are useful."*

Ba loại giả định cần tuyên bố rõ:
1. **iid** — quan sát độc lập cùng phân phối → [[Independence of Random Variables]]
2. **Họ phân phối** — dữ liệu thật sự Gaussian/Poisson/… đến đâu
3. **$\theta^*$ tồn tại trong $\Theta$** — model đủ giàu để chứa sự thật

Nếu (3) sai (**misspecification**), MLE vẫn hội tụ — nhưng về $\theta$ **gần nhất theo KL divergence**, không phải về sự thật.

## 6. Cạm bẫy

1. **Chọn model vì toán đẹp**, không vì dữ liệu. Gaussian tiện, nhưng dữ liệu đếm thì không Gaussian.
2. **Bỏ qua identifiability** rồi ngạc nhiên vì tối ưu hoá không hội tụ hoặc ra nhiều nghiệm.
3. **Giả định iid cho dữ liệu chuỗi thời gian / dữ liệu nhóm.**
4. **Không kiểm tra model sau khi khớp** (residual plot, posterior predictive check).
5. **Nhầm parameter với statistic.** $\theta$ là số chưa biết cố định; $\hat\theta$ là hàm của dữ liệu, là random variable.
6. **$\Theta$ quá giàu** → overfitting; quá nghèo → bias không khử được.

## 7. Checklist khi dựng một model
- [ ] $E$ là gì? Dữ liệu nhận giá trị trong tập nào?
- [ ] Họ phân phối nào? Vì sao? (story, không phải tiện lợi)
- [ ] $\Theta$ là gì? Có ràng buộc nào không?
- [ ] Model có identifiable không?
- [ ] Giả định iid có hợp lý không?
- [ ] Support có phụ thuộc $\theta$ không? (nếu có, cẩn thận với lý thuyết tiệm cận)
- [ ] Nếu model sai một chút, kết luận có đổi nhiều không?

## Tham khảo
- MIT 18.650 Lecture 3 — *Parametric Inference* (Rigollet): https://www.youtube.com/watch?v=TSkDZbGS94k
- MIT OCW 18.650 — trang khoá học: https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/
- Wasserman — *All of Statistics*, Ch.6: https://link.springer.com/book/10.1007/978-0-387-21736-9
- Wikipedia — *Statistical model*: https://en.wikipedia.org/wiki/Statistical_model
- Wikipedia — *Identifiability*: https://en.wikipedia.org/wiki/Identifiability

## Liên kết
[[Parametric vs Nonparametric]] · [[Estimator Quality]] · [[Maximum Likelihood Estimation]] · [[Confidence Intervals]] · [[Prob&Stats]]
