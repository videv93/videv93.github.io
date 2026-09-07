---
tags: [gis, hệ-toạ-độ]
status: evergreen
---
# Map Projections

> Không thể trải mặt cầu ra mặt phẳng mà không xé hoặc kéo giãn — đây là **định lý**, không phải giới hạn kỹ thuật (Gauss, *Theorema Egregium*). Mọi bản đồ phẳng đều nói dối; việc của bạn là **chọn nó nói dối về cái gì**.

## 1. Bốn thứ có thể bảo toàn — chọn tối đa một

| Tính chất | Bảo toàn cái gì | Họ phép chiếu | Dùng khi |
|---|---|---|---|
| **Conformal** | **Góc** và hình dạng cục bộ | Mercator, Lambert Conformal Conic, UTM | Hàng hải, hàng không, bản đồ tỉ lệ lớn |
| **Equal-area** | **Diện tích** | Albers, Mollweide, Lambert Azimuthal EA | **Mọi thống kê theo diện tích**, choropleth |
| **Equidistant** | Khoảng cách từ **một** điểm/đường | Azimuthal Equidistant, Plate Carrée | Vùng phủ sóng, phân tích quanh một tâm |
| **Compromise** | Không cái nào — cân bằng biến dạng | Robinson, Winkel Tripel, Natural Earth | Bản đồ thế giới để nhìn |

> [!warning] Sai lầm định lượng phổ biến nhất
> **Bản đồ mật độ (choropleth) vẽ trên phép chiếu conformal cho ra kết luận sai.** Nếu diện tích bị bóp méo thì "số ca trên km²" bị bóp méo theo. Dùng equal-area cho mọi thứ chia cho diện tích.

## 2. Ba nhóm hình học

| Nhóm | Mặt chiếu | Ít méo nhất ở | Ví dụ |
|---|---|---|---|
| **Cylindrical** | Hình trụ | Dải quanh xích đạo (hoặc kinh tuyến chuẩn) | Mercator, UTM, Web Mercator |
| **Conic** | Hình nón | Dải vĩ độ trung bình, kéo dài đông–tây | Lambert Conformal Conic, Albers |
| **Azimuthal** | Mặt phẳng | Quanh một điểm tâm | Stereographic, Azimuthal Equidistant |

**Quy tắc chọn nhanh theo hình dạng vùng:**

| Vùng | Hình dạng | Chọn |
|---|---|---|
| Việt Nam, Chile | Kéo dài **bắc–nam** | Cylindrical ngang (UTM, Transverse Mercator) |
| Hoa Kỳ, Nga, Trung Quốc | Kéo dài **đông–tây** | Conic (Albers/Lambert) |
| Vùng cực, vùng tròn quanh một tâm | Gọn quanh một điểm | Azimuthal |
| Toàn cầu, cần thống kê | — | Equal-area toàn cầu (Mollweide, Equal Earth) |

### UTM — thứ bạn sẽ dùng nhiều nhất

Chia Trái Đất thành **60 múi rộng 6°**, mỗi múi là một Transverse Mercator riêng. Trong múi của nó, biến dạng < 0,1% — đủ tốt cho hầu hết đo đạc.

- Mã EPSG: `326` + số múi (Bắc bán cầu), `327` + số múi (Nam). VN: **32648**, **32649**.
- Giới hạn: **chỉ chính xác trong múi của nó**. Dữ liệu trải 3 múi thì UTM không còn là câu trả lời đúng.

### Web Mercator (EPSG:3857) — trường hợp đặc biệt

Là Mercator nhưng coi Trái Đất là **hình cầu** thay vì ellipsoid, để tính tile cho nhanh. Hệ quả:
- Không hoàn toàn conformal, không equal-area, **không phù hợp đo đạc**.
- Biến dạng diện tích theo $1/\cos^2(\text{vĩ độ})$ — ở vĩ độ 60° diện tích phóng đại **4 lần**.
- Nhưng nó là chuẩn *de facto* của mọi bản đồ web. Xem [[Map Tiles and Tiling Schemes]].

## 3. Cạm bẫy

- **Dùng phép chiếu mặc định của phần mềm rồi tính diện tích.** Mặc định thường là 4326 hoặc 3857 — cả hai đều sai cho việc đo.
- **So sánh diện tích giữa các vùng ở vĩ độ khác nhau trên Mercator.** Đây là sai lầm nổi tiếng nhất trong lịch sử bản đồ.
- **Dùng UTM cho dữ liệu vượt múi.** Triệu chứng: đối tượng gần rìa bị lệch, khoảng cách sai dần theo khoảng cách tới kinh tuyến trục.
- **Tưởng phép chiếu chỉ ảnh hưởng hiển thị.** Nó ảnh hưởng **mọi phép đo**: buffer, distance, area, centroid, thậm chí kết quả `ST_Intersects` ở rìa.
- **Reproject nhiều lần liên tiếp.** Mỗi lần biến đổi tích luỹ sai số số học; chuyển thẳng từ nguồn tới đích. Xem [[Reprojection Pitfalls]].
- **Chọn phép chiếu vì nó "đẹp".** Với bản đồ trình bày thì hợp lệ; với bản đồ phân tích thì không.

## 4. Checklist áp dụng

- [ ] Phân tích của tôi phụ thuộc vào **diện tích**, **góc**, hay **khoảng cách**?
- [ ] Phép chiếu tôi dùng có bảo toàn đúng tính chất đó không?
- [ ] Vùng nghiên cứu của tôi có nằm gọn trong vùng hợp lệ của phép chiếu không?
- [ ] Nếu là choropleth mật độ: tôi đã dùng equal-area chưa?
- [ ] Tôi có đang đo đạc trên EPSG:3857 hay 4326 không? (nếu có → dừng lại)
- [ ] Tôi có reproject nhiều bước liên tiếp không cần thiết không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Projection Wizard | Gợi ý phép chiếu theo vùng và mục đích | [projectionwizard.org](https://projectionwizard.org/) |
| PROJ | Thực thi biến đổi | [proj.org](https://proj.org/) |
| `gdalwarp -t_srs` | Reproject raster | [[GDAL and OGR]] |

## Tham khảo

- [USGS — Map Projections: A Working Manual (Snyder)](https://pubs.usgs.gov/pp/1395/report.pdf) — tài liệu tham chiếu kinh điển, đầy đủ công thức
- [PROJ — list of projections](https://proj.org/en/stable/operations/projections/index.html) — mọi phép chiếu thực thi được
- [Projection Wizard (Šavrič et al.)](https://projectionwizard.org/) — công cụ chọn phép chiếu theo tiêu chí học thuật
- [ICSM — Map projections explained](https://www.icsm.gov.au/education/fundamentals-mapping/projections) — giải thích ngắn gọn, chuẩn xác

## Liên kết

[[Coordinate Reference Systems]] · [[Datums and Geodesy]] · [[EPSG Codes]] · [[Geodesic vs Planar Measurement]] · [[Map Tiles and Tiling Schemes]] · [[GIS]]
