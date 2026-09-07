---
tags: [networking, congestion]
status: growing
---
# Advanced Congestion Control

> Ba hướng vượt qua giới hạn của "đợi mất gói rồi mới giảm": **báo tắc nghẽn sớm (ECN), quản lý hàng đợi chủ động (AQM), và mô hình hoá đường truyền (BBR)**.

## 1. ECN — báo tắc nghẽn không cần drop
- Dùng 2 bit trong header IP: `00` không hỗ trợ, `10`/`01` hỗ trợ (ECT), **`11` = Congestion Experienced**.
- Router **đánh dấu** thay vì vứt gói; bên nhận phản hồi bằng cờ `ECE` trong TCP; bên gửi giảm cwnd như thể mất gói.
- Lợi: giữ được dữ liệu, giảm độ trễ, tránh timeout.
- **L4S** (RFC 9330, 2023) là thế hệ mới: hàng đợi riêng cho lưu lượng "scalable", ECN chi tiết hơn → hướng tới độ trễ rất thấp trên mạng công cộng.

## 2. AQM — quản lý hàng đợi chủ động
Xem chi tiết ở [[Queuing Disciplines]]. Điểm cốt lõi: **CoDel nhắm vào thời gian nằm trong hàng (target ~5 ms), không nhắm vào số gói** → không cần chỉnh tham số theo băng thông.

## 3. BBR — mô hình hoá thay vì phản ứng
1. Ước lượng liên tục **BtlBw** (băng thông nút thắt) và **RTprop** (RTT tối thiểu).
2. Đặt tốc độ gửi ≈ BtlBw và lượng in-flight ≈ BDP → **giữ hàng đợi gần rỗng**.
3. Định kỳ thăm dò: tăng tốc 25% để tìm băng thông mới (ProbeBW), và giảm để đo lại RTT tối thiểu (ProbeRTT).
4. **Không coi mất gói là tín hiệu tắc nghẽn** → chạy tốt trên đường có nhiễu.

| | Loss-based (CUBIC) | Model-based (BBR) |
|---|---|---|
| Làm đầy buffer | Có | Không |
| Trên link có mất gói ngẫu nhiên | Kém | Tốt |
| Công bằng với luồng khác | Đã kiểm chứng lâu | v1 có vấn đề, v2/v3 cải thiện |

## 4. Kiểm soát tắc nghẽn ở tầng ứng dụng
Không phải mọi thứ giải quyết được ở transport:
- **Rate limiting / token bucket** ở API gateway
- **Load shedding**: từ chối sớm khi quá tải, tốt hơn là làm chậm tất cả
- **Circuit breaker + backpressure** trong chuỗi microservice → [[RPC & gRPC]]
- **Adaptive concurrency limit** (thuật toán kiểu Vegas áp dụng cho số request in-flight)

## 5. Cạm bẫy hay gặp
- **Bật ECN một chiều**: cần cả hai đầu và đường đi hỗ trợ; một số middlebox cũ drop gói có ECT. Linux mặc định `tcp_ecn=2` (chấp nhận nếu được yêu cầu, không chủ động yêu cầu) chính vì lý do này.
- **Đổi thuật toán congestion control như một "tối ưu miễn phí"** — phải đo trên chính profile mạng của người dùng.
- **Chỉ tối ưu transport mà bỏ qua tầng ứng dụng**: retry storm ở tầng trên phá huỷ mọi nỗ lực ở tầng dưới.
- **Không đo độ trễ hàng đợi** — throughput đẹp mà p99 latency thảm hại là thất bại.

## 6. Checklist áp dụng
- [ ] Đã đo baseline (throughput + p99 RTT khi tải) trước khi đổi gì chưa?
- [ ] ECN có được hỗ trợ end-to-end không? Có gói nào bị drop vì ECT không?
- [ ] Gateway đã bật fq_codel/cake chưa?
- [ ] Hệ thống có load shedding khi quá tải, hay chỉ xếp hàng vô hạn?
- [ ] Giới hạn concurrency có thích nghi theo độ trễ quan sát được không?

## Tham khảo
- Peterson & Davie — 6.4 Advanced Congestion Control: https://book.systemsapproach.org/congestion/avoidance.html
- RFC 3168 — *The Addition of ECN to IP*: https://www.rfc-editor.org/rfc/rfc3168
- RFC 9330 — *Low Latency, Low Loss, Scalable Throughput (L4S)*: https://www.rfc-editor.org/rfc/rfc9330
- Netflix — *Performance under load* (adaptive concurrency): https://netflixtechblog.medium.com/performance-under-load-3e6fa9a60581

## Liên kết
[[TCP Congestion Control]] · [[Queuing Disciplines]] · [[Quality of Service]] · [[Networking]]
