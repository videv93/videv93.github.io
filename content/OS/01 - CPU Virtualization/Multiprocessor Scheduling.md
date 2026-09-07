---
tags: [os, virtualization, cpu, policy, smp]
status: evergreen
---
# Multiprocessor Scheduling

> Trên nhiều CPU, bài toán đổi bản chất: không còn là "chạy ai trước" mà là **"chạy ở đâu"**. Câu trả lời bị chi phối bởi thứ mà scheduler đơn nhân không quan tâm — **cache**.

## 1. Vì sao cache đổi luật chơi
Mỗi core có L1/L2 riêng. Khi một task chạy trên core 0, nó "hâm nóng" cache ở đó. Chuyển nó sang core 1 → cache lạnh → chậm hơn dù CPU rảnh.

→ Sinh ra khái niệm **cache affinity**: giữ task ở core cũ nếu có thể.

**Cache coherence** (MESI...) đảm bảo các core thấy cùng giá trị, nhưng nó không miễn phí: ghi vào một cache line đang được core khác giữ sẽ gây invalidate + truyền dữ liệu qua interconnect.

> **False sharing**: hai biến độc lập nằm cùng một cache line (64B) → hai core ghi hai biến khác nhau vẫn đá nhau. Cách chữa: căn lề/đệm cấu trúc theo cache line.

## 2. Hai kiến trúc hàng đợi
| | Single Queue (SQMS) | Multi-Queue (MQMS) |
|---|---|---|
| Cấu trúc | một hàng đợi toàn cục | mỗi CPU một hàng đợi |
| Ưu | công bằng dễ đảm bảo, cân tải tự nhiên | **mở rộng tốt**, cache affinity tốt |
| Nhược | tranh khoá hàng đợi; task nhảy lung tung | **mất cân bằng tải** → cần migration |
| Cần thêm | cơ chế affinity nhân tạo | **work stealing** / load balancing định kỳ |

Mọi OS hiện đại (Linux, FreeBSD ULE, Windows) dùng MQMS + cân bằng tải. Go runtime, Tokio, .NET thread pool cũng dùng chính mô hình này ở user space.

## 3. Work stealing và load balancing
- Hàng đợi rỗng → CPU "trộm" task từ hàng đợi bận. Trộm quá thường xuyên → tốn khoá và phá affinity; quá hiếm → mất cân bằng.
- Linux dùng **scheduling domain** phân tầng theo topo phần cứng: SMT sibling → core cùng LLC → socket khác (NUMA). Càng ra xa, ngưỡng migrate càng cao vì càng đắt.

## 4. NUMA và SMT
| Khái niệm | Vấn đề | Ứng phó |
|---|---|---|
| **NUMA** | RAM gắn với socket; truy cập chéo socket chậm hơn ~1.5–2× | `numactl --membind`, first-touch allocation, giữ task cùng socket với dữ liệu |
| **SMT / Hyper-Threading** | 2 thread logic chia sẻ tài nguyên thực của 1 core | Với CPU-bound: xếp task lên các core vật lý khác nhau trước; đôi khi tắt SMT (cả vì hiệu năng lẫn vì side-channel) |
| **Heterogeneous (P/E core, big.LITTLE)** | Core không giống nhau | EAS (Energy Aware Scheduling), Intel Thread Director |

## 5. Cạm bẫy
- **Pin thread bằng `taskset` mà không tính NUMA** → thread ở socket A dùng RAM socket B.
- **Đo scaling bằng benchmark có shared counter** — bạn đang đo cache coherence, không phải scheduler.
- **Nghĩ "nhiều core = nhanh hơn tuyến tính"** — Amdahl + coherence + [[Lock]] contention thường làm đường cong gãy sớm.
- **Bỏ qua false sharing** trong cấu trúc thống kê per-thread (mảng counter là thủ phạm kinh điển).
- **Dùng spinlock trên hệ oversubscribed** → xem [[Lock]].

## 6. Checklist áp dụng
- [ ] Ứng dụng có scale theo số core không? Vẽ đường cong throughput theo số thread.
- [ ] Topo máy thế nào? (`lscpu`, `numactl --hardware`)
- [ ] Có false sharing không? (`perf c2c record/report`)
- [ ] Task có bị migrate nhiều không? (`perf stat -e migrations`)
- [ ] Bộ nhớ có được cấp ở đúng NUMA node của thread dùng nó không?

## Công cụ
| Công cụ | Dùng để |
|---|---|
| `lscpu`, `lstopo` | xem topo core/cache/NUMA |
| `numactl`, `numastat` | ràng buộc và đo NUMA |
| `taskset`, `sched_setaffinity` | pin thread |
| `perf c2c` | phát hiện false sharing / cache contention |

## Tham khảo
- OSTEP ch.10 *Multiprocessor Scheduling*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf
- Ulrich Drepper — *What Every Programmer Should Know About Memory*: https://people.freebsd.org/~lstewart/articles/cpumemory.pdf
- Linux — scheduler domains & load balancing: https://docs.kernel.org/scheduler/sched-domains.html
- `perf c2c`: https://www.brendangregg.com/blog/2016-11-17/linux-perf-c2c.html
- *The Linux Scheduler: a Decade of Wasted Cores* (EuroSys '16): https://people.ece.ubc.ca/sasha/papers/eurosys16-final29.pdf

## Liên kết
[[CPU Scheduling]] · [[Context Switch]] · [[Lock]] · [[Thread]] · [[OS]]
