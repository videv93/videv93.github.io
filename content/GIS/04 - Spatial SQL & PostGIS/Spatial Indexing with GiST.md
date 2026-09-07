---
tags: [gis, postgis, hiệu-năng]
status: evergreen
---
# Spatial Indexing with GiST

> Index B-tree sắp xếp dữ liệu **một chiều** — nó không có cách nào sắp một polygon. Index không gian giải bài toán này bằng **cây bounding box lồng nhau**, và hiểu điều đó giải thích mọi hành vi hiệu năng kỳ lạ mà bạn sẽ gặp.

> Nền tảng về index nói chung nằm ở [[Performance Tuning]] (area Database); note này chỉ nói phần **không gian**.

## 1. Cách nó hoạt động

**GiST** (Generalized Search Tree) với dữ liệu không gian hiện thực một cấu trúc họ **R-tree**:

1. Mỗi hình học được thay bằng **bounding box** của nó.
2. Các box gần nhau được gom vào một box cha lớn hơn.
3. Lặp lại tới khi còn một box gốc → cây.
4. Truy vấn duyệt cây, cắt bỏ nhánh có box không giao vùng tìm kiếm.

```sql
CREATE INDEX parcels_geom_idx ON parcels USING GIST (geom);
ANALYZE parcels;   -- BẮT BUỘC: không có thống kê, planner đoán sai
```

### Hai pha của mọi truy vấn không gian

| Pha | Việc | Toán tử | Chi phí |
|---|---|---|---|
| **1. Index scan** | So **bounding box** | `&&` | Rẻ |
| **2. Recheck** | Kiểm hình học **chính xác** | `ST_Intersects`… | **Đắt** |

Đây là lý do sâu xa của mọi vấn đề hiệu năng: **index chỉ lọc theo hộp bao**. Nếu hộp bao của bạn "rỗng" — polygon hình chữ L, đường bờ biển ngoằn ngoèo, một MultiPolygon gồm hai mảnh cách xa nhau — thì pha 1 lọc kém và pha 2 phải làm việc nhiều.

> [!note] Tại sao `ST_Subdivide` tăng tốc đột biến
> Cắt polygon lớn thành nhiều mảnh nhỏ làm **hộp bao chặt hơn nhiều**, nên pha 1 loại được nhiều hơn và pha 2 nhận ít cặp hơn. Với polygon có hàng chục nghìn đỉnh, đây thường là tối ưu hiệu quả nhất — hơn cả việc thêm RAM.
> ```sql
> CREATE TABLE districts_sub AS
> SELECT id, name, ST_Subdivide(geom, 256) AS geom FROM districts;
> CREATE INDEX ON districts_sub USING GIST (geom);
> ```

## 2. Các loại index

| Loại | Dùng cho | Ghi chú |
|---|---|---|
| **GiST** | Mặc định cho mọi dữ liệu không gian | Cân bằng tốt, hỗ trợ KNN `<->` |
| **SP-GiST** | Điểm, dữ liệu không chồng lấn | Có thể nhanh hơn với point thuần |
| **BRIN** | Bảng **rất lớn** đã sắp theo không gian | Index cực nhỏ, chỉ hiệu quả khi dữ liệu sắp theo vị trí |
| **B-tree** | ❌ **Không dùng cho hình học** | Không có thứ tự tổng trên không gian |

**BRIN** đáng chú ý cho dữ liệu lớn: nếu bảng đã được sắp theo Hilbert curve (`ORDER BY ST_Hilbert(geom)` hoặc geohash), BRIN cho index nhỏ hơn GiST hàng trăm lần với hiệu năng chấp nhận được. Xem [[Big Geospatial Processing]].

## 3. Khi index không được dùng

Đây là phần thực dụng nhất — kiểm bằng `EXPLAIN ANALYZE` và tìm `Seq Scan`:

