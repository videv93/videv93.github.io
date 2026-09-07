---
tags: [gis, viễn-thám, cloud]
status: evergreen
---
# Earth Observation Data Cubes

> Khi bạn cần không phải *một cảnh* mà **toàn bộ chuỗi thời gian của một vùng**, mô hình "file ảnh" sụp đổ. Data cube là câu trả lời: coi dữ liệu là một **mảng nhiều chiều có nhãn** `(thời gian × band × y × x)` thay vì một đống file.

## 1. Từ file sang cube

| | Mô hình file | **Data cube** |
|---|---|---|
| Đơn vị | Một cảnh, một band, một file | Mảng `(time, band, y, x)` |
| Truy cập | Mở từng file, ghép tay | Cắt lát theo **nhãn**: `.sel(time="2025-03")` |
| Chuỗi thời gian | Vòng lặp qua file | Phép trên trục `time` |
| Quy mô | Giới hạn bởi RAM | Chia khối, lười (lazy), song song |

```python
import pystac_client, stackstac

# 1. Tìm ảnh bằng STAC
cat = pystac_client.Client.open("https://earth-search.aws.element84.com/v1")
items = cat.search(
    collections=["sentinel-2-l2a"],
    bbox=[105.7, 20.9, 106.0, 21.1],
    datetime="2024-01-01/2025-01-01",
    query={"eo:cloud_cover": {"lt": 30}},
).item_collection()

# 2. Xếp thành cube — LƯỜI, chưa tải gì cả
cube = stackstac.stack(items, assets=["red", "nir", "scl"],
                       resolution=10, epsg=32648, chunksize=2048)

# 3. Che mây bằng band phân loại cảnh (SCL)
valid = ~cube.sel(band="scl").isin([3, 8, 9, 10])   # bóng, mây, mây mỏng
cube  = cube.where(valid)

# 4. Tính NDVI trên TOÀN chuỗi thời gian bằng một biểu thức
red = cube.sel(band="red") / 10000
nir = cube.sel(band="nir") / 10000
ndvi = (nir - red) / (nir + red)

# 5. Composite tháng — chỉ đến đây mới thật sự tính toán
monthly = ndvi.resample(time="1MS").median().compute()
```

Sức mạnh nằm ở bước 4–5: **một biểu thức thay cho một vòng lặp qua hàng trăm cảnh**, và chỉ dữ liệu thật sự cần mới được tải về.

## 2. Hệ sinh thái

| Công cụ | Vai trò |
|---|---|
| **xarray** | Mảng nhiều chiều có nhãn — nền của tất cả |
| **Dask** | Chia khối, tính lười, song song |
| **rioxarray** | Cầu nối xarray ↔ [[Rasterio]]: CRS, reproject, ghi file |
| **stackstac / odc-stac** | STAC → xarray cube |
| **Zarr** | Lưu mảng chia khối trên object storage |
| **STAC** | Catalogue để tìm — xem [[Spatial Metadata]] |
| **Google Earth Engine** | Cube dạng nền tảng đóng, tính server-side |
| **Open Data Cube** | Framework cube tự vận hành |

## 3. GEE vs stack mở

| | **Google Earth Engine** | **STAC + xarray + Dask** |
|---|---|---|
| Bắt đầu | Rất nhanh, không hạ tầng | Cần dựng môi trường |
| Dữ liệu | Kho khổng lồ có sẵn | Tự chọn catalogue |
| Tính toán | Server-side, miễn phí cho nghiên cứu | Tự trả tiền compute |
| Xuất dữ liệu lớn | **Chậm và giới hạn** | Tự do |
| Khoá nền tảng | **Cao** — code không chạy nơi khác | Thấp — thư viện mở |
| Gỡ lỗi | Khó (lười, server-side) | Dễ hơn |

Chọn theo mục đích: **thăm dò nhanh và nghiên cứu → GEE; sản phẩm vận hành và cần kiểm soát → stack mở.** Liên quan tới lập luận ở [[Proprietary vs Open Source GIS]] — cùng một đánh đổi, ở tầng dữ liệu.

## 4. Cạm bẫy

- **Gọi `.compute()` quá sớm** → nạp toàn bộ cube vào RAM. Giữ lười tới bước cuối cùng.
- **Chunk size sai.** Quá nhỏ → chi phí điều phối lớn; quá lớn → hết RAM. Thường khớp chunk với block của COG.
- **Không che mây trước khi tính composite** → median vẫn bị mây kéo lệch. Xem [[Remote Sensing Fundamentals]].
- **Trộn ảnh khác CRS trong một cube** — `stackstac` cần `epsg` thống nhất; reproject ngầm rất tốn.
- **Trục thời gian có nhiều ảnh cùng ngày** (tile chồng lấn) → cần gộp trước khi resample.
- **Quên scale factor** → NDVI sai. Xem [[Spectral Indices]].
- **Tải dữ liệu qua egress đắt.** Đặt compute cùng vùng với object storage.
- **Cho rằng cube giải quyết mọi thứ.** Với **một** cảnh và **một** phép tính, [[Rasterio]] đơn giản hơn nhiều.

## 5. Checklist áp dụng

- [ ] Tôi có thật sự cần chuỗi thời gian không, hay một cảnh là đủ?
- [ ] Cube có giữ **lười** tới bước cuối không?
- [ ] Chunk size có hợp lý so với RAM và block của file không?
- [ ] Mây và bóng mây đã được che **trước** khi gộp chưa?
- [ ] Mọi ảnh có cùng CRS và độ phân giải trong cube không?
- [ ] Scale factor đã áp chưa?
- [ ] Compute có chạy cùng vùng với dữ liệu không?
- [ ] Kết quả trung gian có được ghi ra Zarr/COG để không tính lại không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| xarray | Mảng nhiều chiều có nhãn | [docs.xarray.dev](https://docs.xarray.dev/) |
| stackstac | STAC → xarray | [stackstac.readthedocs.io](https://stackstac.readthedocs.io/) |
| odc-stac | Tương tự, từ Open Data Cube | [odc-stac.readthedocs.io](https://odc-stac.readthedocs.io/) |
| rioxarray | CRS/reproject/ghi file cho xarray | [corteva.github.io/rioxarray](https://corteva.github.io/rioxarray/) |
| Zarr | Lưu mảng chia khối trên cloud | [zarr.readthedocs.io](https://zarr.readthedocs.io/) |

## Tham khảo

- [xarray documentation](https://docs.xarray.dev/en/stable/) — mô hình mảng có nhãn
- [stackstac documentation](https://stackstac.readthedocs.io/) — dựng cube từ STAC
- [Open Data Cube](https://www.opendatacube.org/) — framework cube dùng ở cấp quốc gia
- [Pangeo](https://pangeo.io/) — cộng đồng và kiến trúc tham chiếu cho khoa học dữ liệu địa lý trên cloud

## Liên kết

[[Satellite Imagery Sources]] · [[Spectral Indices]] · [[Cloud Native Geospatial Formats]] · [[Rasterio]] · [[Big Geospatial Processing]] · [[Spatial Metadata]] · [[GIS]]
