---
tags: [gis, công-cụ, cli]
status: evergreen
---
# GDAL and OGR

> Thư viện mà **mọi thứ khác đứng trên**: QGIS, ArcGIS Pro, PostGIS, GeoPandas, Rasterio, GeoServer. Học ba lệnh CLI của nó tiết kiệm nhiều thời gian hơn học bất kỳ phần mềm GIS nào — vì chúng làm được việc mà không cần mở giao diện nào.

## 1. Bộ lệnh cần thuộc

| Lệnh | Việc |
|---|---|
| `ogrinfo` | Xem thông tin **vector**: CRS, schema, số feature |
| `ogr2ogr` | Chuyển đổi/lọc/reproject **vector** — lệnh vạn năng |
| `gdalinfo` | Xem thông tin **raster** |
| `gdal_translate` | Chuyển đổi/cắt/đổi kiểu **raster** |
| `gdalwarp` | Reproject/ghép/cắt **raster** |
| `gdalbuildvrt` | Ghép nhiều raster thành một **ảo** (không copy dữ liệu) |
| `gdal_rasterize` / `gdal_polygonize.py` | Vector ↔ raster |

## 2. Công thức dùng hằng ngày

```bash
# Kiểm tra trước khi làm bất cứ gì
ogrinfo -so -al data.gpkg          # tóm tắt mọi lớp
gdalinfo -stats scene.tif          # thống kê, nodata, band, overview

# Chuyển đổi + reproject + lọc, tất cả trong một lệnh
ogr2ogr -f GPKG out.gpkg in.shp \
  -t_srs EPSG:4326 \
  -where "population > 1000" \
  -select "id,name,population" \
  -nln layer_name

# Cắt theo vùng
ogr2ogr -f GPKG out.gpkg in.gpkg -clipsrc 105.7 20.9 106.0 21.1

# Chạy SQL ngay trên file, không cần CSDL
ogr2ogr -f CSV out.csv in.gpkg -dialect SQLITE \
  -sql "SELECT district, COUNT(*) n, SUM(ST_Area(geometry)) area
        FROM parcels GROUP BY district"

# Nạp thẳng vào PostGIS
ogr2ogr -f PostgreSQL PG:"dbname=gis user=me" in.gpkg \
  -nln parcels -lco GEOMETRY_NAME=geom -lco FID=id -nlt PROMOTE_TO_MULTI

# Raster: reproject + nén + tile
gdalwarp -t_srs EPSG:32648 -r bilinear -co COMPRESS=DEFLATE -co TILED=YES \
  in.tif out.tif

# Ghép hàng trăm ảnh mà KHÔNG copy dữ liệu
gdalbuildvrt mosaic.vrt tiles/*.tif
gdal_translate -of COG mosaic.vrt final_cog.tif

# Đọc file từ xa mà không tải về
gdalinfo /vsicurl/https://example.com/scene.tif
ogrinfo /vsizip//vsicurl/https://example.com/data.zip
```

> [!note] `-dialect SQLITE` là tính năng bị đánh giá thấp nhất của GDAL
> Nó cho phép chạy **SQL có hàm không gian** trực tiếp trên shapefile, GeoJSON, CSV — không cần CSDL nào. Với việc phân tích một lần trên file rời, đây thường là con đường ngắn nhất.

## 3. Virtual file systems

| Tiền tố | Đọc từ |
|---|---|
| `/vsicurl/` | HTTP/HTTPS (hỗ trợ range request) |
| `/vsis3/`, `/vsigs/`, `/vsiaz/` | S3 / Google Cloud / Azure |
| `/vsizip/`, `/vsigzip/`, `/vsitar/` | Bên trong file nén |
| `/vsimem/` | Bộ nhớ |

Ghép được: `/vsizip//vsicurl/https://.../data.zip/inner.shp`. Đây là nền tảng kỹ thuật của mọi thứ "cloud-native" — xem [[Cloud Native Geospatial Formats]].

## 4. Cạm bẫy

- **Nhiều phiên bản GDAL trên một máy** — nguyên nhân số một của "cùng code, kết quả khác". Kiểm bằng `gdalinfo --version` và `ogrinfo --formats`.
- **Cài GDAL bằng pip thường đau đớn.** Dùng conda-forge, Docker (`ghcr.io/osgeo/gdal`), hoặc package hệ thống.
- **`-t_srs` vs `-s_srs`.** `-s_srs` **khai báo** CRS nguồn (khi metadata thiếu/sai); `-t_srs` là CRS **đích**. Nhầm hai cái = cùng bẫy `SetSRID`/`Transform`. Xem [[Reprojection Pitfalls]].
- **Ghi đè file mà không có `-overwrite`** → lỗi hoặc nối thêm dữ liệu ngoài ý muốn.
- **Không dùng `-nlt PROMOTE_TO_MULTI`** khi nạp vào PostGIS → lỗi kiểu hình học giữa chừng.
- **`gdalwarp` với resampling mặc định** (`nearest`) cho dữ liệu liên tục — hoặc ngược lại. Chỉ định rõ `-r`.
- **Quên `-co COMPRESS`** → file raster to gấp nhiều lần cần thiết.
- **Grid shift file thiếu trong container** → datum shift âm thầm kém chính xác. Xem [[Datums and Geodesy]].

## 5. Checklist áp dụng

- [ ] Tôi đã chạy `ogrinfo -so` / `gdalinfo` **trước khi** viết code chưa?
- [ ] Phiên bản GDAL có được ghim và giống nhau ở mọi môi trường không?
- [ ] `-s_srs` và `-t_srs` có đúng vai trò không?
- [ ] Tôi có lọc (`-where`, `-select`, `-clipsrc`) ngay trong lệnh thay vì sau đó không?
- [ ] Raster ghi ra có nén và tile không?
- [ ] Resampling có phù hợp loại dữ liệu không?
- [ ] Với nhiều file: tôi có dùng VRT thay vì copy dữ liệu không?
- [ ] Việc này có làm được bằng một lệnh `ogr2ogr` thay vì một script Python không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ogrinfo --formats` / `gdalinfo --formats` | Xem driver khả dụng của bản cài | [gdal.org](https://gdal.org/) |
| Docker `ghcr.io/osgeo/gdal` | Môi trường GDAL sạch, cố định phiên bản | [github.com/OSGeo/gdal](https://github.com/OSGeo/gdal) |
| conda-forge `gdal` | Cài đặt ít đau nhất | [anaconda.org/conda-forge/gdal](https://anaconda.org/conda-forge/gdal) |

## Tham khảo

- [GDAL documentation](https://gdal.org/) — tài liệu chính thức
- [GDAL — Programs (ogr2ogr, gdalwarp…)](https://gdal.org/programs/index.html) — tham chiếu mọi tuỳ chọn CLI
- [GDAL — Virtual File Systems](https://gdal.org/user/virtual_file_systems.html) — đọc từ cloud/zip
- [OGR SQL and SQLite dialect](https://gdal.org/user/sql_sqlite_dialect.html) — chạy SQL không gian trên file

## Liên kết

[[Fiona and Pyogrio]] · [[Rasterio]] · [[Spatial ETL Patterns]] · [[GIS Software Landscape]] · [[Cloud Native Geospatial Formats]] · [[GIS]]
