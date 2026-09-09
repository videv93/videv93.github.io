---
tags: [marketing, đo-lường]
status: growing
---
# Marketing Mix Modeling

> MMM nhìn từ trên xuống: hồi quy doanh thu theo chi tiêu các kênh và các yếu tố ngoài marketing. Nó **không cần cookie, không cần consent, không cần ID người dùng** — đó là lý do nó quay lại sau hai thập kỷ bị coi là lỗi thời.

## 1. Nó làm gì

```
Doanh thu(t) = nền tảng
             + Σ hiệu ứng kênh( chi tiêu(t), có adstock, có bão hoà )
             + mùa vụ + giá + phân phối + đối thủ + kinh tế vĩ mô
             + nhiễu
```

Hai thành phần làm MMM khác hồi quy thường:

| Khái niệm | Nghĩa | Vì sao quan trọng |
|---|---|---|
| **Adstock / carryover** | Quảng cáo hôm nay còn tác dụng nhiều tuần sau | Bỏ qua → đánh giá thấp kênh brand |
| **Saturation / diminishing returns** | Đồng thứ 100 kém hiệu quả hơn đồng thứ 1 | Cho phép trả lời "nên chi thêm bao nhiêu" |

Đường cong bão hoà là đầu ra giá trị nhất: nó cho biết **điểm tối ưu chi tiêu**, thứ mà attribution không bao giờ nói được.

## 2. So sánh ba phương pháp

| | Attribution (MTA) | Incrementality | MMM |
|---|---|---|---|
| Câu hỏi | Chạm nào xảy ra trước | Cái này có gây ra kết quả không | Mỗi kênh đóng góp bao nhiêu |
| Nhân quả | ❌ Không | ✅ Có | ⚠️ Tương quan, có kiểm soát |
| Cần dữ liệu cá nhân | ✅ Có | Tuỳ thiết kế | ❌ **Không** |
| Kênh offline (TV, OOH) | ❌ Không đo được | ✅ Được | ✅ Được |
| Độ chi tiết | Cao | Thấp (một câu hỏi) | Trung bình (theo kênh) |
| Nhịp | Liên tục | Theo đợt | Tháng/quý |

**Cách dùng đúng là cả ba, tam giác hoá:** MMM cho bức tranh danh mục, incrementality làm mốc chuẩn nhân quả, attribution cho tín hiệu chiến thuật hằng ngày. Xem [[Attributed vs Incremental]].

> [!note] Hiệu chuẩn MMM bằng thí nghiệm
> Thực hành tốt nhất hiện nay: dùng kết quả [[Incrementality Testing]] làm **prior** hoặc ràng buộc cho MMM. Nó gắn mô hình tương quan vào sự thật nhân quả đo được — giải quyết điểm yếu lớn nhất của MMM.

## 3. Điều kiện để MMM chạy được

- **≥2–3 năm dữ liệu** theo tuần (52 điểm/năm là ít cho nhiều biến)
- **Có biến động trong chi tiêu.** Nếu chi đều nhau mọi tuần, mô hình không học được gì. Chủ động tạo biến động là đầu tư đáng giá
- **Dữ liệu ngoài marketing**: giá, phân phối, mùa vụ, hoạt động đối thủ, vĩ mô
- **Chi tiêu theo kênh sạch và nhất quán** qua thời gian

## 4. Cạm bẫy

- **Tương quan không phải nhân quả.** MMM có thể gán công cho kênh chỉ đơn giản là chi nhiều vào mùa cao điểm. Hiệu chuẩn bằng thí nghiệm là cách chữa.
- **Đa cộng tuyến.** Các kênh tăng giảm cùng nhau → mô hình không tách được đóng góp; ước lượng không ổn định.
- **Biến bị bỏ sót.** Không đưa giá và phân phối vào thì tác động của chúng bị gán nhầm cho quảng cáo.
- **Quá khớp (overfitting).** Mô hình khớp lịch sử hoàn hảo, dự báo tệ. Luôn kiểm out-of-sample.
- **Coi kết quả là chính xác.** Báo cáo kèm khoảng tin cậy, luôn.
- **MMM do nhà cung cấp chạy mà không công khai phương pháp.** Hộp đen không kiểm chứng được — [[Vendor Playbook vs Marketing Evidence]].
- **Ngoại suy ngoài khoảng dữ liệu.** Mô hình không biết gì về mức chi tiêu bạn chưa từng thử.

## 5. Checklist áp dụng

- [ ] Tôi có ≥2 năm dữ liệu theo tuần không?
- [ ] Có **biến động thật** trong chi tiêu theo kênh không?
- [ ] Tôi đã đưa giá, phân phối, mùa vụ, đối thủ vào mô hình chưa?
- [ ] Mô hình có adstock và bão hoà không?
- [ ] Tôi có hiệu chuẩn bằng kết quả thí nghiệm không?
- [ ] Có kiểm out-of-sample không?
- [ ] Kết quả có kèm khoảng tin cậy không?
- [ ] Phương pháp có công khai và tái lập được không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Meridian (Google) | MMM Bayesian, mã nguồn mở | https://developers.google.com/meridian |
| Robyn (Meta) | MMM mã nguồn mở, R | https://facebookexperimental.github.io/Robyn/ |
| PyMC-Marketing | MMM Bayesian bằng Python | https://www.pymc-marketing.io/ |

## Tham khảo

- Google — Meridian methodology documentation — https://developers.google.com/meridian/docs
- Jin, Wang, Sun, Chan & Koehler — "Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects" (Google Research) — https://research.google/pubs/pub46001/
- Chan & Perry — "Challenges and Opportunities in Media Mix Modeling" (Google Research) — https://research.google/pubs/pub45998/
- Meta — Robyn documentation — https://facebookexperimental.github.io/Robyn/

## Liên kết

[[Incrementality Testing]] · [[Attributed vs Incremental]] · [[Marketing Attribution Models]] · [[Marketing Analytics Stack]] · [[Marketing]]
