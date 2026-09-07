---
tags: [math, linear-algebra, eigen, theorem]
status: evergreen
---
# Perron-Frobenius Theorem

> Định lý mà bài giảng MIT liệt kê ngay ở phút mở đầu như một trong những đích đến. Nó nói: ma trận **toàn phần tử dương** có một eigenvalue trội **thực, dương, đơn**, với eigenvector **toàn dương** — và đó là lý do phân phối dừng của Markov chain tồn tại, duy nhất, và là một phân phối thật.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`: 0:25 (*"and then, finally, the Perron-Frobenius theorem"*), 37:37–38:28 (điều kiện primitive), 1:20:20 (giảng viên hoãn phần chứng minh sang buổi sau). Đây là một **header rỗng** kiểu kín đáo: khái niệm được hứa trong outline nhưng bài giảng hết giờ trước khi trình bày. Note này trả lời lời hứa đó.

## 1. Phát biểu

**Perron (ma trận dương).** Nếu $A_{n\times n}$ có **mọi** phần tử $a_{ij}>0$ thì:

1. Tồn tại eigenvalue thực $\lambda_1>0$ với $\lambda_1 = \rho(A)$ (bán kính phổ).
2. $\lambda_1$ **đơn** (bội đại số $=1$).
3. Eigenvector ứng với nó có thể chọn **toàn dương**, và nó là eigenvector **duy nhất** có tính chất đó.
4. Mọi eigenvalue khác thoả $|\lambda_i| < \lambda_1$ — **nghiêm ngặt**.
5. $\min_j\sum_i a_{ij} \le \lambda_1 \le \max_j\sum_i a_{ij}$.

**Frobenius (mở rộng).** Kết luận vẫn đúng khi $A\ge0$ và $A$ **primitive** — tức $\exists k: A^k>0$ (mọi phần tử dương).

Đây chính là điều kiện giảng viên nêu: đòi $A>0$ là *"a bit too restrictive"*; đủ là *"for some power… A to that power is a matrix of all positive entries."*

## 2. Ba kết luận, ba hệ quả

| Kết luận | Hệ quả cho Markov chain |
|---|---|
| $\lambda_1$ thực dương và trội | trạng thái dài hạn **tồn tại** |
| $\lambda_1$ **đơn** | trạng thái dài hạn **duy nhất** |
| eigenvector toàn dương | nó là **phân phối** hợp lệ (mọi $\pi_i^*>0$) |
| $\vert\lambda_i\vert<\lambda_1$ nghiêm ngặt | hội tụ **thật sự**, không dao động |

Với ma trận stochastic, mục 5 cho $\lambda_1 = 1$ chính xác (mọi tổng cột bằng 1) ⟹ $\rho(A)=1$. Ghép với [[Matrix Powers and Dynamics]]:
$$A^t\boldsymbol{\pi}_0 \to \boldsymbol{\pi}^* \quad \text{với tốc độ } O\big((\vert\lambda_2\vert)^t\big)$$

→ [[Stochastic Matrices]]

## 3. Vì sao "primitive" chứ không phải "irreducible"

| Tính chất | Nghĩa | Kết luận |
|---|---|---|
| **Irreducible** | đồ thị liên thông mạnh — từ mọi $i$ đến được mọi $j$ | $\lambda_1$ đơn, eigenvector dương ✅ — nhưng **có thể** có eigenvalue khác cùng độ lớn |
| **Primitive** | irreducible **và** không tuần hoàn ($\exists k: A^k>0$) | thêm $\vert\lambda_i\vert<\lambda_1$ nghiêm ngặt ✅ ⟹ hội tụ |

Ví dụ irreducible nhưng **không** primitive:
$$A = \begin{bmatrix}0&1\\1&0\end{bmatrix}, \qquad \lambda = \pm 1$$
Đây đúng là ví dụ hai trạng thái luân phiên mà bài giảng nêu: liên thông, nhưng $A^k$ luân phiên giữa $A$ và $I$ — không bao giờ toàn dương. Phân phối dừng $(\frac12,\frac12)$ **tồn tại** nhưng $\boldsymbol\pi_t$ **không hội tụ** về nó nếu xuất phát từ $(1,0)$.

Phân biệt này là toàn bộ nội dung của phần "acyclic" trong bài giảng.

## 4. Vì sao đúng (trực giác)

Ma trận dương **kéo mọi vector về góc dương**: nếu $\mathbf x\ge0$ khác $\mathbf 0$ thì $A\mathbf x>0$ ngặt. Lặp lại, hướng của $A^t\mathbf x$ bị ép vào trong nón dương và co lại — theo định lý điểm bất động (Brouwer, hoặc metric Hilbert), nó hội tụ về một hướng **duy nhất**. Hướng đó là eigenvector Perron.

Tính đơn và tính trội nghiêm ngặt đến từ chỗ: eigenvector nào khác cũng phải có thành phần âm (vì trực giao hoặc độc lập với eigenvector dương), mà thành phần âm bị $A>0$ "trộn" đi mất.

Chứng minh đầy đủ thuộc analysis — xem [[Mathematics Roadmap]], nhánh *Introduction to Real Analysis*.

## 5. Ứng dụng ngoài Markov chain

| Ứng dụng | $\lambda_1$ là gì |
|---|---|
| **PageRank** | eigenvector Perron của ma trận web (đã "teleport" hoá cho primitive) |
| **Mô hình Leslie** (dân số theo tuổi) | tốc độ tăng trưởng dài hạn |
| **Mô hình input–output Leontief** | điều kiện nền kinh tế sản xuất được thặng dư |
| **Ma trận tương quan** | eigenvector đầu = "yếu tố thị trường" → [[Quant]] |
| Lý thuyết đồ thị | eigenvalue lớn nhất của ma trận kề = thước đo mật độ |

Chi tiết PageRank: Google cộng thêm một ma trận đều $\frac{1-d}{n}J$ để **ép** ma trận thành primitive — thủ thuật "teleportation" chính là làm thoả giả thiết Perron–Frobenius. → [[Special Matrices]]

## 6. Cạm bẫy

1. **Áp cho ma trận có phần tử bằng 0 mà không kiểm primitive.** $A\ge0$ không đủ.
2. **Nhầm irreducible với primitive.** Bảng mục 3.
3. **Nhầm "ma trận dương" với "xác định dương".** → [[Special Matrices]]
4. **Quên chuẩn hoá eigenvector Perron.** Nó xác định sai khác hằng số dương.
5. **Cho rằng eigenvector Perron trực giao với các eigenvector khác.** Chỉ đúng khi $A$ đối xứng.
6. **Áp cho ma trận có phần tử âm.** Định lý sụp hoàn toàn.
7. **Bỏ qua tốc độ hội tụ.** Định lý bảo đảm hội tụ, không bảo đảm nhanh — spectral gap quyết định.

## 7. Checklist áp dụng
- [ ] Mọi phần tử của $A$ có $\ge0$ không? (nếu có phần tử âm → định lý không áp dụng)
- [ ] $A$ có toàn dương không? Nếu không — thử $A^2, A^3, \ldots$ xem có $k$ nào cho $A^k>0$ không?
- [ ] Đồ thị của $A$ có liên thông mạnh không (irreducible)?
- [ ] Có tuần hoàn không? (nếu có → tồn tại nhưng không hội tụ)
- [ ] $\lambda_1$ tìm được có thực, dương, và lớn nhất về độ lớn không?
- [ ] Eigenvector ứng với nó có toàn dương không? (nếu không → tính sai)
- [ ] Đã chuẩn hoá eigenvector về tổng $=1$ chưa?
- [ ] $\vert\lambda_2/\lambda_1\vert$ bằng bao nhiêu? Hội tụ có đủ nhanh để dùng được không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 0:25, 37:37–38:28: https://www.youtube.com/watch?v=0uimNNIuUyY
- Meyer — *Matrix Analysis and Applied Linear Algebra*, ch. 8: https://epubs.siam.org/doi/book/10.1137/1.9780898719512
- Wikipedia — *Perron–Frobenius theorem*: https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem
- Page, Brin, Motwani, Winograd — *The PageRank Citation Ranking*: http://ilpubs.stanford.edu:8090/422/

## Liên kết
[[Stochastic Matrices]] · [[Eigenvalues and Eigenvectors]] · [[Matrix Powers and Dynamics]] · [[Special Matrices]] · [[Prob&Stats]] · [[Math]]
