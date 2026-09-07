---
tags: [networking, security, vpn]
status: growing
---
# VPN & IPsec

> Tạo một mạng riêng ảo trên hạ tầng công cộng bằng **đóng gói + mã hoá**. Câu hỏi thiết kế: bảo vệ ở tầng nào, và ai cần nói chuyện với ai.

## 1. So sánh các giải pháp

| | **IPsec** | **WireGuard** | **OpenVPN** | **TLS-based (SSL VPN)** |
|---|---|---|---|---|
| Tầng | L3 (kernel) | L3 (kernel) | L3/L2 (user space) | L7 |
| Dòng code | Rất lớn | **~4000 dòng** | Lớn | — |
| Crypto | Nhiều lựa chọn (dễ chọn sai) | **Cố định, hiện đại** (ChaCha20, X25519) | Nhiều lựa chọn | TLS |
| Hiệu năng | Cao (có offload) | **Rất cao** | Trung bình | Trung bình |
| Xuyên NAT | Cần NAT-T (UDP 4500) | Tốt (UDP, roaming được) | Tốt | Rất tốt (443) |
| Cấu hình | Phức tạp | Rất đơn giản | Trung bình | Đơn giản cho người dùng |

**Mặc định nên chọn**: WireGuard cho mới; IPsec khi cần tương thích với thiết bị mạng doanh nghiệp/cloud gateway.

## 2. IPsec — khái niệm cốt lõi
1. **Hai chế độ**: **Transport** (chỉ mã hoá payload, dùng host-to-host) và **Tunnel** (bọc cả gói IP gốc, dùng site-to-site).
2. **Hai giao thức**: **ESP** (mã hoá + xác thực — cái luôn dùng) và AH (chỉ xác thực, không qua được NAT — hầu như không dùng).
3. **IKEv2** thoả thuận khoá và SA (Security Association). Phase 1 lập kênh bảo mật, Phase 2 lập SA cho dữ liệu.
4. **NAT-T**: bọc ESP trong UDP 4500 để qua NAT → [[NAT]].
5. **MTU**: ESP + tunnel thêm ~50–70B → phải **MSS clamping**, nếu không sẽ gặp đúng lỗi "bắt tay được nhưng treo khi truyền file lớn" → [[IP Packet & Fragmentation]].

## 3. Kiến trúc VPN
| Kiểu | Dùng khi |
|---|---|
| **Site-to-site** | Nối hai văn phòng/DC |
| **Remote access (client VPN)** | Nhân viên làm việc từ xa |
| **Mesh (WireGuard/Tailscale)** | Mọi node nói chuyện trực tiếp, không dồn về hub |
| **Zero Trust Network Access (ZTNA)** | Cấp quyền theo **ứng dụng và danh tính**, không cấp cả mạng — thay thế VPN truyền thống |

**Xu hướng**: VPN truyền thống cấp quyền vào cả mạng (quá rộng). ZTNA/BeyondCorp xác thực từng request, từng ứng dụng → [[Threat Model & Attacks]].

## 4. Cạm bẫy hay gặp
- **Dải IP chồng lấn** giữa hai đầu tunnel → không định tuyến được. Quy hoạch địa chỉ trước → [[IP Addressing & Subnetting]].
- **Quên MSS clamping** → lỗi MTU khó chịu và khó chẩn đoán.
- **Split tunnel vs full tunnel**: split nhanh và tiết kiệm nhưng lưu lượng ra Internet không qua kiểm soát; full tunnel dồn hết về gateway → nghẽn. Chọn có ý thức.
- **VPN thành điểm chết đơn lẻ** — cần dự phòng, và cần đường vào khẩn cấp khi VPN chết.
- **DNS leak / DNS trong tunnel**: cấu hình sai làm truy vấn DNS đi ra ngoài → rò rỉ thông tin và phân giải sai với tên nội bộ → [[DNS]].
- **Coi "đã vào VPN" là đã được xác thực** — vẫn cần xác thực ứng dụng.
- **Khoá/chứng chỉ VPN không xoay** khi nhân viên nghỉ việc.

## 5. Checklist áp dụng
- [ ] Dải địa chỉ hai đầu có chồng lấn không?
- [ ] MSS clamping / MTU đã cấu hình chưa? Đã test truyền file lớn chưa?
- [ ] Split hay full tunnel? Quyết định đó dựa trên gì?
- [ ] VPN gateway có dự phòng không? Có đường vào khẩn cấp không?
- [ ] DNS trong tunnel có đúng và không rò rỉ không?
- [ ] Truy cập có được giới hạn theo ứng dụng thay vì mở cả mạng không?
- [ ] Có quy trình thu hồi khoá/chứng chỉ khi người dùng rời đi không?

## Tham khảo
- RFC 4301 — *Security Architecture for IP (IPsec)*: https://www.rfc-editor.org/rfc/rfc4301
- RFC 7296 — *IKEv2*: https://www.rfc-editor.org/rfc/rfc7296
- Donenfeld — *WireGuard: Next Generation Kernel Network Tunnel*: https://www.wireguard.com/papers/wireguard.pdf
- Google — *BeyondCorp*: https://cloud.google.com/beyondcorp

## Liên kết
[[Firewall & Filtering]] · [[NAT]] · [[MPLS]] · [[TLS]] · [[Networking]]
