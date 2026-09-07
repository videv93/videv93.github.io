---
tags: [database, distributed, principle]
status: evergreen
---
# BASE & Eventual Consistency

> Mô hình đối trọng của [[ACID Properties]], **phổ biến ở NoSQL**: `Basically Available` (Sẵn sàng cơ bản), `Soft-state` (Trạng thái linh hoạt), `Eventual Consistency` (Nhất quán cuối cùng — chấp nhận độ trễ đồng bộ).

## 1. Ba chữ
| Chữ | Nghĩa | Hệ quả thực tế |
|---|---|---|
| **B**asically **A**vailable | Hệ thống luôn phản hồi, kể cả khi một phần đang lỗi | Có thể trả dữ liệu cũ hoặc một phần thay vì lỗi |
| **S**oft-state | Trạng thái có thể tự đổi mà không có ghi mới (do đồng bộ nền) | Đọc hai lần liên tiếp có thể ra hai kết quả |
| **E**ventual consistency | Nếu ngừng ghi, cuối cùng mọi replica hội tụ | "Cuối cùng" là bao lâu — **phải đo, không được đoán** |

## 2. Các mức nhất quán yếu — biết tên để yêu cầu đúng thứ
| Mức | Bảo đảm | Ví dụ vi phạm nếu thiếu |
|---|---|---|
| **Read-your-writes** | Chính bạn luôn thấy cái mình vừa ghi | Sửa avatar xong, reload thấy ảnh cũ |
| **Monotonic reads** | Không bao giờ "lùi về quá khứ" | F5 hai lần: thấy comment, rồi lại không thấy |
| **Monotonic writes** | Các ghi của cùng một client giữ đúng thứ tự | Sửa A rồi sửa B, kết quả cuối lại là A |
| **Consistent prefix** | Không thấy hệ quả trước nguyên nhân | Thấy câu trả lời trước câu hỏi |
| **Causal** | Quan hệ nhân quả được bảo toàn | Mạnh nhất trong nhóm "yếu" |

## 3. Kỹ thuật sống chung với eventual consistency
| Kỹ thuật | Mô tả |
|---|---|
| **Sticky session / read-from-primary** | Sau khi ghi, đọc từ primary trong X giây |
| **Version token (LSN/timestamp)** | Client gửi kèm vị trí ghi; replica chờ tới đó mới trả lời |
| **Quorum R + W > N** | Đảm bảo tập đọc và tập ghi giao nhau |
| **Optimistic UI** | Hiển thị kết quả ngay ở client, hoà giải sau |
| **Idempotency** | Retry an toàn → [[Distributed Transactions]] |
| **CRDT** | Cấu trúc dữ liệu **tự hội tụ** không cần hoà giải (counter, set, text) |

## 4. Hoà giải xung đột — phải chọn một
| Chiến lược | Ưu | Nhược |
|---|---|---|
| **Last Write Wins (LWW)** | Đơn giản nhất | **Mất dữ liệu âm thầm**; phụ thuộc đồng hồ máy chủ |
| **Vector clock / version vector** | Phát hiện được xung đột thật | Ứng dụng phải tự giải quyết |
| **CRDT** | Tự hội tụ, không mất dữ liệu | Chỉ áp dụng cho một số kiểu dữ liệu |
| **Giữ cả hai (siblings)** | Không mất gì | Đẩy quyết định cho người dùng |
| **Merge theo nghiệp vụ** | Đúng nhất | Phải viết code riêng cho từng loại |

> LWW là mặc định của rất nhiều hệ — và cũng là nguyên nhân mất dữ liệu âm thầm phổ biến nhất. Biết mình đang dùng nó là điều tối thiểu.

## 5. Cạm bẫy hay gặp
1. **Cho rằng "eventual" là vài ms.** Đo replication lag thật, đặt alert.
2. **Dùng LWW cho dữ liệu quan trọng** mà không biết mình đang dùng.
3. **Đọc từ replica ngay sau khi ghi** rồi báo lỗi "dữ liệu không lưu". → [[Replication]]
4. **Nghĩ BASE là "lười biếng version của ACID".** Nó là một mô hình có kỷ luật riêng — và đòi hỏi **nhiều** suy nghĩ hơn ở tầng ứng dụng, không ít hơn.
5. **Trộn hai mô hình mà không ghi rõ ranh giới.** Đơn hàng ACID, lượt xem BASE — phải viết ra dữ liệu nào theo mô hình nào.
6. **Dựa vào đồng hồ máy chủ** để sắp thứ tự — clock skew là có thật; dùng logical clock.
7. **Không có công cụ đối soát.** Hệ eventual **cần** job so sánh replica và báo lệch.

## 6. Checklist áp dụng
- [ ] Với mỗi loại dữ liệu: mức nhất quán tối thiểu chấp nhận được là gì?
- [ ] Người dùng có cần read-your-writes ở luồng nào không?
- [ ] Replication lag hiện tại là bao nhiêu (p50/p99), và có alert chưa?
- [ ] Chiến lược hoà giải xung đột là gì — có phải LWW không, và team có biết không?
- [ ] Có job đối soát dữ liệu giữa các replica/hệ thống không?
- [ ] UI có xử lý được trạng thái "đang đồng bộ" không?
- [ ] Mọi thao tác ghi có idempotency key chưa?

## Tham khảo
- Pritchett — *BASE: An Acid Alternative* (ACM Queue): https://queue.acm.org/detail.cfm?id=1394128
- Werner Vogels — *Eventually Consistent*: https://www.allthingsdistributed.com/2008/12/eventually_consistent.html
- Kleppmann — *DDIA*, ch.5 "Replication": https://dataintensive.net/
- Jepsen — *Consistency Models*: https://jepsen.io/consistency
- Shapiro et al. — *Conflict-free Replicated Data Types*: https://inria.hal.science/inria-00609399/document

## Liên kết
[[CAP Theorem]] · [[ACID Properties]] · [[Replication]] · [[Column-Family Store]] · [[Database]]