| Nguyên nhân | Sửa |
|---|---|
| Chưa chạy `ANALYZE` | `ANALYZE table` |
| Hàm bọc quanh cột: `ST_Transform(geom, X)` trong `WHERE` | Lưu sẵn cột đã transform, hoặc index biểu thức |
| Dùng `ST_Distance(...) < d` | Đổi sang `ST_DWithin` |
| Dùng `ST_Disjoint` | Đổi sang `NOT ST_Intersects` |
| Bảng quá nhỏ | Bình thường — seq scan **nhanh hơn** ở bảng nhỏ |
| Truy vấn lấy phần lớn bảng | Bình thường — index không giúp |
| SRID không khớp | Sửa CRS — [[Reprojection Pitfalls]] |
| Index bị phình sau nhiều UPDATE | `REINDEX` |

```sql
-- Index biểu thức khi buộc phải transform trong truy vấn
CREATE INDEX ON parcels USING GIST (ST_Transform(geom, 3857));

-- Kiểm index có được dùng không
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM parcels WHERE ST_Intersects(geom, ST_MakeEnvelope(...));
-- Muốn thấy: "Index Scan using parcels_geom_idx"
-- Không muốn thấy: "Seq Scan on parcels"
```

## 4. Cạm bẫy

- **Tạo index rồi quên `ANALYZE`.** Planner dùng thống kê để quyết định; không có thống kê thì nó đoán, và thường đoán sai.
- **Index trên cột có nhiều hình học khổng lồ** vẫn chậm — vấn đề nằm ở pha 2, không phải index. Dùng `ST_Subdivide`.
- **Tạo index trước khi nạp dữ liệu lớn.** Nạp rồi mới tạo index nhanh hơn nhiều.
- **Quên index sau khi `CREATE TABLE AS`.** Bảng mới **không** thừa kế index — lỗi rất hay gặp trong pipeline.
- **Index nhiều cột không gian không cần thiết** làm chậm ghi mà không giúp đọc.
- **Tin `EXPLAIN` mà không có `ANALYZE`** — `EXPLAIN` chỉ cho ước lượng, `EXPLAIN ANALYZE` cho số thật.

## 5. Checklist áp dụng

- [ ] Mọi cột hình học có index GiST không?
- [ ] Tôi đã chạy `ANALYZE` sau khi nạp/thay đổi dữ liệu lớn chưa?
- [ ] `EXPLAIN ANALYZE` có cho thấy **Index Scan** (không phải Seq Scan) không?
- [ ] Có hàm nào bọc quanh cột hình học trong `WHERE` không?
- [ ] Polygon lớn (>10.000 đỉnh) có cần `ST_Subdivide` không?
- [ ] Bảng tạo bằng `CREATE TABLE AS` đã có index chưa?
- [ ] Với bảng rất lớn: dữ liệu có được sắp theo không gian để dùng BRIN không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `EXPLAIN (ANALYZE, BUFFERS)` | Xem kế hoạch thật | [postgresql.org](https://www.postgresql.org/docs/current/using-explain.html) |
| `ST_Subdivide` | Cắt nhỏ hình học lớn | [postgis.net](https://postgis.net/docs/ST_Subdivide.html) |
| `pg_stat_user_indexes` | Xem index nào thật sự được dùng | [postgresql.org](https://www.postgresql.org/docs/current/monitoring-stats.html) |
| explain.depesz.com | Đọc kế hoạch dễ hơn | [explain.depesz.com](https://explain.depesz.com/) |

## Tham khảo

- [PostGIS Workshop — Spatial Indexing](https://postgis.net/workshops/postgis-intro/indexing.html) — chương chính thức về R-tree/GiST
- [PostgreSQL — GiST Indexes](https://www.postgresql.org/docs/current/gist.html) — cơ chế index tổng quát
- [Guttman, A. (1984), *R-Trees: A Dynamic Index Structure*](https://dl.acm.org/doi/10.1145/602259.602266) — bài báo gốc về R-tree
- [Crunchy Data — Performance with ST_Subdivide](https://www.crunchydata.com/blog/postgis-performance-tips) — giải thích thực chiến

## Liên kết

[[PostGIS Performance Tuning]] · [[Spatial SQL Query Patterns]] · [[Spatial Joins]] · [[PostGIS Core Types]] · [[Performance Tuning]] · [[GIS]]
