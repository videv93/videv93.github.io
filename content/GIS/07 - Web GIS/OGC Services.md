---
tags: [gis, web, chuẩn]
status: evergreen
---
# OGC Services

> Giao thức chuẩn để phần mềm GIS nói chuyện với nhau qua HTTP. Chúng cũ, dài dòng, dựa trên XML — và **vẫn là ngôn ngữ bắt buộc** khi làm việc với hạ tầng dữ liệu không gian của cơ quan nhà nước ở khắp nơi.

## 1. Bộ chuẩn cũ

| Dịch vụ | Trả về | Dùng khi |
|---|---|---|
| **WMS** (Web Map Service) | **Ảnh** đã render | Xem nhanh, không cần dữ liệu thô |
| **WMTS** (Web Map Tile Service) | Ảnh **đã cắt tile**, cache được | Như WMS nhưng nhanh hơn nhiều |
| **WFS** (Web Feature Service) | **Hình học + thuộc tính** (GML/GeoJSON) | Cần dữ liệu thật để phân tích |
| **WCS** (Web Coverage Service) | Dữ liệu **raster** thô | Lấy giá trị raster, không phải ảnh |
| **CSW** (Catalog Service) | Metadata | Tìm dữ liệu — xem [[Spatial Metadata]] |

```
# Ba thao tác chuẩn của WMS
.../wms?SERVICE=WMS&REQUEST=GetCapabilities                 # có gì ở đây?
.../wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=roads&BBOX=...&WIDTH=800&HEIGHT=600
        &CRS=EPSG:3857&FORMAT=image/png&VERSION=1.3.0
.../wms?SERVICE=WMS&REQUEST=GetFeatureInfo&...              # click vào đây là gì?

# WFS trả dữ liệu thật
.../wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=roads&OUTPUTFORMAT=application/json
```

**`GetCapabilities` là lệnh đầu tiên luôn phải chạy** — nó liệt kê lớp, CRS hỗ trợ, định dạng, và phạm vi. Đọc nó trước khi đoán bất cứ gì.

> [!warning] WMS 1.3.0 đảo thứ tự trục
> WMS **1.1.1** dùng `BBOX=minx,miny,maxx,maxy` (kinh độ trước). WMS **1.3.0** tuân thủ định nghĩa EPSG, nên với EPSG:4326 nó dùng **vĩ độ trước**. Cùng một BBOX cho hai kết quả khác nhau tuỳ phiên bản. Triệu chứng: ảnh trả về của vùng hoàn toàn khác, hoặc lỗi "invalid bbox". Xem [[EPSG Codes]].

## 2. OGC API — thế hệ mới

Bộ chuẩn mới thay XML bằng **REST + JSON + OpenAPI**:

| Chuẩn mới | Thay cho | Trả về |
|---|---|---|
| **OGC API — Features** | WFS | GeoJSON qua REST |
| **OGC API — Tiles** | WMTS | Tile qua REST |
| **OGC API — Maps** | WMS | Ảnh qua REST |
| **OGC API — Coverages** | WCS | Raster |
| **OGC API — Records** | CSW | Metadata |

```
GET /collections                          # liệt kê lớp
GET /collections/roads/items?limit=100&bbox=105.7,20.9,106,21.1
GET /collections/roads/items/42           # một feature
```

Dễ dùng hơn hẳn — bất kỳ HTTP client nào cũng gọi được, không cần thư viện GIS. Nhưng **hỗ trợ vẫn chưa phổ quát**; hạ tầng cũ còn dùng WMS/WFS nhiều năm nữa.

## 3. Khi nào dùng chuẩn OGC

| Dùng OGC khi | Dùng tile/API riêng khi |
|---|---|
| Phải tích hợp với hệ thống cơ quan nhà nước | Ứng dụng web của riêng bạn |
| Người dùng mở dữ liệu bằng QGIS/ArcGIS | Người dùng chỉ dùng bản đồ web của bạn |
| Yêu cầu đấu thầu/pháp lý ghi rõ chuẩn OGC | Không có ràng buộc |
| Cần liên thông nhiều phần mềm | Ưu tiên hiệu năng và đơn giản |

> [!note] Lợi ích lớn nhất của WMS/WFS
> Một URL WMS dán được thẳng vào **QGIS, ArcGIS Pro, OpenLayers** và nhiều phần mềm khác — không cần viết code, không cần tài liệu riêng. Với việc chia sẻ dữ liệu giữa các tổ chức, đó là giá trị mà REST API tự chế không có.

## 4. Cạm bẫy

- **Thứ tự trục WMS 1.3.0** — xem callout. Cạm bẫy số một.
- **Không đọc `GetCapabilities`** rồi đoán tên lớp và CRS.
- **Yêu cầu CRS mà server không hỗ trợ** → lỗi hoặc reproject phía server (chậm, đôi khi sai).
- **WFS không giới hạn số feature** → tải về hàng triệu đối tượng. Luôn đặt `count`/`maxFeatures` và lọc bằng `bbox`.
- **Dùng WMS cho lớp thay đổi liên tục mà vẫn cache mạnh** → người dùng thấy dữ liệu cũ.
- **GML khó xử lý.** Nếu server hỗ trợ `OUTPUTFORMAT=application/json`, dùng nó thay vì GML.
- **CORS chưa bật** khiến client web không gọi được, dù `curl` thì chạy.
- **Nhầm WMS với WMTS** — WMS render theo yêu cầu (chậm, linh hoạt), WMTS trả tile cố định (nhanh, cache tốt).

## 5. Checklist áp dụng

- [ ] Tôi đã đọc `GetCapabilities` chưa?
- [ ] Phiên bản WMS là gì — và thứ tự trục BBOX có đúng không?
- [ ] CRS tôi yêu cầu có nằm trong danh sách server hỗ trợ không?
- [ ] Với WFS: tôi có giới hạn số feature và lọc theo bbox không?
- [ ] Định dạng đầu ra có phải JSON (thay vì GML) không?
- [ ] CORS đã bật cho client web chưa?
- [ ] Tôi cần dữ liệu thô (WFS) hay chỉ cần ảnh (WMS/WMTS)?
- [ ] Có nên dùng OGC API mới thay vì chuẩn cũ không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| QGIS | Kết nối và kiểm tra dịch vụ OGC nhanh nhất | [qgis.org](https://qgis.org/) |
| OWSLib | Client Python cho WMS/WFS/CSW | [geopython.github.io/OWSLib](https://geopython.github.io/OWSLib/) |
| pygeoapi | Máy chủ OGC API hiện đại | [pygeoapi.io](https://pygeoapi.io/) |
| GeoServer | Máy chủ OGC đầy đủ | [[Tile Servers and GeoServer]] |

## Tham khảo

- [OGC Standards](https://www.ogc.org/standards/) — danh mục chuẩn chính thức
- [OGC API family](https://ogcapi.ogc.org/) — thế hệ chuẩn mới
- [OGC Web Map Service 1.3.0](https://www.ogc.org/standard/wms/) — bản chuẩn, gồm quy tắc thứ tự trục
- [OWSLib documentation](https://geopython.github.io/OWSLib/) — truy cập dịch vụ OGC bằng Python

## Liên kết

[[Tile Servers and GeoServer]] · [[Web Mapping Architecture]] · [[Spatial Metadata]] · [[EPSG Codes]] · [[ArcGIS REST and Web Stack]] · [[GIS]]
