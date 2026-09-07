---
tags: [security, nền-tảng, grc]
status: evergreen
---
# Security Risk Management

> Bảo mật không có ngân sách vô hạn, nên mọi quyết định bảo mật thực chất là một quyết định **phân bổ nguồn lực dưới bất định**. Quản lý rủi ro là cách làm việc đó một cách viết ra được và cãi lại được.

## 1. Khái niệm cốt lõi

### Phương trình và giới hạn của nó

```
Rủi ro = Khả năng xảy ra × Tác động
```

Đơn giản, hữu ích, và **sai theo một cách nguy hiểm** nếu dùng máy móc: rủi ro bảo mật có phân phối **đuôi dày**. Một sự cố ransomware có thể vượt tổng chi phí mọi sự cố khác trong mười năm. Tối ưu giá trị kỳ vọng sẽ dẫn tới chi tiêu sai.

Cách sửa: tách hai câu hỏi.

| Câu hỏi | Công cụ | Dùng để |
|---|---|---|
| "Trung bình ta mất bao nhiêu?" | Kỳ vọng, ALE | Quyết định vận hành thường ngày |
| "Cái gì có thể giết công ty?" | Kịch bản đuôi, phân tích tình huống xấu nhất | Quyết định chiến lược, mua bảo hiểm, kế hoạch liên tục |

### Bốn cách xử lý rủi ro

| Cách | Nghĩa là | Ví dụ | Khi nào chọn |
|---|---|---|---|
| **Mitigate** | Giảm khả năng hoặc tác động | Bật MFA, phân vùng mạng | Chi phí biện pháp < mức giảm rủi ro |
| **Transfer** | Chuyển cho bên khác | Bảo hiểm mạng, điều khoản hợp đồng | Tác động lớn, tần suất thấp |
| **Avoid** | Không làm việc đó nữa | Bỏ tính năng, không lưu loại dữ liệu đó | Giá trị kinh doanh không bù nổi rủi ro |
| **Accept** | Ghi nhận và sống chung | Rủi ro tồn dư sau khi đã giảm | **Phải có người ký tên chấp nhận** |

> [!warning] "Accept" chỉ hợp lệ khi có tên người
> Rủi ro được chấp nhận mà không ai ký thì không phải chấp nhận — nó là bỏ qua. Sự khác nhau lộ ra sau sự cố, và lúc đó người ta sẽ đi tìm ai đã biết.

### Định lượng vs định tính

| | Định tính (ma trận Cao/TB/Thấp) | Định lượng (FAIR, Monte Carlo) |
|---|---|---|
| Chi phí làm | Thấp | Cao |
| Ai hiểu được | Ai cũng | Cần giải thích |
| Điểm yếu | **Ma trận rủi ro cộng dồn sai về mặt toán học**; "Cao" của hai người khác nhau | Đầu vào là ước lượng, dễ tạo cảm giác chính xác giả |
| Nên dùng khi | Sàng lọc ban đầu, số lượng lớn | Quyết định lớn, cần so sánh phương án bằng tiền |

**Đường giữa dùng được:** ước lượng bằng **khoảng** với độ tin cậy (`thiệt hại 90% nằm trong khoảng 200 triệu – 8 tỉ`) thay vì bằng nhãn. Nó giữ được sự trung thực về bất định mà vẫn cộng dồn được.

### Risk register — tối thiểu phải có

| Cột | Vì sao |
|---|---|
| ID và mô tả kịch bản | Kịch bản, không phải "thiếu WAF" — phải nói ai làm gì gây hậu quả gì |
| Tài sản bị ảnh hưởng | Nối vào kiểm kê tài sản |
| Khả năng / Tác động | Kèm **lý do**, không chỉ nhãn |
| Biện pháp hiện có | Cái đang thật sự chạy, không phải cái trong policy |
| Rủi ro tồn dư | Sau biện pháp |
| Chủ sở hữu | Một **người**, không phải một phòng ban |
| Quyết định & ngày | Mitigate/transfer/avoid/accept + ai ký |
| Ngày kiểm lại | Rủi ro không có ngày kiểm lại sẽ mục |

## 2. Nguyên tắc

