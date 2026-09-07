---
tags: [networking, link-layer, ethernet]
status: growing
---
# Ethernet

> Chuẩn L2 thắng tuyệt đối, từ 10 Mbps chia sẻ cáp đồng trục đến 400 Gbps full-duplex trong datacenter. **Phần lớn kiến thức CSMA/CD trong sách giáo khoa nay chỉ còn giá trị lịch sử** — nhưng khung frame thì không đổi.

## 1. Cấu trúc frame và địa chỉ

| Trường | Kích thước | Ghi chú |
|---|---|---|
| Preamble + SFD | 8B | đồng bộ clock |
| MAC đích / nguồn | 6B + 6B | 24 bit đầu = OUI (hãng sản xuất) |
| 802.1Q tag *(tuỳ chọn)* | 4B | VLAN ID 12 bit → tối đa 4094 VLAN |
| EtherType / Length | 2B | `0x0800` = IPv4, `0x0806` = ARP, `0x86DD` = IPv6 |
| Payload | 46–1500B | dưới 46 thì padding |
| FCS | 4B | CRC-32 → [[Error Detection]] |

**Địa chỉ đặc biệt**: `FF:FF:FF:FF:FF:FF` = broadcast; bit thấp nhất của byte đầu = 1 → multicast; bit thứ hai = 1 → địa chỉ cục bộ (LAA, dùng cho MAC randomization).

## 2. Từ chia sẻ đến chuyển mạch
1. **CSMA/CD** (nghe trước khi nói, phát hiện va chạm, backoff mũ) chỉ cần khi nhiều máy dùng chung một miền va chạm — tức là hub. **Ngày nay hầu như không còn**: switch full-duplex loại bỏ va chạm hoàn toàn.
2. **Switch tự học**: nghe MAC nguồn để xây bảng MAC (CAM table); không biết đích thì **flood**. Xem [[Switching & Bridging]].
3. **Spanning Tree (STP/RSTP)** chống vòng lặp L2 — vì frame Ethernet **không có TTL**, một vòng lặp sẽ nhân bản broadcast đến sập mạng.
4. **VLAN (802.1Q)** chia một switch vật lý thành nhiều miền broadcast độc lập; trunk port mang nhiều VLAN có tag.
5. **Link aggregation (802.3ad/LACP)** gộp nhiều cổng; phân tải theo hash flow nên **một flow không vượt được tốc độ một cổng**.

## 3. Cạm bẫy hay gặp
- **Vòng lặp L2 không có STP** → broadcast storm, mạng chết trong vài giây. Đây là sự cố nghiêm trọng và phổ biến nhất ở tầng 2.
- **Kỳ vọng LACP 4×10G cho một luồng đạt 40 Gbps** — không; hash theo flow.
- **MAC table đầy (CAM overflow)** → switch flood mọi thứ, vừa chậm vừa là lỗ hổng nghe lén.
- **Duplex mismatch** (một đầu full, một đầu half) → late collision, throughput sụt thảm hại nhưng link vẫn "up".
- **Quên rằng broadcast/ARP không mở rộng được** — miền broadcast quá lớn (>vài trăm host) là thiết kế sai; chia VLAN/subnet.

## 4. Checklist áp dụng
- [ ] Miền broadcast có bao nhiêu host? Đã chia VLAN hợp lý chưa?
- [ ] STP/RSTP có bật trên mọi switch không? Root bridge có được chỉ định chủ động không?
- [ ] Cổng có bị duplex mismatch / lỗi CRC tăng không? (`ethtool -S`, `show interface`)
- [ ] Port security / DHCP snooping / dynamic ARP inspection có bật ở cổng người dùng không?

## Tham khảo
- Peterson & Davie — 2.6 Multi-Access Networks: https://book.systemsapproach.org/direct/ethernet.html
- Metcalfe & Boggs — *Ethernet: Distributed Packet Switching* (1976): https://dl.acm.org/doi/10.1145/360248.360253
- IEEE 802.1Q (VLAN): https://standards.ieee.org/ieee/802.1Q/
- IEEE 802.1D / 802.1w (STP / RSTP): https://standards.ieee.org/ieee/802.1D/

## Liên kết
[[Framing]] · [[Switching & Bridging]] · [[ARP, DHCP & ICMP]] · [[Wireless Networks]] · [[Networking]]
