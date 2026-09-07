---
tags: [seo, analytics, metrics, business]
status: evergreen
---
# SEO KPIs and Reporting

> Báo cáo SEO thất bại vì hai lý do: **báo cáo sai chỉ số** (thứ hạng, traffic thay vì tiền) và **báo cáo cho sai người** (chi tiết kỹ thuật cho lãnh đạo). Note này sửa cả hai.

## 1. Ba tầng chỉ số

| Tầng | Chỉ số | Ai đọc | Tần suất |
|---|---|---|---|
| **Kết quả** | Doanh thu organic, lead, chuyển đổi | Lãnh đạo, CFO | Hàng tháng/quý |
| **Đầu ra** | Click organic non-brand, số truy vấn top 10, share of voice | Trưởng nhóm marketing | Hàng tháng |
| **Hoạt động** | Trang xuất bản, link mới, lỗi kỹ thuật sửa, tỷ lệ index | Đội SEO | Hàng tuần |

> [!warning] Đừng báo cáo tầng dưới cho tầng trên
> Lãnh đạo không cần biết bạn sửa 47 lỗi canonical. Họ cần biết SEO mang về bao nhiêu tiền và xu hướng ra sao. Đội SEO thì ngược lại — cần chi tiết hoạt động để làm việc.

## 2. Quy tắc bắt buộc: tách brand vs non-brand

Đây là quy tắc quan trọng nhất trong báo cáo SEO.

- **Truy vấn brand** (chứa tên công ty/sản phẩm) đến từ nhận biết thương hiệu — thường do marketing, PR, sản phẩm, không phải SEO.
- **Truy vấn non-brand** là thứ SEO thật sự tạo ra.

Báo cáo gộp cả hai:
- Che giấu SEO non-brand đang kém khi brand đang tăng
- Gán công của chiến dịch brand cho SEO
- Làm mọi kết luận về ROI sai lệch

Cách tách trong [[Google Search Console]]: lọc Query **chứa** / **không chứa** tên brand (và các biến thể, viết sai chính tả phổ biến).

## 3. Bộ KPI đề xuất

| KPI | Định nghĩa | Vì sao |
|---|---|---|
| **Doanh thu / lead từ organic non-brand** | GA4 key events, lọc kênh organic | KPI số một |
| **Click organic non-brand** | GSC, lọc truy vấn | Đường cơ sở thật |
| **Số truy vấn non-brand ở top 10** | GSC, đếm distinct query position ≤10 | Bề rộng bao phủ |
| **Số truy vấn mới có impression** | So hai kỳ | [[Topical Authority]] đang tăng? |
| **Tỷ lệ index** | Indexed / Submitted theo sitemap | Sức khoẻ kỹ thuật |
| **Referring domain mới − mất** | Ahrefs/GSC | [[Backlink Fundamentals]] |
| **Share of voice theo cụm** | [[Rank Tracking]] | Vị thế cạnh tranh |
| **Chi phí mỗi lead organic** | Tổng chi phí / số lead | So với kênh khác |

## 4. Cấu trúc một báo cáo tháng

```
1. Kết quả       — doanh thu/lead organic, so cùng kỳ năm trước, so mục tiêu
2. Nguyên nhân   — điều gì đã tạo ra kết quả đó (2–3 gạch đầu dòng)
3. Rủi ro        — core update, mất link, lỗi kỹ thuật, đối thủ
4. Việc tháng tới — 3 việc lớn nhất và kết quả kỳ vọng
5. Phụ lục       — mọi chi tiết khác
```

Bốn mục đầu **gói trong một trang**. Nếu lãnh đạo phải cuộn, báo cáo đã thất bại.

## 5. So sánh cho đúng

- **So cùng kỳ năm trước**, không so tháng trước. Mùa vụ là yếu tố lớn nhất trong SEO.
- **Đánh dấu ngày core update** trên mọi biểu đồ — [[Google Algorithm Updates]].
- **Ghi chú mọi thay đổi lớn**: migration, redesign, thay đổi giá, chiến dịch quảng cáo lớn.
- **Dùng nhóm đối chứng khi có thể** — [[SEO Testing]].
- **Nêu rõ độ trễ.** Nội dung xuất bản tháng này ảnh hưởng traffic 3–6 tháng sau. Báo cáo tháng đo kết quả của việc làm nhiều tháng trước.

## 6. Cạm bẫy

- **Báo cáo thứ hạng.** Xem [[Rank Tracking]].
- **Không tách brand.** Xem mục 2.
- **Báo cáo traffic tăng % mà không nói base.** "+300%" từ 10 lên 40 click là vô nghĩa.
- **Chọn khung thời gian có lợi.** Nếu phải chọn khéo khung thời gian để số đẹp, số không đẹp.
- **Không báo cáo tin xấu.** Mất lòng tin, và vấn đề lớn hơn khi vỡ ra.
- **Dashboard tự động không có diễn giải.** Số không tự giải thích. Phần "vì sao" mới là giá trị.
- **Đo SEO bằng last-click.** Đánh giá thấp một cách hệ thống — [[GA4 for SEO]].
- **Đổi định nghĩa KPI giữa chừng.** Mất khả năng so sánh lịch sử.

## 7. Checklist áp dụng

- [ ] Báo cáo có bắt đầu bằng tiền, không phải traffic không?
- [ ] Brand và non-brand đã tách chưa?
- [ ] So sánh có dùng cùng kỳ năm trước không?
- [ ] Ngày core update có được đánh dấu trên biểu đồ không?
- [ ] Mọi thay đổi lớn có được ghi chú không?
- [ ] Có nêu rõ độ trễ giữa hành động và kết quả không?
- [ ] Bốn mục đầu có gói trong một trang không?
- [ ] Tin xấu có được báo cáo thẳng không?
- [ ] Định nghĩa KPI có ổn định qua các kỳ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Looker Studio | Ghép GSC + GA4, dashboard tự động | [Looker](https://lookerstudio.google.com/) |
| GSC BigQuery export | Dữ liệu đầy đủ cho phân tích sâu | [Docs](https://support.google.com/webmasters/answer/12918484) |
| Google Sheets | Vẫn là công cụ báo cáo linh hoạt nhất | — |

## Tham khảo
- [Google — Performance report in Search Console](https://support.google.com/webmasters/answer/7042828)
- [Google — GA4 attribution models](https://support.google.com/analytics/answer/10596866)
- [Ahrefs — How to Measure SEO Performance](https://ahrefs.com/blog/seo-metrics/)
- [Moz — Measuring SEO ROI](https://moz.com/blog/measuring-seo-roi)

## Liên kết
[[SEO Business Case]] · [[Google Search Console]] · [[GA4 for SEO]] · [[Rank Tracking]] · [[Traffic Forecasting]] · [[SEO]]
