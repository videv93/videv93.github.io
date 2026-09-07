---
tags: [backend, api, rest]
status: growing
---
# REST API Design

> Chuẩn phổ biến nhất: **resource-oriented**, dựa trên HTTP method (GET, POST, PUT, DELETE) và status code. Sức mạnh của REST không nằm ở kiến trúc mà ở chỗ **mọi người và mọi công cụ đều đã hiểu nó**.

## 1. Quy ước đặt URL
| Nguyên tắc | ❌ | ✅ |
|---|---|---|
| Danh từ số nhiều, không động từ | `/getUser?id=1` | `GET /users/1` |
| Lồng nhau thể hiện quan hệ sở hữu | `/comments?postId=1` | `GET /posts/1/comments` |
| Không lồng quá 2 tầng | `/users/1/posts/2/comments/3` | `GET /comments/3` |
| kebab-case cho path, snake/camel nhất quán cho field | `/userProfiles` | `/user-profiles` |
| Hành động không map được vào CRUD | `POST /createOrderAndPay` | `POST /orders/1/payments` (coi hành động là resource) |
| Filter/sort/paginate bằng query | `/users/active/sorted` | `/users?status=active&sort=-created_at` |

## 2. Method + status code
Bảng đầy đủ về semantics, idempotency và status code: → [[HTTP and Networking]]

Cặp hay dùng:
| Thao tác | Request | Response |
|---|---|---|
| Tạo | `POST /orders` | `201` + header `Location: /orders/42` + body |
| Sửa một phần | `PATCH /orders/42` | `200` + resource mới |
| Xoá | `DELETE /orders/42` | `204` (hoặc `200` nếu trả body) |
| Xoá thứ đã xoá | `DELETE /orders/42` | `204` — **idempotent**, đừng trả 404 |
| Việc chạy lâu | `POST /reports` | `202` + `Location` tới resource trạng thái |

## 3. Phân trang
| Kiểu | Cách làm | Ưu / Nhược |
|---|---|---|
| **Offset** | `?page=3&per_page=20` | Dễ hiểu, nhảy trang được / chậm ở offset lớn, **trùng-sót bản ghi** khi dữ liệu thay đổi |
| **Cursor (keyset)** | `?after=<opaque_cursor>&limit=20` | Ổn định, nhanh ở mọi độ sâu / không nhảy trang được |

Mặc định nên là **cursor** cho collection lớn hoặc thay đổi liên tục. Luôn có `limit` mặc định **và** trần cứng (ví dụ 100).

## 4. Lỗi — dùng một hình dạng duy nhất
Chuẩn hoá theo **RFC 9457 (Problem Details)**:
```json
{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient funds",
  "status": 422,
  "detail": "Số dư 30.000đ không đủ cho giao dịch 50.000đ",
  "instance": "/orders/42",
  "errors": [{"field": "amount", "message": "vượt quá số dư"}],
  "request_id": "01J8..."
}
```
Quy tắc: **status code là sự thật**, body chỉ để giải thích. Không bao giờ trả `200` kèm `{"error": ...}`.

## 5. Những quyết định phải chốt từ đầu
- **Định dạng thời gian**: ISO-8601 UTC (`2026-08-27T10:00:00Z`). Không bao giờ trả timestamp theo giờ local của server.
- **Tiền**: số nguyên đơn vị nhỏ nhất (`amount_minor: 50000`) + `currency`. Không dùng float.
- **ID**: UUIDv7/ULID thay vì auto-increment nếu không muốn lộ số lượng và muốn sinh id ở client.
- **Đặt tên field**: chọn `snake_case` hoặc `camelCase` rồi giữ nguyên mãi mãi.
- **Rate limit**: header `RateLimit-Limit`/`RateLimit-Remaining`/`Retry-After`. → [[Backend Security]]
- **Versioning**: quyết định *trước* khi có client đầu tiên. → [[API Versioning and Contracts]]

## 6. Cạm bẫy
- **Trả về toàn bộ model DB** — lộ field nội bộ và khoá chặt API vào schema. Luôn có lớp serializer/DTO. → [[Clean Architecture]]
- **Không phân trang** — endpoint chạy tốt 6 tháng rồi chết trong một đêm.
- **N+1 khi serialize quan hệ** → [[Database Access and ORM]]
- **Sửa nghĩa của field mà không đổi version** — breaking change im lặng.
- **Cho client truyền field nhạy cảm** (`role`, `is_admin`, `price`) — allowlist field, đừng blocklist.
- **PUT dùng như PATCH** — PUT thiếu field nghĩa là **xoá** field đó.
- **Không có request id trong response lỗi** — hỗ trợ khách hàng thành trò đoán mò. → [[Observability]]

## 7. Checklist review một API mới
- [ ] URL là danh từ, method mang đúng semantics?
- [ ] Mọi collection đều có phân trang với `limit` mặc định và trần?
- [ ] Hình dạng lỗi thống nhất và đúng status code?
- [ ] Endpoint ghi có idempotent hoặc có idempotency key?
- [ ] Có OpenAPI spec sinh tự động, và spec đó được test không? → [[API Versioning and Contracts]]
- [ ] Field trả về là allowlist rõ ràng, không phải dump model?
- [ ] Có rate limit và giới hạn kích thước body?
- [ ] Thời gian ISO-8601 UTC, tiền là số nguyên?
- [ ] Response có `request_id` để truy vết?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| OpenAPI Specification | Mô tả API dạng máy đọc được | https://spec.openapis.org/oas/latest.html |
| Spectral | Lint OpenAPI theo style guide | https://stoplight.io/open-source/spectral |
| Bruno / Insomnia | Client test API, lưu vào git | https://www.usebruno.com/ |
| Schemathesis | Fuzz API từ OpenAPI spec | https://schemathesis.readthedocs.io/ |

## Tham khảo
- RFC 9110 — HTTP Semantics: https://www.rfc-editor.org/rfc/rfc9110.html
- RFC 9457 — Problem Details for HTTP APIs: https://www.rfc-editor.org/rfc/rfc9457.html
- Google — API Design Guide: https://cloud.google.com/apis/design
- Microsoft — REST API Guidelines: https://github.com/microsoft/api-guidelines
- Stripe API Reference (mẫu API tốt để bắt chước): https://docs.stripe.com/api
- Zalando RESTful API Guidelines: https://opensource.zalando.com/restful-api-guidelines/

## Liên kết
[[HTTP and Networking]] · [[GraphQL]] · [[gRPC and Protobuf]] · [[API Versioning and Contracts]] · [[Backend]]
