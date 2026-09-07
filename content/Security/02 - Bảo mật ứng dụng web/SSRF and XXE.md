---
tags: [security, web]
status: evergreen
---
# SSRF and XXE

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Hai lỗ hổng gộp chung vì cùng một chủ đề: **biến server thành công cụ của kẻ tấn công**. Server có quyền truy cập mạng nội bộ mà kẻ tấn công không có — SSRF và XXE mượn quyền đó.

## 1. SSRF — Server-Side Request Forgery

OWASP tách SSRF thành hạng mục riêng (A10:2021) sau bình chọn cộng đồng — dấu hiệu nó đủ phổ biến và nguy hiểm để đứng một mình.

**Cơ chế:** ứng dụng nhận URL từ người dùng và tự đi lấy nó (fetch ảnh từ URL, webhook, import từ link, PDF render, SSO metadata). Kẻ tấn công đưa URL trỏ vào **nội bộ**.

| Mục tiêu SSRF | Vì sao nguy hiểm |
|---|---|
| `http://169.254.169.254/` | **Cloud metadata** — lấy credential IAM tạm thời; nguyên nhân của nhiều vụ rò rỉ lớn |
| `http://localhost:port` | Dịch vụ nội bộ không expose ra ngoài (admin panel, Redis, Elasticsearch) |
| Mạng nội bộ `10.x`, `192.168.x` | Quét và tấn công hệ thống sau firewall |
| `file://` | Đọc file cục bộ |
| `gopher://` | Tạo request tuỳ ý tới dịch vụ nội bộ (Redis, SMTP) |

> [!warning] SSRF + cloud metadata là chuỗi đắt nhất
> Trên AWS/GCP/Azure, endpoint metadata trả về credential IAM. SSRF tới đó = lấy quyền của máy chủ trong cloud. IMDSv2 (yêu cầu token) giảm mạnh rủi ro này — kiểm nó có được bật không là một mục [[Cloud Security Posture]].

**Phòng thủ SSRF:**
- Allow-list domain đích, không deny-list.
- Chặn IP nội bộ, loopback, link-local — **sau khi phân giải DNS** (chống DNS rebinding).
- Không theo redirect tới địa chỉ nội bộ.
- Bật IMDSv2; giới hạn quyền IAM của máy chủ (least privilege).
- Tách mạng: máy chủ web không cần vào được mọi thứ nội bộ.

## 2. XXE — XML External Entity

**Cơ chế:** bộ phân tích XML cho phép định nghĩa **external entity** trỏ ra tài nguyên ngoài. Nếu app phân tích XML từ người dùng với cấu hình mặc định (nhiều parser cũ bật sẵn), kẻ tấn công khai báo entity đọc file hoặc gọi URL.

| Biến thể XXE | Kết quả |
|---|---|
| Đọc file | `file:///etc/passwd` → lộ file cục bộ |
| SSRF qua XXE | Entity trỏ URL nội bộ → SSRF |
| Blind/OOB | Ép parser gửi dữ liệu ra ngoài qua DNS/HTTP |
| Billion laughs | DoS bằng entity lồng nhau bùng nổ |

**Phòng thủ XXE:**
- **Tắt external entity và DTD** trong parser — biện pháp chính, gần như luôn là một dòng cấu hình.
- Dùng định dạng đơn giản hơn (JSON) khi không cần XML.
- Cập nhật thư viện parser.

Nơi XXE ẩn: upload file (`.docx`, `.svg`, `.xml` đều là XML), SOAP API, SAML (SSO), feed RSS.

## 3. Nguyên tắc

1. **Bất cứ khi nào server lấy URL do người dùng cung cấp → nghĩ SSRF.** Webhook, import, preview, avatar-from-URL, PDF generator.
2. **Bất cứ khi nào server phân tích XML người dùng gửi → nghĩ XXE.** Kể cả khi "chỉ là file Office".
3. **Allow-list thắng deny-list.** Danh sách chặn IP nội bộ luôn thiếu (IPv6, biểu diễn thập phân, DNS rebinding).
4. **Phân giải DNS rồi mới kiểm.** Kiểm URL trước khi phân giải bị vượt qua bằng domain trỏ về `127.0.0.1`.
5. **Least privilege mạng và IAM giới hạn thiệt hại** khi SSRF thành công.

## 4. Cạm bẫy

- **Chỉ chặn `localhost` và `127.0.0.1`.** Còn `0.0.0.0`, `[::1]`, `2130706433` (dạng thập phân), `127.1`, DNS trỏ nội bộ.
- **DNS rebinding.** URL qua kiểm tra ban đầu (domain public) rồi đổi sang IP nội bộ khi server fetch. Cần kiểm tại thời điểm kết nối.
- **Theo redirect.** App kiểm URL đầu là public rồi theo redirect 302 vào nội bộ.
- **Quên XXE trong file Office/SVG.** Upload ảnh SVG là vector XXE phổ biến bị bỏ qua.
- **Tin parser mặc định an toàn.** Nhiều parser cũ bật external entity mặc định; kiểm phiên bản và cấu hình.
- **Bỏ qua blind SSRF/XXE.** Không thấy phản hồi không có nghĩa không khai thác được — dùng kênh OOB (Burp Collaborator).

## 5. Checklist áp dụng

- [ ] Tôi đã liệt kê mọi chỗ server lấy URL do người dùng cung cấp chưa?
- [ ] Tôi đã thử trỏ tới cloud metadata (`169.254.169.254`) chưa?
- [ ] Tôi đã thử các biểu diễn IP thay thế và DNS rebinding chưa?
- [ ] Tôi đã kiểm SSRF qua redirect chưa?
- [ ] Mọi chỗ phân tích XML (kể cả upload file) đã tắt external entity chưa?
- [ ] Tôi đã test blind SSRF/XXE qua kênh OOB chưa?
- [ ] Máy chủ có bị giới hạn mạng và IAM để giảm blast radius không?
- [ ] IMDSv2 có được bật (nếu trên AWS) không?

## 6. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Collaborator** | Bắt tương tác OOB cho blind SSRF/XXE |
| **Burp Scanner** | Phát hiện SSRF/XXE cơ bản |
| **SSRFmap** | Tự động hoá khai thác SSRF |
| **Gopherus** | Sinh payload gopher:// tấn công dịch vụ nội bộ |
| **PayloadsAllTheThings** | Payload SSRF/XXE theo ngữ cảnh |

## Tham khảo

- [OWASP — SSRF](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)
- [OWASP — SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP — XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html)
- [PortSwigger — SSRF](https://portswigger.net/web-security/ssrf) và [XXE](https://portswigger.net/web-security/xxe)
- [AWS — IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)

## Liên kết

[[Web Attack Surface]] · [[Injection Attacks]] · [[API Security Testing]] · [[Cloud Security Posture]] · [[Security]]
