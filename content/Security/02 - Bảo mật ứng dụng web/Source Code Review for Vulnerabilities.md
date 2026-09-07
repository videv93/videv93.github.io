---
tags: [security, web, appsec]
status: evergreen
---
# Source Code Review for Vulnerabilities

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Kỹ năng lõi của **OSWE** và của mọi AppSec engineer: tìm lỗ hổng bằng cách **đọc code**, không bằng cách thử từ ngoài. White-box thấy được cái black-box không bao giờ thấy — và bỏ sót cái black-box thấy ngay.

## 1. Vì sao đọc code thắng và thua fuzzing

| | Code review (white-box) | Black-box testing |
|---|---|---|
| Thấy | Logic đầy đủ, mọi nhánh, mọi endpoint | Chỉ hành vi quan sát được |
| Mạnh ở | Logic flaw, đường hiếm, deserialization, chuỗi phức tạp | Cấu hình runtime, môi trường thật |
| Yếu ở | Không thấy hành vi runtime/cấu hình triển khai | Không thấy đường code không kích hoạt được từ UI |
| Chi phí | Cao (đọc nhiều code) | Thấp hơn để bắt lỗi bề mặt |

Kết hợp cả hai mạnh nhất; OSWE kiểm tra riêng khả năng white-box vì nó khó dạy và khó tự động hoá.

## 2. Hai chiến lược đọc

| Chiến lược | Cách làm | Khi nào |
|---|---|---|
| **Data flow (theo dấu vết)** | Từ **source** (input người dùng) lần tới **sink** (nơi nguy hiểm) | Tìm injection, XSS, SSRF |
| **Sink-first (ngược)** | Từ hàm nguy hiểm (`exec`, `query`, `unserialize`) lần ngược xem input có tới được không | Nhanh hơn khi biết sink cần tìm |

**Source** điển hình: tham số HTTP, header, cookie, body, upload, dữ liệu từ DB (second-order), message queue.
**Sink** điển hình: query DB, gọi shell, render template, deserialize, thao tác file, redirect, phản hồi HTML.

Lỗ hổng = có đường từ source tới sink **mà không qua một biện pháp làm sạch đầy đủ**. Kỹ năng là đánh giá "biện pháp làm sạch" đó có thật sự đủ không.

## 3. Quy trình review có hệ thống

1. **Hiểu kiến trúc trước.** Framework nào, luồng request đi đâu, xác thực/phân quyền tập trung hay rải rác. Đọc cấu hình routing trước tiên.
2. **Lập bản đồ điểm vào.** Mọi route, mọi endpoint, mọi handler — đây là danh sách source.
3. **Xác định biện pháp bảo mật của framework.** ORM có parameterize không? Template có auto-escape không? Middleware auth ở đâu? Biết mặc định để biết chỗ nào lệch khỏi mặc định.
4. **Grep các sink nguy hiểm**, rồi lần ngược từng cái.
5. **Chú ý chỗ code *bỏ qua* biện pháp mặc định** — `dangerouslySetInnerHTML`, raw query, `unserialize`, `eval`, disable CSRF cho một route.
6. **Đọc phân quyền ở từng endpoint nhạy cảm** — [[Broken Access Control]] không lộ ra khi chỉ nhìn data flow.
7. **Tìm cơ hội chuỗi.** Một self-XSS + một CSRF; một upload + một path traversal.

## 4. Mẫu grep khởi đầu theo ngôn ngữ

| Tìm | Mẫu (ví dụ) |
|---|---|
| SQL injection | Nối chuỗi vào `query(`, `execute(`, `.raw(`, f-string trong SQL |
| Command injection | `exec`, `system`, `popen`, `child_process`, `Runtime.exec` |
| Deserialization | `unserialize`, `pickle.loads`, `ObjectInputStream`, `yaml.load` |
| SSRF | `requests.get(`, `fetch(`, `curl`, `URLConnection` với URL từ input |
| Path traversal | Thao tác file với biến từ input, thiếu chuẩn hoá đường dẫn |
| Secret cứng | `password =`, `api_key`, `SECRET`, khoá private |
| Auth bypass | Route thiếu middleware auth; `if (debug)`; so sánh `==` với token |

