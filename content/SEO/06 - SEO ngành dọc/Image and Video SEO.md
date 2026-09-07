---
tags: [seo, media, technical]
status: evergreen
---
# Image and Video SEO

> Google Images và video carousel là **bề mặt tìm kiếm riêng** với thuật toán và tín hiệu riêng. Với ngành thị giác (thời trang, du lịch, ẩm thực, nội thất, bất động sản), chúng có thể mang nhiều traffic hơn kết quả text.

## 1. Image SEO — tín hiệu

| Tín hiệu | Cách làm | Mức quan trọng |
|---|---|---|
| **`alt` mô tả** | Mô tả nội dung ảnh cho người không thấy được | 🔴 Cao |
| **Tên file** | `giay-chay-bo-nike-pegasus.jpg` > `IMG_4821.jpg` | 🟡 Trung bình |
| **Văn bản xung quanh** | Caption và đoạn văn gần ảnh | 🔴 Cao |
| **Ảnh gốc, chất lượng cao** | Ảnh stock dùng chung khó xếp hạng | 🔴 Cao |
| **Cấu trúc trang** | Ảnh trong nội dung chính, không phải background CSS | 🔴 Cao |
| **Image sitemap** | Khi ảnh load bằng JS — [[XML Sitemaps]] | 🟡 |
| **`ImageObject` schema** | Cho một số rich result | 🟡 |
| **Kích thước và định dạng** | WebP/AVIF, responsive `srcset` | 🟡 (qua CWV) |
| **Lazy loading đúng cách** | `loading="lazy"` native — không phải JS tuỳ biến | 🟡 |

> [!warning] Ảnh nền CSS không được index vào Google Images
> `background-image` trong CSS **không** vào Google Images. Nếu ảnh là nội dung (sản phẩm, tác phẩm), phải là `<img>` trong HTML.

## 2. Viết `alt` cho đúng

`alt` phục vụ **hai** mục đích: truy cập ([[Accessible Markup & ARIA]]) và SEO. Viết cho mục đích một thì mục đích hai tự đạt.

- ✅ `alt="Giày chạy bộ Nike Pegasus 41 màu xanh, nhìn từ bên hông"`
- ❌ `alt="giày, giày chạy bộ, giày nike, mua giày"` — nhồi
- ❌ `alt="hình ảnh"` — vô nghĩa
- ❌ `alt=""` cho ảnh có nội dung — chỉ dùng cho ảnh trang trí thuần tuý
- ✅ `alt=""` cho icon trang trí — đúng cách

**Quy tắc:** đọc `alt` thay cho ảnh, câu văn có còn đủ nghĩa không?

## 3. Video SEO — hai đường

| Đường | Khi nào | Ghi chú |
|---|---|---|
| **YouTube** | Muốn tiếp cận rộng, không cần traffic về site | YouTube là công cụ tìm kiếm riêng; video có thể hiện trong Google Search |
| **Tự host / nhúng trên site** | Muốn traffic và thời gian trên site | Cần `VideoObject` schema và video sitemap |

**Để video được index bởi Google:**

1. **`VideoObject` schema** với `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl` hoặc `embedUrl`, `duration`.
2. **Video sitemap** — quan trọng khi video load bằng JS.
3. **Thumbnail chất lượng, kích thước đủ lớn**, URL truy cập được.
4. **`Clip` / `SeekToAction`** cho key moments — cho phép Google hiện các mốc thời gian trong SERP.
5. **Transcript trên trang** — nội dung text để Google hiểu video nói gì. Vừa tốt cho SEO vừa tốt cho truy cập.
6. **Một video chính mỗi trang** — trang nhiều video khó xác định video nào là chính.
7. **Không chặn file video trong `robots.txt`** — [[Robots Exclusion]].

## 4. Hiệu năng — ảnh là nguyên nhân CWV số một

- **Ảnh là nguyên nhân LCP kém phổ biến nhất.** Ảnh hero cần `fetchpriority="high"` và **không** lazy load.
- **Luôn có `width` và `height`** — thiếu chúng gây CLS.
- **`srcset` + `sizes`** để không gửi ảnh 3000px cho màn hình mobile.
- **WebP/AVIF** giảm 25–50% dung lượng.
- **`loading="lazy"` cho ảnh dưới màn hình đầu**, không phải ảnh trên.

Xem [[Core Web Vitals for SEO]].

## 5. Cạm bẫy

- **Nhồi từ khoá vào `alt`.** Vi phạm và phản tác dụng cho truy cập.
- **Lazy load ảnh trên màn hình đầu.** Làm LCP tệ đi.
- **Thiếu `width`/`height`.** Nguyên nhân CLS phổ biến nhất.
- **Ảnh stock.** Khó xếp hạng vì hàng nghìn site dùng cùng ảnh.
- **Chặn thư mục ảnh trong `robots.txt`.** Mất hoàn toàn Google Images.
- **Chỉ nhúng YouTube mà không có schema/transcript.** Video không được Google Search hiểu.
- **Thumbnail video không truy cập được** (yêu cầu đăng nhập, bị chặn). Video không đủ điều kiện rich result.
- **Quên bản mobile.** Ảnh mobile độ phân giải thấp ảnh hưởng Google Images — [[Mobile and Responsive SEO]].

## 6. Checklist áp dụng

- [ ] Mọi ảnh nội dung là `<img>`, không phải CSS background?
- [ ] `alt` mô tả nội dung thật, không nhồi từ khoá?
- [ ] Ảnh có `width` và `height` không?
- [ ] Ảnh hero **không** lazy load và có `fetchpriority="high"`?
- [ ] Dùng WebP/AVIF và `srcset` chưa?
- [ ] Thư mục ảnh có bị chặn trong `robots.txt` không?
- [ ] Video có `VideoObject` schema đầy đủ không?
- [ ] Có transcript trên trang không?
- [ ] Thumbnail video có truy cập công khai không?
- [ ] Có image/video sitemap khi media load bằng JS không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Rich Results Test | Kiểm `VideoObject` | [Test](https://search.google.com/test/rich-results) |
| GSC → Video indexing report | Video nào được index, lý do bị loại | [GSC](https://search.google.com/search-console) |
| Screaming Frog | Tìm ảnh thiếu `alt`, ảnh quá nặng | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Squoosh | Nén và chuyển định dạng ảnh | [Squoosh](https://squoosh.app/) |

## Tham khảo
- [Google — Google Images SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Google — Video SEO best practices](https://developers.google.com/search/docs/appearance/video)
- [Google — Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video)
- [web.dev — Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp)

## Liên kết
[[Core Web Vitals for SEO]] · [[Accessible Markup & ARIA]] · [[Structured Data and Rich Results]] · [[XML Sitemaps]] · [[SERP Feature Targeting]] · [[SEO]]
