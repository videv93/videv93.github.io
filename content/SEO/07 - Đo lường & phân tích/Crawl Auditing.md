---
tags: [seo, technical, audit]
status: evergreen
---
# Crawl Auditing

> Chạy crawler lên site của bạn để tìm vấn đề trước khi Google tìm ra. Kỹ năng thật **không phải chạy công cụ** — đó là phần dễ — mà là **biết bỏ qua 80% cảnh báo** mà công cụ đưa ra.

## 1. Thiết lập crawl cho đúng

Trước khi chạy, cấu hình:

| Cấu hình | Đặt là gì | Vì sao |
|---|---|---|
| **User-agent** | Googlebot smartphone | Mobile-first — [[Mobile and Responsive SEO]] |
| **JavaScript rendering** | Bật (và chạy **thêm** một lần tắt) | So HTML thô vs rendered — [[JavaScript Rendering and SEO]] |
| **Tôn trọng robots.txt** | Bật lần 1, tắt lần 2 | Lần 2 để thấy cái gì đang bị chặn |
| **Crawl speed** | Giới hạn hợp lý | Đừng làm sập site production |
| **Kết nối GSC/GA4 API** | Bật | Ghép crawl với dữ liệu traffic thật |
| **Crawl subdomain** | Tuỳ tình huống | Phát hiện staging bị index |

**Chạy hai lần** (JS bật/tắt, robots tôn trọng/không) cho gấp đôi thông tin với chi phí gần như bằng không.

## 2. Ưu tiên phát hiện — cái gì thật sự quan trọng

Công cụ audit gắn cờ hàng trăm "lỗi". Thứ tự ưu tiên thật:

| Mức | Vấn đề | Vì sao nghiêm trọng |
|---|---|---|
| 🔴 **Chặn hoàn toàn** | `noindex` trên trang quan trọng, `Disallow` sai, 5xx, redirect loop | Mất traffic ngay |
| 🔴 | Trang quan trọng không được index — [[Indexing and Index Bloat]] | |
| 🟠 **Ảnh hưởng lớn** | Canonical sai/mâu thuẫn, redirect chain, soft 404 | Mất tín hiệu dần |
| 🟠 | Nội dung không có trong HTML thô | Rủi ro render |
| 🟠 | Trang mồ côi, crawl depth >4 — [[Internal Linking]] | |
| 🟡 **Nên sửa** | Title trùng/thiếu, H1 thiếu, ảnh thiếu `alt` | Bỏ phí cơ hội |
| 🟡 | Link nội bộ tới 404/redirect | |
| ⚪ **Thường bỏ qua** | "Meta description thiếu", "title quá dài 3 ký tự", "quá nhiều link ra" | Ồn hơn là hại |

> [!warning] Đừng chạy theo báo cáo "0 lỗi"
> Nhiều "lỗi" trong công cụ audit là quy ước, không phải vấn đề. Meta description trống có thể là quyết định đúng — [[Title Tags and Meta Descriptions]]. Mục tiêu là site khoẻ, không phải báo cáo xanh.

## 3. Ghép crawl với dữ liệu khác — nơi giá trị thật nằm

Crawl một mình chỉ cho biết cấu trúc. Ghép với dữ liệu khác mới ra hành động:

| Ghép với | Câu hỏi trả lời được |
|---|---|
| **GSC (impression/click)** | Trang nào có traffic nhưng crawl depth sâu? Trang nào crawl được nhưng 0 impression? |
| **Log file** | Trang nào Googlebot không bao giờ ghé? — [[Log File Analysis]] |
| **GA4** | Trang nào có traffic nhưng không chuyển đổi? |
| **Sitemap** | URL nào trong sitemap mà crawler không tìm thấy qua link? (= orphan) |
| **Backlink** | Trang 404 nào có backlink? — [[Backlink Fundamentals]] |

Bốn phép ghép này cho phần lớn giá trị của một audit kỹ thuật.

## 4. Quy trình audit định kỳ

| Tần suất | Việc |
|---|---|
| **Hàng tuần** | GSC: lỗi index mới, Manual Actions, Core Web Vitals |
| **Hàng tháng** | Crawl nhanh: 4xx/5xx, redirect chain, canonical, title trùng |
| **Hàng quý** | Crawl đầy đủ + ghép GSC/log; audit nội dung — [[Content Refresh and Pruning]] |
| **Trước mỗi deploy lớn** | Crawl staging, so với production |
| **Sau mỗi deploy lớn** | Crawl production trong 24 giờ — [[Site Migration]] |

## 5. Cạm bẫy

- **Crawl với user-agent mặc định.** Không phản ánh cái Googlebot thấy.
- **Chỉ crawl với JS bật.** Bỏ lỡ vấn đề render — phải so cả hai.
- **Không ghép với dữ liệu traffic.** Không biết vấn đề nào quan trọng.
- **Cố sửa mọi cảnh báo.** Lãng phí thời gian vào việc không ảnh hưởng gì.
- **Crawl production giờ cao điểm với tốc độ cao.** Làm chậm site thật.
- **Bỏ qua subdomain.** Staging bị index là vấn đề thật.
- **Audit một lần khi bắt đầu.** Vấn đề kỹ thuật phát sinh liên tục sau mỗi deploy.
- **Không ghi lại baseline.** Không biết vấn đề mới xuất hiện hay đã tồn tại lâu.

## 6. Checklist áp dụng

- [ ] Crawl với user-agent Googlebot smartphone chưa?
- [ ] Đã chạy cả hai lần (JS bật/tắt) chưa?
- [ ] Đã kết nối GSC API để ghép dữ liệu chưa?
- [ ] Đã kiểm subdomain và staging chưa?
- [ ] Đã ưu tiên phát hiện theo bảng mục 2, không sửa tất cả?
- [ ] Có trang nào có traffic nhưng crawl depth >4 không?
- [ ] Có URL 404 nào có backlink không?
- [ ] Có trang mồ côi nào không?
- [ ] Có lịch audit định kỳ và người chịu trách nhiệm không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog SEO Spider | Chuẩn ngành; miễn phí tới 500 URL | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Sitebulb | Ưu tiên phát hiện tốt hơn, trực quan hoá | [Sitebulb](https://sitebulb.com/) |
| Ahrefs / Semrush Site Audit | Cloud, chạy định kỳ tự động | [Ahrefs](https://ahrefs.com/site-audit) |
| GSC | Nguồn sự thật — luôn đối chiếu với nó | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Search Console Help: Page Indexing](https://support.google.com/webmasters/answer/7440203)
- [Google — Crawling and indexing documentation](https://developers.google.com/search/docs/crawling-indexing)
- [Screaming Frog — User Guide](https://www.screamingfrog.co.uk/seo-spider/user-guide/)
- [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## Liên kết
[[Log File Analysis]] · [[Indexing and Index Bloat]] · [[SEO Audit Playbook]] · [[Site Migration]] · [[Google Search Console]] · [[SEO]]
