---
tags: [gis, định-dạng, web]
status: evergreen
---
# GeoJSON

> Định dạng chuẩn của web GIS: JSON thuần, mọi ngôn ngữ đọc được, con người đọc được. Đổi lại, nó **chậm, nặng, và cố tình bỏ đi** một số thứ mà GIS truyền thống coi là bắt buộc — đáng biết trước khi nó làm bạn ngạc nhiên.

## 1. Cấu trúc

```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": { "type": "Point", "coordinates": [105.85, 21.03] },
    "properties": { "name": "Hà Nội", "pop": 8400000 },
    "id": "hn-01"
  }]
}
```

Ba tầng: `FeatureCollection` → `Feature` → `geometry` + `properties`.

Kiểu hình học: `Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, `MultiPolygon`, `GeometryCollection` — khớp Simple Features, xem [[Spatial Data Models]].

## 2. Bốn quy tắc của RFC 7946 hay bị vi phạm

RFC 7946 (2016) thay thế đặc tả 2008 và **siết chặt** một số điểm:

| Quy tắc | Nội dung | Vi phạm gây ra |
|---|---|---|
| **CRS cố định** | **Luôn là WGS 84 kinh/vĩ độ (EPSG:4326)**. Thành viên `crs` bị **bỏ khỏi chuẩn** | File GeoJSON ở UTM là hợp lệ về cú pháp nhưng sai chuẩn; client web đặt nhầm chỗ |
| **Thứ tự trục** | `[kinh_độ, vĩ_độ]` — **x trước y** | Dữ liệu nhảy sang bán cầu khác |
| **Chiều quay vòng** | Vòng ngoài **ngược chiều kim đồng hồ**, lỗ thuận chiều | Một số renderer vẽ lỗ thành đặc |
| **Cắt tại kinh tuyến 180°** | Hình học vượt antimeridian **phải** được cắt | Polygon quấn vòng quanh Trái Đất |

> [!warning] Điểm gây bất ngờ nhiều nhất
> **GeoJSON không mang CRS.** Nếu bạn `ogr2ogr` một shapefile UTM sang GeoJSON mà không reproject, GDAL sẽ reproject giúp (đúng chuẩn) — nhưng công cụ tự viết thì thường ghi thẳng toạ độ mét vào, tạo ra file "hợp lệ" nằm ngoài Trái Đất. Xem [[Reprojection Pitfalls]].

## 3. Khi nào dùng và khi nào không

| Dùng GeoJSON khi | Đừng dùng khi |
|---|---|
| Truyền dữ liệu tới trình duyệt | Bộ dữ liệu > vài chục MB |
| API trả về vài trăm feature | Lưu trữ lâu dài |
| Cấu hình, dữ liệu mẫu, test fixture | Cần nhiều lớp trong một file |
| Cần đọc bằng mắt để debug | Cần index không gian |
| Trao đổi giữa hệ thống khác nhau | Dữ liệu có kiểu phong phú (datetime, decimal chính xác) |

**Thay thế theo tình huống:**
- Streaming từng dòng → **GeoJSONL / newline-delimited GeoJSON**
- Nhiều feature trên web → **vector tile**, xem [[MapLibre and Vector Tiles]]
- Lưu trữ/phân tích → [[GeoPackage]] hoặc GeoParquet, xem [[Cloud Native Geospatial Formats]]
- Nhị phân nhưng vẫn "streaming" → **FlatGeobuf**

## 4. Cạm bẫy

- **Kích thước phình.** Toạ độ ghi text với 15 chữ số thập phân là lãng phí khổng lồ. Làm tròn về 6 chữ số (≈0,1 m) thường **giảm 30–50%** dung lượng mà không mất gì thực chất: `ogr2ogr -lco COORDINATE_PRECISION=6`.
- **Không có index** → client phải nạp và duyệt toàn bộ. File 50 MB làm treo tab trình duyệt.
- **`properties` không có schema.** Cùng một FeatureCollection có thể có feature thiếu trường; code client phải phòng thủ.
- **Số nguyên lớn mất chính xác.** JSON number là double; id kiểu int64 (ví dụ OSM id) bị làm tròn. Lưu id dạng **chuỗi**.
- **`GeometryCollection`** được chuẩn khuyến nghị **tránh** — nhiều client xử lý kém.
- **Toạ độ chiều thứ ba.** RFC cho phép `[x, y, z]` nhưng nhiều thư viện lặng lẽ bỏ z.
- **TopoJSON không phải GeoJSON.** Nó là định dạng riêng, nén bằng cách chia sẻ cạnh — cần bước giải mã.

## 5. Checklist áp dụng

- [ ] File của tôi có ở **EPSG:4326** không? (kiểm toạ độ trong khoảng ±180 / ±90)
- [ ] Thứ tự có phải `[lon, lat]` không?
- [ ] Tôi có làm tròn toạ độ về 6–7 chữ số chưa?
- [ ] Id kiểu số lớn có được lưu dạng chuỗi không?
- [ ] Nếu file > 5 MB: tôi có nên dùng vector tile hoặc FlatGeobuf thay thế không?
- [ ] Mọi feature có cùng tập trường không?
- [ ] Hình học có vượt kinh tuyến 180° cần cắt không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| geojson.io | Xem/sửa nhanh trên bản đồ | [geojson.io](https://geojson.io/) |
| `ogr2ogr -f GeoJSON -lco RFC7946=YES` | Xuất đúng chuẩn RFC 7946 | [gdal.org](https://gdal.org/drivers/vector/geojson.html) |
| `mapshaper` | Đơn giản hoá, sửa, chuyển đổi | [mapshaper.org](https://mapshaper.org/) |

## Tham khảo

- [RFC 7946 — The GeoJSON Format](https://datatracker.ietf.org/doc/html/rfc7946) — chuẩn hiện hành, ngắn và đáng đọc hết
- [GDAL — GeoJSON driver](https://gdal.org/drivers/vector/geojson.html) — tuỳ chọn xuất, gồm `COORDINATE_PRECISION` và `RFC7946`
- [FlatGeobuf](https://flatgeobuf.org/) — thay thế nhị phân, có index, vẫn streaming được
- [TopoJSON specification](https://github.com/topojson/topojson-specification) — biến thể chia sẻ cạnh

## Liên kết

[[Spatial Data Models]] · [[GeoPackage]] · [[Cloud Native Geospatial Formats]] · [[MapLibre and Vector Tiles]] · [[Web Map Performance]] · [[GIS]]
