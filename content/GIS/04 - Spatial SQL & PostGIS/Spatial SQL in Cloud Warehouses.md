---
tags: [gis, sql, cloud]
status: evergreen
---
# Spatial SQL in Cloud Warehouses

> Seed roadmap liệt kê **CS145 (BigQuery)** ở cả mục Databases lẫn Spatial SQL — một gợi ý đúng mà nó không giải thích: phân tích không gian ở quy mô tỉ dòng ngày càng diễn ra trong data warehouse, không phải trong PostGIS. Note này so sánh trung thực để bạn biết khi nào chuyển.

## 1. So sánh nền tảng

| | **PostGIS** | **BigQuery GIS** | **Snowflake** | **DuckDB spatial** |
|---|---|---|---|---|
| Mô hình | CSDL giao dịch | Warehouse phân tán | Warehouse phân tán | **Nhúng, chạy tại chỗ** |
| Quy mô | Triệu–chục triệu | **Tỉ+** | **Tỉ+** | Triệu–trăm triệu |
| Số hàm không gian | **Rất nhiều** (~300) | Hạn chế hơn nhiều | Hạn chế hơn | Trung bình, tăng nhanh |
| Mô hình hình học | Phẳng **và** ellipsoid | **Chỉ trắc địa** (hình cầu) | Cả hai | Phẳng |
| Index | GiST tường minh | Tự động (S2) | Tự động | Không cần khai báo |
| Raster | Có | Không | Không | Hạn chế |
| Chi phí | Máy chủ | **Theo lượng quét** | Theo compute | **Gần như miễn phí** |
| Ghi/sửa | Đầy đủ | Kém | Trung bình | Tốt (local) |

> [!warning] BigQuery GIS chỉ dùng mô hình trắc địa
> `ST_GEOGPOINT` luôn ở WGS 84 và mọi phép đo là **trắc địa trên hình cầu**. Không có khái niệm "reproject sang UTM rồi đo phẳng". Hệ quả: một số kết quả sẽ **khác** PostGIS ở chữ số thập phân, và một vài kỹ thuật quen thuộc (buffer bằng mét sau khi transform) không áp dụng được. Xem [[Geodesic vs Planar Measurement]].

## 2. DuckDB — thay đổi đáng chú ý nhất

DuckDB spatial chạy **trong tiến trình của bạn**, không cần server, và đọc thẳng GeoParquet từ cloud:

```sql
INSTALL spatial; LOAD spatial;
INSTALL httpfs;  LOAD httpfs;

-- Đọc trực tiếp từ S3, chỉ tải phần cần
SELECT COUNT(*) FROM read_parquet('s3://bucket/buildings/*.parquet')
WHERE ST_Within(geom, ST_GeomFromText('POLYGON((...))'));

-- Đọc Shapefile/GPKG qua GDAL, ghi ra GeoParquet
COPY (SELECT * FROM ST_Read('input.shp'))
TO 'output.parquet' (FORMAT PARQUET);
```

Với dữ liệu tới hàng trăm triệu hàng và workload **chỉ đọc**, DuckDB thường nhanh hơn PostGIS mà không cần vận hành gì. Nó đang lấp đúng khoảng giữa "quá lớn cho pandas" và "chưa đáng dựng cluster". Xem [[Cloud Native Geospatial Formats]] và [[Big Geospatial Processing]].

## 3. BigQuery GIS

```sql
-- Join không gian tỉ dòng
SELECT d.name, COUNT(*) AS n
FROM `project.dataset.points` p
JOIN `project.dataset.districts` d
  ON ST_CONTAINS(d.geog, p.geog)
GROUP BY d.name;

-- Chỉ mục S2 để giảm lượng quét (chi phí!)
SELECT * FROM `project.dataset.points`
WHERE ST_DWITHIN(geog, ST_GEOGPOINT(105.85, 21.03), 1000);
```

Chi phí tính theo **byte quét**, nên tối ưu ở đây khác hẳn PostGIS: mục tiêu không phải "dùng index" mà là **"quét ít cột và ít phân vùng"**. Clustering theo cột không gian và phân vùng theo ngày là hai đòn bẩy chính.

