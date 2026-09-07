---
tags: [ml, toán, optimization, convex]
status: evergreen
---
# Lagrange Duality

> Đối ngẫu là kỹ thuật đổi một bài toán khó lấy một bài toán dễ hơn có cùng nghiệm. Với ML, nó không phải trò chơi lý thuyết: chính đối ngẫu biến [[Support Vector Machine]] thành bài toán chỉ phụ thuộc vào **tích vô hướng giữa các điểm dữ liệu** — và từ đó mở đường cho [[Kernel SVM]].

## 1. Khái niệm cốt lõi

Với bài toán gốc (primal) ở dạng chuẩn của [[Convex Optimization Problems]], **hàm Lagrange**:
$$\mathcal{L}(\mathbf{x},\boldsymbol{\lambda},\boldsymbol{\nu}) = f_0(\mathbf{x}) + \sum_i \lambda_i f_i(\mathbf{x}) + \sum_j \nu_j h_j(\mathbf{x}), \quad \lambda_i \ge 0$$

**Hàm đối ngẫu Lagrange:** $g(\boldsymbol{\lambda},\boldsymbol{\nu}) = \inf_\mathbf{x} \mathcal{L}(\mathbf{x},\boldsymbol{\lambda},\boldsymbol{\nu})$

| Tính chất | Phát biểu | Vì sao quan trọng |
|---|---|---|
| $g$ luôn **lõm** | Kể cả khi bài toán gốc không lồi | Bài toán đối ngẫu **luôn** lồi — miễn phí |
| **Weak duality** | $d^\star \le p^\star$, luôn đúng | Cho chặn dưới cho mọi bài toán |
| **Strong duality** | $d^\star = p^\star$ | Chỉ khi có điều kiện đủ (Slater) |
| Duality gap | $p^\star - d^\star \ge 0$ | Bằng 0 ⟺ strong duality |

**Điều kiện Slater:** bài toán gốc lồi **và** tồn tại điểm khả thi chặt (mọi $f_i(\mathbf{x}) < 0$ với ràng buộc phi affine) ⟹ strong duality.

### Điều kiện KKT

Khi strong duality thoả và các hàm khả vi, $(\mathbf{x}^\star, \boldsymbol{\lambda}^\star, \boldsymbol{\nu}^\star)$ tối ưu ⟺ thoả bốn nhóm điều kiện:

| Điều kiện | Công thức | Nghĩa trực quan |
|---|---|---|
| Primal feasibility | $f_i(\mathbf{x}^\star)\le 0$, $h_j(\mathbf{x}^\star)=0$ | Nghiệm hợp lệ |
| Dual feasibility | $\lambda_i^\star \ge 0$ | Nhân tử không âm |
| **Complementary slackness** | $\lambda_i^\star f_i(\mathbf{x}^\star) = 0$ | **Ràng buộc lỏng ⟹ nhân tử = 0** |
| Stationarity | $\nabla_\mathbf{x}\mathcal{L} = 0$ | Điểm dừng của Lagrange |

> [!note] Complementary slackness là dòng quan trọng nhất của cả note này
> Nó nói: mỗi ràng buộc hoặc **chặt** ($f_i = 0$, có thể có $\lambda_i > 0$), hoặc **lỏng** ($f_i < 0$, bắt buộc $\lambda_i = 0$). Áp vào SVM: chỉ những điểm nằm **đúng trên margin** mới có $\lambda_i > 0$. Mọi điểm khác đóng góp 0 vào nghiệm. Đó chính là định nghĩa của **support vector**, và là lý do SVM chỉ cần nhớ một phần nhỏ dữ liệu.

## 2. Nguyên tắc / Best practices

1. **Kiểm tra Slater trước khi tin nghiệm đối ngẫu.** Không có strong duality thì giải đối ngẫu xong bạn vẫn không có nghiệm gốc.
2. **Dùng $d^\star$ làm chặn dưới ngay cả khi không lồi.** Weak duality luôn đúng — bạn luôn biết mình còn cách tối ưu bao xa.
3. **Đổi sang đối ngẫu khi số ràng buộc ít hơn số biến.** SVM có $d$ biến (chiều dữ liệu) và $N$ ràng buộc; đối ngẫu có $N$ biến. Với $d \gg N$ (dữ liệu nhiều chiều, ít mẫu), đối ngẫu thắng lớn.
4. **Đọc nhân tử $\lambda_i$ như "cái giá bóng" (shadow price).** $\lambda_i$ cho biết $p^\star$ thay đổi bao nhiêu nếu nới lỏng ràng buộc $i$ một đơn vị. Đây là cách diễn giải hữu ích khi trình bày kết quả cho người không làm toán.
5. **Dùng duality gap làm điều kiện dừng.** Với solver interior-point, gap là thước đo hội tụ đáng tin hơn nhiều so với "hàm mục tiêu không đổi nữa".

