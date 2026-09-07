---
tags: [backend, foundation, network]
status: growing
---
# HTTP and Networking

> Backend nào cũng là một cái máy trả lời HTTP. Hiểu sai semantics của method và status code là nguồn gốc của phần lớn API "khó dùng" và bug retry.

## 1. HTTP method — hai thuộc tính quyết định mọi thứ
| Method | Safe (không đổi state) | Idempotent (gọi n lần = 1 lần) | Dùng cho |
|---|---|---|---|
| `GET` | ✅ | ✅ | Đọc. **Không bao giờ** đổi dữ liệu |
| `HEAD` | ✅ | ✅ | Kiểm tra tồn tại / metadata |
| `POST` | ❌ | ❌ | Tạo mới, hành động không idempotent |
| `PUT` | ❌ | ✅ | Thay thế toàn bộ resource |
| `PATCH` | ❌ | ❌ (trừ khi tự thiết kế cho idempotent) | Sửa một phần |
| `DELETE` | ❌ | ✅ | Xoá |

> **Idempotent là thuộc tính của backend, không phải của tên method.** Proxy và client sẽ tự retry `GET`/`PUT`/`DELETE` — nếu code không idempotent thì đó là bug của bạn. → [[Resilience Patterns]]

## 2. Status code — nhóm nào nói điều gì
| Nhóm | Ý nghĩa | Code hay dùng |
|---|---|---|
| 2xx | Thành công | `200` OK · `201` Created (+ header `Location`) · `202` Accepted (đã nhận, xử lý nền) · `204` No Content |
| 3xx | Chuyển hướng / cache | `301` vĩnh viễn · `304` Not Modified (dùng với ETag) |
| 4xx | **Client sai** — retry y hệt vô nghĩa | `400` body sai · `401` chưa xác thực · `403` đã xác thực nhưng không có quyền · `404` · `409` xung đột · `422` validation · `429` rate limit (+ `Retry-After`) |
| 5xx | **Server sai** — retry có thể có ích | `500` lỗi chưa xử lý · `502`/`504` upstream · `503` quá tải (+ `Retry-After`) |

Nhầm phổ biến nhất: trả `200 {"error": ...}`. Client và monitoring đều mù. → [[REST API Design]]

## 3. Các header phải nắm
- **Content negotiation**: `Content-Type`, `Accept`, `Accept-Encoding` (gzip/br).
- **Cache**: `Cache-Control` (`no-store` cho dữ liệu nhạy cảm), `ETag` + `If-None-Match`, `Last-Modified`. → [[Caching Strategies]]
- **Auth**: `Authorization: Bearer ...`, `WWW-Authenticate`. → [[Authentication and Authorization]]
- **CORS**: `Access-Control-Allow-Origin` — CORS là cơ chế của **trình duyệt**, không phải lớp bảo mật server.
- **Truy vết**: `X-Request-Id` / `traceparent` (W3C Trace Context). → [[Observability]]
- **Proxy**: `X-Forwarded-For`, `X-Forwarded-Proto` — chỉ tin khi proxy của chính bạn set.

## 4. Phiên bản HTTP
| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Transport | TCP | TCP | QUIC (UDP) |
| Đa luồng | 1 request/connection (pipelining thực tế không dùng) | Multiplexing nhiều stream | Multiplexing, không head-of-line blocking ở tầng transport |
| Header | Text | HPACK nén | QPACK nén |
| Đáng chú ý | Vẫn phổ biến giữa proxy ↔ app | Nền tảng của [[gRPC and Protobuf]] | Tốt cho mạng di động, mất gói |

## 5. Vượt ngoài request/response
| Nhu cầu | Công nghệ | Ghi chú |
|---|---|---|
| Server đẩy liên tục 1 chiều | **SSE** (`text/event-stream`) | Đơn giản, tự reconnect, đi qua HTTP thường |
| Hai chiều, độ trễ thấp | **WebSocket** | Stateful → khó scale, cần sticky session hoặc pub/sub |
| Service ↔ service | **gRPC** | → [[gRPC and Protobuf]] |
| Bên thứ ba báo sự kiện | **Webhook** | → [[Webhooks]] |

## 6. Cạm bẫy
- **Không set timeout ở HTTP client** — mặc định của nhiều thư viện là *vô hạn*.
- **Không dùng connection pool / keep-alive** — bắt tay TLS lại mỗi request là chi phí lớn nhất trong nhiều dịch vụ chậm.
- **Trả toàn bộ collection không phân trang** — bom hẹn giờ. → [[REST API Design]]
- **Đặt dữ liệu nhạy cảm vào query string** — nó nằm trong log của mọi proxy trên đường đi.
- **Tin `X-Forwarded-For`** khi không đứng sau proxy tin cậy → giả mạo IP, bypass rate limit.

## 7. Checklist
- [ ] Mọi endpoint có trả đúng status code theo bảng trên không (đặc biệt 401 vs 403, 400 vs 422)?
- [ ] HTTP client có timeout kết nối **và** timeout đọc chưa?
- [ ] Response có `Cache-Control` phù hợp chưa (nhạy cảm → `no-store`)?
- [ ] Có giới hạn kích thước body upload không?
- [ ] `429` có kèm `Retry-After` không?
- [ ] TLS bắt buộc, HSTS bật, redirect HTTP→HTTPS?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `curl` | Chuẩn để debug thủ công, `-v` xem toàn bộ header | https://curl.se/ |
| HTTPie | Cú pháp dễ đọc hơn curl | https://httpie.io/ |
| `mitmproxy` | Xem/sửa traffic giữa client và server | https://mitmproxy.org/ |
| `k6` | Load test bằng script JS | https://k6.io/ |
| Wireshark | Soi tầng TCP/TLS khi HTTP không đủ | https://www.wireshark.org/ |

## Tham khảo
- MDN — HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- RFC 9110 — HTTP Semantics: https://www.rfc-editor.org/rfc/rfc9110.html
- RFC 9111 — HTTP Caching: https://www.rfc-editor.org/rfc/rfc9111.html
- *High Performance Browser Networking* — Ilya Grigorik: https://hpbn.co/
- Cloudflare — HTTP/3 & QUIC: https://blog.cloudflare.com/http3-the-past-present-and-future/

## Liên kết
[[Backend Fundamentals]] · [[REST API Design]] · [[Caching Strategies]] · [[Backend]]
