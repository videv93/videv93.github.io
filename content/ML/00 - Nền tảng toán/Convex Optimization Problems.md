---
tags: [ml, toán, optimization, convex]
status: evergreen
---
# Convex Optimization Problems

> Nhận ra bài toán của mình thuộc lớp LP, QP hay GP có giá trị thực tế lớn hơn nhiều so với việc tự viết optimizer: mỗi lớp đều có solver đã được tối ưu hàng chục năm, và bạn chỉ cần viết bài toán đúng dạng chuẩn.

## 1. Khái niệm cốt lõi

**Dạng chuẩn** của bài toán tối ưu:
$$\min_{\mathbf{x}} f_0(\mathbf{x}) \quad \text{s.t.} \quad f_i(\mathbf{x}) \le 0,\ i=1..m; \quad h_j(\mathbf{x}) = 0,\ j=1..p$$

Bài toán là **lồi** khi và chỉ khi: $f_0$ lồi, mọi $f_i$ lồi, và mọi $h_j$ **affine** (không chỉ lồi — đây là chỗ hay bị bỏ sót).

| Thuật ngữ | Nghĩa |
|---|---|
| Feasible set | Tập điểm thoả mọi ràng buộc |
| Optimal value $p^\star$ | Giá trị nhỏ nhất đạt được |
| Optimal point | Điểm đạt $p^\star$ |
| Locally optimal | Tối ưu trong một lân cận |
| **Với bài toán lồi** | Locally optimal ⟹ globally optimal |

### Các lớp bài toán, từ dễ tới khó

| Lớp | Hàm mục tiêu | Ràng buộc | Xuất hiện ở |
|---|---|---|---|
| **LP** (Linear Programming) | Tuyến tính | Affine | Phân bổ tài nguyên, transport problem |
| **QP** (Quadratic Programming) | Toàn phương lồi | Affine | **[[Support Vector Machine]]**, ridge có ràng buộc, portfolio |
| **QCQP** | Toàn phương | Toàn phương | Ít gặp trong ML cơ bản |
| **SOCP** | Tuyến tính | Nón bậc hai | Robust optimization |
| **SDP** | Tuyến tính | Ràng buộc PSD | Học metric, relaxation của bài toán tổ hợp |
| **GP** (Geometric Programming) | Posynomial | Posynomial | Thiết kế mạch, không lồi cho tới khi đổi biến $\log$ |

Mỗi lớp là tập con của lớp dưới: LP ⊂ QP ⊂ SOCP ⊂ SDP.

> [!note] Vì sao GP đáng nhắc tới
> GP **không lồi** ở dạng gốc, nhưng đổi biến $y_i = \log x_i$ thì nó thành lồi. Đây là ví dụ mẫu mực của nguyên tắc "tìm cách lồi hoá trước khi bỏ cuộc" ở [[Convex Sets and Functions]].

### QP — lớp quan trọng nhất cho vault này

$$\min_\mathbf{x} \tfrac{1}{2}\mathbf{x}^T\mathbf{P}\mathbf{x} + \mathbf{q}^T\mathbf{x} + r \quad \text{s.t.}\quad \mathbf{Gx}\preceq\mathbf{h},\ \mathbf{Ax}=\mathbf{b}$$

Lồi ⟺ $\mathbf{P} \succeq 0$. Cả bài toán gốc lẫn bài toán đối ngẫu của [[Support Vector Machine]] đều là QP — đó là lý do SVM giải được chính xác trong khi mạng neuron thì không.

## 2. Nguyên tắc / Best practices

