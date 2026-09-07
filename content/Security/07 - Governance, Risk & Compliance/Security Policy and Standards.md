---
tags: [security, grc]
status: growing
---
# Security Policy and Standards

> Bốn từ bị dùng lẫn lộn — policy, standard, procedure, guideline — và sự lẫn lộn đó khiến tài liệu bảo mật hoặc quá cứng để dùng hoặc quá mềm để thực thi. Note này tách chúng ra.

## 1. Bốn tầng tài liệu

| Tầng | Trả lời | Tính ràng buộc | Đổi tần suất | Ví dụ |
|---|---|---|---|---|
| **Policy** | **Vì sao** + ý định | Bắt buộc | Hiếm (năm) | "Dữ liệu khách hàng phải được bảo vệ" |
| **Standard** | **Cái gì** cụ thể | Bắt buộc | Trung bình | "Mã hoá AES-256; TLS ≥1.2" |
| **Procedure** | **Làm thế nào** từng bước | Bắt buộc | Thường xuyên | "Cách cấp quyền: bước 1..." |
| **Guideline** | **Nên** làm gì | Khuyến nghị | Linh hoạt | "Nên dùng password manager" |

> [!note] Vì sao tách bốn tầng quan trọng
> Trộn chúng tạo tài liệu vô dụng: một policy chứa chi tiết kỹ thuật (`TLS 1.2`) phải sửa mỗi khi công nghệ đổi — nhưng policy nên bền hàng năm. Ngược lại, một standard mơ hồ ("dùng mã hoá mạnh") không thực thi được. Tách tầng cho phép **policy bền + standard cụ thể + procedure chi tiết** cùng tồn tại mà không mâu thuẫn nhịp thay đổi.

## 2. Thuộc tính của tài liệu tốt

| Thuộc tính | Nghĩa là |
|---|---|
| **Có chủ sở hữu** | Một người chịu trách nhiệm cập nhật |
| **Có ngày rà soát** | Tài liệu không rà soát sẽ mục và mất uy tín |
| **Thực thi được** | Nếu không đo/kiểm được tuân thủ, nó là nguyện vọng |
| **Khả thi** | Policy không ai theo được thì bị vòng qua — [[Security Culture]] |
| **Gắn với rủi ro** | Tồn tại vì giảm rủi ro cụ thể, không vì "cần có policy" |
| **Được phê duyệt** | Có thẩm quyền đứng sau để thực thi |

## 3. Nguyên tắc

1. **Policy bền, standard cụ thể, procedure chi tiết.** Đặt chi tiết kỹ thuật vào standard/procedure, không vào policy.
2. **Mỗi tài liệu có chủ và ngày rà soát.** Không có thì nó mục.
3. **Chỉ viết cái thực thi được.** Policy không đo được là nguyện vọng, và làm xói mòn uy tín của mọi policy khác.
4. **Khả thi hơn lý tưởng.** Policy quá nghiêm bị vòng qua, tệ hơn policy vừa phải được tuân thủ.
5. **Gắn với rủi ro và framework.** Ánh xạ policy lên control của [[Security Frameworks Landscape]] để chứng minh mục đích.
6. **Ít mà thực chất hơn nhiều mà hình thức.** Một bộ policy tinh gọn được tuân thủ thắng một thư viện policy không ai đọc.

## 4. Cạm bẫy

- **Trộn tầng.** Policy đầy chi tiết kỹ thuật, phải sửa liên tục.
- **Policy không thực thi được.** "Nhân viên phải cẩn thận" — không đo được, vô dụng.
- **Sao chép template không điều chỉnh.** Policy chung chung không khớp rủi ro thật.
- **Không rà soát.** Policy tham chiếu công nghệ/vai trò đã biến mất.
- **Quá nhiều policy.** Không ai đọc; tuân thủ bằng 0.
- **Policy không ai theo được.** Bị vòng qua; tạo văn hoá coi thường mọi policy.
- **Không có chủ.** Không ai cập nhật, không ai chịu trách nhiệm.

## 5. Checklist áp dụng

- [ ] Tài liệu này đúng tầng (policy/standard/procedure/guideline) chưa?
- [ ] Policy có tránh chi tiết kỹ thuật dễ lỗi thời không?
- [ ] Mỗi tài liệu có chủ sở hữu và ngày rà soát không?
- [ ] Tuân thủ có đo/kiểm được không?
- [ ] Nó có khả thi để tuân thủ trong thực tế không?
- [ ] Nó gắn với một rủi ro/control cụ thể chứ?
- [ ] Bộ tài liệu có đủ tinh gọn để người ta thật sự đọc không?

## Tham khảo

- [SANS Security Policy Templates](https://www.sans.org/information-security-policy/)
- [NIST SP 800-53 — Policy and Procedures controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [ISO 27001 — documentation requirements](https://www.iso.org/standard/27001)
- [CIS Controls — Governance](https://www.cisecurity.org/controls)

## Liên kết

[[Security Frameworks Landscape]] · [[ISO 27001 and SOC 2]] · [[Security Risk Management]] · [[Security Culture]] · [[Security]]
