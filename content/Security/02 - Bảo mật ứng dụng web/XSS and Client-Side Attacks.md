---
tags: [security, web]
status: evergreen
---
# XSS and Client-Side Attacks

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> XSS là injection vào ngữ cảnh trình duyệt: code của kẻ tấn công chạy trong phiên của nạn nhân, với mọi quyền mà JavaScript của trang có. Đây là chỗ ranh giới tin cậy client-side bị phá.

## 1. Ba loại XSS

| Loại | Payload sống ở đâu | Kịch bản | Khó bắt |
|---|---|---|---|
| **Reflected** | Trong request, phản chiếu ngay | Gửi link độc cho nạn nhân | Trung bình |
| **Stored** | Lưu ở server (DB, comment) | Nạn nhân chỉ cần xem trang | Nguy hiểm nhất — tự lan |
| **DOM-based** | Hoàn toàn ở client-side JS | Server không thấy payload | Khó nhất — scanner hay bỏ sót |

DOM XSS đặc biệt quan trọng với ứng dụng hiện đại: SPA xử lý dữ liệu trong JavaScript, nên lỗ hổng nằm ở luồng `source → sink` trong client (`location.hash` → `innerHTML`), không đi qua server.

## 2. Tác động thật — vượt xa `alert(1)`

- Đánh cắp session token / cookie (nếu không `HttpOnly`).
- Keylogging, đánh cắp form (kể cả mật khẩu autofill).
- Thực hiện hành động thay nạn nhân (kết hợp CSRF).
- Chiếm tài khoản đầy đủ nếu chuỗi với chức năng đổi email/mật khẩu.
- BeEF-style: biến trình duyệt nạn nhân thành đầu cầu.

> [!note] `alert(1)` chỉ là PoC
> Trong báo cáo, chứng minh **tác động**: đánh cắp được token phiên, thực hiện được hành động đặc quyền. "Có thể chạy `alert`" bị đánh giá thấp; "từ XSS này chiếm được tài khoản admin qua ba bước" mới phản ánh rủi ro thật — nguyên tắc chung của [[Penetration Testing Lifecycle]].

## 3. Phòng thủ — theo tầng

| Biện pháp | Vai trò |
|---|---|
| **Output encoding đúng ngữ cảnh** | Biện pháp chính; encode khác nhau cho HTML body / attribute / JS / URL / CSS |
| **Framework tự động escape** | React, Angular, Vue escape mặc định — nhưng `dangerouslySetInnerHTML`, `v-html`, `bypassSecurityTrust` phá nó |
| **Content Security Policy (CSP)** | Lớp phòng thủ sâu; giảm tác động khi encoding thất bại |
| **`HttpOnly` cookie** | JS không đọc được cookie phiên |
| **Trusted Types** | Chặn DOM XSS ở tầng API trình duyệt |
| **Sanitize HTML (DOMPurify)** | Khi buộc phải render HTML người dùng |

## 4. Các tấn công client-side liên quan

| Tấn công | Cơ chế |
|---|---|
| **CSRF** | Lợi dụng cookie tự động gửi; chống bằng token + SameSite |
| **Prototype pollution** | Ghi vào `Object.prototype` trong JS → đổi hành vi toàn app; có thể dẫn tới XSS/RCE |
| **Clickjacking** | Iframe trong suốt lừa click; chống bằng `X-Frame-Options`/CSP `frame-ancestors` |
| **PostMessage abuse** | Xử lý message xuyên origin không kiểm origin |
| **CORS misconfiguration** | `Access-Control-Allow-Origin` phản chiếu → rò rỉ dữ liệu xuyên origin |
| **Open redirect** | Redirect theo tham số → phishing, chuỗi với OAuth |

## 5. Nguyên tắc

1. **Encode theo ngữ cảnh output, không "sanitize input" chung chung.** Cùng chuỗi an toàn trong HTML body có thể nguy hiểm trong attribute JS.
2. **CSP là phòng thủ sâu, không phải bản vá.** CSP tốt giảm tác động XSS; nó không thay được encoding đúng.
3. **DOM XSS cần đọc JavaScript.** Truy vết `source → sink` trong code client; scanner thường mù.
4. **Framework hiện đại an toàn tới khi bạn phá nó.** Grep các API bypass (`dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `bypassSecurityTrust*`).
5. **`HttpOnly` + `SameSite` là mặc định rẻ.** Chúng cắt hai vector phổ biến nhất gần như miễn phí.

## 6. Cạm bẫy

- **Chỉ test reflected, bỏ DOM.** DOM XSS là loại phổ biến nhất trong SPA và bị bỏ sót nhiều nhất.
- **Tin blacklist `<script>`.** Có vô số vector: `onerror`, `onload`, `javascript:`, SVG, mã hoá thực thể.
- **CSP có nhưng vô dụng.** `unsafe-inline`, `unsafe-eval`, hoặc allow-list quá rộng làm CSP mất tác dụng. Kiểm bằng CSP Evaluator.
- **Bỏ qua CSRF vì "có SameSite".** `SameSite=Lax` không chống mọi trường hợp; token vẫn cần cho hành động nhạy cảm.
- **Sanitize bằng regex tự viết.** Luôn thua; dùng DOMPurify.
- **Bỏ qua prototype pollution.** Ngày càng phổ biến, dẫn tới XSS và cả RCE phía server (Node).

## 7. Checklist áp dụng

- [ ] Tôi đã test cả reflected, stored và **DOM-based** chưa?
- [ ] Output có được encode đúng theo từng ngữ cảnh (HTML/attr/JS/URL) không?
- [ ] Có CSP không, và nó có thực sự chặn (không `unsafe-inline`) không?
- [ ] Cookie phiên có `HttpOnly` và `SameSite` không?
- [ ] Tôi đã grep các API bypass của framework chưa?
- [ ] Hành động nhạy cảm có chống CSRF (token/SameSite) không?
- [ ] Tôi đã kiểm prototype pollution và postMessage/CORS chưa?
- [ ] PoC của tôi có chứng minh **tác động thật**, không chỉ `alert` không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Suite** | Phát hiện, DOM Invader cho DOM XSS |
| **DOMPurify** | Sanitize HTML client-side (phòng thủ) |
| **CSP Evaluator (Google)** | Kiểm CSP có thật sự chặn |
| **XSS Hunter** | Bắt blind/stored XSS out-of-band |
| **BeEF** | Khai thác hậu-XSS (trong scope) |

## Tham khảo

- [OWASP — XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [PortSwigger — Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting)
- [Content Security Policy — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP — CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [PortSwigger — Prototype pollution](https://portswigger.net/web-security/prototype-pollution)

## Liên kết

[[Web Attack Surface]] · [[Injection Attacks]] · [[Broken Access Control]] · [[API Security Testing]] · [[Security]]
