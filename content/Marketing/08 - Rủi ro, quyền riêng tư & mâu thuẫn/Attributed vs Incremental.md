---
tags: [marketing, bản-lề, mâu-thuẫn, đo-lường]
status: evergreen
---
# Attributed vs Incremental

> **Note bản lề — trục *đo lường*.** Gần như mọi con số ROI marketing bạn từng thấy trả lời câu hỏi *"những lần chạm nào xảy ra trước khi mua"*, rồi được trình bày như thể nó trả lời *"chi tiêu này tạo ra bao nhiêu doanh thu"*. Hai câu đó khác nhau, và khoảng cách giữa chúng thường rất lớn.

## 1. Hai câu hỏi khác nhau

| | **Attributed** | **Incremental** |
|---|---|---|
| Câu hỏi | Lần chạm nào xảy ra trước khi mua? | Nếu không chi, điều gì đã xảy ra? |
| Loại tuyên bố | Mô tả | **Nhân quả** |
| Cần gì | Dữ liệu theo dõi | **Nhóm đối chứng** |
| Nguồn | Nền tảng quảng cáo, GA4 | Thí nghiệm, MMM hiệu chuẩn |
| Có sẵn | Liên tục, miễn phí | Theo đợt, tốn công |
| Thiên lệch | **Có hệ thống, một chiều** | Nhiễu nhưng không thiên lệch |

## 2. Vì sao attributed gần như luôn thổi phồng

Ba cơ chế độc lập, cộng dồn:

1. **Chọn mẫu tự chọn (selection).** Quảng cáo được đưa tới người có xác suất mua cao nhất — thuật toán được thiết kế để làm đúng việc đó. Nó nhận công cho hành vi nó chỉ *dự đoán*, không *gây ra*.
2. **Nhiều nền tảng nhận công cho cùng một đơn hàng.** Cộng báo cáo của các nền tảng thường ra tổng lớn hơn số đơn hàng thật.
3. **Kênh không click được thì vô hình.** TV, OOH, podcast, truyền miệng, bao bì — chúng có tác dụng nhưng không xuất hiện, nên công của chúng bị gán cho kênh cuối phễu.

> [!warning] Ba cơ chế này đều đẩy về **một** hướng
> Đây là điểm quan trọng nhất của note này. Sai số không ngẫu nhiên — nó **có hệ thống**, và nó luôn làm kênh cuối phễu (brand search, retargeting, email) trông tốt hơn thực tế, còn kênh nhận biết trông tệ hơn thực tế. Vì thế "dùng attribution nhưng trừ hao một chút" không phải cách sửa.

**Bằng chứng thực nghiệm:** các thí nghiệm quy mô lớn (Facebook, eBay) nhiều lần cho thấy hiệu quả thật thấp hơn đáng kể so với con số attribution báo cáo — trong một số trường hợp, chi tiêu bị cắt hoàn toàn mà doanh thu gần như không đổi.

## 3. Vì sao attribution vẫn không bị vứt bỏ

Công bằng với nó:

- **Nó có sẵn hằng ngày.** Incrementality test không chạy được cho mọi quyết định nhỏ.
- **Nó tốt cho so sánh tương đối trong cùng một kênh** — quảng cáo A so với B, cùng điều kiện, cùng thiên lệch.
- **Nó phát hiện thay đổi đột ngột** — cảnh báo sớm khi có gì đó hỏng.
- **Nó mô tả hành trình** — hữu ích để hiểu, không để gán công.
- **Incrementality test cũng có giới hạn:** tốn kém, chậm, nhiễu, và kết quả chỉ đúng cho mức chi tiêu đã test.

## 4. Chỗ mỗi bên gãy

**Attribution gãy khi:** dùng để phân bổ ngân sách **giữa** các kênh; dùng để đánh giá kênh nhận biết; cửa sổ nhìn ngắn hơn chu kỳ mua; hoặc khi tỉ lệ consent thấp làm mẫu thiên lệch — [[Marketing Privacy and Consent]].

**Incrementality gãy khi:** nhóm đối chứng bị nhiễm; test quá ngắn để bắt hiệu ứng trễ; ngoại suy sang mức chi tiêu chưa test; hoặc khi kết quả không có ý nghĩa thống kê bị đọc thành "không có tác dụng".

**MMM gãy khi:** không có biến động chi tiêu để học; đa cộng tuyến giữa các kênh; thiếu biến quan trọng (giá, phân phối); hoặc là hộp đen của nhà cung cấp — [[Vendor Playbook vs Marketing Evidence]].

## 5. Cách dùng trung thực: tam giác hoá

Không có một phương pháp đúng. Dùng ba, mỗi cái cho việc nó làm được:

| Phương pháp | Dùng cho | Nhịp |
|---|---|---|
| **Attribution** | Tối ưu chiến thuật **trong** một kênh; cảnh báo sớm | Hằng ngày |
| **Incrementality** | Sự thật nhân quả cho quyết định lớn; hiệu chuẩn | Theo đợt |
| **MMM** | Phân bổ ngân sách giữa các kênh; đường cong bão hoà | Quý |

**Quy tắc kết nối:** dùng kết quả thí nghiệm để **hiệu chuẩn** MMM, và dùng MMM để quyết định phân bổ. Attribution không bao giờ được dùng cho quyết định phân bổ giữa kênh.

**Quy tắc trình bày:** khi báo cáo số attribution, luôn kèm một câu về giới hạn của nó — [[Marketing Reporting and Dashboards]].

## 6. Phép kiểm bạn tự chạy được

1. **Phép kiểm cộng dồn.** Cộng số chuyển đổi từ mọi nền tảng, so với số đơn hàng thật trong hệ thống của bạn. Chênh lệch là mức thổi phồng tối thiểu.
2. **Test tắt.** Tắt hoàn toàn kênh bị nghi ngờ nhất (thường là retargeting hoặc brand search) ở một nhóm vùng, 3–4 tuần. So tổng doanh thu.
3. **Kiểm chu kỳ mua.** So cửa sổ attribution với thời gian trung bình từ chạm đầu tới mua. Nếu cửa sổ ngắn hơn, số của bạn đang sai theo cách có thể tính được.
4. **Kiểm tỉ lệ consent.** Nếu 55% người dùng đồng ý theo dõi, hỏi: 45% còn lại có hành vi giống hay khác? Nếu khác, dashboard của bạn đang mô tả một thị trường không tồn tại.

## Tham khảo

- Gordon, Zettelmeyer, Bhargava & Chapsky — "A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook", *Marketing Science* 2019 — https://pubsonline.informs.org/doi/10.1287/mksc.2018.1135
- Blake, Nosko & Tadelis — "Consumer Heterogeneity and Paid Search Effectiveness: A Large-Scale Field Experiment", *Econometrica* 2015 — https://www.econometricsociety.org/publications/econometrica/2015/01/01/consumer-heterogeneity-and-paid-search-effectiveness-large
- Lewis & Rao — "The Unfavorable Economics of Measuring the Returns to Advertising", *Quarterly Journal of Economics* 2015 — https://academic.oup.com/qje/article/130/4/1941/1916640
- Johnson, Lewis & Nubbemeyer — "Ghost Ads", *Journal of Marketing Research* 2017 — https://journals.sagepub.com/doi/10.1509/jmr.15.0299

## Liên kết

[[Marketing Attribution Models]] · [[Incrementality Testing]] · [[Marketing Mix Modeling]] · [[Brand Building vs Performance Marketing]] · [[Marketing KPIs and Metrics Tree]] · [[Marketing]]
