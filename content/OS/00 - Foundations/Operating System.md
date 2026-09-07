---
tags: [os, foundation]
status: evergreen
---
# Operating System

> OS là phần mềm biến một đống phần cứng khó dùng, ít ỏi và không an toàn thành một môi trường dễ lập trình, chia sẻ được và có bảo vệ. Nó là **virtual machine manager** trước khi là bất cứ thứ gì khác.

## 1. Ba vai trò của OS
| Vai trò | Tiếng Anh trong sách | Nghĩa thực tế |
|---|---|---|
| **Người ảo hoá** | *Virtualization* | Biến 1 CPU thành N CPU ảo, 1 RAM thành N address space ảo → [[Three Easy Pieces]] |
| **Thủ thư API** | *Standard library* | Cung cấp [[System Call]] để chương trình chạm vào phần cứng một cách an toàn |
| **Trọng tài tài nguyên** | *Resource manager* | Quyết định ai được CPU, RAM, disk, khi nào và bao nhiêu |

Ba vai trò này xung đột nhau: ảo hoá tốn overhead, chia sẻ tốt thì công bằng giảm tính đáp ứng. Gần như mọi thiết kế OS là một cách cân bằng ba trục này.

## 2. Các "trục căng" (crux) xuyên suốt mọi chương
| Trục | Câu hỏi | Ví dụ đánh đổi |
|---|---|---|
| **Performance vs Protection** | Ảo hoá thế nào mà không chậm? | [[Limited Direct Execution]] — chạy trực tiếp trên CPU, chỉ chặn ở điểm nguy hiểm |
| **Time vs Space** | Đổi bộ nhớ lấy tốc độ hay ngược lại? | [[Translation Lookaside Buffer]], page table nhiều tầng |
| **Mechanism vs Policy** | *Làm thế nào* tách khỏi *làm cái gì* | [[Context Switch]] (mechanism) vs [[CPU Scheduling]] (policy) |
| **Fairness vs Throughput** | Chia đều hay chạy nhanh nhất? | [[Multi-level Feedback Queue]] vs SJF |
| **Reliability vs Performance** | Ghi an toàn hay ghi nhanh? | [[Crash Consistency and Journaling]] |

> **Mechanism/Policy separation** là ý tưởng thiết kế quan trọng nhất của cả cuốn sách. Mechanism ít khi đổi; policy đổi liên tục. Trộn hai thứ này = code OS không sửa được.

## 3. Vì sao cần OS — ba ảo giác nó bán cho bạn
1. **"Máy này chỉ có mình tôi chạy"** → [[Process]] + [[Address Space]]
2. **"CPU của tôi luôn sẵn sàng"** → [[CPU Scheduling]]
3. **"Dữ liệu tôi ghi là vĩnh viễn"** → [[File System Implementation]] + [[Crash Consistency and Journaling]]

Mỗi ảo giác đều **rò rỉ** (leaky). Biết chỗ rò ở đâu chính là khác biệt giữa lập trình viên ứng dụng và lập trình viên hệ thống: cache miss, page fault, `fsync` chậm, context switch storm — tất cả là ảo giác bị rách.

## 4. Kiến trúc kernel
| Kiểu | Ý tưởng | Ví dụ | Đánh đổi |
|---|---|---|---|
| **Monolithic** | Mọi thứ trong kernel space | Linux, xv6 | Nhanh; lỗi driver = sập máy |
| **Microkernel** | Kernel chỉ giữ IPC + scheduling, còn lại ở user space | seL4, QNX, Minix | An toàn, verify được; IPC overhead |
| **Hybrid** | Trung dung | Windows NT, XNU (macOS) | Thoả hiệp cả hai chiều |
| **Unikernel** | App + kernel biên dịch chung một binary | MirageOS | Cực gọn cho cloud; không đa nhiệm |

Linux tuy monolithic nhưng có **loadable kernel module** và eBPF → mở rộng runtime mà không cần biên dịch lại.

## 5. Cạm bẫy hay gặp
- **Nghĩ OS luôn chạy.** OS không phải một tiến trình chạy nền liên tục — phần lớn thời gian nó *không chạy*. Nó chỉ thức dậy khi có [[System Call]], interrupt hoặc trap. Không có cơ chế đó thì kernel không giành lại được CPU.
- **Nhầm "kernel" với "OS".** OS = kernel + libc + shell + daemon + tooling. Bug bạn gặp thường nằm ở tầng ngoài kernel.
- **Coi lời hứa của API là lời hứa của phần cứng.** `write()` thành công ≠ dữ liệu đã trên đĩa. Xem [[Data Integrity and Protection]].
- **Tối ưu trước khi biết ảo giác nào đang rách.** Đo bằng công cụ ở [[Linux Observability Tools]] trước.

## 6. Checklist áp dụng
- [ ] Vấn đề hiệu năng tôi đang gặp thuộc trục nào: CPU, memory, I/O, hay concurrency?
- [ ] Đây là lỗi **mechanism** (cơ chế sai) hay **policy** (chính sách chọn sai)?
- [ ] Ảo giác nào đang rò rỉ? (page fault? context switch? fsync?)
- [ ] Tôi đang đo hay đang đoán?
- [ ] Có system call nào đang bị gọi trong vòng lặp nóng không? (`strace -c`)

## Tham khảo
- OSTEP ch.2 *Introduction to Operating Systems*: https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf
- Lampson — *Hints for Computer System Design*: https://www.microsoft.com/en-us/research/publication/hints-for-computer-system-design/
- Linux kernel docs — Kernel Architecture: https://docs.kernel.org/
- seL4 — microkernel được chứng minh hình thức: https://sel4.systems/
- MIT 6.1810 (xv6) — Operating System Engineering: https://pdos.csail.mit.edu/6.1810/

## Liên kết
[[Three Easy Pieces]] · [[System Call]] · [[User Mode vs Kernel Mode]] · [[OS Learning Roadmap]] · [[OS]]
