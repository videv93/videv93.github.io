---
tags: [os, virtualization, cpu, policy]
status: evergreen
---
# CPU Scheduling

> Policy quyết định **chạy tiến trình nào tiếp theo**. Toàn bộ lĩnh vực này là cuộc giằng co giữa hai chỉ số mâu thuẫn nhau: **turnaround time** (xong sớm) và **response time** (phản hồi nhanh).

## 1. Hai thước đo mâu thuẫn
| Chỉ số | Công thức | Ai quan tâm |
|---|---|---|
| **Turnaround** | `T_hoàn_thành − T_đến` | batch job, build, ETL |
| **Response** | `T_chạy_lần_đầu − T_đến` | shell, UI, web request |
| **Fairness** | độ lệch giữa các job | multi-tenant, cgroup |

Tối ưu turnaround → chạy job ngắn tới cùng → job tương tác phải chờ. Tối ưu response → cắt nhỏ liên tục → tăng overhead [[Context Switch]] và kéo dài turnaround. **Không có policy nào thắng cả hai.**

## 2. Các thuật toán nền
| Thuật toán | Ý tưởng | Turnaround | Response | Vấn đề |
|---|---|---|---|---|
| **FIFO / FCFS** | đến trước chạy trước | kém | kém | **Convoy effect** — job dài chặn cả hàng |
| **SJF** | job ngắn nhất trước | tối ưu (nếu mọi job đến cùng lúc) | kém | không preempt → job dài đang chạy vẫn chặn |
| **STCF / PSJF** | preempt khi có job ngắn hơn đến | **tối ưu** | kém | cần biết trước độ dài; đói job dài |
| **Round Robin** | mỗi job một quantum, xoay vòng | **kém nhất** | tốt | quantum ngắn → overhead |
| **[[Multi-level Feedback Queue]]** | học độ dài job từ hành vi | tốt | tốt | cần tinh chỉnh tham số |
| **[[Proportional Share Scheduling]]** | chia CPU theo tỉ lệ | trung bình | trung bình | khó với job tương tác |

> Nghịch lý cốt lõi: **thuật toán tối ưu turnaround (SJF/STCF) lại tệ nhất về response, và ngược lại (RR).** Mọi scheduler thực tế là một cách xấp xỉ SJF mà vẫn giữ response chấp nhận được → đó chính là MLFQ.

## 3. Vấn đề "oracle" và cách vượt qua
SJF cần biết **độ dài job trong tương lai** — thứ không ai biết. Ba cách xử lý thực tế:
1. **Dự đoán từ quá khứ** — job vừa dùng hết quantum thì có lẽ là CPU-bound. Đây là ý tưởng của MLFQ.
2. **Ưu tiên job vừa thức dậy sau I/O** — nó có lẽ là job tương tác.
3. **Bỏ hẳn tối ưu turnaround**, chuyển sang công bằng có trọng số — CFS của Linux.

## 4. I/O và overlap
Job chờ I/O phải bị đưa ra khỏi CPU (Blocked), và CPU chạy job khác — gọi là **overlap**. Nếu không, CPU rảnh trong khi disk làm việc.

Scheduler còn coi mỗi khoảng CPU giữa hai lần I/O là một "job con" ngắn → job tương tác tự nhiên được xếp vào nhóm ưu tiên cao.

## 5. Scheduler thực tế
| Hệ | Scheduler | Ý tưởng chính |
|---|---|---|
| Linux ≤ 6.5 | **CFS** | red-black tree theo `vruntime`, chọn task có vruntime nhỏ nhất; `nice` là trọng số |
| Linux ≥ 6.6 | **EEVDF** | thêm khái niệm "deadline ảo" → latency tốt hơn cho task ngắn |
| Linux realtime | `SCHED_FIFO`, `SCHED_RR`, `SCHED_DEADLINE` | ưu tiên cứng, EDF |
| Windows | multilevel + priority boost | boost khi thread thức dậy sau I/O |
| macOS | Mach + QoS class | app khai báo mục đích (user-interactive → background) |

## 6. Cạm bẫy
- **Dùng realtime priority (`SCHED_FIFO`) để "cho nhanh hơn"** — một vòng lặp bận ở mức này có thể treo cả máy.
- **Nghĩ `nice` chia CPU tuyến tính.** CFS dùng thang trọng số ~1.25× mỗi bậc, không tuyến tính.
- **Đặt `nice` cho tiến trình I/O-bound** — vô ích, nó có bị thiếu CPU đâu; cần `ionice`.
- **Bỏ qua priority inversion**: task ưu tiên thấp giữ khoá mà task ưu tiên cao cần → xem [[Deadlock]] và priority inheritance.
- **Benchmark scheduling bằng job đồng nhất** — mọi thuật toán trông giống nhau khi mọi job dài bằng nhau.

## 7. Checklist áp dụng
- [ ] Workload của tôi là CPU-bound hay I/O-bound? (`top`: %us vs %wa)
- [ ] Tôi tối ưu turnaround hay response? (Không thể cả hai.)
- [ ] Có task nào đang bị đói (starvation) không? (`perf sched latency`)
- [ ] Có cần cách ly bằng cgroup `cpu.weight`/`cpu.max` thay vì `nice` không?
- [ ] Có priority inversion tiềm tàng ở khoá dùng chung không?

## Tham khảo
- OSTEP ch.7 *Scheduling: Introduction*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf
- OSTEP homework `scheduler.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched
- LWN — *An EEVDF CPU scheduler for Linux*: https://lwn.net/Articles/925371/
- Linux CFS design: https://docs.kernel.org/scheduler/sched-design-CFS.html
- `sched(7)`: https://man7.org/linux/man-pages/man7/sched.7.html

## Liên kết
[[Multi-level Feedback Queue]] · [[Proportional Share Scheduling]] · [[Multiprocessor Scheduling]] · [[Context Switch]] · [[Process]] · [[OS]]
