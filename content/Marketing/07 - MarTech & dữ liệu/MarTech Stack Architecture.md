---
tags: [marketing, martech]
status: growing
---
# MarTech Stack Architecture

> Nguyên tắc duy nhất đáng nhớ: **mua ít, tích hợp sâu**. Phần lớn stack marketing thất bại không phải vì thiếu công cụ mà vì có quá nhiều công cụ không nói chuyện được với nhau.

## 1. Các khối chức năng

| Khối | Việc | Note |
|---|---|---|
| Nguồn sự thật khách hàng | Ai là ai | [[CRM for Marketing]] · [[Customer Data Platform]] |
| Thực thi kênh | Gửi/chạy | [[Marketing Automation]], ad platform |
| Nội dung & tài sản | CMS, DAM | [[Marketing Creative Operations]] |
| Dữ liệu & phân tích | Kho, mô hình hoá, BI | [[Marketing Analytics Stack]] |
| Quản trị & tuân thủ | Consent, quyền truy cập | [[Marketing Privacy and Consent]] |

## 2. Quy tắc kiến trúc

1. **Kho dữ liệu ở trung tâm, không phải một SaaS.** Công cụ đến rồi đi; dữ liệu của bạn phải ở lại nơi bạn kiểm soát.
2. **Một hệ thống là nguồn sự thật cho mỗi loại dữ liệu.** Danh tính khách ở đâu? Chi tiêu ở đâu? Viết ra.
3. **Ưu tiên công cụ có API và export tốt** hơn công cụ có nhiều tính năng. Khả năng rời đi là tính năng.
4. **Đếm chi phí tích hợp, không chỉ giá giấy phép.** Công cụ rẻ cần 3 tháng tích hợp không rẻ.
5. **Mỗi công cụ phải có người sở hữu.** Không có chủ → không ai bảo trì → mục dần.
6. **Consent là tầng xuyên suốt**, không phải một công cụ ở góc.

> [!warning] Bẫy tích hợp điểm-điểm
> N công cụ nối trực tiếp với nhau cần tới ~N²/2 tích hợp. Ở khoảng 6–7 công cụ, việc bảo trì vượt quá năng lực đội. Đây là lý do kiến trúc trung tâm (kho dữ liệu / CDP) tồn tại — không phải vì nó thời thượng.

## 3. Quy trình mua công cụ

| Bước | Câu hỏi |
|---|---|
| 1. Vấn đề | Vấn đề cụ thể là gì? Đo bằng gì? |
| 2. Không mua | Giải được bằng quy trình hoặc công cụ hiện có không? |
| 3. Dữ liệu | Nó cần dữ liệu gì? Ta có không? Sạch không? |
| 4. Tích hợp | Nối với stack hiện tại thế nào? Ai làm? Mất bao lâu? |
| 5. Sở hữu | Ai vận hành nó sau khi mua? |
| 6. Rời đi | Lấy dữ liệu ra thế nào nếu ngừng dùng? |
| 7. Tuân thủ | DPA, nơi lưu dữ liệu, xử lý consent |

Bước 2 và bước 6 là hai bước hay bị bỏ nhất.

## 4. Cạm bẫy

- **Mua công cụ để giải quyết vấn đề quy trình.** Công cụ khuếch đại quy trình sẵn có, kể cả quy trình hỏng.
- **Chồng chéo chức năng.** Ba công cụ cùng gửi được email → không ai biết cái nào là chuẩn.
- **Công cụ không ai dùng.** Rà soát định kỳ: đăng nhập lần cuối là bao giờ?
- **Khoá nhà cung cấp.** Không export được dữ liệu là rủi ro chiến lược.
- **Mua CDP khi chưa có dữ liệu sạch.** Nó không tự làm sạch dữ liệu cho bạn.
- **Bỏ qua rà soát bảo mật và DPA.**
- **Stack quá nặng so với quy mô đội.**

## 5. Checklist áp dụng

- [ ] Tôi có sơ đồ stack hiện tại không?
- [ ] Mỗi loại dữ liệu có **một** nguồn sự thật được viết ra không?
- [ ] Mỗi công cụ có người sở hữu không?
- [ ] Có công cụ nào chồng chéo chức năng không?
- [ ] Tôi export được dữ liệu ra khỏi từng công cụ không?
- [ ] Consent có được xử lý xuyên suốt không?
- [ ] Lần rà soát công cụ không dùng gần nhất là khi nào?

## Tham khảo

- Scott Brinker — ChiefMartec MarTech Landscape & blog — https://chiefmartec.com/
- Gartner — Marketing Technology Survey (tỉ lệ sử dụng thực tế của stack) — https://www.gartner.com/en/marketing
- Adobe — Experience Cloud architecture docs — [[Adobe Experience Cloud Overview]]
- MACH Alliance — nguyên tắc kiến trúc composable — https://machalliance.org/

## Liên kết

[[Customer Data Platform]] · [[CRM for Marketing]] · [[Marketing Analytics Stack]] · [[Marketing Data Governance]] · [[Marketing]]
