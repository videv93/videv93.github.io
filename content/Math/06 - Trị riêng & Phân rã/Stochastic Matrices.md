---
tags: [math, linear-algebra, markov]
status: evergreen
---
# Stochastic Matrices

> Ma trận có **cột tổng bằng 1**. Cấu trúc đó ép $\lambda=1$ luôn là eigenvalue — và mọi lý thuyết Markov chain rơi ra từ sự thật đại số đó.

> ⚠️ Note này giữ mặt **đại số tuyến tính**. Mặt xác suất (thời gian trở lại, ergodicity, mixing) sống ở [[Prob&Stats]] — xem `09 - Stochastic Processes`. Đừng viết lại ở đây.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 29:55–39:37. Bài giảng dùng quy ước **cột stochastic** ($\sum_i a_{ij}=1$) và $\boldsymbol\pi_{t+1}=A\boldsymbol\pi_t$.

## 1. Định nghĩa và quy ước

$$a_{ij}\ge0, \qquad \sum_{i=1}^m a_{ij}=1 \ \ \forall j$$

Đọc: $a_{ij}=P(\text{trạng thái kế} = i \mid \text{trạng thái trước} = j)$.

> [!warning] Hai quy ước ngược nhau
> **Cột stochastic** (bài giảng MIT, vật lý): $\boldsymbol\pi_{t+1}=A\boldsymbol\pi_t$, $\boldsymbol\pi$ là vector cột.
> **Hàng stochastic** (đa số sách xác suất, [[Prob&Stats]]): $\boldsymbol\pi_{t+1}=\boldsymbol\pi_t P$, $\boldsymbol\pi$ là vector hàng.
> Chúng là chuyển vị của nhau. Kiểm quy ước **trước** khi dùng bất kỳ công thức nào — đây là nguồn lỗi số một khi đọc chéo tài liệu.

## 2. Vì sao $\lambda=1$ luôn là eigenvalue

Cột tổng bằng 1 nghĩa là $\mathbf{1}^\top A = \mathbf{1}^\top$, tức $A^\top\mathbf{1}=\mathbf{1}$.

Vậy $\mathbf 1$ là eigenvector của $A^\top$ với $\lambda=1$. Vì $A$ và $A^\top$ có **cùng** đa thức đặc trưng ($\det(A-\lambda I)=\det(A^\top-\lambda I)$), $\lambda=1$ cũng là eigenvalue của $A$. ∎

Eigenvector của $A$ ứng với $\lambda=1$ là **phân phối dừng** $\boldsymbol\pi^*$:
$$A\boldsymbol{\pi}^*=\boldsymbol{\pi}^*$$

Chuẩn hoá sao cho $\sum\pi_i^*=1$ để nó là phân phối thật.

**Mọi eigenvalue khác có $|\lambda|\le1$** — vì $A$ không làm tăng chuẩn $L^1$ của vector phân phối. Kết hợp với [[Matrix Powers and Dynamics]]: $A^t\boldsymbol\pi_0\to\boldsymbol\pi^*$ khi mọi $|\lambda_i|<1$ với $i\ge2$.

## 3. Tiến hoá theo thời gian

$$\boldsymbol{\pi}_{t+1}=A\boldsymbol{\pi}_t, \qquad \boldsymbol{\pi}_{t+2}=A\boldsymbol{\pi}_{t+1}=A^2\boldsymbol\pi_t, \qquad \boldsymbol{\pi}_{t}=A^t\boldsymbol{\pi}_0$$

Bài giảng suy đúng chuỗi này bằng cách thế liên tiếp. Điều kiện ngầm: xác suất chuyển **dừng** (stationary/homogeneous) — cùng $A$ ở mọi bước.

**Tích của hai ma trận stochastic vẫn stochastic** — nên $A^t$ luôn là ma trận chuyển hợp lệ.

## 4. Khi nào phân phối dừng tồn tại

Sinh viên trong lớp trả lời đúng: **không tồn tại khi chain tuần hoàn** (periodic). Giảng viên minh hoạ bằng hai trạng thái luân phiên chẵn/lẻ — ở đó $\lambda=-1$ cũng nằm trên vòng đơn vị, và $\boldsymbol\pi_t$ dao động mãi.

