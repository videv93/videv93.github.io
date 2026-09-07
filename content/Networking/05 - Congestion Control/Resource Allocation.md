---
tags: [networking, congestion]
status: growing
---
# Resource Allocation

> Congestion không phải lỗi — nó là **hệ quả tất yếu của statistical multiplexing**. Câu hỏi thiết kế là: ai quyết định giảm tốc, dựa trên tín hiệu gì, và chia phần thế nào cho công bằng.

## 1. Phân loại cách tiếp cận

| Trục | Hai thái cực |
|---|---|
| **Router-centric vs Host-centric** | Router chủ động (AQM, fair queuing) vs host tự suy đoán (TCP) |
| **Reservation vs Feedback** | Đặt trước băng thông (RSVP, circuit) vs phản ứng theo tín hiệu |
| **Window-based vs Rate-based** | Giới hạn số byte in-flight (TCP) vs giới hạn byte/giây (BBR, media) |
| **Tín hiệu tường minh vs ngầm** | ECN đánh dấu rõ ràng vs suy ra từ mất gói / tăng RTT |

Internet chọn: **host-centric + feedback + window-based + tín hiệu ngầm** — vì router phải đơn giản và không giữ trạng thái → [[Network Fundamentals]].

## 2. Định nghĩa "công bằng"
1. **Max-min fairness**: tăng phần của luồng nhỏ nhất tới mức không thể tăng thêm mà không giảm luồng khác. Là chuẩn lý thuyết.
2. **Chỉ số công bằng Jain**: `(Σxᵢ)² / (n·Σxᵢ²)`, bằng 1 khi hoàn toàn công bằng.
3. **TCP-friendliness**: một luồng mới không được chiếm nhiều hơn TCP trong cùng điều kiện. Đây là giao ước ngầm giữ Internet không sập.
4. **Công bằng theo luồng ≠ công bằng theo người dùng**: mở 10 kết nối thì được 10 phần. Đây là lý do trình duyệt từng mở 6 kết nối/host, và là lý do fair queuing theo host tồn tại.

## 3. Đánh giá một sơ đồ điều khiển
| Tiêu chí | Câu hỏi |
|---|---|
| Hiệu quả | Có dùng hết băng thông không? |
| Công bằng | Các luồng có chia đều không? |
| Ổn định | Có dao động/oscillation không? |
| Hội tụ | Bao lâu thì tới trạng thái ổn định? |
| Độ trễ hàng đợi | Có làm đầy buffer không? (bufferbloat) |

## 4. Cạm bẫy hay gặp
- **Nhầm flow control với congestion control**: flow control bảo vệ **bên nhận** (rwnd), congestion control bảo vệ **mạng** (cwnd) → [[TCP]].
- **Tăng buffer để "chống mất gói"** → chỉ biến mất gói thành độ trễ khổng lồ. Bufferbloat.
- **Mở nhiều kết nối để giành băng thông** — có lợi cục bộ, hại tập thể, và bị fair queuing vô hiệu.
- **Bỏ qua congestion control khi tự viết giao thức trên UDP** — vi phạm RFC 8085 và có thể làm sập mạng của chính mình.

## 5. Checklist áp dụng
- [ ] Ứng dụng có tự giới hạn tốc độ gửi không, hay dựa hoàn toàn vào transport?
- [ ] Tín hiệu tắc nghẽn đang dùng là gì: mất gói, RTT, hay ECN?
- [ ] Có luồng nào (backup, sync) đang bóp nghẹt luồng tương tác không?
- [ ] Đã đo độ trễ hàng đợi khi tải cao chưa, hay chỉ đo throughput?

## Tham khảo
- Peterson & Davie — 6.1 Issues in Resource Allocation: https://book.systemsapproach.org/congestion/issues.html
- Jain, Chiu, Hawe — *A Quantitative Measure of Fairness*: https://www.cse.wustl.edu/~jain/papers/ftp/fairness.pdf
- RFC 2914 — *Congestion Control Principles*: https://www.rfc-editor.org/rfc/rfc2914

## Liên kết
[[Queuing Disciplines]] · [[TCP Congestion Control]] · [[Quality of Service]] · [[Networking]]
