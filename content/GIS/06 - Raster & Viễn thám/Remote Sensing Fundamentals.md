---
tags: [gis, viễn-thám, nền-tảng]
status: evergreen
---
# Remote Sensing Fundamentals

> Đo đạc mặt đất **mà không chạm vào nó**, bằng cách đọc bức xạ điện từ phản xạ hoặc phát ra. Mọi thứ khác trong viễn thám — chỉ số thực vật, phân loại lớp phủ, phát hiện thay đổi — đều là hệ quả của việc hiểu ba điều: phổ, độ phân giải, và mức xử lý.

> [!note] Ghi chú nguồn
> Seed roadmap **không nhắc tới viễn thám một lần nào** — không có mục, không có link, không có khoá học. Đây là một trong hai khoảng trống lớn nhất của nó (cùng với [[Coordinate Reference Systems]]), dù raster và ảnh vệ tinh chiếm phần lớn khối lượng dữ liệu của ngành GIS hiện đại. Cả thư mục `06` này lấp khoảng trống đó.

## 1. Phổ điện từ

Mỗi vật liệu phản xạ khác nhau ở các bước sóng khác nhau — **chữ ký phổ** (spectral signature). Đây là toàn bộ cơ sở của viễn thám.

| Dải | Bước sóng | Đọc được gì |
|---|---|---|
| **Visible** (B, G, R) | 0,4–0,7 µm | Ảnh màu thật, phân biệt bằng mắt |
| **NIR** (cận hồng ngoại) | 0,7–1,3 µm | **Thực vật khoẻ phản xạ rất mạnh** — nền của NDVI |
| **SWIR** (hồng ngoại sóng ngắn) | 1,3–3 µm | Độ ẩm, phân biệt đất/thực vật, phát hiện cháy |
| **TIR** (hồng ngoại nhiệt) | 3–14 µm | Nhiệt độ bề mặt |
| **Microwave / Radar** | 1 mm–1 m | **Xuyên mây, hoạt động ban đêm** |

> [!note] Vì sao NIR quan trọng đến vậy
> Thực vật khoẻ hấp thụ mạnh ánh sáng đỏ (cho quang hợp) nhưng **phản xạ rất mạnh** ở NIR. Chênh lệch giữa hai dải này là tín hiệu rõ nhất trong toàn bộ viễn thám quang học — và là lý do NDVI hoạt động. Xem [[Spectral Indices]].

## 2. Bốn loại độ phân giải — đánh đổi lẫn nhau

| Loại | Nghĩa | Ví dụ |
|---|---|---|
| **Spatial** | Kích thước một pixel trên mặt đất | Sentinel-2: 10 m; Landsat: 30 m |
| **Spectral** | Số band và độ hẹp của mỗi band | Sentinel-2: 13 band; hyperspectral: hàng trăm |
| **Temporal** | Bao lâu quay lại cùng một chỗ | Sentinel-2: ~5 ngày; Landsat: 16 ngày |
| **Radiometric** | Số mức giá trị phân biệt được | 8-bit (256) vs 12-bit (4096) |

**Không thể tối đa cả bốn.** Vệ tinh phân giải không gian cao thường có dải quét hẹp → chu kỳ lặp dài. Chọn nguồn là chọn đánh đổi — xem [[Satellite Imagery Sources]].

## 3. Mức xử lý — quan trọng hơn người mới nghĩ

| Mức | Tên | Nội dung |
|---|---|---|
| **L0/L1A** | Raw | Số đếm thô của cảm biến |
| **L1C** | TOA reflectance | Đã hiệu chỉnh hình học; phản xạ **đỉnh khí quyển** |
| **L2A** | **BOA / Surface reflectance** | Đã **hiệu chỉnh khí quyển** — phản xạ bề mặt |
| **L3+** | Composite / phân tích | Ghép nhiều cảnh, không mây, theo thời gian |

> [!warning] Dùng L1C khi cần L2A là lỗi phân tích, không phải lỗi kỹ thuật
> Khí quyển tán xạ và hấp thụ ánh sáng khác nhau theo ngày, theo góc mặt trời, theo lượng hơi nước. So sánh NDVI giữa hai ngày bằng ảnh **L1C** là so cả sự khác biệt khí quyển lẫn sự khác biệt thực vật. **Với mọi phân tích đa thời điểm, dùng L2A.**

## 4. Quang học vs Radar

