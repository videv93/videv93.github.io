---
tags: [security, nền-tảng]
status: evergreen
---
# Security Mental Models

> Bảo mật không phải một danh sách kiểm; nó là một tập mô hình tư duy giúp bạn đoán được **kẻ tấn công sẽ đi đường nào** trước khi họ đi.

## 1. Khái niệm cốt lõi

### CIA và cái nó bỏ sót

| Thuộc tính | Câu hỏi | Vi phạm trông như thế nào |
|---|---|---|
| **Confidentiality** | Ai được đọc? | Rò rỉ dữ liệu, [[Broken Access Control]] |
| **Integrity** | Ai được sửa, và ta có biết không? | Sửa bản ghi ngầm, [[Software Supply Chain Attacks]] |
| **Availability** | Hệ thống còn phục vụ được không? | DDoS, [[Ransomware Anatomy]] |

CIA là khởi điểm, không phải đích. Ba thuộc tính hay bị bỏ quên:

- **Authenticity** — thông điệp này *thật sự* từ ai? (chống giả mạo, khác với confidentiality)
- **Non-repudiation** — bên gửi có chối được không? (nền của chữ ký số và của [[Digital Forensics]])
- **Privacy** — có quyền xử lý dữ liệu này không? Khác confidentiality: dữ liệu được bảo vệ hoàn hảo vẫn có thể bị **thu thập trái phép**. Xem [[Privacy and Data Protection]].

### Bảy mô hình dùng hàng ngày

| Mô hình | Nội dung một câu | Hệ quả thực hành |
|---|---|---|
| **Defense in depth** | Không lớp nào được là lớp duy nhất | Giả định mỗi lớp sẽ thủng, hỏi "rồi sao nữa?" |
| **Least privilege** | Quyền tối thiểu, trong thời gian tối thiểu | JIT access; quyền vĩnh viễn là nợ kỹ thuật |
| **Assume breach** | Kẻ địch **đã** ở trong mạng | Đầu tư vào [[Detection Engineering]], không chỉ vào tường |
| **Attack surface** | Mọi đầu vào là một cửa | Xoá tính năng là biện pháp bảo mật rẻ nhất |
| **Blast radius** | Một tài khoản thủng thì mất gì? | Phân vùng, tách môi trường, giới hạn scope token |
| **Fail secure** | Lỗi thì đóng, đừng mở | `catch { return allowed }` là lỗ hổng, không phải bug |
| **Economics of attack** | Kẻ tấn công tối ưu chi phí/lợi ích | Không cần bất khả xâm phạm, cần **đắt hơn phần thưởng** |

### Mô hình kinh tế — cái quyết định phần lớn quyết định

Kẻ tấn công không phải thiên tài toàn năng; họ là **người có ngân sách**. Ba tham số:

```
Kỳ vọng của kẻ tấn công = (Giá trị mục tiêu × Xác suất thành công)
                          - Chi phí tấn công
                          - (Xác suất bị bắt × Hình phạt)
```

Mỗi biện pháp phòng thủ tác động lên đúng một biến. MFA làm giảm *xác suất thành công*. Phân vùng làm giảm *giá trị mục tiêu*. Logging làm tăng *xác suất bị bắt*. Biết mình đang mua biến nào là khác biệt giữa chi tiêu và đầu tư.

> [!warning] Hệ quả khó chịu
> Với **ransomware vận hành như doanh nghiệp** và **APT do nhà nước tài trợ**, số hạng chi phí gần như không giới hạn và hình phạt bằng không. Mô hình kinh tế vẫn đúng nhưng kết luận đổi: chống một APT bằng cách "làm cho đắt hơn" là chiến lược thua. Với nhóm đó, [[Threat Hunting]] và [[Security Incident Response]] mới là biện pháp thật.

## 2. Nguyên tắc

