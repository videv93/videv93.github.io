---
tags: [os, virtualization, memory, policy]
status: evergreen
---
# Page Replacement Policy

> Khi RAM đầy và cần chỗ, **đuổi trang nào?** Đây là bài toán cache thay thế kinh điển — và kiến thức ở đây dùng lại nguyên vẹn cho cache ứng dụng, CDN, buffer pool của database.

## 1. Các chính sách
| Policy | Đuổi trang nào | Ưu | Nhược |
|---|---|---|---|
| **OPT (Belady)** | trang sẽ được dùng **xa nhất trong tương lai** | tối ưu tuyệt đối | không cài đặt được — chỉ dùng làm chuẩn so sánh |
| **FIFO** | vào trước ra trước | cực đơn giản | không xét mức dùng; dính **Belady's anomaly** |
| **Random** | ngẫu nhiên | đơn giản, không có worst case bệnh lý | trung bình kém hơn LRU |
| **LRU** | lâu nhất chưa dùng | bám locality tốt | cài đặt chính xác **quá đắt** (cập nhật mỗi lần truy cập) |
| **LFU** | ít dùng nhất | tốt cho phân bố lệch | trang "hot" cũ khó bị đuổi |
| **Clock (xấp xỉ LRU)** | quét vòng, đuổi trang có bit **A = 0**, gặp A=1 thì xoá về 0 và đi tiếp | rẻ, gần LRU | chỉ xấp xỉ |
| **ARC / 2Q / LIRS** | cân bằng động giữa recency và frequency | chống quét tuần tự | phức tạp hơn |

**Belady's anomaly**: với FIFO, **tăng** số frame lại có thể **tăng** số miss. LRU và các stack algorithm không bị.

## 2. Vì sao Clock thắng trong thực tế
LRU chính xác đòi cập nhật danh sách ở **mỗi lần truy cập bộ nhớ** — bất khả thi ở tốc độ phần cứng. Thay vào đó:
- Phần cứng chỉ cần bit **Accessed** trong PTE (rẻ).
- OS quét vòng định kỳ, dùng bit đó làm tín hiệu "gần đây có dùng".
- Thêm bit **Dirty**: ưu tiên đuổi trang sạch trước (không phải ghi đĩa) → gọi là **enhanced clock**.

Linux dùng biến thể **hai danh sách LRU** (active/inactive) + `refault distance` để phát hiện thrashing của page cache.

## 3. Các workload mẫu và policy phù hợp
| Workload | Hành vi | Policy tốt |
|---|---|---|
| **No-locality** (ngẫu nhiên) | mọi policy như nhau | random cũng được |
| **80/20** | 80% truy cập vào 20% trang | LRU thắng rõ |
| **Looping sequential** (quét vòng N+1 trang) | LRU và FIFO đạt **0% hit** — luôn đuổi đúng trang sắp cần | random/ARC tốt hơn nhiều |

> Bài học chuyển được sang ứng dụng: **một lần quét toàn bảng (full table scan) có thể xoá sạch cache đang nóng.** Đó là lý do PostgreSQL dùng ring buffer cho seq scan và các DB dùng ARC-like.

## 4. Vấn đề liên quan
- **Prefetching**: đoán trang kế tiếp và nạp trước — hiệu quả cao với truy cập tuần tự (`madvise(MADV_SEQUENTIAL)`, readahead).
- **Clustering/grouping ghi**: gom nhiều trang dirty ghi một lần để tối ưu đĩa.
- **Working set model**: kích thước tập trang được dùng trong cửa sổ thời gian gần đây. Nếu tổng working set > RAM → thrashing dù policy nào → xem [[Swapping]].

## 5. Cạm bẫy
- **Đo hit rate mà không đo loại workload.** Con số hit rate vô nghĩa nếu không biết pattern.
- **Dùng LRU cho cache ứng dụng có quét tuần tự** — bị xoá sạch. Cần bảo vệ (segmented LRU, ARC, hoặc đường riêng cho scan).
- **Cho rằng cache lớn hơn luôn tốt hơn** — Belady's anomaly với FIFO; và cache lớn tốn RAM lẽ ra dùng cho việc khác.
- **Bỏ qua cost khác nhau giữa các miss.** Trang sạch bị đuổi rẻ hơn trang dirty; policy tốt phải tính chi phí, không chỉ tần suất.

## 6. Checklist áp dụng
- [ ] Workload của tôi thuộc loại nào: locality cao, ngẫu nhiên, hay quét vòng?
- [ ] Cache của tôi có bị một job batch/scan xoá sạch không?
- [ ] Có tách được cache thành phần "bảo vệ" (hot) và phần "thử nghiệm" (probation) không?
- [ ] Hit rate hiện tại bao nhiêu? So với OPT mô phỏng thì cách bao xa?
- [ ] Chi phí một miss có đồng nhất không, hay có loại miss đắt hơn nhiều?

## Tham khảo
- OSTEP ch.22 *Beyond Physical Memory: Policies*: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf
- OSTEP homework `paging-policy.py`: https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-policy
- Megiddo & Modha — *ARC: A Self-Tuning, Low Overhead Replacement Cache* (FAST '03): https://www.usenix.org/legacy/events/fast03/tech/full_papers/megiddo/megiddo.pdf
- Denning — *The Working Set Model for Program Behavior*: https://dl.acm.org/doi/10.1145/363095.363141
- Linux — multi-generational LRU: https://docs.kernel.org/admin-guide/mm/multigen_lru.html

## Liên kết
[[Swapping]] · [[Paging]] · [[File System Implementation]] · [[Flash-based SSD]] · [[OS]]
