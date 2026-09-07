---
tags: [gis, python, io]
status: evergreen
---
# Fiona and Pyogrio

> Hai cách để Python nói chuyện với **OGR** (phần vector của GDAL). Fiona là cách cũ, an toàn, từng-feature. Pyogrio là cách mới, vectorise, **nhanh hơn nhiều lần**. Biết khác biệt giúp bạn thắng dễ nhất trong toàn bộ pipeline Python.

## 1. So sánh

| | **Fiona** | **Pyogrio** |
|---|---|---|
| Mô hình | Lặp từng feature, dạng dict | **Đọc cả lớp thành mảng** |
| Tốc độ | Cơ sở | Thường nhanh **hàng lần** |
| Bộ nhớ | Thấp — streaming | Cao hơn — nạp cả lớp |
| Hợp với | File rất lớn, xử lý từng dòng | **Phần lớn công việc thật** |
| GeoPandas | Engine mặc định (bản cũ) | Engine khuyến nghị hiện nay |

```python
import geopandas as gpd

# Nhanh: pyogrio
gdf = gpd.read_file("big.gpkg", engine="pyogrio")

# Nhanh hơn nữa: chỉ đọc cột và vùng cần
gdf = gpd.read_file(
    "big.gpkg",
    engine="pyogrio",
    columns=["id", "name"],           # bỏ cột không dùng
    bbox=(105.7, 20.9, 106.0, 21.1),  # lọc theo vùng NGAY khi đọc
    where="type = 'residential'",      # lọc thuộc tính bằng SQL
)
```

> [!note] Ba tham số đáng giá nhất
> `columns`, `bbox`, `where` — lọc **ở tầng GDAL**, trước khi dữ liệu vào Python. Với file lớn, đây thường là khác biệt giữa 2 giây và 2 phút. Rất nhiều code đọc cả file rồi mới lọc bằng pandas — đó là lãng phí thuần tuý.

## 2. Fiona — khi nào vẫn dùng

```python
import fiona

# File 50 GB không vừa RAM: xử lý từng feature, không nạp hết
with fiona.open("huge.gpkg", layer="roads") as src:
    print(src.crs, src.schema, len(src))
    with fiona.open("out.gpkg", "w", **src.meta) as dst:
        for feat in src:                      # streaming
            if feat["properties"]["type"] == "highway":
                dst.write(feat)
```

Dùng Fiona khi: dữ liệu vượt RAM, cần kiểm soát từng feature, hoặc cần đọc schema/metadata mà không nạp dữ liệu.

## 3. Mẹo I/O chung

```python
# Liệt kê lớp trong file nhiều lớp trước khi đọc
import pyogrio; print(pyogrio.list_layers("data.gpkg"))

# Đọc CHỈ metadata (không nạp hình học) — rất nhanh
info = pyogrio.read_info("data.gpkg")   # crs, fields, số feature, kiểu hình học

# Ghi: ưu tiên GeoPackage hoặc Parquet
gdf.to_file("out.gpkg", layer="parcels", driver="GPKG", engine="pyogrio")
gdf.to_parquet("out.parquet")   # nhanh nhất, giữ kiểu dữ liệu tốt nhất
```

## 4. Cạm bẫy

- **Đọc cả file rồi mới lọc.** Dùng `bbox`/`where`/`columns`.
- **Fiona 1.x và Shapely 1.x/2.x xung đột phiên bản** — nguồn lỗi cài đặt kinh điển. Dùng conda-forge hoặc ghim toàn bộ.
- **Không kiểm `crs` sau khi đọc.** Một số định dạng không mang CRS; kết quả là `None`.
- **Ghi Shapefile làm cắt tên trường** âm thầm — xem [[Shapefile]].
- **Kiểu dữ liệu bị đổi khi qua định dạng trung gian.** `int64` → `float` khi qua GeoJSON; datetime mất giờ khi qua `.dbf`.
- **Đọc file từ HTTP mà không dùng `/vsicurl/`** khiến GDAL tải toàn bộ.
- **Không đóng dataset** khi ghi bằng Fiona → file hỏng hoặc thiếu dữ liệu. Luôn dùng context manager.
- **Encoding.** File cũ có thể ở CP1258/Latin-1; chỉ định `encoding` khi tiếng Việt hỏng.

## 5. Checklist áp dụng

- [ ] Tôi có dùng `engine="pyogrio"` không?
- [ ] Tôi có lọc bằng `bbox` / `where` / `columns` ngay khi đọc không?
- [ ] Tôi đã kiểm CRS sau khi đọc chưa?
- [ ] Với file nhiều lớp: tôi đã liệt kê lớp trước khi đọc chưa?
- [ ] Dữ liệu có vừa RAM không — nếu không, tôi có dùng Fiona streaming không?
- [ ] Định dạng ghi ra có giữ được kiểu dữ liệu tôi cần không?
- [ ] Tiếng Việt có hiển thị đúng sau khi đọc không?
- [ ] Phiên bản GDAL/Fiona/Shapely có được ghim không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pyogrio | I/O vector nhanh | [pyogrio.readthedocs.io](https://pyogrio.readthedocs.io/) |
| Fiona | I/O streaming từng feature | [fiona.readthedocs.io](https://fiona.readthedocs.io/) |
| `ogrinfo` | Kiểm tra file trước khi viết code | [[GDAL and OGR]] |
| `/vsicurl/`, `/vsis3/` | Đọc từ xa không tải hết | [gdal.org/user/virtual_file_systems.html](https://gdal.org/user/virtual_file_systems.html) |

## Tham khảo

- [pyogrio documentation](https://pyogrio.readthedocs.io/) — API và so sánh hiệu năng với Fiona
- [Fiona documentation](https://fiona.readthedocs.io/) — mô hình streaming
- [GDAL Virtual File Systems](https://gdal.org/user/virtual_file_systems.html) — đọc từ HTTP/S3/zip trực tiếp
- [GeoPandas — Reading and writing files](https://geopandas.org/en/stable/docs/user_guide/io.html)

## Liên kết

[[GeoPandas]] · [[GDAL and OGR]] · [[Shapely]] · [[Geospatial Python Performance]] · [[Cloud Native Geospatial Formats]] · [[GIS]]
