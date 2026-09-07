---
tags: [seo, analytics, experimentation]
status: growing
---
# SEO Testing

> SEO **có thể** làm thí nghiệm có kiểm soát — nhưng không phải A/B test theo người dùng. Đơn vị thí nghiệm là **nhóm URL**, không phải nhóm người, vì Googlebot chỉ thấy một phiên bản của mỗi trang.

## 1. Vì sao A/B test thường không dùng được

| A/B test thường | SEO test |
|---|---|
| Chia **người dùng** thành nhóm | Chia **URL** thành nhóm |
| Kết quả trong vài ngày | 4–8 tuần |
| Đo chuyển đổi | Đo click/impression từ GSC |
| Googlebot không liên quan | Googlebot phải thấy phiên bản thay đổi |

Cloaking (hiện nội dung khác cho Googlebot) là **vi phạm** [[Google Spam Policies]] — nên không thể chia nhóm theo user-agent.

## 2. Thiết kế SEO test

**Điều kiện tiên quyết:** cần đủ URL cùng loại. Site 20 trang không test được. Ecommerce 5.000 trang sản phẩm thì test rất tốt.

```
1. Chọn tập URL đồng nhất (cùng template, cùng loại intent)
2. Chia ngẫu nhiên thành nhóm A (đối chứng) và B (thay đổi)
   → Chia ngẫu nhiên, KHÔNG chia theo danh mục hay theo traffic
3. Ghi lại baseline 4 tuần cho cả hai nhóm
4. Áp thay đổi cho nhóm B
5. Chờ 4–8 tuần
6. So *thay đổi tương đối* giữa hai nhóm, không so tuyệt đối
```

**Bước 6 là điểm mấu chốt:** nhóm đối chứng hấp thụ mọi biến động chung (mùa vụ, core update, xu hướng thị trường). Chỉ **chênh lệch giữa hai nhóm** mới quy được cho thay đổi.

## 3. Cái gì test được

| Thay đổi | Test được? | Ghi chú |
|---|---|---|
| `<title>` | ✅ Tốt nhất | Ảnh hưởng CTR nhanh, đo rõ — [[Title Tags and Meta Descriptions]] |
| Meta description | ✅ | Đo bằng CTR |
| Cấu trúc nội dung / độ dài | ✅ | Cần nhiều URL hơn |
| Structured data | ✅ | Đo bằng CTR và rich result |
| [[Internal Linking]] | ⚠️ | Khó cô lập — link ảnh hưởng lan sang trang khác |
| Tốc độ trang | ⚠️ | Thường không tách được theo nhóm URL |
| Thay đổi toàn site | ❌ | Không có nhóm đối chứng |
| Migration | ❌ | Không đảo ngược được — [[Site Migration]] |

## 4. Đọc kết quả cho đúng

- **Đo bằng GSC** (impression, click, CTR, position) — không dùng GA4 vì nó không tách được nguồn SERP tốt bằng.
- **So thay đổi %** giữa nhóm B và nhóm A, không so số tuyệt đối.
- **Kiểm ý nghĩa thống kê.** Với dữ liệu nhiễu như SEO, chênh lệch 5% trên 50 URL thường là nhiễu.
- **Kiểm nhóm đối chứng có "yên" không.** Nếu nhóm A cũng biến động mạnh, có yếu tố ngoài — kết quả không tin được.
- **Kết quả âm cũng là kết quả.** Biết một thay đổi không có tác dụng tiết kiệm được việc triển khai toàn site.

## 5. Cạm bẫy

- **Không có nhóm đối chứng.** "Trước/sau" bị nhiễu bởi mùa vụ và core update — đây là lỗi phổ biến nhất.
- **Chia nhóm không ngẫu nhiên.** Chia theo danh mục ⇒ hai nhóm không so được.
- **Test quá nhiều thứ cùng lúc.** Không quy được nguyên nhân.
- **Kết luận sau 1 tuần.** Google cần thời gian crawl lại và ổn định. Tối thiểu 4 tuần.
- **Cloaking.** Vi phạm chính sách.
- **Test trên quá ít URL.** Dưới ~50 URL mỗi nhóm thì nhiễu lấn át tín hiệu.
- **Test trong lúc có core update.** Hoãn hoặc kéo dài thời gian test.
- **Không ghi lại.** Kết quả test là tài sản tổ chức — lưu lại thành tài liệu.

## 6. Checklist áp dụng

- [ ] Có đủ URL đồng nhất để chia hai nhóm ≥50 mỗi nhóm không?
- [ ] Chia nhóm có **ngẫu nhiên** không?
- [ ] Đã ghi baseline 4 tuần cho cả hai nhóm chưa?
- [ ] Chỉ thay đổi **một** biến số?
- [ ] Có chờ đủ 4–8 tuần không?
- [ ] Đo bằng chênh lệch tương đối giữa hai nhóm?
- [ ] Nhóm đối chứng có ổn định trong kỳ test không?
- [ ] Có core update nào trong kỳ test không?
- [ ] Kết quả (kể cả âm) có được ghi lại thành tài liệu không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC + Sheets/Python | Đủ cho hầu hết test; miễn phí | [GSC](https://search.google.com/search-console) |
| GSC BigQuery export | Dữ liệu đầy đủ cho phân tích thống kê | [Docs](https://support.google.com/webmasters/answer/12918484) |
| SearchPilot | Nền tảng SEO A/B test chuyên dụng | [SearchPilot](https://www.searchpilot.com/) |
| CausalImpact (R/Python) | Phân tích can thiệp theo chuỗi thời gian | [GitHub](https://github.com/google/CausalImpact) |

## Tham khảo
- [Google — Spam policies: cloaking](https://developers.google.com/search/docs/essentials/spam-policies#cloaking)
- [Google — Performance report in Search Console](https://support.google.com/webmasters/answer/7042828)
- [Google — CausalImpact package](https://google.github.io/CausalImpact/)
- [SearchPilot — SEO A/B Testing Guide](https://www.searchpilot.com/resources/)

## Liên kết
[[Title Tags and Meta Descriptions]] · [[SEO KPIs and Reporting]] · [[Google Search Console]] · [[Google Algorithm Updates]] · [[Google Spam Policies]] · [[SEO]]