| Điều kiện | Kết luận |
|---|---|
| Mọi $a_{ij}>0$ | ✅ hội tụ — nhưng **quá chặt** |
| $\exists k: A^k$ có mọi phần tử $>0$ | ✅ hội tụ — điều kiện đúng |
| Tuần hoàn | ❌ không hội tụ |
| Không liên thông (có nhiều lớp đóng) | phân phối dừng **không duy nhất** |

Giảng viên nói chính xác điểm này: đòi mọi phần tử của $A$ dương là *"a bit too restrictive"*; điều kiện thật là **một lũy thừa nào đó** của $A$ có mọi phần tử dương — tức ma trận **primitive**. Đó là giả thiết của [[Perron-Frobenius Theorem]].

## 5. Ứng dụng trong bài giảng và ngoài

| Ứng dụng | Trạng thái |
|---|---|
| **Trade sign** (bài giảng nêu) | giao dịch kế tiếp ở phía mua hay bán, tùy giao dịch trước |
| PageRank | trang web; $\boldsymbol\pi^*$ = thứ hạng |
| Xếp hạng tín dụng | AAA, AA, …, default |
| Chế độ thị trường | bull / bear / sideways → [[Quant]] |
| Mô hình ngôn ngữ n-gram | từ hiện tại |

Bài giảng ghi rõ đây là nội dung problem set đầu tiên của khoá: khảo sát phân phối dừng của vài Markov chain đơn giản.

## 6. Cạm bẫy

1. **Nhầm quy ước hàng/cột.** Xem cảnh báo mục 1.
2. **Quên chuẩn hoá $\boldsymbol\pi^*$.** Eigenvector xác định sai khác một hằng số; phân phối cần tổng bằng 1.
3. **Cho rằng phân phối dừng luôn tồn tại và duy nhất.** Tuần hoàn → không hội tụ; nhiều lớp đóng → không duy nhất.
4. **Đòi mọi $a_{ij}>0$.** Điều kiện đúng là primitive.
5. **Quên giả thiết dừng.** Xác suất chuyển đổi theo thời gian thì $A^t$ vô nghĩa.
6. **Nghĩ $\boldsymbol\pi^*$ nói gì đó về đường đi cụ thể.** Nó là phân phối dài hạn, không phải dự đoán bước kế.
7. **Ước lượng $A$ từ dữ liệu ít.** Với $m$ trạng thái cần ước lượng $m(m-1)$ tham số — bùng nổ nhanh.

## 7. Checklist áp dụng
- [ ] Quy ước hàng hay cột? Công thức đang dùng có khớp không?
- [ ] Mọi phần tử $\ge0$ và tổng theo đúng chiều bằng $1$ chưa?
- [ ] Chain có primitive không? (thử $A^2$, $A^3$ xem có toàn dương không)
- [ ] Có tuần hoàn không? Có nhiều lớp đóng không?
- [ ] $\boldsymbol\pi^*$ đã chuẩn hoá về tổng $1$ chưa? Mọi thành phần có $\ge0$ không?
- [ ] Giả thiết "xác suất chuyển không đổi theo thời gian" có hợp lý với dữ liệu không?
- [ ] Spectral gap bao nhiêu — hội tụ cần bao nhiêu bước? → [[Matrix Powers and Dynamics]]
- [ ] Mặt xác suất của bài này có nên tra [[Prob&Stats]] thay vì làm ở đây không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 29:55–39:37: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §8.3 (*Markov Matrices*): https://math.mit.edu/~gs/linearalgebra/
- Levin & Peres — *Markov Chains and Mixing Times*: https://pages.uoregon.edu/dlevin/MARKOV/
- Wikipedia — *Stochastic matrix*: https://en.wikipedia.org/wiki/Stochastic_matrix

## Liên kết
[[Eigenvalues and Eigenvectors]] · [[Matrix Powers and Dynamics]] · [[Perron-Frobenius Theorem]] · [[Special Matrices]] · [[Prob&Stats]] · [[Math]]
