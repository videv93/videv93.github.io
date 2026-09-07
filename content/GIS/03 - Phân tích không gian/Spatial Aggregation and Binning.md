---
tags: [gis, phân-tích, thống-kê]
status: evergreen
---
# Spatial Aggregation and Binning

> Gộp điểm thành vùng để nhìn ra mẫu hình. Nhưng **đơn vị gộp là một lựa chọn của bạn, và lựa chọn đó có thể tạo ra hoặc xoá đi kết luận** — đây là vấn đề MAUP, và nó nghiêm trọng hơn hầu hết người làm GIS thừa nhận.

## 1. MAUP — Modifiable Areal Unit Problem

Cùng một tập điểm, gộp theo hai cách khác nhau cho hai kết luận khác nhau. MAUP có **hai thành phần độc lập**:

| Thành phần | Nghĩa | Ví dụ |
|---|---|---|
| **Scale effect** | Đổi **kích thước** đơn vị → đổi kết quả | Gộp theo xã vs theo huyện cho hệ số tương quan khác nhau |
| **Zoning effect** | Giữ nguyên kích thước, đổi **ranh giới** → đổi kết quả | Vẽ lại ranh giới cùng diện tích → đổi kết luận (đây chính là gerrymandering) |

> [!warning] MAUP không có "lời giải", chỉ có cách hành xử trung thực
> Không tồn tại đơn vị gộp "đúng". Cách xử lý đúng là: **(1)** chọn đơn vị có ý nghĩa với câu hỏi, **(2)** nêu rõ mình chọn gì, **(3)** kiểm tra kết luận có bền ở nhiều mức gộp không. Nếu kết luận đảo chiều khi đổi kích thước ô, đó **là** phát hiện chính, không phải chi tiết kỹ thuật.

Liên quan: **ecological fallacy** — suy từ thống kê nhóm ra cá nhân. "Quận có thu nhập cao có tỉ lệ X cao" **không** có nghĩa người thu nhập cao có tỉ lệ X cao.

## 2. Các lưới gộp

| Lưới | Ưu | Nhược |
|---|---|---|
| **Ô vuông** | Đơn giản, khớp raster, dễ hiểu | Khoảng cách tâm không đều (cạnh vs chéo) |
| **Lục giác (hexbin)** | 6 láng giềng **cách đều**, ít thiên lệch hướng, hợp với phân tích lan toả | Khó xếp lồng nhau theo cấp |
| **H3** (Uber) | Chỉ mục phân cấp toàn cầu, id là số nguyên, join cực nhanh | Lục giác **không lồng chính xác** giữa các cấp |
| **S2** (Google) | Ô vuông phân cấp, lồng chính xác | Ô méo theo vị trí trên hình cầu |
| **Geohash** | Chuỗi text, tiền tố = vùng cha | Ô méo mạnh theo vĩ độ |
| **Đơn vị hành chính** | Có ý nghĩa xã hội, ghép được dữ liệu khác | Kích thước rất không đều → MAUP nặng |

```sql
-- Hexbin trong PostGIS (CRS mét, ô cạnh 500 m)
SELECT h.geom, COUNT(p.id) AS n
FROM ST_HexagonGrid(500, ST_SetSRID(ST_EstimatedExtent('points','geom'), 32648)) h
LEFT JOIN points p ON ST_Intersects(h.geom, p.geom)
GROUP BY h.geom
HAVING COUNT(p.id) > 0;

-- Lưới vuông
SELECT ST_SquareGrid(1000, geom) FROM study_area;
```

## 3. Chuẩn hoá — bước bắt buộc

**Đếm thô gần như luôn chỉ đo mật độ dân số.** Bản đồ "số vụ tai nạn theo quận" chỉ cho biết quận nào đông người.

