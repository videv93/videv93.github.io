---
tags: [seo, news, publishing]
status: growing
---
# News and Publisher SEO

> SEO tin tức chạy trên **thang thời gian khác**: cơ hội tính bằng phút, không bằng tháng. Top Stories và Google News có yêu cầu kỹ thuật riêng, và **tốc độ index** quan trọng hơn gần như mọi thứ khác.

## 1. Ba bề mặt

| Bề mặt | Nguồn | Yêu cầu |
|---|---|---|
| **Top Stories** (trong Search) | Site đủ điều kiện | `NewsArticle` schema, tốc độ, uy tín |
| **Google News** (app/tab riêng) | Tự động — không cần đăng ký từ 2019 | Tuân thủ chính sách nội dung tin |
| **Discover** | Cá nhân hoá, không dựa truy vấn | Ảnh lớn ≥1200px, nội dung hấp dẫn |

> [!note] Không còn "đăng ký Google News"
> Từ 2019 Google tự động xét mọi site. Publisher Center dùng để quản lý thông tin ấn phẩm, không phải để "được chấp nhận". Nhiều hướng dẫn cũ vẫn nói ngược lại — [[SEO Tactics Half-Life]].

## 2. Yêu cầu kỹ thuật

1. **`NewsArticle` schema** với `headline`, `datePublished`, `dateModified`, `author`, `image`, `publisher` — [[Structured Data and Rich Results]].
2. **News sitemap** — chỉ bài **48 giờ gần nhất**, tối đa 1.000 URL, có `<news:publication_date>`. Xem [[XML Sitemaps]].
3. **URL ổn định** — đặt URL cuối cùng ngay từ khi xuất bản. Đổi URL sau khi bài lên Top Stories là mất chỗ.
4. **Tốc độ index**: internal link từ trang chủ và trang chuyên mục ngay lập tức, sitemap cập nhật realtime.
5. **`datePublished` chính xác, có timezone.** Sai ngày là lỗi nghiêm trọng với tin.
6. **SSR bắt buộc.** Độ trễ render pha 2 giết cơ hội Top Stories — [[JavaScript Rendering and SEO]].
7. **Ảnh lớn** — với Discover, ảnh ≥1200px và `max-image-preview:large` trong meta robots.
8. **Tác giả có trang riêng** với `Person` schema — [[E-E-A-T]].

## 3. Tốc độ — cái quyết định

Với tin nóng, thứ tự index quyết định thị phần traffic. Việc cần làm:

- **Sitemap news cập nhật ngay khi xuất bản** (không phải theo cron 15 phút).
- **Link từ trang chủ ngay** — trang chủ site tin được crawl rất thường xuyên.
- **Indexing API** — ⚠️ Google Indexing API **chỉ hỗ trợ chính thức cho `JobPosting` và `BroadcastEvent`**, không cho tin tức. Đừng dựa vào nó.
- **Hạ tầng chịu tải** — traffic tin nóng tăng đột biến; `503` lúc đó là mất tất cả.
- **CDN** cho ảnh và trang.

## 4. Nội dung tin

- **Headline rõ ràng, không giật tít lừa.** Google Spam Policies có mục riêng về misleading content.
- **`headline` trong schema nên khớp `<h1>`.**
- **Cập nhật bài đang diễn ra** thay vì tạo bài mới — giữ tín hiệu tích luỹ. Cập nhật `dateModified`.
- **Ghi rõ nguồn và trích dẫn** — [[E-E-A-T]].
- **Đính chính công khai** khi sai — Trust signal quan trọng với publisher.
- **Tách bài tin khỏi bài evergreen** trong kiến trúc — chúng có vòng đời khác nhau.

## 5. Vòng đời nội dung tin

| Giai đoạn | Việc |
|---|---|
| **0–48 giờ** | Top Stories, news sitemap, tốc độ là tất cả |
| **48 giờ – 1 tháng** | Chuyển sang cạnh tranh organic thường |
| **1 tháng+** | Phần lớn bài tin chết; một số thành evergreen |
| **1 năm+** | Cân nhắc gộp/cắt — [[Content Refresh and Pruning]] |

Site tin lâu năm tích luỹ hàng chục nghìn bài chết ⇒ nguồn [[Indexing and Index Bloat]] lớn. Cần chiến lược lưu trữ có ý thức.

## 6. Cạm bẫy

- **Đổi URL sau khi xuất bản.** Mất chỗ trong Top Stories.
- **`datePublished` sai hoặc thiếu timezone.**
- **Cập nhật `dateModified` mà không đổi nội dung** để "làm mới" bài. Google phát hiện được và đây là vi phạm Trust.
- **Tạo bài mới cho mỗi cập nhật** của cùng một sự kiện. Chia nhỏ tín hiệu.
- **News sitemap chứa bài cũ hơn 48 giờ.** Vi phạm đặc tả.
- **CSR.** Cơ hội Top Stories gần như bằng 0.
- **Không có chiến lược lưu trữ.** Index bloat sau vài năm.
- **Giật tít không khớp nội dung.** Vi phạm chính sách và hại Trust.

## 7. Checklist áp dụng

- [ ] `NewsArticle` schema đầy đủ và khớp nội dung không?
- [ ] News sitemap chỉ chứa bài ≤48 giờ không?
- [ ] Sitemap cập nhật ngay khi xuất bản (không theo cron chậm)?
- [ ] URL được đặt cuối cùng ngay từ lúc xuất bản?
- [ ] `datePublished` có timezone chính xác không?
- [ ] Bài render server-side, không phụ thuộc JS?
- [ ] Có `max-image-preview:large` và ảnh ≥1200px cho Discover không?
- [ ] Bài đang diễn ra được **cập nhật** thay vì tạo bài mới?
- [ ] Tác giả có trang riêng với schema không?
- [ ] Có chiến lược lưu trữ cho bài cũ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Publisher Center | Quản lý thông tin ấn phẩm | [Publisher Center](https://publishercenter.google.com/) |
| GSC → Discover report | Hiệu suất Discover (chỉ hiện khi đủ traffic) | [GSC](https://search.google.com/search-console) |
| GSC → Google News report | Hiệu suất trong Google News | [GSC](https://search.google.com/search-console) |
| Rich Results Test | Kiểm `NewsArticle` | [Test](https://search.google.com/test/rich-results) |

## Tham khảo
- [Google — Google News content policies and best practices](https://developers.google.com/search/docs/specialty/news)
- [Google — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google — Create a Google News sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)
- [Google — Discover and your website](https://developers.google.com/search/docs/appearance/google-discover)

## Liên kết
[[Structured Data and Rich Results]] · [[XML Sitemaps]] · [[JavaScript Rendering and SEO]] · [[E-E-A-T]] · [[Content Refresh and Pruning]] · [[SEO]]
