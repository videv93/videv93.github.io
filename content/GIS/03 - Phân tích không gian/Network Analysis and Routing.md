---
tags: [gis, phân-tích, mạng-lưới]
status: evergreen
---
# Network Analysis and Routing

> Khi câu hỏi là *"đi từ A tới B mất bao lâu"* thì hình học không đủ — cần một **đồ thị**. Đây là chỗ GIS gặp lý thuyết đồ thị, và là chỗ phân tích khả năng tiếp cận trở nên trung thực.

## 1. Từ hình học sang đồ thị

| Khái niệm đồ thị | Trong GIS |
|---|---|
| **Node** (đỉnh) | Nút giao, điểm cuối đoạn đường |
| **Edge** (cạnh) | Đoạn đường giữa hai nút |
| **Weight** (trọng số) | Chiều dài, thời gian đi, chi phí |
| **Directed** | Đường một chiều |
| **Turn restriction** | Cấm rẽ trái tại nút |

**Bước xây đồ thị (noding)** là bước khó nhất và hay bị làm ẩu: hai đoạn đường cắt nhau trên bản đồ **không** tự động nối nhau trong đồ thị. Cần tách chúng tại giao điểm và tạo nút chung.

> [!warning] Cầu vượt và hầm chui
> Hai đường giao nhau trong hình học 2D nhưng **không** nối nhau trong thực tế. Nếu noding mù quáng theo giao điểm hình học, bạn tạo ra nút giao ở giữa cầu vượt — và mọi tuyến đường tính ra đều sai. OSM giải quyết bằng thẻ `layer`/`bridge`/`tunnel`; phải tôn trọng chúng.

## 2. Các bài toán và thuật toán

| Bài toán | Thuật toán | Ghi chú |
|---|---|---|
| Đường ngắn nhất A→B | **Dijkstra** | Trọng số không âm |
| Đường ngắn nhất nhanh hơn | **A\*** | Cần hàm heuristic (khoảng cách chim bay) |
| Ma trận khoảng cách nhiều-nhiều | Dijkstra nhiều nguồn / `pgr_dijkstraCostMatrix` | Chi phí tăng theo tích số điểm |
| **Isochrone** (vùng tới được trong X phút) | Driving distance + alpha shape | Xem mục 3 |
| Bài toán người giao hàng (VRP) | Heuristic (không có lời giải tối ưu khả thi) | NP-hard |
| Đường đi qua mọi cạnh | Chinese Postman | Quét rác, kiểm tra đường |
| Vị trí tối ưu cơ sở | Location-allocation, p-median | Quy hoạch dịch vụ |

```sql
-- pgRouting: đường ngắn nhất theo thời gian đi
SELECT * FROM pgr_dijkstra(
  'SELECT gid AS id, source, target, cost_s AS cost, reverse_cost_s AS reverse_cost FROM roads',
  (SELECT source FROM roads ORDER BY geom <-> ST_Point(105.85, 21.03) LIMIT 1),
  (SELECT target FROM roads ORDER BY geom <-> ST_Point(105.80, 21.00) LIMIT 1),
  directed := true
);

-- Chuẩn bị topology mạng lưới (BẮT BUỘC trước khi routing)
SELECT pgr_createTopology('roads', 0.0001, 'geom', 'gid');
SELECT pgr_analyzeGraph('roads', 0.0001, 'geom', 'gid');  -- báo dangle, isolated
```

## 3. Isochrone — công cụ đáng giá nhất

Vùng tới được trong X phút. Đây là **câu trả lời đúng** cho câu hỏi khả năng tiếp cận, thay cho buffer tròn:

| | Buffer 1 km | Isochrone 15 phút đi bộ |
|---|---|---|
| Giả định | Đi thẳng mọi hướng | Đi theo đường thật |
| Sông không cầu | Bỏ qua | **Được tính** |
| Đường cao tốc chắn | Bỏ qua | **Được tính** |
| Hình dạng | Tròn hoàn hảo | Hình sao, phản ánh mạng lưới |

So sánh với [[Buffer and Proximity Analysis]] — đây là khác biệt khái niệm quan trọng nhất giữa hai note.

## 4. Công cụ theo quy mô

