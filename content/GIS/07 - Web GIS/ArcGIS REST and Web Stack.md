---
tags: [gis, web, esri]
status: evergreen
---
# ArcGIS REST and Web Stack

> Seed đặt ba tài liệu ArcGIS REST vào mục **"Reading (Required)"** — mục duy nhất trong cả roadmap được đánh dấu bắt buộc. Note này mô tả stack đó, và ánh xạ nó sang tương đương mở để kiến thức chuyển được cả hai chiều.

> [!warning] Đọc [[Proprietary vs Open Source GIS]] trước khi cam kết vào stack này.

## 1. Kiến trúc

| Tầng | Thành phần |
|---|---|
| **Lưu trữ** | Geodatabase (file / enterprise trên PostgreSQL, SQL Server, Oracle) |
| **Server** | ArcGIS Enterprise / ArcGIS Online |
| **API** | **ArcGIS REST API** — giao diện chung của mọi thứ |
| **Client** | ArcGIS Maps SDK for JavaScript, hoặc bất kỳ HTTP client nào |

**Điểm quan trọng nhất:** mọi thứ đi qua **REST + JSON**. Bạn không cần thư viện ESRI để đọc một Feature Service — `requests` là đủ. Đây là lý do stack này liên thông được với công cụ mở dễ hơn nhiều người nghĩ.

## 2. Các loại service

| Service | Trả về | Tương đương mở |
|---|---|---|
| **Feature Service** | Hình học + thuộc tính, **query/sửa được** | WFS, OGC API Features |
| **Map Service** | Ảnh đã render | WMS |
| **Image Service** | Raster, có thể tính toán | WCS + TiTiler |
| **Vector Tile Service** | Vector tile | MVT — [[MapLibre and Vector Tiles]] |
| **Geoprocessing Service** | Chạy tool từ xa | API riêng |
| **Geocoding Service** | Địa chỉ → toạ độ | [[Geocoding]] |

```bash
# Feature Service qua HTTP thuần — không cần thư viện ESRI
BASE=".../FeatureServer/0"
curl "$BASE?f=json"                              # metadata: trường, kiểu, extent, CRS

curl "$BASE/query?where=1%3D1&outFields=*&f=geojson&resultRecordCount=100"

# Truy vấn không gian
curl "$BASE/query?geometry=105.7,20.9,106.0,21.1&geometryType=esriGeometryEnvelope\
&spatialRel=esriSpatialRelIntersects&inSR=4326&outFields=*&f=geojson"
```

```python
# Đọc thẳng vào GeoPandas — không cài gì thuộc ESRI
import geopandas as gpd
url = ".../FeatureServer/0/query?where=1=1&outFields=*&f=geojson"
gdf = gpd.read_file(url)
```

> [!note] `f=geojson` là tham số đáng nhớ nhất
> ArcGIS REST mặc định trả **Esri JSON** (định dạng riêng, hình học khác GeoJSON). Thêm `f=geojson` cho ra GeoJSON chuẩn, đọc được bằng [[GeoPandas]], [[Leaflet]], hay bất cứ thứ gì. Đây là cầu nối một dòng giữa hai thế giới.

## 3. Ánh xạ khái niệm

| ArcGIS | Tương đương mở |
|---|---|
| Feature Service | [[OGC Services]] WFS / OGC API Features |
| Map Service | WMS |
| Vector Tile Service | MVT + [[Tile Servers and GeoServer]] |
| ArcGIS Online | Không có tương đương trọn gói; ghép từ nhiều mảnh |
| Web Map / Web AppBuilder | Ứng dụng tự viết |
| Esri JSON | [[GeoJSON]] |
| ArcGIS Maps SDK for JS | [[Leaflet]] / [[MapLibre and Vector Tiles]] |

## 4. Cạm bẫy

- **Giới hạn `maxRecordCount`.** Service thường trả tối đa 1.000–2.000 feature **mỗi request** và **không báo** rằng dữ liệu bị cắt. Phải phân trang bằng `resultOffset`/`resultRecordCount`, và kiểm `exceededTransferLimit` trong phản hồi. Đây là lỗi im lặng nghiêm trọng nhất khi kéo dữ liệu từ ArcGIS.
- **Esri JSON ≠ GeoJSON.** Dùng `f=geojson` khi có thể.
- **Token hết hạn.** Service bảo mật cần token có thời hạn ngắn; script dài phải làm mới.
- **CORS.** Service không bật CORS thì client web không gọi được.
- **Credit của ArcGIS Online.** Geocoding, routing, phân tích tiêu tốn credit — chi phí thật, dễ bất ngờ.
- **Thứ tự trục và `inSR`/`outSR`** — luôn nêu rõ, đừng dựa vào mặc định. Xem [[EPSG Codes]].
- **Giả định service ổn định.** URL và schema của service do người khác quản lý có thể đổi bất kỳ lúc nào.
- **Dùng SDK nặng cho việc chỉ cần một `fetch`.**

## 5. Checklist áp dụng

- [ ] Tôi đã đọc `?f=json` để biết trường, CRS, và `maxRecordCount` chưa?
- [ ] Tôi có **phân trang** khi kéo dữ liệu lớn không?
- [ ] Tôi có kiểm `exceededTransferLimit` trong phản hồi không?
- [ ] Tôi dùng `f=geojson` chứ?
- [ ] `inSR`/`outSR` có được nêu rõ không?
- [ ] Token có được làm mới trong tiến trình dài không?
- [ ] Thao tác này có tiêu tốn credit không?
- [ ] Tôi có cần SDK của ESRI, hay HTTP thuần là đủ?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| ArcGIS REST API | Giao diện chung của mọi service | [developers.arcgis.com/rest](https://developers.arcgis.com/rest/) |
| esri-leaflet | Dùng service ArcGIS trong Leaflet | [esri.github.io/esri-leaflet](https://esri.github.io/esri-leaflet/) |
| ArcGIS API for Python | Tự động hoá, không cần license desktop | [developers.arcgis.com/python](https://developers.arcgis.com/python/) |
| `ogr2ogr` driver `ESRIJSON` | Kéo Feature Service về file | [[GDAL and OGR]] |

## Tham khảo

- [ArcGIS REST API documentation](https://developers.arcgis.com/rest/) — **có trong seed** ở mục Reading (Required)
- [Esri — Publishing a map service](https://enterprise.arcgis.com/en/server/latest/get-started/windows/tutorial-publishing-a-map-service.htm) — **có trong seed**
- [Update Hosted Feature Service (arcpy repo)](https://github.com/arcpy/update-hosted-feature-service) — **có trong seed**
- [GEOG 863: Web Application Development for Geospatial Professionals](https://www.e-education.psu.edu/geog863/node/1776) — khoá **có trong seed**

## Liên kết

[[Proprietary vs Open Source GIS]] · [[ArcPy]] · [[OGC Services]] · [[Web Mapping Architecture]] · [[Leaflet]] · [[GIS]]
