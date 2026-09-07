---
tags: [math, linear-algebra, foundations]
status: evergreen
---
# Vectors

> Một danh sách số có thứ tự — và hai cách nhìn nó bằng hình học. Chọn đúng cách nhìn cho đúng bài toán là kỹ năng thật; định nghĩa thì tầm thường.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md` (MIT 18.642, Peter Kempthorne), phút 1:07–8:09.

## 1. Định nghĩa và ký hiệu

$$\mathbf{v} = \begin{bmatrix} v_1\\ v_2\\ \vdots\\ v_m\end{bmatrix} \in \mathbb{R}^m$$

Quy ước trong bài giảng: **chữ đậm** cho vector, mặc định là **vector cột**. Vector hàng là $\mathbf{v}^\top$.

**Vector đặc biệt:** $\mathbf{0}$ (toàn 0), $\mathbf{1}$ (toàn 1), $\mathbf{e}_j$ (toàn 0 trừ vị trí $j$ bằng 1). Ba cái này xuất hiện liên tục — xem [[Special Matrices]].

## 2. Hai cách nhìn hình học

| Cách nhìn | Là gì | Dùng khi |
|---|---|---|
| **Điểm** | một điểm trong $\mathbb{R}^m$ | biểu diễn trạng thái, dữ liệu, payoff |
| **Đoạn thẳng có hướng** | mũi tên từ gốc tới điểm đó | cộng vector, chiếu, độ dài |

Bài giảng nhấn: *"Depending on our application, both of these can be useful."* Ví dụ trong chính bài giảng: khi vẽ **không gian contingent claims** ([[Contingent Claims and Replication]]), danh mục dài dùng biểu diễn **điểm** thì dễ nhìn hơn mũi tên.

## 3. Phép toán

| Phép | Công thức | Ý nghĩa |
|---|---|---|
| Nhân vô hướng | $c\mathbf{v}=(cv_1,\ldots,cv_m)^\top$ | giãn/co, $c<0$ đổi chiều |
| Cộng | $(\mathbf{v}+\mathbf{w})_i = v_i+w_i$ | quy tắc hình bình hành |
| Tích vô hướng | $\mathbf{v}\cdot\mathbf{w}=\sum_i v_iw_i$ | → [[Dot Product and Norms]] |

Hai phép đầu là **toàn bộ** tiên đề của một không gian vector — xem [[Vector Spaces and Basis]].

## 4. Ví dụ nền của bài giảng: danh mục đầu tư

Đây là ví dụ mà cả nửa sau bài giảng xây trên:

- $\mathbf{p}(t) \in \mathbb{R}_+^{500}$ — giá đóng cửa của 500 cổ phiếu S&P 500. **Dương** ⟹ sống trong góc dương $\mathbb{R}_+$.
- $\mathbf{q}(t) \in \mathbb{R}^{500}$ — số cổ phiếu nắm giữ. Có thể **âm** (bán khống).
- Giá trị danh mục: $V(t) = \mathbf{q}(t)\cdot\mathbf{p}(t) = \sum_j q_j(t)p_j(t)$

Thêm **tiền mặt** làm tài sản thứ 0: $p_0(t) \equiv \char36 1$ cố định, $q_0(t)$ = số đô đang giữ. Thủ thuật này biến "tiền mặt + cổ phiếu" thành một vector duy nhất trong $\mathbb{R}^{501}$, và làm mọi công thức sau gọn hẳn.

Chi tiết đầy đủ về PnL, rebalancing, và bẫy thời điểm ở [[Portfolio as a Vector]].

## 5. Cạm bẫy

1. **Nhầm vector hàng với vector cột.** $\mathbf{v}^\top\mathbf{w}$ là **số**; $\mathbf{v}\mathbf{w}^\top$ là **ma trận** $m\times m$. Kích thước quyết định.
2. **Cộng vector khác chiều.** Không định nghĩa.
3. **Nghĩ vector "có vị trí".** Vector chỉ có độ lớn và hướng; mũi tên vẽ từ gốc chỉ là quy ước.
4. **Quên ràng buộc dấu.** Giá dương, số lượng thì không — bỏ qua chỗ này là bỏ qua cả khái niệm bán khống.
5. **Nhân hai vector "từng phần tử" rồi gọi là tích.** Đó là tích Hadamard, không phải tích vô hướng, và nó cho vector chứ không cho số.
6. **Trộn đơn vị trong một vector.** $\mathbf{p}$ là giá (đô/cổ), $\mathbf{q}$ là số lượng (cổ) — tích vô hướng ra đô. Cộng thẳng $\mathbf{p}+\mathbf{q}$ thì vô nghĩa dù kích thước khớp.

## 6. Checklist áp dụng
- [ ] Vector này là cột hay hàng? Kích thước bao nhiêu?
- [ ] Các thành phần có cùng đơn vị không?
- [ ] Có ràng buộc dấu không (giá dương, xác suất trong $[0,1]$)?
- [ ] Đang cần cách nhìn "điểm" hay "mũi tên" cho bài này?
- [ ] Nếu là dữ liệu tài chính: chỉ số $t$ ứng với thời điểm nào — đầu ngày hay cuối ngày?
- [ ] Phép nhân đang dùng là tích vô hướng (ra số) hay từng phần tử (ra vector)?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 1:07–8:09: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 1: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Vectors, what even are they?*: https://www.3blue1brown.com/lessons/vectors
- MIT OCW 18.06 — *Linear Algebra*: https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

## Liên kết
[[Dot Product and Norms]] · [[Vector Spaces and Basis]] · [[Linear Independence]] · [[Portfolio as a Vector]] · [[Matrix Algebra]] · [[Math]]