## 3. Cạm bẫy / Sai lầm hay gặp

- **Cho rằng KKT luôn đủ.** KKT là điều kiện **cần** cho bài toán tổng quát, chỉ **đủ** khi bài toán lồi và Slater thoả. Với bài toán không lồi, thoả KKT chỉ nghĩa là "điểm dừng", không phải "tối ưu".
- **Quên ràng buộc $\lambda_i \ge 0$ khi cài đặt.** Bỏ ràng buộc này thì bài toán đối ngẫu vô nghĩa (không bị chặn), và solver trả về giá trị khổng lồ vô lý.
- **Nhầm dấu khi lập Lagrange.** Ràng buộc phải viết dạng $f_i(\mathbf{x}) \le 0$ trước khi nhân với $\lambda_i$. Viết $f_i \ge 0$ rồi vẫn cộng $\lambda_i f_i$ sẽ cho ra bài toán khác hẳn — và nó vẫn "chạy", chỉ ra kết quả sai.
- **Nghĩ rằng đối ngẫu luôn dễ hơn.** Bài toán đối ngẫu của SVM có ma trận kernel $N\times N$: với $N = 100.000$ thì đó là 80 GB. Đối ngẫu chỉ thắng khi $N$ vừa phải.
- **Giải đối ngẫu xong quên khôi phục nghiệm gốc.** Với SVM, $\mathbf{w} = \sum_i \lambda_i y_i \mathbf{x}_i$ và $b$ tính từ một support vector bất kỳ. Bước này hay bị bỏ quên trong cài đặt tự viết.

## 4. Checklist áp dụng

- [ ] Bài toán gốc của tôi có lồi không? Điều kiện Slater có thoả không?
- [ ] Mọi ràng buộc bất đẳng thức đã viết ở dạng $f_i(\mathbf{x}) \le 0$ chưa?
- [ ] Tôi đã áp ràng buộc $\lambda_i \ge 0$ trong solver chưa?
- [ ] Số biến gốc $d$ so với số ràng buộc $N$: đối ngẫu có thật sự nhỏ hơn không?
- [ ] Duality gap ở nghiệm cuối có gần 0 không? Nếu không, solver chưa hội tụ.
- [ ] Tôi đã dùng complementary slackness để xác định ràng buộc nào đang active chưa?
- [ ] Tôi đã khôi phục nghiệm gốc từ nghiệm đối ngẫu chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| CVXPY | `problem.constraints[i].dual_value` trả nhân tử Lagrange trực tiếp | [cvxpy.org](https://www.cvxpy.org/) |
| CVXOPT | `solvers.qp` trả cả nghiệm gốc `x` lẫn nhân tử `z`, `y` | [cvxopt.org](https://cvxopt.org/) |
| `scipy.optimize.minimize` | Hỗ trợ ràng buộc qua SLSQP; trả nhân tử ở một số method | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/optimize.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 25 "Đối ngẫu" và Phụ lục A "Phương pháp nhân tử Lagrange" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Boyd & Vandenberghe, *Convex Optimization*, Ch. 5 "Duality" — [PDF miễn phí](https://web.stanford.edu/~boyd/cvxbook/)
- Stanford EE364A, lecture "Duality" — [stanford.edu/class/ee364a](https://web.stanford.edu/class/ee364a/lectures.html)
- Cortes & Vapnik, "Support-vector networks", *Machine Learning* 20:273–297, 1995 — [doi:10.1007/BF00994018](https://doi.org/10.1007/BF00994018)

## Liên kết

[[Convex Optimization Problems]] · [[Convex Sets and Functions]] · [[Support Vector Machine]] · [[Kernel SVM]] · [[ML]]
