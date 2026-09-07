---
tags: [gis, phân-tích, chất-lượng]
status: evergreen
---
# Geometry Validity and Topology

> Một polygon "không hợp lệ" không phải lỗi thẩm mỹ — nó khiến **mọi phép toán sau đó cho kết quả không xác định**. GEOS có thể trả về đáp án, ném exception, hoặc âm thầm trả về sai. Kiểm hợp lệ là bước đầu tiên của mọi pipeline nghiêm túc.

## 1. Hình học hợp lệ nghĩa là gì

Theo OGC Simple Features, một polygon hợp lệ phải:

| Quy tắc | Vi phạm gọi là |
|---|---|
| Vòng khép kín (điểm đầu = điểm cuối) | Unclosed ring |
| Vòng **không tự cắt** | Self-intersection |
| Vòng lỗ nằm **trong** vòng ngoài | Hole outside shell |
| Các lỗ **không chồng nhau** | Nested holes |
| Interior **liên thông** (không bị lỗ chia đôi) | Disconnected interior |
| Không có đỉnh lặp liên tiếp | Repeated point |

LineString: không được có đoạn độ dài 0. Point: toạ độ phải hữu hạn (không `NaN`, không `Inf`).

```sql
-- Kiểm kê hình học không hợp lệ và lý do
SELECT id, ST_IsValidReason(geom)
FROM parcels WHERE NOT ST_IsValid(geom);
-- ví dụ: 'Self-intersection[105.85 21.03]' — có cả toạ độ chỗ hỏng

-- Sửa
UPDATE parcels SET geom = ST_MakeValid(geom) WHERE NOT ST_IsValid(geom);

-- MakeValid có thể ĐỔI KIỂU hình học — phải kiểm sau khi sửa
SELECT ST_GeometryType(geom), COUNT(*) FROM parcels GROUP BY 1;
```

> [!warning] `ST_MakeValid` không phải phép màu
> Nó sửa để hợp lệ, nhưng **kết quả có thể không phải cái bạn muốn**: một polygon hình số 8 tự cắt sẽ thành **MultiPolygon hai mảnh**; một polygon suy biến có thể thành LineString hoặc rỗng. Luôn kiểm kiểu hình học và tổng diện tích sau khi sửa, và **giữ bản gốc**.

## 2. Nguồn gốc của hình học hỏng

| Nguồn | Cơ chế |
|---|---|
| Số hoá bằng tay | Người vẽ đè đỉnh, tạo vòng lặp nhỏ |
| Chuyển đổi định dạng | Khác quy ước chiều quay vòng, làm tròn toạ độ |
| Reproject | Sai số số học đẩy đỉnh chồng nhau — xem [[Reprojection Pitfalls]] |
| Simplify | `ST_Simplify` **có thể tạo self-intersection**; `ST_SimplifyPreserveTopology` thì không |
| Overlay | Sliver và mảnh suy biến — xem [[Overlay Operations]] |
| Định dạng dễ dãi | [[Shapefile]] không kiểm hợp lệ khi ghi |

## 3. Topology — tầng trên của tính hợp lệ

Hình học có thể **hợp lệ từng cái** mà cả tập vẫn **sai về topology**:

| Lỗi topology | Mô tả | Hậu quả |
|---|---|---|
| **Gap** (khe hở) | Hai xã giáp nhau chừa khe 20 cm | Điểm rơi vào khe → không thuộc xã nào |
| **Overlap** (chồng lấn) | Hai xã cùng nhận một mảnh đất | Điểm thuộc hai xã → đếm trùng |
| **Dangle** | Đoạn đường cụt không nối vào mạng | Routing thất bại |
| **Undershoot / Overshoot** | Đường không chạm hoặc vượt quá điểm nối | Mạng lưới đứt đoạn |
| **Duplicate** | Cùng hình học lưu hai lần | Đếm trùng |

**Ràng buộc "coverage"** — tập polygon phủ kín, không chồng — là thứ phải **kiểm chủ động**, không tự nhiên có:

