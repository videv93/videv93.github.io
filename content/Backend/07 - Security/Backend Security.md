---
tags: [backend, security]
status: growing
---
# Backend Security

> Nguyên tắc nền: **mọi input đều là thù địch cho tới khi được chứng minh ngược lại**, và validation ở client là UX chứ không phải bảo mật. Note này đi qua OWASP Top 10 dưới góc nhìn backend.

## 1. OWASP Top 10 (2021) — dịch sang việc phải làm
| # | Rủi ro | Việc cụ thể ở backend |
|---|---|---|
| A01 | **Broken Access Control** | Kiểm tra quyền **trên từng object**, không chỉ trên endpoint → [[Authentication and Authorization]] |
| A02 | Cryptographic Failures | TLS mọi nơi, băm mật khẩu bằng **Argon2id/bcrypt**, không tự viết crypto |
| A03 | **Injection** | Truy vấn tham số hoá; không nối chuỗi SQL/shell/LDAP → [[Database Access and ORM]] |
| A04 | Insecure Design | Threat modeling, rate limit, giới hạn nghiệp vụ (số lần đổi mật khẩu, hạn mức) |
| A05 | Security Misconfiguration | `DEBUG=false`, tắt endpoint quản trị, header bảo mật, không để mặc định |
| A06 | Vulnerable Components | Dependabot/`npm audit`/`bundler-audit`, cập nhật đều đặn |
| A07 | Identification & Auth Failures | Chống brute force, MFA, quản lý session đúng → [[Authentication and Authorization]] |
| A08 | Software & Data Integrity | Ký artifact, lockfile, cẩn thận deserialize dữ liệu không tin cậy |
| A09 | Logging & Monitoring Failures | Log sự kiện bảo mật, alert; không log secret → [[Observability]] |
| A10 | **SSRF** | Chặn URL do người dùng cung cấp trỏ vào mạng nội bộ → [[Webhooks]] |

## 2. Validation ở biên
- **Allowlist, không phải blocklist**: liệt kê field/giá trị được phép, từ chối phần còn lại.
- **Mass assignment**: không bao giờ nhận nguyên body vào model — strong parameters (Rails), serializer/schema (Python/TS). Field như `role`, `is_admin`, `price`, `user_id` phải do server quyết.
- **Giới hạn**: kích thước body, độ dài chuỗi, số phần tử mảng, độ sâu JSON, số file upload.
- Parse **một lần ở biên** thành kiểu domain, rồi tin nó bên trong. → [[Clean Architecture]]

## 3. Injection — bảng đối chiếu
| Loại | ❌ | ✅ |
|---|---|---|
| SQL | `"SELECT * FROM u WHERE id=" + id` | Tham số hoá `WHERE id = $1` |
| SQL — tên cột/bảng động | Nối chuỗi | **Allowlist** tên cột hợp lệ |
| Shell | `os.system("convert " + name)` | `subprocess.run([...], shell=False)` |
| NoSQL | Nhận thẳng object vào query Mongo | Ép kiểu, từ chối operator (`$where`, `$ne`) từ input |
| Template | Render chuỗi người dùng làm template | Truyền làm dữ liệu, không làm template (SSTI) |
| Log | Ghi thẳng input có `\n` | Escape / log dạng JSON |

## 4. Secret & dữ liệu nhạy cảm
- Secret từ **biến môi trường / secret manager**, không nằm trong repo, không nằm trong image. → [[Deployment and Configuration]]
- Có kế hoạch **xoay khoá** và hỗ trợ 2 khoá song song trong giai đoạn chuyển tiếp.
- Mã hoá **at rest** cho dữ liệu nhạy cảm; mã hoá field ở tầng ứng dụng cho dữ liệu rất nhạy cảm.
- **Không bao giờ log**: mật khẩu, token, số thẻ, secret; lọc tự động ở lớp logger.
- Quét secret bị commit nhầm (`gitleaks`, `trufflehog`) trong CI — và coi mọi secret đã từng vào git là **đã lộ**.

## 5. Rate limiting & lạm dụng
| Tầng | Chống |
|---|---|
| Theo IP | Quét, dò |
| Theo tài khoản/API key | Lạm dụng có xác thực |
| Theo endpoint nhạy cảm (login, OTP, reset password) | Brute force — chậm dần theo số lần thử |
| Theo chi phí (GraphQL complexity, kích thước query) | Truy vấn phá hoại → [[GraphQL]] |

Trả `429` kèm `Retry-After`. Thuật toán thường dùng: token bucket / sliding window (Redis). → [[Caching Strategies]]

## 6. Cạm bẫy
- **Phân quyền theo endpoint mà quên theo object** — đổi `id` trong URL là thấy dữ liệu người khác (**IDOR** — lỗ hổng phổ biến nhất).
- **Tin dữ liệu từ client** cho giá tiền, số lượng, quyền.
- **So sánh chữ ký/token bằng `==`** — timing attack; dùng hàm constant-time.
- **CORS `*` kèm credentials** — hiểu nhầm CORS là bảo mật server; nó chỉ là chính sách của trình duyệt.
- **Thông báo lỗi tiết lộ quá nhiều** (stack trace, tên bảng, "email này không tồn tại" → user enumeration).
- **Upload file không kiểm tra** — kiểm tra kiểu thật (magic bytes), giới hạn dung lượng, lưu ngoài web root, **không bao giờ thực thi**.
- **SSRF qua tính năng "nhập URL"** — chặn `169.254.169.254`, dải IP private, và không follow redirect mù quáng.
- **Dependency không cập nhật** — phần lớn sự cố thật đến từ đây, không phải từ code của bạn.

## 7. Checklist review bảo mật
- [ ] Mọi endpoint đều kiểm tra **quyền trên object cụ thể**, không chỉ "đã đăng nhập"?
- [ ] Mọi truy vấn tham số hoá; tên cột/bảng động dùng allowlist?
- [ ] Input có schema validation với allowlist field?
- [ ] Có giới hạn kích thước body, độ sâu JSON, số phần tử mảng?
- [ ] Rate limit cho login/OTP/reset password?
- [ ] Mật khẩu băm bằng Argon2id/bcrypt với cost hợp lý?
- [ ] Secret ngoài repo, có kế hoạch xoay khoá, có quét secret trong CI?
- [ ] Log không chứa secret/PII?
- [ ] Header bảo mật: HSTS, `X-Content-Type-Options`, CSP (nếu trả HTML)?
- [ ] Quét dependency tự động và có quy trình vá?
- [ ] Endpoint nhận URL người dùng có chống SSRF?
- [ ] Thông báo lỗi không tiết lộ nội bộ?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| OWASP ZAP | Quét động ứng dụng web | https://www.zaproxy.org/ |
| Semgrep | Quét mã tĩnh theo rule | https://semgrep.dev/ |
| Brakeman | SAST cho Rails | https://brakemanscanner.org/ |
| gitleaks | Tìm secret trong git | https://github.com/gitleaks/gitleaks |
| Trivy | Quét lỗ hổng image & dependency | https://trivy.dev/ |

## Tham khảo
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP ASVS (tiêu chuẩn kiểm định): https://owasp.org/www-project-application-security-verification-standard/
- OWASP — Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP — SSRF Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
- Mozilla — Web Security Guidelines: https://infosec.mozilla.org/guidelines/web_security

## Liên kết
[[Authentication and Authorization]] · [[REST API Design]] · [[Deployment and Configuration]] · [[Backend]]
