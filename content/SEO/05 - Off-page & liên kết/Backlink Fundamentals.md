---
tags: [seo, off-page, links]
status: evergreen
---
# Backlink Fundamentals

> ⚠️ **Đọc [[Google Guidance vs Observed Behavior]] trước.** Link là chủ đề có khoảng cách lớn nhất giữa những gì Google nói công khai và những gì dữ liệu ngành (và tài liệu rò rỉ) cho thấy.

> Link vẫn là một trong những tín hiệu mạnh nhất — Google gọi nó là **link analysis system** trong danh sách hệ thống xếp hạng chính thức. Nhưng cách nó hoạt động khác xa mô hình PageRank đơn giản của 1998.

## 1. PageRank — mô hình gốc và nó đã đổi thế nào

**Ý tưởng gốc (1998):** một trang quan trọng nếu nhiều trang quan trọng link tới nó. Giá trị chảy qua link, chia đều cho số link ra.

**Đã đổi:**

| Mô hình cũ | Hiện tại |
|---|---|
| Mọi link ngang nhau | Link được cân theo ngữ cảnh, vị trí, chủ đề |
| PageRank là một số toàn cục | Nhiều tín hiệu link, một số phụ thuộc truy vấn |
| Toolbar PageRank hiển thị công khai | ❌ Google gỡ 2016 — không có chỉ số công khai nào |
| `nofollow` chặn hoàn toàn | Từ 2019 là **gợi ý**, Google có thể dùng để khám phá và xếp hạng |
| Link equity chia đều | Link trong nội dung mạnh hơn link footer/sidebar |

> [!note] DA/DR **không phải** chỉ số của Google
> Domain Authority (Moz), Domain Rating (Ahrefs), Authority Score (Semrush) đều là chỉ số **độc quyền** tính từ đồ thị link riêng của từng công cụ. Google không dùng chúng. Dùng để so sánh tương đối, đừng dùng như sự thật. (Tài liệu rò rỉ 2024 có trường `siteAuthority` — bậc C, bản chất khác — xem [[Ranking Signals Overview]].)

## 2. Cái gì làm một link có giá trị

Xếp theo mức quan trọng thực tế:

| Yếu tố | Giá trị cao | Giá trị thấp |
|---|---|---|
| **Liên quan chủ đề** | Site cùng ngành, trang cùng chủ đề | Site ngẫu nhiên |
| **Authority của nguồn** | Site được nhiều nguồn uy tín link tới | Site không ai link tới |
| **Vị trí trên trang** | Trong nội dung chính | Footer, sidebar, danh sách link |
| **Anchor text** | Mô tả, tự nhiên — [[Anchor Text]] | Chung chung hoặc nhồi từ khoá |
| **Loại link** | Biên tập (người ta tự quyết định link) | Tự đặt (comment, forum profile, directory) |
| **Traffic thật của trang nguồn** | Trang có người đọc | Trang không ai vào |
| **Số link ra trên trang nguồn** | Ít | Trang có 200 link ra |
| **Tính duy nhất** | Domain mới link tới bạn lần đầu | Link thứ 50 từ cùng domain |

**Referring domain > tổng số link.** 10 link từ 10 domain khác nhau giá trị hơn 100 link từ 1 domain.

## 3. Thuộc tính `rel` — trạng thái hiện tại

| Thuộc tính | Dùng cho | Google xử lý |
|---|---|---|
| (không có) | Link biên tập bình thường | Truyền tín hiệu đầy đủ |
| `rel="nofollow"` | Link không bảo đảm | **Gợi ý** từ 2019 — có thể vẫn dùng |
| `rel="ugc"` | Nội dung do người dùng tạo (comment, forum) | Gợi ý |
| `rel="sponsored"` | Link trả tiền, affiliate | **Bắt buộc** theo chính sách — [[Google Spam Policies]] |

Không khai `sponsored` cho link trả tiền là vi phạm chính sách và có thể dẫn tới manual action — cho **cả hai** site.

## 4. Hồ sơ backlink tự nhiên trông thế nào

Đây là chuẩn để tự đánh giá:

- **Đa dạng anchor**: phần lớn là brand, URL trần, và cụm chung chung ("tại đây", "bài viết này"). Anchor khớp chính xác từ khoá chỉ chiếm thiểu số — [[Anchor Text]].
- **Đa dạng loại site**: blog, tin tức, forum, thư mục ngành, tài liệu.
- **Tăng trưởng dần**, không đột biến — trừ khi có sự kiện PR thật.
- **Phần lớn trỏ về trang chủ và vài trang mạnh**, phần đuôi trỏ tản mát.
- **Có cả link `nofollow`.** Hồ sơ 100% dofollow là bất thường.

Hồ sơ lệch khỏi mẫu này ở mức cực đoan là dấu hiệu link nhân tạo — xem [[Toxic Links and Disavow]].

## 5. Cạm bẫy

- **Đuổi theo DR/DA cao.** Một link DR90 từ trang không liên quan, ở footer, không có traffic, gần như vô giá trị.
- **Mua link.** Vi phạm chính sách trực tiếp. Rủi ro tăng theo quy mô — [[Black Hat vs White Hat SEO]].
- **Bỏ qua link nội bộ.** [[Internal Linking]] miễn phí, trong tầm kiểm soát, và thường cho kết quả nhanh hơn.
- **Đo bằng tổng số link.** Dùng referring domain.
- **Nghĩ link là đủ.** Link không cứu được nội dung sai intent — [[Search Intent]].
- **Bỏ qua link bị mất.** Theo dõi "lost referring domains"; mất link mạnh có thể là nguyên nhân tụt hạng.
- **Không kiểm link tới trang 404.** Link trỏ tới trang đã xoá là giá trị bị bỏ phí — `301` về trang liên quan.

## 6. Checklist áp dụng

- [ ] Đang đo bằng **referring domain**, không phải tổng số link?
- [ ] Đã kiểm có backlink nào trỏ tới URL 404 không (redirect chúng)?
- [ ] Phân bố anchor có tự nhiên không — brand chiếm đa số?
- [ ] Có theo dõi referring domain bị mất hàng tháng không?
- [ ] Link trả tiền/affiliate trên site bạn có `rel="sponsored"` chưa?
- [ ] Link do người dùng tạo có `rel="ugc"` chưa?
- [ ] Đã so hồ sơ link với top 10 cho truy vấn mục tiêu chưa?
- [ ] [[Internal Linking]] đã được tối ưu trước khi đầu tư link ngoài chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC → Links report | Dữ liệu link của **chính Google**, miễn phí | [GSC](https://search.google.com/search-console) |
| Ahrefs Site Explorer | Chỉ số backlink lớn nhất, cập nhật nhanh | [Ahrefs](https://ahrefs.com/site-explorer) |
| Semrush Backlink Analytics | Tương đương | [Semrush](https://www.semrush.com/) |
| Majestic | Trust Flow / Citation Flow — góc nhìn khác | [Majestic](https://majestic.com/) |

## Tham khảo
- [Google — A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google — Qualify your outbound links to Google](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
- [Google — Link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)
- [Google Search Central Blog — Evolving nofollow (2019)](https://developers.google.com/search/blog/2019/09/evolving-nofollow)

## Liên kết
[[Link Building Tactics]] · [[Anchor Text]] · [[Toxic Links and Disavow]] · [[Internal Linking]] · [[Google Guidance vs Observed Behavior]] · [[SEO]]