1. **Viết rủi ro dưới dạng kịch bản có tác nhân.** ❌ "Không có EDR." ✅ "Kẻ tấn công có credential nhân viên chạy ransomware trên máy trạm, mã hoá file share, ta mất 3 ngày vận hành." Cái thứ nhất là một khoảng trống; cái thứ hai là một rủi ro.
2. **Rủi ro thuộc về business owner, không thuộc về đội bảo mật.** Đội bảo mật đo và tư vấn; người chịu hậu quả kinh doanh là người quyết định. Nhầm chỗ này là gốc của phần lớn xung đột — xem [[Security Culture]].
3. **Kiểm kê tài sản là điều kiện tiên quyết.** Không thể quản rủi ro cho thứ không biết mình có. Đây cũng là lý do quản lý rủi ro hay thất bại trên thực tế.
4. **Ưu tiên theo bằng chứng khai thác, không theo điểm lý thuyết.** Nối risk register vào KEV và EPSS — xem [[Vulnerability Management]].
5. **Kiểm lại theo lịch, và kiểm lại khi có biến cố.** Ra mắt sản phẩm mới, sáp nhập, đổi nhà cung cấp lớn đều làm risk register lỗi thời ngay lập tức.
6. **Rủi ro tồn dư phải được nói ra bằng ngôn ngữ lãnh đạo hiểu.** Xem [[Security Metrics and Reporting]].

## 3. Cạm bẫy

- **Risk register thành nghĩa vụ giấy tờ.** Dấu hiệu: không mục nào đổi trong 12 tháng, không quyết định ngân sách nào từng trích dẫn nó. Lúc đó nó chỉ là chi phí.
- **Ma trận 5×5 dùng như số học.** Nhân "khả năng 4" với "tác động 3" ra 12 là một phép toán vô nghĩa trên thang thứ tự. Nó vẫn hữu ích để **sắp xếp**, không hữu ích để **cộng** hay **so sánh tỉ lệ**.
- **Đánh giá rủi ro không có threat model.** Không biết ai muốn tấn công mình thì "khả năng" chỉ là cảm giác. Chạy [[Threat Modeling Practice]] trước.
- **Bỏ qua rủi ro tích luỹ.** Mười rủi ro "thấp" chia sẻ cùng một nguyên nhân gốc (ví dụ: không có MFA ở đâu cả) là một rủi ro cao được nguỵ trang.
- **Nhầm rủi ro với sự cố.** Sau khi xảy ra thì nó không còn là rủi ro nữa — chuyển sang [[Security Incident Response]], đừng cập nhật register và coi như đã xử lý.
- **Bảo hiểm mạng coi như đã transfer xong.** Hợp đồng bảo hiểm có loại trừ (act of war, không tuân thủ điều kiện MFA đã cam kết). Đọc loại trừ trước khi tính là đã chuyển rủi ro.
- **Chấp nhận rủi ro bởi người không có thẩm quyền chấp nhận.** Kỹ sư không thể chấp nhận thay công ty.

## 4. Checklist áp dụng

- [ ] Mỗi mục trong register có phải là một **kịch bản** với tác nhân và hậu quả không?
- [ ] Mỗi rủi ro có đúng **một người** đứng tên không?
- [ ] Mọi rủi ro "accepted" có chữ ký và ngày không?
- [ ] Tôi có kiểm kê tài sản đủ để biết register này phủ được bao nhiêu phần trăm không?
- [ ] Có nhóm rủi ro "thấp" nào chung một nguyên nhân gốc không?
- [ ] Mục nào có ngày kiểm lại đã quá hạn?
- [ ] Với ba rủi ro cao nhất: nếu xảy ra hôm nay, ta phát hiện trong bao lâu?
- [ ] Register này có từng được trích dẫn trong một quyết định ngân sách thật chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| **FAIR** | Khung định lượng rủi ro thông tin, chuẩn mở | [fairinstitute.org](https://www.fairinstitute.org/) |
| **NIST SP 800-30** | Hướng dẫn đánh giá rủi ro, chi tiết và miễn phí | [csrc.nist.gov](https://csrc.nist.gov/pubs/sp/800/30/r1/final) |
| **ISO 27005** | Quản lý rủi ro an toàn thông tin, khớp với ISO 27001 | [iso.org](https://www.iso.org/standard/80585.html) |
| **OpenFAIR / risk-modeling bằng Python** | Monte Carlo trên ước lượng khoảng | thư viện `pyfair` |

## Tham khảo

- [NIST SP 800-30 Rev.1 — Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [Douglas Hubbard & Richard Seiersen — *How to Measure Anything in Cybersecurity Risk*](https://www.howtomeasureanything.com/cybersecurity/) — phê phán chi tiết ma trận rủi ro
- [Tony Cox — *What's Wrong with Risk Matrices?* (Risk Analysis, 2008)](https://onlinelibrary.wiley.com/doi/10.1111/j.1539-6924.2008.01030.x)
- [FAIR Institute — FAIR model](https://www.fairinstitute.org/fair-risk-management)

## Liên kết

[[Security Mental Models]] · [[Threat Modeling Practice]] · [[Vulnerability Management]] · [[Security Frameworks Landscape]] · [[Security Metrics and Reporting]] · [[Security]]
