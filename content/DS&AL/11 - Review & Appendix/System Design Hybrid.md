---
tags: [dsal, interview, design]
status: evergreen
---
# System Design Hybrid

> Một số vòng phỏng vấn yêu cầu **vừa design vừa implement**: thiết kế class/interface rồi cài đặt các method. Đây là vùng giao giữa DSA và system design — và là nơi các bài "Design X" của LeetCode sống.

## 1. Quy trình 4 bước

1. **Làm rõ scope** — API nào cần có? Ràng buộc gì (thread-safe? capacity? độ trễ)?
2. **Thiết kế class/interface** — viết signature của mọi method trước khi cài đặt bất kỳ method nào.
3. **Cài đặt từng method** — bắt đầu từ method đơn giản nhất.
4. **Test** — gọi thử một chuỗi thao tác và trace bằng tay.

Bước 2 là bước hay bị bỏ qua nhất và cũng là bước ghi điểm nhiều nhất.

## 2. Bảng bài Design → cấu trúc dữ liệu

| Bài | Cấu trúc | Note |
| --- | --- | --- |
| **LRU Cache** (LC 146) | Hash + doubly linked list | [[Hash Table]], [[Linked List]] |
| **LFU Cache** (LC 460) | Hash + hash of DLL theo freq | [[Linked List]] |
| **Snake Game** (LC 353) | Deque + set | [[Stack and Queue]] |
| **Rate Limiter** | Sliding window / token bucket | [[Sliding Window]], [[Interval]] |
| **Twitter Feed** (LC 355) | Heap k-way merge + hash follow | [[Heap]] |
| **Search Autocomplete** (LC 642) | Trie + top-k mỗi node | [[Trie]] |
| **Tic-Tac-Toe** (LC 348) | Mảng đếm theo hàng/cột/chéo | [[Hash Table]] |
| **File System** (LC 588) | Trie / nested dict | [[Trie]] |
| **Min Stack** (LC 155) | Stack phụ | [[Stack and Queue]] |
| **Median from Data Stream** (LC 295) | Hai heap | [[Heap]] |
| **Range Sum Mutable** (LC 307) | Fenwick / Segment | [[Advanced Tree]] |
| **Insert Delete GetRandom O(1)** (LC 380) | Hash + array (swap-with-last) | [[Hash Table]] |

## 3. Nguyên tắc thiết kế thường được hỏi tới

- **Kết hợp hai cấu trúc để bù trừ nhau** — LRU là ví dụ kinh điển: hash trả lời "ở đâu", DLL trả lời "cũ nhất là ai". Nói ra được nguyên tắc này là điểm cộng lớn.
- **Amortized O(1)**: Insert/Delete/GetRandom dùng trick "swap phần tử cần xoá với phần tử cuối rồi pop".
- **Lazy deletion**: thay vì xoá khỏi heap (không làm được `O(log n)`), đánh dấu và bỏ qua khi pop ([[Dijkstra]] dùng đúng trick này).
- **Sentinel / dummy node**: tránh hàng loạt `if head is None` trong DLL ([[Linked List]]).

## 4. Cạm bẫy

- **Cài đặt trước khi chốt API** → phải viết lại giữa chừng.
- **Quên câu hỏi capacity / eviction policy** ở bài cache.
- **Không hỏi về thread-safety** — với bài "design", đây là clarifying question rất được đánh giá cao (dù thường interviewer sẽ nói "bỏ qua").
- **Dùng `OrderedDict` cho LRU rồi dừng** — phỏng vấn senior thường yêu cầu cài tay bằng dict + DLL để thấy bạn hiểu vì sao nó `O(1)`.
- **Quên trace một chuỗi thao tác** ở cuối — bug ở method `remove`/`evict` chỉ lộ ra khi chạy nhiều lệnh liên tiếp.

## 5. Checklist áp dụng

- [ ] Đã liệt kê đủ API và signature trước khi cài chưa?
- [ ] Mỗi method có độ phức tạp mục tiêu rõ ràng chưa?
- [ ] Có cần kết hợp hai cấu trúc dữ liệu không? Mỗi cái trả lời câu hỏi gì?
- [ ] Đã hỏi về capacity / eviction / thread-safety chưa?
- [ ] Đã trace một chuỗi ≥ 5 thao tác bằng tay chưa?

## Tham khảo

- [LeetCode — Design tag](https://leetcode.com/tag/design/)
- [Tech Interview Handbook — Object-oriented design](https://www.techinterviewhandbook.org/coding-interview-study-plan/)
- [Hello Interview — System design](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) — cho vòng system design thuần
- [Python docs — collections.OrderedDict](https://docs.python.org/3/library/collections.html#collections.OrderedDict)

## Liên kết
[[Hash Table]] · [[Linked List]] · [[Heap]] · [[Trie]] · [[Advanced Tree]] · [[Interview Process UMPIRE]] · [[DS&AL]]
