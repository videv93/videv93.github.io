---
tags: [math, linear-algebra, finance]
status: evergreen
---
# Arbitrage Portfolios

> Định nghĩa hình thức của "tiền miễn phí" — và lý do định nghĩa đó phải chính xác đến từng bất đẳng thức. Toàn bộ lý thuyết định giá là hệ quả của việc **giả định thứ này không tồn tại**.

> [!note] Ghi chú nguồn
> Từ `Lecture 2 Linear Algebra.md`, phút 14:06–17:18 (giới thiệu, statistical arbitrage) và 1:08:15–1:09:44 (định nghĩa hình thức bằng ma trận).

## 1. Định nghĩa hình thức

Danh mục $\mathbf{q}$ là **arbitrage portfolio** nếu:

$$\underbrace{\mathbf{q}\cdot\mathbf{a}_0 \le 0}_{\text{chi phí ban đầu không dương}} \qquad\text{và}\qquad \underbrace{P\big(A\mathbf{q} < 0\big)=0}_{\text{không bao giờ lỗ}} \qquad\text{và}\qquad \underbrace{P\big(A\mathbf{q}>0\big)>0}_{\text{có khả năng lãi}}$$

với $\mathbf{a}_0$ = vector giá ban đầu, $A$ = ma trận payoff ([[Single-Period Market Model]]).

Bài giảng giải thích từng vế:
- Chi phí $\le0$ chứ không phải $=0$: *"If we have a negative cost, that means we get paid to implement this portfolio."* Được trả tiền để mở vị thế thì càng tốt.
- Payoff không âm ở **mọi** trạng thái: *"Such a portfolio would be risk-free, in terms of downside risk. We never lose money."*
- Dương ở **ít nhất một** trạng thái: nếu không, danh mục vô nghĩa (payoff luôn 0).

> [!warning] Ba điều kiện, không phải hai
> Bỏ điều kiện thứ ba thì danh mục $\mathbf 0$ cũng là arbitrage. Bỏ điều kiện thứ hai thì mọi vụ đặt cược đều là arbitrage. Cả ba đều cần thiết.

## 2. Hai dạng tương đương

| Dạng | Nội dung |
|---|---|
| Type A | chi phí $<0$, payoff $\ge0$ mọi trạng thái |
| Type B | chi phí $=0$, payoff $\ge0$ và $>0$ ở ít nhất một trạng thái |

Bài giảng gộp cả hai bằng cách viết $\le0$ cho chi phí: *"I guess one could constrain this to be 0. But it's easier to just say less than or equal to 0."*

Type B là danh mục **zero-cost** với payoff không âm — nối trực tiếp với [[Short Selling and Zero-Cost Portfolios]]. Bán khống là điều kiện kỹ thuật để những danh mục này tồn tại về mặt tập hợp.

## 3. Về mặt đại số tuyến tính

Tìm arbitrage = tìm $\mathbf q$ thoả một hệ **bất phương trình tuyến tính**:
$$\mathbf{a}_0^\top\mathbf{q}\le0, \qquad A\mathbf{q}\ge\mathbf{0}, \qquad A\mathbf{q}\ne\mathbf{0}$$

Đây là bài toán **quy hoạch tuyến tính khả thi** (LP feasibility). Bổ đề Farkas nói: hệ này **vô nghiệm** khi và chỉ khi tồn tại một vector dương $\mathbf{q}^*$ với $\mathbf{a}_0 = A^\top\mathbf{q}^*$ (sai khác hệ số chiết khấu).

Vector $\mathbf q^*$ đó chính là **pricing measure**. Đây là toàn bộ nội dung của định lý cơ bản về định giá tài sản, và là lý do nó **là** một định lý về đối ngẫu tuyến tính chứ không phải về xác suất. → [[No-Arbitrage and Pricing Measure]]

## 4. Statistical arbitrage

Bài giảng phân biệt rõ:

| | Arbitrage thật | **Statistical** arbitrage |
|---|---|---|
| Payoff | $\ge0$ ở **mọi** trạng thái | phân phối có **kỳ vọng dương** |
| Rủi ro lỗ | $0$ | có, thật |
| Bảo đảm | toán học | thống kê |
| Tồn tại thực tế | gần như không | có, là nghề của các quỹ |

