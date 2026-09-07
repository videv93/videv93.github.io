---
tags: [os, security]
status: evergreen
---
# Authentication

> Trả lời câu hỏi **"bạn là ai?"** — bước đứng trước mọi quyết định phân quyền. OS phải ánh xạ một *con người* (hoặc dịch vụ) sang một **principal** (uid, token) mà nó có thể suy luận được.

## 1. Ba yếu tố
| Yếu tố | Nghĩa | Ví dụ | Điểm yếu |
|---|---|---|---|
| **Something you know** | mật khẩu, PIN | password | bị đoán, bị lộ, bị tái sử dụng |
| **Something you have** | khoá, điện thoại, YubiKey | TOTP, FIDO2 | mất thiết bị, SIM swap |
| **Something you are** | vân tay, khuôn mặt | Touch ID | **không đổi được khi lộ**, false accept/reject |

**MFA** = kết hợp từ ≥2 nhóm khác nhau. Mật khẩu + câu hỏi bảo mật **không phải** MFA (cùng nhóm "know").

## 2. Mật khẩu — cách lưu đúng
| Sai | Đúng |
|---|---|
| Lưu plaintext | **Hash chậm có salt** |
| MD5/SHA-1 | **bcrypt, scrypt, Argon2id** (Argon2id là khuyến nghị hiện nay) |
| Cùng một salt | **salt ngẫu nhiên riêng cho mỗi user** |
| So sánh bằng `==` | so sánh **constant-time** |

| Khái niệm | Vai trò |
|---|---|
| **Salt** | chống rainbow table và chống lộ việc hai user cùng mật khẩu |
| **Pepper** | secret toàn cục lưu ngoài DB (HSM/env) — thêm một tầng nếu DB bị lộ |
| **Work factor** | làm hash **chậm có chủ đích**; tăng dần theo phần cứng |

Trên Linux: hash nằm trong `/etc/shadow` (chỉ root đọc được), định dạng `$id$salt$hash` với `$y$` = yescrypt, `$6$` = SHA-512crypt. `/etc/passwd` chỉ còn giữ metadata.

## 3. Cơ chế trong OS
| Cơ chế | Vai trò |
|---|---|
| **PAM** (Pluggable Authentication Modules) | tầng cắm ghép: password, LDAP, 2FA, fingerprint — cấu hình ở `/etc/pam.d/` |
| **SSH key** | khoá công khai — mạnh hơn mật khẩu rất nhiều; nên tắt `PasswordAuthentication` |
| **Kerberos** | ticket, xác thực lẫn nhau, không truyền mật khẩu qua mạng; dùng trong AD và [[Andrew File System]] |
| **TPM / Secure Enclave** | giữ khoá trong phần cứng, không xuất ra được |
| **FIDO2 / WebAuthn / passkey** | khoá gắn với origin → **chống phishing về mặt thiết kế** |

## 4. Từ authentication tới session
Xác thực một lần, rồi dùng **token/session** cho các thao tác sau:
- Token phải có **thời hạn**, phải **thu hồi được**, và phải gắn với ngữ cảnh (thiết bị, IP, scope).
- Trong OS, "token" chính là uid trong PCB của [[Process]] — được kế thừa qua `fork` và `exec`.
- **setuid binary**: chương trình chạy với quyền của chủ file thay vì người gọi (ví dụ `passwd` cần ghi `/etc/shadow`). Cực kỳ nhạy cảm — nguồn của vô số lỗ hổng leo thang đặc quyền. Xu hướng hiện đại: thay bằng **capability** hẹp.

## 5. Cạm bẫy
- **Tự viết hàm hash mật khẩu.** Dùng thư viện đã kiểm chứng.
- **Quy tắc mật khẩu phức tạp bắt buộc đổi 90 ngày** — NIST SP 800-63B **khuyến nghị bỏ**: nó khiến người dùng chọn mật khẩu tệ hơn. Thay bằng: độ dài tối thiểu, kiểm tra danh sách mật khẩu đã lộ, MFA.
- **SMS OTP** — yếu (SIM swap); dùng TOTP hoặc tốt hơn là FIDO2.
- **Thông báo lỗi tiết lộ**: "sai mật khẩu" vs "không có user này" → cho phép dò tài khoản.
- **So sánh token không constant-time** → timing attack.
- **Không giới hạn số lần thử** → brute force. (`fail2ban`, rate limit, exponential backoff)
- **Xác thực nhưng quên phân quyền** — biết bạn là ai không có nghĩa bạn được làm mọi thứ → [[Access Control]].

## 6. Checklist áp dụng
- [ ] Mật khẩu được hash bằng Argon2id/bcrypt với salt riêng chưa?
- [ ] Có MFA cho tài khoản đặc quyền không?
- [ ] SSH đã tắt `PasswordAuthentication` và `PermitRootLogin` chưa?
- [ ] Thông báo lỗi đăng nhập có đồng nhất không?
- [ ] Có rate limit / lockout không? Có log các lần thất bại không?
- [ ] Token/session có thời hạn và có cơ chế thu hồi không?
- [ ] Có setuid binary nào không cần thiết trên hệ thống không? (`find / -perm -4000`)

## Tham khảo
- OSTEP — *Authentication*: https://pages.cs.wisc.edu/~remzi/OSTEP/security-authentication.pdf
- NIST SP 800-63B — Digital Identity Guidelines: https://pages.nist.gov/800-63-3/sp800-63b.html
- OWASP Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- `pam(8)` / Linux-PAM: https://man7.org/linux/man-pages/man8/pam.8.html
- FIDO2 / WebAuthn: https://www.w3.org/TR/webauthn-2/

## Liên kết
[[Access Control]] · [[OS Security Fundamentals]] · [[Cryptography in OS]] · [[Process]] · [[OS]]
