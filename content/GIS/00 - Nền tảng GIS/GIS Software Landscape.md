---
tags: [gis, nền-tảng, công-cụ]
status: evergreen
---
# GIS Software Landscape

> Bản đồ toàn cảnh công cụ GIS, sắp theo **vai trò trong pipeline** chứ không theo nhà cung cấp — vì thứ quyết định bạn dùng gì là *chỗ bạn đứng trong pipeline*, không phải logo.

> [!warning] Đọc [[Proprietary vs Open Source GIS]] trước khi chọn stack từ bảng này.

## 1. Sáu vai trò trong pipeline

| Vai trò | Việc | Mã nguồn mở | Thương mại |
|---|---|---|---|
| **Desktop / khám phá** | Xem, sửa tay, dựng bản đồ in | QGIS, GRASS GIS | ArcGIS Pro, ArcMap, MapInfo, Global Mapper |
| **Kho dữ liệu** | Lưu, truy vấn, ràng buộc | PostGIS, DuckDB spatial, SpatiaLite | Oracle Spatial, SQL Server Spatial, SAP HANA |
| **Thư viện / xử lý** | Code hoá phép biến đổi | GDAL/OGR, GEOS, PROJ, Shapely, GeoPandas | ArcPy, FME SDK |
| **Máy chủ bản đồ** | Phát WMS/WFS/tile | GeoServer, MapServer, Martin, TiTiler, pg_tileserv | ArcGIS Server / Enterprise |
| **Client web** | Hiển thị trong trình duyệt | Leaflet, MapLibre GL, OpenLayers | Mapbox GL JS, ArcGIS Maps SDK for JS |
| **ETL / pipeline** | Chuyển đổi hàng loạt | GDAL CLI, geopetl, Airflow, Sedona | FME, ArcGIS Data Interoperability |

### Ba lớp nền mà gần như *mọi* thứ đứng trên

Đây là chi tiết quan trọng nhất của cả bản đồ này:

| Thư viện | Việc | Ai dùng nó |
|---|---|---|
| **GDAL/OGR** | Đọc/ghi ~200 định dạng | QGIS, ArcGIS Pro, GeoPandas, Rasterio, GeoServer, PostGIS raster |
| **GEOS** | Đại số hình học (intersect, buffer, validity) | PostGIS, Shapely, QGIS, GDAL |
| **PROJ** | Biến đổi hệ toạ độ | Tất cả những cái trên |

> [!note] Hệ quả thực tế
> Khi ArcGIS Pro và QGIS cho **cùng một kết quả buffer**, đó không phải trùng hợp — cả hai đang gọi GEOS. Và khi bạn gặp một lỗi hình học kỳ lạ ở QGIS, đọc changelog GEOS thường nhanh hơn đọc forum QGIS. Xem [[GDAL and OGR]].

## 2. Cloud & nền tảng phân tích

| Nền tảng | Điểm mạnh | Ràng buộc |
|---|---|---|
| **Google Earth Engine** | Petabyte ảnh vệ tinh, tính toán server-side miễn phí cho nghiên cứu | Ngôn ngữ riêng, khó xuất khối lượng lớn, khoá vào nền tảng |
| **BigQuery GIS / Snowflake** | Spatial SQL trên dữ liệu tỉ dòng | Tập hàm hẹp hơn PostGIS nhiều |
| **AWS / Planetary Computer** | Kho STAC + object storage cho [[Cloud Native Geospatial Formats]] | Chi phí egress |
| **Felt, Atlas, CARTO** | Bản đồ cộng tác, ít hạ tầng | SaaS, dữ liệu rời khỏi máy bạn |

## 3. Nguyên tắc chọn

1. **Chọn theo ràng buộc cứng trước.** Ràng buộc cứng thường là: dữ liệu đã ở đâu, tổ chức đã mua license gì, khách hàng đòi giao gì. Sở thích cá nhân xếp cuối.
2. **QGIS là công cụ *xem* mặc định, dù stack của bạn là gì.** Nó mở được gần như mọi thứ, miễn phí, và là cách nhanh nhất để trả lời *"dữ liệu này trông thế nào?"* — kể cả trong một tổ chức toàn ESRI.
3. **Đưa phần tính toán nặng xuống gần dữ liệu.** PostGIS/warehouse xử lý triệu dòng nhanh hơn nhiều so với kéo về Python. Xem [[Spatial SQL Query Patterns]].
4. **Ưu tiên công cụ có CLI.** Cái gì có CLI thì tự động hoá được, kiểm thử được, đưa vào CI được. Cái gì chỉ có GUI thì không.
5. **Đừng chọn máy chủ bản đồ trước khi biết mình phát raster tile hay vector tile.** Quyết định đó đổi hoàn toàn danh sách ứng viên. Xem [[Map Tiles and Tiling Schemes]].

## 4. Cạm bẫy

- **Chọn ArcGIS Server chỉ để phát một lớp điểm.** Quá nặng; `pg_tileserv` hoặc một file PMTiles tĩnh làm được việc đó với chi phí gần bằng không.
- **Xây pipeline dựa trên GUI của phần mềm desktop.** Model Builder và Graphical Modeler chạy tốt cho tới lúc cần chạy hằng đêm và có log.
- **Trộn nhiều phiên bản GDAL/PROJ trong một máy.** Nguyên nhân số một của "cùng code, máy tôi ra kết quả khác". Cố định phiên bản bằng conda/container.
- **Tưởng Mapbox GL JS còn là mã nguồn mở.** Nó đã đổi license từ v2 (2020); [[MapLibre and Vector Tiles]] là nhánh mở tiếp nối v1.
- **Đánh giá công cụ bằng danh sách tính năng.** Cái quyết định là chất lượng tài liệu và độ sống của cộng đồng khi bạn kẹt lúc 11 giờ đêm.

## 5. Checklist áp dụng

- [ ] Tôi đã xác định mình đang giải bài toán ở **vai trò nào** trong sáu vai trò chưa?
- [ ] Ràng buộc cứng (license sẵn có, định dạng bàn giao, kỹ năng đội) là gì?
- [ ] Công cụ tôi chọn có CLI/API để tự động hoá không?
- [ ] Tôi có thể cố định phiên bản GDAL/GEOS/PROJ không?
- [ ] Nếu công cụ này ngừng tồn tại, dữ liệu của tôi có ra được định dạng mở không?
- [ ] Tôi có đang dùng một hệ thống nặng cho một việc nhẹ không?

## Tham khảo

- [OSGeo — Projects](https://www.osgeo.org/projects/) — danh mục chính thức hệ sinh thái mở
- [GDAL — Raster & Vector driver list](https://gdal.org/drivers/raster/index.html) — thước đo thật về "công cụ này đọc được gì"
- [Esri — ArcGIS product page](https://www.esri.com/en-us/arcgis/products/index) — phía thương mại
- [Awesome Geospatial](https://github.com/sacridini/Awesome-Geospatial) — danh mục cộng đồng cập nhật liên tục
- [MapLibre — Why MapLibre exists](https://maplibre.org/news/2020-12-11-maplibre-and-maptiler/) — bối cảnh vụ đổi license Mapbox

## Liên kết

[[Proprietary vs Open Source GIS]] · [[GDAL and OGR]] · [[Tile Servers and GeoServer]] · [[GIS Career Paths]] · [[GIS Roadmap Catalogue]] · [[GIS]]
