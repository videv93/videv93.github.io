---
tags: [seo, technical, international]
status: evergreen
---
# International SEO and hreflang

> `hreflang` **không phải tín hiệu xếp hạng** — nó là tín hiệu **chọn phiên bản**. Nó nói với Google: "các URL này là cùng nội dung cho các đối tượng khác nhau; hãy hiện đúng bản cho đúng người." Nhầm nó với công cụ tăng hạng dẫn tới triển khai sai.

## 1. Ba chiến lược cấu trúc

| Cấu trúc | Ví dụ | Ưu | Nhược |
|---|---|---|---|
| **ccTLD** | `example.vn`, `example.de` | Tín hiệu địa lý mạnh nhất, tin cậy với người dùng địa phương | Đắt, mỗi domain xây authority riêng từ đầu |
| **Subdomain** | `vn.example.com` | Tách hạ tầng dễ | Chia sẻ authority không đảm bảo |
| **Subfolder** | `example.com/vn/` | Dồn authority về một domain — **mặc định nên chọn** | Tín hiệu địa lý yếu hơn ccTLD |

**Khuyến nghị mặc định: subfolder**, trừ khi có lý do pháp lý/thương hiệu bắt buộc ccTLD. Xem [[Site Architecture and URL Design]].

> [!note] Tham số URL (`?lang=vi`) là lựa chọn tệ nhất
> Google khuyến cáo tránh. Nó gây trùng lặp, khó khai hreflang, và dễ bị bỏ qua.

## 2. Cú pháp hreflang

Ba nơi khai được — **chọn một, không trộn**:

**Trong `<head>`** (phổ biến nhất):
```html
<link rel="alternate" hreflang="vi-VN" href="https://example.com/vn/trang/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/us/page/" />
<link rel="alternate" hreflang="en"    href="https://example.com/en/page/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

**Trong [[XML Sitemaps]]** — tốt nhất cho site lớn, tránh nhồi hàng chục thẻ vào mỗi trang.

**Trong HTTP header** — cho file không phải HTML (PDF).

## 3. Bốn quy tắc bắt buộc

1. **Đối xứng (return link).** Nếu A khai B thì B **phải** khai A. Thiếu chiều ngược lại ⇒ Google bỏ qua toàn bộ cụm. Đây là lỗi hreflang phổ biến nhất.
2. **Tự khai chính mình.** Mỗi trang phải có một `hreflang` trỏ về chính nó.
3. **URL tuyệt đối**, đúng scheme và host.
4. **Mã ngôn ngữ ISO 639-1, mã vùng ISO 3166-1 Alpha-2.** `hreflang="vi-VN"` đúng; `hreflang="vn"` **sai** (VN không phải mã ngôn ngữ). Ngôn ngữ bắt buộc, vùng tuỳ chọn — nhưng **không được** khai vùng mà thiếu ngôn ngữ.

**`x-default`**: trang mặc định cho người dùng không khớp phiên bản nào. Nên có, thường là trang chọn ngôn ngữ hoặc bản tiếng Anh quốc tế.

## 4. hreflang và canonical — quan hệ hay bị làm sai

| Đúng | Sai |
|---|---|
| Mỗi bản ngôn ngữ **self-canonical** | Canonical mọi bản về bản tiếng Anh |
| hreflang nối các bản với nhau | Dùng canonical thay hreflang |

Canonical mọi phiên bản về một bản là cách chắc chắn để **xoá sổ các bản còn lại khỏi index**. Xem [[Canonicalization]].

## 5. Nội dung trùng lặp giữa các vùng cùng ngôn ngữ

Trường hợp khó nhất: `en-US`, `en-GB`, `en-AU` nội dung gần như giống hệt.

- hreflang xử lý được — Google hiểu đây là phiên bản cho vùng khác nhau, **không phạt trùng lặp**.
- Nhưng nếu nội dung giống 100%, Google có thể tự chọn một bản để hiện cho mọi vùng.
- Cách làm tốt: khác biệt hoá thật (đơn vị tiền tệ, ví dụ địa phương, thông tin vận chuyển, liên hệ địa phương).

## 6. Cạm bẫy

- **Thiếu return link.** Xem quy tắc 1 — lỗi số một.
- **Dùng `hreflang="vn"`, `hreflang="uk"`, `hreflang="cn"`.** Sai mã. Đúng là `vi`, `en-GB`, `zh`.
- **hreflang trỏ tới URL redirect hoặc 404.** Cụm bị vô hiệu.
- **hreflang sinh bằng JS.** Rủi ro cao — [[JavaScript Rendering and SEO]].
- **Tự động chuyển hướng theo IP.** Googlebot crawl chủ yếu từ US ⇒ chỉ thấy bản US, các bản khác không được index. Dùng **banner gợi ý** thay vì redirect cưỡng bức.
- **Dịch máy hàng loạt không duyệt.** Vi phạm chính sách chất lượng — [[AI Generated Content and SEO]].
- **Chỉ dịch nội dung, không dịch URL/metadata.** Slug tiếng Anh trong bản tiếng Việt làm giảm khớp truy vấn.
- **Quên `x-default`.**

## 7. Checklist áp dụng

- [ ] Mọi cặp hreflang có return link đối xứng không?
- [ ] Mỗi trang có tự khai chính nó không?
- [ ] Mã ngôn ngữ/vùng có đúng chuẩn ISO không?
- [ ] Mỗi bản có self-canonical (không canonical chéo) không?
- [ ] URL trong hreflang có trả `200` không?
- [ ] Có `x-default` không?
- [ ] Site có tự redirect theo IP không? Nếu có, đã đổi sang banner chưa?
- [ ] URL slug và metadata đã được dịch, không chỉ nội dung?
- [ ] GSC (property riêng cho từng thư mục vùng) có báo lỗi hreflang không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog — hreflang report | Phát hiện thiếu return link hàng loạt | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| hreflang Tags Testing Tool (Merkle) | Kiểm nhanh một URL | [Merkle](https://technicalseo.com/tools/hreflang/) |
| GSC International Targeting | ⚠️ Đã bị Google gỡ bỏ — dùng crawler thay thế | — |

## Tham khảo
- [Google — Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [ISO 639-1 language codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)
- [Ahrefs — Hreflang: The Easy Guide](https://ahrefs.com/blog/hreflang-tags/)

## Liên kết
[[Canonicalization]] · [[Site Architecture and URL Design]] · [[XML Sitemaps]] · [[Site Migration]] · [[AI Generated Content and SEO]] · [[SEO]]
