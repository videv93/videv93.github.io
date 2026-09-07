---
tags: [math, linear-algebra, eigen, dynamics]
status: evergreen
---
# Matrix Powers and Dynamics

> Vì sao $A^k$ khi $k$ lớn bị chi phối bởi **một** eigenvalue duy nhất. Đây là câu trả lời cho "hệ thống này về đâu về lâu dài" — và bài giảng MIT dùng chính lập luận này cho phân phối dừng của Markov chain.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`: 33:43–35:02 (lặp $\boldsymbol\pi_{t+1}=A\boldsymbol\pi_t$), 40:44–41:22 (*"it's only this one eigenvector that doesn't get shrunk to 0 in the limit"*), 1:19:37–1:20:07 (lũy thừa của ma trận chéo hoá được).

## 1. Hệ động lực tuyến tính rời rạc

$$\mathbf{x}_{t+1}=A\mathbf{x}_t \qquad\Longrightarrow\qquad \mathbf{x}_t = A^t\mathbf{x}_0$$

Câu hỏi duy nhất đáng hỏi: **$\mathbf x_t$ đi đâu khi $t\to\infty$?**

## 2. Khai triển theo cơ sở eigenvector

Nếu $A$ chéo hoá được ([[Diagonalization]]), viết $\mathbf{x}_0$ theo cơ sở eigenvector:
$$\mathbf{x}_0 = c_1\mathbf{v}_1+\cdots+c_n\mathbf{v}_n$$

Thì vì $A^t\mathbf{v}_i=\lambda_i^t\mathbf{v}_i$:
$$\boxed{\mathbf{x}_t = c_1\lambda_1^t\mathbf{v}_1+\cdots+c_n\lambda_n^t\mathbf{v}_n}$$

**Đây là toàn bộ lý thuyết.** Mỗi thành phần tiến hoá **độc lập**, mỗi cái nhân với $\lambda_i$ mỗi bước. Hệ đã được tách thành $n$ bài toán một chiều.

Sắp $|\lambda_1|\ge|\lambda_2|\ge\cdots$ và đặt $\lambda_1$ là **eigenvalue trội** (dominant):
$$\mathbf{x}_t \approx c_1\lambda_1^t\mathbf{v}_1 \quad\text{khi } t \text{ lớn}$$
vì mọi số hạng khác nhỏ hơn theo tỉ số $\left(\frac{\lambda_i}{\lambda_1}\right)^t \to 0$.

**Tốc độ hội tụ** do **spectral gap** $|\lambda_2/\lambda_1|$ quyết định: gap càng lớn, hội tụ càng nhanh.

## 3. Phân loại hành vi theo $|\lambda|_{\max}$

| $\rho(A)=\max\vert\lambda_i\vert$ | Hành vi | Tên |
|---|---|---|
| $<1$ | $\mathbf{x}_t\to\mathbf{0}$ | ổn định tiệm cận |
| $=1$, đạt bởi $\lambda=1$ duy nhất | $\mathbf x_t\to$ trạng thái dừng | → [[Stochastic Matrices]] |
| $=1$, $\lambda$ phức trên vòng đơn vị | dao động tuần hoàn | Markov chain **tuần hoàn** |
| $>1$ | $\|\mathbf x_t\|\to\infty$ | phân kỳ |

$\rho(A)$ gọi là **bán kính phổ** (spectral radius). Nó — chứ không phải phần tử nào của $A$ — quyết định số phận hệ.

## 4. Trong bài giảng: Markov chain

$$\boldsymbol{\pi}_{t+1}=A\boldsymbol{\pi}_t \Rightarrow \boldsymbol{\pi}_t = A^t\boldsymbol{\pi}_0$$

Với $A$ stochastic, $\lambda_1=1$ luôn là eigenvalue ([[Stochastic Matrices]]), và các eigenvalue khác có $|\lambda|\le1$. Khi $|\lambda_i|<1$ với mọi $i\ge2$:
$$\boldsymbol{\pi}_t \to c_1\mathbf{v}_1 = \boldsymbol{\pi}^*$$

Đúng như giảng viên nói: *"when you multiply the A matrix by itself to many, many powers, then it's only this one eigenvector that doesn't get shrunk to 0 in the limit."*

**Giới hạn không phụ thuộc $\boldsymbol\pi_0$** — mọi trạng thái ban đầu hội tụ về cùng phân phối dừng. Đó là ý nghĩa thật của "ergodic".

Điều kiện thất bại: chain **tuần hoàn** (có $\lambda$ khác trên vòng đơn vị) — bài giảng nêu ví dụ hai trạng thái luân phiên chẵn/lẻ. → [[Perron-Frobenius Theorem]], [[Prob&Stats]]

## 5. Tính $A^k$ hiệu quả

| Cách | Chi phí | Khi nào |
|---|---|---|
| Nhân lặp $k$ lần | $O(kn^3)$ | $k$ nhỏ |
| **Lũy thừa nhị phân** (bình phương liên tiếp) | $O(n^3\log k)$ | mặc định |
| $S\Lambda^kS^{-1}$ | $O(n^3)$ + eigen | cần **nhiều** giá trị $k$, hoặc cần dạng giải tích |
| Chỉ cần $\lim$ | tìm eigenvector của $\lambda=1$ | phân phối dừng |

Chéo hoá **không** phải cách nhanh nhất cho một giá trị $k$ — giá trị của nó là cho **hiểu** và cho dạng đóng.

## 6. Trường hợp liên tục

$$\dot{\mathbf{x}}=A\mathbf{x} \Rightarrow \mathbf{x}(t)=e^{At}\mathbf{x}_0 = \sum_i c_ie^{\lambda_it}\mathbf{v}_i$$

Tiêu chí ổn định **đổi**: rời rạc cần $|\lambda|<1$; liên tục cần $\text{Re}(\lambda)<0$. Nhầm hai tiêu chí là lỗi kinh điển trong lý thuyết điều khiển.

Đây là "state equations" và **Kalman filter** mà bài giảng nhắc: hệ tuyến tính tiến hoá theo $e^{At}$, và toàn bộ phân tích ổn định là phân tích phổ của $A$. → [[The Exponential Function]]

## 7. Cạm bẫy

1. **Nhầm tiêu chí ổn định rời rạc và liên tục.** $|\lambda|<1$ vs $\text{Re}\lambda<0$.
2. **Bỏ qua trường hợp $c_1=0$.** Nếu $\mathbf x_0$ trực giao với hướng trội thì eigenvalue thứ hai chi phối.
3. **Cho rằng luôn có giới hạn.** Tuần hoàn và phân kỳ đều không có.
4. **Chéo hoá cho ma trận không chéo hoá được.** Cần dạng Jordan; khi đó $A^k$ có thêm thừa số đa thức theo $k$.
5. **Đọc số phận hệ từ phần tử của $A$.** Chỉ eigenvalue nói được.
6. **Nhân lặp $k$ lần khi $k$ lớn.** Dùng lũy thừa nhị phân.
7. **Bỏ qua spectral gap.** $\lambda_2/\lambda_1 = 0.99$ nghĩa là "hội tụ" cần hàng nghìn bước — về thực tế là không hội tụ.

## 8. Checklist áp dụng
- [ ] Đã tính đủ eigenvalue, kể cả phức, chưa?
- [ ] $\rho(A) = \max|\lambda_i|$ bằng bao nhiêu? (quyết định số phận)
- [ ] Hệ rời rạc hay liên tục? (tiêu chí ổn định khác nhau)
- [ ] Có eigenvalue nào trên vòng đơn vị mà **khác** $1$ không? (→ tuần hoàn, không hội tụ)
- [ ] Spectral gap $\vert\lambda_2/\lambda_1\vert$ bằng bao nhiêu? Hội tụ mất bao nhiêu bước?
- [ ] $\mathbf{x}_0$ có thành phần theo hướng trội không ($c_1\ne0$)?
- [ ] $A$ có chéo hoá được không? Nếu không → dạng Jordan.
- [ ] Cần **một** giá trị $A^k$ hay dạng giải tích? (chọn phương pháp tương ứng)

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 33:43–35:02, 40:44–41:22, 1:19:37: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §6.2, §6.3: https://math.mit.edu/~gs/linearalgebra/
- Levin & Peres — *Markov Chains and Mixing Times* (spectral gap): https://pages.uoregon.edu/dlevin/MARKOV/
- Wikipedia — *Spectral radius*: https://en.wikipedia.org/wiki/Spectral_radius

## Liên kết
[[Eigenvalues and Eigenvectors]] · [[Diagonalization]] · [[Stochastic Matrices]] · [[Perron-Frobenius Theorem]] · [[The Exponential Function]] · [[Math]]
