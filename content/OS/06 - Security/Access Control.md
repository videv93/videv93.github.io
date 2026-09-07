---
tags: [os, security]
status: evergreen
---
# Access Control

> Trả lời **"principal này được làm gì với object kia?"**. Mô hình trừu tượng là một **ma trận** (chủ thể × đối tượng); mọi hệ thực tế là một cách nén ma trận đó cho khả thi.

## 1. Ma trận truy cập và hai cách nén
| | Nén theo **cột** (object) | Nén theo **hàng** (subject) |
|---|---|---|
| Tên | **ACL** (Access Control List) | **Capability** |
| Lưu ở | cùng object ("ai được chạm tôi") | cùng chủ thể ("tôi được chạm gì") |
| Trả lời nhanh | "ai truy cập được file này?" | "process này chạm được những gì?" |
| Thu hồi | dễ (sửa ACL) | khó (phải tìm mọi bản sao capability) |
| Ví dụ | quyền file UNIX, POSIX ACL, S3 bucket policy | file descriptor, Linux capability, token OAuth, seL4 |

> **File descriptor chính là một capability** — bạn giữ nó thì bạn dùng được, và quyền được kiểm tra lúc `open`, không phải mỗi lần `read`. Đó là lý do truyền fd qua UNIX socket là kỹ thuật phân quyền mạnh.

## 2. Mô hình UNIX cổ điển
```
-rwxr-xr--  1 alice devs  ...
 ↑ ↑↑↑ ↑↑↑ ↑↑↑
 │ owner group other
```
| Bit | File | **Thư mục** |
|---|---|---|
| `r` | đọc nội dung | **liệt kê tên** trong thư mục |
| `w` | ghi nội dung | **tạo/xoá/đổi tên** entry |
| `x` | thực thi | **đi qua** (traverse) thư mục |

> Điểm hay nhầm: xoá file phụ thuộc quyền `w` trên **thư mục**, không phải trên file. Vì thế cần **sticky bit** (`/tmp` có `drwxrwxrwt`) để chỉ chủ sở hữu mới xoá được file của mình.

| Bit đặc biệt | Nghĩa |
|---|---|
| **setuid** (4000) | chạy với quyền chủ file |
| **setgid** (2000) | chạy với quyền group; trên thư mục: file mới kế thừa group |
| **sticky** (1000) | trên thư mục: chỉ owner xoá được entry của mình |

`umask` quyết định quyền mặc định khi tạo file (`022` → `644` cho file, `755` cho thư mục).

## 3. Vượt khỏi mô hình cổ điển
| Cơ chế | Giải quyết |
|---|---|
| **POSIX ACL** (`setfacl`/`getfacl`) | quyền cho nhiều user/group cụ thể, không chỉ owner/group/other |
| **Linux capabilities** | chia nhỏ quyền root thành ~40 mảnh (`CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`…) → bind cổng 80 mà không cần root |
| **seccomp-bpf** | giới hạn **syscall nào** được gọi → thu hẹp bề mặt tấn công |
| **Namespace + cgroup** | cách ly view tài nguyên → [[Containers]] |
| **MAC**: SELinux, AppArmor | chính sách **bắt buộc** do admin đặt, user không tự nới được |

| Mô hình | Ai quyết định quyền |
|---|---|
| **DAC** (Discretionary) | chủ sở hữu object — mô hình UNIX mặc định |
| **MAC** (Mandatory) | chính sách hệ thống — SELinux, Bell-LaPadula |
| **RBAC** | qua **vai trò**; user gán vai trò, vai trò có quyền |
| **ABAC** | theo thuộc tính (thời gian, vị trí, thiết bị) — mô hình cloud IAM |

## 4. Nguyên tắc vận hành
1. **Least privilege** — mặc định không có quyền gì; cấp từng cái một.
2. **Kiểm tra ở đúng chỗ**: quyền phải được kiểm ở tầng thấp nhất kiểm được (kernel), không phải ở UI.
3. **Complete mediation**: mọi đường vào đều qua kiểm tra. Một API quên kiểm tra là hỏng cả hệ.
4. **Tách vai trò**: người triển khai ≠ người phê duyệt.
5. **Quyền có thời hạn**: dùng quyền tạm thời (`sudo`, assume-role) thay vì quyền vĩnh viễn.

## 5. Cạm bẫy
- **`chmod 777` để "cho nó chạy"** — cách phổ biến nhất để tạo lỗ hổng.
- **Chạy container/dịch vụ bằng root** vì tiện; dùng `CAP_*` hẹp hoặc user thường.
- **`CAP_SYS_ADMIN`** gần như tương đương root — cấp nó không phải là "least privilege".
- **Kiểm tra quyền ở client** — luôn phải kiểm lại ở server/kernel.
- **TOCTOU**: `access()` rồi `open()` → xem [[Files and Directories]].
- **ACL kế thừa hiểu sai** → file mới không có quyền như mong đợi; luôn kiểm tra bằng cách tạo file thật.
- **Quên rằng quyền đọc thư mục cha đủ để lộ tên file** — tên file cũng là thông tin.

## 6. Checklist áp dụng
- [ ] Dịch vụ chạy dưới user nào? Có cần root thật không?
- [ ] Có setuid binary nào không cần thiết không? (`find / -perm -4000 -type f`)
- [ ] `umask` mặc định là gì? File nhạy cảm có quyền `600` không?
- [ ] Có seccomp profile / AppArmor / SELinux đang bật không (không phải `permissive`)?
- [ ] Quyền có được kiểm tra ở **mọi** đường vào API không?
- [ ] Quyền đặc quyền có thời hạn và có audit log không?

## Tham khảo
- OSTEP — *Access Control*: https://pages.cs.wisc.edu/~remzi/OSTEP/security-access.pdf
- Saltzer & Schroeder (1975): https://web.mit.edu/Saltzer/www/publications/protection/
- `capabilities(7)`: https://man7.org/linux/man-pages/man7/capabilities.7.html
- `acl(5)`, `setfacl(1)`: https://man7.org/linux/man-pages/man5/acl.5.html
- SELinux / AppArmor docs: https://docs.kernel.org/admin-guide/LSM/index.html

## Liên kết
[[Authentication]] · [[OS Security Fundamentals]] · [[Files and Directories]] · [[Containers]] · [[OS]]
