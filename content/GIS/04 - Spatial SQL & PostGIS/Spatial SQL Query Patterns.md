---
tags: [gis, postgis, sql]
status: evergreen
---
# Spatial SQL Query Patterns

> Bộ truy vấn dùng đi dùng lại trong công việc thật. Mỗi mẫu kèm **lý do nó viết như vậy** — vì phần lớn chúng có một biến thể "tự nhiên hơn" nhưng chậm gấp hàng trăm lần.

## 1. Kiểm kê và chẩn đoán

```sql
-- Bộ kiểm tra đầu tiên với MỌI bảng lạ
SELECT
  COUNT(*)                                   AS n_rows,
  COUNT(*) FILTER (WHERE geom IS NULL)       AS n_null,
  COUNT(*) FILTER (WHERE NOT ST_IsValid(geom)) AS n_invalid,
  COUNT(*) FILTER (WHERE ST_IsEmpty(geom))   AS n_empty,
  COUNT(DISTINCT ST_SRID(geom))              AS n_srid,
  COUNT(DISTINCT ST_GeometryType(geom))      AS n_types,
  ST_Extent(geom)                            AS bbox
FROM my_table;
```

Sáu con số này bắt được phần lớn vấn đề trước khi bạn phí thời gian phân tích. Xem [[Geospatial Data Quality]].

## 2. Đếm theo vùng

```sql
-- Đếm điểm theo polygon, GIỮ CẢ vùng có 0 điểm
SELECT d.id, d.name, COUNT(p.id) AS n
FROM districts d
LEFT JOIN points p ON ST_Covers(d.geom, p.geom)   -- Covers: tính cả điểm trên biên
GROUP BY d.id, d.name;

-- Điểm KHÔNG rơi vào vùng nào — luôn chạy phép kiểm này
SELECT COUNT(*) FROM points p
WHERE NOT EXISTS (SELECT 1 FROM districts d WHERE ST_Covers(d.geom, p.geom));
```

## 3. Gần nhất (KNN)

```sql
-- Cơ sở y tế gần nhất cho mỗi xã
SELECT c.id, f.name, ST_Distance(c.geom, f.geom) AS dist_m
FROM communes c
CROSS JOIN LATERAL (
  SELECT name, geom FROM facilities
  ORDER BY facilities.geom <-> c.geom     -- <-> dùng index; ST_Distance thì KHÔNG
  LIMIT 1
) f;

-- K gần nhất: đổi LIMIT 1 thành LIMIT 5
```

## 4. Trong bán kính

```sql
-- ĐÚNG — dùng index
SELECT * FROM schools s JOIN houses h ON ST_DWithin(s.geom, h.geom, 500);

-- SAI — quét toàn bảng
SELECT * FROM schools s JOIN houses h ON ST_Distance(s.geom, h.geom) < 500;
```

## 5. Gộp và giải thể

```sql
-- Dissolve nhanh (ST_Union trực tiếp trên cột lớn rất chậm)
SELECT district_id, ST_UnaryUnion(ST_Collect(geom)) AS geom
FROM communes GROUP BY district_id;

-- Cụm điểm bằng DBSCAN — không cần thư viện ngoài
SELECT ST_ClusterDBSCAN(geom, eps := 200, minpoints := 5) OVER () AS cluster_id, *
FROM incidents;
```

## 6. Vector tile trực tiếp từ CSDL

```sql
-- Sinh MVT ngay trong PostGIS — nền tảng của pg_tileserv/Martin
WITH bounds AS (SELECT ST_TileEnvelope(:z, :x, :y) AS geom),
mvt AS (
  SELECT id, name,
    ST_AsMVTGeom(ST_Transform(t.geom, 3857), bounds.geom, 4096, 64, true) AS geom
  FROM my_table t, bounds
  WHERE ST_Intersects(ST_Transform(t.geom, 3857), bounds.geom)
)
SELECT ST_AsMVT(mvt, 'layer_name', 4096, 'geom') FROM mvt;
```

Xem [[MapLibre and Vector Tiles]] và [[Tile Servers and GeoServer]].

## 7. Xuất GeoJSON

```sql
-- FeatureCollection hoàn chỉnh trong một truy vấn
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', COALESCE(json_agg(ST_AsGeoJSON(t.*)::json), '[]'::json)
) FROM (SELECT id, name, ST_Transform(geom, 4326) AS geom FROM my_table LIMIT 1000) t;
```

Chú ý `ST_Transform(geom, 4326)`: GeoJSON **phải** ở WGS 84 — xem [[GeoJSON]].

## 8. Bảng "viết thế này, đừng viết thế kia"

| Ý định | ✅ Viết | ❌ Đừng viết | Vì sao |
|---|---|---|---|
| Trong bán kính | `ST_DWithin(a,b,d)` | `ST_Distance(a,b) < d` | Không dùng index |
| Gần nhất | `ORDER BY a <-> b LIMIT 1` | `ORDER BY ST_Distance(a,b) LIMIT 1` | Không dùng index KNN |
| Không giao nhau | `NOT ST_Intersects(a,b)` | `ST_Disjoint(a,b)` | `Disjoint` không dùng index |
| Gộp nhiều hình | `ST_UnaryUnion(ST_Collect(g))` | `ST_Union(g)` (aggregate) | Chậm hơn nhiều trên tập lớn |
| Giao giữa hai bảng | `JOIN ON ST_Intersects` **rồi** `ST_Intersection` | `ST_Intersection` trực tiếp | Hàm xử lý không dùng index |
| Điểm trong vùng (phủ kín) | `ST_Covers` | `ST_Contains` | Bỏ sót điểm trên biên |
| Lọc theo bbox | `geom && ST_MakeEnvelope(...)` | `ST_Intersects(geom, box)` | `&&` chỉ so bbox, rẻ hơn |

## 9. Checklist áp dụng

- [ ] Tôi đã chạy bộ kiểm kê 6 dòng ở mục 1 trên mọi bảng đầu vào chưa?
- [ ] Mọi predicate trong `WHERE`/`JOIN` có dùng được index không? (`EXPLAIN ANALYZE`)
- [ ] Tôi có `LEFT JOIN` để thấy cả phần không khớp không?
- [ ] Số hàng sau join có đúng kỳ vọng không?
- [ ] Khoảng cách có ở CRS mét không?
- [ ] Xuất GeoJSON có transform về 4326 chưa?
- [ ] Có hàm xử lý (`ST_Intersection`, `ST_Buffer`) nào chạy trước bước lọc không?

## Tham khảo

- [PostGIS Reference — toàn bộ hàm](https://postgis.net/docs/reference.html) — tra cứu hằng ngày
- [Introduction to PostGIS Workshop](https://postgis.net/workshops/postgis-intro/) — khoá thực hành chính thức, có trong seed
- [PostGIS — ST_AsMVT](https://postgis.net/docs/ST_AsMVT.html) — sinh vector tile từ SQL
- [Crunchy Data — PostGIS tips series](https://www.crunchydata.com/blog/topic/postgis) — bài viết thực chiến chất lượng cao

## Liên kết

[[PostGIS Core Types]] · [[Spatial Indexing with GiST]] · [[Spatial Joins]] · [[PostGIS Performance Tuning]] · [[Spatial SQL in Cloud Warehouses]] · [[GIS]]
