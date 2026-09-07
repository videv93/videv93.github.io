---
tags: [gis, note-bản-lề, meta]
status: evergreen
---
# Roadmap Half-Life

> **Note bản lề thứ hai.** Mâu thuẫn ở đây không nằm trên trục *nội dung* mà trên trục **thời gian**: seed trộn lẫn kiến thức có chu kỳ bán rã **hàng thập kỷ** với khuyến nghị công cụ có chu kỳ bán rã **hai, ba năm** — và trình bày cả hai với cùng một giọng chắc chắn, trong cùng những bảng giống hệt nhau.

## 1. Mâu thuẫn nằm ở đâu

Seed là một tài liệu duy nhất, một định dạng duy nhất, một giọng duy nhất. Nhưng nội dung của nó thuộc **hai tầng hoàn toàn khác nhau về tốc độ thay đổi**:

| Tầng | Ví dụ trong seed | Chu kỳ bán rã | Còn đúng hôm nay? |
|---|---|---|---|
| **Nguyên lý** | Hình học không gian, quan hệ topology, SQL, đại số quan hệ | **Thập kỷ** | ✅ Gần như nguyên vẹn |
| **Chuẩn** | PostGIS, GDAL, chuẩn OGC, Git | 5–15 năm | ✅ Còn vững |
| **Công cụ** | ArcMap, TileMill, Luigi, GeoPySpark | 3–7 năm | ⚠️ Nhiều thứ đã tắt |
| **Phiên bản cụ thể** | Angular 7, Vue 2, Django 2.1, QGIS 3.4, CS50P 2022 | **1–3 năm** | ❌ Đã lỗi thời |
| **Quan sát thị trường** | *"almost all backend GIS jobs require C#"* | 1–3 năm | ⚠️ Không kiểm chứng được |
| **Giá cả** | *"$23–50/month"*, *"$10, search for coupon"* | **1–2 năm** | ❌ Đã sai |

**Vấn đề không phải là seed cũ.** Vấn đề là nó **không đánh dấu tầng nào là tầng nào**. Một người mới đọc bảng *"Courses (Choose one) | Difficulty | GIS Software"* không có cách nào biết rằng dòng "ArcMap" và dòng "PostGIS" có tuổi thọ chênh nhau cả một bậc.

## 2. Vì sao seed không bị bác bỏ dứt điểm

Trước khi chỉ ra chỗ nó gãy, phải công bằng với nó:

1. **Phần lớn nội dung vẫn đúng.** Nguyên lý và chuẩn — hai tầng bền nhất — chiếm phần lớn giá trị của seed. Cấu trúc lộ trình (nền tảng → lập trình → CSDL → web) vẫn là cấu trúc đúng.
2. **Nó tự khai báo là tạm thời.** Dòng thứ ba của README ghi **"Under development"**, và nó mời đóng góp sửa lỗi. Nó không tự nhận là chân lý.
3. **Cho biết công cụ nào từng thống trị** là thông tin thật và hữu ích — bạn sẽ gặp ArcMap và FME trong hệ thống cũ của tổ chức thật.
4. **Nguồn chất lượng cao có tuổi thọ dài.** Penn State GEOG, PostGIS workshop, CS50, Helsinki Geo-Python đều còn sống và còn cập nhật sau nhiều năm — seed chọn nguồn tốt.
5. **Không có roadmap nào tránh được vấn đề này.** Mọi tài liệu tổng hợp đều bắt đầu lỗi thời từ ngày xuất bản. Đây là tính chất của thể loại, không phải khuyết điểm của tác giả.

## 3. Chỗ nó gãy

⚠️ **Gãy 1 — Không có dấu ngày trên từng khuyến nghị.** README có "Under development" ở đầu nhưng **không có ngày** trên bất kỳ mục nào. Người đọc không biết bảng nào được cập nhật lần cuối khi nào. Một dòng "cập nhật 2019-03" cạnh mỗi mục sẽ đổi hoàn toàn cách đọc.

⚠️ **Gãy 2 — Công cụ đã tắt được trình bày ngang hàng với công cụ đang sống.** ArcMap đặt cạnh ArcGIS Pro như hai lựa chọn tương đương, trong khi Esri đã chuyển hẳn sang Pro. GeoPySpark liệt kê như một hướng đi, trong khi dự án không còn hoạt động. Người mới không có cách nào phân biệt.

⚠️ **Gãy 3 — Giá cả nhúng thẳng vào bảng.** *"($23 - $50 / month)"*, *"($10, search for coupon)"*, *"($40)"*. Đây là dữ liệu có chu kỳ bán rã ngắn nhất trong cả tài liệu, và nó được đặt cùng dòng với tên khoá học — khiến toàn bộ dòng trông như đã cũ, kể cả khi khoá học vẫn tốt.

⚠️ **Gãy 4 — Khoảng trống do thời điểm, không được đánh dấu là khoảng trống.** Seed **không có** vector tile, MapLibre, PMTiles, COG, GeoParquet, STAC, DuckDB — không phải vì tác giả bỏ sót, mà vì phần lớn chúng chưa phổ biến khi seed được viết. Nhưng một tài liệu không nói *"đây là những gì tôi biết tính tới năm X"* thì người đọc sẽ hiểu nhầm sự vắng mặt là sự không quan trọng.

⚠️ **Gãy 5 — Một quan sát cá nhân được viết như một quy luật thị trường.** *"Almost all of the backend GIS development job postings **I've seen** require .Net Core"* — mệnh đề "I've seen" nằm ngay trong câu, nhưng kết luận thì được trình bày như hướng dẫn hành động. Không có số, không có thị trường, không có thời điểm. Xem [[GIS Career Paths]].

