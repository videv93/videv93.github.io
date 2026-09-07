---
tags: [seo, technical, analytics]
status: evergreen
---
# Log File Analysis

> **Nguồn sự thật duy nhất về hành vi crawler.** GSC cho bạn số liệu tổng hợp và đã lọc; log server cho bạn từng request thật. Mọi câu hỏi dạng *"Google có thật sự crawl trang này không"* chỉ trả lời dứt điểm được ở đây.

## 1. Câu hỏi chỉ log trả lời được

| Câu hỏi | Vì sao GSC không đủ |
|---|---|
| Googlebot crawl URL này lần cuối khi nào? | GSC chỉ cho URL Inspection từng cái một |
| Crawl budget đang bị tiêu vào đâu? | GSC Crawl Stats gộp theo loại, không theo URL |
| Trang mới mất bao lâu để được crawl lần đầu? | Không có trong GSC |
| Có URL nào bị crawl liên tục mà vô giá trị không? | Không có |
| Googlebot có bị chặn bởi WAF/CDN không? | GSC chỉ báo lỗi tổng hợp |
| Bot AI (GPTBot, ClaudeBot) chiếm bao nhiêu băng thông? | Không có |
| Trang mồ côi có được crawl không? | Không có |

## 2. Lấy log ở đâu

| Nguồn | Ghi chú |
|---|---|
| **Access log của web server** (nginx, Apache) | Đầy đủ nhất |
| **CDN log** (Cloudflare, Fastly, CloudFront) | Quan trọng khi CDN cache — request bị cache có thể không tới origin |
| **Load balancer log** | |
| **Vercel / Netlify logs** | Thường giới hạn thời gian lưu; cần export |

> [!warning] Cache CDN che giấu crawl
> Nếu CDN phục vụ Googlebot từ cache, **origin log không thấy request đó**. Phải lấy log ở tầng CDN. Đây là lý do nhiều phân tích log hiện đại cho kết quả sai.

Định dạng combined log điển hình:
```
66.249.66.1 - - [02/Sep/2026:10:15:32 +0700] "GET /san-pham/abc/ HTTP/1.1" 200 15234 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```

## 3. Xác minh Googlebot thật

**Bắt buộc.** User-agent giả rất phổ biến — bot cào dữ liệu tự nhận là Googlebot.

Cách xác minh chính thức (reverse DNS + forward DNS):
```bash
# 1. reverse DNS phải ra googlebot.com hoặc google.com
host 66.249.66.1
# 2. forward DNS của tên đó phải ra lại chính IP
host crawl-66-249-66-1.googlebot.com
```

Hoặc đối chiếu với **danh sách IP Googlebot chính thức** Google công bố dạng JSON (xem Tham khảo) — nhanh hơn cho phân tích hàng loạt.

## 4. Phân tích — những gì cần tính

| Chỉ số | Ý nghĩa |
|---|---|
| **Request theo thư mục** | Crawl budget đang chảy vào đâu — [[Crawling and Crawl Budget]] |
| **Request theo status code** | Tỷ lệ 404/301/5xx Googlebot gặp — [[HTTP Status Codes for SEO]] |
| **URL crawl nhiều nhất** | Có phải trang quan trọng không? Nếu là `?sort=` thì có vấn đề |
| **URL có traffic nhưng ít được crawl** | Cần [[Internal Linking]] |
| **URL được crawl nhưng không có trong sitemap** | Trang mồ côi hoặc URL rác |
| **URL trong sitemap nhưng không bao giờ được crawl** | Vấn đề khám phá hoặc chất lượng |
| **Thời gian phản hồi trung bình cho Googlebot** | >500ms là dấu hiệu cần sửa hạ tầng |
| **Crawl theo ngày** | Spike/drop tương quan với deploy, sự cố, core update |

**Ghép log với dữ liệu khác** là bước cho giá trị lớn nhất: nối `URL` trong log với export GSC (impression/click) và với crawl Screaming Frog (crawl depth, inlink). Ba nguồn ghép lại cho bức tranh đầy đủ.

## 5. Bot AI — phân tích mới cần thiết

Từ 2023, GPTBot / ClaudeBot / PerplexityBot / Bytespider có thể chiếm phần đáng kể lưu lượng bot. Log là nơi duy nhất thấy được điều này.

Quyết định chặn hay không là quyết định kinh doanh — xem [[Robots Exclusion]] và [[Generative Engine Optimization]]. Nhưng phải **đo trước khi quyết định**.

## 6. Cạm bẫy

- **Không xác minh Googlebot.** Kết luận sai vì bot giả.
- **Chỉ lấy log origin khi có CDN.** Xem cảnh báo mục 2.
- **Phân tích quá ít ngày.** Cần ít nhất 30 ngày để thấy mẫu; site lớn cần ít hơn, site nhỏ cần nhiều hơn.
- **Không chuẩn hoá URL.** `/page` và `/page/` và `/PAGE` được đếm riêng ⇒ số liệu vô nghĩa.
- **Bỏ qua Googlebot smartphone vs desktop.** Mobile-first nghĩa là smartphone mới là bot chính — [[Mobile and Responsive SEO]].
- **Phân tích một lần rồi thôi.** Log có giá trị nhất khi so trước/sau một thay đổi (migration, đổi kiến trúc).
- **Log bị xoay vòng quá nhanh.** Cấu hình lưu giữ trước khi cần dùng.

## 7. Checklist áp dụng

- [ ] Có quyền truy cập log server hoặc CDN không?
- [ ] Log có lưu đủ ≥30 ngày không?
- [ ] Đã xác minh Googlebot bằng reverse DNS hoặc danh sách IP chính thức chưa?
- [ ] Nếu có CDN — đã lấy log ở tầng CDN chưa?
- [ ] Đã chuẩn hoá URL trước khi tổng hợp chưa?
- [ ] Đã tách Googlebot smartphone vs desktop chưa?
- [ ] Có URL vô giá trị nào nằm trong top 20 URL được crawl nhiều nhất không?
- [ ] Có trang quan trọng nào không được crawl trong 30 ngày không?
- [ ] Đã ghép log với dữ liệu GSC và crawl chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog Log File Analyser | Chuyên dụng, ghép được với crawl | [SF Log](https://www.screamingfrog.co.uk/log-file-analyser/) |
| GoAccess | Mã nguồn mở, realtime, nhẹ | [GoAccess](https://goaccess.io/) |
| BigQuery / DuckDB | Log lớn, truy vấn SQL linh hoạt | [DuckDB](https://duckdb.org/) |
| Cloudflare Logpush | Lấy log ở tầng CDN | [Cloudflare](https://developers.cloudflare.com/logs/) |

## Tham khảo
- [Google — Verifying Googlebot and other Google crawlers](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot)
- [Google — List of Google crawler IP ranges (JSON)](https://developers.google.com/static/search/apis/ipranges/googlebot.json)
- [Google — Crawl Stats report](https://support.google.com/webmasters/answer/9679690)
- [Screaming Frog — Log File Analysis Guide](https://www.screamingfrog.co.uk/log-file-analyser/user-guide/)

## Liên kết
[[Crawling and Crawl Budget]] · [[Crawl Auditing]] · [[Site Migration]] · [[HTTP Status Codes for SEO]] · [[Google Search Console]] · [[SEO]]
