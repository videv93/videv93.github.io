---
tags: [backend, api, integration]
status: growing
---
# Webhooks

> Mô hình **push-based**: thay vì bạn hỏi liên tục ("knock, knock, có dữ liệu mới không?"), nguồn tự gọi vào endpoint của bạn khi có sự kiện. Đổi polling lấy độ trễ thấp — và lấy về một loạt vấn đề mới về bảo mật và độ tin cậy.

## 1. Webhook so với các cách khác
| Cách | Độ trễ | Ai chịu tải | Khi nào dùng |
|---|---|---|---|
| **Polling** | = chu kỳ poll | Bạn | Nguồn không hỗ trợ push, tần suất thấp → [[Data Sourcing Design]] |
| **Webhook** | Gần tức thì | Bạn phải luôn sẵn sàng nhận | Sự kiện thưa nhưng cần biết sớm (payment, CI, git push) |
| **Message queue** | Gần tức thì | Broker đệm giúp | Nội bộ, nhiều consumer → [[Event-Driven Architecture]] |
| **SSE/WebSocket** | Tức thì | Kết nối dài | Client là trình duyệt → [[HTTP and Networking]] |

Yêu cầu cốt lõi: **receiver phải luôn sẵn sàng và "hấp thụ" được đỉnh tải**, vì bạn không kiểm soát lúc nào sự kiện tới.

## 2. Khi bạn là bên **nhận** webhook
Mẫu chuẩn — nhận nhanh, xử lý sau:
```
POST /webhooks/stripe
  1. Xác thực chữ ký (HMAC) trên raw body   ← trước khi parse
  2. Kiểm tra timestamp (chống replay)
  3. Ghi event vào DB/queue (idempotent theo event_id)
  4. Trả 200 ngay  ← trong vài trăm ms
  5. Worker xử lý bất đồng bộ  → [[Background Jobs and Queues]]
```
Vì sao không xử lý trực tiếp: nhà cung cấp có timeout ngắn (thường 5–30s); xử lý chậm → họ coi là fail → retry → bạn nhận trùng.

### Bảo mật bắt buộc
- **Xác thực chữ ký HMAC** trên **raw body** (parse JSON rồi serialize lại sẽ đổi byte → sai chữ ký).
- **So sánh chữ ký bằng hàm constant-time** (`hmac.compare_digest`, `crypto.timingSafeEqual`).
- **Kiểm tra timestamp** trong cửa sổ vài phút để chống replay.
- Không dùng "URL bí mật" làm cơ chế xác thực — URL rò rỉ qua log và referrer.
- Allowlist IP nếu nhà cung cấp công bố dải IP (bổ sung, không thay thế chữ ký). → [[Backend Security]]

## 3. Khi bạn là bên **gửi** webhook
- **At-least-once + retry với exponential backoff và jitter**; công bố rõ chính sách retry.
- Payload nên chứa `id`, `type`, `created_at`, và **`data` tối thiểu**; khuyến khích consumer gọi lại API để lấy trạng thái mới nhất (tránh gửi dữ liệu nhạy cảm và dữ liệu cũ).
- **Ký payload** bằng secret riêng cho từng endpoint; hỗ trợ **xoay khoá** (chấp nhận 2 secret trong thời gian chuyển tiếp).
- Cho phép consumer **replay** event từ dashboard/API — thứ họ sẽ cần vào ngày sự cố.
- **Chặn SSRF**: URL do người dùng nhập có thể trỏ vào `169.254.169.254` hay mạng nội bộ → gửi qua egress proxy, chặn dải IP private, không follow redirect mù quáng.
- Vô hiệu hoá endpoint hỏng liên tục (circuit breaker) và báo cho chủ sở hữu. → [[Resilience Patterns]]

## 4. Cạm bẫy
- **Xử lý đồng bộ trong handler** → timeout → nhà cung cấp retry → xử lý trùng.
- **Không idempotent** — nguyên nhân số 1 của "khách bị cộng tiền hai lần". Lưu `event_id` đã xử lý làm khoá chính.
- **Giả định thứ tự** — event `updated` có thể tới trước `created`. Xử lý theo trạng thái, hoặc dùng `created_at`/version để bỏ event cũ.
- **Parse body trước khi verify chữ ký** — mất raw bytes.
- **Trả 500 cho lỗi nghiệp vụ** (dữ liệu không hợp lệ) → nhà cung cấp retry vô ích. Trả `200` rồi đưa vào DLQ nội bộ.
- **Không log event thô** — mất khả năng replay và điều tra.
- **Endpoint webhook nằm sau auth thông thường** — nhà cung cấp không có session của bạn; dùng chữ ký thay vì token người dùng.

## 5. Checklist endpoint nhận webhook
- [ ] Verify HMAC trên raw body, so sánh constant-time?
- [ ] Có kiểm tra timestamp chống replay?
- [ ] Trả `2xx` trong < 1s, xử lý thật đẩy sang queue?
- [ ] Có bảng `processed_webhook_events(event_id PK)` để khử trùng lặp?
- [ ] Có xử lý được event tới **sai thứ tự**?
- [ ] Lỗi nghiệp vụ → không trả 5xx; có DLQ + alert?
- [ ] Event thô được lưu lại để replay/điều tra?
- [ ] Có giới hạn kích thước body và rate limit?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Stripe CLI | Forward webhook về localhost để test | https://docs.stripe.com/stripe-cli |
| ngrok | Public tunnel tới máy dev | https://ngrok.com/ |
| Svix | Dịch vụ gửi webhook (retry, ký, replay) | https://www.svix.com/ |
| webhook.site | Xem payload thô khi debug | https://webhook.site/ |

## Tham khảo
- Stripe — Webhooks best practices: https://docs.stripe.com/webhooks
- GitHub — Securing your webhooks: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
- Standard Webhooks (spec mở): https://www.standardwebhooks.com/
- OWASP — Server Side Request Forgery Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
- Stripe — Idempotent requests: https://docs.stripe.com/api/idempotent_requests

## Liên kết
[[REST API Design]] · [[Background Jobs and Queues]] · [[Data Sourcing Design]] · [[Backend Security]] · [[Backend]]
