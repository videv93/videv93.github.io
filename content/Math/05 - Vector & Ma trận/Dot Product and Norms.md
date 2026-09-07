---
tags: [math, linear-algebra, geometry]
status: evergreen
---
# Dot Product and Norms

> Một phép toán, hai cách đọc: **đại số** (tổng tích) và **hình học** (độ dài × độ dài × cosine góc). Việc hai cách này bằng nhau là toàn bộ sức mạnh của đại số tuyến tính.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 7:22–19:19 — kể cả nhận xét của giảng viên rằng trực giao sẽ quay lại ở hồi quy bình phương tối thiểu.

## 1. Hai định nghĩa

$$\mathbf{v}\cdot\mathbf{w} = \sum_{i=1}^m v_iw_i = \mathbf{v}^\top\mathbf{w} \qquad\qquad \mathbf{v}\cdot\mathbf{w} = \|\mathbf{v}\|\,\|\mathbf{w}\|\cos\theta$$

**Chuẩn (norm)** = độ dài:
$$\|\mathbf{v}\| = \sqrt{\mathbf{v}\cdot\mathbf{v}} = \sqrt{\sum_i v_i^2}$$

Đây là định lý Pythagoras trong $m$ chiều. Vector **đơn vị**: $\hat{\mathbf{v}}=\mathbf{v}/\|\mathbf{v}\|$.

Bài giảng diễn giải công thức cosine bằng **hình chiếu**: $\mathbf{v}\cdot\mathbf{w}$ là độ dài của phần $\mathbf{v}$ nằm dọc theo $\mathbf{w}$, nhân với $\|\mathbf{w}\|$.

$$\text{proj}_{\mathbf{w}}\mathbf{v} = \frac{\mathbf{v}\cdot\mathbf{w}}{\|\mathbf{w}\|^2}\,\mathbf{w}$$

## 2. Dấu của tích vô hướng

| $\mathbf{v}\cdot\mathbf{w}$ | $\theta$ | Nghĩa |
|---|---|---|
| $>0$ | $<90°$ | cùng hướng chung |
| $=0$ | $=90°$ | **trực giao** |
| $<0$ | $>90°$ | ngược hướng chung |
| $=\|\mathbf v\|\|\mathbf w\|$ | $=0°$ | song song cùng chiều |

## 3. Trực giao — vì sao nó quan trọng

$$\mathbf{v}\perp\mathbf{w} \iff \mathbf{v}\cdot\mathbf{w}=0$$

Bài giảng nói rõ chỗ này sẽ dùng lại ở **hồi quy bình phương tối thiểu**: nghiệm least squares là hình chiếu vuông góc của $\mathbf{y}$ lên không gian cột của $X$, và **phần dư trực giao với mọi cột** của $X$:
$$X^\top(\mathbf{y}-X\hat\beta)=\mathbf{0} \Rightarrow \hat\beta = (X^\top X)^{-1}X^\top\mathbf{y}$$

Toàn bộ hồi quy tuyến tính là một bài toán hình chiếu. → [[Quant]], [[ML]]

**Trong xác suất:** hiệp phương sai **là** một tích vô hướng, và "không tương quan" **là** trực giao. Hệ số tương quan chính là $\cos\theta$ giữa hai biến đã trừ trung bình — lý do $\rho\in[-1,1]$. → [[Prob&Stats]]

## 4. Tính chất và bất đẳng thức

| Tính chất | |
|---|---|
| Giao hoán | $\mathbf{v}\cdot\mathbf{w}=\mathbf{w}\cdot\mathbf{v}$ |
| Phân phối | $\mathbf{u}\cdot(\mathbf{v}+\mathbf{w})=\mathbf{u}\cdot\mathbf{v}+\mathbf{u}\cdot\mathbf{w}$ |
| Thuần nhất | $(c\mathbf{v})\cdot\mathbf{w}=c(\mathbf{v}\cdot\mathbf{w})$ |
| **Cauchy–Schwarz** | $\vert\mathbf{v}\cdot\mathbf{w}\vert \le \|\mathbf{v}\|\|\mathbf{w}\|$ |
| **Bất đẳng thức tam giác** | $\|\mathbf{v}+\mathbf{w}\|\le\|\mathbf{v}\|+\|\mathbf{w}\|$ |

