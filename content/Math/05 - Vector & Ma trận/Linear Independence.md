---
tags: [math, linear-algebra, foundations]
status: evergreen
---
# Linear Independence

> Câu hỏi: *"có vector nào thừa không?"* Nó quyết định ma trận có nghịch đảo không, hệ phương trình có nghiệm duy nhất không, và — trong bài giảng MIT — thị trường có **đầy đủ** hay không.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 19:25–20:23.

## 1. Định nghĩa

$\mathbf{v}_1,\ldots,\mathbf{v}_p$ **độc lập tuyến tính** nếu
$$c_1\mathbf{v}_1+\cdots+c_p\mathbf{v}_p=\mathbf{0} \ \Longrightarrow\ c_1=\cdots=c_p=0$$

Tức: **cách duy nhất** tổ hợp ra vector 0 là lấy mọi hệ số bằng 0 (tổ hợp tầm thường).

**Phụ thuộc tuyến tính** = tồn tại tổ hợp **không tầm thường** cho $\mathbf{0}$ ⟺ ít nhất một vector viết được thành tổ hợp của các vector còn lại ⟺ có vector **thừa**.

Bài giảng phát biểu trực giác cho hai vector: độc lập nghĩa là $\mathbf v$ và $\mathbf w$ **không thẳng hàng** với nhau khi cùng xuất phát từ gốc.

## 2. Cách kiểm

| Số vector | Cách nhanh nhất |
|---|---|
| $2$ | có phải bội của nhau không? |
| $p$ vector trong $\mathbb{R}^m$, $p>m$ | **luôn phụ thuộc** — không cần tính |
| $p = m$ | $\det \ne 0$? → [[Systems of Linear Equations]] |
| $p < m$ | rank của ma trận $= p$? (khử Gauss) |
| bất kỳ, có $\mathbf 0$ | **luôn phụ thuộc** |

> [!note] Quy tắc đếm miễn phí
> Không bao giờ có nhiều hơn $m$ vector độc lập trong $\mathbb{R}^m$. Ba vector trong mặt phẳng luôn phụ thuộc. Quy tắc này giải được nhiều bài mà không cần tính gì.

## 3. Vì sao nó quan trọng — bốn tương đương

Với ma trận vuông $A_{m\times m}$, các mệnh đề sau **tương đương**:

| | |
|---|---|
| Cột của $A$ độc lập tuyến tính | $\det A \ne 0$ |
| $A$ khả nghịch | rank $A = m$ |
| $A\mathbf{x}=\mathbf{b}$ có nghiệm **duy nhất** với mọi $\mathbf b$ | $A\mathbf{x}=\mathbf{0}$ chỉ có nghiệm $\mathbf x=\mathbf 0$ |
| $0$ **không** là eigenvalue | cột của $A$ span $\mathbb{R}^m$ |

Đây là "định lý ma trận khả nghịch" — bảng đáng thuộc nhất trong đại số tuyến tính. Mọi mục trong bảng là **cùng một sự thật** phát biểu bằng từ vựng khác nhau. → [[Eigenvalues and Eigenvectors]]

## 4. Trong bài giảng: thị trường đầy đủ

Ma trận payoff $A$ ($n$ tài sản × $m$ trạng thái) có cột độc lập ⟺ mỗi payoff sinh ra bởi **đúng một** danh mục.

- Cột **span** toàn không gian ⟹ mọi contingent claim đều nhân bản được ⟹ **market completeness**.
- Cột phụ thuộc ⟹ có danh mục khác 0 với payoff bằng 0 ở mọi trạng thái ⟹ ứng viên cho **arbitrage**.

Toàn bộ [[No-Arbitrage and Pricing Measure]] là bài toán này. Và điều kiện "pricing measure duy nhất" chính là "cột độc lập" nói bằng ngôn ngữ xác suất.

**Trong hồi quy:** cột phụ thuộc = **đa cộng tuyến** (multicollinearity) ⟹ $X^\top X$ không khả nghịch ⟹ hệ số hồi quy không xác định. → [[ML]], [[Quant]]

## 5. Trực giao vs độc lập

$$\text{trực giao (khác } \mathbf 0) \Rightarrow \text{độc lập}, \qquad \text{độc lập} \not\Rightarrow \text{trực giao}$$

$(1,0)$ và $(1,1)$ độc lập nhưng không trực giao. Quá trình **Gram–Schmidt** biến một tập độc lập thành tập trực giao span cùng không gian — nền của phân rã QR ([[Matrix Decompositions]]).

## 6. Cạm bẫy

1. **Kiểm từng cặp rồi kết luận cả tập độc lập.** Ba vector có thể đôi một không tỉ lệ mà vẫn phụ thuộc: $(1,0),(0,1),(1,1)$.
2. **Quên rằng tập chứa $\mathbf{0}$ luôn phụ thuộc.**
3. **Nhầm "độc lập tuyến tính" với "độc lập" trong xác suất.** Hai khái niệm khác nhau hoàn toàn.
4. **Nghĩ độc lập ⟹ trực giao.**
5. **Bỏ qua phụ thuộc "gần đúng".** Trong tính toán số, cột gần phụ thuộc làm $A$ **ill-conditioned** — nghịch đảo tồn tại về lý thuyết nhưng vô dụng về số học. Kiểm bằng số điều kiện, không phải bằng $\det$.
6. **Đếm sai chiều.** $p>m$ thì khỏi tính.

## 7. Checklist áp dụng
- [ ] Có bao nhiêu vector, trong không gian mấy chiều? ($p>m$ → xong ngay)
- [ ] Có vector $\mathbf 0$ trong tập không?
- [ ] Nếu $p=m$: $\det \ne 0$ chưa?
- [ ] Nếu $p<m$: rank sau khử Gauss có bằng $p$ không?
- [ ] Nếu phụ thuộc — đã chỉ ra **tổ hợp cụ thể** cho $\mathbf 0$ chưa?
- [ ] Với dữ liệu thật: có kiểm số điều kiện (gần phụ thuộc) không, chứ không chỉ $\det$?
- [ ] Trong bài tài chính: cột phụ thuộc có nghĩa là gì — thừa tài sản, hay có arbitrage?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 19:25–20:23: https://www.youtube.com/watch?v=0uimNNIuUyY
- Strang — *Introduction to Linear Algebra*, §3.4: https://math.mit.edu/~gs/linearalgebra/
- 3Blue1Brown — *Linear combinations, span, and basis vectors*: https://www.3blue1brown.com/lessons/span
- Wikipedia — *Invertible matrix theorem*: https://en.wikipedia.org/wiki/Invertible_matrix#The_invertible_matrix_theorem

## Liên kết
[[Vector Spaces and Basis]] · [[Systems of Linear Equations]] · [[Dot Product and Norms]] · [[No-Arbitrage and Pricing Measure]] · [[Matrix Decompositions]] · [[Math]]
