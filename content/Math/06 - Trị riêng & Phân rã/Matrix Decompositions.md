---
tags: [math, linear-algebra, reference]
status: evergreen
---
# Matrix Decompositions

> Bản đồ sáu phân rã. Mỗi cái viết $A$ thành tích của những ma trận **có cấu trúc**, và mỗi cái tồn tại vì một bài toán cụ thể trở nên dễ trong dạng đó.

> [!note] Ghi chú nguồn
> Bài giảng nêu trong outline mở đầu: *"eigenvectors and eigenvalue, decompositions, singular value decompositions"* (phút 0:25) nhưng hết giờ trước khi trình bày SVD. Note này trả lời lời hứa đó — và trỏ sang [[ML]] cho phần SVD/PCA đã hệ thống hoá ở đó.

## 1. Bảng tổng hợp

| Phân rã | Dạng | Điều kiện | Giải bài toán gì | Chi phí |
|---|---|---|---|---|
| **LU** | $A=LU$ (tam giác dưới × trên) | vuông, thường cần hoán vị $PA=LU$ | giải $A\mathbf x=\mathbf b$ nhiều lần | $O(n^3/3)$ |
| **Cholesky** | $A=LL^\top$ | đối xứng **xác định dương** | như LU, nhanh gấp đôi; sinh mẫu Gaussian tương quan | $O(n^3/6)$ |
| **QR** | $A=QR$ ($Q$ trực giao, $R$ tam giác trên) | mọi $A$ | least squares, ổn định số học | $O(mn^2)$ |
| **Eigen** | $A=S\Lambda S^{-1}$ | vuông, chéo hoá được | lũy thừa, động lực học | $O(n^3)$ |
| **Spectral** | $A=Q\Lambda Q^\top$ | **đối xứng** | PCA, tối ưu bậc hai | $O(n^3)$ |
| **SVD** | $A=U\Sigma V^\top$ | **mọi** ma trận | rank, giả nghịch đảo, nén, PCA | $O(mn\cdot\min(m,n))$ |

## 2. Chọn cái nào

```
Cần giải Ax = b?
├─ A vuông, không cấu trúc đặc biệt ......... LU (P A = LU)
├─ A đối xứng xác định dương ............... Cholesky
└─ A không vuông / overdetermined .......... QR (least squares)

Cần hiểu hành vi của A khi lặp?
├─ A vuông bất kỳ .......................... Eigen
└─ A đối xứng .............................. Spectral (rẻ và ổn định hơn)

Cần rank, nén, hay A suy biến / không vuông?
└─ ................................... SVD (luôn tồn tại)
```

**Nguyên tắc:** SVD luôn dùng được nhưng đắt nhất. Càng khai thác được cấu trúc ([[Special Matrices]]) thì càng rẻ.

## 3. SVD — phân rã tổng quát nhất

$$A_{m\times n} = U_{m\times m}\Sigma_{m\times n}V^\top_{n\times n}$$

$U, V$ **trực giao**; $\Sigma$ đường chéo với các **singular value** $\sigma_1\ge\sigma_2\ge\cdots\ge0$.

| Đại lượng | Đọc từ SVD |
|---|---|
| $\text{rank}(A)$ | số $\sigma_i > 0$ |
| $\|A\|_2$ | $\sigma_1$ |
| Số điều kiện $\kappa$ | $\sigma_1/\sigma_r$ |
| Giả nghịch đảo $A^+$ | $V\Sigma^+U^\top$ |
| Xấp xỉ hạng $k$ tốt nhất | giữ $k$ giá trị $\sigma$ lớn nhất (Eckart–Young) |

**Quan hệ với eigen:** $\sigma_i^2$ là eigenvalue của $A^\top A$; cột của $V$ là eigenvector của $A^\top A$. Nên SVD "là" phân rã phổ của $A^\top A$ — nhưng tính trực tiếp ổn định hơn nhiều vì tránh bình phương số điều kiện.

