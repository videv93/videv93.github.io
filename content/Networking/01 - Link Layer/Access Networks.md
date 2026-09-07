---
tags: [networking, link-layer, access]
status: seed
---
# Access Networks

> "Last mile" — đoạn từ nhà/văn phòng đến mạng lõi của ISP. Đây là **nút thắt cổ chai và nguồn gốc của phần lớn độ trễ và bất đối xứng** mà ứng dụng phải sống chung.

## 1. Các công nghệ truy nhập

| Công nghệ | Băng thông điển hình | Trễ first-hop | Đặc điểm |
|---|---|---|---|
| **DSL / VDSL** | 10–100 Mbps | 10–30 ms | Chạy trên cáp đồng điện thoại; suy hao theo khoảng cách |
| **DOCSIS (cáp truyền hình)** | 100 Mbps – 1 Gbps | 10–30 ms | Chia sẻ đoạn cáp với hàng xóm → chậm giờ cao điểm |
| **PON / FTTH** (GPON, XGS-PON) | 300 Mbps – 10 Gbps | 2–10 ms | Cáp quang chia sẻ theo cây, TDMA hướng lên |
| **Cellular 4G/5G** | 20 Mbps – 1 Gbps | 10–70 ms | Di động; trễ biến thiên lớn |
| **Vệ tinh GEO / LEO** | 10–200 Mbps | 600 ms / 20–50 ms | GEO trễ khủng khiếp; LEO (Starlink) khả dụng cho real-time |

## 2. Nguyên tắc
1. **Access network gần như luôn bất đối xứng** (download ≫ upload). Ứng dụng upload nặng (video call, backup) chạm trần trước.
2. **Băng thông chia sẻ**: DOCSIS và PON chia sẻ theo nhóm thuê bao → hiệu năng giờ tối khác giờ trưa.
3. **Bufferbloat sống ở đây**: modem/router gia đình có buffer lớn, không AQM → RTT vọt lên khi upload bão hoà. Chữa bằng `fq_codel`/`cake` → [[Advanced Congestion Control]].
4. **CGNAT phổ biến ở ISP di động** — nhiều thuê bao chung một IPv4 công cộng → không mở port được, và IP không định danh được người dùng. → [[NAT]]
5. **Xu hướng "race to the edge"**: điện toán và cache dịch chuyển về gần access network (MEC, edge PoP) để cắt RTT → [[CDN]].

## 3. Cạm bẫy hay gặp
- **Thiết kế app giả định upload dồi dào** — bất đối xứng 10:1 là bình thường.
- **Test chỉ trên Wi-Fi văn phòng**: người dùng thật đang ở 4G có RTT 60 ms và mất gói 1%.
- **Giả định người dùng có IPv4 công cộng** — P2P/WebRTC phải có STUN/TURN vì CGNAT.
- **Bỏ qua data cap / metered connection** trên di động khi thiết kế đồng bộ nền.

## 4. Checklist áp dụng
- [ ] Đã test ứng dụng ở profile mạng 4G kém (RTT 150 ms, loss 2%) chưa? (`tc netem`)
- [ ] Luồng upload có bị giới hạn không? Có nén/hoãn được không?
- [ ] Có phương án cho client sau CGNAT (TURN relay, long-poll thay vì inbound connection)?
- [ ] Có phát hiện metered connection để giảm tải nền không?

## Tham khảo
- Peterson & Davie — 2.8 Access Networks: https://book.systemsapproach.org/direct/access.html
- Peterson & Davie — *Perspective: Race to the Edge*: https://book.systemsapproach.org/direct/trend.html
- Bufferbloat project: https://www.bufferbloat.net/
- RFC 6888 — *Common Requirements for Carrier-Grade NATs*: https://www.rfc-editor.org/rfc/rfc6888

## Liên kết
[[Wireless Networks]] · [[NAT]] · [[CDN]] · [[Bandwidth & Latency]] · [[Networking]]
