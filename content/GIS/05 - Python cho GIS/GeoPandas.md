---
tags: [gis, python, thư-viện]
status: evergreen
---
# GeoPandas

> `GeoDataFrame` = `pandas.DataFrame` + một cột hình học + một CRS. Đó là toàn bộ ý tưởng, và nó đủ mạnh để thay thế phần lớn công việc desktop GIS bằng code tái lập được.

> [!note] Ghi chú nguồn
> Seed liệt kê *Automating GIS Processes*, *Geographic Data Science*, và *Introduction to Geospatial Data in Python* — cả ba đều xoay quanh GeoPandas nhưng seed không nói ra điều đó. Đây là công cụ trung tâm của toàn bộ nhánh Python trong roadmap.

## 1. Nó đứng trên vai ai

| Tầng | Thư viện | Việc |
|---|---|---|
| Bảng | **pandas** | DataFrame, join, groupby |
| Hình học | **[[Shapely]]** (GEOS) | Phép hình học |
| Đọc/ghi | **[[Fiona and Pyogrio]]** (GDAL) | File I/O |
| CRS | **pyproj** (PROJ) | Biến đổi hệ toạ độ |

Hiểu cây phụ thuộc này giúp bạn biết **đọc tài liệu nào khi kẹt** — và biết rằng lỗi hình học kỳ lạ nên tra ở GEOS chứ không ở GeoPandas.

## 2. Thao tác cốt lõi

```python
import geopandas as gpd

gdf = gpd.read_file("data.gpkg", layer="parcels")
gdf = gpd.read_parquet("s3://bucket/data.parquet")     # cloud-native, nhanh nhất

gdf.crs                      # LUÔN kiểm tra đầu tiên
gdf = gdf.to_crs(32648)      # transform (KHÔNG phải set_crs)
gdf = gdf.set_crs(4326, allow_override=True)   # chỉ GÁN nhãn khi metadata sai

gdf["area_m2"] = gdf.area          # đơn vị của CRS hiện tại!
gdf["geometry"] = gdf.buffer(500)  # đơn vị của CRS hiện tại!

# Spatial join
joined = gpd.sjoin(points, polys, how="left", predicate="within")
nearest = gpd.sjoin_nearest(points, stops, how="left", distance_col="dist_m")

# Overlay và dissolve
inter = gpd.overlay(a, b, how="intersection")
dis   = gdf.dissolve(by="district_id", aggfunc={"pop": "sum"})

gdf.to_parquet("out.parquet")     # ưu tiên
gdf.to_file("out.gpkg", layer="parcels", driver="GPKG")
```

> [!warning] `to_crs` vs `set_crs` — cùng cái bẫy như PostGIS
> `to_crs` **tính lại toạ độ**. `set_crs` chỉ **dán nhãn**. Dùng `set_crs` khi cần `to_crs` nghĩa là dữ liệu của bạn nằm sai chỗ mà không có lỗi nào được ném ra. Xem [[Reprojection Pitfalls]].

## 3. Hiệu năng

| Việc | Cách chậm | Cách nhanh |
|---|---|---|
| Đọc file | `read_file` (Fiona) | `read_file(engine="pyogrio")` hoặc `read_parquet` |
| Lặp qua hàng | `iterrows()` | Thao tác vectorise trên `.geometry` |
| Áp hàm hình học | `.apply(lambda g: ...)` | Hàm `shapely.*` trên mảng |
| Spatial join | Vòng lặp thủ công | `gpd.sjoin` (có index bên trong) |
| Ghi file | `to_file` GeoJSON | `to_parquet` |
| Dữ liệu quá lớn | Nạp hết vào RAM | Dask-GeoPandas, DuckDB — [[Big Geospatial Processing]] |

Chi tiết: [[Geospatial Python Performance]].

## 4. Cạm bẫy

- **Quên kiểm `gdf.crs`.** Nó có thể là `None` — và khi đó `to_crs` sẽ ném lỗi, còn `.area` thì im lặng trả về số vô nghĩa.
- **Tính `.area` / `.length` / `.buffer` ở CRS địa lý.** GeoPandas cảnh báo, nhưng vẫn trả về số. Cảnh báo dễ bị bỏ qua trong log.
- **`sjoin` làm phình số hàng** khi polygon chồng lấn. Luôn so số hàng trước/sau. Xem [[Spatial Joins]].
- **Cột hình học tên không phải `geometry`.** Nhiều thao tác giả định tên mặc định; dùng `set_geometry()` cho tường minh.
- **Ghi GeoJSON cho dữ liệu lớn** — chậm và nặng. Xem [[GeoJSON]].
- **Mất CRS khi ghi ra định dạng không mang CRS** (CSV, GeoJSON không chuẩn).
- **`dissolve` mặc định bỏ cột không được gộp** — nêu rõ `aggfunc`.
- **Trộn hình học 2D và 3D** trong một cột gây hành vi lạ khi ghi.

## 5. Checklist áp dụng

- [ ] `gdf.crs` có khác `None` và đúng như mong đợi không?
- [ ] Mọi phép đo có ở CRS **mét** không?
- [ ] Tôi dùng `to_crs` (không phải `set_crs`) khi cần đổi toạ độ chứ?
- [ ] Số hàng sau `sjoin` có đúng kỳ vọng không?
- [ ] Tôi có dùng `iterrows()` ở chỗ vectorise được không?
- [ ] Đọc file có dùng `pyogrio` hoặc Parquet không?
- [ ] Hình học có hợp lệ trước khi `overlay` không?
- [ ] Dữ liệu có vừa RAM không — nếu không thì kế hoạch là gì?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pyogrio | Engine I/O nhanh | [pyogrio.readthedocs.io](https://pyogrio.readthedocs.io/) |
| Dask-GeoPandas | GeoPandas ngoài bộ nhớ | [dask-geopandas.readthedocs.io](https://dask-geopandas.readthedocs.io/) |
| contextily | Thêm lớp nền cho bản đồ tĩnh | [contextily.readthedocs.io](https://contextily.readthedocs.io/) |
| folium / explore() | Bản đồ tương tác nhanh | [python-visualization.github.io/folium](https://python-visualization.github.io/folium/) |

## Tham khảo

- [GeoPandas documentation](https://geopandas.org/en/stable/) — tài liệu chính thức
- [Automating GIS Processes](https://autogis-site.readthedocs.io/en/latest/) — khoá học **có trong seed**, dạy GeoPandas
- [Geographic Data Science with Python](https://geographicdata.science/book/intro.html) — sách của Rey/Arribas-Bel/Wolf, tác giả có trong seed
- [GeoPandas — Performance tips](https://geopandas.org/en/stable/docs/user_guide/io.html) — I/O và engine

## Liên kết

[[Shapely]] · [[Fiona and Pyogrio]] · [[Geospatial Python Performance]] · [[Spatial Joins]] · [[Big Geospatial Processing]] · [[GIS]]
