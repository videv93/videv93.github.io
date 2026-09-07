---
tags: [gis, data-engineering, etl]
status: evergreen
---
# Spatial ETL Patterns

> ETL không gian là ETL thường **cộng bốn mối lo riêng**: CRS, tính hợp lệ hình học, kích thước hình học, và topology. Bỏ qua bốn thứ đó thì pipeline chạy được nhưng dữ liệu ra sai — và sai một cách im lặng.

> [!note] Ghi chú nguồn
> Seed có mục `## ETL` với hai khoá học và sáu link (Petl, Geopetl, Airflow, Luigi) nhưng **không mô tả một pattern nào**. Đây là mục có nhiều link nhất mà ít nội dung nhất trong cả roadmap. Thư mục `08` trả lời nó.

## 1. Ba tầng — và vì sao phải tách

| Tầng | Nội dung | Quy tắc |
|---|---|---|
| **raw** | Dữ liệu nguyên trạng như lúc nhận | **Không bao giờ sửa** |
| **staging** | Đã chuẩn hoá CRS, sửa hợp lệ, đổi tên trường | Tạo lại được từ `raw` |
| **analytics** | Kết quả phân tích, bảng tổng hợp | Tạo lại được từ `staging` |

Lý do tách: khi phát hiện lỗi ở bước 5 sau ba tháng, bạn cần **chạy lại từ `raw`** mà không phải xin lại dữ liệu từ nguồn. Xem [[Spatial Database Design]].

## 2. Bốn kiểm tra bắt buộc ở cổng vào

Chạy **mọi lần nhập, không có ngoại lệ**:

```sql
-- 1. CRS có nhất quán và đúng không?
SELECT DISTINCT ST_SRID(geom) FROM raw.incoming;

-- 2. Hình học có hợp lệ không?
SELECT COUNT(*) FROM raw.incoming WHERE NOT ST_IsValid(geom);

-- 3. Có hình rỗng / NULL không?
SELECT COUNT(*) FROM raw.incoming WHERE geom IS NULL OR ST_IsEmpty(geom);

-- 4. Phạm vi có hợp lý không? (bắt lỗi đảo trục và sai CRS ngay)
SELECT ST_Extent(geom) FROM raw.incoming;
```

Bốn truy vấn này bắt được đa số vấn đề, và chạy trong vài giây. Xem [[Geospatial Data Quality]].

## 3. Các pattern

### 3.1 Full refresh
Xoá hết, nạp lại. Đơn giản nhất — **dùng nó trừ khi có lý do rõ ràng để không**.

```bash
ogr2ogr -f PostgreSQL PG:"$CONN" source.gpkg \
  -nln staging.parcels -overwrite \
  -t_srs EPSG:4326 -nlt PROMOTE_TO_MULTI -lco GEOMETRY_NAME=geom
```

### 3.2 Incremental theo khoá
Nạp vào bảng tạm rồi `INSERT ... ON CONFLICT DO UPDATE`. Cần **khoá tự nhiên ổn định**.

### 3.3 Change detection theo hình học
Khi nguồn không có dấu thời gian, so hình học bằng hash:

```sql
-- ST_AsBinary rồi hash: phát hiện thay đổi hình học mà không so từng đỉnh
SELECT id, md5(ST_AsBinary(geom)::text) AS geom_hash FROM staging.parcels;
```

> [!warning] Hash hình học rất nhạy
> Cùng một polygon nhưng khác thứ tự đỉnh, khác điểm bắt đầu của vòng, hoặc khác độ chính xác float sẽ cho **hash khác**. Chuẩn hoá trước (`ST_Normalize`, `ST_SnapToGrid`) nếu không muốn mọi hàng đều báo "đã thay đổi" mỗi lần chạy.

### 3.4 Xử lý theo lô không gian
Dữ liệu quá lớn → chia theo vùng (tile, tỉnh, ô lưới), xử lý song song, ghép lại. Nhớ **buffer vùng** để phép lân cận ở biên không bị cắt.

