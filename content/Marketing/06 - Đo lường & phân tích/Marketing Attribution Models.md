---
tags: [marketing, đo-lường]
status: growing
---
# Marketing Attribution Models

> Attribution trả lời *"những lần chạm nào xảy ra trước khi mua"*. Nó **không** trả lời *"lần chạm nào gây ra việc mua"*. Nhầm hai câu này là sai lầm đo lường tốn kém nhất trong marketing số.

> ⚠️ **Đọc [[Attributed vs Incremental]] trước khi dùng bất kỳ con số nào từ note này.**

## 1. Các mô hình

| Mô hình | Cách gán công | Thiên lệch |
|---|---|---|
| **Last click** | 100% cho lần chạm cuối | Thổi phồng kênh cuối phễu: brand search, retargeting, email |
| **First click** | 100% cho lần đầu | Thổi phồng kênh nhận biết |
| Linear | Chia đều | Đơn giản, không có cơ sở lý thuyết |
| Time decay | Gần hơn = nhiều hơn | Vẫn thiên về cuối phễu |
| Position-based | 40/20/40 | Tuỳ ý |
| **Data-driven (MTA)** | Mô hình học từ dữ liệu | Tốt hơn, nhưng vẫn chỉ dùng dữ liệu **có thể quan sát được** |

> [!warning] Mọi mô hình attribution đều chia một chiếc bánh có sẵn
> Chúng phân bổ 100% công cho các lần chạm **đã được ghi nhận**. Không mô hình nào trả lời được câu hỏi: *"nếu không có lần chạm này, đơn hàng đó có xảy ra không?"* Đó là câu hỏi nhân quả, và chỉ [[Incrementality Testing]] trả lời được.

## 2. Vì sao attribution ngày càng kém

| Nguyên nhân | Tác động |
|---|---|
| **Chặn cookie bên thứ ba** | Mất liên kết giữa các miền |
| **Apple ATT** (App Tracking Transparency) | Mất phần lớn tín hiệu trên iOS |
| **Yêu cầu consent (GDPR/ePrivacy)** | Chỉ đo được người đồng ý — mẫu thiên lệch. [[Marketing Privacy and Consent]] |
| **Đa thiết bị** | Cùng một người thành nhiều "người" |
| **Kênh không click được** | TV, OOH, podcast, truyền miệng: **vô hình hoàn toàn** |
| **Nền tảng tự báo cáo** | Mỗi nền tảng nhận công cho cùng một đơn hàng |

Điểm cuối là lý do tổng chuyển đổi báo cáo từ các nền tảng thường **vượt** tổng đơn hàng thật.

## 3. Dùng attribution một cách trung thực

Nó vẫn có ích cho ba việc:

| Việc | Vì sao ổn |
|---|---|
| **Tối ưu chiến thuật trong một kênh** | So sánh tương đối giữa các quảng cáo cùng điều kiện |
| **Phát hiện thay đổi đột ngột** | Cảnh báo sớm |
| **Hiểu chuỗi hành trình** | Mô tả, không phải nhân quả |

**Không** dùng nó cho: phân bổ ngân sách giữa các kênh, chứng minh giá trị của brand marketing, hoặc báo cáo ROI lên ban lãnh đạo mà không có kiểm chứng.

## 4. Cạm bẫy

- **Coi last-click là sự thật.** Vẫn là mặc định ở rất nhiều tổ chức.
- **Cộng chuyển đổi từ nhiều nền tảng.**
- **Chuyển sang data-driven rồi coi vấn đề đã giải quyết.** Nó vẫn không phải nhân quả.
- **Cửa sổ nhìn ngắn hơn chu kỳ mua.** Nghiêm trọng ở B2B — [[B2B vs B2C Marketing]].
- **Kết luận kênh không click được là vô giá trị** chỉ vì nó không xuất hiện trong báo cáo.
- **Bỏ qua thiên lệch consent.** Nếu chỉ 60% đồng ý, bạn đang nhìn 60% méo.

## 5. Checklist áp dụng

- [ ] Tôi có đang dùng last-click để ra quyết định ngân sách không?
- [ ] Tôi có cộng chuyển đổi từ nhiều nền tảng không?
- [ ] Cửa sổ nhìn có dài hơn chu kỳ mua trung bình không?
- [ ] Tôi biết tỉ lệ consent của mình không?
- [ ] Tôi có **ít nhất một** phép đo nhân quả để đối chiếu không?
- [ ] Báo cáo lên lãnh đạo có nêu rõ giới hạn của attribution không?

## Tham khảo

- Google Analytics Help — Attribution models — https://support.google.com/analytics/answer/10596866
- Gordon, Zettelmeyer, Bhargava & Chapsky — "A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook", *Marketing Science* 2019 — https://pubsonline.informs.org/doi/10.1287/mksc.2018.1135
- Apple — App Tracking Transparency — https://developer.apple.com/documentation/apptrackingtransparency
- Google — Consent Mode documentation — https://support.google.com/google-ads/answer/10000067

## Liên kết

[[Attributed vs Incremental]] · [[Incrementality Testing]] · [[Marketing Mix Modeling]] · [[Marketing Analytics Stack]] · [[Marketing]]
