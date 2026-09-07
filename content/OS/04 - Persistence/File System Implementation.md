---
tags: [os, persistence, filesystem]
status: evergreen
---
# File System Implementation

> Cách biến một mảng block phẳng thành cây thư mục. VSFS ("Very Simple File System") của OSTEP là mô hình tối giản nhưng chứa đủ mọi ý tưởng có trong ext4, xfs, hay APFS.

## 1. Bố cục trên đĩa
```
| Super | i-bmap | d-bmap | Inode Table (nhiều block) | Data Blocks ......... |
```
| Vùng | Chứa gì |
|---|---|
| **Superblock** | metadata toàn hệ: số inode, số block, vị trí các vùng, magic number |
| **Bitmap** | inode nào / data block nào đang rảnh |
| **Inode table** | mảng inode; inode number = chỉ số → tính được vị trí bằng số học |
| **Data region** | nội dung file và nội dung thư mục |

## 2. Inode chứa gì
| Trường | Ghi chú |
|---|---|
| type (file/dir/link/device), quyền, uid/gid | → [[Access Control]] |
| size, link count, block count | link count = số hard link |
| atime / mtime / ctime | `ctime` là *change time* của inode, không phải create time |
| **con trỏ tới data block** | phần thú vị nhất |

> **Tên file KHÔNG nằm trong inode** — nó nằm trong thư mục. Xem [[Files and Directories]].

## 3. Multi-level index — cách trỏ tới dữ liệu
| Loại con trỏ | Bao phủ (block 4KB) |
|---|---|
| 12 con trỏ trực tiếp | 48 KB |
| 1 indirect (1024 con trỏ) | +4 MB |
| 1 double indirect | +4 GB |
| 1 triple indirect | +4 TB |

**Vì sao lệch cân bằng như vậy**: đo thực tế cho thấy **phần lớn file rất nhỏ** nhưng **phần lớn dung lượng nằm ở file lớn**. Cấu trúc này cho file nhỏ truy cập cực nhanh (không cần đọc thêm block nào) mà vẫn hỗ trợ file khổng lồ.

**Extent** (ext4, xfs, NTFS, APFS) là cách tiếp cận khác: lưu `(block bắt đầu, độ dài)` thay vì từng con trỏ → gọn hơn nhiều cho file lớn liên tục. Đánh đổi: cần file ít phân mảnh.

## 4. Đọc `/foo/bar` tốn bao nhiêu I/O
```
đọc inode gốc (/) → đọc data của / → tìm "foo"
đọc inode foo     → đọc data của foo → tìm "bar"
đọc inode bar     → đọc data block của bar
```
Đường dẫn càng sâu càng nhiều I/O. **Ghi** còn đắt hơn: tạo file cần đọc/ghi bitmap, ghi inode mới, ghi lại inode và data của thư mục cha — hơn 10 I/O cho một `create`.

→ Vì thế **caching là bắt buộc**, không phải tối ưu:
| Cache | Nội dung |
|---|---|
| **Page cache** | nội dung block, thống nhất với bộ nhớ ảo |
| **dentry cache** | ánh xạ tên → inode, tránh đi bộ đường dẫn |
| **inode cache** | inode đã đọc |
| **Write buffering** | gom ghi, sắp xếp, thậm chí huỷ ghi trùng — đổi lấy rủi ro mất dữ liệu → [[Crash Consistency and Journaling]] |

## 5. Cạm bẫy
- **Hết inode dù còn dung lượng** — hàng triệu file nhỏ. `df -i` mới thấy.
- **Thư mục có hàng trăm nghìn entry** → `readdir` và tra tên chậm (trừ khi FS dùng htree/B-tree). Nên băm ra thư mục con.
- **Nghĩ `stat` là rẻ** — với NFS hoặc thư mục lớn, `ls -l` (stat từng file) chậm hơn `ls` hàng chục lần.
- **Cho rằng `write()` xong là an toàn** — nó chỉ vào page cache.
- **Copy file lớn rồi bất ngờ vì đầy đĩa** — sparse file (`cp --sparse=always`, `du` vs `ls -l` chênh nhau).

## 6. Checklist áp dụng
- [ ] `df` và `df -i` — cạn cái nào trước?
- [ ] Thư mục nào đang có quá nhiều entry?
- [ ] Filesystem đang dùng là gì và tại sao (`findmnt`, `mount`)?
- [ ] Với nhiều file nhỏ: kích thước block/inode ratio có phù hợp không?
- [ ] Page cache hit rate ra sao? (`cachestat`, `vmstat`)

## Tham khảo
- OSTEP ch.40 *File System Implementation*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf
- OSTEP homework `vsfs.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/file-implementation
- ext4 wiki — disk layout: https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout
- Linux VFS docs: https://docs.kernel.org/filesystems/vfs.html
- Agrawal et al. — *A Five-Year Study of File-System Metadata* (FAST '07): https://research.cs.wisc.edu/adsl/Publications/fsstudy-fast07.pdf

## Liên kết
[[Files and Directories]] · [[Fast File System]] · [[Crash Consistency and Journaling]] · [[Page Replacement Policy]] · [[OS]]
