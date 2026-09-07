---
tags: [gis, hệ-toạ-độ, cạm-bẫy]
status: evergreen
---
# Reprojection Pitfalls

> Danh sách những lỗi CRS thật sự xảy ra trong công việc, sắp theo **mức độ âm thầm** — vì lỗi to tiếng thì tự nó sửa được, còn lỗi im lặng mới là lỗi đắt.

## 1. Bảng chẩn đoán theo triệu chứng

| Triệu chứng | Nguyên nhân gần như chắc chắn | Cách sửa |
|---|---|---|
| Dữ liệu VN nằm ở **vịnh Guinea (0,0)** | Toạ độ rỗng/NULL bị hiểu thành 0 | Lọc geometry rỗng trước |
| Dữ liệu VN nằm ở **Somalia** | **Đảo trục** lat/lon | Hoán đổi x/y; xem [[EPSG Codes]] |
| Dữ liệu nằm **ngoài Trái Đất** hoặc không hiện | Dữ liệu mét bị gán CRS bậc | `ST_SetSRID` đúng mã rồi `ST_Transform` |
| Buffer 100 m ra **to bằng châu lục** | Buffer bằng **độ** trên 4326 | Transform sang UTM trước |
| Diện tích lệch **2–4 lần** ở vĩ độ cao | Đo trên EPSG:3857 | Dùng equal-area hoặc UTM |
| Hai lớp lệch nhau **~100–200 m** đều đặn | **Datum shift** bị bỏ qua | Xem [[Datums and Geodesy]] |
| Hai lớp lệch dần theo khoảng cách | Sai múi UTM | Đổi sang múi đúng |
| Join không gian trả về **rỗng** | Hai lớp khác CRS | Kiểm `ST_SRID` cả hai |
| Kết quả khác nhau giữa **máy dev và CI** | Khác phiên bản PROJ/GDAL hoặc thiếu grid file | Cố định phiên bản, cài PROJ-data |

## 2. Bốn lỗi âm thầm nhất

### 2.1 Gán nhầm thay vì chuyển

```sql
-- SAI: chỉ dán nhãn, toạ độ giữ nguyên → dữ liệu sai vị trí
UPDATE parcels SET geom = ST_SetSRID(geom, 4326);

-- ĐÚNG: tính lại toạ độ
UPDATE parcels SET geom = ST_Transform(geom, 4326);

-- ĐÚNG khi metadata sai nhưng toạ độ đúng: gán rồi mới chuyển
UPDATE parcels SET geom = ST_Transform(ST_SetSRID(geom, 32648), 4326);
```

Phép phân biệt: **`SetSRID` sửa cái nhãn sai; `Transform` sửa cái toạ độ.** Nếu bạn không chắc nhãn hiện tại đúng hay sai, đừng chạy `Transform`.

### 2.2 Đo trên hệ địa lý

```sql
-- SAI: đơn vị là ĐỘ, không phải mét
SELECT ST_Area(geom), ST_Distance(a.geom, b.geom) FROM plots;  -- geom là 4326

-- ĐÚNG 1: chuyển sang CRS mét phù hợp vùng
SELECT ST_Area(ST_Transform(geom, 32648)) AS area_m2 FROM plots;

-- ĐÚNG 2: dùng kiểu geography (tính trắc địa, đơn vị mét)
SELECT ST_Area(geom::geography) AS area_m2 FROM plots;
```

Xem [[Geodesic vs Planar Measurement]] để biết khi nào chọn cách nào.

### 2.3 Reproject dây chuyền

Mỗi lần biến đổi tích luỹ sai số làm tròn. Chuyển `A → B → C` kém chính xác hơn `A → C`. Trong pipeline, **giữ CRS gốc tới bước cuối** rồi chuyển một lần.

### 2.4 Reproject raster mà không nghĩ tới resampling

Raster reproject phải **nội suy lại giá trị ô** — đây là chỗ dữ liệu bị biến đổi thật sự:

| Phương pháp | Dùng cho | Không dùng cho |
|---|---|---|
| **Nearest** | Dữ liệu **phân loại** (loại đất, lớp phủ) | Dữ liệu liên tục (làm răng cưa) |
| **Bilinear** | Dữ liệu liên tục (độ cao, nhiệt độ) | Dữ liệu phân loại — **tạo ra lớp không tồn tại** |
| **Cubic / Lanczos** | Ảnh để nhìn | Dữ liệu cần giữ giá trị gốc |

> [!warning] Lỗi kinh điển
> Reproject bản đồ lớp phủ (giá trị 1=rừng, 2=nước, 3=đô thị) bằng **bilinear** sẽ tạo ra ô giá trị 1,7 — một lớp không hề tồn tại. Luôn dùng `nearest` cho dữ liệu phân loại. Xem [[Raster Formats and COG]].

## 3. Nguyên tắc phòng ngừa

1. **Kiểm CRS ở cổng vào, một lần, cho mọi nguồn.** Không rải rác giữa pipeline.
2. **Ghi CRS vào tên**: `geom_4326`, `dem_utm48.tif`. Tên là tài liệu rẻ nhất.
3. **Thêm ràng buộc CRS ở CSDL.** PostGIS cho phép ràng buộc SRID trên cột — dùng nó. Xem [[Spatial Database Design]].
4. **Cố định phiên bản GDAL/PROJ trong container.** Xem [[Geospatial Testing and CI]].
5. **Test bằng một điểm đã biết.** Giữ một toạ độ mốc mà bạn biết chắc vị trí, chạy qua pipeline, kiểm nó vẫn đúng.

## 4. Checklist áp dụng

- [ ] Tôi đã in `ST_SRID` / `.crs` của **mọi** đầu vào ra log chưa?
- [ ] Tôi đang dùng `SetSRID` hay `Transform` — và tôi có chắc nhãn hiện tại đúng không?
- [ ] Mọi phép đo (area, distance, buffer) có ở CRS mét hoặc kiểu `geography` không?
- [ ] Raster phân loại của tôi có được resample bằng `nearest` không?
- [ ] Pipeline có reproject nhiều bước liên tiếp không?
- [ ] CI có cùng phiên bản PROJ và có grid shift file như máy dev không?
- [ ] Tôi có một **điểm mốc kiểm thử** chạy qua toàn pipeline không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `gdalsrsinfo` / `ogrinfo -so` | Xem CRS của file bất kỳ | [[GDAL and OGR]] |
| `gdalwarp -r near -t_srs` | Reproject raster có kiểm soát resampling | [gdal.org](https://gdal.org/programs/gdalwarp.html) |
| `projinfo -s A -t B` | Xem pipeline biến đổi được chọn | [proj.org](https://proj.org/en/stable/apps/projinfo.html) |

## Tham khảo

- [PROJ — Transformation pipelines](https://proj.org/en/stable/usage/transformation.html) — hiểu chuyện gì xảy ra khi transform
- [GDAL — gdalwarp resampling methods](https://gdal.org/programs/gdalwarp.html) — bảng phương pháp resample chính thức
- [PostGIS — ST_Transform vs ST_SetSRID](https://postgis.net/docs/ST_Transform.html) — phân biệt trực tiếp trong tài liệu
- [GIS StackExchange — "Why is my buffer huge?"](https://gis.stackexchange.com/questions/tagged/buffer) — kho triệu chứng thực tế

## Liên kết

[[Coordinate Reference Systems]] · [[Geodesic vs Planar Measurement]] · [[Datums and Geodesy]] · [[EPSG Codes]] · [[Geospatial Data Quality]] · [[GIS]]
