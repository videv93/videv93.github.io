---
tags: [math, linear-algebra, foundations]
status: evergreen
---
# Vector Spaces and Basis

> Không gian vector là **tập đóng với cộng và nhân vô hướng**. Cơ sở là bộ toạ độ tối thiểu mô tả nó. Hai khái niệm này biến "một đống vector" thành một đối tượng có chiều, có toạ độ, có cấu trúc.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 20:23–21:22 — bài giảng nêu đúng hai tiên đề đóng và định nghĩa cơ sở.

## 1. Định nghĩa

Tập $S\subseteq\mathbb{R}^m$ là **không gian vector** (chính xác hơn: không gian con) nếu:

1. $\mathbf{v}\in S \Rightarrow c\mathbf{v}\in S$ với mọi vô hướng $c$
2. $\mathbf{v},\mathbf{w}\in S \Rightarrow \mathbf{v}+\mathbf{w}\in S$

Hệ quả tức thì: **$\mathbf{0}$ luôn thuộc $S$** (lấy $c=0$). Đây là phép kiểm nhanh nhất: tập không chứa gốc **không** là không gian con.

**Ví dụ:** đường thẳng qua gốc ✅ · mặt phẳng qua gốc ✅ · đường thẳng **không** qua gốc ❌ · góc phần tư thứ nhất ❌ (không đóng với $c<0$).

## 2. Span

$$\text{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_p\} = \left\{\sum_i c_i\mathbf{v}_i \ :\ c_i\in\mathbb{R}\right\}$$

Span **luôn** là một không gian con — cách sinh không gian con dễ nhất. Trong bài giảng: nhân ma trận với vector cho ra một vector **trong span các cột của $A$**, và tập đó gọi là **không gian cột** (column space). → [[Matrix as Columns]]

## 3. Cơ sở

$\{\mathbf{v}_1,\ldots,\mathbf{v}_p\}$ là **cơ sở** của $S$ nếu:

1. Chúng **độc lập tuyến tính** → [[Linear Independence]]
2. Chúng **span** $S$

Nói cách khác: đủ ít để không thừa, đủ nhiều để phủ hết.

| Tính chất | Nội dung |
|---|---|
| **Chiều** (dimension) | mọi cơ sở của $S$ có **cùng** số vector; số đó là $\dim S$ |
| Toạ độ **duy nhất** | mỗi $\mathbf{v}\in S$ viết được **đúng một cách** theo cơ sở |
| Cơ sở chuẩn của $\mathbb{R}^m$ | $\mathbf{e}_1,\ldots,\mathbf{e}_m$ — cột của ma trận đơn vị |

Tính duy nhất của toạ độ **chính là** tính độc lập tuyến tính phát biểu lại: hai biểu diễn khác nhau trừ nhau cho một tổ hợp không tầm thường bằng $\mathbf 0$.

## 4. Bốn không gian con của một ma trận

Với $A_{m\times n}$:

| Không gian | Định nghĩa | Chiều | Sống trong |
|---|---|---|---|
| Không gian cột $C(A)$ | span các cột | $r$ | $\mathbb{R}^m$ |
| Không gian hàng $C(A^\top)$ | span các hàng | $r$ | $\mathbb{R}^n$ |
| Hạt nhân $N(A)$ | $\{\mathbf x : A\mathbf x=\mathbf 0\}$ | $n-r$ | $\mathbb{R}^n$ |
| Hạt nhân trái $N(A^\top)$ | $\{\mathbf y: A^\top\mathbf y=\mathbf 0\}$ | $m-r$ | $\mathbb{R}^m$ |

với $r = \text{rank}(A)$. Quan hệ $\dim C(A)+\dim N(A)=n$ gọi là **định lý hạng–số khuyết** (rank–nullity), và nó trả lời trực tiếp câu "hệ có bao nhiêu nghiệm" ở [[Systems of Linear Equations]].

Không gian hàng và hạt nhân **trực giao với nhau** — đó là hình học của cả câu chuyện. → [[Dot Product and Norms]]

## 5. Trong bài giảng: không gian payoff

Không gian **contingent claims** là $\mathbb{R}^m$ ($m$ trạng thái thị trường). Payoff của các tài sản là các vector trong đó; danh mục là **tổ hợp tuyến tính**.

- Không gian payoff đạt được = **không gian cột** của ma trận giá $A$.
- Bằng cả $\mathbb{R}^m$ ⟹ mọi claim nhân bản được ⟹ **complete market**.
- Nhỏ hơn ⟹ có claim không nhân bản được ⟹ **incomplete**.

Bài giảng minh hoạ trực tiếp: với $n=2$ tài sản (bond + stock) và $m=2$ trạng thái (up/down), hai vector payoff độc lập là **cơ sở** của $\mathbb{R}^2$ ⟹ mọi payoff giải được. → [[Contingent Claims and Replication]]

Bài giảng cũng nêu điều kiện thực tế của mô hình: giá không đổi theo khối lượng mua, và **không hạn chế bán khống** — nếu không, tập danh mục khả thi không còn là một không gian vector (không đóng với $c<0$).

## 6. Cạm bẫy

1. **Quên kiểm $\mathbf{0}\in S$.** Phép kiểm rẻ nhất.
2. **Nhầm span với cơ sở.** Span có thể chứa vector thừa.
3. **Nghĩ cơ sở duy nhất.** Vô số cơ sở; chỉ **số lượng** vector là bất biến.
4. **Nhầm chiều với số vector đang có.** $\dim = $ số vector trong **một cơ sở**, không phải số vector bạn liệt kê.
5. **Áp khái niệm không gian con cho tập có ràng buộc dấu.** Danh mục "long-only" không phải không gian con — đây chính là lý do bài giảng phải giả định bán khống tự do.
6. **Quên hai không gian sống ở hai chiều khác nhau.** $C(A)\subseteq\mathbb{R}^m$ còn $N(A)\subseteq\mathbb{R}^n$.

## 7. Checklist áp dụng
- [ ] $\mathbf 0$ có thuộc tập không?
- [ ] Tập có đóng với nhân vô hướng (kể cả **âm**) và với cộng không?
- [ ] Nếu cần cơ sở: đã kiểm **cả hai** điều kiện (độc lập + span) chưa?
- [ ] $\dim$ bằng bao nhiêu? Có khớp rank–nullity không?
- [ ] Không gian đang xét sống trong $\mathbb{R}^m$ hay $\mathbb{R}^n$?
- [ ] Trong bài ứng dụng: có ràng buộc nào (dấu, tổng bằng 1) phá tính không gian con không?
- [ ] Toạ độ theo cơ sở này có duy nhất không? (nếu không → tập không độc lập)

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 20:23–21:22: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 3 (*The Four Fundamental Subspaces*): https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Linear combinations, span, and basis vectors*: https://www.3blue1brown.com/lessons/span
- MIT OCW 18.06 — *Linear Algebra*, Lecture 5–10: https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

## Liên kết
[[Linear Independence]] · [[Matrix as Columns]] · [[Systems of Linear Equations]] · [[Contingent Claims and Replication]] · [[Sets Functions and Relations]] · [[Math]]
