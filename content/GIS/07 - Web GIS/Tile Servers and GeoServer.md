---
tags: [gis, web, server]
status: evergreen
---
# Tile Servers and GeoServer

> Tầng giữa: biến dữ liệu trong CSDL hoặc file thành thứ trình duyệt tải được. Lựa chọn ở đây trải từ **"không có máy chủ nào"** tới **"một ứng dụng Java đầy đủ"** — và phần lớn dự án chọn nặng hơn mức cần.

## 1. Bảng lựa chọn

| Công cụ | Phục vụ gì | Nguồn | Độ nặng |
|---|---|---|---|
| **PMTiles trên CDN** | Vector/raster tile tĩnh | File | ⭐ **Không có server** |
| **pg_tileserv** | Vector tile từ PostGIS | PostGIS | ⭐ Rất nhẹ |
| **Martin** | Vector tile (Rust, rất nhanh) | PostGIS, PMTiles, MBTiles | ⭐ Rất nhẹ |
| **TiTiler** | Tile động từ COG | COG / STAC | ⭐⭐ Nhẹ |
| **pg_featureserv** | OGC API Features | PostGIS | ⭐ Nhẹ |
| **pygeoapi** | OGC API đầy đủ | Nhiều nguồn | ⭐⭐ Vừa |
| **MapServer** | WMS/WFS (C, nhanh) | Nhiều nguồn | ⭐⭐ Vừa |
| **GeoServer** | WMS/WFS/WMTS/WCS **đầy đủ** | Rất nhiều nguồn | ⭐⭐⭐⭐ Nặng |
| **ArcGIS Server** | Hệ ESRI | Geodatabase | ⭐⭐⭐⭐⭐ Rất nặng |

## 2. Cây quyết định

```
Dữ liệu có thay đổi thường xuyên không?
├── KHÔNG → PMTiles trên S3 + CDN.  ✅ Dừng ở đây. Không cần máy chủ.
└── CÓ → Cần chuẩn OGC (WMS/WFS) không?
     ├── KHÔNG → Dữ liệu ở đâu?
     │    ├── PostGIS  → Martin hoặc pg_tileserv
     │    └── COG      → TiTiler
     └── CÓ → Cần bao nhiêu chuẩn?
          ├── Chỉ Features → pg_featureserv / pygeoapi
          └── Đầy đủ + quản trị GUI → GeoServer
```

> [!note] Bắt đầu từ trên xuống, không phải từ dưới lên
> Rất nhiều dự án mở đầu bằng "dựng GeoServer" vì đó là cái tên quen thuộc nhất. Nhưng nếu dữ liệu tĩnh, **một file PMTiles trên S3** làm được cùng việc với chi phí vận hành bằng không — không JVM, không cấu hình, không vá bảo mật, không downtime. Xem [[Cloud Native Geospatial Formats]].

## 3. GeoServer — khi nào nó đúng

**Điểm mạnh thật:**
- Hỗ trợ **mọi** chuẩn OGC — xem [[OGC Services]]
- Giao diện quản trị: thêm lớp, đặt style (SLD), phân quyền, không cần code
- Kết nối rất nhiều nguồn: PostGIS, Shapefile, GeoTIFF, WMS cascade, Oracle
- Tích hợp GeoWebCache để cache tile
- Cộng đồng và tài liệu lâu đời

**Chi phí thật:**
- JVM — tiêu thụ bộ nhớ đáng kể ngay cả khi rảnh
- Cấu hình phức tạp; hiệu năng phụ thuộc tinh chỉnh JVM
- Style bằng **SLD (XML)** — dài dòng so với style JSON của [[MapLibre and Vector Tiles]]
- Là một ứng dụng web cần vá bảo mật định kỳ

**Dùng GeoServer khi:** cần OGC đầy đủ, có nhiều nguồn dữ liệu khác nhau, cần người không lập trình quản lý lớp qua giao diện, hoặc yêu cầu ghi rõ trong hợp đồng.

## 4. Cache — quyết định quan trọng nhất về hiệu năng

Tile là đối tượng **bất biến** theo `(z, x, y)` → lý tưởng cho cache nhiều tầng:

| Tầng | Công cụ | Ghi chú |
|---|---|---|
| CDN | CloudFlare, CloudFront | Rẻ nhất, hiệu quả nhất |
| Reverse proxy | Nginx, Varnish | Kiểm soát tốt |
| Tile cache | GeoWebCache, mod_tile | Dựng sẵn tile phổ biến |
| Ứng dụng | Redis | Cho API động |

**Chiến lược invalidation** phải quyết định từ đầu: TTL ngắn (đơn giản, dữ liệu hơi cũ) hay purge chủ động khi dữ liệu đổi (phức tạp, luôn mới).

## 5. Cạm bẫy

- **Dựng GeoServer cho dữ liệu tĩnh** — xem callout.
- **Không cache tile động** → CSDL nhận toàn bộ tải, sập khi có traffic.
- **Không giới hạn zoom** → yêu cầu tile vô hạn ở zoom sâu.
- **Phơi PostGIS trực tiếp ra internet.** Đặt tile server ở giữa; đừng cho client nói chuyện thẳng với CSDL.
- **Quên CORS** → client web không gọi được.
- **Không giới hạn kích thước request WFS/WMS** → một request có thể làm nghẽn server.
- **Style SLD phức tạp làm chậm render** — đơn giản hoá hoặc chuyển sang vector tile để style ở client.
- **Quên rằng tile server cần dữ liệu ở EPSG:3857** — transform ở bước sinh tile, không sớm hơn. Xem [[Map Tiles and Tiling Schemes]].

## 6. Checklist áp dụng

- [ ] Dữ liệu có thật sự cần phục vụ **động** không?
- [ ] Tôi đã cân nhắc PMTiles tĩnh trước chưa?
- [ ] Tôi có cần chuẩn OGC, hay chỉ cần tile cho ứng dụng của mình?
- [ ] Cache đã được cấu hình ở tầng nào?
- [ ] Chiến lược invalidation là gì?
- [ ] Zoom min/max đã giới hạn chưa?
- [ ] CSDL có bị phơi trực tiếp không?
- [ ] CORS đã bật chưa?
- [ ] Tôi đã thử tải với lưu lượng thật chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Martin | Vector tile server rất nhanh | [martin.maplibre.org](https://martin.maplibre.org/) |
| pg_tileserv / pg_featureserv | Tile và Features từ PostGIS | [github.com/CrunchyData/pg_tileserv](https://github.com/CrunchyData/pg_tileserv) |
| TiTiler | Tile động từ COG/STAC | [developmentseed.org/titiler](https://developmentseed.org/titiler/) |
| GeoServer | Máy chủ OGC đầy đủ | [geoserver.org](https://geoserver.org/) |
| MapServer | Máy chủ OGC nhẹ hơn, viết bằng C | [mapserver.org](https://mapserver.org/) |

## Tham khảo

- [GeoServer documentation](https://docs.geoserver.org/) — tài liệu chính thức
- [Martin documentation](https://maplibre.org/martin/) — tile server hiện đại từ PostGIS
- [TiTiler documentation](https://developmentseed.org/titiler/) — phục vụ COG động
- [GEOG 585: Open Web Mapping](https://www.e-education.psu.edu/geog585/node/508) — khoá **có trong seed**, dạy GeoServer và TileMill

## Liên kết

[[Web Mapping Architecture]] · [[OGC Services]] · [[Map Tiles and Tiling Schemes]] · [[Web Map Performance]] · [[Cloud Native Geospatial Formats]] · [[GIS]]
