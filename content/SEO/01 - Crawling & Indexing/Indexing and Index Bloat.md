---
tags: [seo, technical, indexing]
status: evergreen
---
# Indexing and Index Bloat

> Được crawl **không** đảm bảo được index. Từ 2022 Google index ngày càng chọn lọc, và câu hỏi *"vì sao trang của tôi không được index"* đã trở thành câu hỏi technical SEO phổ biến nhất.

## 1. Đọc GSC Page Indexing report

Đây là bảng tra cứu quan trọng nhất trong technical SEO. Mỗi trạng thái là một chẩn đoán khác nhau:

| Trạng thái GSC | Nghĩa thật | Hành động |
|---|---|---|
| **Discovered – currently not indexed** | Google *biết* URL nhưng **chưa buồn crawl** | Tín hiệu chất lượng/độ ưu tiên thấp. Tăng [[Internal Linking]], gộp nội dung mỏng |
| **Crawled – currently not indexed** | Đã crawl, **quyết định không index** | Nặng hơn. Nội dung không đủ khác biệt/giá trị — xem [[Topical Authority]] |
| **Duplicate, Google chose different canonical** | Google không đồng ý canonical của bạn | Xem [[Canonicalization]] |
| **Duplicate without user-selected canonical** | Trùng lặp và bạn chưa khai canonical | Khai `rel=canonical` |
| **Alternate page with proper canonical tag** | ✅ Bình thường, không phải lỗi | Không làm gì |
| **Excluded by ‘noindex’ tag** | Đúng như khai | Kiểm xem có cố ý không |
| **Blocked by robots.txt** | Không crawl được | Xem [[Robots Exclusion]] |
| **Soft 404** | Trả `200` nhưng nội dung trống/lỗi | Trả `404`/`410` thật — [[HTTP Status Codes for SEO]] |
| **Page with redirect** | ✅ Bình thường nếu redirect có chủ đích | Kiểm chuỗi redirect |
| **Not found (404)** | 404 | Bình thường nếu cố ý; sửa nếu là link gãy |
| **Server error (5xx)** | Hạ tầng | Ưu tiên cao nhất — chặn cả crawl lẫn index |

> [!warning] "Crawled – currently not indexed" tăng đều là tín hiệu chiến lược, không phải lỗi kỹ thuật
> Không có nút nào sửa được nó. Nó nói rằng Google đã đọc trang và thấy **không đủ lý do** để lưu. Câu trả lời nằm ở nội dung và ở [[Helpful Content and Core Updates]], không ở thẻ meta.

## 2. Index bloat — vấn đề ngược lại

**Index bloat** = quá nhiều URL giá trị thấp trong index, làm loãng đánh giá chất lượng toàn site và đốt [[Crawling and Crawl Budget]].

Nguồn bloat thường gặp:

1. Trang tag/archive tự sinh của CMS
2. Kết quả tìm kiếm nội bộ (`/search?q=`) — Google nói rõ **không nên** để index
3. URL faceted/filter — [[Pagination and Faceted Navigation]]
4. Trang phân trang không cần thiết
5. Trang tác giả / trang ngày tháng rỗng
6. Môi trường staging bị index (kiểm bằng `site:staging.example.com`)
7. Trang cảm ơn, trang giỏ hàng, trang in

**Phép đo nhanh:** so số URL trong sitemap với số "Indexed" trong GSC. Chênh lệch lớn theo chiều index nhiều hơn ⇒ bloat.

## 3. Quy trình xử lý: giữ, gộp, hay bỏ

Với mỗi nhóm URL giá trị thấp:

| Quyết định | Khi nào | Cách làm |
|---|---|---|
| **Giữ và cải thiện** | Có truy vấn, có link ngoài | Mở rộng nội dung — [[Content Refresh and Pruning]] |
| **Gộp** | Nhiều trang cùng intent | 301 về trang mạnh nhất + gộp nội dung |
| **Noindex** | Cần cho người dùng, không cần cho search | `<meta robots noindex, follow>` |
| **Xoá (410)** | Không giá trị cho ai | `410 Gone` + gỡ link nội bộ |
| **Chặn crawl** | Vùng lớn, đã deindex xong | `robots.txt` — **sau** khi noindex có hiệu lực |

## 4. Cạm bẫy

- **Dùng `site:` như số liệu index.** `site:example.com` là ước lượng rất thô. Chỉ [[Google Search Console]] mới đáng tin.
- **Yêu cầu index thủ công hàng loạt.** "Request indexing" trong GSC có hạn ngạch nhỏ và **không** vượt qua được đánh giá chất lượng. Nó không phải chiến lược.
- **Noindex rồi chặn robots.txt ngay.** Google không bao giờ thấy `noindex`. Chờ deindex trước.
- **Xoá hàng loạt mà không kiểm backlink.** Trang giá trị thấp với người dùng vẫn có thể mang link equity. Kiểm trước — [[Backlink Fundamentals]].
- **Để staging bị index.** Vừa lộ thông tin vừa tạo trùng lặp. Chặn bằng HTTP auth, không chỉ `robots.txt`.
- **Tưởng index nhiều là tốt.** Với site nội dung, tỷ lệ index/submitted cao mới tốt; tổng số index cao mà tỷ lệ thấp là dấu hiệu xấu.

## 5. Checklist áp dụng

- [ ] Đã đọc GSC Page indexing và phân loại từng trạng thái chưa?
- [ ] Tỷ lệ "Indexed / Submitted" theo từng sitemap là bao nhiêu?
- [ ] Có nhóm URL nào tăng "Crawled – currently not indexed" đều đặn không?
- [ ] Kết quả tìm kiếm nội bộ có bị index không?
- [ ] Staging/dev có bị index không (`site:` thử ngay)?
- [ ] Trang tag/archive có mang traffic thật không? Nếu không, noindex.
- [ ] Trước khi xoá URL — đã kiểm backlink trỏ tới chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC Page Indexing report | Nguồn sự thật duy nhất về index | [GSC](https://search.google.com/search-console) |
| GSC URL Inspection API | Kiểm trạng thái index hàng loạt | [API](https://developers.google.com/webmaster-tools/v1/urlInspection.index.inspect) |
| Screaming Frog + GSC API | Ghép crawl với dữ liệu index | [SF](https://www.screamingfrog.co.uk/seo-spider/) |

## Tham khảo
- [Google — Page Indexing report](https://support.google.com/webmasters/answer/7440203)
- [Google — Block search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google — Remove a page hosted on your site from Google](https://developers.google.com/search/docs/crawling-indexing/remove-information)
- [Ahrefs — Why Is My Website Not Showing Up on Google?](https://ahrefs.com/blog/website-not-showing-up-on-google/)

## Liên kết
[[Canonicalization]] · [[Crawling and Crawl Budget]] · [[Robots Exclusion]] · [[Content Refresh and Pruning]] · [[Google Search Console]] · [[SEO]]
