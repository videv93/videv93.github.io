---
tags: [gis, postgis, raster]
status: evergreen
---
# Raster in PostGIS

> `postgis_raster` cho phép lưu và truy vấn raster **trong CSDL**, ghép trực tiếp với vector bằng SQL. Nó mạnh hơn người ta tưởng — và bị dùng sai nhiều hơn người ta tưởng. Note này chủ yếu để giúp bạn quyết định **có nên dùng nó không**.

## 1. Hai chế độ lưu

| Chế độ | Cách | Ưu | Nhược |
|---|---|---|---|
| **In-database** | Chia raster thành tile, lưu vào cột `raster` | Transaction, backup, quyền, join SQL | CSDL phình rất nhanh |
| **Out-db** | Chỉ lưu **đường dẫn** tới file, đọc khi cần | CSDL nhỏ, dùng được COG | Phải quản lý file rời; đường dẫn dễ gãy |

```bash
# Nạp raster, chia tile 256x256, kèm overview mức 2/4/8, tạo index
raster2pgsql -s 32648 -I -C -M -t 256x256 -l 2,4,8 dem.tif public.dem | psql -d gisdb

# Out-db: chỉ lưu tham chiếu (-R)
raster2pgsql -s 32648 -I -C -R /data/dem.tif public.dem_ref | psql -d gisdb
```

## 2. Điểm mạnh thật sự: ghép raster × vector trong một truy vấn

```sql
-- Độ cao trung bình mỗi xã — vector và raster trong cùng một câu SQL
SELECT c.id, c.name,
       (ST_SummaryStats(ST_Clip(r.rast, c.geom, true))).mean AS elev_mean
FROM communes c
JOIN dem r ON ST_Intersects(r.rast, c.geom);

-- Lấy giá trị raster tại từng điểm
SELECT p.id, ST_Value(r.rast, p.geom) AS elevation
FROM points p JOIN dem r ON ST_Intersects(r.rast, p.geom);

-- Map algebra trong SQL
SELECT ST_MapAlgebra(r.rast, 1, NULL, '[rast] * 0.0001') FROM scenes r;
```

Đây là lợi thế khó thay thế: **không phải kéo dữ liệu ra khỏi CSDL** để làm zonal statistics. Xem [[Raster Algebra and Zonal Statistics]].

## 3. Khi nào **không** nên dùng

> [!warning] Đây là phần quan trọng nhất của note này
> `postgis_raster` phù hợp với **raster vừa phải, truy vấn cùng vector, cần tính nhất quán giao dịch**. Nó **không** phù hợp với xử lý ảnh viễn thám quy mô lớn — nơi COG trên object storage cộng [[Rasterio]] hoặc [[Earth Observation Data Cubes]] đơn giản hơn, rẻ hơn và mở rộng tốt hơn nhiều.

| Tình huống | Nên dùng |
|---|---|
| DEM một tỉnh, cần zonal stats theo ranh giới hành chính | ✅ postgis_raster |
| Cần quyền/transaction/backup chung với dữ liệu vector | ✅ postgis_raster |
| Chuỗi thời gian ảnh Sentinel-2 nhiều năm | ❌ → COG + STAC + Zarr |
| Phục vụ tile ảnh cho web | ❌ → COG + TiTiler |
| Xử lý ảnh nặng (phân loại, ML) | ❌ → [[Rasterio]], [[Big Geospatial Processing]] |
| Raster chỉ đọc, ít đổi, rất lớn | ❌ → out-db hoặc COG ngoài CSDL |

## 4. Cạm bẫy

- **Nạp raster lớn in-db** làm CSDL phình hàng chục GB và backup trở nên đau đớn.
- **Quên `-t` (tile).** Không chia tile thì mỗi hàng chứa cả ảnh — mất hoàn toàn lợi ích index.
- **Quên `-I` (index) và `-C` (constraint).** Thiếu constraint thì `raster_columns` không có thông tin và planner ước lượng sai.
- **Không tạo overview (`-l`)** → xem toàn cảnh rất chậm.
- **Out-db với đường dẫn tuyệt đối** gãy khi chuyển máy hoặc container. Dùng đường dẫn nhất quán và kiểm trong CI.
- **`ST_Clip` không có `croptorast=true`** → giữ nguyên phạm vi raster, thống kê tính cả vùng ngoài.
- **NoData không được khai báo** → giá trị lấp đầy vào thống kê. Xem [[Raster Formats and COG]].
- **Trộn raster khác CRS** trong cùng bảng.

## 5. Checklist áp dụng

- [ ] Tôi đã cân nhắc COG + Rasterio trước khi chọn postgis_raster chưa?
- [ ] Raster có được chia tile (`-t`) không?
- [ ] Có index (`-I`) và constraint (`-C`) không?
- [ ] Có overview (`-l`) cho hiển thị toàn cảnh không?
- [ ] NoData có được khai báo đúng không?
- [ ] Nếu out-db: đường dẫn có ổn định giữa các môi trường không?
- [ ] `ST_Clip` có dùng `croptorast=true` khi cần không?
- [ ] Kích thước CSDL sau khi nạp có chấp nhận được không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `raster2pgsql` | Nạp raster vào PostGIS | [postgis.net](https://postgis.net/docs/using_raster_dataman.html) |
| `ST_SummaryStats` / `ST_Clip` / `ST_Value` | Thống kê vùng, cắt, lấy giá trị | [postgis.net](https://postgis.net/docs/RT_reference.html) |
| `raster_columns` | Kiểm kê raster trong CSDL | [postgis.net](https://postgis.net/docs/RT_reference.html) |
| TiTiler | Phục vụ COG — lựa chọn thay thế | [developmentseed.org/titiler](https://developmentseed.org/titiler/) |

## Tham khảo

- [PostGIS Raster documentation](https://postgis.net/docs/RT_reference.html) — tham chiếu hàm raster đầy đủ
- [PostGIS — Raster Data Management](https://postgis.net/docs/using_raster_dataman.html) — nạp và quản lý raster
- [rasterio documentation](https://rasterio.readthedocs.io/) — lựa chọn thay thế phía Python
- [Cloud Optimized GeoTIFF](https://cogeo.org/) — lựa chọn thay thế phía lưu trữ

## Liên kết

[[Raster Algebra and Zonal Statistics]] · [[Raster Formats and COG]] · [[Rasterio]] · [[PostGIS Core Types]] · [[Digital Elevation Models]] · [[GIS]]
