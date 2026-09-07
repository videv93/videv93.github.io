---
tags: [networking, scaling, mobility]
status: seed
---
# Mobile IP & Mobility

> Địa chỉ IP vừa là **định danh** vừa là **vị trí** — đó là khiếm khuyết gốc khiến di động khó. Mọi giải pháp đều là cách tách hai vai trò đó ra.

## 1. Bài toán và các lời giải

| Cách tiếp cận | Cơ chế | Thực tế |
|---|---|---|
| **Mobile IP** (RFC 5944) | Home Agent giữ địa chỉ cố định, tunnel tới care-of address | Ít dùng; đường đi tam giác kém hiệu quả |
| **GTP trong mạng di động** | Tunnel từ trạm về gateway của nhà mạng; IP của thiết bị không đổi khi chuyển trạm | **Đây mới là thứ đang chạy trên 4G/5G** |
| **Session ở tầng trên** | Kết nối mới, nhưng session/token giữ nguyên | Cách web làm |
| **Connection ID của QUIC** | Kết nối sống sót khi đổi IP/mạng | Cách hiện đại nhất → [[QUIC]] |
| **MPTCP** | Nhiều đường (Wi-Fi + 4G) trong một kết nối logic | iOS Siri, một số ứng dụng |

## 2. Nguyên tắc thiết kế cho client di động
1. **Giả định IP sẽ đổi giữa chừng.** Chuyển Wi-Fi ↔ 4G là chuyện thường; đừng gắn phiên làm việc vào IP.
2. **Đừng dùng IP để xác thực hay để rate limit chặt** — người dùng di động chia sẻ IP qua CGNAT → [[NAT]].
3. **Thiết kế cho kết nối chập chờn**: retry idempotent, hàng đợi ngoại tuyến, đồng bộ delta thay vì tải lại.
4. **Ưu tiên QUIC/HTTP-3** cho ứng dụng di động: 0-RTT khi kết nối lại, không head-of-line blocking, sống sót qua đổi mạng.
5. **Tiết kiệm radio**: mỗi lần đánh thức radio tốn pin đáng kể → gộp request, dùng push thay vì polling.

## 3. Cạm bẫy hay gặp
- **Heartbeat quá dày** giết pin và làm radio không bao giờ ngủ; quá thưa thì NAT/firewall đóng kết nối → cân bằng quanh 30–60 s cho NAT UDP, vài phút cho TCP.
- **Coi "có kết nối" là "có Internet"**: captive portal trả về 200 cho mọi thứ. Cần probe thật.
- **Không xử lý chuyển mạng giữa chừng khi upload lớn** → phải làm lại từ đầu. Dùng upload theo chunk có resume.
- **Giả định băng thông đối xứng và ổn định** → [[Access Networks]].

## 4. Checklist áp dụng
- [ ] Phiên đăng nhập có sống sót khi đổi IP không?
- [ ] Upload/download lớn có resume được không?
- [ ] Chu kỳ heartbeat đã cân bằng giữa pin và NAT timeout chưa?
- [ ] Đã test ở chế độ mạng kém và chuyển mạng giữa chừng chưa?
- [ ] Có phát hiện captive portal không?

## Tham khảo
- Peterson & Davie — 4.5 Routing Among Mobile Devices: https://book.systemsapproach.org/scaling/mobile-ip.html
- RFC 5944 — *IP Mobility Support for IPv4*: https://www.rfc-editor.org/rfc/rfc5944
- RFC 8684 — *TCP Extensions for Multipath Operation (MPTCP)*: https://www.rfc-editor.org/rfc/rfc8684
- Grigorik — *HPBN* Ch.8 Optimizing for Mobile Networks: https://hpbn.co/optimizing-for-mobile-networks/

## Liên kết
[[Wireless Networks]] · [[QUIC]] · [[NAT]] · [[Access Networks]] · [[Networking]]
