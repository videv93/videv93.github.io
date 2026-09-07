---
tags: [gis, postgis, thiết-kế]
status: evergreen
---
# Spatial Database Design

> Thiết kế schema cho dữ liệu không gian giống thiết kế schema thường, **cộng thêm ba quyết định** mà nếu sai thì rất đắt để sửa: CRS lưu trữ, mô hình phiên bản theo thời gian, và ranh giới giữa dữ liệu thô và dữ liệu dẫn xuất.

## 1. Ba quyết định đặc thù

### 1.1 Một CRS lưu trữ cho toàn hệ thống

| Lựa chọn | Ưu | Nhược |
|---|---|---|
| **4326 cho mọi thứ** | Trao đổi dễ, chuẩn web | Phải transform mỗi lần đo |
| **CRS vùng (UTM) cho mọi thứ** | Đo trực tiếp, nhanh | Khó khi mở rộng ra ngoài vùng |
| **Cả hai** (cột chính + cột dẫn xuất có index) | Nhanh và linh hoạt | Tốn dung lượng, phải giữ đồng bộ |

Mặc định thực dụng: **lưu 4326 làm nguồn sự thật, thêm cột UTM đã transform cho phân tích nặng**, giữ đồng bộ bằng generated column hoặc trigger.

```sql
-- Generated column: PostgreSQL tự giữ đồng bộ, không thể lệch
ALTER TABLE parcels ADD COLUMN geom_utm geometry(MultiPolygon, 32648)
  GENERATED ALWAYS AS (ST_Transform(geom, 32648)) STORED;
CREATE INDEX ON parcels USING GIST (geom_utm);
```

### 1.2 Ranh giới thô / dẫn xuất

Tách schema rõ ràng — đây là thứ cứu bạn khi cần chạy lại:

| Schema | Nội dung | Có thể tạo lại? |
|---|---|---|
| `raw` | Dữ liệu nhập nguyên trạng, **không sửa** | Không — nạp lại từ nguồn |
| `staging` | Đã làm sạch, chuẩn hoá CRS, sửa hợp lệ | **Có** — từ `raw` |
| `analytics` | Kết quả phân tích, bảng tổng hợp | **Có** — từ `staging` |

Xem [[Spatial ETL Patterns]].

### 1.3 Phiên bản theo thời gian

Ranh giới hành chính thay đổi, thửa đất tách/gộp. Ba mô hình:

| Mô hình | Cách làm | Dùng khi |
|---|---|---|
| **Ghi đè** | Chỉ giữ trạng thái hiện tại | Dữ liệu không cần lịch sử |
| **Valid time** | Thêm `valid_from`, `valid_to` | **Mặc định tốt** cho dữ liệu hành chính |
| **Bitemporal** | Thêm cả thời gian ghi nhận | Kiểm toán, pháp lý |

```sql
CREATE TABLE communes (
  id          bigserial PRIMARY KEY,
  code        text NOT NULL,
  name        text NOT NULL,
  geom        geometry(MultiPolygon, 4326) NOT NULL,
  valid_from  date NOT NULL,
  valid_to    date,                            -- NULL = còn hiệu lực
  CONSTRAINT valid_period CHECK (valid_to IS NULL OR valid_to > valid_from)
);
CREATE INDEX ON communes USING GIST (geom);
CREATE INDEX ON communes (code, valid_from);
-- Chỉ một bản ghi còn hiệu lực cho mỗi mã
CREATE UNIQUE INDEX ON communes (code) WHERE valid_to IS NULL;
```

> [!warning] Đây không phải chi tiết lý thuyết
> Ranh giới hành chính Việt Nam thay đổi theo các đợt sáp nhập. Nếu bảng của bạn chỉ có trạng thái hiện tại, mọi phân tích trên dữ liệu lịch sử sẽ gán sai đơn vị hành chính — âm thầm. Xem [[Geospatial Data Sources]].

## 2. Quy ước schema

