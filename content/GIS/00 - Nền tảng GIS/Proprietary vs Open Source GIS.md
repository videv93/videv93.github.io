---
tags: [gis, nền-tảng, note-bản-lề]
status: evergreen
---
# Proprietary vs Open Source GIS

> **Note bản lề.** Seed roadmap dạy hai hệ giá trị chỏi nhau trong cùng một tài liệu, và không nói ra rằng chúng chỏi nhau. Note này ghi lại cả hai một cách trung thực, chỉ ra chỗ chúng thật sự va chạm, và đưa ra phép kiểm để **bạn** tự quyết — thay vì để một README quyết hộ.

## 1. Mâu thuẫn nằm ở đâu

Seed tự mô tả là *"a mixture of proprietary (ESRI) and open-source materials"* — nghe như trung lập. Nhưng đọc kỹ thì nó **nghiêng về một phía ở phần khuyên, và nghiêng về phía kia ở phần dạy**:

| Chỗ | Seed nói gì | Nghiêng về |
|---|---|---|
| GIS Fundamentals | ArcMap/ArcPro *"most widely used in the industry and learning them is the **safest bet** at dipping your feet into the industry"* | **ESRI** |
| GIS Fundamentals | Getting to Know ArcPro *"is well worth the money if you are serious about entering the field"* | **ESRI** |
| GIS Programming | Hai khoá song song: GEOG 485 (ArcPy) **và** Automating GIS Processes (GDAL, GeoPandas, Shapely) | Cả hai |
| Spatial SQL | Chỉ có PostgreSQL/PostGIS và BigQuery. **Không có** Esri geodatabase | **Mở** |
| ETL | FME (thương mại) cạnh petl/geopetl (mở) | Cả hai |
| Web GIS | *"Do both"* — GEOG 863 (ArcGIS JS API) **và** GEOG 585 (QGIS, GDAL, GeoServer, Leaflet) | Cả hai |
| Backend | *"almost all of the backend GIS development job postings I've seen require .Net Core (C#)"* | **ESRI/Microsoft** |

Nói cách khác: seed **khuyên** người mới đi đường ESRI vì lý do thị trường lao động, nhưng **dạy** phần lớn kỹ thuật bằng công cụ mở vì đó là chỗ tài liệu miễn phí và chất lượng nằm. Đây không phải mâu thuẫn ngẫu nhiên — nó phản ánh một căng thẳng có thật trong chính ngành GIS.

## 2. Vì sao phía ESRI không bị bác bỏ dứt điểm

Cộng đồng mã nguồn mở hay bỏ qua những điểm này, nhưng chúng có thật:

1. **Thị phần tổ chức là có thật.** Rất nhiều cơ quan nhà nước, tiện ích, quốc phòng đã chuẩn hoá trên ArcGIS Enterprise nhiều thập kỷ. Việc làm ở đó là việc làm thật.
2. **Sản phẩm tích hợp trọn gói.** ArcGIS Pro + Enterprise + Online cho một đường đi từ dữ liệu tới ứng dụng có hỗ trợ chính thức. Ghép QGIS + PostGIS + GeoServer + MapLibre là bốn dự án, bốn chu kỳ phát hành, bốn nơi để hỏng.
3. **Có người chịu trách nhiệm.** Khi hệ thống hỏng lúc 2 giờ sáng, hợp đồng hỗ trợ là một tài sản thật. Với công cụ mở, người chịu trách nhiệm là bạn.
4. **Một số lĩnh vực có chuẩn de facto gắn với ESRI** — địa chính, quản lý mạng lưới tiện ích (utility network), quy hoạch ở nhiều nước.
5. **Đào tạo và chứng chỉ có đường đi rõ ràng**, điều mà hệ mở không có tương đương.

## 3. Chỗ hai bên thật sự đồng thuận

Nhiều hơn ta tưởng — và đây là phần đáng học nhất, vì nó **bền qua mọi lần đổi stack**:

| Khái niệm | ESRI gọi là | Mở gọi là | Có khác về bản chất? |
|---|---|---|---|
| Hệ toạ độ | Coordinate System, Projection | CRS, EPSG, PROJ | **Không** — cùng lý thuyết trắc địa |
| Quan hệ không gian | Select By Location | `ST_Intersects`, DE-9IM | **Không** — cùng mô hình DE-9IM |
| Chồng lớp | Intersect, Union, Clip tool | `ST_Intersection`, `ST_Union` | **Không** — GEOS và Esri cùng một đại số |
| Chỉ mục không gian | Spatial index | GiST / R-tree | **Không** — cùng họ thuật toán |
| Định dạng | File Geodatabase | [[GeoPackage]] | Cùng ý tưởng: một file, nhiều lớp |
| Dịch vụ | Feature Service | WFS / OGC API Features | Khác giao thức, **cùng mục đích** |
| Ảnh | Mosaic Dataset | STAC + COG | Khác cách tổ chức, cùng bài toán |

> [!note] Hệ quả cho việc học
> **Khái niệm chuyển được; nút bấm thì không.** Người hiểu DE-9IM đọc được cả `ST_Within` lẫn "Select By Location → are within". Người chỉ thuộc vị trí nút bấm trong ArcMap thì mất trắng khi đổi công cụ. Đây là lý do vault này tổ chức theo **khái niệm** (thư mục 01–03) và chỉ coi công cụ là lớp phủ bên trên.

## 4. Chỗ lập luận của seed gãy

⚠️ **"Safest bet" là một khẳng định về rủi ro, và seed không kiểm chứng nó.** Một canh bạc an toàn phải xét cả rủi ro dài hạn:

