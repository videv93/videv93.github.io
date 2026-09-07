---
tags: [seo, foundations]
status: evergreen
---
# SERP Anatomy

> Trang kết quả không còn là "10 link xanh". Nó là một **bố cục cạnh tranh** trong đó mỗi feature vừa là cơ hội hiển thị vừa là một cách để người dùng không bao giờ click vào bạn.

## 1. Bản đồ SERP feature

| Feature | Vị trí thường gặp | Lấy dữ liệu từ đâu | Tác động tới CTR organic |
|---|---|---|---|
| **AI Overview** | Trên cùng | Tổng hợp nhiều trang | Giảm mạnh — xem [[AI Search and Zero Click]] |
| **Ads (Search)** | Trên + dưới | Google Ads | Đẩy organic xuống dưới màn hình đầu |
| **Featured snippet** | "Position 0" | Một trang đang xếp hạng | Tăng nếu là bạn, giảm mạnh nếu là đối thủ |
| **People Also Ask** | Xen giữa | Nhiều trang | Chèn giữa kết quả, hút click |
| **Local pack** | Trên/giữa | Google Business Profile | Chiếm chỗ với truy vấn local — [[Local SEO]] |
| **Image pack** | Xen giữa | Google Images — [[Image and Video SEO]] | Trung bình |
| **Video / Shorts carousel** | Xen giữa | YouTube chủ yếu | Trung bình |
| **Top Stories** | Trên | Site đủ điều kiện — [[News and Publisher SEO]] | Cao với truy vấn tin |
| **Knowledge Panel** | Cột phải / trên (mobile) | Knowledge Graph — [[Brand Signals and Entity SEO]] | Cao với truy vấn brand/entity |
| **Sitelinks** | Dưới kết quả #1 | Cấu trúc site — [[Site Architecture and URL Design]] | Tăng CTR cho brand |
| **Shopping / Product grid** | Trên | Merchant Center — [[Ecommerce SEO]] | Cao với truy vấn mua |
| **Rich results** (review, FAQ, recipe, job…) | Trong kết quả | [[Structured Data and Rich Results]] | Tăng CTR |
| **Discussions and forums** | Xen giữa | Reddit, Quora, forum | Rất cao từ 2023 |
| **"Things to know"** | Xen giữa | Nhiều trang | Trung bình |

> [!warning] Bảng này có chu kỳ bán rã ngắn
> Google thêm/bỏ SERP feature liên tục. Bảng chụp bối cảnh **2026-09**. Kiểm lại bằng cách gõ truy vấn thật, đừng tin bảng. Xem [[SEO Tactics Half-Life]].

## 2. Bố cục thay đổi mọi thứ về giá trị của thứ hạng

CTR theo vị trí là con số hay bị trích dẫn nhất và cũng hay bị dùng sai nhất:

- Nghiên cứu CTR ngành (Advanced Web Ranking, Sistrix) cho #1 khoảng **28–40%** — nhưng đó là **trung bình trên mọi loại SERP**.
- Trên SERP có AI Overview + ads + PAA, vị trí #1 organic có thể nằm dưới màn hình đầu và CTR rơi xuống **một chữ số**.
- Trên SERP brand-navigational "sạch", #1 có thể vượt **60%**.

**Kết luận thực dụng:** không dùng CTR curve ngành để dự báo traffic. Dùng CTR *thật của chính bạn* từ [[Google Search Console]] cho cụm truy vấn tương tự. Xem [[Traffic Forecasting]].

## 3. Đọc SERP như một bài phân tích cạnh tranh

Với mỗi truy vấn mục tiêu, ghi lại:

1. **Bao nhiêu % màn hình đầu là organic thật?** (không ads, không AI Overview)
2. **Loại site nào đang thắng?** — brand lớn / affiliate / forum / trang chính thức / UGC
3. **Kết quả yếu nhất trong top 10 là gì?** Đó là ngưỡng bạn cần vượt, không phải #1.
4. **Có feature nào bạn có thể chiếm?** Xem [[SERP Feature Targeting]].
5. **SERP có bị Reddit/Quora thống trị không?** Nếu có, ý định người dùng là *lời khuyên từ người thật* — trang thương hiệu sẽ rất khó thắng.

## 4. Cạm bẫy

- **Xem SERP không ở chế độ ẩn danh.** Cá nhân hoá và lịch sử tìm kiếm bóp méo kết quả. Dùng cửa sổ ẩn danh + tham số `&gl=`/`&hl=` hoặc công cụ.
- **Quên SERP mobile khác desktop.** Mobile ít vị trí hơn hẳn; feature chiếm chỗ nhiều hơn. Google index mobile-first — xem [[Mobile and Responsive SEO]].
- **Đếm thứ hạng thay vì đếm hiển thị.** Xem [[Rank Tracking]] — "thứ hạng trung bình" trong GSC đã là một trung bình gây hiểu lầm.
- **Nhắm featured snippet mà không tính chi phí.** Chiếm snippet có thể *giảm* click nếu snippet đã trả lời trọn vẹn.

## 5. Checklist áp dụng

- [ ] Đã chụp màn hình SERP (mobile + desktop, ẩn danh) cho từng truy vấn chủ lực?
- [ ] Đã đếm % màn hình đầu thuộc về organic?
- [ ] Đã xác định loại site đang thắng, và mình có thuộc loại đó không?
- [ ] Dự báo traffic có dùng CTR thật từ GSC thay vì CTR curve ngành?
- [ ] Có theo dõi khi SERP đổi bố cục (thêm AI Overview, thêm forum) không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Ahrefs / Semrush SERP overview | Lịch sử SERP feature theo truy vấn | [Ahrefs](https://ahrefs.com/) |
| Sistrix SERP Snippet Generator | Xem trước snippet | [Sistrix](https://app.sistrix.com/en/serp-snippet-generator) |
| Advanced Web Ranking CTR study | Dữ liệu CTR theo ngành, cập nhật | [AWR](https://www.advancedwebranking.com/ctrstudy/) |

## Tham khảo
- [Google — Search results features gallery](https://developers.google.com/search/docs/appearance/visual-elements-gallery)
- [Advanced Web Ranking — Google Organic CTR Study](https://www.advancedwebranking.com/ctrstudy/)
- [Sistrix — Why almost 30% of Google searches end without a click](https://www.sistrix.com/blog/zero-clicks-study/)
- [Google — Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## Liên kết
[[Search Intent]] · [[SERP Feature Targeting]] · [[AI Search and Zero Click]] · [[Rank Tracking]] · [[Structured Data and Rich Results]] · [[SEO]]
