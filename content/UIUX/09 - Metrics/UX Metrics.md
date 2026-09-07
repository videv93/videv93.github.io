---
tags: [uiux, metrics]
status: growing
---
# UX Metrics

> Biết đọc số liệu như tỷ lệ chuyển đổi (Conversion Rate) và tỷ lệ bỏ dở (Drop-off Rate) để **đánh giá hiệu quả thiết kế** — và để bảo vệ quyết định thiết kế bằng bằng chứng thay vì ý kiến.

## 1. Khung HEART (Google)
| Chỉ số | Ý nghĩa | Ví dụ đo lường |
|---|---|---|
| **H**appiness | Mức độ hài lòng | NPS, CSAT, SUS, khảo sát trong app |
| **E**ngagement | Mức độ tham gia | Số phiên/tuần, thời lượng, số hành động chính |
| **A**doption | Tiếp nhận tính năng mới | % người dùng đã dùng tính năng trong 30 ngày |
| **R**etention | Giữ chân | % còn quay lại sau D1/D7/D30 |
| **T**ask success | Hoàn thành nhiệm vụ | Tỉ lệ thành công, thời gian, tỉ lệ lỗi |

**Cách dùng đúng:** với mỗi chỉ số, xác định **Goals → Signals → Metrics**. Đừng đo cả 5 — chọn 1–2 phù hợp với mục tiêu hiện tại.

> Cạm bẫy: engagement tăng không phải lúc nào cũng tốt. Người dùng ở lâu hơn có thể vì họ **không tìm được** thứ cần.

## 2. Chỉ số hành vi cốt lõi
- **Conversion Rate** — % hoàn thành mục tiêu (đăng ký, mua hàng). Luôn nêu rõ mẫu số.
- **Drop-off / Funnel** — % rơi rớt ở từng bước. Bước rơi nhiều nhất là nơi đáng thiết kế lại nhất.
- **Task Success Rate** — % hoàn thành nhiệm vụ trong test hoặc thực tế.
- **Time on Task** — nhanh hơn thường tốt hơn (trừ nội dung giải trí).
- **Error Rate** — số lỗi/thao tác.
- **Bounce Rate / Exit Rate** — rời ngay hoặc rời tại một trang cụ thể.
- **Time to First Value (TTFV)** — bao lâu để người dùng mới nhận được giá trị đầu tiên. Chỉ số onboarding quan trọng nhất.
- **Rage click / Dead click** — bấm liên tục vì không có phản hồi; dấu hiệu UX hỏng rõ ràng nhất (đo bằng Hotjar/Clarity).

## 3. Chỉ số thái độ
- **SUS (System Usability Scale)** — 10 câu, điểm 0–100. **68 = trung bình ngành**; >80 là tốt. Chuẩn hoá tốt, so sánh được qua thời gian.
- **SEQ (Single Ease Question)** — 1 câu sau mỗi task, thang 1–7. Rẻ, dùng ngay trong [[Usability Testing]].
- **CSAT** — "Bạn hài lòng thế nào?" (1–5), đo một tương tác cụ thể.
- **NPS** — "Khả năng bạn giới thiệu cho bạn bè?" (0–10). Phổ biến với lãnh đạo nhưng nhiễu; đừng dùng để đánh giá một thay đổi UI.
- **CES (Customer Effort Score)** — "Việc đó dễ hay khó?" Dự đoán lòng trung thành tốt hơn NPS.

## 4. Chỉ số kỹ thuật ảnh hưởng UX
**Core Web Vitals** — Google dùng làm tín hiệu xếp hạng, và chúng phản ánh trải nghiệm thật:
- **LCP** (Largest Contentful Paint) — nội dung chính hiện ra: **< 2.5s**
- **INP** (Interaction to Next Paint) — độ trễ khi tương tác: **< 200ms**
- **CLS** (Cumulative Layout Shift) — layout nhảy: **< 0.1** → [[Progress & Loading]]

Tốc độ là tính năng UX. Cải thiện LCP thường tăng conversion nhiều hơn mọi thay đổi thị giác.

## 5. Nguyên tắc đo lường
- **Đo trước khi sửa** — không có baseline thì không chứng minh được cải thiện.
- **Ghép định lượng với định tính.** Analytics nói *cái gì*, research nói *vì sao*. Xem [[User Research]].
- **Một chỉ số bắc cầu duy nhất** cho mỗi dự án, thay vì bảng 20 số.
- **Cảnh giác với vanity metrics** — lượt xem trang, số đăng ký không kèm kích hoạt.
- **Goodhart's Law**: khi một chỉ số trở thành mục tiêu, nó không còn là chỉ số tốt. Luôn kèm **counter-metric** (ví dụ: tăng conversion nhưng theo dõi cả tỉ lệ hoàn tiền).
- **Phân khúc** — trung bình che giấu sự thật. Tách theo người mới/cũ, mobile/desktop.
- **A/B test** cần đủ mẫu và đủ thời gian; kết thúc sớm khi thấy số đẹp là sai lầm kinh điển.

## 6. Công cụ
- **Google Analytics 4** / **PostHog** / **Amplitude** / **Mixpanel** — funnel, cohort, retention
- **Microsoft Clarity** (miễn phí) — heatmap, session recording, rage click: https://clarity.microsoft.com/
- **Hotjar** — heatmap + khảo sát trong trang
- **Maze** — test định lượng trên prototype
- **PageSpeed Insights** — Core Web Vitals: https://pagespeed.web.dev/

## 7. Checklist
- [ ] Thay đổi này nhằm cải thiện chỉ số nào?
- [ ] Có baseline chưa?
- [ ] Có counter-metric không?
- [ ] Mẫu có đủ lớn để kết luận không?
- [ ] Đã xem session recording của người dùng thất bại chưa?
- [ ] Số này có phân khúc theo mobile/desktop chưa?

## Tham khảo
- Google — *HEART framework* (bài gốc): https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/
- NN/g — *Usability Metrics*: https://www.nngroup.com/articles/usability-metrics/
- MeasuringU — SUS, SEQ, benchmark: https://measuringu.com/
- web.dev — *Core Web Vitals*: https://web.dev/articles/vitals
- Amplitude — *North Star Metric playbook*: https://amplitude.com/north-star

## Liên kết
[[Usability Testing]] · [[Business Mindset]] · [[User Research]] · [[UIUX]]
