---
tags: [os, persistence, filesystem]
status: evergreen
---
# Log-structured File System

> LFS (Rosenblum & Ousterhout, 1991) đặt cược vào một quan sát: RAM ngày càng lớn → cache hấp thụ hết đọc → **workload xuống đĩa gần như toàn là ghi**. Vậy hãy thiết kế file system chỉ **ghi tuần tự**, không bao giờ ghi đè tại chỗ.

## 1. Ý tưởng cốt lõi
Mọi thứ — data block, inode, thư mục — đều được **append vào một log liên tục**.
- Ghi ngẫu nhiên biến thành ghi tuần tự → dùng gần hết băng thông [[Hard Disk Drive]].
- Không ghi đè → phiên bản cũ vẫn còn (nền tảng của snapshot).

**Write buffering / segment**: gom ghi trong RAM thành **segment** lớn (vài MB) rồi ghi một phát. Segment phải đủ lớn để khấu hao seek — cùng lập luận amortization của [[Fast File System]].

## 2. Vấn đề: tìm inode ở đâu?
Inode không còn ở vị trí cố định (nó bị ghi lại ở chỗ mới mỗi lần đổi). Lời giải:
| Cấu trúc | Vai trò |
|---|---|
| **Inode map (imap)** | ánh xạ inode number → vị trí hiện tại trên đĩa |
| imap cũng được ghi vào log | (từng mảnh, kề bên inode vừa ghi) |
| **Checkpoint Region (CR)** | vị trí **cố định** trên đĩa, trỏ tới các mảnh imap mới nhất; cập nhật định kỳ (ví dụ 30s) |

→ Chỉ CR là nơi duy nhất bị ghi đè. Toàn bộ độ phức tạp của LFS nằm ở lớp gián tiếp này — lại là **indirection** ([[Three Easy Pieces]]).

## 3. Garbage collection — vấn đề khó nhất
Ghi liên tục sinh **phiên bản chết** (garbage). Cleaner phải:
1. Đọc M segment cũ.
2. Xác định block nào còn **sống** — dùng **segment summary block** (ghi kèm mỗi block: nó thuộc inode nào, offset nào) rồi đối chiếu với imap.
3. Ghi các block sống thành N segment mới (N < M), giải phóng phần còn lại.

| Câu hỏi chính sách | Lựa chọn |
|---|---|
| **Khi nào** dọn | định kỳ, khi rảnh, hoặc khi hết segment trống |
| **Dọn segment nào** | segment "lạnh" (ít đổi) đáng dọn hơn segment "nóng" (sẽ tự chết sớm) — heuristic hot/cold |

> GC là cái giá của mọi thiết kế append-only: LFS, SSD FTL, LSM-tree (RocksDB, Cassandra), ZFS. **Write amplification** là chỉ số đo cái giá đó.

## 4. Crash recovery trong LFS
- Đọc CR gần nhất (giữ **hai** bản CR, ghi luân phiên với timestamp đầu/cuối để phát hiện CR ghi dở).
- **Roll forward**: quét tiếp phần log sau CR để phục hồi các segment đã ghi nhưng chưa được checkpoint.
- Phục hồi rất nhanh so với `fsck` — vì chỉ cần đọc phần cuối log.

## 5. Di sản: ý tưởng thắng lớn ở nơi khác
| Hệ | Áp dụng |
|---|---|
| **[[Flash-based SSD]] FTL** | flash *bắt buộc* ghi tuần tự trong block đã xoá → FTL về bản chất là một LFS |
| **LSM-tree** (LevelDB, RocksDB, Cassandra, HBase) | memtable + SSTable + compaction = write buffering + GC |
| **ZFS, btrfs, WAFL** | copy-on-write, snapshot gần như miễn phí |
| **Kafka, WAL của mọi DB** | append-only log là cấu trúc lưu trữ trung tâm |
| **F2FS** | LFS thiết kế riêng cho flash, dùng trên Android |

## 6. Cạm bẫy
- **Đánh giá LFS/LSM chỉ bằng benchmark ghi** — bỏ qua chi phí GC/compaction xuất hiện sau, đúng lúc hệ thống đang bận.
- **Bỏ qua write amplification** — ghi 1 byte có thể tốn 10–30 byte thật sau compaction.
- **Đĩa gần đầy** → GC không có chỗ xoay xở → hiệu năng sụp (đúng với cả SSD: nên chừa over-provisioning).
- **Đọc ngẫu nhiên có thể tệ hơn** file system truyền thống vì block của một file rải rác theo thời gian ghi.
- **Nghĩ snapshot miễn phí** — nó miễn phí lúc tạo, nhưng giữ lâu thì chặn GC và ăn dung lượng.

## 7. Checklist áp dụng
- [ ] Hệ lưu trữ tôi dùng có phải append-only/LSM không? Nếu có: đo write amplification bao nhiêu?
- [ ] Compaction/GC chạy lúc nào? Có va vào giờ cao điểm không?
- [ ] Dung lượng còn trống có đủ cho GC hoạt động không (thường cần ≥20%)?
- [ ] Latency đọc p99 có bị ảnh hưởng bởi compaction không?
- [ ] Snapshot cũ có đang giữ dữ liệu chết không?

## Tham khảo
- OSTEP ch.43 *Log-structured File Systems*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-lfs.pdf
- Rosenblum & Ousterhout — *The Design and Implementation of a Log-Structured File System* (SOSP '91): https://people.eecs.berkeley.edu/~brewer/cs262/LFS.pdf
- Seltzer et al. — *An Implementation of a Log-Structured File System for UNIX*: https://www.usenix.org/legacy/publications/library/proceedings/sd93/seltzer.pdf
- O'Neil et al. — *The Log-Structured Merge-Tree (LSM-Tree)*: https://www.cs.umb.edu/~poneil/lsmtree.pdf
- F2FS (FAST '15): https://www.usenix.org/system/files/conference/fast15/fast15-paper-lee.pdf

## Liên kết
[[Crash Consistency and Journaling]] · [[Flash-based SSD]] · [[Fast File System]] · [[File System Implementation]] · [[OS]]
