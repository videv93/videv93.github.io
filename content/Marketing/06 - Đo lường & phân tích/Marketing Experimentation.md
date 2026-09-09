---
tags: [marketing, đo-lường]
status: evergreen
---
# Marketing Experimentation

> Phần lớn "A/B test" trong marketing không kết luận được gì — không phải vì công cụ kém, mà vì test được thiết kế sau khi đã bắt đầu chạy. Ba việc quyết định tất cả: **tính power trước, chốt ngưỡng trước, không nhìn giữa chừng**.

## 1. Trình tự bắt buộc

```
1. Giả thuyết cụ thể   "Đổi X sẽ tăng Y thêm ít nhất Z%, vì <lý do>"
2. Chọn chỉ số chính   MỘT chỉ số, quyết định trước
3. Tính power          Cần bao nhiêu mẫu / bao lâu để phát hiện Z%
4. Chốt ngày dừng      Trước khi chạy
5. Chạy — KHÔNG NHÌN   Cho tới ngày dừng
6. Phân tích           Theo kế hoạch đã định
7. Ghi lại              Kể cả khi thua — đặc biệt khi thua
```

Bỏ bước 3 và 4 là lý do phần lớn test vô nghĩa.

## 2. Power — con số phải biết trước

**Minimum Detectable Effect (MDE)**: mức chênh nhỏ nhất test của bạn phát hiện được. Quan hệ then chốt:

- Muốn phát hiện hiệu ứng **nhỏ hơn 2 lần** → cần mẫu **lớn hơn ~4 lần**
- Chỉ số càng nhiễu → càng cần nhiều mẫu

> [!warning] Nếu MDE của bạn là 30% thì test vô nghĩa
> Rất ít thay đổi marketing tạo ra lift 30%. Nếu lưu lượng chỉ đủ phát hiện 30%, test sẽ luôn cho "không có ý nghĩa thống kê" dù thay đổi có tác dụng thật. Kết luận đúng lúc đó: **đừng chạy test này** — hãy test thay đổi lớn hơn ở bậc concept, hoặc gộp lưu lượng. Xem [[Creative Testing and Iteration]].

## 3. Các bẫy thống kê

| Bẫy | Cơ chế | Cách tránh |
|---|---|---|
| **Peeking** | Nhìn liên tục rồi dừng khi p<0,05 → tỉ lệ dương tính giả tăng vọt | Ngày dừng cố định, hoặc dùng phương pháp sequential đúng chuẩn |
| **So sánh nhiều lần** | Test 20 biến thể → ~1 cái "thắng" do ngẫu nhiên | Hiệu chỉnh (Bonferroni, FDR) |
| **Novelty effect** | Cái mới thu hút chú ý tạm thời | Chạy đủ dài |
| **Simpson's paradox** | Xu hướng tổng ngược với xu hướng từng nhóm | Phân tích theo nhóm quan trọng |
| **Sample ratio mismatch** | Tỉ lệ chia không như thiết kế → có lỗi kỹ thuật | Luôn kiểm tỉ lệ chia trước khi tin kết quả |
| **Chọn chỉ số sau khi xem** | Tìm chỉ số nào đó có ý nghĩa | Chốt một chỉ số chính trước |

## 4. Cái gì không test được bằng A/B

| Không hợp | Vì sao | Dùng gì thay |
|---|---|---|
| Brand marketing | Hiệu ứng chậm, khuếch tán | [[Marketing Mix Modeling]], brand tracking |
| Kênh không nhắm cá nhân được | Không chia được nhóm | **Geo test** — [[Incrementality Testing]] |
| Thay đổi giá | Rủi ro pháp lý & công bằng | Geo test, conjoint |
| Chiến lược dài hạn | Cửa sổ quá dài | Phán đoán + MMM |

## 5. Cạm bẫy

- **Không tính power.** Lỗi số một.
- **Peeking.** Lỗi số hai.
- **Test thay đổi quá nhỏ.** Màu nút — [[Creative Testing and Iteration]].
- **Không kiểm sample ratio mismatch.**
- **Ngừng test sớm vì "đã rõ rồi".**
- **Chỉ ghi lại cái thắng.** Kho học tập mất một nửa giá trị.
- **Không lặp lại test quan trọng.** Kết quả bất ngờ nên được tái lập trước khi đổi chiến lược.

## 6. Checklist áp dụng

- [ ] Tôi đã viết giả thuyết cụ thể có **con số** chưa?
- [ ] Chỉ số chính có đúng **một** không?
- [ ] Tôi đã tính MDE chưa? Nó có hợp lý không?
- [ ] Ngày dừng đã chốt trước chưa?
- [ ] Tôi có nhìn kết quả giữa chừng không?
- [ ] Tôi đã kiểm tỉ lệ chia mẫu chưa?
- [ ] Test có chạy qua ít nhất một tuần trọn không?
- [ ] Tôi có ghi lại kết quả **thua** không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Evan Miller's calculators | Tính power, sample size | https://www.evanmiller.org/ab-testing/ |
| GrowthBook | A/B test mã nguồn mở | https://www.growthbook.io/ |
| CausalImpact | Can thiệp trên chuỗi thời gian | https://google.github.io/CausalImpact/ |

## Tham khảo

- Ron Kohavi, Diane Tang & Ya Xu — *Trustworthy Online Controlled Experiments*, Cambridge University Press — https://experimentguide.com/
- Kohavi & Longbotham — "Online Controlled Experiments and A/B Testing" — https://exp-platform.com/
- Georgi Georgiev — *Statistical Methods in Online A/B Testing* — https://www.analytics-toolkit.com/
- Evan Miller — "How Not To Run an A/B Test" (peeking) — https://www.evanmiller.org/how-not-to-run-an-ab-test.html

## Liên kết

[[Incrementality Testing]] · [[Creative Testing and Iteration]] · [[Marketing Research Methods]] · [[Marketing KPIs and Metrics Tree]] · [[Marketing]]
