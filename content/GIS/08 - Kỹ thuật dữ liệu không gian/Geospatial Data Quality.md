---
tags: [gis, chất-lượng, data-engineering]
status: evergreen
---
# Geospatial Data Quality

> Dữ liệu không gian hỏng theo những cách mà kiểm tra chất lượng dữ liệu thường **không bắt được**: một polygon tự cắt vẫn là một hàng hợp lệ; một toạ độ ở giữa Đại Tây Dương vẫn là hai số hợp lệ. Cần một bộ kiểm tra riêng.

## 1. Sáu chiều chất lượng

| Chiều | Câu hỏi | Cách kiểm |
|---|---|---|
| **Completeness** | Có thiếu đối tượng không? | So số lượng với nguồn tham chiếu; tìm khe hở |
| **Positional accuracy** | Vị trí đúng tới mức nào? | Đối chiếu điểm khống chế đã biết |
| **Attribute accuracy** | Thuộc tính có đúng không? | Ràng buộc miền giá trị, đối chiếu mẫu |
| **Logical consistency** | Hình học và topology có hợp lệ? | `ST_IsValid`, kiểm gap/overlap |
| **Temporal validity** | Dữ liệu còn đúng thời điểm không? | Kiểm ngày dữ liệu vs ngày dùng |
| **Lineage** | Từ đâu ra, qua những bước nào? | [[Spatial Metadata]] |

## 2. Bộ kiểm tra chạy được

```sql
-- ========== KIỂM TRA HÌNH HỌC ==========
SELECT
  COUNT(*)                                        AS n_total,
  COUNT(*) FILTER (WHERE geom IS NULL)            AS n_null,
  COUNT(*) FILTER (WHERE ST_IsEmpty(geom))        AS n_empty,
  COUNT(*) FILTER (WHERE NOT ST_IsValid(geom))    AS n_invalid,
  COUNT(DISTINCT ST_SRID(geom))                   AS n_srid,      -- phải = 1
  COUNT(DISTINCT ST_GeometryType(geom))           AS n_geom_type, -- thường = 1
  MIN(ST_NPoints(geom)), MAX(ST_NPoints(geom))
FROM my_table;

-- ========== PHẠM VI: bắt lỗi CRS và đảo trục ==========
SELECT ST_Extent(geom) FROM my_table;
-- Việt Nam ở 4326 phải nằm trong khoảng x: 102–110, y: 8–24

-- ========== HÌNH HỌC SUY BIẾN ==========
SELECT COUNT(*) FROM my_table WHERE ST_Area(geom) = 0;       -- polygon không diện tích
SELECT COUNT(*) FROM my_table WHERE ST_Length(geom) = 0;     -- đường không chiều dài

-- ========== TRÙNG LẶP ==========
SELECT md5(ST_AsBinary(ST_Normalize(geom))::text) AS h, COUNT(*)
FROM my_table GROUP BY h HAVING COUNT(*) > 1;

-- ========== CHỒNG ĐIỂM: bắt centroid giả từ geocoding ==========
SELECT ST_AsText(geom), COUNT(*) FROM points
GROUP BY geom HAVING COUNT(*) > 10;        -- xem [[Geocoding]]

-- ========== COVERAGE: chồng lấn giữa các đơn vị ==========
SELECT a.id, b.id, ST_Area(ST_Intersection(a.geom, b.geom)) AS overlap
FROM units a JOIN units b ON a.id < b.id AND ST_Intersects(a.geom, b.geom)
WHERE ST_Area(ST_Intersection(a.geom, b.geom)) > 0.001;      -- phải rỗng

-- ========== GIÁ TRỊ NGOẠI LAI VỀ KÍCH THƯỚC ==========
SELECT id, ST_Area(geom::geography) AS m2 FROM parcels
ORDER BY m2 DESC LIMIT 10;    -- thửa đất 400 km² là dấu hiệu lỗi
```

> [!note] Phép kiểm rẻ và hiệu quả nhất: `ST_Extent`
> Một dòng, chạy tức thì, và bắt được **ba lỗi nghiêm trọng nhất** cùng lúc: CRS sai, đảo trục lat/lon, và toạ độ rác. Nếu chỉ được chạy một phép kiểm, chạy phép này.

## 3. Kiểm tra thuộc tính đặc thù không gian

