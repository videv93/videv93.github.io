---
tags: [gis, nền-tảng]
status: evergreen
---
# What Is GIS

> GIS không phải "phần mềm vẽ bản đồ". Nó là **một hệ cơ sở dữ liệu mà trong đó vị trí là một kiểu dữ liệu hạng nhất** — và vì vị trí là hạng nhất, ta hỏi được những câu mà SQL thường không trả lời nổi: *"cái gì gần cái gì"*, *"cái gì nằm trong cái gì"*, *"cái gì thay đổi ở đâu"*.

> [!note] Ghi chú nguồn
> Trong seed gốc, mục `## GIS Fundamentals` chỉ nói *"let's review some materials to make sure we have a basic understanding of what GIS is"* rồi đưa thẳng ra ba khoá học 40 giờ — một **header rỗng có link đính kèm**. Note này trả lời câu hỏi đó trực tiếp.

## 1. Khái niệm cốt lõi

GIS = **Geographic Information System**. Định nghĩa kinh điển (Burrough): *một tập công cụ để thu thập, lưu trữ, truy xuất, biến đổi và hiển thị dữ liệu không gian từ thế giới thực*.

**Năm thành phần** — thiếu bất kỳ cái nào thì không phải GIS:

| Thành phần | Nội dung | Hay bị bỏ quên? |
|---|---|---|
| **Data** | Vector, raster, bảng thuộc tính, metadata | Không |
| **Hardware** | Máy chủ, GPU, lưu trữ (ảnh vệ tinh rất nặng) | Không |
| **Software** | QGIS/ArcGIS, PostGIS, GDAL, thư viện | Không |
| **People** | Người biết đọc kết quả và biết nó sai ở đâu | **Có — thường xuyên** |
| **Methods** | Quy trình, chuẩn, kiểm định chất lượng | **Có — luôn luôn** |

### GIS trả lời năm loại câu hỏi

| Loại | Câu hỏi mẫu | Kỹ thuật tương ứng |
|---|---|---|
| **Location** | Cái gì ở đây? | Truy vấn điểm, [[Geocoding]] |
| **Condition** | Chỗ nào thoả điều kiện X? | Truy vấn thuộc tính + [[Overlay Operations]] |
| **Trend** | Cái gì đã đổi từ năm 2015? | So sánh đa thời điểm, [[Spectral Indices]] |
| **Pattern** | Phân bố này có ngẫu nhiên không? | Thống kê không gian, [[Spatial Aggregation and Binning]] |
| **Modeling** | Nếu xây đường ở đây thì sao? | [[Network Analysis and Routing]], mô hình phù hợp |

> [!warning] Ranh giới hay bị nhầm
> **GIS ≠ cartography.** Cartography là nghệ thuật *trình bày* bản đồ. GIS là hệ thống *phân tích*. Một bản đồ đẹp có thể dựa trên phân tích sai hoàn toàn — và bản đồ càng đẹp thì càng ít ai chất vấn nó.
> **GIS ≠ web map.** Google Maps là một *sản phẩm* của GIS, không phải GIS. Xem [[Web Mapping Architecture]].

## 2. Nguyên tắc

1. **Mọi dữ liệu không gian đều là một mô hình, không phải thực tại.** Một con sông không "là" một LineString; ta *chọn* biểu diễn nó như vậy, và chọn thế là đã vứt đi chiều rộng, độ sâu, mùa nước.
2. **Không có phân tích không gian nào tách rời khỏi [[Coordinate Reference Systems]].** Diện tích, khoảng cách, buffer — tất cả đều vô nghĩa nếu không biết CRS. Đây là khác biệt lớn nhất so với dữ liệu bảng thường.
3. **Tỉ lệ (scale) quyết định kết luận.** Cùng bộ dữ liệu, đổi kích thước ô lưới sẽ đổi kết quả thống kê — hiệu ứng MAUP. Xem [[Spatial Aggregation and Binning]].
4. **First Law of Geography (Tobler):** *"mọi thứ đều liên quan tới mọi thứ khác, nhưng thứ ở gần liên quan nhiều hơn."* Đây là lý do phần lớn giả định i.i.d. trong thống kê **sai** với dữ liệu không gian — và là lý do tồn tại cả ngành spatial statistics. So với [[Hedonic Pricing and GIS]] ở area ML.
5. **Vị trí là dữ liệu nhạy cảm.** Toạ độ nhà ở, lộ trình di chuyển, dữ liệu y tế theo địa chỉ — ẩn danh hoá kém ở dữ liệu không gian dễ tái định danh hơn nhiều so với dữ liệu bảng.

