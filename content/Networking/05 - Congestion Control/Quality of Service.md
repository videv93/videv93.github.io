---
tags: [networking, congestion, qos]
status: growing
---
# Quality of Service

> QoS **không tạo ra băng thông** — nó chỉ quyết định ai được ưu tiên khi thiếu. Nếu link không bao giờ đầy, QoS vô nghĩa; nếu link luôn đầy, QoS chỉ chọn ai chịu khổ.

## 1. Hai mô hình

| | **IntServ** (RFC 1633) | **DiffServ** (RFC 2475) |
|---|---|---|
| Cách làm | Đặt trước tài nguyên cho **từng luồng** (RSVP) | Phân loại gói vào **vài lớp**, xử lý theo lớp |
| Trạng thái ở router | Per-flow — không mở rộng được | Per-class — mở rộng tốt |
| Thực tế | Gần như không dùng trên Internet | **Chuẩn thực tế** |

**DiffServ code point (DSCP)** — 6 bit trong header IP:
| PHB | DSCP | Dùng cho |
|---|---|---|
| **EF** (Expedited Forwarding) | 46 | Thoại — trễ thấp, ít jitter, có policer |
| **AF41–AF43** | 34, 36, 38 | Video hội nghị |
| **AF21–AF23** | 18, 20, 22 | Dữ liệu quan trọng, giao dịch |
| **CS6/CS7** | 48/56 | Giao thức mạng (routing) |
| **BE** (Default) | 0 | Mọi thứ còn lại |
| **LE** (RFC 8622) | 8 | Nền, backup — chịu hy sinh trước |

## 2. Chuỗi xử lý QoS
1. **Classify** — nhận diện lưu lượng (theo port, DSCP, DPI, ứng dụng).
2. **Mark** — gắn DSCP, càng gần nguồn càng tốt.
3. **Police / Shape** — policer *vứt* gói vượt mức; shaper *xếp hàng* rồi phát đều. Shaper cho lưu lượng TCP, policer cho lưu lượng cần trần cứng.
4. **Queue & Schedule** — xếp vào hàng theo lớp, phục vụ theo WFQ/priority → [[Queuing Disciplines]].
5. **Trust boundary** — chỉ tin DSCP từ thiết bị mình quản lý; ghi đè DSCP của người dùng.

## 3. Cạm bẫy hay gặp
- **Kỳ vọng QoS hoạt động qua Internet công cộng** — ISP hầu như luôn **xoá hoặc bỏ qua DSCP**. QoS chỉ có tác dụng trong mạng mình kiểm soát (LAN, WAN, MPLS) → [[MPLS]].
- **Đánh dấu mọi thứ là ưu tiên cao** → không còn ưu tiên nào.
- **Hàng EF không có policer** → một luồng lỗi có thể bỏ đói tất cả.
- **Bỏ qua LE/scavenger class** — cách đơn giản và hiệu quả nhất thường là *hạ* ưu tiên backup/update, chứ không phải *nâng* ưu tiên thoại.
- **Làm QoS khi vấn đề thật là bufferbloat** — thử `fq_codel` trước, đơn giản hơn nhiều.

## 4. Checklist áp dụng
- [ ] Link có thực sự bão hoà không, hay vấn đề là hàng đợi/độ trễ?
- [ ] Ranh giới tin cậy DSCP nằm ở đâu? Có ghi đè marking từ endpoint không?
- [ ] Lưu lượng nào có thể hạ xuống lớp LE (backup, cập nhật, sync)?
- [ ] Hàng ưu tiên có bị giới hạn phần trăm băng thông không?
- [ ] Đường đi có qua ISP không? Nếu có, marking sẽ bị xoá — kế hoạch B là gì?

## Tham khảo
- Peterson & Davie — 6.5 Quality of Service: https://book.systemsapproach.org/congestion/qos.html
- RFC 2474 / RFC 2475 — *DiffServ*: https://www.rfc-editor.org/rfc/rfc2475
- RFC 4594 — *Configuration Guidelines for DiffServ Service Classes*: https://www.rfc-editor.org/rfc/rfc4594
- RFC 8622 — *A Lower-Effort PHB*: https://www.rfc-editor.org/rfc/rfc8622

## Liên kết
[[Queuing Disciplines]] · [[Resource Allocation]] · [[RTP & Real-Time Transport]] · [[MPLS]] · [[Networking]]
