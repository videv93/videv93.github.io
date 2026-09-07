---
tags: [gis, data-engineering, quy-mô-lớn]
status: evergreen
---
# Big Geospatial Processing

> Dữ liệu không gian khó phân tán hơn dữ liệu bảng vì **phép không gian cần tính cục bộ**: để biết cái gì gần cái gì, các mảnh dữ liệu gần nhau phải nằm cùng một chỗ. Đó là toàn bộ vấn đề, và mọi công cụ ở đây chỉ là các cách giải nó khác nhau.

## 1. Vấn đề phân vùng không gian

Chia dữ liệu bảng thì ngẫu nhiên cũng được. Chia dữ liệu không gian ngẫu nhiên thì **mọi spatial join biến thành shuffle toàn cục** — cực đắt.

| Chiến lược | Cách | Đặc điểm |
|---|---|---|
| **Grid** | Ô lưới đều | Đơn giản; **lệch tải** nếu dữ liệu tập trung |
| **Space-filling curve** (Hilbert, Z-order) | Sắp theo đường lấp không gian | Cân bằng tốt, giữ tính cục bộ — **mặc định tốt** |
| **H3 / S2 / geohash** | Chỉ mục phân cấp | Khoá join là số nguyên, rất nhanh |
| **KDB-tree / R-tree** | Thích ứng theo mật độ | Cân bằng tốt nhất, tốn công dựng |

> [!note] Sắp theo Hilbert trước khi ghi là tối ưu rẻ nhất
> Chỉ cần `ORDER BY` theo Hilbert curve trước khi ghi GeoParquet, mỗi row-group sẽ có bounding box hẹp → predicate pushdown loại được phần lớn dữ liệu. Với nhiều workload, việc này nhanh hơn cả việc thêm máy. Xem [[Cloud Native Geospatial Formats]].

## 2. Bảng công cụ

| Công cụ | Mô hình | Quy mô | Ghi chú |
|---|---|---|---|
| **PostGIS** | CSDL đơn | Triệu–chục triệu | **Thử tối ưu nó trước** |
| **DuckDB spatial** | Nhúng, out-of-core | Triệu–trăm triệu | Không hạ tầng; thường là câu trả lời |
| **Dask-GeoPandas** | Phân tán Python | Trăm triệu | Giữ API GeoPandas |
| **Apache Sedona** | Spark | Tỉ+ | Chuẩn de facto cho Spark không gian |
| **BigQuery / Snowflake** | Warehouse | Tỉ+ | SQL, trả tiền theo quét — [[Spatial SQL in Cloud Warehouses]] |
| **xarray + Dask** | Mảng nhiều chiều | Raster lớn | Cho EO — [[Earth Observation Data Cubes]] |

## 3. Thang leo — theo đúng thứ tự

```
1. Tối ưu PostGIS: index, ST_Subdivide, simplify, materialized view
   → [[PostGIS Performance Tuning]]
2. Chuyển sang GeoParquet + DuckDB trên một máy
3. Sắp theo không gian (Hilbert) + phân vùng
4. Dask-GeoPandas (nhiều core / nhiều máy)
5. Sedona / warehouse (cluster thật)
```

> [!warning] Đừng nhảy thẳng xuống bước 5
> Phần lớn bài toán "cần big data" dừng ở bước 2 hoặc 3. Một máy 64 GB RAM với GeoParquet và DuckDB xử lý được lượng dữ liệu mà nhiều người tưởng phải cần cluster — và chi phí vận hành cluster (thời gian dựng, gỡ lỗi, tiền) thường vượt xa lợi ích. Xem [[Geospatial Python Performance]].

## 4. Kỹ thuật

```python
# Sắp theo Hilbert trước khi ghi — tăng tính cục bộ
gdf = gdf.sort_values(by=gdf.geometry.hilbert_distance())
gdf.to_parquet("out.parquet", row_group_size=100_000)
```

```sql
-- Sedona: spatial join có phân vùng
SELECT p.id, d.name
FROM points p JOIN districts d
ON ST_Intersects(d.geom, p.geom);   -- Sedona tự chọn chiến lược phân vùng
```

**Broadcast join**: khi một bên nhỏ (vài nghìn polygon hành chính) và bên kia khổng lồ, gửi bên nhỏ tới mọi worker thay vì shuffle cả hai. Đây là tối ưu quan trọng nhất trong spatial join phân tán.

**Xử lý biên**: khi chia theo vùng, đối tượng gần biên cần dữ liệu của vùng kế bên. Giải pháp: **buffer mỗi phân vùng** rồi khử trùng lặp kết quả.

## 5. Cạm bẫy

- **Phân tán quá sớm.** Chi phí điều phối vượt lợi ích với dữ liệu vừa.
- **Phân vùng ngẫu nhiên** → shuffle toàn cục ở mọi spatial join.
- **Lệch tải (skew).** Một phân vùng chứa trung tâm Hà Nội, các phân vùng khác gần rỗng → một worker chạy mãi.
- **Không xử lý biên phân vùng** → mất kết quả ở ranh giới, âm thầm.
- **Hình học lớn phá phân vùng.** Một polygon quốc gia thuộc về mọi phân vùng.
- **Serialize hình học tốn kém.** WKB rẻ hơn nhiều so với pickle object Python.
- **Egress và chi phí lưu trữ** bị bỏ qua khi tính chi phí.
- **Không kiểm kết quả với bản chạy nhỏ.** Luôn đối chiếu kết quả phân tán với kết quả PostGIS trên một mẫu.

## 6. Checklist áp dụng

- [ ] Tôi đã tối ưu PostGIS/một máy hết mức chưa?
- [ ] DuckDB + GeoParquet có đủ không?
- [ ] Dữ liệu có được **sắp theo không gian** không?
- [ ] Chiến lược phân vùng là gì — và có bị lệch tải không?
- [ ] Đối tượng ở **biên phân vùng** có được xử lý không?
- [ ] Bên nhỏ trong join có được broadcast không?
- [ ] Hình học lớn có được `ST_Subdivide` trước không?
- [ ] Tôi đã đối chiếu kết quả với bản chạy nhỏ chưa?
- [ ] Chi phí (compute + storage + egress) có được ước lượng chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Apache Sedona | Không gian trên Spark | [sedona.apache.org](https://sedona.apache.org/) |
| DuckDB spatial | Out-of-core một máy | [duckdb.org/docs/extensions/spatial](https://duckdb.org/docs/stable/extensions/spatial) |
| Dask-GeoPandas | GeoPandas phân tán | [dask-geopandas.readthedocs.io](https://dask-geopandas.readthedocs.io/) |
| H3 | Chỉ mục phân cấp làm khoá phân vùng | [h3geo.org](https://h3geo.org/) |

## Tham khảo

- [Apache Sedona documentation](https://sedona.apache.org/latest/) — phân vùng không gian và join phân tán
- [DuckDB spatial extension](https://duckdb.org/docs/stable/extensions/spatial)
- [GeoParquet specification](https://geoparquet.org/) — định dạng nền cho mọi thứ ở note này
- [GeoPySpark](https://github.com/locationtech-labs/geopyspark) — **có trong seed**, tiền thân của hướng tiếp cận này

## Liên kết

[[Geospatial Python Performance]] · [[Cloud Native Geospatial Formats]] · [[Spatial SQL in Cloud Warehouses]] · [[PostGIS Performance Tuning]] · [[Earth Observation Data Cubes]] · [[GIS]]
