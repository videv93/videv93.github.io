---
tags: [gis, web, thư-viện]
status: evergreen
---
# MapLibre and Vector Tiles

> Render bằng **WebGL** thay vì DOM, và nhận **hình học** thay vì ảnh. Hai thay đổi đó cho phép hiển thị hàng trăm nghìn đối tượng mượt mà, đổi style tức thì, và xoay/nghiêng bản đồ — những thứ [[Leaflet]] không làm được.

## 1. Bối cảnh: vì sao có MapLibre

Mapbox GL JS là mã nguồn mở (BSD) tới v1. Cuối 2020, **v2 đổi sang license độc quyền** yêu cầu API key và tính phí. Cộng đồng fork v1 thành **MapLibre GL JS**, tiếp tục phát triển mở dưới quản trị cộng đồng.

**Hệ quả thực tế:** rất nhiều tutorial trên mạng viết cho "Mapbox GL JS" — nếu là bài từ trước 2021 thì API gần như tương thích hoàn toàn với MapLibre; nếu mới hơn thì có thể dùng tính năng độc quyền. Xem [[Roadmap Half-Life]].

## 2. Style Specification — ý tưởng trung tâm

Bản đồ được mô tả bằng **một tài liệu JSON khai báo**, tách hoàn toàn khỏi dữ liệu:

```javascript
const map = new maplibregl.Map({
  container: 'map',
  center: [105.85, 21.03],    // LƯU Ý: [lng, lat] — ngược với Leaflet
  zoom: 12,
  style: {
    version: 8,
    sources: {
      'osm':      { type: 'raster', tiles: ['https://tile.../{z}/{x}/{y}.png'], tileSize: 256 },
      'parcels':  { type: 'vector', url: 'pmtiles://https://cdn.example.com/parcels.pmtiles' }
    },
    layers: [
      { id: 'bg', type: 'raster', source: 'osm' },
      {
        id: 'parcels-fill', type: 'fill', source: 'parcels', 'source-layer': 'parcels',
        paint: {
          // Style theo DỮ LIỆU — tính trên GPU, đổi tức thì
          'fill-color': [
            'interpolate', ['linear'], ['get', 'population'],
            0, '#f7fbff', 1000, '#6baed6', 10000, '#08306b'
          ],
          'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.3, 14, 0.8]
        },
        filter: ['>', ['get', 'area'], 100]
      }
    ]
  }
});
```

**Expression** (`['get', ...]`, `['interpolate', ...]`, `['case', ...]`) chạy trên GPU. Đây là điều Leaflet không có tương đương: đổi ngưỡng choropleth không cần tải lại dữ liệu.

## 3. So sánh

| | **MapLibre** | **[[Leaflet]]** | **OpenLayers** |
|---|---|---|---|
| Render | WebGL | DOM/Canvas | Canvas/WebGL |
| Bundle | ~200 KB+ | **~40 KB** | ~150 KB+ |
| Vector tile | ✅ Bản địa | Qua plugin | ✅ |
| Style động theo dữ liệu | ✅ **Rất mạnh** | Hạn chế | Trung bình |
| Nghiêng / xoay / 3D | ✅ | ❌ | Hạn chế |
| Nhiều CRS | ❌ Chủ yếu 3857 | Hạn chế | ✅ **Đầy đủ** |
| OGC (WMS/WFS) | Hạn chế | Qua plugin | ✅ **Đầy đủ** |
| Học nhanh | Trung bình | ✅ **Rất nhanh** | Chậm |

## 4. Cạm bẫy

- **`[lng, lat]` — ngược với Leaflet.** Nếu bạn chuyển từ Leaflet sang, đây là lỗi đầu tiên bạn sẽ gặp.
- **Quên `source-layer`.** Với nguồn vector tile, mỗi layer style **phải** chỉ đúng tên lớp bên trong tile. Sai tên → không hiện gì, **không báo lỗi**. Kiểm bằng metadata của tileset.
- **Sửa style trước khi map `load` xong** → lỗi hoặc mất tác dụng. Bọc trong `map.on('load', ...)`.
- **Không có WebGL** (máy cũ, VM, một số môi trường doanh nghiệp) → trang trắng. Cần fallback hoặc thông báo.
- **Quá nhiều layer trong style** làm chậm; gộp bằng expression/filter thay vì tách layer.
- **Chép code Mapbox GL JS v2+** — có thể dùng API không tồn tại trong MapLibre.
- **Nhãn chồng chéo** — điều chỉnh `symbol-sort-key`, `text-allow-overlap`, `symbol-spacing`.
- **Quên `map.remove()`** trong SPA → rò rỉ context WebGL, và trình duyệt giới hạn số context.

## 5. Checklist áp dụng

- [ ] Thứ tự toạ độ là `[lng, lat]` chứ?
- [ ] Mọi layer vector có đúng `source-layer` không?
- [ ] Code chạy sau `map.on('load')` chứ?
- [ ] Có xử lý trường hợp không hỗ trợ WebGL không?
- [ ] Style dùng expression thay vì tách nhiều layer trùng lặp chứ?
- [ ] Tutorial tôi đang theo viết cho MapLibre hay Mapbox GL v2+?
- [ ] Map có được `remove()` khi unmount không?
- [ ] Tôi đã kiểm hiệu năng trên di động chưa?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| MapLibre GL JS | Thư viện client | [maplibre.org](https://maplibre.org/) |
| Maputnik | Soạn style bằng giao diện | [maputnik.github.io](https://maputnik.github.io/) |
| tippecanoe | Tạo vector tile | [github.com/felt/tippecanoe](https://github.com/felt/tippecanoe) |
| PMTiles + `pmtiles` protocol | Phục vụ tile tĩnh | [docs.protomaps.com](https://docs.protomaps.com/) |
| react-map-gl | Tích hợp React | [visgl.github.io/react-map-gl](https://visgl.github.io/react-map-gl/) |

## Tham khảo

- [MapLibre GL JS documentation](https://maplibre.org/maplibre-gl-js/docs/) — tài liệu chính thức
- [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/) — tham chiếu đầy đủ layer, paint, expression
- [Mapbox Vector Tile Specification](https://github.com/mapbox/vector-tile-spec) — định dạng dữ liệu bên dưới
- [MapLibre — project origins](https://maplibre.org/news/2020-12-11-maplibre-and-maptiler/) — bối cảnh fork

## Liên kết

[[Leaflet]] · [[Map Tiles and Tiling Schemes]] · [[Web Mapping Architecture]] · [[Web Map Performance]] · [[Cloud Native Geospatial Formats]] · [[GIS]]
