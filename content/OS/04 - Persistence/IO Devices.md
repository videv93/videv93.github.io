---
tags: [os, persistence, io]
status: evergreen
---
# IO Devices

> Thiết bị chậm hơn CPU hàng nghìn tới hàng triệu lần. Toàn bộ thiết kế I/O của OS xoay quanh một câu hỏi: **làm sao CPU không phải ngồi chờ?**

## 1. Kiến trúc phân tầng bus
| Tầng | Tốc độ | Thiết bị |
|---|---|---|
| Memory bus | nhanh nhất, ngắn nhất | RAM |
| **PCIe** | rất nhanh | GPU, NVMe, NIC 100G |
| Peripheral bus (SATA, USB) | chậm hơn, dài hơn, nhiều thiết bị | HDD, chuột, bàn phím |

Bus càng nhanh càng ngắn và càng đắt → phân tầng là bắt buộc về mặt vật lý, không phải lựa chọn thiết kế.

## 2. Giao diện một thiết bị
Mỗi thiết bị lộ ra ba loại thanh ghi: **status**, **command**, **data**. Giao thức ngây thơ:
```
while (STATUS == BUSY) ;           // 1. polling — đốt CPU
write data to DATA register        // 2. programmed I/O (PIO)
write command to COMMAND register  // 3.
while (STATUS == BUSY) ;           // 4. chờ xong — lại đốt CPU
```
Ba chỗ lãng phí, ba lời giải:

| Vấn đề | Lời giải | Đánh đổi |
|---|---|---|
| Bước 1 & 4 đốt CPU | **Interrupt** — cho process ngủ, thiết bị báo khi xong | Với thiết bị **rất nhanh**, chi phí interrupt + [[Context Switch]] > thời gian chờ → khi đó **polling lại tốt hơn** |
| Bước 2 CPU tự copy dữ liệu | **DMA** — bộ điều khiển riêng chuyển dữ liệu RAM↔thiết bị | cần quản lý bộ nhớ DMA, IOMMU cho an toàn |
| Interrupt storm khi tải cao | **Coalescing** — gom nhiều sự kiện thành một interrupt | tăng latency một chút |

> **NVMe hiện đại**: nhanh tới mức nhiều hệ dùng **hybrid** — poll một khoảng ngắn rồi mới ngủ, y hệt two-phase lock trong [[Lock]].

## 3. Cách CPU nói chuyện với thiết bị
| Cách | Cơ chế |
|---|---|
| **Explicit I/O instructions** | `in`/`out` trên x86 — lệnh đặc quyền |
| **Memory-mapped I/O** | thanh ghi thiết bị được ánh xạ vào không gian địa chỉ; đọc/ghi bình thường | 

MMIO thắng vì không cần lệnh riêng và dễ mở rộng.

## 4. Device driver và trừu tượng hoá
Kernel không thể biết mọi thiết bị → phân tầng:
```
File system (ext4, xfs)
    ↓ generic block layer  ← điểm trừu tượng: "đọc/ghi block"
Block driver (NVMe, SATA, SCSI)
    ↓
Thiết bị
```
Nhờ tầng generic block, [[File System Implementation]] không cần biết mình đang nằm trên HDD hay SSD.

**Cái giá**: driver chiếm khoảng **70% mã nguồn kernel Linux** và là nguồn bug/crash lớn nhất.

## 5. Cạm bẫy
- **Đo I/O bằng throughput mà bỏ qua latency phân vị.** Với NVMe, p99.9 mới nói lên trải nghiệm.
- **Cho rằng interrupt luôn tốt hơn polling.** Với thiết bị µs-level, polling (`io_uring` polled mode, DPDK/SPDK) nhanh hơn hẳn.
- **Bỏ qua queue depth.** Một luồng I/O đồng bộ chỉ dùng được một phần nhỏ hiệu năng NVMe — cần nhiều I/O cùng lúc (`iodepth`).
- **Nghĩ DMA an toàn tự nhiên** — thiết bị độc hại có thể đọc RAM bất kỳ nếu không có IOMMU (Thunderbolt DMA attack).

## 6. Checklist áp dụng
- [ ] Workload của tôi là IOPS-bound, throughput-bound, hay latency-bound?
- [ ] Queue depth thực tế là bao nhiêu? (`iostat -x`, cột `aqu-sz`)
- [ ] `%util` và `await` nói gì? (`iostat -x 1`)
- [ ] Có gộp được I/O nhỏ thành lớn không (buffer, `writev`, `io_uring`)?
- [ ] Interrupt có phân bố đều trên các core không? (`/proc/interrupts`, `irqbalance`)

## Công cụ
| Công cụ | Dùng để |
|---|---|
| `iostat -x 1` | latency, queue depth, utilization theo thiết bị |
| `fio` | benchmark I/O có kiểm soát | 
| `biolatency`, `biosnoop` (bcc) | histogram latency ở tầng block |
| `blktrace` | trace chi tiết từng yêu cầu |

## Tham khảo
- OSTEP ch.36 *I/O Devices*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf
- `fio` docs: https://fio.readthedocs.io/
- Brendan Gregg — *Linux Performance Tools*: https://www.brendangregg.com/linuxperf.html
- SPDK — user-space NVMe driver: https://spdk.io/
- Linux block layer & multi-queue: https://docs.kernel.org/block/index.html

## Liên kết
[[Hard Disk Drive]] · [[Flash-based SSD]] · [[File System Implementation]] · [[Event-based Concurrency]] · [[OS]]
