---
tags: [networking, security, firewall]
status: growing
---
# Firewall & Filtering

> Quyết định gói nào được đi qua. Nguyên tắc duy nhất cần nhớ: **default deny** — cho phép cái cần, chặn phần còn lại; không phải ngược lại.

## 1. Các thế hệ firewall

| Loại | Nhìn thấy | Hạn chế |
|---|---|---|
| **Packet filter (stateless)** | IP, port, cờ | Không biết chiều nào là "trả lời" |
| **Stateful** | Theo dõi trạng thái kết nối | Bảng trạng thái có giới hạn → mục tiêu DoS |
| **Application-aware / NGFW** | Nội dung L7, TLS inspection | Tốn CPU, cần cài CA vào client |
| **WAF** | HTTP request cụ thể | Bypass được; là lớp bổ sung, không thay thế code an toàn |
| **Host-based** (nftables, security group) | Trên chính máy đó | Không thấy toàn cảnh |

**Trên Linux**: `iptables` → **`nftables`** (thay thế chính thức) → và `eBPF/XDP` cho hiệu năng rất cao. `conntrack` giữ trạng thái kết nối cho NAT và stateful filtering → [[NAT]].

## 2. Nguyên tắc
1. **Default deny cho inbound**, và **cũng nên default deny cho egress** — hạn chế egress chặn được exfiltration và C2 callback, dù khó vận hành hơn.
2. **Lọc càng gần nguồn càng tốt**; và **BCP 38** (chặn gói có IP nguồn giả) ở biên mạng.
3. **Micro-segmentation**: chia nhỏ theo dịch vụ, không chỉ theo vùng mạng. Chiếm được một pod không có nghĩa là đi được khắp nơi → [[Container & Cloud Networking]].
4. **Rule phải có comment và có chủ sở hữu.** Rule không ai dám xoá là nợ kỹ thuật bảo mật.
5. **Firewall không thay thế xác thực** — mọi dịch vụ vẫn phải tự xác thực (zero trust) → [[Threat Model & Attacks]].
6. **Log deny** để phát hiện quét và cấu hình sai; nhưng phải rate-limit log.

## 3. Cạm bẫy hay gặp
- **Chặn toàn bộ ICMP** → hỏng PMTUD, hỏng chẩn đoán → [[ARP, DHCP & ICMP]]. Cho qua type 3 và 11.
- **Chỉ có rule IPv4**, IPv6 mở toang → [[IPv6]].
- **Quên TCP/53 cho DNS** → response lớn thất bại ngẫu nhiên → [[DNS]].
- **Bảng conntrack đầy** → gói mới bị drop im lặng. Theo dõi `nf_conntrack_count` vs `max`.
- **Rule quá rộng để "cho chạy"** (`0.0.0.0/0` tạm thời) rồi không bao giờ siết lại.
- **Firewall stateful với đường đi bất đối xứng** → chiều về bị drop vì không thấy chiều đi → [[Routing Basics]].
- **Tin rằng NAT là firewall** — không phải.

## 4. Checklist áp dụng
- [ ] Chính sách mặc định là DENY cho cả inbound và (lý tưởng) outbound chưa?
- [ ] Rule IPv6 có tương đương IPv4 không?
- [ ] ICMP/ICMPv6 cần thiết có được cho qua không?
- [ ] `nf_conntrack` đang dùng bao nhiêu phần trăm dung lượng?
- [ ] Có rule nào `any-any` còn sót không? Có ai sở hữu từng rule không?
- [ ] Có rà soát rule định kỳ và xoá rule chết không?
- [ ] Deny có được log và giám sát không?

## Công cụ
| Lệnh | Dùng để |
|---|---|
| `nft list ruleset` | xem toàn bộ rule nftables |
| `iptables -L -n -v --line-numbers` | xem rule + bộ đếm gói khớp |
| `conntrack -S` / `sysctl net.netfilter.nf_conntrack_count` | theo dõi bảng trạng thái |
| `nc -vz host port` / `nmap` | kiểm tra cổng mở từ bên ngoài |

## Tham khảo
- Peterson & Davie — 8.5 Example Systems: https://book.systemsapproach.org/security/systems.html
- nftables wiki: https://wiki.nftables.org/
- RFC 2827 / BCP 38 — *Network Ingress Filtering*: https://www.rfc-editor.org/rfc/rfc2827
- NIST SP 800-41 — *Guidelines on Firewalls and Firewall Policy*: https://csrc.nist.gov/pubs/sp/800/41/r1/final

## Liên kết
[[Threat Model & Attacks]] · [[NAT]] · [[VPN & IPsec]] · [[Linux Network Stack]] · [[Networking]]
