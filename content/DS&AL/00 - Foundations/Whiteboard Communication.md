---
tags: [dsal, foundations, interview]
status: evergreen
---
# Whiteboard Communication

> Cách bạn **trình bày** quyết định điểm ngang với cách bạn **giải**. Interviewer không đọc được suy nghĩ; họ chỉ chấm được thứ bạn nói ra và viết ra.

## 1. Nguyên tắc vàng

1. **Think out loud.** Im lặng khiến interviewer không giúp được khi bạn bí, và không đánh giá được cách tiếp cận.
2. **Bắt đầu từ ví dụ cụ thể.** Vẽ input ra, chạy thuật toán bằng tay từng bước trước khi code.
3. **Code top-down.** Viết `def solve(...)` gọi các helper trước, cài helper sau — thể hiện tư duy thiết kế.
4. **Tên biến rõ ràng**: ✅ `left`, `right`, `slow`, `fast`, `prev`, `curr` — ❌ `a`, `b`, `x`, `tmp`.
5. **Đừng viết ngắn cho ngắn.** Code rõ ràng > một dòng "thông minh".

## 2. Khi bí

- **Nói brute force ra**: *"Em nghĩ brute force `O(n²)` chạy được nhưng sẽ TLE; em đang tìm hướng tối ưu…"* — vừa mua thời gian, vừa ghi điểm.
- **Vẽ. Vẽ. Vẽ.** Tree, graph, array, bảng trace ra giấy. Phần lớn bug lộ ra ngay khi vẽ.
- **Đơn giản hoá ví dụ**: thử `n = 3` thay vì `n = 100`.
- **Xin gợi ý một cách chuyên nghiệp**: *"Em đang lưỡng lự giữa hash map và sorted array — anh/chị có gợi ý nào không?"* Xin hint không bị trừ điểm; ngồi im 10 phút thì có.

## 3. Cạm bẫy về tác phong

- **Tranh luận với interviewer.** Họ chỉ bug → kiểm chứng ngay bằng một ví dụ, đừng biện hộ.
- **Giả vờ biết.** Chưa gặp pattern → nói thẳng và xin phép suy nghĩ từ first principles. Trung thực được đánh giá cao hơn nhiều so với bịa.
- **Code trong im lặng 10 phút** rồi mới nói "xong" — interviewer mất dấu, và nếu sai hướng thì không ai kéo lại được.
- **Quên chạy edge case** sau khi code xong: rỗng, 1 phần tử, giá trị max theo constraint.
- **Quên cảm ơn & hỏi feedback** ở cuối buổi.

## 4. Checklist áp dụng

- [ ] Đã vẽ/viết ví dụ cụ thể trước khi code chưa?
- [ ] Tên biến có tự giải thích được không (đọc là hiểu vai trò)?
- [ ] Đã nói ra mỗi quyết định thiết kế khi gõ nó không?
- [ ] Sau khi code xong: đã chạy ví dụ chính + ít nhất 2 edge case chưa?
- [ ] Đã phát biểu độ phức tạp cuối cùng thành câu hoàn chỉnh chưa? ("Time `O(n log n)` vì bước sort chiếm chi phí lớn nhất.")
- [ ] Đã đề xuất một hướng tối ưu tiếp theo (dù không cài) chưa?

## Tham khảo

- [Tech Interview Handbook — During the coding interview](https://www.techinterviewhandbook.org/coding-interview-techniques/)
- [interviewing.io — Mock interview recordings](https://interviewing.io/recordings) — xem người thật trình bày, kể cả khi họ bí
- [Pramp — Peer mock interviews](https://www.pramp.com/) — luyện phần nói, miễn phí
- *Cracking the Coding Interview* — Gayle Laakmann McDowell, chương "Behind the Scenes" (cách interviewer chấm)

## Liên kết
[[Interview Process UMPIRE]] · [[Behavioral STAR]] · [[Interview Checklist]] · [[Study Roadmap]] · [[DS&AL]]