| | **Quang học** (Sentinel-2, Landsat) | **Radar SAR** (Sentinel-1) |
|---|---|---|
| Nguồn năng lượng | Mặt trời (thụ động) | Tự phát (chủ động) |
| Mây | ❌ Bị chặn | ✅ **Xuyên qua** |
| Ban đêm | ❌ Không dùng được | ✅ Được |
| Đo cái gì | Phản xạ phổ | Độ nhám bề mặt, độ ẩm, cấu trúc |
| Dễ diễn giải | ✅ Trực quan | ❌ Cần hiểu vật lý radar |
| Xử lý | Tương đối đơn giản | Phức tạp (speckle, hiệu chỉnh địa hình) |

**Điều này rất quan trọng với Việt Nam.** Khí hậu nhiệt đới gió mùa khiến ảnh quang học nhiều tháng trong năm gần như vô dụng vì mây. Với giám sát liên tục (lũ lụt, mùa vụ, biến động rừng), **Sentinel-1 SAR thường là lựa chọn đúng** dù khó xử lý hơn.

## 5. Cạm bẫy

- **Dùng L1C cho phân tích đa thời điểm** — xem callout.
- **Bỏ qua mặt nạ mây.** Pixel mây có phản xạ rất cao ở mọi band; nếu không lọc, chúng chi phối mọi thống kê. Sentinel-2 có band chất lượng scene (SCL) — dùng nó.
- **Bóng mây cũng phải lọc**, không chỉ mây. Bóng làm giá trị thấp bất thường và dễ bị nhầm là nước.
- **So sánh ảnh chụp ở mùa khác nhau** rồi kết luận "có thay đổi". Thực vật thay đổi theo mùa — so cùng mùa, hoặc dùng composite cả năm.
- **Nhầm độ phân giải với độ chính xác.** Pixel 10 m không có nghĩa mọi vật thể 10 m đều nhận ra được.
- **Bỏ qua hiệu ứng địa hình.** Sườn núi hướng nắng và hướng khuất có phản xạ rất khác nhau cho cùng loại thực vật.
- **Trộn cảm biến khác nhau** (Landsat 8 với Sentinel-2) mà không hiệu chỉnh chéo — band không hoàn toàn tương đương.

## 6. Checklist áp dụng

- [ ] Tôi đang dùng mức xử lý nào — và nó có phù hợp với phân tích đa thời điểm không?
- [ ] Mặt nạ mây **và bóng mây** đã được áp chưa?
- [ ] Các ảnh so sánh có cùng mùa / cùng điều kiện không?
- [ ] Độ phân giải không gian có đủ cho đối tượng tôi quan tâm không?
- [ ] Chu kỳ lặp có đủ dày cho hiện tượng tôi theo dõi không?
- [ ] Vùng nghiên cứu có nhiều mây tới mức nên chuyển sang SAR không?
- [ ] Địa hình có ảnh hưởng cần hiệu chỉnh không?
- [ ] Tôi có kiểm một vùng đã biết trên thực địa để xác nhận diễn giải không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| ESA SNAP | Xử lý Sentinel, đặc biệt SAR | [step.esa.int](https://step.esa.int/main/toolboxes/snap/) |
| Google Earth Engine | Xử lý quy mô lớn, có sẵn dữ liệu | [earthengine.google.com](https://earthengine.google.com/) |
| [[Rasterio]] + xarray | Xử lý raster bằng Python | [rasterio.readthedocs.io](https://rasterio.readthedocs.io/) |
| QGIS + Semi-Automatic Classification Plugin | Phân loại ảnh trên desktop | [semiautomaticclassificationmanual.readthedocs.io](https://semiautomaticclassificationmanual.readthedocs.io/) |

## Tham khảo

- [NASA — Remote Sensing Tutorial (ARSET)](https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset) — chương trình đào tạo miễn phí, chất lượng cao
- [ESA — Sentinel Online: User Guides](https://sentinels.copernicus.eu/web/sentinel/user-guides) — tài liệu chính thức về từng cảm biến và mức xử lý
- [USGS — Landsat Science](https://landsat.gsfc.nasa.gov/) — nền tảng về Landsat và hiệu chỉnh
- [Jensen, J. — *Remote Sensing of the Environment*](https://www.pearson.com/en-us/subject-catalog/p/remote-sensing-of-the-environment-an-earth-resource-perspective/P200000005305) — sách giáo khoa chuẩn ngành

## Liên kết

[[Satellite Imagery Sources]] · [[Spectral Indices]] · [[Raster Algebra and Zonal Statistics]] · [[Earth Observation Data Cubes]] · [[Vector vs Raster]] · [[GIS]]
