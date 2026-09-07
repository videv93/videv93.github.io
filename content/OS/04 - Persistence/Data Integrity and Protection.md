---
tags: [os, persistence, reliability]
status: evergreen
---
# Data Integrity and Protection

> [[RAID]] giả định đĩa **hoặc chạy đúng, hoặc chết hẳn**. Thực tế tệ hơn: đĩa trả về **dữ liệu sai mà không báo lỗi**. Chương này về việc phát hiện và sống chung với điều đó.

## 1. Hai mô hình lỗi
| Mô hình | Nội dung | Ai phát hiện |
|---|---|---|
| **Fail-stop** | thiết bị chết hẳn, mọi truy cập báo lỗi | dễ — RAID xử lý được |
| **Fail-partial** | thiết bị vẫn sống nhưng một phần dữ liệu hỏng | khó — cần checksum |

Hai dạng fail-partial:
| Dạng | Nghĩa | Phát hiện bởi |
|---|---|---|
| **Latent Sector Error (LSE)** | đọc thất bại, ECC không sửa nổi — **đĩa BÁO lỗi** | thiết bị tự báo → phục hồi từ parity/mirror |
| **Silent / Corruption** | đĩa trả dữ liệu sai và **nói rằng nó đúng** | chỉ checksum ở tầng trên |

Nguyên nhân silent corruption: firmware bug, **misdirected write** (ghi đúng dữ liệu nhưng sai địa chỉ), **lost write** (thiết bị báo đã ghi mà chưa ghi), bit rot, lỗi trên bus/RAM.

## 2. Checksum — và vì sao checksum không đủ
| Loại | Sức mạnh | Chi phí |
|---|---|---|
| XOR parity | rất yếu | rẻ nhất |
| Addition / Fletcher | trung bình | rẻ |
| **CRC32/CRC32C** | tốt cho lỗi burst | rẻ (có lệnh CPU) |
| **Cryptographic (SHA-256, BLAKE3)** | mạnh nhất, chống cả sửa đổi cố ý | đắt hơn |

**Checksum thường chỉ phát hiện được "nội dung block này bị hỏng".** Nó **không** bắt được:
| Lỗi | Cách chữa |
|---|---|
| **Misdirected write** — nội dung + checksum đều đúng, nhưng ở **sai vị trí** | thêm **physical ID** (disk number + block number) vào vùng checksum |
| **Lost write** — vẫn còn dữ liệu **cũ** và checksum cũ, hoàn toàn nhất quán | **write verify** (đọc lại sau khi ghi), hoặc lưu checksum ở nơi **khác** (inode/ chỉ mục), như ZFS làm |

## 3. Scrubbing
Đọc định kỳ **toàn bộ** dữ liệu, kiểm checksum, sửa từ bản dư thừa.
- Không scrub → lỗi tích luỹ im lặng và chỉ lộ ra đúng lúc rebuild, khi không còn dư thừa để sửa.
- Lịch thông dụng: hằng tuần hoặc hằng tháng, chạy lúc tải thấp.
- `zpool scrub`, `btrfs scrub`, `echo check > /sys/block/mdX/md/sync_action`.

## 4. Durability ở tầng ứng dụng — chuỗi bị đứt ở đâu
```
app buffer → write() → page cache → thiết bị → cache của ổ → NAND/plate
             ↑              ↑                       ↑
          không bền     fsync đẩy tới đây      FLUSH cần thiết
```
| Bước | Cần gì |
|---|---|
| `write()` trả về | **chưa bền gì cả** |
| `fsync(fd)` | đẩy data + metadata của file xuống thiết bị + phát FLUSH |
| `fsync(dirfd)` | cần thêm để **tên file** (rename/create) bền |
| `fdatasync` | như fsync nhưng bỏ metadata không cần thiết → nhanh hơn |
| Thiết bị tôn trọng FLUSH | nếu ổ nói dối, mọi thứ trên vô nghĩa |

**`fsync` thất bại là chuyện nghiêm trọng**: trên Linux, lỗi có thể bị "nuốt" và lần `fsync` sau trả về thành công dù dữ liệu đã mất (vụ *fsyncgate* của PostgreSQL 2018). Xử lý đúng: coi `fsync` lỗi là **không thể phục hồi** → crash và recovery từ log.

## 5. Cạm bẫy
- **Tin `write()` là đã lưu.**
- **Quên `fsync` thư mục cha** sau khi tạo/rename.
- **Bỏ qua giá trị trả về của `fsync` và `close`.**
- **Dùng RAM không ECC cho hệ lưu trữ quan trọng** — corruption từ RAM đi thẳng vào checksum "đúng".
- **Checksum lưu ngay cạnh dữ liệu** → không bắt được lost write.
- **Coi RAID/replication là đủ** — corruption được sao chép trung thực sang mọi bản sao nếu không có checksum end-to-end.
- **Không bao giờ thử phục hồi backup** — backup chưa restore thử là backup chưa tồn tại.

## 6. Checklist áp dụng
- [ ] Dữ liệu quan trọng có checksum **end-to-end** (ứng dụng → lưu trữ) không?
- [ ] Scrub có lên lịch và có báo cáo kết quả không?
- [ ] Ứng dụng có xử lý `fsync` lỗi đúng cách (crash thay vì bỏ qua) không?
- [ ] Mẫu ghi an toàn: tmp → fsync → rename → fsync dir, đã đủ chưa?
- [ ] Thiết bị có power-loss protection không?
- [ ] SMART có được giám sát và cảnh báo không?
- [ ] Đã **restore thử** backup trong 3 tháng gần đây chưa?

## Tham khảo
- OSTEP ch.45 *Data Integrity and Protection*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-integrity.pdf
- Bairavasundaram et al. — *An Analysis of Data Corruption in the Storage Stack* (FAST '08): https://research.cs.wisc.edu/adsl/Publications/corruption-fast08.pdf
- PostgreSQL *fsyncgate*: https://wiki.postgresql.org/wiki/Fsync_Errors
- LWN — *PostgreSQL's fsync() surprise*: https://lwn.net/Articles/752063/
- ZFS end-to-end data integrity: https://openzfs.github.io/openzfs-docs/

## Liên kết
[[Crash Consistency and Journaling]] · [[RAID]] · [[Flash-based SSD]] · [[Files and Directories]] · [[OS]]
