---
tags: [math, linear-algebra, finance]
status: evergreen
---
# Single-Period Market Model

> Mô hình rẻ nhất mà vẫn nói được điều thật: **hai thời điểm, $n$ tài sản, $m$ trạng thái**. Toàn bộ nó là một ma trận dương $A$ — và mọi câu hỏi về arbitrage, nhân bản, định giá đều thành câu hỏi về $A$.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 41:23–51:28 (dựng mô hình hai tài sản) và 1:06:52–1:08:15 (tổng quát hoá lên $n$ tài sản).

## 1. Khung mô hình

| Thành phần | Ký hiệu |
|---|---|
| Hai thời điểm | $t=0$ (biết) và $t=T$ (ngẫu nhiên) |
| $n$ tài sản | chỉ số $j=1..n$ |
| $m$ trạng thái | $\omega_1,\ldots,\omega_m$ |
| Giá ban đầu | $\mathbf{a}_0 \in \mathbb{R}_+^n$ — **biết** |
| Ma trận payoff | $A_{m\times n}$, $a_{ij}$ = giá tài sản $j$ ở trạng thái $\omega_i$ |
| Danh mục | $\mathbf{q}\in\mathbb{R}^n$ |

$$V_0 = \mathbf{q}\cdot\mathbf{a}_0 = \sum_j q_j a_{0j} \qquad\qquad V_T = A\mathbf{q} \in \mathbb{R}^m$$

$V_T$ là **vector**, không phải số — một giá trị cho mỗi trạng thái. Đây là chỗ toàn bộ chuyện thú vị bắt đầu.

Bài giảng nói $A$ là **ma trận dương** (mọi phần tử $>0$) vì giá tài sản dương. Chú ý: đây là nghĩa "positive matrix" chứ không phải "positive definite" — xem [[Special Matrices]].

## 2. Ví dụ hai tài sản của bài giảng

**Trái phiếu $B$** — không rủi ro:
$$B_0 \ \longrightarrow\ B_T = B_0(1+r_fT)$$

**Cổ phiếu $S$** — hai trạng thái:
$$S_0 \ \longrightarrow\ \begin{cases} S_T^u & \omega = u \ (\text{thị trường lên})\\ S_T^d & \omega = d \ (\text{xuống})\end{cases}$$

Ma trận payoff:
$$A = \begin{bmatrix} B_T & S_T^u \\ B_T & S_T^d\end{bmatrix} \qquad \text{(hàng = trạng thái, cột = tài sản)}$$

Danh mục $\boldsymbol\pi = (\pi_B, \pi_S)^\top$ cho:
$$V_0 = \pi_B B_0 + \pi_S S_0, \qquad V_T(\omega) = \pi_B B_T + \pi_S S_T^\omega$$

**Xác suất của $u$ và $d$ chưa được chỉ định** — bài giảng nói rõ điều này. Mô hình chỉ cần biết trạng thái nào **có thể** xảy ra. Đó là điều làm định giá không-arbitrage khác với định giá theo kỳ vọng. → [[No-Arbitrage and Pricing Measure]]

## 3. Bốn khái niệm lợi suất

Bài giảng định nghĩa cẩn thận — chúng khác nhau và hay bị lẫn:

| Tên | Công thức | Đơn vị |
|---|---|---|
| Lợi suất tuyệt đối | $B_T - B_0$ | tiền |
| Lợi suất phần trăm | $R_B = \dfrac{B_T-B_0}{B_0}$ | không thứ nguyên |
| Lãi suất trung bình theo kỳ | $r_f = \dfrac1T\cdot\dfrac{B_T-B_0}{B_0}$ | 1/thời gian |
| Lãi suất **phi rủi ro** | $r_f$ khi $B_T$ được **bảo đảm** | 1/thời gian |

Với lãi đơn: $B_T = B_0(1+r_fT)$ ⟹ $R_B = r_fT$.

> [!note] Ghi chú của giảng viên về "phi rủi ro"
> *"nothing in the world is risk-free. But when governments can print money to pay off their liabilities, then it essentially is a risk-free rate. And we worry less about it with countries with stronger economies."* — tức "risk-free" là một quy ước mô hình, không phải một sự thật.

## 4. Tổng quát lên $n$ tài sản

$$V_0(\mathbf{q}) = \mathbf{q}\cdot\mathbf{a}_0, \qquad V_T(\mathbf{q}) = A\mathbf{q}$$

