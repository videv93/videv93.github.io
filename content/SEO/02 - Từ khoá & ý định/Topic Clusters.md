---
tags: [seo, keywords, strategy, content]
status: evergreen
---
# Topic Clusters

> Mô hình **pillar–cluster**: một trang trụ bao quát chủ đề, nhiều trang con đi sâu từng nhánh, tất cả liên kết chặt với nhau. Nó hiệu quả — nhưng nó cũng là mô hình bị áp dụng máy móc nhiều nhất trong SEO.

## 1. Cấu trúc

```
        [Pillar: SEO là gì]
         /      |       \
   [Technical] [On-page] [Link building]
     /   \        |          |    \
  [Crawl][Index] [Title]  [Anchor][Digital PR]
```

Quy tắc liên kết:

| Chiều | Bắt buộc? | Ghi chú |
|---|---|---|
| Pillar → cluster | ✅ | Mọi trang con phải được link từ trụ |
| Cluster → pillar | ✅ | Anchor mô tả chủ đề trụ |
| Cluster ↔ cluster | Khi thật sự liên quan | Đừng link chéo tất cả với tất cả |
| Cluster → cluster khác chủ đề | Chỉ khi hữu ích | Link vì người đọc, không vì sơ đồ |

Xem [[Internal Linking]] cho cơ chế truyền tín hiệu.

## 2. Vì sao nó hoạt động

1. **Bao phủ intent đầy đủ** — người tìm ở mọi giai đoạn phễu đều có trang đúng.
2. **Tín hiệu chủ đề tập trung** — Google hiểu site bạn *về cái gì*, hỗ trợ [[Topical Authority]].
3. **Phân phối link equity** — link ngoài trỏ vào trụ chảy xuống trang con và ngược lại.
4. **Chống cannibalization** — mỗi nhánh có chủ nhân rõ ràng, nếu ánh xạ đúng ([[Intent Mapping]]).
5. **Kỷ luật biên tập** — sơ đồ cụm là backlog nội dung sẵn có.

## 3. Khi nào mô hình này **sai**

> [!warning] Pillar–cluster không phải luôn đúng
> Đây là phần mà hầu hết tài liệu về topic cluster bỏ qua.

- **Chủ đề quá hẹp.** Nếu chỉ có 3 nhánh con, một trang đầy đủ tốt hơn 4 trang mỏng.
- **Trang trụ không có intent riêng.** Nếu không ai tìm *"seo"* để đọc tổng quan, trang trụ là trang không ai đọc. Trụ phải phục vụ một truy vấn thật.
- **Ecommerce.** Cấu trúc đúng là **category → subcategory → product**, không phải pillar blog. Xem [[Ecommerce SEO]].
- **Chủ đề mà SERP đòi trang cụ thể.** Nếu top 10 toàn công cụ/trang sản phẩm, một bài trụ dài không thắng được.
- **Ép đủ số lượng.** "Mỗi pillar phải có 10 cluster" là quy tắc bịa. Số nhánh do chủ đề quyết định.
- **Site chưa có authority.** Cụm 15 bài mỏng thua một bài xuất sắc. Bắt đầu bằng chiều sâu, mở rộng sau.

## 4. Xây cụm — quy trình

1. **Chọn chủ đề** có giá trị kinh doanh (không phải volume cao nhất) — [[SEO Business Case]].
2. **Lập cụm truy vấn** bằng SERP overlap — [[Keyword Research]].
3. **Xác định trang trụ**: cụm nào rộng nhất và có truy vấn "là gì / tổng quan" thật.
4. **Gán mỗi cụm con một URL** — [[Intent Mapping]].
5. **Viết trang sâu nhất trước**, không viết trụ trước. Trụ dễ thành nội dung mỏng nếu viết khi chưa hiểu chi tiết.
6. **Nối link** theo bảng ở mục 1.
7. **Đo theo cụm**, không theo trang — xem mục 5.

## 5. Đo lường cụm

Đo cả cụm chứ không đo từng URL:

- Tổng impression/click của mọi URL trong cụm ([[Google Search Console]], lọc theo path)
- Số truy vấn trong cụm có vị trí ≤10
- Số truy vấn trong cụm **mới xuất hiện** — dấu hiệu authority chủ đề đang tăng
- Tỷ lệ trang trong cụm được index — [[Indexing and Index Bloat]]

> [!note] Tín hiệu thành công đặc trưng của cụm
> Khi cụm "ăn", các trang **bắt đầu xếp hạng cho truy vấn bạn không nhắm tới**. Nếu sau 6 tháng chỉ xếp hạng đúng truy vấn đã nhắm, cụm chưa tạo được authority chủ đề.

## 6. Cạm bẫy

- **Viết trụ trước.** Xem mục 4.5.
- **Link chéo tất cả với tất cả.** Làm loãng tín hiệu và tạo trải nghiệm rối.
- **Trang con quá mỏng.** Cụm 20 bài 400 từ thua 5 bài 2.000 từ có thực chất — [[Helpful Content and Core Updates]].
- **Không cập nhật cụm.** Cụm là thực thể sống; thêm nhánh khi có truy vấn mới, gộp nhánh chết — [[Content Refresh and Pruning]].
- **Dùng cụm để biện minh cho sản xuất hàng loạt.** Ranh giới với [[Programmatic SEO]] và spam rất mỏng.
- **Trụ chỉ là mục lục.** Trang trụ toàn link, không có nội dung riêng, sẽ bị đánh giá là thin content.

## 7. Checklist áp dụng

- [ ] Trang trụ có phục vụ một truy vấn thật (kiểm bằng SERP) không?
- [ ] Mỗi trang con có đúng một cụm truy vấn chủ nhân chưa?
- [ ] Mọi trang con được link từ trụ và link ngược về trụ chưa?
- [ ] Đã viết trang chi tiết trước khi viết trụ chưa?
- [ ] Số nhánh do chủ đề quyết định, không do một con số định sẵn?
- [ ] Có đo cả cụm (không chỉ từng URL) trong GSC không?
- [ ] Sau 6 tháng — cụm có xếp hạng cho truy vấn ngoài dự kiến không?

## Tham khảo
- [HubSpot — Topic Clusters: The Next Evolution of SEO](https://blog.hubspot.com/marketing/topic-clusters-seo)
- [Ahrefs — Topical Authority](https://ahrefs.com/blog/topical-authority/)
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Moz — Site Architecture and Internal Linking](https://moz.com/learn/seo/internal-link)

## Liên kết
[[Topical Authority]] · [[Intent Mapping]] · [[Internal Linking]] · [[Keyword Research]] · [[Site Architecture and URL Design]] · [[SEO]]
