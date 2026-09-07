---
tags: [math, linear-algebra, finance]
status: evergreen
---
# Portfolio as a Vector

> Danh mục là vector, giá là vector, giá trị là **tích vô hướng**. Từ đó mọi phép tính danh mục thành đại số tuyến tính — và một cạm bẫy thời gian xuất hiện ngay: danh mục ở thời điểm $t$ được quyết định ở **cuối ngày $t-1$**.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 2:37–11:11. Phần tài chính đầy đủ (đo lường hiệu quả, tối ưu danh mục) sống ở [[Quant]]; ở đây giữ mặt đại số.

## 1. Ba vector

$$\mathbf{p}(t) \in \mathbb{R}_+^{n}, \qquad \mathbf{q}(t)\in\mathbb{R}^{n}, \qquad V(t)=\mathbf{q}(t)\cdot\mathbf{p}(t)=\sum_{j} q_j(t)p_j(t)$$

| Vector | Là gì | Ràng buộc |
|---|---|---|
| $\mathbf{p}(t)$ | giá đóng cửa | **dương** — sống trong $\mathbb{R}_+^n$ |
| $\mathbf{q}(t)$ | số cổ phiếu nắm giữ | dấu tùy ý ⟹ bán khống |
| $V(t)$ | giá trị danh mục | vô hướng |

Bài giảng dùng $n=500$ (S&P 500). Thêm **tiền mặt** làm tài sản thứ $0$: $p_0(t)\equiv\char36 1$, $q_0(t)$ = số đô. Thủ thuật này làm mọi công thức sau thành thuần đại số. → [[Vectors]], [[Dot Product and Norms]]

## 2. Rebalancing

Chuyển từ $\mathbf{q}(t)$ sang $\mathbf{q}(t+1)$ bằng cách điều chỉnh mỗi vị thế một lượng $\delta_j$:
$$q_j(t+1)=q_j(t)+\delta_j$$

**Điều kiện tự tài trợ** (self-financing) — bài giảng phát biểu là "không rút tiền ra khỏi tài khoản":
$$\sum_{j=0}^{n}\delta_j\,p_j(t) = 0 \qquad\Longleftrightarrow\qquad \boldsymbol{\delta}\cdot\mathbf{p}(t)=0$$

Đọc bằng hình học: $\boldsymbol\delta$ **trực giao** với $\mathbf p(t)$. Mọi thay đổi danh mục hợp lệ nằm trong siêu phẳng vuông góc với vector giá — một không gian con chiều $n$ trong $\mathbb{R}^{n+1}$. → [[Vector Spaces and Basis]]

## 3. PnL

Bài giảng lưu ý ngay từ vựng: **PnL** viết tắt của *profit and loss*, nhưng thường được đọc là "portfolio net gain".

$$\text{PnL}(t\to t+1) = V(t+1)-V(t) = \mathbf{q}(t+1)\cdot\big[\mathbf{p}(t+1)-\mathbf{p}(t)\big] = \mathbf{q}(t+1)\cdot\Delta\mathbf{p}$$

**Điểm mấu chốt:** số cổ phiếu là $\mathbf q(t+1)$ — cổ phiếu **được giữ qua** kỳ đó — nhân với thay đổi giá **trong** kỳ đó. Đây là cách duy nhất khớp về mặt thời gian.

## 4. Bẫy thời gian — look-ahead bias

> [!warning] Cảnh báo mạnh nhất trong cả phần này
> Bài giảng nói rõ: *"the $\mathbf q_t$ portfolio composition, while it's indexed by $t$, it's actually determined at the end of day $t-1$… one needs to be careful… that you're always using portfolios that are defined using only information up to a given time point."*

Ký hiệu $\mathbf{q}(t)$ **không** có nghĩa là "quyết định tại thời điểm $t$". Nó có nghĩa là "vị thế **đang giữ trong** kỳ $t$", và nó được chọn ở **cuối kỳ $t-1$**, khi $\mathbf{p}(t)$ còn chưa biết.

