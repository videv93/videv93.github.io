---
tags: [networking, internetworking, ip]
status: growing
---
# IP Packet & Fragmentation

> Header IP là hợp đồng chung của toàn Internet. Ba trường gây rắc rối nhiều nhất trong thực tế: **TTL, DF/fragment, và DSCP**.

## 1. Header IPv4 (20B, không tính options)

| Trường | Bit | Ý nghĩa thực dụng |
|---|---|---|
| Version / IHL | 4/4 | IHL tính bằng word 4B → header tối đa 60B |
| **DSCP / ECN** | 6/2 | Đánh dấu ưu tiên → [[Quality of Service]]; ECN báo tắc nghẽn không cần drop |
| Total Length | 16 | Tối đa 65535B |
| Identification | 16 | Nhóm các fragment cùng gói gốc |
| **Flags (DF, MF)** | 3 | `DF` = cấm phân mảnh (dùng cho PMTUD) |
| Fragment Offset | 13 | Tính theo đơn vị 8B |
| **TTL** | 8 | Giảm 1 mỗi hop; =0 thì drop + gửi ICMP Time Exceeded → cơ sở của `traceroute` |
| Protocol | 8 | 6 = TCP, 17 = UDP, 1 = ICMP |
| Header Checksum | 16 | Chỉ bảo vệ header; phải tính lại mỗi hop (IPv6 bỏ hẳn) |
| Src / Dst | 32/32 | |

## 2. Fragmentation — và vì sao nên tránh
1. **IPv4**: router *có thể* phân mảnh nếu gói > MTU và `DF=0`. Bên nhận (không phải router) ráp lại.
2. **IPv6 cấm router phân mảnh** — chỉ host nguồn được phân mảnh, qua extension header. Buộc phải dùng PMTUD.
3. **Path MTU Discovery**: gửi gói với `DF=1`, nếu quá lớn thì nhận ICMP "Fragmentation Needed" kèm MTU → giảm kích thước. **Chặn ICMP là làm hỏng PMTUD.**
4. **Mất một fragment = mất cả gói.** Xác suất mất tăng theo số mảnh.
5. **Fragment sau mảnh đầu không có header L4** → firewall/LB không đọc được port → hoặc drop hoặc phải reassemble.

## 3. Cạm bẫy hay gặp
- **PMTUD blackhole** — triệu chứng kinh điển: TCP bắt tay xong, request nhỏ ok, nhưng gửi payload lớn thì treo. Nguyên nhân gần như luôn là ICMP type 3 code 4 bị firewall chặn. Chữa tạm bằng **MSS clamping** (`--clamp-mss-to-pmtu`).
- **Quên MTU khi thêm tunnel** (VPN, VXLAN, IPIP) → xem [[Protocol Layering & Encapsulation]].
- **TTL quá thấp** trong cấu hình → gói chết trước khi tới đích qua nhiều hop.
- **Dựa vào IP checksum để đảm bảo toàn vẹn dữ liệu** — nó chỉ bảo vệ header.

## 4. Checklist áp dụng
- [ ] ICMP type 3 code 4 có được cho qua firewall không?
- [ ] MSS clamping đã bật trên gateway VPN chưa?
- [ ] `ping -M do -s <size>` xác định được MTU thật của đường đi chưa?
- [ ] Có thấy fragment trong `tcpdump` không? (`ip[6:2] & 0x1fff != 0`)
- [ ] DSCP có bị thiết bị trung gian ghi đè về 0 không?

## Tham khảo
- RFC 791 — *Internet Protocol*: https://www.rfc-editor.org/rfc/rfc791
- RFC 1191 / RFC 8201 — *Path MTU Discovery for IPv4 / IPv6*: https://www.rfc-editor.org/rfc/rfc8201
- RFC 8900 — *IP Fragmentation Considered Fragile*: https://www.rfc-editor.org/rfc/rfc8900
- Cloudflare — *Path MTU discovery in practice*: https://blog.cloudflare.com/path-mtu-discovery-in-practice/

## Liên kết
[[IP Addressing & Subnetting]] · [[Protocol Layering & Encapsulation]] · [[ARP, DHCP & ICMP]] · [[Networking]]
