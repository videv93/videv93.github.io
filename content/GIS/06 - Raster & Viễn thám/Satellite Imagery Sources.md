---
tags: [gis, viễn-thám, dữ-liệu]
status: evergreen
---
# Satellite Imagery Sources

> Chọn nguồn ảnh là chọn **một điểm trên mặt đánh đổi bốn chiều** (không gian × phổ × thời gian × chi phí). Note này sắp theo *"tôi cần gì"* để bạn không phải đọc hết đặc tả của mười vệ tinh.

## 1. Ba nguồn mở chủ lực

| | **Sentinel-2** | **Landsat 8/9** | **Sentinel-1 (SAR)** |
|---|---|---|---|
| Phân giải | **10–60 m** | 15–100 m (30 m chính) | 5–20 m |
| Band | 13 (đa phổ) | 11 (có nhiệt) | Radar C-band |
| Chu kỳ lặp | **~5 ngày** | 16 ngày (8 nếu ghép 8+9) | ~6–12 ngày |
| Lịch sử | 2015→ | **1972→** (cả dòng Landsat) | 2014→ |
| Mây | Bị chặn | Bị chặn | ✅ **Xuyên qua** |
| Nhiệt độ bề mặt | ❌ | ✅ | ❌ |
| Chi phí | Miễn phí | Miễn phí | Miễn phí |

**Chọn nhanh:**

| Cần gì | Dùng |
|---|---|
| Chi tiết tốt nhất, cập nhật dày | **Sentinel-2** |
| Chuỗi thời gian dài (thập kỷ) | **Landsat** — không nguồn mở nào thay được |
| Nhiệt độ bề mặt | **Landsat** (band nhiệt) |
| Vùng nhiều mây, giám sát liên tục | **Sentinel-1 SAR** |
| Theo dõi hằng ngày, phân giải thô | MODIS / VIIRS |
| Chi tiết dưới mét | Thương mại (Planet, Maxar, Airbus) |

## 2. Nguồn khác

| Nguồn | Phân giải | Đặc điểm |
|---|---|---|
| **MODIS / VIIRS** | 250 m–1 km | Hằng ngày, toàn cầu; hợp với khí hậu, cháy, thực vật quy mô lớn |
| **Planet** | 3–5 m (PlanetScope) | **Hằng ngày**, thương mại; có chương trình miễn phí cho nghiên cứu |
| **Maxar / Airbus** | 0,3–1,5 m | Rất chi tiết, đắt, đặt chụp theo yêu cầu |
| **Sentinel-3** | 300 m–1 km | Đại dương, nhiệt độ, màu nước |
| **Sentinel-5P** | ~7 km | Khí quyển: NO₂, CH₄, SO₂, aerosol |
| **ICESat-2 / GEDI** | Vệt lidar | Chiều cao tán rừng, sinh khối |

## 3. Lấy dữ liệu bằng cách nào

| Cách | Phù hợp | Ghi chú |
|---|---|---|
| **STAC API** | Tự động hoá, chọn lọc theo điều kiện | **Cách hiện đại nhất** — xem [[Spatial Metadata]] |
| Copernicus Data Space | Nguồn chính thức Sentinel | Cần tài khoản |
| USGS EarthExplorer | Landsat và nhiều nguồn NASA/USGS | Giao diện web + API |
| Google Earth Engine | Xử lý ngay trên cloud, không tải | Khoá vào nền tảng |
| AWS Open Data | COG trên S3, đọc trực tiếp | Trả tiền egress nếu ra ngoài vùng |

