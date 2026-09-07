---
tags: [math, linear-algebra, perspective]
status: evergreen
---
# Matrix as Columns

> Cách nhìn mà giảng viên MIT nói thẳng là đã đổi cách ông làm việc: coi ma trận là **một dãy vector cột**, không phải một bảng số. Mọi chứng minh ma trận trở nên ngắn hơn nhiều lần.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 21:45–25:08. Nhận xét gốc: *"When I learned linear algebra decades ago, I used these double sums, which were not very intuitive to interpret… things are much easier to prove with this other notation."*

## 1. Ký hiệu

$$A = \big[\ \mathbf{a}_1 \ \big|\ \mathbf{a}_2\ \big|\ \cdots\ \big|\ \mathbf{a}_n\ \big], \qquad \mathbf{a}_j \in \mathbb{R}^m$$

Chuyển vị thì các cột đó thành **hàng**:
$$A^\top = \begin{bmatrix}\mathbf{a}_1^\top\\ \vdots\\ \mathbf{a}_n^\top\end{bmatrix}$$

## 2. Mọi phép toán viết lại theo cột

| Phép | Dạng cột | Đọc thành lời |
|---|---|---|
| $A\mathbf{v}$ | $\sum_j v_j\mathbf{a}_j$ | **tổ hợp tuyến tính các cột**, hệ số là $\mathbf v$ |
| $AB$ | $\big[A\mathbf{b}_1 \mid \cdots \mid A\mathbf{b}_p\big]$ | mỗi cột kết quả = $A$ tác động lên một cột của $B$ |
| $A\mathbf{e}_j$ | $\mathbf{a}_j$ | **trích** cột thứ $j$ |
| $\mathbf{u}\mathbf{v}^\top$ | $\big[v_1\mathbf u \mid \cdots \mid v_n\mathbf u\big]$ | ma trận **hạng 1** |
| $J = \mathbf{1}\mathbf{1}^\top$ | mọi cột là $\mathbf 1$ | ma trận toàn 1 → [[Special Matrices]] |

Dòng thứ hai là điều đáng nhớ nhất: **nhân ma trận = nhân ma trận-vector, lặp lại $p$ lần**. Không cần nhớ tổng kép.

## 3. Bốn hệ quả rơi ra ngay

| Sự thật | Vì sao, đọc từ dạng cột |
|---|---|
| $A\mathbf{v}$ luôn nằm trong span các cột | nó **là** một tổ hợp của các cột |
| $A\mathbf{x}=\mathbf{b}$ có nghiệm ⟺ $\mathbf{b}\in C(A)$ | cùng lý do |
| $A\mathbf{x}=\mathbf 0$ chỉ có nghiệm $\mathbf 0$ ⟺ cột độc lập | đúng định nghĩa [[Linear Independence]] |
| Nếu cột của $A$ là cơ sở thì $A$ khả nghịch | toạ độ tồn tại và duy nhất |

So sánh: chứng minh ba dòng đầu bằng tổng kép $\sum_k a_{ik}b_{kj}$ là một trang đại số chỉ số. Bằng dạng cột là một câu.

**Ví dụ — chứng minh $(AB)$ có cột nằm trong $C(A)$:** cột thứ $j$ của $AB$ là $A\mathbf{b}_j$, mà $A\mathbf x \in C(A)$ với mọi $\mathbf x$. ∎ Hệ quả: $\text{rank}(AB)\le\text{rank}(A)$.

## 4. Cách nhìn hàng và cách nhìn cột

| | Cột | Hàng |
|---|---|---|
| $A\mathbf v$ là | tổ hợp các cột | vector các tích vô hướng hàng·$\mathbf v$ |
| Tốt cho | chứng minh, hình học, không gian cột | tính tay, hệ phương trình |
| Trong hệ $A\mathbf x=\mathbf b$ | "$\mathbf b$ tổ hợp được từ cột nào?" | "mỗi hàng là một phương trình" |
| Bài giảng khuyên | **cái này** | "perhaps less useful" |

Cả hai đều đúng — chúng là hai cách phân tích cùng một tổng kép. Nhưng cách nhìn hàng dẫn tới khử Gauss, còn cách nhìn cột dẫn tới rank, không gian con, và [[Eigenvalues and Eigenvectors]].

## 5. Trong bài giảng: ma trận payoff

Ma trận giá $A$ trong mô hình thị trường một kỳ: **cột $j$ = vector payoff của tài sản $j$** trên các trạng thái $\omega_1,\ldots,\omega_m$.

$$A\mathbf{q} = \sum_j q_j\mathbf{a}_j = \text{payoff của danh mục } \mathbf{q}$$

Đọc thẳng: **danh mục là một tổ hợp tuyến tính các tài sản, và payoff của nó là cùng tổ hợp đó của các payoff.** Toàn bộ [[Single-Period Market Model]] và [[Contingent Claims and Replication]] là câu này.

## 6. Cạm bẫy

1. **Nhầm cột với hàng** khi ma trận không vuông. Kiểm kích thước.
2. **Viết $A\mathbf v = \sum_j v_j \mathbf a_j$ với chỉ số sai.** Hệ số lấy từ $\mathbf v$; số hạng lấy từ cột của $A$ — không đảo lại được vì kích thước khác nhau.
3. **Quên $AB$ và $BA$ dùng cột của ma trận khác nhau.** $AB$ dùng cột của $B$.
4. **Nghĩ $C(AB) = C(A)$.** Chỉ có $C(AB)\subseteq C(A)$.
5. **Áp cách nhìn cột cho $\mathbf{v}^\top A$.** Đó là tổ hợp các **hàng** của $A$.
6. **Trong code: nhầm row-major với column-major.** numpy mặc định row-major, MATLAB/R column-major — ảnh hưởng hiệu năng chứ không ảnh hưởng toán.

## 7. Checklist áp dụng
- [ ] Đã viết $A$ dưới dạng $[\mathbf a_1|\cdots|\mathbf a_n]$ chưa?
- [ ] Trong $A\mathbf v$: hệ số lấy từ $\mathbf v$, vector lấy từ cột $A$ — đúng chiều chưa?
- [ ] Câu hỏi đang là "$\mathbf b$ có trong span cột không?" hay "hệ phương trình có nghiệm không?" (cùng một câu)
- [ ] Nếu tính $AB$: đã tách thành $A\mathbf{b}_j$ cho từng cột chưa?
- [ ] Cách nhìn nào rẻ hơn cho bài này — cột hay hàng?
- [ ] Trong bài ứng dụng: cột đại diện cho gì? (tài sản, đặc trưng, quan sát?)

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 21:45–25:08: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §1.3, §2.1: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Linear transformations and matrices*: https://www.3blue1brown.com/lessons/linear-transformations
- MIT OCW 18.06 — *Linear Algebra*, Lecture 1–3: https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

## Liên kết
[[Matrix Algebra]] · [[Vector Spaces and Basis]] · [[Linear Independence]] · [[Single-Period Market Model]] · [[Special Matrices]] · [[Math]]
