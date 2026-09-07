---
tags: [math, linear-algebra, finance]
status: evergreen
---
# No-Arbitrage and Pricing Measure

> Đích đến của cả bài giảng: **không có arbitrage ⟺ tồn tại pricing measure dương**, và **thị trường đầy đủ ⟺ pricing measure duy nhất**. Hai mệnh đề này biến một câu hỏi kinh tế thành một câu hỏi đại số tuyến tính.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 1:09:44–1:13:42 — phần kết của nửa tài chính, gồm cả tham chiếu tới Albanese & Campolieti cho phần chứng minh.

## 1. Pricing measure

Gọi $\mathbf{q}^*=(q_1^*,\ldots,q_m^*)$ là một phân phối xác suất trên các trạng thái $\omega_1,\ldots,\omega_m$.

$\mathbf{q}^*$ là **pricing measure** nếu với **mọi** tài sản $j$:
$$\boxed{a_{0j} = d\cdot\mathbb{E}_{\mathbf{q}^*}\big[a_{Tj}\big] = d\sum_{i=1}^m q_i^*\,a_{ij}}$$

với $d$ = hệ số chiết khấu (thường $d = 1/(1+r_fT)$ hoặc $e^{-r_fT}$).

Bài giảng phát biểu: *"if the initial price of the $j$-th asset is the discounted expected terminal price of that $j$-th asset across the different states, then $\mathbf q^*$ is called a pricing measure."*

Dạng ma trận: $\mathbf{a}_0 = d\,A^\top\mathbf{q}^*$ — một hệ phương trình tuyến tính với ẩn là $\mathbf q^*$.

## 2. Hai định lý

**Định lý cơ bản thứ nhất (FTAP 1).**
$$\text{Không có arbitrage} \iff \exists\, \mathbf{q}^* \text{ với } q_i^*>0 \ \forall i$$

Bài giảng: *"If such a pricing measure exists, then there's no arbitrage. So it's no arbitrage if all of the $q_j^*$ are positive."*

> [!warning] Chữ **dương ngặt** là toàn bộ nội dung
> $q_i^*\ge0$ không đủ. Nếu một trạng thái nhận xác suất $0$, ta có thể xây danh mục lãi **chỉ** ở trạng thái đó, không lỗ ở đâu — đúng định nghĩa arbitrage ([[Arbitrage Portfolios]]). Mọi trạng thái **có thể xảy ra** phải được gán trọng số dương.

**Định lý cơ bản thứ hai (FTAP 2).**
$$\text{Không arbitrage + thị trường đầy đủ} \iff \mathbf{q}^* \text{ tồn tại và } \textbf{duy nhất}$$

Bài giảng: *"we say that the market is complete with no arbitrage if this pricing measure is unique."*

| Tình huống | Số pricing measure | Định giá |
|---|---|---|
| Có arbitrage | $0$ | mô hình hỏng |
| Không arbitrage, không đầy đủ | vô số | chỉ ra **khoảng** giá |
| Không arbitrage, đầy đủ | **đúng một** | ra **một** giá |

## 3. Vì sao là đại số tuyến tính, không phải xác suất

Điều kiện tồn tại $\mathbf q^*>0$ với $\mathbf{a}_0=dA^\top\mathbf{q}^*$ là **bổ đề Farkas** — định lý đối ngẫu của quy hoạch tuyến tính:

$$\underbrace{\nexists\, \mathbf{q}: \mathbf{a}_0^\top\mathbf q\le0,\ A\mathbf q\ge0,\ A\mathbf q \ne 0}_{\text{không arbitrage}} \iff \underbrace{\exists\, \mathbf{q}^*>0: \mathbf{a}_0 = dA^\top\mathbf{q}^*}_{\text{có pricing measure}}$$

Hai vế là **hai mặt của cùng một bài toán tuyến tính**: một là bài toán gốc (tìm danh mục), một là bài toán đối ngẫu (tìm giá trạng thái).

**Tính duy nhất** thì thuần tuý là rank: nghiệm của $A^\top\mathbf{q}^*=\mathbf{a}_0/d$ duy nhất ⟺ $A^\top$ có cột độc lập ⟺ $\text{rank}(A)=m$ ⟺ cột của $A$ span $\mathbb{R}^m$ ⟺ **thị trường đầy đủ**. → [[Linear Independence]], [[Systems of Linear Equations]]

Ba khái niệm — không arbitrage, market completeness, pricing measure — là **một khái niệm đại số** nhìn từ ba phía.

## 4. $\mathbf q^*$ không phải xác suất thật

Đây là chỗ dễ hiểu sai nhất.

