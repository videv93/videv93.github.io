---
tags: [gis, etl, công-cụ]
status: evergreen
---
# FME and Spatial ETL Tools

> Seed đặt **FME** ngang hàng với Dataquest Data Engineer Path trong mục ETL. Nó là công cụ thương mại thống trị một mảng rất thật của ngành — và cũng là ví dụ rõ nhất về đánh đổi giữa **năng suất giao diện** và **kỹ nghệ phần mềm**.

> [!warning] Đọc [[Proprietary vs Open Source GIS]] trước khi chuẩn hoá tổ chức quanh một công cụ ETL.

## 1. FME là gì

Safe Software FME: nền tảng ETL không gian dựa trên **workbench đồ hoạ**. Bạn nối các "transformer" thành một sơ đồ luồng dữ liệu.

**Điểm mạnh thật:**

| Điểm | Chi tiết |
|---|---|
| **Số định dạng** | Đọc/ghi hàng trăm định dạng, gồm nhiều định dạng CAD, BIM, IFC, LandXML mà GDAL hỗ trợ kém hoặc không có |
| **Transformer sẵn có** | Hàng trăm phép biến đổi không gian đóng gói sẵn |
| **Người không lập trình dùng được** | Chuyên viên GIS xây pipeline mà không cần viết code |
| **Xem dữ liệu từng bước** | Kiểm tra kết quả tại mỗi nút — gỡ lỗi rất trực quan |
| **FME Flow** | Lập lịch, chạy server, giám sát |

**Chi phí thật:**

| Chi phí | Chi tiết |
|---|---|
| License | Đắt, tính theo ghế/máy chủ |
| **Version control** | Workspace là file nhị phân/XML — **diff và merge rất khó** |
| **Testing** | Không có mô hình unit test tự nhiên |
| Kỹ năng | Khoá vào một công cụ, chuyển đổi khó |
| Code review | Xem xét một sơ đồ trong pull request gần như không khả thi |

> [!note] Đánh đổi thật nằm ở đâu
> FME thắng rõ khi bài toán là **"nhiều định dạng lạ, logic vừa phải, người dùng không lập trình"**. Nó thua rõ khi bài toán là **"logic phức tạp, thay đổi thường xuyên, nhiều người cùng làm, cần CI"** — vì lúc đó bạn cần diff, review, test, và branch. Đây không phải câu hỏi "công cụ nào tốt hơn" mà là câu hỏi **"tổ chức của bạn cần kỹ nghệ phần mềm ở mức nào"**.

## 2. Bảng lựa chọn

| Công cụ | Mô hình | Hợp với |
|---|---|---|
| **FME** | GUI workbench | Nhiều định dạng lạ, đội GIS không lập trình |
| **`ogr2ogr` + shell** | CLI | Chuyển đổi đơn giản, script hoá — **thử trước tiên** |
| **Python + GeoPandas** | Code | Logic phức tạp, cần test — [[GeoPandas]] |
| **SQL + dbt** | Khai báo | Dữ liệu đã ở CSDL, cần lineage và test |
| **geopetl** | Code (petl) | ETL nhẹ, có trong seed |
| **QGIS Model Builder / Processing** | GUI + script | Dùng lại thuật toán QGIS, chạy được bằng CLI |
| **Airflow/Dagster + task** | Điều phối | Ghép nhiều bước — [[Geospatial Pipeline Orchestration]] |

> [!note] QGIS Processing là lựa chọn ít được biết
> Nó có **CLI (`qgis_process`)**, chạy được trong container, và dùng lại toàn bộ thuật toán của QGIS/GRASS/SAGA. Với đội đã quen QGIS, đây là con đường từ GUI sang tự động hoá mà không phải đổi công cụ.

## 3. Nếu buộc phải dùng FME

1. **Đưa workspace vào Git** dù diff khó — vẫn tốt hơn không có lịch sử.
2. **Đặt tên transformer có nghĩa.** Sơ đồ là tài liệu duy nhất; `Tester_5` không nói gì.
3. **Tách workspace nhỏ, ghép bằng orchestrator** thay vì một sơ đồ khổng lồ.
4. **Ghi log số lượng feature ở mỗi bước** để phát hiện mất dữ liệu.
5. **Viết bộ kiểm tra chất lượng đầu ra bằng SQL** ngoài FME — như vậy phép kiểm độc lập với công cụ. Xem [[Geospatial Data Quality]].
6. **Tài liệu hoá bằng văn bản** logic nghiệp vụ, đừng để nó chỉ tồn tại trong sơ đồ.

## 4. Cạm bẫy

- **Chọn FME vì "công ty đã có license"** rồi dùng nó cho cả những việc một dòng `ogr2ogr` làm được.
- **Workspace khổng lồ 200 transformer** không ai ngoài người viết hiểu được — và người đó sẽ nghỉ việc.
- **Không có test.** Pipeline chạy không lỗi không có nghĩa dữ liệu đúng.
- **Logic nghiệp vụ chỉ tồn tại trong GUI** → không audit, không review, không chuyển đổi được.
- **Ngược lại: viết Python cho việc chuyển đổi định dạng thuần** mà `ogr2ogr` làm trong một dòng.
- **Không đánh giá chi phí license theo thời gian** khi mở rộng đội.
- **Chạy thủ công theo lịch của con người** thay vì tự động hoá — nguồn lỗi bị bỏ sót nhiều nhất.

## 5. Checklist áp dụng

- [ ] Việc này có làm được bằng một lệnh `ogr2ogr` không?
- [ ] Logic có phức tạp tới mức cần code (và test) không?
- [ ] Ai sẽ bảo trì pipeline này sau 12 tháng?
- [ ] Pipeline có nằm trong version control không?
- [ ] Có phép kiểm chất lượng **độc lập với công cụ** không?
- [ ] Số lượng feature có được log ở mỗi bước không?
- [ ] Logic nghiệp vụ có được ghi thành văn bản không?
- [ ] Nếu công cụ này biến mất, chuyển đổi mất bao lâu?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| FME | ETL không gian thương mại | [safe.com](https://www.safe.com/) |
| `qgis_process` | Chạy thuật toán QGIS từ CLI | [docs.qgis.org](https://docs.qgis.org/latest/en/docs/user_manual/processing/standalone.html) |
| dbt | Biến đổi SQL có test và lineage | [getdbt.com](https://www.getdbt.com/) |
| geopetl | ETL không gian bằng Python | [github.com/CityOfPhiladelphia/geopetl](https://github.com/CityOfPhiladelphia/geopetl) |

## Tham khảo

- [FME Workbench tutorials (Safe Software)](https://knowledge.safe.com/page/tutorials) — **có trong seed**
- [QGIS Processing framework](https://docs.qgis.org/latest/en/docs/user_manual/processing/index.html) — lựa chọn mở tương đương gần nhất
- [dbt documentation](https://docs.getdbt.com/) — mô hình biến đổi khai báo có test
- [GDAL ogr2ogr](https://gdal.org/programs/ogr2ogr.html) — lựa chọn đơn giản nhất

## Liên kết

[[Spatial ETL Patterns]] · [[Geospatial Pipeline Orchestration]] · [[Geospatial Data Quality]] · [[Proprietary vs Open Source GIS]] · [[GDAL and OGR]] · [[GIS]]
