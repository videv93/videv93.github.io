---
tags: [os, persistence, filesystem, reliability]
status: evergreen
---
# Crash Consistency and Journaling

> Một thao tác file system logic (tạo file, ghi thêm block) cần **nhiều lần ghi đĩa**. Mất điện ở giữa → cấu trúc trên đĩa sai. Đây là bài toán **atomicity** của [[Lock]] nhưng với kẻ thù là mất điện thay vì thread khác.

## 1. Vấn đề: ghi một file cần 3 lần ghi
Append một block vào file cần cập nhật: **inode** (kích thước + con trỏ), **data bitmap** (đánh dấu block đã dùng), **data block**.

| Ghi được gì | Hậu quả |
|---|---|
| Chỉ data block | không sao — không ai trỏ tới nó |
| Chỉ inode | inode trỏ tới **rác**; và bitmap nói block còn trống → **hai file có thể cùng dùng một block** |
| Chỉ bitmap | **space leak** — block bị đánh dấu dùng mãi mãi mà không thuộc file nào |
| Inode + bitmap, thiếu data | file chứa dữ liệu rác của người dùng khác → **lỗ hổng bảo mật** |

## 2. Cách 1: `fsck` — sửa sau khi crash
Quét toàn bộ filesystem lúc khởi động, kiểm tra và sửa tính nhất quán: superblock, bitmap vs inode, link count, block trùng, thư mục mồ côi (→ `lost+found`).

| Ưu | Nhược |
|---|---|
| Không tốn gì khi chạy bình thường | **Quá chậm** — quét cả TB dữ liệu để sửa vài block vừa ghi |
| | Chỉ đảm bảo *nhất quán*, **không** đảm bảo *đúng* — nó có thể chọn giải pháp làm mất dữ liệu của bạn |

## 3. Cách 2: Journaling (write-ahead logging)
**Ghi ý định trước, rồi mới ghi thật.** Nếu crash, đọc lại journal và **replay**.

Giao thức đầy đủ:
```
1. Journal write:  ghi TxB + metadata + data vào journal
2. Journal commit: ghi TxE  ← chỉ sau khi (1) đã thực sự trên đĩa
3. Checkpoint:     ghi vào vị trí thật trên filesystem
4. Free:           đánh dấu transaction xong trong journal
```
> **Barrier ở bước 2 là bắt buộc.** Nếu ổ sắp xếp lại và ghi TxE trước metadata, journal có thể "hoàn chỉnh" mà nội dung là rác — và replay sẽ phá filesystem. Đây là lý do cần lệnh FLUSH/FUA của thiết bị.

## 4. Data journaling vs Metadata journaling
| | Data journaling | Metadata (ordered) journaling |
|---|---|---|
| Ghi vào journal | metadata **và** data | chỉ metadata |
| Chi phí | **ghi mọi thứ hai lần** | ~1× |
| Đảm bảo | mạnh nhất | metadata nhất quán; data cũ có thể còn |
| Quy tắc then chốt | — | **ghi data block xuống vị trí thật TRƯỚC khi commit metadata** — nếu không, inode có thể trỏ tới rác |

Chế độ ext4 (`mount -o data=`):
| Mode | Nghĩa |
|---|---|
| `journal` | data journaling — chậm nhất, an toàn nhất |
| `ordered` (mặc định) | data ghi trước metadata commit |
| `writeback` | không đảm bảo thứ tự — nhanh, có thể lộ dữ liệu rác sau crash |

## 5. Các cách tiếp cận khác
| Cách | Ý tưởng | Hệ |
|---|---|---|
| **Copy-on-write / shadow paging** | không bao giờ ghi đè tại chỗ; ghi bản mới rồi đổi con trỏ gốc (một ghi nguyên tử) | ZFS, btrfs, [[Log-structured File System]] |
| **Soft updates** | sắp xếp thứ tự ghi cẩn thận sao cho mọi trạng thái trung gian đều an toàn | FreeBSD FFS — cực khó cài đặt đúng |
| **Optimistic crash consistency** | dùng checksum thay cho barrier, phát hiện transaction hỏng lúc recovery | nghiên cứu, ảnh hưởng tới ext4 |

**Circular log**: journal là vùng cố định dùng vòng tròn; checkpoint xong thì giải phóng chỗ.

## 6. Cạm bẫy
- **Nghĩ journaling bảo vệ dữ liệu ứng dụng.** Nó bảo vệ **cấu trúc filesystem**. Dữ liệu của bạn vẫn cần `fsync` đúng chỗ → [[Data Integrity and Protection]].
- **Ổ đĩa/SSD nói dối về FLUSH** → giao thức đúng vẫn mất dữ liệu. Nhiều ổ giá rẻ làm điều này.
- **Tắt barrier (`nobarrier`) để tăng tốc** — chỉ an toàn khi có cache có pin (BBU/supercap).
- **Đặt journal trên cùng thiết bị với dữ liệu** trong hệ ghi nặng → tranh chấp I/O; có thể tách journal sang thiết bị riêng.
- **Giả định `fsck` sửa được mọi thứ** — nó sửa *nhất quán*, không phục hồi nội dung.

## 7. Checklist áp dụng
- [ ] Filesystem đang ở chế độ journaling nào? (`tune2fs -l`, `mount`)
- [ ] Barrier có bật không? (mặc định nên bật)
- [ ] Thiết bị lưu trữ có tôn trọng FLUSH không? (kiểm bằng `diskchecker.pl`, hoặc dùng ổ có power-loss protection)
- [ ] Ứng dụng có write-ahead log riêng không, và nó có `fsync` đúng thứ tự không?
- [ ] Đã **thử nghiệm crash** (rút điện thật / `dm-flakey` / qemu kill) chưa? Đây là thứ duy nhất chứng minh được.

## Tham khảo
- OSTEP ch.42 *Crash Consistency: FSCK and Journaling*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf
- Prabhakaran et al. — *Analysis and Evolution of Journaling File Systems* (USENIX '05): https://research.cs.wisc.edu/adsl/Publications/sba-usenix05.pdf
- Chidambaram et al. — *Optimistic Crash Consistency* (SOSP '13): https://research.cs.wisc.edu/adsl/Publications/optfs-sosp13.pdf
- Pillai et al. — *All File Systems Are Not Created Equal* (OSDI '14): https://research.cs.wisc.edu/adsl/Publications/alice-osdi14.pdf
- LWN — *Ensuring data reaches disk*: https://lwn.net/Articles/457667/

## Liên kết
[[File System Implementation]] · [[Data Integrity and Protection]] · [[Log-structured File System]] · [[Files and Directories]] · [[OS]]
