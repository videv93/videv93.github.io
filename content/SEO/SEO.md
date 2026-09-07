---
tags: [seo, moc]
type: moc
status: evergreen
created: 2026-09-02
updated: 2026-09-02
---
# SEO

> Bản đồ kiến thức về **Search Engine Optimization**: từ cơ chế crawl–index–rank, tới kỹ thuật on-page/technical, xây liên kết, đo lường, và cách toàn bộ mô hình traffic đang bị AI Search viết lại.

> [!warning] Vault này được dựng từ **greenfield**, không từ seed
> Sáu lần chạy trước của [[Knowledge Seed Playbook]] đều bắt đầu từ một seed có sẵn. Folder `2. Areas/SEO/` **rỗng hoàn toàn** và `grep` toàn vault (hai vòng, theo cả từ khoá lẫn wikilink) **không tìm thấy một file seed nào**. Toàn bộ dàn ý dưới đây đến từ một **dàn ý lĩnh vực độc lập** (Google Search Central, Moz Beginner's Guide, Ahrefs/Semrush academy, Search Engine Land) — xem 6.8 trong playbook.
> Hệ quả cần nhớ: **không có nguyên tắc 2 để kiểm ở đây.** Không có gì để đối chiếu "không vứt gì đi", nên rủi ro không phải bỏ sót seed mà là **bỏ sót lĩnh vực**.

## Cách dùng vault này

- `status`: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá)
- Giải thích bằng tiếng Việt, **giữ nguyên thuật ngữ tiếng Anh** — mọi tài liệu SEO đều là tiếng Anh.
- Đọc theo số thư mục là đọc theo thứ tự học. Tra cứu thì vào thẳng note.
- **Đọc [[SEO Tactics Half-Life]] trước khi áp dụng bất kỳ chiến thuật nào** trong `03`, `04`, `05`. SEO là lĩnh vực có chu kỳ bán rã ngắn nhất trong cả vault này.

## ⚠️ Khái niệm có nhà ở area khác

SEO chạm tới những khái niệm dưới đây nhưng **không định nghĩa lại** chúng. Note SEO chỉ nói *góc nhìn tìm kiếm* rồi link sang.

| Khái niệm | Nhà của nó | Note SEO nói gì thêm |
|---|---|---|
| [[Core Web Vitals]] | Frontend | [[Core Web Vitals for SEO]] — CWV là ranking signal *yếu* tới đâu, đo bằng field data nào |
| [[Semantic HTML]] · [[HTML Document Anatomy]] | Frontend | [[Heading Structure and Content Outline]] — heading cho crawler, không cho style |
| [[Browser Rendering Pipeline]] | Frontend | [[JavaScript Rendering and SEO]] — hàng đợi render hai pha của Googlebot |
| [[Next.js Rendering Strategies]] · [[Next.js Caching Layers]] | Frontend | [[JavaScript Rendering and SEO]] — SSR/ISR/CSR nhìn từ crawler |
| [[Responsive Layout]] | Frontend | [[Mobile and Responsive SEO]] — mobile-first indexing |
| [[Accessible Markup & ARIA]] | Frontend | [[SEO Content Writing]] — chồng lấn a11y ↔ SEO |
| [[Information Architecture]] | UIUX | [[Site Architecture and URL Design]] — IA dưới ràng buộc crawl depth |
| [[UX Metrics]] · [[Business Mindset]] | UIUX | [[SEO KPIs and Reporting]] · [[SEO Business Case]] |
| [[Product Analytics & Surveys]] | Frontend | [[GA4 for SEO]] |
| [[Search Engines]] (Solr/Elastic) | Backend | [[How Search Engines Work]] — cùng nguyên lý inverted index, khác quy mô và mục tiêu |
| [[Caching Strategies]] | Database | [[Crawling and Crawl Budget]] — ETag/Last-Modified nhìn từ crawler |
| [[Frontend Performance Budget]] | Frontend | [[Core Web Vitals for SEO]] |

## 00 — Nền tảng tìm kiếm

| Note | Nội dung |
|---|---|
| [[How Search Engines Work]] | Crawl → index → rank; inverted index; hàng đợi render |
| [[Search Intent]] | Bốn loại intent, và vì sao intent thắng keyword |
| [[SERP Anatomy]] | Giải phẫu trang kết quả: 20+ loại SERP feature |
| [[Ranking Signals Overview]] | Bản đồ tín hiệu xếp hạng — cái nào thật, cái nào folklore |
| [[SEO Business Case]] | Mô hình hoá ROI của SEO, và khi nào **không** nên làm SEO |