1. **Bảo mật là thuộc tính của hệ thống, không phải của thành phần.** Ba thành phần an toàn nối lại có thể tạo ra một hệ thống không an toàn — đó là toàn bộ nội dung của [[Business Logic Flaws]].
2. **Mọi biện pháp đều có chi phí, phần lớn là chi phí ma sát.** Biện pháp mà người dùng vòng qua được thì có giá trị âm: nó tốn tiền và tạo cảm giác an toàn giả.
3. **Không tự tạo mật mã.** Không phải vì bạn kém, mà vì kiểm chứng mật mã cần hàng chục năm và hàng nghìn người. Xem [[Cryptographic Building Blocks]].
4. **Ưu tiên theo dữ liệu khai thác thật, không theo điểm CVSS.** Xem [[Vulnerability Management]].
5. **Thiết kế cho việc phát hiện, không chỉ cho việc ngăn chặn.** Một hệ thống ngăn được 99% và không thấy được 1% còn lại thì tệ hơn hệ thống ngăn 95% và thấy hết.
6. **Tin cậy là bắc cầu và bạn hiếm khi kiểm được đường đi.** Nhà cung cấp của nhà cung cấp cũng là bề mặt tấn công — [[Third-Party and Supply Chain Risk]].

## 3. Cạm bẫy

- **Nhầm compliance với security.** Đạt ISO 27001 nghĩa là bạn có quy trình được ghi chép, không nghĩa là bạn khó bị hack. Xem [[ISO 27001 and SOC 2]].
- **Bảo vệ trung bình thay vì bảo vệ đuôi.** Rủi ro bảo mật là phân phối đuôi dày: một sự cố có thể vượt tổng mọi sự cố khác cộng lại. Suy nghĩ theo giá trị kỳ vọng sẽ chi tiêu sai. Xem [[Security Risk Management]].
- **Mô hình đe doạ ngầm.** Ai cũng có mô hình đe doạ; phần lớn không viết ra, nên không ai kiểm được nó sai chỗ nào. [[Threat Modeling Practice]] chỉ đơn giản là viết nó ra.
- **Sùng bái 0-day.** Truyền thông nói về 0-day; DBIR năm nào cũng cho thấy phần lớn xâm nhập đến từ **credential bị đánh cắp, phishing và lỗ hổng đã có bản vá**. Xem [[Deprecated Security Practices]].
- **"Bảo mật bằng cách che giấu" bị hiểu sai theo cả hai chiều.** Che giấu **thay cho** biện pháp thật là sai. Che giấu **thêm vào** biện pháp thật thì làm tăng chi phí tấn công — hoàn toàn hợp lệ.
- **Bỏ qua chi phí con người.** Chính sách bắt đổi mật khẩu mỗi 90 ngày là ví dụ kinh điển: nó làm mật khẩu yếu đi. NIST đã bỏ khuyến nghị này từ 2017.

## 4. Checklist áp dụng

- [ ] Tôi có viết ra được mô hình đe doạ của hệ thống này trong 5 câu không?
- [ ] Nếu tài khoản đặc quyền nhất bị chiếm, blast radius là gì?
- [ ] Mỗi biện pháp tôi vừa thêm tác động lên biến nào trong mô hình kinh tế?
- [ ] Có biện pháp nào người dùng đang vòng qua trong thực tế không?
- [ ] Nếu lớp phòng thủ ngoài cùng thủng, tôi **phát hiện** được trong bao lâu?
- [ ] Có đường code nào lỗi thì `allow` không?
- [ ] Tôi đang ưu tiên theo CVSS hay theo bằng chứng khai thác thật?

## Tham khảo

- [NIST SP 800-160 Vol. 1 — Engineering Trustworthy Secure Systems](https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
- [Saltzer & Schroeder — The Protection of Information in Computer Systems (1975)](https://web.mit.edu/Saltzer/www/publications/protection/) — nguồn gốc của least privilege, fail-safe defaults, economy of mechanism
- [Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/) — dữ liệu thật về vector xâm nhập
- [NIST SP 800-63B — Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) — chỗ NIST bỏ chính sách đổi mật khẩu định kỳ

## Liên kết

[[Threat Modeling Practice]] · [[Security Risk Management]] · [[Offense vs Defense Bias]] · [[Zero Trust Architecture]] · [[Security]]
