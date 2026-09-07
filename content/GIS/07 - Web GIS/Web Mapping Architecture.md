---
tags: [gis, web, kiến-trúc]
status: evergreen
---
# Web Mapping Architecture

> Mọi bản đồ web, từ Google Maps tới dashboard nội bộ, đều là biến thể của **cùng một đường ống bốn tầng**. Biết bốn tầng đó giúp bạn đặt đúng câu hỏi khi thiết kế — và nhận ra khi mình đang dựng thứ phức tạp hơn cần thiết.

> [!note] Ghi chú nguồn
> Seed dành cho Web GIS mục lớn nhất (hai khoá "do both", bốn tutorial Leaflet, ba tài liệu ArcGIS REST) nhưng **không mô tả kiến trúc** — nó nhảy thẳng vào công cụ. Note này dựng khung để các note còn lại trong thư mục có chỗ đứng.

## 1. Bốn tầng

```
[ Lưu trữ ]  →  [ Tầng phục vụ ]  →  [ Vận chuyển ]  →  [ Client ]
 PostGIS        Tile server / API      Tile / GeoJSON     Leaflet
 COG / files    GeoServer, Martin      HTTP + CDN         MapLibre
 GeoParquet     TiTiler, pg_tileserv                      ArcGIS JS
```

| Tầng | Quyết định chính | Note |
|---|---|---|
| **Lưu trữ** | CSDL hay file? Định dạng nào? | [[Cloud Native Geospatial Formats]] |
| **Phục vụ** | Tile hay feature? Dựng sẵn hay động? | [[Tile Servers and GeoServer]] |
| **Vận chuyển** | Raster tile, vector tile, hay GeoJSON? | [[Map Tiles and Tiling Schemes]] |
| **Client** | Thư viện nào? | [[Leaflet]], [[MapLibre and Vector Tiles]] |

## 2. Ba mô hình vận chuyển — quyết định quan trọng nhất

| | **Raster tile** | **Vector tile** | **GeoJSON trực tiếp** |
|---|---|---|---|
| Server gửi gì | Ảnh PNG/JPG | Hình học đã mã hoá (MVT) | Hình học thô |
| Đổi style | ❌ Phải render lại | ✅ **Ngay trên client** | ✅ Ngay |
| Tương tác (click, hover) | ❌ Khó | ✅ Tốt | ✅ Tốt |
| Số đối tượng chịu được | Không giới hạn | Rất lớn | **Vài nghìn** |
| Tải cho client | Nhẹ | Trung bình (cần WebGL) | **Nặng** |
| Cache | Rất dễ | Dễ | Khó |
| Hợp với | Ảnh vệ tinh, bản đồ nền | **Dữ liệu vector hầu hết trường hợp** | Dữ liệu nhỏ, hay đổi |

> [!warning] Sai lầm kiến trúc phổ biến nhất
> Gửi một FeatureCollection GeoJSON 50 MB xuống trình duyệt rồi thắc mắc vì sao bản đồ treo. **Ngưỡng thực dụng: quá vài nghìn feature thì chuyển sang vector tile.** Xem [[Web Map Performance]].

## 3. Ba kiến trúc tham chiếu

### 3.1 Tĩnh — đơn giản nhất, đủ cho phần lớn trường hợp

```
Dữ liệu → tippecanoe → file .pmtiles → S3 + CDN → MapLibre
```
**Không có máy chủ nào chạy.** Rẻ nhất, bền nhất, nhanh nhất. Nhược điểm: dữ liệu tĩnh, phải dựng lại khi cập nhật. Xem [[Cloud Native Geospatial Formats]].

### 3.2 Động từ CSDL — khi dữ liệu thay đổi liên tục

```
PostGIS → pg_tileserv / Martin (ST_AsMVT) → CDN cache → MapLibre
```
Tile sinh theo yêu cầu từ dữ liệu mới nhất. Cần một dịch vụ chạy, nhưng nhẹ. Xem [[Spatial SQL Query Patterns]].

### 3.3 Đầy đủ — khi cần OGC chuẩn và nhiều nguồn

```
PostGIS + raster → GeoServer (WMS/WFS/WMTS) → cache → OpenLayers/Leaflet
```
Nặng hơn, nhưng cho chuẩn OGC đầy đủ và quản trị tập trung. Xem [[OGC Services]].

## 4. Nguyên tắc

1. **Bắt đầu từ tĩnh, chỉ thêm động khi có lý do.** Rất nhiều bản đồ nội bộ không cần máy chủ nào.
2. **Đơn giản hoá hình học theo mức zoom**, ở tầng phục vụ chứ không ở client.
3. **Cache tích cực.** Tile là đối tượng bất biến theo `(z, x, y)` — lý tưởng cho CDN.
4. **Tách bản đồ nền và dữ liệu của bạn.** Nền dùng dịch vụ có sẵn; chỉ tự phục vụ phần dữ liệu riêng.
5. **CRS ở tầng vận chuyển gần như luôn là EPSG:3857.** Xem [[Map Tiles and Tiling Schemes]].
6. **Đừng phục vụ dữ liệu thô cho client rồi lọc ở đó.** Lọc ở server.

## 5. Cạm bẫy

- **Gửi GeoJSON quá lớn** — xem callout.
- **Sinh tile động không cache** → tính lại cùng một tile hàng nghìn lần.
- **Không giới hạn zoom.** Yêu cầu tile ở z=22 cho dữ liệu tỉ lệ nhỏ tạo hàng triệu tile vô nghĩa.
- **Đặt logic nghiệp vụ ở client** — người dùng xem được, và dữ liệu phải gửi hết xuống.
- **Bỏ qua CORS** khi phục vụ tile từ domain khác — lỗi kinh điển, chỉ hiện trong console.
- **Dùng GeoServer cho một lớp điểm đơn giản** — quá nặng so với nhu cầu.
- **Quên rằng client là thiết bị của người dùng.** Điện thoại tầm trung không có RAM và GPU như laptop dev.

## 6. Checklist áp dụng

- [ ] Dữ liệu của tôi có bao nhiêu feature — GeoJSON có đủ không, hay cần tile?
- [ ] Dữ liệu **tĩnh** hay **thay đổi liên tục**?
- [ ] Người dùng có cần đổi style / tương tác với từng đối tượng không?
- [ ] Tôi có thật sự cần một máy chủ, hay PMTiles trên CDN là đủ?
- [ ] Tile có được cache ở CDN không?
- [ ] Zoom min/max có được giới hạn hợp lý không?
- [ ] Tôi đã thử trên thiết bị di động và mạng chậm chưa?
- [ ] Có logic nghiệp vụ nào bị lộ ở client không?

## Tham khảo

- [Mapbox — Vector tiles vs raster tiles](https://docs.mapbox.com/help/getting-started/vector-tiles/) — giải thích rõ đánh đổi
- [GEOG 585: Open Web Mapping](https://www.e-education.psu.edu/geog585/node/508) — khoá học **có trong seed**, dạy đúng kiến trúc này
- [Protomaps — Serverless map architecture](https://docs.protomaps.com/) — kiến trúc tĩnh không máy chủ
- [OGC API — Features](https://ogcapi.ogc.org/features/) — chuẩn hiện đại cho tầng API

## Liên kết

[[Map Tiles and Tiling Schemes]] · [[Tile Servers and GeoServer]] · [[MapLibre and Vector Tiles]] · [[Leaflet]] · [[Web Map Performance]] · [[OGC Services]] · [[GIS]]
