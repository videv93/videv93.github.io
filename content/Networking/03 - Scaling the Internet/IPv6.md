---
tags: [networking, scaling, ip]
status: growing
---
# IPv6

> Không phải "IPv4 với nhiều địa chỉ hơn". Nó **bỏ hẳn NAT, bỏ broadcast, bỏ checksum header, bỏ phân mảnh ở router** — nghĩa là một số thói quen vận hành phải bỏ theo.

## 1. Khác biệt cốt lõi so với IPv4

| | IPv4 | IPv6 |
|---|---|---|
| Địa chỉ | 32 bit | **128 bit** |
| Header | 20–60B, biến đổi | **40B cố định** + extension header |
| Checksum header | Có (tính lại mỗi hop) | **Bỏ** — nhanh hơn |
| Phân mảnh | Router được phép | **Chỉ host nguồn** → bắt buộc PMTUD |
| ARP | ARP broadcast | **NDP** qua ICMPv6 multicast |
| Cấu hình tự động | DHCP | **SLAAC** (RA) hoặc DHCPv6 |
| Broadcast | Có | **Không có** — chỉ multicast |
| MTU tối thiểu | 576 | **1280** |

**Cách viết**: bỏ số 0 đầu mỗi nhóm, `::` thay cho một chuỗi nhóm 0 (chỉ dùng **một lần**). `2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8::1`.

**Các loại địa chỉ cần biết**: `::1` loopback · `fe80::/10` link-local (**luôn tồn tại, mọi interface**) · `fc00::/7` ULA (riêng) · `2000::/3` global unicast · `ff00::/8` multicast · `::ffff:0:0/96` IPv4-mapped.

## 2. Nguyên tắc triển khai
1. **Dual-stack là mặc định**, không phải chuyển đổi dứt điểm. Chạy song song nhiều năm.
2. **Cấp `/64` cho mỗi subnet** — SLAAC yêu cầu đúng /64. Site thường được cấp `/48` hoặc `/56`.
3. **Happy Eyeballs (RFC 8305)**: client thử IPv6 và IPv4 song song, dùng cái nào phản hồi trước → IPv6 hỏng vẫn không làm người dùng thấy chậm, nhưng cũng che giấu sự cố.
4. **ICMPv6 bắt buộc phải cho qua** — chặn là hỏng NDP và PMTUD → [[ARP, DHCP & ICMP]].
5. **Privacy extensions (RFC 8981)**: client tự sinh địa chỉ tạm đổi theo thời gian → đừng dùng địa chỉ IPv6 làm định danh ổn định.

## 3. Cạm bẫy hay gặp
- **Firewall chỉ viết rule cho IPv4** → IPv6 mở toang. Đây là lỗi bảo mật phổ biến nhất khi bật dual-stack.
- **Ứng dụng bind `0.0.0.0`** → không nghe IPv6. Cần `::` (và hiểu `net.ipv6.bindv6only`).
- **Regex/validate IP chỉ nhận IPv4** → lỗi khi client là IPv6, hoặc lưu IP vào cột `VARCHAR(15)`.
- **Log ghi `::ffff:1.2.3.4`** rồi khớp không ra với whitelist IPv4.
- **Bỏ /64 để "tiết kiệm"** (dùng /112) → SLAAC ngừng hoạt động. Đừng tiết kiệm — không gian là vô tận theo mọi nghĩa thực dụng.

## 4. Checklist áp dụng
- [ ] Firewall rule có bản IPv6 tương đương từng rule IPv4 không? (`ip6tables`/security group)
- [ ] Service có bind `::` và chấp nhận cả hai stack không?
- [ ] Database/schema/log có chứa nổi 45 ký tự địa chỉ không?
- [ ] ICMPv6 (type 133–137, 1, 2, 3, 4) có được cho qua không?
- [ ] Monitoring có kiểm tra riêng đường IPv6 không? (Happy Eyeballs sẽ che lỗi)

## Tham khảo
- Peterson & Davie — 4.2 IP Version 6: https://book.systemsapproach.org/scaling/ipv6.html
- RFC 8200 — *IPv6 Specification*: https://www.rfc-editor.org/rfc/rfc8200
- RFC 4861 — *Neighbor Discovery for IPv6*: https://www.rfc-editor.org/rfc/rfc4861
- RFC 8305 — *Happy Eyeballs v2*: https://www.rfc-editor.org/rfc/rfc8305
- Google — IPv6 adoption statistics: https://www.google.com/intl/en/ipv6/statistics.html

## Liên kết
[[IP Addressing & Subnetting]] · [[NAT]] · [[ARP, DHCP & ICMP]] · [[Networking]]
