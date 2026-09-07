---
tags: [gis, web, thư-viện]
status: evergreen
---
# Leaflet

> ~40 KB, không phụ thuộc gì, API học trong một buổi chiều. Leaflet là lựa chọn đúng cho **phần lớn** bản đồ web — và seed roadmap dành cho nó bốn tutorial, nhiều hơn bất kỳ công cụ nào khác. Note này nói cả khi nào **không** nên dùng nó.

## 1. Mô hình

Bốn khái niệm, hết:

| Khái niệm | Là gì |
|---|---|
| **Map** | Khung chứa, gắn vào một `div` |
| **Layer** | Mọi thứ hiển thị: tile, marker, GeoJSON, popup |
| **Control** | Widget: zoom, scale, legend, layer switcher |
| **Event** | `click`, `moveend`, `zoomend`… |

```javascript
const map = L.map('map').setView([21.03, 105.85], 12);   // LƯU Ý: [lat, lng]

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'   // ODbL yêu cầu — không bỏ được
}).addTo(map);

L.geoJSON(data, {
  style: f => ({ color: f.properties.type === 'main' ? '#e63946' : '#457b9d', weight: 2 }),
  onEachFeature: (f, layer) => layer.bindPopup(f.properties.name),
  pointToLayer: (f, latlng) => L.circleMarker(latlng, { radius: 5 })
}).addTo(map);

map.on('moveend', () => console.log(map.getBounds()));
```

> [!warning] Leaflet dùng `[lat, lng]`; GeoJSON dùng `[lng, lat]`
> `L.marker([21.03, 105.85])` là **vĩ độ trước**. Nhưng GeoJSON — mà `L.geoJSON` đọc đúng chuẩn — là **kinh độ trước**. Trộn hai quy ước trong cùng một file JS là lỗi kinh điển, và triệu chứng là điểm rơi giữa Somalia. Xem [[GeoJSON]].

## 2. Khi nào Leaflet, khi nào không

| Dùng Leaflet | Dùng [[MapLibre and Vector Tiles]] |
|---|---|
| Raster tile là chính | Vector tile là chính |
| Vài trăm–vài nghìn feature | Hàng chục nghìn+ |
| Style tĩnh, đơn giản | Style động, theo dữ liệu, mượt |
| Cần chạy trên thiết bị yếu / không WebGL | Có WebGL |
| Muốn bundle nhỏ nhất | Chấp nhận bundle lớn hơn |
| Không cần xoay/nghiêng bản đồ | Cần 3D, nghiêng, xoay |

**OpenLayers** là lựa chọn thứ ba: nặng hơn cả hai, nhưng hỗ trợ **OGC đầy đủ** (WMS, WFS, WMTS) và **nhiều CRS** — không chỉ Web Mercator. Nếu bạn phải làm việc với hạ tầng OGC hoặc CRS quốc gia, OpenLayers thường là câu trả lời đúng. Xem [[OGC Services]].

## 3. Plugin đáng biết

| Plugin | Việc |
|---|---|
| `Leaflet.markercluster` | Gom marker thành cụm — **bắt buộc** khi >1.000 điểm |
| `Leaflet.heat` | Bản đồ nhiệt |
| `Leaflet.draw` | Vẽ/sửa hình học |
| `leaflet.vectorgrid` | Đọc vector tile (hạn chế hơn MapLibre) |
| `Leaflet.markercluster` + `supercluster` | Cụm hoá hiệu năng cao |
| `esri-leaflet` | Kết nối dịch vụ ArcGIS — xem [[ArcGIS REST and Web Stack]] |

## 4. Cạm bẫy

- **Nhầm thứ tự lat/lng** — xem callout.
- **Thêm hàng nghìn marker riêng lẻ** → DOM phình, cuộn giật. Dùng `circleMarker` (nhẹ hơn `marker`) và clustering.
- **Nạp GeoJSON lớn trực tiếp** — xem [[Web Map Performance]].
- **Bản đồ cao 0 pixel.** Nếu `div` không có chiều cao CSS, Leaflet không hiện gì và không báo lỗi. Lỗi số một của người mới.
- **Không gọi `map.invalidateSize()`** sau khi container đổi kích thước (tab ẩn, sidebar mở) → tile xám một nửa.
- **Quên attribution.** Với OSM đây là **yêu cầu license ODbL**, không phải phép lịch sự. Xem [[Geospatial Data Sources]].
- **Dùng tile server công cộng của OSM cho sản phẩm thật** — vi phạm chính sách sử dụng. Tự host hoặc dùng nhà cung cấp tile.
- **Không huỷ map khi component unmount** trong React/Vue → rò rỉ bộ nhớ.
- **Style lại toàn bộ layer mỗi lần dữ liệu đổi** thay vì cập nhật thuộc tính.

## 5. Checklist áp dụng

- [ ] `div` bản đồ có chiều cao CSS rõ ràng không?
- [ ] Thứ tự toạ độ có đúng cho từng API (`[lat,lng]` vs GeoJSON) không?
- [ ] Số feature có vượt ngưỡng cần clustering hoặc vector tile không?
- [ ] Attribution có đầy đủ theo license nguồn dữ liệu không?
- [ ] Tile server có phải nguồn được phép dùng cho production không?
- [ ] Có gọi `invalidateSize()` khi container đổi kích thước không?
- [ ] Map có được huỷ đúng cách khi component bị gỡ không?
- [ ] Tôi đã kiểm trên di động và mạng chậm chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Leaflet | Thư viện lõi | [leafletjs.com](https://leafletjs.com/) |
| Leaflet plugins | Danh mục plugin chính thức | [leafletjs.com/plugins.html](https://leafletjs.com/plugins.html) |
| react-leaflet | Tích hợp React | [react-leaflet.js.org](https://react-leaflet.js.org/) |
| supercluster | Clustering hiệu năng cao | [github.com/mapbox/supercluster](https://github.com/mapbox/supercluster) |

## Tham khảo

- [Leaflet — Official tutorials](https://leafletjs.com/examples.html) — **có trong seed**
- [MapTime Boston — Leaflet intro](https://maptimeboston.github.io/leaflet-intro/) — **có trong seed**, giải thích rất tốt cho người mới
- [MIT DUSP — Web map workshop](http://duspviz.mit.edu/web-map-workshop/leaflet-js/) — **có trong seed**
- [Leaflet API reference](https://leafletjs.com/reference.html) — tra cứu hằng ngày

## Liên kết

[[Web Mapping Architecture]] · [[MapLibre and Vector Tiles]] · [[Web Map Performance]] · [[GeoJSON]] · [[ArcGIS REST and Web Stack]] · [[GIS]]
