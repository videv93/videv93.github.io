---
tags: [os, persistence, io, storage]
status: evergreen
---
# Hard Disk Drive

> Thiết bị duy nhất trong máy tính có **bộ phận chuyển động**. Vật lý của nó (quay + di chuyển tay đọc) sinh ra một hệ quả duy nhất nhưng chi phối toàn bộ thiết kế file system: **tuần tự nhanh hơn ngẫu nhiên hàng trăm lần**.

## 1. Giải phẫu và thời gian truy cập
```
T_I/O = T_seek + T_rotation + T_transfer
```
| Thành phần | Nghĩa | Bậc độ lớn |
|---|---|---|
| **Seek** | tay đọc di chuyển tới đúng track | ~4–10 ms (thường lớn nhất) |
| **Rotation** | chờ sector quay tới đầu đọc | trung bình = nửa vòng; 7200 RPM → ~4.2 ms |
| **Transfer** | đọc/ghi dữ liệu thật | rất nhỏ với block nhỏ |

**Ví dụ điển hình**: đọc ngẫu nhiên 4KB ≈ 0.3 MB/s; đọc tuần tự ≈ 100–200 MB/s. **Chênh ~500×.** Đây là con số cần thuộc.

## 2. Hai kỹ thuật của ổ đĩa
| Kỹ thuật | Nội dung |
|---|---|
| **Track skew** | Sector được lệch pha giữa các track kề nhau để bù thời gian seek ngắn khi đọc tuần tự vượt track |
| **Cache / track buffer** | Vài MB DRAM trên ổ; **write-back** (báo xong khi vào cache) nhanh nhưng **mất dữ liệu khi cúp điện**; write-through an toàn hơn |

→ Đây là lý do `fsync` phải kèm lệnh **FLUSH CACHE** xuống ổ, và vì sao ổ nói dối về `fsync` là nguyên nhân mất dữ liệu kinh điển → [[Data Integrity and Protection]].

## 3. Disk scheduling
| Thuật toán | Ý tưởng | Vấn đề |
|---|---|---|
| **FCFS** | theo thứ tự đến | seek lung tung |
| **SSTF / NBF** | chọn yêu cầu gần đầu đọc nhất | **starvation** cho yêu cầu ở xa |
| **SCAN / Elevator** | quét qua lại như thang máy | công bằng hơn |
| **C-SCAN** | chỉ quét một chiều rồi nhảy về | công bằng hơn nữa |
| **SPTF / SATF** | tính cả thời gian quay, không chỉ seek | cần biết chi tiết hình học ổ → thường làm **trong ổ** |
| **CFQ / BFQ / mq-deadline** | scheduler của Linux, thêm mục tiêu công bằng giữa process | với SSD nên dùng `none`/`mq-deadline` |

> **Work conservation**: scheduler có nên đợi một chút để gom yêu cầu gần nhau (anticipatory), hay luôn phát ngay? Đợi tăng thông lượng, hại latency — lại là đánh đổi quen thuộc.

Ngày nay OS **và** firmware ổ cùng schedule; OS gom và sắp xếp thô, ổ tối ưu chi tiết.

## 4. Vì sao vẫn nên hiểu HDD năm 2026
- HDD vẫn thống trị lưu trữ lạnh/dung lượng lớn (cloud object storage, backup) vì $/TB.
- **Toàn bộ thiết kế file system truyền thống** ([[Fast File System]], [[Log-structured File System]], journaling) sinh ra từ vật lý HDD — không hiểu HDD thì không hiểu vì sao chúng như vậy.
- Tư duy "tuần tự > ngẫu nhiên" vẫn đúng ở mọi tầng: page cache, mạng, thậm chí SSD (do FTL và kích thước erase block) → [[Flash-based SSD]].

## 5. Cạm bẫy
- **Benchmark bằng file nhỏ** → nằm gọn trong cache của ổ và page cache → số liệu vô nghĩa. Dùng dataset ≫ RAM.
- **Tin IOPS ghi trên nhãn** — đó là số tuần tự hoặc trong cache.
- **Đặt DB có nhiều random write trên HDD** rồi ngạc nhiên vì chậm.
- **Bật write cache mà không có UPS/BBU** → mất dữ liệu khi cúp điện.
- **Dùng `cfq` cho SSD** — scheduler tối ưu cho seek gây hại trên thiết bị không có seek.

## 6. Checklist áp dụng
- [ ] Workload là tuần tự hay ngẫu nhiên? Tỉ lệ đọc/ghi?
- [ ] Thiết bị là HDD hay SSD? (`lsblk -d -o name,rota` — `rota=1` là quay)
- [ ] I/O scheduler đang dùng là gì? (`cat /sys/block/sdX/queue/scheduler`)
- [ ] Write cache có bật không, và có bảo vệ điện không? (`hdparm -W`)
- [ ] Dataset benchmark có lớn hơn RAM không?

## Tham khảo
- OSTEP ch.37 *Hard Disk Drives*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf
- Ruemmler & Wilkes — *An Introduction to Disk Drive Modeling*: https://dl.acm.org/doi/10.1109/2.204462
- Linux — block I/O schedulers: https://docs.kernel.org/block/index.html
- Seagate/WD spec sheet — đọc thử một cái để thấy các con số thật

## Liên kết
[[IO Devices]] · [[RAID]] · [[Fast File System]] · [[Flash-based SSD]] · [[OS]]
