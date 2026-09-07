---
tags: [probability, stochastic-process, technique]
status: evergreen
---
# First Step Analysis

> Kỹ thuật giải mọi bài toán lặp: **điều kiện theo bước đầu tiên**, rồi để tính đệ quy tự lo phần còn lại. Blitzstein đùa gọi đây là "Feynman algorithm" — viết ra bài toán, điều kiện theo bước 1, viết ra đáp án.

## 1. Ý tưởng

Đại lượng cần tìm phụ thuộc trạng thái xuất phát. Đặt tên cho **cả họ** đại lượng đó (không chỉ trường hợp cần), rồi dùng [[Law of Total Probability]] hoặc [[Conditional Expectation]] để liên hệ chúng với nhau.

Nghịch lý hữu ích: **giải bài toán tổng quát hơn thì dễ hơn giải bài toán cụ thể**, vì chỉ bài tổng quát mới cho ta hệ phương trình.

## 2. Quy trình 4 bước

1. **Đặt tên**: $p_i$ = xác suất (hoặc $\mu_i$ = kỳ vọng) khi xuất phát từ trạng thái $i$.
2. **Điều kiện theo bước đầu**: $p_i = \sum_j q_{ij}\,p_j$ (xác suất), hoặc $\mu_i = 1 + \sum_j q_{ij}\mu_j$ (kỳ vọng — chú ý số hạng "$+1$" cho bước vừa đi).
3. **Điều kiện biên**: giá trị tại các trạng thái hấp thụ.
4. **Giải** hệ phương trình (hữu hạn) hoặc phương trình sai phân (vô hạn).

## 3. Hai ví dụ chuẩn

**Gambler's ruin.** $p_i$ = xác suất đạt $N$ trước khi về 0, khi đang có $i$ đồng:
$$p_i = p\,p_{i+1} + q\,p_{i-1}, \qquad p_0=0,\ p_N=1$$
Phương trình sai phân tuyến tính bậc hai → [[Gambler's Ruin]].

**Thời gian chờ mẫu HH khi tung xu.** Trạng thái = "đã có bao nhiêu H liên tiếp":
$$\mu_0 = 1 + \tfrac12\mu_1 + \tfrac12\mu_0, \qquad \mu_1 = 1 + \tfrac12\cdot0 + \tfrac12\mu_0$$
Giải ra $\mu_0 = 6$. Với mẫu HT thì đáp án là 4 — **hai mẫu cùng xác suất nhưng thời gian chờ khác nhau**, một kết quả rất phản trực giác (Penney's game).

## 4. Các dạng bài dùng được

| Bài toán | Đại lượng đặt tên |
|---|---|
| Xác suất hấp thụ | $p_i$ = xác suất bị hấp thụ ở trạng thái đích |
| Thời gian hấp thụ kỳ vọng | $\mu_i$ = số bước kỳ vọng |
| Thời gian quay lại kỳ vọng | $\mu_i$, dùng để tìm $\pi_i = 1/\mu_i$ |
| Coupon collector | $\mu_k$ = số lần mua thêm khi đã có $k$ loại |
| Thời gian chờ một mẫu | Trạng thái = tiền tố đã khớp (như KMP) |
| Random walk trên đồ thị | $p_v$ theo từng đỉnh |

## 5. Cạm bẫy

1. **Quên số hạng "$+1$"** trong phương trình kỳ vọng — bước vừa thực hiện cũng được tính.
2. **Thiếu điều kiện biên** → hệ có vô số nghiệm.
3. **Chỉ đặt tên cho trường hợp cần** thay vì cả họ → không lập được phương trình.
4. **Đặt sai không gian trạng thái.** Với bài chờ mẫu HH, trạng thái phải là "số H liên tiếp hiện có", không phải "số lần tung".
5. **Giả định kỳ vọng hữu hạn.** Với random walk 1 chiều đối xứng, thời gian quay lại 0 là **hữu hạn hầu chắc chắn** nhưng có **kỳ vọng vô hạn** → [[Random Walk]].
6. **Nghiệm phương trình sai phân sai** khi phương trình đặc trưng có nghiệm kép (trường hợp $p=q=1/2$ cần dạng $A+Bi$).
7. **Nhầm "điều kiện theo bước đầu" với "bước cuối".** Cả hai đôi khi dùng được, nhưng bước đầu thường cho phương trình sạch hơn.

## 6. Checklist
- [ ] Bài toán có cấu trúc lặp/đệ quy không?
- [ ] Đã đặt tên cho **cả họ** đại lượng theo trạng thái xuất phát chưa?
- [ ] Không gian trạng thái đã đủ để bài toán thành Markov chưa?
- [ ] Nếu là kỳ vọng: đã cộng "$+1$" chưa?
- [ ] Đã ghi đủ điều kiện biên chưa?
- [ ] Kỳ vọng có hữu hạn không?
- [ ] Đã kiểm tra nghiệm bằng trường hợp nhỏ hoặc mô phỏng chưa?

## Tham khảo
- Stat 110 Lecture 7 (*First Step Analysis*): https://www.youtube.com/watch?v=PNrqCdslGi4
- Stat 110 Lecture 5 (*Feynman Algorithm*): https://www.youtube.com/watch?v=JzDvVgNDxo8
- Blitzstein & Hwang — *Introduction to Probability*, §2.7, Ch.11: http://probabilitybook.net
- Wikipedia — *Penney's game*: https://en.wikipedia.org/wiki/Penney%27s_game
- Wikipedia — *Absorbing Markov chain*: https://en.wikipedia.org/wiki/Absorbing_Markov_chain

## Liên kết
[[Gambler's Ruin]] · [[Markov Chains]] · [[Law of Total Probability]] · [[Conditional Expectation]] · [[Random Walk]] · [[Prob&Stats]]