## 3. Cạm bẫy

- **Coi GIS là một bước xuất bản, không phải một bước phân tích.** Triệu chứng: pipeline dữ liệu chạy xong rồi mới "đưa lên bản đồ". Hậu quả là lỗi hình học và lỗi CRS chỉ lộ ra ở khâu cuối, khi sửa đắt nhất.
- **Tin vào bản đồ vì nó trông có thẩm quyền.** Một choropleth có thể đảo ngược kết luận chỉ bằng cách đổi cách chia lớp (quantile vs equal interval). Luôn hỏi: *ai chọn ngưỡng, và vì sao?*
- **Bỏ qua metadata.** File `.shp` không có `.prj` là một quả bom hẹn giờ — xem [[Spatial Metadata]] và [[Shapefile]].
- **Nhầm độ chính xác hiển thị với độ chính xác thật.** Toạ độ ghi 8 chữ số thập phân (≈1 mm) không có nghĩa dữ liệu chính xác tới mm; GPS điện thoại sai 3–10 m.
- **Học công cụ trước khi học khái niệm.** Đây chính là rủi ro của seed roadmap: nó bắt đầu bằng 40 giờ bấm nút phần mềm. Biết bấm nút mà không hiểu projection thì sẽ tạo ra kết quả sai một cách tự tin.

## 4. Checklist áp dụng

- [ ] Tôi có nêu được câu hỏi mình đang trả lời thuộc **loại nào** trong năm loại ở trên không?
- [ ] Tôi có biết CRS của **mọi** lớp dữ liệu đang dùng không?
- [ ] Tôi có biết dữ liệu này được thu thập ở **tỉ lệ** nào, và tôi đang dùng nó ở tỉ lệ nào?
- [ ] Nếu kết quả của tôi sai, ai chịu hậu quả — và họ có cách nào phát hiện không?
- [ ] Dữ liệu của tôi có chứa vị trí cá nhân cần bảo vệ không?
- [ ] Tôi đã kiểm tra hình học hợp lệ trước khi phân tích chưa? ([[Geometry Validity and Topology]])

## Công cụ

| Công cụ | Đặc điểm | Link |
|---|---|---|
| QGIS | Desktop mở, xem nhanh mọi định dạng | [qgis.org](https://qgis.org/) |
| PostGIS | Phân tích quy mô lớn bằng SQL | [postgis.net](https://postgis.net/) |
| GDAL | Dao đa năng chuyển đổi dữ liệu | [gdal.org](https://gdal.org/) |

Bản đồ toàn cảnh đầy đủ: [[GIS Software Landscape]].

## Tham khảo

- [Esri — What is GIS?](https://www.esri.com/en-us/what-is-gis/overview) — định nghĩa từ phía ngành công nghiệp
- [QGIS Training Manual — Foreword & Introduction](https://docs.qgis.org/latest/en/docs/training_manual/foreword/index.html) — khoá học chính thức, có trong seed
- [Tobler, W. (1970), *A Computer Movie Simulating Urban Growth in the Detroit Region*](https://www.jstor.org/stable/143141) — nguồn gốc First Law of Geography
- [Burrough & McDonnell, *Principles of Geographical Information Systems*](https://global.oup.com/academic/product/principles-of-geographical-information-systems-9780198742845) — sách nền tảng học thuật
- [GIS Fundamentals (Bolstad)](https://www.amazon.com/GIS-Fundamentals-Geographic-Information-Systems/dp/0971764735) — sách seed đề xuất ở mục Reading

## Liên kết

[[Vector vs Raster]] · [[Spatial Data Models]] · [[Coordinate Reference Systems]] · [[GIS Career Paths]] · [[Proprietary vs Open Source GIS]] · [[GIS]]
