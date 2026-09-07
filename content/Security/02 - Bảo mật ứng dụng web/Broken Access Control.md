---
tags: [security, web]
status: evergreen
---
# Broken Access Control

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Hạng mục **số 1** của OWASP Top 10 2021, và hạng mục mà công cụ tự động **gần như không bắt được**. Đây là lý do một AppSec engineer giỏi không thể bị thay bằng một scanner.

## 1. Vì sao access control khác injection

Injection có dấu hiệu cú pháp — scanner nhận ra `' OR 1=1`. Access control là **logic**: request hoàn toàn hợp lệ về cú pháp, chỉ là nó **không nên được phép**. Máy không biết `GET /api/users/1234/invoice` có đúng là hoá đơn của người đang đăng nhập hay không — chỉ ứng dụng biết, và nếu ứng dụng quên kiểm, không gì bắt được.

## 2. Các dạng

| Dạng | Mô tả | Ví dụ |
|---|---|---|
| **IDOR** | Đổi ID tham chiếu trực tiếp tới object của người khác | `?id=123` → `?id=124` |
| **BOLA** | IDOR ở tầng API (Broken Object Level Authorization) | Hạng mục #1 của API Top 10 |
| **Function-level** | Truy cập chức năng ngoài vai trò | User gọi endpoint admin |
| **Vertical** | Leo lên vai trò cao hơn | User → admin |
| **Horizontal** | Truy cập ngang hàng | Xem dữ liệu user khác cùng cấp |
| **Missing function-level AC** | Endpoint admin không kiểm vai trò, chỉ ẩn khỏi UI | "Ẩn nút" ≠ "cấm truy cập" |
| **Mass assignment** | Gán trường không được phép qua body | Thêm `"role":"admin"` vào JSON |
| **Path traversal** | `../` truy cập file ngoài phạm vi | `?file=../../etc/passwd` |

## 3. Nguyên nhân gốc và cách sửa

| Nguyên nhân gốc | Cách sửa |
|---|---|
| Kiểm quyền ở client/UI, không ở server | **Kiểm mọi quyền ở server, mỗi request** |
| Tin ID từ client | Suy ra quyền từ **session**, không từ tham số |
| Deny-list (chặn cái xấu) | **Allow-list**: mặc định từ chối, cho phép tường minh |
| Kiểm xác thực, quên phân quyền | Xác thực (bạn là ai) ≠ phân quyền (bạn được làm gì) |
| Logic phân quyền rải rác | Tập trung hoá quyết định phân quyền |

> [!warning] "Deny by default" là nguyên tắc quan trọng nhất
> Access control an toàn khi mọi tài nguyên **mặc định bị từ chối** và quyền được cấp tường minh. Hệ thống deny-list (chặn từng thứ xấu đã biết) luôn có lỗ hổng ở cái chưa nghĩ tới. Đây là "fail secure" của [[Security Mental Models]] áp vào tầng ứng dụng.

## 4. Nguyên tắc kiểm thử

1. **Test với nhiều tài khoản, nhiều vai trò.** Đăng nhập user A, thử truy cập tài nguyên của user B. Cần ít nhất hai tài khoản mỗi cấp.
2. **Đổi mọi ID và quan sát.** Số tăng dần, UUID trong response, ID trong JWT — thử thay.
3. **Truy cập endpoint đặc quyền bằng tài khoản thường.** UI ẩn nút admin không có nghĩa server chặn request.
4. **Test mass assignment.** Thêm trường vào request body (`isAdmin`, `role`, `verified`) và xem có được nhận không.
5. **Bỏ qua UI, gọi API trực tiếp.** Access control thật phải ở API, không ở giao diện.
6. **Kiểm cả method.** Endpoint chặn `GET` có thể quên chặn `PUT`/`DELETE`.

## 5. Cạm bẫy

- **Tin scanner báo "không có lỗ hổng access control".** Scanner không biết object nào thuộc ai; nó gần như luôn bỏ sót hạng mục này.
- **Chỉ test một tài khoản.** Không phát hiện được IDOR nếu không có tài khoản thứ hai để so.
- **UUID coi là an toàn.** UUID khó đoán nhưng vẫn rò rỉ (trong response khác, log, URL chia sẻ). Khó đoán ≠ được phân quyền.
- **Kiểm quyền một lần, cache mãi.** Quyền đổi giữa phiên; kiểm mỗi request nhạy cảm.
- **Quên endpoint mới.** Access control hay đúng ở endpoint cũ, thiếu ở endpoint mới thêm — cần quy trình, không chỉ kiểm thử một lần.
- **JWT tin claim không xác minh.** `role` trong JWT phải được server xác minh chữ ký và không tin mù — xem [[API Security Testing]].

## 6. Checklist áp dụng

- [ ] Tôi có ít nhất hai tài khoản mỗi cấp vai trò để test không?
- [ ] Tôi đã thử truy cập tài nguyên của user khác bằng cách đổi ID chưa?
- [ ] Tôi đã gọi endpoint đặc quyền bằng tài khoản thường chưa?
- [ ] Tôi đã test mass assignment (thêm trường trái phép) chưa?
- [ ] Tôi đã test các HTTP method khác nhau trên cùng endpoint chưa?
- [ ] Quyền có được kiểm ở **server, mỗi request** không?
- [ ] Hệ thống có "deny by default" không?
- [ ] JWT claim về vai trò có được xác minh chữ ký, không tin mù không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Suite** | Autorize / AutoRepeater — so quyền giữa tài khoản tự động |
| **Burp Repeater** | Thay ID, đổi method thủ công |
| **Param Miner** | Tìm tham số ẩn cho mass assignment |
| **ffuf** | Fuzz ID, endpoint |

## Tham khảo

- [OWASP — Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP — Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [PortSwigger — Access control vulnerabilities](https://portswigger.net/web-security/access-control)
- [OWASP API Security Top 10 — BOLA](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/)

## Liên kết

[[Web Attack Surface]] · [[API Security Testing]] · [[Business Logic Flaws]] · [[Authentication and Authorization]] · [[Privilege Escalation]] · [[Security]]
