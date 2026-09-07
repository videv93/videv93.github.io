---
tags: [seo, learning, roadmap]
status: evergreen
---
# SEO Learning Path

> Lộ trình theo **mốc kiểm chứng được**, không theo thời gian. Mỗi giai đoạn có một bài kiểm tự chạy được — đạt thì đi tiếp, không đạt thì ở lại. Học SEO bằng cách đọc mà không có site để thực hành gần như không hiệu quả.

## Điều kiện tiên quyết: có một site thật

Trước khi bắt đầu, cần **một site bạn kiểm soát hoàn toàn** và có [[Google Search Console]]. Có thể là blog cá nhân, một dự án nhỏ, bất cứ thứ gì. Không có site để nhìn dữ liệu thật, mọi thứ dưới đây chỉ là lý thuyết.

---

## Giai đoạn 1 — Mô hình tinh thần

**Học:** [[How Search Engines Work]] → [[Search Intent]] → [[SERP Anatomy]] → [[Ranking Signals Overview]] → [[Google Guidance vs Observed Behavior]]

**Bài kiểm:**
- [ ] Giải thích được crawl / index / rank là ba vấn đề khác nhau, và với một URL cụ thể, xác định được nó đang kẹt ở đâu
- [ ] Nhìn một SERP và mô tả được intent + loại trang đang thắng
- [ ] Gán được bậc A/B/C/D cho một tuyên bố "ranking factor" bất kỳ

> Giai đoạn này quan trọng nhất và hay bị bỏ qua nhất. Không có nó, bạn sẽ tin mọi thứ đọc được.

---

## Giai đoạn 2 — Đọc dữ liệu của chính mình

**Học:** [[Google Search Console]] → [[SEO KPIs and Reporting]] → [[GA4 for SEO]] → [[Rank Tracking]]

**Bài kiểm:**
- [ ] Tách được brand vs non-brand trong GSC
- [ ] Tìm được 10 trang ở vị trí 11–20 có impression cao nhất
- [ ] Phát hiện được một trường hợp cannibalization trên site của bạn
- [ ] Giải thích được vì sao GSC và GA4 không khớp

---

## Giai đoạn 3 — Technical nền tảng

**Học:** [[Crawling and Crawl Budget]] → [[Robots Exclusion]] → [[Indexing and Index Bloat]] → [[Canonicalization]] → [[HTTP Status Codes for SEO]] → [[XML Sitemaps]] → [[JavaScript Rendering and SEO]]

**Bài kiểm:**
- [ ] `curl` một URL và nói được nội dung nào có ở HTML thô, nào chỉ có sau JS
- [ ] Đọc GSC Page Indexing và chẩn đoán đúng từng trạng thái
- [ ] Giải thích được vì sao `Disallow` không gỡ được URL khỏi index
- [ ] Chạy [[Crawl Auditing]] trên site của mình và phân loại phát hiện theo mức ưu tiên

---

## Giai đoạn 4 — Nội dung và từ khoá

**Học:** [[Keyword Research]] → [[Keyword Difficulty and Volume]] → [[Intent Mapping]] → [[Topic Clusters]] → [[Heading Structure and Content Outline]] → [[SEO Content Writing]] → [[Title Tags and Meta Descriptions]] → [[Internal Linking]] → [[E-E-A-T]]

**Bài kiểm:**
- [ ] Xây được một cụm truy vấn bằng SERP overlap, không bằng chuỗi ký tự
- [ ] Viết một bài và chỉ ra được **câu nào** không có trong top 10
- [ ] Tìm và sửa được 10 cơ hội internal link trên site của mình
- [ ] Bài viết của bạn xếp hạng top 20 cho ít nhất một truy vấn

---

## Giai đoạn 5 — Rủi ro và thuật toán

**Học:** [[Google Spam Policies]] (đọc toàn văn) → [[Google Algorithm Updates]] → [[Helpful Content and Core Updates]] → [[Penalty Diagnosis and Recovery]] → [[Black Hat vs White Hat SEO]] → [[SEO Tactics Half-Life]]

**Bài kiểm:**
- [ ] Chạy được cây chẩn đoán trong [[Penalty Diagnosis and Recovery]] cho một trường hợp sụt traffic
- [ ] Xếp được mọi chiến thuật đang dùng vào phổ rủi ro
- [ ] Nhận ra được một chiến thuật đã chết trong một bài blog SEO bất kỳ

---

## Giai đoạn 6 — Chuyên sâu (chọn theo nhu cầu)

| Hướng | Note |
|---|---|
| **Technical nâng cao** | [[Log File Analysis]], [[Site Migration]], [[Pagination and Faceted Navigation]], [[International SEO and hreflang]] |
| **Ecommerce** | [[Ecommerce SEO]], [[Structured Data and Rich Results]] |
| **Local** | [[Local SEO]], [[Google Business Profile]] |
| **Publisher** | [[News and Publisher SEO]], [[Image and Video SEO]] |
| **Off-page** | [[Backlink Fundamentals]], [[Link Building Tactics]], [[Digital PR]], [[Anchor Text]] |
| **Quy mô lớn** | [[Programmatic SEO]], [[Crawling and Crawl Budget]] |
| **Kinh doanh** | [[SEO Business Case]], [[Traffic Forecasting]], [[SEO Testing]] |
| **Tương lai** | [[AI Search and Zero Click]], [[Generative Engine Optimization]] |

---

## Sai lầm học tập phổ biến

| Sai lầm | Thay bằng |
|---|---|
| Đọc nhiều mà không có site | Có site trước, đọc sau |
| Học chiến thuật (T4) trước nguyên lý (T1) | Ngược lại — [[SEO Tactics Half-Life]] |
| Học từ blog thay vì tài liệu Google | Đọc bản gốc trước, blog sau |
| Bỏ qua giai đoạn 2 (đọc dữ liệu) | Đây là giai đoạn phân biệt người biết SEO với người nói về SEO |
| Học technical mà không học nội dung (hoặc ngược lại) | Cả hai đều cần |
| Tin mọi thứ hoặc nghi ngờ mọi thứ | Dùng khung bậc bằng chứng |
| Không bao giờ tự thí nghiệm | [[SEO Testing]] |

## Checklist áp dụng

- [ ] Bạn có một site thật với GSC đang chạy chưa?
- [ ] Đã hoàn thành bài kiểm của giai đoạn hiện tại chưa (thật sự làm, không phải đọc)?
- [ ] Có đang học chiến thuật T4 trước khi nắm T1 không?
- [ ] Có đọc tài liệu Google gốc, không chỉ blog tóm tắt?
- [ ] Có ghi lại thí nghiệm và kết quả (kể cả thất bại) không?
- [ ] Đã đặt lịch kiểm lại kiến thức T3 hàng năm chưa?

## Tham khảo
- [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Moz — The Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Google Search Central — Documentation](https://developers.google.com/search/docs)
- [Ahrefs — SEO Basics](https://ahrefs.com/seo)

## Liên kết
[[SEO Learning Resources]] · [[SEO Audit Playbook]] · [[SEO Glossary]] · [[SEO Tools Catalogue]] · [[SEO Tactics Half-Life]] · [[SEO]]
