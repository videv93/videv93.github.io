---
tags: [networking, scaling, ip]
status: growing
---
# NAT

> Bản vá kéo dài tuổi thọ IPv4 thêm 25 năm — và cũng là thứ **phá vỡ mô hình end-to-end**, khiến P2P, VoIP và mọi kết nối đi vào trở nên phức tạp.

## 1. Các kiểu NAT

| Kiểu | Cách làm | Dùng khi |
|---|---|---|
| **Static NAT (1:1)** | Một IP riêng ↔ một IP công cộng cố định | Server cần địa chỉ ổn định |
| **Dynamic NAT** | Cấp từ pool | Hiếm dùng |
| **PAT / NAPT (masquerade)** | Nhiều host chung 1 IP, phân biệt bằng **port** | Mặc định ở mọi router gia đình, NAT Gateway cloud |
| **CGNAT** | ISP NAT hàng nghìn thuê bao (dải `100.64.0.0/10`) | Mạng di động, ISP thiếu IPv4 |
| **Hairpin / NAT loopback** | Truy cập IP công cộng của chính mình từ bên trong | Hay thiếu → "trong nhà không vào được web nhà" |

**Hành vi NAT (RFC 4787)**: full-cone / restricted / port-restricted / **symmetric**. Symmetric NAT là loại khó xuyên nhất — STUN không đủ, phải dùng TURN relay.

## 2. Nguyên tắc
1. **NAT là stateful.** Mỗi flow chiếm một entry trong bảng, có timeout (TCP thường 5 phút–24 giờ, **UDP chỉ ~30–120 giây**).
2. **Kết nối đi vào không tồn tại** trừ khi có port forwarding, UPnP, hoặc hole punching.
3. **NAT traversal**: **STUN** (biết IP/port công cộng của mình) → **TURN** (relay khi không xuyên được) → **ICE** (thử mọi ứng viên, chọn cái chạy). Đây là nền của WebRTC.
4. **NAT không phải firewall.** Nó chặn inbound như tác dụng phụ, không phải như chính sách. Vẫn cần firewall thật → [[Firewall & Filtering]].
5. **IPv6 làm NAT không cần thiết** — đó là lý do chính để triển khai → [[IPv6]].

## 3. Cạm bẫy hay gặp
- **Kết nối idle bị NAT drop im lặng** → client tưởng còn sống, gửi vào hư không rồi timeout. Chữa bằng **TCP keepalive < timeout của NAT** (thường đặt 60 s) hoặc heartbeat ở tầng ứng dụng → [[WebSocket & SSE]].
- **Cạn port**: một IP công cộng có ~64k port; NAT Gateway cloud giới hạn ~55k kết nối **tới cùng một đích**. Triệu chứng: lỗi kết nối rải rác khi tải cao.
- **Ghi log IP nguồn sau NAT/LB** → mọi request trông như đến từ một IP. Cần `X-Forwarded-For` hoặc PROXY protocol.
- **Rate limit theo IP sau CGNAT** → chặn oan cả nghìn người dùng di động.
- **Hairpin không hoạt động** → dịch vụ nội bộ không tự gọi được qua tên miền công cộng. Dùng split-horizon DNS.

## 4. Checklist áp dụng
- [ ] Timeout NAT trên đường đi là bao nhiêu? Keepalive của app có ngắn hơn không?
- [ ] Có nguy cơ cạn port ở NAT Gateway không? (đo `ErrorPortAllocation` / conntrack usage)
- [ ] IP thật của client được lấy từ đâu? Header đó có được tin cậy đúng cách không?
- [ ] Rate limit có tính đến CGNAT không?
- [ ] Đã có kế hoạch IPv6 để bớt phụ thuộc NAT chưa?

## Tham khảo
- RFC 3022 — *Traditional IP Network Address Translator*: https://www.rfc-editor.org/rfc/rfc3022
- RFC 4787 — *NAT Behavioral Requirements for UDP*: https://www.rfc-editor.org/rfc/rfc4787
- RFC 8445 — *ICE*: https://www.rfc-editor.org/rfc/rfc8445
- Tailscale — *How NAT traversal works*: https://tailscale.com/blog/how-nat-traversal-works

## Liên kết
[[IP Addressing & Subnetting]] · [[IPv6]] · [[Firewall & Filtering]] · [[Access Networks]] · [[Networking]]
