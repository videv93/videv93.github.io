---
tags: [seo, technical, indexing]
status: evergreen
---
# Canonicalization

> `rel=canonical` là một **gợi ý mạnh, không phải chỉ thị**. Google tự chọn canonical cho mỗi cụm trùng lặp, và khi Google không đồng ý với bạn, đó luôn là dấu hiệu có mâu thuẫn tín hiệu ở chỗ khác.

## 1. Vì sao trùng lặp phát sinh

Hầu hết trùng lặp không do ai cố ý tạo ra:

| Nguồn | Ví dụ |
|---|---|
| Scheme/host | `http://` vs `https://`, `www` vs không `www` |
| Dấu `/` cuối | `/page` vs `/page/` |
| Tham số | `?utm_source=`, `?sort=price`, `?sessionid=` |
| Chữ hoa/thường | `/Page` vs `/page` |
| Index file | `/` vs `/index.html` |
| Faceted nav | [[Pagination and Faceted Navigation]] |
| Phân trang | `/blog/page/2/` |
| Biến thể sản phẩm | `/ao?size=M` vs `/ao?size=L` — [[Ecommerce SEO]] |
| Bản in / AMP | `/print/`, `/amp/` |
| Đa vùng cùng ngôn ngữ | `/en-us/` vs `/en-gb/` — [[International SEO and hreflang]] |

## 2. Tín hiệu canonical Google dùng, xếp theo sức mạnh

Google tổng hợp nhiều tín hiệu; `rel=canonical` chỉ là một:

1. **Redirect 301** — mạnh nhất
2. **`rel=canonical`**
3. **URL trong [[XML Sitemaps]]**
4. **[[Internal Linking]]** — bạn tự link tới bản nào nhiều hơn
5. **hreflang** khai chéo
6. **HTTPS ưu tiên hơn HTTP**
7. **URL "đẹp" hơn** — ngắn hơn, ít tham số hơn
8. **Backlink ngoài** trỏ tới bản nào

> [!warning] Mâu thuẫn tín hiệu là nguyên nhân số một khiến Google bỏ qua canonical của bạn
> Ví dụ điển hình: `rel=canonical` trỏ về `/san-pham/`, nhưng sitemap liệt kê `/san-pham/?variant=1`, và menu nội bộ link tới `/san-pham/?variant=1`. Google thấy 2 phiếu chống 1 và chọn ngược lại. **Sửa canonical không đủ — phải làm mọi tín hiệu đồng thuận.**

## 3. Quy tắc dùng đúng

```html
<link rel="canonical" href="https://example.com/duong-dan/" />
```

- **URL tuyệt đối**, đúng scheme và host.
- **Self-canonical trên mọi trang.** Trang chuẩn phải trỏ về chính nó. Rẻ, và chặn được trùng lặp do tham số.
- **Một `rel=canonical` duy nhất** mỗi trang. Nhiều thẻ ⇒ Google bỏ qua tất cả.
- Đặt trong `<head>`, hoặc dùng header `Link: <...>; rel="canonical"` cho PDF/file.
- **Canonical trỏ tới trang trả `200`, self-canonical, index được.** Trỏ tới 404/redirect/noindex là vô hiệu.
- **Không** canonical trang phân trang `/page/2/` về `/page/1/` — chúng có nội dung khác nhau. Xem [[Pagination and Faceted Navigation]].
- **Không** canonical trang nội dung khác nhau về một trang chung ("canonical gộp bừa"). Google sẽ bỏ qua.

## 4. Canonical vs các công cụ khác

| Tình huống | Dùng gì |
|---|---|
| Nội dung **giống nhau**, cả hai URL cần tồn tại | `rel=canonical` |
| URL cũ **không cần tồn tại** nữa | `301` |
| Trang cần cho người dùng, không cần cho search | `noindex, follow` |
| Nội dung cùng nghĩa, **khác ngôn ngữ/vùng** | `hreflang` + self-canonical mỗi bản |
| Nội dung đăng lại trên site khác | `rel=canonical` cross-domain |
| Trang không còn tồn tại vĩnh viễn | `410` |

> [!note] `noindex` và `canonical` **không** nên dùng cùng nhau
> Google nhận tín hiệu mâu thuẫn: "gộp trang này vào trang kia" *và* "đừng index trang này". Chọn một.

## 5. Cạm bẫy

- **Canonical trỏ tới trang bị `noindex`.** Google có thể lan `noindex` sang trang gốc. Lỗi nguy hiểm.
- **Canonical hàng loạt về trang chủ.** Một mẫu lỗi CMS phổ biến; nó xoá sổ mọi trang con khỏi index.
- **Quên self-canonical trên trang có tham số UTM.** Mỗi chiến dịch marketing sinh thêm một bản trùng lặp.
- **Canonical sinh bằng JavaScript.** Google *có thể* thấy sau khi render, nhưng độ trễ và rủi ro cao. Đặt trong HTML thô — xem [[JavaScript Rendering and SEO]].
- **Canonical trỏ tương đối sai.** `href="/page/"` trên trang có `<base>` khác sẽ giải nghĩa sai.
- **Đổi canonical liên tục.** Google cần thời gian ổn định; đổi qua lại làm chậm cả cụm.

## 6. Checklist áp dụng

- [ ] Mọi trang có đúng **một** `rel=canonical` không?
- [ ] Trang chuẩn có self-canonical không?
- [ ] Canonical dùng URL tuyệt đối, HTTPS, đúng host không?
- [ ] Canonical có trỏ tới trang `200`, index được không?
- [ ] Sitemap, internal link, và canonical có **đồng thuận** không?
- [ ] GSC báo "Google-selected canonical" trùng với khai báo của bạn không?
- [ ] Có trang nào vừa `noindex` vừa `canonical` không?
- [ ] Tham số UTM có tạo bản trùng lặp được index không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC URL Inspection | Hiện "User-declared" vs "Google-selected canonical" | [GSC](https://search.google.com/search-console) |
| Screaming Frog | Báo cáo canonical toàn site, phát hiện chuỗi canonical | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Sitebulb | Trực quan hoá cụm trùng lặp | [Sitebulb](https://sitebulb.com/) |

## Tham khảo
- [Google — Consolidate duplicate URLs with canonicals](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google — How Google canonicalization works](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google — Avoid creating duplicate content](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Moz — Canonical Tag](https://moz.com/learn/seo/canonicalization)

## Liên kết
[[Indexing and Index Bloat]] · [[HTTP Status Codes for SEO]] · [[Pagination and Faceted Navigation]] · [[International SEO and hreflang]] · [[XML Sitemaps]] · [[SEO]]
