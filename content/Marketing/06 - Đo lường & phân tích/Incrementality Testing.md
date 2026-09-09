---
tags: [marketing, đo-lường]
status: evergreen
---
# Incrementality Testing

> Câu hỏi duy nhất đáng hỏi về chi tiêu marketing: **"nếu ta không chi khoản này, chuyện gì đã xảy ra?"** Chỉ thí nghiệm có nhóm đối chứng trả lời được. Mọi thứ khác là ước lượng có thiên lệch.

## 1. Các thiết kế test

| Thiết kế | Cách làm | Khi nào dùng | Độ mạnh |
|---|---|---|---|
| **Geo holdout** | Tắt/bật quảng cáo ở nhóm vùng địa lý, so với vùng đối chứng | ✅ Kênh không nhắm được cá nhân; TV, OOH, brand | Cao — chuẩn vàng thực dụng |
| **PSA test** | Nhóm đối chứng thấy quảng cáo công ích thay vì quảng cáo của bạn | Nền tảng hỗ trợ | Cao — kiểm soát cả hiệu ứng "được thấy quảng cáo" |
| **Ghost ads / ghost bids** | Ghi lại ai *sẽ* thấy quảng cáo nhưng không hiển thị | Nền tảng hỗ trợ | Cao, rẻ hơn PSA |
| **Holdout theo người dùng** | Giữ lại % danh sách không nhận | ✅ Email, CRM, retargeting | Cao, dễ làm nhất |
| **Switchback** | Bật/tắt luân phiên theo thời gian | Hiệu ứng ngắn hạn | Trung bình |
| Before/after | So trước và sau | ❌ **Không phải test** — lẫn với mùa vụ và mọi thứ khác | Rất thấp |

## 2. Bắt đầu từ đâu — theo mức nghi ngờ

Chạy test ở nơi attribution nghi ngờ nhất, theo thứ tự:

1. **Retargeting** — gần như luôn được gán công quá mức
2. **Brand search trả tiền** — [[Paid Search and Shopping]]
3. **Email tới người vốn đã hoạt động**
4. **Kênh nhận biết** — để chứng minh giá trị bị attribution bỏ sót (chiều ngược lại)

Hai cái đầu thường tiết kiệm được tiền ngay; cái thứ tư thường **bảo vệ** được ngân sách đang bị cắt oan.

## 3. Thiết kế đúng

1. **Chọn đơn vị ngẫu nhiên hoá** — vùng địa lý, người dùng, hoặc khoảng thời gian. Ghi rõ.
2. **Kiểm tra hai nhóm tương đương trước khi chạy** (A/A test hoặc so lịch sử).
3. **Tính power trước.** Với hiệu ứng nhỏ và dữ liệu nhiễu, geo test cần nhiều vùng và nhiều tuần — xem [[Marketing Experimentation]].
4. **Chạy đủ dài** — tối thiểu qua một chu kỳ mua trọn vẹn.
5. **Chốt ngưỡng và ngày dừng trước.**
6. **Đo ở kết quả kinh doanh cuối** (đơn hàng, doanh thu), không ở chỉ số trung gian.
7. **Báo cáo kèm khoảng tin cậy.** "Lift 12% ± 9%" trung thực hơn "lift 12%".

> [!warning] Test không có kết luận vẫn là kết quả
> Nếu khoảng tin cậy rộng tới mức bao cả 0, kết luận đúng là *"chưa đủ dữ liệu để nói"*, không phải *"không có tác dụng"* và cũng không phải *"có tác dụng nhưng chưa đủ ý nghĩa thống kê"*.

## 4. Cạm bẫy

- **Nhóm đối chứng bị nhiễm.** Người ở vùng đối chứng vẫn thấy quảng cáo (đi lại, VPN, nhắm mục tiêu không chính xác) → làm giảm hiệu ứng đo được.
- **Test quá ngắn.** Bỏ sót hiệu ứng trễ; nghiêm trọng với brand và B2B.
- **Chỉ đo trong lúc chạy.** Tác động kéo dài sau khi tắt — đo thêm một giai đoạn sau.
- **Đơn vị ngẫu nhiên hoá sai.** Ngẫu nhiên theo người nhưng đo theo hộ gia đình → rò rỉ.
- **Peeking.** Nhìn kết quả mỗi ngày rồi dừng khi thấy đẹp.
- **Ngoại suy quá xa.** Kết quả ở mức chi tiêu X không áp dụng cho mức 5X — hiệu suất giảm dần.
- **Chỉ test một lần.** Hiệu quả kênh trôi theo thời gian; lịch test định kỳ mới đúng.

## 5. Checklist áp dụng

- [ ] Tôi có nhóm đối chứng **thật** không, hay chỉ so trước/sau?
- [ ] Hai nhóm đã được kiểm tương đương trước khi chạy chưa?
- [ ] Tôi đã tính power chưa? Test này phát hiện được mức lift nhỏ nhất là bao nhiêu?
- [ ] Thời gian chạy có dài hơn chu kỳ mua không?
- [ ] Ngày dừng và ngưỡng đã chốt trước chưa?
- [ ] Tôi có đo giai đoạn **sau khi tắt** không?
- [ ] Tôi báo cáo kèm khoảng tin cậy chứ không chỉ điểm ước lượng?
- [ ] Có lịch test lại định kỳ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Ads / Meta lift tests | Test tích hợp sẵn trong nền tảng | https://support.google.com/google-ads/answer/9027497 |
| GeoLift (Meta, mã nguồn mở) | Thiết kế & phân tích geo test | https://github.com/facebookincubator/GeoLift |
| CausalImpact (Google, R) | Chuỗi thời gian Bayesian cho can thiệp | https://google.github.io/CausalImpact/ |

## Tham khảo

- Gordon, Zettelmeyer, Bhargava & Chapsky — "A Comparison of Approaches to Advertising Measurement", *Marketing Science* 2019 — https://pubsonline.informs.org/doi/10.1287/mksc.2018.1135
- Blake, Nosko & Tadelis — "Consumer Heterogeneity and Paid Search Effectiveness", *Econometrica* 2015 — https://www.econometricsociety.org/publications/econometrica/2015/01/01/consumer-heterogeneity-and-paid-search-effectiveness-large
- Johnson, Lewis & Nubbemeyer — "Ghost Ads: Improving the Economics of Measuring Online Ad Effectiveness", *Journal of Marketing Research* 2017 — https://journals.sagepub.com/doi/10.1509/jmr.15.0299
- Meta — GeoLift documentation — https://facebookincubator.github.io/GeoLift/

## Liên kết

[[Attributed vs Incremental]] · [[Marketing Experimentation]] · [[Marketing Mix Modeling]] · [[Marketing Attribution Models]] · [[Marketing]]
