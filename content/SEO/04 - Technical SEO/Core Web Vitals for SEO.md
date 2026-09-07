---
tags: [seo, technical, performance]
status: evergreen
---
# Core Web Vitals for SEO

> ⚠️ **Cơ chế và cách tối ưu CWV nằm ở [[Core Web Vitals]] (Frontend).** Note này chỉ trả lời câu hỏi riêng của SEO: **nó là tín hiệu xếp hạng mạnh tới đâu, và khi nào đáng đầu tư?**

> Câu trả lời ngắn: **có thật, nhưng yếu** — và là tín hiệu phá vỡ thế cân bằng (tiebreaker) chứ không phải đòn bẩy chính.

## 1. Ba chỉ số và ngưỡng

| Chỉ số | Đo cái gì | Ngưỡng "Good" |
|---|---|---|
| **LCP** — Largest Contentful Paint | Thời gian tới lúc nội dung chính hiện | ≤ 2,5s |
| **INP** — Interaction to Next Paint | Độ trễ phản hồi tương tác (thay FID từ 3/2024) | ≤ 200ms |
| **CLS** — Cumulative Layout Shift | Độ xê dịch bố cục | ≤ 0,1 |

Đạt "Good" nghĩa là **p75** (phân vị 75) của người dùng thật đạt ngưỡng — không phải trung bình, không phải điểm Lighthouse.

## 2. Nó mạnh tới đâu — nói thẳng

| Sự thật | Nguồn |
|---|---|
| CWV là một phần của **page experience**, và page experience là tín hiệu xếp hạng | Google xác nhận |
| Google nói rõ: **"nội dung tốt vẫn thắng trang nhanh nhưng nội dung kém"** | Google xác nhận |
| Google gọi nó là tín hiệu dùng để **phân biệt giữa các trang tương đương** | Google xác nhận |
| Google **đã bỏ** báo cáo "Page Experience" riêng trong GSC (2023) và hạ tầm thông điệp | Quan sát được |

> [!warning] Sai lầm ưu tiên phổ biến nhất trong technical SEO
> Team dành ba tháng đưa LCP từ 3,1s xuống 2,4s cho một trang mà **nội dung thua top 10 về chiều sâu**. Kết quả gần như luôn là không đổi thứ hạng. Nếu bạn đang ở vị trí 15 vì nội dung, CWV không đưa bạn lên top 3.
>
> **Ngưỡng ra quyết định:** CWV đáng ưu tiên khi (a) bạn đang ở vị trí 3–10 và nội dung đã ngang đối thủ, hoặc (b) chỉ số đang ở mức "Poor" và ảnh hưởng chuyển đổi thật.

## 3. Vì sao vẫn nên làm — lý do ngoài xếp hạng

Lập luận mạnh nhất cho CWV **không phải** SEO:

1. **Chuyển đổi.** Nhiều nghiên cứu ngành cho thấy tương quan rõ giữa tốc độ và tỷ lệ chuyển đổi. Đây là tiền thật, đo được — [[SEO Business Case]].
2. **Crawl.** Server nhanh ⇒ Googlebot crawl nhiều hơn — [[Crawling and Crawl Budget]].
3. **Mobile.** Người dùng mạng chậm bỏ trang trước khi thấy nội dung — [[Mobile and Responsive SEO]].
4. **AI crawler.** Chúng có timeout ngắn — [[Generative Engine Optimization]].

Nói cách khác: làm CWV vì người dùng và vì doanh thu; coi lợi ích xếp hạng là phần thưởng thêm.

## 4. Field data vs lab data — phân biệt bắt buộc

| | **Field data** (CrUX) | **Lab data** (Lighthouse) |
|---|---|---|
| Nguồn | Người dùng Chrome thật | Mô phỏng một lần |
| Google dùng cho xếp hạng | ✅ **Cái này** | ❌ |
| Có INP thật | ✅ | Ước lượng (TBT) |
| Cần lưu lượng đủ lớn | ✅ (site nhỏ không có dữ liệu) | Không |
| Dùng để | Biết mình đang ở đâu | Debug nguyên nhân |

**Chỉ field data mới tính cho xếp hạng.** Điểm Lighthouse 100 không đảm bảo gì cả. Nguồn field data: GSC → Core Web Vitals report, PageSpeed Insights (phần "Discover what your real users are experiencing"), CrUX BigQuery dataset.

> [!note] Site nhỏ không có field data
> Nếu lưu lượng chưa đủ, CrUX không có dữ liệu và Google dùng dữ liệu ở cấp **origin** (toàn domain) hoặc không dùng gì. Với site nhỏ, đây thêm một lý do để CWV không phải ưu tiên đầu.

## 5. Cạm bẫy

- **Tối ưu điểm Lighthouse thay vì field data.** Sai chỉ số ngay từ đầu.
- **Đo một trang rồi kết luận cho cả site.** CrUX nhóm theo *loại trang*; trang sản phẩm và trang chủ khác nhau.
- **Bỏ qua INP.** Nó thay FID từ 3/2024 và nhiều site đạt FID nhưng trượt INP — JS nặng lộ ra ở đây.
- **Coi CWV là lý do làm lại toàn bộ frontend.** Chi phí thường vượt xa lợi ích SEO.
- **Quên CLS do ảnh không có `width`/`height`** và do banner cookie — hai nguyên nhân chiếm phần lớn CLS thật.
- **Không đo lại sau khi deploy.** CWV hồi quy âm thầm sau mỗi lần thêm script bên thứ ba.

## 6. Checklist áp dụng

- [ ] Đang dùng **field data** (CrUX/GSC), không phải điểm Lighthouse, để đánh giá?
- [ ] Đã xem theo **nhóm URL** trong GSC, không chỉ một trang?
- [ ] INP đã được kiểm riêng (không suy từ FID cũ)?
- [ ] Trang đang ở "Poor" hay chỉ "Needs improvement"? Chỉ "Poor" mới là ưu tiên cao.
- [ ] Nếu ưu tiên CWV — nội dung đã ngang top 10 chưa?
- [ ] Ảnh có `width`/`height` không? Banner cookie có gây CLS không?
- [ ] Có theo dõi hồi quy CWV sau mỗi lần deploy không?
- [ ] Đã tính lợi ích chuyển đổi (không chỉ SEO) vào business case chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC → Core Web Vitals | Field data theo nhóm URL — dùng cái này trước | [GSC](https://search.google.com/search-console) |
| PageSpeed Insights | Field + lab trong một trang | [PSI](https://pagespeed.web.dev/) |
| CrUX Dashboard / BigQuery | Dữ liệu field theo thời gian, so đối thủ | [CrUX](https://developer.chrome.com/docs/crux) |
| web-vitals (JS library) | Đo RUM trên chính site bạn | [GitHub](https://github.com/GoogleChrome/web-vitals) |

## Tham khảo
- [Google — Understanding page experience in Google Search results](https://developers.google.com/search/docs/appearance/page-experience)
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
- [Google Search Central Blog — INP replaces FID](https://developers.google.com/search/blog/2023/05/introducing-inp)
- [Chrome UX Report documentation](https://developer.chrome.com/docs/crux)

## Liên kết
[[Core Web Vitals]] · [[Frontend Performance Budget]] · [[Mobile and Responsive SEO]] · [[Crawling and Crawl Budget]] · [[SEO Business Case]] · [[SEO]]
