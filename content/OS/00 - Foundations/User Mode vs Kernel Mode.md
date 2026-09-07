---
tags: [os, foundation, protection]
status: evergreen
---
# User Mode vs Kernel Mode

> Ranh giới bảo vệ cơ bản nhất của máy tính: một bit trong thanh ghi trạng thái CPU quyết định lệnh nào được phép chạy. Không có bit này thì mọi khái niệm bảo mật OS đều sụp.

## 1. Hai chế độ
| | User mode | Kernel mode (supervisor) |
|---|---|---|
| Lệnh đặc quyền (I/O, đổi page table, tắt interrupt) | ❌ | ✅ |
| Truy cập bộ nhớ | chỉ [[Address Space]] của mình | toàn bộ vật lý |
| Ai chạy ở đây | ứng dụng, thư viện | kernel, driver, handler |
| Vào chế độ kia bằng cách | trap ([[System Call]], exception, interrupt) | `return-from-trap` |

x86 thực ra có 4 **ring** (0–3), nhưng thực tế chỉ dùng ring 0 (kernel) và ring 3 (user). Ảo hoá thêm ring −1 → [[Virtual Machine Monitor]]. ARM gọi là **Exception Level** EL0–EL3.

## 2. Đường vào kernel — chỉ có ba cửa
| Cửa | Đồng bộ? | Do ai gây | Ví dụ |
|---|---|---|---|
| **System call (trap)** | đồng bộ, cố ý | chương trình | `read()`, `fork()` |
| **Exception (fault)** | đồng bộ, ngoài ý muốn | chương trình | page fault, chia 0, lệnh sai |
| **Interrupt** | bất đồng bộ | phần cứng | timer, NIC, disk xong việc |

Cả ba đều đi qua **trap table** đã được kernel cài lúc boot bằng lệnh đặc quyền. Vì bảng này được cài trước, chương trình user không thể chỉ định "nhảy vào đâu" trong kernel — nó chỉ chọn được *số hiệu* system call.

## 3. Chuyện gì xảy ra khi chuyển chế độ
1. CPU chuyển sang kernel mode, **đổi sang kernel stack** của tiến trình đó.
2. Lưu PC, flags, một số thanh ghi vào kernel stack (phần cứng làm).
3. Nhảy tới handler trong trap table.
4. Kernel lưu nốt thanh ghi còn lại, xử lý.
5. `return-from-trap`: khôi phục thanh ghi, hạ về user mode, tiếp tục ở lệnh kế.

Nếu bước 4 quyết định đổi tiến trình → đó là [[Context Switch]].

## 4. Vì sao ranh giới này tốn kém
- Flush/pollute pipeline, cache, branch predictor.
- Từ 2018, mitigation cho Meltdown/Spectre (KPTI) làm chi phí tăng đáng kể — mỗi lần vào kernel phải đổi page table.
- Hệ quả kiến trúc: **giảm số lần vượt ranh giới** quan trọng hơn tối ưu trong kernel. Đó là lý do có `io_uring`, `vDSO`, batching, và kernel bypass (DPDK, SPDK).

| Kỹ thuật | Ý tưởng |
|---|---|
| **vDSO** | Ánh xạ vài hàm kernel (như `gettimeofday`) vào user space → không cần trap |
| **io_uring** | Hàng đợi chia sẻ user↔kernel, submit nhiều I/O bằng 0–1 syscall |
| **eBPF** | Nạp chương trình đã verify vào kernel để lọc/xử lý tại chỗ |
| **Kernel bypass** | Driver user-space nói chuyện thẳng với NIC/NVMe |

## 5. Cạm bẫy
- **Nghĩ syscall "rẻ như gọi hàm".** Chênh lệch cỡ 1–2 bậc độ lớn; trong vòng lặp nóng nó là bottleneck.
- **Nhầm kernel mode với root.** Root là khái niệm *phân quyền của OS* ([[Access Control]]); kernel mode là khái niệm *phần cứng*. Root vẫn chạy ở user mode.
- **Tin dữ liệu từ user space.** Mọi con trỏ từ user phải qua `copy_from_user`; đây là nguồn lỗ hổng kernel kinh điển.
- **Quên rằng interrupt có thể xảy ra ở bất kỳ đâu**, kể cả giữa hai lệnh trong kernel → cần khoá và vùng cấm interrupt.

## 6. Checklist áp dụng
- [ ] Vòng lặp nóng của tôi gọi bao nhiêu syscall mỗi giây? (`strace -c -f`)
- [ ] Có gộp được nhiều lần I/O thành một lần không (writev, io_uring)?
- [ ] Có dùng buffer ở user space thay vì `write()` từng byte không?
- [ ] Kernel module tôi viết có validate mọi con trỏ từ user không?

## Tham khảo
- OSTEP ch.6 *Limited Direct Execution*: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf
- Intel SDM Vol.3 — Protection & Privilege Levels: https://www.intel.com/sdm
- Linux `vdso(7)`: https://man7.org/linux/man-pages/man7/vdso.7.html
- Brendan Gregg — *KPTI/Meltdown performance*: https://www.brendangregg.com/blog/2018-02-09/kpti-kaiser-meltdown-performance.html
- io_uring paper/design: https://kernel.dk/io_uring.pdf

## Liên kết
[[System Call]] · [[Limited Direct Execution]] · [[Context Switch]] · [[Access Control]] · [[OS]]
