---
tags: [gis, định-dạng, raster]
status: evergreen
---
# Raster Formats and COG

> GeoTIFF là định dạng raster phổ quát; **COG chỉ là GeoTIFF được sắp xếp lại bên trong** để đọc được từng mảnh qua HTTP. Không thêm dữ liệu mới, không đổi cấu trúc — chỉ đổi *thứ tự byte*. Đó là lý do mọi phần mềm đọc GeoTIFF đều đọc được COG.

## 1. Các định dạng raster

| Định dạng | Đặc điểm | Dùng khi |
|---|---|---|
| **GeoTIFF** | TIFF + tag địa lý; phổ quát | Mặc định cho mọi thứ |
| **COG** | GeoTIFF có tile + overview + metadata đầu file | **Lưu trữ cloud, phục vụ web** |
| **NetCDF / HDF5** | Mảng N chiều, nhiều biến, có thời gian | Khí hậu, hải dương, mô hình |
| **Zarr** | Như NetCDF nhưng chia khối cho object storage | Data cube trên cloud |
| **JPEG2000** | Nén mạnh, có thể lossless | Ảnh vệ tinh lưu trữ (Sentinel-2) |
| **ASCII Grid** | Text, dễ đọc, **rất nặng** | Chỉ để trao đổi nhỏ / debug |
| **MBTiles / PMTiles** | Tile đã cắt sẵn | Phục vụ hiển thị, không phân tích |
| **ERDAS IMG, ENVI** | Định dạng phần mềm chuyên dụng | Khi công cụ đòi |

## 2. COG hoạt động thế nào

Ba yếu tố, phải có đủ cả ba:

| Yếu tố | Nội dung | Vì sao cần |
|---|---|---|
| **Tiled** (không strip) | Dữ liệu chia ô 256×256 hoặc 512×512 | Đọc một vùng nhỏ = đọc vài tile, không phải cả hàng |
| **Overviews** | Các bản thu nhỏ (pyramid) nằm trong cùng file | Xem toàn cảnh không cần đọc độ phân giải đầy đủ |
| **Metadata ở đầu file** | IFD sắp trước dữ liệu | Client đọc 1–2 request đầu là biết bố cục |

Client (GDAL với `/vsicurl/`) dùng **HTTP range request** lấy đúng byte cần.

```bash
# Tạo COG
rio cogeo create input.tif output_cog.tif --overview-resampling average

# Hoặc bằng GDAL trực tiếp
gdal_translate input.tif cog.tif -of COG -co COMPRESS=DEFLATE -co PREDICTOR=2

# Kiểm tra — ĐỪNG bỏ bước này
rio cogeo validate output_cog.tif

# Đọc metadata từ xa mà không tải file
gdalinfo /vsicurl/https://example.com/data/cog.tif
```

## 3. Nén — bảng chọn

| Nén | Mất mát? | Dùng cho |
|---|---|---|
| `DEFLATE` + `PREDICTOR=2` | Không | **Mặc định tốt** cho dữ liệu số nguyên |
| `DEFLATE` + `PREDICTOR=3` | Không | Dữ liệu float (độ cao, chỉ số) |
| `LZW` | Không | Tương thích rộng, nén kém hơn DEFLATE |
| `ZSTD` | Không | Nhanh và nén tốt; cần GDAL mới |
| `JPEG` | **Có** | Ảnh RGB **chỉ để nhìn** |
| `WEBP` | Có/không | Tile web |
| `LERC` | Tuỳ chọn | Raster khoa học, kiểm soát sai số |

> [!warning] Đừng nén lossy dữ liệu phân tích
> JPEG trong COG rất hấp dẫn vì file nhỏ. Nhưng nếu raster là DEM hay [[Spectral Indices]], nén lossy làm **thay đổi giá trị pixel** — mọi thống kê sau đó sai. Lossy chỉ dành cho lớp nền hiển thị.

## 4. Cạm bẫy

- **Tưởng mọi GeoTIFF trên S3 là COG.** Phải validate. File không tiled sẽ khiến mỗi lần đọc kéo về toàn bộ hàng ảnh.
- **Quên tạo overview** → COG "hợp lệ một nửa": zoom gần thì nhanh, xem toàn cảnh thì rất chậm.
- **Resampling sai khi tạo overview.** Dữ liệu phân loại phải dùng `nearest` hoặc `mode`, không phải `average`. Xem [[Reprojection Pitfalls]].
- **NoData không được khai báo** → giá trị lấp đầy (0 hoặc -9999) bị tính vào thống kê. Đây là lỗi âm thầm hay gặp nhất với raster.
- **Kiểu dữ liệu quá rộng.** Lưu chỉ số 0–100 dạng `Float64` tốn gấp 8 lần `UInt8`. Chọn kiểu nhỏ nhất đủ dùng, hoặc dùng scale/offset.
- **Kích thước tile không khớp cách đọc.** Tile 512 hợp với đọc vùng lớn, 256 hợp với web tile.
- **Nhiều band lưu rời thành nhiều file** khi luôn đọc cùng nhau (hoặc ngược lại) — cân nhắc theo mẫu truy cập thật.

## 5. Checklist áp dụng

- [ ] `rio cogeo validate` có pass không?
- [ ] File có overview đủ tầng không?
- [ ] NoData có được khai báo trong metadata không?
- [ ] Nén có phù hợp (lossless cho dữ liệu phân tích)?
- [ ] Kiểu dữ liệu có nhỏ nhất có thể không?
- [ ] Overview của raster phân loại có dùng `nearest`/`mode` không?
- [ ] CRS có được ghi đúng trong file không? ([[Coordinate Reference Systems]])

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `rio cogeo` | Tạo, validate, tối ưu COG | [cogeotiff.github.io/rio-cogeo](https://cogeotiff.github.io/rio-cogeo/) |
| `gdal_translate -of COG` | Tạo COG bằng GDAL thuần | [gdal.org/drivers/raster/cog.html](https://gdal.org/drivers/raster/cog.html) |
| `gdalinfo -stats` | Xem cấu trúc, band, nodata, overview | [[GDAL and OGR]] |
| TiTiler | Phục vụ COG động qua HTTP | [developmentseed.org/titiler](https://developmentseed.org/titiler/) |

## Tham khảo

- [Cloud Optimized GeoTIFF — cogeo.org](https://cogeo.org/) — trang chuẩn, giải thích cấu trúc
- [OGC COG Standard](https://www.ogc.org/standard/cog/) — bản chuẩn hoá chính thức
- [GDAL — COG driver](https://gdal.org/drivers/raster/cog.html) — mọi tuỳ chọn tạo file
- [GDAL — GeoTIFF driver](https://gdal.org/drivers/raster/gtiff.html) — tham chiếu nén và kiểu dữ liệu

## Liên kết

[[Cloud Native Geospatial Formats]] · [[Vector vs Raster]] · [[Rasterio]] · [[Earth Observation Data Cubes]] · [[Raster Algebra and Zonal Statistics]] · [[GIS]]