## 4. Khi nào chuyển khỏi PostGIS

| Dấu hiệu | Chuyển sang |
|---|---|
| Dữ liệu > vài trăm triệu hàng, chủ yếu đọc | BigQuery / Snowflake |
| Cần join với dữ liệu phi không gian khổng lồ đã ở warehouse | Warehouse |
| Phân tích một lần trên file lớn, không muốn dựng hạ tầng | **DuckDB** |
| Cần hàm không gian phong phú, raster, topology | **Ở lại PostGIS** |
| Cần ghi/sửa giao dịch | **Ở lại PostGIS** |
| Cần routing | **Ở lại PostGIS** (pgRouting) |

## 5. Cạm bẫy

- **Cho rằng hàm cùng tên hoạt động giống nhau.** `ST_Distance` ở PostGIS (phẳng, đơn vị SRID) và BigQuery (trắc địa, mét) cho số khác nhau. Luôn kiểm bằng một ví dụ đã biết đáp án.
- **Chi phí quét bất ngờ.** Một truy vấn không gian thiếu bộ lọc phân vùng có thể quét toàn bảng và tạo hoá đơn đáng kể. Đặt hạn mức.
- **Chuyển toàn bộ workload vì một truy vấn chậm.** Thường tối ưu PostGIS rẻ hơn nhiều — xem [[PostGIS Performance Tuning]].
- **Mất tính hợp lệ hình học khi chuyển.** Warehouse thường **từ chối** hình học không hợp lệ mà PostGIS chấp nhận. Làm sạch trước — [[Geometry Validity and Topology]].
- **Quên rằng warehouse không phải nơi ghi thường xuyên.** UPDATE từng hàng rất đắt.
- **DuckDB spatial vẫn đang phát triển nhanh** — tập hàm và hành vi đổi giữa các phiên bản. Ghim phiên bản. Xem [[Roadmap Half-Life]].

## 6. Checklist áp dụng

- [ ] Quy mô dữ liệu của tôi có thật sự vượt PostGIS không, hay chỉ là truy vấn chưa tối ưu?
- [ ] Workload là **đọc nhiều** hay có ghi thường xuyên?
- [ ] Tôi có cần hàm nào chỉ PostGIS mới có không (raster, routing, topology)?
- [ ] Tôi đã kiểm kết quả bằng một ví dụ có đáp án biết trước ở cả hai nền tảng chưa?
- [ ] Hình học đã hợp lệ trước khi nạp vào warehouse chưa?
- [ ] Tôi có đặt hạn mức chi phí quét không?
- [ ] DuckDB có giải quyết được việc này mà không cần hạ tầng nào không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| DuckDB spatial | Phân tích không gian tại chỗ | [duckdb.org/docs/extensions/spatial](https://duckdb.org/docs/stable/extensions/spatial) |
| BigQuery GIS | Không gian ở quy mô warehouse | [cloud.google.com/bigquery/docs/geospatial-intro](https://cloud.google.com/bigquery/docs/geospatial-intro) |
| Snowflake geospatial | Tương tự trên Snowflake | [docs.snowflake.com](https://docs.snowflake.com/en/sql-reference/data-types-geospatial) |
| Apache Sedona | Không gian trên Spark | [[Big Geospatial Processing]] |

## Tham khảo

- [BigQuery — Geospatial analytics introduction](https://cloud.google.com/bigquery/docs/geospatial-intro) — mô hình dữ liệu và tập hàm
- [DuckDB — Spatial Extension](https://duckdb.org/docs/stable/extensions/spatial) — tài liệu chính thức
- [Snowflake — Geospatial data types](https://docs.snowflake.com/en/sql-reference/data-types-geospatial)
- [S2 Geometry Library](http://s2geometry.io/) — hệ chỉ mục nền của BigQuery GIS

## Liên kết

[[Spatial SQL Query Patterns]] · [[Big Geospatial Processing]] · [[Cloud Native Geospatial Formats]] · [[PostGIS Performance Tuning]] · [[Geodesic vs Planar Measurement]] · [[GIS]]
