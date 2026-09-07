---
tags: [quant, probability, core]
status: evergreen
---
# Gambler's Ruin

> Bài toán kinh điển trong phỏng vấn hedge fund — không phải vì nó là câu đố, mà vì **trading theo đúng nghĩa đen chính là bài toán này**, với payout bất đối xứng và xác suất không cố định.

## 1. Bài toán gốc

Trò chơi thuần xác suất:
- Thắng $+1$ với xác suất $p$, thua $-1$ với xác suất $q = 1-p$.
- Cấu trúc **Markov**: chỉ tình trạng *hiện tại* quan trọng. Bạn từng có 10.000 rồi tụt về 10 — không liên quan; bạn đang ở 10.

Câu hỏi: chơi mãi thì xác suất đạt một ngưỡng tài sản mục tiêu so với xác suất phá sản là bao nhiêu?

**Ba kết luận từ lời giải giải tích:**
1. **Vốn ban đầu lớn hơn → xác suất phá sản thấp hơn.** (\$100 an toàn hơn \$10 — hiển nhiên nhưng định lượng được.)
2. **Có edge cải thiện khả năng sống sót một cách kịch tính.** Edge tạo drift dương.
3. **Chơi vô hạn thì phá sản là chắc chắn** — kể cả có edge. Kiếm được \$10 triệu mà không bao giờ dừng thì sớm muộn cũng có chuỗi xui xoá sổ.

Thực tế ta không giao dịch vô hạn lần, nên (3) mang tính lý thuyết. Nhưng nó nhắc: **phá sản là trạng thái hấp thụ**.

## 2. Cảm nhận bằng mô phỏng

Mô phỏng đến khi chạm ngưỡng mục tiêu (xanh) hoặc phá sản (đỏ), rồi áp luật số lớn: chia số path xanh cho tổng số path.

| Thiết lập | Xác suất chạm mục tiêu |
|---|---|
| $p = 0{,}6$, vốn 5, mục tiêu 10 | ~80% |
| $p = 0{,}6$, vốn **7**, mục tiêu 10 | ~97% |
| $p = 0{,}5$, vốn 7, mục tiêu 10 | ~75% |

Chỉ cần bỏ edge (0,6 → 0,5) là mất ~20 điểm phần trăm. Đây là lý do phải hiểu **cơ chế** của lời giải, không chỉ công thức: nó cho biết cần gạt nào đáng kéo.

## 3. Trading system **chính là** gambler's ruin

Định nghĩa: một *trade* = vị thế mở-đóng ra P&L. Một *trading system* $\mathcal{T}$ = tập hợp trade sinh bởi hệ đó. Mỗi trade là một lần rút từ phân phối thật.

$$\mathbb{E}[\mathcal{T}] = \mathbb{E}[\mathcal{T}\mid W]P(W) + \mathbb{E}[\mathcal{T}\mid L]P(L)$$

Đây **đúng là** gambler's ruin, chỉ khác hai chỗ:
- **Payout bất đối xứng** (không phải ±\$1) → cần lời giải giải tích tổng quát hơn, và có.
- **Xác suất không nhất quán theo thời gian** → đây mới là phần khó.

Ví dụ: vốn \$10, mục tiêu \$100 với bộ tham số cố định → xác suất ruin ~90%. Nâng vốn lên 50, hoặc nâng $p$ lên 0,55 → xác suất thành công tăng vọt.

## 4. Vấn đề thực: ta không quan sát được tham số

Ta **không** có phân phối lý thuyết. Phải ước lượng 4 thành phần từ **trades as data**. Và:

- Phân phối thật **đổi theo thời gian** → cực khó phân biệt "chuỗi xui trong hệ tốt" với "hệ đã hỏng", và ngược lại.
- Mô phỏng cho thấy: $P(W)$ khởi đầu ~60%, suy giảm, rồi hồi phục — equity curve phản ánh đúng như vậy, và đôi khi **không** hồi phục.
- Resample cùng một hệ với seed khác → ra tham số hoàn toàn khác. Ước lượng "84% chạm mục tiêu" có thể thành **60%** chỉ vì đổi mẫu.

**Nếu tham số cố định được**, sẽ tồn tại hedge fund một người: $P(W)=90\%$, winner $1.000, loser $10, nạp leverage tối đa, họ trở thành casino. Không ai làm được vậy — đó là bằng chứng tham số không cố định.

## 5. Vì sao vẫn nên tính

Ước lượng chắc chắn sai. Nhưng chẳng phải bạn muốn thấy con số ~90% hơn là ~10% sao? Nếu ước lượng ra 10% và bạn biết nó sai, biên sai số có đủ lớn để đẩy nó lên 70–80% không? Gần như chắc chắn không.

Kỹ thuật để ước lượng tham số **theo thời gian**: EWMA, time series, filtering ([[Kalman Filter]]). Không cái nào chính xác. Tất cả đều tốt hơn không có gì.

## 6. Bốn cần gạt (giống hệt [[Edge and Expected Value]])
Tăng $P(W)$ · giảm $P(L)$ · tăng average winner · giảm average loser — **cộng thêm** cần gạt thứ năm mà gambler's ruin làm nổi bật: **tăng vốn ban đầu tương đối so với mục tiêu**.

Ứng dụng động: khi $P(L)$ tăng → hedge sớm hơn; khi $P(W)$ suy giảm nhưng còn dư địa → để winner chạy để bù bằng average winner lớn hơn.

## 7. Cạm bẫy
- **Đặt mục tiêu tài sản quá xa so với vốn.** Cơ học của bài toán sẽ nghiền bạn bất kể edge.
- **Coi ước lượng hitting probability là con số chắc chắn.** Nó luôn over/under-estimate, và càng volatile thì càng lệch.
- **Quên rằng phá sản là hấp thụ.** Không có "trung bình" nào cứu bạn sau khi về 0.
- **Bỏ qua ergodicity.** Gambler's ruin cổ điển là additive. Trading thật là multiplicative. Xem [[Ergodicity]].

## 8. Checklist áp dụng
- [ ] Vốn ban đầu / mục tiêu của tôi là bao nhiêu? Xác suất chạm mục tiêu ước lượng là bao nhiêu?
- [ ] Tôi đo 4 thành phần edge **theo thời gian** hay chỉ một lần?
- [ ] Nếu resample dữ liệu trade của tôi, ước lượng có ổn định không?
- [ ] Kịch bản nào khiến tôi về 0? Tôi đã loại trừ nó chưa?
- [ ] Tôi có đang lẫn lộn "xui" với "edge đã chết" không? Tôi phân biệt bằng gì?

## Tham khảo
- Quant Guild — *Gambler's Ruin Problem in Quant Trading*: https://youtu.be/YNvhjSr_nz0
- MIT 18.642 — *Lecture 6: Stochastic Processes I (cont.); Regression Analysis* — lời giải bằng martingale, kể cả trường hợp biased random walk
- Feller, W. — *An Introduction to Probability Theory and Its Applications*, Vol. I, Ch. XIV
- Grimmett & Stirzaker — *Probability and Random Processes*

## Liên kết
[[Martingales]] · [[Markov Chains]] · [[Ergodicity]] · [[Kelly Criterion]] · [[Edge and Expected Value]] · [[Quant]]
