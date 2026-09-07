---
tags: [backend, security, auth]
status: growing
---
# Authentication and Authorization

> **AuthN** = bạn là ai. **AuthZ** = bạn được làm gì. Lỗi AuthN thì lộ liễu và hiếm; lỗi AuthZ thì âm thầm và là lỗ hổng phổ biến nhất trong thực tế (A01 trong OWASP Top 10). → [[Backend Security]]

## 1. Session vs Token
| | **Session (server-side)** | **JWT (stateless)** |
|---|---|---|
| Lưu ở đâu | Server (Redis/DB), client giữ cookie id | Toàn bộ trạng thái nằm trong token |
| Thu hồi ngay lập tức | ✅ Xoá bản ghi là xong | ❌ **Không** — token còn hiệu lực tới khi hết hạn |
| Scale | Cần store dùng chung | Không cần store |
| Kích thước mỗi request | Nhỏ | Lớn hơn (đi kèm mọi request) |
| Rủi ro chính | Store là điểm phụ thuộc | Không thu hồi được, dễ dùng sai |
| Hợp với | Web app truyền thống, cần logout tức thì | Giao tiếp service↔service, API stateless |

> **Mặc định nên chọn session cho ứng dụng web.** JWT bị dùng sai chỗ nhiều hơn bất kỳ công nghệ auth nào — hầu hết hệ thống thật cần khả năng thu hồi.

Mô hình lai phổ biến: **access token ngắn hạn (5–15 phút) + refresh token dài hạn, lưu server và xoay vòng (rotation) có phát hiện tái sử dụng.**

## 2. Cookie cho web
```
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=...
```
- `HttpOnly` — JS không đọc được (chống trộm qua XSS).
- `Secure` — chỉ gửi qua HTTPS.
- `SameSite=Lax` (mặc định tốt) hoặc `Strict`; `None` phải kèm `Secure`.
- **Lưu token trong `localStorage` là sai lầm phổ biến** — XSS lấy được ngay.
- CSRF: với `SameSite=Lax` + kiểm tra `Origin` là đủ cho hầu hết trường hợp; thêm CSRF token cho form nhạy cảm.

## 3. JWT — nếu dùng thì phải đúng
- **Luôn kiểm tra `alg`** theo allowlist ở server; từ chối `none` và không để token quyết định thuật toán.
- Kiểm tra `exp`, `nbf`, **`iss`**, **`aud`** — bỏ qua `aud` nghĩa là token của service khác dùng được ở đây.
- Thời hạn **ngắn**; đừng nhét dữ liệu hay đổi (quyền, tên) vào token — nó sẽ cũ.
- Có `jti` + danh sách thu hồi cho tình huống khẩn cấp.
- Khoá bất đối xứng (RS256/EdDSA) khi nhiều bên xác minh; công bố qua JWKS và hỗ trợ xoay khoá.

## 4. OAuth2 / OIDC — dùng đúng từ
| Khái niệm | Nghĩa |
|---|---|
| **OAuth 2.0** | Uỷ quyền — cho app truy cập tài nguyên thay mặt người dùng (**không** phải để đăng nhập) |
| **OIDC** | Lớp xác thực trên OAuth2 — cái bạn thật sự cần cho "Đăng nhập bằng Google" |
| **Authorization Code + PKCE** | Flow chuẩn duy nhất cho web/mobile/SPA hiện nay |
| **Client Credentials** | Service ↔ service, không có người dùng |
| Implicit / Password grant | **Đã lỗi thời** — đừng dùng |

Nguyên tắc: **đừng tự viết identity provider**. Dùng Keycloak/Auth0/Cognito/Ory hoặc thư viện chuẩn của framework.

## 5. Authorization — mô hình
| Mô hình | Nội dung | Dùng khi |
|---|---|---|
| **RBAC** | Quyền gắn với vai trò | Phần lớn ứng dụng nội bộ |
| **ABAC** | Quyết định theo thuộc tính (phòng ban, giờ, địa điểm) | Quy tắc phức tạp, đa chiều |
| **ReBAC** | Theo quan hệ ("người này là owner của tài liệu kia") | SaaS đa tổ chức, chia sẻ tài nguyên (mô hình Google Zanzibar) |

**Quy tắc sống còn: kiểm tra quyền ở tầng gần dữ liệu nhất** — trong use case hoặc trong truy vấn (`WHERE tenant_id = ?`), không chỉ trong middleware. Middleware bảo vệ endpoint; kẻ tấn công tấn công **object**. → [[Repository Pattern and Service Layer]]

Với hệ multi-tenant: **mọi truy vấn đều phải có `tenant_id`** — cân nhắc bắt buộc hoá bằng default scope/RLS ở tầng DB.

## 6. Cạm bẫy
- **IDOR** — `GET /invoices/1234` không kiểm tra invoice đó thuộc về ai. Lỗ hổng số 1.
- **Kiểm tra quyền ở frontend** — ẩn nút không phải là phân quyền.
- **Chỉ kiểm tra "đã đăng nhập"** cho mọi endpoint.
- **Quyền nằm rải rác** trong controller, service, template → không ai biết quy tắc thật là gì. Tập trung vào một policy layer.
- **JWT không thu hồi được** khi cần khoá tài khoản khẩn cấp.
- **Refresh token không xoay vòng** — bị trộm là dùng vĩnh viễn.
- **User enumeration** — "email không tồn tại" vs "sai mật khẩu"; và thời gian phản hồi khác nhau.
- **Không rate limit đăng nhập/OTP** → brute force.
- **Không invalidate session khi đổi mật khẩu** hoặc khi đổi quyền.
- **Băm mật khẩu bằng MD5/SHA** — dùng Argon2id (hoặc bcrypt) với cost đã đo.

## 7. Checklist
- [ ] Mọi endpoint đọc/ghi tài nguyên có kiểm tra **chủ sở hữu/tenant** không?
- [ ] Kiểm tra quyền có nằm ở tầng use case/truy vấn, không chỉ ở middleware?
- [ ] Đã thử tự đổi id trong URL sang id của người khác chưa? (test tự động cho IDOR)
- [ ] Cookie có `HttpOnly` + `Secure` + `SameSite` không? Token có nằm trong `localStorage` không?
- [ ] JWT có kiểm tra `alg`/`iss`/`aud`/`exp` không?
- [ ] Có đường **thu hồi phiên** ngay lập tức khi khoá tài khoản không?
- [ ] Refresh token có xoay vòng và phát hiện tái sử dụng không?
- [ ] Có rate limit + chống enumeration ở login, đăng ký, reset password?
- [ ] Mật khẩu băm bằng Argon2id/bcrypt với cost phù hợp?
- [ ] Đổi mật khẩu / đổi quyền có huỷ session cũ không?
- [ ] Có log sự kiện bảo mật (đăng nhập thất bại, đổi quyền)? → [[Observability]]

## Tham khảo
- OWASP — Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP — Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- OWASP — JSON Web Token for Java/general guidance: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html
- OAuth 2.0 Security Best Current Practice (RFC 9700): https://www.rfc-editor.org/rfc/rfc9700.html
- OpenID Connect Core: https://openid.net/specs/openid-connect-core-1_0.html
- Google Zanzibar (ReBAC): https://research.google/pubs/pub48190/

## Liên kết
[[Backend Security]] · [[REST API Design]] · [[Repository Pattern and Service Layer]] · [[Backend]]
