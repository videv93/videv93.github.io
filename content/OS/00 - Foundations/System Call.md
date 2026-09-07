---
tags: [os, foundation, api]
status: evergreen
---
# System Call

> Giao diện duy nhất mà chương trình dùng để nhờ kernel làm việc. Nó vừa là API, vừa là **biên giới bảo mật**, vừa là điểm đo hiệu năng đầu tiên cần nhìn khi hệ thống chậm.

## 1. Cơ chế
```
user code → libc wrapper → đặt số hiệu syscall vào thanh ghi (rax trên x86-64)
          → lệnh `syscall` (trap) → CPU sang kernel mode ([[User Mode vs Kernel Mode]])
          → trap table → sys_call_table[nr] → handler
          → return-from-trap → libc set errno → trả về
```
Điểm mấu chốt: chương trình **không chọn được địa chỉ** nhảy vào kernel, chỉ chọn được *số hiệu*. Đó là điều làm ranh giới này an toàn.

## 2. Các nhóm syscall cần thuộc
| Nhóm        | Ví dụ                                              | Note liên quan              |
| ----------- | -------------------------------------------------- | --------------------------- |
| Process     | `fork`, `execve`, `wait4`, `exit`, `clone`         | [[Process API]]             |
| Memory      | `mmap`, `munmap`, `brk`, `mprotect`                | [[Memory API]]              |
| File        | `open`, `read`, `write`, `lseek`, `close`, `fsync` | [[Files and Directories]]   |
| Directory   | `mkdir`, `link`, `unlink`, `rename`, `getdents`    | [[Files and Directories]]   |
| I/O đa kênh | `select`, `poll`, `epoll_wait`, `io_uring_enter`   | [[Event-based Concurrency]] |
| Đồng bộ     | `futex`                                            | [[Lock]]                    |
| Tín hiệu    | `kill`, `sigaction`, `sigprocmask`                 | [[Process API]]             |
| Mạng        | `socket`, `bind`, `accept`, `sendmsg`              | [[Distributed Systems]]     |

## 3. Quy ước gọi và lỗi
1. Trả về `>= 0` là thành công; `-1` + `errno` là lỗi (quy ước của libc, không phải của kernel — kernel trả `-errno`).
2. **Luôn kiểm tra giá trị trả về.** `write()` có thể ghi *ít hơn* số byte yêu cầu (short write) → phải lặp.
3. Syscall có thể bị **ngắt bởi signal** → `EINTR`. Phải retry hoặc dùng `SA_RESTART`.
4. `errno` chỉ có ý nghĩa **ngay sau** khi syscall báo lỗi; đừng đọc nó sau khi gọi hàm khác.
5. `fsync` mới là thứ đưa dữ liệu xuống đĩa, không phải `write` → [[Data Integrity and Protection]].

## 4. Chi phí và cách giảm
| Cách | Ý tưởng | Khi nào dùng |
|---|---|---|
| **Buffer ở user space** | stdio gộp nhiều `write` nhỏ | mọi lúc |
| **Vectored I/O** | `readv`/`writev` — nhiều buffer, 1 syscall | ghi header + body |
| **`sendfile`/`splice`** | copy trong kernel, không qua user | proxy, file server |
| **`epoll` thay `poll`** | O(1) theo số fd sẵn sàng | hàng nghìn kết nối |
| **`io_uring`** | ring buffer chia sẻ, amortize gần 0 syscall | I/O throughput cao |
| **`mmap`** | truy cập file như bộ nhớ | đọc ngẫu nhiên file lớn |

## 5. Cạm bẫy
- **Bỏ qua short read/write.** Bug này chỉ hiện khi tải cao hoặc file lớn → cực khó tái hiện.
- **Không xử lý `EINTR`.** Chương trình chạy ổn cho tới khi ai đó gửi `SIGWINCH`.
- **Gọi syscall trong signal handler.** Chỉ được gọi hàm **async-signal-safe** (`man 7 signal-safety`).
- **Đo bằng `strace` rồi kết luận về hiệu năng.** `strace` làm chậm 10–100×; dùng `perf trace` hoặc `bpftrace` để đo thật.
- **Cho rằng syscall là nguyên tử.** `rename()` là nguyên tử; `write()` nói chung thì không (trừ khi ≤ PIPE_BUF trên pipe).

## 6. Checklist áp dụng
- [ ] Mọi giá trị trả về đã được kiểm tra chưa?
- [ ] Vòng lặp `write` đã xử lý short write chưa?
- [ ] Đã bọc retry cho `EINTR` ở các syscall chặn chưa?
- [ ] Có syscall nào gọi trong vòng lặp nóng mà gộp được không?
- [ ] Dữ liệu quan trọng: đã `fsync` cả file **và** thư mục cha chưa?

## Công cụ
| Công cụ | Dùng để | Link |
|---|---|---|
| `strace -c -f` | đếm syscall, tìm cái gọi nhiều nhất | https://strace.io/ |
| `ltrace` | trace lời gọi thư viện | https://ltrace.org/ |
| `perf trace` | như strace nhưng overhead thấp | https://perf.wiki.kernel.org/ |
| `bpftrace` | script hoá việc quan sát syscall | https://bpftrace.org/ |

## Tham khảo
- OSTEP ch.6 *Limited Direct Execution*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf
- `syscalls(2)` — danh sách đầy đủ: https://man7.org/linux/man-pages/man2/syscalls.2.html
- `signal-safety(7)`: https://man7.org/linux/man-pages/man7/signal-safety.7.html
- Filippo Valsorda — *Searchable Linux Syscall Table*: https://filippo.io/linux-syscall-table/
- io_uring — Efficient IO with io_uring: https://kernel.dk/io_uring.pdf

## Liên kết
[[User Mode vs Kernel Mode]] · [[Limited Direct Execution]] · [[Process API]] · [[Memory API]] · [[OS]]
