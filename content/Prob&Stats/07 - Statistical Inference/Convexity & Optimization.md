---
tags: [statistics, inference, optimization]
status: growing
---
# Convexity & Optimization

> Vì sao Rigollet dành nửa bài giảng MLE để nói về hàm lõm? Vì **lõm nghĩa là mọi cực trị địa phương đều là toàn cục** — không có nó, "tìm cực đại" là một lời hứa suông.

## 1. Định nghĩa

$f$ **lồi (convex)** trên tập lồi $C$ nếu với mọi $x,y\in C$, $t\in[0,1]$:
$$f(tx+(1-t)y) \le t f(x) + (1-t)f(y)$$

Đoạn nối hai điểm nằm **trên** đồ thị. $f$ **lõm (concave)** nếu $-f$ lồi.

**Strictly convex**: bất đẳng thức ngặt khi $x\ne y$, $t\in(0,1)$ → nghiệm cực trị **duy nhất**.

## 2. Cách kiểm tra

| Chiều | Điều kiện lồi |
|---|---|
| 1 chiều | $f''(x)\ge0$ với mọi $x$ |
| 1 chiều, ngặt | $f''(x)>0$ |
| $d$ chiều | Hessian $\nabla^2 f(x) \succeq 0$ (nửa xác định dương) |
| $d$ chiều, ngặt | $\nabla^2 f(x)\succ0$ (xác định dương) |

**Recipe for concavity** (Rigollet, Lecture 5) — các phép giữ nguyên tính lõm:
- Tổng các hàm lõm với hệ số **không âm**
- Hợp với hàm affine: $f(Ax+b)$
- $\min$ của các hàm lõm (đối ngẫu: $\max$ của các hàm lồi là lồi)
- Giới hạn theo điểm

## 3. Vì sao quan trọng với MLE

$$\ell_n(\theta) = \sum_{i=1}^n \ln p_\theta(X_i)$$

Nếu mỗi $\ln p_\theta(x)$ lõm theo $\theta$, thì tổng cũng lõm (quy tắc thứ nhất). Khi đó:

| Có tính lõm | Không có |
|---|---|
| $\nabla\ell_n = 0$ ⟹ cực đại **toàn cục** | Chỉ là điểm dừng — có thể là cực tiểu, yên ngựa, hay cực đại địa phương |
| Nghiệm duy nhất (nếu ngặt) | Có thể nhiều nghiệm |
| Mọi thuật toán gradient đều hội tụ đúng | Phụ thuộc điểm khởi tạo |
| Có bảo đảm tốc độ hội tụ | Không |

**Exponential family** (Bernoulli, Poisson, Normal, Exponential, Gamma, Binomial…) có log-likelihood lõm theo tham số tự nhiên. Đây là lý do MLE cho các phân phối này "luôn chạy được" → [[Maximum Likelihood Estimation]].

**Không lõm**: mixture models (→ dùng **EM algorithm**, chỉ đảm bảo cực trị địa phương), mạng nơ-ron.

## 4. Thuật toán

| Thuật toán | Cần gì | Tốc độ | Khi nào dùng |
|---|---|---|---|
| Dạng đóng | Giải được $\nabla\ell=0$ | Tức thì | Bernoulli, Normal, Poisson |
| **Gradient ascent** | $\nabla\ell$ | Tuyến tính | $d$ lớn |
| **Newton–Raphson** | $\nabla\ell$, Hessian | Bậc hai | $d$ vừa, Hessian rẻ |
| **Fisher scoring** | Thay Hessian bằng $-I(\theta)$ | Bậc hai | GLM → [[Fisher Information]] |
| **IRLS** | — | Bậc hai | Logistic/Poisson regression |
| **EM** | Biến ẩn | Tuyến tính | Mixture, dữ liệu thiếu |

Newton dùng đúng thông tin mà Hessian mang: **độ cong**. Và độ cong của log-likelihood chính là Fisher information — nên Newton và Fisher scoring gần như trùng nhau ở lân cận nghiệm.

## 5. Cạm bẫy

1. **Giả định lõm mà không kiểm tra.** Ví dụ: log-likelihood của mixture Gaussian không lõm và còn **không bị chặn trên**.
2. **Nhầm chiều lồi/lõm.** Tối đa hoá $\ell$ = tối thiểu hoá $-\ell$; thư viện tối ưu thường **minimize**.
3. **Điểm dừng ≠ cực đại.** Phải kiểm tra Hessian âm xác định.
4. **Bỏ qua ràng buộc.** $p\in[0,1]$, $\sigma>0$ — cực trị có thể nằm ở biên, nơi gradient không bằng 0 (cần KKT).
5. **Tối ưu trên tham số bị ràng buộc mà không reparametrize.** Mẹo thông dụng: tối ưu theo $\ln\sigma$ thay vì $\sigma$, theo logit($p$) thay vì $p$.
6. **Vấn đề số học**: tính tích thay vì tổng log → underflow. Dùng `logsumexp`.
7. **Newton phân kỳ** khi xa nghiệm hoặc Hessian gần suy biến → cần line search / damping.

## 6. Checklist
- [ ] $\ell_n$ có lõm không? Đã kiểm tra Hessian chưa?
- [ ] Bài toán có ràng buộc không? Nghiệm có thể ở biên không?
- [ ] Đã reparametrize để bỏ ràng buộc chưa?
- [ ] Thư viện đang minimize hay maximize? (đã đổi dấu chưa)
- [ ] Nếu không lõm: đã thử nhiều điểm khởi tạo chưa?
- [ ] Có dùng log-scale để tránh underflow không?
- [ ] Hessian tại nghiệm có âm xác định không?
- [ ] Gradient tại nghiệm có gần 0 thật không? (kiểm tra hội tụ)

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| `scipy.optimize` | BFGS, Newton-CG, ràng buộc | https://docs.scipy.org/doc/scipy/reference/optimize.html |
| `scipy.special.logsumexp` | Cộng log ổn định số học | https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.logsumexp.html |
| CVXPY | Tối ưu lồi có ràng buộc, khai báo | https://www.cvxpy.org |
| Boyd & Vandenberghe — *Convex Optimization* | Sách chuẩn, miễn phí | https://web.stanford.edu/~boyd/cvxbook/ |

## Tham khảo
- MIT 18.650 Lecture 5 (*What Is a Concave Function*, *Recipe for Concavity*, *Hessian*): https://www.youtube.com/watch?v=0Va2dOLqUfM
- Boyd & Vandenberghe — *Convex Optimization*: https://web.stanford.edu/~boyd/cvxbook/
- Wikipedia — *Convex function*: https://en.wikipedia.org/wiki/Convex_function
- Wikipedia — *Expectation–maximization algorithm*: https://en.wikipedia.org/wiki/Expectation%E2%80%93maximization_algorithm

## Liên kết
[[Maximum Likelihood Estimation]] · [[Fisher Information]] · [[LOTUS]] · [[Statistical Model]] · [[Prob&Stats]]
