---
tags: [gis, hệ-toạ-độ]
status: evergreen
---
# EPSG Codes

> Một số nguyên thay cho cả một trang định nghĩa toán học. `4326` gọn hơn *"WGS 84 geographic 2D, ellipsoid WGS84, prime meridian Greenwich, đơn vị bậc"* — và đó chính là lý do nó được dùng ở mọi nơi, kể cả những nơi nó không nên được dùng một mình.

## 1. Registry và cách đọc

**EPSG** = European Petroleum Survey Group, nay do IOGP duy trì. Registry gán mã số cho CRS, datum, ellipsoid, phép biến đổi.

| Dải mã | Nội dung |
|---|---|
| `4xxx` | Geographic CRS (kinh/vĩ độ) |
| `326xx` | UTM Bắc bán cầu, `xx` = số múi |
| `327xx` | UTM Nam bán cầu |
| `3857` | Web Mercator (trường hợp riêng nổi tiếng) |

### Bảng tra nhanh

| EPSG | Tên | Đơn vị | Dùng cho |
|---|---|---|---|
| 4326 | WGS 84 | độ | Lưu trữ, GPS, trao đổi, [[GeoJSON]] |
| 3857 | WGS 84 / Pseudo-Mercator | mét | **Chỉ** tile bản đồ web |
| 32648 | WGS 84 / UTM zone 48N | mét | Đo đạc miền Bắc & Trung VN |
| 32649 | WGS 84 / UTM zone 49N | mét | Đo đạc miền Nam & Đông VN |
| 4756 | VN-2000 | độ | Hệ quy chiếu quốc gia Việt Nam |
| 6933 | WGS 84 / NSIDC EASE-Grid 2.0 Global | mét | Phân tích **equal-area** toàn cầu |
| 4979 | WGS 84 3D | độ + m | Khi cần chiều cao |

### Ba cách biểu diễn một CRS

| Dạng | Ví dụ (rút gọn) | Đặc điểm |
|---|---|---|
| **Mã EPSG** | `EPSG:4326` | Gọn, nhưng **mất thông tin** về phép chuyển datum |
| **PROJ string** | `+proj=utm +zone=48 +datum=WGS84 +units=m` | Cũ, gọn, thiếu chặt chẽ; PROJ 6+ khuyến nghị bỏ |
| **WKT2** | `PROJCRS["WGS 84 / UTM zone 48N", ...]` | **Chuẩn hiện đại**, đầy đủ, dài |

> [!note] Vì sao WKT2 mới là dạng đúng để lưu
> PROJ string cũ không diễn đạt được đường biến đổi datum, nên hai file cùng ghi `+datum=WGS84` vẫn có thể lệch nhau. Từ PROJ 6, **WKT2 là dạng chuẩn**; PROJ string chỉ nên dùng khi gõ nhanh. Xem [[Datums and Geodesy]].

## 2. Nguyên tắc

1. **Ghi mã EPSG vào tên cột và tài liệu API**, không để người dùng đoán.
2. **`4326` là CRS *lưu trữ*, không phải CRS *phân tích*.** Xem [[Coordinate Reference Systems]].
3. **Chọn UTM theo múi chứa *trọng tâm* vùng nghiên cứu.** Múi = `floor((kinh_độ + 180) / 6) + 1`.
4. **Với thống kê toàn cầu, dùng mã equal-area** (ví dụ 6933 hoặc Equal Earth), không dùng 3857.
5. **Không tự chế CRS** trừ khi thật sự cần. Nếu buộc phải (ví dụ Lambert Azimuthal quanh một tâm riêng), ghi WKT2 đầy đủ vào metadata.

## 3. Cạm bẫy

- ⚠️ **Thứ tự trục.** Registry EPSG định nghĩa 4326 là **(vĩ độ, kinh độ)**. Nhưng GeoJSON, WKT, PostGIS, và hầu hết thư viện dùng **(kinh độ, vĩ độ)**. Xung đột này bùng nổ ở WMS 1.3.0 và một số client OGC. Xem [[OGC Services]].
- **`EPSG:3785` là mã đã bị khai tử** của Web Mercator; dùng `3857`. Còn gặp trong dữ liệu cũ.
- **`900913`** — mã Google tự chế (chữ "GOOGLE" leet), không thuộc EPSG, vẫn tồn tại trong hệ thống cũ.
- **Cho rằng cùng mã EPSG nghĩa là toạ độ so sánh được ở mức cm.** Không đúng nếu khác realization/epoch.
- **Gán 4326 cho dữ liệu không rõ CRS.** Nếu toạ độ có giá trị hàng trăm nghìn thì đó là hệ mét, không phải bậc — gán 4326 sẽ ném nó ra ngoài Trái Đất.
- **Dùng `+init=epsg:xxxx` (cú pháp cũ)** — đã lỗi thời từ PROJ 6, gây hành vi khác nhau giữa các phiên bản.

## 4. Checklist áp dụng

- [ ] Mọi bộ dữ liệu của tôi có mã EPSG **ghi rõ** không?
- [ ] Tôi có kiểm thứ tự trục khi trao đổi qua dịch vụ OGC không?
- [ ] Tôi có dùng mã đã khai tử (3785, 900913) không?
- [ ] Nếu tự định nghĩa CRS: tôi có lưu WKT2 đầy đủ không?
- [ ] Múi UTM tôi chọn có chứa trọng tâm vùng nghiên cứu không?
- [ ] Tôi có còn dùng `+init=epsg:` ở đâu trong code cũ không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| epsg.io | Tra mã, lấy WKT/PROJ/bounds | [epsg.io](https://epsg.io/) |
| `projinfo EPSG:4326` | Xem định nghĩa đầy đủ tại chỗ | [proj.org](https://proj.org/en/stable/apps/projinfo.html) |
| `spatial_ref_sys` | Bảng CRS trong PostGIS | [[PostGIS Core Types]] |

## Tham khảo

- [EPSG Geodetic Parameter Dataset](https://epsg.org/) — registry chính thức của IOGP
- [epsg.io](https://epsg.io/) — giao diện tra cứu tiện nhất
- [PROJ — Why not to use PROJ strings](https://proj.org/en/stable/faq.html) — lý do chuyển sang WKT2
- [OGC WKT-CRS (ISO 19162) standard](https://www.ogc.org/standard/wkt-crs/) — chuẩn WKT2

## Liên kết

[[Coordinate Reference Systems]] · [[Datums and Geodesy]] · [[Map Projections]] · [[Reprojection Pitfalls]] · [[OGC Services]] · [[GIS]]