⚠️ **Gãy 6 — Liên kết phiên bản cứng trong URL.** `docs.qgis.org/3.4/`, `django/2.1/`, `cs145-fa18`, `gds18`, `sqlalchemy/en/latest` (mà "latest" nay là một API rất khác). Những link này vẫn mở được, nhưng đưa bạn tới tài liệu của phần mềm bạn không dùng.

## 4. Cách dùng seed một cách trung thực

- **Đọc seed như một *bản đồ chủ đề*, không phải một *danh sách khoá học*.** Giá trị bền nhất của nó là câu trả lời cho *"tôi cần học những mảng gì"* — và câu trả lời đó gần như vẫn đúng nguyên. Câu trả lời cho *"học ở đâu"* thì phải kiểm lại.
- **Phân tầng trước khi đọc.** Với mỗi mục, hỏi: đây là nguyên lý, chuẩn, công cụ, hay phiên bản? Đọc tầng dưới với sự hoài nghi tỉ lệ nghịch với tuổi thọ của nó.
- **Đầu tư thời gian theo chu kỳ bán rã.** 30 giờ học [[Coordinate Reference Systems]] sinh lợi trong 20 năm. 30 giờ học một phiên bản framework cụ thể sinh lợi trong 2 năm. Cả hai đều cần, nhưng tỉ lệ phân bổ nên phản ánh điều đó.
- **Học công cụ đã tắt *có chủ đích*, không tình cờ.** Bạn sẽ gặp ArcMap và FME trong hệ thống thật. Học chúng vì công việc đòi, không vì một roadmap nói đó là "safest bet".
- **Bổ sung phần seed không thể có.** Xem [[GIS Learning Resources]] cho viễn thám, cloud-native, và vector tile.

## 5. Phép kiểm bạn tự chạy được

Ba phép này áp dụng cho **mọi** tài liệu tổng hợp — kể cả vault này:

### 5.1 Phép kiểm ngày — chạy **trước** khi đọc nội dung
Tìm ngày xuất bản và ngày cập nhật gần nhất. Không tìm thấy? Kiểm commit gần nhất của repo, hoặc năm trong các URL. **Rồi mới đọc.** Biết một tài liệu viết năm 2019 đổi hoàn toàn cách bạn đọc từng dòng của nó — và đây là lý do phép kiểm này phải đi trước, không phải sau.

### 5.2 Phép kiểm sức sống — 5 phút cho mỗi công cụ
Trước khi đầu tư thời gian học một công cụ:

| Kiểm | Ở đâu | Dấu hiệu xấu |
|---|---|---|
| Commit gần nhất | GitHub | > 12 tháng không có commit |
| Phát hành gần nhất | Trang releases | Không có bản mới > 18 tháng |
| Issue được trả lời? | Issue tracker | Issue mở hàng năm không ai trả lời |
| Nhà cung cấp nói gì | Trang sản phẩm chính thức | Có trang "migration" hoặc "end of support" |
| Có ai đang tuyển? | Tin tuyển dụng | Không xuất hiện trong tin nào |

Chạy phép này trên **ArcMap, TileMill, Luigi, GeoPySpark** sẽ cho câu trả lời rõ ràng và mất tổng cộng 20 phút.

### 5.3 Phép kiểm nguồn của khẳng định
Với mọi khẳng định về thị trường hoặc xu hướng, hỏi ba câu: **Dựa trên dữ liệu gì? Thu thập khi nào? Ở thị trường nào?**

Câu *"almost all backend GIS jobs require C#"* không sống sót qua cả ba. Nó không sai — nó **không kiểm chứng được**, và đó là một trạng thái khác. Thay nó bằng dữ liệu của chính bạn: 20 tin tuyển dụng thật ở khu vực bạn nhắm tới, đếm bằng tay, mất 30 phút.

> [!warning] Phép kiểm này áp dụng cho chính vault này
> Vault này được viết **2026-09-02**. Các note về nguyên lý ([[Coordinate Reference Systems]], [[Spatial Relationships and DE-9IM]], [[Map Projections]]) sẽ bền lâu. Các note về công cụ và hệ sinh thái ([[Cloud Native Geospatial Formats]], [[MapLibre and Vector Tiles]], [[Spatial SQL in Cloud Warehouses]], [[Big Geospatial Processing]]) **sẽ lỗi thời theo đúng cách seed đã lỗi thời** — và nhanh hơn bạn nghĩ.
> Đó là lý do note này tồn tại: không phải để chê seed, mà để cài sẵn phép kiểm cho người đọc vault này sau vài năm nữa. **Chạy mục 5.2 trước khi tin bất kỳ bảng công cụ nào ở đây.**

## Tham khảo

- [gis-programming-roadmap README](https://github.com/petedannemann/gis-programming-roadmap/blob/master/README.md) — seed gốc; xem lịch sử commit của repo để biết ngày thật
- [Esri — ArcMap continued support and migration to ArcGIS Pro](https://www.esri.com/arcgis-blog/products/arcgis-desktop/administration/arcmap-continued-support/) — ví dụ về việc nhà cung cấp tự công bố vòng đời sản phẩm
- [Cloud Native Geospatial Foundation](https://cloudnativegeo.org/) — nơi theo dõi tầng công cụ đang thay đổi nhanh nhất
- [FOSS4G conference talks](https://www.osgeo.org/events/) — nguồn hiệu quả nhất để biết trạng thái hiện tại của hệ sinh thái mở
- [Open Source Society University](https://github.com/ossu/computer-science) — ví dụ đối chứng: một roadmap **có** quy trình cập nhật cộng đồng và lịch sử commit công khai

## Liên kết

[[GIS Roadmap Catalogue]] · [[Proprietary vs Open Source GIS]] · [[GIS Career Paths]] · [[GIS Learning Path]] · [[GIS Learning Resources]] · [[GIS]]
