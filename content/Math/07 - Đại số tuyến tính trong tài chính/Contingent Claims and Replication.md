---
tags: [math, linear-algebra, finance]
status: evergreen
---
# Contingent Claims and Replication

> Định giá một quyền chọn **không** cần biết xác suất thị trường lên hay xuống. Chỉ cần giải một hệ hai phương trình hai ẩn — và đó là một trong những ý tưởng đẹp nhất trong toàn bộ tài chính định lượng.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 51:43–1:06:52 — gồm cả đoạn hỏi đáp khi một sinh viên hỏi contingent claim là gì và một sinh viên khác trả lời rằng cần bán khống.

## 1. Contingent claim là gì

Giảng viên định nghĩa khi được hỏi: *"The contingent claim is a payoff that is contingent upon the state of the market at that time."*

$$C_T = \begin{cases} C_T^u & \omega = u\\ C_T^d & \omega = d\end{cases} \qquad\qquad C_0 = ?$$

Nói cách khác: một contingent claim **là** một vector trong không gian payoff $\mathbb{R}^m$. Câu hỏi duy nhất là giá của nó tại $t=0$.

**Ví dụ của bài giảng — quyền chọn mua (call)** với giá thực hiện $K$ thoả $S_T^d < K < S_T^u$:
$$C_T^u = S_T^u - K, \qquad C_T^d = 0$$
Điều kiện $S_T^d<K<S_T^u$ là để quyền chọn "thú vị" — nếu $K$ nằm ngoài khoảng, payoff là tầm thường.

## 2. Danh mục nhân bản

Tìm $(\pi_B,\pi_S)$ sao cho danh mục **khớp payoff của claim ở mọi trạng thái**:

$$\begin{cases}\pi_B B_T + \pi_S S_T^u = C_T^u\\[2pt] \pi_B B_T + \pi_S S_T^d = C_T^d\end{cases} \qquad\Longleftrightarrow\qquad A\boldsymbol{\pi}=\mathbf{C}_T$$

Nếu giải được, thì **theo luật một giá**:
$$\boxed{C_0 = \pi_B B_0 + \pi_S S_0}$$

Lập luận: hai thứ có payoff **giống hệt nhau ở mọi trạng thái** phải có cùng giá hôm nay. Nếu không, mua cái rẻ bán cái đắt là arbitrage. → [[Arbitrage Portfolios]]

**Giải hệ $2\times2$:**
$$\pi_S = \frac{C_T^u-C_T^d}{S_T^u-S_T^d} \qquad \pi_B = \frac{C_T^d - \pi_S S_T^d}{B_T}$$

$\pi_S$ chính là **delta** của quyền chọn — độ nhạy của giá claim theo giá cổ phiếu. Với call: $\pi_S = \frac{S_T^u-K}{S_T^u-S_T^d} \in (0,1)$.

Câu trả lời của sinh viên trong lớp cũng đúng: nhân bản call cần $\pi_B<0$ — tức **vay tiền** (bán khống trái phiếu) để mua cổ phiếu. → [[Short Selling and Zero-Cost Portfolios]]

## 3. Xác suất không xuất hiện ở đâu cả

Đây là điểm quan trọng nhất của cả note.

$C_0$ chỉ phụ thuộc vào $B_0, B_T, S_0, S_T^u, S_T^d, K$. **Không** có $P(u)$ hay $P(d)$ trong công thức.

Hai nhà đầu tư có niềm tin hoàn toàn khác nhau về xác suất thị trường lên vẫn phải đồng ý về giá quyền chọn — nếu không, người này arbitrage được người kia. Định giá bằng nhân bản **thay thế** định giá bằng kỳ vọng.

Đây là hạt nhân của Black–Scholes: drift của cổ phiếu (kỳ vọng lợi suất) **không** xuất hiện trong công thức. → [[Quant]], [[No-Arbitrage and Pricing Measure]]

## 4. Hình học: khi nào giải được

Bài giảng vẽ trong không gian $(C_T^d, C_T^u)$ — trục hoành là payoff ở trạng thái xuống, trục tung ở trạng thái lên:

- Trái phiếu là vector $(B_T, B_T)$ — nằm trên **đường phân giác** (trả như nhau ở cả hai trạng thái).
- Cổ phiếu là vector $(S_T^d, S_T^u)$ — lệch khỏi phân giác vì trả nhiều hơn khi thị trường lên.
- Call là vector $(0, S_T^u-K)$ — nằm trên trục tung.

Câu hỏi "nhân bản được không" = "$\mathbf{C}_T$ có nằm trong **span** của hai vector kia không?"

