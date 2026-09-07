---
tags: [gis, nền-tảng, mô-hình-dữ-liệu]
status: evergreen
---
# Vector vs Raster

> Hai cách duy nhất để nhét thế giới liên tục vào bộ nhớ rời rạc: **vector** rời rạc hoá *đối tượng*, **raster** rời rạc hoá *không gian*. Chọn sai mô hình thì mọi phép phân tích sau đó đều phải trả giá.

## 1. Khái niệm cốt lõi

|                    | **Vector**                                 | **Raster**                                 |
| ------------------ | ------------------------------------------ | ------------------------------------------ |
| Đơn vị             | Point / LineString / Polygon               | Ô lưới (cell/pixel) đều nhau               |
| Rời rạc hoá cái gì | **Đối tượng** — ranh giới sắc              | **Không gian** — phủ kín, đều              |
| Hợp với hiện tượng | Rời rạc: thửa đất, đường, giếng khoan      | Liên tục: độ cao, nhiệt độ, phản xạ phổ    |
| Thuộc tính         | Bảng nhiều cột / feature                   | Thường **một giá trị** / ô (hoặc một band) |
| Độ phân giải       | Không giới hạn (toạ độ thực)               | Cố định bởi kích thước ô                   |
| Dung lượng         | Tỉ lệ theo **số đối tượng**                | Tỉ lệ theo **diện tích ÷ ô²**              |
| Phép mạnh          | Topology, join, truy vấn chính xác         | Map algebra, phân tích lân cận, ảnh        |
| Phép yếu           | Phủ liên tục, phân tích bề mặt             | Ranh giới sắc, thuộc tính phong phú        |
| Định dạng          | [[GeoJSON]], [[GeoPackage]], [[Shapefile]] | GeoTIFF/COG — [[Raster Formats and COG]]   |

### Phép thử chọn mô hình

Hỏi: **"đại lượng này có giá trị tại *mọi* điểm trong vùng không?"**

- Có → raster. Độ cao có ở mọi điểm. Nhiệt độ có ở mọi điểm.
- Không → vector. Không có "giá trị thửa đất" ở giữa cánh đồng.

Hỏi tiếp: **"ranh giới là thật hay là do ta vẽ ra?"** Ranh giới hành chính là thật (pháp lý) → vector. Ranh giới "vùng khô hạn" là do ta cắt ngưỡng → raster giữ nguyên độ mờ ấy trung thực hơn.

## 2. Nguyên tắc

1. **Chuyển đổi qua lại luôn mất mát — và mất mát không đối xứng.** Vector → raster mất ranh giới chính xác (răng cưa). Raster → vector tạo ra ranh giới *giả* trông sắc nét nhưng chỉ là ngưỡng ta chọn. Xem [[Raster Algebra and Zonal Statistics]].
2. **Kích thước ô raster là một quyết định phân tích, không phải kỹ thuật.** Ô 30 m và ô 10 m cho ra hai kết luận khác nhau về cùng một hiện tượng.
3. **Đừng lưu dữ liệu liên tục dạng vector polygon.** Contour polygon của độ cao vừa nặng vừa mất thông tin so với DEM. Xem [[Digital Elevation Models]].
4. **Đừng rasterise thứ có thuộc tính phong phú.** Một raster chỉ tải được một giá trị/ô; thửa đất có 40 cột thuộc tính thì phải ở dạng vector.
5. **Trong pipeline thật, hai mô hình luôn gặp nhau.** Điểm gặp phổ biến nhất là **zonal statistics**: vector định nghĩa vùng, raster cung cấp giá trị.

## 3. Cạm bẫy

- **Rasterise polygon nhỏ hơn kích thước ô → chúng biến mất hoàn toàn.** Không có cảnh báo. Kiểm bằng cách đếm số đối tượng trước/sau.
- **Vector hoá ảnh phân loại tạo ra hàng triệu polygon vụn.** Một ảnh 10.000×10.000 có nhiễu sẽ sinh polygon nhiều hơn máy chịu nổi. Lọc/làm mịn (sieve, majority filter) *trước* khi vector hoá.
- **Nhầm "độ phân giải" với "độ chính xác".** Ảnh 10 m không có nghĩa là mọi thứ >10 m đều thấy được; còn phụ thuộc tương phản phổ và mức xử lý — xem [[Remote Sensing Fundamentals]].
- **Dùng raster cho dữ liệu thưa.** 200 trạm quan trắc trên cả nước lưu thành raster phủ kín là lãng phí khủng khiếp và ngụ ý một phép nội suy mà ta chưa hề kiểm định.
- **Quên rằng ô raster có diện tích khác nhau theo vĩ độ** nếu lưu ở CRS địa lý (EPSG:4326). Ô 0,01° ở xích đạo và ở vĩ độ 60° khác nhau gần hai lần theo chiều đông–tây. Xem [[Geodesic vs Planar Measurement]].

## 4. Checklist áp dụng

- [ ] Hiện tượng tôi mô hình hoá là **rời rạc** hay **liên tục**?
- [ ] Nếu dùng raster: kích thước ô do đâu mà có — do dữ liệu, hay do tôi tuỳ chọn?
- [ ] Nếu chuyển đổi mô hình: tôi đã đếm số đối tượng / tổng diện tích trước và sau chưa?
- [ ] Raster của tôi có ở CRS **projected** khi tôi tính diện tích không?
- [ ] Tôi có đang lưu dữ liệu thưa dưới dạng phủ kín không?
- [ ] Dữ liệu vector của tôi có cần topology (không hở, không chồng) không? ([[Geometry Validity and Topology]])

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `gdal_rasterize` / `gdal_polygonize.py` | Chuyển đổi hai chiều | [gdal.org](https://gdal.org/programs/) |
| `rasterstats` | Zonal statistics vector × raster | [pythonhosted.org/rasterstats](https://pythonhosted.org/rasterstats/) |
| `rasterio.features` | Rasterise/vector hoá trong Python | [rasterio.readthedocs.io](https://rasterio.readthedocs.io/) |

## Tham khảo

- [QGIS Docs — Vector and Raster Data](https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/vector_data.html) — chương nhập môn chính thức
- [Esri — Raster and vector data models](https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/what-is-raster-data.htm)
- [Geocomputation with R — Ch.2 Geographic data models](https://r.geocompx.org/spatial-class) — trình bày rõ nhất về hai mô hình
- [GDAL Rasterize / Polygonize documentation](https://gdal.org/programs/gdal_rasterize.html)

## Liên kết

[[Spatial Data Models]] · [[Raster Formats and COG]] · [[Raster Algebra and Zonal Statistics]] · [[Digital Elevation Models]] · [[What Is GIS]] · [[GIS]]
