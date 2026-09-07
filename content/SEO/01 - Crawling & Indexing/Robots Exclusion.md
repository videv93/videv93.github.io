---
tags: [seo, technical, crawling]
status: evergreen
---
# Robots Exclusion

> Nguồn lỗi nghiêm trọng số một trong technical SEO — và gần như luôn cùng một lỗi: **nhầm "chặn crawl" với "chặn index".** Hai việc khác nhau, hai công cụ khác nhau, và dùng sai công cụ thì kết quả ngược hoàn toàn.

## 1. Ba cơ chế, phân biệt cho kỹ

| Cơ chế | Đặt ở đâu | Ngăn Googlebot **tải** trang | Ngăn URL **vào index** |
|---|---|---|---|
| `robots.txt` `Disallow` | File gốc domain | ✅ | ❌ |
| `<meta name="robots" content="noindex">` | `<head>` của HTML | ❌ | ✅ |
| `X-Robots-Tag: noindex` | HTTP header | ❌ | ✅ (dùng được cho PDF, ảnh) |

> [!warning] Cái bẫy kinh điển
> Bạn `Disallow` một thư mục để "gỡ nó khỏi Google". Googlebot **không tải trang nữa**, nên **không bao giờ đọc được** thẻ `noindex` trong đó. URL vẫn nằm trong index — hiển thị với dòng *"No information is available for this page"*. Đúng trình tự: đặt `noindex` → chờ Google crawl lại và deindex → **sau đó** mới `Disallow` (nếu vẫn cần).

## 2. Cú pháp `robots.txt` — những chỗ hay sai

```
User-agent: *
Disallow: /admin/
Disallow: /*?sessionid=
Allow: /admin/public-page.html

User-agent: Googlebot
Disallow: /no-google/

Sitemap: https://example.com/sitemap_index.xml
```

Quy tắc phải nhớ:

1. **Khối `User-agent` không cộng dồn.** Googlebot đọc khối `Googlebot` và **bỏ qua hoàn toàn** khối `*`. Nếu bạn thêm khối riêng cho Googlebot, phải chép lại mọi rule chung vào đó.
2. **Rule cụ thể hơn thắng**, không phải rule đứng trước. `Allow: /admin/public-page.html` thắng `Disallow: /admin/`.
3. **Chỉ hỗ trợ hai wildcard**: `*` (chuỗi bất kỳ) và `$` (kết thúc URL). Không có regex.
4. **Phân biệt hoa thường** với đường dẫn.
5. **`robots.txt` chỉ áp cho đúng scheme + host + port.** `https://example.com/robots.txt` không áp cho `https://sub.example.com/`.
6. **`Crawl-delay` bị Google bỏ qua** hoàn toàn. Bing tôn trọng.
7. **`Noindex:` trong `robots.txt`** — Google **ngừng hỗ trợ từ 2019**. Nếu bạn thấy nó trong file cũ, nó không làm gì cả.

## 3. Giá trị `meta robots` đầy đủ

| Giá trị | Tác dụng |
|---|---|
| `noindex` | Không đưa vào index |
| `nofollow` | Không truyền tín hiệu qua **mọi** link trên trang |
| `noarchive` | Không lưu bản cache |
| `nosnippet` | Không hiện đoạn mô tả |
| `max-snippet:[n]` | Giới hạn độ dài snippet |
| `max-image-preview:[none\|standard\|large]` | Kích thước ảnh preview |
| `noimageindex` | Không index ảnh trên trang |
| `unavailable_after:[date]` | Tự deindex sau ngày cho trước |
| `notranslate` | Không đề nghị dịch |

`nosnippet` và `max-snippet` cũng ảnh hưởng tới việc trang có bị dùng trong AI Overview không — xem [[AI Search and Zero Click]] và [[Generative Engine Optimization]].

## 4. Chặn AI crawler — quyết định riêng

`robots.txt` cũng là nơi khai báo với crawler của mô hình ngôn ngữ:

```
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

> [!note] `Google-Extended` ≠ `Googlebot`
> `Google-Extended` chỉ điều khiển việc dùng nội dung cho huấn luyện Gemini và cho AI Overview grounding. Chặn nó **không** ảnh hưởng xếp hạng Search. Đây là quyết định kinh doanh (bảo vệ nội dung) đổi lấy hiển thị trong AI — xem [[Generative Engine Optimization]].

## 5. Cạm bẫy

- **`Disallow: /` sót lại trên production.** Lỗi tốn kém nhất trong nghề. Xem [[Site Migration]] — luôn kiểm `robots.txt` ngay sau khi deploy.
- **Chặn CSS/JS.** Google cần chúng để render, chặn = thấy trang vỡ.
- **Dùng `robots.txt` để giấu nội dung nhạy cảm.** File này công khai và là bản đồ chỉ đường tới đúng thứ bạn muốn giấu. Dùng xác thực thật.
- **`noindex` + `nofollow` cùng lúc trên trang cần gỡ.** `nofollow` chặn Google đi tiếp, làm chậm việc phát hiện `noindex` ở các trang con. Dùng `noindex, follow`.
- **`noindex` trên trang bị `Disallow`.** Vô hiệu — xem mục 1.
- **Quên `X-Robots-Tag` cho file không phải HTML.** PDF, DOCX không có `<head>`; chỉ header mới điều khiển được.

## 6. Checklist áp dụng

- [ ] `robots.txt` production đã được kiểm bằng GSC robots.txt Tester chưa?
- [ ] Có `Disallow: /` nào sót không?
- [ ] CSS/JS có bị chặn không?
- [ ] Nếu có khối `User-agent: Googlebot` riêng — đã chép lại đủ rule chung chưa?
- [ ] Trang cần gỡ index dùng `noindex` (không phải `Disallow`) chưa?
- [ ] Trang `noindex` có bị `Disallow` đồng thời không?
- [ ] File PDF/tài liệu cần chặn đã có `X-Robots-Tag` chưa?
- [ ] Đã quyết định (có ghi lại lý do) về `Google-Extended` và `GPTBot` chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC robots.txt report | Xem bản Google đang dùng | [GSC](https://search.google.com/search-console) |
| GSC URL Inspection | Cho biết URL có bị chặn không | [GSC](https://search.google.com/search-console) |
| Google robots.txt parser (open source) | Chính bộ parser Google dùng | [GitHub](https://github.com/google/robotstxt) |

## Tham khảo
- [Google — Robots.txt introduction and guide](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google — Robots meta tag, data-nosnippet, and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [RFC 9309 — Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)
- [Google — Overview of Google crawlers and user-triggered fetchers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)

## Liên kết
[[Crawling and Crawl Budget]] · [[Indexing and Index Bloat]] · [[HTTP Status Codes for SEO]] · [[Site Migration]] · [[Generative Engine Optimization]] · [[SEO]]
