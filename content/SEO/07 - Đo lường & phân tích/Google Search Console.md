---
tags: [seo, analytics, tools]
status: evergreen
---
# Google Search Console

> Nguồn dữ liệu quan trọng nhất trong SEO — và nguồn bị hiểu sai nhiều nhất. GSC **lấy mẫu, làm tròn, lọc, và ẩn** dữ liệu theo những cách cụ thể. Biết nó nói dối ở đâu là điều kiện để dùng nó đúng.

## 1. Bốn chỉ số trong Performance report

| Chỉ số | Định nghĩa chính xác | Bẫy |
|---|---|---|
| **Impressions** | Số lần URL xuất hiện trong kết quả | Tính cả khi ở trang 5 mà người dùng không cuộn tới |
| **Clicks** | Số lần click từ SERP | Chính xác nhất trong bốn chỉ số |
| **CTR** | Clicks / Impressions | Vô nghĩa nếu impression ở vị trí rất thấp |
| **Position** | **Vị trí trung bình có trọng số theo impression** | Xem cảnh báo bên dưới |

> [!warning] "Average position" là chỉ số gây hiểu lầm nhất trong GSC
> Nó là **trung bình** trên mọi truy vấn, mọi thiết bị, mọi vị trí địa lý, mọi thời điểm. Position 8,3 có thể là: (a) luôn ở vị trí 8, hoặc (b) một nửa thời gian ở vị trí 3 và một nửa ở vị trí 14. Hai tình huống này cần hành động hoàn toàn khác nhau.
>
> **Cách dùng đúng:** lọc xuống **một truy vấn cụ thể** và **một loại thiết bị** trước khi đọc position. Ở mức tổng hợp, chỉ dùng nó để thấy **xu hướng**, không bao giờ dùng làm con số tuyệt đối.

## 2. GSC lọc và giấu dữ liệu ở đâu

Đây là phần quan trọng nhất và ít được nói tới:

1. **Truy vấn hiếm bị ẩn** để bảo vệ riêng tư. Tổng click theo truy vấn **luôn nhỏ hơn** tổng click của toàn property. Chênh lệch có thể tới 30–50% với site đuôi dài.
2. **Giới hạn 1.000 dòng** trong giao diện web. Dùng **API** hoặc **Looker Studio** để lấy đầy đủ.
3. **Dữ liệu 16 tháng.** Xuất định kỳ nếu cần lịch sử dài hơn — đây là việc nên tự động hoá từ sớm.
4. **Độ trễ 2–3 ngày.** Đừng phân tích dữ liệu hôm qua.
5. **Anonymized queries** — truy vấn chứa thông tin cá nhân bị loại hoàn toàn.
6. **Property khác nhau, dữ liệu khác nhau.** Domain property gộp mọi subdomain và scheme; URL-prefix property chỉ một. Nên có **cả hai**.

> [!note] Hệ quả thực tế của điểm 1
> Tổng click ở tab Queries **không** khớp tổng click ở tab Pages hay tổng property. Đây không phải lỗi. Đừng cố làm chúng khớp; dùng đúng mức tổng hợp cho từng câu hỏi.

## 3. Các report và câu hỏi chúng trả lời

| Report | Câu hỏi | Note liên quan |
|---|---|---|
| **Performance** | Truy vấn nào, trang nào, xu hướng ra sao | [[SEO KPIs and Reporting]] |
| **Page indexing** | Trang nào không được index và vì sao | [[Indexing and Index Bloat]] |
| **Sitemaps** | Tỷ lệ index theo từng sitemap | [[XML Sitemaps]] |
| **URL Inspection** | Google thấy gì ở URL này (có live test) | [[JavaScript Rendering and SEO]] |
| **Core Web Vitals** | Field data theo nhóm URL | [[Core Web Vitals for SEO]] |
| **Enhancements** | Lỗi structured data | [[Structured Data and Rich Results]] |
| **Links** | Backlink theo dữ liệu Google | [[Backlink Fundamentals]] |
| **Manual Actions** | Có bị phạt thủ công không | [[Penalty Diagnosis and Recovery]] |
| **Security Issues** | Site có bị hack không | |
| **Crawl Stats** (Settings) | Googlebot crawl bao nhiêu, response time | [[Crawling and Crawl Budget]] |
| **Removals** | Gỡ URL tạm thời khỏi kết quả | [[Indexing and Index Bloat]] |
| **Change of Address** | Báo đổi domain | [[Site Migration]] |

