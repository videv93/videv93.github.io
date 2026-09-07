---
tags: [seo, technical, ecommerce]
status: evergreen
---
# Pagination and Faceted Navigation

> Nguồn sinh URL vô hạn lớn nhất trên web. Một trang danh mục với 6 bộ lọc, mỗi bộ 5 lựa chọn, có thể sinh **hàng chục nghìn URL** — và Google sẽ cố crawl phần lớn trong số đó.

## 1. Vì sao đây là vấn đề nghiêm trọng

Phép tính: 6 facet × 5 giá trị, cho phép kết hợp và sắp xếp
```
số tổ hợp = 6^5 × (số kiểu sort) × (số trang phân trang)
```
Con số này vượt xa số sản phẩm thật. Hệ quả:

- Đốt [[Crawling and Crawl Budget]] vào URL vô giá trị
- [[Indexing and Index Bloat]] — hàng nghìn trang gần trùng lặp
- Chia nhỏ tín hiệu: 50 biến thể URL của cùng một danh mục, mỗi cái vài link
- Google mất thời gian phát hiện trang sản phẩm mới

## 2. Phân loại facet — quyết định trước khi kỹ thuật

Đây là bước quan trọng nhất và là bước hay bị bỏ qua:

| Loại facet | Có nhu cầu tìm kiếm? | Xử lý |
|---|---|---|
| **Có giá trị SEO** — "giày chạy bộ nam", "áo khoác nữ size L" | ✅ Có người tìm | Cho index, URL sạch, nội dung riêng, link từ menu |
| **Không có giá trị** — sort theo giá, xem 24/48/96, màu hiếm | ❌ Không ai tìm | Không index |
| **Vô nghĩa** — sessionid, tracking | ❌ | Chặn hoàn toàn |

**Cách quyết định:** kiểm volume và SERP cho tổ hợp facet đó — [[Keyword Research]]. Nếu có truy vấn thật và SERP có trang danh mục, đó là facet đáng index.

> [!note] Quy tắc thực dụng
> Cho index **một tập nhỏ, được chọn thủ công** các tổ hợp facet có nhu cầu thật. Chặn phần còn lại. Đừng cố index mọi tổ hợp và cũng đừng chặn hết.

## 3. Công cụ kỹ thuật

| Công cụ | Dùng cho | Ghi chú |
|---|---|---|
| `robots.txt Disallow` | Tham số vô nghĩa quy mô lớn (`?sort=`, `?sessionid=`) | Ngăn crawl, **không** ngăn index nếu có link — [[Robots Exclusion]] |
| `noindex, follow` | Tổ hợp facet không giá trị nhưng cần cho người dùng | Cho phép crawl xuống sản phẩm |
| `rel=canonical` | Biến thể gần trùng | Trỏ về danh mục gốc — [[Canonicalization]] |
| Link `nofollow` tới facet | Giảm khám phá | Tác dụng hạn chế |
| **Không tạo link crawl được** | Tốt nhất | Render facet bằng JS/POST không sinh `<a href>` |
| URL sạch cho facet có giá trị | `/giay-chay-bo/nam/` thay `?cat=1&gender=2` | Dễ index, dễ link |

**Thứ tự ưu tiên:** đừng tạo URL trước, rồi mới chặn. **Không sinh link crawl được cho facet không giá trị ngay từ đầu** là giải pháp sạch nhất.

## 4. Phân trang — hiện trạng

> [!warning] `rel=next` / `rel=prev` **đã chết**
> Google công bố (2019) rằng họ **đã ngừng dùng** chúng từ nhiều năm trước mà không thông báo. Nhiều hướng dẫn viết trước 2019 vẫn khuyên dùng. Xem [[SEO Tactics Half-Life]].

Cách làm đúng hiện nay:

1. **Mỗi trang phân trang là một URL riêng, self-canonical.** Không canonical `/page/2/` về `/page/1/` — chúng có nội dung khác nhau.
2. **Không `noindex` trang phân trang** — chúng là đường để Googlebot tới sản phẩm. Nếu `noindex`, dùng `noindex, follow`.
3. **`<title>` khác nhau** — thêm "Trang 2" để tránh trùng lặp — [[Title Tags and Meta Descriptions]].
4. **Link phân trang phải là `<a href>` thật**, không phải nút JS — [[JavaScript Rendering and SEO]].
5. **Infinite scroll cần link phân trang thay thế.** Googlebot không cuộn. Cách chuẩn: infinite scroll cho người dùng + `<a href>` phân trang trong HTML (có thể ẩn bằng CSS).
6. **Trang "View All"** — nếu nhanh và hợp lý, Google thường ưu tiên nó. Cân nhắc canonical các trang phân trang về View All.

## 5. Cạm bẫy

- **Canonical mọi trang phân trang về trang 1.** Google bỏ qua canonical đó, và sản phẩm ở trang 5 mất đường được khám phá.
- **`noindex` trang phân trang không kèm `follow`.** Cắt đường tới sản phẩm.
- **Chặn `robots.txt` sau khi URL đã được index.** Chúng kẹt lại trong index không có snippet — [[Robots Exclusion]].
- **Cho index mọi tổ hợp facet "để phủ nhiều từ khoá".** Kết quả là hàng nghìn trang mỏng và index bloat.
- **Trang facet không có nội dung riêng.** Nếu cho index, phải có tiêu đề, mô tả, nội dung riêng — không chỉ danh sách sản phẩm lọc.
- **Không giới hạn tổ hợp.** Cho phép chọn 5 facet cùng lúc sinh URL không giới hạn. Giới hạn ở 2 facet crawl được.
- **Không đo.** Kiểm `site:` và GSC theo path để biết bao nhiêu URL facet đang được index.

## 6. Checklist áp dụng

- [ ] Đã phân loại facet thành 3 nhóm (mục 2) chưa?
- [ ] Tổ hợp facet cho index có được chọn thủ công, dựa trên nhu cầu tìm kiếm thật không?
- [ ] Facet không giá trị có sinh `<a href>` crawl được không?
- [ ] Trang phân trang có self-canonical không?
- [ ] Link phân trang là `<a href>` thật trong HTML thô?
- [ ] Infinite scroll có link phân trang thay thế không?
- [ ] Title trang phân trang có khác nhau không?
- [ ] Đã đếm số URL tham số đang được index (GSC theo path) chưa?
- [ ] Trang facet được index có nội dung riêng không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Đếm URL tham số, phát hiện bùng nổ tổ hợp | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| GSC Crawl Stats | Xem Googlebot đang tiêu crawl vào đâu | [GSC](https://search.google.com/search-console) |
| Log file analysis | Sự thật về URL nào bị crawl — [[Log File Analysis]] | — |

## Tham khảo
- [Google — Faceted navigation best practices](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation)
- [Google Search Central Blog — rel=next/prev is not used](https://developers.google.com/search/blog/2019/03/rel-next-prev)
- [Google — Large site owner's guide to managing crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
- [Google — Ecommerce sites: pagination and incremental page loading](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)

## Liên kết
[[Ecommerce SEO]] · [[Crawling and Crawl Budget]] · [[Indexing and Index Bloat]] · [[Canonicalization]] · [[Site Architecture and URL Design]] · [[SEO]]
