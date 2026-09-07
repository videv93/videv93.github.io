---
tags: [security, nghề-nghiệp, chứng-chỉ]
status: growing
---
# OSWE Preparation Path

> ⚠️ Đọc [[Certification vs Competence]] trước khi cam kết.

> Lộ trình cho OSWE — chứng chỉ web security nâng cao của OffSec. Khác OSCP ở gốc: đây là **white-box**, và nó đòi hỏi lập trình thật. Nội dung mở rộng từ seed CyberJutsu.

## 1. OSWE là gì

Chứng chỉ chuyên sâu về **web application security**, qua khoá **WEB-300**. Thi: **~47h45 khai thác + 24h báo cáo**. Bạn được **mã nguồn** (white-box) và phải **tự viết script khai thác** end-to-end. Triết lý "Work Smarter" — phân tích thông minh mã nguồn, không dò mù.

## 2. OSWE khác OSCP thế nào

| | OSCP | OSWE |
|---|---|---|
| Phương pháp | Black-box | **White-box** (có mã nguồn) |
| Mục tiêu | Hệ thống đa dạng | Chỉ ứng dụng web (Java/.NET/PHP/Node) |
| Kỹ năng lõi | Enum, privesc, AD | **Code review**, logic flaw, chain, viết exploit tự động — [[Source Code Review for Vulnerabilities]] |
| Yêu cầu lập trình | Cơ bản | **Nâng cao** — phải viết exploit phức tạp |
| Độ khó | Cao (rộng) | Rất cao (sâu), gần gấp đôi thời gian |

Cách hiểu (từ seed): OSCP dạy "đập vỡ vỏ ngoài", OSWE dạy "moi lỗi từ bên trong".

## 3. Kiến thức nền cần trước

| Nền | Cụ thể |
|---|---|
| **Lập trình web** | JavaScript, PHP, Java, C# — đọc và viết được |
| **HTTP, auth, session** | Cơ chế sâu — [[Web Attack Surface]] |
| **Database & SQL** | [[Injection Attacks]] |
| **OWASP Top 10** | [[OWASP Top 10 in Practice]] |
| **Đọc và phân tích mã nguồn** | Kỹ năng lõi — [[Source Code Review for Vulnerabilities]] |
| **Viết exploit Python** | Tự động hoá chuỗi tấn công |

> [!warning] OSWE cần lập trình thật (từ seed)
> *"OSWE đòi hỏi kỹ năng lập trình ở mức tốt để đọc hiểu và phân tích mã nguồn... bạn sẽ phải đối mặt với hàng nghìn dòng code và phải viết script để tự động hoá."* Không có nền lập trình, học ít nhất một ngôn ngữ (Python) thành thạo trước khi nghĩ tới OSWE.

## 4. Lộ trình

| Giai đoạn | Nội dung | Tài nguyên |
|---|---|---|
| **1. Lập trình vững** | Python + một ngôn ngữ web server-side | — |
| **2. Web security nền** | OWASP, các lớp lỗ hổng — thư mục `02` | PortSwigger Academy |
| **3. Code review** | Đọc source tìm lỗ hổng — [[Source Code Review for Vulnerabilities]] | Ứng dụng cố ý lỗi, CTF white-box |
| **4. Viết exploit tự động** | Script hoá chuỗi khai thác end-to-end | Tự luyện trên lab |
| **5. WEB-300 chính thức** | Khoá + lab OffSec | OffSec |
| **6. Diễn tập** | Chuỗi lỗ hổng phức tạp, tự động hoá | — |

## 5. Nguyên tắc chuẩn bị

1. **Thành thạo lập trình trước.** Đây là rào cản thật; không qua được nếu không viết code tốt.
2. **Học đọc code theo data flow.** source→sink là kỹ năng lõi — [[Source Code Review for Vulnerabilities]].
3. **Luyện chaining.** OSWE hiếm khi một lỗ hổng đủ; phải xâu chuỗi nhiều lỗi — [[Web Attack Surface]].
4. **Tự động hoá mọi thứ.** Viết được exploit Python chạy toàn chuỗi, không khai thác thủ công.
5. **Nắm sâu vài lớp lỗ hổng.** Deserialization, SSTI, auth bypass, SQLi thứ cấp thường xuất hiện — thư mục `02`.
6. **Nền web pentest trước OSWE.** Seed gợi ý khoá Web Pentest làm bước đệm.

## 6. Checklist sẵn sàng thi

- [ ] Tôi đọc và viết được ít nhất một ngôn ngữ web server-side thành thạo chưa?
- [ ] Tôi viết được exploit Python tự động hoá toàn chuỗi chưa?
- [ ] Tôi đọc source theo data flow (source→sink) được chưa?
- [ ] Tôi xâu chuỗi được nhiều lỗ hổng thành một exploit chưa?
- [ ] Tôi nắm sâu deserialization, SSTI, auth bypass, SQLi thứ cấp chưa?
- [ ] Tôi viết được báo cáo trong thời gian giới hạn chưa?
- [ ] Tôi đã luyện trên ứng dụng white-box thật chưa?

## 7. Tài nguyên

| Tên | Vai trò |
|---|---|
| **PortSwigger Web Security Academy** | Lab web tốt nhất, miễn phí |
| **CyberJutsu Web Pentest 2025** | Bước đệm tiếng Việt (từ seed): SSRF, XXE, deserialization |
| **Ứng dụng cố ý lỗi mã nguồn mở** | Luyện code review thật |
| **OffSec WEB-300** | Khoá chính thức |
| **The Web Application Hacker's Handbook** | Nền web security |

## Tham khảo

- [OffSec — WEB-300 / OSWE](https://www.offsec.com/courses/web-300/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [CyberJutsu — Web Pentest 2025](https://cyberjutsu.io/course/khoa-hoc-web-pentest)
- [The Web Application Hacker's Handbook](https://portswigger.net/web-security/web-application-hackers-handbook)

## Liên kết

[[Security Certification Landscape]] · [[OSCP Preparation Path]] · [[Certification vs Competence]] · [[Source Code Review for Vulnerabilities]] · [[Web Attack Surface]] · [[Security]]
