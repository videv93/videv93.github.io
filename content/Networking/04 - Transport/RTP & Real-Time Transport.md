---
tags: [networking, transport, realtime]
status: seed
---
# RTP & Real-Time Transport

> Thời gian thực đảo ngược ưu tiên: **đúng hạn quan trọng hơn đầy đủ**. Một gói audio đến muộn 300 ms là rác, dù nó hoàn toàn nguyên vẹn.

## 1. Bộ giao thức

| Giao thức | Việc |
|---|---|
| **RTP** (RFC 3550) | Đóng gói media trên UDP: timestamp, sequence number, payload type, SSRC |
| **RTCP** | Kênh điều khiển song song: báo cáo mất gói, jitter, RTT → điều chỉnh bitrate |
| **SRTP** | RTP có mã hoá và xác thực (bắt buộc trong WebRTC) |
| **SDP** | Mô tả phiên: codec, địa chỉ, băng thông |
| **ICE / STUN / TURN** | Xuyên NAT → [[NAT]] |
| **SIP / WebRTC signaling** | Thiết lập cuộc gọi (WebRTC không quy định, tự chọn) |

**WebRTC** = SRTP + ICE + DTLS + codec (Opus, VP8/9, H.264/AV1) + API trình duyệt.

## 2. Nguyên tắc
1. **Jitter buffer**: đệm vài chục–vài trăm ms để làm phẳng độ trễ biến thiên. Đệm lớn = mượt nhưng trễ; đệm nhỏ = tương tác tốt nhưng vấp. Buffer thích nghi là chuẩn.
2. **Ngân sách trễ cho hội thoại**: **<150 ms một chiều là tốt**, 150–400 ms chấp nhận được, >400 ms không nói chuyện được (ITU-T G.114).
3. **Che giấu mất gói** thay vì truyền lại: PLC (packet loss concealment), FEC, redundant audio. Truyền lại chỉ dùng cho video keyframe (NACK) khi RTT rất thấp.
4. **Bitrate thích nghi** dựa trên RTCP feedback + congestion control riêng (**GCC**, và chuẩn hoá dần thành SCReAM/NADA) — không được cạnh tranh bất công với TCP.
5. **Ưu tiên audio hơn video** khi băng thông giảm. Người dùng chịu được hình mờ, không chịu được tiếng vỡ.

## 3. Cạm bẫy hay gặp
- **Đo chất lượng bằng mất gói trung bình** — mất gói theo cụm (burst) mới phá hỏng trải nghiệm. Đo cả burst length và jitter.
- **Không có TURN** → 10–20% người dùng sau symmetric NAT/firewall không kết nối được. TURN tốn băng thông nhưng bắt buộc phải có.
- **Đặt jitter buffer cố định** → hoặc trễ vô ích, hoặc vấp liên tục.
- **Dùng TCP cho media** (khi bị ép fallback) → truyền lại làm trễ tích luỹ, chất lượng tệ hơn nhiều so với mất vài gói.
- **Bỏ qua echo cancellation và AGC** — phần lớn phàn nàn "chất lượng cuộc gọi kém" là xử lý âm thanh, không phải mạng.

## 4. Checklist áp dụng
- [ ] Trễ một chiều đo được là bao nhiêu? Có dưới 150 ms không?
- [ ] Có TURN server ở gần người dùng không? Tỷ lệ phải relay là bao nhiêu?
- [ ] Jitter buffer có thích nghi không?
- [ ] Khi băng thông tụt, hệ thống có hạ video trước audio không?
- [ ] Có thu thập thống kê RTCP/getStats để phân tích sự cố không?
- [ ] DSCP có được đánh dấu cho lưu lượng thoại không? → [[Quality of Service]]

## Tham khảo
- Peterson & Davie — 5.4 Transport for Real-Time (RTP): https://book.systemsapproach.org/e2e/rtp.html
- RFC 3550 — *RTP: A Transport Protocol for Real-Time Applications*: https://www.rfc-editor.org/rfc/rfc3550
- ITU-T G.114 — *One-way transmission time*: https://www.itu.int/rec/T-REC-G.114
- Grigorik — *HPBN* Ch.18 WebRTC: https://hpbn.co/webrtc/

## Liên kết
[[UDP]] · [[Quality of Service]] · [[NAT]] · [[Multimedia & Compression]] · [[Networking]]
