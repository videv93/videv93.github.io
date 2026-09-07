---
tags: [seo, technical, http]
status: evergreen
---
# HTTP Status Codes for SEO

> Status code là **cách duy nhất** server nói chuyện trực tiếp với crawler. Trả sai code là nói dối Googlebot, và hậu quả thường xuất hiện muộn — sau khi đã mất traffic.

## 1. Bảng tra cứu

| Code | Nghĩa | Googlebot làm gì | Dùng khi |
|---|---|---|---|
| `200 OK` | Bình thường | Index nếu đủ chất lượng | Trang hợp lệ |
| `301 Moved Permanently` | Chuyển vĩnh viễn | Chuyển index sang URL mới, truyền tín hiệu | Đổi URL, [[Site Migration]] |
| `302 Found` / `307` | Tạm thời | Giữ URL cũ trong index | A/B test, bảo trì ngắn |
| `304 Not Modified` | Không đổi | Tiết kiệm crawl budget | Có `ETag`/`Last-Modified` |
| `404 Not Found` | Không tìm thấy | Deindex sau vài lần crawl | Trang không tồn tại |
| `410 Gone` | Đã xoá vĩnh viễn | Deindex **nhanh hơn** 404 | Cố tình xoá hẳn |
| `429 Too Many Requests` | Quá tải | **Giảm crawl rate** | Rate limit — cẩn thận với Googlebot |
| `451` | Chặn vì pháp lý | Deindex | Gỡ theo yêu cầu pháp luật |
| `500`/`502`/`503` | Lỗi server | Tạm dừng crawl; kéo dài ⇒ deindex | Sự cố |
| `503 + Retry-After` | Bảo trì có kế hoạch | Quay lại sau, **giữ index** | Bảo trì đúng cách |

> [!warning] `503` là bạn, `500` là kẻ thù
> Khi bảo trì, trả `503` kèm header `Retry-After`. Google giữ nguyên index và quay lại. Trả `500` (hoặc tệ hơn: `200` với trang "đang bảo trì") sẽ làm hỏng index nếu kéo dài quá vài ngày.

## 2. Redirect — quy tắc

1. **301 cho mọi thay đổi vĩnh viễn.** `302` giữ URL cũ trong index; dùng nhầm `302` cho migration là lỗi kinh điển.
2. **Redirect 1 hop.** Mỗi hop là một request và một chút hao hụt. Chuỗi >3 hop có thể bị Google bỏ dở.
3. **Không redirect hàng loạt về trang chủ.** Google coi đó là **soft 404** — không truyền tín hiệu gì. Redirect tới trang *tương đương gần nhất*, hoặc trả `404` trung thực.
4. **Không tạo vòng lặp redirect.**
5. **Meta refresh và JS redirect** đều hoạt động nhưng chậm hơn và yếu hơn. Dùng HTTP redirect.
6. **Redirect giữ nguyên tín hiệu link** — Google xác nhận `301` không còn "mất PageRank" như tin đồn cũ. Xem [[Backlink Fundamentals]].

## 3. Soft 404 — lỗi âm thầm nhất

**Soft 404** = server trả `200` nhưng nội dung nói "không tìm thấy" / trống rỗng. Googlebot phát hiện được và đối xử như 404, nhưng bạn mất crawl budget và GSC báo lỗi.

Nguồn thường gặp:

- SPA trả `200` cho mọi route rồi JS hiện "Not found" — xem [[JavaScript Rendering and SEO]]
- Trang danh mục rỗng (`0 kết quả`) — [[Ecommerce SEO]]
- Trang sản phẩm hết hàng bị làm rỗng
- Trang kết quả tìm kiếm nội bộ không có kết quả
- Trang lỗi tuỳ biến quên đổi status code

**Cách sửa:** trả đúng `404`/`410` từ server, hoặc làm trang có nội dung thật (gợi ý sản phẩm thay thế).

## 4. 404 vs 410 vs redirect — quyết định

```
Trang bị xoá
   │
   ├─ Có trang tương đương gần?  ──► 301 tới trang đó
   │
   ├─ Không, nhưng có thể quay lại? ──► 404
   │
   └─ Xoá hẳn, chắc chắn không quay lại ──► 410
```

`404` **không** phải lỗi cần sửa hết. Google nói rõ: 404 là bình thường và không phạt site. Cái cần sửa là **link nội bộ trỏ tới 404** và **404 có backlink ngoài** (hai trường hợp này mới mất giá trị thật).

## 5. Cạm bẫy

- **Trang lỗi tuỳ biến trả `200`.** Kiểm bằng `curl -I`, đừng tin mắt.
- **`429` cho Googlebot.** Rate-limit ở CDN/WAF hay chặn nhầm Googlebot. Kiểm GSC Crawl stats sau khi bật WAF mới.
- **Redirect chain sau nhiều lần migration.** Mỗi lần migration thêm một hop; sau 3 lần là chuỗi 3 hop. Làm phẳng về 1 hop.
- **`302` để lâu thành vĩnh viễn.** Google *có thể* tự coi là 301 sau thời gian dài, nhưng đừng dựa vào đó.
- **Redirect HTTPS/www không được làm phẳng.** `http://example.com` → `https://example.com` → `https://www.example.com` là 2 hop không cần thiết.
- **Chặn Googlebot bằng `403` do bot protection.** Cloudflare/WAF hay làm việc này. Kiểm bằng GSC live test.

## 6. Checklist áp dụng

- [ ] `curl -I` các trang lỗi — có trả đúng `404` không?
- [ ] Có redirect chain nào dài hơn 1 hop không?
- [ ] Migration dùng `301`, không phải `302`?
- [ ] Có redirect hàng loạt về trang chủ không?
- [ ] GSC có báo soft 404 không? Nguồn ở đâu?
- [ ] Bảo trì có dùng `503 + Retry-After` không?
- [ ] WAF/CDN có chặn Googlebot bằng `403`/`429` không?
- [ ] Link nội bộ trỏ tới 404 đã được sửa chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `curl -I -L` | Xem toàn bộ chuỗi redirect và code | — |
| Screaming Frog | Báo cáo redirect chain, soft 404 toàn site | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| GSC URL Inspection | Code Google **thật sự** nhận được | [GSC](https://search.google.com/search-console) |
| httpstatus.io | Kiểm nhanh chuỗi redirect hàng loạt | [httpstatus](https://httpstatus.io/) |

## Tham khảo
- [Google — How HTTP status codes, network and DNS errors affect Google Search](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- [Google — Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google — Fix Soft 404 errors](https://support.google.com/webmasters/answer/181708)
- [Google Search Central — Pause your online business the right way](https://developers.google.com/search/blog/2020/03/website-pause-blog)

## Liên kết
[[Canonicalization]] · [[Site Migration]] · [[Indexing and Index Bloat]] · [[JavaScript Rendering and SEO]] · [[Crawling and Crawl Budget]] · [[SEO]]
