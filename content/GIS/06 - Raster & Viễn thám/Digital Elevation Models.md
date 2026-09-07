---
tags: [gis, raster, địa-hình]
status: evergreen
---
# Digital Elevation Models

> Raster mà mỗi ô mang **độ cao**. Từ nó dẫn xuất ra slope, aspect, hillshade, hướng dòng chảy, lưu vực — cả một họ phân tích địa hình. Nhưng trước hết phải trả lời đúng một câu: **DEM này đo tới bề mặt nào?**

## 1. DTM vs DSM vs DEM

| | **DTM** (Terrain) | **DSM** (Surface) |
|---|---|---|
| Đo tới | **Mặt đất trần** | **Đỉnh của mọi thứ** (cây, nhà) |
| Dùng cho | Thuỷ văn, độ dốc địa hình, kỹ thuật | Phân tích tầm nhìn, chiều cao công trình, năng lượng mặt trời |
| Trong rừng rậm | Mặt đất dưới tán | Đỉnh tán |

**DEM** là thuật ngữ chung, thường được dùng lỏng lẻo cho cả hai. **Luôn kiểm tra tài liệu nguồn** — dùng DSM cho phân tích thuỷ văn sẽ cho dòng chảy vòng qua các toà nhà.

**nDSM = DSM − DTM** → chiều cao vật thể trên mặt đất (chiều cao cây, chiều cao nhà).

| Nguồn | Loại | Phân giải |
|---|---|---|
| **Copernicus DEM (GLO-30)** | Chủ yếu DSM | 30 m — chất lượng tốt nhất trong nhóm mở toàn cầu |
| SRTM | DSM | 30 m |
| ALOS AW3D30 | DSM | 30 m |
| **LiDAR** | DTM **và** DSM | 0,5–2 m — tốt nhất, nhưng phủ hạn chế |

> [!warning] Độ cao đo từ bề mặt nào?
> DEM toàn cầu thường cho **độ cao orthometric** (so với geoid) — trong khi GPS cho **ellipsoidal**. Chênh nhau hàng chục mét. Xem [[Datums and Geodesy]].

## 2. Các sản phẩm dẫn xuất

| Sản phẩm | Nghĩa | Dùng cho |
|---|---|---|
| **Slope** | Độ dốc (độ hoặc %) | Xói mòn, quy hoạch xây dựng, đánh giá phù hợp |
| **Aspect** | Hướng dốc | Bức xạ mặt trời, sinh thái |
| **Hillshade** | Bóng đổ giả lập | **Hiển thị** — không phải phân tích |
| **Curvature** | Độ cong bề mặt | Tích tụ/phân tán dòng chảy |
| **Flow direction / accumulation** | Nước chảy đi đâu | Mạng lưới sông, lưu vực |
| **Watershed** | Ranh giới lưu vực | Quản lý tài nguyên nước |
| **Viewshed** | Nhìn thấy được từ một điểm | Viễn thông, cảnh quan, quốc phòng |
| **Contour** | Đường đồng mức | Bản đồ in |

```bash
gdaldem slope     dem.tif slope.tif -p          # -p = phần trăm
gdaldem aspect    dem.tif aspect.tif
gdaldem hillshade dem.tif hillshade.tif -z 2 -az 315 -alt 45
gdal_contour -a elev -i 10 dem.tif contours.gpkg
```

```python
# Phân tích thuỷ văn — thứ tự bước KHÔNG đổi được
from pysheds.grid import Grid
grid = Grid.from_raster("dem.tif")
dem  = grid.read_raster("dem.tif")
pit_filled = grid.fill_pits(dem)
flooded    = grid.fill_depressions(pit_filled)   # BẮT BUỘC trước flow direction
inflated   = grid.resolve_flats(flooded)
fdir  = grid.flowdir(inflated)
acc   = grid.accumulation(fdir)
```

