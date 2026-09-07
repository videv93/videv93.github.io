---
tags: [probability, classic-problem, causal]
status: evergreen
---
# Simpson's Paradox

> Bác sĩ A tốt hơn bác sĩ B ở **mọi** loại ca — nhưng tệ hơn khi gộp toàn bộ số liệu. Không có lỗi tính toán nào ở đây; nghịch lý nằm ở chỗ *gộp dữ liệu là một phép toán mất thông tin*.

## 1. Phát biểu

Tồn tại $A, B, C$ sao cho
$$P(A\mid B, C) > P(A\mid B^c, C) \quad\text{và}\quad P(A\mid B, C^c) > P(A\mid B^c, C^c)$$
nhưng
$$P(A\mid B) < P(A\mid B^c).$$

## 2. Ví dụ số (Blitzstein, Lecture 6)

Hai bác sĩ mổ tim và mổ băng bó:

| | Bác sĩ Hibbert | Bác sĩ Nick |
|---|---|---|
| **Mổ tim** | 70/90 = **78%** | 2/10 = **20%** |
| **Băng bó** | 10/10 = **100%** | 81/90 = **90%** |
| **Tổng** | 80/100 = **80%** | 83/100 = **83%** |

Hibbert thắng ở cả hai loại ca, nhưng thua khi gộp — vì ông ấy nhận **chủ yếu ca khó**.

Cơ chế đại số: cộng phân số không phải cộng tử với cộng mẫu. $\frac{70}{90}$ và $\frac{2}{10}$ không gộp thành trung bình cộng — chúng gộp theo **trọng số** rất lệch. Đây chính là [[Law of Total Probability]] với trọng số khác nhau ở hai nhóm.

$$P(\text{khỏi}\mid\text{bs}) = P(\text{khỏi}\mid\text{bs, tim})P(\text{tim}\mid\text{bs}) + P(\text{khỏi}\mid\text{bs, băng})P(\text{băng}\mid\text{bs})$$

Nếu $P(\text{tim}\mid\text{bs})$ khác nhau giữa hai bác sĩ → nghịch lý xuất hiện.

## 3. Confounder — cái tên đúng của thủ phạm

**Loại ca mổ** là *confounder*: nó ảnh hưởng đến cả biến "bác sĩ nào" lẫn biến "kết quả". Điều kiện theo nó thì quan hệ đảo chiều. Xem [[Conditional Independence]] về screening off.

Ví dụ đời thực nổi tiếng:
- **UC Berkeley 1973**: tỉ lệ nhận nữ thấp hơn nam trên toàn trường, nhưng cao hơn hoặc bằng ở **hầu hết từng khoa**. Nữ nộp nhiều hơn vào các khoa cạnh tranh cao.
- **Nghiên cứu sỏi thận (Charig 1986)**: điều trị A tốt hơn B với cả sỏi nhỏ lẫn sỏi lớn, nhưng tệ hơn khi gộp.
- **Lương theo ngành**, **tỉ lệ tử vong theo bệnh viện**, **CTR theo phân khúc người dùng** — bài toán này gặp liên tục khi làm A/B testing.

## 4. Nên gộp hay nên tách?

Không có quy tắc thống kê nào trả lời được — **phải dùng kiến thức nhân quả**.

| Nếu biến $C$ là… | Thì nên |
|---|---|
| **Confounder** (có trước, ảnh hưởng cả treatment và outcome), ví dụ độ nặng bệnh | **Tách** (điều kiện theo $C$) |
| **Mediator** (nằm *sau* treatment, trên đường nhân quả), ví dụ thuốc → huyết áp → đột quỵ | **Gộp** (tách sẽ chặn mất hiệu ứng thật) |
| **Collider** (chịu ảnh hưởng của cả hai) | **Không** điều kiện theo — sẽ tạo tương quan giả |

Pearl gọi đây là bài toán không giải được bằng dữ liệu thuần tuý; cần một mô hình nhân quả (DAG).

## 5. Cạm bẫy

1. **Nghĩ rằng "cứ tách nhỏ luôn đúng hơn".** Sai với mediator, và tách quá nhiều dẫn đến nhóm cỡ mẫu 3 người.
2. **Chỉ báo cáo số gộp** trong A/B test khi tỉ lệ phân bổ giữa các phân khúc lệch nhau.
3. **Chỉ báo cáo số tách** rồi cherry-pick phân khúc có kết quả đẹp.
4. **Nhầm với Berkson's paradox** (do conditioning trên collider) → [[Conditional Independence]].
5. **Cho rằng nghịch lý là lỗi dữ liệu.** Nó là hiện tượng số học hoàn toàn nhất quán.

## 6. Checklist khi phân tích số liệu gộp
- [ ] Có biến nào ảnh hưởng đến cả nhóm điều trị lẫn kết quả không?
- [ ] Tỉ lệ phân bổ giữa các nhóm con có giống nhau giữa hai treatment không?
- [ ] Kết quả có đảo chiều khi tách theo phân khúc chính không?
- [ ] Biến đang cân nhắc là confounder, mediator hay collider?
- [ ] Đã vẽ DAG nhân quả trước khi quyết định gộp/tách chưa?
- [ ] Nếu là thí nghiệm: randomization có thật sự phá được confounder không?

## Tham khảo
- Blitzstein & Hwang — *Introduction to Probability*, §2.8: http://probabilitybook.net
- Stat 110 Lecture 6 (*Simpson's Paradox*): https://www.youtube.com/watch?v=fDcjhAKuhqQ
- Bickel et al. (1975) — *Sex Bias in Graduate Admissions: Data from Berkeley*, Science: https://doi.org/10.1126/science.187.4175.398
- Pearl — *Understanding Simpson's Paradox*: https://ftp.cs.ucla.edu/pub/stat_ser/r414.pdf
- Wikipedia — *Simpson's paradox*: https://en.wikipedia.org/wiki/Simpson%27s_paradox

## Liên kết
[[Law of Total Probability]] · [[Conditional Independence]] · [[Conditional Probability Fallacies]] · [[Conditional Probability]] · [[Prob&Stats]]
