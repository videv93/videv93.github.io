---
tags: [networking, internetworking, ip]
status: evergreen
---
# IP Addressing & Subnetting

> Kỹ năng nền tảng nhất và cũng hay bị làm tắt nhất. **Tính nhẩm được CIDR là điều kiện cần để đọc bảng route, cấu hình VPC, và debug firewall.**

## 1. CIDR — tính nhẩm

| Prefix | Netmask | Số IP | Số host dùng được | Ghi nhớ |
|---|---|---|---|---|
| /32 | 255.255.255.255 | 1 | 1 | một host |
| /30 | 255.255.255.252 | 4 | 2 | link point-to-point |
| /29 | 255.255.255.248 | 8 | 6 | |
| /28 | 255.255.255.240 | 16 | 14 | |
| /24 | 255.255.255.0 | 256 | 254 | subnet "cổ điển" |
| /22 | 255.255.252.0 | 1024 | 1022 | |
| /16 | 255.255.0.0 | 65536 | 65534 | VPC nhỏ |
| /8 | 255.0.0.0 | 16.7 M | — | VPC lớn / `10.0.0.0/8` |

**Công thức**: số IP = `2^(32 − prefix)`; host dùng được = số IP − 2 (trừ network address và broadcast). Trong AWS VPC trừ **5** (AWS giữ 3 IP nữa).

**Dải riêng (RFC 1918)**: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
**Dải đặc biệt**: `127.0.0.0/8` loopback · `169.254.0.0/16` link-local (APIPA, và metadata service của cloud) · `100.64.0.0/10` CGNAT · `224.0.0.0/4` multicast.

## 2. Nguyên tắc
1. **Longest prefix match**: router chọn route có prefix dài nhất khớp, không phải route đầu tiên. `/32` luôn thắng `/0`.
2. **CIDR thay thế class A/B/C** (RFC 4632) để chống cạn địa chỉ và giảm kích thước bảng route. Đừng nói "class C" nữa — nói `/24`.
3. **Aggregation (supernetting)** giữ bảng route toàn cầu ở mức quản lý được → [[BGP & Interdomain Routing]].
4. **Quy hoạch địa chỉ trước, không vá sau.** Phân bổ theo vùng/môi trường: `10.<region>.<env>.<x>` — để có thể gộp thành ít route/rule firewall.
5. **Đừng dùng dải chồng lấn giữa các VPC/site** — không peering được, không VPN được.

## 3. Cạm bẫy hay gặp
- **Chọn `/24` cho mọi subnet rồi hết IP** khi Kubernetes cấp IP cho từng pod. Tính theo mật độ pod, không theo số node.
- **Dùng `192.168.1.0/24`** cho VPN doanh nghiệp → trùng với router nhà của mọi nhân viên → định tuyến hỏng. Chọn dải hiếm gặp trong `10/8`.
- **Nhầm gateway với network address**: `10.0.0.0/24` thì `.0` là network, `.255` là broadcast, gateway thường là `.1`.
- **Quên rằng /31 hợp lệ cho link point-to-point** (RFC 3021) — tiết kiệm địa chỉ.
- **Giả định IP định danh người dùng** — sau NAT/CGNAT thì không. → [[NAT]]

## 4. Checklist áp dụng
- [ ] Dải này có chồng lấn với VPC/VPN/site nào khác không?
- [ ] Subnet đủ chỗ cho mức tăng trưởng 3 năm chưa? (nhớ pod IP, LB IP, ENI)
- [ ] Có gộp được thành ít prefix để giảm rule firewall không?
- [ ] Đã dành sẵn dải cho môi trường mới (staging, DR) chưa?
- [ ] IPv6 đã được cấp phát song song chưa? → [[IPv6]]

## Công cụ
| Tên | Dùng để |
|---|---|
| `ipcalc` / `sipcalc` | tính subnet trên CLI |
| `ip route get <ip>` | xem router chọn route nào cho một đích |
| cidr.xyz | trực quan hoá CIDR trên web: https://cidr.xyz |

## Tham khảo
- Peterson & Davie — 3.3 Internet (IP): https://book.systemsapproach.org/internetworking/basic-ip.html
- RFC 4632 — *CIDR*: https://www.rfc-editor.org/rfc/rfc4632
- RFC 1918 — *Address Allocation for Private Internets*: https://www.rfc-editor.org/rfc/rfc1918
- RFC 3021 — *Using 31-Bit Prefixes on IPv4 Point-to-Point Links*: https://www.rfc-editor.org/rfc/rfc3021

## Liên kết
[[IP Packet & Fragmentation]] · [[ARP, DHCP & ICMP]] · [[NAT]] · [[IPv6]] · [[Networking]]
