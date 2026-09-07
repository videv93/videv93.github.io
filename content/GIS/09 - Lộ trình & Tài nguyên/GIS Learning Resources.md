---
tags: [gis, tài-nguyên, catalogue]
status: evergreen
---
# GIS Learning Resources

> Note **catalogue** — nguồn học **ngoài** seed, để bổ sung những chỗ seed không có: hệ toạ độ, viễn thám, cloud-native, vector tile, và cộng đồng để hỏi khi kẹt. Được miễn Checklist theo quy ước note catalogue.
> Nguồn **trong** seed nằm ở [[GIS Roadmap Catalogue]]. Nguồn **dữ liệu** nằm ở [[Geospatial Data Sources]].

> Tên note có tiền tố `GIS` là cố ý: bốn area khác trong vault đã có file tên `Learning Resources.md`, và một wikilink chung sẽ phân giải tuỳ tiện.

## 1. Sách nền tảng

| Sách                                                             | Về                               | Ghi chú                                                            |
| ---------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| **Geocomputation with R** (Lovelace, Nowosad, Muenchow)          | Nền tảng GIS + code              | Miễn phí online; **giải thích mô hình dữ liệu tốt nhất** dù dùng R |
| **Geographic Data Science with Python** (Rey, Arribas-Bel, Wolf) | Phân tích không gian bằng Python | Miễn phí online; cùng nhóm tác giả có trong seed                   |
| **PostGIS in Action** (Obe & Hsu)                                | Spatial SQL                      | Tham chiếu sâu nhất về PostGIS                                     |
| **Python Geospatial Development**                                | Ứng dụng Python                  | Thực hành                                                          |
| **GIS Fundamentals** (Bolstad)                                   | Lý thuyết GIS                    | **Có trong seed**                                                  |
| **Remote Sensing of the Environment** (Jensen)                   | Viễn thám                        | Sách giáo khoa chuẩn ngành                                         |
| **Map Projections: A Working Manual** (Snyder, USGS)             | Phép chiếu                       | Miễn phí, đầy đủ công thức                                         |

## 2. Tài liệu chính thức — nên đọc trực tiếp

| Nguồn | Vì sao |
|---|---|
| [PostGIS Documentation](https://postgis.net/documentation/) | Tham chiếu hàm; đọc thẳng nhanh hơn tìm blog |
| [GDAL Documentation](https://gdal.org/) | Driver, CLI, virtual file system |
| [PROJ Documentation](https://proj.org/) | Mọi thứ về CRS và biến đổi |
| [GeoPandas](https://geopandas.org/) / [Shapely](https://shapely.readthedocs.io/) / [Rasterio](https://rasterio.readthedocs.io/) | Stack Python |
| [MapLibre Style Spec](https://maplibre.org/maplibre-style-spec/) | Tham chiếu style |
| [OGC Standards](https://www.ogc.org/standards/) | Chuẩn gốc |
| [STAC Spec](https://stacspec.org/) | Catalogue ảnh |

## 3. Khoá học miễn phí lấp chỗ trống của seed

| Khoá | Lấp chỗ nào |
|---|---|
| [Geo-Python + Automating GIS Processes (Helsinki)](https://autogis-site.readthedocs.io/en/latest/) | Python cho GIS — cập nhật liên tục |
| [Introduction to PostGIS](https://postgis.net/workshops/postgis-intro/) | Spatial SQL |
| [NASA ARSET](https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset) | **Viễn thám** — seed hoàn toàn không có |
| [Google Earth Engine tutorials](https://developers.google.com/earth-engine/tutorials) | EO quy mô lớn |
| [Spatial Thoughts tutorials](https://spatialthoughts.com/) | QGIS, GEE, Python — chất lượng cao, miễn phí |
| [University Consortium for GIS (UCGIS) Body of Knowledge](https://gistbok.ucgis.org/) | Tham chiếu học thuật toàn diện |

## 4. Blog và nguồn theo dõi

| Nguồn | Nội dung |
|---|---|
| [Crunchy Data — PostGIS blog](https://www.crunchydata.com/blog/topic/postgis) | Thực chiến PostGIS, chất lượng rất cao |
| [Development Seed](https://developmentseed.org/blog/) | Cloud-native geospatial |
| [Cloud Native Geospatial Forum](https://cloudnativegeo.org/blog/) | COG, GeoParquet, STAC, PMTiles |
| [Planet / Element 84 blog](https://element84.com/blog/) | EO và hạ tầng dữ liệu |
| [Anita Graser (underdark)](https://anitagraser.com/) | QGIS, phân tích di chuyển |
| [Matt Forrest](https://forrest.nyc/) | Spatial SQL, xu hướng ngành |

## 5. Cộng đồng — nơi hỏi khi kẹt

| Nơi | Dùng khi |
|---|---|
| [GIS Stack Exchange](https://gis.stackexchange.com/) | **Nguồn tốt nhất** — hầu hết câu hỏi đã có người hỏi |
| [OSGeo Discord / mailing lists](https://www.osgeo.org/community/) | Dự án mã nguồn mở |
| [r/gis](https://www.reddit.com/r/gis/) | Nghề nghiệp, thị trường lao động |
| [PostGIS mailing list](https://lists.osgeo.org/mailman/listinfo/postgis-users) | Câu hỏi sâu về PostGIS |
| [Esri Community](https://community.esri.com/) | Hệ ESRI |

## 6. Hội nghị

| Hội nghị                               | Về                                                                 |
| -------------------------------------- | ------------------------------------------------------------------ |
| **FOSS4G**                             | Hội nghị mã nguồn mở địa lý lớn nhất; **video công khai miễn phí** |
| **Esri User Conference**               | Hệ sinh thái ESRI                                                  |
| **State of the Map**                   | OpenStreetMap                                                      |
| **Cloud Native Geospatial Conference** | COG, STAC, GeoParquet                                              |

> [!note] Video FOSS4G là nguồn bị đánh giá thấp nhất
> Hàng trăm bài trình bày kỹ thuật, miễn phí trên YouTube, thường là nơi **công bố công cụ mới trước khi có blog viết về nó**. Với việc theo dõi trạng thái ngành — vấn đề trung tâm của [[Roadmap Half-Life]] — đây là nguồn hiệu quả nhất.

## 7. Dữ liệu để luyện tập

Xem [[Geospatial Data Sources]] cho danh mục đầy đủ. Ba nguồn để bắt đầu ngay:

| Nguồn | Vì sao hợp để luyện |
|---|---|
| [Geofabrik OSM extracts](https://download.geofabrik.de/) | Dữ liệu thật, bẩn thật, kích thước vừa phải |
| [Natural Earth](https://www.naturalearthdata.com/) | Nhỏ, sạch, public domain — hợp làm ví dụ |
| [Copernicus / Sentinel](https://dataspace.copernicus.eu/) | Ảnh vệ tinh miễn phí, cập nhật |

## Liên kết

[[GIS Roadmap Catalogue]] · [[GIS Learning Path]] · [[Geospatial Data Sources]] · [[GIS Glossary]] · [[Roadmap Half-Life]] · [[GIS]]
