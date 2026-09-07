---
tags: [math, linear-algebra, reference]
status: evergreen
---
# Special Matrices

> Bốn loại ma trận trong bài giảng MIT, cộng vài loại phải biết. Nhận ra một ma trận thuộc loại nào thường rút ngắn phép tính từ $O(n^3)$ xuống $O(n)$.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 28:00–29:47 — bài giảng nêu bốn loại: đối xứng, đơn vị $I$, ma trận toàn 1 $J$, và ma trận đường chéo.

## 1. Bốn loại trong bài giảng

| Loại | Định nghĩa | Ghi chú của bài giảng |
|---|---|---|
| **Đối xứng** | $A^\top = A$, tức $a_{ij}=a_{ji}$ | phần tử ngoài đường chéo ghép cặp |
| **Đơn vị** $I$ | $1$ trên đường chéo, $0$ còn lại | $I = [\mathbf{e}_1\mid\cdots\mid\mathbf{e}_n]$ |
| **Toàn 1** $J$ | mọi phần tử bằng $1$ | $J = \mathbf{1}\mathbf{1}^\top$ — **hạng 1** |
| **Đường chéo** $D$ | $0$ ngoài đường chéo | $\text{diag}(d_1,\ldots,d_n)$ |

Cách viết $I$ theo cột và $J = \mathbf 1\mathbf 1^\top$ đều là ứng dụng của [[Matrix as Columns]] — và cả hai làm phép tính gọn hẳn:
$$A\mathbf{e}_j = \mathbf{a}_j \qquad JA = \mathbf{1}(\mathbf{1}^\top A) = \mathbf 1 \cdot(\text{vector tổng cột của } A)$$

## 2. Vì sao mỗi loại quan trọng

**Đối xứng** — loại quan trọng nhất trong ứng dụng:

| | |
|---|---|
| Eigenvalue luôn **thực** | → [[Eigenvalues and Eigenvectors]] |
| Eigenvector **trực giao** với nhau | → chéo hoá bằng ma trận trực giao |
| Luôn chéo hoá được | $A = Q\Lambda Q^\top$ |

Ma trận hiệp phương sai, ma trận tương quan, ma trận Hessian đều đối xứng — lý do PCA hoạt động ([[ML]]) và lý do tối ưu danh mục có nghiệm đẹp ([[Quant]]).

**Đường chéo** — mọi phép toán trở nên tầm thường:
$$D^k = \text{diag}(d_1^k,\ldots,d_n^k), \qquad D^{-1}=\text{diag}(1/d_i), \qquad \det D = \prod d_i$$
Đây là **toàn bộ động lực** của chéo hoá: biến bài toán khó thành bài toán đường chéo. → [[Diagonalization]]

**Toàn 1 $J$** — hạng 1, dùng để trừ trung bình: $\left(I - \frac1n J\right)\mathbf{x}$ cho vector đã trừ trung bình (centering matrix), bước đầu tiên của mọi phép tính hiệp phương sai.

## 3. Các loại khác cần biết

| Loại | Định nghĩa | Tính chất then chốt |
|---|---|---|
| **Trực giao** $Q$ | $Q^\top Q = I$ | $Q^{-1}=Q^\top$; bảo toàn độ dài và góc |
| **Tam giác** | $0$ dưới (hoặc trên) đường chéo | $\det = \prod$ đường chéo; giải bằng thế ngược |
| **Xác định dương** | $\mathbf{x}^\top A\mathbf{x}>0\ \forall \mathbf x\ne\mathbf 0$ | mọi eigenvalue $>0$; có phân rã Cholesky |
| **Stochastic** | cột (hoặc hàng) tổng bằng $1$, phần tử $\ge0$ | → [[Stochastic Matrices]] |
| **Dương** | mọi phần tử $>0$ | → [[Perron-Frobenius Theorem]] |
| **Thưa** (sparse) | phần lớn phần tử $=0$ | thuật toán chuyên biệt |
| **Nilpotent** | $A^k=0$ với $k$ nào đó | mọi eigenvalue $=0$ |

> [!warning] "Ma trận dương" ≠ "xác định dương"
> **Positive matrix** = mọi *phần tử* dương. **Positive definite** = mọi *eigenvalue* dương. Hoàn toàn khác nhau: $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ là positive nhưng có eigenvalue $-1$. Bài giảng MIT dùng nghĩa thứ nhất khi nói về ma trận giá.

## 4. Bảng "biết loại thì tính nhanh"

| Nếu $A$ là | Thì |
|---|---|
| đường chéo | $\det$, $A^{-1}$, $A^k$ đều $O(n)$ |
| tam giác | giải hệ bằng thế ngược, $O(n^2)$ thay vì $O(n^3)$ |
| trực giao | $A^{-1}=A^\top$ — miễn phí |
| đối xứng | chỉ cần lưu nửa; eigen luôn thực |
| xác định dương | Cholesky nhanh gấp đôi LU |
| thưa | dùng cấu trúc lưu thưa, tránh $O(n^2)$ bộ nhớ |

Nhận diện cấu trúc **trước** khi gọi solver là cách tăng tốc rẻ nhất trong tính toán số. → [[Matrix Decompositions]]

## 5. Cạm bẫy

1. **Nhầm positive với positive definite.**
2. **Nghĩ đối xứng ⟹ khả nghịch.** Ma trận $0$ đối xứng.
3. **Nghĩ $J$ khả nghịch.** Hạng $1$, $\det = 0$ với $n\ge2$.
4. **$AI = IA = A$ nhưng $AJ \ne JA$.** Chỉ $I$ giao hoán với mọi ma trận.
5. **Coi $Q^\top Q=I$ ⟹ $QQ^\top=I$ khi $Q$ không vuông.** Chỉ đúng cho ma trận vuông trực giao.
6. **Giả định ma trận tam giác của bạn vẫn tam giác sau khi nhân.** Tam giác trên × tam giác trên = tam giác trên ✅, nhưng trên × dưới thì không.
7. **Bỏ qua cấu trúc và gọi solver tổng quát.** Chậm hơn hàng chục lần trên ma trận lớn.

## 6. Checklist áp dụng
- [ ] $A^\top = A$ không? (đối xứng → eigen thực, chéo hoá được)
- [ ] Có phải đường chéo / tam giác không? (→ tính nhanh)
- [ ] Nếu nói "dương": đang nói phần tử hay eigenvalue?
- [ ] Cột (hay hàng) có tổng bằng 1 không? (→ stochastic)
- [ ] $Q^\top Q = I$ không? (→ nghịch đảo miễn phí)
- [ ] Có bao nhiêu phần tử khác 0? (→ có nên dùng cấu trúc thưa không?)
- [ ] Đã chọn thuật toán khớp với cấu trúc chưa?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 28:00–29:47: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 4, 6: https://math.mit.edu/~gs/linearalgebra/
- Golub & Van Loan — *Matrix Computations*, ch. 1–4: https://www.cs.cornell.edu/cv/GVL4/golubandvanloan.htm
- Wikipedia — *List of matrices*: https://en.wikipedia.org/wiki/List_of_matrices

## Liên kết
[[Matrix Algebra]] · [[Matrix as Columns]] · [[Stochastic Matrices]] · [[Perron-Frobenius Theorem]] · [[Matrix Decompositions]] · [[Math]]
