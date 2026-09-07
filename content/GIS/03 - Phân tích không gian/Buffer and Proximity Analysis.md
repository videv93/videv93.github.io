---
tags: [gis, phân-tích]
status: evergreen
---
# Buffer and Proximity Analysis

> `ST_Buffer` là hàm bị dùng sai nhiều nhất trong toàn bộ GIS — không phải vì nó khó, mà vì nó **luôn trả về kết quả** kể cả khi đơn vị hoàn toàn vô nghĩa.

## 1. Buffer

Tạo vùng bao quanh một hình học ở khoảng cách cho trước.

```sql
-- SAI: geom ở 4326 → buffer 500 ĐỘ ≈ 55.000 km
SELECT ST_Buffer(geom, 500) FROM schools;

-- ĐÚNG 1: transform sang CRS mét, buffer, rồi transform lại
SELECT ST_Transform(ST_Buffer(ST_Transform(geom, 32648), 500), 4326) FROM schools;

-- ĐÚNG 2: dùng geography (chính xác trắc địa, chậm hơn)
SELECT ST_Buffer(geom::geography, 500)::geometry FROM schools;
```

### Tham số hay bị bỏ quên

| Tham số | Tác dụng | Mặc định |
|---|---|---|
| `quad_segs` | Số đoạn cho mỗi 1/4 đường tròn — quyết định độ mượt **và** số đỉnh | 8 |
| `endcap` | `round` / `flat` / `square` — kiểu đầu mút đường | `round` |
| `join` | `round` / `mitre` / `bevel` — kiểu góc | `round` |
| Khoảng cách **âm** | Thu nhỏ polygon vào trong | — |

```sql
-- Buffer nhẹ hơn nhiều đỉnh (dùng khi chỉ cần vùng gần đúng, xử lý hàng loạt)
SELECT ST_Buffer(geom, 500, 'quad_segs=2') FROM schools;

-- Buffer âm: thu vào 10 m, hữu ích để loại vùng rìa
SELECT ST_Buffer(geom, -10) FROM parcels;
```

> [!warning] Buffer âm có thể xoá sạch hình học
> Thu polygon hẹp vào 10 m khi nó chỉ rộng 15 m sẽ cho polygon rỗng — không phải lỗi, nhưng feature biến mất khỏi kết quả. Luôn đếm feature trước/sau.

## 2. Các phép lân cận khác

| Phép | Hàm | Câu hỏi |
|---|---|---|
| Khoảng cách | `ST_Distance` | Xa bao nhiêu? |
| Trong bán kính | `ST_DWithin` | Có gần hơn X không? |
| Gần nhất | `<->` + `LIMIT` | Cái nào gần nhất? |
| Đường nối gần nhất | `ST_ShortestLine` | Nối ở đâu? |
| Vùng ảnh hưởng | **Voronoi** `ST_VoronoiPolygons` | Vùng nào gần trạm nào nhất? |
| Bao lồi | `ST_ConvexHull` | Vùng bao ngoài? |
| Bao lõm | `ST_ConcaveHull` | Vùng bao ôm sát hơn |

**Voronoi đáng chú ý**: nó chia mặt phẳng thành các vùng "gần điểm này nhất". Đây là câu trả lời đúng cho *"khu vực phục vụ của mỗi trạm y tế"* khi giả định di chuyển theo đường chim bay — nhanh hơn nhiều so với tính isochrone thật, xem [[Network Analysis and Routing]].

## 3. Buffer đường chim bay vs buffer theo mạng lưới

Đây là khác biệt khái niệm quan trọng nhất, và là nơi buffer bị lạm dụng:

| | **Buffer Euclid** | **Isochrone (theo mạng lưới)** |
|---|---|---|
| Giả định | Đi được thẳng theo mọi hướng | Đi theo đường thật |
| Tính | Rất nhanh | Chậm, cần dữ liệu mạng lưới |
| Đúng khi | Ô nhiễm, tiếng ồn, tầm nhìn, phát tán | **Tiếp cận của con người** |
| Sai khi | Có sông, núi, đường cao tốc chắn ngang | — |

> [!warning] Sai lầm phân tích phổ biến nhất
> "Bán kính 1 km quanh trạm metro" nghe hợp lý — nhưng nếu giữa nhà và trạm có một con sông không cầu, khoảng cách thật là 5 km. **Buffer trả lời câu hỏi hình học; câu hỏi thật thường là câu hỏi về khả năng tiếp cận.** Với phân tích tiếp cận nghiêm túc, dùng isochrone.

## 4. Cạm bẫy

- **Buffer bằng độ** — lỗi số một. Xem [[Reprojection Pitfalls]].
- **Buffer nhiều điểm rồi union** tạo ra hình học khổng lồ. Nếu chỉ cần biết "có nằm trong bán kính không", dùng `ST_DWithin` — không cần tạo buffer nào cả.
- **`quad_segs` mặc định tạo quá nhiều đỉnh** khi buffer hàng triệu đối tượng. Giảm xuống 2–4 tiết kiệm rất nhiều.
- **Buffer chồng lấn bị đếm trùng.** Tổng diện tích buffer của 100 trường học **không phải** diện tích được phục vụ — phải `ST_Union` trước khi tính.
- **Buffer trên `geography` với bán kính lớn** rất chậm và có thể sinh hình học phức tạp qua cực.
- **Dùng buffer để "sửa" hình học không hợp lệ** (`ST_Buffer(geom, 0)`) — mẹo cũ, nay nên dùng `ST_MakeValid`. Xem [[Geometry Validity and Topology]].

## 5. Checklist áp dụng

- [ ] Hình học có ở **CRS mét** trước khi buffer không?
- [ ] Bán kính có đúng đơn vị mong đợi không? (kiểm bằng `ST_Area` của một buffer)
- [ ] Nếu chỉ cần kiểm "trong bán kính": tôi có thể dùng `ST_DWithin` thay vì tạo buffer không?
- [ ] Nếu tính diện tích phục vụ: tôi đã `ST_Union` các buffer chồng lấn chưa?
- [ ] Buffer âm có làm mất feature nào không? (đếm trước/sau)
- [ ] Câu hỏi của tôi là **hình học** hay **khả năng tiếp cận**? (nếu là tiếp cận → isochrone)
- [ ] `quad_segs` có hợp lý với quy mô dữ liệu không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_Buffer` | Buffer với tham số đầy đủ | [postgis.net](https://postgis.net/docs/ST_Buffer.html) |
| `ST_VoronoiPolygons` | Vùng ảnh hưởng | [postgis.net](https://postgis.net/docs/ST_VoronoiPolygons.html) |
| OSRM / Valhalla | Isochrone theo mạng lưới thật | [[Network Analysis and Routing]] |
| `shapely.buffer` | Bản Python | [[Shapely]] |

## Tham khảo

- [PostGIS — ST_Buffer](https://postgis.net/docs/ST_Buffer.html) — tham chiếu đầy đủ tham số `quad_segs`, `endcap`, `join`
- [PostGIS Workshop — Spatial Analysis](https://postgis.net/workshops/postgis-intro/knn.html) — buffer và lân cận trong ngữ cảnh thực hành
- [Shapely — Buffer documentation](https://shapely.readthedocs.io/en/stable/manual.html#object.buffer) — cùng tham số, phía Python
- [OSRM — Isochrone concepts](https://project-osrm.org/) — so sánh với phân tích theo mạng lưới

## Liên kết

[[Geodesic vs Planar Measurement]] · [[Spatial Joins]] · [[Network Analysis and Routing]] · [[Overlay Operations]] · [[Reprojection Pitfalls]] · [[GIS]]
