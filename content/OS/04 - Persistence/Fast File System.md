---
tags: [os, persistence, filesystem]
status: evergreen
---
# Fast File System

> FFS (Berkeley, 1984) là bài học kinh điển về một ý tưởng: **thiết kế file system phải biết ổ đĩa hoạt động ra sao**. Old UNIX FS chỉ dùng được ~2% băng thông đĩa; FFS đưa lên ~47% mà không đổi API.

## 1. Vấn đề của Old UNIX FS
- Inode ở một đầu đĩa, data ở đầu kia → mỗi lần đọc file phải **seek qua cả đĩa**.
- Free list phân mảnh dần → block của một file rải rác khắp nơi.
- Block nhỏ (512B) → nhiều I/O cho file lớn.

Kết luận: **cấu trúc dữ liệu đúng, hiệu năng sai** — vì nó coi đĩa như bộ nhớ truy cập ngẫu nhiên đồng đều.

## 2. Ý tưởng trung tâm: cylinder group
Chia đĩa thành các **nhóm** (cylinder group / block group), **mỗi nhóm có bản sao đầy đủ cấu trúc**: superblock, bitmap, inode table, data block.

→ Giờ có thể đặt những thứ liên quan **gần nhau về mặt vật lý**.

## 3. Các heuristic đặt chỗ
| Đối tượng | Chính sách |
|---|---|
| **Thư mục** | đặt vào nhóm có **ít thư mục** và **nhiều inode trống** — trải đều ra |
| **File** | đặt inode **cùng nhóm với thư mục cha**; đặt data block cùng nhóm với inode |
| **File lớn** | **chia sang nhiều nhóm** — nếu không, một file lớn chiếm hết nhóm và phá vỡ locality của mọi file khác trong thư mục |

**Amortization**: chunk chia file lớn phải **đủ lớn** để thời gian truyền lấn át thời gian seek. Muốn dùng 50% băng thông thì mỗi chunk phải mất thời gian truyền ≈ thời gian seek.

> Đây là mẫu tư duy tổng quát: **chi phí cố định lớn ⇒ tăng kích thước đơn vị công việc để khấu hao nó.** Áp dụng được cho batching mạng, ghi log, request DB.

## 4. Các cải tiến nhỏ nhưng đắt giá
| Cải tiến | Giải quyết |
|---|---|
| **Sub-block / fragment** (512B trong block 4KB) | file nhỏ không lãng phí cả block — giảm internal fragmentation |
| **Parameterized layout** (block skip theo tốc độ quay) | đọc tuần tự không lỡ vòng quay; sau này ổ có cache track nên bỏ được |
| **Long file name** (>14 ký tự) | tiện dụng |
| **Symbolic link** | ra đời cùng FFS |
| **Atomic `rename()`** | nền tảng cho mọi mẫu ghi an toàn ngày nay |

## 5. Di sản
- **ext2/ext3/ext4** kế thừa trực tiếp mô hình block group + heuristic locality.
- **Delayed allocation** (ext4, xfs): chờ tới lúc flush mới quyết định vị trí → biết được kích thước cuối cùng → chọn extent liên tục. Cái giá: mất dữ liệu nhiều hơn nếu crash trước flush (vụ tranh cãi ext4 + `rename` năm 2009).
- Nguyên tắc **"locality is everything"** vẫn đúng với SSD, chỉ đổi lý do (từ seek sang FTL và erase block) → [[Flash-based SSD]].

## 6. Cạm bẫy
- **Đĩa gần đầy → mọi heuristic sụp đổ.** Không còn chỗ để đặt "gần nhau" → phân mảnh nặng. Giữ dưới ~80–85% dung lượng là quy tắc thực dụng.
- **Rất nhiều file nhỏ trong một thư mục** vẫn phá locality bất kể FS.
- **Cho rằng defrag là vô nghĩa trên Linux** — với ext4 gần đầy hoặc workload append-heavy, `e4defrag`/`xfs_fsr` vẫn có tác dụng.
- **Áp heuristic của HDD lên SSD** — với SSD, seek gần như miễn phí nhưng **write amplification** mới là kẻ thù.

## 7. Checklist áp dụng
- [ ] Filesystem đang dùng bao nhiêu phần trăm? (>85% là vùng nguy hiểm)
- [ ] Mức phân mảnh thế nào? (`e4defrag -c`, `xfs_db frag`)
- [ ] Dữ liệu liên quan có nằm gần nhau về mặt thư mục không?
- [ ] Với hàng triệu file nhỏ: đã cân nhắc gộp vào một file lớn / DB / object store chưa?
- [ ] Delayed allocation có gây rủi ro mất dữ liệu cho app của tôi không? (đã `fsync` chưa?)

## Tham khảo
- OSTEP ch.41 *Locality and The Fast File System*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf
- McKusick et al. — *A Fast File System for UNIX* (1984): https://dsf.berkeley.edu/cs262/FFS.pdf
- ext4 wiki: https://ext4.wiki.kernel.org/
- LWN — *ext4 and data loss* (delayed allocation): https://lwn.net/Articles/322823/

## Liên kết
[[File System Implementation]] · [[Hard Disk Drive]] · [[Log-structured File System]] · [[Crash Consistency and Journaling]] · [[OS]]
