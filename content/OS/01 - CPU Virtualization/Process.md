---
tags: [os, virtualization, cpu]
status: evergreen
---
# Process

> Process = một chương trình **đang chạy**, cộng với toàn bộ trạng thái mà OS phải nhớ để có thể dừng nó lại và chạy tiếp sau này. Nó là đơn vị của ảo hoá CPU và cũng là đơn vị của bảo vệ bộ nhớ.

## 1. Machine state — OS phải nhớ những gì
| Thành phần | Ở đâu | Ghi chú |
|---|---|---|
| Bộ nhớ ([[Address Space]]) | page table trỏ tới RAM/disk | code, data, heap, stack |
| Thanh ghi | PCB khi không chạy, CPU khi chạy | có PC, SP, frame pointer riêng |
| Thanh ghi đặc quyền | kernel | page table base, mode bit |
| I/O state | kernel | bảng file descriptor, cwd, umask |
| Danh tính & quyền | kernel | pid, ppid, uid/gid → [[Access Control]] |

Toàn bộ được gói trong **PCB** (Process Control Block; trong Linux là `struct task_struct`).

## 2. Vòng đời tiến trình
| Trạng thái | Nghĩa | Chuyển sang |
|---|---|---|
| **Running** | đang chiếm CPU | Ready (bị preempt), Blocked (chờ I/O) |
| **Ready** | sẵn sàng nhưng chưa được chọn | Running (scheduled) |
| **Blocked / Waiting** | chờ sự kiện (I/O, lock, signal) | Ready khi sự kiện đến |
| **Zombie** | đã `exit`, chờ cha `wait()` | biến mất khi cha reap |
| **Stopped** | bị `SIGSTOP` | Ready khi `SIGCONT` |

> **Zombie tồn tại có mục đích**: giữ exit code cho tới khi cha đọc. Cha không `wait()` → rò rỉ pid. Cha chết trước → `init`/`systemd` nhận nuôi và reap giùm.

## 3. Process vs Thread vs Program
| | Program | Process | [[Thread]] |
|---|---|---|---|
| Bản chất | file trên đĩa | thực thể đang chạy | luồng thực thi trong process |
| Address space | không có | riêng | **chung** với thread khác |
| Chi phí tạo | — | cao (page table, PCB) | thấp |
| Cách ly khi crash | — | tốt (lỗi không lan) | kém (một thread sập là cả process sập) |
| Giao tiếp | — | IPC (pipe, socket, shm) | biến chung → cần [[Lock]] |

Trong Linux cả hai đều là `task_struct`; khác nhau ở cờ truyền cho `clone()` (chia sẻ mm hay không).

## 4. Nạp chương trình — từ file tới process
1. Đọc header ELF, cấp [[Address Space]].
2. Ánh xạ (lazy, qua `mmap`) code + data từ file vào bộ nhớ.
3. Cấp stack, đẩy `argv`/`envp`; cấp heap rỗng.
4. Mở sẵn fd 0/1/2 (stdin/stdout/stderr).
5. Chạy dynamic linker → resolve symbol → nhảy tới `_start` → `main`.

Bước 2 là **lazy**: trang chỉ thực sự nạp khi bị chạm → page fault. Đó là lý do khởi động binary lớn không tốn thời gian tỉ lệ với kích thước.

## 5. Cạm bẫy
- **Đếm "process đang chạy" bằng `ps` rồi lo lắng.** Phần lớn ở trạng thái Blocked, không tốn CPU. Nhìn cột `S` (state) trước.
- **Process ở trạng thái `D` (uninterruptible sleep)** không kill được — nó đang kẹt trong I/O kernel. Vấn đề nằm ở tầng lưu trữ, không phải ở process.
- **Fork bomb / rò rỉ pid** do không reap con.
- **Cho rằng process cách ly hoàn toàn.** Chúng vẫn chia sẻ CPU cache, bộ nhớ băng thông, ổ đĩa — nguồn gốc của "noisy neighbor" và cả side-channel attack.

## 6. Checklist áp dụng
- [ ] Tiến trình của tôi đang ở state nào (R/S/D/Z/T)?
- [ ] Có zombie tích tụ không? Ai là cha?
- [ ] Đây nên là process riêng (cần cách ly) hay thread (cần chia sẻ dữ liệu)?
- [ ] Nếu process bị `SIGKILL` giữa chừng, dữ liệu có nhất quán không?
- [ ] Giới hạn tài nguyên đã đặt chưa (`ulimit`, cgroup)?

## Tham khảo
- OSTEP ch.4 *The Abstraction: The Process*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf
- `proc(5)` — mọi thứ về `/proc/<pid>`: https://man7.org/linux/man-pages/man5/proc.5.html
- Linux `task_struct` (sched.h): https://elixir.bootlin.com/linux/latest/source/include/linux/sched.h
- Brendan Gregg — *Linux Performance*: https://www.brendangregg.com/linuxperf.html

## Liên kết
[[Process API]] · [[Context Switch]] · [[Address Space]] · [[Thread]] · [[CPU Scheduling]] · [[OS]]
