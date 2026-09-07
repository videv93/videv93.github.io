---
tags: [probability, foundations]
status: evergreen
---
# Naive Definition of Probability

> $P(A) = \dfrac{|A|}{|S|}$ — đúng trong sách giáo khoa, sai trong phần lớn đời thực. Biết **khi nào được dùng** quan trọng hơn biết công thức.

## 1. Định nghĩa

$$P_{\text{naive}}(A) = \frac{\text{số outcome thuận lợi}}{\text{tổng số outcome}} = \frac{|A|}{|S|}$$

Điều kiện **bắt buộc** để dùng:
1. $S$ **hữu hạn**.
2. Mọi outcome trong $S$ **đồng khả năng** (equally likely).

Thiếu một trong hai → công thức vô hiệu, dù vẫn tính ra số.

## 2. Khi nào giả định "đồng khả năng" hợp lý

| Tình huống | Đồng khả năng? | Lý do |
|---|---|---|
| Tung xúc xắc cân | ✅ | Đối xứng vật lý |
| Xáo bài kỹ, rút 5 lá | ✅ | Đối xứng do xáo trộn |
| Chọn ngẫu nhiên 1 người từ danh sách | ✅ | Do **thiết kế lấy mẫu** |
| Ngày mai mưa / không mưa | ❌ | Không có đối xứng nào cả |
| Có sự sống trên sao Hải Vương / không | ❌ | Ví dụ kinh điển của Blitzstein: 2 khả năng ≠ 50–50 |
| Sinh nhật rơi vào 365 ngày | ⚠️ Xấp xỉ | Thực tế phân bố không đều, nhưng đủ tốt → [[Birthday Problem]] |

Ba nguồn hợp pháp của tính đồng khả năng: **đối xứng vật lý**, **thiết kế ngẫu nhiên hoá của người làm thí nghiệm**, và **quy ước mô hình hoá đã tuyên bố rõ**.

## 3. Vì sao nó vẫn quan trọng

Naive definition biến bài toán xác suất thành bài toán **đếm** — nên toàn bộ [[Counting & Combinatorics]] tồn tại. Với bài bạc, xổ số, bốc thăm, bài tây, đây vẫn là công cụ đúng và đủ.

## 4. Cạm bẫy

1. **d'Alembert's error.** Tung 2 đồng xu, coi $S = \{0,1,2\}$ mặt ngửa rồi kết luận $P(1 \text{ ngửa}) = 1/3$. Sai — $S$ đúng là $\{HH,HT,TH,TT\}$, đáp án $1/2$.
2. **Đếm tử số và mẫu số theo hai quy ước khác nhau.** Nếu mẫu số coi các vật là phân biệt được thì tử số cũng phải vậy.
3. **Dùng cho sample space vô hạn.** $|A|/|S|$ vô nghĩa khi $|S| = \infty$ → cần [[Axioms of Probability]].
4. **Bertrand's paradox.** Với bài toán hình học liên tục, "chọn ngẫu nhiên" có nhiều cách hiểu, cho ra nhiều đáp án khác nhau. "Ngẫu nhiên" phải được định nghĩa, không phải hiển nhiên.
5. **Áp cho niềm tin.** Xác suất về mệnh đề khoa học hay pháp lý không đến từ đếm → cần [[Bayesian vs Frequentist]].

## 5. Cách thoát khỏi giới hạn

Nếu outcome **không** đồng khả năng nhưng $S$ hữu hạn: gán trọng số $p_s$ cho từng outcome, khi đó
$$P(A) = \sum_{s \in A} p_s, \qquad \sum_{s \in S} p_s = 1.$$
Đây chính là bước đầu tiên tiến tới [[Axioms of Probability]] và [[PMF]].

## 6. Checklist áp dụng
- [ ] $S$ có hữu hạn không?
- [ ] Có lý do **đối xứng hoặc thiết kế** nào biện minh cho đồng khả năng không?
- [ ] Tử số và mẫu số có cùng quy ước "phân biệt / không phân biệt" không?
- [ ] Nếu đổi cách mô hình hoá $S$, đáp án có đổi không? (Nếu có → mô hình chưa được xác định rõ.)
- [ ] Có thể mô phỏng bằng code để kiểm chứng không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.2: http://probabilitybook.net
- Stat 110 Lecture 1 (ví dụ "life on Neptune"): https://www.youtube.com/watch?v=KbB0FjPg0mw
- Wikipedia — *Bertrand paradox*: https://en.wikipedia.org/wiki/Bertrand_paradox_(probability)
- Wikipedia — *Principle of indifference*: https://en.wikipedia.org/wiki/Principle_of_indifference

## Liên kết
[[Sample Space & Events]] · [[Counting & Combinatorics]] · [[Axioms of Probability]] · [[Bayesian vs Frequentist]] · [[Prob&Stats]]