Đây là điểm khởi đầu để **thu hẹp**, không phải kết luận — mỗi hit cần đọc ngữ cảnh.

## 5. Nguyên tắc

1. **Hiểu framework là điều kiện tiên quyết.** Không biết Django ORM parameterize sẵn thì báo false positive; không biết chỗ nào phá nó thì bỏ sót lỗ thật.
2. **Đi theo dữ liệu, đừng đọc tuần tự.** Đọc từ trên xuống dưới hết repo là cách chậm nhất. Theo source→sink.
3. **Chỗ nguy hiểm nhất là chỗ lệch khỏi mặc định an toàn.** Framework hiện đại an toàn; lỗ hổng nằm ở nơi lập trình viên cố ý hoặc vô ý vượt qua nó.
4. **Xác nhận bằng khai thác khi có thể.** Code review tìm ứng viên; PoC chứng minh — nối với [[Exploitation Fundamentals]].
5. **Đọc cả dependency cho gadget và lỗ hổng đã biết** — [[Software Supply Chain Attacks]].
6. **Viết exploit tự động là kỹ năng OSWE.** Không chỉ tìm lỗ hổng, mà viết script khai thác toàn chuỗi end-to-end (Python).

## 6. Cạm bẫy

- **SAST như câu trả lời cuối.** SAST tạo nhiều false positive và bỏ sót logic flaw; nó thu hẹp, người xác nhận.
- **Đọc tuần tự toàn bộ.** Không khả thi với codebase lớn; theo data flow.
- **Bỏ qua cấu hình.** Nhiều lỗ hổng nằm trong config (debug mode, CORS, secret), không trong logic.
- **Không hiểu "sanitizer" có đủ không.** Một hàm escape sai ngữ cảnh cho cảm giác an toàn giả.
- **Bỏ qua second-order.** Dữ liệu từ DB (do kẻ tấn công ghi trước đó) là source, dù không đến trực tiếp từ request hiện tại.
- **Tìm lỗ hổng mà không viết được PoC.** Với OSWE, "có thể có lỗ hổng" không đủ — phải khai thác được.

## 7. Checklist áp dụng

- [ ] Tôi đã hiểu framework và các biện pháp mặc định của nó chưa?
- [ ] Tôi đã lập bản đồ mọi điểm vào (route/endpoint) chưa?
- [ ] Tôi đang đi theo data flow source→sink, không đọc tuần tự?
- [ ] Tôi đã grep và lần ngược mọi sink nguy hiểm chưa?
- [ ] Tôi đã tìm chỗ code bỏ qua biện pháp mặc định chưa?
- [ ] Tôi đã đọc phân quyền ở từng endpoint nhạy cảm chưa?
- [ ] Tôi đã kiểm cấu hình (debug, CORS, secret) chưa?
- [ ] Tôi có viết được PoC/exploit tự động cho lỗ hổng tìm thấy không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **Semgrep** | SAST theo rule, nhanh, tùy biến — tốt để thu hẹp |
| **CodeQL** | Truy vấn data flow như query DB; mạnh cho source→sink |
| **grep/ripgrep** | Tìm sink, khởi đầu mọi review |
| **IDE + jump-to-definition** | Lần theo luồng thủ công |
| **gitleaks/trufflehog** | Secret trong code và lịch sử |
| **Burp** | Xác nhận phát hiện bằng khai thác động |

## Tham khảo

- [OWASP — Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [PortSwigger — server-side topics](https://portswigger.net/web-security/all-topics) (nền cho white-box)
- [Semgrep registry](https://semgrep.dev/explore) và [CodeQL docs](https://codeql.github.com/docs/)
- [OffSec WEB-300 syllabus](https://www.offsec.com/courses/web-300/) — phạm vi kỹ năng OSWE

## Liên kết

[[Web Attack Surface]] · [[Injection Attacks]] · [[Insecure Deserialization]] · [[Business Logic Flaws]] · [[OSWE Preparation Path]] · [[Exploitation Fundamentals]] · [[Security]]
