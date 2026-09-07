---
tags: [ml, toán, optimization, convex]
status: evergreen
---
# Convex Sets and Functions

> Lồi là **ranh giới giữa "giải được" và "chỉ hy vọng"**. Bài toán lồi: mọi điểm cực tiểu địa phương đều là toàn cục, và ta biết khi nào đã xong. Bài toán không lồi: ta chạy gradient descent rồi cầu nguyện.

## 1. Khái niệm cốt lõi

**Tập lồi:** với mọi $\mathbf{x}, \mathbf{y}$ trong tập, cả đoạn thẳng nối chúng cũng nằm trong tập:
$$\theta\mathbf{x} + (1-\theta)\mathbf{y} \in \mathcal{C}, \quad \forall \theta\in[0,1]$$

**Hàm lồi:** dây cung luôn nằm **trên** đồ thị:
$$f(\theta\mathbf{x} + (1-\theta)\mathbf{y}) \le \theta f(\mathbf{x}) + (1-\theta)f(\mathbf{y})$$

| Kiểm tra tính lồi | Điều kiện | Khi nào dùng |
|---|---|---|
| Định nghĩa | Bất đẳng thức dây cung | Hàm lạ, không khả vi |
| Bậc 1 | $f(\mathbf{y}) \ge f(\mathbf{x}) + \nabla f(\mathbf{x})^T(\mathbf{y}-\mathbf{x})$ | Hàm khả vi — "tiếp tuyến luôn nằm dưới" |
| **Bậc 2** | Hessian $\nabla^2 f \succeq 0$ (PSD) | Cách dùng nhiều nhất trong thực tế |
| Toán tử bảo toàn | Xem bảng dưới | Nhanh nhất, không cần tính gì |

### Các tập lồi thường gặp

Siêu phẳng, nửa không gian, hình cầu chuẩn, **polyhedron** ($\mathbf{Ax}\preceq\mathbf{b}$), nón PSD, simplex. Giao của các tập lồi vẫn lồi — **hợp thì không**.

### Toán tử bảo toàn tính lồi

| Phép toán | Bảo toàn? |
|---|---|
| Tổng có trọng số **không âm** $\sum \alpha_i f_i$ | ✅ |
| Hợp với hàm affine $f(\mathbf{Ax}+\mathbf{b})$ | ✅ |
| **Max** theo điểm $\max_i f_i$ | ✅ |
| **Min** theo điểm | ❌ |
| Tích $f \cdot g$ | ❌ (nói chung) |
| Giao của tập lồi | ✅ |
| Hợp của tập lồi | ❌ |

Ba dòng ✅ đầu là công cụ chứng minh tính lồi trong 90% trường hợp thực tế. Ví dụ: hinge loss $\max(0, 1-yz)$ lồi vì là max của hai hàm affine → [[Soft Margin SVM]] là bài toán lồi.

### Hàm mất mát nào lồi?

| Hàm mất mát | Lồi theo tham số? | Note |
|---|---|---|
| MSE của [[Linear Regression]] | ✅ | Có nghiệm đóng |
| Cross-entropy của [[Logistic Regression]] | ✅ | GD chắc chắn về toàn cục |
| Cross-entropy của [[Softmax Regression]] | ✅ | |
| Hinge loss của [[Soft Margin SVM]] | ✅ | Lồi nhưng không khả vi tại margin |
| Hàm mục tiêu của [[K-Means Clustering]] | ❌ | Phụ thuộc khởi tạo → k-means++ |
| Bất kỳ mạng nào có [[Activation Functions]] phi tuyến | ❌ | Thực tế vẫn train được, xem cạm bẫy |
| $\ell_0$ "chuẩn" | ❌ | NP-khó → thay bằng $\ell_1$ |

## 2. Nguyên tắc / Best practices