$$\text{Giải được} \iff \{\mathbf{b}, \mathbf{s}\} \text{ độc lập tuyến tính} \iff S_T^u \ne S_T^d \iff \det A \ne 0$$

Hai vector độc lập trong $\mathbb{R}^2$ ⟹ chúng là **cơ sở** ⟹ span toàn bộ mặt phẳng ⟹ **mọi** contingent claim nhân bản được. → [[Linear Independence]], [[Vector Spaces and Basis]]

Bài giảng đi qua đúng chuỗi hình ảnh này: danh mục long-only (trọng số dương tổng bằng 1) phủ một **đoạn** giữa hai vector; cho phép bán khống mở rộng ra **toàn mặt phẳng**, kể cả payoff âm.

## 5. Tổng quát: $n$ tài sản, $m$ trạng thái

$$A\mathbf{q}=\mathbf{C}_T \qquad A \in \mathbb{R}^{m\times n}$$

| Điều kiện | Kết luận |
|---|---|
| $\text{rank}(A)=m$ | **mọi** claim nhân bản được ⟹ thị trường **đầy đủ** |
| $\text{rank}(A)<m$ | có claim không nhân bản được ⟹ **không đầy đủ** |
| $n>m$, rank $=m$ | nhân bản được nhưng **không duy nhất** ⟹ nếu giá khác nhau → arbitrage |
| $\mathbf{C}_T \notin C(A)$ | claim cụ thể này không nhân bản được; chỉ chặn được giá trên/dưới |

Đây đúng là bài toán $A\mathbf{x}=\mathbf{b}$ của [[Systems of Linear Equations]], mặc áo tài chính.

Thị trường thật **không đầy đủ** ($m$ rất lớn, $n$ hữu hạn) — nên định giá thật cho một **khoảng** giá, không một điểm. Đó là lý do bid–ask spread tồn tại về mặt lý thuyết, không chỉ vì chi phí.

## 6. Cạm bẫy

1. **Cố đưa xác suất vào công thức.** Nó không ở đó.
2. **Quên kiểm $S_T^u\ne S_T^d$.** Nếu bằng nhau, $A$ suy biến, không nhân bản được.
3. **Nhầm dấu của $\pi_B$.** Nhân bản call cần vay tiền ⟹ $\pi_B<0$.
4. **Cho rằng nhân bản luôn được.** Chỉ khi thị trường đầy đủ.
5. **Áp lập luận một kỳ cho nhiều kỳ mà không tái cân bằng.** Nhiều kỳ cần **dynamic replication** — điều chỉnh danh mục mỗi bước, và đó chính là hedging trong Black–Scholes.
6. **Bỏ qua chi phí giao dịch của việc tái cân bằng.** Nhân bản động trong thực tế tốn tiền, và chi phí đó là lý do quyền chọn thật đắt hơn giá lý thuyết.
7. **Quên $C_0$ chỉ đúng nếu không arbitrage.** Nó là giá **phải là**, không phải giá **đang là**.

## 7. Checklist áp dụng
- [ ] Đã viết payoff của claim thành vector trên **mọi** trạng thái chưa?
- [ ] $\det A \ne 0$ chưa? (hai payoff tài sản có thật sự khác nhau không?)
- [ ] Hệ có nghiệm không? Nghiệm có duy nhất không?
- [ ] Dấu của mỗi $\pi_j$ có hợp lý không? (call → vay tiền, mua cổ phiếu)
- [ ] Có xác suất nào lọt vào công thức không? (nếu có → sai)
- [ ] $\text{rank}(A)$ so với $m$: thị trường đầy đủ chưa?
- [ ] Nếu nhiều kỳ: đã tính chi phí tái cân bằng chưa?
- [ ] Giá tìm được là giá **không-arbitrage**, đã so với giá thị trường chưa?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 51:43–1:06:52: https://www.youtube.com/watch?v=0uimNNIuUyY
- Albanese & Campolieti — *Advanced Derivatives Pricing and Risk Management*: https://www.elsevier.com/books/advanced-derivatives-pricing-and-risk-management/albanese/978-0-12-047682-4
- Cox, Ross, Rubinstein — *Option Pricing: A Simplified Approach*: https://www.sciencedirect.com/science/article/pii/0304405X79900151
- Hull — *Options, Futures, and Other Derivatives*, ch. 13: https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938

## Liên kết
[[Single-Period Market Model]] · [[No-Arbitrage and Pricing Measure]] · [[Systems of Linear Equations]] · [[Linear Independence]] · [[Vector Spaces and Basis]] · [[Quant]] · [[Math]]