| | Xác suất thực $P$ | Pricing measure $\mathbf q^*$ |
|---|---|---|
| Đến từ | niềm tin / dữ liệu lịch sử | **giá thị trường hiện tại** |
| Trả lời | "khả năng xảy ra bao nhiêu?" | "giá của $1$ đô ở trạng thái đó là bao nhiêu?" |
| Còn gọi là | physical / real-world measure | **risk-neutral measure**, $\mathbb{Q}$ |
| Dùng để | dự báo, quản trị rủi ro | **định giá** |

$q_i^*/d$ gọi là **state price** — giá hôm nay của một chứng khoán trả đúng $1$ đô nếu trạng thái $\omega_i$ xảy ra và $0$ nếu không (Arrow–Debreu security).

$\mathbf q^*$ chỉ **giống** một phân phối xác suất về mặt hình thức ($q_i^*>0$, $\sum q_i^*=1$). Nó gánh cả thông tin về khẩu vị rủi ro của thị trường. Dùng $\mathbf q^*$ để dự báo là sai; dùng $P$ để định giá cũng sai. → [[Quant]]

Điều này giải thích lại kết quả ở [[Contingent Claims and Replication]]: giá quyền chọn không phụ thuộc $P$, nhưng **phụ thuộc $\mathbf q^*$** — và $\mathbf q^*$ được đọc ra từ chính giá thị trường của các tài sản cơ sở.

## 5. Vì sao chuỗi này quan trọng

Bài giảng đóng lại: *"these models actually underlie much of option pricing theory and arbitrage relationships in quantitative finance."*

Toàn bộ Black–Scholes–Merton là phiên bản **thời gian liên tục, vô hạn trạng thái** của đúng ba mệnh đề trên. Chuyển sang liên tục thì Farkas thành định lý Girsanov, tổng thành tích phân, và ma trận $A$ thành một quá trình ngẫu nhiên — nhưng cấu trúc logic **không đổi**. → [[Quant]]

## 6. Cạm bẫy

1. **Cho $q_i^*\ge0$ là đủ.** Phải **dương ngặt**.
2. **Nhầm $\mathbf q^*$ với xác suất thực.** Bảng mục 4.
3. **Dùng $\mathbf q^*$ để dự báo hoặc tính VaR.** Sai measure.
4. **Quên hệ số chiết khấu $d$.**
5. **Cho rằng thị trường thật đầy đủ.** Hầu như không bao giờ — nên giá thật là một khoảng.
6. **Bỏ sót trạng thái.** Nếu $\omega$ nào đó không có trong mô hình, nó nhận trọng số $0$ ngầm — và mọi kết luận về "không arbitrage" sụp.
7. **Nghĩ không-arbitrage nghĩa là giá "đúng".** Nó chỉ nghĩa là giá **nhất quán với nhau**. Cả thị trường có thể sai cùng nhau mà vẫn không arbitrage.
8. **Nhầm chiều $A$ vs $A^\top$.** Pricing measure sống ở phía đối ngẫu.

## 7. Checklist áp dụng
- [ ] Danh sách trạng thái có đầy đủ không? Mỗi trạng thái có thể xảy ra thật không?
- [ ] Đã giải $\mathbf{a}_0 = dA^\top\mathbf{q}^*$ chưa? Nghiệm có tồn tại không?
- [ ] Mọi $q_i^*$ có **dương ngặt** không? (nếu có cái $\le0$ → mô hình có arbitrage)
- [ ] $\sum q_i^* = 1$ chưa?
- [ ] Nghiệm có duy nhất không? ($\text{rank}(A)=m$?) Nếu không → định giá cho khoảng, không cho điểm.
- [ ] Hệ số chiết khấu dùng lãi đơn hay lãi kép liên tục?
- [ ] Đang dùng $\mathbf q^*$ để **định giá** (đúng) hay để **dự báo** (sai)?
- [ ] Nếu định giá ra khoảng — khoảng đó có hẹp đủ để dùng được không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 1:09:44–1:13:42: https://www.youtube.com/watch?v=0uimNNIuUyY
- Albanese & Campolieti — *Advanced Derivatives Pricing and Risk Management* (nguồn bài giảng dẫn cho phần chứng minh): https://www.elsevier.com/books/advanced-derivatives-pricing-and-risk-management/albanese/978-0-12-047682-4
- Harrison & Kreps — *Martingales and Arbitrage in Multiperiod Securities Markets*: https://www.sciencedirect.com/science/article/pii/0022053179900437
- Wikipedia — *Fundamental theorem of asset pricing*: https://en.wikipedia.org/wiki/Fundamental_theorem_of_asset_pricing

## Liên kết
[[Arbitrage Portfolios]] · [[Contingent Claims and Replication]] · [[Single-Period Market Model]] · [[Linear Independence]] · [[Systems of Linear Equations]] · [[Quant]] · [[Math]]
