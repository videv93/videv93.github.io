---
tags: [marketing, kênh]
status: growing
---
# Paid Social and Programmatic

> ⚠️ **Đọc [[Attributed vs Incremental]] trước khi áp dụng note này.**

> Khác paid search ở chỗ căn bản: bạn **ngắt** người đang làm việc khác, không đáp lại nhu cầu họ vừa nêu. Vì thế creative gánh gần như toàn bộ gánh nặng — và vì thế nó tạo được nhu cầu mới, điều paid search không làm được.

## 1. Cơ chế đấu giá

Đấu giá quảng cáo hiện đại tối đa hoá **giá trị tổng**, không chỉ giá thầu:

```
Giá trị ≈ giá thầu × tỉ lệ hành động dự kiến + giá trị trải nghiệm người dùng
```

Hệ quả: **creative tốt làm giảm CPM thực tế**. Nền tảng thưởng cho quảng cáo người ta không ghét.

> [!warning] Nhắm hẹp thường đắt hơn và không tốt hơn
> Thuật toán hiện đại tìm người mua tốt hơn bộ lọc thủ công của bạn. Nhắm hẹp thu nhỏ nhóm đấu giá → CPM tăng, và cắt mất người mua bạn không nghĩ tới. Hướng đi hiện tại ở hầu hết nền tảng: **nhắm rộng, để creative làm việc lọc**. Điều này khớp với luận điểm reach ở [[Category Entry Points]].

## 2. Cấu trúc dùng được

| Tầng | Mục tiêu | Đối tượng | Đo bằng |
|---|---|---|---|
| **Prospecting** | Người chưa biết | Rộng / lookalike | Reach, CAC mới, incrementality |
| **Retargeting** | Đã tương tác | Người truy cập, giỏ hàng | ⚠️ Incrementality thường thấp |
| **Retention** | Khách hiện tại | Danh sách khách | LTV, mở rộng |

> [!warning] Retargeting là nơi ảo tưởng đo lường lớn nhất
> Người đã vào giỏ hàng vốn có xác suất mua cao. Retargeting nhận công cho những đơn hàng phần lớn sẽ xảy ra dù sao. Thí nghiệm quy mô lớn nhiều lần cho thấy hiệu quả thật thấp hơn nhiều so với con số nền tảng báo. **Luôn kiểm bằng holdout** — [[Incrementality Testing]].

## 3. Programmatic — thứ cần biết

| Khái niệm | Nghĩa |
|---|---|
| DSP / SSP | Bên mua / bên bán trong đấu giá tự động |
| RTB | Đấu giá thời gian thực từng lượt hiển thị |
| PMP | Thoả thuận riêng với nhà xuất bản chọn lọc |
| **Ad fraud** | Lưu lượng bot, trang rác — thiệt hại thật, đáng kể |
| **Brand safety** | Quảng cáo cạnh nội dung độc hại |
| **Made-for-advertising sites** | Trang tồn tại chỉ để hứng quảng cáo — hố đen ngân sách |
| **Viewability** | Quảng cáo có thực sự hiện trên màn hình không |

Chuỗi cung ứng programmatic có phần trăm hao hụt lớn giữa tiền chi và tiền tới nhà xuất bản. Yêu cầu báo cáo log-level và dùng danh sách trắng nhà xuất bản là hai biện pháp có tác dụng thật.

## 4. Cạm bẫy

- **Nhắm quá hẹp.** Đắt hơn, ít hiệu quả hơn.
- **Ngân sách chia quá mỏng** cho nhiều nhóm quảng cáo → không nhóm nào thoát learning phase.
- **Chỉnh sửa liên tục.** Mỗi lần sửa reset quá trình học của thuật toán.
- **Đọc kết quả trong learning phase.**
- **Không kiểm tra nơi quảng cáo thực sự hiển thị.** Yêu cầu báo cáo vị trí đặt.
- **Coi retargeting ROAS là tăng trưởng thật.**
- **Bỏ qua mệt mỏi quảng cáo.** Theo dõi tần suất; làm mới creative theo lịch — [[Creative Testing and Iteration]].

## 5. Checklist áp dụng

- [ ] Tôi có đang nhắm hẹp không cần thiết không?
- [ ] Mỗi nhóm có đủ ngân sách để thoát learning phase không?
- [ ] Tôi có holdout để đo incrementality không, nhất là cho retargeting?
- [ ] Tôi có xem báo cáo vị trí đặt quảng cáo không?
- [ ] Có danh sách chặn (block list) cho brand safety không?
- [ ] Tôi có theo dõi tần suất và lịch làm mới creative không?
- [ ] Tôi có so ROAS nền tảng với phép đo độc lập không?

## Tham khảo

- Meta Business Help — Ad auction & delivery — https://www.facebook.com/business/help/430291176997542
- Gordon, Zettelmeyer, Bhargava & Chapsky — "A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook", *Marketing Science* 2019 — https://pubsonline.informs.org/doi/10.1287/mksc.2018.1135
- ISBA / PwC — Programmatic Supply Chain Transparency Study — https://www.isba.org.uk/knowledge/digital-media/programmatic-supply-chain-transparency-study
- Media Rating Council — Viewability & invalid traffic standards — https://mediaratingcouncil.org/

## Liên kết

[[Creative Testing and Iteration]] · [[Incrementality Testing]] · [[Attributed vs Incremental]] · [[Marketing Privacy and Consent]] · [[Marketing]]
