---
tags: [quant, foundation, core]
status: evergreen
---
# Edge and Expected Value

> Edge **là** expected value. Không phải "cảm giác tự tin", không phải "setup đẹp". Nó là một con số, và nó quyết định wealth path của bạn qua một chuỗi giao dịch.

## 1. Định nghĩa và phân rã

$$\mathbb{E}[\mathcal{T}] = \underbrace{\mathbb{E}[\mathcal{T}\mid W]\cdot P(W)}_{\text{winner trung bình} \times \text{tỉ lệ thắng}} + \underbrace{\mathbb{E}[\mathcal{T}\mid L]\cdot P(L)}_{\text{loser trung bình} \times \text{tỉ lệ thua}}$$

Trong đó một *trade* = bất kỳ vị thế nào được mở và đóng để ra P&L; một *trading system* $\mathcal{T}$ = tập hợp các trade sinh ra bởi hệ thống đó.

**Bốn cần gạt** — và chỉ bốn — để làm EV dương hơn:
1. Tăng $P(W)$
2. Giảm $P(L)$
3. Tăng average winner
4. Giảm average loser

Đây là lý do phải phân rã EV thay vì nhìn một con số: khi edge suy giảm, bạn cần biết **thành phần nào** đang hỏng.

## 2. Edge trong một market đơn giản (ví dụ xúc xắc)

Trò chơi: tung một xúc xắc, payoff dựa trên mức bạn long/short.
- EV của một lần tung = 3,5. Đây là mức tham chiếu tĩnh.
- Thị trường quote bid/ask ngẫu nhiên quanh 3,5.
- **Có edge khi**: bán ở giá > 3,5, hoặc mua ở giá < 3,5.
- Giao dịch ngẫu nhiên → wealth path về 0. Giao dịch chỉ khi có edge → tích luỹ P&L.

Bài học: nếu bạn không hành động được trên edge khi mức tham chiếu **tĩnh và biết trước**, thì làm sao hành động được khi mức đó **động và không quan sát được**? Trong thị trường thật, không có con số 3,5 nào cả — xem [[Expectation and Convergence]].

## 3. Edge định lượng vs edge định tính

| | Quantitative edge | Qualitative edge |
|---|---|---|
| Nguồn | Bất hiệu quả hệ thống có thể khai thác bằng dữ liệu | Kinh nghiệm, lợi thế thông tin (**không phải** insider) |
| Cấu trúc | Có, thuật toán hoá được | Khó hình thức hoá; quá nhiều biến động |
| Ví dụ | Signal cross-sectional, IV vs realized vol, earnings event | "Fear luôn bị định giá sai" → mua khi VIX > 30 |
| Đo được? | Có (quantile plot, alpha regression) | Rất khó — mẫu chỉ thực hiện một lần |
| Kiểm chứng | Backtest (với đủ cạm bẫy) | Không repeat được thí nghiệm |

**Edge định tính có tồn tại.** Bác bỏ nó là vô lý — hãy nhìn poker: đọc người, biết khi nào bluff, đọc bàn. Không quy về thuật toán được không có nghĩa là không tồn tại. Nhưng nó khó bảo vệ hơn nhiều, và **đây là lý do có chỗ đứng chính đáng cho mid/high-touch discretionary trading**. Xem [[Quant vs Discretionary Trading]].

Ví dụ cụ thể (tariffs đầu 2025): leverage effect là stylized fact — vol tăng thì giá giảm bất cân xứng, và hồi phục chậm hơn. Diễn giải định tính: đây là **mispricing do sợ hãi**, không phải tận thế. Hai cách thực thi:
- Lump sum khi VIX > 30 → drawdown 13%, sau vài tháng +12%.
- Rải 10% vốn mỗi ngày VIX > 30 → drawdown ~2%, +15%.

Edge ở đây không nằm ở tín hiệu, mà ở **khả năng ngồi qua drawdown mà không đổi luận điểm**.

## 4. Cạm bẫy

- **Nhầm edge với arbitrage.** Arbitrage là lợi nhuận phi rủi ro (và thường bạn chỉ "được cầm hoá đơn" chứ không execute được). Edge là chuyện thống kê, có drawdown, có phá sản.
- **Nghĩ EV dương ⇒ chắc chắn lãi.** Không. Bạn chỉ đi **một** sample path và có thể phá sản trước khi tích luỹ được. Xem [[Gambler's Ruin]], [[Ergodicity]].
- **Nghĩ edge là hằng số.** Cả 4 thành phần đều thay đổi theo thời gian. Chiến lược chạy 5 năm không đảm bảo chạy năm nay.
- **Không phân biệt được xui với hết edge.** Đây là bài toán khó nhất trong nghề. Xem [[Model Specification and Parameterization]].
- **Bỏ qua scalability.** Với institution, tăng vốn cho một chiến lược thì edge của nó suy giảm. Với retail thì vấn đề là hạ tầng và dữ liệu.

## 5. Cái gì **không phải** edge
- Vào lệnh rồi bán vì sợ khi thấy drawdown.
- Có "win rate 90%" (xem [[Trading Myths Busted]]).
- Mua vì tin tức nói tăng.
- Mua Dogecoin mà không biết supply là bao nhiêu, macro regime là gì, cryptocurrency là gì.

## 6. Checklist áp dụng
- [ ] Tôi viết ra được EV của hệ thống mình bằng 4 thành phần chưa?
- [ ] Thành phần nào đang xấu đi trong 3 tháng gần nhất?
- [ ] Edge này là định lượng hay định tính? Nếu định tính, tôi mô tả nó bằng lời được không?
- [ ] Nếu chiến lược này drawdown 15%, luận điểm của tôi có đổi không? Nếu có → tôi không có edge, tôi có hy vọng.
- [ ] Tôi có đang nhầm edge với arbitrage không?

## Tham khảo
- Quant Guild — *How to Trade with an Edge*: https://youtu.be/NlqpDB2BhxE
- Quant Guild — *Gambler's Ruin Problem in Quant Trading*: https://youtu.be/YNvhjSr_nz0
- Quant Guild — *Quant Explains Alpha in 3 Minutes*: https://youtu.be/Ivz58kZLD2U
- Grinold & Kahn — *Active Portfolio Management* (fundamental law of active management)
- Aronson, D. — *Evidence-Based Technical Analysis*

## Liên kết
[[Kelly Criterion]] · [[Gambler's Ruin]] · [[Ergodicity]] · [[Optimal Policy Function]] · [[Alpha Signals]] · [[Quant]]
