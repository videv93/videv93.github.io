---
tags: [security, web]
status: evergreen
---
# Business Logic Flaws

> ⚠️ **Đọc [[Authorization and Rules of Engagement]] trước.**

> Lỗ hổng mà **không scanner nào tìm được**, vì không có gì "sai" về mặt kỹ thuật — mỗi request hợp lệ, mỗi phản hồi đúng chuẩn. Cái sai nằm ở chỗ *tổ hợp các bước hợp lệ tạo ra một kết quả không được phép*. Đây là kỹ năng phân biệt con người với công cụ.

## 1. Bản chất

Business logic flaw xuất hiện khi ứng dụng giả định người dùng sẽ đi theo một luồng dự kiến, và kẻ tấn công **không đi theo**: bỏ bước, lặp bước, đảo thứ tự, làm song song, dùng giá trị hợp lệ theo cách ngoài dự kiến. Ba thành phần an toàn nối lại vẫn tạo ra hệ thống không an toàn — đây là ví dụ rõ nhất của luận điểm "bảo mật là thuộc tính của hệ thống" trong [[Security Mental Models]].

## 2. Các mẫu điển hình

| Mẫu | Ví dụ cụ thể |
|---|---|
| **Bỏ bước** | Nhảy thẳng tới trang xác nhận thanh toán, bỏ bước trả tiền |
| **Race condition** | Rút tiền/dùng voucher nhiều lần đồng thời trước khi số dư cập nhật (TOCTOU) |
| **Thao túng giá/số lượng** | Số lượng âm → hoàn tiền; sửa giá phía client |
| **Lạm dụng workflow** | Hoàn tiền nhiều lần cho một giao dịch |
| **Giả định trường tin cậy** | Sửa `user_id`, `total`, `discount` trong request |
| **Vượt giới hạn nghiệp vụ** | Áp một mã giảm giá nhiều lần; vượt hạn mức |
| **Lạm dụng chức năng hợp lệ** | Dùng chức năng export để lấy dữ liệu hàng loạt |
| **Đảo thứ tự trạng thái** | Đưa đơn hàng về trạng thái "chưa thanh toán" sau khi đã giao |

## 3. Race condition — đáng một mục riêng

TOCTOU (time-of-check to time-of-use): giữa lúc *kiểm* điều kiện và lúc *dùng* kết quả, có một cửa sổ. Gửi nhiều request song song trong cửa sổ đó → nhiều request cùng vượt qua một lần kiểm.

Kinh điển: số dư 100, rút 100 — gửi 10 request đồng thời, tất cả đọc số dư 100 trước khi bất kỳ cái nào ghi, rút được 1000. Chống bằng khoá (lock), giao dịch nguyên tử, idempotency key. Burp Repeater "send group in parallel" (single-packet attack) là công cụ chuẩn để test.

## 4. Nguyên tắc kiểm thử

1. **Hiểu nghiệp vụ trước khi test.** Không đọc hiểu quy trình kinh doanh thì không thấy được cái gì "không nên xảy ra". Đây là lý do logic flaw không tự động hoá được.
2. **Hỏi "điều gì xảy ra nếu...".** Nếu tôi làm bước này hai lần? Bỏ bước kia? Gửi số âm? Làm đồng thời?
3. **Thử phá giả định về trình tự và tin cậy.** Ứng dụng tin trường nào từ client? Giả định thứ tự nào?
4. **Test race condition trên mọi thao tác liên quan tới số dư/hạn mức.** Voucher, điểm thưởng, số dư, hạn mức rút.
5. **Nghĩ như người lạm dụng, không như kẻ phá hoại.** Nhiều logic flaw là "dùng đúng chức năng theo cách sai" — hoàn tiền thật, voucher thật, chỉ là nhiều lần.

## 5. Cạm bẫy

- **Chạy scanner rồi kết luận "sạch".** Scanner **không thể** tìm logic flaw; sự vắng mặt phát hiện tự động không nói gì.
- **Chỉ test happy path.** Logic flaw sống ở đường không mong đợi.
- **Bỏ qua vì "cần hiểu nghiệp vụ".** Đúng là cần — đó chính là lý do nó có giá trị cao và ít người test.
- **Không test đồng thời.** Race condition vô hình nếu chỉ gửi request tuần tự.
- **Tin kiểm tra phía client.** Giới hạn số lượng, giá, hạn mức ở client là gợi ý UX, không phải kiểm soát.
- **Báo cáo thiếu tác động tiền tệ.** Logic flaw thuyết phục nhất khi quy ra tiền: "lỗi này cho phép mua hàng giá 0đ".

## 6. Checklist áp dụng

- [ ] Tôi đã hiểu quy trình nghiệp vụ đủ để biết cái gì "không nên xảy ra" chưa?
- [ ] Tôi đã thử bỏ bước, lặp bước, đảo thứ tự chưa?
- [ ] Tôi đã thử giá trị biên và bất hợp lý (âm, 0, cực lớn) chưa?
- [ ] Tôi đã test race condition trên thao tác số dư/hạn mức chưa?
- [ ] Tôi đã kiểm ứng dụng tin trường nào từ client chưa?
- [ ] Tôi đã thử lạm dụng chức năng hợp lệ (export, hoàn tiền, voucher) chưa?
- [ ] Báo cáo của tôi có quy tác động ra tiền hoặc rủi ro nghiệp vụ không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Burp Repeater** | Gửi nhóm song song (single-packet attack) cho race condition |
| **Burp Turbo Intruder** | Race condition tốc độ cao, tuỳ biến |
| **Burp Proxy** | Quan sát và sửa từng bước workflow |
| Bộ não | Không thay được — hiểu nghiệp vụ là công cụ chính |

## Tham khảo

- [OWASP — Testing for Business Logic (WSTG)](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/)
- [PortSwigger — Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws)
- [PortSwigger — Race conditions](https://portswigger.net/web-security/race-conditions)
- [OWASP — Business Logic Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html)

## Liên kết

[[Web Attack Surface]] · [[Broken Access Control]] · [[API Security Testing]] · [[Source Code Review for Vulnerabilities]] · [[Security Mental Models]] · [[Security]]
