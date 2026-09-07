---
tags: [seo, on-page]
status: evergreen
---
# Title Tags and Meta Descriptions

> `<title>` là yếu tố on-page mạnh nhất còn lại. Meta description **không phải ranking factor** — nó là văn bản quảng cáo ảnh hưởng CTR. Hai thứ khác nhau hoàn toàn về mục đích và về mức Google can thiệp.

## 1. Google viết lại tiêu đề — thực tế phải chấp nhận

Nghiên cứu ngành (Zyppy, 2021, trên ~80.000 kết quả) cho thấy Google viết lại tiêu đề khoảng **60%** số lần. Meta description bị viết lại còn nhiều hơn — nhiều nghiên cứu báo **70%+**.

**Google hay viết lại khi:**

| Nguyên nhân | Cách tránh |
|---|---|
| Tiêu đề quá dài, bị cắt | Giữ trong ~580px (≈55–60 ký tự Latin) |
| Nhồi từ khoá / lặp | Viết tự nhiên, mỗi khái niệm một lần |
| Tiêu đề "boilerplate" giống nhau toàn site | Mỗi trang một tiêu đề riêng |
| Tiêu đề không mô tả nội dung | Khớp với H1 và nội dung thật |
| Tiêu đề rỗng hoặc chỉ có tên brand | Luôn có phần mô tả nội dung |
| Có ký tự lạ, emoji thừa | Dùng ký tự thường |

> [!note] Viết lại không phải lỗi cần "sửa"
> Google viết lại vì cho rằng tiêu đề khác phù hợp hơn với truy vấn cụ thể. Nếu bản viết lại hợp lý, để yên. Chỉ can thiệp khi bản viết lại **sai hoặc gây hại** (mất tên brand, lấy nhầm text từ menu).

## 2. Công thức viết title

```
[Từ khoá chính] [bổ ngữ tạo khác biệt] | [Brand]
```

Ví dụ:
- ❌ `SEO | Công ty ABC` — không có nội dung
- ❌ `SEO, tối ưu SEO, dịch vụ SEO, SEO web giá rẻ | ABC` — nhồi
- ✅ `Core Web Vitals: cách đo và tối ưu LCP, INP, CLS | ABC`

Quy tắc:

1. **Từ khoá chính ở đầu** — quan trọng khi tiêu đề bị cắt.
2. **Một tiêu đề, một intent.** Xem [[Intent Mapping]].
3. **Brand ở cuối**, trừ trang chủ và trang brand-navigational.
4. **Khác biệt hoá bằng thông tin, không bằng tính từ.** "7 bước", "2026", "có ví dụ code" > "tốt nhất", "hàng đầu".
5. **Title ≠ H1 là bình thường.** Title viết cho SERP (có brand, ngắn), H1 viết cho người đã vào trang. Xem [[Heading Structure and Content Outline]].
6. **Trang phân trang phải khác nhau** — thêm "Trang 2" — [[Pagination and Faceted Navigation]].

## 3. Meta description

- **Không phải ranking factor.** Google xác nhận nhiều lần.
- **Có ảnh hưởng CTR** khi Google dùng nó — nên nó vẫn đáng viết cho các trang quan trọng.
- Độ dài an toàn: ~155–160 ký tự desktop, ngắn hơn trên mobile.
- Nên chứa từ khoá **không phải để xếp hạng** mà vì Google **bôi đậm** từ khớp truy vấn, tăng chú ý.
- **Nên có CTA cụ thể** cho trang thương mại.
- **Với site lớn**, viết tay cho top 100 trang, để trống phần còn lại — Google tự trích đoạn phù hợp truy vấn, thường tốt hơn một mô tả chung chung.

> [!warning] Meta description trống ≠ lỗi
> Nhiều công cụ audit gắn cờ đỏ cho "missing meta description". Với trang đuôi dài, để Google tự trích thường cho CTR tốt hơn. Đừng sinh mô tả tự động hàng loạt chỉ để làm xanh báo cáo.

## 4. `<meta keywords>` và các thẻ đã chết

| Thẻ | Trạng thái |
|---|---|
| `<meta name="keywords">` | ❌ Google **bỏ qua từ 2009** |
| `<meta name="author">` | ❌ Không dùng cho xếp hạng |
| `<meta name="revisit-after">` | ❌ Chưa bao giờ tồn tại thật |
| `rel="author"` / Google Authorship | ❌ Ngừng 2014 |
| `<meta name="robots">` | ✅ Còn dùng — [[Robots Exclusion]] |
| Open Graph / Twitter Card | ✅ Cho mạng xã hội, không cho Google |

## 5. Cạm bẫy

- **Tiêu đề trùng nhau hàng loạt.** Site ecommerce hay có 500 trang cùng tiêu đề `Sản phẩm | Brand`. Kiểm bằng Screaming Frog.
- **Nhồi từ khoá.** Vừa bị viết lại vừa giảm CTR — người thật không click vào tiêu đề nhồi.
- **Tiêu đề sinh bằng JavaScript.** Rủi ro cao, độ trễ cao — [[JavaScript Rendering and SEO]].
- **Đổi tiêu đề hàng loạt mà không đo.** Đây là thay đổi **đo được** — chạy thử nghiệm có kiểm soát, xem [[SEO Testing]].
- **Đo bằng "trước/sau" mà không tính mùa vụ.** Traffic có xu hướng riêng; so cùng kỳ hoặc dùng nhóm đối chứng.
- **Nhầm CTR thấp là lỗi title.** Có thể do vị trí, do AI Overview chiếm chỗ — [[SERP Anatomy]].

## 6. Checklist áp dụng

- [ ] Mọi trang index được có `<title>` riêng biệt chưa?
- [ ] Có tiêu đề nào trùng lặp hàng loạt không (kiểm bằng crawler)?
- [ ] Từ khoá chính có nằm ở đầu tiêu đề không?
- [ ] Tiêu đề có bị cắt trên SERP không (kiểm bằng snippet preview)?
- [ ] Title có trong HTML thô, không phụ thuộc JS?
- [ ] Trang quan trọng (top 100 theo impression) đã có meta description viết tay chưa?
- [ ] Có so CTR thật trong GSC trước/sau khi đổi tiêu đề không?
- [ ] Google có đang viết lại tiêu đề theo cách gây hại không (kiểm SERP thủ công)?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Tìm title trùng/thiếu/quá dài toàn site | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Sistrix SERP Snippet Generator | Xem trước độ dài theo pixel | [Sistrix](https://app.sistrix.com/en/serp-snippet-generator) |
| GSC Performance | CTR thật theo truy vấn và trang | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Control your title links in search results](https://developers.google.com/search/docs/appearance/title-link)
- [Google — Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet)
- [Zyppy — Google Rewrites Title Tags 61% of the Time](https://zyppy.com/seo/google-title-rewrites/)
- [Google Search Central Blog — A new way to generate titles](https://developers.google.com/search/blog/2021/08/update-to-generating-page-titles)

## Liên kết
[[Heading Structure and Content Outline]] · [[SERP Anatomy]] · [[SEO Testing]] · [[SEO Content Writing]] · [[Intent Mapping]] · [[SEO]]
