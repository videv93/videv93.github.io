---
tags: [os, moc]
type: MOC
updated: 2026-08-28
---
# 🖥️ Operating Systems — Bản đồ kiến thức (MOC)

> Trung tâm điều hướng của toàn bộ area OS. Hạt giống là một clipping mục lục [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/); vault này mở rộng nó thành hệ thống note tra cứu được.

## Cách dùng vault này
- **Học từ đầu** → theo [[OS Learning Roadmap]], không đọc theo thứ tự bảng chữ cái.
- **Tra cứu nhanh một khái niệm** → vào đúng thư mục đánh số; tên file = tên khái niệm tiếng Anh.
- **Đang debug một sự cố thật** → mở [[Linux Observability Tools]], tra bảng "triệu chứng → công cụ".
- **Đối chiếu với sách** → [[OSTEP Book Map]] ánh xạ từng chương sang note.
- Mỗi note có cùng cấu trúc: **Khái niệm → Nguyên tắc → Cạm bẫy → Checklist → Tham khảo**. Học được điều mới thì thêm vào đúng tầng, đừng tạo note mới.
- `status:` trong frontmatter: `seed` → `growing` → `evergreen`.

---

## 00 — Nền tảng
- [[Operating System]] — ba vai trò, các trục đánh đổi, kiến trúc kernel
- [[Three Easy Pieces]] — virtualization / concurrency / persistence và vì sao đúng thứ tự đó
- [[User Mode vs Kernel Mode]] — ranh giới bảo vệ cơ bản nhất, chi phí vượt ranh giới
- [[System Call]] — giao diện duy nhất vào kernel, cách giảm số lần gọi
- [[OSTEP Book Map]] — ánh xạ chương sách → note (**note nguồn**, giữ nguyên clipping gốc)
- [[OS Learning Roadmap]] — 8 chặng học, mỗi chặng có bài tự kiểm

## 01 — Ảo hoá CPU
- [[Process]] — machine state, vòng đời, process vs thread
- [[Process API]] — `fork`/`exec`/`wait`, vì sao tách hai bước, signal
- [[Limited Direct Execution]] — chạy trực tiếp + rào chắn; cooperative vs preemptive
- [[Context Switch]] — chuyện gì thực sự xảy ra, ba loại switch, chi phí gián tiếp
- [[CPU Scheduling]] — turnaround vs response, FIFO/SJF/STCF/RR
- [[Multi-level Feedback Queue]] — xấp xỉ SJF mà không biết trước độ dài job
- [[Proportional Share Scheduling]] — lottery, stride, CFS/EEVDF, cgroup
- [[Multiprocessor Scheduling]] — cache affinity, SQMS vs MQMS, NUMA, false sharing

## 02 — Ảo hoá bộ nhớ
- [[Address Space]] — ba mục tiêu, bố cục, VSZ vs RSS vs PSS, ASLR/NX
- [[Address Translation]] — phân công phần cứng/OS, base & bounds
- [[Segmentation]] — mỗi vùng một cặp base/bounds, external fragmentation
- [[Free Space Management]] — splitting, coalescing, first/best-fit, buddy, slab
- [[Memory API]] — `malloc` vs `mmap`, vì sao "free rồi mà RSS không giảm"
- [[Paging]] — trang, PTE, huge page, cái giá của paging
- [[Translation Lookaside Buffer]] — cache dịch địa chỉ, ASID, bức tường mở rộng
- [[Multi-level Page Table]] — cây 4/5 tầng, inverted, chi phí trong VM
- [[Swapping]] — present bit, page fault, thrashing, PSI, OOM
- [[Page Replacement Policy]] — OPT/FIFO/LRU/Clock/ARC, workload mẫu

## 03 — Đồng thời
- [[Thread]] — chia sẻ gì/riêng gì, race condition, các mô hình 1:1 / M:N
- [[Lock]] — test-and-set → ticket → futex, spin vs sleep, RWLock/RCU
- [[Concurrent Data Structures]] — sloppy counter, hash bucket, lock-free và ABA
- [[Condition Variable]] — always-`while`, Mesa semantics, producer/consumer
- [[Semaphore]] — P/V, ba vai trò theo giá trị khởi tạo, các bài toán kinh điển
- [[Deadlock]] — bốn điều kiện Coffman, lock ordering, livelock, priority inversion
- [[Concurrency Bugs]] — atomicity vs order violation, data race vs race condition, memory model
- [[Event-based Concurrency]] — event loop, epoll level/edge, vì sao blocking call giết server

