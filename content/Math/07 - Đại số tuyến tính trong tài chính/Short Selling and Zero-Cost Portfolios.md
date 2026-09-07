---
tags: [math, linear-algebra, finance]
status: evergreen
---
# Short Selling and Zero-Cost Portfolios

> Cho phép trọng số **âm** và cả không gian danh mục thay đổi bản chất: từ một nón lồi thành một **không gian vector đầy đủ**. Đó là điều kiện kỹ thuật khiến mọi lý thuyết định giá sau đó chạy được.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 11:11–14:30 — gồm cả đoạn hỏi đáp với sinh viên Alexander về cơ chế bán khống.

## 1. Bán khống là gì

Bài giảng để sinh viên trả lời, rồi xác nhận: *"You basically sell first, buy back later. And you sell by — you don't have the stock. So you borrow it from some seller."*

Cơ chế:
1. Vay cổ phiếu từ môi giới (môi giới phải **locate** được nguồn vay).
2. Bán ngay trên thị trường → **tài khoản được ghi có tiền mặt**.
3. Sau đó mua lại và trả cổ phiếu.

Trong ngôn ngữ vector: $q_j < 0$. Đơn giản đến mức dễ bỏ qua hệ quả.

**Hệ quả mà bài giảng nhấn:** vì bán khống tạo dòng tiền vào dương, bạn có thể đầu tư **hơn 100%** vốn của mình vào các vị thế mua. Đây là đòn bẩy sinh ra từ cấu trúc, không phải từ vay tiền.

Điều kiện thực tế: cần tài khoản **margin**.

## 2. Vì sao trọng số âm quan trọng về toán

| Ràng buộc | Tập danh mục | Là gì |
|---|---|---|
| Long-only, $\mathbf q \ge 0$ | nón lồi trong $\mathbb{R}_+^n$ | **không** phải không gian vector |
| Cho phép âm | toàn bộ $\mathbb{R}^n$ | **là** không gian vector |

Chỉ trường hợp thứ hai mới đóng với nhân vô hướng âm ⟹ mới thoả tiên đề ở [[Vector Spaces and Basis]]. Và chỉ khi đó, tập payoff đạt được mới là **không gian cột** đầy đủ của ma trận giá — điều kiện của [[Contingent Claims and Replication]] và market completeness.

Nói cách khác: **bán khống là giả thiết làm cho đại số tuyến tính áp dụng được.** Bài giảng nói rõ giả thiết mô hình ở phút 1:06:18: giá không đổi theo khối lượng mua, và *"there's no constraint on short selling the asset, that you can do that with liberty."*

## 3. Danh mục zero-cost

$$\mathbf{d}\ne\mathbf{0} \qquad\text{nhưng}\qquad V_0 = \mathbf{d}\cdot\mathbf{p}(0)=0$$

Giá trị mua ròng bằng đúng giá trị bán ròng. **Không cần vốn** để mở vị thế.

Về hình học: tập các danh mục zero-cost là **siêu phẳng trực giao với $\mathbf p(0)$** — một không gian con chiều $n-1$. → [[Dot Product and Norms]]

Bài giảng minh hoạ điều này bằng đồ thị trong ghi chú lớp: trong không gian payoff hai chiều (down/up), các danh mục có chi phí ban đầu bằng 0 được "tô trắng" ra để thấy chúng nằm ở đâu.

**Long–short portfolio** là trường hợp tổng quát hơn: có cả trọng số dương và âm, chi phí không nhất thiết bằng 0.

## 4. Vì sao zero-cost là bước tới arbitrage

Với danh mục zero-cost, PnL vẫn **ngẫu nhiên**:
$$\text{PnL}(\mathbf d)=\mathbf{d}\cdot\big[\mathbf{p}(T)-\mathbf{p}(0)\big]=\mathbf{d}\cdot\mathbf{p}(T)$$
(vì số hạng thứ hai bằng 0 theo định nghĩa).

Bài giảng đặt câu hỏi ngay: *"we can hope for the possibility of an arbitrage portfolio, which could be a portfolio that has zero cost, but has a positive profit and loss over a period."*

Nếu tìm được $\mathbf d$ zero-cost với $\mathbf{d}\cdot\mathbf{p}(T)>0$ ở **mọi** trạng thái — đó là tiền miễn phí. Định nghĩa hình thức ở [[Arbitrage Portfolios]].

Nhận xét thực tế của bài giảng: cơ hội như vậy *"doesn't exist in efficient markets. But markets are never completely efficient"* — nên có thể tìm được danh mục **gần** arbitrage.

## 5. Chi phí thật của bán khống

Mô hình đại số bỏ qua những thứ này; thực tế thì không:

| Chi phí | Nội dung |
|---|---|
| **Borrow fee** | phí vay cổ phiếu; cổ phiếu "hard to borrow" có thể tốn hàng chục %/năm |
| **Recall risk** | bên cho vay đòi lại bất cứ lúc nào ⟹ buộc đóng vị thế |
| **Lỗ không giới hạn** | giá lên vô hạn được; lỗ của vị thế mua chặn ở $-100\%$ |
| **Margin call** | giá lên ⟹ phải nộp thêm ký quỹ ⟹ có thể bị đóng đúng lúc tệ nhất |
| **Cổ tức** | người bán khống phải trả cổ tức cho bên cho vay |
| **Lệnh cấm** | cơ quan quản lý có thể cấm bán khống trong khủng hoảng |

Bất đối xứng lỗ (dòng 3) là lý do rủi ro của danh mục long–short **không** đối xứng, dù đại số thì đối xứng hoàn hảo. → [[Quant]]

## 6. Cạm bẫy

1. **Cho rằng bán khống miễn phí.** Mô hình đại số giả định vậy; thực tế không.
2. **Quên rằng lỗ short không chặn.**
3. **Coi tập long-only là không gian vector.**
4. **Nhầm zero-cost với zero-risk.** PnL vẫn ngẫu nhiên.
5. **Nhầm zero-cost với market-neutral.** Chi phí bằng 0 không có nghĩa beta bằng 0.
6. **Bỏ qua ràng buộc margin trong backtest.** Chiến lược "vay không giới hạn" không thực hiện được.
7. **Quên cổ tức và phí vay khi tính PnL của vị thế short.**

## 7. Checklist áp dụng
- [ ] Danh mục có trọng số âm không? Mô hình có cho phép không?
- [ ] $\mathbf d\cdot\mathbf p(0)$ có thật sự bằng 0 không (đã tính hết cả tiền mặt chưa)?
- [ ] Zero-cost ≠ zero-risk — đã đánh giá phân bố PnL chưa?
- [ ] Có tính phí vay, cổ tức, và margin không?
- [ ] Cổ phiếu định short có "hard to borrow" không?
- [ ] Rủi ro tệ nhất của vị thế short là bao nhiêu? (không chặn — cần stop hoặc option)
- [ ] Trong mô hình lý thuyết: giả thiết "bán khống tự do" có được nêu rõ không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 11:11–14:30, 1:06:18: https://www.youtube.com/watch?v=0uimNNIuUyY
- SEC — *Key Points About Regulation SHO*: https://www.sec.gov/investor/pubs/regsho.htm
- Investopedia — *Short Selling*: https://www.investopedia.com/terms/s/shortselling.asp
- Lamont & Thaler — *Can the Market Add and Subtract?* (giới hạn của arbitrage): https://www.journals.uchicago.edu/doi/10.1086/379933

## Liên kết
[[Portfolio as a Vector]] · [[Arbitrage Portfolios]] · [[Vector Spaces and Basis]] · [[Dot Product and Norms]] · [[Quant]] · [[Math]]
