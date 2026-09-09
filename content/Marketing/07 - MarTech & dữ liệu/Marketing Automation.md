---
tags: [marketing, martech]
status: growing
---
# Marketing Automation

> Tự động hoá khuếch đại quy trình bạn đang có. Quy trình tốt được khuếch đại thành kết quả tốt; quy trình tệ được khuếch đại thành spam ở quy mô — nhanh hơn và khó phát hiện hơn.

## 1. Các loại luồng

| Loại | Kích hoạt | Ví dụ | Rủi ro |
|---|---|---|---|
| **Theo thời gian** | Lịch cố định | Bản tin hằng tuần | Không liên quan tới hành vi |
| **Theo hành vi** ✅ | Hành động của người dùng | Bỏ giỏ hàng, dùng tính năng lần đầu | Cần dữ liệu sự kiện sạch |
| **Theo thuộc tính** | Dữ liệu hồ sơ đổi | Đổi gói, đổi vai trò | Phụ thuộc chất lượng CRM |
| **Theo mô hình** | Điểm số dự đoán | Nguy cơ rời bỏ | Hộp đen, cần kiểm chứng |

Luồng theo hành vi cho kết quả tốt hơn hẳn theo thời gian — nhưng chỉ khi tầng dữ liệu sự kiện đáng tin ([[Marketing Analytics Stack]]).

## 2. Nguyên tắc thiết kế

1. **Bắt đầu từ bản đồ vòng đời, không từ công cụ.** [[Lifecycle and Retention Marketing]]
2. **Một luồng, một mục tiêu.** Luồng cố làm ba việc không làm tốt việc nào.
3. **Quy tắc loại trừ trước khi bật.** Ai **không** được nhận: khách vừa mua, khách đang có ticket hỗ trợ mở, khách đã nhận luồng khác tuần này.
4. **Trần tần suất toàn cục.** Tổng số email một người có thể nhận trong 7 ngày, áp dụng xuyên mọi luồng. Thiếu cái này là nguyên nhân số một của việc đốt danh sách.
5. **Có lối ra.** Người đã làm việc bạn muốn phải thoát khỏi luồng ngay.
6. **Ngày hết hạn cho mọi luồng.** Rà lại theo quý; luồng "chạy tự động" từ 2 năm trước vẫn đang gửi nội dung sai.
7. **Kiểm bằng holdout.** Giữ 5–10% không nhận để biết luồng có tác dụng thật không — [[Incrementality Testing]].

> [!warning] Luồng tự động không ai rà soát
> Đây là rủi ro đặc trưng của automation: nó chạy im lặng. Email nhắc về tính năng đã bị gỡ, chuỗi onboarding trỏ tới trang 404, luồng gửi cho khách đã rời bỏ. Đặt lịch rà soát bắt buộc theo quý cho **mọi** luồng đang bật.

## 3. Cá nhân hoá — làm ít mà đúng

| Mức | Ví dụ | Giá trị |
|---|---|---|
| Chèn tên | "Chào {{first_name}}" | Gần như bằng 0; hỏng thì phản tác dụng |
| Theo phân khúc | Nội dung khác theo ngành | ✅ Có giá trị thật |
| Theo hành vi | Dựa trên cái họ đã làm | ✅ Giá trị cao nhất |
| Theo mô hình dự đoán | Gợi ý cá nhân | Tuỳ mô hình; phải đo |

Xem [[Personalization Engines]] để bàn kỹ hơn về điểm lợi suất giảm dần.

## 4. Cạm bẫy

- **Không có trần tần suất toàn cục.**
- **Không có quy tắc loại trừ.** Khách vừa mua vẫn nhận email "bạn quên gì đó".
- **Không có lối ra khỏi luồng.**
- **Cá nhân hoá hỏng.** "Chào {{first_name}}" gửi đi thật là thiệt hại thương hiệu.
- **Tự động hoá quy trình chưa được kiểm chứng thủ công.** Làm tay 20 lần trước khi tự động hoá.
- **Không có holdout** → không biết luồng có giá trị hay chỉ đang nhận công.
- **Bỏ qua consent theo loại nội dung.** Đồng ý nhận cập nhật sản phẩm ≠ đồng ý nhận khuyến mãi — [[Marketing Privacy and Consent]].
- **Luồng không có người sở hữu.**

## 5. Checklist áp dụng

- [ ] Có trần tần suất toàn cục không?
- [ ] Mỗi luồng có quy tắc loại trừ không?
- [ ] Mỗi luồng có lối ra không?
- [ ] Có holdout để đo tác động không?
- [ ] Mọi luồng đang bật có được rà soát trong 3 tháng gần đây không?
- [ ] Mỗi luồng có người sở hữu không?
- [ ] Consent có được tôn trọng theo **loại** nội dung không?
- [ ] Tôi đã chạy tay quy trình này trước khi tự động hoá chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Adobe Journey Optimizer | Vòng đời đa kênh trong hệ Adobe | [[Adobe Experience Cloud Overview]] |
| Customer.io / Braze | Luồng theo hành vi | https://customer.io/ |
| HubSpot | Automation + CRM | https://www.hubspot.com/ |

## Tham khảo

- Adobe — Journey Optimizer documentation — https://experienceleague.adobe.com/docs/journey-optimizer/using/ajo-home.html
- Google — Email sender guidelines (trần tần suất & complaint rate) — https://support.google.com/a/answer/81126
- EU GDPR & ePrivacy — consent theo mục đích — https://gdpr.eu/
- Kotler & Keller — *Marketing Management* 16e, ch. 14

## Liên kết

[[Email Marketing and Lifecycle]] · [[Lifecycle and Retention Marketing]] · [[Personalization Engines]] · [[Marketing Privacy and Consent]] · [[Marketing]]
