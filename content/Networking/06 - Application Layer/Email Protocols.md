---
tags: [networking, application, email]
status: seed
---
# Email Protocols

> Hệ thống phân tán lâu đời nhất còn chạy. Kỹ thuật thì đơn giản; **phần khó là deliverability** — làm sao để thư của mình không bị coi là spam.

## 1. Bộ giao thức

| Giao thức | Việc | Cổng |
|---|---|---|
| **SMTP** | Gửi và chuyển tiếp giữa các máy chủ | 25 (MTA↔MTA), **587 (submission, có auth)**, 465 (SMTPS) |
| **IMAP** | Đọc thư, giữ trên server, đồng bộ nhiều thiết bị | 143 / **993 (TLS)** |
| **POP3** | Tải về rồi (thường) xoá trên server | 110 / 995 |
| **MX record** | DNS chỉ ra máy chủ nhận thư | → [[DNS]] |

**Luồng gửi**: MUA → (submission 587) → MTA của mình → (MX lookup, SMTP 25) → MTA đích → MDA → hộp thư.

## 2. Ba trụ cột của deliverability
1. **SPF** (TXT record): liệt kê IP nào được phép gửi thư nhân danh domain. Giới hạn 10 lần lookup DNS.
2. **DKIM**: ký số phần header + body bằng khoá riêng; khoá công khai đặt trong DNS. Chữ ký sống sót qua chuyển tiếp.
3. **DMARC**: chính sách khi SPF/DKIM thất bại (`none` → `quarantine` → `reject`) + báo cáo tổng hợp. **Yêu cầu alignment** giữa domain trong `From:` và domain đã xác thực.

Bổ sung: **MTA-STS** và **DANE** buộc dùng TLS khi chuyển thư; **BIMI** hiển thị logo (yêu cầu DMARC `reject`).

## 3. Nguyên tắc
1. **SMTP là store-and-forward**: thư được nhận trách nhiệm rồi chuyển tiếp; thất bại sinh **bounce** (DSN), có thể chậm hàng giờ.
2. **Mã trả về**: `2xx` thành công, **`4xx` lỗi tạm (sẽ thử lại)**, `5xx` lỗi vĩnh viễn. Greylisting cố tình trả `4xx` lần đầu.
3. **IP gửi cần "warm-up"** và cần reverse DNS (PTR) khớp — thiếu là gần như chắc chắn vào spam.
4. **Tách domain gửi giao dịch và gửi marketing** để một chiến dịch tệ không phá hỏng thư đặt lại mật khẩu.
5. **Cổng 25 outbound thường bị chặn** ở cloud/ISP → dùng dịch vụ gửi thư (SES, SendGrid, Postmark) thay vì tự chạy MTA.

## 4. Cạm bẫy hay gặp
- **SPF vượt 10 lookup** → kết quả `permerror`, coi như không có SPF. Dùng flattening.
- **Dùng `~all` mãi mãi** thay vì siết dần lên `-all`.
- **DMARC alignment sai**: gửi qua dịch vụ bên thứ ba mà không cấu hình DKIM cho domain của mình → pass SPF nhưng fail alignment.
- **Không xử lý bounce và complaint** → tỷ lệ bật lại cao → bị chặn.
- **Tự chạy MTA trên IP cloud mới** → IP nằm trong dải bị nghi ngờ sẵn.
- **Coi email là kênh tin cậy tức thời** — nó có thể chậm nhiều phút và có thể mất; đừng dùng cho luồng quan trọng theo thời gian thực.

## 5. Checklist áp dụng
- [ ] SPF, DKIM, DMARC đã đủ và **aligned** chưa? (kiểm tra bằng mail-tester / Google Postmaster)
- [ ] DMARC đang ở policy nào? Có đọc báo cáo không?
- [ ] PTR record của IP gửi có khớp tên miền không?
- [ ] Bounce/complaint có được xử lý tự động không?
- [ ] Thư giao dịch và marketing có tách subdomain không?
- [ ] Có dùng TLS bắt buộc (MTA-STS) cho domain không?

## Tham khảo
- RFC 5321 — *Simple Mail Transfer Protocol*: https://www.rfc-editor.org/rfc/rfc5321
- RFC 7208 — *SPF*: https://www.rfc-editor.org/rfc/rfc7208
- RFC 6376 — *DKIM*: https://www.rfc-editor.org/rfc/rfc6376
- RFC 7489 — *DMARC*: https://www.rfc-editor.org/rfc/rfc7489
- Google — Email sender guidelines: https://support.google.com/a/answer/81126

## Liên kết
[[DNS]] · [[TLS]] · [[Key Distribution & PKI]] · [[Networking]]