| Cách chuẩn hoá | Công thức | Dùng khi |
|---|---|---|
| Mật độ | đếm / diện tích | So sánh vùng khác kích thước |
| Tỉ lệ | đếm / dân số | Rủi ro theo đầu người |
| Tỉ lệ chuẩn hoá | quan sát / kỳ vọng | So với mức nền |
| Z-score / LISA | Độ lệch so với trung bình không gian | Tìm điểm nóng thống kê |

> [!note] Choropleth phải dùng phép chiếu equal-area
> Nếu bạn chia cho diện tích thì diện tích phải đúng. Vẽ mật độ trên EPSG:3857 làm sai số hệ thống theo vĩ độ. Xem [[Map Projections]].

## 4. Cạm bẫy

- **Vẽ đếm thô lên choropleth** — sai lầm phổ biến nhất trong toàn bộ trực quan hoá không gian.
- **Chọn cách chia lớp (classification) mà không nói ra.** Quantile, equal interval, natural breaks (Jenks) và standard deviation cho ra **bốn bản đồ khác hẳn nhau** từ cùng dữ liệu. Cách chia lớp là một lập luận, phải công khai.
- **Ô rỗng bị hiểu là "giá trị 0"** thay vì "không có dữ liệu". Hai thứ khác nhau; hiển thị khác nhau.
- **Ô có mẫu quá nhỏ.** Tỉ lệ 1/2 = 50% trông giật gân nhưng vô nghĩa. Đặt ngưỡng mẫu tối thiểu hoặc dùng làm trơn Bayes.
- **Trộn dữ liệu gộp ở các cấp khác nhau** rồi so sánh trực tiếp.
- **Không kiểm độ bền qua nhiều mức gộp** — bỏ qua MAUP hoàn toàn.
- **H3/S2 ở CRS sai.** Chúng làm việc trên toạ độ địa lý; đừng đưa toạ độ mét vào.

## 5. Checklist áp dụng

- [ ] Tôi có **chuẩn hoá** (chia cho diện tích/dân số) chưa, hay đang vẽ đếm thô?
- [ ] Đơn vị gộp của tôi có ý nghĩa với câu hỏi không, hay chỉ là mặc định?
- [ ] Tôi đã thử **ít nhất hai kích thước ô** và kiểm kết luận có đổi không?
- [ ] Cách chia lớp là gì, và tôi có nêu rõ trong chú giải không?
- [ ] Ô có mẫu nhỏ có được xử lý riêng không?
- [ ] "Không dữ liệu" và "giá trị 0" có được phân biệt trên bản đồ không?
- [ ] Nếu là mật độ: tôi có dùng phép chiếu equal-area không?
- [ ] Tôi có đang suy từ nhóm ra cá nhân (ecological fallacy) không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| `ST_HexagonGrid` / `ST_SquareGrid` | Sinh lưới trong PostGIS 3.1+ | [postgis.net](https://postgis.net/docs/ST_HexagonGrid.html) |
| H3 | Chỉ mục lục giác phân cấp | [h3geo.org](https://h3geo.org/) |
| PySAL / esda | Tự tương quan không gian, LISA, Moran's I | [pysal.org](https://pysal.org/) |
| GeoPandas + mapclassify | Chia lớp choropleth | [[GeoPandas]] |

## Tham khảo

- [Openshaw, S. (1984), *The Modifiable Areal Unit Problem*](https://www.qmrg.org.uk/files/2008/11/38-maup-openshaw.pdf) — công trình gốc về MAUP
- [H3 documentation](https://h3geo.org/docs/) — hệ chỉ mục lục giác và các phép trên nó
- [PySAL — Exploratory Spatial Data Analysis](https://pysal.org/esda/) — thống kê không gian, Moran's I, LISA
- [Geographic Data Science book — Choropleth mapping](https://geographicdata.science/book/notebooks/05_choropleth.html) — chương chuyên về chia lớp, từ tác giả có trong seed

## Liên kết

[[Spatial Joins]] · [[Map Projections]] · [[Raster Algebra and Zonal Statistics]] · [[Web Map Performance]] · [[Hedonic Pricing and GIS]] · [[GIS]]
