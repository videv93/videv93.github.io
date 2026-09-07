---
tags: [os, persistence, storage, reliability]
status: evergreen
---
# RAID

> Gộp nhiều đĩa thành một đĩa logic để đổi lấy **dung lượng, hiệu năng, hoặc độ tin cậy** — không bao giờ được cả ba. RAID trong suốt với OS: nó vẫn chỉ thấy một block device.

## 1. Ba trục đánh giá
Với `N` đĩa, mỗi đĩa `B` block, băng thông tuần tự `S`, ngẫu nhiên `R`:

| Mức | Dung lượng | Chịu lỗi | Đọc ngẫu nhiên | Ghi ngẫu nhiên | Ghi tuần tự |
|---|---|---|---|---|---|
| **RAID-0** (striping) | `N·B` | **0 đĩa** | `N·R` | `N·R` | `N·S` |
| **RAID-1** (mirroring) | `N·B/2` | 1 (tới N/2 nếu may) | `N·R` | `(N/2)·R` | `(N/2)·S` |
| **RAID-4** (parity riêng) | `(N−1)·B` | 1 | `(N−1)·R` | **`R/2`** ← nghẽn ở đĩa parity | `(N−1)·S` |
| **RAID-5** (parity phân tán) | `(N−1)·B` | 1 | `N·R` | `N·R/4` | `(N−1)·S` |
| **RAID-6** | `(N−2)·B` | **2** | `N·R` | thấp hơn RAID-5 | `(N−2)·S` |

## 2. Small-write problem — điểm quan trọng nhất
Ghi 1 block trong RAID-4/5 cần **4 thao tác I/O**:
1. đọc block dữ liệu cũ, 2. đọc parity cũ, 3. ghi dữ liệu mới, 4. ghi parity mới.

`P_new = (D_old XOR D_new) XOR P_old` — gọi là **subtractive parity**.

→ Ghi ngẫu nhiên nhỏ trên RAID-5 chỉ đạt ~1/4 tốc độ. Với RAID-4, mọi ghi đều đụng cùng một đĩa parity → đĩa đó là bottleneck tuyệt đối. Đó là lý do RAID-5 (phân tán parity) thay thế hoàn toàn RAID-4.

**Full-stripe write** (ghi trọn stripe) tránh được đọc trước → đây là lý do các hệ ghi tuần tự ([[Log-structured File System]], ZFS, Ceph) hợp với RAID parity hơn.

## 3. Cấu hình lai và thực tế
| Cấu hình | Đặc điểm |
|---|---|
| **RAID-10** (1+0) | mirror rồi stripe — nhanh, phục hồi nhanh, tốn 50% dung lượng. Lựa chọn mặc định cho database |
| **RAID-50/60** | cân bằng dung lượng và độ bền cho mảng lớn |
| **ZFS RAIDZ / btrfs** | parity + **checksum toàn phần** → phát hiện được silent corruption; tránh write hole |
| **Erasure coding** (Reed-Solomon) | mở rộng ý tưởng parity cho hệ phân tán (Ceph, S3, HDFS) |

## 4. Các chế độ hỏng cần biết
| Vấn đề | Nội dung |
|---|---|
| **RAID write hole** | Mất điện giữa lúc ghi dữ liệu và ghi parity → parity không khớp mà không ai biết. Chữa bằng NVRAM/journal (ZFS dùng copy-on-write nên không có lỗ này) |
| **Rebuild là lúc nguy hiểm nhất** | Thay đĩa hỏng → đọc **toàn bộ** các đĩa còn lại; với đĩa 20TB việc này mất nhiều ngày và có xác suất đáng kể gặp URE → mất mảng. Đây là lý do RAID-5 bị coi là không đủ cho đĩa dung lượng lớn |
| **Correlated failure** | Cùng lô sản xuất, cùng tuổi, cùng nhiệt độ → hỏng gần nhau |
| **Latent sector error / bit rot** | Lỗi im lặng, chỉ phát hiện khi đọc → cần **scrub** định kỳ + checksum → [[Data Integrity and Protection]] |

> **RAID không phải backup.** Nó bảo vệ khỏi *hỏng đĩa*, không bảo vệ khỏi `rm -rf`, ransomware, lỗi ứng dụng, hay cháy trung tâm dữ liệu.

## 5. Cạm bẫy
- **Dùng RAID-5 với đĩa ≥ 4TB** — rủi ro rebuild quá cao; dùng RAID-6 hoặc RAID-10.
- **RAID phần mềm trên controller có cache mà không có pin (BBU)** → mất dữ liệu khi cúp điện.
- **Không bật scrub định kỳ** → lỗi tích luỹ im lặng và chỉ lộ ra đúng lúc rebuild.
- **Không giám sát trạng thái mảng** → chạy nhiều tháng với một đĩa đã chết (degraded), rồi đĩa thứ hai chết.
- **Coi RAID-0 là "tăng tốc miễn phí"** — xác suất hỏng **tăng** theo số đĩa.

## 6. Checklist áp dụng
- [ ] Tôi ưu tiên gì: dung lượng, hiệu năng ghi, hay chịu lỗi?
- [ ] Workload có nhiều ghi ngẫu nhiên nhỏ không? (nếu có → tránh RAID-5/6)
- [ ] Có cảnh báo tự động khi mảng degraded không? (`mdadm --monitor`, `zpool status`)
- [ ] Scrub có lên lịch định kỳ không?
- [ ] **Có backup thật (offsite, có phiên bản) ngoài RAID không?**
- [ ] Thời gian rebuild ước tính bao lâu? Chịu được rủi ro đó không?

## Tham khảo
- OSTEP ch.38 *Redundant Arrays of Inexpensive Disks (RAIDs)*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf
- Patterson, Gibson, Katz — *A Case for RAID* (SIGMOD '88): https://dl.acm.org/doi/10.1145/50202.50214
- Bairavasundaram et al. — *An Analysis of Latent Sector Errors in Disk Drives*: https://research.cs.wisc.edu/adsl/Publications/latent-sigmetrics07.pdf
- `mdadm(8)`: https://man7.org/linux/man-pages/man8/mdadm.8.html
- OpenZFS docs: https://openzfs.github.io/openzfs-docs/

## Liên kết
[[Hard Disk Drive]] · [[Data Integrity and Protection]] · [[Log-structured File System]] · [[Flash-based SSD]] · [[OS]]