Bài giảng cũng đưa ký hiệu **BOD / EOD** (beginning of day / end of day) để giữ chỗ này rõ ràng.

**Vi phạm điều này = look-ahead bias**, và nó là lỗi backtest phổ biến nhất và tốn kém nhất. Chiến lược nào "biết" $\mathbf p(t+1)$ khi chọn $\mathbf q(t+1)$ thì luôn lãi trong backtest và luôn lỗ ngoài đời. → [[Quant]]

Một mẹo kiểm: mọi công thức PnL phải là **tích vô hướng của một đại lượng đã biết trước kỳ với một đại lượng thực hiện trong kỳ**. Nếu cả hai thừa số đều là thông tin trong kỳ, có bug.

## 5. Danh mục hiệu

Bài giảng nêu: hiệu hai danh mục **cũng là** một danh mục.
$$\mathbf{d}(t)=\mathbf{q}(t)-\mathbf{w}(t) \qquad \text{PnL}(\mathbf d) = \text{PnL}(\mathbf q)-\text{PnL}(\mathbf w)$$

Đây chỉ là **tính tuyến tính** của tích vô hướng, nhưng nó là bước mở đường: nó cho phép trọng số âm, và trọng số âm cho ra bán khống, zero-cost, và arbitrage. → [[Short Selling and Zero-Cost Portfolios]]

Bài giảng nói thẳng: *"We often constrain portfolios to be long only… But there's no reason why we can't allow component weights in portfolios to be negative."*

## 6. Cạm bẫy

1. **Look-ahead bias.** Xem mục 4. Lỗi số một.
2. **Dùng $\mathbf q(t)$ thay vì $\mathbf q(t+1)$ trong PnL.** Sai một kỳ.
3. **Quên tài sản tiền mặt.** Công thức tự tài trợ không cân nếu thiếu $j=0$.
4. **Nhầm trọng số (weight) với số lượng (quantity).** $w_j = q_jp_j/V$ không thứ nguyên; $q_j$ là số cổ phiếu.
5. **Quên chi phí giao dịch.** Điều kiện $\boldsymbol\delta\cdot\mathbf p=0$ là mô hình không ma sát; thực tế $\boldsymbol\delta\cdot\mathbf p = -\text{cost}$.
6. **Cho rằng giá luôn dương là hiển nhiên.** Cổ phiếu thì đúng; hợp đồng tương lai và giá dầu năm 2020 thì không.
7. **Cộng PnL qua nhiều kỳ mà quên tái đầu tư.** Cộng được với PnL tuyệt đối, **không** cộng được với tỉ suất phần trăm.

## 7. Checklist áp dụng
- [ ] Mỗi vector: kích thước bao nhiêu? Có gồm tài sản tiền mặt không?
- [ ] $\mathbf q$ dùng trong công thức PnL có được xác định **trước** khi kỳ đó bắt đầu không?
- [ ] Chỉ số thời gian: BOD hay EOD?
- [ ] Điều kiện tự tài trợ $\boldsymbol\delta\cdot\mathbf p=0$ có thoả không? Có tính chi phí giao dịch không?
- [ ] Đang nói về số lượng $q_j$ hay trọng số $w_j$?
- [ ] Đơn vị của kết quả là đô hay phần trăm?
- [ ] Trong backtest: có dữ liệu nào ở thời điểm $t$ được dùng để quyết định ở thời điểm $\le t$ không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 2:37–11:11: https://www.youtube.com/watch?v=0uimNNIuUyY
- MIT OCW 18.642 — *Topics in Mathematics with Applications in Finance*: https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024
- Grinold & Kahn — *Active Portfolio Management*: https://www.mhprofessional.com/active-portfolio-management-9780070248823-usa
- López de Prado — *Advances in Financial Machine Learning* (backtest bias): https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086

## Liên kết
[[Vectors]] · [[Dot Product and Norms]] · [[Short Selling and Zero-Cost Portfolios]] · [[Arbitrage Portfolios]] · [[Quant]] · [[Math]]
