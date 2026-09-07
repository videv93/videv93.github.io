---
tags: [networking, internetworking, l2]
status: growing
---
# Switching & Bridging

> Switch nối các segment L2 thành một miền broadcast; router nối các miền broadcast thành liên mạng. **Nhầm hai vai trò này là nguồn của hầu hết thiết kế mạng tồi.**

## 1. Switch vs Router

| | Switch (bridge, L2) | Router (L3) |
|---|---|---|
| Tra theo | MAC đích | IP đích, longest-prefix match |
| Bảng | MAC/CAM table, học tự động | Routing table, học qua giao thức |
| Không biết đích thì | **Flood** ra mọi cổng | **Drop** + gửi ICMP unreachable |
| Chống vòng lặp | STP (vì frame không có TTL) | TTL trong header IP |
| Miền broadcast | Cùng một | Chia tách |
| Mở rộng | Kém (broadcast, ARP) | Tốt (phân cấp địa chỉ) |

**Quy tắc**: mở rộng theo chiều ngang bằng L2, mở rộng theo quy mô bằng L3.

## 2. Cách switch học và chuyển tiếp
1. Nhận frame → ghi `(MAC nguồn, cổng vào)` vào bảng, đặt timer (mặc định thường 300 s).
2. Tra MAC đích: có → gửi đúng cổng; không có hoặc broadcast/multicast → **flood** mọi cổng trừ cổng vào.
3. Chạy **STP/RSTP** để chặn (block) các cổng tạo vòng, giữ topology thành cây.
4. **VLAN** chia bảng thành nhiều miền độc lập; **trunk** mang tag 802.1Q → [[Ethernet]].
5. **Inter-VLAN routing** cần router hoặc L3 switch (SVI).

## 3. Cạm bẫy hay gặp
- **Vòng lặp L2**: không có TTL nên broadcast nhân bản vô hạn — sập mạng trong vài giây. Luôn bật STP/RSTP và BPDU guard ở cổng người dùng.
- **MAC flapping**: cùng một MAC xuất hiện luân phiên ở hai cổng → dấu hiệu có vòng lặp hoặc cấu hình bonding sai.
- **Miền broadcast quá lớn**: ARP và broadcast tăng theo O(n²) tương tác; giữ mỗi VLAN ở mức vài trăm host.
- **Dùng L2 kéo dài giữa hai datacenter** (stretched VLAN) — một sự cố ở một bên lan sang bên kia. Dùng L3 hoặc overlay (VXLAN) với biên rõ ràng → [[Container & Cloud Networking]].
- **Tin rằng switch cô lập lưu lượng**: CAM overflow hoặc cấu hình sai làm switch flood → cần port security.

## 4. Checklist áp dụng
- [ ] Mỗi VLAN có bao nhiêu host? Có vượt vài trăm không?
- [ ] STP có bật, root bridge có được chỉ định thay vì bầu ngẫu nhiên không?
- [ ] Cổng access có bật BPDU guard / port security chưa?
- [ ] Có stretched VLAN giữa hai site không? Vì sao cần?
- [ ] Đã tách VLAN quản trị khỏi VLAN người dùng chưa?

## Tham khảo
- Peterson & Davie — 3.1 Switching Basics: https://book.systemsapproach.org/internetworking/switching.html
- Peterson & Davie — 3.2 Switched Ethernet: https://book.systemsapproach.org/internetworking/ethernet.html
- Perlman — *An Algorithm for Distributed Computation of a Spanning Tree* (1985): https://dl.acm.org/doi/10.1145/319056.319004
- IEEE 802.1D: https://standards.ieee.org/ieee/802.1D/

## Liên kết
[[Ethernet]] · [[IP Addressing & Subnetting]] · [[Router Implementation & Forwarding]] · [[Networking]]
