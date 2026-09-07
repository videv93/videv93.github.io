---
tags: [seo, risk, diagnosis]
status: evergreen
---
# Penalty Diagnosis and Recovery

> Bước đầu tiên khi traffic sụt luôn là **chẩn đoán loại vấn đề**, không phải sửa. Chẩn đoán sai dẫn tới nhiều tháng sửa sai thứ — và trường hợp phổ biến nhất là disavow link khi vấn đề nằm ở nội dung.

## 1. Cây chẩn đoán

```
Traffic organic sụt
│
├─ GSC → Manual Actions có báo gì không?
│    ├─ CÓ  ──► Manual action. Đọc mô tả, sửa, nộp reconsideration. (mục 3)
│    └─ KHÔNG ──► tiếp tục
│
├─ Số trang được index có giảm không? (GSC Page indexing)
│    └─ CÓ ──► Vấn đề KỸ THUẬT: robots.txt, noindex, 5xx, redirect
│               → [[Indexing and Index Bloat]], [[Robots Exclusion]]
│
├─ Impression giữ nguyên nhưng click giảm?
│    └─ CÓ ──► Vấn đề SERP: AI Overview, feature mới, snippet
│               → [[AI Search and Zero Click]], [[Title Tags and Meta Descriptions]]
│
├─ Ngày sụt có trùng core update không? (Search Status Dashboard)
│    └─ CÓ ──► Vấn đề CHẤT LƯỢNG → [[Helpful Content and Core Updates]]
│
├─ Sụt chỉ ở một nhóm trang / một loại truy vấn?
│    └─ CÓ ──► Vấn đề cục bộ: cannibalization, mất link, đối thủ
│               → [[Intent Mapping]], [[Backlink Fundamentals]]
│
└─ Không khớp gì ở trên?
     └─► Kiểm: mùa vụ, đối thủ mới, thay đổi sản phẩm, lỗi analytics
```

> [!warning] Kiểm Manual Actions **trước tiên**, luôn luôn
> Nó mất 10 giây và nó phân đôi toàn bộ quy trình. Rất nhiều dự án "khôi phục SEO" chạy nhiều tháng mà chưa ai mở tab đó.

## 2. Phân biệt bốn loại vấn đề

| Loại | Dấu hiệu | Thời gian hồi phục |
|---|---|---|
| **Kỹ thuật** | Số trang index giảm, lỗi crawl tăng | Ngày–tuần sau khi sửa |
| **Manual action** | Có thông báo trong GSC | 1–4 tuần sau khi duyệt reconsideration |
| **Algorithmic (chất lượng)** | Trùng core update, không có thông báo | Nhiều tháng, tới core update sau |
| **Thị trường/SERP** | Impression giữ, click giảm; hoặc đối thủ mới lên | Không "hồi phục" — phải đổi chiến lược |

**Loại thứ tư hay bị bỏ sót.** Nếu AI Overview chiếm chỗ cho truy vấn của bạn, không có gì để "sửa" — bài toán đã đổi. Xem [[AI Search and Zero Click]].

## 3. Xử lý manual action

1. **Đọc kỹ mô tả** trong GSC — nó nêu loại vi phạm và phạm vi (toàn site hay một phần).
2. **Xác định nguyên nhân thật.** Nếu là link không tự nhiên — link nào? Ai tạo? Khi nào?
3. **Sửa triệt để**, không sửa một phần. Google kiểm lại thủ công.
4. **Gỡ trước, disavow sau.** Google muốn thấy nỗ lực gỡ thật — [[Toxic Links and Disavow]].
5. **Ghi lại bằng chứng**: bảng liệt kê link/trang đã xử lý, email đã gửi, ngày tháng.
6. **Nộp reconsideration request**: trung thực, cụ thể, có bằng chứng. Nêu rõ điều gì đã sai, đã sửa gì, và làm gì để không tái diễn.
7. **Chờ.** Có thể vài tuần. Nộp lại nhiều lần liên tiếp không giúp gì.

**Reconsideration request bị từ chối vì:** mô tả chung chung, không có bằng chứng, đổ lỗi cho agency mà không sửa, sửa một phần.

## 4. Xử lý algorithmic

Không có reconsideration request cho vấn đề thuật toán. Quy trình:

1. Xác nhận là core/HCU — [[Google Algorithm Updates]].
2. Audit toàn site theo bộ câu hỏi — [[Helpful Content and Core Updates]].
3. Cắt tỉa và cải thiện — [[Content Refresh and Pruning]].
4. Ghi lại ngày mọi thay đổi.
5. Chờ core update tiếp theo. Đây là điểm quan trọng: **hồi phục thường chỉ xuất hiện khi Google đánh giá lại**, tức 3–6 tháng.

## 5. Cạm bẫy

- **Không kiểm Manual Actions.** Xem cảnh báo mục 1.
- **Disavow khi không có manual action.** Sai chẩn đoán phổ biến nhất.
- **Sửa nhiều thứ cùng lúc.** Không biết cái gì có tác dụng.
- **Kỳ vọng hồi phục nhanh cho vấn đề chất lượng.** Nhiều tháng là bình thường.
- **Bỏ qua khả năng lỗi analytics.** Kiểm tag GA4 trước khi hoảng — [[GA4 for SEO]].
- **Bỏ qua mùa vụ.** So cùng kỳ năm trước — [[SEO KPIs and Reporting]].
- **Không ghi ngày thay đổi.** Không quy được nguyên nhân sau này.
- **Tin rằng luôn có đường hồi phục.** Với một số site sau HCU, chưa ai chứng minh được điều đó.

## 6. Phép kiểm chuyển được (thay cho checklist)

Áp được cho mọi lần sụt traffic, ở mọi site:

- [ ] **10 giây đầu:** GSC → Manual Actions. Có gì không?
- [ ] **Phút đầu:** Số trang index có giảm không?
- [ ] **5 phút đầu:** Impression giảm hay chỉ click giảm?
- [ ] **10 phút đầu:** Ngày sụt có trùng core update trên Search Status Dashboard không?
- [ ] **30 phút đầu:** Sụt toàn site hay một nhóm? Lọc GSC theo path.
- [ ] **1 giờ đầu:** Mở SERP cho 5 truy vấn bị mất nhất — ai lên thay?
- [ ] **Trước khi hành động:** Đã loại trừ lỗi analytics và mùa vụ chưa?
- [ ] **Trước khi hành động:** Đã ghi lại baseline để đo hồi phục chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| GSC → Manual Actions | Bước chẩn đoán số một | [GSC](https://search.google.com/search-console) |
| GSC → Security Issues | Loại trừ site bị hack | [GSC](https://search.google.com/search-console) |
| Google Search Status Dashboard | Đối chiếu ngày core update | [Status](https://status.search.google.com/) |
| Wayback Machine | Xem site trước thời điểm sụt | [Archive](https://web.archive.org/) |

## Tham khảo
- [Google — Manual Actions report](https://support.google.com/webmasters/answer/9044175)
- [Google — Submit a reconsideration request](https://support.google.com/webmasters/answer/35843)
- [Google Search Central Blog — What site owners should know about core updates](https://developers.google.com/search/blog/2019/08/core-updates)
- [Google — Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)

## Liên kết
[[Google Spam Policies]] · [[Google Algorithm Updates]] · [[Helpful Content and Core Updates]] · [[Toxic Links and Disavow]] · [[Crawl Auditing]] · [[SEO]]