```python
# Tìm ảnh ít mây bằng STAC — mẫu dùng lại được
from pystac_client import Client
cat = Client.open("https://earth-search.aws.element84.com/v1")
items = cat.search(
    collections=["sentinel-2-l2a"],          # L2A, không phải L1C
    bbox=[105.7, 20.9, 106.0, 21.1],
    datetime="2025-01-01/2025-12-31",
    query={"eo:cloud_cover": {"lt": 20}},
    sortby=[{"field": "properties.eo:cloud_cover", "direction": "asc"}],
).item_collection()

# Đọc thẳng COG từ S3, không tải cả cảnh
import rioxarray
red = rioxarray.open_rasterio(items[0].assets["red"].href, chunks=True)
```

## 4. Cạm bẫy

- **Tải L1C khi cần L2A.** Xem [[Remote Sensing Fundamentals]].
- **Lọc mây bằng metadata `cloud_cover` của cả cảnh.** Cảnh "20% mây" có thể có **100% mây đúng vùng bạn quan tâm**. Phải kiểm mặt nạ mây ở cấp pixel trong vùng nghiên cứu.
- **Bỏ qua vệt chồng lấn giữa các ảnh (tile).** Cùng một vùng chụp ở hai ngày khác nhau từ hai tile → ghép không cẩn thận sẽ tạo đường nối giả.
- **Landsat 7 có sọc dữ liệu.** Sau sự cố SLC năm 2003, ảnh Landsat 7 có các dải thiếu dữ liệu — dữ liệu nhìn bình thường nhưng thủng lỗ.
- **Số hiệu tile Sentinel-2 (MGRS) chồng lấn nhau** — cùng một điểm có thể xuất hiện trong nhiều tile.
- **Không kiểm hệ số scale.** Sentinel-2 L2A lưu số nguyên; phải chia hệ số (và trừ offset ở các bản xử lý mới hơn) để ra phản xạ 0–1. Bỏ qua bước này làm mọi chỉ số sai.
- **Tải toàn bộ cảnh khi chỉ cần một vùng nhỏ.** Dùng COG + window đọc — xem [[Rasterio]].

## 5. Checklist áp dụng

- [ ] Hiện tượng tôi quan sát có kích thước bao nhiêu — phân giải này đủ chứ?
- [ ] Nó thay đổi nhanh thế nào — chu kỳ lặp đủ dày chứ?
- [ ] Tôi cần chuỗi lịch sử tới năm nào?
- [ ] Vùng của tôi nhiều mây tới mức cần SAR không?
- [ ] Tôi dùng **L2A** chứ?
- [ ] Tôi đã kiểm mây **ở cấp pixel trong vùng nghiên cứu**, không chỉ metadata cả cảnh chứ?
- [ ] Hệ số scale/offset đã được áp đúng chưa?
- [ ] Tôi có đọc trực tiếp COG thay vì tải cả cảnh không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pystac-client | Tìm ảnh qua STAC | [pystac-client.readthedocs.io](https://pystac-client.readthedocs.io/) |
| Copernicus Browser | Xem trước ảnh Sentinel trên web | [browser.dataspace.copernicus.eu](https://browser.dataspace.copernicus.eu/) |
| stackstac / odc-stac | STAC → xarray data cube | [stackstac.readthedocs.io](https://stackstac.readthedocs.io/) |
| ESA SNAP | Xử lý SAR | [step.esa.int](https://step.esa.int/main/toolboxes/snap/) |

## Tham khảo

- [Copernicus Data Space Ecosystem](https://dataspace.copernicus.eu/) — nguồn Sentinel chính thức
- [Sentinel-2 User Guide (ESA)](https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-2-msi) — band, mức xử lý, hệ số scale
- [USGS — Landsat Missions](https://www.usgs.gov/landsat-missions) — lịch sử và đặc tả toàn bộ dòng Landsat
- [Microsoft Planetary Computer Data Catalog](https://planetarycomputer.microsoft.com/catalog) — catalogue STAC lớn, có ví dụ

## Liên kết

[[Remote Sensing Fundamentals]] · [[Spectral Indices]] · [[Earth Observation Data Cubes]] · [[Geospatial Data Sources]] · [[Spatial Metadata]] · [[GIS]]
