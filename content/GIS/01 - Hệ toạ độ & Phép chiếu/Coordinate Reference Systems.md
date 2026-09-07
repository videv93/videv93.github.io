---
tags: [gis, hệ-toạ-độ]
status: evergreen
---
# Coordinate Reference Systems

> Một cặp số `(105.85, 21.03)` **không có nghĩa gì** cho tới khi bạn biết CRS của nó. CRS là hợp đồng biến một cặp số thành một vị trí trên Trái Đất — và mọi lỗi GIS nghiêm trọng mà tôi từng gặp đều bắt đầu từ chỗ hợp đồng này bị ngầm định.

> [!note] Ghi chú nguồn
> Seed roadmap **không có một dòng nào** về hệ toạ độ hay phép chiếu, dù đó là kiến thức mà mọi khoá học nó liệt kê đều dạy trong tuần đầu. Đây là header rỗng lớn nhất của seed: một khoảng trống *im lặng* — không phải mục trống, mà là mục **không tồn tại**. Cả thư mục `01` này trả lời nó.

## 1. Khái niệm cốt lõi

Một CRS gồm ba phần, và trộn lẫn chúng là nguồn nhầm lẫn phổ biến nhất:

| Thành phần | Trả lời câu hỏi | Ví dụ |
|---|---|---|
| **Datum** | Trái Đất có hình gì, đặt ở đâu? | WGS 84, VN-2000, NAD83 |
| **Coordinate system** | Đo bằng gì, trục nào? | Kinh/vĩ độ (bậc) hoặc mét Đông/Bắc |
| **Projection** (nếu có) | Trải mặt cong ra phẳng thế nào? | UTM, Web Mercator, Lambert |

### Hai loại CRS

| | **Geographic CRS** | **Projected CRS** |
|---|---|---|
| Đơn vị | **Độ** (bậc) | **Mét** (thường) |
| Bề mặt | Ellipsoid cong | Mặt phẳng |
| Ví dụ | EPSG:4326 (WGS 84) | EPSG:32648 (UTM 48N), EPSG:3857 |
| Tính diện tích/khoảng cách trực tiếp | ❌ **Không được** | ✅ Được (trong vùng hợp lệ) |
| Dùng để | Lưu trữ, trao đổi, GPS | **Phân tích, đo đạc** |

> [!warning] Quy tắc một câu đáng giá nhất trong cả vault
> **Lưu bằng geographic, phân tích bằng projected.** `ST_Buffer(geom, 100)` trên EPSG:4326 không tạo buffer 100 mét — nó tạo buffer **100 độ**, tức khoảng 11.000 km. Xem [[Reprojection Pitfalls]].

### Ba CRS bạn sẽ gặp mỗi ngày

| EPSG | Tên | Dùng khi |
|---|---|---|
| **4326** | WGS 84 kinh/vĩ độ | Lưu trữ, GPS, [[GeoJSON]], trao đổi dữ liệu |
| **3857** | Web Mercator | **Chỉ** để vẽ tile bản đồ web — [[Map Tiles and Tiling Schemes]] |
| **326xx / 327xx** | UTM zone xx Bắc/Nam | Đo đạc chính xác trong một vùng hẹp |

Việt Nam: UTM zone 48N (EPSG:32648) và 49N (EPSG:32649); hệ quốc gia là **VN-2000**.

## 2. Nguyên tắc

1. **Không có CRS "đúng", chỉ có CRS đúng cho *mục đích*.** Bảo toàn diện tích, bảo toàn góc, bảo toàn khoảng cách — chọn hai là không thể. Xem [[Map Projections]].
2. **Ghi CRS ở mọi ranh giới hệ thống.** Tên cột, tên file, tài liệu API, schema CSDL. `geom_4326` là một cái tên tốt hơn `geom`.
3. **Chuẩn hoá CRS ngay khi nhập liệu**, không phải rải rác khi phân tích. Xem [[Spatial Database Design]].
4. **EPSG:3857 không phải CRS phân tích.** Nó bóp méo diện tích khủng khiếp theo vĩ độ — Greenland trông to bằng châu Phi. Dùng nó để *vẽ*, không để *đo*.
5. **Với dữ liệu trải rộng nhiều múi UTM hoặc toàn cầu**, không có CRS phẳng nào tốt — hãy đo theo phương pháp trắc địa. Xem [[Geodesic vs Planar Measurement]].

## 3. Cạm bẫy

- **CRS "không xác định" bị mặc định thành 4326.** Nhiều công cụ đoán thầm. Dữ liệu UTM (toạ độ hàng trăm nghìn) bị gán 4326 sẽ nằm ngoài Trái Đất — nhưng phần mềm không báo lỗi, chỉ vẽ ra một chấm ở đâu đó.
- **Nhầm "gán CRS" với "chuyển CRS".** `ST_SetSRID` chỉ **dán nhãn** (sửa metadata sai). `ST_Transform` mới thật sự **tính lại toạ độ**. Dùng nhầm cái đầu khi cần cái sau là lỗi âm thầm và tai hại.
- **Bỏ qua datum shift.** WGS 84 và VN-2000 hay NAD27 có thể lệch hàng chục tới hàng trăm mét. Với bản đồ tỉ lệ nhỏ thì không thấy; với ranh giới thửa đất thì đó là kiện tụng. Xem [[Datums and Geodesy]].
- **Đảo thứ tự trục lat/lon.** Xem [[Spatial Data Models]] và [[EPSG Codes]].
- **Join hai lớp khác CRS.** PostGIS sẽ báo lỗi (tốt); một số công cụ khác lặng lẽ trả về rỗng — trông như "không có dữ liệu trùng khớp" chứ không như một lỗi.

## 4. Checklist áp dụng

- [ ] Tôi đã chạy `ST_SRID` / `.crs` trên **mọi** lớp đầu vào chưa?
- [ ] Mọi lớp trong một phép phân tích có **cùng** CRS không?
- [ ] Nếu tôi đo khoảng cách hay diện tích: tôi đang ở CRS **projected** phù hợp vùng chứ?
- [ ] Toạ độ có nằm trong khoảng hợp lý không (VN: x≈102–110, y≈8–24 nếu 4326)?
- [ ] Tôi đang **gán** hay đang **chuyển** CRS — và đó có đúng ý định không?
- [ ] CRS có được ghi trong tên cột / tài liệu / API contract không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| PROJ | Thư viện biến đổi nền cho mọi phần mềm | [proj.org](https://proj.org/) |
| epsg.io | Tra cứu mã, xem WKT/PROJ string | [epsg.io](https://epsg.io/) |
| `ST_Transform` / `gdalsrsinfo` | Chuyển và kiểm tra CRS | [postgis.net](https://postgis.net/docs/ST_Transform.html) |

## Tham khảo

- [PROJ documentation — Coordinate reference systems](https://proj.org/en/stable/usage/projections.html) — thư viện chuẩn của toàn ngành
- [EPSG Geodetic Parameter Registry](https://epsg.org/) — nguồn quyền lực về mã CRS
- [PostGIS — Spatial Reference Systems](https://postgis.net/docs/using_postgis_dbmanagement.html#spatial_ref_sys) — cách CSDL lưu định nghĩa CRS
- [QGIS Docs — Coordinate Reference Systems](https://docs.qgis.org/latest/en/docs/gentle_gis_introduction/coordinate_reference_systems.html) — giải thích trực quan tốt nhất cho người mới

## Liên kết

[[Map Projections]] · [[Datums and Geodesy]] · [[EPSG Codes]] · [[Reprojection Pitfalls]] · [[Geodesic vs Planar Measurement]] · [[GIS]]
