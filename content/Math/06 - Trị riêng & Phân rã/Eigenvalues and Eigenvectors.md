---
tags: [math, linear-algebra, eigen]
status: evergreen
---
# Eigenvalues and Eigenvectors

> Những hướng mà ma trận **chỉ kéo giãn, không xoay**. Tìm được chúng là biến một phép biến đổi phức tạp thành một phép nhân số — và đó là toàn bộ lý do khái niệm này thống trị đại số tuyến tính ứng dụng.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 1:15:41–1:18:06, và phần liên hệ với phân phối dừng ở 39:48–41:22.

## 1. Định nghĩa

$$A\mathbf{v}=\lambda\mathbf{v}, \qquad \mathbf{v}\ne\mathbf{0}$$

$\lambda$ là **eigenvalue** (trị riêng), $\mathbf{v}$ là **eigenvector** (vector riêng). Điều kiện $\mathbf v \ne \mathbf 0$ là bắt buộc — nếu không thì mọi $\lambda$ đều thoả.

Bài giảng nói gọn: *"the matrix vector product just rescales $\mathbf v$ by the factor $\lambda$."*

**Chỉ ma trận vuông** mới có eigenvalue.

## 2. Cách tìm

Viết lại thành hệ thuần nhất:
$$(A-\lambda I)\mathbf{v}=\mathbf{0}$$

Hệ này có nghiệm khác $\mathbf 0$ ⟺ $A-\lambda I$ **suy biến** ⟺
$$\boxed{\det(A-\lambda I)=0}$$

Đây là **đa thức đặc trưng**, bậc $n$. Nghiệm của nó là các eigenvalue.

**Quy trình:**
1. Lập $\det(A-\lambda I)=0$, giải ra $\lambda_1,\ldots,\lambda_n$.
2. Với **mỗi** $\lambda_i$, giải $(A-\lambda_i I)\mathbf{v}=\mathbf 0$ → không gian riêng.
3. Chọn cơ sở cho mỗi không gian riêng.

**Ví dụ $2\times2$:**
$$A=\begin{bmatrix}2&1\\1&2\end{bmatrix}: \quad \det\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}=(2-\lambda)^2-1=0 \Rightarrow \lambda = 1, 3$$
$\lambda=3$: $\mathbf v=(1,1)^\top$. $\lambda=1$: $\mathbf v=(1,-1)^\top$. Trực giao — vì $A$ đối xứng ([[Special Matrices]]).

## 3. Tính chất

| Tính chất | |
|---|---|
| $\sum\lambda_i = \text{tr}(A)$ | tổng đường chéo — phép kiểm nhanh nhất |
| $\prod\lambda_i = \det(A)$ | phép kiểm thứ hai |
| $A$ khả nghịch ⟺ mọi $\lambda_i\ne0$ | $0$ là eigenvalue ⟺ suy biến |
| $A^k$ có eigenvalue $\lambda^k$ | cùng eigenvector → [[Matrix Powers and Dynamics]] |
| $A^{-1}$ có eigenvalue $1/\lambda$ | cùng eigenvector |
| $A$ đối xứng ⟹ $\lambda$ **thực**, eigenvector **trực giao** | |
| $A$ tam giác ⟹ $\lambda$ = các phần tử đường chéo | |
| eigenvector của $\lambda$ **khác nhau** thì độc lập tuyến tính | → [[Diagonalization]] |

Bài giảng nêu thêm một tính chất quan trọng: **eigenvalue có độ lớn lớn nhất bằng $\max_{\|\mathbf v\|=1}\|A\mathbf v\|$** (với ma trận đối xứng) — tức nó **là** chuẩn toán tử, hệ số giãn lớn nhất của $A$.

**Eigenvector không duy nhất:** nếu $\mathbf v$ là eigenvector thì $c\mathbf v$ cũng vậy. Thường chuẩn hoá về $\|\mathbf v\|=1$.

## 4. Bội đại số vs bội hình học

| | Định nghĩa |
|---|---|
| Bội **đại số** | số lần $\lambda$ là nghiệm của đa thức đặc trưng |
| Bội **hình học** | $\dim N(A-\lambda I)$ = số eigenvector độc lập |

