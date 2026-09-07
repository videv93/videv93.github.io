---
tags: [gis, postgis, hiệu-năng]
status: evergreen
---
# PostGIS Performance Tuning

> Truy vấn không gian chậm gần như luôn vì **một trong bốn lý do**, theo đúng thứ tự tần suất: không dùng index, hình học quá nhiều đỉnh, tính lại thứ đáng lẽ nên lưu sẵn, hoặc cấu hình PostgreSQL mặc định. Chẩn đoán theo thứ tự này.

## 1. Quy trình chẩn đoán

```sql
-- Bước 1: kế hoạch thật, không phải ước lượng
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) <truy vấn của bạn>;
```

Đọc ba thứ, theo thứ tự:

| Tìm gì | Nghĩa | Sửa |
|---|---|---|
| `Seq Scan` trên bảng lớn | Index không được dùng | [[Spatial Indexing with GiST]] |
| `Rows Removed by Filter` rất lớn | Pha recheck làm việc quá nhiều | `ST_Subdivide`, simplify |
| Ước lượng lệch xa thực tế | Thống kê cũ | `ANALYZE` |
| `Nested Loop` trên hai bảng lớn | Thiếu bộ lọc | Thêm điều kiện, xem lại join |

## 2. Bốn nguyên nhân, theo tần suất

### 2.1 Không dùng index
Xem [[Spatial Indexing with GiST]]. Kiểm trước tiên, luôn.

### 2.2 Hình học quá nhiều đỉnh

```sql
-- Tìm thủ phạm
SELECT id, ST_NPoints(geom) AS n
FROM parcels ORDER BY n DESC LIMIT 20;
```

| Cách xử lý | Khi nào |
|---|---|
| `ST_Subdivide(geom, 256)` | Polygon lớn dùng nhiều lần trong join |
| `ST_Simplify` / `ST_SimplifyPreserveTopology` | Khi độ chính xác cho phép |
| Lưu cột simplify riêng theo mức zoom | Phục vụ web — [[Web Map Performance]] |

### 2.3 Tính lại thứ nên lưu sẵn

Đây là chỗ dễ thắng lớn nhất mà ít người làm:

```sql
-- Lưu sẵn các giá trị dùng thường xuyên
ALTER TABLE parcels ADD COLUMN area_m2 double precision;
UPDATE parcels SET area_m2 = ST_Area(geom);

-- Cột đã transform sẵn, có index riêng (đổi dung lượng lấy tốc độ)
ALTER TABLE parcels ADD COLUMN geom_3857 geometry(MultiPolygon, 3857);
UPDATE parcels SET geom_3857 = ST_Transform(geom, 3857);
CREATE INDEX ON parcels USING GIST (geom_3857);

-- Materialized view cho phép gộp nặng chạy lặp lại
CREATE MATERIALIZED VIEW district_stats AS
SELECT d.id, COUNT(p.id) AS n, SUM(p.area_m2) AS total
FROM districts d LEFT JOIN parcels p ON ST_Covers(d.geom, p.geom)
GROUP BY d.id;
CREATE UNIQUE INDEX ON district_stats (id);
REFRESH MATERIALIZED VIEW CONCURRENTLY district_stats;
```

### 2.4 Cấu hình PostgreSQL mặc định

Mặc định của PostgreSQL rất bảo thủ. Với workload không gian, các tham số đáng chú ý:

| Tham số | Ghi chú cho workload không gian |
|---|---|
| `shared_buffers` | Thường đặt ~25% RAM |
| `work_mem` | Phép không gian ngốn nhiều; đặt quá thấp gây ghi tạm ra đĩa |
| `maintenance_work_mem` | Ảnh hưởng lớn tới tốc độ `CREATE INDEX` và `VACUUM` |
| `effective_cache_size` | Giúp planner ước lượng đúng, thường ~50–75% RAM |
| `random_page_cost` | Trên SSD nên giảm xuống gần `seq_page_cost` |
| `max_parallel_workers_per_gather` | Nhiều phép không gian song song hoá tốt |

