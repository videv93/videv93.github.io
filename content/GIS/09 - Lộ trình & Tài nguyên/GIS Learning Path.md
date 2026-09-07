---
tags: [gis, lộ-trình]
status: evergreen
---
# GIS Learning Path

> Bản viết lại của seed roadmap, sửa **ba vấn đề cấu trúc** của nó: nó bỏ qua hệ toạ độ, nó dạy công cụ trước khái niệm, và nó tuyến tính tới mức bạn phải học ~500 giờ trước khi làm được thứ gì thật.

## 1. Ba thay đổi so với seed

|              | Seed roadmap                    | Lộ trình này                               |
| ------------ | ------------------------------- | ------------------------------------------ |
| Bắt đầu bằng | 40 giờ bấm nút phần mềm desktop | **Khái niệm + một dự án nhỏ**              |
| Hệ toạ độ    | **Không có mục nào**            | Chặng 1, trước mọi thứ khác                |
| Viễn thám    | Không có                        | Chặng tuỳ chọn                             |
| Thứ tự       | Tuyến tính, học hết mới làm     | **Dự án ở mỗi chặng**                      |
| Đích         | GIS Developer                   | Ba nghề, chọn nhánh — [[GIS Career Paths]] |

## 2. Sáu chặng

### Chặng 0 — Định hướng (2–4 giờ)
Đọc [[What Is GIS]], [[GIS Career Paths]], [[Proprietary vs Open Source GIS]]. Quyết định nghề nhắm tới và stack. Chạy **phép kiểm thị trường** ở note bản lề: đọc 20 tin tuyển dụng thật ở khu vực bạn nhắm tới.

### Chặng 1 — Nền tảng khái niệm (20–30 giờ)
**Đây là chặng seed bỏ qua, và là chặng quan trọng nhất.**

| Học                         | Note                                                  |
| --------------------------- | ----------------------------------------------------- |
| GIS là gì, vector vs raster | [[What Is GIS]], [[Vector vs Raster]]                 |
| **Hệ toạ độ và phép chiếu** | [[Coordinate Reference Systems]], [[Map Projections]] |
| Mô hình dữ liệu, định dạng  | [[Spatial Data Models]], [[GeoPackage]]               |
| Quan hệ không gian          | [[Spatial Relationships and DE-9IM]]                  |

Song song: một khoá desktop (QGIS hoặc ArcGIS Pro) từ [[GIS Roadmap Catalogue]] mục 1.

> **Dự án chặng 1:** tải một bộ dữ liệu thật từ [[Geospatial Data Sources]], mở bằng QGIS, trả lời một câu hỏi không gian, xuất một bản đồ. Không viết code.

### Chặng 2 — Lập trình (40–80 giờ, bỏ qua nếu đã biết)
Python là mặc định. Catalogue mục 2 và 3.

> **Dự án chặng 2:** lặp lại dự án chặng 1 **hoàn toàn bằng code**, chạy lại được từ đầu.

### Chặng 3 — Python cho GIS (40–60 giờ)

| Học | Note |
|---|---|
| GeoPandas, Shapely | [[GeoPandas]], [[Shapely]] |
| I/O và GDAL | [[Fiona and Pyogrio]], [[GDAL and OGR]] |
| Phân tích không gian | [[Spatial Joins]], [[Overlay Operations]], [[Buffer and Proximity Analysis]] |
| Chất lượng dữ liệu | [[Geometry Validity and Topology]] |

Catalogue mục 4.

> **Dự án chặng 3:** một notebook lấy dữ liệu thô, làm sạch, phân tích, và xuất kết quả — kèm kiểm tra chất lượng.

### Chặng 4 — SQL và Spatial SQL (30–50 giờ)

| Học | Note |
|---|---|
| SQL nền | Catalogue mục 5 |
| PostGIS | [[PostGIS Core Types]], [[Spatial SQL Query Patterns]] |
| Hiệu năng | [[Spatial Indexing with GiST]], [[PostGIS Performance Tuning]] |
| Thiết kế | [[Spatial Database Design]] |

Catalogue mục 6.

> **Dự án chặng 4:** đưa dữ liệu chặng 3 vào PostGIS, làm lại phân tích bằng SQL, so sánh tốc độ.

