---
tags: [probability, foundations]
status: evergreen
---
# Axioms of Probability

> Chỉ cần **hai** tiên đề. Mọi công thức xác suất bạn từng dùng đều suy ra được từ đó — không có ngoại lệ, không có "trường hợp đặc biệt".

## 1. Định nghĩa không ngây thơ (non-naive definition)

Một **probability space** là bộ ba $(S, \mathcal{F}, P)$:
- $S$ — sample space (→ [[Sample Space & Events]])
- $\mathcal{F}$ — họ các event được phép đo (một $\sigma$-algebra)
- $P: \mathcal{F} \to [0,1]$ — hàm gán xác suất, thoả:

**Tiên đề 1.** $P(S) = 1$ và $P(\emptyset) = 0$.

**Tiên đề 2 (countable additivity).** Nếu $A_1, A_2, \dots$ đôi một disjoint thì
$$P\!\left(\bigcup_{n=1}^{\infty} A_n\right) = \sum_{n=1}^{\infty} P(A_n).$$

Blitzstein trình bày đúng hai tiên đề này; Kolmogorov gốc tách thành ba (thêm $P(A) \ge 0$). Về bản chất giống nhau.

## 2. Vì sao phải "không ngây thơ"

| Vấn đề của naive | Cách axioms giải quyết |
|---|---|
| $S$ vô hạn → $|A|/|S|$ vô nghĩa | $P$ là hàm được **cho trước**, không phải tính từ đếm |
| Outcome không đồng khả năng | Mỗi event có xác suất riêng, không ràng buộc đối xứng |
| Xác suất về niềm tin, mệnh đề | Vẫn hợp lệ miễn thoả 2 tiên đề (→ [[Bayesian vs Frequentist]]) |
| Tập không đo được (Vitali set) | $\mathcal{F}$ giới hạn lại những event được phép hỏi |

Điểm quan trọng về mặt tư duy: **axioms không nói xác suất *là* gì.** Chúng chỉ nói xác suất phải *hành xử* thế nào. Diễn giải (tần suất dài hạn hay mức độ tin) nằm ngoài toán học.

## 3. Countable, không phải uncountable

Tiên đề 2 chỉ áp dụng cho hợp **đếm được**. Đây không phải chi tiết vụn vặt:
- Trên $[0,1]$ với Uniform, mỗi điểm có xác suất 0, nhưng hợp **không đếm được** của chúng là cả đoạn, xác suất 1.
- Nếu đòi additivity cho hợp không đếm được thì lý thuyết sụp đổ ngay.

Đây cũng chính là lý do $P(X = x) = 0$ với biến liên tục mà vẫn có $P(X \in [0,1]) = 1$ → [[Discrete vs Continuous]].

## 4. Suy ra được ngay từ 2 tiên đề

- $P(A^c) = 1 - P(A)$
- $A \subseteq B \Rightarrow P(A) \le P(B)$ (monotonicity)
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- $P\!\left(\bigcup A_i\right) \le \sum P(A_i)$ (union bound)

Chi tiết chứng minh → [[Properties of Probability]].

## 5. Cạm bẫy

1. **Nghĩ rằng "xác suất 0 nghĩa là không thể xảy ra".** Sai. Với biến liên tục, mọi giá trị cụ thể đều có xác suất 0 nhưng một trong số đó vẫn xảy ra.
2. **Nghĩ rằng "xác suất 1 nghĩa là chắc chắn".** Đúng ngôn ngữ là *almost surely* — xem [[Modes of Convergence]].
3. **Cộng xác suất của các event không disjoint.** $P(A \cup B) \neq P(A) + P(B)$ trừ khi $A \cap B = \emptyset$.
4. **Quên rằng $P$ nhận event, không nhận outcome** trong trường hợp liên tục.
5. **Gán xác suất đều trên tập vô hạn đếm được** — không tồn tại (tổng không thể bằng 1). Không có "số nguyên dương ngẫu nhiên đều".

## 6. Checklist
- [ ] Tổng xác suất trên toàn bộ khả năng có bằng 1 không?
- [ ] Các event đang cộng có thực sự disjoint không?
- [ ] Có xác suất âm hoặc lớn hơn 1 xuất hiện trong bước trung gian không? (→ luôn là dấu hiệu sai)
- [ ] Đang làm việc với sample space vô hạn? Nếu có, đã bỏ naive definition chưa?
- [ ] "Xác suất 0" trong bài này nghĩa là *không thể* hay chỉ là *almost never*?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §1.6: http://probabilitybook.net
- Stat 110 Lecture 2 (*The Non-Naive Definition of Probability*): https://www.youtube.com/watch?v=FJd_1H3rZGg
- Wikipedia — *Probability axioms*: https://en.wikipedia.org/wiki/Probability_axioms
- Wikipedia — *Probability space*: https://en.wikipedia.org/wiki/Probability_space
- Kolmogorov — *Foundations of the Theory of Probability* (1933, bản dịch): https://www.york.ac.uk/depts/maths/histstat/kolmogorov_foundations.pdf

## Liên kết
[[Sample Space & Events]] · [[Properties of Probability]] · [[Naive Definition of Probability]] · [[Discrete vs Continuous]] · [[Prob&Stats]]
