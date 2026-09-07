---
tags: [seo, algorithm, history]
status: evergreen
---
# Google Algorithm Updates

> Lịch sử update không phải kiến thức bảo tàng. Mỗi update là **một loại hành vi bị đóng lại vĩnh viễn**, và mẫu chung của chúng dự báo được cái gì sẽ bị đóng tiếp theo.

## 1. Dòng thời gian — và cái mỗi update đóng lại

| Update | Năm | Đóng lại hành vi gì | Còn liên quan? |
|---|---|---|---|
| **Panda** | 2011 | Nội dung mỏng, trùng lặp, content farm | ✅ Đã tích hợp vào core |
| **Penguin** | 2012 | Link nhân tạo, anchor over-optimized | ✅ Realtime từ 2016 |
| **Hummingbird** | 2013 | Chuyển sang hiểu ngữ nghĩa, không khớp chuỗi | ✅ Nền tảng |
| **Mobile-friendly** | 2015 | Site không dùng được trên mobile | ✅ Nay là mobile-first |
| **RankBrain** | 2015 | ML vào xếp hạng, hiểu truy vấn mới | ✅ |
| **Medic** | 2018 | Nội dung YMYL thiếu chuyên môn | ✅ → [[E-E-A-T]] |
| **BERT** | 2019 | Hiểu ngữ cảnh và giới từ trong truy vấn | ✅ |
| **Page Experience** | 2021 | Trải nghiệm trang kém | ✅ nhưng hạ tầm — [[Core Web Vitals for SEO]] |
| **Product Reviews** | 2021–23 | Review affiliate không có trải nghiệm thật | ✅ → nay trong core |
| **Helpful Content** | 2022–23 | Nội dung viết cho search engine | ✅ → [[Helpful Content and Core Updates]] |
| **Link Spam (SpamBrain)** | 2022 | Vô hiệu hoá link spam bằng AI | ✅ |
| **March 2024 core + spam** | 2024 | **Scaled content abuse**, site reputation abuse, expired domain abuse | ✅ Quan trọng nhất gần đây |
| **AI Overviews mở rộng** | 2024–25 | (Không phải phạt) — đổi mô hình traffic | ✅ → [[AI Search and Zero Click]] |

> [!note] Mẫu chung — dùng để dự báo
> Mỗi update đóng lại **một cách khai thác quy mô lớn có chi phí thấp**. Panda đóng content farm; Penguin đóng link farm; 2024 đóng sản xuất nội dung hàng loạt bằng AI. **Bất kỳ chiến thuật nào rẻ, scale được, và không tạo giá trị thật đều sẽ bị đóng.** Đây là phép kiểm hữu ích hơn mọi danh sách "ranking factor".

## 2. Core update vs update nhắm mục tiêu

| | **Core update** | **Update nhắm mục tiêu** |
|---|---|---|
| Tần suất | 3–4 lần/năm | Bất kỳ lúc nào |
| Phạm vi | Toàn bộ hệ thống xếp hạng | Một loại vấn đề (spam, review, link) |
| Google thông báo? | ✅ Có, kèm ngày | Thường có |
| Cách hồi phục | Không có "lỗi để sửa" — cải thiện tổng thể | Sửa đúng vấn đề bị nhắm |
| Thời gian triển khai | 1–3 tuần | Vài ngày |

**Google nói rõ về core update:** *"không có gì để sửa"* — nó là đánh giá lại tổng thể, không phải hình phạt. Điều này thường bị hiểu là "không làm gì được", nhưng nghĩa thật là: cải thiện phải ở mức chất lượng tổng thể, không ở một thẻ meta nào.

## 3. Quy trình khi bị ảnh hưởng

