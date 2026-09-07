---
tags: [seo, strategy, scale]
status: growing
---
# Programmatic SEO

> Sinh hàng nghìn tới hàng triệu trang từ dữ liệu có cấu trúc + template. Nó **hoạt động** — Zillow, TripAdvisor, Indeed, Wise đều dựa vào nó. Nó cũng là **ranh giới trực tiếp với scaled content abuse**, và bên nào của ranh giới quyết định thành công hay bị phạt.

## 1. Ranh giới — câu hỏi quyết định

Google định nghĩa **scaled content abuse**: *"tạo nhiều trang với mục đích chính là thao túng xếp hạng, không phải giúp người dùng"*.

| ✅ pSEO hợp lệ | ❌ Scaled content abuse |
|---|---|
| Mỗi trang có **dữ liệu riêng thật** | Mỗi trang chỉ đổi tên thành phố/từ khoá |
| Người dùng nhận giá trị từ trang cụ thể đó | Trang tồn tại chỉ để bắt truy vấn |
| Dữ liệu bạn sở hữu / thu thập / cấp phép | Dữ liệu cào từ nơi khác |
| Có nhu cầu tìm kiếm thật cho từng biến thể | Sinh mọi tổ hợp bất kể có ai tìm không |
| Trang cập nhật khi dữ liệu thay đổi | Sinh một lần rồi bỏ |

> [!note] Phép kiểm một câu
> *"Nếu Google không tồn tại, trang này có lý do tồn tại không?"* Trang "Giá thuê nhà trung bình ở Quận 3, TP.HCM" với dữ liệu thật — có. Trang "Dịch vụ SEO tại Quận 3" chỉ đổi tên quận — không.

## 2. Ba thành phần

```
Dữ liệu có cấu trúc  ×  Template  ×  Nhu cầu tìm kiếm
```

Cả ba đều bắt buộc. Thiếu **nhu cầu tìm kiếm** ⇒ hàng nghìn trang không ai vào. Thiếu **dữ liệu riêng** ⇒ thin content. Thiếu **template tốt** ⇒ trải nghiệm tệ.

**Nguồn dữ liệu hợp lệ:**
- Dữ liệu vận hành của chính bạn (giá, tồn kho, đánh giá, giao dịch)
- Dữ liệu công khai/chính phủ được xử lý và trình bày tốt hơn
- Dữ liệu cấp phép
- UGC thật từ người dùng của bạn
- Dữ liệu bạn tự thu thập có phương pháp

## 3. Quy trình

1. **Tìm mẫu truy vấn.** `[dịch vụ] ở [thành phố]`, `[A] vs [B]`, `[sản phẩm] cho [đối tượng]`. Kiểm nhu cầu thật — [[Keyword Research]].
2. **Kiểm SERP cho vài biến thể mẫu.** Google trả về gì? Nếu toàn trang thương hiệu lớn hoặc forum, pSEO khó thắng.
3. **Đánh giá dữ liệu.** Bạn có đủ dữ liệu riêng cho **mỗi** trang không? Nếu nhiều trang sẽ gần rỗng, cắt bớt phạm vi.
4. **Dựng template** với đủ nội dung riêng và cấu trúc nhất quán.
5. **Ra từng đợt.** 100 trang trước, đo 4–8 tuần, rồi mở rộng. **Đừng xuất bản 50.000 trang trong một ngày** — vừa là mẫu hành vi đáng ngờ vừa không học được gì.
6. **Cắt tỉa liên tục.** Trang không có traffic sau 6 tháng nên bị `noindex` hoặc xoá — [[Content Refresh and Pruning]].

## 4. Kỹ thuật

- **[[Crawling and Crawl Budget]]** là ràng buộc chính. Sitemap chia nhỏ, `lastmod` thật.
- **[[Internal Linking]]** — trang pSEO cần hub và link chéo có ý nghĩa, không phải footer 500 link.
- **[[Site Architecture and URL Design]]** — URL có mẫu rõ ràng, dự đoán được.
- **Render server-side.** Với hàng chục nghìn trang, CSR là tự sát — [[JavaScript Rendering and SEO]].
- **[[Structured Data and Rich Results]]** sinh từ cùng nguồn dữ liệu.
- **Hiệu năng** — template phải nhanh; nhân với 50.000 trang thì mọi tối ưu đều đáng.

## 5. Cạm bẫy

- **Sinh mọi tổ hợp.** `[dịch vụ] × [quận] × [giá]` = bùng nổ tổ hợp, phần lớn không ai tìm.
- **Trang gần rỗng.** Nếu 60% trang chỉ có 2 dòng dữ liệu, cắt phạm vi lại.
- **Xuất bản một lần toàn bộ.** Không học được gì và trông đáng ngờ.
- **Cào dữ liệu của người khác.** Vi phạm bản quyền và chính sách.
- **Không cập nhật.** Dữ liệu cũ (giá 2 năm trước) làm mất Trust — [[E-E-A-T]].
- **Không cắt tỉa.** Index bloat tích luỹ — [[Indexing and Index Bloat]].
- **Dùng AI sinh nội dung lấp chỗ trống.** Đó chính là scaled content abuse — [[AI Generated Content and SEO]].
- **Không có ai chịu trách nhiệm chất lượng.** Vì tự động nên không ai đọc trang thật.

## 6. Checklist áp dụng

- [ ] Đã kiểm nhu cầu tìm kiếm thật cho mẫu truy vấn chưa?
- [ ] Đã kiểm SERP cho ít nhất 5 biến thể mẫu chưa?
- [ ] Mỗi trang có dữ liệu riêng thật, không chỉ đổi biến số?
- [ ] Trang có lý do tồn tại nếu Google không tồn tại không?
- [ ] Dữ liệu có nguồn hợp pháp không?
- [ ] Có ra từng đợt và đo giữa các đợt không?
- [ ] Có kế hoạch cập nhật dữ liệu định kỳ không?
- [ ] Có quy trình cắt tỉa trang không hiệu quả không?
- [ ] Đã đọc ngẫu nhiên 20 trang sinh ra và thấy chúng hữu ích chưa?

## Tham khảo
- [Google — Spam policies: scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Central Blog — March 2024 core update and new spam policies](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Ahrefs — Programmatic SEO](https://ahrefs.com/blog/programmatic-seo/)

## Liên kết
[[Google Spam Policies]] · [[AI Generated Content and SEO]] · [[Crawling and Crawl Budget]] · [[Ecommerce SEO]] · [[Content Refresh and Pruning]] · [[SEO]]
