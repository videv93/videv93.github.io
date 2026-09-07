---
tags: [networking, application, http]
status: evergreen
---
# HTTP

> "Narrow waist mới" của Internet — gần như mọi thứ ngày nay đều chạy trên HTTP, kể cả những thứ không nên. Hiểu HTTP là hiểu **trạng thái, cache, và ngữ nghĩa lỗi** của phần lớn hệ thống hiện đại.

## 1. Cấu trúc và ngữ nghĩa

| Thành phần | Điểm cần nhớ |
|---|---|
| **Method** | `GET`/`HEAD` an toàn; `GET`, `PUT`, `DELETE`, `HEAD` **idempotent**; `POST`, `PATCH` thì không |
| **Status** | 2xx thành công · 3xx chuyển hướng · **4xx lỗi client** · **5xx lỗi server** |
| **Header** | Không phân biệt hoa thường; HTTP/2 trở đi viết thường bắt buộc |
| **Body** | `Content-Length` hoặc `Transfer-Encoding: chunked` |

**Status hay dùng sai**: `401` = chưa xác thực (thiếu/sai credential) ≠ `403` = đã biết bạn là ai nhưng không cho phép. `429` = rate limit, **nên kèm `Retry-After`**. `503` = tạm thời, client được phép retry; `500` = lỗi không xác định, retry rủi ro.

## 2. Cache — phần giá trị nhất của HTTP
| Header | Việc |
|---|---|
| `Cache-Control: max-age=N` | thời gian tươi (giây) |
| `s-maxage` | dành riêng cho cache chia sẻ (CDN) |
| `no-cache` | phải revalidate, **không phải** "không cache" |
| `no-store` | thực sự không lưu |
| `stale-while-revalidate` | trả bản cũ, làm mới nền — cải thiện p99 rất tốt |
| `ETag` + `If-None-Match` | revalidate → `304` |
| `Vary` | cache theo header nào (dễ sai: `Vary: *` giết cache) |

**Nguyên tắc**: asset có hash trong tên → `max-age=31536000, immutable`; HTML → `no-cache` + ETag. → [[CDN]]

## 3. Kết nối và hiệu năng
1. **Keep-alive** (mặc định từ HTTP/1.1) tránh bắt tay lặp lại → tránh slow start → [[TCP Congestion Control]].
2. **HTTP/1.1 head-of-line blocking**: một kết nối chỉ xử lý tuần tự → trình duyệt mở ~6 kết nối/host. Giải quyết ở [[HTTP-2 & HTTP-3]].
3. **Nén**: `Accept-Encoding: gzip, br, zstd`. Brotli tốt hơn gzip ~15–20% cho text.
4. **Range request** (`Range`, `206`) cho resume và streaming.

## 4. Cạm bẫy hay gặp
- **Dùng `POST` cho thao tác đọc** → mất khả năng cache và retry an toàn.
- **Trả `200` kèm body báo lỗi** → phá vỡ retry, monitoring, và cache. Dùng đúng status.
- **Không đặt timeout ở client** → treo vô hạn khi server im lặng.
- **Redirect vòng** hoặc redirect từ HTTPS về HTTP (mất `Authorization` header khi đổi origin).
- **Header quá lớn** (cookie phình to) → `431`, hoặc tốn băng thông mỗi request.
- **Tin `X-Forwarded-For` từ client** → giả mạo IP. Chỉ tin phần do proxy của mình thêm vào → [[Load Balancing & Proxy]].
- **Nhầm `no-cache` là không lưu cache** — nó chỉ yêu cầu revalidate.

## 5. Checklist áp dụng
- [ ] Mỗi endpoint đã dùng đúng method theo tính an toàn/idempotent chưa?
- [ ] Chiến lược cache cho HTML và cho asset đã tách bạch chưa?
- [ ] `429` có kèm `Retry-After` không?
- [ ] Client có timeout kết nối **và** timeout đọc riêng không?
- [ ] Nén đã bật cho text và **tắt** cho dữ liệu đã nén (ảnh, video) chưa?
- [ ] Security header đã có chưa: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`?

## Tham khảo
- Peterson & Davie — *Perspective: HTTP is the New Narrow Waist*: https://book.systemsapproach.org/e2e/trend.html
- RFC 9110 — *HTTP Semantics*: https://www.rfc-editor.org/rfc/rfc9110
- RFC 9111 — *HTTP Caching*: https://www.rfc-editor.org/rfc/rfc9111
- MDN — HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- Grigorik — *HPBN* Ch.9–11: https://hpbn.co/brief-history-of-http/

## Liên kết
[[HTTP-2 & HTTP-3]] · [[TLS]] · [[CDN]] · [[Load Balancing & Proxy]] · [[DNS]] · [[Networking]]
