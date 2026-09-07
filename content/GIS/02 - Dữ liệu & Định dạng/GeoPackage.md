---
tags: [gis, định-dạng]
status: evergreen
---
# GeoPackage

> Một file `.gpkg` là một CSDL **SQLite** đầy đủ, chuẩn OGC, chứa nhiều lớp vector *và* raster, có index không gian, không giới hạn tên trường. Đây là câu trả lời trực tiếp cho mọi giới hạn của [[Shapefile]] — và nó đã là chuẩn từ 2014.

## 1. So sánh trực diện

| | Shapefile | **GeoPackage** |
|---|---|---|
| Số file | 4–7 file/lớp | **1 file** |
| Số lớp trong file | 1 | **Nhiều** (vector + raster + bảng thường) |
| Độ dài tên trường | 10 ký tự | **Không giới hạn thực tế** |
| Kích thước tối đa | 2 GB | ~140 TB (giới hạn SQLite) |
| Kiểu dữ liệu | Rất hạn chế | INTEGER, REAL, TEXT, BLOB, DATE, DATETIME, BOOLEAN |
| NULL | Không đáng tin | **Đúng chuẩn** |
| Bảng mã | Không chuẩn hoá | **UTF-8** |
| Index không gian | Phụ, không chuẩn | **R-tree, chuẩn hoá** |
| CRS | File `.prj` rời | Bảng `gpkg_spatial_ref_sys` trong file |
| Truy vấn SQL | Không | **Có** — SQLite đầy đủ |
| Chuẩn | Đặc tả nhà cung cấp | **OGC + ISO 19163** |

## 2. Vì sao nó tiện trong thực tế

1. **Một file để gửi đi.** Bàn giao một `.gpkg` chứa 12 lớp thay vì một zip 60 file.
2. **Truy vấn được bằng SQL ngay** — kể cả bằng `sqlite3` hay DB Browser, không cần phần mềm GIS.
3. **Chạy được offline trên di động.** Đây là lý do nó phổ biến trong thu thập dữ liệu hiện trường (QField, Mergin).
4. **Đọc bằng mọi thứ.** QGIS, ArcGIS Pro, GDAL, GeoPandas, Leaflet (qua chuyển đổi) đều hỗ trợ.
5. **Lưu được cả style và metadata** — bảng mở rộng cho phép mang theo cách hiển thị.

```bash
# Gộp nhiều shapefile thành một GeoPackage nhiều lớp
ogr2ogr -f GPKG data.gpkg roads.shp -nln roads
ogr2ogr -f GPKG -update data.gpkg parcels.shp -nln parcels
ogr2ogr -f GPKG -update data.gpkg rivers.shp -nln rivers

ogrinfo data.gpkg          # liệt kê lớp
ogrinfo -sql "SELECT COUNT(*) FROM roads" data.gpkg
```

## 3. Cạm bẫy

- **Không phải định dạng cho đồng thời nhiều người ghi.** SQLite khoá toàn file khi ghi. Nhiều người cùng sửa → dùng PostGIS, xem [[PostGIS Core Types]].
- **Trên ổ mạng (NFS/SMB) khoá SQLite không đáng tin** → nguy cơ hỏng file. Copy về máy local rồi làm việc.
- **File phình sau nhiều lần xoá/ghi.** SQLite không tự trả lại chỗ trống; chạy `VACUUM` định kỳ.
- **Không tối ưu cho đọc từ object storage.** Đọc `.gpkg` từ S3 phải tải nhiều; với cloud dùng GeoParquet/COG, xem [[Cloud Native Geospatial Formats]].
- **Raster trong GeoPackage bị giới hạn** — nó lưu tile ảnh, không phải raster khoa học nhiều band, nhiều kiểu dữ liệu. Với raster thật dùng COG.
- **Vẫn phải chú ý CRS.** GeoPackage lưu SRID đúng chuẩn, nhưng lưu đúng không có nghĩa dữ liệu *ở* CRS phù hợp cho phân tích. Xem [[Coordinate Reference Systems]].
- **Một số phần mềm cũ chỉ đọc, không ghi** GeoPackage.

## 4. Checklist áp dụng

- [ ] Tôi có đang dùng shapefile cho việc mà GeoPackage làm tốt hơn không?
- [ ] File `.gpkg` của tôi có bị nhiều tiến trình ghi đồng thời không?
- [ ] Nó có nằm trên ổ mạng không? (nếu có → chuyển về local)
- [ ] Tôi đã chạy `VACUUM` sau các đợt xoá lớn chưa?
- [ ] Mỗi lớp có index không gian chưa? (`ogrinfo` cho biết)
- [ ] Nếu nhiều người cùng sửa: tôi có nên dùng PostGIS thay thế không?
- [ ] Nếu đọc từ cloud: định dạng cloud-native có phù hợp hơn không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ogr2ogr -f GPKG` | Chuyển mọi thứ sang GeoPackage | [gdal.org](https://gdal.org/drivers/vector/gpkg.html) |
| DB Browser for SQLite | Mở và truy vấn không cần GIS | [sqlitebrowser.org](https://sqlitebrowser.org/) |
| QGIS | Đọc/ghi/tạo trực tiếp, quản lý lớp | [qgis.org](https://qgis.org/) |
| SpatiaLite | Nhánh SQLite không gian, hàm phong phú hơn | [gaia-gis.it](https://www.gaia-gis.it/fossil/libspatialite/index) |

## Tham khảo

- [OGC GeoPackage Encoding Standard](https://www.geopackage.org/spec/) — đặc tả chính thức
- [geopackage.org](https://www.geopackage.org/) — trang chủ chuẩn, có FAQ và danh sách phần mềm hỗ trợ
- [GDAL — GPKG driver](https://gdal.org/drivers/vector/gpkg.html) — tuỳ chọn tạo và giới hạn thực tế
- [switchfromshapefile.org](http://switchfromshapefile.org/) — lập luận so sánh với shapefile

## Liên kết

[[Shapefile]] · [[GeoJSON]] · [[Cloud Native Geospatial Formats]] · [[PostGIS Core Types]] · [[Spatial Metadata]] · [[GIS]]
