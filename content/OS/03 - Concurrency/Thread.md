---
tags: [os, concurrency]
status: evergreen
---
# Thread

> Luồng thực thi độc lập **bên trong** một [[Process]]: có PC và stack riêng, nhưng **chia sẻ [[Address Space]]**. Chính việc chia sẻ đó vừa là lý do thread nhanh, vừa là nguồn gốc của mọi bug đồng thời.

## 1. Thread chia sẻ gì, riêng gì
| Riêng mỗi thread | Chia sẻ toàn process |
|---|---|
| Thanh ghi (kể cả PC, SP) | Code (text) |
| **Stack** | Heap, biến toàn cục |
| errno, TLS (thread-local storage) | Bảng file descriptor |
| Signal mask, tên thread | Page table, cwd, uid |

→ Stack riêng nghĩa là [[Address Space]] có **nhiều stack** rải rác, không còn "một stack ở đỉnh". Đây là thay đổi lớn nhất so với mô hình process đơn luồng.

## 2. Vì sao dùng thread
1. **Song song hoá** (parallelism) — chia việc CPU-bound cho nhiều core → [[Multiprocessor Scheduling]].
2. **Tránh chặn vì I/O** (concurrency) — thread này chờ đĩa, thread khác vẫn chạy.
3. Chia sẻ dữ liệu rẻ hơn IPC giữa các process.

> **Concurrency ≠ Parallelism.** Concurrency là *cấu trúc* (nhiều việc đang tiến hành); parallelism là *thực thi* (nhiều việc chạy cùng lúc trên nhiều core). Một máy 1 core vẫn concurrent được.

## 3. Vấn đề cốt lõi: race condition
```c
counter = counter + 1;   // biên dịch thành: load → add → store
```
Ba lệnh này **không nguyên tử**. Hai thread xen kẽ ở giữa → mất cập nhật.

| Khái niệm | Nghĩa |
|---|---|
| **Critical section** | Đoạn code chạm dữ liệu chung, không được chạy đồng thời |
| **Race condition** | Kết quả phụ thuộc thứ tự thực thi |
| **Indeterminate** | Chương trình cho kết quả khác nhau giữa các lần chạy |
| **Mutual exclusion** | Đảm bảo chỉ một thread trong critical section → [[Lock]] |

## 4. API cơ bản (pthread)
| Hàm | Vai trò |
|---|---|
| `pthread_create` / `pthread_join` | tạo / chờ thread kết thúc |
| `pthread_mutex_lock/unlock` | [[Lock]] |
| `pthread_cond_wait/signal/broadcast` | [[Condition Variable]] |
| `sem_wait/sem_post` | [[Semaphore]] |
| `pthread_detach` | thread tự dọn, không cần join |

Quy tắc: **luôn kiểm tra giá trị trả về**; **không bao giờ trả về con trỏ tới biến trên stack của thread** đã kết thúc.

## 5. Các mô hình thread
| Mô hình | Ví dụ | Đặc điểm |
|---|---|---|
| **1:1** (kernel thread) | pthread trên Linux | scheduler kernel quản lý; context switch đắt hơn |
| **N:1** (green thread) | Ruby cũ | rẻ, nhưng một thread block là cả process block |
| **M:N** | Go goroutine, Java virtual thread (Loom), Erlang | runtime tự schedule lên vài kernel thread; rất rẻ, cần runtime biết về I/O |
| **Event loop** | Node.js, Nginx | một thread, không chặn → [[Event-based Concurrency]] |

## 6. Cạm bẫy
- **Tạo thread nhiều hơn số core cho việc CPU-bound** → tăng [[Context Switch]], giảm thông lượng.
- **Con trỏ tới biến cục bộ trả ra ngoài thread** → dangling ngay khi thread kết thúc.
- **`fork()` trong app đa luồng** → xem [[Process API]].
- **Cho rằng "chỉ đọc thì không cần khoá"** — đọc đồng thời với ghi vẫn là race (data race là UB trong C/C++, kể cả khi "trông có vẻ chạy đúng").
- **Test đa luồng bằng cách chạy nhiều lần** — race hiếm khi lộ ra. Dùng **TSan** và stress test.

## 7. Checklist áp dụng
- [ ] Dữ liệu nào được chia sẻ? Đã liệt kê hết chưa?
- [ ] Mỗi dữ liệu chia sẻ có đúng **một** khoá bảo vệ, và tôi ghi rõ điều đó ở đâu chưa?
- [ ] Có biến nào chỉ cần thread-local là hết race không?
- [ ] Số thread có ràng buộc theo số core / theo tải I/O không?
- [ ] CI có chạy `-fsanitize=thread` không?

## Tham khảo
- OSTEP ch.26 *Concurrency: An Introduction*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf
- OSTEP ch.27 *Thread API*: https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf
- `pthreads(7)`: https://man7.org/linux/man-pages/man7/pthreads.7.html
- ThreadSanitizer: https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual
- Rob Pike — *Concurrency is not Parallelism*: https://go.dev/blog/waza-talk

## Liên kết
[[Lock]] · [[Condition Variable]] · [[Concurrency Bugs]] · [[Process]] · [[Event-based Concurrency]] · [[OS]]
