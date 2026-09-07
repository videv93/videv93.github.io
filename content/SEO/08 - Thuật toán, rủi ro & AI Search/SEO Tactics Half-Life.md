---
tags: [seo, bridge-note, meta]
status: evergreen
---
# SEO Tactics Half-Life

> **Note bản lề.** SEO trộn lẫn hai loại kiến thức có **chu kỳ bán rã chênh nhau hàng chục lần** — và chúng được viết cùng một giọng, trong cùng một bài, không mục nào có ngày. Note này phân tầng chúng và đưa ra phép kiểm để không áp dụng một chiến thuật đã chết.

## 1. Bốn tầng theo tốc độ thay đổi

| Tầng | Chu kỳ bán rã | Ví dụ | Đầu tư |
|---|---|---|---|
| **T1 — Nguyên lý** | Thập kỷ | Crawl → index → rank; khớp intent; nội dung phải truy cập được; link là tín hiệu tin cậy | Học kỹ một lần, dùng mãi |
| **T2 — Cơ chế** | 3–7 năm | `rel=canonical`, `hreflang`, HTTP status, sitemap, mobile-first | Học kỹ, kiểm lại vài năm một lần |
| **T3 — Chính sách & hệ thống** | 1–3 năm | Chính sách spam, tên hệ thống xếp hạng, ngưỡng CWV, loại rich result được hỗ trợ | **Kiểm lại hàng năm** |
| **T4 — Chiến thuật & công cụ** | 3–18 tháng | SERP feature nào đang có, chiến thuật GEO, giá công cụ, chi tiết giao diện GSC | **Kiểm lại trước mỗi lần dùng** |

> [!warning] Vấn đề: bốn tầng được viết cùng một giọng
> Một bài blog SEO điển hình trộn cả bốn: "Google crawl trang của bạn (T1), dùng `rel=canonical` để gộp trùng lặp (T2), tuân thủ chính sách helpful content (T3), và thêm FAQ schema để lấy rich result (T4 — **đã chết từ 8/2023**)." Ba câu đầu vẫn đúng; câu cuối làm bạn lãng phí công. Và không có gì trên trang cho biết câu nào thuộc tầng nào.

## 2. Nghĩa địa — chiến thuật đã chết còn được khuyên

Đây là bằng chứng cụ thể rằng vấn đề này có thật:

| Chiến thuật | Chết khi | Vẫn được khuyên ở đâu |
|---|---|---|
| `<meta keywords>` | 2009 | Hướng dẫn nhập môn, plugin SEO |
| PageRank sculpting bằng `nofollow` nội bộ | 2009 | Bài "tối ưu internal link" cũ |
| Toolbar PageRank làm chỉ số | 2016 | Dịch vụ bán link |
| `rel=next`/`rel=prev` | 2019 (công bố đã bỏ từ trước) | Hầu hết hướng dẫn phân trang |
| Google Authorship (`rel=author`) | 2014 | Bài về E-A-T cũ |
| Đăng ký Google News | 2019 | Hướng dẫn SEO tin tức |
| FAQ rich result cho site thường | 8/2023 | **Rất nhiều** hướng dẫn hiện tại |
| HowTo rich result | 2023 | Tương tự |
| Keyword density / LSI keywords | Chưa bao giờ đúng | Công cụ "chấm điểm SEO" |
| Mobile Usability report trong GSC | 2023 | Checklist audit |
| GSC International Targeting | Đã gỡ | Hướng dẫn hreflang |
| Disavow như bảo trì định kỳ | Chưa bao giờ đúng | Dịch vụ "làm sạch backlink" |

## 3. Phép kiểm rẻ để phát hiện nội dung hết hạn

Áp cho **mọi** tài liệu SEO trước khi tin nó:

```bash
# 1. Có ngày không? Ngày cập nhật có thật không (so nội dung, không chỉ số hiển thị)?
# 2. Có nhắc chiến thuật trong bảng mục 2 không?
# 3. Grep các dấu hiệu hết hạn:
#    - ký hiệu tiền tệ (giá công cụ đổi liên tục)
#    - số phiên bản trong URL
#    - ảnh chụp màn hình giao diện (GSC/GA đổi giao diện thường xuyên)
grep -oE '\$[0-9]+|/20[0-9]{2}/|v[0-9]+\.[0-9]+' <file>
# 4. Link tới tài liệu Google có còn sống không? (404 = tài liệu đã bị gỡ = chiến thuật có thể đã chết)
```

