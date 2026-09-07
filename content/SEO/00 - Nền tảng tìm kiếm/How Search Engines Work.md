---
tags: [seo, foundations]
status: evergreen
---
# How Search Engines Work

> Ba giai đoạn — **crawl, index, rank** — là mô hình tối thiểu để không nói bậy về SEO. Gần như mọi hiểu lầm SEO đều đến từ việc gộp ba giai đoạn này làm một.

## 1. Ba giai đoạn, ba loại vấn đề khác nhau

| Giai đoạn | Câu hỏi | Triệu chứng khi hỏng | Công cụ chẩn đoán |
|---|---|---|---|
| **Crawling** | Googlebot có *đến* được URL không? | URL không xuất hiện ở đâu cả | [[Log File Analysis]], `robots.txt` tester |
| **Indexing** | Google có *lưu* nó vào index không? | GSC báo "Discovered – currently not indexed" | [[Google Search Console]] → Page indexing |
| **Ranking** | Với truy vấn X, nó đứng thứ mấy? | Được index nhưng 0 impression | GSC → Performance, [[Rank Tracking]] |

> [!warning] Chẩn đoán sai giai đoạn = tối ưu sai thứ
> "Trang tôi không lên top" có thể là vấn đề crawl (chưa từng được ghé), index (bị loại), hay rank (bị xếp sau). Ba nguyên nhân, ba cách sửa hoàn toàn khác nhau. **Luôn xác định giai đoạn trước khi động vào nội dung.**

## 2. Crawling — khám phá và tải về

1. **Nguồn khám phá URL**: link nội bộ ([[Internal Linking]]), link ngoài ([[Backlink Fundamentals]]), [[XML Sitemaps]], submit thủ công qua GSC.
2. **Hàng đợi crawl** được ưu tiên theo *crawl demand* (Google nghĩ URL này quan trọng/mới tới đâu) nhân với *crawl rate limit* (server chịu được bao nhiêu). Xem [[Crawling and Crawl Budget]].
3. **Fetch** trả về HTML thô + HTTP status. Google tôn trọng `ETag`/`If-Modified-Since` — 304 tiết kiệm crawl budget.
4. Kết quả fetch đi vào **hàng đợi render** nếu trang cần JavaScript. Đây là pha thứ hai, có độ trễ riêng — xem [[JavaScript Rendering and SEO]].

## 3. Indexing — phân tích và lưu trữ

- **Parse**: trích text, link, `<title>`, heading, [[Structured Data and Rich Results]], hình ảnh.
- **Canonical selection**: Google chọn **một** URL đại diện cho mỗi cụm trùng lặp. `rel=canonical` của bạn chỉ là *gợi ý*. Xem [[Canonicalization]].
- **Inverted index**: cùng cấu trúc dữ liệu như [[Search Engines]] (Solr/Elasticsearch) — ánh xạ `term → danh sách document`. Khác biệt là quy mô (hàng trăm tỉ trang) và việc Google lưu thêm hàng nghìn tín hiệu phụ cho mỗi document.
- **Loại bỏ**: soft 404, nội dung trùng lặp, chất lượng quá thấp, `noindex`. Được crawl **không** đảm bảo được index.

## 4. Ranking — chấm điểm cho từng truy vấn

Ranking **không phải một điểm số cố định của trang**. Nó được tính *lại* cho mỗi truy vấn:

1. **Query understanding** — sửa chính tả, mở rộng đồng nghĩa, phân loại intent ([[Search Intent]]), phát hiện entity.
2. **Candidate retrieval** — lấy vài nghìn document từ inverted index.
3. **Scoring/re-ranking** — áp hàng trăm tín hiệu ([[Ranking Signals Overview]]) qua nhiều tầng model.
4. **SERP assembly** — chọn định dạng hiển thị: 10 link xanh, local pack, AI Overview… Xem [[SERP Anatomy]], [[AI Search and Zero Click]].

> [!note] Hệ quả thực tế
> Vì bước 4 tồn tại, *"thứ hạng #1"* có thể vẫn cho 0 click nếu SERP bị AI Overview và featured snippet chiếm hết màn hình đầu.

## 5. Cạm bẫy

- **Nhầm "Google biết URL" với "Google index URL".** GSC phân biệt rất rõ; đừng gộp.
- **Tưởng crawl là realtime.** Độ trễ crawl→index→rank có thể từ vài phút (site tin tức) tới vài tuần (site nhỏ, mới).
- **Chặn crawl để gỡ khỏi index.** `robots.txt` chặn *fetch*, nên Googlebot không bao giờ đọc được thẻ `noindex` bên trong. Kết quả: URL vẫn nằm trong index, chỉ là không có snippet. Xem [[Robots Exclusion]].
- **Giả định Bing/DuckDuckGo/AI crawler hành xử như Googlebot.** Bing render JS ít hơn hẳn; GPTBot/ClaudeBot **không render JS**. Xem [[Generative Engine Optimization]].
- **Coi index là vĩnh viễn.** Google gỡ trang khỏi index khi chất lượng giảm hoặc không còn được crawl. Xem [[Indexing and Index Bloat]].

## 6. Checklist áp dụng

- [ ] Với mỗi vấn đề, đã xác định nó thuộc giai đoạn crawl / index / rank chưa?
- [ ] Đã kiểm URL trong GSC URL Inspection (live test) trước khi kết luận?
- [ ] Đã xem log để biết Googlebot **có thật sự** ghé URL không, thay vì đoán?
- [ ] Trang có render đủ nội dung khi tắt JavaScript không?
- [ ] Canonical Google chọn có trùng canonical bạn khai không (GSC báo "Google-selected canonical")?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC URL Inspection | Xem đúng cái Google thấy, có live test | [GSC](https://search.google.com/search-console) |
| Rich Results Test | Render HTML như Googlebot | [Test](https://search.google.com/test/rich-results) |
| Screaming Frog | Crawl mô phỏng, so HTML thô vs rendered | [SF](https://www.screamingfrog.co.uk/seo-spider/) |

## Tham khảo
- [Google — In-depth guide to how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)
- [Google — Crawling and indexing documentation](https://developers.google.com/search/docs/crawling-indexing)
- [Moz — Beginner's Guide to SEO, Ch.2: How search engines work](https://moz.com/beginners-guide-to-seo/how-search-engines-operate)
- [Google Search Central — How Search works (bản cho người dùng)](https://www.google.com/search/howsearchworks/)

## Liên kết
[[Search Intent]] · [[Ranking Signals Overview]] · [[Crawling and Crawl Budget]] · [[Indexing and Index Bloat]] · [[JavaScript Rendering and SEO]] · [[Search Engines]] · [[SEO]]
