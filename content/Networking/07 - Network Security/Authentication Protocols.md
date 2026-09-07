---
tags: [networking, security, auth]
status: growing
---
# Authentication Protocols

> Xác thực trả lời "bạn là ai", uỷ quyền trả lời "bạn được làm gì". **Trộn lẫn hai câu hỏi này là nguồn của phần lớn lỗ hổng nghiêm trọng.**

## 1. Các giao thức và vai trò thật của chúng

| Giao thức | Thực chất là | Dùng cho |
|---|---|---|
| **Kerberos** | Xác thực bằng ticket, dùng khoá đối xứng + KDC | Mạng doanh nghiệp, AD |
| **OAuth 2.0** | **Uỷ quyền** (delegated authorization) — cấp access token | "Cho app X đọc dữ liệu của tôi ở Y" |
| **OIDC** | Lớp **xác thực** xây trên OAuth 2.0, thêm `id_token` (JWT) | Đăng nhập bằng Google/GitHub |
| **SAML 2.0** | SSO dựa trên XML, assertion có chữ ký | SSO doanh nghiệp cũ |
| **mTLS** | Xác thực bằng chứng chỉ hai chiều | Service-to-service → [[TLS]] |
| **WebAuthn / Passkey** | Khoá công khai gắn với thiết bị, chống phishing | Đăng nhập không mật khẩu |

**OAuth không phải giao thức xác thực.** Dùng access token để "đăng nhập" là lỗ hổng cổ điển — cần `id_token` của OIDC và phải xác minh chữ ký, `aud`, `iss`, `nonce`, thời hạn.

## 2. Nguyên tắc
1. **Chống replay bằng freshness**: nonce, timestamp, hoặc counter. Kerberos dùng timestamp → **đồng hồ lệch >5 phút là hỏng xác thực**.
2. **Luồng OAuth đúng cho từng loại client**: web/mobile/SPA → **Authorization Code + PKCE**. Implicit flow đã bị khai tử. Machine-to-machine → Client Credentials.
3. **Token nên có thời hạn ngắn + refresh token xoay vòng** (rotating refresh token, phát hiện tái sử dụng).
4. **Chỗ lưu token trong trình duyệt**: cookie `HttpOnly; Secure; SameSite=Lax/Strict` an toàn hơn `localStorage` (miễn nhiễm XSS đọc token).
5. **WebAuthn chống phishing về mặt cấu trúc** — khoá gắn với origin, site giả không dùng được. Là nâng cấp thật sự so với TOTP/SMS.
6. **Xác thực ≠ uỷ quyền**: sau khi biết là ai, vẫn phải kiểm tra quyền cho **từng tài nguyên** (chống IDOR).

## 3. Cạm bẫy hay gặp
- **JWT không xác minh chữ ký**, hoặc chấp nhận `alg: none`, hoặc chấp nhận thuật toán do token tự khai (`HS256` với khoá công khai RSA).
- **JWT dùng làm session mà không thu hồi được** — token còn hạn thì vẫn dùng được sau khi đăng xuất/khoá tài khoản. Cần token ngắn hạn + denylist.
- **`redirect_uri` khớp lỏng lẻo** → token bị chuyển sang site của kẻ tấn công. Phải so khớp chính xác.
- **Thiếu `state`/PKCE** → CSRF trên luồng OAuth.
- **SMS OTP** — bị SIM swap; là mức bảo vệ thấp nhất, dùng khi không còn lựa chọn.
- **So sánh token không constant-time** → [[Cryptographic Building Blocks]].
- **Bỏ qua phân quyền theo tài nguyên** — người dùng A đổi ID trên URL và đọc được dữ liệu của B.

## 4. Checklist áp dụng
- [ ] Đang dùng Authorization Code + PKCE chứ không phải implicit?
- [ ] JWT có xác minh chữ ký, `iss`, `aud`, `exp`, và **thuật toán được cố định phía server** không?
- [ ] Token sống bao lâu? Có cơ chế thu hồi không?
- [ ] `redirect_uri` có so khớp chính xác không?
- [ ] Có MFA không? Có hỗ trợ passkey/WebAuthn chưa?
- [ ] Mỗi endpoint có kiểm tra quyền theo tài nguyên, không chỉ theo vai trò?
- [ ] Đồng hồ máy chủ có đồng bộ NTP không?

## Tham khảo
- Peterson & Davie — 8.4 Authentication Protocols: https://book.systemsapproach.org/security/authentication.html
- RFC 6749 / RFC 9700 — *OAuth 2.0* và *Security Best Current Practice*: https://www.rfc-editor.org/rfc/rfc9700
- OpenID Connect Core: https://openid.net/specs/openid-connect-core-1_0.html
- W3C — *Web Authentication (WebAuthn) Level 3*: https://www.w3.org/TR/webauthn-3/
- OWASP — Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

## Liên kết
[[TLS]] · [[Key Distribution & PKI]] · [[Threat Model & Attacks]] · [[Networking]]