## 04 — Bền vững
- [[IO Devices]] — polling vs interrupt vs DMA, phân tầng driver
- [[Hard Disk Drive]] — seek/rotation/transfer, vì sao tuần tự > ngẫu nhiên ~500×
- [[RAID]] — mức 0/1/4/5/6, small-write problem, rủi ro rebuild
- [[Files and Directories]] — inode vs tên, fd, hard/sym link, mẫu ghi an toàn
- [[File System Implementation]] — bố cục VSFS, multi-level index, chi phí đọc đường dẫn
- [[Fast File System]] — cylinder group, locality, di sản trong ext4
- [[Crash Consistency and Journaling]] — fsck vs journaling, data vs metadata mode
- [[Log-structured File System]] — ghi tuần tự, imap, garbage collection, di sản LSM-tree
- [[Flash-based SSD]] — FTL, write amplification, TRIM, độ bền cell
- [[Data Integrity and Protection]] — LSE vs silent corruption, checksum, scrub, fsyncgate

## 05 — Hệ phân tán
- [[Distributed Systems]] — giao tiếp không tin cậy, idempotency, RPC, ngữ nghĩa đảm bảo
- [[Network File System]] — stateless server, file handle, close-to-open consistency
- [[Andrew File System]] — whole-file caching + callback, bài học "đo trước khi thiết kế"

## 06 — Bảo mật
- [[OS Security Fundamentals]] — CIA, nguyên tắc Saltzer & Schroeder, threat model
- [[Authentication]] — ba yếu tố, hash mật khẩu đúng cách, PAM, setuid
- [[Access Control]] — ACL vs capability, quyền UNIX, DAC/MAC/RBAC, least privilege
- [[Cryptography in OS]] — AEAD, quản lý khoá, mã hoá đĩa, TPM, TLS/Kerberos

## 07 — VM & Container
- [[Virtual Machine Monitor]] — trap-and-emulate, EPT/NPT, VM vs container, steal time
- [[Containers]] — namespace + cgroup + seccomp, các cạm bẫy vận hành

## 08 — Thực hành
- [[xv6 and Lab Projects]] — ba mức thực hành, lộ trình lab MIT 6.1810
- [[Linux Observability Tools]] — bảng tra triệu chứng → công cụ → khái niệm

---

## Nguồn học nền tảng
| Nguồn | Loại | Link |
|---|---|---|
| **OSTEP** — Arpaci-Dusseau | sách chính, miễn phí | https://pages.cs.wisc.edu/~remzi/OSTEP/ |
| OSTEP homework simulators | thực hành theo chương | https://github.com/remzi-arpacidusseau/ostep-homework |
| OSTEP code | mã nguồn ví dụ | https://github.com/remzi-arpacidusseau/ostep-code |
| MIT 6.1810 + xv6-riscv | lab kernel thật | https://pdos.csail.mit.edu/6.1810/ |
| man7.org | tra API POSIX/Linux | https://man7.org/linux/man-pages/ |
| Linux kernel documentation | tham chiếu chính thức | https://docs.kernel.org/ |
| Brendan Gregg | hiệu năng, quan sát hệ thống | https://www.brendangregg.com/linuxperf.html |
| Drepper — *What Every Programmer Should Know About Memory* | bộ nhớ & cache | https://people.freebsd.org/~lstewart/articles/cpumemory.pdf |
| Kleppmann — *Designing Data-Intensive Applications* | nối sang hệ phân tán | https://dataintensive.net/ |

## Ghi chú về `_archive-seed/`
`_archive-seed/Operating Systems Three Easy Pieces.md` là **clipping gốc chưa chỉnh sửa** từ trang OSTEP (78 dòng). Toàn bộ nội dung của nó được giữ nguyên trong phần phụ lục của [[OSTEP Book Map]] — có thể `diff` để đối chiếu.

## Liên kết
[[Knowledge Seed Playbook]] — quy trình đã dùng để dựng vault này.
