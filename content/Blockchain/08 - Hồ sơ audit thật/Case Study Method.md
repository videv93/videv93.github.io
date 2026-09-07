---
tags: [audit, case-study, phương-pháp]
status: evergreen
---
# Case Study Method

> ⚠️ Đọc [[Contest Severity vs Real Risk]] trước khi dùng bất kỳ báo cáo audit nào làm bằng chứng về mức độ an toàn.

> Đọc một báo cáo audit từ đầu tới cuối là **cách học kém nhất** từ nó. Bạn thu được cảm giác đã hiểu mà không có kỹ năng nào. Note này là quy trình bóc một báo cáo để thực sự học được.

## 1. Ba cách đọc, theo thứ tự giá trị

| Cách | Cách làm | Thu được |
|---|---|---|
| ❌ **Đọc xuôi** | Đọc từ H-01 tới QA cuối | Cảm giác hiểu, không có kỹ năng |
| ⭐⭐ **Đọc ngược** | Đọc **tiêu đề** finding trước, tự tìm bug trong code, rồi mới đọc mô tả | Luyện mắt |
| ⭐⭐⭐ **Đọc mù** | **Không đọc báo cáo.** Audit repo theo quy trình đầy đủ, rồi so kết quả | Luyện toàn bộ quy trình |

Ba repo trong `_archive-seed/` đều dùng được cho cách thứ ba — repo gốc còn công khai trên GitHub của Code4rena.

## 2. Quy trình đọc mù

1. Clone repo contest (`code-423n4/2024-XX-<name>`), checkout đúng commit.
2. **Không mở báo cáo.**
3. Chạy [[Audit Workflow]] đầy đủ, **giới hạn thời gian** (8–16 giờ cho một codebase 3.000 dòng).
4. Viết finding thật, có severity tự chấm — xem [[Writing a Finding]].
5. Mở báo cáo. Lập bảng ba cột:

| Tôi tìm được | Tôi bỏ sót | Tôi báo mà không có trong báo cáo |
|---|---|---|

6. **Cột giữa là bài học.** Với mỗi dòng, hỏi: *tôi lẽ ra phải nhìn vào đâu, và câu hỏi nào lẽ ra phải hỏi?*
7. Biến câu hỏi đó thành một dòng trong [[Audit Checklist Master]].
8. **Cột phải cũng là bài học** — hoặc bạn tìm được thứ warden bỏ sót (có thật), hoặc bạn đang báo cáo thứ không phải bug (hay gặp hơn).

## 3. Sáu câu hỏi cho mỗi finding khi đọc

1. **Dấu hiệu bề mặt là gì?** Cái gì nhìn thấy được mà không cần hiểu cả protocol? (Ví dụ: một trường struct không ai đọc)
2. **Thuộc lớp nào?** Ánh xạ vào [[Vulnerability Taxonomy]].
3. **Tìm bằng cách nào?** Đọc tuần tự, so cặp hàm, đi ngược từ tiền, hay chạy công cụ?
4. **Vì sao sponsor bỏ sót?** Thường có một giả định ngầm — đó là bài học chuyển được sang codebase khác.
5. **Severity được quyết thế nào?** Có tranh luận không? Ai thắng bằng lập luận gì?
6. **Bản vá có đúng không?** Xem [[Mitigation Review]] — 15% là không.

## 4. Cái đáng đọc mà hầu hết người đọc bỏ qua

| Phần | Vì sao đáng |
|---|---|
| **Bình luận của sponsor** | Lộ ra giả định vận hành không có trong code |
| **Tranh luận severity** | Dạy cách severity thực sự được quyết |
| **Phần QA/Low** | Nhiều bài học về đọc code hơn phần High; và nó rẻ hơn để đọc |
| **Mitigation review** | Phần giá trị cao nhất, và ít báo cáo nào có |
| **Trường "Assessed type"** | Cho thấy taxonomy chính thức yếu tới đâu |
| **Số warden / số dòng code** | Cho biết báo cáo là quét đầy đủ hay mẫu ngẫu nhiên |

## 5. Cạm bẫy

1. **Đọc để giải trí.** Không có bảng ba cột thì không có bài học.
2. **Chỉ đọc High.** Gondi có **0 High** và vẫn là ca đáng học nhất về audit "sạch".
3. **Kết luận "protocol này tệ" từ số finding.** Xem mục 3 của [[Contest Severity vs Real Risk]].
4. **Bỏ qua báo cáo ở ngôn ngữ khác.** Coded Estate là Rust, Kakarot là Cairo — **lớp lỗi thì giống nhau**, và đó chính là điểm.
5. **Không giới hạn thời gian khi đọc mù.** Không có deadline thì không mô phỏng được điều kiện thật.
6. **Không lưu lại bài học.** Bảng ba cột phải chảy vào checklist, nếu không nó bốc hơi trong hai tuần.

## 6. Checklist áp dụng

- [ ] Đã chọn cách đọc phù hợp với mục tiêu (luyện mắt hay luyện quy trình) chưa?
- [ ] Với đọc mù: đã đặt giới hạn thời gian trước khi bắt đầu chưa?
- [ ] Đã lập bảng ba cột chưa?
- [ ] Với mỗi finding bỏ sót: đã viết ra *câu hỏi lẽ ra phải hỏi* chưa?
- [ ] Những câu hỏi đó đã vào [[Audit Checklist Master]] chưa?
- [ ] Đã đọc phần bình luận của sponsor và tranh luận severity chưa?
- [ ] Đã đọc phần QA/Low chưa?
- [ ] Có mitigation review không? Đã đọc chưa?
- [ ] Đã ghi tỉ lệ dòng-code/warden để hiệu chỉnh kỳ vọng chưa?

## Tham khảo

- [Code4rena reports](https://code4rena.com/reports) — kho báo cáo công khai
- [Solodit](https://solodit.xyz/) — tổng hợp finding từ mọi hãng, lọc theo lớp lỗi
- [Sherlock audits](https://audits.sherlock.xyz/contests) · [Cantina](https://cantina.xyz/)
- Ba báo cáo trong `_archive-seed/` — dùng làm bài tập đọc mù

## Liên kết

[[Case Gondi]] · [[Case Coded Estate]] · [[Case Kakarot]] · [[Cross-case Patterns]] · [[Contest Severity vs Real Risk]] · [[Blockchain]]