> [!warning] Fill depressions là bước bắt buộc, không phải tuỳ chọn
> DEM thật luôn có các "hố" nhân tạo do sai số. Nếu không lấp trước, thuật toán hướng dòng chảy sẽ kết luận nước chảy vào hố rồi biến mất — mạng lưới sông tính ra sẽ đứt đoạn khắp nơi.

## 3. Cạm bẫy

- **Slope tính trên CRS địa lý.** Đơn vị ngang là **độ**, đơn vị dọc là **mét** → độ dốc vô nghĩa. **Luôn reproject sang CRS mét trước.** Đây là lỗi DEM phổ biến nhất. Xem [[Reprojection Pitfalls]].
- **Dùng DSM cho thuỷ văn** → dòng chảy vòng qua nhà và cây.
- **Không lấp hố trước khi tính dòng chảy** — xem callout.
- **Nodata thành giá trị thật.** `-32768` trong DEM cho slope khổng lồ ở rìa. Che nodata trước.
- **Slope phụ thuộc độ phân giải.** Cùng sườn núi cho độ dốc khác nhau ở DEM 30 m và 2 m — DEM thô làm trơn địa hình. So sánh slope giữa hai nguồn khác phân giải là so hai thứ khác nhau.
- **Vùng biển/hồ có giá trị 0 hoặc nodata** gây ra ranh giới giả với độ dốc dựng đứng.
- **Ghép nhiều tile DEM có đường nối** — chênh lệch nhỏ ở biên tạo ra "vách" giả. Kiểm bằng hillshade.
- **Trộn độ cao ellipsoidal và orthometric** — xem callout đầu.

## 4. Checklist áp dụng

- [ ] DEM của tôi là **DTM hay DSM** — và cái nào đúng cho phân tích này?
- [ ] Đã reproject sang **CRS mét** trước khi tính slope chưa?
- [ ] Nodata đã được che chưa? (kiểm `min`/`max` xem có giá trị lạ)
- [ ] Với thuỷ văn: đã lấp hố (fill depressions) chưa?
- [ ] Độ phân giải có phù hợp quy mô hiện tượng không?
- [ ] Nếu ghép nhiều tile: đã kiểm đường nối bằng hillshade chưa?
- [ ] Độ cao là ellipsoidal hay orthometric?
- [ ] Vùng nước có được xử lý riêng không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `gdaldem` | slope, aspect, hillshade, roughness | [gdal.org/programs/gdaldem.html](https://gdal.org/programs/gdaldem.html) |
| WhiteboxTools | Bộ phân tích địa hình/thuỷ văn phong phú nhất | [whiteboxgeo.com](https://www.whiteboxgeo.com/) |
| pysheds | Thuỷ văn trong Python | [mattbartos.com/pysheds](https://mattbartos.com/pysheds/) |
| richdem | Xử lý DEM hiệu năng cao | [richdem.readthedocs.io](https://richdem.readthedocs.io/) |
| GRASS GIS `r.watershed` | Thuỷ văn cấp nghiên cứu | [grass.osgeo.org](https://grass.osgeo.org/) |

## Tham khảo

- [Copernicus DEM — product handbook](https://spacedata.copernicus.eu/collections/copernicus-digital-elevation-model) — DEM mở chất lượng tốt nhất hiện nay
- [GDAL — gdaldem](https://gdal.org/programs/gdaldem.html) — công thức slope/aspect/hillshade
- [WhiteboxTools User Manual](https://www.whiteboxgeo.com/manual/wbt_book/intro.html) — tham chiếu phân tích địa hình đầy đủ
- [Jenson & Domingue (1988)](https://www.asprs.org/wp-content/uploads/pers/1988journal/nov/1988_nov_1593-1600.pdf) — thuật toán nền cho fill depressions và flow direction

## Liên kết

[[Raster Algebra and Zonal Statistics]] · [[Raster Formats and COG]] · [[Datums and Geodesy]] · [[Rasterio]] · [[Geospatial Data Sources]] · [[GIS]]
