---
tags: [gis, web, tile]
status: evergreen
---
# Map Tiles and Tiling Schemes

> Không thể gửi cả thế giới xuống trình duyệt, nên ta cắt nó thành các ô vuông 256×256 theo một lưới phân cấp. Toàn bộ web mapping hiện đại dựng trên **một quy ước đánh số ba số**: `z/x/y`.

## 1. Lưới XYZ

| Zoom | Số tile | Ý nghĩa |
|---|---|---|
| 0 | 1 (1×1) | Cả thế giới trong một ô |
| 1 | 4 (2×2) | |
| z | $4^z$ | Mỗi cấp chia đôi mỗi chiều |
| 10 | ~1 triệu | Cấp thành phố |
| 15 | ~1 tỉ | Cấp đường phố |
| 22 | $4^{22}$ | Cấp toà nhà |

URL chuẩn: `https://server/tiles/{z}/{x}/{y}.png`

**Độ phân giải mỗi pixel ở xích đạo** ≈ $156543 / 2^z$ mét. Ở z=0 là ~156 km/pixel; ở z=15 là ~4,8 m/pixel. Công thức này đáng nhớ — nó cho biết ngay zoom nào phù hợp dữ liệu của bạn.

> [!warning] TMS đảo trục y so với XYZ
> Chuẩn **TMS** (OSGeo) đánh số `y` từ **dưới lên**; **XYZ** (Google/OSM, phổ biến hơn) đánh từ **trên xuống**. Cùng một tile có hai số y khác nhau. Triệu chứng: bản đồ lật ngược theo chiều dọc, hoặc tile hiện sai vị trí. Công thức chuyển: `y_tms = 2^z − 1 − y_xyz`.

## 2. Vì sao Web Mercator

EPSG:3857 được chọn vì hai tính chất kỹ thuật, không phải vì nó là phép chiếu tốt:

1. **Vuông**: thế giới thành một hình vuông hoàn hảo → chia bốn đệ quy dễ dàng.
2. **Conformal**: hình dạng cục bộ đúng, nên bản đồ trông tự nhiên khi zoom sâu.

Cái giá: **biến dạng diện tích cực lớn** theo vĩ độ, và cắt bỏ vùng cực (~±85,05°).

> [!warning] Tile dùng 3857 không có nghĩa dữ liệu phải sống ở 3857
> Lưu và phân tích ở CRS phù hợp; **chỉ transform sang 3857 ở bước sinh tile**. Đo đạc trên 3857 là sai. Xem [[Map Projections]] và [[Coordinate Reference Systems]].

## 3. Raster tile vs Vector tile

| | Raster tile | **Vector tile (MVT)** |
|---|---|---|
| Nội dung | Ảnh đã render | Hình học mã hoá Protobuf |
| Style | Cố định lúc tạo | **Đổi lúc chạy** |
| Kích thước | 10–100 KB | Thường nhỏ hơn |
| Tương tác | Khó | **Tốt** |
| Client | Bất kỳ | Cần WebGL |
| Hợp với | Ảnh vệ tinh, bản đồ in sẵn | **Dữ liệu vector** |

**MVT** (Mapbox Vector Tile) là chuẩn thực tế, nay được chuẩn hoá thành **OGC Vector Tiles**. Toạ độ trong tile là **toạ độ cục bộ 0–4096**, không phải toạ độ địa lý — client tự đặt lại vào đúng vị trí.

## 4. Đóng gói tile

| Cách | Mô tả | Ưu / Nhược |
|---|---|---|
| **Thư mục file** | `z/x/y.pbf` | Đơn giản; **hàng triệu file nhỏ** rất khó quản lý |
| **MBTiles** | SQLite chứa tile | Một file; cần server đọc |
| **PMTiles** | Một file, đọc bằng HTTP range | ✅ **Không cần server** — đặt trên S3/CDN là xong |
| **Động từ CSDL** | Sinh khi có yêu cầu | Luôn mới; cần cache |

```bash
# Tạo vector tile từ GeoJSON
tippecanoe -o out.mbtiles -Z0 -z14 --drop-densest-as-needed input.geojson

# Chuyển sang PMTiles để phục vụ tĩnh
pmtiles convert out.mbtiles out.pmtiles
```

## 5. Cạm bẫy

- **Nhầm XYZ và TMS** — xem callout.
- **Sinh tile tới zoom quá sâu.** Số tile tăng gấp 4 mỗi cấp; z=18 cho một quốc gia đã là hàng chục triệu tile.
- **Không đơn giản hoá theo zoom.** Gửi hình học đầy đủ ở z=5 vừa nặng vừa vô nghĩa — mắt không thấy được chi tiết đó.
- **Đối tượng bị cắt ở biên tile** gây nhấp nháy hoặc đứt nét. Dùng **buffer** khi sinh tile (`ST_AsMVTGeom` có tham số buffer, thường 64).
- **Nhãn lặp lại ở mỗi tile** — cần xử lý ở tầng style, không phải ở dữ liệu.
- **Không cache tile động** → tải CSDL rất nặng.
- **Trộn tile từ nhiều nguồn khác lưới** làm lệch chồng lớp.
- **Cho rằng z=22 là chi tiết hơn dữ liệu.** Zoom sâu hơn độ chính xác dữ liệu chỉ phóng to sai số.

## 6. Checklist áp dụng

- [ ] Tôi dùng XYZ hay TMS — và client có hiểu đúng không?
- [ ] Zoom min/max có phù hợp tỉ lệ dữ liệu không?
- [ ] Hình học có được đơn giản hoá theo từng mức zoom không?
- [ ] Tile có buffer để tránh cắt ở biên không?
- [ ] Tile có được cache (CDN hoặc file tĩnh) không?
- [ ] Tổng số tile có nằm trong mức quản lý được không?
- [ ] Dữ liệu chỉ transform sang 3857 ở **bước sinh tile** chứ?
- [ ] PMTiles có thay thế được cả một tile server không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| tippecanoe | GeoJSON → vector tile, có tối ưu theo zoom | [github.com/felt/tippecanoe](https://github.com/felt/tippecanoe) |
| PMTiles | Đóng gói tile một file | [docs.protomaps.com](https://docs.protomaps.com/pmtiles/) |
| `ST_AsMVT` | Sinh tile từ SQL | [[Spatial SQL Query Patterns]] |
| gdal2tiles | Cắt raster thành tile | [gdal.org](https://gdal.org/programs/gdal2tiles.html) |

## Tham khảo

- [Mapbox Vector Tile Specification](https://github.com/mapbox/vector-tile-spec) — đặc tả MVT
- [OGC Two Dimensional Tile Matrix Set](https://www.ogc.org/standard/tms/) — chuẩn hoá lưới tile
- [OSM Wiki — Slippy map tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) — công thức chuyển đổi `z/x/y` ↔ toạ độ
- [PMTiles specification](https://github.com/protomaps/PMTiles/blob/main/spec/v3/spec.md)

## Liên kết

[[Web Mapping Architecture]] · [[MapLibre and Vector Tiles]] · [[Tile Servers and GeoServer]] · [[Web Map Performance]] · [[Map Projections]] · [[GIS]]
