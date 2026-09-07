---
tags: [os, persistence, filesystem]
status: evergreen
---
# Files and Directories

> Hai trừu tượng mà OS dựng trên đĩa thô: **file** (mảng byte có tên) và **directory** (ánh xạ tên → inode). Toàn bộ triết lý "everything is a file" của UNIX nằm ở đây.

## 1. Hai khái niệm nền
| | File | Directory |
|---|---|---|
| Bản chất | mảng byte tuyến tính | file đặc biệt chứa cặp `(tên, inode number)` |
| Định danh thật | **inode number** | inode number |
| Tên | chỉ là nhãn trong directory | — |

> **Tên không thuộc về file.** File thuộc về inode; tên chỉ là một entry trong thư mục trỏ tới inode đó. Hiểu điều này giải thích được hard link, `rename` nguyên tử, và vì sao xoá file đang mở không giải phóng dung lượng.

## 2. File descriptor
Là chỉ số vào **bảng fd của [[Process]]** → trỏ tới **open file table** (chứa offset, cờ) → trỏ tới inode.
| Hiện tượng | Vì sao |
|---|---|
| `fork()` — cha con **chia sẻ offset** | cùng trỏ tới một open file entry |
| `open()` hai lần cùng file — offset **riêng** | hai open file entry khác nhau |
| `dup2(fd, 1)` — redirect stdout | hai fd trỏ chung một entry |

## 3. Hard link vs Symlink
| | Hard link | Symbolic link |
|---|---|---|
| Trỏ tới | **inode** | **đường dẫn** (chuỗi) |
| Vượt filesystem | ❌ | ✅ |
| Link tới thư mục | ❌ (cấm, để tránh chu trình) | ✅ |
| Khi đích bị xoá | vẫn sống (refcount giảm) | thành **dangling** |
| Cơ chế xoá | `unlink` giảm refcount; inode chết khi refcount = 0 **và** không còn fd mở | — |

Đây là lý do `unlink` được đặt tên vậy chứ không phải `delete`: nó gỡ một liên kết, không xoá dữ liệu.

## 4. Các thao tác quan trọng
| Thao tác | Ghi chú |
|---|---|
| `open`, `read`, `write`, `lseek`, `close` | cơ bản; xem [[System Call]] về short read/write |
| **`rename`** | **nguyên tử** trong cùng filesystem → nền tảng của mẫu "ghi file tạm rồi rename" |
| `fsync` | ép dữ liệu xuống thiết bị; xem [[Data Integrity and Protection]] |
| `stat`/`fstat` | đọc metadata inode |
| `mmap` | ánh xạ file vào [[Address Space]] |
| `mount` | ghép cây thư mục của một filesystem vào cây chung |

**Mẫu ghi file an toàn (durable atomic replace):**
1. ghi vào `file.tmp` → 2. `fsync(file.tmp)` → 3. `rename(file.tmp, file)` → 4. **`fsync` thư mục cha**.
Thiếu bước 4 là bug rất phổ biến — rename có thể chưa bền.

## 5. Cạm bẫy
- **Xoá file đang được mở mà không thấy dung lượng trả về.** Space chỉ trả khi fd cuối cùng đóng (`lsof +L1` để tìm).
- **Quên `fsync` thư mục** sau khi tạo/rename file.
- **TOCTOU**: `access()` rồi `open()` — kẻ tấn công đổi symlink ở giữa. Dùng `openat` + `O_NOFOLLOW`, hoặc mở trước rồi kiểm tra bằng `fstat`.
- **Giả định tên file là UTF-8** — trên Linux tên file là chuỗi byte bất kỳ trừ `/` và `\0`.
- **Dùng `readdir` rồi giả định thứ tự** — không có thứ tự đảm bảo.
- **Đường dẫn có khoảng trắng/newline** phá script — dùng `find -print0 | xargs -0`.

## 6. Checklist áp dụng
- [ ] Ghi dữ liệu quan trọng: đã dùng mẫu tmp + fsync + rename + fsync dir chưa?
- [ ] Mọi fd có được đóng trên mọi đường thoát không? Có `O_CLOEXEC` chưa?
- [ ] Code có xử lý symlink một cách an toàn không (`O_NOFOLLOW`, `realpath`)?
- [ ] Có kiểm tra giá trị trả về của `close()` không? (lỗi ghi có thể chỉ lộ ra ở đây)
- [ ] Đầy đĩa: tôi kiểm tra cả `df` (block) lẫn `df -i` (inode) chưa?

## Tham khảo
- OSTEP ch.39 *Interlude: Files and Directories*: https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf
- `open(2)`, `rename(2)`, `unlink(2)`: https://man7.org/linux/man-pages/man2/open.2.html
- Pillai et al. — *All File Systems Are Not Created Equal* (OSDI '14): https://research.cs.wisc.edu/adsl/Publications/alice-osdi14.pdf
- LWN — *Ensuring data reaches disk*: https://lwn.net/Articles/457667/
- `path_resolution(7)`: https://man7.org/linux/man-pages/man7/path_resolution.7.html

## Liên kết
[[File System Implementation]] · [[Data Integrity and Protection]] · [[System Call]] · [[Access Control]] · [[OS]]
