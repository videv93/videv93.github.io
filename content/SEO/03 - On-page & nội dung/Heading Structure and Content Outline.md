---
tags: [seo, on-page, content]
status: evergreen
---
# Heading Structure and Content Outline

> Heading không phải "tín hiệu xếp hạng" mạnh như folklore SEO tin. Chúng là **cấu trúc ngữ nghĩa** giúp Google (và trình đọc màn hình, và người lướt) hiểu dàn ý — và dàn ý mới là thứ quyết định trang có bao phủ intent hay không.

## 1. Heading làm gì thật sự

| Niềm tin phổ biến | Thực tế |
|---|---|
| "Phải có đúng một H1" | Về SEO, nhiều H1 không gây hại. Về [[Accessible Markup & ARIA]] thì một H1 vẫn tốt hơn |
| "Nhồi từ khoá vào H2 để lên top" | Nhồi heading là tín hiệu spam, không phải tín hiệu xếp hạng |
| "H1 phải trùng title" | Không cần. Title cho SERP, H1 cho người đọc — [[Title Tags and Meta Descriptions]] |
| "Thứ tự H1→H6 phải hoàn hảo" | Google chịu được lỗi; trình đọc màn hình thì không |
| "Heading là ranking factor lớn" | Nó giúp *hiểu* nội dung, không tự nâng hạng |

**Giá trị thật của heading với SEO:**
1. Cho Google bản đồ nội dung để trích [[SERP Feature Targeting]] (featured snippet, PAA).
2. Cho phép Google hiểu trang bao phủ những khía cạnh nào của chủ đề.
3. Tạo anchor cho jump link và sitelinks.

Xem [[Semantic HTML]] cho phần HTML nền tảng.

## 2. Xây dàn ý từ intent, không từ từ khoá

Quy trình đúng:

1. **Đọc top 10** cho cụm mục tiêu — [[Search Intent]].
2. **Ghi lại dàn ý (H2/H3) của từng kết quả.** Đây là bước bị bỏ qua nhiều nhất và rẻ nhất.
3. **Lập bảng tần suất**: khía cạnh nào xuất hiện ở ≥7/10 bài? Đó là **bắt buộc phải có**.
4. **Tìm khía cạnh không ai nói tới** nhưng người đọc cần. Đó là chỗ bạn thắng.
5. **Thêm câu hỏi PAA** của truy vấn thành H2/H3 nếu chúng thật sự liên quan.
6. **Sắp theo thứ tự người đọc cần**, không theo thứ tự volume.

> [!note] Dàn ý là nơi thắng thua được quyết định
> Nội dung viết hay nhưng thiếu 3/10 khía cạnh mà mọi kết quả top đều có sẽ không thắng. Ngược lại, dàn ý đúng + văn phong trung bình vẫn xếp hạng được. Đầu tư vào bước 2–4.

## 3. Quy ước viết heading

- **Mô tả nội dung phần đó**, không phải nhãn chung chung. ❌ `Giới thiệu` ✅ `Vì sao crawl budget hiếm khi là vấn đề`
- **Dạng câu hỏi khi truy vấn là câu hỏi** — tăng cơ hội PAA/featured snippet.
- **Ngắn**, đọc lướt được. Heading 20 từ không ai đọc.
- **Không dùng heading để tạo style.** Dùng CSS. Heading sai cấp làm hỏng cấu trúc ngữ nghĩa.
- **Không bỏ cấp** (H2 → H4) — hại cho trình đọc màn hình.
- **Từ khoá xuất hiện tự nhiên** nếu heading mô tả đúng nội dung. Nếu phải "nhét", dàn ý sai.

## 4. Cấu trúc trang đầy đủ

```html
<h1>Chủ đề của trang</h1>
  <p>Đoạn mở: trả lời trực tiếp truy vấn trong 40–60 từ</p>  <!-- cơ hội featured snippet -->
  <h2>Khía cạnh 1</h2>
    <h3>Chi tiết 1.1</h3>
  <h2>Khía cạnh 2</h2>
  <h2>Câu hỏi thường gặp</h2>
    <h3>Câu hỏi PAA 1</h3>
```

**Đoạn mở đầu quan trọng nhất trang.** Nó vừa quyết định người đọc ở lại, vừa là ứng viên chính cho featured snippet — [[SERP Feature Targeting]].

## 5. Cạm bẫy

- **Dàn ý sao chép nguyên từ một đối thủ.** Bạn sẽ giống họ và không có lý do để xếp trên họ.
- **Nhồi từ khoá vào mọi H2.** Dễ nhận ra, phản tác dụng.
- **Heading sinh bằng JS.** Xem [[JavaScript Rendering and SEO]].
- **Trang không có H1.** Không phạt trực tiếp nhưng thường là dấu hiệu template hỏng.
- **Dùng H1 cho logo trên mọi trang.** Toàn site cùng H1 = mất tín hiệu.
- **Dàn ý quá sâu** (H5, H6). Nếu cần 6 cấp, chủ đề nên tách thành nhiều trang — [[Topic Clusters]].
- **Thêm mục "FAQ" chỉ để nhồi schema.** Google đã thu hẹp FAQ rich result — [[SERP Feature Targeting]].

## 6. Checklist áp dụng

- [ ] Đã ghi lại dàn ý của top 10 trước khi viết chưa?
- [ ] Khía cạnh xuất hiện ở ≥7/10 kết quả đã có trong dàn ý chưa?
- [ ] Có ít nhất một khía cạnh không đối thủ nào có không?
- [ ] Đoạn mở có trả lời trực tiếp truy vấn trong 40–60 từ không?
- [ ] Heading có mô tả nội dung, không phải nhãn chung chung?
- [ ] Cấu trúc heading không bỏ cấp?
- [ ] Heading có trong HTML thô không?
- [ ] Đọc riêng dàn ý (không đọc nội dung) — có hiểu trang nói gì không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Screaming Frog | Xuất H1/H2 toàn site, tìm thiếu/trùng | [SF](https://www.screamingfrog.co.uk/seo-spider/) |
| Detailed SEO Extension | Xem cấu trúc heading của trang bất kỳ | [Chrome](https://detailed.com/extension/) |
| AlsoAsked | Lấy cây câu hỏi PAA | [AlsoAsked](https://alsoasked.com/) |

## Tham khảo
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Central — Do headings matter for SEO?](https://developers.google.com/search/docs/appearance/structured-data/article)
- [MDN — Heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
- [W3C WAI — Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)

## Liên kết
[[Title Tags and Meta Descriptions]] · [[SEO Content Writing]] · [[Semantic HTML]] · [[SERP Feature Targeting]] · [[Search Intent]] · [[SEO]]
