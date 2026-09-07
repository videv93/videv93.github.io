---
tags: [seo, local]
status: evergreen
---
# Local SEO

> Local SEO chạy trên **một thuật toán khác** với SEO thường: tín hiệu chính là proximity (khoảng cách), relevance, prominence — và tài sản quan trọng nhất **không nằm trên website của bạn** mà nằm ở [[Google Business Profile]].

## 1. Ba tín hiệu Google công bố

| Tín hiệu | Nghĩa | Kiểm soát được? |
|---|---|---|
| **Relevance** | Hồ sơ khớp với truy vấn tới đâu | ✅ Danh mục, mô tả, dịch vụ |
| **Distance** | Khoảng cách từ người tìm tới bạn | ❌ Vị trí vật lý |
| **Prominence** | Bạn nổi tiếng tới đâu (online + offline) | ⚠️ Gián tiếp — review, citation, link, brand |

> [!warning] Proximity thường lấn át mọi thứ khác
> Với truy vấn "quán cà phê gần đây", khoảng cách gần như quyết định tất cả. Nghĩa là: **không có "thứ hạng #1" trong local** — kết quả khác nhau theo từng vị trí người tìm. Mọi công cụ theo dõi thứ hạng local đều phải khai báo toạ độ. Xem [[Rank Tracking]].

## 2. Hai bề mặt kết quả khác nhau

| Bề mặt | Nguồn dữ liệu | Tối ưu bằng |
|---|---|---|
| **Local pack / Map** | [[Google Business Profile]] | GBP, review, citation, NAP |
| **Kết quả organic thường** | Website | SEO thường + trang địa điểm |

Chúng có thuật toán và tín hiệu khác nhau. Site có thể đứng #1 organic mà không xuất hiện trong local pack, và ngược lại. **Phải làm cả hai.**

## 3. NAP và citation

**NAP** = Name, Address, Phone. Nguyên tắc: **nhất quán tuyệt đối** ở mọi nơi.

```
✅ Công ty TNHH ABC, 123 Nguyễn Huệ, Quận 1, TP.HCM, (028) 1234 5678
❌ Cty ABC, 123 Nguyen Hue St., District 1, HCMC, 02812345678
```

**Citation** = nơi NAP của bạn xuất hiện, kể cả không có link. Nguồn quan trọng:
- Google Business Profile (quan trọng nhất)
- Apple Maps, Bing Places
- Thư mục ngành uy tín
- Trang hiệp hội, phòng thương mại
- Báo địa phương
- Với Việt Nam: các nền tảng địa phương (Foody, Cốc Cốc Map…) tuỳ ngành

**Kiểm tra NAP không nhất quán** là việc audit local đầu tiên. Số điện thoại cũ trên 20 thư mục là vấn đề thật.

## 4. Website — trang địa điểm

Với doanh nghiệp nhiều chi nhánh:

1. **Một trang riêng cho mỗi địa điểm**, URL rõ: `/chi-nhanh/ha-noi/`
2. **Nội dung riêng cho mỗi trang** — không copy-paste đổi tên thành phố. Đây là lỗi phổ biến nhất và tạo ra thin content hàng loạt.
3. **NAP hiển thị dạng text** (không phải ảnh), khớp GBP chính xác.
4. **`LocalBusiness` schema** trên mỗi trang địa điểm — [[Structured Data and Rich Results]].
5. **Nhúng bản đồ**, giờ mở cửa, chỉ đường, ảnh thật của địa điểm.
6. **Link từ trang chủ tới trang danh sách địa điểm** — [[Internal Linking]].
7. **Nội dung địa phương thật**: nhân viên tại đó, sự kiện, tin địa phương.

## 5. Review — tín hiệu prominence mạnh nhất kiểm soát được

- **Số lượng, tần suất, và điểm** đều đếm.
- **Trả lời mọi review**, cả tốt lẫn xấu. Google khuyến khích rõ ràng.
- **Từ khoá trong review** (do khách tự viết) có tương quan với thứ hạng local.
- **Không bao giờ mua review.** Vi phạm chính sách, bị xoá hàng loạt, có thể mất hồ sơ.
- **Không gate review** (chỉ mời người hài lòng đánh giá) — vi phạm chính sách Google.
- Xây quy trình xin review tự nhiên sau khi phục vụ.

## 6. Cạm bẫy

- **Trang địa điểm copy-paste.** Thin content, không xếp hạng.
- **NAP không nhất quán.** Vấn đề local phổ biến nhất.
- **Địa chỉ ảo / hộp thư.** Vi phạm chính sách GBP, bị đình chỉ hồ sơ.
- **Nhồi từ khoá vào tên doanh nghiệp trên GBP.** Vi phạm rõ, dễ bị report bởi đối thủ.
- **Bỏ qua Apple Maps và Bing.** Thị phần nhỏ hơn nhưng chi phí gần bằng 0.
- **Chỉ đo thứ hạng ở một vị trí.** Local phụ thuộc proximity — cần đo dạng lưới (grid).
- **Không theo dõi hành động trên GBP.** Cuộc gọi, chỉ đường, click website là chuyển đổi thật.
- **Bỏ hồ sơ trùng lặp.** Nhiều GBP cho một địa điểm chia nhỏ review và tín hiệu — phải gộp.

## 7. Checklist áp dụng

- [ ] GBP đã xác minh và điền đầy đủ chưa? — [[Google Business Profile]]
- [ ] NAP có nhất quán tuyệt đối trên mọi citation không?
- [ ] Có hồ sơ GBP trùng lặp nào không?
- [ ] Mỗi địa điểm có trang riêng với nội dung riêng không?
- [ ] `LocalBusiness` schema có trên mọi trang địa điểm không?
- [ ] Có quy trình xin review (không gate) không?
- [ ] Mọi review có được trả lời không?
- [ ] Đã đo thứ hạng dạng lưới, không chỉ một điểm?
- [ ] Có theo dõi cuộc gọi/chỉ đường từ GBP không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Google Business Profile | Tài sản local số một | [GBP](https://www.google.com/business/) |
| BrightLocal / Local Falcon | Đo thứ hạng dạng lưới theo toạ độ | [BrightLocal](https://www.brightlocal.com/) |
| Google Maps (thủ công, ẩn danh) | Kiểm nhanh, miễn phí | — |
| Semrush Listing Management | Đồng bộ NAP nhiều thư mục | [Semrush](https://www.semrush.com/) |

## Tham khảo
- [Google — Improve your local ranking on Google](https://support.google.com/business/answer/7091)
- [Google — Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177)
- [Google — Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Moz — Local SEO Learning Center](https://moz.com/learn/seo/local-seo)

## Liên kết
[[Google Business Profile]] · [[Structured Data and Rich Results]] · [[SERP Anatomy]] · [[Brand Signals and Entity SEO]] · [[Rank Tracking]] · [[SEO]]
