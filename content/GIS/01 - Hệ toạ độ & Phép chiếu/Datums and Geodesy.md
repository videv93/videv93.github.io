---
tags: [gis, hệ-toạ-độ, trắc-địa]
status: evergreen
---
# Datums and Geodesy

> Phép chiếu quyết định bản đồ **trông** thế nào; datum quyết định toạ độ **thật sự ở đâu**. Sai phép chiếu thì thấy ngay bằng mắt. Sai datum thì mọi thứ trông hoàn hảo và lệch 200 mét.

## 1. Ba bề mặt, đừng nhầm lẫn

| Bề mặt | Là gì | Dùng để |
|---|---|---|
| **Địa hình thật** | Mặt đất gồ ghề | Cái ta muốn mô tả |
| **Geoid** | Mặt đẳng thế trọng trường, xấp xỉ mực nước biển trung bình | Gốc của **độ cao** |
| **Ellipsoid** | Mặt toán học trơn (WGS84, GRS80, Krasovsky) | Gốc của **kinh/vĩ độ** |

> [!warning] Hai loại độ cao, khác nhau tới hàng chục mét
> **Ellipsoidal height** (GPS trả về) đo từ ellipsoid. **Orthometric height** (bản đồ, cao độ công trình) đo từ geoid. Chênh lệch giữa hai bề mặt (geoid undulation) ở Việt Nam vào cỡ hàng chục mét. Lấy độ cao thô từ GPS rồi so với mốc thuỷ chuẩn là sai. Xem [[Digital Elevation Models]].

## 2. Datum là gì

**Datum** = ellipsoid + cách nó được **neo** vào Trái Đất (tâm, hướng trục, tỉ lệ).

| Loại | Đặc điểm | Ví dụ |
|---|---|---|
| **Geocentric** | Tâm ellipsoid ≈ tâm khối lượng Trái Đất; tốt toàn cầu | WGS 84, ITRF, GRS80 |
| **Local / regional** | Khớp tốt cho **một vùng**, lệch nơi khác | VN-2000, NAD27, Tokyo Datum, ED50 |

**Datum của Việt Nam: VN-2000** — hệ quy chiếu quốc gia, dùng ellipsoid WGS-84 nhưng có **định vị và tham số riêng**. Toạ độ VN-2000 và WGS 84 **không** trùng nhau; muốn chuyển phải dùng bộ tham số chuyển đổi chính thức, không phải giả định bằng nhau.

### Datum transformation

Chuyển giữa hai datum không phải phép chiếu — nó là biến đổi 3D:

| Phương pháp | Tham số | Độ chính xác |
|---|---|---|
| **Helmert 3 tham số** | 3 dịch chuyển | ~vài mét |
| **Helmert 7 tham số** (Bursa-Wolf) | 3 dịch + 3 xoay + 1 tỉ lệ | ~dưới mét |
| **Grid shift** (NTv2, NADCON) | Lưới hiệu chỉnh | Tốt nhất — cm |

PROJ chọn phương pháp tự động qua **transformation pipeline**; khi có nhiều lựa chọn, nó chọn cái *chính xác nhất có sẵn* — và nếu grid file thiếu, nó **âm thầm rơi xuống** phương pháp kém chính xác hơn.

## 3. Cạm bẫy

- **Coi WGS 84 và datum địa phương là một.** Đây là nguồn lỗi dịch chuyển hệ thống lớn nhất. Với bản đồ 1:100.000 không thấy; với thửa đất là tranh chấp.
- **Thiếu grid shift file → sai lặng lẽ.** PROJ có thể dùng đường dự phòng kém chính xác mà không báo lỗi. Kiểm bằng `projinfo -s <A> -t <B>` để xem nó thật sự chọn pipeline nào.
- **WGS 84 tự nó cũng thay đổi.** Nó đã có nhiều lần hiện thực hoá (realization) khác nhau, gắn với ITRF; ở mức cm chúng không đồng nhất.
- **Bỏ qua kiến tạo mảng.** Ở vùng dịch chuyển mảng nhanh (Úc, New Zealand, Nhật), toạ độ trôi vài cm/năm. Với dữ liệu độ chính xác cao, **epoch** (thời điểm) là một phần của toạ độ.
- **Trộn độ cao GPS với độ cao bản đồ** — xem callout ở trên.
- **Tin `.prj` của Shapefile.** Nó thường chỉ mô tả ellipsoid và không đủ thông tin để chọn đúng phép chuyển datum. Xem [[Shapefile]].

## 4. Checklist áp dụng

- [ ] Tôi có biết **datum** của dữ liệu, hay chỉ biết phép chiếu?
- [ ] Nếu trộn nguồn dữ liệu: chúng có cùng datum không?
- [ ] Khi chuyển datum, tôi có kiểm `projinfo` xem pipeline nào được dùng chưa?
- [ ] Grid shift file cần thiết có được cài trong môi trường (kể cả container CI) không?
- [ ] Nếu dùng độ cao: đó là ellipsoidal hay orthometric?
- [ ] Yêu cầu độ chính xác của tôi là bao nhiêu mét? (Nếu >10 m, phần lớn mục trên bỏ qua được — nếu <1 m thì không.)

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `projinfo` | Xem pipeline biến đổi thật sự được chọn | [proj.org/apps/projinfo](https://proj.org/en/stable/apps/projinfo.html) |
| PROJ-data | Kho grid shift file | [github.com/OSGeo/PROJ-data](https://github.com/OSGeo/PROJ-data) |
| epsg.io | Tra định nghĩa datum của một mã | [epsg.io](https://epsg.io/) |

## Tham khảo

- [PROJ — Geodetic transformations](https://proj.org/en/stable/usage/transformation.html) — cách biến đổi datum thật sự diễn ra
- [NOAA/NGS — What is a datum?](https://geodesy.noaa.gov/datums/) — giải thích chuẩn từ cơ quan trắc địa
- [EPSG Registry — datum definitions](https://epsg.org/) — tra tham số chính thức
- [ICSM — Datums explained](https://www.icsm.gov.au/education/fundamentals-mapping/datums) — trình bày ngắn gọn về geoid vs ellipsoid

## Liên kết

[[Coordinate Reference Systems]] · [[Map Projections]] · [[EPSG Codes]] · [[Reprojection Pitfalls]] · [[Digital Elevation Models]] · [[GIS]]
