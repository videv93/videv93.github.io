---
tags: [networking, internetworking, protocol]
status: growing
---
# ARP, DHCP & ICMP

> Ba giao thức "keo dán" ít được nhắc nhưng có mặt trong mọi kết nối: **ARP tìm MAC, DHCP cấp IP, ICMP báo lỗi**. Chặn nhầm một trong ba là hỏng mạng theo cách rất khó đoán.

## 1. Ba giao thức trong một bảng

| | ARP | DHCP | ICMP |
|---|---|---|---|
| Trả lời câu hỏi | "IP này ứng với MAC nào?" | "Tôi nên dùng IP nào?" | "Gói của anh có vấn đề" |
| Tầng | 2.5 (trên Ethernet, dưới IP) | 7 (trên UDP 67/68) | 3 (trong IP, protocol 1) |
| Cách hoạt động | Broadcast request, unicast reply, cache vài phút | DORA: Discover → Offer → Request → Ack | Router/host gửi ngược về nguồn |
| Bản IPv6 | **NDP** (Neighbor Discovery, dùng ICMPv6) | SLAAC hoặc DHCPv6 | ICMPv6 (**bắt buộc**) |

**Các loại ICMP cần thuộc**:
- Type 0/8 — Echo reply/request (`ping`)
- Type 3 — Destination Unreachable; **code 4 = Fragmentation Needed** (PMTUD) → [[IP Packet & Fragmentation]]
- Type 11 — Time Exceeded (TTL hết) → nền tảng của `traceroute`
- Type 5 — Redirect (thường nên tắt vì rủi ro bảo mật)

## 2. Nguyên tắc
1. **ARP chỉ hoạt động trong cùng subnet.** Ngoài subnet thì host gửi cho gateway — nghĩa là host ARP tìm MAC của gateway, không phải của đích.
2. **Gratuitous ARP** dùng để thông báo đổi MAC — cơ chế failover của VIP/keepalived. Nếu switch không cập nhật, VIP "chết" vài chục giây.
3. **DHCP lease có thời hạn**; client gia hạn ở T1 = 50% lease. Lease quá dài làm pool cạn, quá ngắn làm tăng tải.
4. **ICMPv6 là bắt buộc** — chặn hết ICMPv6 làm IPv6 ngừng hoạt động (không có NDP, không có PMTUD).
5. **ARP/DHCP đều dựa trên broadcast** → không mở rộng được; là một lý do phải giới hạn kích thước miền broadcast → [[Switching & Bridging]].

## 3. Cạm bẫy hay gặp
- **Chặn toàn bộ ICMP "cho an toàn"** → hỏng PMTUD, hỏng traceroute, hỏng chẩn đoán. Chỉ nên rate-limit, và luôn cho qua type 3 và 11.
- **ARP spoofing**: kẻ tấn công trả lời thay gateway → MITM. Chống bằng Dynamic ARP Inspection + DHCP snooping.
- **DHCP server lậu** (rogue) trong mạng văn phòng → cấp gateway sai cho cả tầng. Bật DHCP snooping ở switch.
- **Cache ARP cũ sau khi đổi NIC/failover** → gói đi vào hư không cho tới khi cache hết hạn. Kiểm tra `ip neigh`.
- **Nhầm `ping` được là mạng ổn**: ICMP có thể được ưu tiên khác với TCP; nhiều thiết bị rate-limit ICMP nên thấy "mất gói ping" giả.

## 4. Checklist áp dụng
- [ ] Firewall có cho qua ICMP type 3 (đặc biệt code 4) và type 11 không?
- [ ] `ip neigh` có entry `FAILED`/`INCOMPLETE` nào không?
- [ ] DHCP snooping và DAI có bật ở cổng người dùng chưa?
- [ ] Với IPv6: ICMPv6 NDP có được cho phép không?
- [ ] Sau failover VIP, gratuitous ARP có được gửi và switch có cập nhật không?

## Tham khảo
- RFC 826 — *An Ethernet Address Resolution Protocol*: https://www.rfc-editor.org/rfc/rfc826
- RFC 2131 — *DHCP*: https://www.rfc-editor.org/rfc/rfc2131
- RFC 792 / RFC 4443 — *ICMP / ICMPv6*: https://www.rfc-editor.org/rfc/rfc4443
- RFC 4890 — *Filtering ICMPv6 Messages in Firewalls*: https://www.rfc-editor.org/rfc/rfc4890

## Liên kết
[[IP Addressing & Subnetting]] · [[Ethernet]] · [[Network Troubleshooting Playbook]] · [[Networking]]
