---
tags: [gis, python, hiệu-năng]
status: evergreen
---
# Geospatial Python Performance

> Code GIS bằng Python chậm gần như luôn vì **một trong bốn lý do**, và không cái nào trong đó là "Python chậm". Chẩn đoán theo thứ tự này trước khi nghĩ tới Spark hay viết lại bằng ngôn ngữ khác.

## 1. Bốn nguyên nhân, theo tần suất

| # | Nguyên nhân | Dấu hiệu | Sửa |
|---|---|---|---|
| 1 | **Vòng lặp Python trên hình học** | `for`, `iterrows`, `.apply` | Vectorise bằng Shapely 2.0 |
| 2 | **Thiếu index không gian** | So mọi cặp, $O(n^2)$ | `STRtree`, `sjoin` |
| 3 | **I/O sai cách** | Đọc cả file rồi lọc | `pyogrio` + `bbox`/`where`/`columns` |
| 4 | **Dữ liệu vượt RAM** | Swap, MemoryError | Chia lô, Dask, DuckDB |

## 2. Vectorise

```python
import numpy as np, shapely, geopandas as gpd

# ❌ Chậm: vòng lặp
gdf["area"] = [g.area for g in gdf.geometry]
gdf["buf"]  = gdf.geometry.apply(lambda g: g.buffer(100))

# ✅ Nhanh: vectorise (Shapely 2.0 trên mảng NumPy)
gdf["area"] = shapely.area(gdf.geometry.values)
gdf["buf"]  = shapely.buffer(gdf.geometry.values, 100)

# ❌ Chậm: iterrows
for idx, row in gdf.iterrows():
    if row.geometry.intersects(target): ...

# ✅ Nhanh: mảng bool
mask = shapely.intersects(gdf.geometry.values, target)
subset = gdf[mask]
```

Xem [[Shapely]] về API mảng của 2.0.

## 3. Index không gian trong bộ nhớ

```python
from shapely import STRtree

# ❌ O(n²) — 10.000 × 10.000 = 100 triệu phép so
matches = [(i, j) for i, a in enumerate(A) for j, b in enumerate(B) if a.intersects(b)]

# ✅ Có index
tree = STRtree(B)
idx_a, idx_b = tree.query(A, predicate="intersects")   # trả về cặp chỉ số
```

`gpd.sjoin` đã dùng index bên trong — luôn ưu tiên nó thay vì tự viết vòng lặp.

## 4. I/O

```python
# ❌ Đọc 5 GB rồi bỏ 99%
gdf = gpd.read_file("huge.gpkg")
gdf = gdf[gdf.type == "residential"].cx[105.7:106.0, 20.9:21.1]

# ✅ Lọc ở tầng GDAL, chỉ đọc phần cần
gdf = gpd.read_file("huge.gpkg", engine="pyogrio",
                    columns=["id", "type"],
                    bbox=(105.7, 20.9, 106.0, 21.1),
                    where="type = 'residential'")

# ✅ Nhanh nhất cho dữ liệu lặp lại: GeoParquet
gdf.to_parquet("cache.parquet")
gdf = gpd.read_parquet("cache.parquet")
```

## 5. Vượt RAM

| Công cụ | Mô hình | Khi nào |
|---|---|---|
| **Chia lô thủ công** | Xử lý từng vùng, ghi từng phần | Đơn giản nhất — thử trước |
| **DuckDB spatial** | SQL out-of-core, đọc Parquet | **Thường là lựa chọn tốt nhất** |
| **Dask-GeoPandas** | GeoDataFrame phân tán | Giữ API GeoPandas |
| **Apache Sedona** | Spark | Đã có cluster Spark |
| **PostGIS** | Đẩy tính toán xuống CSDL | Dữ liệu đã ở CSDL |

> [!note] Thử theo thứ tự này
> Rất nhiều bài toán "cần Spark" thật ra chỉ cần **GeoParquet + DuckDB** trên một máy. Dựng cluster tốn nhiều thời gian hơn phần lớn người ta ước lượng. Xem [[Big Geospatial Processing]].

## 6. Cạm bẫy

- **Tối ưu trước khi đo.** Dùng `%%timeit`, `cProfile`, hoặc `py-spy` để biết chỗ nào thật sự tốn.
- **Song song hoá code chưa vectorise.** Chạy code chậm trên 8 core vẫn là code chậm — và multiprocessing với hình học tốn chi phí serialize (pickle) rất lớn.
- **Copy DataFrame không cần thiết.** Mỗi `gdf.copy()` nhân đôi bộ nhớ.
- **Reproject nhiều lần trong vòng lặp.** Transform một lần cho cả cột.
- **Dùng GeoJSON làm định dạng trung gian** trong pipeline — chậm và nặng. Xem [[GeoJSON]].
- **`ST_Buffer` để kiểm khoảng cách** thay vì dùng khoảng cách trực tiếp.
- **Không cache kết quả trung gian.** Ghi Parquet giữa các bước rẻ hơn tính lại nhiều lần.
- **Quên rằng GEOS chạy đơn luồng cho mỗi phép** — song song phải ở mức dữ liệu, không ở mức phép toán.

## 7. Checklist áp dụng

- [ ] Tôi đã **đo** để biết chỗ chậm thật sự chưa?
- [ ] Còn vòng lặp Python nào trên hình học không?
- [ ] Mọi phép so cặp có dùng index (`STRtree`/`sjoin`) không?
- [ ] I/O có lọc ngay ở tầng GDAL không?
- [ ] Kết quả trung gian có được cache dạng Parquet không?
- [ ] Dữ liệu có vừa RAM không — nếu không, tôi đã thử DuckDB chưa?
- [ ] Tôi có reproject lặp lại không cần thiết không?
- [ ] Trước khi dựng cluster: một máy với GeoParquet có đủ không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `py-spy` | Profile không cần sửa code | [github.com/benfred/py-spy](https://github.com/benfred/py-spy) |
| DuckDB spatial | SQL out-of-core | [duckdb.org/docs/extensions/spatial](https://duckdb.org/docs/stable/extensions/spatial) |
| Dask-GeoPandas | Mở rộng GeoPandas | [dask-geopandas.readthedocs.io](https://dask-geopandas.readthedocs.io/) |
| `memory_profiler` | Theo dõi bộ nhớ | [pypi.org/project/memory-profiler](https://pypi.org/project/memory-profiler/) |

## Tham khảo

- [Shapely 2.0 — vectorized operations](https://shapely.readthedocs.io/en/stable/migration.html) — nền tảng của mọi tối ưu ở note này
- [GeoPandas — Performance and IO](https://geopandas.org/en/stable/docs/user_guide/io.html)
- [Dask-GeoPandas documentation](https://dask-geopandas.readthedocs.io/)
- [DuckDB spatial extension](https://duckdb.org/docs/stable/extensions/spatial) — lựa chọn out-of-core đơn giản nhất

## Liên kết

[[Shapely]] · [[GeoPandas]] · [[Fiona and Pyogrio]] · [[Big Geospatial Processing]] · [[Cloud Native Geospatial Formats]] · [[GIS]]
