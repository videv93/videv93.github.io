---
tags: [security, web]
status: evergreen
---
# Web Attack Surface

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Trước khi học từng lỗ hổng, cần một bản đồ: **lỗi web thực sự nằm ở đâu**. Gần như mọi lỗ hổng web quy về một câu duy nhất — dữ liệu không tin cậy được đối xử như tin cậy được, ở một ranh giới nào đó.

## 1. Mô hình một request và các ranh giới của nó

Một HTTP request đi qua nhiều lớp, mỗi ranh giới là một chỗ lỗi có thể nảy sinh:

| Ranh giới | Dữ liệu vượt qua | Lỗ hổng điển hình |
|---|---|---|
| Trình duyệt → server | Input người dùng | [[Injection Attacks]], [[XSS and Client-Side Attacks]] |
| Xác thực → phiên | Danh tính | Session fixation, JWT giả |
| Phiên → phân quyền | "Được làm gì" | [[Broken Access Control]] |
| Server → backend/DB | Truy vấn | SQLi, [[SSRF and XXE]] |
| Server → dịch vụ nội bộ | Request thay mặt | SSRF |
| Dữ liệu → bộ nhớ chương trình | Object | [[Insecure Deserialization]] |
| Quy trình nghiệp vụ | Trình tự bước | [[Business Logic Flaws]] |
| Client-side | State trong trình duyệt | DOM XSS, prototype pollution |

## 2. Nguyên lý gốc — "confused deputy"

Phần lớn lỗ hổng web là biến thể của một mẫu: một thành phần **có quyền** bị **thuyết phục** dùng quyền đó thay cho kẻ tấn công.

- SSRF: server (có quyền vào mạng nội bộ) bị lừa gửi request thay kẻ tấn công.
- CSRF: trình duyệt (có cookie phiên của nạn nhân) bị lừa gửi request thay kẻ tấn công.
- SQLi: bộ diễn giải SQL (có quyền vào DB) bị lừa chạy truy vấn của kẻ tấn công.

Nhận ra mẫu này giúp bạn tìm lỗ hổng mới thay vì chỉ nhận ra lỗ hổng đã có tên.

## 3. Ba nguyên tắc phòng thủ phủ phần lớn lỗ hổng

| Nguyên tắc | Chống được |
|---|---|
| **Tách dữ liệu khỏi lệnh** (parameterize, không nối chuỗi) | Toàn bộ họ injection |
| **Kiểm quyền ở mỗi request, phía server** | Broken access control |
| **Coi mọi input là thù địch tới khi chứng minh ngược lại** | Gần như mọi thứ còn lại |

> [!note] Vì sao "validate input" không đủ
> Validation ở biên là tốt nhưng giòn: luôn có encoding, có đường vòng, có nguồn input bạn quên. Phòng thủ mạnh là **output encoding đúng ngữ cảnh** và **parameterization** — xử lý dữ liệu an toàn *tại điểm sử dụng*, bất kể nó đến từ đâu. Đây là điểm mấu chốt lặp lại trong mọi note của thư mục này.

## 4. Bản đồ công nghệ hiện đại làm bề mặt tấn công dịch chuyển

| Thay đổi | Bề mặt mới |
|---|---|
| SPA + API tách rời | Logic chuyển ra client; [[API Security Testing]] thành trung tâm |
| GraphQL | Introspection, query lồng nhau, batching abuse |
| Serverless | Event injection, quyền IAM quá rộng |
| Microservices | Tin cậy nội bộ quá mức, SSRF trong mesh |
| WebSockets | Kênh không đi qua kiểm soát HTTP thông thường |
| JWT/OAuth phổ biến | Lỗi xác minh token, luồng OAuth sai |

## 5. Nguyên tắc thực hành

1. **Lập bản đồ ứng dụng trước khi tấn công.** Mọi endpoint, mọi tham số, mọi vai trò. Đây là recon của web — [[Reconnaissance and Enumeration]].
2. **Nghĩ theo ranh giới tin cậy, không theo danh sách OWASP.** OWASP Top 10 là nhận thức; bản đồ ranh giới mới tìm ra lỗ hổng — [[OWASP Top 10 in Practice]].
3. **Dữ liệu client-side không bao giờ đáng tin.** Mọi kiểm tra ở client chỉ là trải nghiệm người dùng; kiểm tra thật phải ở server.
4. **Mỗi tính năng là một cửa.** Chức năng import, export, preview, webhook, tải file — nơi lỗ hổng thú vị nhất ẩn.
5. **Chuỗi lỗ hổng mạnh hơn tổng các phần.** Một lỗi self-XSS + một CSRF = tài khoản bị chiếm. Tư duy chuỗi là kỹ năng lõi của OSWE — [[Source Code Review for Vulnerabilities]].

## 6. Cạm bẫy

- **Chạy scanner rồi coi là xong.** Scanner bắt được injection và cấu hình sai; nó **mù** với [[Broken Access Control]] và [[Business Logic Flaws]] — hai hạng mục hàng đầu.
- **Chỉ test "happy path".** Lỗ hổng nằm ở đường không mong đợi: bỏ bước, gửi thiếu trường, đảo thứ tự.
- **Bỏ qua trạng thái client.** SPA giữ nhiều logic ở client; lỗ hổng có thể nằm trong JavaScript chứ không ở request.
- **Coi HTTPS là bảo mật ứng dụng.** TLS bảo vệ đường truyền, không bảo vệ khỏi lỗi logic — [[TLS]] (Networking) là chủ đề khác.
- **Quên các endpoint không phải HTML.** API, GraphQL, WebSocket, webhook thường ít được bảo vệ hơn giao diện chính.

## 7. Checklist áp dụng

- [ ] Tôi có bản đồ đầy đủ endpoint, tham số và vai trò chưa?
- [ ] Với mỗi input, tôi biết nó vượt ranh giới tin cậy nào không?
- [ ] Tôi đã test các đường không mong đợi, không chỉ happy path chưa?
- [ ] Tôi đã kiểm phân quyền ở phía server cho mỗi hành động nhạy cảm chưa?
- [ ] Tôi có kiểm các endpoint API/GraphQL/WebSocket riêng biệt không?
- [ ] Tôi có đang tìm cơ hội **chuỗi** các lỗ hổng nhỏ không?

## 8. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Suite** | Proxy, repeater, intruder — công cụ trung tâm |
| **OWASP ZAP** | Proxy mã nguồn mở, thay thế Burp miễn phí |
| **ffuf / feroxbuster** | Khám phá nội dung, fuzz tham số |
| **nuclei** | Quét theo template, cộng đồng lớn |
| **Wappalyzer** | Nhận diện công nghệ |
| **katana / gau** | Thu thập endpoint |

## Tham khảo

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — lab miễn phí, tốt nhất hiện có
- [The Web Application Hacker's Handbook (2nd ed.)](https://portswigger.net/web-security/web-application-hackers-handbook)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

## Liên kết

[[OWASP Top 10 in Practice]] · [[Injection Attacks]] · [[Broken Access Control]] · [[API Security Testing]] · [[Source Code Review for Vulnerabilities]] · [[Security]]
