---
tags: [gis, hệ-toạ-độ, đo-đạc]
status: evergreen
---
# Geodesic vs Planar Measurement

> Hai cách đo đúng, cho hai tình huống khác nhau: **phẳng** (reproject rồi đo bằng hình học Euclid) nhanh và chính xác trong một vùng hẹp; **trắc địa** (đo trên ellipsoid) đúng ở mọi nơi nhưng chậm hơn. Chọn sai không cho lỗi — nó cho **con số sai trông hợp lý**.

## 1. Hai cách đo

| | **Planar (projected)** | **Geodesic (geography)** |
|---|---|---|
| Cách làm | Transform sang CRS mét rồi đo | Đo trực tiếp trên ellipsoid |
| PostGIS | `ST_Area(ST_Transform(geom, 32648))` | `ST_Area(geom::geography)` |
| Chính xác | Rất cao **trong vùng hợp lệ** | Cao **ở mọi nơi** |
| Tốc độ | **Nhanh** | Chậm hơn (2–10×) |
| Tập hàm | **Đầy đủ** (mọi hàm PostGIS) | Hẹp hơn nhiều |
| Đường "thẳng" nghĩa là | Thẳng trên bản đồ | **Great circle** — cong trên bản đồ |
| Hợp với | Phân tích trong một vùng/một múi UTM | Dữ liệu toàn cầu, tuyến bay, khoảng cách dài |

### Quy tắc chọn

```
Vùng nghiên cứu nằm gọn trong một múi UTM (hoặc một CRS vùng)?
├── CÓ  → Planar. Transform sang CRS mét, dùng toàn bộ hàm.
└── KHÔNG → dữ liệu trải nhiều múi / toàn cầu?
     ├── Khoảng cách & diện tích là chính → Geodesic (geography)
     └── Cần phân tích phức tạp → Chia vùng, hoặc dùng equal-area toàn cầu
```

## 2. `geometry` vs `geography` trong PostGIS

| | `geometry` | `geography` |
|---|---|---|
| Mô hình | Mặt phẳng Descartes | Ellipsoid |
| Đơn vị `ST_Distance` | Đơn vị của SRID (độ hoặc mét) | **Luôn là mét** |
| SRID hỗ trợ | Bất kỳ | Chủ yếu 4326 |
| Hàm khả dụng | Toàn bộ | Một tập con |
| Chi phí | Thấp | Cao hơn |

> [!note] Mô hình dùng chung tốt nhất
> Lưu cột `geography` (hoặc `geometry` 4326) làm **nguồn sự thật**, và tạo thêm cột `geometry` đã transform sang CRS vùng cho phân tích nặng, có index riêng. Đổi lấy dung lượng để lấy tốc độ và độ đúng. Xem [[Spatial Database Design]].

## 3. Sai số thực tế của cách làm sai

Sai số của đo phẳng tăng theo khoảng cách và theo khoảng cách tới kinh tuyến trục:

| Tình huống | Đo phẳng (UTM) | Đo trắc địa | Ghi chú |
|---|---|---|---|
| Thửa đất trong một quận | Chênh không đáng kể | — | Planar hoàn toàn ổn |
| Hai điểm cách 50 km cùng múi | Sai lệch nhỏ (<0,1%) | — | Planar ổn |
| Hai điểm khác múi UTM | **Sai đáng kể** | Đúng | Phải dùng geodesic |
| Hà Nội → New York | **Vô nghĩa** | Đúng | Không CRS phẳng nào phục vụ được |
| Diện tích quốc gia lớn | Sai theo phép chiếu | Đúng | Dùng equal-area hoặc geography |

Còn dùng EPSG:3857 để đo thì sai số là **hệ thống và lớn**: diện tích bị phóng đại theo $1/\cos^2(\varphi)$ — ở vĩ độ 21° (Hà Nội) đã hơn 15%, ở vĩ độ 60° là 4 lần.

## 4. Cạm bẫy

- **`ST_Distance` trên 4326 `geometry` trả về ĐỘ.** Số ra trông nhỏ và hợp lý (`0.023`) nên rất dễ lọt qua review. Đây là bug âm thầm phổ biến nhất trong Spatial SQL.
- **`ST_DWithin` trên geometry 4326 với tham số mét** — cùng lỗi, và tệ hơn vì nó *chạy* và trả về kết quả sai một cách chọn lọc.
- **Buffer trên `geography`** cho kết quả đúng về khoảng cách nhưng chậm; với dữ liệu lớn hãy transform sang UTM.
- **Đường thẳng giữa hai điểm xa nhau không phải là đường ta vẽ.** Trên bản đồ, tuyến bay Hà Nội–New York cong lên phía bắc. Nếu bạn nối hai điểm bằng LineString hai đỉnh rồi vẽ, bạn vẽ sai tuyến. Thêm đỉnh trung gian (`ST_Segmentize` trên geography) trước khi hiển thị.
- **Trộn hai phương pháp trong cùng một báo cáo.** Diện tích tính bằng geography còn chu vi tính bằng UTM → tỉ số không nhất quán.
- **Dùng bán kính Trái Đất tròn 6371 km cho công thức Haversine** khi cần độ chính xác dưới mét — Haversine giả định hình cầu, sai ~0,3% so với ellipsoid.

## 5. Checklist áp dụng

- [ ] Vùng dữ liệu của tôi có nằm gọn trong một múi UTM không?
- [ ] Mọi kết quả khoảng cách của tôi có đơn vị **mét** (không phải độ) không?
- [ ] Tôi có kiểm một khoảng cách đã biết để xác nhận đơn vị không? (mẹo: đo một đoạn bạn biết chiều dài)
- [ ] Toàn bộ báo cáo có dùng **cùng một** phương pháp đo không?
- [ ] Nếu vẽ đường dài trên bản đồ: tôi đã segmentize chưa?
- [ ] Tôi có đang đo bất cứ thứ gì trên EPSG:3857 không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_Area(geom::geography)` | Diện tích trắc địa, đơn vị m² | [postgis.net](https://postgis.net/docs/ST_Area.html) |
| `ST_Segmentize(geog, m)` | Thêm đỉnh dọc great circle | [postgis.net](https://postgis.net/docs/ST_Segmentize.html) |
| `geopy.distance.geodesic` | Khoảng cách trắc địa trong Python | [geopy.readthedocs.io](https://geopy.readthedocs.io/) |
| `pyproj.Geod` | Tính trắc địa chuẩn (Karney) | [pyproj4.github.io](https://pyproj4.github.io/pyproj/stable/) |

## Tham khảo

- [PostGIS — Geography Type](https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography) — khi nào dùng geography, tập hàm hỗ trợ
- [Karney, C. (2013), *Algorithms for geodesics*](https://link.springer.com/article/10.1007/s00190-012-0578-0) — thuật toán trắc địa chính xác dùng trong PROJ/GeographicLib
- [pyproj — Geod class documentation](https://pyproj4.github.io/pyproj/stable/api/geod.html) — hiện thực Python
- [PostGIS — ST_DWithin](https://postgis.net/docs/ST_DWithin.html) — chú ý phần đơn vị theo kiểu dữ liệu

## Liên kết

[[Coordinate Reference Systems]] · [[Map Projections]] · [[Reprojection Pitfalls]] · [[Buffer and Proximity Analysis]] · [[Spatial SQL Query Patterns]] · [[GIS]]
