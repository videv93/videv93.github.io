---
tags: [os, concurrency]
status: evergreen
---
# Lock

> Công cụ biến một đoạn lệnh nhiều bước thành **nguyên tử về mặt logic**. Toàn bộ chương này là hành trình đi từ "tắt interrupt" tới các nguyên thuỷ phần cứng và cuối cùng là futex.

## 1. Ba tiêu chí đánh giá một lock
| Tiêu chí | Câu hỏi |
|---|---|
| **Correctness** | Có thực sự loại trừ lẫn nhau không? |
| **Fairness** | Có thread nào bị đói (starvation) không? |
| **Performance** | Overhead khi 1 thread? khi nhiều thread 1 core? khi nhiều core? |

Ba tiêu chí này **xung đột**: lock công bằng (ticket, FIFO) thường chậm hơn lock không công bằng; lock nhanh nhất thường cho phép "barging".

## 2. Đường tiến hoá của cài đặt
| Cách | Cơ chế | Vấn đề |
|---|---|---|
| **Tắt interrupt** | `cli`/`sti` | chỉ dùng được trong kernel, chỉ đúng trên 1 CPU, nguy hiểm |
| **Cờ đơn giản** (`flag = 1`) | không nguyên tử | chính nó có race |
| **Test-and-Set** (`xchg`) | phần cứng đảm bảo nguyên tử | spin, **không công bằng** |
| **Compare-and-Swap** (`cmpxchg`) | mạnh hơn, dùng được cho lock-free | như trên |
| **Load-Linked / Store-Conditional** | ARM, RISC-V, PowerPC | như trên |
| **Fetch-and-Add → Ticket lock** | mỗi thread lấy số thứ tự | **công bằng**, nhưng vẫn spin |
| **Spin + `yield()`** | nhường CPU thay vì quay vòng | vẫn tốn [[Context Switch]] |
| **Queue lock / futex** | ngủ trong hàng đợi, được đánh thức đúng người | tốt nhất trong thực tế |

## 3. Futex — cách Linux làm nhanh
`futex` = **fast userspace mutex**. Ý tưởng: **đường đi thuận lợi không cần syscall.**
1. Không có tranh chấp → `cmpxchg` trong user space thành công → **không vào kernel** ([[System Call]] rất đắt).
2. Có tranh chấp → `futex(FUTEX_WAIT)` → thread ngủ trong hàng đợi kernel.
3. Unlock có người chờ → `futex(FUTEX_WAKE)`.

Đó là lý do `pthread_mutex` không tranh chấp gần như miễn phí, nhưng khi contention cao thì chi phí nhảy vọt.

## 4. Two-phase lock và spin vs sleep
| | Spin | Sleep |
|---|---|---|
| Tốt khi | critical section rất ngắn, có nhiều core, thread giữ khoá đang chạy | critical section dài, hoặc số thread > số core |
| Tệ khi | thread giữ khoá bị **preempt** → mọi thread khác spin vô ích | overhead đánh thức lớn hơn thời gian chờ |

**Two-phase**: spin một lúc ngắn, không được thì mới ngủ. Đây là hành vi của mutex adaptive trong glibc và của phần lớn runtime hiện đại.

## 5. Các loại lock khác
| Loại | Dùng khi |
|---|---|
| **Recursive mutex** | cùng thread khoá nhiều lần — thường là dấu hiệu thiết kế chưa rõ |
| **Read-Write lock** | đọc nhiều hơn ghi rất nhiều; coi chừng writer starvation và overhead cao hơn mutex thường |
| **Spinlock** | trong kernel, critical section vài chục lệnh, không được ngủ |
| **Seqlock** | reader không khoá, thử lại nếu counter đổi — hợp với dữ liệu đọc cực nhiều (clock) |
| **RCU** | reader gần như miễn phí, writer trả giá; dùng nhiều trong kernel Linux |

## 6. Cạm bẫy
- **Khoá quá lớn (coarse)** → mất song song. **Khoá quá nhỏ (fine)** → dễ [[Deadlock]] và tốn overhead. Bắt đầu bằng khoá lớn, chỉ chia nhỏ khi đã đo.
- **RWLock "chắc nhanh hơn mutex"** — thường không, vì phải cập nhật bộ đếm chia sẻ (cache line ping-pong). Đo trước.
- **Spinlock ở user space** khi thread nhiều hơn core → thảm hoạ (thread giữ khoá bị preempt).
- **Giữ khoá khi gọi I/O hoặc callback của người dùng** → chặn dài và mở đường cho deadlock.
- **Quên `unlock` ở đường thoát lỗi** → dùng RAII (`std::lock_guard`), `defer`, hoặc `pthread_cleanup_push`.
- **Cho rằng `volatile` thay được lock** — không. `volatile` không đảm bảo nguyên tử hay thứ tự bộ nhớ.

## 7. Checklist áp dụng
- [ ] Mỗi dữ liệu chia sẻ có đúng một khoá bảo vệ, đã ghi rõ trong comment/tên biến chưa?
- [ ] Critical section có gọi I/O, allocation lớn, hay callback không?
- [ ] Có thứ tự khoá toàn cục nếu giữ nhiều khoá cùng lúc không? → [[Deadlock]]
- [ ] Đã đo contention chưa? (`perf lock`, `mutrace`, `perf c2c`)
- [ ] Có thay được bằng dữ liệu bất biến / per-thread / atomic đơn giản không?

## Tham khảo
- OSTEP ch.28 *Locks*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf
- Ulrich Drepper — *Futexes Are Tricky*: https://www.akkadia.org/drepper/futex.pdf
- `futex(2)`: https://man7.org/linux/man-pages/man2/futex.2.html
- Mellor-Crummey & Scott — *MCS locks*: https://dl.acm.org/doi/10.1145/103727.103729
- Linux kernel locking docs (RCU, seqlock): https://docs.kernel.org/locking/index.html

## Liên kết
[[Thread]] · [[Concurrent Data Structures]] · [[Condition Variable]] · [[Deadlock]] · [[Multiprocessor Scheduling]] · [[OS]]
