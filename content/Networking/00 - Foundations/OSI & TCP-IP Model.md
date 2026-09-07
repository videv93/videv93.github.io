---
tags: [networking, foundation, model]
status: growing
---
# OSI & TCP-IP Model

> Hai mô hình phân tầng: **OSI 7 tầng để nói chuyện**, **TCP/IP 4–5 tầng để thực sự chạy**. Biết cả hai vì đồng nghiệp nói "tầng 7" nhưng code thì chạy trên TCP/IP.

## 1. Đối chiếu hai mô hình

| OSI | TCP/IP | Đơn vị dữ liệu | Ví dụ thật | Thiết bị |
|---|---|---|---|---|
| 7 Application | Application | message | HTTP, DNS, SMTP | proxy, LB L7 |
| 6 Presentation | Application | — | TLS, mã hoá, serialization | — |
| 5 Session | Application | — | (gần như không tồn tại riêng) | — |
| 4 Transport | Transport | segment / datagram | TCP, UDP, QUIC | LB L4, firewall stateful |
| 3 Network | Internet | packet | IP, ICMP, BGP | router |
| 2 Data Link | Link | frame | Ethernet, Wi-Fi, ARP | switch, bridge |
| 1 Physical | Link | bit | cáp quang, sóng radio | hub, repeater |

**Điểm cần nhớ**: OSI tầng 5–6 trên thực tế bị hoà vào application. QUIC phá vỡ bảng này — nó là transport nhưng chạy *trên* UDP và mang cả TLS. Xem [[QUIC]].

## 2. Nguyên tắc phân tầng
1. **Mỗi tầng chỉ nói chuyện với tầng ngay trên/dưới** và với tầng ngang hàng ở đầu kia (peer protocol).
2. **Tầng dưới không được biết ngữ nghĩa của tầng trên** — router không đọc HTTP.
3. **Narrow waist ở tầng 3**: mọi thứ đều chạy trên IP; IP chạy trên mọi thứ.
4. **Phân tầng đánh đổi hiệu năng lấy khả năng tiến hoá** — mỗi tầng thêm header và một lần copy.

## 3. Cạm bẫy hay gặp
- **Học thuộc OSI như kinh thánh.** OSI là mô hình tham chiếu do ISO chuẩn hoá, chưa bao giờ được triển khai đầy đủ. Cái đang chạy là TCP/IP.
- **"Lỗi tầng 8"** — nói vui nhưng dùng thật khi debug: kiểm tra cấu hình/người dùng trước khi bới packet.
- **Nhầm "L7 load balancer" là chậm hơn L4 vì tầng cao hơn** — thực tế khác biệt nằm ở việc terminate TCP/TLS, không phải ở con số tầng.
- **Middlebox phá phân tầng**: NAT và firewall đọc/sửa header tầng 4 → lý do TCP khó tiến hoá và QUIC phải mã hoá gần hết header.

## 4. Checklist áp dụng
- [ ] Sự cố này biểu hiện ở tầng nào? (không ping được = L3; ping được nhưng không telnet cổng = L4; kết nối được nhưng 502 = L7)
- [ ] Thiết bị trung gian nào đang can thiệp vào tầng nào?
- [ ] Header của mình cộng lại có vượt MTU không?

## 5. Cách dùng khi debug (đi từ dưới lên)
1. L1/L2: cáp, `ip link`, ARP có thấy không → [[Ethernet]]
2. L3: `ping`, `traceroute`, bảng route → [[IP Addressing & Subnetting]]
3. L4: `ss -tlnp`, `nc -vz host port` → [[TCP]]
4. L7: `curl -v`, log ứng dụng → [[HTTP]]

## Tham khảo
- Peterson & Davie — Ch.1.3 Network Architecture: https://book.systemsapproach.org/foundation/architecture.html
- RFC 1122 — *Requirements for Internet Hosts*: https://www.rfc-editor.org/rfc/rfc1122
- ISO/IEC 7498-1 — OSI Reference Model: https://www.iso.org/standard/20269.html

## Liên kết
[[Network Fundamentals]] · [[Protocol Layering & Encapsulation]] · [[Networking]]
