---
tags: [gis, web, hiệu-năng]
status: evergreen
---
# Web Map Performance

> Bản đồ web chậm gần như luôn vì **gửi quá nhiều dữ liệu, hoặc gửi dữ liệu chi tiết hơn mức mắt nhìn thấy được**. Cả hai đều sửa được ở tầng dữ liệu, trước khi động tới code client.

## 1. Ngân sách

| Chỉ số | Ngưỡng thực dụng |
|---|---|
| Tải ban đầu | < 1 MB |
| Một tile | < 100 KB (thường 10–50 KB) |
| Số feature nhìn thấy cùng lúc | < 10.000 (vector tile), < 2.000 (GeoJSON) |
| Thời gian tương tác được | < 3 giây trên 3G |
| Số đỉnh mỗi hình học ở zoom thấp | Vài chục là đủ |

> [!note] Phép kiểm rẻ nhất
> Mở DevTools → tab Network → tải lại bản đồ. Nếu thấy một request GeoJSON hàng MB, bạn đã tìm ra vấn đề và không cần đo gì thêm.

## 2. Bảy kỹ thuật, theo hiệu quả

### 2.1 Đơn giản hoá theo mức zoom
Ở z=5, một tỉnh chỉ chiếm vài chục pixel — gửi 50.000 đỉnh cho nó là lãng phí thuần tuý.

```sql
-- Cột hình học riêng cho từng dải zoom
ALTER TABLE districts ADD COLUMN geom_low  geometry(MultiPolygon, 3857);
UPDATE districts SET geom_low = ST_SimplifyPreserveTopology(ST_Transform(geom, 3857), 500);
CREATE INDEX ON districts USING GIST (geom_low);
```

`tippecanoe` làm việc này tự động khi sinh vector tile — đó là lý do nên dùng nó thay vì tự cắt tile.

> [!warning] Simplify từng hình riêng lẻ phá vỡ ranh giới chung
> Hai xã giáp nhau, simplify độc lập → xuất hiện khe hở và chồng lấn nhìn thấy được. Dùng `ST_SimplifyPreserveTopology`, hoặc **mapshaper** để simplify cả coverage cùng lúc. Xem [[Geometry Validity and Topology]].

### 2.2 Chuyển từ GeoJSON sang vector tile
Ngưỡng thực dụng: **quá vài nghìn feature**. Xem [[Map Tiles and Tiling Schemes]].

### 2.3 Cache tích cực
Tile bất biến theo `(z,x,y)` → `Cache-Control: max-age` dài + CDN. Xem [[Tile Servers and GeoServer]].

### 2.4 Giới hạn dữ liệu theo khung nhìn
Chỉ tải dữ liệu trong `bbox` hiện tại, không tải cả nước.

### 2.5 Giảm độ chính xác toạ độ
6 chữ số thập phân ≈ 0,1 m — đủ cho mọi bản đồ web. Cắt từ 15 xuống 6 chữ số thường giảm **30–50%** dung lượng GeoJSON:
```bash
ogr2ogr -f GeoJSON out.geojson in.gpkg -lco COORDINATE_PRECISION=6 -lco RFC7946=YES
```

### 2.6 Clustering cho điểm
10.000 marker riêng lẻ làm treo trình duyệt; cụm hoá chúng cho ra bản đồ mượt và **dễ đọc hơn**. Xem [[Leaflet]].

### 2.7 Nén
Bật gzip/brotli cho GeoJSON và MVT. Vector tile đã nén sẵn — đừng nén hai lần.

## 3. Bảng chẩn đoán

| Triệu chứng | Nguyên nhân | Sửa |
|---|---|---|
| Tải ban đầu rất lâu | GeoJSON quá lớn | Vector tile |
| Giật khi pan/zoom | Quá nhiều đối tượng DOM | MapLibre (WebGL) hoặc clustering |
| Tile hiện chậm dần | Không cache, sinh động | CDN + cache |
| Mượt ở zoom gần, lag ở zoom xa | Không đơn giản hoá theo zoom | Simplify theo mức |
| Nhanh trên desktop, chậm trên di động | Quá nhiều JS/dữ liệu | Giảm payload, kiểm trên thiết bị thật |
| Bộ nhớ tăng dần rồi crash | Rò rỉ, không huỷ layer | Dọn dẹp khi unmount |
| Nhanh lúc dev, chậm production | Dữ liệu thật lớn hơn dữ liệu mẫu | Đo trên dữ liệu thật |

## 4. Cạm bẫy

- **Tối ưu client trước khi tối ưu dữ liệu.** Không code nào cứu được một payload 50 MB.
- **Đo trên máy dev, mạng nhanh, dữ liệu mẫu.** Dùng throttling trong DevTools và dữ liệu quy mô thật.
- **Simplify phá topology** — xem callout.
- **Giữ hình học đầy đủ ở mọi zoom.**
- **Không giới hạn zoom max** → sinh tile vô hạn.
- **Nhãn được render cho mọi feature** dù chồng chéo — dùng cơ chế chống chồng nhãn của thư viện.
- **Quên `will-change` / lớp GPU** khi làm animation — nhưng đây là bước cuối, không phải bước đầu.
- **Tải lại toàn bộ dữ liệu khi filter** thay vì lọc ở client (với vector tile) hoặc gửi filter lên server.

## 5. Checklist áp dụng

- [ ] Tab Network cho thấy request lớn nhất là bao nhiêu byte?
- [ ] Có request GeoJSON nào > 1 MB không?
- [ ] Hình học có được đơn giản hoá theo zoom không?
- [ ] Toạ độ có bị thừa chữ số thập phân không?
- [ ] Tile có được cache ở CDN không?
- [ ] Điểm có được cụm hoá khi đông không?
- [ ] Tôi đã thử với **network throttling** và trên **thiết bị di động thật** chưa?
- [ ] Tôi đo trên dữ liệu **quy mô production** chứ?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Chrome DevTools (Network, Performance) | Chẩn đoán chính | [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools/) |
| mapshaper | Simplify giữ topology cho cả coverage | [mapshaper.org](https://mapshaper.org/) |
| tippecanoe | Sinh tile có tối ưu theo zoom | [github.com/felt/tippecanoe](https://github.com/felt/tippecanoe) |
| Lighthouse | Đo tổng thể hiệu năng trang | [developer.chrome.com/docs/lighthouse](https://developer.chrome.com/docs/lighthouse/) |

## Tham khảo

- [Mapbox — Optimize map performance](https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/) — hướng dẫn tối ưu vector tile
- [tippecanoe README](https://github.com/felt/tippecanoe) — các chiến lược giảm dữ liệu theo zoom
- [mapshaper — simplification](https://github.com/mbloch/mapshaper/wiki/Command-Reference#-simplify) — simplify giữ topology
- [web.dev — Performance](https://web.dev/explore/fast) — nguyên tắc hiệu năng web nói chung

## Liên kết

[[Map Tiles and Tiling Schemes]] · [[MapLibre and Vector Tiles]] · [[Leaflet]] · [[Tile Servers and GeoServer]] · [[Geometry Validity and Topology]] · [[Web Mapping Architecture]] · [[GIS]]