**Phép kiểm mạnh nhất:** với mọi khẳng định T3/T4, **mở tài liệu Google chính thức tương ứng ngay lúc đọc**. Nếu tài liệu đó không còn nói vậy — hoặc không còn tồn tại — chiến thuật đã chết.

## 4. Vì sao chiến thuật chết — và mẫu dự báo

Mẫu lặp lại qua mọi lần:

1. Google mở một cơ chế (rich result, thẻ, tính năng).
2. Ngành khai thác nó ở quy mô vượt xa mục đích ban đầu.
3. Chất lượng kết quả giảm.
4. Google thu hẹp hoặc bỏ cơ chế đó.
5. Hướng dẫn cũ tồn tại thêm nhiều năm.

**Dự báo được:** bất kỳ cơ chế nào đang được khai thác hàng loạt và không tạo giá trị cho người dùng đang đi tới bước 4. Xem [[Google Algorithm Updates]] mục 1 — cùng một mẫu.

Ứng dụng hiện tại: các chiến thuật GEO/AEO đang được bán rầm rộ ([[Generative Engine Optimization]]) rất có khả năng đi theo đúng đường này.

## 5. Chiến lược đầu tư theo tầng

| Tầng | Nên làm | Không nên |
|---|---|---|
| T1 | Học thật kỹ; đây là thứ giúp bạn tự đánh giá được T3/T4 | Coi là "cơ bản" rồi bỏ qua |
| T2 | Học kỹ, ghi lại, kiểm lại vài năm một lần | Học lại từ đầu mỗi lần |
| T3 | Đọc **tài liệu gốc**, đặt lịch kiểm hàng năm | Học từ blog tóm tắt |
| T4 | Kiểm ngay trước khi dùng; đừng ghi nhớ | Xây chiến lược dài hạn trên nó |

> [!note] Hệ quả cho cách đọc vault này
> Mọi note ở đây có `status` và ngày. Note nhiều T4 (như [[Generative Engine Optimization]], [[AI Search and Zero Click]], [[SERP Feature Targeting]]) mang `status: seed`/`growing` và có cảnh báo đầu note. Note nhiều T1/T2 (như [[How Search Engines Work]], [[Canonicalization]]) là `evergreen`. **Đọc `status` trước khi đọc nội dung.**

## 6. Phép kiểm tự chạy được

- [ ] Với mỗi chiến thuật đang chạy — nó thuộc tầng nào (T1–T4)?
- [ ] Chiến thuật T3/T4 nào đã hơn 12 tháng chưa được kiểm lại?
- [ ] Với mỗi tài liệu SEO bạn đang dựa vào — nó viết ngày nào?
- [ ] Link tới tài liệu Google trong tài liệu đó còn sống không?
- [ ] Có chiến thuật nào trong bảng "nghĩa địa" (mục 2) đang được dùng không?
- [ ] Bao nhiêu % kế hoạch SEO của bạn nằm ở T4? (Trên 30% là dấu hiệu chiến lược dựa quá nhiều vào thứ tạm thời)
- [ ] Có cơ chế nào bạn đang khai thác mà không tạo giá trị cho người dùng không? (Mẫu ở mục 4 — nó sẽ bị đóng)
- [ ] Có lịch kiểm lại T3 hàng năm và T4 hàng quý không?

## 7. Cách dùng note này

Đây là note bản lề cho mọi note "chiến thuật" trong vault. Các note mang cảnh báo trỏ về đây: [[Generative Engine Optimization]], [[AI Search and Zero Click]], [[AI Generated Content and SEO]], [[SERP Feature Targeting]], [[Structured Data and Rich Results]], [[News and Publisher SEO]].

Nó bổ sung cho [[Google Guidance vs Observed Behavior]]: note kia hỏi *"nguồn này đáng tin tới đâu?"*; note này hỏi *"nguồn này còn đúng không?"* Hai câu hỏi độc lập, và một tuyên bố có thể đáng tin mà đã hết hạn, hoặc còn hiệu lực mà không đáng tin.

## Tham khảo
- [Google Search Central Blog](https://developers.google.com/search/blog) — nguồn duy nhất biết cái gì vừa thay đổi
- [Google Search Status Dashboard](https://status.search.google.com/) — ngày chính xác của update
- [Google — Search Central documentation](https://developers.google.com/search/docs) — luôn kiểm bản gốc
- [Google Search Central Blog — Changes to HowTo and FAQ rich results (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

## Liên kết
[[Google Guidance vs Observed Behavior]] · [[Google Algorithm Updates]] · [[Generative Engine Optimization]] · [[SERP Feature Targeting]] · [[Knowledge Seed Playbook]] · [[SEO]]
