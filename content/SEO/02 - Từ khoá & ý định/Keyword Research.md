---
tags: [seo, keywords]
status: evergreen
---
# Keyword Research

> Nghiên cứu từ khoá không phải đi tìm *từ có volume cao*, mà là **lập bản đồ nhu cầu đã tồn tại** rồi quyết định phần nào của bản đồ đó bạn có quyền chiếm.

## 1. Quy trình bốn bước

| Bước | Việc | Đầu ra |
|---|---|---|
| **1. Sinh** | Gom mọi cách người ta có thể diễn đạt vấn đề | Danh sách thô, hàng nghìn dòng |
| **2. Làm giàu** | Gắn volume, KD, CPC, SERP feature | Bảng có số — [[Keyword Difficulty and Volume]] |
| **3. Nhóm** | Gộp theo *cùng intent*, không theo chuỗi ký tự | Cụm truy vấn = ứng viên trang |
| **4. Ưu tiên** | Xếp theo giá trị × khả năng thắng | Backlog nội dung có thứ tự |

**Bước 3 là bước bị làm ẩu nhất.** *"seo là gì"* và *"seo nghĩa là gì"* là **một trang**, không phải hai. Cách kiểm khách quan: nếu top 10 của hai truy vấn trùng ≥3 URL, chúng thuộc cùng một cụm. Đây gọi là **SERP overlap clustering**.

## 2. Nguồn sinh từ khoá, xếp theo chất lượng

1. **Google Search Console** — truy vấn site **đã** có impression. Nguồn tốt nhất và hay bị bỏ qua nhất: nó là nhu cầu đã được kiểm chứng cho đúng site của bạn. Xem [[Google Search Console]].
2. **Đối thủ đang xếp hạng** — [[Competitor Gap Analysis]].
3. **Autocomplete + People Also Ask + "Related searches"** — miễn phí, phản ánh truy vấn thật.
4. **Site tìm kiếm nội bộ** — người dùng gõ gì khi đã ở trên site bạn.
5. **Ticket support, sales call, comment** — ngôn ngữ thật của khách hàng, thường khác hẳn ngôn ngữ marketing.
6. **Reddit / forum ngành** — nơi Google lấy nhiều kết quả từ 2023.
7. **Công cụ keyword** — Ahrefs/Semrush/Keyword Planner. Tiện nhưng ai cũng có; đừng dừng ở đây.

> [!note] Nguồn 1, 4, 5 là lợi thế cạnh tranh
> Chúng là dữ liệu **chỉ bạn có**. Nguồn 7 là dữ liệu mọi đối thủ đều mua được. Backlog dựng hoàn toàn từ nguồn 7 sẽ giống hệt backlog của đối thủ.

## 3. Ưu tiên — công thức làm việc được

Với mỗi cụm, chấm ba con số:

```
Điểm ưu tiên = Giá trị kinh doanh × Khả năng thắng × Volume (log)
```

| Yếu tố | Cách chấm |
|---|---|
| **Giá trị kinh doanh** (1–5) | Truy vấn này gần tiền tới đâu? Transactional > commercial > informational — [[Search Intent]] |
| **Khả năng thắng** (0–1) | So authority/backlink của bạn với top 10 hiện tại |
| **Volume** | Dùng `log` để volume lớn không nuốt hết hai yếu tố kia |

**Sai lầm phổ biến:** xếp backlog theo volume giảm dần. Nó luôn đưa các truy vấn đầu phễu, cạnh tranh cao, giá trị thấp lên đầu.

## 4. Long tail — hiểu cho đúng

- Phần lớn truy vấn Google nhận mỗi ngày là **truy vấn chưa từng thấy trước đó**. Không công cụ nào có chúng.
- Hệ quả: **không nhắm từng long-tail keyword một.** Nhắm *chủ đề* và viết đủ sâu để bắt được đuôi dài — xem [[Topical Authority]].
- Volume của long tail thường hiện `0` hoặc `10` trong công cụ nhưng tổng lại rất lớn. Đừng loại bỏ theo ngưỡng volume.

## 5. Cạm bẫy

- **Nhắm keyword thay vì nhắm cụm.** Sinh ra 5 trang cạnh tranh lẫn nhau cho cùng một intent (keyword cannibalization).
- **Tin volume của công cụ.** Xem [[Keyword Difficulty and Volume]] — sai số rất lớn.
- **Bỏ qua intent.** Truy vấn volume cao sai intent = traffic không chuyển đổi. Xem [[Intent Mapping]].
- **Nghiên cứu một lần rồi thôi.** Nhu cầu và SERP đổi. Kiểm lại mỗi quý.
- **Không tính chi phí sản xuất.** 500 cụm là một backlog 2 năm nếu team viết được 5 bài/tháng. Ưu tiên cho thật.
- **Bỏ qua truy vấn brand.** Chúng thường là nguồn traffic lớn nhất và cần được tách riêng khi báo cáo — [[SEO KPIs and Reporting]].
- **Nghiên cứu tiếng Anh rồi dịch sang tiếng Việt.** Cách diễn đạt và intent khác hẳn; phải nghiên cứu lại trong ngôn ngữ đích.

## 6. Checklist áp dụng

- [ ] Đã lấy truy vấn từ GSC (dữ liệu của chính mình) trước khi mở công cụ chưa?
- [ ] Đã nhóm theo SERP overlap, không theo chuỗi ký tự?
- [ ] Mỗi cụm đã được gán một **loại trang** cụ thể chưa?
- [ ] Backlog xếp theo giá trị × khả năng thắng, không theo volume?
- [ ] Đã kiểm cannibalization — có hai trang cũ nào đang nhắm cùng cụm không?
- [ ] Có nguồn nào chỉ bạn có (support, search nội bộ) được dùng không?
- [ ] Backlog có khớp với năng lực sản xuất thật của team không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Search Console | Truy vấn thật của site bạn, miễn phí | [GSC](https://search.google.com/search-console) |
| Google Keyword Planner | Volume từ Google, nhưng gộp nhóm rất thô | [KWP](https://ads.google.com/home/tools/keyword-planner/) |
| Ahrefs Keywords Explorer | Cơ sở dữ liệu lớn, có Parent Topic (clustering) | [Ahrefs](https://ahrefs.com/keywords-explorer) |
| Semrush Keyword Magic | Lọc theo intent, nhóm tự động | [Semrush](https://www.semrush.com/analytics/keywordmagic/) |
| Google Trends | Xu hướng tương đối, so sánh theo mùa/vùng | [Trends](https://trends.google.com/) |
| AlsoAsked / AnswerThePublic | Khai thác PAA | [AlsoAsked](https://alsoasked.com/) |

## Tham khảo
- [Ahrefs — Keyword Research: The Beginner's Guide](https://ahrefs.com/blog/keyword-research/)
- [Moz — Keyword Research](https://moz.com/beginners-guide-to-seo/keyword-research)
- [Google — Keyword Planner help](https://support.google.com/google-ads/answer/7337243)
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Liên kết
[[Keyword Difficulty and Volume]] · [[Intent Mapping]] · [[Topic Clusters]] · [[Competitor Gap Analysis]] · [[Search Intent]] · [[SEO]]
