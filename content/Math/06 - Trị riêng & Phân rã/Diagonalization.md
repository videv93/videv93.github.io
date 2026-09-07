---
tags: [math, linear-algebra, eigen]
status: evergreen
---
# Diagonalization

> $A = S\Lambda S^{-1}$. Viết ma trận trong **hệ toạ độ riêng của nó**, nơi nó chỉ là phép giãn theo từng trục. Đây là công thức bài giảng MIT gọi là "very useful in defining state equations and Kalman filters".

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 1:18:06–1:20:07.

## 1. Xây dựng

Giả sử $A_{n\times n}$ có $n$ eigenvector **độc lập tuyến tính**. Đặt
$$S = \big[\mathbf{v}_1\mid\cdots\mid\mathbf{v}_n\big], \qquad \Lambda=\text{diag}(\lambda_1,\ldots,\lambda_n)$$

Bài giảng dẫn thẳng từ [[Matrix as Columns]]: cột thứ $j$ của $AS$ là $A\mathbf{v}_j = \lambda_j\mathbf{v}_j$, tức cột thứ $j$ của $S\Lambda$. Vậy
$$AS = S\Lambda$$

Vì eigenvector độc lập nên $S$ khả nghịch, và:
$$\boxed{A = S\Lambda S^{-1}} \qquad\qquad \Lambda = S^{-1}AS$$

Công thức thứ hai là **phép chéo hoá**: nhân trái $S^{-1}$, nhân phải $S$.

## 2. Ý nghĩa: đổi hệ toạ độ

$A = S\Lambda S^{-1}$ đọc từ **phải sang trái**:

1. $S^{-1}$ — đổi sang toạ độ theo cơ sở eigenvector
2. $\Lambda$ — giãn từng trục theo $\lambda_i$ (dễ)
3. $S$ — đổi ngược về toạ độ gốc

Trong hệ toạ độ riêng của nó, **mọi** ma trận chéo hoá được đều chỉ là phép giãn. Đó là toàn bộ nội dung.

## 3. Điều kiện chéo hoá được

| Điều kiện | Đủ hay tương đương |
|---|---|
| Có $n$ eigenvector độc lập | ⟺ (định nghĩa) |
| Bội hình học = bội đại số với mọi $\lambda$ | ⟺ |
| $n$ eigenvalue **phân biệt** | ⟸ (đủ, không cần) |
| $A$ **đối xứng** | ⟸ (đủ) — và cho $S$ trực giao |

Với $A$ đối xứng: $S = Q$ trực giao, nên $S^{-1}=Q^\top$ và
$$A = Q\Lambda Q^\top$$
Đây là **định lý phổ** (spectral theorem) — không cần nghịch đảo, chỉ cần chuyển vị. Lý do PCA và tối ưu danh mục tính được nhanh và ổn định. → [[Special Matrices]], [[ML]]

**Không chéo hoá được:** $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ — chỉ 1 eigenvector cho $\lambda=1$ bội 2. Với những ma trận này dùng **dạng Jordan** $A=SJS^{-1}$ với $J$ gần chéo (có 1 trên đường chéo phụ).

## 4. Lũy thừa — ứng dụng chính

Bài giảng nhấn đúng chỗ này: $S$ và $S^{-1}$ **triệt tiêu lẫn nhau** trong tích:
$$A^2 = S\Lambda S^{-1}S\Lambda S^{-1}=S\Lambda^2S^{-1} \quad\Rightarrow\quad \boxed{A^k = S\Lambda^k S^{-1}}$$

Và $\Lambda^k=\text{diag}(\lambda_i^k)$ — tầm thường. Nâng lũy thừa $k$ chỉ tốn $O(n^3)$ một lần thay vì $k$ lần nhân ma trận. → [[Matrix Powers and Dynamics]]

**Hàm ma trận** tổng quát: $f(A)=Sf(\Lambda)S^{-1}$ với $f(\Lambda)=\text{diag}(f(\lambda_i))$. Cho:
$$e^{At}=Se^{\Lambda t}S^{-1}, \qquad A^{1/2}=S\Lambda^{1/2}S^{-1}$$
$e^{At}$ là nghiệm của hệ phương trình vi phân $\dot{\mathbf x}=A\mathbf x$ — chính là "state equations" mà bài giảng nhắc tới, và là nền của **Kalman filter**.

## 5. Cạm bẫy

1. **Cho rằng mọi ma trận chéo hoá được.** Điều kiện ở mục 3.
2. **Sai thứ tự $S\Lambda S^{-1}$ vs $S^{-1}\Lambda S$.** Kiểm bằng $A\mathbf{v}_1=\lambda_1\mathbf{v}_1$.
3. **Xếp cột của $S$ không khớp thứ tự đường chéo của $\Lambda$.** Cột $j$ của $S$ **phải** ứng với $\lambda_j$.
4. **Nhầm chéo hoá với tam giác hoá.** Mọi ma trận tam giác hoá được (Schur), không phải mọi ma trận chéo hoá được.
5. **Nghĩ chéo hoá được ⟹ khả nghịch.** Ma trận $0$ đã chéo, nhưng suy biến.
6. **Dùng $S^{-1}$ thay vì $Q^\top$ khi $A$ đối xứng.** Lãng phí và kém ổn định.
7. **Chéo hoá số học với eigenvalue gần nhau.** $S$ trở nên ill-conditioned; dùng phân rã Schur thay thế.

## 6. Checklist áp dụng
- [ ] $A$ vuông chưa? Đã tìm đủ $n$ eigenvalue (kể cả phức, kể cả bội) chưa?
- [ ] Có đủ $n$ eigenvector **độc lập** không?
- [ ] Cột của $S$ có xếp **cùng thứ tự** với đường chéo $\Lambda$ không?
- [ ] $A$ có đối xứng không → dùng $Q^\top$ thay $S^{-1}$?
- [ ] Đã kiểm $AS = S\Lambda$ chưa? (rẻ hơn nhân $S\Lambda S^{-1}$)
- [ ] Nếu tính $A^k$: có thật sự cần chéo hoá không, hay lũy thừa nhị phân đủ?
- [ ] Nếu eigenvalue gần trùng nhau — kết quả số có đáng tin không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 1:18:06–1:20:07: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §6.2, §6.4: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Change of basis* / *Eigenvectors*: https://www.3blue1brown.com/lessons/change-of-basis
- Wikipedia — *Spectral theorem*: https://en.wikipedia.org/wiki/Spectral_theorem

## Liên kết
[[Eigenvalues and Eigenvectors]] · [[Matrix Powers and Dynamics]] · [[Matrix Decompositions]] · [[Special Matrices]] · [[Math]]
