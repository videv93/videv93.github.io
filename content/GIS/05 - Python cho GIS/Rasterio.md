---
tags: [gis, python, raster]
status: evergreen
---
# Rasterio

> GDAL cho raster, với API Python thật sự dễ chịu. Ý tưởng trung tâm: **đọc theo cửa sổ (window)**, không nạp cả ảnh. Ảnh vệ tinh 10 GB xử lý được trên laptop nếu bạn tôn trọng nguyên tắc đó.

## 1. Khái niệm cốt lõi

| Khái niệm | Là gì |
|---|---|
| **Dataset** | File raster đã mở |
| **Band** | Một lớp giá trị (Sentinel-2 có 13 band) |
| **Transform** | Ma trận affine: chỉ số ô ↔ toạ độ thực |
| **Window** | Vùng con để đọc/ghi |
| **Profile** | Metadata: CRS, transform, dtype, nodata, nén |
| **Mask** | Vùng hợp lệ (khác nodata) |

```python
import rasterio
from rasterio.windows import Window, from_bounds

with rasterio.open("scene.tif") as src:
    print(src.crs, src.count, src.width, src.height, src.dtypes, src.nodata)
    print(src.bounds, src.transform, src.res)

    band1 = src.read(1)                                  # cả band — chỉ khi ảnh nhỏ
    part  = src.read(1, window=Window(0, 0, 1024, 1024)) # theo cửa sổ

    # Đọc theo toạ độ thực — cách dùng thường xuyên nhất
    win = from_bounds(105.7, 20.9, 106.0, 21.1, src.transform)
    sub = src.read(1, window=win)

    # Giá trị tại một điểm
    for val in src.sample([(105.85, 21.03)]):
        print(val)
```

## 2. Ghi file đúng cách

```python
profile = src.profile.copy()
profile.update(
    dtype="float32", count=1, compress="deflate", predictor=3,
    tiled=True, blockxsize=512, blockysize=512, nodata=-9999,
)
with rasterio.open("out.tif", "w", **profile) as dst:
    dst.write(result.astype("float32"), 1)
    dst.build_overviews([2, 4, 8, 16], rasterio.enums.Resampling.average)
```

`tiled=True` + overview = file đủ điều kiện thành COG. Xem [[Raster Formats and COG]].

## 3. Xử lý ảnh lớn — đọc theo block

```python
# Mẫu chuẩn: xử lý ảnh lớn hơn RAM, theo đúng block của file
with rasterio.open("huge.tif") as src:
    profile = src.profile.copy()
    profile.update(dtype="float32", compress="deflate")
    with rasterio.open("out.tif", "w", **profile) as dst:
        for _, window in src.block_windows(1):      # theo block tự nhiên của file
            data = src.read(1, window=window).astype("float32")
            data[data == src.nodata] = np.nan        # xử lý nodata TRƯỚC khi tính
            dst.write(compute(data), 1, window=window)
```

Lặp theo `block_windows` (thay vì cửa sổ tự chọn) khớp với cách file được nén và lưu — nhanh hơn đáng kể.

## 4. Các thao tác hay dùng

```python
from rasterio.mask import mask          # cắt theo polygon
from rasterio.warp import reproject, calculate_default_transform
from rasterio.features import shapes, rasterize

out_img, out_tf = mask(src, [polygon], crop=True, nodata=-9999)

# Vector hoá raster phân loại
for geom, val in shapes(band, mask=band != src.nodata, transform=src.transform):
    ...

# Rasterise vector
arr = rasterize([(geom, 1) for geom in gdf.geometry],
                out_shape=(h, w), transform=tf, fill=0)
```

Xem [[Raster Algebra and Zonal Statistics]] và [[Vector vs Raster]].

## 5. Cạm bẫy

- **`src.read()` không tham số nạp toàn bộ ảnh.** Với ảnh 10 GB, đây là hết RAM ngay lập tức.
- **Không xử lý nodata trước khi tính.** `-9999` tham gia vào trung bình sẽ phá kết quả **âm thầm**. Đây là lỗi raster phổ biến nhất.
- **Tràn kiểu dữ liệu.** `uint8` + `uint8` = tràn ở 255. Ép sang `float32` trước khi làm toán.
- **Reproject dữ liệu phân loại bằng bilinear** — tạo lớp không tồn tại. Xem [[Reprojection Pitfalls]].
- **Quên `tiled=True`** khi ghi → file không thể thành COG.
- **Không dùng context manager** → file handle rò rỉ, ghi thiếu.
- **Đọc theo cửa sổ không khớp block** làm giải nén lặp lại nhiều lần.
- **Nhầm `(row, col)` với `(x, y)`.** `src.index(x, y)` và `src.xy(row, col)` là hai chiều ngược nhau — đọc kỹ.

## 6. Checklist áp dụng

- [ ] Tôi có đọc theo **window/block** thay vì nạp cả ảnh không?
- [ ] Nodata có được xử lý **trước khi** tính toán không?
- [ ] Kiểu dữ liệu có đủ rộng để không tràn không?
- [ ] File ghi ra có `tiled=True` và overview không?
- [ ] Nén có phù hợp (lossless cho dữ liệu phân tích)?
- [ ] CRS và transform có được giữ đúng khi ghi không?
- [ ] Resampling có phù hợp loại dữ liệu (nearest cho phân loại) không?
- [ ] Tôi có dùng context manager (`with`) không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| rasterio | Đọc/ghi/xử lý raster | [rasterio.readthedocs.io](https://rasterio.readthedocs.io/) |
| `rio` CLI | Thao tác nhanh từ terminal | [rasterio.readthedocs.io/en/stable/cli.html](https://rasterio.readthedocs.io/en/stable/cli.html) |
| rio-cogeo | Tạo/kiểm COG | [cogeotiff.github.io/rio-cogeo](https://cogeotiff.github.io/rio-cogeo/) |
| rasterstats | Zonal statistics vector × raster | [pythonhosted.org/rasterstats](https://pythonhosted.org/rasterstats/) |
| xarray + rioxarray | Raster nhiều chiều, có nhãn | [corteva.github.io/rioxarray](https://corteva.github.io/rioxarray/) |

## Tham khảo

- [Rasterio documentation](https://rasterio.readthedocs.io/en/stable/) — tài liệu chính thức
- [Rasterio — Windowed reading and writing](https://rasterio.readthedocs.io/en/stable/topics/windowed-rw.html) — mẫu xử lý ảnh lớn
- [GDAL Raster API](https://gdal.org/api/index.html) — tầng bên dưới
- [rioxarray documentation](https://corteva.github.io/rioxarray/stable/) — khi cần chiều thời gian

## Liên kết

[[Raster Formats and COG]] · [[Raster Algebra and Zonal Statistics]] · [[Earth Observation Data Cubes]] · [[Vector vs Raster]] · [[GDAL and OGR]] · [[GIS]]
