---
tags: [gis, tra-cứu, glossary]
status: evergreen
---
# GIS Glossary

> Từ điển tra nhanh khi đọc tài liệu. Mỗi mục một dòng, kèm link tới note giải thích đầy đủ. Sắp theo nhóm khái niệm, không theo bảng chữ cái — vì tra cứu thường bắt đầu từ *"cái này thuộc về đâu"* chứ không từ chữ cái đầu.

## Hệ toạ độ

| Thuật ngữ | Nghĩa |
|---|---|
| **CRS / SRS** | Hệ quy chiếu toạ độ — hợp đồng biến cặp số thành vị trí. [[Coordinate Reference Systems]] |
| **SRID** | Mã số của một CRS trong CSDL (thường trùng mã EPSG) |
| **EPSG** | Registry mã CRS do IOGP duy trì. [[EPSG Codes]] |
| **Datum** | Ellipsoid + cách neo nó vào Trái Đất. [[Datums and Geodesy]] |
| **Ellipsoid** | Mặt toán học xấp xỉ Trái Đất; gốc của kinh/vĩ độ |
| **Geoid** | Mặt đẳng thế trọng trường; gốc của **độ cao** |
| **Projection** | Phép trải mặt cong ra phẳng. [[Map Projections]] |
| **UTM** | Hệ 60 múi 6°, đơn vị mét, chính xác trong múi |
| **Web Mercator (3857)** | Phép chiếu của bản đồ web; **không dùng để đo** |
| **WKT / WKT2** | Biểu diễn CRS (và hình học) dạng text |
| **PROJ string** | Cú pháp CRS cũ; nay khuyến nghị dùng WKT2 |
| **Geodesic** | Đo trên ellipsoid. [[Geodesic vs Planar Measurement]] |

## Hình học

| Thuật ngữ | Nghĩa |
|---|---|
| **Simple Features** | Chuẩn OGC định nghĩa kiểu hình học. [[Spatial Data Models]] |
| **WKT / WKB** | Biểu diễn hình học dạng text / nhị phân |
| **Vertex / Node** | Đỉnh của hình học |
| **Ring** | Vòng khép kín tạo nên polygon (ngoài hoặc lỗ) |
| **Envelope / BBox** | Hộp bao nhỏ nhất chứa hình học |
| **Centroid** | Trọng tâm — **có thể nằm ngoài** polygon hình chữ L |
| **Validity** | Hình học có thoả quy tắc OGC không. [[Geometry Validity and Topology]] |
| **Topology** | Quan hệ không gian giữa các đối tượng (kề, chứa, nối) |
| **Sliver** | Polygon vụn dài mỏng sinh từ overlay. [[Overlay Operations]] |
| **DE-9IM** | Ma trận 9 giao — nền của mọi predicate. [[Spatial Relationships and DE-9IM]] |
| **Coverage** | Tập polygon phủ kín, không chồng |
| **Dangle** | Đoạn cụt không nối vào mạng lưới |

## Phân tích

| Thuật ngữ | Nghĩa |
|---|---|
| **Buffer** | Vùng bao quanh ở khoảng cách cho trước. [[Buffer and Proximity Analysis]] |
| **Overlay** | Chồng lớp: intersect, union, difference. [[Overlay Operations]] |
| **Dissolve** | Gộp đối tượng theo thuộc tính chung |
| **Spatial join** | Ghép bảng theo quan hệ hình học. [[Spatial Joins]] |
| **KNN** | K láng giềng gần nhất |
| **Isochrone** | Vùng tới được trong X phút theo mạng lưới. [[Network Analysis and Routing]] |
| **Voronoi** | Chia mặt phẳng theo điểm gần nhất |
| **MAUP** | Kết quả đổi theo cách chia vùng. [[Spatial Aggregation and Binning]] |
| **Choropleth** | Bản đồ tô màu theo giá trị vùng |
| **Geocoding** | Địa chỉ → toạ độ. [[Geocoding]] |
| **Zonal statistics** | Gộp giá trị raster theo vùng vector. [[Raster Algebra and Zonal Statistics]] |

## Raster & viễn thám

| Thuật ngữ | Nghĩa |
|---|---|
| **Band** | Một lớp giá trị trong raster (thường một dải phổ) |
| **NoData** | Giá trị đánh dấu ô không có dữ liệu |
| **Resampling** | Nội suy lại giá trị ô khi reproject/đổi phân giải |
| **Overview / Pyramid** | Bản thu nhỏ dựng sẵn trong file |
| **COG** | GeoTIFF sắp xếp để đọc từng phần qua HTTP. [[Raster Formats and COG]] |
| **DEM / DTM / DSM** | Mô hình độ cao: chung / mặt đất / bề mặt. [[Digital Elevation Models]] |
| **NDVI** | Chỉ số thực vật chuẩn hoá. [[Spectral Indices]] |
| **TOA / BOA** | Phản xạ đỉnh khí quyển / bề mặt (L1C / L2A) |
| **SAR** | Radar khẩu độ tổng hợp — xuyên mây |
| **STAC** | Chuẩn catalogue ảnh không gian-thời gian. [[Spatial Metadata]] |
| **Data cube** | Mảng `(time, band, y, x)`. [[Earth Observation Data Cubes]] |

## Web GIS

| Thuật ngữ | Nghĩa |
|---|---|
| **Tile** | Ô bản đồ theo lưới `z/x/y`. [[Map Tiles and Tiling Schemes]] |
| **XYZ / TMS** | Hai quy ước đánh số tile — **khác nhau ở trục y** |
| **MVT** | Mapbox Vector Tile — chuẩn vector tile |
| **PMTiles** | Một file tile, phục vụ được không cần server |
| **WMS / WFS / WMTS** | Dịch vụ OGC: ảnh / feature / tile. [[OGC Services]] |
| **OGC API** | Thế hệ chuẩn mới, REST + JSON |
| **Feature Service** | Dịch vụ feature của ArcGIS. [[ArcGIS REST and Web Stack]] |
| **Style Specification** | JSON mô tả cách vẽ bản đồ. [[MapLibre and Vector Tiles]] |

## Dữ liệu & kỹ thuật

| Thuật ngữ | Nghĩa |
|---|---|
| **GDAL / OGR** | Thư viện I/O raster / vector. [[GDAL and OGR]] |
| **GEOS** | Engine hình học (port của JTS) dùng bởi hầu hết phần mềm |
| **PROJ** | Thư viện biến đổi hệ toạ độ |
| **GiST** | Loại index của PostgreSQL dùng cho không gian. [[Spatial Indexing with GiST]] |
| **GeoParquet** | Parquet có hình học — cloud-native. [[Cloud Native Geospatial Formats]] |
| **GeoPackage** | SQLite chuẩn OGC, thay thế Shapefile. [[GeoPackage]] |
| **Lineage** | Nguồn gốc và chuỗi biến đổi của dữ liệu |
| **H3 / S2 / Geohash** | Hệ chỉ mục không gian phân cấp |
| **Hilbert curve** | Đường lấp không gian dùng để sắp dữ liệu. [[Big Geospatial Processing]] |

## Liên kết

[[GIS Learning Path]] · [[GIS Roadmap Catalogue]] · [[GIS Learning Resources]] · [[GIS]]
