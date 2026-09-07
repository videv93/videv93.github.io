---
tags: [gis, phân-tích]
status: evergreen
---
# Overlay Operations

> Đại số tập hợp áp lên hình học: giao, hợp, hiệu. Nghe đơn giản, nhưng đây là nơi dữ liệu thật **vỡ** — vì hai bộ dữ liệu từ hai nguồn không bao giờ có ranh giới khớp nhau tới bit cuối.

## 1. Các phép

| Phép | PostGIS | Kết quả | Dùng để |
|---|---|---|---|
| **Intersection** | `ST_Intersection(a,b)` | Phần chung | "Bao nhiêu ha rừng nằm trong khu bảo tồn?" |
| **Union** | `ST_Union(a,b)` | Hợp hai hình | Gộp các mảnh thành một |
| **Difference** | `ST_Difference(a,b)` | A trừ B | "Đất trống = đất trừ toà nhà" |
| **SymDifference** | `ST_SymDifference(a,b)` | Phần chỉ thuộc một bên | So sánh hai phiên bản dữ liệu |
| **Clip** | `ST_Intersection` với vùng cắt | Cắt theo ranh giới | Giới hạn dữ liệu về vùng nghiên cứu |
| **Dissolve** | `ST_Union` theo nhóm | Gộp theo thuộc tính | Gộp xã thành huyện |

```sql
-- Dissolve: gộp các xã thành huyện
SELECT district_id, ST_Union(geom) AS geom
FROM communes GROUP BY district_id;

-- ST_Union một cột lớn thì chậm — ST_UnaryUnion/ST_Collect nhanh hơn nhiều
SELECT district_id, ST_UnaryUnion(ST_Collect(geom)) AS geom
FROM communes GROUP BY district_id;

-- Intersection có mang thuộc tính hai bên (overlay đầy đủ)
SELECT f.forest_type, p.park_name,
       ST_Area(ST_Intersection(f.geom, p.geom)::geography) / 10000 AS ha
FROM forests f
JOIN parks p ON ST_Intersects(f.geom, p.geom);   -- lọc bằng index TRƯỚC
```

> [!note] Luôn `JOIN ... ON ST_Intersects` trước khi `ST_Intersection`
> `ST_Intersection` **không dùng index**. Nếu không lọc bằng `ST_Intersects` trong `JOIN`, bạn đang tính giao cho mọi cặp trong tích Descartes. Đây là tối ưu quan trọng nhất của cả note này.

## 2. Sliver polygon — vấn đề trung tâm

Khi chồng hai lớp có "cùng" ranh giới từ hai nguồn khác nhau, ranh giới lệch nhau vài cm sinh ra hàng nghìn **polygon vụn dài và mỏng** (sliver). Chúng:

- Làm phình số đối tượng gấp nhiều lần
- Làm sai thống kê theo số lượng (nhưng ít ảnh hưởng thống kê theo diện tích)
- Làm chậm mọi phép tiếp theo

**Cách xử lý, theo thứ tự ưu tiên:**

| Cách | Làm gì | Khi nào |
|---|---|---|
| **Snap trước khi overlay** | `ST_SnapToGrid` hoặc `ST_Snap` để ranh giới trùng khớp | **Tốt nhất** — chữa nguyên nhân |
| Lọc theo diện tích | Bỏ mảnh < ngưỡng | Nhanh, nhưng mất dữ liệu thật nếu ngưỡng sai |
| Lọc theo hình dạng | Bỏ mảnh có tỉ số chu vi²/diện tích rất cao | Chính xác hơn lọc diện tích thuần |
| Dùng một lớp làm chuẩn | Chỉ giữ ranh giới của lớp có thẩm quyền | Khi có nguồn đáng tin hơn |

```sql
-- Snap về lưới 1 cm trước khi overlay (CRS mét)
SELECT ST_Intersection(
  ST_SnapToGrid(a.geom, 0.01),
  ST_SnapToGrid(b.geom, 0.01)
) FROM a JOIN b ON ST_Intersects(a.geom, b.geom);
```

## 3. Cạm bẫy

- **`ST_Intersection` trả về `GEOMETRYCOLLECTION`** khi hai polygon chạm nhau cả ở mặt lẫn ở cạnh. Lọc bằng `ST_CollectionExtract(geom, 3)` để chỉ giữ polygon.
- **Kết quả rỗng (`GEOMETRYCOLLECTION EMPTY`)** khi chỉ chạm biên — không phải lỗi, nhưng phải lọc bỏ.
- **`TopologyException` từ GEOS** — gần như luôn do hình học không hợp lệ. Chạy `ST_MakeValid` trước. Xem [[Geometry Validity and Topology]].
- **Tổng diện tích sau overlay không bằng tổng ban đầu.** Nếu lớp đầu vào có polygon **chồng lấn nhau**, diện tích bị đếm trùng. Kiểm tính "coverage" trước.
- **`ST_Union` trên bảng lớn cực chậm** — dùng `ST_UnaryUnion(ST_Collect(...))` hoặc gộp theo lô.
- **Overlay ở CRS sai** làm mọi diện tích sai. Xem [[Reprojection Pitfalls]].
- **Mất thuộc tính.** `ST_Union` bỏ hết thuộc tính; phải quyết định trước quy tắc gộp (sum, max, first).

## 4. Checklist áp dụng

- [ ] Hình học đầu vào có hợp lệ không (`ST_IsValid`)?
- [ ] Tôi có lọc bằng `ST_Intersects` trong `JOIN` trước `ST_Intersection` không?
- [ ] CRS có phải hệ mét phù hợp vùng không?
- [ ] **Tổng diện tích trước và sau** có khớp trong sai số chấp nhận được không?
- [ ] Kết quả có sliver không? (đếm số polygon nhỏ bất thường)
- [ ] Có `GEOMETRYCOLLECTION` hoặc hình rỗng lọt vào kết quả không?
- [ ] Quy tắc gộp thuộc tính khi dissolve đã được quyết định chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_MakeValid` | Sửa hình học trước overlay | [postgis.net](https://postgis.net/docs/ST_MakeValid.html) |
| `ST_SnapToGrid` / `ST_Snap` | Chống sliver từ gốc | [postgis.net](https://postgis.net/docs/ST_Snap.html) |
| `ST_CollectionExtract` | Lọc kiểu hình học mong muốn | [postgis.net](https://postgis.net/docs/ST_CollectionExtract.html) |
| `gpd.overlay` | Overlay trong Python | [[GeoPandas]] |

## Tham khảo

- [PostGIS — Geometry Processing functions](https://postgis.net/docs/reference.html#Geometry_Processing) — tham chiếu đầy đủ
- [PostGIS Workshop — Geometry Constructing Functions](https://postgis.net/workshops/postgis-intro/geometry_returning.html)
- [JTS — Overlay NG](https://lin-ear-th-inking.blogspot.com/2020/01/improving-jts-overlay-robustness.html) — cách GEOS/JTS cải thiện độ bền vững của overlay
- [GeoPandas — Set operations with overlay](https://geopandas.org/en/stable/docs/user_guide/set_operations.html)

## Liên kết

[[Spatial Relationships and DE-9IM]] · [[Geometry Validity and Topology]] · [[Spatial Joins]] · [[Buffer and Proximity Analysis]] · [[Geospatial Data Quality]] · [[GIS]]