## 01 — Crawling & Indexing

| Note | Nội dung |
|---|---|
| [[Crawling and Crawl Budget]] | Crawl rate vs crawl demand; khi nào budget mới là vấn đề thật |
| [[Robots Exclusion]] | `robots.txt`, `noindex`, `X-Robots-Tag` — và cái bẫy "chặn crawl ≠ chặn index" |
| [[XML Sitemaps]] | Sitemap, sitemap index, `lastmod`, và giới hạn thật của nó |
| [[Indexing and Index Bloat]] | Vì sao trang không được index; index bloat và cách cắt |
| [[Canonicalization]] | `rel=canonical`, duplicate content, canonical bị Google bỏ qua |
| [[JavaScript Rendering and SEO]] | Hai pha render của Googlebot; SSR/ISR/CSR/dynamic rendering |
| [[HTTP Status Codes for SEO]] | 200/301/302/304/404/410/451/5xx nhìn từ crawler; soft 404 |

## 02 — Từ khoá & ý định

| Note | Nội dung |
|---|---|
| [[Keyword Research]] | Quy trình sinh–lọc–nhóm; nguồn dữ liệu và sai số của chúng |
| [[Keyword Difficulty and Volume]] | KD là chỉ số **độc quyền**, không phải sự thật; volume nói dối thế nào |
| [[Intent Mapping]] | Ánh xạ keyword → intent → định dạng trang |
| [[Topic Clusters]] | Pillar–cluster; khi nào mô hình này sai |
| [[SERP Feature Targeting]] | Nhắm featured snippet, PAA, image pack — và cái giá zero-click |
| [[Competitor Gap Analysis]] | Content gap, keyword gap, link gap |

## 03 — On-page & nội dung

| Note | Nội dung |
|---|---|
| [[Title Tags and Meta Descriptions]] | Google viết lại title ~60% số lần — viết cho trường hợp nào |
| [[Heading Structure and Content Outline]] | H1–H6 cho crawler; dàn ý theo intent |
| [[Internal Linking]] | Tài sản SEO bị bỏ phí nhiều nhất; PageRank nội bộ |
| [[SEO Content Writing]] | Viết cho người đọc trong ràng buộc máy đọc |
| [[Topical Authority]] | Bao phủ chủ đề vs bao phủ keyword |
| [[E-E-A-T]] | **Không phải ranking factor** — nó là gì thật sự |
| [[Content Refresh and Pruning]] | Content decay; refresh, consolidate, hay xoá |
| [[AI Generated Content and SEO]] | Chính sách thật của Google; nơi AI content gãy |

## 04 — Technical SEO

| Note | Nội dung |
|---|---|
| [[Site Architecture and URL Design]] | Crawl depth, cấu trúc URL, breadcrumb |
| [[Structured Data and Rich Results]] | Schema.org, JSON-LD, rich result đủ điều kiện |
| [[Core Web Vitals for SEO]] | Tín hiệu thật nhưng **yếu**; field vs lab data |
| [[Mobile and Responsive SEO]] | Mobile-first indexing; parity desktop–mobile |
| [[International SEO and hreflang]] | `hreflang`, cấu trúc domain, lỗi hreflang hay gặp |
| [[Pagination and Faceted Navigation]] | Bẫy sinh URL vô hạn của ecommerce |
| [[Site Migration]] | Loại rủi ro cao nhất trong SEO; checklist trước/trong/sau |
| [[Log File Analysis]] | Sự thật duy nhất về hành vi crawler |

## 05 — Off-page & liên kết

| Note | Nội dung |
|---|---|
| [[Backlink Fundamentals]] | PageRank, `nofollow`/`ugc`/`sponsored`, link equity |
| [[Link Building Tactics]] | Chiến thuật xếp theo rủi ro, không theo hiệu quả |
| [[Anchor Text]] | Phân bố anchor; over-optimization |
| [[Digital PR]] | Chiến thuật link duy nhất còn scale được một cách sạch |
| [[Toxic Links and Disavow]] | Vì sao disavow gần như luôn là sai lầm |
| [[Brand Signals and Entity SEO]] | Entity, Knowledge Graph, brand search |

## 06 — SEO ngành dọc