> [!warning] Đừng chỉnh cấu hình trước
> Nó là nguyên nhân **ít khả năng nhất** trong bốn cái. Chỉnh `work_mem` không cứu được một truy vấn đang seq scan 10 triệu polygon. Đi theo thứ tự 2.1 → 2.4.

## 3. Kỹ thuật cho quy mô lớn

| Kỹ thuật | Khi nào |
|---|---|
| **Partition theo không gian hoặc thời gian** | Bảng > hàng chục triệu dòng |
| **Clustering theo index không gian** (`CLUSTER`) | Đọc theo vùng chiếm ưu thế; sắp dữ liệu vật lý theo vị trí |
| **Sắp theo Hilbert curve** trước khi nạp | Tăng tính cục bộ của I/O, mở đường cho BRIN |
| **Bảng tổng hợp theo mức zoom** | Phục vụ tile |
| **Đẩy sang engine phân tán** | Khi PostGIS không còn đủ — [[Big Geospatial Processing]] |

## 4. Cạm bẫy

- **Tối ưu trước khi đo.** Luôn `EXPLAIN ANALYZE` trước.
- **Chỉnh cấu hình trong khi truy vấn còn seq scan.** Vô ích.
- **`REFRESH MATERIALIZED VIEW` không có `CONCURRENTLY`** khoá view suốt quá trình.
- **Quên `ANALYZE` sau khi nạp lớn.**
- **Index quá nhiều** làm chậm ghi và phình đĩa.
- **Chạy hàm nặng trong `SELECT` cho mọi hàng** khi chỉ cần cho hàng cuối cùng — lọc trước, tính sau.
- **Bloat sau nhiều `UPDATE`/`DELETE`** — `VACUUM`/`REINDEX` định kỳ.
- **Đo trên dữ liệu mẫu nhỏ** rồi suy ra hành vi ở quy mô thật; kế hoạch truy vấn **đổi** theo kích thước bảng.

## 5. Checklist áp dụng

- [ ] Tôi đã chạy `EXPLAIN (ANALYZE, BUFFERS)` chưa?
- [ ] Có `Seq Scan` trên bảng lớn không?
- [ ] `ANALYZE` đã chạy sau lần nạp dữ liệu gần nhất chưa?
- [ ] Hình học lớn nhất có bao nhiêu đỉnh?
- [ ] Có giá trị nào đang tính lặp lại mà nên lưu sẵn không?
- [ ] Có phép gộp nặng nào nên thành materialized view không?
- [ ] Cấu hình PostgreSQL có còn hoàn toàn mặc định không?
- [ ] Tôi có đo trên dữ liệu **quy mô thật** không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `EXPLAIN (ANALYZE, BUFFERS)` | Chẩn đoán chính | [postgresql.org](https://www.postgresql.org/docs/current/using-explain.html) |
| `pg_stat_statements` | Tìm truy vấn tốn nhất | [postgresql.org](https://www.postgresql.org/docs/current/pgstatstatements.html) |
| PGTune | Gợi ý cấu hình theo phần cứng | [pgtune.leopard.in.ua](https://pgtune.leopard.in.ua/) |
| explain.depesz.com | Trực quan hoá kế hoạch | [explain.depesz.com](https://explain.depesz.com/) |

## Tham khảo

- [PostgreSQL — Server Configuration](https://www.postgresql.org/docs/current/runtime-config-resource.html) — tham chiếu chính thức các tham số bộ nhớ
- [PostGIS — Performance Tips](https://postgis.net/docs/performance_tips.html) — trang tối ưu chính thức của PostGIS
- [Crunchy Data — PostGIS performance blog series](https://www.crunchydata.com/blog/topic/postgis)
- [PostgreSQL — Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) — đọc kế hoạch truy vấn

## Liên kết

[[Spatial Indexing with GiST]] · [[Spatial SQL Query Patterns]] · [[Spatial Database Design]] · [[Big Geospatial Processing]] · [[Performance Tuning]] · [[GIS]]
