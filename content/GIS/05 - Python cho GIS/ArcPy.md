---
tags: [gis, python, esri]
status: evergreen
---
# ArcPy

> Thư viện Python của ESRI. Seed roadmap đặt nó ngang hàng với stack mở qua khoá **GEOG 485**. Note này mô tả nó trung thực: mạnh trong hệ sinh thái của nó, ràng buộc chặt ngoài hệ sinh thái đó.

> [!warning] Đọc [[Proprietary vs Open Source GIS]] trước khi quyết định đầu tư vào ArcPy.

## 1. Nó là gì

Python API bọc quanh các geoprocessing tool của ArcGIS. Mỗi tool trong giao diện ArcGIS Pro có một hàm ArcPy tương ứng — nên **mọi thứ làm được bằng nút bấm đều tự động hoá được**.

```python
import arcpy
arcpy.env.workspace = r"C:\data\project.gdb"
arcpy.env.overwriteOutput = True

arcpy.analysis.Buffer("schools", "schools_buf", "500 Meters")
arcpy.analysis.Clip("roads", "study_area", "roads_clipped")
arcpy.management.Project("parcels", "parcels_utm", arcpy.SpatialReference(32648))

# Cursor — cách đọc/ghi từng hàng
with arcpy.da.SearchCursor("parcels", ["OID@", "SHAPE@", "area"]) as cur:
    for oid, shape, area in cur:
        print(oid, shape.area)

with arcpy.da.UpdateCursor("parcels", ["area"]) as cur:
    for row in cur:
        row[0] = row[0] * 1.1
        cur.updateRow(row)
```

`arcpy.da` (data access) cursor **nhanh hơn nhiều** so với cursor cũ — dùng nó, không dùng `arcpy.SearchCursor` cũ.

## 2. Ánh xạ khái niệm sang stack mở

Bảng này là công cụ chuyển đổi hai chiều — và là bằng chứng cho luận điểm ở [[Proprietary vs Open Source GIS]] rằng **khái niệm chuyển được**:

| ArcPy | Tương đương mở |
|---|---|
| `arcpy.analysis.Buffer` | `ST_Buffer` / `gdf.buffer` |
| `arcpy.analysis.Clip` | `ST_Intersection` / `gpd.clip` |
| `arcpy.analysis.SpatialJoin` | `ST_Intersects` join / `gpd.sjoin` |
| `arcpy.management.Dissolve` | `ST_Union GROUP BY` / `gdf.dissolve` |
| `arcpy.management.Project` | `ST_Transform` / `gdf.to_crs` |
| `arcpy.da.SearchCursor` | Đọc DataFrame / `SELECT` |
| File Geodatabase | [[GeoPackage]] / PostGIS |
| Model Builder | Script + [[Geospatial Pipeline Orchestration]] |
| ArcGIS Server | [[Tile Servers and GeoServer]] |

## 3. Ràng buộc thật

| Ràng buộc | Chi tiết |
|---|---|
| **License** | Cần license ArcGIS hợp lệ để chạy — kể cả trong script tự động và CI |
| **Nền tảng** | Gắn với Python đi kèm ArcGIS Pro (Windows) |
| **Môi trường** | Quản lý package qua conda của ESRI; trộn với pip dễ hỏng |
| **Kiểm thử** | Khó dựng CI — cần máy có license. Xem [[Geospatial Testing and CI]] |
| **Phiên bản** | Gắn chặt với phiên bản ArcGIS Pro |
| **Chuyển đổi** | ArcPy 2 (ArcMap) và ArcPy 3 (Pro) khác nhau — code cũ cần sửa |

> [!note] `arcpy` không phải lựa chọn duy nhất trong hệ ESRI
> **ArcGIS API for Python** (`arcgis`) là thư viện riêng, làm việc với ArcGIS Online/Enterprise qua **REST**, cài bằng pip, chạy đa nền tảng, **không cần license desktop**. Với công việc web/dịch vụ, nó thường phù hợp hơn ArcPy. Xem [[ArcGIS REST and Web Stack]].

## 4. Cạm bẫy

- **Quên `arcpy.env.overwriteOutput = True`** → script chạy lần hai thì lỗi.
- **Dùng cursor cũ thay vì `arcpy.da`** — chậm hơn nhiều lần.
- **Không dùng `in_memory` / `memory` workspace** cho kết quả trung gian → ghi đĩa không cần thiết, chậm.
- **Đường dẫn Windows trong chuỗi thường** — dùng raw string `r"C:\..."`.
- **Trộn ArcPy với GeoPandas trong cùng môi trường** thường gây xung đột GDAL/PROJ. Tách môi trường.
- **Viết script chỉ chạy được trên một máy có license** rồi coi đó là pipeline sản xuất.
- **Giả định ArcPy có sẵn.** Nó không phải thư viện cài được bằng pip.
- **Khoá logic nghiệp vụ vào ArcPy** khi cùng logic viết bằng GDAL/PostGIS sẽ chạy được ở mọi nơi. Đây là quyết định kiến trúc, không chỉ là lựa chọn thư viện.

## 5. Checklist áp dụng

- [ ] Script này có **bắt buộc** phải dùng ArcPy không, hay stack mở làm được?
- [ ] Môi trường chạy có license hợp lệ không (kể cả máy tự động)?
- [ ] `overwriteOutput` đã được đặt chưa?
- [ ] Tôi dùng `arcpy.da` cursor chứ?
- [ ] Kết quả trung gian có dùng `memory` workspace không?
- [ ] Nếu là công việc web/dịch vụ: `arcgis` API có phù hợp hơn không?
- [ ] Logic nghiệp vụ có tách khỏi lời gọi ArcPy để chuyển đổi được sau này không?
- [ ] Phiên bản ArcGIS Pro có được ghi trong tài liệu không?

## Tham khảo

- [ArcPy documentation (Esri)](https://pro.arcgis.com/en/pro-app/latest/arcpy/main/arcgis-pro-arcpy-reference.htm) — tham chiếu chính thức
- [GEOG 485: GIS Programming and Software Development](https://www.e-education.psu.edu/geog485/node/91) — khoá học **có trong seed**, dạy ArcPy
- [ArcGIS API for Python](https://developers.arcgis.com/python/) — lựa chọn thay thế, không cần license desktop
- [Python Scripting for ArcGIS (Esri Press)](https://esripress.esri.com/display/index.cfm?fuseaction=display&websiteID=276&moduleID=0) — sách **có trong seed**

## Liên kết

[[Proprietary vs Open Source GIS]] · [[ArcGIS REST and Web Stack]] · [[GeoPandas]] · [[GDAL and OGR]] · [[GIS Software Landscape]] · [[GIS]]
