---
tags: [probability, conditioning, pitfalls]
status: evergreen
---
# Conditional Probability Fallacies

> Ba sai lầm dưới đây đã làm người vô tội đi tù và làm bác sĩ chẩn đoán sai. Chúng không phải lỗi tính toán — chúng là lỗi *dịch câu hỏi*.

## 1. Bảng ba sai lầm chính

| Sai lầm | Nội dung | Hậu quả điển hình |
|---|---|---|
| **Prosecutor's fallacy** | Nhầm $P(\text{bằng chứng}\mid\text{vô tội})$ với $P(\text{vô tội}\mid\text{bằng chứng})$ | Kết án oan |
| **Base rate neglect** | Bỏ qua $P(A)$ khi tính $P(A\mid B)$ | Diễn giải sai kết quả xét nghiệm |
| **Defense attorney's fallacy** | Coi bằng chứng là vô giá trị vì còn nhiều người khác cũng khớp | Bỏ lọt |

Cả ba đều là hệ quả của việc **không viết ra công thức Bayes** → [[Bayes Rule]].

## 2. Prosecutor's fallacy — chi tiết

Bằng chứng DNA khớp, tần suất trong dân số $1/1{,}000{,}000$. Công tố nói: "Xác suất bị cáo vô tội là một phần triệu."

Sai. $P(\text{khớp}\mid\text{vô tội}) = 10^{-6}$, nhưng câu hỏi là $P(\text{vô tội}\mid\text{khớp})$. Nếu tìm kiếm trong cơ sở dữ liệu 10 triệu người thì kỳ vọng có ~10 người khớp — bị cáo chỉ là 1 trong số đó.

**Vụ Sally Clark (Anh, 1999).** Hai con đột tử; chuyên gia khai xác suất là $1/73{,}000{,}000$ (bình phương $1/8500$). Hai lỗi: (a) giả định hai cái chết độc lập, trong khi có thể cùng yếu tố di truyền/môi trường → [[Independence]]; (b) so sánh sai — phải đối chiếu với xác suất *một bà mẹ giết hai con*, cũng cực hiếm. Bà bị kết án oan, được minh oan năm 2003, mất năm 2007. Royal Statistical Society đã ra thông cáo phản đối cách dùng thống kê trong vụ này.

## 3. Base rate neglect

Xem ví dụ xét nghiệm y khoa đầy đủ trong [[Bayes Rule]]: sensitivity 95%, specificity 95%, tỉ lệ mắc 1% → dương tính chỉ 16% có bệnh.

**Cách chữa hiệu quả nhất: chuyển sang tần suất tự nhiên.** Thay vì "95%", nói "trong 10.000 người thì…". Gigerenzer chứng minh tỉ lệ trả lời đúng của bác sĩ tăng từ ~15% lên ~50–75% chỉ nhờ đổi cách trình bày.

## 4. Các biến thể khác

- **Conjunction fallacy (Linda problem).** Người ta xếp "Linda là nhân viên ngân hàng **và** hoạt động nữ quyền" khả năng cao hơn "Linda là nhân viên ngân hàng". Vi phạm monotonicity: $P(A\cap B) \le P(A)$ luôn đúng → [[Properties of Probability]].
- **Nhầm "hiếm" với "bằng chứng mạnh".** Một sự kiện hiếm dưới cả hai giả thuyết thì không phân biệt được gì. Cái quan trọng là **likelihood ratio**, không phải độ hiếm.
- **Multiple comparisons / look-elsewhere.** Xét 100 giả thuyết ở mức $\alpha=0.05$ thì kỳ vọng 5 cái "có ý nghĩa" dù tất cả đều sai.
- **Selection bias là conditioning ẩn** → [[Conditional Independence]].
- **Simpson's paradox** — trường hợp riêng quan trọng, xem [[Simpson's Paradox]].

## 5. Quy trình chống sai

1. Viết event ra bằng chữ, đầy đủ: "người này vô tội", "test dương tính".
2. Ghi rõ đang cần $P(A\mid B)$ hay $P(B\mid A)$.
3. Tìm base rate. Nếu không có, nói rõ là không có.
4. Tính $P(B\mid A^c)$ — likelihood của giả thuyết đối lập.
5. Dựng bảng tần suất tự nhiên với 10.000 đơn vị.
6. Dùng dạng odds của Bayes để ước lượng nhanh.

## 6. Checklist
- [ ] Câu đang nói là $P(A\mid B)$ hay $P(B\mid A)$? Viết ra giấy.
- [ ] Base rate là bao nhiêu? Nguồn nào?
- [ ] Đã tính likelihood dưới giả thuyết đối lập chưa?
- [ ] Các bằng chứng có thực sự độc lập không?
- [ ] Đã kiểm tra bằng bảng 10.000 người chưa?
- [ ] Có bao nhiêu giả thuyết đã được xét trước khi tìm ra cái này? (multiple comparisons)
- [ ] Cách thu thập dữ liệu có tạo selection bias không?

## Tham khảo
- Royal Statistical Society — thông cáo về vụ Sally Clark (2001): https://web.archive.org/web/20110824151124/http://www.rss.org.uk/uploadedfiles/documentlibrary/744.pdf
- Gigerenzer & Hoffrage — *How to improve Bayesian reasoning without instruction*: https://pure.mpg.de/rest/items/item_2101336/component/file_2101335/content
- Tversky & Kahneman — *Extensional versus intuitive reasoning* (conjunction fallacy): https://doi.org/10.1037/0033-295X.90.4.293
- Wikipedia — *Prosecutor's fallacy*: https://en.wikipedia.org/wiki/Prosecutor%27s_fallacy
- Wikipedia — *Base rate fallacy*: https://en.wikipedia.org/wiki/Base_rate_fallacy
- Stat 110 Lecture 5 (*Statistics in the law*): https://www.youtube.com/watch?v=JzDvVgNDxo8

## Liên kết
[[Bayes Rule]] · [[Conditional Probability]] · [[Independence]] · [[Simpson's Paradox]] · [[Confidence Intervals]] · [[Prob&Stats]]
