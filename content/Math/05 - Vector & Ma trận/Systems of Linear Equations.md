---
tags: [math, linear-algebra]
status: evergreen
---
# Systems of Linear Equations

> $A\mathbf{x}=\mathbf{b}$. Ba câu hỏi: có nghiệm không, có bao nhiêu, tìm thế nào. Cả ba trả lời được bằng **rank**, và bài giảng MIT phân loại theo số phương trình so với số ẩn.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 1:13:46–1:15:39.

## 1. Bài toán

$$A_{m\times n}\mathbf{x} = \mathbf{b}: \qquad m \text{ phương trình}, \ n \text{ ẩn}$$

Bài giảng phân loại theo $m$ vs $n$:

| | Tên | Thường thì |
|---|---|---|
| $m < n$ | **underdetermined** | vô số nghiệm (thiếu ràng buộc) |
| $m = n$ | vuông | nghiệm duy nhất **nếu** $A$ khả nghịch |
| $m > n$ | **overdetermined** | vô nghiệm (thừa ràng buộc) → dùng least squares |

Chữ "thường thì" quan trọng: số phương trình **không** quyết định — **rank** mới quyết định.

## 2. Trường hợp vuông khả nghịch

Bài giảng nêu chính xác điều kiện: $A$ **vuông và full rank** ⟹ $\det A\ne0$ ⟹ $A^{-1}$ tồn tại ⟹
$$\mathbf{x}=A^{-1}\mathbf{b}$$

**Nghịch đảo $2\times2$** (đáng thuộc):
$$A=\begin{bmatrix}a&b\\c&d\end{bmatrix} \Rightarrow A^{-1}=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$$

**Định thức nói gì:** $|\det A|$ = hệ số giãn nở thể tích của phép biến đổi. $\det = 0$ ⟹ không gian bị **bẹp xuống** chiều thấp hơn ⟹ không đảo ngược được.

| Tính chất định thức | |
|---|---|
| $\det(AB)=\det A\det B$ | $\det(A^\top)=\det A$ |
| $\det(A^{-1})=1/\det A$ | $\det(cA)=c^n\det A$ |
| Tam giác: $\det = \prod$ đường chéo | Đổi hai hàng: đổi dấu |

> [!warning] Đừng tính $A^{-1}$ để giải hệ
> $\mathbf{x}=A^{-1}\mathbf{b}$ đúng về toán, **sai về tính toán**: chậm hơn ~3 lần và kém ổn định số học hơn khử Gauss / phân rã LU. Trong code, dùng `np.linalg.solve(A, b)`, không dùng `inv(A) @ b`. Quy tắc Cramer còn tệ hơn — $O(n!)$ nếu triển khai ngây thơ.

## 3. Phân loại đầy đủ bằng rank

Đặt $r=\text{rank}(A)$, và $[A|\mathbf b]$ là ma trận mở rộng:

| Điều kiện | Số nghiệm |
|---|---|
| $\text{rank}(A) < \text{rank}([A\vert\mathbf b])$ | **vô nghiệm** (không tương thích) |
| $\text{rank}(A)=\text{rank}([A\vert\mathbf b])=n$ | **duy nhất** |
| $\text{rank}(A)=\text{rank}([A\vert\mathbf b])=r<n$ | **vô số** — không gian nghiệm chiều $n-r$ |

Ngôn ngữ cột ([[Matrix as Columns]]): hệ có nghiệm ⟺ $\mathbf{b}$ nằm trong không gian cột $C(A)$. Nghiệm duy nhất ⟺ cột độc lập tuyến tính ([[Linear Independence]]).

**Cấu trúc nghiệm tổng quát:**
$$\mathbf{x} = \mathbf{x}_p + \mathbf{x}_h, \qquad \mathbf{x}_h \in N(A)$$
một nghiệm riêng cộng toàn bộ hạt nhân. → [[Vector Spaces and Basis]]

## 4. Phương pháp giải