### Chặng 5 — Chọn nhánh (60–120 giờ)

| Nhánh | Học gì | Thư mục |
|---|---|---|
| **Web GIS** | Nền web → kiến trúc → tile → client | `07` — bắt đầu ở [[Web Mapping Architecture]] |
| **Data engineering** | ETL → chất lượng → orchestration → quy mô | `08` — bắt đầu ở [[Spatial ETL Patterns]] |
| **Viễn thám** | Phổ → nguồn ảnh → chỉ số → data cube | `06` — bắt đầu ở [[Remote Sensing Fundamentals]] |

Catalogue mục 7–12 cho nhánh Web GIS và ETL.

> **Dự án chặng 5:** một sản phẩm hoàn chỉnh, công khai, dùng **dữ liệu thật** — bản đồ web, pipeline chạy theo lịch, hoặc phân tích ảnh vệ tinh.

## 3. Nguyên tắc

1. **Làm dự án ở mỗi chặng, không đợi học xong.** Đây là sửa chữa quan trọng nhất so với seed.
2. **Khái niệm trước công cụ.** [[Coordinate Reference Systems]] chuyển được sang mọi phần mềm; vị trí nút bấm thì không.
3. **SQL không phải tuỳ chọn** ở bất kỳ nhánh nào.
4. **Dữ liệu thật, không phải dữ liệu mẫu.** Dữ liệu mẫu đã sạch — và mọi kỹ năng thật nằm ở chỗ làm sạch.
5. **Đừng học cả ba nhánh cùng lúc.** Chọn một, làm tới nơi, rồi mở rộng.
6. **Ghi lại cái bạn học.** Vault này là ví dụ.

## 4. Cạm bẫy

- **Học desktop GIS 40 giờ trước khi biết projection là gì** — thứ tự của seed, và nó tạo ra người bấm nút thành thạo mà không hiểu kết quả.
- **Nhảy sang Web GIS mà bỏ qua chặng 1.** Bạn sẽ dựng được bản đồ đẹp hiển thị dữ liệu sai.
- **Sưu tầm khoá học thay vì làm dự án.** 90 link trong catalogue là một cái bẫy nếu bạn cố học hết.
- **Học cả ArcGIS lẫn QGIS cùng lúc** ở chặng 1 — chọn một, cái kia học sau rất nhanh.
- **Bỏ qua Git.** Không có nó thì không có dự án nào chia sẻ hay chạy lại được.
- **Không bao giờ để người khác xem code.** Code review là con đường học nhanh nhất.

## 5. Checklist tiến độ

- [ ] Tôi giải thích được **CRS** cho người khác chưa?
- [ ] Tôi có phân biệt được khi nào dùng vector, khi nào raster không?
- [ ] Tôi viết được spatial join bằng SQL **và** bằng Python chưa?
- [ ] Tôi có một dự án công khai dùng **dữ liệu thật** chưa?
- [ ] Tôi có chạy lại được phân tích của mình từ đầu, tự động, không thao tác tay không?
- [ ] Tôi kiểm được chất lượng dữ liệu trước khi phân tích chưa?
- [ ] Tôi đã chọn **một nhánh** ở chặng 5 chưa?
- [ ] Tôi có biết 10 tin tuyển dụng ở khu vực mình đòi kỹ năng gì không?

## Tham khảo

- [gis-programming-roadmap](https://github.com/petedannemann/gis-programming-roadmap/blob/master/README.md) — seed gốc mà lộ trình này viết lại
- [Open Source Society University](https://github.com/ossu/computer-science#introduction-to-computer-science) — mô hình lộ trình tự học có cấu trúc
- [Automating GIS Processes (Helsinki)](https://autogis-site.readthedocs.io/en/latest/) — khoá miễn phí bao trùm chặng 3
- [Introduction to PostGIS](https://postgis.net/workshops/postgis-intro/) — khoá miễn phí bao trùm chặng 4

## Liên kết

[[GIS Roadmap Catalogue]] · [[GIS Career Paths]] · [[GIS Learning Resources]] · [[Roadmap Half-Life]] · [[GIS Glossary]] · [[GIS]]