## 4. Phân tích đáng làm — công thức cụ thể

| Câu hỏi | Cách lọc |
|---|---|
| **Cơ hội dễ nhất** | Position 11–20, sắp theo impression giảm dần |
| **Cannibalization** | Lọc một Query → xem tab Pages, có ≥2 URL không |
| **Trang mất traffic** | So 3 tháng gần nhất với cùng kỳ năm trước, sắp theo mức giảm |
| **CTR bất thường** | Position ≤5 nhưng CTR thấp ⇒ vấn đề title/snippet — [[Title Tags and Meta Descriptions]] |
| **Brand vs non-brand** | Lọc Query chứa/không chứa tên brand — bắt buộc cho mọi báo cáo |
| **Truy vấn mới** | So hai kỳ, tìm truy vấn chỉ có ở kỳ sau ⇒ [[Topical Authority]] đang tăng |
| **Tác động core update** | So trước/sau ngày update — [[Google Algorithm Updates]] |
| **Zero-click** | Impression tăng nhưng click không tăng — [[AI Search and Zero Click]] |

## 5. Cạm bẫy

- **Đọc average position ở mức tổng hợp.** Xem cảnh báo mục 1.
- **Không tách brand/non-brand.** Mọi kết luận sau đó đều sai lệch.
- **So với "tháng trước".** Mùa vụ làm hỏng kết luận. So cùng kỳ năm trước.
- **Dùng giao diện web cho phân tích lớn.** Giới hạn 1.000 dòng. Dùng API/Looker Studio.
- **Không xuất dữ liệu định kỳ.** 16 tháng trôi qua rất nhanh.
- **Chỉ có một property.** Nên có domain property + URL-prefix cho từng thư mục quan trọng.
- **Lạm dụng "Request indexing".** Có hạn ngạch và không vượt được đánh giá chất lượng.
- **Bỏ qua Manual Actions.** Kiểm mỗi tháng; nó im lặng cho tới khi không im lặng nữa.

## 6. Checklist áp dụng

- [ ] Đã tạo cả domain property và URL-prefix property chưa?
- [ ] Có property riêng cho các thư mục quan trọng (`/blog/`, `/san-pham/`) chưa?
- [ ] Đã thiết lập xuất dữ liệu tự động (API/BigQuery bulk export) chưa?
- [ ] Báo cáo có tách brand vs non-brand không?
- [ ] So sánh có dùng cùng kỳ năm trước không?
- [ ] Đã kiểm Manual Actions trong tháng này chưa?
- [ ] Sitemap đã submit và có theo dõi tỷ lệ index không?
- [ ] Có phân tích position 11–20 định kỳ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Search Console | Giao diện chính | [GSC](https://search.google.com/search-console) |
| Search Console API | Vượt giới hạn 1.000 dòng | [API](https://developers.google.com/webmaster-tools) |
| Bulk data export → BigQuery | Dữ liệu đầy đủ, lưu vĩnh viễn | [Docs](https://support.google.com/webmasters/answer/12918484) |
| Looker Studio | Dashboard nối trực tiếp GSC | [Looker](https://lookerstudio.google.com/) |

## Tham khảo
- [Google — Search Console Help](https://support.google.com/webmasters)
- [Google — Performance report (Search)](https://support.google.com/webmasters/answer/7042828)
- [Google — Data anonymization in Search Console](https://support.google.com/webmasters/answer/7042828#anonymized_queries)
- [Google — Bulk data export to BigQuery](https://support.google.com/webmasters/answer/12918484)

## Liên kết
[[SEO KPIs and Reporting]] · [[GA4 for SEO]] · [[Rank Tracking]] · [[Indexing and Index Bloat]] · [[Traffic Forecasting]] · [[SEO]]
