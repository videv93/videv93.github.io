---
tags: [os, virtualization, memory]
status: evergreen
---
# Swapping

> Mở rộng [[Address Space]] vượt quá RAM vật lý bằng cách đẩy trang ít dùng xuống đĩa. Cơ chế này biến RAM thành **cache của disk** — và mọi thứ về cache đều áp dụng ([[Page Replacement Policy]]).

## 1. Cơ chế
Thêm một bit vào PTE: **present**.
| present | valid | Nghĩa | Xử lý khi truy cập |
|---|---|---|---|
| 1 | 1 | trang đang trong RAM | dịch bình thường |
| 0 | 1 | trang bị swap ra đĩa | **page fault** → nạp về |
| — | 0 | không được ánh xạ | SIGSEGV |

Khi present = 0, các bit PFN được tái sử dụng để lưu **vị trí trên swap space**.

## 2. Quy trình xử lý page fault
1. MMU thấy present=0 → trap vào kernel.
2. Kernel đọc PTE, tìm vị trí trên swap.
3. Chọn frame trống; nếu không còn → gọi [[Page Replacement Policy]] để nạn nhân ra đi (nếu **dirty** thì phải ghi xuống trước).
4. Phát I/O đọc trang; **process chuyển sang Blocked**, CPU chạy tiến trình khác.
5. I/O xong → cập nhật PTE, đánh dấu present=1 → **thử lại đúng lệnh gây fault**.

> Điểm tinh tế: lệnh được **retry**, không phải "tiếp tục" — nên page fault trong suốt với chương trình.

## 3. Ba loại fault — phân biệt rất quan trọng
| Loại | Có I/O không | Ví dụ |
|---|---|---|
| **Minor fault** | không | trang đã trong page cache; lần chạm đầu vào trang mới; copy-on-write |
| **Major fault** | **có** | trang phải đọc từ swap hoặc từ file trên đĩa |
| **Invalid fault** | — | SIGSEGV |

Chỉ **major fault** mới thực sự đắt (hàng chục µs với SSD, hàng ms với HDD). Minor fault nhiều là bình thường.

## 4. High/low watermark — vì sao kernel không đợi tới lúc hết RAM
Kernel giữ **swap daemon** (`kswapd` trên Linux) chạy nền:
- RAM trống < `LOW` → đánh thức daemon, bắt đầu thu hồi trang.
- RAM trống > `HIGH` → daemon ngủ.

Lợi ích: gom nhiều trang ghi một lần (tối ưu I/O tuần tự trên [[Hard Disk Drive]]), và tránh việc process phải chờ đồng bộ khi cần frame.

## 5. Thrashing và OOM
**Thrashing**: working set tổng > RAM → hệ thống dành gần hết thời gian để swap, CPU idle nhưng máy "đơ".
| Ứng phó | Cách làm |
|---|---|
| Admission control | chạy ít process hơn (giới hạn worker, connection pool) |
| Giới hạn theo nhóm | cgroup `memory.max`, `memory.high` |
| Kill có chọn lọc | OOM killer (chọn theo `oom_score`), hoặc **earlyoom**/systemd-oomd dựa trên PSI |
| Tắt swap | máy phản hồi nhanh hơn khi cạn RAM, nhưng OOM đến sớm hơn |

**zswap/zram**: nén trang trong RAM thay vì ghi đĩa — thường tốt hơn swap đĩa cho desktop và container.

## 6. Cạm bẫy
- **"Swap đang được dùng" ≠ "máy thiếu RAM".** Trang ngủ lâu bị đẩy ra là *tốt*. Cái cần theo dõi là **tốc độ swap in/out** (`vmstat` cột `si/so`), không phải dung lượng.
- **Tắt swap để tăng tốc.** Không có swap, kernel mất một lựa chọn thu hồi → có thể còn tệ hơn, và OOM killer ra tay đột ngột.
- **`swappiness = 0` để "không swap"** — nó chỉ đổi ưu tiên giữa thu hồi page cache và anon page, không tắt swap.
- **Đọc `free -m` cột `free` rồi kết luận hết RAM** — phần lớn nằm ở `buff/cache`, thu hồi được ngay. Nhìn cột **`available`**.
- **Bỏ qua PSI.** `/proc/pressure/memory` cho biết hệ thống *đang chờ vì bộ nhớ* bao lâu — chỉ số tốt hơn mọi con số dung lượng.

## 7. Checklist áp dụng
- [ ] `vmstat 1`: `si`/`so` có khác 0 liên tục không?
- [ ] Tỉ lệ major fault: `ps -o maj_flt` hoặc `sar -B`.
- [ ] `free -m` cột `available` còn bao nhiêu?
- [ ] `cat /proc/pressure/memory` — `some avg10` cao nghĩa là đang chờ vì RAM.
- [ ] Container: `memory.high` đã đặt để tạo áp lực mềm trước khi OOM chưa?

## Tham khảo
- OSTEP ch.21 *Beyond Physical Memory: Mechanisms*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf
- Chris Down — *In Defence of Swap*: https://chrisdown.name/2018/01/02/in-defence-of-swap.html
- Linux PSI (Pressure Stall Information): https://docs.kernel.org/accounting/psi.html
- Linux — Concepts overview (mm): https://docs.kernel.org/admin-guide/mm/concepts.html
- systemd-oomd: https://www.freedesktop.org/software/systemd/man/systemd-oomd.html

## Liên kết
[[Page Replacement Policy]] · [[Paging]] · [[Address Space]] · [[IO Devices]] · [[OS]]
