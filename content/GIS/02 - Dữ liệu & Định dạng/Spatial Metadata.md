---
tags: [gis, metadata, chất-lượng]
status: evergreen
---
# Spatial Metadata

> Một bộ dữ liệu không có metadata không phải là dữ liệu — nó là **một dãy số bạn hy vọng mình hiểu đúng**. Sáu tháng sau, "hy vọng" đó luôn sai.

## 1. Bảy câu hỏi metadata phải trả lời

| Câu hỏi | Trường tương ứng | Không có thì sao |
|---|---|---|
| Dữ liệu này ở **CRS** nào? | `crs`, `.prj`, `spatial_ref` | Mọi phép đo là phỏng đoán — [[Coordinate Reference Systems]] |
| Thu thập **khi nào**? | `temporal extent`, `datetime` | Không biết dữ liệu còn đúng không |
| **Ai** tạo ra, từ **nguồn nào**? | `lineage`, `provenance` | Không truy được lỗi về gốc |
| Độ **chính xác vị trí** bao nhiêu? | `positional accuracy` | Dùng dữ liệu 1:250.000 cho việc cần 1 m |
| Thu thập ở **tỉ lệ** nào? | `scale`, `resolution` | Kết luận sai tỉ lệ |
| Các **cột** nghĩa là gì? | `attribute definitions`, data dictionary | `type=3` là gì? |
| **Được phép** dùng thế nào? | `license`, `use constraints` | Rủi ro pháp lý |

## 2. Các chuẩn

| Chuẩn | Phạm vi | Dùng ở đâu |
|---|---|---|
| **ISO 19115 / 19139** | Metadata địa lý đầy đủ | Cơ quan nhà nước, hạ tầng dữ liệu quốc gia |
| **FGDC CSDGM** | Chuẩn Hoa Kỳ (cũ hơn) | Dữ liệu liên bang Mỹ |
| **Dublin Core** | Metadata tổng quát, nhẹ | Catalogue chung |
| **STAC** | Ảnh và dữ liệu không gian-thời gian | **Chuẩn thực tế của cloud EO** |
| **OGC API Records / CSW** | Giao thức tìm kiếm catalogue | Máy chủ metadata |

### STAC — chuẩn đáng đầu tư nhất hiện nay

**SpatioTemporal Asset Catalog**: JSON đơn giản, ba khái niệm:

| Khái niệm | Là gì |
|---|---|
| **Item** | Một "cảnh" — hình học + thời gian + link tới file (asset) |
| **Collection** | Nhóm Item cùng loại (ví dụ toàn bộ Sentinel-2 L2A) |
| **Catalog** | Cây tổ chức các Collection |

```python
from pystac_client import Client
cat = Client.open("https://earth-search.aws.element84.com/v1")
items = cat.search(
    collections=["sentinel-2-l2a"],
    bbox=[105.5, 20.8, 106.0, 21.2],       # Hà Nội
    datetime="2025-01-01/2025-03-31",
    query={"eo:cloud_cover": {"lt": 20}},
).item_collection()
```

Sức mạnh thật: **tìm kiếm không gian + thời gian + thuộc tính trên petabyte ảnh mà không tải gì**, rồi đọc thẳng COG. Xem [[Earth Observation Data Cubes]] và [[Cloud Native Geospatial Formats]].

## 3. Nguyên tắc

1. **Metadata sinh ra cùng dữ liệu, không viết sau.** Viết sau nghĩa là không bao giờ viết.
2. **Sinh tự động những gì tự động được** — extent, số feature, CRS, ngày xử lý, phiên bản công cụ. Chỉ viết tay phần cần con người.
3. **Lineage quan trọng hơn mô tả.** Biết *"dữ liệu này = lớp A clip theo B, lọc x>5, xử lý bằng GDAL 3.8"* đáng giá hơn một đoạn văn mô tả đẹp.
4. **Ghi phiên bản công cụ.** Kết quả GEOS/PROJ có thể khác giữa các phiên bản; không ghi thì không tái lập được.
5. **Metadata đi cùng file, không nằm ở nơi khác.** [[GeoPackage]] và COG mang được metadata trong file — dùng đi.

## 4. Cạm bẫy

- **`.prj` bị mất khi copy** — cạm bẫy kinh điển của [[Shapefile]].
- **Metadata mô tả *phiên bản trước* của dữ liệu.** Nguy hiểm hơn không có metadata, vì nó tạo niềm tin sai.
- **Không ghi ngày dữ liệu, chỉ ghi ngày tải.** Hai thứ khác nhau hoàn toàn.
- **Không có data dictionary cho cột mã hoá.** `landuse = 7` là vô nghĩa sau khi người tạo nghỉ việc.
- **Bỏ qua license.** Nhiều nguồn "mở" đòi ghi công (ODbL của OpenStreetMap) — thiếu là vi phạm.
- **Metadata quá đầy đủ tới mức không ai điền.** Form ISO 19115 đầy đủ có hàng trăm trường; một profile rút gọn được dùng thật tốt hơn một chuẩn đầy đủ bị bỏ trống.

## 5. Checklist áp dụng

- [ ] Bộ dữ liệu có ghi rõ **CRS** không?
- [ ] Có ghi **thời điểm dữ liệu** (không phải thời điểm tải) không?
- [ ] Có **lineage**: nguồn nào, phép biến đổi nào, công cụ phiên bản nào?
- [ ] Mọi cột mã hoá có **data dictionary** không?
- [ ] Có ghi **độ chính xác vị trí** và **tỉ lệ** không?
- [ ] Có ghi **license** và yêu cầu ghi công không?
- [ ] Metadata có được sinh **tự động** trong pipeline không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pystac / pystac-client | Tạo và tìm kiếm STAC | [pystac.readthedocs.io](https://pystac.readthedocs.io/) |
| pygeometa | Sinh metadata ISO/OGC từ YAML | [geopython.github.io/pygeometa](https://geopython.github.io/pygeometa/) |
| GeoNetwork | Máy chủ catalogue metadata | [geonetwork-opensource.org](https://geonetwork-opensource.org/) |
| `gdalinfo -json` | Trích metadata sẵn có của raster | [[GDAL and OGR]] |

## Tham khảo

- [STAC Specification](https://stacspec.org/) — chuẩn hiện đại, nên bắt đầu từ đây
- [ISO 19115 — Geographic information: Metadata](https://www.iso.org/standard/53798.html) — chuẩn đầy đủ
- [FGDC — Geospatial Metadata Standards](https://www.fgdc.gov/metadata) — chuẩn Hoa Kỳ và tài liệu hướng dẫn
- [OGC API — Records](https://ogcapi.ogc.org/records/) — giao thức catalogue hiện đại

## Liên kết

[[Geospatial Data Sources]] · [[Geospatial Data Quality]] · [[Cloud Native Geospatial Formats]] · [[Earth Observation Data Cubes]] · [[Shapefile]] · [[GIS]]
