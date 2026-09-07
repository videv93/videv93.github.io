---
tags: [gis, data-engineering, orchestration]
status: evergreen
---
# Geospatial Pipeline Orchestration

> Seed liệt kê **Airflow** và **Luigi** ở mục "Reading (optional)" mà không nói dùng để làm gì. Orchestration là thứ biến một script chạy tay thành một hệ thống **chạy được lúc 3 giờ sáng, tự retry, và báo cho bạn khi hỏng**.

## 1. Orchestrator giải quyết gì

| Vấn đề | Không có orchestrator | Có |
|---|---|---|
| Chạy theo lịch | cron + hy vọng | Lịch có theo dõi |
| Phụ thuộc giữa bước | Script tuần tự | DAG tường minh |
| Lỗi giữa chừng | Chạy lại từ đầu | Retry đúng bước hỏng |
| Ai biết nó hỏng? | Không ai | Cảnh báo |
| Chạy lại dữ liệu cũ | Sửa tay | Backfill |
| Bước nào chậm? | Đoán | Có số liệu |

## 2. Bảng công cụ

| Công cụ | Mô hình | Ghi chú |
|---|---|---|
| **Airflow** | DAG hướng task | Phổ biến nhất, hệ sinh thái lớn, vận hành nặng |
| **Dagster** | Hướng **asset** (dữ liệu) | Hợp với dữ liệu không gian — mô hình "bộ dữ liệu này được tạo ra thế nào" |
| **Prefect** | Python-first | Nhẹ, dễ bắt đầu |
| **Luigi** | Hướng task, cũ | Có trong seed; ít dùng cho dự án mới |
| **cron + script** | Đơn giản nhất | **Đủ cho pipeline nhỏ** — đừng bỏ qua |
| **dbt** | Biến đổi SQL có DAG | Ghép với orchestrator ở trên |

> [!note] Vì sao mô hình asset hợp với GIS
> Với dữ liệu không gian, câu hỏi thường gặp là *"lớp ranh giới này được tạo từ đâu, lúc nào, bằng phiên bản GDAL nào?"* — đó là câu hỏi về **asset**, không phải về task. Dagster mô hình hoá trực tiếp điều này, và nó khớp với yêu cầu lineage ở [[Spatial Metadata]].

## 3. Ba mối lo riêng của pipeline không gian

### 3.1 Task nặng và lâu
Xử lý raster có thể chạy hàng giờ và ngốn nhiều GB RAM. Orchestrator phải hỗ trợ **task chạy dài** và cấu hình tài nguyên riêng cho từng bước — đừng để một task raster giết cả worker.

### 3.2 Môi trường phải cố định tuyệt đối
**Đây là khác biệt lớn nhất so với pipeline dữ liệu thường.** Kết quả hình học phụ thuộc phiên bản **GEOS, PROJ, GDAL** — không chỉ phiên bản thư viện Python.

```dockerfile
FROM ghcr.io/osgeo/gdal:ubuntu-small-3.8.4   # ghim CHÍNH XÁC
RUN pip install --no-cache-dir \
      geopandas==1.0.1 shapely==2.0.6 pyogrio==0.10.0
# Grid shift file cho datum transformation
RUN projsync --system-directory --all
```

Thiếu `projsync` → datum transformation rơi xuống phương pháp kém chính xác **âm thầm**. Xem [[Datums and Geodesy]].

### 3.3 Cổng chất lượng phải chặn được publish

```python
@asset(deps=["raw_parcels"])
def staged_parcels(context):
    gdf = load_raw()
    gdf = normalize_crs(gdf, target=4326)
    gdf = fix_validity(gdf)

    quality_gate(gdf, "staged_parcels")     # NÉM LỖI nếu không đạt

    context.add_output_metadata({           # lineage đi cùng dữ liệu
        "n_features": len(gdf),
        "crs": str(gdf.crs),
        "bounds": list(gdf.total_bounds),
        "gdal_version": gdal_version(),
    })
    return gdf
```

Xem [[Geospatial Data Quality]].

## 4. Nguyên tắc

1. **Idempotent.** Chạy hai lần cho cùng kết quả. Không thoả điều kiện này thì retry là rủi ro.
2. **Task nhỏ, ranh giới rõ.** Một task = một biến đổi có thể kiểm chứng độc lập.
3. **Không giữ trạng thái trong worker.** Ghi ra lưu trữ giữa các bước.
4. **Log số lượng ở mọi bước.** Vào bao nhiêu, ra bao nhiêu — đây là cách phát hiện mất dữ liệu.
5. **Cảnh báo phải hành động được.** "Task failed" vô dụng; "3.421/50.000 hình học không hợp lệ ở bước staging" thì dùng được.
6. **Ghim môi trường bằng container**, và ghim cả phiên bản GDAL/PROJ/GEOS.
7. **Backfill phải là công dân hạng nhất** — dữ liệu không gian thường phải chạy lại lịch sử khi nguồn sửa dữ liệu cũ.

## 5. Cạm bẫy

- **Dùng Airflow cho ba script chạy hằng tuần.** cron đủ; chi phí vận hành Airflow là thật.
- **Đặt logic xử lý trong file DAG.** DAG chỉ nên điều phối; logic nằm ở module test được.
- **Không ghim phiên bản GDAL/PROJ** → kết quả đổi âm thầm khi image được build lại.
- **Thiếu grid shift file trong container** — xem 3.2.
- **Task không idempotent** kết hợp với auto-retry → dữ liệu nhân đôi.
- **Không có timeout** → task treo giữ tài nguyên vô hạn.
- **Cảnh báo quá nhiều** → không ai đọc nữa.
- **Bí mật kết nối trong code.** Dùng secret manager.
- **Không test DAG.** DAG cũng là code.

## 6. Checklist áp dụng

- [ ] Pipeline này có thật sự cần orchestrator, hay cron là đủ?
- [ ] Mọi task có **idempotent** không?
- [ ] Phiên bản **GDAL/PROJ/GEOS** có được ghim chính xác không?
- [ ] Grid shift file có trong image không?
- [ ] Có cổng chất lượng chặn được publish không?
- [ ] Số lượng vào/ra có được log ở mỗi bước không?
- [ ] Cảnh báo có nói rõ **cái gì sai** không?
- [ ] Task có timeout không?
- [ ] Backfill có chạy được không?
- [ ] Logic xử lý có tách khỏi file DAG để test được không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| Dagster | Orchestration hướng asset | [dagster.io](https://dagster.io/) |
| Airflow | Orchestration hướng task | [airflow.apache.org](https://airflow.apache.org/) |
| Prefect | Orchestration Python-first | [prefect.io](https://www.prefect.io/) |
| `ghcr.io/osgeo/gdal` | Image GDAL chính thức | [github.com/OSGeo/gdal](https://github.com/OSGeo/gdal) |

## Tham khảo

- [Airflow documentation](https://airflow.apache.org/docs/) — **có trong seed**
- [Luigi documentation](https://luigi.readthedocs.io/en/stable/) — **có trong seed**
- [Dagster — Software-defined assets](https://docs.dagster.io/guides/build/assets) — mô hình asset và lineage
- [PROJ — projsync](https://proj.org/en/stable/apps/projsync.html) — tải grid shift file cho container

## Liên kết

[[Spatial ETL Patterns]] · [[Geospatial Data Quality]] · [[Geospatial Testing and CI]] · [[Spatial Metadata]] · [[FME and Spatial ETL Tools]] · [[GIS]]
