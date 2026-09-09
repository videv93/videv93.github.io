---
tags: [marketing, kênh]
status: evergreen
---
# Email Marketing and Lifecycle

> Email là **kênh sở hữu duy nhất còn thật**: không thuật toán đứng giữa, không nền tảng đổi luật. Đổi lại, nó là kênh có nhiều ràng buộc pháp lý và kỹ thuật nhất — và là kênh dễ tự huỷ nhất.

> [!note] Ranh giới với area khác
> Giao thức SMTP/IMAP và cơ chế kỹ thuật có nhà ở [[Email Protocols]] (Networking). Note này bàn email như **kênh marketing**.

## 1. Deliverability — điều kiện cần

Email không vào được inbox thì mọi thứ khác vô nghĩa. Ba trụ kỹ thuật **bắt buộc**:

| Bản ghi | Việc | Hậu quả nếu thiếu |
|---|---|---|
| **SPF** | Khai máy chủ nào được gửi thay bạn | Bị đánh dấu spam |
| **DKIM** | Ký số nội dung | Bị đánh dấu spam |
| **DMARC** | Chính sách khi SPF/DKIM trượt + báo cáo | **Bị từ chối** — Gmail/Yahoo yêu cầu với người gửi số lượng lớn |

Ngoài kỹ thuật, deliverability phụ thuộc **danh tiếng người gửi**, mà danh tiếng phụ thuộc hành vi người nhận:

- Tỉ lệ spam complaint thấp (ngưỡng thực tế của Gmail: dưới 0,1%; trên 0,3% là vùng nguy hiểm)
- Link huỷ đăng ký **một click** (yêu cầu bắt buộc với người gửi số lượng lớn)
- Danh sách sạch — gửi tới địa chỉ chết làm hỏng danh tiếng

## 2. Vòng đời — nơi email thực sự thắng

Email theo lịch (bản tin) là phần nhỏ. Giá trị nằm ở email **kích hoạt theo hành vi**:

| Giai đoạn | Chuỗi | Việc |
|---|---|---|
| Chào mừng | 3–5 email đầu | Tỉ lệ mở cao nhất — đừng lãng phí |
| Kích hoạt | Theo hành vi trong sản phẩm | Đưa tới khoảnh khắc giá trị đầu tiên |
| Nuôi dưỡng | Theo chủ đề quan tâm | [[Lead Generation and Nurture]] |
| Bỏ giỏ / bỏ dở | Kích hoạt theo sự kiện | ROI cao nhất trong thương mại điện tử |
| Mở rộng | Theo mức dùng | Upsell đúng lúc |
| Giữ chân / cứu vãn | Trước khi rời bỏ | [[Lifecycle and Retention Marketing]] |
| Tái kích hoạt | Không tương tác 90+ ngày | Chạy rồi **dọn khỏi danh sách** |

## 3. Đo lường — cẩn thận với open rate

> [!warning] Open rate đã hỏng từ 2021
> Apple Mail Privacy Protection tải trước pixel theo dõi, làm mọi email gửi tới người dùng Apple Mail hiện là "đã mở". Open rate giờ **không dùng được** làm chỉ số chính hay làm tiêu chí phân nhóm. Xem [[Marketing Tactics Graveyard]].
> Dùng thay thế: **click**, **chuyển đổi**, và **tỉ lệ huỷ/complaint**.

| Chỉ số | Dùng được? |
|---|---|
| Delivery rate | ✅ |
| Click-through rate | ✅ |
| Conversion | ✅ Chỉ số thật |
| Spam complaint | ✅ Cảnh báo sớm |
| Unsubscribe | ✅ |
| Open rate | ⚠️ Chỉ dùng để so tương đối, không tuyệt đối |

## 4. Cạm bẫy

- **Mua danh sách.** Vi phạm pháp luật ở nhiều nơi, phá danh tiếng, và không hiệu quả.
- **Gửi quá nhiều.** Tăng tần suất tăng doanh thu ngắn hạn rồi đốt danh sách.
- **Không dọn danh sách.** Giữ địa chỉ không tương tác làm hỏng deliverability cho cả những người còn quan tâm.
- **Consent gộp chung.** Đồng ý nhận thông báo dịch vụ không phải đồng ý nhận marketing — [[Marketing Privacy and Consent]].
- **Huỷ đăng ký khó.** Vừa vi phạm quy định vừa đẩy người ta bấm "spam" thay vì "unsubscribe" — thiệt hại lớn hơn nhiều.
- **Một email nhiều CTA.** Một email, một hành động.

## 5. Checklist áp dụng

- [ ] SPF, DKIM, DMARC đã cấu hình đúng chưa?
- [ ] Có link huỷ đăng ký **một click** không?
- [ ] Tỉ lệ spam complaint có dưới 0,1% không?
- [ ] Tôi có dọn địa chỉ không tương tác định kỳ không?
- [ ] Consent marketing có tách khỏi consent dịch vụ không?
- [ ] Tôi có đang dùng open rate làm chỉ số chính không? (nếu có → đổi)
- [ ] Chuỗi chào mừng có tồn tại không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Customer.io / Braze | Email theo hành vi, vòng đời | https://customer.io/ |
| Postmark / SendGrid | Gửi giao dịch, deliverability tốt | https://postmarkapp.com/ |
| Google Postmaster Tools | Theo dõi danh tiếng người gửi | https://postmaster.google.com/ |

## Tham khảo

- Google — Email sender guidelines (yêu cầu bắt buộc cho người gửi số lượng lớn) — https://support.google.com/a/answer/81126
- Apple — Mail Privacy Protection — https://support.apple.com/guide/iphone/iph1a2f9b4a0/ios
- M3AAWG — Sender Best Common Practices — https://www.m3aawg.org/published-documents
- EU GDPR & ePrivacy Directive — yêu cầu về consent marketing — https://gdpr.eu/

## Liên kết

[[Lifecycle and Retention Marketing]] · [[Marketing Automation]] · [[Marketing Privacy and Consent]] · [[Community and Owned Audience]] · [[Marketing]]
