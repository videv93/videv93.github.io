---
tags: [gis, viễn-thám, phân-tích]
status: evergreen
---
# Spectral Indices

> Kết hợp vài band thành **một con số có ý nghĩa vật lý**. Dạng chuẩn hoá `(A − B) / (A + B)` không phải ngẫu nhiên: nó cho giá trị trong `[-1, 1]` và **triệt tiêu phần lớn ảnh hưởng của điều kiện chiếu sáng** — đó là lý do nó thống trị cả lĩnh vực.

## 1. Các chỉ số chính

| Chỉ số | Công thức | Đo cái gì |
|---|---|---|
| **NDVI** | $(NIR - Red)/(NIR + Red)$ | Sức sống thực vật |
| **EVI** | Hiệu chỉnh khí quyển & nền đất | Thực vật ở vùng sinh khối cao (chống bão hoà) |
| **NDWI** | $(Green - NIR)/(Green + NIR)$ | Mặt nước |
| **MNDWI** | $(Green - SWIR)/(Green + SWIR)$ | Mặt nước — **tốt hơn ở đô thị** |
| **NDBI** | $(SWIR - NIR)/(SWIR + NIR)$ | Khu vực xây dựng |
| **NBR** | $(NIR - SWIR2)/(NIR + SWIR2)$ | Vùng cháy; **dNBR** đo mức độ thiệt hại |
| **NDMI** | $(NIR - SWIR1)/(NIR + SWIR1)$ | Độ ẩm thực vật |
| **SAVI** | NDVI có hệ số $L$ hiệu chỉnh nền đất | Thực vật thưa, đất lộ nhiều |

### Đọc NDVI

| Giá trị | Bề mặt |
|---|---|
| < 0 | Nước, tuyết, mây |
| 0 – 0,1 | Đất trống, đá, cát, bê tông |
| 0,2 – 0,4 | Thực vật thưa, cây bụi |
| 0,4 – 0,7 | Thực vật vừa, cây trồng |
| > 0,7 | Thực vật rậm, rừng khoẻ |

> [!warning] NDVI **bão hoà** ở sinh khối cao
> Trên rừng nhiệt đới rậm, NDVI dừng ở khoảng 0,8–0,9 và **không còn phân biệt được** rừng khoẻ với rừng rất khoẻ. Với vùng sinh khối cao — và Việt Nam có nhiều — dùng **EVI** hoặc chỉ số dựa trên SWIR thay thế. Đây là giới hạn vật lý, không phải vấn đề dữ liệu.

## 2. Tính bằng code

```python
import rioxarray, numpy as np

red = rioxarray.open_rasterio("B04.tif").astype("float32")
nir = rioxarray.open_rasterio("B08.tif").astype("float32")

# 1. Áp scale factor TRƯỚC (Sentinel-2 L2A lưu số nguyên)
red = red / 10000.0
nir = nir / 10000.0

# 2. Che nodata TRƯỚC khi tính
red = red.where(red > 0)
nir = nir.where(nir > 0)

# 3. Tính, chống chia cho 0
denom = nir + red
ndvi = ((nir - red) / denom).where(denom != 0)

ndvi.rio.to_raster("ndvi.tif", compress="deflate", dtype="float32")
```

```sql
-- Trong PostGIS raster
SELECT ST_MapAlgebra(rast, 8, rast, 4,
  '([rast1] - [rast2]) / NULLIF([rast1] + [rast2], 0)', '32BF') FROM scenes;
```

Thứ tự ba bước trên **không đổi được**: scale → mask → tính. Đảo thứ tự cho ra số sai trông hợp lý.

## 3. Cạm bẫy

- **Không áp scale factor.** Chia hai số nguyên lớn vẫn cho tỉ số đúng, nhưng nếu nhà cung cấp thêm **offset** (các bản xử lý Sentinel-2 mới hơn có) thì kết quả sai. Đọc đặc tả sản phẩm.
- **Số nguyên chia số nguyên** trong NumPy cho kết quả nguyên → NDVI toàn 0 hoặc ±1. Ép `float32` trước.
- **Chia cho 0** ở pixel tối → `inf`/`NaN` lan ra mọi thống kê. Dùng `NULLIF` / `where`.
- **Nodata tham gia tính toán.** `-9999` cho ra NDVI vô nghĩa nhưng "hợp lệ" về kiểu số.
- **Không lọc mây.** Mây có NDVI thấp và sẽ bị nhầm là đất trống hoặc nước.
- **So sánh NDVI giữa hai cảm biến khác nhau.** Band của Landsat và Sentinel-2 không hoàn toàn trùng; giá trị lệch hệ thống.
- **So sánh NDVI khác mùa** rồi kết luận mất rừng — thực vật rụng lá theo mùa.
- **Dùng ngưỡng cố định từ bài báo khác.** Ngưỡng "NDVI > 0,4 là rừng" phụ thuộc vùng, mùa, cảm biến. **Luôn hiệu chỉnh ngưỡng bằng dữ liệu thực địa của chính bạn.**
- **Dùng L1C.** Chỉ số tính trên phản xạ đỉnh khí quyển không so sánh được giữa các ngày.

## 4. Checklist áp dụng

- [ ] Scale factor **và offset** đã được áp đúng theo đặc tả sản phẩm chưa?
- [ ] Dữ liệu đã ép `float32` trước khi chia chưa?
- [ ] Nodata và mây đã được che **trước** khi tính chưa?
- [ ] Mẫu số bằng 0 đã được xử lý chưa?
- [ ] Tôi dùng ảnh **L2A** chứ?
- [ ] Chỉ số này có bão hoà ở vùng nghiên cứu của tôi không?
- [ ] Ngưỡng của tôi có được hiệu chỉnh bằng dữ liệu thực địa không, hay chép từ bài báo?
- [ ] Nếu so sánh theo thời gian: cùng cảm biến, cùng mùa, cùng mức xử lý chứ?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Awesome Spectral Indices | Danh mục hàng trăm chỉ số kèm công thức chuẩn | [awesome-ee-spectral-indices.readthedocs.io](https://awesome-ee-spectral-indices.readthedocs.io/) |
| spyndex | Thư viện Python tính chỉ số theo danh mục trên | [spyndex.readthedocs.io](https://spyndex.readthedocs.io/) |
| rioxarray / xarray | Tính chỉ số trên chuỗi thời gian | [corteva.github.io/rioxarray](https://corteva.github.io/rioxarray/) |
| Google Earth Engine | Tính trên quy mô lớn không cần tải | [earthengine.google.com](https://earthengine.google.com/) |

## Tham khảo

- [Awesome Spectral Indices](https://awesome-ee-spectral-indices.readthedocs.io/) — danh mục chuẩn hoá công thức và tham chiếu bài báo gốc
- [Rouse et al. (1974) — NDVI gốc](https://ntrs.nasa.gov/citations/19740022614) — bài báo khai sinh NDVI
- [Huete et al. (2002) — EVI](https://doi.org/10.1016/S0034-4257(02)00096-2) — chỉ số chống bão hoà
- [USGS — Landsat Surface Reflectance Derived Spectral Indices](https://www.usgs.gov/landsat-missions/landsat-surface-reflectance-derived-spectral-indices) — công thức chính thức theo cảm biến

## Liên kết

[[Remote Sensing Fundamentals]] · [[Raster Algebra and Zonal Statistics]] · [[Satellite Imagery Sources]] · [[Earth Observation Data Cubes]] · [[Rasterio]] · [[GIS]]