1. **Ràng buộc kiểu và SRID trên mọi cột hình học**: `geometry(MultiPolygon, 4326)`. Xem [[PostGIS Core Types]].
2. **Chuẩn hoá về `Multi*`** khi nhập, để tránh cột trộn kiểu.
3. **Tên cột nói rõ CRS**: `geom` (4326 mặc định) và `geom_utm`.
4. **`NOT NULL` cho hình học** trừ khi vắng mặt là có nghĩa — và nếu có nghĩa thì ghi rõ trong tài liệu.
5. **Khoá tự nhiên ổn định** (mã hành chính, mã thửa) bên cạnh khoá thay thế; nếu không, không join lại được sau khi nạp lại.
6. **Lưu metadata nguồn ngay trong bảng**: `source`, `loaded_at`, `source_version`. Xem [[Spatial Metadata]].
7. **Ràng buộc kiểm chất lượng ở CSDL**, không chỉ trong ứng dụng:

```sql
ALTER TABLE parcels ADD CONSTRAINT geom_valid CHECK (ST_IsValid(geom));
ALTER TABLE parcels ADD CONSTRAINT geom_not_empty CHECK (NOT ST_IsEmpty(geom));
```

## 3. Cạm bẫy

- **Cột hình học không ràng buộc SRID** → dữ liệu nhiều CRS trộn lẫn, phát hiện sau nhiều tháng.
- **Lưu toạ độ thành hai cột `lat`, `lon` riêng.** Không index không gian được, không dùng được hàm nào. Chỉ chấp nhận ở bảng nhập thô, và tạo cột `geometry` ngay sau đó.
- **Không có mô hình thời gian** cho dữ liệu vốn thay đổi — xem callout.
- **Sửa trực tiếp trên `raw`.** Mất khả năng chạy lại từ đầu.
- **Cột dẫn xuất được cập nhật bằng tay** thay vì generated column/trigger → lệch dần và không ai biết.
- **Không có ràng buộc hợp lệ hình học** → dữ liệu hỏng vào được CSDL rồi lan ra mọi nơi.
- **Bảng quá rộng** — trộn thuộc tính ổn định và thuộc tính đo lặp theo thời gian trong một bảng.

## 4. Checklist áp dụng

- [ ] Mọi cột hình học có ràng buộc **kiểu + SRID** chưa?
- [ ] Có ràng buộc `ST_IsValid` không?
- [ ] Tôi đã quyết định CRS lưu trữ chuẩn cho toàn hệ thống chưa?
- [ ] Có tách `raw` / `staging` / `analytics` không?
- [ ] Dữ liệu này có thay đổi theo thời gian không — và tôi có mô hình cho nó chưa?
- [ ] Có khoá tự nhiên ổn định để nạp lại và join không?
- [ ] Cột dẫn xuất có được giữ đồng bộ **tự động** không?
- [ ] Metadata nguồn (`source`, `loaded_at`) có được lưu không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Generated columns | Giữ cột dẫn xuất đồng bộ | [postgresql.org](https://www.postgresql.org/docs/current/ddl-generated-columns.html) |
| `geometry_columns` | Kiểm kê schema không gian | [[PostGIS Core Types]] |
| Table partitioning | Chia bảng lớn theo vùng/thời gian | [postgresql.org](https://www.postgresql.org/docs/current/ddl-partitioning.html) |

## Tham khảo

- [PostGIS — Database Management](https://postgis.net/docs/using_postgis_dbmanagement.html) — tạo bảng, ràng buộc, SRID
- [PostgreSQL — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) — ràng buộc kiểm chất lượng
- [PostgreSQL — Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html)
- [Snodgrass, R. — *Developing Time-Oriented Database Applications*](https://www2.cs.arizona.edu/~rts/tdbbook.pdf) — sách miễn phí về mô hình dữ liệu theo thời gian

## Liên kết

[[PostGIS Core Types]] · [[Spatial ETL Patterns]] · [[Geospatial Data Quality]] · [[PostGIS Performance Tuning]] · [[Spatial Metadata]] · [[GIS]]
