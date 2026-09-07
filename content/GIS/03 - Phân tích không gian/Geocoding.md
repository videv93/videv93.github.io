---
tags: [gis, phân-tích, dữ-liệu]
status: evergreen
---
# Geocoding

> Biến "123 Nguyễn Trãi, Thanh Xuân, Hà Nội" thành `(105.80, 21.00)`. Nghe như một phép tra cứu; thực chất là một bài toán **so khớp chuỗi mờ trên dữ liệu bẩn**, và kết quả **luôn** có xác suất sai.

## 1. Hai chiều

| | **Geocoding** | **Reverse geocoding** |
|---|---|---|
| Vào | Địa chỉ dạng text | Toạ độ |
| Ra | Toạ độ + độ tin cậy | Địa chỉ / đơn vị hành chính gần nhất |
| Khó ở | Chuẩn hoá địa chỉ, mơ hồ | Chọn đối tượng nào là "địa chỉ" |

## 2. Mức khớp — thứ phải luôn giữ lại

Không phải kết quả nào cũng ngang nhau. **Luôn lưu mức khớp cùng toạ độ:**

| Mức | Nghĩa | Sai số điển hình |
|---|---|---|
| **Rooftop / parcel** | Đúng toà nhà | Mét |
| **Interpolated** | Nội suy theo số nhà trên đoạn đường | Hàng chục mét |
| **Street** | Chỉ tới đoạn đường | Trăm mét |
| **Locality / city** | Tới tâm phường/xã | **Kilômét** |
| **Region / country** | Tâm tỉnh/quốc gia | **Vô dụng cho phân tích** |

> [!warning] Centroid giả — lỗi nguy hiểm nhất của geocoding
> Địa chỉ không khớp được thường bị trả về **tâm của thành phố**. Kết quả: hàng nghìn điểm chồng lên nhau ở một chỗ, trông như một "điểm nóng" ngoạn mục. Đây là hiện tượng nổi tiếng trong phân tích dữ liệu không gian — và nó đã tạo ra không ít kết luận sai được công bố.
> **Phép kiểm 30 giây:** `SELECT geom, COUNT(*) FROM geocoded GROUP BY geom HAVING COUNT(*) > 10;` — nếu có một toạ độ xuất hiện hàng trăm lần, bạn đã tìm thấy nó.

## 3. Dịch vụ

| Dịch vụ | Mở? | Ghi chú |
|---|---|---|
| **Nominatim** (OSM) | ✅ | Miễn phí; bản công cộng giới hạn 1 req/s — **tự host nếu làm hàng loạt** |
| **Pelias** | ✅ | Tự host, ghép nhiều nguồn, cấu hình linh hoạt |
| **Photon** | ✅ | Nhanh, hỗ trợ autocomplete, dựa trên OSM |
| **libpostal** | ✅ | **Chuẩn hoá/parse** địa chỉ (không geocode) — rất hữu ích ở bước tiền xử lý |
| Google / HERE / Mapbox | ❌ | Chất lượng cao, có phí, **thường cấm lưu trữ kết quả** |
| ArcGIS World Geocoding | ❌ | Trong hệ ESRI, tính theo credit |

> [!warning] Điều khoản sử dụng là ràng buộc thật
> Nhiều dịch vụ thương mại **cấm lưu toạ độ trả về** hoặc cấm dùng ngoài bản đồ của chính họ. Với dự án cần lưu kết quả lâu dài vào CSDL, đọc kỹ ToS trước — đây là rủi ro pháp lý, không phải chi tiết kỹ thuật.

## 4. Địa chỉ Việt Nam — đặc thù

- **Nhiều cách viết cho cùng một địa chỉ**: "123/45 Nguyễn Trãi", "123 ngõ 45 Nguyễn Trãi", "số 123 hẻm 45 đường Nguyễn Trãi".
- **Dấu tiếng Việt** — dữ liệu thật trộn có dấu và không dấu. Chuẩn hoá cả hai chiều khi so khớp.
- **Ranh giới hành chính thay đổi** (sáp nhập phường/xã) làm dữ liệu tham chiếu lỗi thời — xem [[Geospatial Data Sources]].
- **Tên đường trùng nhau giữa các quận** — luôn cần cấp hành chính để phá mơ hồ.
- **Địa chỉ theo ngõ/hẻm nhiều cấp** không khớp mô hình "số nhà trên phố" mà phần lượng geocoder giả định.
- **Độ phủ OSM không đều**: tốt ở trung tâm đô thị lớn, thưa ở nơi khác.

## 5. Nguyên tắc

1. **Chuẩn hoá trước khi geocode.** `libpostal` hoặc quy tắc tự viết cải thiện tỉ lệ khớp rất nhiều — rẻ hơn nhiều so với đổi dịch vụ.
2. **Luôn lưu: toạ độ + mức khớp + điểm tin cậy + chuỗi gốc + dịch vụ + ngày.** Thiếu bất kỳ cái nào thì không audit được sau này.
3. **Đặt ngưỡng chấp nhận theo mục đích.** Phân tích cấp quận chịu được mức `locality`; phân tích tiếp cận trong 500 m thì không.
4. **Geocode theo lô, có cache.** Cùng địa chỉ không gọi API hai lần — vừa tốn tiền vừa chậm.
5. **Kiểm bằng mẫu thủ công.** Lấy 50 kết quả ngẫu nhiên, đối chiếu bằng mắt. Không có cách tự động nào thay được bước này.

## 6. Checklist áp dụng

- [ ] Tôi có lưu **mức khớp** cùng toạ độ không?
- [ ] Tôi đã chạy phép kiểm **toạ độ trùng lặp** (centroid giả) chưa?
- [ ] Tỉ lệ khớp là bao nhiêu — và các bản ghi **không** khớp có gì đặc biệt không?
- [ ] Địa chỉ đã được chuẩn hoá trước khi gửi chưa?
- [ ] Mức khớp thấp nhất tôi chấp nhận là gì, và tôi có lọc theo nó không?
- [ ] Điều khoản dịch vụ có cho phép lưu trữ kết quả không?
- [ ] Tôi đã kiểm thủ công một mẫu ngẫu nhiên chưa?
- [ ] Kết quả có được cache để không gọi lại không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Nominatim | Geocoder OSM, tự host được | [nominatim.org](https://nominatim.org/) |
| libpostal | Parse và chuẩn hoá địa chỉ đa ngôn ngữ | [github.com/openvenues/libpostal](https://github.com/openvenues/libpostal) |
| Pelias | Geocoder mô-đun, tự host | [pelias.io](https://pelias.io/) |
| geopy | Client Python cho nhiều dịch vụ | [geopy.readthedocs.io](https://geopy.readthedocs.io/) |

## Tham khảo

- [Nominatim documentation](https://nominatim.org/release-docs/latest/) — cách geocoder OSM hoạt động và giới hạn sử dụng
- [libpostal — Statistical address parsing](https://github.com/openvenues/libpostal) — mô hình chuẩn hoá địa chỉ
- [Pelias documentation](https://github.com/pelias/documentation) — kiến trúc geocoder mô-đun
- [OSM Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/) — giới hạn của bản công cộng

## Liên kết

[[Geospatial Data Quality]] · [[Geospatial Data Sources]] · [[Network Analysis and Routing]] · [[Spatial Joins]] · [[Spatial ETL Patterns]] · [[GIS]]