Nguyên văn: *"those are strategies where we have portfolio specifications $\mathbf d^*$ for which this random profit and loss is a distribution that tends to generate positive returns… it's often not a pure arbitrage, but what we might call a statistical arbitrage."*

Đây là chỗ ranh giới thật giữa toán và thực hành. Stat arb có thể lỗ — và đã lỗ nặng: LTCM 1998, quant quake tháng 8/2007. Kỳ vọng dương không bảo vệ được khỏi rủi ro đuôi. → [[Quant]]

## 5. Vì sao arbitrage "không tồn tại"

Bài giảng: *"this kind of opportunity, generally — well, it doesn't exist in efficient markets. But markets are never completely efficient."*

Lập luận là **tự huỷ**: nếu tồn tại, người ta sẽ đổ vốn vào cho tới khi giá dịch chuyển và cơ hội biến mất. Nên trạng thái cân bằng là **không có arbitrage**, và điều đó cho phép suy ra **giá phải là bao nhiêu**.

Bài giảng nói thẳng đây là nền của toàn bộ Black–Scholes–Merton: *"option pricing theory… is all based upon arbitrage-free markets and the implications of that."*

**Giới hạn thực tế:** arbitrage trong sách giáo khoa giả định không chi phí giao dịch, không giới hạn vay, không rủi ro thanh khoản, và thực thi tức thời. Bỏ bất kỳ giả thiết nào thì nhiều "arbitrage" trở thành giao dịch có rủi ro.

## 6. Cạm bẫy

1. **Bỏ sót một trong ba điều kiện định nghĩa.**
2. **Nhầm arbitrage với statistical arbitrage.** Cái sau **có** rủi ro lỗ.
3. **Nhầm "không lỗ" với "không rủi ro".** Không lỗ trong **mô hình** — mô hình có thể thiếu trạng thái.
4. **Bỏ qua chi phí giao dịch, spread, và tác động thị trường.** Phần lớn arbitrage lý thuyết chết ở đây.
5. **Cho rằng arbitrage được thực hiện tức thời.** Nếu giá lệch tiếp trước khi hội tụ, margin call có thể giết vị thế trước — đây chính là cái đã giết LTCM.
6. **Thiếu trạng thái trong mô hình.** Nếu $\omega$ nào đó không được liệt kê, "arbitrage" chỉ là đặt cược vào việc nó không xảy ra.
7. **Coi $P(\cdot)$ trong định nghĩa là xác suất thực.** Nó chỉ cần biết **trạng thái nào có thể xảy ra**, không cần biết xác suất bao nhiêu — chi tiết ở [[No-Arbitrage and Pricing Measure]].

## 7. Checklist áp dụng
- [ ] Đã kiểm **cả ba** điều kiện chưa (chi phí $\le0$, payoff $\ge0$, payoff $>0$ ở ít nhất một trạng thái)?
- [ ] Danh sách trạng thái $\omega_1..\omega_m$ có đầy đủ không? Có kịch bản nào bị bỏ sót?
- [ ] Đã tính chi phí giao dịch, spread, phí vay chưa?
- [ ] Vị thế cần bao nhiêu vốn ký quỹ? Chịu được mức lệch giá bao nhiêu trước margin call?
- [ ] Đây là arbitrage thật hay **statistical** arbitrage?
- [ ] Nếu là stat arb: kỳ vọng dương bao nhiêu, và rủi ro đuôi thế nào?
- [ ] Thực thi mất bao lâu? Cơ hội có sống lâu bằng thời gian đó không?

## Tham khảo
- MIT 18.642 — *Lecture 2: Linear Algebra*, 14:06–17:18, 1:08:15–1:09:44: https://www.youtube.com/watch?v=0uimNNIuUyY
- Albanese & Campolieti — *Advanced Derivatives Pricing and Risk Management* (bài giảng dẫn nguồn này): https://www.elsevier.com/books/advanced-derivatives-pricing-and-risk-management/albanese/978-0-12-047682-4
- Shleifer & Vishny — *The Limits of Arbitrage*: https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1997.tb03807.x
- Wikipedia — *Arbitrage*: https://en.wikipedia.org/wiki/Arbitrage

## Liên kết
[[Short Selling and Zero-Cost Portfolios]] · [[No-Arbitrage and Pricing Measure]] · [[Single-Period Market Model]] · [[Portfolio as a Vector]] · [[Quant]] · [[Math]]
