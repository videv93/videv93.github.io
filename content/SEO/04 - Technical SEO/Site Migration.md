---
tags: [seo, technical, migration, risk]
status: evergreen
---
# Site Migration

> Loại dự án **rủi ro cao nhất** trong SEO. Mất 20–50% traffic organic sau migration là kết quả phổ biến, và phần lớn thiệt hại đến từ những lỗi có thể phòng được bằng một checklist.

## 1. Sáu loại migration — rủi ro khác nhau

| Loại | Ví dụ | Rủi ro |
|---|---|---|
| **Đổi domain** | `old.com` → `new.com` | Cao |
| **HTTP → HTTPS** | | Thấp nếu redirect đúng |
| **Đổi cấu trúc URL** | `/p/123` → `/san-pham/ten/` | **Rất cao** |
| **Đổi nền tảng** | WordPress → Next.js | Cao — thay đổi cả render, URL, template |
| **Đổi thiết kế** | Giữ URL, đổi template | Trung bình — dễ mất nội dung/link |
| **Gộp/tách site** | Sáp nhập hai domain | **Rất cao** |

**Nguyên tắc số một: đừng làm hai loại cùng lúc.** Đổi domain *và* đổi cấu trúc URL *và* đổi nền tảng trong một lần là cách chắc chắn để không chẩn đoán được nguyên nhân khi traffic giảm.

## 2. Trước migration

- [ ] **Crawl toàn bộ site cũ** và lưu lại (Screaming Frog, xuất CSV). Đây là bản gốc để đối chiếu.
- [ ] **Xuất mọi URL có traffic** từ GSC (16 tháng) và GA4.
- [ ] **Xuất hồ sơ backlink** — URL nào có link ngoài quan trọng nhất ([[Backlink Fundamentals]]).
- [ ] **Ghi lại baseline**: traffic, thứ hạng top 100 truy vấn, số trang index, [[Core Web Vitals for SEO]].
- [ ] **Lập bản đồ redirect 1:1** — mọi URL cũ → URL mới tương đương. Không có URL nào để trống.
- [ ] **Kiểm bản đồ redirect** bằng crawl danh sách URL cũ trên môi trường staging.
- [ ] **Chuẩn bị staging bị chặn** bằng HTTP auth (không chỉ `robots.txt`).
- [ ] **Kiểm parity nội dung** — [[Mobile and Responsive SEO]] mục 2, áp dụng cho site mới vs cũ.
- [ ] **Chốt thời điểm**: tránh mùa cao điểm, tránh thứ Sáu, tránh gần core update đã biết.

> [!warning] Bản đồ redirect là toàn bộ dự án
> 80% thiệt hại migration đến từ redirect thiếu, redirect sai đích, hoặc redirect hàng loạt về trang chủ. Redirect về trang chủ bị Google coi là **soft 404** và **không truyền tín hiệu gì** — [[HTTP Status Codes for SEO]].

## 3. Ngày go-live

Thứ tự kiểm, ngay sau khi deploy:

1. **`robots.txt`** — có `Disallow: /` sót không? Đây là lỗi tốn kém nhất và mất 10 giây để kiểm.
2. **Thẻ `noindex`** — template staging có mang `noindex` sang production không?
3. **Redirect hoạt động** — chạy crawl danh sách URL cũ, kiểm mọi URL trả `301` tới đích đúng, **1 hop**.
4. **Canonical** — trỏ về domain mới, không sót domain cũ.
5. **Sitemap mới** đã submit; sitemap cũ vẫn để tạm (giúp Google phát hiện redirect nhanh hơn).
6. **GSC**: tạo property cho domain mới, dùng **Change of Address tool** nếu đổi domain.
7. **Analytics** hoạt động — [[GA4 for SEO]].
8. **Structured data** còn nguyên — [[Structured Data and Rich Results]].
9. **hreflang** cập nhật sang URL mới — [[International SEO and hreflang]].
10. **Internal link** trỏ trực tiếp tới URL mới, không qua redirect — [[Internal Linking]].

