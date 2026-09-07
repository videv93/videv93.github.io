---
tags: [uiux, component]
status: growing
---
# Card

> Dựa trên ẩn dụ **tấm thẻ vật lý**: gom nội dung liên quan vào một vùng chung và khuyến khích người dùng bấm vào.
> Card hợp với giao diện để người dùng **duyệt (browse)**, không hợp với giao diện để **tìm (search)** hay so sánh chính xác — trường hợp đó dùng [[Table & Data Display]].

## 1. Các loại card
- **Text card** — chỉ chữ, thường thấy trên dashboard. Chỉ cần container.
- **Rich card** — chứa nhiều thành phần phức tạp: ảnh, tag, nhóm nút, biểu đồ.
- **User card** — thông tin cơ bản về một người: avatar, tên, vai trò, hành động.
- **Media card** — ảnh/video chiếm chủ đạo.
- **Stat card** — một con số lớn + nhãn + xu hướng.

**Theo hình thức:** Flat (nền khác màu) · Outlined (viền) · Elevated (đổ bóng).
Chọn theo mức nhiễu: nền nhiều màu → dùng outlined; nền trắng → dùng elevated hoặc flat xám nhạt.

## 2. Cấu trúc (anatomy)
```
┌─────────────────────────┐
│  [Media / thumbnail]    │  ← tỉ lệ khung nhất quán
│  Overline / Tag         │  ← phân loại (tuỳ chọn)
│  Tiêu đề                │  ← ngắn, quét được
│  Mô tả 1–2 dòng         │  ← cắt bằng ellipsis nếu dài
│  Meta: tác giả · ngày   │
│  [Hành động chính] [⋯]  │
└─────────────────────────┘
```

## 3. 12 best practice
1. **Strive for simplicity** — đơn giản hoá, card không phải chỗ nhét mọi thứ.
2. **Mỗi card một chủ đề riêng biệt** — không trộn nội dung khác loại.
3. **Làm cả card bấm được**, không chỉ tiêu đề (vùng chạm lớn, Fitts's Law).
4. **Nhãn tương phản** — tag/badge phải đọc được trên nền của nó.
5. **Dùng yếu tố thị giác tạo sự gắn kết** trong card (ảnh, icon cùng phong cách).
6. **Trình bày thông tin theo lớp** (progressive disclosure) — tóm tắt ở card, chi tiết ở trang.
7. **Đủ khoảng trắng** — padding 16–24px, đây là thứ hay bị làm quá chặt.
8. **Ảnh chất lượng** để tạo niềm tin.
9. **Nhãn ngắn gọn** — tiêu đề tối đa 2 dòng.
10. **Giữ phân cấp màu** — card không nên "cạnh tranh" với CTA chính của trang.
11. **Đừng lạm dụng shadow** — nhiều card cùng bóng đậm làm màn hình mờ đục.
12. **Icon menu (⋯) ở vị trí quen thuộc** — góc trên phải.

Thêm:
13. **Duy trì phân cấp thông tin** để quét nhanh: tiêu đề > meta > mô tả.
14. **Card cùng grid phải cùng chiều cao** (dùng auto layout / `align-items: stretch`), tránh grid lởm chởm.

## 4. Vấn đề "nested interactive"
Nếu cả card bấm được **và** bên trong có nút riêng → xung đột click và lỗi accessibility.
Cách xử lý đúng: dùng **stretched link** — một `<a>` bọc tiêu đề với pseudo-element phủ toàn card (`::after { position:absolute; inset:0 }`), còn các nút bên trong đặt `position: relative; z-index: 1`.

## 5. Trạng thái
`default · hover (nâng nhẹ/đổi viền) · focus (ring rõ) · selected · loading (skeleton) · disabled`
Skeleton card khi tải phải có **cùng kích thước** với card thật để không gây layout shift → [[Progress & Loading]].

## 6. Khi nào **không** dùng card
- Cần so sánh nhiều thuộc tính giữa các mục → dùng bảng.
- Danh sách rất dài, thuần văn bản → dùng list item, card tốn không gian.
- Chỉ có 1–2 mục → card tạo cảm giác trống trải.

## 7. Checklist
- [ ] Toàn bộ card có bấm được không?
- [ ] Các card trong grid có cùng chiều cao không?
- [ ] Ảnh có cùng tỉ lệ khung không?
- [ ] Padding có đủ 16–24px không?
- [ ] Tiêu đề dài nhất có phá vỡ layout không?
- [ ] Có card nào chứa quá nhiều nút không?
- [ ] Focus bằng bàn phím có thấy rõ không?

## Tham khảo
- NN/g — *Cards: UI Component Definition*: https://www.nngroup.com/articles/cards-component/
- Material Design 3 — *Cards*: https://m3.material.io/components/cards/overview
- Inclusive Components — *Cards* (giải bài toán nested link): https://inclusive-components.design/cards/

## Liên kết
[[Layout & Composition]] · [[Table & Data Display]] · [[Progress & Loading]] · [[UIUX]]