| Kiểm | Vì sao |
|---|---|
| Diện tích/chu vi trong khoảng hợp lý | Bắt hình học hỏng và sai CRS |
| Tỉ số chu vi²/diện tích | Bắt sliver polygon — [[Overlay Operations]] |
| Số đỉnh bất thường | Vài đỉnh = suy biến; hàng trăm nghìn = vấn đề hiệu năng |
| Mật độ đối tượng theo vùng | Bắt vùng thiếu dữ liệu |
| Giá trị thuộc tính so với hình học | Dân số > 0 nhưng diện tích = 0 → mâu thuẫn |

## 4. Đưa vào pipeline

```python
# Cổng chất lượng: pipeline DỪNG nếu kiểm tra thất bại
def quality_gate(gdf, name):
    errors = []
    if gdf.crs is None:
        errors.append("CRS bị thiếu")
    if (n := (~gdf.is_valid).sum()) > 0:
        errors.append(f"{n} hình học không hợp lệ")
    if (n := gdf.geometry.is_empty.sum()) > 0:
        errors.append(f"{n} hình học rỗng")

    minx, miny, maxx, maxy = gdf.total_bounds
    if not (100 < minx < 112 and 5 < miny < 26):
        errors.append(f"Phạm vi ngoài Việt Nam: {gdf.total_bounds}")

    if errors:
        raise ValueError(f"Cổng chất lượng thất bại cho {name}: {errors}")
    return gdf
```

Chạy cổng này **ở cả đầu vào và đầu ra** của mỗi bước. Xem [[Geospatial Testing and CI]] và [[Spatial ETL Patterns]].

## 5. Cạm bẫy

- **Chỉ kiểm tra dữ liệu bảng, bỏ qua hình học.** Great Expectations và các công cụ tương tự mặc định không biết gì về không gian.
- **Kiểm hợp lệ nhưng không kiểm topology.** Mọi polygon `ST_IsValid` = true mà tập hợp vẫn có khe hở.
- **Không kiểm phạm vi** — bỏ lỡ lỗi CRS nghiêm trọng nhất.
- **Sửa im lặng.** `ST_MakeValid` tự động không log là mất dấu vết dữ liệu đã bị thay đổi.
- **Ngưỡng cứng không có ngoại lệ.** Một số thửa đất thật sự rất lớn — cần danh sách ngoại lệ được duyệt, không phải bỏ luôn phép kiểm.
- **Kiểm một lần lúc nhập rồi thôi.** Dữ liệu suy giảm theo thời gian; chạy định kỳ.
- **Không so số lượng vào/ra** ở mỗi bước.
- **Không kiểm tính thời sự.** Dữ liệu hợp lệ hoàn hảo nhưng của năm 2018 vẫn cho kết luận sai.

## 6. Checklist áp dụng

- [ ] `ST_Extent` có nằm trong vùng mong đợi không?
- [ ] Có bao nhiêu hình học không hợp lệ / rỗng / NULL?
- [ ] SRID có nhất quán (chỉ một giá trị) không?
- [ ] Có trùng lặp hình học không?
- [ ] Nếu là coverage: có gap hoặc overlap không?
- [ ] Diện tích/chu vi có giá trị ngoại lai bất thường không?
- [ ] Số lượng vào/ra ở mỗi bước có khớp không?
- [ ] Những gì bị sửa tự động có được **log** không?
- [ ] Dữ liệu này của thời điểm nào — còn đúng cho câu hỏi của tôi không?
- [ ] Bộ kiểm tra này có chạy tự động trong pipeline không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| PostGIS validity functions | Kiểm hợp lệ trong SQL | [[Geometry Validity and Topology]] |
| QGIS Topology Checker | Kiểm topology trực quan | [qgis.org](https://qgis.org/) |
| Great Expectations | Framework kiểm chất lượng (cần mở rộng cho không gian) | [greatexpectations.io](https://greatexpectations.io/) |
| dbt tests | Kiểm chất lượng bằng SQL trong pipeline | [docs.getdbt.com](https://docs.getdbt.com/docs/build/tests) |

## Tham khảo

- [ISO 19157 — Geographic information: Data quality](https://www.iso.org/standard/32575.html) — chuẩn định nghĩa các chiều chất lượng
- [PostGIS — Validity](https://postgis.net/docs/using_postgis_dbmanagement.html#OGC_Validity) — quy tắc hợp lệ
- [FGDC — Data quality elements](https://www.fgdc.gov/metadata) — mô hình chất lượng trong metadata
- [Great Expectations documentation](https://docs.greatexpectations.io/) — khung kiểm chất lượng tổng quát

## Liên kết

[[Spatial ETL Patterns]] · [[Geometry Validity and Topology]] · [[Geospatial Testing and CI]] · [[Spatial Metadata]] · [[Geocoding]] · [[GIS]]