1. **Xác nhận thời điểm.** Đối chiếu ngày traffic giảm với [Google Search Status Dashboard](https://status.search.google.com/). Lệch >3 ngày ⇒ có thể không phải update.
2. **Kiểm [[Penalty Diagnosis and Recovery]]** — có manual action không? (Nếu có, đó là chuyện khác hẳn.)
3. **Xác định phạm vi.** Toàn site hay một nhóm trang? Lọc GSC theo path và theo loại truy vấn.
4. **Xác định loại truy vấn bị ảnh hưởng.** Informational hay transactional? Brand hay non-brand?
5. **Kiểm SERP.** Ai lên thay bạn? Nếu là AI Overview thì đó không phải vấn đề chất lượng — [[AI Search and Zero Click]].
6. **Nếu là core update:** đọc [Google's guidance on core updates](https://developers.google.com/search/blog/2019/08/core-updates) và tự đánh giá theo bộ câu hỏi ở đó. Xem [[Helpful Content and Core Updates]].
7. **Đừng hành động vội trong 2 tuần đầu.** Update còn đang triển khai; số liệu chưa ổn định.
8. **Đừng disavow.** Xem [[Toxic Links and Disavow]].

## 4. Theo dõi update

- **Nguồn chính thức:** [Google Search Status Dashboard](https://status.search.google.com/) — ngày chính xác, không suy đoán.
- **Google Search Central Blog** — giải thích và hướng dẫn.
- **Đánh dấu mọi ngày update trên biểu đồ báo cáo** — [[SEO KPIs and Reporting]]. Không có việc này thì mọi phân tích trước/sau đều sai.
- **Công cụ theo dõi biến động** (Semrush Sensor, Mozcast) hữu ích để biết "có gì đang xảy ra", nhưng không thay được dashboard chính thức.

## 5. Cạm bẫy

- **Quy mọi biến động cho update.** Nhiều biến động là mùa vụ, đối thủ, hoặc sự cố kỹ thuật của chính bạn.
- **Sửa gấp trong tuần đầu.** Update chưa triển khai xong; bạn có thể sửa dựa trên dữ liệu sai.
- **Đọc "phân tích update" từ blog SEO trong 48 giờ đầu.** Chúng là suy đoán trên dữ liệu chưa ổn định.
- **Tin có "một thứ" gây ra sụt giảm.** Core update là đánh giá lại tổng thể.
- **Bỏ qua rằng hồi phục có thể mất tới core update tiếp theo.** Với helpful content system, thời gian hồi phục tính bằng nhiều tháng.
- **Không ghi lại trạng thái trước update.** Không có baseline thì không đo được hồi phục.

## 6. Checklist áp dụng

- [ ] Có đánh dấu ngày mọi core update trên biểu đồ báo cáo không?
- [ ] Khi traffic giảm — đã đối chiếu với Search Status Dashboard chưa?
- [ ] Đã kiểm Manual Actions chưa?
- [ ] Đã xác định phạm vi (toàn site vs nhóm trang) chưa?
- [ ] Đã kiểm SERP xem ai lên thay chưa?
- [ ] Có đợi đủ 2–3 tuần cho update triển khai xong không?
- [ ] Có baseline được lưu để đo hồi phục không?
- [ ] Có đang chạy chiến thuật nào "rẻ, scale được, không tạo giá trị" không? (Phép kiểm mục 1)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Search Status Dashboard | **Nguồn chính thức**, ngày chính xác | [Status](https://status.search.google.com/) |
| Google Search Central Blog | Giải thích và hướng dẫn | [Blog](https://developers.google.com/search/blog) |
| Semrush Sensor / Mozcast | Theo dõi biến động SERP theo ngành | [Sensor](https://www.semrush.com/sensor/) |
| GSC (so sánh trước/sau) | Đo tác động thật lên site bạn | [GSC](https://search.google.com/search-console) |

## Tham khảo
- [Google — Google Search Status Dashboard](https://status.search.google.com/)
- [Google Search Central Blog — What site owners should know about core updates](https://developers.google.com/search/blog/2019/08/core-updates)
- [Google — A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google Search Central Blog — March 2024 core update and new spam policies](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)

## Liên kết
[[Helpful Content and Core Updates]] · [[Penalty Diagnosis and Recovery]] · [[Google Spam Policies]] · [[SEO Tactics Half-Life]] · [[SEO KPIs and Reporting]] · [[SEO]]