Với $A$ đối xứng xác định dương: $\sigma_i=\lambda_i$ và $U=V=Q$. Hai phân rã trùng nhau.

> [!note] SVD đầy đủ đã có ở [[ML]]
> Xem `ML/05 - Giảm chiều dữ liệu/Singular Value Decomposition.md` và `Principal Component Analysis.md`. Không viết lại ở đây.

## 4. Ứng dụng theo lĩnh vực

| Lĩnh vực | Phân rã | Dùng làm gì |
|---|---|---|
| Giải hệ tuyến tính | LU, Cholesky | mọi solver | 
| Hồi quy | QR, SVD | least squares ổn định → [[Systems of Linear Equations]] |
| Mô phỏng Monte Carlo | Cholesky | sinh biến ngẫu nhiên tương quan → [[Quant]] |
| Tối ưu danh mục | Cholesky, Spectral | ma trận hiệp phương sai |
| Giảm chiều | SVD | PCA → [[ML]] |
| Hệ gợi ý | SVD cắt cụt | matrix factorization |
| Động lực học, Kalman filter | Eigen | $e^{At}$ → [[Matrix Powers and Dynamics]] |
| Nén ảnh | SVD | giữ $k$ singular value đầu |

## 5. Cạm bẫy

1. **Dùng eigen cho ma trận không đối xứng rồi giả định eigenvector trực giao.**
2. **Cholesky cho ma trận chỉ **bán** xác định dương.** Thất bại; cần LDL hoặc thêm nhiễu vào đường chéo.
3. **Tính SVD qua eigen của $A^\top A$.** Bình phương số điều kiện — mất một nửa số chữ số đáng tin.
4. **Nhầm singular value với eigenvalue.** Bằng nhau chỉ khi $A$ đối xứng nửa xác định dương.
5. **Quên hoán vị trong LU.** LU không hoán vị có thể thất bại hoặc rất kém ổn định.
6. **Dùng $\det$ để đo suy biến.** Dùng $\sigma_{\min}$ hoặc $\kappa$.
7. **Phân rã lại mỗi lần giải $A\mathbf x=\mathbf b_i$.** Phân rã **một lần**, dùng lại cho mọi $\mathbf b$ — đây là lý do chính LU tồn tại.
8. **Nghĩ SVD duy nhất.** Với singular value trùng nhau, $U$ và $V$ không duy nhất.

## 6. Checklist áp dụng
- [ ] Bài toán là giải hệ, phân tích động lực, hay giảm chiều? (chọn nhánh trong cây mục 2)
- [ ] $A$ vuông không? Đối xứng không? Xác định dương không?
- [ ] Có giải nhiều $\mathbf b$ với cùng $A$ không? (→ phân rã một lần)
- [ ] $\kappa(A)$ bằng bao nhiêu — kết quả có đáng tin không?
- [ ] Nếu dùng Cholesky: đã kiểm xác định dương chưa (mọi eigenvalue $>0$)?
- [ ] Nếu cần rank: đã dùng SVD chứ không phải $\det$ chứ?
- [ ] Có khai thác được cấu trúc (thưa, băng, tam giác) để giảm chi phí không?
- [ ] Phần SVD/PCA của bài này có thuộc [[ML]] hơn không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 0:25: https://www.youtube.com/watch?v=0uimNNIuUyY
- Trefethen & Bau — *Numerical Linear Algebra*: https://people.maths.ox.ac.uk/trefethen/text.html
- Golub & Van Loan — *Matrix Computations*: https://www.cs.cornell.edu/cv/GVL4/golubandvanloan.htm
- Strang — *Introduction to Linear Algebra*, ch. 7 (*The Singular Value Decomposition*): https://math.mit.edu/~gs/linearalgebra/

## Liên kết
[[Diagonalization]] · [[Eigenvalues and Eigenvectors]] · [[Systems of Linear Equations]] · [[Special Matrices]] · [[ML]] · [[Math]]
