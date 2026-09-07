---
tags: [gis, moc, geospatial]
type: moc
status: evergreen
created: 2026-09-02
updated: 2026-09-02
---
# GIS — Map of Content

> Hệ thống kiến thức **GIS / geospatial engineering**: từ mô hình dữ liệu không gian và hệ toạ độ, qua phân tích không gian, Spatial SQL, Python geospatial, raster & viễn thám, tới Web GIS và data engineering không gian.
> Gieo từ một seed **danh mục** duy nhất — bản clipping `gis-programming-roadmap/README.md` (215 dòng, ~90 link khoá học). Xem `_archive-seed/`.

## Cách dùng vault này

- **`status`**: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá).
- **Thứ tự thư mục = thứ tự học**, không phải bảng chữ cái. Đọc `00` → `09` là một lộ trình hoàn chỉnh.
- Tiếng Việt cho giải thích, **giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu, thư viện và đồng nghiệp đều dùng tiếng Anh.
- Mỗi note có **Checklist áp dụng** dùng được ngay và **≥3 link tham khảo thật**.

> [!warning] Hai note bản lề — đọc trước khi hành động
> Seed này chứa **hai mâu thuẫn nội tại** không được hoà tan:
> - ⚠️ [[Proprietary vs Open Source GIS]] — đọc trước khi chọn stack hay chọn khoá học.
> - ⚠️ [[Roadmap Half-Life]] — đọc trước khi tin bất kỳ link nào trong catalogue.

## 00 - Nền tảng GIS

| Note | Nội dung |
|---|---|
| [[What Is GIS]] | GIS là gì, năm thành phần, khác gì "bản đồ đẹp" |
| [[Vector vs Raster]] | Hai mô hình dữ liệu nền tảng, khi nào dùng cái nào |
| [[Spatial Data Models]] | Geometry types, simple features, topology model |
| [[GIS Software Landscape]] | Bản đồ toàn cảnh công cụ: desktop, server, thư viện, cloud |
| [[GIS Career Paths]] | GIS analyst vs GIS developer vs geospatial data engineer |
| ⚠️ [[Proprietary vs Open Source GIS]] | **Note bản lề** — ESRI vs open source, không chọn phe |

## 01 - Hệ toạ độ & Phép chiếu

| Note | Nội dung |
|---|---|
| [[Coordinate Reference Systems]] | CRS là gì, geographic vs projected, đọc một định nghĩa CRS |
| [[Map Projections]] | Họ phép chiếu, biến dạng, chọn phép chiếu theo mục đích |
| [[Datums and Geodesy]] | Ellipsoid, datum, datum shift, vì sao lệch vài mét |
| [[EPSG Codes]] | Registry EPSG, mã hay dùng, WKT/PROJ string |
| [[Reprojection Pitfalls]] | Cạm bẫy reproject — nguồn lỗi số 1 của người mới |
| [[Geodesic vs Planar Measurement]] | Đo khoảng cách/diện tích đúng cách trên mặt cầu |

## 02 - Dữ liệu & Định dạng

| Note | Nội dung |
|---|---|
| [[Shapefile]] | Định dạng thống trị và mọi giới hạn của nó |
| [[GeoJSON]] | Chuẩn web, RFC 7946, các bẫy khi dùng thật |
| [[GeoPackage]] | SQLite chuẩn OGC — lựa chọn thay Shapefile |
| [[Cloud Native Geospatial Formats]] | COG, GeoParquet, FlatGeobuf, PMTiles, Zarr |
| [[Raster Formats and COG]] | GeoTIFF, nén, overview, tại sao COG đổi cuộc chơi |
| [[Spatial Metadata]] | ISO 19115, STAC, lineage — dữ liệu không metadata là rác |
| [[Geospatial Data Sources]] | Catalogue nguồn dữ liệu mở: nền, ảnh vệ tinh, hành chính |

## 03 - Phân tích không gian

| Note | Nội dung |
|---|---|
| [[Spatial Relationships and DE-9IM]] | Mô hình quan hệ 9 giao — nền của mọi predicate |
| [[Spatial Joins]] | Join theo vị trí, chọn predicate, chi phí tính toán |
| [[Overlay Operations]] | Intersection, union, difference, clip, dissolve |
| [[Buffer and Proximity Analysis]] | Buffer, khoảng cách, nearest neighbour |
| [[Geometry Validity and Topology]] | Self-intersection, sliver, `ST_MakeValid`, làm sạch hình học |
| [[Spatial Aggregation and Binning]] | Grid, hexbin, H3, chống MAUP |
| [[Network Analysis and Routing]] | Đồ thị đường, shortest path, isochrone, OSRM/pgRouting |
| [[Geocoding]] | Địa chỉ → toạ độ, chất lượng match, reverse geocoding |

## 04 - Spatial SQL & PostGIS

| Note | Nội dung |
|---|---|
| [[PostGIS Core Types]] | `geometry` vs `geography`, SRID, cài đặt |
| [[Spatial SQL Query Patterns]] | Bộ query mẫu dùng đi dùng lại |
| [[Spatial Indexing with GiST]] | GiST, bounding box, vì sao index không luôn được dùng |
| [[PostGIS Performance Tuning]] | `ANALYZE`, clustering, simplification, phân vùng |
| [[Spatial Database Design]] | Schema cho dữ liệu không gian, SRID nhất quán |
| [[Raster in PostGIS]] | `postgis_raster` — và khi nào đừng dùng |
| [[Spatial SQL in Cloud Warehouses]] | BigQuery GIS, Snowflake, DuckDB spatial |

## 05 - Python cho GIS