Luôn có: hình học $\le$ đại số. Khi **bằng nhau với mọi $\lambda$** thì $A$ chéo hoá được.

**Ma trận không chéo hoá được:** $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ có $\lambda=1$ bội đại số 2, nhưng chỉ **một** eigenvector độc lập. → [[Diagonalization]]

## 5. Trong bài giảng: phân phối dừng

Với ma trận chuyển trạng thái $A$ của Markov chain, phương trình phân phối dừng là
$$\boldsymbol{\pi}^* = A\boldsymbol{\pi}^*$$

Sinh viên trong lớp trả lời đúng: **eigenvalue bằng $1$**, và $\boldsymbol\pi^*$ là eigenvector ứng với nó. Giảng viên bổ sung: các eigenvalue khác có $|\lambda|<1$, nên khi nâng $A$ lên lũy thừa cao, **chỉ eigenvector này sống sót** — mọi thành phần khác co về 0.

Đây là ví dụ mẫu mực của "eigenvalue chi phối hành vi dài hạn". → [[Stochastic Matrices]], [[Matrix Powers and Dynamics]], [[Perron-Frobenius Theorem]]

## 6. Eigenvalue phức

Đa thức bậc $n$ có $n$ nghiệm **phức**. Eigenvalue phức xuất hiện theo cặp liên hợp và biểu thị **phép quay**: ma trận quay $90°$ có $\lambda=\pm i$ và **không** eigenvector thực nào — hợp lý, vì phép quay không giữ hướng nào cố định.

$|\lambda| = $ hệ số co giãn; $\arg\lambda$ = góc quay mỗi bước. Đây là chỗ Markov chain **tuần hoàn** không có phân phối dừng: eigenvalue nằm trên vòng tròn đơn vị nhưng không bằng $1$.

## 7. Cạm bẫy

1. **Quên $\mathbf v\ne\mathbf 0$.**
2. **Chỉ tìm $\lambda$ mà không tìm $\mathbf v$.** Bài toán chưa xong.
3. **Tính $\det(A-\lambda I)$ nhầm thành $\det(\lambda I - A)$.** Khác dấu khi $n$ lẻ (nghiệm vẫn như nhau, nhưng dễ sai đại số).
4. **Bỏ qua eigenvalue phức.**
5. **Cho rằng bội đại số = số eigenvector độc lập.**
6. **Không kiểm bằng trace và det.** Hai phép kiểm miễn phí, bắt gần hết lỗi.
7. **Tính eigenvalue bằng đa thức đặc trưng cho $n$ lớn.** Không ổn định số học — thuật toán thật dùng QR iteration.
8. **Quên chuẩn hoá eigenvector** khi so sánh kết quả với người khác.

## 8. Checklist áp dụng
- [ ] $A$ có vuông không?
- [ ] Đã lập đúng $\det(A-\lambda I)=0$ chưa?
- [ ] $\sum\lambda_i$ có bằng $\text{tr}(A)$ không? $\prod\lambda_i$ có bằng $\det A$ không?
- [ ] Đã tìm eigenvector cho **mỗi** eigenvalue chưa?
- [ ] Có eigenvalue lặp không? Nếu có, bội hình học bằng bội đại số chứ?
- [ ] Có eigenvalue phức không? Nó nói gì về hành vi (quay)?
- [ ] $A$ có đối xứng không? (nếu có → eigen phải thực và trực giao; nếu không ra vậy thì tính sai)
- [ ] $|\lambda|_{\max}$ bằng bao nhiêu? (quyết định hành vi dài hạn)

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 1:15:41–1:18:06: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 6: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Eigenvectors and eigenvalues*: https://www.3blue1brown.com/lessons/eigenvalues
- MIT OCW 18.06 — *Linear Algebra*, Lecture 21: https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

## Liên kết
[[Diagonalization]] · [[Matrix Powers and Dynamics]] · [[Stochastic Matrices]] · [[Perron-Frobenius Theorem]] · [[Special Matrices]] · [[Math]]