Đọc bằng [[Matrix as Columns]]: cột $j$ của $A$ là **vector payoff của tài sản $j$**, và
$$A\mathbf{q}=\sum_j q_j\mathbf{a}_j$$
Payoff của danh mục là **cùng tổ hợp tuyến tính** của các payoff tài sản. Toàn bộ mô hình gọn trong câu này.

Ba câu hỏi trung tâm, và cả ba là câu hỏi về $A$:

| Câu hỏi | Dạng đại số tuyến tính |
|---|---|
| Có arbitrage không? | tồn tại $\mathbf q$ với $\mathbf a_0^\top\mathbf q\le0$, $A\mathbf q\ge0$, $\ne0$? → [[Arbitrage Portfolios]] |
| Thị trường có đầy đủ không? | $\text{rank}(A)=m$? (cột span $\mathbb{R}^m$) → [[Vector Spaces and Basis]] |
| Giá phải là bao nhiêu? | tồn tại $\mathbf q^*>0$ với $\mathbf a_0 = A^\top\mathbf q^*$? → [[No-Arbitrage and Pricing Measure]] |

## 5. Giả thiết của mô hình

Bài giảng liệt kê ở phút 1:06:18, và chúng đáng ghi lại đúng như vậy:

1. **Giá không đổi theo khối lượng** — mua nhiều không đẩy giá lên.
2. **Bán khống tự do**, không ràng buộc.
3. Không chi phí giao dịch (ngầm).
4. Không rủi ro đối tác (ngầm).
5. **Tập trạng thái $\{\omega_i\}$ đầy đủ và biết trước** (ngầm — và là giả thiết mạnh nhất).

Giả thiết 5 là chỗ mô hình xa thực tế nhất: nó giả định ta liệt kê được **mọi** kịch bản tương lai. Mọi thất bại mô hình lớn trong lịch sử tài chính đều là một trạng thái không có trong danh sách.

## 6. Cạm bẫy

1. **Nhầm chiều của $A$.** Hàng = trạng thái, cột = tài sản (theo quy ước bài giảng). Đổi quy ước thì mọi công thức phải chuyển vị.
2. **Đưa xác suất vào quá sớm.** Mô hình không cần chúng để trả lời câu hỏi arbitrage.
3. **Nhầm lãi suất với lợi suất.** Bảng mục 3.
4. **Nhầm lãi đơn với lãi kép.** $B_0(1+r_fT)$ vs $B_0e^{r_fT}$ → [[The Exponential Function]].
5. **Coi "risk-free" là thật.** Rủi ro quốc gia tồn tại.
6. **Bỏ sót trạng thái.** Giả thiết 5.
7. **Áp mô hình một kỳ cho bài toán nhiều kỳ.** Cần mô hình cây nhị phân / thời gian liên tục → [[Quant]].
8. **Quên mô hình là không ma sát.** Kết luận "arbitrage tồn tại" có thể biến mất khi thêm chi phí.

## 7. Checklist áp dụng
- [ ] Có bao nhiêu tài sản $n$, bao nhiêu trạng thái $m$? $A$ kích thước bao nhiêu?
- [ ] Hàng và cột của $A$ đại diện cho gì? (nhất quán với công thức đang dùng chứ?)
- [ ] Danh sách trạng thái có **đầy đủ** không? Có kịch bản nào bị bỏ?
- [ ] Có tài sản phi rủi ro trong mô hình không? Lãi đơn hay lãi kép?
- [ ] $\text{rank}(A)$ bằng bao nhiêu so với $m$? (quyết định completeness)
- [ ] Đã kiểm arbitrage **trước** khi định giá bất cứ thứ gì chưa?
- [ ] Giả thiết nào của mục 5 bị vi phạm trong bài toán thật?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 41:23–51:28, 1:06:52–1:08:15: https://www.youtube.com/watch?v=0uimNNIuUyY
- Albanese & Campolieti — *Advanced Derivatives Pricing and Risk Management*: https://www.elsevier.com/books/advanced-derivatives-pricing-and-risk-management/albanese/978-0-12-047682-4
- Pliska — *Introduction to Mathematical Finance: Discrete Time Models*: https://www.wiley.com/en-us/Introduction+to+Mathematical+Finance%3A+Discrete+Time+Models-p-9781557869456
- MIT OCW 18.642: https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024

## Liên kết
[[Contingent Claims and Replication]] · [[No-Arbitrage and Pricing Measure]] · [[Arbitrage Portfolios]] · [[Matrix as Columns]] · [[Special Matrices]] · [[Math]]
