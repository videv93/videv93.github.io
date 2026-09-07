---
tags: [gis, dữ-liệu, catalogue]
status: evergreen
---
# Geospatial Data Sources

> Note **catalogue** — sắp theo *"tôi đang cần dữ liệu gì"*, không theo tên tổ chức. Seed roadmap dạy rất nhiều kỹ thuật nhưng **không chỉ ra một nguồn dữ liệu nào** để luyện; đây là mảnh thiếu khiến người học kẹt ngay sau bài học đầu tiên.

## 1. Nền bản đồ & hành chính

| Nguồn | Nội dung | License | Link |
|---|---|---|---|
| **OpenStreetMap** | Đường, toà nhà, POI, ranh giới — toàn cầu | ODbL (**phải ghi công**) | [openstreetmap.org](https://www.openstreetmap.org/) |
| Geofabrik | OSM cắt sẵn theo quốc gia, cập nhật hằng ngày | ODbL | [download.geofabrik.de](https://download.geofabrik.de/) |
| Natural Earth | Dữ liệu nền tỉ lệ nhỏ, 3 mức chi tiết | **Public domain** | [naturalearthdata.com](https://www.naturalearthdata.com/) |
| GADM | Ranh giới hành chính mọi cấp, mọi nước | Phi thương mại | [gadm.org](https://gadm.org/) |
| geoBoundaries | Ranh giới hành chính, license mở hơn GADM | Mở | [geoboundaries.org](https://www.geoboundaries.org/) |
| Overture Maps | Nền bản đồ mở do liên minh công ty lớn xây | Mở, GeoParquet | [overturemaps.org](https://overturemaps.org/) |

## 2. Ảnh vệ tinh & viễn thám

| Nguồn | Nội dung | Độ phân giải | Link |
|---|---|---|---|
| **Copernicus Data Space** | Sentinel-1/2/3/5P chính thức | 10–60 m | [dataspace.copernicus.eu](https://dataspace.copernicus.eu/) |
| **USGS EarthExplorer** | Landsat 1972→nay, ASTER, DEM | 15–30 m | [earthexplorer.usgs.gov](https://earthexplorer.usgs.gov/) |
| **Microsoft Planetary Computer** | Kho STAC lớn, có API + notebook | Đa dạng | [planetarycomputer.microsoft.com](https://planetarycomputer.microsoft.com/) |
| **AWS Earth Search (STAC)** | Sentinel/Landsat dạng COG trên S3 | Đa dạng | [earth-search.aws.element84.com](https://earth-search.aws.element84.com/v1) |
| **Google Earth Engine** | Petabyte + tính toán server-side | Đa dạng | [earthengine.google.com](https://earthengine.google.com/) |
| NASA Earthdata | MODIS, VIIRS, GPM, khí quyển | Đa dạng | [earthdata.nasa.gov](https://www.earthdata.nasa.gov/) |

Chi tiết cách chọn: [[Satellite Imagery Sources]].

## 3. Độ cao & địa hình

| Nguồn | Độ phân giải | Phủ | Link |
|---|---|---|---|
| **Copernicus DEM** (GLO-30) | 30 m | Toàn cầu | [spacedata.copernicus.eu](https://spacedata.copernicus.eu/collections/copernicus-digital-elevation-model) |
| SRTM | 30 m | ±60° vĩ độ | [earthexplorer.usgs.gov](https://earthexplorer.usgs.gov/) |
| ALOS AW3D30 | 30 m | Toàn cầu | [eorc.jaxa.jp](https://www.eorc.jaxa.jp/ALOS/en/dataset/aw3d30/aw3d30_e.htm) |
| ASTER GDEM | 30 m | Toàn cầu | [asterweb.jpl.nasa.gov](https://asterweb.jpl.nasa.gov/gdem.asp) |

Xem [[Digital Elevation Models]] để chọn đúng loại.

## 4. Dân số, kinh tế, môi trường

| Nguồn | Nội dung | Link |
|---|---|---|
| **WorldPop** | Lưới dân số ~100 m | [worldpop.org](https://www.worldpop.org/) |
| GHSL (JRC) | Khu dân cư, đô thị hoá toàn cầu | [ghsl.jrc.ec.europa.eu](https://ghsl.jrc.ec.europa.eu/) |
| Copernicus Land Monitoring | Lớp phủ, thực vật châu Âu | [land.copernicus.eu](https://land.copernicus.eu/) |
| ESA WorldCover | Lớp phủ toàn cầu 10 m | [esa-worldcover.org](https://esa-worldcover.org/) |
| HDX (OCHA) | Dữ liệu nhân đạo, dân số, cơ sở hạ tầng | [data.humdata.org](https://data.humdata.org/) |
| OpenAQ | Chất lượng không khí theo trạm | [openaq.org](https://openaq.org/) |

## 5. Nguồn Việt Nam

| Nguồn | Nội dung | Ghi chú |
|---|---|---|
| OSM qua Geofabrik | Đường, toà nhà, POI Việt Nam | Cập nhật hằng ngày, chất lượng tốt ở đô thị |
| GADM / geoBoundaries | Ranh giới tỉnh/huyện/xã | **Kiểm ngày** — ranh giới hành chính VN thay đổi |
| Cổng dữ liệu quốc gia | Dữ liệu mở của cơ quan nhà nước | [data.gov.vn](https://data.gov.vn/) |
| Copernicus / Landsat | Ảnh phủ Việt Nam | Chú ý mây — xem mục cạm bẫy |

> [!warning] Ba lưu ý riêng cho dữ liệu Việt Nam
> 1. **Ranh giới hành chính thay đổi** (sáp nhập, chia tách). Luôn kiểm **thời điểm hiệu lực** của bộ ranh giới, không chỉ ngày tải file.
> 2. **Mây là vấn đề lớn.** Khí hậu nhiệt đới gió mùa khiến ảnh quang học nhiều tháng gần như không dùng được. Cân nhắc **Sentinel-1 (radar, xuyên mây)** hoặc composite nhiều ngày.
> 3. **Datum**: dữ liệu trong nước thường ở **VN-2000**, dữ liệu quốc tế ở WGS 84. Chúng **không** trùng nhau — xem [[Datums and Geodesy]].

## 6. Cạm bẫy khi dùng dữ liệu mở

- **"Mở" không có nghĩa "muốn làm gì thì làm".** ODbL của OSM buộc ghi công và có điều khoản share-alike với dữ liệu dẫn xuất.
- **Không kiểm ngày dữ liệu.** Một bộ ranh giới tải hôm nay có thể phản ánh trạng thái năm 2018.
- **Chất lượng OSM rất không đồng đều theo vùng.** Dày đặc ở đô thị lớn, thưa ở nông thôn — đừng suy ra mật độ *thực* từ mật độ *dữ liệu*. Đây là một dạng thiên lệch lấy mẫu nghiêm trọng.
- **Trộn nguồn khác tỉ lệ.** Ghép ranh giới Natural Earth (tỉ lệ nhỏ) với thửa đất (tỉ lệ lớn) tạo ra khe hở và chồng lấn giả.
- **Không kiểm license trước khi xây sản phẩm thương mại.** Phát hiện muộn là rủi ro thật.
- **Tải lại toàn bộ mỗi lần.** Nhiều nguồn có bản cập nhật gia tăng; xem [[Spatial ETL Patterns]].

## Tham khảo

- [Awesome Geospatial — datasets section](https://github.com/sacridini/Awesome-Geospatial) — danh mục cộng đồng
- [STAC Index](https://stacindex.org/) — danh mục các catalogue STAC công khai
- [OpenStreetMap Copyright & License](https://www.openstreetmap.org/copyright) — điều khoản ODbL đầy đủ
- [Copernicus Data Space Ecosystem](https://dataspace.copernicus.eu/) — cổng chính thức dữ liệu Sentinel
- [Overture Maps Foundation](https://overturemaps.org/) — nền bản đồ mở thế hệ mới

## Liên kết

[[Spatial Metadata]] · [[Satellite Imagery Sources]] · [[Digital Elevation Models]] · [[Geospatial Data Quality]] · [[GIS Learning Resources]] · [[GIS]]
