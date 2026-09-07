---
tags: [security, web, api]
status: growing
---
# API Security Testing

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> API đổi mô hình đe doạ. Khi logic chuyển từ server-rendered sang SPA + API, bề mặt tấn công dịch từ "trang" sang "endpoint" — và OWASP thấy cần một [API Security Top 10 riêng](https://owasp.org/API-Security/).

## 1. Vì sao API cần danh sách riêng

| Web truyền thống | API-centric |
|---|---|
| Server kiểm quyền khi render trang | Client gọi endpoint trực tiếp; quyền phải ở API |
| Bề mặt = các trang | Bề mặt = mọi endpoint × mọi method × mọi tham số |
| Logic ở server | Nhiều logic lộ ra client (đọc được JS) |
| Ít endpoint | Hàng trăm endpoint, nhiều cái không tài liệu hoá |

Hệ quả: **BOLA (Broken Object Level Authorization)** là hạng mục #1 của API Top 10 — chính là [[Broken Access Control]] ở tầng object của API. Đổi ID trong `/api/orders/{id}` là test đầu tiên phải làm.

## 2. OWASP API Security Top 10 (2023) — điểm chính

| # | Hạng mục | Test cốt lõi |
|---|---|---|
| **API1** | Broken Object Level Authorization (BOLA) | Đổi ID, truy cập object người khác |
| **API2** | Broken Authentication | JWT yếu, token không hết hạn, không rate limit login |
| **API3** | Broken Object Property Level Auth | Mass assignment; trả về trường thừa |
| **API4** | Unrestricted Resource Consumption | Không rate limit, không phân trang → DoS, chi phí |
| **API5** | Broken Function Level Authorization | Gọi endpoint admin bằng token thường |
| **API6** | Unrestricted Access to Sensitive Business Flows | Lạm dụng luồng nghiệp vụ tự động hoá |
| **API7** | SSRF | [[SSRF and XXE]] |
| **API8** | Security Misconfiguration | CORS, header, verbose error |
| **API9** | Improper Inventory Management | Endpoint cũ/version cũ/staging không quản |
| **API10** | Unsafe Consumption of APIs | Tin mù API bên thứ ba |

## 3. JWT — điểm test đặc thù

JWT phổ biến và hay bị cấu hình sai:

| Lỗi | Khai thác |
|---|---|
| `alg: none` | Bỏ chữ ký hoàn toàn |
| Confusion RS256→HS256 | Dùng public key làm khoá HMAC để tự ký |
| Khoá yếu (HS256) | Brute force secret |
| Không kiểm `exp` | Token sống mãi |
| Tin claim không xác minh | Sửa `role`, `user_id` khi chữ ký không được kiểm |
| Không kiểm `kid`/`jku` | Path traversal, SSRF qua header |

Nguyên tắc phòng thủ: xác minh chữ ký **và** thuật toán mong đợi, kiểm hết hạn, không bao giờ tin claim khi chưa xác minh chữ ký — nối với [[Authentication and Authorization]] (Backend).

## 4. GraphQL — bề mặt riêng

| Vấn đề | Ghi chú |
|---|---|
| **Introspection bật** | Lộ toàn bộ schema — tắt ở production |
| **Query lồng sâu** | DoS bằng query đệ quy; cần depth/complexity limit |
| **Batching abuse** | Vượt rate limit bằng nhiều operation trong một request (brute OTP) |
| **BOLA vẫn áp dụng** | Phân quyền phải ở resolver, không ở schema |
| **Field-level auth** | Một số field cần quyền cao hơn query |

## 5. Nguyên tắc

1. **Test mọi endpoint × mọi method.** `GET` bị chặn không có nghĩa `PUT`/`DELETE`/`PATCH` cũng bị.
2. **BOLA trước tiên.** Đổi mọi ID; đây là lỗ hổng API phổ biến và nghiêm trọng nhất.
3. **Tìm endpoint không tài liệu hoá.** Đọc file JS client, so sánh version API, tìm staging — [[Reconnaissance and Enumeration]].
4. **Kiểm rate limit trên mọi thao tác nhạy cảm.** Login, OTP, reset password, thao tác tốn tài nguyên.
5. **Không tin gì từ client.** Trường trong body, header, token — xác minh phía server.
6. **Với JWT: luôn kiểm thuật toán và chữ ký.** Đây là chỗ lỗi cấu hình phổ biến nhất.

## 6. Cạm bẫy

- **Chỉ test qua UI.** UI chỉ gọi một phần endpoint; test API trực tiếp.
- **Bỏ qua endpoint cũ.** `/v1/` vẫn chạy sau khi `/v2/` ra đời, thường ít được vá.
- **Tin introspection tắt là an toàn.** Vẫn đoán được field; tắt introspection là giảm nhiễu, không phải phòng thủ.
- **Quên mass assignment.** API nhận JSON dễ bị gán trường thừa (`isAdmin`) — [[Broken Access Control]].
- **Không test batching/lồng nhau ở GraphQL.** Vector DoS và bypass rate limit đặc thù.
- **Verbose error tiết lộ nội bộ.** Stack trace, tên bảng, phiên bản trong response lỗi.
- **CORS `*` với credentials.** Cấu hình sai làm rò rỉ dữ liệu xuyên origin.

## 7. Checklist áp dụng

- [ ] Tôi đã liệt kê mọi endpoint (kể cả không tài liệu hoá, version cũ) chưa?
- [ ] Tôi đã test BOLA (đổi ID) trên mọi endpoint có object reference chưa?
- [ ] Tôi đã test mọi HTTP method trên endpoint nhạy cảm chưa?
- [ ] Tôi đã kiểm JWT (alg, chữ ký, hết hạn, claim) chưa?
- [ ] Tôi đã test rate limit trên login/OTP/reset chưa?
- [ ] Tôi đã test mass assignment chưa?
- [ ] Với GraphQL: đã kiểm introspection, độ sâu query, batching chưa?
- [ ] CORS và header bảo mật có cấu hình đúng không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Suite** | Trung tâm; Autorize cho BOLA |
| **Postman / Insomnia** | Khám phá và test API thủ công |
| **jwt_tool** | Test lỗ hổng JWT |
| **Kiterunner** | Brute force endpoint API |
| **GraphQL: InQL / graphql-cop** | Test GraphQL chuyên biệt |
| **Schemathesis** | Fuzz API theo OpenAPI spec |

## Tham khảo

- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [OWASP — REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [PortSwigger — API testing](https://portswigger.net/web-security/api-testing) và [JWT attacks](https://portswigger.net/web-security/jwt)
- [OWASP — GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)

## Liên kết

[[Web Attack Surface]] · [[Broken Access Control]] · [[Business Logic Flaws]] · [[SSRF and XXE]] · [[GraphQL]] · [[Authentication and Authorization]] · [[Security]]
