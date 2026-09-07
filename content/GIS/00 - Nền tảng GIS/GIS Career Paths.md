---
tags: [gis, nền-tảng, nghề-nghiệp]
status: evergreen
---
# GIS Career Paths

> Ba nghề rất khác nhau cùng bị gọi là "làm GIS". Biết mình nhắm nghề nào quyết định 80% việc nên học gì — và seed roadmap chỉ nhắm đúng **một** trong ba.

> [!note] Ghi chú nguồn
> Seed gốc tuyên bố mục tiêu ngay dòng đầu: *"take someone with no GIS experience to a proficient GIS Developer"* và ở mục Backend khẳng định *"almost all of the backend GIS development job postings I've seen require .Net Core (C#)"*. Đó là **một** quan sát thị trường, tại **một** thời điểm, ở **một** thị trường. Note này đặt nó vào bối cảnh rộng hơn. Xem thêm [[Roadmap Half-Life]].

## 1. Ba nghề

| | **GIS Analyst** | **GIS Developer** | **Geospatial Data Engineer** |
|---|---|---|---|
| Sản phẩm giao | Bản đồ, báo cáo, kết luận | Ứng dụng, dịch vụ bản đồ | Pipeline, bộ dữ liệu tin cậy |
| Ngày làm việc | QGIS/ArcGIS Pro, phân tích | Code web + spatial API | SQL, Python, orchestration |
| Kỹ năng lõi | Phương pháp không gian, cartography, lĩnh vực | JS/TS, backend, [[Web Mapping Architecture]] | [[Spatial SQL Query Patterns]], ETL, cloud |
| Toán/thống kê | Cao | Thấp–trung bình | Trung bình |
| Kỹ nghệ phần mềm | Thấp–trung bình | **Cao** | **Cao** |
| Nơi tuyển nhiều | Nhà nước, quy hoạch, môi trường, tiện ích | Công ty phần mềm, tư vấn, startup | Tech, logistics, bảo hiểm, bất động sản |
| Seed roadmap phục vụ | Một phần (mục GIS Fundamentals) | **Toàn bộ** | Một phần (Databases, ETL) |

Hai nghề lân cận đáng biết:
- **Remote sensing scientist** — nặng vật lý và ML trên ảnh; xem [[Remote Sensing Fundamentals]].
- **Spatial data scientist** — thống kê không gian, mô hình; giao với [[Hedonic Pricing and GIS]] ở area ML.

## 2. Nguyên tắc

1. **Kỹ năng phân biệt bạn không phải GIS, mà là *lĩnh vực + GIS*.** Người biết PostGIS thì nhiều; người biết PostGIS **và** hiểu quy trình cấp phép xây dựng thì hiếm. Giá trị nằm ở chỗ giao.
2. **Với hướng developer/engineer, kỹ nghệ phần mềm quan trọng hơn kiến thức GIS.** Git, test, CI, review, thiết kế API — đây là phần lớn công việc. Kiến thức GIS là phần *khó thay thế*, nhưng kỹ nghệ là phần *được dùng hằng ngày*.
3. **Ngôn ngữ theo ngữ cảnh, không theo bảng xếp hạng.** Python là mặc định cho phân tích và pipeline. JS/TS là bắt buộc cho web GIS. C# xuất hiện nhiều ở các tổ chức đã đầu tư vào hệ sinh thái ESRI/.NET. SQL thì **không tuỳ chọn** ở cả ba nghề.
4. **Portfolio thắng chứng chỉ ở hướng kỹ thuật.** Một repo có dữ liệu thật, README rõ, bản đồ chạy được nói nhiều hơn một dòng chứng chỉ.
5. **Học kỹ [[Coordinate Reference Systems]] sớm.** Đây là kiến thức hiếm khi nói ra trong phỏng vấn nhưng lộ ra ngay trong công việc thật.

## 3. Cạm bẫy

- **Chỉ học công cụ của một nhà cung cấp.** Kỹ năng khoá vào một vendor giảm mạnh giá trị khi đổi việc — và thị trường license đổi nhanh hơn thị trường kỹ năng.
- **Học phân tích không gian mà không học SQL.** Đây là khoảng trống lớn nhất của người từ nền địa lý sang; và là phần dễ bù nhất.
- **Học lập trình mà không học phương pháp không gian.** Khoảng trống đối xứng của người từ nền CS sang: viết code sạch nhưng buffer bằng độ, tính diện tích ở EPSG:4326. Xem [[Reprojection Pitfalls]].
- **Tin một quan sát thị trường như một quy luật.** Câu "C# dominant" trong seed có thể đúng với thị trường và thời điểm tác giả quan sát, và sai với thị trường của bạn. **Kiểm bằng dữ liệu tuyển dụng của chính khu vực bạn nhắm tới**, không bằng một câu trong README.
- **Chờ "học xong" mới làm dự án.** Roadmap trong seed dài ~500 giờ; làm một dự án nhỏ sau 20 giờ đầu sẽ định hướng lại phần còn lại.

## 4. Checklist áp dụng

- [ ] Tôi nhắm nghề nào trong ba nghề trên? Viết ra một câu.
- [ ] Tôi đã đọc **10 tin tuyển dụng thật** cho nghề đó ở khu vực mình chưa?
- [ ] Ngôn ngữ nào xuất hiện trong ≥7/10 tin đó?
- [ ] Lĩnh vực nào tôi có thể ghép với GIS để thành người hiếm?
- [ ] Tôi có một dự án công khai dùng **dữ liệu thật, không phải dữ liệu mẫu** không?
- [ ] Tôi có giải thích được cho người ngoài ngành *vì sao* phân tích của mình đúng không?

## Tham khảo

- [gis-programming-roadmap (petedannemann)](https://github.com/petedannemann/gis-programming-roadmap/blob/master/README.md) — seed gốc của vault này, hướng GIS Developer
- [Open Source Society University — Computer Science](https://github.com/ossu/computer-science#introduction-to-computer-science) — mô hình mà seed tự nhận là lấy cảm hứng
- [GIS Stack Exchange — career questions](https://gis.stackexchange.com/) — nơi thảo luận thị trường thật, có bối cảnh vùng
- [URISA — GIS profession resources](https://www.urisa.org/) — hiệp hội nghề nghiệp

## Liên kết

[[GIS Learning Path]] · [[GIS Software Landscape]] · [[Proprietary vs Open Source GIS]] · [[Roadmap Half-Life]] · [[GIS Roadmap Catalogue]] · [[GIS]]