Cauchy–Schwarz là lý do $|\cos\theta|\le1$ — hay nói ngược lại, nó **định nghĩa** góc trong không gian nhiều chiều.

## 5. Các chuẩn khác

| Chuẩn | Công thức | Dùng ở đâu |
|---|---|---|
| $L^2$ (Euclid) | $\sqrt{\sum v_i^2}$ | mặc định, hình học |
| $L^1$ (Manhattan) | $\sum\vert v_i\vert$ | Lasso, sparse → [[ML]] |
| $L^\infty$ | $\max_i\vert v_i\vert$ | sai số tệ nhất |
| $L^p$ | $(\sum\vert v_i\vert^p)^{1/p}$ | tổng quát |

Chỉ $L^2$ sinh ra từ một tích vô hướng — nên chỉ $L^2$ có khái niệm góc và trực giao. Đó là lý do bình phương tối thiểu (chứ không phải "trị tuyệt đối tối thiểu") có nghiệm dạng đóng.

## 6. Cạm bẫy

1. **Nhầm tích vô hướng với tích từng phần tử.** Tích vô hướng ra **một số**.
2. **$\mathbf{v}^\top\mathbf{w}$ vs $\mathbf{v}\mathbf{w}^\top$.** Số vs ma trận $m\times m$ hạng 1.
3. **Quên chuẩn hoá khi so góc.** $\mathbf{v}\cdot\mathbf{w}$ lớn có thể chỉ vì vector dài, không vì cùng hướng. Dùng $\cos\theta = \frac{\mathbf v\cdot\mathbf w}{\|\mathbf v\|\|\mathbf w\|}$.
4. **Nghĩ trực giao ⟹ độc lập tuyến tính là hai chiều.** Trực giao (khác $\mathbf 0$) ⟹ độc lập; chiều ngược **sai**. → [[Linear Independence]]
5. **Áp $\|\mathbf v+\mathbf w\|=\|\mathbf v\|+\|\mathbf w\|$.** Chỉ đúng khi cùng hướng.
6. **Dùng $L^2$ cho dữ liệu chưa chuẩn hoá thang đo.** Một biến đo bằng đồng, một bằng phần trăm ⟹ khoảng cách vô nghĩa.
7. **Nhầm "không tương quan" với "độc lập"** trong xác suất. Trực giao chỉ cho cái đầu.

## 7. Checklist áp dụng
- [ ] Hai vector có cùng chiều không?
- [ ] Cần **số** (tích vô hướng) hay cần **ma trận** (tích ngoài)?
- [ ] Nếu so hướng — đã chuẩn hoá bằng $\|\cdot\|$ chưa?
- [ ] Các thành phần có cùng thang đo không? Có cần chuẩn hoá dữ liệu trước không?
- [ ] Đang dùng chuẩn nào? Bài toán có thật sự cần $L^2$ không?
- [ ] Nếu là bài hình chiếu — vector chiếu lên đã chuẩn hoá hoặc chia $\|\mathbf w\|^2$ chưa?
- [ ] Kết quả $\cos\theta$ có nằm trong $[-1,1]$ không? (nếu không → tính sai)

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 17:19–19:19: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §1.2, ch. 4: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Dot products and duality*: https://www.3blue1brown.com/lessons/dot-products
- Wikipedia — *Cauchy–Schwarz inequality*: https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality

## Liên kết
[[Vectors]] · [[Linear Independence]] · [[Vector Spaces and Basis]] · [[Matrix Algebra]] · [[Prob&Stats]] · [[Math]]
