---
tags: [gis, postgis, sql]
status: evergreen
---
# PostGIS Core Types

> PostGIS là một **extension** của PostgreSQL, không phải một CSDL riêng. Điều đó nghĩa là mọi thứ bạn biết về PostgreSQL — transaction, index, quyền, replication — vẫn đúng nguyên; PostGIS chỉ thêm kiểu dữ liệu và hàm. Nền tảng PostgreSQL nằm ở [[PostgreSQL]] (area Database).

> [!note] Ghi chú nguồn
> Seed gốc dành cho Spatial SQL đúng một mục với ba link khoá học (GEOG 868, Intro to PostGIS, CS145) và một dòng mô tả: *"Learn how to store GIS data and manipulate it in a database."* Cả thư mục `04` này trả lời lời hứa đó.

## 1. Cài đặt và kiểm tra

```sql
CREATE EXTENSION postgis;                 -- lõi: geometry, geography, hàm
CREATE EXTENSION postgis_raster;          -- raster (chỉ khi thật cần)
CREATE EXTENSION postgis_topology;        -- mô hình topology
CREATE EXTENSION pgrouting;               -- routing

SELECT PostGIS_Full_Version();            -- kiểm phiên bản GEOS/PROJ/GDAL bên dưới
```

> [!note] `PostGIS_Full_Version()` là lệnh chẩn đoán quan trọng nhất
> Nó cho biết phiên bản **GEOS, PROJ, GDAL** đang được dùng. Khi kết quả hình học khác nhau giữa hai môi trường, nguyên nhân gần như luôn nằm ở dòng này chứ không ở phiên bản PostGIS. Xem [[Geospatial Testing and CI]].

## 2. `geometry` vs `geography`

| | `geometry` | `geography` |
|---|---|---|
| Mô hình | Mặt phẳng | Ellipsoid |
| Đơn vị khoảng cách | Đơn vị của SRID | **Luôn mét** |
| Tập hàm | **Đầy đủ** | Tập con |
| Tốc độ | Nhanh | Chậm hơn |
| SRID | Bất kỳ | Chủ yếu 4326 |

Quy tắc chọn nằm ở [[Geodesic vs Planar Measurement]]. Mặc định thực dụng: **`geometry` với SRID phù hợp vùng**.

```sql
CREATE TABLE parcels (
  id        bigserial PRIMARY KEY,
  code      text NOT NULL,
  -- Ràng buộc kiểu và SRID ngay trong định nghĩa cột:
  geom      geometry(MultiPolygon, 32648) NOT NULL,
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX parcels_geom_idx ON parcels USING GIST (geom);
```

Cú pháp `geometry(MultiPolygon, 32648)` là **ràng buộc**, không phải chú thích: CSDL sẽ từ chối hình học sai kiểu hoặc sai SRID. Dùng nó ở mọi bảng — nó bắt lỗi ở cổng vào thay vì giữa pipeline. Xem [[Spatial Database Design]].

## 3. Nhóm hàm cần thuộc

| Nhóm | Hàm tiêu biểu |
|---|---|
| **Constructor** | `ST_Point`, `ST_MakeLine`, `ST_MakePolygon`, `ST_GeomFromText`, `ST_GeomFromGeoJSON` |
| **Accessor** | `ST_SRID`, `ST_GeometryType`, `ST_NPoints`, `ST_IsValid`, `ST_Envelope` |
| **Đo đạc** | `ST_Area`, `ST_Length`, `ST_Distance`, `ST_Perimeter` |
| **Quan hệ** | `ST_Intersects`, `ST_Covers`, `ST_DWithin` — [[Spatial Relationships and DE-9IM]] |
| **Xử lý** | `ST_Buffer`, `ST_Intersection`, `ST_Union`, `ST_Simplify`, `ST_MakeValid` |
| **Biến đổi** | `ST_Transform`, `ST_SetSRID` — [[Reprojection Pitfalls]] |
| **Xuất** | `ST_AsText`, `ST_AsGeoJSON`, `ST_AsMVT`, `ST_AsBinary` |
| **Gộp** | `ST_Union`, `ST_Collect`, `ST_Extent`, `ST_ClusterDBSCAN` |

