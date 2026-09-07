---
tags: [seo, off-page, links]
status: evergreen
---
# Anchor Text

> Anchor text nói cho Google biết trang đích **về cái gì**. Nó là tín hiệu mạnh — và chính vì mạnh nên nó là chỗ dễ tối ưu quá đà nhất, và là dấu vân tay rõ nhất của link nhân tạo.

## 1. Các loại anchor

| Loại               | Ví dụ (đích: bài về Core Web Vitals)  | Tỷ lệ tự nhiên        |
| ------------------ | ------------------------------------- | --------------------- |
| **Brand**          | `Ahrefs`, `Công ty ABC`               | Cao — thường lớn nhất |
| **URL trần**       | `https://example.com/cwv/`            | Trung bình            |
| **Chung chung**    | `tại đây`, `bài viết này`, `xem thêm` | Trung bình            |
| **Từng phần**      | `hướng dẫn về Core Web Vitals`        | Trung bình            |
| **Khớp chính xác** | `core web vitals`                     | **Thấp**              |
| **Liên quan**      | `tốc độ tải trang`, `hiệu năng web`   | Thấp–trung bình       |
| **Ảnh (alt text)** | alt của ảnh được link                 | Thấp                  |

> [!warning] Anchor khớp chính xác tỷ lệ cao là dấu hiệu spam rõ nhất
> Không có ngưỡng công khai nào, nhưng hồ sơ tự nhiên hiếm khi có tỷ lệ exact-match cao — **không ai tự nhiên link tới bạn bằng đúng từ khoá bạn muốn xếp hạng, lặp đi lặp lại**. Nếu 40% anchor của bạn là exact match, đó không phải kết quả tự nhiên và Penguin/SpamBrain được thiết kế để nhận ra điều này.

## 2. Anchor nội bộ vs anchor ngoài

| | **Nội bộ** | **Ngoài** |
|---|---|---|
| Kiểm soát | 100% | Gần như 0% |
| Rủi ro tối ưu quá | Thấp (nhưng có) | **Cao** |
| Chiến lược | Mô tả chính xác trang đích | Để tự nhiên, không can thiệp |

**Hệ quả quan trọng:** vì bạn kiểm soát hoàn toàn anchor nội bộ, đó là nơi dùng anchor mô tả chính xác — [[Internal Linking]]. Với link ngoài, cố điều khiển anchor chính là hành vi tạo ra hồ sơ bất thường.

## 3. Viết anchor nội bộ

- ✅ `hướng dẫn tối ưu LCP` — mô tả nội dung đích
- ✅ `cách Google xử lý JavaScript` — tự nhiên trong câu
- ❌ `tại đây` — không mang thông tin
- ❌ `seo, dịch vụ seo, seo giá rẻ` — nhồi
- ❌ Cùng một anchor exact-match trên 200 trang — mẫu bất thường ngay cả nội bộ

**Quy tắc:** anchor phải đọc tự nhiên trong câu. Nếu phải bẻ câu để nhét anchor, anchor sai.

## 4. Anchor và ngữ cảnh xung quanh

Google không chỉ đọc anchor mà cả văn bản quanh nó. Một link với anchor `tại đây` trong câu *"đọc hướng dẫn Core Web Vitals đầy đủ tại đây"* vẫn truyền ngữ cảnh tốt.

Hệ quả thực tế: **đừng ám ảnh về anchor**. Link từ một đoạn văn nói đúng chủ đề có giá trị, kể cả anchor chung chung.

## 5. Cạm bẫy

- **Yêu cầu anchor cụ thể khi outreach.** Vừa làm hồ sơ bất thường vừa khiến người ta từ chối. Xem [[Link Building Tactics]].
- **Anchor exact-match trong guest post hàng loạt.** Mẫu rõ ràng nhất của link nhân tạo.
- **Không dùng anchor mô tả cho link nội bộ.** Bỏ phí tín hiệu miễn phí.
- **Đổi anchor nội bộ hàng loạt cùng lúc.** Thay đổi đột ngột trên toàn site là tín hiệu lạ.
- **Quên `alt` của ảnh được link.** Nó đóng vai trò anchor — [[Image and Video SEO]].
- **Anchor giống hệt tiêu đề trang trên mọi link.** Tự nhiên hơn khi biến thể.
- **Phân tích anchor mà không tách link nội bộ khỏi link ngoài.** Hai phân bố khác nhau hoàn toàn.

## 6. Checklist áp dụng

- [ ] Đã tách phân tích anchor nội bộ và anchor ngoài chưa?
- [ ] Anchor brand có chiếm tỷ lệ lớn nhất trong hồ sơ ngoài không?
- [ ] Tỷ lệ exact-match có ở mức thiểu số không?
- [ ] Anchor nội bộ có mô tả nội dung trang đích không?
- [ ] Anchor có đọc tự nhiên trong câu không?
- [ ] Ảnh được link có `alt` mô tả không?
- [ ] Khi outreach — có đang yêu cầu anchor cụ thể không? (Đừng.)
- [ ] Đã so phân bố anchor của mình với đối thủ top 10 chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Ahrefs — Anchors report | Phân bố anchor ngoài | [Ahrefs](https://ahrefs.com/site-explorer) |
| Screaming Frog — Anchor Text report | Anchor nội bộ toàn site | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| GSC → Links → Top linking text | Dữ liệu anchor từ chính Google | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Links best practices for Google Search](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google — Link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)
- [Moz — Anchor Text](https://moz.com/learn/seo/anchor-text)
- [Ahrefs — Anchor Text: A Data-Driven Guide](https://ahrefs.com/blog/anchor-text/)

## Liên kết
[[Backlink Fundamentals]] · [[Internal Linking]] · [[Link Building Tactics]] · [[Toxic Links and Disavow]] · [[Google Spam Policies]] · [[SEO]]
