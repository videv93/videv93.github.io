---
tags: [marketing, nội-dung, ai]
status: seed
---
# Generative AI in Marketing Creative

> AI làm nội dung **trung bình** gần như miễn phí. Hệ quả chiến lược không phải "sản xuất nhiều hơn" — mà là nội dung trung bình vừa mất hết giá trị, và lợi thế dồn về thứ AI không có: dữ liệu độc quyền, kinh nghiệm thật, và người chịu trách nhiệm.

> [!warning] `status: seed` — địa hình đang dịch chuyển
> Chi tiết công cụ và quy định trong note này đổi theo quý. Nguyên tắc ở mục 2 bền hơn; danh sách công cụ ở mục 5 cần kiểm ngày trước khi tin.

## 1. Dùng AI vào đâu (và không vào đâu)

| Việc | Mức phù hợp | Ghi chú |
|---|---|---|
| Phát ý tưởng, phá bí | ✅ Cao | Số lượng phương án rẻ |
| Biến thể của nội dung đã duyệt | ✅ Cao | Đổi tỉ lệ, độ dài, giọng |
| Bản nháp đầu tiên | ✅ Trung bình | Luôn cần biên tập thật |
| Dịch & bản địa hoá | ✅ Trung bình | Cần người bản ngữ soát |
| Tóm tắt nghiên cứu, phân cụm phản hồi | ✅ Cao | Kèm kiểm chứng mẫu |
| Ảnh minh hoạ, nền, mở rộng khung | ✅ Trung bình | Chú ý quyền — mục 3 |
| **Số liệu, tuyên bố, trích dẫn** | ❌ **Không** | Bịa rất thuyết phục |
| **Quan điểm chịu trách nhiệm** | ❌ Không | Đó là thứ duy nhất còn khan hiếm |
| **Nội dung y tế/tài chính/pháp lý không qua chuyên gia** | ❌ Không | Rủi ro thật |

## 2. Nguyên tắc

1. **AI để nâng chất lượng, không để nhân sản lượng.** Chiến lược "đăng gấp 10 lần" đang thất bại ở mọi kênh — xem [[Content Strategy for Marketing]].
2. **Mọi tuyên bố kiểm chứng được phải do người kiểm.** Không có ngoại lệ. Xem [[Advertising Policy and Compliance]].
3. **Người ký tên là người chịu trách nhiệm.** Nếu không ai sẵn sàng ký, đừng xuất bản.
4. **Đầu vào độc quyền tạo ra đầu ra khác biệt.** Cùng một mô hình + cùng một prompt = cùng một nội dung như đối thủ. Nạp dữ liệu, phỏng vấn, và tài sản riêng của bạn vào.
5. **Kiểm bản quyền và quyền hình ảnh trước khi chạy quảng cáo trả tiền.**
6. **Công bố khi cần** — xem [[AI Disclosure and Content Provenance]].
7. **Không nạp dữ liệu khách hàng vào công cụ chưa duyệt.** Đây là vấn đề tuân thủ, không phải sở thích — [[Marketing Privacy and Consent]].

## 3. Rủi ro pháp lý & thương hiệu

| Rủi ro | Biểu hiện | Giảm thiểu |
|---|---|---|
| **Bịa (hallucination)** | Số liệu, trích dẫn, tính năng không tồn tại | Kiểm bằng người, bắt buộc nguồn |
| **Bản quyền đầu vào** | Mô hình đào tạo trên dữ liệu không rõ quyền | Ưu tiên mô hình cam kết thương mại (vd Firefly) |
| **Quyền hình ảnh cá nhân** | Khuôn mặt giống người thật | Không dùng cho quảng cáo trả tiền nếu không chắc |
| **Rò rỉ dữ liệu** | Dán dữ liệu khách vào công cụ công cộng | Chỉ dùng công cụ đã duyệt |
| **Đồng nhất hoá** | Nội dung giống hệt đối thủ | Đầu vào độc quyền |
| **Rủi ro danh tiếng** | Bị phát hiện dùng AI cho nội dung "trải nghiệm thật" | Đừng giả vờ trải nghiệm |

## 4. Quy trình có kiểm soát

```
Brief (người)  →  Sinh nhiều phương án (AI)  →  Chọn & định hướng (người)
   →  Tinh chỉnh (AI + người)  →  ⚠️ KIỂM SỰ THẬT (người, bắt buộc)
   →  Kiểm thương hiệu & pháp lý (người)  →  Xuất bản (người ký tên)
```

Hai chốt kiểm cuối **không được bỏ qua** kể cả khi gấp. Đây là chỗ sự cố thật xảy ra.

## 5. Checklist áp dụng

- [ ] Mọi số liệu và trích dẫn đã được **người** kiểm chưa?
- [ ] Có người cụ thể ký tên chịu trách nhiệm không?
- [ ] Đầu vào có chứa dữ liệu/kinh nghiệm **độc quyền** của ta không?
- [ ] Mô hình dùng có cam kết quyền thương mại cho ảnh không?
- [ ] Tôi có nạp dữ liệu khách hàng vào công cụ chưa duyệt không?
- [ ] Có cần công bố AI theo quy định của nền tảng/thị trường không?
- [ ] Nội dung này có nói được điều gì đối thủ dùng cùng công cụ không nói được không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Adobe Firefly | Đào tạo trên Adobe Stock + nội dung được cấp phép; có cam kết thương mại | https://firefly.adobe.com/ |
| Adobe Express | Sinh & biến thể trong template thương hiệu | [[Adobe Express Workflow]] |
| Claude / ChatGPT | Nháp, phân tích, biến thể văn bản | https://claude.ai/ |

## Tham khảo

- Adobe — Firefly commercial safety & IP indemnification — https://helpx.adobe.com/firefly/get-set-up/learn-the-basics/adobe-firefly-faq.html
- U.S. FTC — AI and consumer protection guidance — https://www.ftc.gov/business-guidance/blog
- EU AI Act — nghĩa vụ minh bạch với nội dung sinh bởi AI — https://artificialintelligenceact.eu/
- Content Authenticity Initiative / C2PA — chuẩn nguồn gốc nội dung — https://contentauthenticity.org/

## Liên kết

[[AI Disclosure and Content Provenance]] · [[Content Strategy for Marketing]] · [[Marketing Creative Operations]] · [[Adobe Express Workflow]] · [[Marketing]]
