---
tags: [os, foundation]
status: evergreen
---
# Three Easy Pieces

> Toàn bộ ngành hệ điều hành gói trong ba câu hỏi: **ảo hoá** (làm sao chia tài nguyên vật lý?), **đồng thời** (làm sao nhiều luồng không phá nhau?), **bền vững** (làm sao dữ liệu sống sót?). Mọi chương của [[OSTEP Book Map]] là một biến thể của một trong ba.

## 1. Ba mảnh ghép
| Piece | Tài nguyên bị ảo hoá / bảo vệ | Vấn đề gốc | Note khởi đầu |
|---|---|---|---|
| **Virtualization** | CPU, bộ nhớ | Tài nguyên vật lý ít hơn nhu cầu | [[Process]], [[Address Space]] |
| **Concurrency** | Trạng thái dùng chung | Thao tác không nguyên tử bị xen giữa | [[Thread]], [[Lock]] |
| **Persistence** | Disk / SSD | Thiết bị chậm và có thể mất điện giữa chừng | [[Files and Directories]], [[Crash Consistency and Journaling]] |

## 2. Vì sao đúng thứ tự đó
1. **Virtualization trước** vì nó tạo ra khái niệm [[Process]] — đơn vị mà mọi thứ khác dựa vào.
2. **Concurrency sau** vì nó chỉ xuất hiện khi đã có nhiều luồng thực thi trong cùng [[Address Space]].
3. **Persistence cuối** vì nó dùng lại cả hai: I/O cần scheduling (virtualization) và cần khoá (concurrency).

Học lệch thứ tự này thường dẫn tới hiểu nửa vời — ví dụ học lock trước khi hiểu context switch thì không cảm nhận được *vì sao* race condition xảy ra.

## 3. Bảng đối chiếu nhanh ba piece
| | Virtualization | Concurrency | Persistence |
|---|---|---|---|
| Kẻ thù | Tài nguyên hữu hạn | Interleaving bất định | Mất điện, hỏng bit |
| Vũ khí chính | Time-sharing, space-sharing | Nguyên tử hoá (atomicity) | Ghi có thứ tự + redundancy |
| Đơn vị đo | Turnaround, response time | Throughput, contention | IOPS, latency, độ bền |
| Bug đặc trưng | Thrashing, priority inversion | Race, [[Deadlock]] | Corrupt sau crash |
| Công cụ debug | `top`, `perf` | `tsan`, `helgrind` | `fsck`, checksum |

## 4. Bốn ý tưởng xuyên suốt cả ba
1. **Indirection** — thêm một lớp ánh xạ thì mọi thứ đều giải quyết được (page table, inode, file descriptor).
2. **Caching** — mọi tầng đều có cache; mọi cache đều có bài toán thay thế → [[Page Replacement Policy]].
3. **Atomicity** — hoặc làm hết, hoặc không làm gì. Xuất hiện ở [[Lock]] lẫn [[Crash Consistency and Journaling]].
4. **Separation of mechanism & policy** — xem [[Operating System]] mục 2.

> Nếu chỉ nhớ một câu từ OSTEP: *"All problems in computer science can be solved by another level of indirection — except the problem of too many levels of indirection."*

## 5. Cạm bẫy
- **Đọc mà không chạy simulator.** Scheduling và paging chỉ "vào đầu" khi bạn tự tay chạy `scheduler.py`, `paging-linear-translate.py`.
- **Bỏ qua phần dialogue.** Dialogue đầu mỗi piece nêu chính xác câu hỏi mà piece đó trả lời — đọc nó là có khung để treo kiến thức.
- **Học Persistence rời rạc khỏi Concurrency.** Journaling chính là transaction; hiểu lock trước thì journaling hiển nhiên.

## 6. Checklist áp dụng
- [ ] Vấn đề tôi đang gặp thuộc piece nào?
- [ ] Tôi đã đọc dialogue mở đầu của piece đó chưa?
- [ ] Có homework simulator nào cho chương này không?
- [ ] Tôi giải thích được cho người khác trong 2 phút vì sao piece này tồn tại chưa?

## Tham khảo
- OSTEP — Dialogue on Virtualization: https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-virtualization.pdf
- OSTEP — Dialogue on Concurrency: https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-concurrency.pdf
- OSTEP — Dialogue on Persistence: https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-persistence.pdf
- OSTEP homework simulators: https://github.com/remzi-arpacidusseau/ostep-homework

## Liên kết
[[Operating System]] · [[OSTEP Book Map]] · [[OS Learning Roadmap]] · [[OS]]
