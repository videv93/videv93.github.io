---
tags: [seo, policy, risk]
status: evergreen
---
# Google Spam Policies

> Tài liệu ngắn nhất và cụ thể nhất Google từng viết về SEO — và ít người đọc hết nhất. Nó đọc như luật: định nghĩa hành vi bị cấm, không mô tả cách xếp hạng. **Đọc bản gốc; note này là bản đồ.**

## 1. Danh mục vi phạm

| Vi phạm | Nghĩa | Note liên quan |
|---|---|---|
| **Cloaking** | Hiện nội dung khác cho crawler và người dùng | [[SEO Testing]] |
| **Doorway pages** | Nhiều trang gần giống nhau nhắm biến thể truy vấn, đều dẫn về một đích | [[Programmatic SEO]] |
| **Hacked content** | Nội dung bị chèn do site bị xâm nhập | |
| **Hidden text/links** | Text trắng trên nền trắng, `font-size:0`, đặt ngoài màn hình | |
| **Keyword stuffing** | Nhồi từ khoá | [[SEO Content Writing]] |
| **Link spam** | Mua/bán link, trao đổi quá mức, guest post hàng loạt, PBN | [[Link Building Tactics]] |
| **Machine-generated traffic** | Bot query, click giả | |
| **Malware / hành vi lừa đảo** | | |
| **Misleading functionality** | Hứa chức năng không có (nút tải giả) | |
| **Scraped content** | Sao chép nội dung site khác | |
| **Sneaky redirects** | Redirect người dùng tới nơi khác với crawler | |
| **Scaled content abuse** (2024) | Sản xuất nhiều trang chủ yếu để thao túng xếp hạng | [[AI Generated Content and SEO]], [[Programmatic SEO]] |
| **Site reputation abuse** (2024) | "Parasite SEO" — thuê subfolder/subdomain của site uy tín để đăng nội dung bên thứ ba | |
| **Expired domain abuse** (2024) | Mua domain hết hạn để tận dụng authority cho nội dung không liên quan | |
| **Thin affiliate pages** | Trang affiliate không thêm giá trị | |
| **User-generated spam** | Comment/forum spam không kiểm soát | |

> [!note] Ba mục 2024 là bổ sung quan trọng nhất
> **Scaled content abuse**, **site reputation abuse**, **expired domain abuse** được thêm tháng 3/2024. Chúng nhắm chính xác vào ba chiến thuật đang phổ biến nhất lúc đó. Site reputation abuse đã khiến nhiều tờ báo lớn phải gỡ toàn bộ mục "coupon"/"review" thuê ngoài.

## 2. Chính sách khác ngoài spam

Google còn có các chính sách riêng, cũng dẫn tới hành động:

| Chính sách | Nội dung |
|---|---|
| **Structured data guidelines** | Đánh dấu phải khớp nội dung hiển thị — [[Structured Data and Rich Results]] |
| **Review snippet guidelines** | Không self-serving review, không bịa rating |
| **Google Business Profile guidelines** | Tên thật, địa chỉ thật — [[Google Business Profile]] |
| **News content policies** | Với publisher — [[News and Publisher SEO]] |
| **Legal removals** | DMCA, quyền riêng tư |

## 3. Manual action vs algorithmic

| | **Manual action** | **Algorithmic** |
|---|---|---|
| Ai quyết định | Người của Google | Hệ thống tự động |
| Bạn có biết không? | ✅ Hiện trong GSC → Manual Actions | ❌ Không có thông báo |
| Cách gỡ | Sửa + nộp reconsideration request | Sửa + chờ hệ thống đánh giá lại |
| Thời gian | Vài ngày–vài tuần sau khi duyệt | Có thể nhiều tháng |

Xem [[Penalty Diagnosis and Recovery]] cho quy trình.

## 4. Cách đọc chính sách này cho có ích

Bản chất của mọi mục trong danh sách: **tạo ra tín hiệu mà không tạo ra giá trị tương ứng**. Đó là mẫu chung.

Phép kiểm rút ra: với mỗi việc bạn định làm, hỏi
> *"Nếu Google công bố ngày mai rằng họ phát hiện được việc này, tôi có phải gỡ nó không?"*

Nếu câu trả lời là có, bạn đang ở sai phía ranh giới — bất kể hiện tại nó có hiệu quả hay không.

## 5. Cạm bẫy

- **Không đọc bản gốc.** Nó ngắn (đọc trong 20 phút) và cụ thể hơn mọi bài blog tóm tắt.
- **Tin "Google không phát hiện được".** Lịch sử update cho thấy điều ngược lại — [[Google Algorithm Updates]].
- **Thuê agency không hỏi họ làm gì.** Bạn chịu hậu quả, không phải họ.
- **Cho phép nội dung bên thứ ba trên domain mình mà không kiểm soát.** Site reputation abuse — rủi ro cho cả site.
- **Không khai `rel="sponsored"` cho link trả tiền.** Vi phạm rõ và dễ phát hiện.
- **UGC không kiểm duyệt.** Comment spam là trách nhiệm của bạn.
- **Structured data không khớp nội dung.** Vi phạm hay gặp nhất và dễ bị manual action nhất.
- **Không kiểm Manual Actions định kỳ.** Nó im lặng cho tới khi bạn nhìn vào.

## 6. Checklist áp dụng

- [ ] Đã đọc **toàn văn** trang spam policies chưa?
- [ ] GSC → Manual Actions có sạch không? (Kiểm hàng tháng)
- [ ] Có nội dung bên thứ ba nào trên domain bạn không kiểm soát không?
- [ ] Link trả tiền/affiliate có `rel="sponsored"` chưa?
- [ ] UGC có được kiểm duyệt và có `rel="ugc"` chưa?
- [ ] Structured data có khớp nội dung hiển thị 100% không?
- [ ] Nếu dùng agency — bạn có biết chính xác họ đang làm gì không?
- [ ] Với mỗi chiến thuật đang chạy — phép kiểm ở mục 4 cho kết quả gì?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC → Manual Actions | Nơi duy nhất biết mình có bị phạt thủ công | [GSC](https://search.google.com/search-console) |
| GSC → Security Issues | Phát hiện site bị hack | [GSC](https://search.google.com/search-console) |
| Google Search Central docs | Bản gốc — luôn đọc bản này | [Docs](https://developers.google.com/search/docs/essentials/spam-policies) |

## Tham khảo
- [Google — Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google — Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google Search Central Blog — March 2024 core update and new spam policies](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- [Google — Manual Actions report](https://support.google.com/webmasters/answer/9044175)

## Liên kết
[[Penalty Diagnosis and Recovery]] · [[Black Hat vs White Hat SEO]] · [[Link Building Tactics]] · [[Programmatic SEO]] · [[Google Algorithm Updates]] · [[SEO]]
