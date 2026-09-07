---
tags: [os, virtualization, cpu, mechanism]
status: evergreen
---
# Context Switch

> Thao tác lưu trạng thái tiến trình đang chạy và khôi phục trạng thái tiến trình khác. Đây là **mechanism** thuần tuý — nó không quyết định *chọn ai*, việc đó thuộc [[CPU Scheduling]].

## 1. Chuyện gì thực sự xảy ra
1. Timer interrupt (hoặc trap) → CPU sang kernel mode, phần cứng đẩy vài thanh ghi lên **kernel stack của tiến trình A**.
2. Handler lưu nốt thanh ghi còn lại vào PCB của A.
3. Scheduler chọn B.
4. `switch()`: đổi **stack pointer** từ kernel stack A sang kernel stack B, đổi **page table base register** (CR3 trên x86) sang [[Address Space]] của B.
5. `return-from-trap` → khôi phục thanh ghi của B, hạ về user mode, tiếp tục ở đúng chỗ B từng dừng.

Có **hai lần lưu/khôi phục**: phần cứng lưu trạng thái user (vào kernel stack), kernel lưu trạng thái kernel (vào PCB).

## 2. Ba loại switch — chi phí rất khác nhau
| Loại | Đổi page table? | Chi phí tương đối | Ví dụ |
|---|---|---|---|
| **Thread switch** (cùng process) | Không | thấp nhất | hai [[Thread]] cùng app |
| **Process switch** | Có → TLB flush | cao | đổi ứng dụng |
| **Mode switch** (chỉ user↔kernel) | Không, không đổi task | thấp | [[System Call]] |

> Mode switch **không phải** context switch. Nhầm hai cái này khiến người ta đổ tội sai khi đọc số liệu.

## 3. Vì sao TLB là nhân vật chính
Đổi [[Address Space]] làm mọi ánh xạ trong [[Translation Lookaside Buffer]] thành vô nghĩa. Hai cách xử lý:
- **Flush toàn bộ** — đơn giản, nhưng tiến trình mới bắt đầu với TLB rỗng → hàng loạt TLB miss.
- **ASID/PCID** (address space identifier) — gắn nhãn từng entry theo tiến trình, không cần flush. x86 hiện đại có PCID, ARM có ASID.

Chi phí **gián tiếp** (TLB + cache lạnh) thường lớn hơn chi phí trực tiếp (lưu thanh ghi) nhiều lần.

## 4. Khi nào context switch trở thành vấn đề
| Triệu chứng | Nguyên nhân thường gặp | Hướng xử lý |
|---|---|---|
| `cs` cao trong `vmstat` + CPU sys cao | quá nhiều thread tranh khoá | giảm số thread, dùng lock-free, sharding |
| Thread ping-pong giữa core | scheduler migrate liên tục | CPU affinity/pinning → [[Multiprocessor Scheduling]] |
| Latency đuôi (p99) xấu | preemption sai lúc | isolcpus, realtime priority, giảm nhiễu |
| Nhiều voluntary switch | chờ I/O/lock | async I/O → [[Event-based Concurrency]] |

`voluntary_ctxt_switches` (tự chờ) vs `nonvoluntary_ctxt_switches` (bị preempt) trong `/proc/<pid>/status` phân biệt đúng hai nguyên nhân này.

## 5. Cạm bẫy
- **Tạo nhiều thread hơn số core để "chạy nhanh hơn"** — với CPU-bound thì chỉ tăng switch, giảm thông lượng.
- **Dùng spinlock ở user space với thread nhiều hơn core** — thread giữ khoá bị preempt, các thread khác spin vô ích. Xem [[Lock]].
- **Bỏ qua NUMA**: switch sang core ở socket khác làm mọi truy cập bộ nhớ chậm hơn.
- **Đo bằng benchmark rỗng.** Benchmark không có working set thì cache luôn nóng → context switch trông rẻ giả tạo.

## 6. Checklist áp dụng
- [ ] Số context switch/giây là bao nhiêu? (`vmstat 1`, cột `cs`)
- [ ] Voluntary hay non-voluntary chiếm đa số?
- [ ] Số thread có vượt xa số core không?
- [ ] Có nên pin thread vào core (`taskset`, `sched_setaffinity`) không?
- [ ] Latency p99 có tương quan với đỉnh context switch không?

## Công cụ
| Công cụ | Dùng để |
|---|---|
| `vmstat 1` | cs, in (interrupt) theo giây |
| `perf sched latency` | thời gian chờ CPU của từng task |
| `/proc/<pid>/status` | đếm voluntary / non-voluntary |
| `bpftrace` | trace `sched:sched_switch` chi tiết |

## Tham khảo
- OSTEP ch.6 *Limited Direct Execution*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf
- Li, Ding, Shen — *Quantifying the Cost of Context Switch*: https://www.cs.rochester.edu/u/cli/research/switch.pdf
- Brendan Gregg — `perf sched`: https://www.brendangregg.com/perf.html
- Linux scheduler docs: https://docs.kernel.org/scheduler/index.html

## Liên kết
[[Limited Direct Execution]] · [[CPU Scheduling]] · [[Translation Lookaside Buffer]] · [[Multiprocessor Scheduling]] · [[OS]]
