---
tags: [seo, analytics, tools]
status: growing
---
# GA4 for SEO

> GSC nói cho bạn biết chuyện gì xảy ra **trên SERP**; GA4 nói chuyện gì xảy ra **sau khi click**. Hai công cụ trả lời hai câu hỏi khác nhau và **số liệu của chúng không bao giờ khớp** — đó là bình thường, không phải lỗi.

## 1. Vì sao GSC và GA4 không khớp

| Nguyên nhân | Chiều lệch |
|---|---|
| GSC đếm **click trên SERP**, GA4 đếm **session bắt đầu** | GSC > GA4 |
| Người dùng chặn JS/cookie ⇒ GA4 không ghi | GSC > GA4 |
| Một click có thể tạo nhiều session (hoặc ngược lại) | Cả hai chiều |
| GA4 dùng consent mode / mô hình hoá dữ liệu | Cả hai chiều |
| GA4 gán kênh theo referrer, GSC theo nguồn thật | Cả hai chiều |
| Múi giờ khác nhau | Nhỏ |

**Đừng cố làm chúng khớp.** Dùng GSC cho câu hỏi về hiển thị và truy vấn; dùng GA4 cho câu hỏi về hành vi và chuyển đổi.

## 2. Thiết lập tối thiểu cho SEO

1. **Liên kết GA4 với Search Console.** Bật báo cáo "Search Console" trong GA4 — cho phép xem query cạnh dữ liệu hành vi ở mức hạn chế.
2. **Định nghĩa chuyển đổi (key events)** — không chỉ pageview. Form gửi, đăng ký, mua hàng, gọi điện.
3. **Bật Google Signals** nếu chính sách riêng tư cho phép.
4. **Kiểm channel grouping**: `Organic Search` có được gán đúng không? Traffic từ Google Discover và Google News thường bị gán sai.
5. **Loại bỏ referral nội bộ và spam** trong cấu hình.
6. **Tạo Explorations** cho SEO thay vì dùng báo cáo mặc định.
7. **Gắn UTM** cho link từ [[Google Business Profile]], newsletter, để không lẫn vào organic.
8. **Kết nối BigQuery export** (miễn phí ở GA4) — dữ liệu thô, không lấy mẫu.

## 3. Chỉ số đáng theo dõi

| Chỉ số | Vì sao |
|---|---|
| **Sessions từ Organic Search** | Đường cơ sở |
| **Key events / conversions từ Organic** | KPI thật — [[SEO KPIs and Reporting]] |
| **Doanh thu từ Organic** | Với ecommerce, đây là con số duy nhất đáng báo cáo |
| **Engagement rate theo landing page** | Trang nào giữ được người đọc |
| **Landing page × truy vấn (qua GSC)** | Nối intent với hành vi |
| **Đường dẫn chuyển đổi có organic** | Organic thường ở đầu phễu; attribution last-click giấu giá trị của nó |

> [!warning] Attribution last-click giấu giá trị SEO
> Organic thường là điểm chạm **đầu tiên**; người dùng quay lại qua direct/brand search rồi mới mua. Mô hình last-click gán toàn bộ công cho điểm chạm cuối. Dùng báo cáo **Attribution** và so nhiều mô hình trước khi kết luận SEO "không hiệu quả".

## 4. Bounce rate và các chỉ số bị hiểu sai

- **GA4 không có "bounce rate" như UA.** Nó có **Engagement rate** (phiên >10s, hoặc có key event, hoặc ≥2 pageview). Bounce rate trong GA4 = 100% − engagement rate.
- **"Dwell time" không tồn tại trong GA4** và cũng không phải chỉ số Google công bố dùng cho xếp hạng. Đừng tối ưu cho nó.
- **Average engagement time** hữu ích hơn "time on page" cũ nhưng vẫn không đo được người đọc xong rồi rời đi.

Xem [[Ranking Signals Overview]] về việc tín hiệu tương tác người dùng thuộc bậc bằng chứng nào.

## 5. Cạm bẫy

- **Cố làm GSC và GA4 khớp.** Xem mục 1.
- **Báo cáo sessions thay vì chuyển đổi.** Traffic không phải mục tiêu — [[SEO Business Case]].
- **Không tách brand vs non-brand.** GA4 không làm được trực tiếp; phải nối với GSC.
- **Dùng last-click cho mọi kết luận.** Xem cảnh báo mục 3.
- **Không có key event nào được định nghĩa.** GA4 mặc định gần như vô dụng cho SEO.
- **Traffic từ Discover/News bị gán sai kênh.** Kiểm channel grouping.
- **Dữ liệu bị lấy mẫu** trong Explorations lớn. Dùng BigQuery export cho phân tích quan trọng.
- **Không cấu hình consent mode** ở thị trường có quy định — dữ liệu thiếu hụt âm thầm.

## 6. Checklist áp dụng

- [ ] GA4 đã liên kết với Search Console chưa?
- [ ] Đã định nghĩa key events phản ánh giá trị kinh doanh thật chưa?
- [ ] Channel grouping có gán đúng Organic Search không?
- [ ] Link từ GBP và các nguồn khác có UTM để không lẫn vào organic không?
- [ ] Đã bật BigQuery export chưa?
- [ ] Báo cáo có dùng chuyển đổi, không chỉ sessions không?
- [ ] Đã xem SEO qua ít nhất hai mô hình attribution chưa?
- [ ] Có kiểm dữ liệu bị lấy mẫu trong Explorations không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Analytics 4 | Chính | [GA4](https://analytics.google.com/) |
| GA4 BigQuery export | Dữ liệu thô, không lấy mẫu, miễn phí | [Docs](https://support.google.com/analytics/answer/9358801) |
| Looker Studio | Ghép GA4 + GSC trong một dashboard | [Looker](https://lookerstudio.google.com/) |
| Google Tag Manager | Quản lý tag, theo dõi sự kiện tuỳ biến | [GTM](https://tagmanager.google.com/) |

## Tham khảo
- [Google — GA4 Help Center](https://support.google.com/analytics/answer/10089681)
- [Google — Link Search Console to GA4](https://support.google.com/analytics/answer/10737381)
- [Google — Why GA4 and Search Console data differ](https://support.google.com/analytics/answer/1638635)
- [Google — GA4 BigQuery Export schema](https://support.google.com/analytics/answer/7029846)

## Liên kết
[[Google Search Console]] · [[SEO KPIs and Reporting]] · [[SEO Business Case]] · [[Product Analytics & Surveys]] · [[Google Business Profile]] · [[SEO]]
