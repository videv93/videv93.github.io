---
tags: [gis, nền-tảng, mô-hình-dữ-liệu]
status: evergreen
---
# Spatial Data Models

> Chuẩn **Simple Features** (OGC/ISO 19125) là lý do một polygon vẽ trong QGIS đọc được bằng PostGIS, GeoPandas và Leaflet mà không cần dịch. Biết chuẩn này là biết cái ngôn ngữ chung của toàn ngành.

## 1. Khái niệm cốt lõi

### Bảy kiểu hình học Simple Features

| Kiểu | Mô tả | Ví dụ thực tế |
|---|---|---|
| `POINT` | Một toạ độ | Trạm quan trắc, cột điện |
| `LINESTRING` | Dãy điểm nối bằng đoạn thẳng | Đoạn đường, sông |
| `POLYGON` | Vòng ngoài + 0..n vòng lỗ | Thửa đất, hồ có đảo |
| `MULTIPOINT` | Tập điểm | Cụm giếng khoan |
| `MULTILINESTRING` | Tập đường rời | Sông có nhánh tách |
| `MULTIPOLYGON` | Tập polygon rời | Indonesia, một tỉnh có đảo |
| `GEOMETRYCOLLECTION` | Trộn lẫn nhiều kiểu | Kết quả `ST_Intersection` bất ngờ |

Thêm chiều: **Z** (cao độ), **M** (measure — thường là lý trình dọc tuyến). `POINT Z`, `LINESTRING ZM`.

### Ba cách tuần tự hoá cùng một hình học

| Dạng | Ví dụ | Dùng ở đâu |
|---|---|---|
| **WKT** — text | `POINT(105.85 21.03)` | Đọc bằng mắt, viết SQL tay |
| **WKB** — binary | `0101000000...` | Lưu trữ, truyền, PostGIS nội bộ |
| **GeoJSON** | `{"type":"Point","coordinates":[105.85,21.03]}` | Web — xem [[GeoJSON]] |

> [!warning] Thứ tự trục là bẫy kinh điển
> WKT/GeoJSON dùng **(x, y) = (kinh độ, vĩ độ)**. Nhưng chuẩn EPSG cho EPSG:4326 định nghĩa thứ tự **(vĩ độ, kinh độ)**. WMS 1.3.0 tuân thủ EPSG; WMS 1.1.1 thì không. Triệu chứng: dữ liệu Việt Nam nhảy sang Somalia. Xem [[EPSG Codes]].

### Simple Features model vs Topological model

| | **Simple Features** (phổ biến) | **Topological** |
|---|---|---|
| Lưu gì | Mỗi feature giữ **toàn bộ** toạ độ của nó | Lưu **cạnh (edge)** dùng chung |
| Ranh giới chung của 2 tỉnh | Lưu **hai lần** | Lưu **một lần** |
| Sửa ranh giới | Phải sửa cả hai, dễ lệch → sliver | Sửa một chỗ, cả hai cùng đổi |
| Hỗ trợ | Mọi nơi | PostGIS Topology, ArcGIS Geodatabase, GRASS |
| Chi phí | Thấp | Cao — nhưng đúng đắn hơn |

Hầu hết công việc hằng ngày dùng Simple Features; topology chỉ cần khi tính toàn vẹn ranh giới là bắt buộc (địa chính, ranh giới hành chính). Xem [[Geometry Validity and Topology]].

## 2. Nguyên tắc

1. **Một cột hình học = một kiểu + một SRID.** Trộn `POLYGON` và `MULTIPOLYGON` trong cùng cột là nguồn lỗi bất tận; chuẩn hoá hết về `MULTI*` khi nhập liệu.
2. **Polygon phải theo quy tắc vòng.** Vòng ngoài và vòng lỗ phải khép kín (điểm đầu = điểm cuối), không tự cắt, lỗ phải nằm trong vòng ngoài. GeoJSON (RFC 7946) còn quy định chiều quay: ngoài ngược chiều kim đồng hồ, lỗ thuận chiều.
3. **`GEOMETRYCOLLECTION` gần như luôn là dấu hiệu có gì đó sai.** Nó thường sinh ra từ `ST_Intersection` khi hai polygon chạm nhau ở cả mặt lẫn cạnh. Lọc lại bằng `ST_CollectionExtract`.
4. **Feature = geometry + attributes + id.** Thiếu id ổn định thì không join lại được sau khi biến đổi.
5. **Coverage là một khái niệm riêng.** Một tập polygon "phủ kín, không chồng" là một *ràng buộc* phải kiểm, không phải thứ tự nhiên có.

## 3. Cạm bẫy

- **Đảo trục lat/lon** — xem callout ở trên. Phép kiểm rẻ: dữ liệu Việt Nam phải có x ≈ 102–110, y ≈ 8–24. Nếu ngược lại, bạn đã đảo trục.
- **Polygon "hợp lệ" theo phần mềm này, "không hợp lệ" theo phần mềm khác.** GEOS nghiêm hơn nhiều tool desktop. Chạy `ST_IsValid` sớm.
- **Lỗ polygon bị mất khi qua định dạng kém.** Một số converter đơn giản hoá multipolygon có lỗ thành vòng ngoài — diện tích tự nhiên phình ra.
- **Chiều Z bị âm thầm cắt bỏ.** Nhiều phép GEOS 2D trả về hình học mất Z; kiểm bằng `ST_NDims` nếu Z quan trọng.
- **Dùng float để so sánh hình học bằng nhau.** `ST_Equals` là so về mặt không gian, không phải so byte; `geom_a = geom_b` trong SQL thì so byte và thường sai với ý định.

## 4. Checklist áp dụng

- [ ] Cột hình học của tôi có bị trộn nhiều kiểu không? (`SELECT DISTINCT ST_GeometryType(geom)`)
- [ ] Mọi feature có SRID nhất quán không? (`SELECT DISTINCT ST_SRID(geom)`)
- [ ] Toạ độ có nằm trong khoảng hợp lý cho vùng nghiên cứu không (kiểm đảo trục)?
- [ ] Có `GEOMETRYCOLLECTION` nào lọt vào kết quả không?
- [ ] Tôi có cần topology thật sự không, hay Simple Features là đủ?
- [ ] Mỗi feature có **id ổn định** để join lại sau biến đổi không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_GeometryType`, `ST_NDims`, `ST_SRID` | Kiểm kê nhanh trong PostGIS | [postgis.net](https://postgis.net/docs/reference.html) |
| `shapely` | Thao tác Simple Features trong Python | [[Shapely]] |
| PostGIS Topology | Mô hình topological thật | [postgis.net/docs/Topology.html](https://postgis.net/docs/Topology.html) |

## Tham khảo

- [OGC Simple Feature Access — Part 1: Common Architecture](https://www.ogc.org/standard/sfa/) — chuẩn gốc
- [ISO 19125-1](https://www.iso.org/standard/40114.html) — bản ISO tương ứng
- [PostGIS — Geometry Types reference](https://postgis.net/docs/using_postgis_dbmanagement.html) — cách một CSDL thật hiện thực hoá chuẩn
- [RFC 7946 — The GeoJSON Format](https://datatracker.ietf.org/doc/html/rfc7946) — quy tắc vòng và thứ tự trục cho web

## Liên kết

[[Vector vs Raster]] · [[Geometry Validity and Topology]] · [[GeoJSON]] · [[Spatial Relationships and DE-9IM]] · [[EPSG Codes]] · [[GIS]]