| Công cụ | Quy mô | Đặc điểm |
|---|---|---|
| **pgRouting** | Nhỏ–trung | Trong PostGIS, linh hoạt, viết SQL; chậm hơn engine chuyên dụng |
| **OSRM** | Lớn | Rất nhanh (contraction hierarchies), profile cố định, preprocessing nặng |
| **Valhalla** | Lớn | Tile-based, đổi profile linh hoạt lúc chạy, hỗ trợ đa phương thức |
| **GraphHopper** | Lớn | Java, cân bằng tốc độ/linh hoạt |
| **NetworkX** | Rất nhỏ | Trong Python, dạy học và mạng lưới nhỏ |
| **ArcGIS Network Analyst** | Trung–lớn | Trong hệ ESRI, cần Network Dataset |
| **r5r / conveyal** | Trung | Đa phương thức có lịch trình (GTFS) |

## 5. Cạm bẫy

- **Không noding trước khi routing** → đồ thị đứt đoạn, kết quả "không tìm thấy đường" một cách khó hiểu.
- **Bỏ qua một chiều.** Đường một chiều không được mã hoá → tuyến ngắn hơn thực tế đáng kể, và không hợp lệ.
- **Trọng số bằng chiều dài khi câu hỏi là thời gian.** Đường cao tốc dài hơn nhưng nhanh hơn. Trọng số phải là `chiều dài / tốc độ`.
- **Snap điểm vào mạng lưới sai.** Điểm cách đường 200 m bị gán vào đoạn đường không liên quan. Đặt ngưỡng snap tối đa và loại điểm không snap được.
- **Thành phần liên thông rời rạc.** Một cụm đường tách rời phần còn lại → mọi tuyến tới đó thất bại. `pgr_analyzeGraph` phát hiện được.
- **Cầu vượt bị nối nhầm** — xem callout.
- **Ma trận nhiều-nhiều bùng nổ.** 1.000×1.000 = một triệu tuyến. Dùng engine chuyên dụng, không dùng pgRouting.
- **Dùng đồ thị lái xe cho phân tích đi bộ.** Người đi bộ dùng ngõ, cầu vượt bộ hành, và không theo chiều đường. Profile phải khớp phương thức.

## 6. Checklist áp dụng

- [ ] Mạng lưới đã được **noding** đúng chưa? (`pgr_analyzeGraph`)
- [ ] Có bao nhiêu thành phần liên thông rời rạc?
- [ ] Đường một chiều có được mã hoá không?
- [ ] Trọng số của tôi là **chiều dài** hay **thời gian** — và đó có đúng câu hỏi không?
- [ ] Cầu vượt/hầm có được xử lý (không nối nhầm) không?
- [ ] Điểm đầu/cuối snap vào mạng lưới trong ngưỡng hợp lý chứ?
- [ ] Profile (đi bộ / xe máy / ô tô) có khớp câu hỏi không?
- [ ] Với câu hỏi tiếp cận: tôi dùng isochrone hay buffer tròn?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pgRouting | Routing trong PostGIS | [pgrouting.org](https://pgrouting.org/) |
| OSRM | Engine routing tốc độ cao trên OSM | [project-osrm.org](https://project-osrm.org/) |
| Valhalla | Routing tile-based, đa phương thức | [valhalla.github.io/valhalla](https://valhalla.github.io/valhalla/) |
| OSMnx | Tải và phân tích mạng lưới OSM bằng Python | [osmnx.readthedocs.io](https://osmnx.readthedocs.io/) |

## Tham khảo

- [pgRouting documentation](https://docs.pgrouting.org/) — tham chiếu thuật toán và hàm đầy đủ
- [OSRM — Project documentation](https://project-osrm.org/docs/v5.24.0/api/) — API và khái niệm profile
- [OSMnx — Boeing, G. (2017)](https://geoffboeing.com/publications/osmnx-complex-street-networks/) — bài báo về phân tích mạng lưới đường từ OSM
- [Valhalla documentation](https://valhalla.github.io/valhalla/api/) — isochrone và matrix API

## Liên kết

[[Buffer and Proximity Analysis]] · [[Geocoding]] · [[Geospatial Data Sources]] · [[Spatial Joins]] · [[Web Mapping Architecture]] · [[GIS]]