```sql
-- Tìm chồng lấn giữa các đơn vị hành chính (phải trả về 0 hàng)
SELECT a.id, b.id, ST_Area(ST_Intersection(a.geom, b.geom)) AS overlap
FROM communes a JOIN communes b
  ON a.id < b.id AND ST_Intersects(a.geom, b.geom)
WHERE ST_Area(ST_Intersection(a.geom, b.geom)) > 0.001;

-- Tìm khe hở: hợp tất cả rồi so với bao ngoài
SELECT ST_Area(ST_Difference(
  ST_ConvexHull(ST_Collect(geom)),
  ST_UnaryUnion(ST_Collect(geom))
)) AS gap_area FROM communes;
```

PostGIS Topology hoặc GRASS lưu **cạnh dùng chung** nên các lỗi này không thể xảy ra về mặt cấu trúc — đổi lấy độ phức tạp. Xem [[Spatial Data Models]].

## 4. Cạm bẫy

- **`ST_Buffer(geom, 0)` như mẹo sửa hình học** — cũ, không đáng tin, có thể xoá mảnh. Dùng `ST_MakeValid`.
- **`ST_Simplify` phá topology.** Nó xử lý từng hình riêng lẻ, nên hai xã giáp nhau sau simplify sẽ hở hoặc chồng. Dùng `ST_SimplifyPreserveTopology` cho từng hình, hoặc **mapshaper**/**PostGIS Topology** để simplify cả coverage cùng lúc. Xem [[Web Map Performance]].
- **Sửa hợp lệ rồi không kiểm lại kiểu và diện tích** — mất mảnh mà không biết.
- **Chỉ kiểm hợp lệ, không kiểm topology.** Đây là khoảng trống hay gặp nhất: mọi polygon `ST_IsValid` = true nhưng tập hợp vẫn có khe hở.
- **Dung sai float.** "Ranh giới chung" từ hai nguồn không bao giờ khớp tới bit cuối; cần `ST_SnapToGrid` với lưới phù hợp độ chính xác dữ liệu.
- **Kiểm hợp lệ sau khi đã phân tích.** Phải kiểm ở **cổng vào**.

## 5. Checklist áp dụng

- [ ] `SELECT COUNT(*) FROM t WHERE NOT ST_IsValid(geom)` có bằng 0 không?
- [ ] Tôi có ghi lại `ST_IsValidReason` **trước khi** sửa không?
- [ ] Sau `ST_MakeValid`: kiểu hình học và tổng diện tích còn khớp không?
- [ ] Nếu dữ liệu là coverage: tôi đã kiểm **gap** và **overlap** chưa?
- [ ] Có hình học rỗng hoặc `NULL` không?
- [ ] Có đỉnh trùng lặp / hình suy biến không?
- [ ] Nếu simplify: tôi có dùng phương pháp **giữ topology** không?
- [ ] Phép kiểm này có nằm trong CI không? ([[Geospatial Testing and CI]])

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_IsValid` / `ST_IsValidReason` / `ST_IsValidDetail` | Chẩn đoán, có toạ độ chỗ hỏng | [postgis.net](https://postgis.net/docs/ST_IsValidDetail.html) |
| `ST_MakeValid` | Sửa theo chuẩn OGC | [postgis.net](https://postgis.net/docs/ST_MakeValid.html) |
| QGIS — Check Validity / Topology Checker | Kiểm bằng giao diện, thấy chỗ hỏng | [qgis.org](https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html) |
| mapshaper | Simplify giữ topology cho cả coverage | [mapshaper.org](https://mapshaper.org/) |

## Tham khảo

- [PostGIS — Validity documentation](https://postgis.net/docs/using_postgis_dbmanagement.html#OGC_Validity) — quy tắc hợp lệ giải thích kèm hình
- [OGC Simple Feature Access](https://www.ogc.org/standard/sfa/) — nguồn định nghĩa tính hợp lệ
- [JTS — Validity and MakeValid](https://locationtech.github.io/jts/javadoc/org/locationtech/jts/geom/Geometry.html#isValid--) — hiện thực tham chiếu
- [PostGIS Topology](https://postgis.net/docs/Topology.html) — mô hình topology thật sự

## Liên kết

[[Spatial Data Models]] · [[Overlay Operations]] · [[Geospatial Data Quality]] · [[Web Map Performance]] · [[Spatial Relationships and DE-9IM]] · [[GIS]]
