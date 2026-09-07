---
tags: [os, distributed, filesystem]
status: evergreen
---
# Andrew File System

> AFS (CMU) đặt câu hỏi khác [[Network File System]]: không phải "làm sao phục hồi đơn giản" mà **"làm sao phục vụ hàng nghìn client bằng một server"**. Câu trả lời: **cache cả file trên đĩa local + server chủ động thông báo khi dữ liệu đổi**.

## 1. Hai quyết định thiết kế cốt lõi
| Quyết định | Nội dung | Hệ quả |
|---|---|---|
| **Whole-file caching trên đĩa local** | `open()` kéo **toàn bộ** file về đĩa client; mọi `read`/`write` diễn ra **local**; `close()` đẩy về server nếu có sửa | Truy cập lặp lại gần như miễn phí; server chỉ chạm vào lúc open/close |
| **Callback** | Server **hứa** sẽ báo cho client khi file bị sửa bởi người khác | Client dùng cache **không cần hỏi lại** — khác hẳn GETATTR liên tục của NFS |

→ Đảo ngược mô hình: từ **client hỏi** (polling) sang **server báo** (invalidation). Cùng ý tưởng với cache invalidation trong CDN và trong cache coherence của CPU.

## 2. AFSv1 → AFSv2: bài học đo lường
AFSv1 chậm vì: quá nhiều `TestAuth` (kiểm tra cache cũ chưa), server tốn CPU cho việc đi bộ đường dẫn (path traversal), và một process server cho mỗi client.

Cải tiến của v2:
| Vấn đề v1 | Giải pháp v2 |
|---|---|
| Client hỏi liên tục | **Callback** |
| Server đi bộ đường dẫn theo tên | **FID** (Volume ID, File ID, Uniquifier) — client tự đi bộ, cache từng thành phần |
| Một process/client | thread |

> **Bài học phương pháp**: họ **đo hệ thống thật với workload thật** rồi mới thiết kế lại. "Measure, don't guess" — đây có lẽ là giá trị lớn nhất của chương này.

## 3. Ngữ nghĩa nhất quán
- **Last writer wins** ở mức **file** (không phải block như NFS): ai `close()` sau cùng thì bản của người đó thắng — toàn bộ file.
- Client đang mở file thì tiếp tục thấy bản cũ cho tới khi mở lại.
- Khác NFS: nhất quán ở đây **dễ suy luận hơn** (đơn vị là cả file), nhưng thô hơn.
- **Crash recovery phức tạp hơn**: client crash → phải kiểm tra lại toàn bộ cache khi khởi động (callback có thể đã bị bỏ lỡ); server crash → **mất toàn bộ callback**, mọi client phải coi cache là nghi ngờ.

## 4. AFS vs NFS
| | AFS | NFS (v3) |
|---|---|---|
| Đơn vị cache | **cả file**, trên **đĩa** | block, trong **RAM** |
| Nhất quán | callback (server đẩy) | GETATTR polling (client kéo) |
| Server state | **có** (danh sách callback) | không |
| Mở rộng | rất tốt (server nhàn) | kém hơn |
| Phục hồi | phức tạp | rất đơn giản |
| File **lớn hơn đĩa client** | ❌ vấn đề thật | ✅ ổn |
| Sửa vài byte trong file 1GB | ❌ phải kéo cả file | ✅ chỉ block liên quan |
| Không gian tên | **toàn cục, đồng nhất** cho mọi client | mount tuỳ từng máy |

## 5. Di sản
- Ý tưởng whole-file caching + callback sống trong **Dropbox, Google Drive, OneDrive, Git LFS** — đồng bộ cả file, thông báo khi đổi.
- **Volume** của AFS (đơn vị quản lý, di chuyển được, có quota, có snapshot read-only) là tiền thân của volume trong hệ lưu trữ hiện đại.
- Bảo mật tích hợp **Kerberos** và **ACL theo thư mục** (thay vì bit quyền UNIX) → xem [[Access Control]].
- Coda (hậu duệ của AFS) mang thêm **disconnected operation** — nền tảng của offline-first sync ngày nay.

## 6. Cạm bẫy
- **Whole-file caching sụp với file rất lớn** — mở file 50GB để đọc 1KB là thảm hoạ.
- **Callback yêu cầu server nhớ client** → server crash gây bão kiểm tra lại.
- **Last-writer-wins ở mức file** làm mất dữ liệu khi hai người sửa hai phần khác nhau của cùng file — chính xác vấn đề bạn gặp với Dropbox.
- **Không hợp với workload database** (ghi ngẫu nhiên nhỏ vào file lớn).

## 7. Checklist áp dụng
- [ ] Khi thiết kế cache: nên **kéo** (poll) hay **đẩy** (invalidate)? Số client bao nhiêu?
- [ ] Đơn vị cache nên là gì — cả object hay từng phần?
- [ ] Khi server mất trạng thái invalidation, client làm gì?
- [ ] Ngữ nghĩa xung đột là gì: last-writer-wins, merge, hay từ chối?
- [ ] Tôi đã **đo** workload thật trước khi thiết kế lại chưa?

## Tham khảo
- OSTEP ch.50 *The Andrew File System (AFS)*: https://pages.cs.wisc.edu/~remzi/OSTEP/dist-afs.pdf
- Howard et al. — *Scale and Performance in a Distributed File System* (TOCS 1988): https://dl.acm.org/doi/10.1145/35037.35059
- Satyanarayanan — *Coda: disconnected operation*: https://www.cs.cmu.edu/~coda/docdir/scg99.pdf
- OpenAFS: https://www.openafs.org/

## Liên kết
[[Distributed Systems]] · [[Network File System]] · [[Access Control]] · [[OS]]
