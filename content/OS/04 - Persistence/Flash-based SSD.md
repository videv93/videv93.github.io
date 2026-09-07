---
tags: [os, persistence, storage]
status: evergreen
---
# Flash-based SSD

> SSD nhanh hơn [[Hard Disk Drive]] hàng trăm lần, nhưng nó không phải "đĩa nhanh hơn" — nó là thiết bị có **ràng buộc vật lý hoàn toàn khác**: không ghi đè được, phải xoá theo khối lớn, và **mòn dần khi dùng**.

## 1. Ba thao tác, ba đơn vị
| Thao tác | Đơn vị | Thời gian điển hình |
|---|---|---|
| **Read** | page (4–16 KB) | ~10–100 µs |
| **Program (ghi)** | page — **chỉ ghi được vào page đã xoá** | ~100–500 µs |
| **Erase** | **block** (vài trăm page, hàng MB) | ~1–5 ms |

> Ràng buộc chết người: **muốn sửa 1 byte phải xoá cả block hàng MB.** Đó là gốc rễ của mọi thứ phức tạp trong SSD.

## 2. FTL — Flash Translation Layer
Firmware trong SSD làm ba việc:
| Việc | Cách làm |
|---|---|
| **Ánh xạ logic→vật lý** | ghi mới luôn vào page trống ở nơi khác, cập nhật bảng ánh xạ → **về bản chất là [[Log-structured File System]]** |
| **Garbage collection** | gom page còn sống từ các block rải rác, ghi lại, rồi xoá block → sinh **write amplification** |
| **Wear leveling** | phân bố ghi đều khắp các block, kể cả block chứa dữ liệu tĩnh (phải chủ động di chuyển nó) |

| Kiểu mapping | Đặc điểm |
|---|---|
| Page-level | linh hoạt nhất, bảng ánh xạ **rất lớn** (cần nhiều DRAM trên SSD) |
| Block-level | bảng nhỏ, nhưng ghi nhỏ tốn kém khủng khiếp |
| **Hybrid (log-block)** | vài block ghi kiểu page-level làm log, còn lại block-level — cách thực tế |

## 3. Write amplification và over-provisioning
```
WA = số byte ghi thật xuống flash / số byte host yêu cầu ghi
```
- Ghi ngẫu nhiên nhỏ → WA cao (có thể 10×+); ghi tuần tự lớn → WA ≈ 1.
- **Over-provisioning**: SSD giấu 7–28% dung lượng để GC có chỗ xoay xở. Ổ càng đầy → GC càng khổ → **hiệu năng và tuổi thọ đều giảm**.
- **TRIM/discard**: OS báo cho SSD biết block nào không còn dùng → SSD không phải copy dữ liệu chết khi GC. Thiếu TRIM là nguyên nhân "SSD chậm dần" kinh điển.

## 4. Độ bền và các loại cell
| Loại | Bit/cell | P/E cycle điển hình | Dùng cho |
|---|---|---|---|
| SLC | 1 | ~100.000 | cache, enterprise |
| MLC | 2 | ~10.000 | cũ |
| TLC | 3 | ~1.000–3.000 | phổ thông hiện nay |
| QLC | 4 | ~100–1.000 | lưu trữ đọc nhiều, ghi ít |

Cell mòn theo **chu kỳ Program/Erase**; thêm **disturbance** (ghi/đọc page ảnh hưởng page kề) và **retention** (dữ liệu phai dần khi không cấp điện, nhanh hơn khi nhiệt độ cao). → ECC mạnh là bắt buộc → [[Data Integrity and Protection]].

**TBW / DWPD** trên spec sheet là con số cần đọc khi chọn ổ cho workload ghi nặng.

## 5. Hệ quả cho phần mềm
- **Ghi tuần tự, ghi theo khối lớn, ghi ít lần** vẫn tốt hơn — dù không còn seek.
- **Nhiều I/O song song** (queue depth cao) mới khai thác hết SSD; một luồng đồng bộ chỉ dùng được một phần nhỏ.
- I/O scheduler nên là `none`/`mq-deadline`, không phải scheduler tối ưu seek.
- **Đừng defrag SSD** — vô ích và đốt tuổi thọ.
- Filesystem hợp: ext4/xfs với `discard`/`fstrim` định kỳ, F2FS cho thiết bị nhúng.

## 6. Cạm bẫy
- **Benchmark SSD mới toanh** → nhanh giả tạo. Phải làm đầy ổ và chạy tới **steady state** mới thấy số thật.
- **Ổ gần đầy** → hiệu năng ghi sụp. Chừa ≥10–20% trống.
- **Tin `fsync` trên SSD tiêu dùng** — thiếu power-loss protection thì dữ liệu trong DRAM cache của ổ có thể mất → [[Crash Consistency and Journaling]].
- **Bỏ qua `fstrim.timer`** trên máy Linux.
- **Dùng QLC cho workload ghi nặng** — hết TBW rất nhanh.
- **Nghĩ SSD không cần backup** — nó hỏng đột ngột hơn HDD (thường không có dấu hiệu báo trước).

## 7. Checklist áp dụng
- [ ] TRIM có đang chạy không? (`systemctl status fstrim.timer`, `lsblk --discard`)
- [ ] Dung lượng còn trống ≥ 20% chưa?
- [ ] SMART: `Percentage Used`, `Media Wear`, `Data Units Written` là bao nhiêu? (`smartctl -a`)
- [ ] Ổ có power-loss protection không (nếu chạy DB)?
- [ ] Benchmark có chạy tới steady state không?
- [ ] I/O scheduler đã đặt `none`/`mq-deadline` chưa?

## Tham khảo
- OSTEP ch.44 *Flash-based SSDs*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf
- Agrawal et al. — *Design Tradeoffs for SSD Performance* (USENIX '08): https://www.usenix.org/legacy/event/usenix08/tech/full_papers/agrawal/agrawal.pdf
- Gupta et al. — *DFTL* (ASPLOS '09): https://dl.acm.org/doi/10.1145/1508244.1508261
- `smartctl` / smartmontools: https://www.smartmontools.org/
- Google/Facebook field studies về SSD failure (FAST '16): https://www.usenix.org/conference/fast16/technical-sessions/presentation/schroeder

## Liên kết
[[Hard Disk Drive]] · [[Log-structured File System]] · [[IO Devices]] · [[Data Integrity and Protection]] · [[OS]]
