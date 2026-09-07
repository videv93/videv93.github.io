---
tags: [seo, on-page, architecture]
status: evergreen
---
# Internal Linking

> Tài sản SEO bị bỏ phí nhiều nhất. Nó **miễn phí**, **hoàn toàn trong tầm kiểm soát của bạn**, và tác động thường nhanh hơn link ngoài — nhưng gần như không có team nào quản lý nó một cách có hệ thống.

## 1. Internal link làm ba việc

| Việc | Cơ chế | Đo bằng |
|---|---|---|
| **Khám phá** | Googlebot theo link để tìm URL mới | [[Log File Analysis]], thời gian tới lúc index |
| **Truyền PageRank** | Trang nhiều link ngoài chia sức mạnh cho trang được link | Thứ hạng trang đích |
| **Truyền ngữ cảnh** | Anchor text nói cho Google biết trang đích *về cái gì* | Truy vấn trang đích xếp hạng |

Việc thứ 3 là lý do internal link mạnh: **bạn kiểm soát 100% anchor text nội bộ**, khác hẳn [[Anchor Text]] của link ngoài.

## 2. Nguyên tắc

1. **Trang quan trọng phải gần trang chủ.** Mục tiêu: ≤3 click từ trang chủ tới bất kỳ trang quan trọng nào — xem [[Site Architecture and URL Design]].
2. **Link từ trang mạnh sang trang cần đẩy.** Tìm trang có nhiều backlink nhất (Ahrefs → Best by links) và thêm link từ đó tới trang mục tiêu. Đây là chiến thuật rẻ nhất và hiệu quả nhất trong toàn bộ SEO.
3. **Anchor mô tả, không phải "click here".** ✅ `hướng dẫn tối ưu LCP` ❌ `tại đây`
4. **Link trong nội dung > link trong navigation.** Link contextual mang tín hiệu mạnh hơn link boilerplate lặp trên mọi trang.
5. **Link theo hướng người đọc thật sự cần đi**, không theo sơ đồ. Link vô nghĩa làm loãng tín hiệu.
6. **Mọi trang phải có ít nhất một link nội bộ trỏ tới.** Trang mồ côi (orphan page) gần như không được index.
7. **Hai chiều trong cụm** — [[Topic Clusters]].

## 3. Phát hiện vấn đề

| Vấn đề | Cách tìm |
|---|---|
| **Orphan page** | So danh sách URL trong sitemap với URL crawler tìm được qua link. Chênh lệch = orphan |
| **Trang quá sâu** | Screaming Frog → cột "Crawl Depth" > 3 |
| **Link tới redirect/404** | Screaming Frog → Internal → Status Code ≠ 200 |
| **Trang mạnh không link đi đâu** | Ahrefs "Best by links" ∩ số outlink thấp |
| **Anchor chung chung hàng loạt** | Screaming Frog → Anchor Text report |
| **Trang cần đẩy có quá ít inlink** | So số inlink với trang cùng loại đang xếp hạng tốt |

## 4. Quy trình tối ưu — làm được trong một buổi

1. Xuất danh sách trang mục tiêu (position 11–20 trong GSC — [[Competitor Gap Analysis]]).
2. Với mỗi trang mục tiêu, tìm 5–10 trang trên site **đã nói về chủ đề đó**:
   ```
   site:example.com "cụm từ liên quan"
   ```
3. Thêm link contextual từ những trang đó, anchor mô tả.
4. Ưu tiên nguồn là trang có backlink ngoài mạnh.
5. Đo lại sau 2–4 tuần trong GSC.

> [!note] Vì sao cách này hiệu quả bất thường
> Trang ở vị trí 11–20 đã được Google chấp nhận về chất lượng; nó chỉ thiếu tín hiệu để vượt ngưỡng. Internal link là tín hiệu bạn cấp được **ngay hôm nay**, không cần xin ai.

## 5. Cạm bẫy

- **Nhồi link tự động ở footer.** Boilerplate link giá trị rất thấp và trông spam.
- **Anchor giống hệt nhau cho mọi link.** Tự nhiên hơn khi biến thể.
- **`nofollow` link nội bộ để "điều hướng PageRank".** Kỹ thuật "PageRank sculpting" **đã chết từ 2009**. `nofollow` nội bộ chỉ làm mất tín hiệu.
- **Link chỉ tồn tại sau JS.** Xem [[JavaScript Rendering and SEO]] — Googlebot chỉ theo `<a href>` thật.
- **Quá nhiều link trên một trang.** Không có giới hạn cứng, nhưng 200 link contextual trên một trang thì mỗi link gần như vô nghĩa.
- **Không cập nhật khi xuất bản bài mới.** Bài mới cần được link từ bài cũ ngay, không phải chỉ nằm trong sitemap.
- **Chỉ link một chiều từ cũ sang mới.** Bài mới cũng phải link về trang trụ và bài liên quan.

## 6. Checklist áp dụng

- [ ] Có trang mồ côi nào không (so sitemap với crawl)?
- [ ] Trang quan trọng có nằm trong ≤3 click từ trang chủ không?
- [ ] Trang có nhiều backlink nhất đang link tới trang nào cần đẩy?
- [ ] Anchor text có mô tả nội dung trang đích không?
- [ ] Có link nội bộ nào trỏ tới 404/redirect không?
- [ ] Mọi link điều hướng là `<a href>` trong HTML thô?
- [ ] Có `nofollow` nội bộ nào không cần thiết không?
- [ ] Quy trình xuất bản có bước "thêm internal link từ bài cũ" không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Crawl depth, orphan page, anchor report, inlink count | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Ahrefs — Best by links / Internal links | Tìm trang mạnh để làm nguồn link | [Ahrefs](https://ahrefs.com/) |
| Sitebulb | Trực quan hoá cấu trúc link nội bộ | [Sitebulb](https://sitebulb.com/) |
| `site:` + cụm từ | Tìm cơ hội link contextual, miễn phí | — |

## Tham khảo
- [Google — Links best practices for Google Search](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Moz — Internal Links](https://moz.com/learn/seo/internal-link)
- [Ahrefs — Internal Links for SEO](https://ahrefs.com/blog/internal-links-for-seo/)
- [Google Search Central Blog — PageRank sculpting](https://developers.google.com/search/blog/2009/06/pagerank-sculpting)

## Liên kết
[[Site Architecture and URL Design]] · [[Topic Clusters]] · [[Anchor Text]] · [[Backlink Fundamentals]] · [[Crawling and Crawl Budget]] · [[SEO]]
