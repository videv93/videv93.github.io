---
tags: [os, distributed, filesystem]
status: evergreen
---
# Network File System

> NFS (Sun, 1985) là bài học kinh điển về **thiết kế để phục hồi đơn giản**: server **stateless**, mọi request tự chứa đủ thông tin, nên client chỉ cần **retry mãi** là xong. Đơn giản đến mức thô bạo — và hiệu quả.

## 1. Nguyên tắc trung tâm: stateless server
Server **không nhớ gì** về client giữa các request. Không có "file đang mở", không có con trỏ vị trí.

Mỗi request mang theo **file handle** = `(volume ID, inode number, generation number)`:
| Thành phần | Vai trò |
|---|---|
| volume ID | filesystem nào |
| inode number | file nào |
| **generation number** | tăng mỗi lần inode được tái sử dụng → chặn client cũ chạm nhầm file mới |

Client giữ offset ở phía mình → mọi thao tác dùng **offset tuyệt đối** → **idempotent** → retry vô hại.

## 2. Vì sao stateless là quyết định đúng
| Tình huống | Hệ có state | NFS stateless |
|---|---|---|
| Server crash và khởi động lại | phải phục hồi bảng trạng thái, phải biết client nào còn sống | **không cần làm gì** |
| Client crash | server rò rỉ state | không có state để rò rỉ |
| Mạng đứt tạm thời | phải xử lý phiên hỏng | client retry, mọi thứ tiếp tục |

Từ góc nhìn client, server chậm và server chết **trông giống hệt nhau** — và cách xử lý cũng giống nhau: **cứ thử lại**. Đây là lý do process kẹt ở trạng thái `D` (uninterruptible) khi NFS server chết.

## 3. Caching và bài toán nhất quán
Client cache block để tăng tốc → sinh hai vấn đề:
| Vấn đề | Nghĩa | Cách NFS xử lý |
|---|---|---|
| **Update visibility** | Khi nào client B thấy thay đổi của A? | **Flush-on-close**: A ghi hết xuống server khi `close()` |
| **Stale cache** | Cache của B đã cũ | B **`GETATTR`** kiểm tra mtime trước khi dùng cache; kết quả GETATTR cũng được cache có thời hạn (attribute cache, thường 3–60s) |

→ NFS cho **close-to-open consistency**: mở file sau khi bên kia đóng thì thấy dữ liệu mới. **Không** đảm bảo gì trong lúc cả hai đang mở.

Attribute cache tạo ra flood GETATTR khét tiếng — đây là lý do NFS chậm với workload nhiều file nhỏ (`git status`, `node_modules`).

## 4. Server-side write và độ bền
Server **phải ghi xuống đĩa bền** trước khi trả lời `WRITE` — nếu không, client tưởng đã ghi mà server crash thì mất dữ liệu vĩnh viễn (client đã bỏ dữ liệu khỏi buffer).
→ Ghi qua NFS chậm hơn ghi local. Cách tăng tốc trong thực tế: **NVRAM có pin** ở server, hoặc NFSv3 `COMMIT` (ghi bất đồng bộ rồi commit theo lô).

## 5. NFSv4 — đổi hướng
NFSv4 **có state** (có `OPEN`/`CLOSE` thật, delegation, lock) → hiệu năng và ngữ nghĩa tốt hơn, nhưng phục hồi phức tạp hơn nhiều. Thêm: compound RPC (gộp nhiều thao tác), bảo mật tích hợp (Kerberos), hoạt động tốt qua firewall (một cổng 2049).

## 6. Cạm bẫy
- **Chạy build/`git`/`node_modules` trên NFS** — hàng nghìn `stat` mỗi lệnh, chậm khủng khiếp.
- **Mount `soft` để tránh treo** → I/O có thể trả về lỗi giữa chừng và **hỏng dữ liệu**. `hard` treo nhưng an toàn; thêm `intr` (v3) để ngắt được.
- **Dùng NFS làm khoá phân tán** — locking qua NFS lịch sử rất mong manh; dùng dịch vụ khoá thật.
- **Giả định nhất quán mạnh** — hai client ghi cùng file cùng lúc là hành vi không xác định.
- **Attribute cache dài** → thấy dữ liệu cũ; `noac` khắc phục nhưng chậm thảm hại.

## 7. Checklist áp dụng
- [ ] Mount option đang dùng là gì? (`hard`/`soft`, `actimeo`, `rsize/wsize`) — `mount | grep nfs`
- [ ] Workload có nhiều file nhỏ / nhiều `stat` không? Nếu có, NFS có phải lựa chọn đúng?
- [ ] Ứng dụng có dựa vào khoá qua NFS không?
- [ ] Server có NVRAM/BBU cho ghi đồng bộ không?
- [ ] Đã đo bằng `nfsstat -c` xem loại RPC nào chiếm đa số chưa?

## Tham khảo
- OSTEP ch.49 *Sun's Network File System (NFS)*: https://pages.cs.wisc.edu/~remzi/OSTEP/dist-nfs.pdf
- Sandberg et al. — *Design and Implementation of the Sun Network Filesystem* (1985): https://people.eecs.berkeley.edu/~brewer/cs262/nfs.pdf
- `nfs(5)` — mount options: https://man7.org/linux/man-pages/man5/nfs.5.html
- RFC 7530 — NFSv4: https://datatracker.ietf.org/doc/html/rfc7530

## Liên kết
[[Distributed Systems]] · [[Andrew File System]] · [[Files and Directories]] · [[OS]]
