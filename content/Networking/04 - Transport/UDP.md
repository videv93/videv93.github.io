---
tags: [networking, transport]
status: growing
---
# UDP

> Chỉ thêm **port và checksum** vào IP. Giá trị của UDP không nằm ở cái nó làm, mà ở **cái nó không làm** — không bắt tay, không sắp thứ tự, không điều khiển tắc nghẽn — để ứng dụng tự quyết định.

## 1. Header (8B — toàn bộ giao thức)

| Trường | Kích thước | Ghi chú |
|---|---|---|
| Source Port | 2B | có thể là 0 (không cần trả lời) |
| Dest Port | 2B | dùng để demultiplex tới tiến trình |
| Length | 2B | header + data |
| Checksum | 2B | tuỳ chọn trên IPv4 (0 = không kiểm), **bắt buộc trên IPv6** |

So sánh: TCP header 20B+ và cần 1 RTT để bắt tay. UDP: 8B, 0 RTT.

## 2. Khi nào chọn UDP
1. **Trễ quan trọng hơn độ tin cậy**: voice, video call, game — dữ liệu cũ thì vô dụng, truyền lại còn hại → [[RTP & Real-Time Transport]].
2. **Request-response ngắn một gói**: DNS, NTP, SNMP, syslog — bắt tay TCP đắt hơn cả nội dung.
3. **Multicast/broadcast**: TCP không hỗ trợ → [[Multicast]].
4. **Tự xây transport riêng**: QUIC, WireGuard, DNS-over-QUIC — dùng UDP làm nền vì **kernel và middlebox không cản** → [[QUIC]].
5. **Rất nhiều client, không muốn giữ trạng thái**: mỗi kết nối TCP tốn bộ nhớ kernel.

## 3. Trách nhiệm mà ứng dụng phải tự gánh
- **Tin cậy**: seq + ACK + retransmit nếu cần → [[Reliable Transmission]]
- **Thứ tự**: tự đánh số và sắp lại
- **Điều khiển tắc nghẽn**: **bắt buộc** phải có, nếu không là gây hại cho mạng (RFC 8085)
- **Kích thước gói**: giữ dưới PMTU, thường ≤1200B để an toàn
- **Bảo mật**: DTLS hoặc tự mã hoá

## 4. Cạm bẫy hay gặp
- **Gói UDP lớn hơn MTU bị phân mảnh** → mất một mảnh là mất cả gói. Đây là lý do DNS-over-UDP giới hạn 512B (và EDNS0 khuyến nghị ≤1232B).
- **Không có backpressure**: gửi nhanh hơn khả năng nhận → gói bị drop ở buffer socket im lặng. Kiểm tra `netstat -su` (RcvbufErrors).
- **UDP amplification**: kẻ tấn công giả IP nguồn, dịch vụ trả lời gói lớn tới nạn nhân (DNS, NTP, memcached). **Không bao giờ mở dịch vụ UDP khuếch đại ra Internet** → [[Threat Model & Attacks]].
- **NAT timeout của UDP rất ngắn** (~30 s) → cần keepalive → [[NAT]].
- **Nghĩ UDP "nhanh hơn TCP"** — cùng đường truyền thì tốc độ như nhau; UDP chỉ bỏ được độ trễ bắt tay và độ trễ do truyền lại.

## 5. Checklist áp dụng
- [ ] Payload có luôn ≤ ~1200B để tránh phân mảnh không?
- [ ] Đã có cơ chế điều khiển tốc độ gửi chưa? (RFC 8085 bắt buộc)
- [ ] Buffer socket (`SO_RCVBUF`) có đủ lớn? Có đo drop không?
- [ ] Dịch vụ UDP công khai có nguy cơ amplification không? Có rate limit và chống spoofing (BCP 38) không?
- [ ] Có keepalive để giữ mapping NAT không?

## Tham khảo
- Peterson & Davie — 5.1 Simple Demultiplexor (UDP): https://book.systemsapproach.org/e2e/udp.html
- RFC 768 — *User Datagram Protocol*: https://www.rfc-editor.org/rfc/rfc768
- RFC 8085 — *UDP Usage Guidelines*: https://www.rfc-editor.org/rfc/rfc8085
- RFC 2827 / BCP 38 — *Network Ingress Filtering*: https://www.rfc-editor.org/rfc/rfc2827

## Liên kết
[[TCP]] · [[QUIC]] · [[RTP & Real-Time Transport]] · [[DNS]] · [[Networking]]