1. **Nhận diện lớp bài toán trước khi viết dòng code nào.** Nếu là QP, dùng solver QP (`cvxopt`, OSQP) thay vì gradient descent tự viết — nhanh hơn và cho nghiệm chính xác.
2. **Viết bài toán ở dạng chuẩn trên giấy.** Đặt rõ đâu là biến, đâu là dữ liệu, ràng buộc nào bất đẳng thức, ràng buộc nào đẳng thức. Sai lầm phổ biến nhất là nhầm biến với hằng số.
3. **Ràng buộc đẳng thức phải affine.** $h(\mathbf{x}) = \lVert\mathbf{x}\rVert = 1$ **không** phải bài toán lồi dù $\lVert\cdot\rVert$ lồi. Nới thành $\lVert\mathbf{x}\rVert \le 1$ thì lồi.
4. **Dùng CVXPY để prototype, solver chuyên dụng để chạy thật.** CVXPY viết gần với ký hiệu toán và tự từ chối bài toán không lồi — nó là công cụ kiểm chứng tốt nhất bạn có.
5. **Kiểm tra tính khả thi (feasibility) trước.** Bài toán vô nghiệm thường là do một ràng buộc viết sai dấu, không phải do dữ liệu.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Ràng buộc đẳng thức phi tuyến.** Lỗi số một. $\mathbf{x}^T\mathbf{x} = 1$ phá vỡ tính lồi ngay lập tức.
- **Quên rằng $\mathbf{P}$ phải PSD trong QP.** Nếu $\mathbf{P}$ có trị riêng âm, bài toán không lồi và solver QP sẽ trả về rác hoặc báo lỗi khó hiểu. Kiểm tra `eigvalsh(P).min()`.
- **Dùng solver quy mô lớn cho bài toán quy mô nhỏ, và ngược lại.** Interior-point method chính xác nhưng $O(n^3)$ — với $N$ hàng chục nghìn điểm, bài toán đối ngẫu SVM có ma trận kernel $N\times N$ không vừa RAM. Đây chính xác là lý do [[Soft Margin SVM]] có cách phát biểu không ràng buộc để chạy bằng SGD.
- **Bỏ qua điều kiện Slater.** Strong duality cần nó; không có nó thì nghiệm đối ngẫu không cho lại nghiệm gốc. Xem [[Lagrange Duality]].
- **Scale biến quá lệch nhau.** Một biến cỡ $10^6$ và một biến cỡ $10^{-3}$ trong cùng bài toán → solver hội tụ kém hoặc báo "numerical issues". Chuẩn hoá trước.

## 4. Checklist áp dụng

- [ ] Bài toán của tôi thuộc lớp nào: LP, QP, SOCP, SDP, hay không lồi?
- [ ] Mọi ràng buộc **đẳng thức** của tôi có affine không?
- [ ] Mọi ràng buộc **bất đẳng thức** có ở dạng $f_i(\mathbf{x}) \le 0$ với $f_i$ lồi không?
- [ ] Nếu là QP: $\mathbf{P}$ có PSD không (kiểm tra bằng trị riêng)?
- [ ] Tập khả thi có khác rỗng không? Tôi đã tìm một điểm khả thi cụ thể chưa?
- [ ] Các biến có cùng độ lớn (order of magnitude) không?
- [ ] Kích thước bài toán có phù hợp với solver tôi chọn không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| CVXPY | Mô hình hoá bằng Python, tự chọn solver, từ chối bài toán không lồi | [cvxpy.org](https://www.cvxpy.org/) |
| CVXOPT | Solver QP/SOCP/SDP; API `solvers.qp` khớp trực tiếp với dẫn giải SVM trong sách | [cvxopt.org](https://cvxopt.org/) |
| OSQP | Solver QP dựa trên ADMM, rất nhanh cho bài toán thưa và quy mô lớn | [osqp.org](https://osqp.org/) |
| `scipy.optimize.linprog` | LP đơn giản, có sẵn trong SciPy | [docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linprog.html) |

## Tham khảo

- Vũ Hữu Tiệp, *Machine Learning cơ bản*, Chương 24 "Bài toán tối ưu lồi" — [github.com/tiepvupsu/ebookMLCB](https://github.com/tiepvupsu/ebookMLCB)
- Boyd & Vandenberghe, *Convex Optimization*, Ch. 4 "Convex optimization problems" — [PDF miễn phí](https://web.stanford.edu/~boyd/cvxbook/)
- CVXPY, *Disciplined Convex Programming* rules — [cvxpy.org/tutorial/dcp](https://www.cvxpy.org/tutorial/dcp/index.html)
- Nocedal & Wright, *Numerical Optimization*, Ch. 16 "Quadratic Programming", Springer 2006

## Liên kết

[[Convex Sets and Functions]] · [[Lagrange Duality]] · [[Support Vector Machine]] · [[Soft Margin SVM]] · [[ML]]
