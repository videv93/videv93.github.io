---
tags: [dsal, foundations, interview]
status: evergreen
---
# Interview Process UMPIRE

> Framework 6 bước để **không đóng băng** khi nhận đề. Interviewer chấm *quá trình tư duy*, không chấm việc bạn ra đáp án ngay — UMPIRE là cách biến tư duy thành thứ quan sát được.

## 1. Khái niệm cốt lõi

| Bước | Thời lượng (vòng 45') | Việc phải làm | Sản phẩm đầu ra |
| --- | --- | --- | --- |
| **U** — Understand | 5' | Diễn đạt lại đề bằng lời mình, hỏi 2–3 clarifying question | 1–2 ví dụ nhỏ kèm kết quả mong đợi |
| **M** — Match | 2' | "Bài này giống pattern nào mình đã làm?" | Tên pattern + cấu trúc dữ liệu ứng viên |
| **P** — Plan | 5' | Brute force trước → tìm optimization → **chốt hướng với interviewer** | Mô tả thuật toán + `O(?)` dự kiến |
| **I** — Implement | 15' | Code sạch, tên biến có nghĩa, tách helper | Code chạy được |
| **R** — Review | 3' | Dry-run bằng tay, soi off-by-one / edge case / overflow | Danh sách bug đã sửa |
| **E** — Evaluate | 2' | Phân tích lại time & space, bàn hướng tối ưu tiếp | Câu trả lời cho follow-up |

## 2. Nguyên tắc

1. **Không code trước khi chốt hướng.** Code sai hướng 15 phút là vòng phỏng vấn đã hỏng; xác nhận plan tốn 30 giây.
2. **Luôn nói brute force ra miệng** — kể cả khi biết nó TLE. Nó chứng minh bạn hiểu đề và tạo baseline để so sánh độ phức tạp.
3. **Clarifying question phải cụ thể**: rỗng/null/âm/overflow? `n` lớn cỡ nào? Output là index hay value? (Xem thêm bộ câu hỏi riêng của từng pattern ở [[Array]], [[String]], [[Graph Representation]].)
4. **Think out loud.** Im lặng khiến interviewer không giúp được bạn khi bí, và không chấm được cách bạn tiếp cận.
5. **Constraint là gợi ý thuật toán.** `n ≤ 20` → bitmask; `n ≤ 10^5` → `O(n log n)`; `n ≤ 10^9` → search on answer. Bảng đầy đủ ở [[Big-O Analysis]].

## 3. Cạm bẫy hay gặp

- **Nhảy thẳng vào code** khi thấy bài quen → trúng biến thể có twist, phải viết lại từ đầu.
- **Bỏ qua bước Review** vì hết giờ → nộp code có off-by-one. Thà code chậm hơn 2 phút còn hơn không dry-run.
- **Tranh luận khi interviewer chỉ ra bug** → kiểm chứng ngay bằng một ví dụ nhỏ thay vì biện hộ (xem [[Whiteboard Communication]]).
- **Giả vờ biết pattern chưa gặp** → nói thẳng: *"Em chưa gặp pattern này, cho em suy nghĩ từ first principles."*
- **Chỉ phân tích time, quên space** — recursion stack cũng tính vào space.

## 4. Checklist áp dụng

- [ ] Đã diễn đạt lại đề bằng lời của mình chưa?
- [ ] Đã hỏi ít nhất 2 clarifying question về edge case và constraint chưa?
- [ ] Đã viết 1 ví dụ nhỏ + kết quả mong đợi ra màn hình/giấy chưa?
- [ ] Đã nói brute force và độ phức tạp của nó chưa?
- [ ] Interviewer đã **gật đầu** với hướng giải trước khi mình gõ dòng code đầu tiên chưa?
- [ ] Đã dry-run bằng tay với ví dụ nhỏ trước khi nói "em xong" chưa?
- [ ] Đã nêu cả time **và** space complexity cuối cùng chưa?

## Mẫu lời nói cho từng giai đoạn

| Giai đoạn | Câu mẫu |
| --- | --- |
| Làm rõ đề | *"Cho em xác nhận lại đề: input là …, output là …, có ràng buộc gì thêm không?"* |
| Brute force | *"Trước hết em mô tả cách trực tiếp: duyệt mọi cặp, độ phức tạp `O(n²)`…"* |
| Tối ưu | *"Em thấy có thể dùng hash map để giảm tra cứu xuống `O(1)`…"* |
| Bí | *"Em đang lưỡng lự giữa hash map và sorted array. Anh/chị có gợi ý nào không?"* |
| Xong | *"Lời giải chạy `O(n)` thời gian, `O(n)` bộ nhớ. Để em chạy thử vài edge case…"* |

## Tham khảo

- [Coding DSA Interview At Big Tech — 0.2 UMPIRE](https://engineerpro-team.github.io/coding-book/vi/) — nguồn gốc của khung 6 bước này
- [Tech Interview Handbook — Coding interview best practices](https://www.techinterviewhandbook.org/coding-interview-best-practices/) — checklist tương đương từ ex-Meta/Google
- [Interviewing.io — How to think out loud](https://interviewing.io/guides/technical-interview-tips) — phân tích record phỏng vấn thật
- *Cracking the Coding Interview* — Gayle Laakmann McDowell, phần "Interview Preparation Grid"

## Liên kết
[[Big-O Analysis]] · [[Whiteboard Communication]] · [[Python Interview Toolkit]] · [[Study Roadmap]] · [[Pattern Selection Map]] · [[Interview Checklist]] · [[DS&AL]]
