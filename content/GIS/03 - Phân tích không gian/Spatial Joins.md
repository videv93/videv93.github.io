---
tags: [gis, phân-tích]
status: evergreen
---
# Spatial Joins

> Join thông thường ghép theo **khoá bằng nhau**; spatial join ghép theo **quan hệ hình học**. Đây là phép toán được dùng nhiều nhất trong công việc GIS thật — và cũng là phép đắt nhất nếu làm sai.

## 1. Ba dạng

| Dạng | Câu hỏi | Predicate |
|---|---|---|
| **Point in polygon** | Mỗi khách hàng thuộc quận nào? | `ST_Intersects` / `ST_Covers` |
| **Nearest neighbour** | Trạm xe buýt gần nhất mỗi toà nhà? | `<->` (KNN) |
| **Within distance** | Có bao nhiêu quán cà phê trong 500 m? | `ST_DWithin` |

```sql
-- 1. Point in polygon — gán quận cho từng điểm
SELECT p.id, d.name AS district
FROM points p
LEFT JOIN districts d ON ST_Covers(d.geom, p.geom);

-- 2. Nearest neighbour — LATERAL + toán tử KNN <->
SELECT b.id, s.name, ST_Distance(b.geom, s.geom) AS dist_m
FROM buildings b
CROSS JOIN LATERAL (
  SELECT name, geom FROM stops
  ORDER BY stops.geom <-> b.geom      -- <-> dùng được index, ORDER BY ST_Distance thì KHÔNG
  LIMIT 1
) s;

-- 3. Within distance — ST_DWithin, KHÔNG phải ST_Distance < x
SELECT b.id, COUNT(c.id) AS cafes_500m
FROM buildings b
LEFT JOIN cafes c ON ST_DWithin(b.geom, c.geom, 500)   -- geom phải ở CRS mét
GROUP BY b.id;
```

> [!warning] Ba lỗi hiệu năng kinh điển
> 1. `WHERE ST_Distance(a, b) < 500` — **không dùng được index**, quét toàn bảng. Luôn dùng `ST_DWithin(a, b, 500)`.
> 2. `ORDER BY ST_Distance(a, b) LIMIT 1` — không dùng index KNN. Dùng toán tử `<->`.
> 3. Join trên CRS bậc với tham số mét — chạy, nhưng sai. Xem [[Geodesic vs Planar Measurement]].

## 2. Nguyên tắc

1. **Index trước, join sau.** Không có index không gian thì mọi spatial join là tích Descartes. Xem [[Spatial Indexing with GiST]].
2. **Lọc trước khi join.** Giảm số hàng bằng điều kiện thuộc tính rẻ hơn nhiều so với giảm sau.
3. **Đơn giản hoá hình học nếu độ chính xác cho phép.** Polygon 50.000 đỉnh làm phép kiểm chính xác cực chậm; `ST_Simplify` trước có thể nhanh hơn nhiều lần.
4. **Chọn predicate có ý thức về biên** — `Covers` vs `Contains`, xem [[Spatial Relationships and DE-9IM]].
5. **`LEFT JOIN` để phát hiện cái không khớp.** `INNER JOIN` giấu mất những điểm không rơi vào polygon nào — đó thường là chỗ dữ liệu có vấn đề.

## 3. Cách spatial join thật sự chạy

Hai pha, và biết điều này giải thích mọi vấn đề hiệu năng:

| Pha | Việc | Chi phí |
|---|---|---|
| **1. Filter** | Dùng index so **bounding box** (`&&`) — loại nhanh phần lớn cặp | Rẻ |
| **2. Refine** | Kiểm hình học **chính xác** trên các cặp còn lại | **Đắt**, tỉ lệ với số đỉnh |

Hệ quả: hình học càng phức tạp và bounding box càng "rỗng" (như đường bờ biển dài, polygon hình chữ L), pha 2 càng tốn. Đây là lý do `ST_Subdivide` giúp nhiều — nó cắt polygon lớn thành mảnh nhỏ có bbox chặt hơn.

```sql
-- Chia nhỏ polygon lớn trước khi join lặp nhiều lần
CREATE TABLE districts_sub AS
SELECT id, name, ST_Subdivide(geom, 256) AS geom FROM districts;
CREATE INDEX ON districts_sub USING GIST (geom);
```

## 4. Cạm bẫy

- **Nhân bản hàng.** Nếu polygon chồng lấn nhau, một điểm khớp nhiều polygon → số hàng phình lên và mọi `SUM` bị đếm trùng. **Luôn kiểm số hàng trước và sau join.**
- **Điểm rơi vào khe hở giữa các polygon** → `NULL` sau `LEFT JOIN`. Đếm số `NULL` là phép chẩn đoán chất lượng dữ liệu rất tốt.
- **Điểm trên biên chung của hai polygon** khớp cả hai. Cần quy tắc phá hoà (ví dụ chọn polygon có id nhỏ nhất).
- **Join giữa hai bảng lớn không có bộ lọc** — bùng nổ tổ hợp. Ước lượng trước bằng `EXPLAIN`.
- **Quên rằng `ST_DWithin` dùng đơn vị của CRS.** 500 trên 4326 nghĩa là 500 độ.
- **Nearest neighbour trên `geography` chậm hơn nhiều** so với geometry đã transform.

## 5. Checklist áp dụng

- [ ] Cả hai bảng có index không gian chưa?
- [ ] Cả hai có **cùng CRS**, và là CRS mét nếu dùng khoảng cách?
- [ ] Tôi dùng `ST_DWithin` (không phải `ST_Distance < x`) chứ?
- [ ] Nearest neighbour có dùng toán tử `<->` không?
- [ ] **Số hàng sau join có bằng số hàng trước** (nếu kỳ vọng 1-1) không?
- [ ] Có bao nhiêu hàng `NULL` sau `LEFT JOIN` — và tôi đã xem xét chúng chưa?
- [ ] Polygon lớn có cần `ST_Subdivide` không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `EXPLAIN ANALYZE` | Xem index có được dùng không | [[PostGIS Performance Tuning]] |
| `gpd.sjoin` / `sjoin_nearest` | Spatial join trong Python | [[GeoPandas]] |
| `ST_Subdivide` | Cắt nhỏ polygon để join nhanh | [postgis.net](https://postgis.net/docs/ST_Subdivide.html) |

## Tham khảo

- [PostGIS Workshop — Spatial Joins](https://postgis.net/workshops/postgis-intro/joins.html) — chương thực hành chính thức
- [PostGIS — ST_DWithin](https://postgis.net/docs/ST_DWithin.html) — chú ý phần đơn vị và index
- [PostGIS — KNN operators `<->`](https://postgis.net/docs/geometry_distance_knn.html) — cách nearest neighbour dùng index
- [GeoPandas — Spatial joins](https://geopandas.org/en/stable/gallery/spatial_joins.html) — bản Python

## Liên kết

[[Spatial Relationships and DE-9IM]] · [[Spatial Indexing with GiST]] · [[Buffer and Proximity Analysis]] · [[Spatial SQL Query Patterns]] · [[GeoPandas]] · [[GIS]]
