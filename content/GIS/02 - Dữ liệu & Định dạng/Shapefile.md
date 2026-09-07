---
tags: [gis, định-dạng]
status: evergreen
---
# Shapefile

> Định dạng do Esri công bố năm 1998, kỹ thuật đã lỗi thời về mọi mặt, và vẫn là thứ bạn sẽ nhận được khi xin dữ liệu từ một cơ quan nhà nước. Biết **chính xác** nó hỏng ở đâu quan trọng hơn là ghét nó.

## 1. Nó thật ra là gì

Shapefile **không phải một file** — nó là một bộ file phải đi cùng nhau:

| Đuôi | Nội dung | Bắt buộc |
|---|---|---|
| `.shp` | Hình học | ✅ |
| `.shx` | Chỉ mục vị trí trong `.shp` | ✅ |
| `.dbf` | Bảng thuộc tính (dBASE III!) | ✅ |
| `.prj` | Định nghĩa CRS dạng WKT | ❌ **nhưng thiếu là tai hoạ** |
| `.cpg` | Bảng mã ký tự của `.dbf` | ❌ nhưng cần cho tiếng Việt |
| `.sbn`/`.sbx`, `.qix` | Chỉ mục không gian | ❌ |

> [!warning] Gửi shapefile qua email
> Gửi mỗi `.shp` là gửi một file vô dụng. Luôn **zip cả bộ**. Thiếu `.prj` → người nhận phải đoán CRS; thiếu `.cpg` → tên tiếng Việt thành ký tự rác.

## 2. Bảy giới hạn cứng

| Giới hạn | Con số | Hậu quả thực tế |
|---|---|---|
| **Tên trường** | tối đa **10 ký tự** | `population_density` → `population`, rồi `populati_1` |
| **Số trường** | ~255 | Bảng rộng bị cắt |
| **Kích thước file** | **2 GB** mỗi `.shp`/`.dbf` | Dữ liệu lớn đơn giản là không lưu được |
| **Kiểu dữ liệu** | Không có bool, không có datetime thật, không có NULL đúng nghĩa | `NULL` thành `0` hoặc chuỗi rỗng — **âm thầm** |
| **Một kiểu hình học / file** | 1 | Không trộn điểm và đường |
| **Bảng mã** | Không chuẩn hoá | Tiếng Việt hỏng nếu thiếu `.cpg` |
| **Không lưu topology** | — | Xem [[Geometry Validity and Topology]] |

> [!note] Cạm bẫy đắt nhất là NULL
> Trong `.dbf`, một số nguyên NULL thường được ghi thành `0`. Nếu cột đó là "số ca bệnh" hay "giá đất", **dữ liệu thiếu biến thành dữ liệu bằng không** — và mọi thống kê trung bình sau đó đều sai mà không có dấu hiệu nào.

## 3. Nguyên tắc làm việc với shapefile

1. **Nhận shapefile thì được; *lưu trữ* bằng shapefile thì không.** Convert sang [[GeoPackage]] hoặc GeoParquet ngay khi nhập, giữ bản gốc để đối chiếu.
2. **Kiểm `.prj` trước tiên.** Không có `.prj` thì không có [[Coordinate Reference Systems]], và mọi phép đo sau đó là phỏng đoán.
3. **Đặt tên trường ≤10 ký tự ngay từ đầu** nếu buộc phải xuất shapefile — để *bạn* kiểm soát việc cắt tên chứ không phải GDAL.
4. **Kiểm bảng mã ngay.** Mở `.dbf`, nhìn một tên tiếng Việt. Sai thì thêm `.cpg` chứa `UTF-8`.
5. **Đếm feature trước và sau mọi lần convert.** Rẻ, và bắt được phần lớn lỗi im lặng.

## 4. Cạm bẫy

- **Tên trường bị cắt trùng nhau** → GDAL tự thêm hậu tố `_1`, `_2`. Sau vài vòng chuyển đổi thì không ai còn biết cột nào là cột nào.
- **Ngày tháng mất phần giờ.** `.dbf` chỉ có kiểu Date, không có DateTime.
- **File 2 GB im lặng bị cắt** ở một số công cụ cũ thay vì báo lỗi.
- **Hình học không hợp lệ được chấp nhận.** Shapefile không kiểm tính hợp lệ; polygon tự cắt lưu được bình thường rồi nổ ở PostGIS.
- **Quy ước chiều quay vòng ngược với [[GeoJSON]].** Shapefile: vòng ngoài thuận chiều kim đồng hồ; GeoJSON (RFC 7946): ngược chiều. Converter tốt xử lý được, converter tự viết thì không.
- **Nhiều `.shp` trong một zip** làm nhiều công cụ chỉ đọc cái đầu tiên.

## 5. Checklist áp dụng

- [ ] Bộ file có đủ `.shp` + `.shx` + `.dbf` + **`.prj`** không?
- [ ] `ogrinfo -so` cho ra CRS hợp lý chứ?
- [ ] Tên trường có bị cắt/trùng không? Tôi có bản đồ tên gốc → tên cắt không?
- [ ] Tiếng Việt trong bảng thuộc tính hiển thị đúng không?
- [ ] Có cột nào mà `0` thật ra là `NULL` không?
- [ ] Tôi đã convert sang định dạng hiện đại để làm việc chưa?
- [ ] Số feature trước và sau convert có khớp không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ogrinfo -so file.shp` | Xem CRS, số feature, schema | [[GDAL and OGR]] |
| `ogr2ogr -f GPKG out.gpkg in.shp` | Chuyển sang GeoPackage | [gdal.org](https://gdal.org/programs/ogr2ogr.html) |
| `ogr2ogr -lco ENCODING=UTF-8` | Xử lý bảng mã | [gdal.org](https://gdal.org/drivers/vector/shapefile.html) |

## Tham khảo

- [Esri Shapefile Technical Description (whitepaper gốc 1998)](https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf) — đặc tả chính thức
- [GDAL — ESRI Shapefile driver](https://gdal.org/drivers/vector/shapefile.html) — danh sách giới hạn và tuỳ chọn thực tế
- [switchfromshapefile.org](http://switchfromshapefile.org/) — tổng hợp có hệ thống mọi giới hạn của định dạng
- [OGC GeoPackage](https://www.geopackage.org/) — thứ nên dùng thay thế

## Liên kết

[[GeoPackage]] · [[GeoJSON]] · [[Cloud Native Geospatial Formats]] · [[Spatial Metadata]] · [[GDAL and OGR]] · [[GIS]]