## 4. Sau migration — theo dõi

| Mốc | Việc |
|---|---|
| **Ngày 1–3** | Kiểm log: Googlebot có crawl URL mới không? — [[Log File Analysis]] |
| **Tuần 1** | GSC: lỗi crawl, lỗi index tăng bất thường không? |
| **Tuần 2–4** | Thứ hạng dao động là **bình thường**. Đừng hoảng và đừng đổi thêm gì |
| **Tuần 4–8** | Traffic nên hồi về ~90–100% baseline |
| **Tuần 8–12** | Nếu chưa hồi, chẩn đoán nghiêm túc (mục 5) |

**Giữ redirect ít nhất 12 tháng**, tốt nhất là vĩnh viễn. Gỡ redirect sớm là cách xoá sạch mọi tín hiệu vừa chuyển được.

## 5. Chẩn đoán khi traffic không hồi

Theo thứ tự:

1. **Redirect**: crawl lại danh sách URL cũ. Có bao nhiêu % trả `301` tới đích đúng?
2. **Index**: GSC → số trang index của site mới có gần bằng site cũ không? — [[Indexing and Index Bloat]]
3. **Nội dung**: có nội dung nào bị mất trong quá trình chuyển không? So với crawl cũ đã lưu.
4. **Render**: nền tảng mới có phụ thuộc JS không? — [[JavaScript Rendering and SEO]]
5. **Backlink**: link ngoài có trỏ tới URL đang redirect đúng không?
6. **Trùng thời điểm core update?** Kiểm [[Google Algorithm Updates]] — có thể không phải lỗi migration.

## 6. Cạm bẫy

- **`Disallow: /` sót lại.** Kiểm ngay phút đầu.
- **Redirect chain.** Migration lần 3 tạo chuỗi 3 hop. Làm phẳng.
- **Redirect về trang chủ.** Xem cảnh báo mục 2.
- **Quên `X-Robots-Tag` trên môi trường mới.**
- **Đổi cả nội dung cùng lúc.** Không phân biệt được nguyên nhân.
- **Gỡ sitemap cũ ngay lập tức.** Giữ vài tuần giúp Google phát hiện redirect.
- **Không có baseline.** Không đo được thiệt hại thì không biết đã hồi chưa.
- **Hoảng và đổi liên tục trong tuần 2.** Dao động là bình thường; đổi thêm chỉ kéo dài thời gian ổn định.

## 7. Checklist áp dụng

- [ ] Đã crawl và lưu site cũ trước khi động vào chưa?
- [ ] Bản đồ redirect có phủ **100%** URL có traffic không?
- [ ] Đã test bản đồ redirect trên staging chưa?
- [ ] Chỉ làm **một** loại migration trong lần này?
- [ ] Có baseline (traffic, thứ hạng, số trang index) được ghi lại không?
- [ ] `robots.txt` production đã kiểm trong 5 phút đầu chưa?
- [ ] Mọi redirect là 1 hop, `301`?
- [ ] Internal link đã trỏ trực tiếp URL mới chưa?
- [ ] Đã dùng Change of Address tool (nếu đổi domain)?
- [ ] Có lịch theo dõi 12 tuần và người chịu trách nhiệm không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog (list mode) | Crawl danh sách URL cũ để kiểm redirect | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| GSC Change of Address | Báo Google về đổi domain | [GSC](https://search.google.com/search-console) |
| httpstatus.io | Kiểm chuỗi redirect hàng loạt | [httpstatus](https://httpstatus.io/) |
| Wayback Machine | Đối chiếu nội dung trước migration | [Archive](https://web.archive.org/) |

## Tham khảo
- [Google — Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google — Site moves without URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes)
- [Google — Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google — Change of Address tool](https://support.google.com/webmasters/answer/9370220)

## Liên kết
[[HTTP Status Codes for SEO]] · [[Canonicalization]] · [[Crawl Auditing]] · [[Log File Analysis]] · [[Penalty Diagnosis and Recovery]] · [[SEO]]