- ⚠️ **ArcMap đã hết vòng đời.** Seed đặt ArcMap ngang hàng ArcPro như hai lựa chọn tương đương. Esri đã chuyển hẳn sang ArcGIS Pro và ArcMap không còn là sản phẩm được phát triển. Học ArcMap hôm nay là học một công cụ đang tắt.
- ⚠️ **Rào cản license làm hỏng chính lời khuyên.** Seed bảo học ArcPro nhưng license thật cho cá nhân đắt; nó phải chèn *"comes with a free one-year license"* như một cách lách. Một lộ trình mà bước đầu tiên hết hạn sau 12 tháng là một lộ trình mỏng manh.
- ⚠️ **"Hầu hết job postings đòi C#" là chứng cứ giai thoại.** Đó là quan sát cá nhân (*"I've seen"*), không có số, không nói thị trường nào, không nói thời điểm nào. Nó có thể đúng với vùng của tác giả và sai hoàn toàn với vùng của bạn.
- ⚠️ **Seed không nhắc tới chi phí chuyển đổi ngược.** Đi từ kỹ năng mở sang ESRI dễ (khái niệm giống, GUI học nhanh). Đi ngược lại khó hơn, vì người chỉ quen GUI thiếu nền code và SQL.
- ⚠️ **Phía mở cũng có điểm yếu mà seed không nói.** Không có SLA; tài liệu chất lượng không đều; nâng cấp GDAL/PROJ có thể phá pipeline (xem [[GDAL and OGR]]); và trách nhiệm vận hành đổ hết lên đội của bạn.

## 5. Cách dùng cả hai một cách trung thực

- **Dùng hệ mở như *nền học*, dùng ESRI như *kỹ năng thị trường*.** Học khái niệm bằng QGIS/PostGIS/Python (miễn phí, không hết hạn, tự động hoá được), rồi học ArcGIS Pro như một lớp ánh xạ khi công việc đòi.
- **Đừng dùng ESRI như lý do bỏ SQL và code.** Đây là sai lầm đắt nhất. ArcPy là Python; Feature Service là REST. Nền kỹ thuật vẫn bắt buộc.
- **Đừng dùng "mã nguồn mở" như lý do từ chối một công việc tốt.** Tổ chức chạy ESRI vẫn cần người hiểu projection, topology và pipeline — và thường thiếu trầm trọng.
- **Giữ dữ liệu ở định dạng mở dù stack là gì.** [[GeoPackage]], GeoParquet, COG đọc được bởi cả hai phía. Đây là bảo hiểm rẻ nhất chống khoá vendor.
- **Đánh giá theo tổng chi phí sở hữu, không theo giá license.** Mở = license 0đ + chi phí vận hành cao. Thương mại = license cao + chi phí vận hành thấp hơn. Đội càng nhỏ, cán cân càng nghiêng về thương mại; đội càng mạnh kỹ thuật, càng nghiêng về mở.

## 6. Phép kiểm bạn tự chạy được

Biến tranh cãi thành việc làm được — **chạy ba phép này trước khi chọn stack**:

1. **Phép kiểm thị trường (30 phút).** Lấy 20 tin tuyển dụng GIS thật ở khu vực bạn nhắm tới. Đếm: bao nhiêu tin nhắc ArcGIS? bao nhiêu nhắc PostGIS/Python? bao nhiêu nhắc C#? Con số của **bạn** thay thế câu "I've seen" của seed.
2. **Phép kiểm chuyển đổi.** Lấy một phân tích bạn làm được ở công cụ A, làm lại ở công cụ B. Nếu bạn làm được, bạn đang học *khái niệm*. Nếu bạn kẹt vì không tìm thấy nút, bạn đang học *giao diện*.
3. **Phép kiểm thoát hiểm.** Hỏi: *"nếu ngày mai license này biến mất, tôi lấy dữ liệu và logic của mình ra bằng cách nào, mất bao lâu?"* Không trả lời được thì rủi ro của bạn cao hơn bạn tưởng — bất kể phía nào.

> [!warning] Phép kiểm quan trọng nhất
> Với **mọi** lời khuyên chọn công cụ, kể cả note này, hỏi: *"kết luận này dựa trên số liệu nào, thu thập khi nào, ở thị trường nào?"* Câu *"safest bet"* trong seed không sống sót qua câu hỏi đó. Xem [[Roadmap Half-Life]].

## Tham khảo

- [gis-programming-roadmap README](https://github.com/petedannemann/gis-programming-roadmap/blob/master/README.md) — nguồn gốc của cả hai lập trường trong note này
- [Esri — ArcGIS Pro product page](https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview) và [ArcMap retirement / migration to ArcGIS Pro](https://www.esri.com/arcgis-blog/products/arcgis-desktop/administration/arcmap-continued-support/) — kiểm trạng thái vòng đời trực tiếp từ nhà cung cấp
- [OSGeo Foundation](https://www.osgeo.org/) — tổ chức bảo trợ hệ sinh thái mở
- [QGIS — Sustaining members & funding model](https://qgis.org/funding/) — cách một dự án mở thật sự được nuôi, để đánh giá rủi ro bền vững
- [PostGIS documentation](https://postgis.net/documentation/) — chuẩn de facto phía mở

## Liên kết

[[GIS Software Landscape]] · [[GIS Career Paths]] · [[Roadmap Half-Life]] · [[ArcPy]] · [[ArcGIS REST and Web Stack]] · [[GeoPackage]] · [[GIS]]
