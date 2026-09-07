---
tags: [security, web]
status: evergreen
---
# Injection Attacks

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Injection = **dữ liệu bị diễn giải thành lệnh**. Nó là một họ, không phải một lỗ hổng: SQL, OS command, LDAP, XPath, template, NoSQL — cùng một nguyên nhân gốc, cùng một cách sửa.

## 1. Họ injection

| Loại | Bộ diễn giải bị lừa | Payload đặc trưng |
|---|---|---|
| **SQL injection** | Engine SQL | `' OR 1=1--`, `UNION SELECT` |
| **Command injection** | Shell HĐH | `; id`, `$(whoami)`, `` `cmd` `` |
| **SSTI** (template) | Template engine | `{{7*7}}`, `${...}` |
| **LDAP injection** | LDAP directory | `*)(uid=*` |
| **NoSQL injection** | MongoDB… | `{"$gt": ""}` |
| **XXE** | Bộ phân tích XML | (xem [[SSRF and XXE]]) |
| **Header/CRLF** | Parser HTTP | `\r\n` chèn header |

## 2. SQL injection — nguyên mẫu của cả họ

| Kỹ thuật | Khi nào dùng | Cách hoạt động |
|---|---|---|
| **In-band (UNION)** | Kết quả hiện trên trang | Ghép truy vấn phụ vào kết quả |
| **Error-based** | Lỗi DB hiện ra | Ép DB tiết lộ dữ liệu qua thông báo lỗi |
| **Blind boolean** | Chỉ khác biệt true/false | Suy ra từng bit qua phản hồi khác nhau |
| **Blind time-based** | Không phản hồi khác biệt | `SLEEP()` — suy ra qua độ trễ |
| **Out-of-band** | Không kênh trực tiếp | Ép DB gửi DNS/HTTP ra ngoài |

Tác động vượt xa đọc dữ liệu: ghi file, đọc file, đôi khi RCE (`xp_cmdshell`, `INTO OUTFILE`). Một SQLi có thể là điểm đầu của [[Post-Exploitation and Lateral Movement]].

## 3. Cách sửa — giống nhau cho cả họ

| Biện pháp | Chống | Ghi chú |
|---|---|---|
| **Parameterized queries / prepared statements** | SQLi | **Biện pháp thật duy nhất**; tách dữ liệu khỏi lệnh về mặt cấu trúc |
| **ORM đúng cách** | SQLi | Nhưng raw query trong ORM vẫn injectable |
| **Tránh gọi shell; nếu phải, dùng API có tham số** | Command injection | Không nối chuỗi vào `system()` |
| **Sandbox template, không render input người dùng** | SSTI | Không truyền input vào template as-code |
| **Allow-list input** | Cả họ | Lớp phòng thủ bổ sung, không thay parameterization |
| **Least privilege cho tài khoản DB** | Giảm blast radius | App không cần quyền DROP/FILE |

> [!warning] Vì sao "escape input" là bẫy
> Tự escape ký tự đặc biệt luôn thua: có nhiều encoding, nhiều context, nhiều trường hợp biên bạn quên. Parameterization thắng vì nó **không escape gì cả** — nó gửi dữ liệu và lệnh qua hai kênh riêng, nên dữ liệu không bao giờ *có cơ hội* được diễn giải thành lệnh. Đây là ứng dụng trực tiếp của "tách dữ liệu khỏi lệnh" trong [[Web Attack Surface]].

## 4. Nguyên tắc

1. **Mọi input là input, kể cả input "nội bộ".** Header, cookie, giá trị từ DB, dữ liệu từ dịch vụ khác — second-order injection là thật.
2. **Parameterize mọi nơi, kể cả khi "chắc chắn an toàn".** Nhất quán rẻ hơn phán đoán từng chỗ.
3. **Blind injection vẫn khai thác được toàn bộ** — chậm hơn, nhưng tự động hoá được. "Không thấy kết quả" không phải phòng thủ.
4. **Least privilege giới hạn thiệt hại.** Tài khoản DB của app không nên đọc được bảng khác app.
5. **Trong code review, tìm nối chuỗi truy vấn.** Kỹ năng OSWE: grep các mẫu ghép chuỗi vào query/command — [[Source Code Review for Vulnerabilities]].

## 5. Cạm bẫy

- **Tin ORM là miễn dịch.** Raw query, `.extra()`, query builder ghép chuỗi vẫn injectable.
- **Chỉ chặn ký tự đơn `'`.** Có injection số, injection trong `ORDER BY`, injection qua tên cột — không phải mọi injection cần dấu nháy.
- **WAF như biện pháp chính.** WAF lọc mẫu; encoding và kỹ thuật mới vượt qua thường xuyên. WAF là lớp bổ sung, không phải bản vá.
- **Bỏ qua NoSQL.** MongoDB injection qua operator (`$gt`, `$ne`) rất phổ biến khi nhận JSON trực tiếp.
- **Bỏ qua SSTI.** Template engine hiện đại (Jinja2, Freemarker, Velocity) cho RCE khi render input — tác động nghiêm trọng, dễ bỏ sót.
- **Command injection ẩn trong thư viện.** Hàm tưởng an toàn có thể gọi shell bên dưới.

## 6. Checklist áp dụng

- [ ] Mọi truy vấn DB có dùng parameterized query không?
- [ ] Có chỗ nào nối input vào lệnh shell không?
- [ ] Có render input người dùng qua template engine không?
- [ ] Tôi đã test cả blind (boolean và time-based) chưa?
- [ ] Tài khoản DB của app có bị giới hạn least privilege không?
- [ ] Có nguồn input gián tiếp (DB, header, dịch vụ khác) nào chưa được xử lý không?
- [ ] Với API JSON: tôi đã test NoSQL operator injection chưa?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **sqlmap** | Tự động hoá SQLi, mọi kỹ thuật — mạnh nhưng ồn |
| **Burp Scanner / Intruder** | Phát hiện và khai thác thủ công |
| **commix** | Tự động hoá command injection |
| **tplmap** | Khai thác SSTI |
| **NoSQLMap** | Injection NoSQL |
| **PayloadsAllTheThings** | Payload theo từng loại injection |

## Tham khảo

- [OWASP — Injection](https://owasp.org/Top10/A03_2021-Injection/)
- [OWASP — SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [PortSwigger — SQL injection](https://portswigger.net/web-security/sql-injection) và [SSTI](https://portswigger.net/web-security/server-side-template-injection)
- [OWASP — OS Command Injection Defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)

## Liên kết

[[Web Attack Surface]] · [[XSS and Client-Side Attacks]] · [[SSRF and XXE]] · [[Source Code Review for Vulnerabilities]] · [[Database Security]] · [[Security]]
