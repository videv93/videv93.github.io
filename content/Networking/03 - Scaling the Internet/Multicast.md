---
tags: [networking, scaling, multicast]
status: seed
---
# Multicast

> Gửi một lần, mạng nhân bản cho nhiều người nhận. **Đẹp về lý thuyết, gần như chết trên Internet công cộng, nhưng sống rất khoẻ trong LAN, DC và mạng ISP.**

## 1. Khái niệm

| Mô hình | Nghĩa | Ghi chú |
|---|---|---|
| **Unicast** | 1 → 1 | mặc định |
| **Broadcast** | 1 → tất cả trong subnet | IPv4 có, IPv6 bỏ |
| **Multicast** | 1 → nhóm đăng ký | `224.0.0.0/4` (IPv4), `ff00::/8` (IPv6) |
| **Anycast** | 1 → node gần nhất trong nhóm | Dùng nhiều nhất trong thực tế (DNS gốc, CDN) |

**Giao thức**: **IGMP** (IPv4) / **MLD** (IPv6) để host báo "tôi muốn nhận nhóm G"; **PIM** (Protocol Independent Multicast) để router dựng cây phân phối. PIM-SM dùng Rendezvous Point; **SSM** (Source-Specific Multicast, `232.0.0.0/8`) đơn giản hơn và là dạng khả thi nhất.

**IGMP snooping** trên switch: nghe lén IGMP để chỉ gửi multicast ra cổng có người đăng ký — không bật thì multicast bị flood như broadcast.

## 2. Nguyên tắc
1. **Multicast cần mọi router trên đường đi hỗ trợ và cấu hình** → không mở rộng ra Internet công cộng vì lý do vận hành và kinh doanh.
2. **Không có điều khiển tắc nghẽn tự nhiên** (thường chạy trên UDP) → phải tự giới hạn tốc độ.
3. **Không tin cậy**: mất gói thì không có ai để ACK. Cần FEC hoặc NACK-based reliability (PGM, NORM).
4. **Anycast là "multicast của người thực dụng"**: dùng BGP quảng bá cùng prefix từ nhiều PoP → [[BGP & Interdomain Routing]].
5. **Application-level multicast** (overlay, P2P, CDN tree) đã thay thế IP multicast cho phát video trên Internet.

## 3. Nơi multicast thực sự được dùng
- **Tài chính**: feed giá thị trường trong DC (rất nhạy latency, một nguồn nhiều người nhận).
- **IPTV của ISP**: mỗi kênh là một nhóm multicast trong mạng nhà cung cấp.
- **Service discovery trong LAN**: mDNS/Bonjour (`224.0.0.251`), SSDP.
- **Giao thức hạ tầng**: OSPF (`224.0.0.5/6`), VRRP, NDP của IPv6.

## 4. Cạm bẫy hay gặp
- **Không bật IGMP snooping** → multicast flood cả VLAN, đặc biệt đau trên Wi-Fi (multicast phát ở tốc độ thấp nhất).
- **mDNS không qua được router** (TTL=1 theo thiết kế) → "máy in không hiện" khi client và máy in khác VLAN. Cần mDNS reflector.
- **Kỳ vọng multicast chạy qua cloud/VPC** — phần lớn nhà cung cấp không hỗ trợ (AWS chỉ có qua Transit Gateway multicast domain).
- **Dùng multicast cho dữ liệu quan trọng mà không có cơ chế phục hồi.**

## 5. Checklist áp dụng
- [ ] IGMP snooping có bật trên toàn bộ switch trong VLAN đó không?
- [ ] Multicast có cần vượt qua ranh giới L3 không? Ai làm PIM?
- [ ] Nguồn phát có bị giới hạn tốc độ để không nhấn chìm receiver chậm không?
- [ ] Nếu chỉ cần "một dịch vụ ở nhiều nơi" — anycast có phù hợp hơn không?

## Tham khảo
- Peterson & Davie — 4.3 Multicast: https://book.systemsapproach.org/scaling/multicast.html
- RFC 3376 — *IGMPv3*: https://www.rfc-editor.org/rfc/rfc3376
- RFC 7761 — *PIM-SM*: https://www.rfc-editor.org/rfc/rfc7761
- RFC 4607 — *Source-Specific Multicast*: https://www.rfc-editor.org/rfc/rfc4607

## Liên kết
[[Ethernet]] · [[BGP & Interdomain Routing]] · [[CDN]] · [[Networking]]
