---
tags: [networking, transport, quic]
status: growing
---
# QUIC

> Transport mới chạy **trên UDP ở user space**, gộp luôn TLS 1.3. Ra đời không phải vì TCP tồi, mà vì **TCP không thể tiến hoá được nữa** — middlebox và kernel khoá cứng nó.

## 1. QUIC giải quyết gì

| Vấn đề của TCP+TLS | Cách QUIC xử lý |
|---|---|
| Bắt tay 2–3 RTT (TCP + TLS) | **1-RTT**, và **0-RTT** khi kết nối lại |
| Head-of-line blocking ở tầng transport | **Stream độc lập** — mất gói chỉ chặn stream đó |
| Đổi IP là đứt kết nối | **Connection ID** — sống sót qua chuyển Wi-Fi ↔ 4G |
| Nâng cấp transport phải chờ kernel | Chạy ở **user space**, deploy theo ứng dụng |
| Middlebox soi và sửa header | **Mã hoá gần như toàn bộ header** |

QUIC là nền của **HTTP/3** → [[HTTP-2 & HTTP-3]].

## 2. Nguyên tắc
1. **Mọi thứ đều được mã hoá và xác thực** — không có QUIC "trần". Bảo mật không phải tuỳ chọn → [[TLS]].
2. **Stream là first-class**: mỗi stream có seq riêng, flow control riêng, cộng thêm flow control cho cả connection.
3. **Congestion control vẫn tương đương TCP** (mặc định CUBIC hoặc BBR) — QUIC không phá luật công bằng → [[TCP Congestion Control]].
4. **0-RTT có rủi ro replay**: chỉ dùng cho request idempotent (GET), không cho POST đổi trạng thái.
5. **Kết nối di chuyển được** nhưng chỉ khi server hỗ trợ migration và đường đi cho phép.

## 3. Cạm bẫy hay gặp
- **UDP bị chặn hoặc bị QoS hạ ưu tiên** ở một số mạng doanh nghiệp → QUIC phải fallback về TCP. Luôn giữ đường TCP hoạt động.
- **CPU cao hơn TCP** — xử lý ở user space, không có offload phần cứng như TCP segmentation offload (dù GSO/GRO cho UDP đang cải thiện).
- **Công cụ chẩn đoán cũ vô dụng**: `tcpdump` không đọc được nội dung; cần **qlog/qvis** và khoá phiên để giải mã.
- **Firewall/LB cũ không hiểu QUIC** — cân bằng tải phải theo Connection ID, không theo 4-tuple.
- **MTU quan trọng hơn**: QUIC không phân mảnh; dùng gói ≤1200B nếu PMTUD không chắc chắn → [[IP Packet & Fragmentation]].

## 4. Checklist áp dụng
- [ ] UDP/443 có mở ở cả hai chiều không?
- [ ] Có fallback TCP khi QUIC không dùng được (Alt-Svc, happy eyeballs) không?
- [ ] 0-RTT có bị dùng cho request không idempotent không?
- [ ] LB có phân tải theo Connection ID để hỗ trợ migration không?
- [ ] Có bật qlog để chẩn đoán khi cần không?
- [ ] Đã đo lợi ích thật (không chỉ giả định) trên profile mạng của người dùng chưa?

## Tham khảo
- RFC 9000 — *QUIC: A UDP-Based Multiplexed and Secure Transport*: https://www.rfc-editor.org/rfc/rfc9000
- RFC 9001 — *Using TLS to Secure QUIC*: https://www.rfc-editor.org/rfc/rfc9001
- RFC 9002 — *QUIC Loss Detection and Congestion Control*: https://www.rfc-editor.org/rfc/rfc9002
- Cloudflare — *The Road to QUIC*: https://blog.cloudflare.com/the-road-to-quic/

## Liên kết
[[TCP]] · [[UDP]] · [[HTTP-2 & HTTP-3]] · [[TLS]] · [[Mobile IP & Mobility]] · [[Networking]]
