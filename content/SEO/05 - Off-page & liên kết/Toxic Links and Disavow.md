---
tags: [seo, off-page, links, risk]
status: evergreen
---
# Toxic Links and Disavow

> **Với đại đa số site, disavow là sai lầm.** Google nói rõ họ đã rất giỏi bỏ qua link spam, và "toxic link score" của công cụ bên thứ ba là **chỉ số bịa ra để bán dịch vụ**. Note này giải thích khi nào disavow *thật sự* cần — và đó là một tập hợp rất hẹp.

## 1. Lập trường chính thức của Google

| Google nói | Hàm ý |
|---|---|
| "Chúng tôi bỏ qua phần lớn link spam tự động" | Không cần hành động |
| "Hầu hết site **không nên** dùng disavow" | Mặc định là không làm |
| "Chỉ dùng khi có manual action về link, hoặc bạn tin sắp có" | Điều kiện rất hẹp |
| Không có khái niệm "toxic link" trong tài liệu Google | Chỉ số đó là của công cụ, không phải của Google |

> [!warning] Disavow là công cụ **không hồi lại được trong ngắn hạn**
> Disavow nhầm link tốt sẽ mất giá trị của chúng, và việc hoàn tác (gỡ khỏi file) mất nhiều tháng để Google xử lý lại. Rủi ro tự làm hại mình cao hơn rủi ro từ link spam.

## 2. Khi nào **thật sự** nên disavow

Chỉ trong hai trường hợp:

1. **Có manual action về link không tự nhiên** trong GSC → Security & Manual Actions. Đây là trường hợp rõ ràng — xem [[Penalty Diagnosis and Recovery]].
2. **Bạn (hoặc agency trước đó) đã chủ động mua link / dựng PBN**, và không gỡ được. Bạn *biết* link đó nhân tạo vì bạn tạo ra nó.

Ngoài hai trường hợp này: **không làm gì cả.**

Đặc biệt, các tình huống sau **không** phải lý do disavow:
- Traffic giảm sau core update (đó là vấn đề nội dung — [[Helpful Content and Core Updates]])
- Công cụ báo "toxic score 70%"
- Có nhiều link từ site nước ngoài lạ
- Có link từ site người lớn / cờ bạc bạn không tạo
- "Negative SEO" nghi ngờ không có bằng chứng

## 3. Negative SEO — đánh giá thực tế

Negative SEO (đối thủ trỏ link spam vào site bạn để hại) **rất khó thực hiện thành công**. Google đã đầu tư nhiều năm chính xác để trung hoà nó — nếu link spam trỏ tới có thể hạ site bất kỳ, đó sẽ là lỗ hổng nghiêm trọng trong Search.

Nếu nghi ngờ:
1. Kiểm GSC → Manual Actions. Không có manual action ⇒ gần như chắc chắn không phải vấn đề link.
2. So thời điểm traffic giảm với lịch core update — [[Google Algorithm Updates]].
3. Chỉ khi có manual action mới hành động.

## 4. Quy trình disavow (khi thật sự cần)

1. **Xuất toàn bộ backlink** từ GSC → Links (nguồn của Google), bổ sung Ahrefs/Semrush.
2. **Rà thủ công.** Không tự động hoá bước này. Với mỗi domain: link này có do mình tạo không? có phải trang spam rõ ràng không?
3. **Cố gỡ link trước.** Google muốn thấy nỗ lực gỡ, đặc biệt khi nộp reconsideration request.
4. **Disavow ở cấp domain**, không cấp URL:
   ```
   # Đã liên hệ gỡ, không phản hồi - 2026-08
   domain:spamsite.example
   domain:pbn-network.example
   # URL đơn lẻ (hiếm khi cần)
   https://example.com/trang-spam/
   ```
5. **Upload** qua [Disavow Tool](https://search.google.com/search-console/disavow-links).
6. **Nộp reconsideration request** nếu có manual action, kèm mô tả trung thực việc đã làm.
7. **Ghi lại lý do cho từng dòng** trong comment — bạn sẽ cần khi review lại.

> [!note] File disavow thay thế toàn bộ, không cộng dồn
> Mỗi lần upload ghi đè file cũ. Luôn giữ bản gốc và upload file đầy đủ, không upload phần bổ sung.

## 5. Cạm bẫy

- **Disavow theo "toxic score" của công cụ.** Cách phổ biến nhất để tự hại mình.
- **Disavow sau core update.** Chẩn đoán sai — vấn đề gần như luôn ở nội dung.
- **Disavow cấp URL khi nên cấp domain.** Site spam sẽ tạo URL mới.
- **Disavow rồi quên.** Review file mỗi năm; link tốt có thể đã bị disavow nhầm.
- **Không ghi lý do.** Sáu tháng sau không ai biết vì sao domain đó nằm trong file.
- **Nộp reconsideration mà không gỡ gì.** Google từ chối.
- **Coi disavow là bảo trì định kỳ.** Nó là can thiệp khẩn cấp, không phải việc hàng quý.

## 6. Checklist áp dụng

- [ ] GSC → Manual Actions có báo gì không? (Nếu **không** — dừng lại, đừng disavow.)
- [ ] Nếu traffic giảm — đã đối chiếu với lịch core update chưa?
- [ ] Có phải chính bạn/agency trước đã tạo ra những link này không?
- [ ] Đã cố liên hệ gỡ link trước chưa?
- [ ] Danh sách disavow có được rà **thủ công** từng domain không?
- [ ] Dùng `domain:` thay vì URL đơn lẻ?
- [ ] Mỗi dòng có comment ghi lý do và ngày không?
- [ ] File upload là bản **đầy đủ**, không phải phần bổ sung?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC → Links | Nguồn backlink của chính Google | [GSC](https://search.google.com/search-console) |
| GSC → Manual Actions | Điều kiện tiên quyết để disavow | [GSC](https://search.google.com/search-console) |
| Disavow Links Tool | Công cụ chính thức | [Disavow](https://search.google.com/search-console/disavow-links) |
| Ahrefs / Semrush | ⚠️ "Toxic score" — đừng dùng làm cơ sở quyết định | — |

## Tham khảo
- [Google — Disavow links to your site](https://support.google.com/webmasters/answer/2648487)
- [Google — Link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)
- [Google Search Central — Manual Actions report](https://support.google.com/webmasters/answer/9044175)
- [Google Search Central Office Hours — on disavow (guidance)](https://developers.google.com/search/blog)

## Liên kết
[[Backlink Fundamentals]] · [[Penalty Diagnosis and Recovery]] · [[Google Spam Policies]] · [[Google Algorithm Updates]] · [[Link Building Tactics]] · [[SEO]]
