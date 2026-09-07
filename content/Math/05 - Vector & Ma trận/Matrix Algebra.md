---
tags: [math, linear-algebra]
status: evergreen
---
# Matrix Algebra

> Mọi luật đại số ma trận đều "hiển nhiên" — trừ hai cái. Bài giảng MIT nói đúng chỗ đó: **chuyển vị của tích đảo thứ tự**, và **phép nhân không giao hoán**.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 21:25–28:00.

## 1. Ma trận và chuyển vị

$$A_{m\times n} = \begin{bmatrix} a_{11} & \cdots & a_{1n}\\ \vdots & & \vdots\\ a_{m1}&\cdots&a_{mn}\end{bmatrix}, \qquad (A^\top)_{ij}=a_{ji}$$

$A^\top$ là $n\times m$ — lật hàng thành cột. Nhân vô hướng: $cA$ nhân **từng** phần tử.

## 2. Phép nhân — điều kiện conformal

$$A_{m\times n}B_{n\times p} = C_{m\times p}, \qquad c_{ij}=\sum_{k=1}^n a_{ik}b_{kj}$$

**Điều kiện:** số **cột** của $A$ = số **hàng** của $B$. Bài giảng gọi là *conformal*. Kích thước trong triệt tiêu, kích thước ngoài còn lại:
$$(m\times \underline{n})(\underline{n}\times p)\to(m\times p)$$

> [!note] Giảng viên nói thẳng về hai cách nhìn
> *"When I learned linear algebra decades ago, I used these double sums, which were not very intuitive to interpret… things are much easier to prove with this other notation."* Cách nhìn "other notation" là **cột** — xem [[Matrix as Columns]]. Tổng kép ở trên đúng nhưng gần như vô dụng để chứng minh; giữ nó làm định nghĩa, dùng cách nhìn cột để làm việc.

## 3. Luật — và hai ngoại lệ

| Luật | Có đúng? |
|---|---|
| $A+B = B+A$ | ✅ |
| $(A+B)+C = A+(B+C)$ | ✅ |
| $(AB)C = A(BC)$ | ✅ kết hợp |
| $A(B+C)=AB+AC$ | ✅ phân phối |
| $c(AB)=(cA)B$ | ✅ |
| $(A^\top)^\top = A$ | ✅ |
| $(A+B)^\top = A^\top+B^\top$ | ✅ |
| $(AB)^\top = B^\top A^\top$ | ⚠️ **đảo thứ tự** |
| $AB = BA$ | ❌ **sai** |
| $AB=0 \Rightarrow A=0$ hoặc $B=0$ | ❌ sai |
| $AB=AC \Rightarrow B=C$ | ❌ sai (trừ khi $A$ khả nghịch) |

**Vì sao $(AB)^\top=B^\top A^\top$:** kiểm kích thước. $AB$ là $m\times p$ nên $(AB)^\top$ là $p\times m$. $A^\top B^\top$ là $(n\times m)(p\times n)$ — thậm chí không conformal. Chỉ $B^\top A^\top = (p\times n)(n\times m)$ chạy được. Kích thước tự nói ra công thức đúng.

**Vì sao không giao hoán:** ngay cả khi cả hai tích tồn tại (A, B vuông cùng cỡ), kết quả vẫn khác.
$$\begin{bmatrix}0&1\\0&0\end{bmatrix}\begin{bmatrix}0&0\\1&0\end{bmatrix}=\begin{bmatrix}1&0\\0&0\end{bmatrix} \ne \begin{bmatrix}0&0\\0&1\end{bmatrix}=\begin{bmatrix}0&0\\1&0\end{bmatrix}\begin{bmatrix}0&1\\0&0\end{bmatrix}$$
Ví dụ này cũng cho $AB\ne0$ với... thực ra nó cho thấy tích hai ma trận khác 0 có thể có dạng bất ngờ. Ví dụ $AB=0$ với $A,B\ne0$: $\begin{bmatrix}1&0\\0&0\end{bmatrix}\begin{bmatrix}0&0\\0&1\end{bmatrix}=0$.

**Ý nghĩa:** ma trận là **phép biến đổi**; thực hiện theo thứ tự khác cho kết quả khác. Xoay rồi chiếu ≠ chiếu rồi xoay.

## 4. Hai cách đọc $A\mathbf{v}$

Bài giảng nhấn mạnh cách thứ nhất:

$$A\mathbf{v} = v_1\mathbf{a}_1 + v_2\mathbf{a}_2+\cdots+v_n\mathbf{a}_n \qquad \text{(tổ hợp tuyến tính các cột)}$$
$$(A\mathbf{v})_i = \mathbf{a}^{(i)}\cdot\mathbf{v} \qquad\text{(tích vô hướng của hàng }i\text{ với } \mathbf v)$$

Cách 1 giải thích **vì sao** $A\mathbf v$ nằm trong không gian cột và vì sao tính khả nghịch là về tính độc lập của cột. Cách 2 tiện để tính tay. → [[Matrix as Columns]], [[Dot Product and Norms]]

## 5. Cạm bẫy

1. **$(AB)^\top = A^\top B^\top$.** Kiểm kích thước là ra ngay.
2. **Giả định giao hoán.** Nhất là khi rút gọn biểu thức: $(A+B)^2 = A^2+AB+BA+B^2$, **không** phải $A^2+2AB+B^2$.
3. **Rút gọn $A$ khỏi $AB=AC$.** Cần $A$ khả nghịch.
4. **Kết luận $A=0$ hoặc $B=0$ từ $AB=0$.** Ma trận có ước của 0.
5. **Nhân sai chiều.** Luôn viết kích thước dưới mỗi ký hiệu trước khi nhân.
6. **Nhầm $AB$ với tích từng phần tử** (Hadamard, `*` trong numpy — `@` mới là nhân ma trận).
7. **$(A^{-1})^\top$ vs $(A^\top)^{-1}$.** Chúng **bằng nhau**, nhưng $(AB)^{-1}=B^{-1}A^{-1}$ cũng đảo thứ tự — cùng mẫu với chuyển vị.

## 6. Checklist áp dụng
- [ ] Đã viết kích thước $(m\times n)$ dưới mỗi ma trận chưa?
- [ ] Tích có conformal không? (cột trái = hàng phải)
- [ ] Kết quả có kích thước bao nhiêu?
- [ ] Có bước nào đang ngầm giả định $AB=BA$ không?
- [ ] Khi chuyển vị hoặc nghịch đảo một tích — đã **đảo thứ tự** chưa?
- [ ] Khi rút gọn — ma trận bị rút có khả nghịch không?
- [ ] Trong code: đang dùng `@`/`matmul` hay `*`?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 21:25–28:00: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, ch. 2: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Matrix multiplication as composition*: https://www.3blue1brown.com/lessons/matrix-multiplication
- Petersen & Pedersen — *The Matrix Cookbook*: https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf

## Liên kết
[[Matrix as Columns]] · [[Special Matrices]] · [[Systems of Linear Equations]] · [[Dot Product and Norms]] · [[Vectors]] · [[Math]]
