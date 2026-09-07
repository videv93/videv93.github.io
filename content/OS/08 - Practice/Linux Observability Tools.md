---
tags: [os, practice, tooling]
status: growing
---
# Linux Observability Tools

> Mọi khái niệm trong vault này đều có một công cụ để **nhìn thấy nó đang xảy ra**. Bảng dưới ánh xạ từ triệu chứng → công cụ → note giải thích cơ chế bên dưới.

## 1. Bắt đầu từ đâu — USE method
Với mỗi tài nguyên (CPU, RAM, disk, network), hỏi ba câu:
| Chữ | Câu hỏi | Ví dụ chỉ số |
|---|---|---|
| **U**tilization | dùng bao nhiêu phần trăm thời gian? | `%CPU`, `%util` |
| **S**aturation | có hàng đợi chờ không? | load average, `aqu-sz`, PSI |
| **E**rrors | có lỗi không? | `ifconfig` drops, SMART, `dmesg` |

**PSI** (`/proc/pressure/{cpu,memory,io}`) là chỉ số saturation tốt nhất hiện có — nó đo trực tiếp *thời gian bị chặn vì thiếu tài nguyên*.

## 2. Bảng tra: triệu chứng → công cụ
| Triệu chứng | Công cụ | Khái niệm |
|---|---|---|
| Máy chậm, không rõ vì sao | `top`, `htop`, `vmstat 1`, `dstat` | tổng quan |
| CPU cao ở user space | `perf top`, `perf record -g`, flamegraph | [[CPU Scheduling]] |
| CPU cao ở **sys** | `strace -c -f`, `perf trace` | [[System Call]] |
| Nhiều context switch | `vmstat` (cột `cs`), `perf sched latency` | [[Context Switch]] |
| Task chờ CPU lâu | `perf sched latency`, `/proc/pressure/cpu` | [[CPU Scheduling]] |
| RAM tăng dần | `ps -o rss`, `smem`, `heaptrack`, jemalloc prof | [[Memory API]], [[Free Space Management]] |
| Swap in/out liên tục | `vmstat` (`si`/`so`), `sar -B` | [[Swapping]] |
| Nhiều page fault | `ps -o min_flt,maj_flt`, `perf stat -e page-faults` | [[Paging]] |
| TLB/cache miss cao | `perf stat -e dTLB-load-misses,LLC-load-misses` | [[Translation Lookaside Buffer]] |
| False sharing nghi ngờ | `perf c2c record/report` | [[Multiprocessor Scheduling]] |
| Disk chậm | `iostat -x 1`, `biolatency`, `biosnoop` | [[IO Devices]], [[Hard Disk Drive]] |
| App treo | `gdb thread apply all bt`, `py-spy dump`, `jstack` | [[Deadlock]] |
| Data race | `-fsanitize=thread`, `go test -race` | [[Concurrency Bugs]] |
| File descriptor rò rỉ | `lsof -p`, `ls /proc/<pid>/fd \| wc -l` | [[Files and Directories]] |
| Đầy đĩa bí ẩn | `df`, `df -i`, `du -x`, `lsof +L1` | [[File System Implementation]] |
| Ổ đĩa sắp hỏng | `smartctl -a`, `dmesg` | [[Data Integrity and Protection]] |
| VM chậm trên cloud | `top` cột `st` (steal) | [[Virtual Machine Monitor]] |
| Container bị throttle | `cat cpu.stat` → `nr_throttled` | [[Containers]] |

## 3. eBPF — tầng công cụ hiện đại
| Công cụ | Dùng để |
|---|---|
| `bpftrace` | script một dòng để trace bất kỳ điểm nào trong kernel |
| bcc tools (`execsnoop`, `opensnoop`, `biolatency`, `tcpconnect`, `cachestat`) | công cụ dựng sẵn cho từng câu hỏi cụ thể |
| `bpftop`, `bpftool` | quản lý chương trình eBPF |

Ưu điểm so với `strace`: overhead thấp hơn hàng chục lần, dùng được trên production.

## 4. Nguyên tắc đo
1. **Đo trước khi sửa.** Không có ngoại lệ.
2. **Đo phân vị, không chỉ trung bình.** p50 đẹp và p99 thảm hoạ là chuyện bình thường.
3. **Workload benchmark phải giống thật** — dataset lớn hơn RAM, số client giống thật.
4. **Thay đổi một biến mỗi lần.**
5. **Ghi lại baseline** trước khi tối ưu, để biết mình có thật sự cải thiện không.
6. **Công cụ cũng làm chậm hệ thống** — `strace` 10–100×; biết overhead của công cụ mình dùng.

## 5. Cạm bẫy
- **Dùng `strace` trên production** — có thể làm dịch vụ sập vì chậm.
- **Load average bị hiểu nhầm**: trên Linux nó tính cả task ở trạng thái `D` (chờ I/O), nên load cao không đồng nghĩa CPU bận.
- **`free -m` cột `free`** — nhìn `available`.
- **Đọc `%CPU` của `top` với ứng dụng đa luồng** — có thể vượt 100%; đó là tổng theo core.
- **Kết luận từ một lần đo.** Chạy nhiều lần, xem phân bố.

## 6. Checklist áp dụng
- [ ] Tôi đã có **baseline** trước khi thay đổi chưa?
- [ ] Đã chạy qua USE method cho cả 4 tài nguyên chưa?
- [ ] Đã xem PSI (`/proc/pressure/*`) chưa?
- [ ] Con số tôi đang nhìn là trung bình hay phân vị?
- [ ] Công cụ đang dùng có làm méo kết quả không?
- [ ] Tôi đang đo đúng thứ mà người dùng cảm nhận không?

## Tham khảo
- Brendan Gregg — *Linux Performance*: https://www.brendangregg.com/linuxperf.html
- Brendan Gregg — *The USE Method*: https://www.brendangregg.com/usemethod.html
- Brendan Gregg — *Systems Performance* (2nd ed.) và *BPF Performance Tools*
- bcc tools: https://github.com/iovisor/bcc
- bpftrace: https://bpftrace.org/
- Linux PSI: https://docs.kernel.org/accounting/psi.html

## Liên kết
[[xv6 and Lab Projects]] · [[OS Learning Roadmap]] · [[Operating System]] · [[OS]]