| Note | Nội dung |
|---|---|
| [[Shapely]] | Đại số hình học trong bộ nhớ, Shapely 2.0 |
| [[GeoPandas]] | DataFrame có cột hình học — công cụ chủ lực |
| [[Fiona and Pyogrio]] | Đọc/ghi vector, vì sao pyogrio nhanh hơn nhiều |
| [[Rasterio]] | Đọc/ghi raster theo cửa sổ, không nạp hết vào RAM |
| [[GDAL and OGR]] | Bộ CLI nền tảng — `ogr2ogr`, `gdalwarp`, `gdal_translate` |
| [[ArcPy]] | Thư viện ESRI, khi nào buộc phải dùng |
| [[Geospatial Python Performance]] | Vectorise, Dask/Spark không gian, tránh vòng lặp Python |

## 06 - Raster & Viễn thám

| Note | Nội dung |
|---|---|
| [[Remote Sensing Fundamentals]] | Phổ điện từ, độ phân giải, mức xử lý |
| [[Satellite Imagery Sources]] | Sentinel, Landsat, ảnh thương mại — chọn nguồn nào |
| [[Spectral Indices]] | NDVI, NDWI, NBR và cách đọc chúng cho đúng |
| [[Raster Algebra and Zonal Statistics]] | Map algebra, zonal stats, vector ↔ raster |
| [[Digital Elevation Models]] | DEM/DSM/DTM, slope, aspect, hillshade, watershed |
| [[Earth Observation Data Cubes]] | STAC, Google Earth Engine, xarray, Zarr |

## 07 - Web GIS

| Note | Nội dung |
|---|---|
| [[Web Mapping Architecture]] | Kiến trúc tổng: dữ liệu → tile → client |
| [[Map Tiles and Tiling Schemes]] | XYZ, Web Mercator, zoom level, raster vs vector tile |
| [[Leaflet]] | Thư viện bản đồ nhẹ, mô hình layer/control |
| [[MapLibre and Vector Tiles]] | WebGL, style spec, vector tile hiện đại |
| [[OGC Services]] | WMS, WFS, WMTS, OGC API Features |
| [[Tile Servers and GeoServer]] | GeoServer, MapServer, Martin, TiTiler, pg_tileserv |
| [[ArcGIS REST and Web Stack]] | Feature Service, ArcGIS JS API, publish map service |
| [[Web Map Performance]] | Generalise, giới hạn zoom, cache, thời gian tương tác |

## 08 - Kỹ thuật dữ liệu không gian

| Note | Nội dung |
|---|---|
| [[Spatial ETL Patterns]] | Extract → transform → load cho dữ liệu không gian |
| [[FME and Spatial ETL Tools]] | FME, GeoKettle, petl/geopetl — công cụ chuyên dụng |
| [[Geospatial Data Quality]] | Kiểm tra chất lượng: hình học, thuộc tính, không gian |
| [[Big Geospatial Processing]] | Sedona, Dask-GeoPandas, DuckDB, chia phân vùng không gian |
| [[Geospatial Pipeline Orchestration]] | Airflow/Dagster/Prefect cho job không gian |
| [[Geospatial Testing and CI]] | Test hình học, dữ liệu mẫu, snapshot bản đồ |

## 09 - Lộ trình & Tài nguyên

| Note | Nội dung |
|---|---|
| [[GIS Learning Path]] | Lộ trình 6 chặng — bản viết lại của seed roadmap |
| [[GIS Roadmap Catalogue]] | **Toàn bộ ~90 link của seed**, sắp lại theo câu hỏi tra cứu |
| [[GIS Learning Resources]] | Sách, blog, cộng đồng, hội nghị, dữ liệu để luyện |
| [[GIS Glossary]] | Từ điển thuật ngữ — tra nhanh khi đọc tài liệu |
| ⚠️ [[Roadmap Half-Life]] | **Note bản lề** — chu kỳ bán rã của kiến thức GIS |

## Khái niệm "có nhà ở area khác"

GIS chạm nhiều khái niệm đã được định nghĩa nơi khác trong vault. **Link sang, không định nghĩa lại:**

| Khái niệm | Nhà của nó | GIS nói gì thêm |
|---|---|---|
| Hedonic pricing, hồi quy không gian | [[Hedonic Pricing and GIS]] (ML) | GIS cung cấp biến khoảng cách/khả năng tiếp cận |
| PostgreSQL nói chung | [[PostgreSQL]] (Database) | PostGIS chỉ là extension trên nền đó |
| Index, tuning nói chung | [[Performance Tuning]] (Database) | [[Spatial Indexing with GiST]] là biến thể không gian |
| HTML/CSS/JS, React, build tool | Area **Frontend** | Web GIS chỉ thêm lớp bản đồ lên trên |
| Git, CI/CD, container | Area **DevOps** | [[Geospatial Testing and CI]] chỉ thêm phần dữ liệu |
| ETL, orchestration nói chung | Area **Backend** / **Database** | [[Spatial ETL Patterns]] thêm phần hình học |

> [!note] Về `_archive-seed/`
> Chứa bản gốc `gis-programming-roadmapREADME.md at master 1.md` (215 dòng). **100% link và mô tả trong đó đã được giữ lại** — chủ yếu trong [[GIS Roadmap Catalogue]] và [[GIS Learning Path]], được mở rộng chứ không thay thế. Giữ lại để đối chiếu.

## Liên kết

[[Knowledge Seed Playbook]] · [[UIUX]] · [[Quant]] · [[Physics]] · [[Blockchain]] · [[Frontend]] · [[ML]] · [[Database]]