1. **Chứng minh lồi bằng toán tử bảo toàn trước, tính Hessian sau.** Nhanh hơn nhiều lần và ít sai hơn.
2. **Nhớ: $\ell_1$ lồi nhưng không khả vi tại 0.** Vẫn tối ưu được, nhưng phải dùng subgradient hoặc proximal method, không phải gradient descent thuần.
3. **Lồi chặt (strictly convex) mới đảm bảo nghiệm duy nhất.** Lồi thường chỉ đảm bảo tập nghiệm là một tập lồi — có thể là cả một mặt phẳng. Ridge lồi chặt, LASSO thì không.
4. **Khi bài toán không lồi, hãy nói thẳng.** Đừng báo cáo "mô hình đã hội tụ" — hãy báo cáo "hội tụ về một điểm dừng, chạy lại 5 seed cho kết quả trong khoảng X–Y".
5. **Tìm cách lồi hoá trước khi chấp nhận không lồi.** Đổi biến, nới lỏng lồi (convex relaxation), đổi hàm mất mát. $\ell_0 \to \ell_1$ là ví dụ kinh điển và nó thắng lớn.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Nhầm "hàm mất mát lồi" với "bài toán lồi".** MSE lồi theo $\mathbf{w}$ trong hồi quy tuyến tính, nhưng **không** lồi theo trọng số của một mạng neuron dù vẫn là MSE. Tính lồi luôn phải nói rõ *lồi theo biến nào*.
- **Cho rằng không lồi = không dùng được.** Deep learning toàn bộ là không lồi và nó chạy tốt. Bài học đúng là: không lồi nghĩa là **không có bảo đảm**, nên phải chạy nhiều seed và báo cáo phương sai — chứ không phải là cấm dùng.
- **Quên rằng min của các hàm lồi không lồi.** Sai lầm hay gặp khi tự thiết kế hàm mất mát dạng "lấy cái tốt nhất trong K nhánh".
- **Kiểm tra Hessian PSD bằng định thức.** Định thức dương không đủ để kết luận PSD với ma trận > 2×2. Kiểm tra bằng trị riêng nhỏ nhất `np.linalg.eigvalsh(H).min() >= 0`.
- **Cho rằng lồi ⟹ tối ưu nhanh.** Lồi đảm bảo *đúng đích*, không đảm bảo *nhanh*. Tốc độ do số điều kiện quyết định — hàm lồi có "thung lũng hẹp" vẫn hội tụ rất chậm, xem [[Gradient Descent Variants]].

## 4. Checklist áp dụng

- [ ] Hàm mục tiêu của tôi lồi **theo biến nào**? Tôi đã nói rõ chưa?
- [ ] Tôi chứng minh được tính lồi bằng toán tử bảo toàn không, thay vì phải tính Hessian?
- [ ] Hàm có khả vi mọi nơi không? Nếu không, tôi đang dùng optimizer phù hợp chứ?
- [ ] Nếu bài toán không lồi: tôi đã chạy nhiều khởi tạo và báo cáo khoảng kết quả chưa?
- [ ] Nghiệm có duy nhất không (lồi chặt), hay tôi đang báo cáo một trong nhiều nghiệm?
- [ ] Có cách lồi hoá bài toán này không trước khi tôi chấp nhận không lồi?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| CVXPY | Ngôn ngữ mô hình hoá; **tự từ chối** nếu bài toán không lồi — dùng nó như một máy kiểm chứng | [cvxpy.org](https://www.cvxpy.org/) |
| `scipy.optimize` | Optimizer đa dụng, không kiểm tra lồi giúp bạn | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/optimize.html) |
| CVX Book (miễn phí) | Sách chuẩn ngành, PDF công khai | [web.stanford.edu/~boyd](https://web.stanford.edu/~boyd/cvxbook/) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 23 "Tập lồi và hàm lồi" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Boyd & Vandenberghe, *Convex Optimization*, Ch. 2 (tập lồi) & Ch. 3 (hàm lồi) — [PDF miễn phí](https://web.stanford.edu/~boyd/cvxbook/)
- Stanford EE364A lecture notes & slides — [stanford.edu/class/ee364a](https://web.stanford.edu/class/ee364a/)
- Nocedal & Wright, *Numerical Optimization*, Springer 2006 — nền cho phần thuật toán

## Liên kết

[[Convex Optimization Problems]] · [[Lagrange Duality]] · [[Gradient Descent]] · [[Soft Margin SVM]] · [[ML]]
