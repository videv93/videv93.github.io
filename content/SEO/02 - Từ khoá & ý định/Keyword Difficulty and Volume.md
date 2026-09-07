---
tags: [seo, keywords, metrics]
status: evergreen
---
# Keyword Difficulty and Volume

> Hai con số được tin tưởng nhất và đáng bị nghi ngờ nhất trong SEO. **Keyword Difficulty là chỉ số độc quyền của từng công cụ, không phải sự thật.** Search volume là ước lượng có sai số hệ thống lớn.

## 1. Keyword Difficulty — nó thật sự đo cái gì

| Công cụ | KD tính từ | Cái nó **bỏ qua** |
|---|---|---|
| **Ahrefs KD** | Số referring domain của top 10 | Chất lượng nội dung, intent, authority chủ đề |
| **Semrush KD%** | Tổ hợp backlink + tín hiệu khác | Tương tự |
| **Moz Difficulty** | DA của top 10 | Tương tự |

Ba công cụ cho **ba con số khác nhau cho cùng một từ khoá**, đôi khi lệch 30 điểm. Điều đó là bằng chứng đủ rằng KD là *ý kiến*, không phải phép đo.

> [!warning] KD gần như luôn bỏ qua điều quan trọng nhất
> Một truy vấn KD=15 nhưng top 10 toàn Wikipedia, WebMD và trang chính phủ là **không thể thắng** với site mới. Một truy vấn KD=60 nhưng top 10 toàn bài mỏng, lỗi thời, sai intent là **cơ hội tốt**. KD không nhìn thấy khác biệt này.

## 2. Phép kiểm thay thế: đọc SERP thật

Với mỗi truy vấn mục tiêu, thay vì tin KD, trả lời 5 câu:

1. **Kết quả yếu nhất trong top 10 là gì?** — đó là ngưỡng thật, không phải #1.
2. **Loại site nào đang thắng?** Nếu toàn brand khổng lồ / toàn UGC, cấu trúc SERP đang chống lại bạn.
3. **Nội dung top 10 cũ tới đâu?** Nhiều bài >3 năm ⇒ khoảng trống.
4. **Chúng có khớp intent không?** Nếu Google đang xếp hạng thứ không ai muốn, có chỗ cho bạn.
5. **Bao nhiêu referring domain cho kết quả yếu nhất?** So với hồ sơ link của bạn — [[Backlink Fundamentals]].

Năm câu này mất 10 phút và đáng tin hơn mọi chỉ số KD.

## 3. Search volume — bốn nguồn sai số

1. **Làm tròn theo bucket.** Keyword Planner báo `1K–10K`; công cụ bên thứ ba nội suy ra một số cụ thể. Con số cụ thể đó là **suy đoán**.
2. **Gộp nhóm.** Keyword Planner gộp biến thể gần nghĩa vào một con số. Volume của *"mua giày"* có thể đã bao gồm *"mua giày nam"*.
3. **Trung bình 12 tháng.** Truy vấn theo mùa bị san phẳng hoàn toàn. Dùng **Google Trends** để xem hình dạng theo thời gian.
4. **Volume ≠ click.** Trên SERP có AI Overview hoặc featured snippet, phần lớn volume kết thúc bằng zero-click. Ahrefs công bố cột "Clicks" riêng chính vì lý do này. Xem [[AI Search and Zero Click]].

**Hệ quả:** dùng volume để **xếp hạng tương đối** giữa các truy vấn, đừng dùng để dự báo traffic tuyệt đối. Dự báo phải dùng CTR thật của site — xem [[Traffic Forecasting]].

## 4. Chỉ số nên dùng thay thế

| Thay vì | Dùng | Vì sao |
|---|---|---|
| KD | Số referring domain của kết quả yếu nhất top 10 | Cụ thể, kiểm được, so được với chính mình |
| Volume | Clicks (Ahrefs) hoặc impression thật từ GSC | Trừ đi zero-click |
| Volume trung bình | Google Trends theo tháng | Thấy mùa vụ |
| KD chung | "Traffic potential" của cả cụm | Một trang xếp hạng cho hàng trăm truy vấn |

> [!note] Traffic potential > volume của một keyword
> Trang tốt xếp hạng cho hàng trăm truy vấn liên quan. Đo tiềm năng bằng **tổng traffic của trang đang top 1** cho cụm đó (Ahrefs: "Traffic Potential"), không bằng volume của một truy vấn.

## 5. Cạm bẫy

- **So KD giữa hai công cụ.** Chúng không cùng thang đo. Chọn một và chỉ dùng nội bộ.
- **Lọc backlog bằng ngưỡng KD.** Loại bỏ cả cơ hội tốt lẫn xấu một cách mù quáng.
- **Dự báo traffic = volume × CTR curve.** Cách nhanh nhất để hứa 10× và giao 1×. Xem [[SEO Business Case]].
- **Bỏ truy vấn volume 0.** Truy vấn mới, ngách, hoặc tiếng Việt thường hiện 0 nhưng có nhu cầu thật.
- **Tin volume cho thị trường Việt Nam.** Cơ sở dữ liệu của công cụ quốc tế thưa hơn nhiều cho tiếng Việt. GSC của chính bạn đáng tin hơn hẳn.
- **Quên rằng KD không tính intent.** Trùng lặp với sai lầm ở mục 1 nhưng đáng nhắc lại.

## 6. Checklist áp dụng

- [ ] Đã mở SERP thật và trả lời 5 câu ở mục 2 chưa?
- [ ] Đã ghi số referring domain của **kết quả yếu nhất**, không phải #1?
- [ ] Có dùng KD như tín hiệu tham khảo, không như tiêu chí lọc?
- [ ] Dự báo traffic có dùng CTR thật từ GSC không?
- [ ] Truy vấn theo mùa đã kiểm bằng Google Trends chưa?
- [ ] Với thị trường tiếng Việt — có đối chiếu bằng dữ liệu GSC của chính site không?
- [ ] Đã ước lượng theo **traffic potential của cả cụm**, không theo một keyword?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Trends | Xu hướng tương đối, mùa vụ — miễn phí, dữ liệu Google | [Trends](https://trends.google.com/) |
| Ahrefs — Traffic Potential | Ước lượng traffic cả cụm, có cột Clicks | [Ahrefs](https://ahrefs.com/keywords-explorer) |
| Google Keyword Planner | Volume gốc từ Google (dạng bucket) | [KWP](https://ads.google.com/home/tools/keyword-planner/) |
| GSC Performance | Impression/click thật, chính xác tuyệt đối cho site bạn | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Ahrefs — Keyword Difficulty: How to Assess It](https://ahrefs.com/blog/keyword-difficulty/)
- [Ahrefs — Search Volume: What It Is and Why It's Misleading](https://ahrefs.com/blog/search-volume/)
- [Moz — Keyword Difficulty](https://moz.com/learn/seo/keyword-difficulty)
- [Google — About Keyword Planner forecasts](https://support.google.com/google-ads/answer/3022575)

## Liên kết
[[Keyword Research]] · [[Traffic Forecasting]] · [[Competitor Gap Analysis]] · [[SEO Business Case]] · [[AI Search and Zero Click]] · [[SEO]]