| Phương pháp | Khi nào | Chi phí |
|---|---|---|
| Khử Gauss / LU | mặc định, ma trận đặc | $O(n^3)$ |
| Cholesky | $A$ đối xứng xác định dương | $O(n^3/3)$ — nhanh gấp đôi |
| QR | overdetermined, least squares | $O(mn^2)$ |
| Iterative (CG, GMRES) | ma trận rất lớn, thưa | phụ thuộc |
| $A^{-1}$ tường minh | **hầu như không bao giờ** | chậm, kém ổn định |

→ [[Matrix Decompositions]]

**Overdetermined ⟹ least squares:** khi vô nghiệm, tìm $\mathbf x$ cực tiểu $\|A\mathbf x-\mathbf b\|^2$:
$$A^\top A\hat{\mathbf x}=A^\top\mathbf b$$
Đây là **hình chiếu** $\mathbf b$ lên $C(A)$ — điều mà bài giảng báo trước ở phần trực giao ([[Dot Product and Norms]]). Toàn bộ hồi quy tuyến tính là dòng này.

## 5. Điều kiện số (conditioning)

$$\kappa(A) = \|A\|\cdot\|A^{-1}\|$$

$\kappa$ lớn ⟹ **ill-conditioned**: sai số nhỏ trong $\mathbf b$ khuếch đại thành sai số lớn trong $\mathbf x$. $\det A$ nhỏ **không** phải chỉ báo tốt ($\det(0.001 I_{100}) $ cực nhỏ nhưng ma trận hoàn hảo). Kiểm $\kappa$, đừng kiểm $\det$.

Trong hồi quy, $\kappa$ lớn = đa cộng tuyến → hệ số không ổn định. → [[ML]], [[Quant]]

## 6. Cạm bẫy

1. **Đếm phương trình thay vì đếm rank.** $m=n$ không bảo đảm nghiệm duy nhất.
2. **Tính $A^{-1}$ để giải hệ.**
3. **Dùng $\det\approx0$ làm tiêu chí suy biến.** Dùng $\kappa$ hoặc SVD.
4. **Quên kiểm tương thích** trước khi kết luận vô số nghiệm.
5. **Báo cáo một nghiệm khi có vô số.** Phải mô tả cả không gian nghiệm.
6. **Áp least squares mà không kiểm cột độc lập.** $A^\top A$ suy biến ⟹ cần ridge / pseudo-inverse.
7. **Quên rằng $A$ không vuông thì $A^{-1}$ không tồn tại** — chỉ có giả nghịch đảo $A^+$.

## 7. Checklist áp dụng
- [ ] $m$ và $n$ bằng bao nhiêu? Nhưng quan trọng hơn: rank bằng bao nhiêu?
- [ ] $\text{rank}(A)$ có bằng $\text{rank}([A|\mathbf b])$ không? (nếu không → vô nghiệm)
- [ ] Nếu có nghiệm: rank $= n$ (duy nhất) hay $<n$ (vô số, chiều $n-r$)?
- [ ] Nếu vô số: đã mô tả $\mathbf x_p + N(A)$ chưa?
- [ ] $A$ có cấu trúc đặc biệt không? (đối xứng, thưa, tam giác → chọn solver khớp)
- [ ] Số điều kiện $\kappa(A)$ là bao nhiêu? Kết quả có đáng tin không?
- [ ] Trong code: đang dùng `solve` chứ không phải `inv` chứ?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 1:13:46–1:15:39: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 2–3: https://math.mit.edu/~gs/linearalgebra/
- Trefethen & Bau — *Numerical Linear Algebra*: https://people.maths.ox.ac.uk/trefethen/text.html
- 3Blue1Brown — *Inverse matrices, column space and null space*: https://www.3blue1brown.com/lessons/inverse-matrices

## Liên kết
[[Linear Independence]] · [[Matrix as Columns]] · [[Vector Spaces and Basis]] · [[Matrix Decompositions]] · [[Newton's Method]] · [[Math]]
