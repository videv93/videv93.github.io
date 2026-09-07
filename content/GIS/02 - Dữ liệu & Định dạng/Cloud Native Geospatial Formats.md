---
tags: [gis, định-dạng, cloud]
status: evergreen
---
# Cloud Native Geospatial Formats

> Ý tưởng chung của cả họ định dạng này gói trong một câu: **sắp xếp file sao cho đọc được một phần nhỏ của nó qua HTTP range request, không cần tải cả file.** Đó là toàn bộ khác biệt — và nó đổi hoàn toàn cách xây pipeline không gian.

## 1. Vấn đề nó giải

| Cách cũ | Cách cloud-native |
|---|---|
| Tải cả file 20 GB về đĩa | Đọc **vài MB** đúng chỗ cần qua HTTP |
| Cần máy chủ có dữ liệu cục bộ | Dữ liệu nằm trên object storage (S3/GCS) |
| Phải giải nén toàn bộ | Đọc theo khối/hàng độc lập |
| Mở rộng bằng máy to hơn | Mở rộng bằng nhiều worker đọc song song |

Điều kiện kỹ thuật để một định dạng "cloud-native": **có index/metadata ở đầu file**, **dữ liệu chia khối độc lập**, và **hỗ trợ HTTP range request**.

## 2. Bảng định dạng

| Định dạng | Kiểu dữ liệu | Thay thế cho | Điểm mạnh |
|---|---|---|---|
| **COG** (Cloud Optimized GeoTIFF) | Raster | GeoTIFF thường | Tile nội bộ + overview; chuẩn OGC. Xem [[Raster Formats and COG]] |
| **GeoParquet** | Vector | [[Shapefile]], CSV | Cột hoá, nén mạnh, đọc bằng công cụ dữ liệu thường |
| **FlatGeobuf** | Vector | [[GeoJSON]] | Index R-tree gắn sẵn, streaming, đơn giản |
| **PMTiles** | Tile | Tile server | **Một file tile tĩnh** — không cần server |
| **Zarr** | Mảng N chiều | NetCDF/HDF5 | Dữ liệu khí hậu, chuỗi thời gian, chia khối |
| **STAC** | *Metadata* | Catalogue tự chế | Chuẩn mô tả và tìm kiếm ảnh. Xem [[Spatial Metadata]] |

> [!note] PMTiles đổi kiến trúc web GIS nhiều nhất
> Một file `.pmtiles` đặt trên S3 + CDN phục vụ được toàn bộ bản đồ vector tile **không cần máy chủ nào chạy**. Nó thay thế cả một tầng hạ tầng bằng một object tĩnh. Xem [[Tile Servers and GeoServer]] để so sánh với cách truyền thống.

### GeoParquet đáng chú ý riêng

Parquet là định dạng cột chuẩn của thế giới dữ liệu (Spark, DuckDB, BigQuery, pandas). GeoParquet chỉ thêm quy ước lưu hình học (WKB) và metadata CRS. Hệ quả:

- Dữ liệu không gian đọc được bằng **công cụ dữ liệu thường**, không cần stack GIS riêng.
- Nén tốt hơn nhiều so với GeoJSON hay Shapefile.
- **Predicate pushdown**: chỉ đọc cột và row-group cần.
- Ghép thẳng vào lakehouse, xem [[Big Geospatial Processing]].

```python
import geopandas as gpd
gdf = gpd.read_parquet("s3://bucket/parcels.parquet")  # đọc trực tiếp từ cloud
gdf.to_parquet("out.parquet")
```

```sql
-- DuckDB đọc thẳng từ HTTP, không tải cả file
INSTALL spatial; LOAD spatial;
SELECT COUNT(*) FROM 's3://bucket/buildings/*.parquet' WHERE country = 'VN';
```

## 3. Cạm bẫy

- **"Tôi để file trên S3" ≠ cloud-native.** Một GeoTIFF thường trên S3 vẫn phải tải hết. Phải là **COG** (kiểm bằng `rio cogeo validate`).
- **Quá nhiều file nhỏ.** Hàng trăm nghìn file 100 KB làm chi phí request và độ trễ vượt lợi ích. Gộp thành file lớn hơn có row-group hợp lý (thường 100–500 MB/file).
- **Không phân vùng theo không gian.** GeoParquet chỉ nhanh khi dữ liệu được sắp theo địa lý (Hilbert/S2/geohash) để row-group có bounding box hẹp. Không sắp thì mọi truy vấn đọc gần như toàn bộ.
- **Chi phí egress.** Đọc từ cloud là miễn phí về hạ tầng, không miễn phí về hoá đơn. Đặt tính toán cùng vùng với dữ liệu.
- **GeoParquet vẫn đang tiến hoá.** Phiên bản đặc tả và cách lưu CRS đã thay đổi qua các bản; ghi rõ phiên bản trong metadata. Xem [[Roadmap Half-Life]].
- **Không phải mọi công cụ desktop đọc được.** Hỗ trợ phụ thuộc phiên bản GDAL; kiểm trước khi chuẩn hoá cả tổ chức.

## 4. Checklist áp dụng

- [ ] Raster của tôi có phải COG thật không? (`rio cogeo validate`)
- [ ] Dữ liệu vector lớn có ở GeoParquet thay vì Shapefile/GeoJSON không?
- [ ] Dữ liệu có được **sắp theo không gian** trước khi ghi Parquet không?
- [ ] Kích thước file có nằm trong khoảng hợp lý (không quá nhỏ, không quá to)?
- [ ] Tính toán có chạy **cùng vùng** với object storage không?
- [ ] Tôi có ghi phiên bản đặc tả GeoParquet/STAC vào metadata không?
- [ ] Nếu chỉ phục vụ tile: PMTiles có thay được cả một tile server không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `rio cogeo` | Tạo và kiểm tra COG | [cogeotiff.github.io](https://cogeotiff.github.io/rio-cogeo/) |
| DuckDB spatial | Truy vấn GeoParquet tại chỗ | [duckdb.org/docs/extensions/spatial](https://duckdb.org/docs/stable/extensions/spatial) |
| `tippecanoe` + `pmtiles` | Tạo vector tile và đóng gói PMTiles | [github.com/protomaps/PMTiles](https://github.com/protomaps/PMTiles) |
| `gpq` | Kiểm tra/chuyển đổi GeoParquet | [github.com/planetlabs/gpq](https://github.com/planetlabs/gpq) |

## Tham khảo

- [Cloud Native Geospatial Foundation](https://cloudnativegeo.org/) — tổ chức điều phối cả họ chuẩn này
- [GeoParquet specification](https://geoparquet.org/) — đặc tả chính thức
- [Cloud Optimized GeoTIFF](https://cogeo.org/) — chuẩn COG
- [PMTiles specification](https://github.com/protomaps/PMTiles/blob/main/spec/v3/spec.md) — đặc tả tile một file
- [STAC specification](https://stacspec.org/) — chuẩn catalogue đi kèm

## Liên kết

[[Raster Formats and COG]] · [[Spatial Metadata]] · [[Big Geospatial Processing]] · [[Spatial SQL in Cloud Warehouses]] · [[Earth Observation Data Cubes]] · [[GIS]]
