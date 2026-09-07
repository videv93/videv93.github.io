---
tags: [networking, link-layer, reliability]
status: growing
---
# Reliable Transmission

> Ba cơ chế ARQ (Stop-and-Wait → Go-Back-N → Selective Repeat) là **bộ khung tư duy của mọi giao thức tin cậy**, kể cả [[TCP]] và các hệ thống message queue.

## 1. Ba sơ đồ ARQ (Automatic Repeat reQuest)

| Sơ đồ | Cửa sổ gửi | Cửa sổ nhận | Hiệu suất | Đặc điểm |
|---|---|---|---|---|
| **Stop-and-Wait** | 1 | 1 | 1 gói / RTT — rất thấp | Đơn giản; cần số thứ tự 1 bit để chống trùng |
| **Go-Back-N** | N | 1 | Tốt khi ít lỗi | Mất 1 gói → truyền lại toàn bộ từ gói đó |
| **Selective Repeat** | N | N | Tốt nhất | Chỉ truyền lại gói mất; cần buffer ở bên nhận |

**Sliding window** là ý tưởng trung tâm: gửi tối đa N gói chưa được ACK. Để dùng hết đường truyền cần `N ≥ BDP / kích thước gói` → xem [[Bandwidth & Latency]].

## 2. Nguyên tắc
1. **Ba thành phần bắt buộc**: số thứ tự (sequence number), xác nhận (ACK), và bộ đếm giờ (timeout). Thiếu một cái là không tin cậy được.
2. **Số thứ tự phải đủ rộng** để không quấn vòng trong thời gian một gói còn có thể tồn tại trên mạng (MSL). Với Selective Repeat, không gian seq phải ≥ 2× kích thước cửa sổ.
3. **ACK tích luỹ (cumulative)** đơn giản nhưng mất thông tin → TCP thêm **SACK** để báo chính xác lỗ hổng.
4. **Timeout phải thích nghi**, tính từ RTT đo được (EWMA + độ lệch), không phải hằng số.
5. **Retransmit gây nhân đôi** — bên nhận phải khử trùng lặp; ứng dụng phía trên nên **idempotent**.

## 3. Cạm bẫy hay gặp
- **Timeout cố định** (ví dụ 3 s cho mọi môi trường) → hoặc truyền lại quá sớm gây bão gói, hoặc chờ quá lâu.
- **Retry không có backoff và không có jitter** → thundering herd khi sự cố hồi phục.
- **Nhầm "at-least-once" với "exactly-once"**: ARQ chỉ cho at-least-once; exactly-once phải làm ở tầng ứng dụng bằng khoá idempotent → [[RPC & gRPC]].
- **Cửa sổ nhỏ hơn BDP** → throughput bị chặn cứng bất kể băng thông.

## 4. Checklist áp dụng
- [ ] Retry của mình có exponential backoff + jitter chưa?
- [ ] Có giới hạn số lần retry và có circuit breaker không?
- [ ] Thao tác được retry có idempotent không? Khoá idempotency là gì?
- [ ] Cửa sổ / số request in-flight có đủ lớn cho BDP không?
- [ ] Có phân biệt được "timeout" với "lỗi thật" khi ghi log không?

## Tham khảo
- Peterson & Davie — 2.5 Reliable Transmission: https://book.systemsapproach.org/direct/reliable.html
- RFC 6298 — *Computing TCP's Retransmission Timer*: https://www.rfc-editor.org/rfc/rfc6298
- AWS Builders' Library — *Timeouts, retries and backoff with jitter*: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

## Liên kết
[[Error Detection]] · [[TCP]] · [[TCP Congestion Control]] · [[RPC & gRPC]] · [[Networking]]