### 3.5 Đẩy tính toán xuống nguồn
Lọc, gộp, reproject ngay trong SQL hoặc trong `ogr2ogr -where`, thay vì kéo hết về rồi lọc. Xem [[GDAL and OGR]].

## 4. Thứ tự bước — không đổi được

```
1. Nhập nguyên trạng vào raw
2. Kiểm CRS  → transform về CRS chuẩn
3. Kiểm hợp lệ → ST_MakeValid (giữ bản ghi cái gì đã sửa)
4. Chuẩn hoá kiểu hình học (ST_Multi)
5. Chuẩn hoá thuộc tính (tên trường, kiểu, đơn vị, mã)
6. Khử trùng lặp
7. Kiểm topology nếu là coverage
8. Nạp vào staging
9. Kiểm chất lượng đầu ra → chỉ khi PASS mới publish
```

Bước 3 phải sau bước 2 (reproject có thể **tạo ra** hình học không hợp lệ), và bước 9 không bao giờ được bỏ qua.

## 5. Cạm bẫy

- **Sửa dữ liệu ở `raw`** → mất khả năng chạy lại.
- **Không ghi lại cái gì đã bị sửa.** `ST_MakeValid` có thể đổi kiểu hình học và diện tích — phải log số lượng và lưu bản gốc.
- **Reproject rồi mới kiểm hợp lệ** — sai thứ tự.
- **Full refresh không có transaction** → hệ thống rỗng giữa chừng nếu lỗi. Nạp vào bảng tạm rồi đổi tên trong một transaction.
- **Incremental không xử lý xoá.** Bản ghi biến mất ở nguồn vẫn còn ở đích mãi mãi.
- **Không kiểm số lượng đầu ra** so với đầu vào — mất dữ liệu âm thầm.
- **Pipeline không idempotent.** Chạy hai lần phải cho cùng kết quả; nếu không, mọi lần retry là một rủi ro.
- **Giả định nguồn không đổi schema.** Nguồn bên ngoài đổi tên cột mà không báo — kiểm schema ở cổng vào.

## 6. Checklist áp dụng

- [ ] Có tách `raw` / `staging` / `analytics` không?
- [ ] Bốn kiểm tra cổng vào có chạy mọi lần nhập không?
- [ ] Pipeline có **idempotent** không?
- [ ] Full refresh có chạy trong transaction không?
- [ ] Incremental có xử lý **xoá** không?
- [ ] Số lượng bản ghi vào/ra có được ghi log và so sánh không?
- [ ] Những gì bị `ST_MakeValid` sửa có được ghi lại không?
- [ ] Schema nguồn có được kiểm trước khi nạp không?
- [ ] Có cổng chất lượng chặn publish khi kiểm tra thất bại không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ogr2ogr` | Công cụ ETL không gian vạn năng | [[GDAL and OGR]] |
| geopetl | ETL không gian trên nền petl | [github.com/CityOfPhiladelphia/geopetl](https://github.com/CityOfPhiladelphia/geopetl) |
| dbt | Biến đổi bằng SQL, có test và lineage | [getdbt.com](https://www.getdbt.com/) |
| Airflow / Dagster | Điều phối | [[Geospatial Pipeline Orchestration]] |

## Tham khảo

- [petl documentation](https://petl.readthedocs.io/en/stable/) — **có trong seed**
- [geopetl](https://github.com/CityOfPhiladelphia/geopetl) — **có trong seed**, ETL không gian thực tế của một thành phố
- [GDAL — ogr2ogr reference](https://gdal.org/programs/ogr2ogr.html) — mọi tuỳ chọn biến đổi
- [A Beginner's Guide to Data Engineering (Robert Chang)](https://medium.com/@rchang/a-beginners-guide-to-data-engineering-part-i-4227c5c457d7) — **có trong seed**

## Liên kết

[[Geospatial Data Quality]] · [[Geospatial Pipeline Orchestration]] · [[Spatial Database Design]] · [[FME and Spatial ETL Tools]] · [[GDAL and OGR]] · [[GIS]]