| Note | Nội dung |
|---|---|
| [[Local SEO]] | Local pack, proximity, NAP, citation |
| [[Google Business Profile]] | Bề mặt local quan trọng nhất |
| [[Ecommerce SEO]] | Trang category/product, out-of-stock, review |
| [[Programmatic SEO]] | Sinh trang quy mô lớn — và ranh giới với spam |
| [[Image and Video SEO]] | Image pack, video indexing, `alt` |
| [[News and Publisher SEO]] | Top Stories, Google News, freshness |

## 07 — Đo lường & phân tích

| Note | Nội dung |
|---|---|
| [[Google Search Console]] | Nguồn dữ liệu quan trọng nhất — và cách nó nói dối |
| [[GA4 for SEO]] | Cấu hình, kênh organic, giới hạn |
| [[Rank Tracking]] | Vì sao "thứ hạng" gần như không còn tồn tại |
| [[SEO KPIs and Reporting]] | KPI theo tầng; báo cáo cho ai |
| [[Traffic Forecasting]] | Dự báo traffic mà không tự lừa mình |
| [[SEO Testing]] | Split test theo nhóm URL — SEO có làm được thí nghiệm |
| [[Crawl Auditing]] | Chạy Screaming Frog/Sitebulb và đọc kết quả |

## 08 — Thuật toán, rủi ro & AI Search

| Note | Nội dung |
|---|---|
| [[Google Algorithm Updates]] | Panda → Penguin → HCU → core updates |
| [[Helpful Content and Core Updates]] | Cú sốc 2023–2024 và bài học của nó |
| [[Google Spam Policies]] | Chính sách chính thức, đọc như luật |
| [[Penalty Diagnosis and Recovery]] | Manual action vs algorithmic; quy trình chẩn đoán |
| [[Black Hat vs White Hat SEO]] | Phổ rủi ro, không phải nhị phân |
| [[AI Search and Zero Click]] | AI Overviews, thay đổi mô hình traffic |
| [[Generative Engine Optimization]] | GEO/AEO — cái gì có bằng chứng, cái gì là hype |
| ⚠️ [[Google Guidance vs Observed Behavior]] | **Note bản lề** — hướng dẫn chính thức ↔ dữ liệu rò rỉ ↔ folklore |
| ⚠️ [[SEO Tactics Half-Life]] | **Note bản lề** — nguyên lý bền ↔ chiến thuật hết hạn |

## 09 — Lộ trình & tài nguyên

| Note | Nội dung |
|---|---|
| [[SEO Learning Path]] | Lộ trình 0 → thạo nghề, theo mốc kiểm chứng được |
| [[SEO Audit Playbook]] | Quy trình audit đầy đủ, dùng lại được |
| [[SEO Tools Catalogue]] | Catalogue công cụ có cột **Trạng thái** (6.7) |
| [[SEO Learning Resources]] | Nguồn học, xếp theo độ tin cậy |
| [[SEO Glossary]] | Thuật ngữ + viết tắt |

## Nguồn nền tảng dùng chung

| Nguồn | Loại | Vì sao tin được |
|---|---|---|
| [Google Search Central](https://developers.google.com/search) | Chính thức | Tài liệu duy nhất Google chịu trách nhiệm |
| [Google Search Quality Rater Guidelines](https://services.google.com/fh/files/misc/hsw-sqrg.pdf) | Chính thức | 170+ trang mô tả Google *muốn* xếp hạng cái gì |
| [Google Search Status Dashboard](https://status.search.google.com/) | Chính thức | Ngày chính xác của mọi core update |
| [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo) | Ngành | Dàn ý nhập môn chuẩn mực nhất |
| [Ahrefs Blog](https://ahrefs.com/blog/) | Ngành | Nghiên cứu dữ liệu lớn, có công bố phương pháp |
| [Search Engine Land](https://searchengineland.com/) | Ngành | Đưa tin update nhanh và có nguồn |
| [Google API Content Warehouse leak (2024)](https://sparktoro.com/blog/an-anonymous-source-shared-thousands-of-leaked-google-search-api-documents-with-me-everyone-in-seo-should-see-them/) | Rò rỉ | Xem [[Google Guidance vs Observed Behavior]] trước khi dùng |

## Ghi chú về `_archive-seed/`

**Không có `_archive-seed/`.** Đây là lần chạy đầu tiên không có seed để lưu — folder đích rỗng và `grep` toàn vault không ra file nào. Xem cảnh báo ở đầu note này.

## Liên kết
[[Knowledge Seed Playbook]] · [[Frontend]] · [[UIUX]] · [[Backend]]
