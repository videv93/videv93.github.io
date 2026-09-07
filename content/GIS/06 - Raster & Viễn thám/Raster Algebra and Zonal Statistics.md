---
tags: [gis, raster, phân-tích]
status: evergreen
---
# Raster Algebra and Zonal Statistics

> Hai phép cốt lõi khi làm việc với raster: **map algebra** (tính trên từng ô) và **zonal statistics** (gộp ô theo vùng vector). Zonal statistics là chỗ vector và raster gặp nhau — và là phép được dùng nhiều nhất trong phân tích thực tế.

## 1. Map algebra

| Loại | Phạm vi tính | Ví dụ |
|---|---|---|
| **Local** | Từng ô, độc lập | NDVI, ngưỡng, phân loại lại |
| **Focal** | Ô + lân cận (cửa sổ) | Làm mượt, slope, phát hiện biên |
| **Zonal** | Ô nhóm theo vùng | Độ cao trung bình mỗi xã |
| **Global** | Toàn raster | Khoảng cách tới điểm gần nhất, watershed |

```python
import numpy as np, rasterio
from scipy import ndimage

with rasterio.open("dem.tif") as src:
    dem = src.read(1).astype("float32")
    dem[dem == src.nodata] = np.nan       # LUÔN làm trước

# Local: phân loại lại
classes = np.digitize(dem, bins=[0, 100, 500, 1000])

# Focal: làm mượt 3×3, bỏ qua NaN đúng cách
smoothed = ndimage.generic_filter(dem, np.nanmean, size=3)
```

## 2. Zonal statistics

```python
from rasterstats import zonal_stats

stats = zonal_stats(
    "communes.gpkg", "dem.tif",
    stats=["mean", "min", "max", "std", "count", "median"],
    nodata=-9999,
    all_touched=False,       # tham số quan trọng nhất — xem bên dưới
    geojson_out=True,
)
```

```sql
-- Cùng phép trong PostGIS
SELECT c.id, (ST_SummaryStats(ST_Clip(r.rast, c.geom, true))).*
FROM communes c JOIN dem r ON ST_Intersects(r.rast, c.geom);
```

> [!warning] `all_touched` quyết định kết quả nhiều hơn bạn nghĩ
> - `all_touched=False` (mặc định): chỉ ô có **tâm** nằm trong polygon.
> - `all_touched=True`: **mọi** ô chạm polygon.
>
> Với polygon nhỏ so với kích thước ô, `False` có thể cho **0 ô** — vùng biến mất khỏi kết quả mà không báo lỗi. Với polygon lớn, `True` làm phình vùng ra ngoài ranh giới thật. Không có mặc định đúng cho mọi trường hợp: **chọn có ý thức và ghi lại lựa chọn**.

## 3. Vector ↔ Raster

| Chiều | Hàm | Cạm bẫy |
|---|---|---|
| Vector → Raster | `rasterize`, `gdal_rasterize` | Polygon nhỏ hơn ô **biến mất** |
| Raster → Vector | `shapes`, `gdal_polygonize` | Nhiễu sinh ra hàng triệu polygon vụn |

```python
from rasterio.features import rasterize, shapes

arr = rasterize(
    [(geom, value) for geom, value in zip(gdf.geometry, gdf.code)],
    out_shape=(height, width), transform=transform,
    fill=0, all_touched=False, dtype="int32",
)

# Vector hoá — nhớ lọc nhiễu TRƯỚC
results = shapes(arr, mask=arr != 0, transform=transform)
```

Xem [[Vector vs Raster]] về mất mát khi chuyển đổi.

## 4. Cạm bẫy

- **Nodata tính vào thống kê.** `-9999` trong trung bình phá hoàn toàn kết quả. Khai báo nodata **và** kiểm lại bằng `min`/`max` xem có giá trị lạ không.
- **Không kiểm `count`.** Nếu một vùng có `count = 0` hoặc rất nhỏ, thống kê của nó vô nghĩa. **Luôn lấy `count` cùng với `mean`.**
- **Vùng và raster khác CRS.** rasterstats không tự reproject — kết quả rỗng hoặc sai.
- **Trung bình của tỉ số ≠ tỉ số của trung bình.** Muốn "tỉ lệ rừng của xã" thì đếm ô rừng chia tổng ô, không phải lấy trung bình của một raster tỉ lệ.
- **Vector hoá raster có nhiễu** → hàng triệu polygon. Lọc (sieve/majority filter) trước.
- **`all_touched` mặc định với polygon nhỏ** — xem callout.
- **Tràn kiểu dữ liệu** khi cộng nhiều band `uint8`.
- **Focal statistics ở rìa raster** — cửa sổ vượt biên; quyết định cách xử lý (bỏ, lặp biên, NaN).
- **Zonal stats trên vùng chồng lấn** → ô được đếm nhiều lần; đúng hay sai tuỳ ý định, nhưng phải biết.

## 5. Checklist áp dụng

- [ ] Nodata đã được khai báo và loại trừ chưa?
- [ ] Tôi có lấy `count` cùng với `mean` để biết vùng nào thiếu dữ liệu không?
- [ ] Vector và raster có **cùng CRS** không?
- [ ] `all_touched` đặt là gì — và tôi có chọn nó có ý thức không?
- [ ] Polygon nhỏ nhất có lớn hơn kích thước ô không?
- [ ] Tôi đang tính trung bình của tỉ số hay tỉ số của tổng — cái nào đúng?
- [ ] Kiểu dữ liệu có đủ rộng không?
- [ ] Nếu vector hoá: tôi đã lọc nhiễu trước chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| rasterstats | Zonal statistics vector × raster | [pythonhosted.org/rasterstats](https://pythonhosted.org/rasterstats/) |
| `exactextract` | Zonal stats **theo tỉ lệ diện tích ô** — chính xác hơn | [github.com/isciences/exactextract](https://github.com/isciences/exactextract) |
| `rasterio.features` | rasterize / vector hoá | [[Rasterio]] |
| `ST_SummaryStats` | Zonal stats trong SQL | [[Raster in PostGIS]] |
| WhiteboxTools | Bộ phân tích raster/địa hình phong phú | [whiteboxgeo.com](https://www.whiteboxgeo.com/) |

> [!note] `exactextract` giải đúng vấn đề `all_touched`
> Thay vì chọn "ô có tâm trong vùng" hay "mọi ô chạm vùng", nó tính **phần diện tích ô nằm trong polygon** và dùng nó làm trọng số. Với polygon nhỏ hoặc ranh giới quan trọng, đây là câu trả lời đúng thay vì một lựa chọn nhị phân.

## Tham khảo

- [rasterstats documentation](https://pythonhosted.org/rasterstats/) — tham số và ngữ nghĩa `all_touched`
- [exactextract](https://github.com/isciences/exactextract) — zonal stats có trọng số diện tích
- [PostGIS Raster Reference](https://postgis.net/docs/RT_reference.html) — `ST_MapAlgebra`, `ST_SummaryStats`
- [Esri — How Zonal Statistics works](https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/how-zonal-statistics-works.htm) — mô tả khái niệm rõ ràng

## Liên kết

[[Rasterio]] · [[Spectral Indices]] · [[Vector vs Raster]] · [[Digital Elevation Models]] · [[Raster in PostGIS]] · [[Spatial Aggregation and Binning]] · [[GIS]]