**Quy ước tên** rất nhất quán và đáng biết: `ST_` = Spatial Type (chuẩn SQL/MM); `ST_As*` = xuất ra định dạng; `ST_*From*` = nhập từ định dạng.

## 4. Bảng hệ thống

| Đối tượng | Nội dung |
|---|---|
| `spatial_ref_sys` | Mọi CRS PostGIS biết (~8.500 dòng) — xem [[EPSG Codes]] |
| `geometry_columns` | View liệt kê mọi cột hình học, kiểu, SRID |
| `raster_columns` | Tương tự cho raster |

```sql
-- Kiểm kê nhanh toàn CSDL: cột nào, kiểu gì, SRID nào, có index chưa
SELECT f_table_name, f_geometry_column, type, srid, coord_dimension
FROM geometry_columns ORDER BY 1;
```

## 5. Cạm bẫy

- **Không ràng buộc SRID trên cột** → dữ liệu trộn nhiều CRS trong một bảng, phát hiện rất muộn.
- **Quên tạo index không gian.** Không có nó, mọi truy vấn không gian là quét toàn bảng. Xem [[Spatial Indexing with GiST]].
- **Trộn `geometry` và `geography`** trong cùng biểu thức → ép kiểu ngầm, chậm và dễ sai.
- **Nâng cấp PostGIS mà không chạy `postgis_extensions_upgrade()`** → hàm cũ và mới lẫn lộn.
- **Kiểu hình học lẫn lộn** (`Polygon` và `MultiPolygon` cùng cột). Chuẩn hoá về `Multi*` khi nhập bằng `ST_Multi`.
- **Dùng `postgis_raster` cho khối lượng raster lớn.** Thường COG + [[Rasterio]] là lựa chọn đúng hơn. Xem [[Raster in PostGIS]].
- **`ST_Point(lat, lon)`** — sai thứ tự. PostGIS nhận **(x, y) = (lon, lat)**.

## 6. Checklist áp dụng

- [ ] Mọi cột hình học có ràng buộc **kiểu + SRID** không?
- [ ] Mọi cột hình học có **index GiST** không?
- [ ] `geometry_columns` có cho thấy SRID nhất quán không?
- [ ] Tôi đã ghi lại `PostGIS_Full_Version()` của môi trường production chưa?
- [ ] Kiểu hình học đã chuẩn hoá về `Multi*` chưa?
- [ ] Tôi có thật sự cần `postgis_raster` không?
- [ ] `ST_Point` của tôi có đúng thứ tự (lon, lat) không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `psql` + `\dx` | Xem extension đã cài | [postgresql.org](https://www.postgresql.org/docs/) |
| pgAdmin / DBeaver | GUI, xem hình học trực quan | [dbeaver.io](https://dbeaver.io/) |
| QGIS | Kết nối trực tiếp, xem/sửa bảng PostGIS | [qgis.org](https://qgis.org/) |
| `shp2pgsql` / `ogr2ogr` | Nạp dữ liệu vào PostGIS | [[GDAL and OGR]] |

## Tham khảo

- [PostGIS Documentation](https://postgis.net/documentation/) — tham chiếu chính thức
- [Introduction to PostGIS Workshop](https://postgis.net/workshops/postgis-intro/) — khoá học chính thức, **có trong seed**
- [PostGIS — Geography Type](https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography) — so sánh hai kiểu
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/) — nền tảng bên dưới

## Liên kết

[[Spatial SQL Query Patterns]] · [[Spatial Indexing with GiST]] · [[Spatial Database Design]] · [[PostGIS Performance Tuning]] · [[PostgreSQL]] · [[GIS]]
