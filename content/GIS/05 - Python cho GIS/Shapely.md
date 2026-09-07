---
tags: [gis, python, thư-viện]
status: evergreen
---
# Shapely

> Shapely là **GEOS gói trong Python** — cùng engine hình học mà PostGIS và QGIS dùng. Nó không biết gì về CRS, không biết gì về file, không biết gì về thuộc tính. Nó chỉ làm đúng một việc: **đại số hình học trong bộ nhớ**, và làm rất tốt.

## 1. Phạm vi

| Shapely **có** | Shapely **không** có |
|---|---|
| Kiểu hình học Simple Features | Đọc/ghi file → [[Fiona and Pyogrio]] |
| Predicate quan hệ (DE-9IM) | Nhận thức CRS → `pyproj` |
| Phép overlay, buffer, simplify | Bảng thuộc tính → [[GeoPandas]] |
| Kiểm tra và sửa tính hợp lệ | Index không gian bền vững |

> [!warning] Shapely **không** biết CRS
> `Point(105.85, 21.03).buffer(500)` tạo buffer bán kính **500 đơn vị của toạ độ đó** — tức 500 độ. Shapely không cảnh báo vì nó không biết đơn vị là gì. Trách nhiệm CRS thuộc về bạn (hoặc GeoPandas). Xem [[Reprojection Pitfalls]].

## 2. Dùng cơ bản

```python
from shapely import Point, LineString, Polygon, box
from shapely import intersects, union_all, make_valid

pt   = Point(105.85, 21.03)
line = LineString([(0, 0), (1, 1), (2, 0)])
poly = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
bbox = box(0, 0, 1, 1)

poly.area, poly.length, poly.centroid, poly.bounds
poly.contains(pt), poly.intersects(line), poly.touches(bbox)
poly.buffer(0.1), poly.simplify(0.01, preserve_topology=True)
poly.intersection(bbox), poly.union(bbox), poly.difference(bbox)

# Kiểm và sửa tính hợp lệ — làm TRƯỚC mọi phép overlay
if not poly.is_valid:
    print(shapely.is_valid_reason(poly))
    poly = make_valid(poly)
```

## 3. Shapely 2.0 — vectorise là thay đổi lớn nhất

Shapely 2.0 (2022) viết lại trên nền mảng NumPy. Hệ quả thực tế: **vòng lặp Python trở nên không cần thiết, và chậm hơn nhiều lần**.

```python
import numpy as np, shapely

geoms = shapely.points(np.random.rand(1_000_000), np.random.rand(1_000_000))

# ❌ Cách cũ — vòng lặp Python
areas = [g.buffer(0.01).area for g in geoms]

# ✅ Cách mới — vectorise, nhanh hơn nhiều bậc
areas = shapely.area(shapely.buffer(geoms, 0.01))
mask  = shapely.intersects(geoms, poly)          # trả về mảng bool
```

**API top-level `shapely.<hàm>(mảng)` là cách viết đúng ở 2.0**; API phương thức `geom.buffer()` vẫn chạy nhưng chỉ cho một hình.

### STRtree — index không gian trong bộ nhớ

```python
from shapely import STRtree
tree = STRtree(geoms)
idx  = tree.query(poly, predicate="intersects")   # trả về chỉ số, đã lọc chính xác
nearest = tree.nearest(pt)
```

Đây là cách làm spatial join nhanh khi dữ liệu vừa bộ nhớ và bạn không muốn dùng CSDL. Không có nó, so mọi cặp là $O(n^2)$.

## 4. Cạm bẫy

- **Quên rằng không có CRS** — xem callout. Cạm bẫy số một.
- **Dùng vòng lặp Python ở Shapely 2.0.** Chậm hơn hàng chục lần mà không cần thiết.
- **`simplify()` không giữ topology** theo mặc định giữa các hình khác nhau — nó xử lý từng hình riêng lẻ. Xem [[Geometry Validity and Topology]].
- **Hình học không hợp lệ khiến predicate trả về kết quả không xác định.** `make_valid` trước.
- **`union()` trong vòng lặp** là $O(n^2)$. Dùng `union_all()` (trước 2.0 là `unary_union`).
- **Sự khác biệt API 1.x → 2.0**: `cascaded_union`, `.ctypes`, một số thuộc tính đã bị bỏ. Code cũ trên StackOverflow thường là 1.x — ghim phiên bản và đọc migration guide.
- **`is_valid` không kiểm CRS hay đơn vị**, chỉ kiểm cấu trúc hình học.

## 5. Checklist áp dụng

- [ ] Toạ độ của tôi ở đơn vị nào — và tham số khoảng cách có cùng đơn vị không?
- [ ] Tôi đã kiểm `is_valid` trước khi overlay chưa?
- [ ] Tôi có đang dùng vòng lặp Python ở chỗ vectorise được không?
- [ ] Với nhiều hình: tôi có dùng `STRtree` thay vì so mọi cặp không?
- [ ] `union_all()` thay vì `union()` lặp chứ?
- [ ] Phiên bản Shapely có được ghim không (1.x và 2.x khác API)?
- [ ] Nếu cần CRS và thuộc tính: tôi có nên dùng GeoPandas thay vì Shapely thuần không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `shapely.STRtree` | Index không gian trong bộ nhớ | [shapely.readthedocs.io](https://shapely.readthedocs.io/en/stable/strtree.html) |
| `shapely.make_valid` | Sửa hình học | [shapely.readthedocs.io](https://shapely.readthedocs.io/) |
| `pyproj` | Bổ sung phần CRS mà Shapely thiếu | [pyproj4.github.io](https://pyproj4.github.io/pyproj/stable/) |

## Tham khảo

- [Shapely documentation](https://shapely.readthedocs.io/en/stable/) — tài liệu chính thức
- [Shapely 2.0 migration guide](https://shapely.readthedocs.io/en/stable/migration.html) — thay đổi so với 1.x
- [GEOS library](https://libgeos.org/) — engine C++ bên dưới, cùng cái PostGIS dùng
- [Shapely — STRtree](https://shapely.readthedocs.io/en/stable/strtree.html) — index không gian

## Liên kết

[[GeoPandas]] · [[Geometry Validity and Topology]] · [[Spatial Relationships and DE-9IM]] · [[Fiona and Pyogrio]] · [[Geospatial Python Performance]] · [[GIS]]
