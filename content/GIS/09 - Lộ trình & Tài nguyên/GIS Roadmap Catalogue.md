---
tags: [gis, catalogue, tài-nguyên]
status: evergreen
---
# GIS Roadmap Catalogue

> **Toàn bộ nội dung của seed gốc, không thiếu một link nào** — nhưng sắp lại theo **câu hỏi tra cứu** (*"tôi đang cần học gì"*) thay vì theo thứ tự chương của README. Đây là note catalogue: nó **được miễn** phần Checklist và Tham khảo, vì bản thân nó là phần tham khảo.

> [!warning] Đọc [[Roadmap Half-Life]] trước khi mở bất kỳ link nào ở đây
> Seed được viết khoảng 2018–2019 và tự nhận *"Under development"*. Cột **Trạng thái** dưới đây ghi rõ những mục cần kiểm lại trước khi đầu tư thời gian. Không có link nào bị xoá — nguyên tắc "không vứt gì của seed đi" — nhưng cũng không có link nào được giới thiệu như thể nó còn mới.

## 1. "Tôi chưa biết gì về GIS"

| Tài nguyên | Độ khó | Phần mềm | Trạng thái |
|---|---|---|---|
| [Coursera GIS Specialization](https://www.coursera.org/specializations/gis) | Dễ | ArcPro | Còn hoạt động |
| [Getting to Know ArcGIS Pro (Esri Press, ~\$40)](https://esripress.esri.com/display/index.cfm?fuseaction=display&websiteID=229&moduleID=0) | Dễ | ArcPro | Kèm license 1 năm — **kiểm lại chính sách hiện hành** |
| [Official QGIS Training Manual](https://docs.qgis.org/3.4/en/docs/training_manual/foreword/index.html) | Dễ | QGIS | ⚠️ Link trỏ **QGIS 3.4** — dùng bản `latest` |
| [GIS Fundamentals (Bolstad)](https://www.amazon.com/GIS-Fundamentals-Geographic-Information-Systems/dp/0971764735) | — | — | Sách, còn tái bản |

Seed ước tính ~40 giờ cho một khoá. Nền khái niệm tương ứng trong vault: [[What Is GIS]], [[Vector vs Raster]], [[Coordinate Reference Systems]].

## 2. "Tôi chưa biết lập trình"

| Tài nguyên | Độ khó | Ngôn ngữ |
|---|---|---|
| [MIT 6.00.1x — Intro to CS and Programming using Python](https://www.edx.org/course/introduction-to-computer-science-and-programming-using-python-0) | Trung bình | Python |
| [CS50 — Introduction to Computer Science](https://online-learning.harvard.edu/course/cs50-introduction-computer-science) | Khó | C, PHP, JS, SQL, CSS, HTML |
| [CS50P — Introduction to Programming with Python](https://cs50.harvard.edu/python/2022/) | Trung bình | Python |

⚠️ Link CS50P trỏ bản **2022**; CS50 có bản mới mỗi năm — dùng năm hiện tại.

## 3. "Tôi cần Python cho phân tích dữ liệu"

| Tài nguyên | Độ khó | Trạng thái |
|---|---|---|
| [Geo-Python (Đại học Helsinki)](https://geo-python.github.io/site/) | Trung bình | **Miễn phí, chất lượng cao, còn cập nhật** |
| [Python Data Science Handbook (VanderPlas)](https://jakevdp.github.io/PythonDataScienceHandbook/) | Trung bình | Miễn phí online |
| [Python for Data Analysis (McKinney)](https://www.amazon.com/Python-Data-Analysis-Wrangling-IPython/dp/1449319793) | Trung bình | ⚠️ Link là ấn bản cũ — đã có bản mới hơn |
| [Dataquest](https://www.dataquest.io/) | Trung bình | Có phí; **giá trong seed đã lỗi thời** |
| [DataCamp](https://www.datacamp.com/) | Trung bình | Có phí; giá đã đổi |
| [Brandon Rhodes — Pandas tutorial (YouTube)](https://www.youtube.com/watch?v=5JnMutdy6Fw&feature=youtu.be) | Trung bình | Miễn phí; API pandas đã tiến hoá |

## 4. "Tôi cần lập trình GIS bằng Python"

| Tài nguyên | Độ khó | Stack |
|---|---|---|
| [Automating GIS Processes (Helsinki)](https://autogis-site.readthedocs.io/en/latest/) | Trung bình | GDAL, OGR, GeoPandas, Shapely, QGIS |
| [GEOG 485 — GIS Programming and Software Development (Penn State)](https://www.e-education.psu.edu/geog485/node/91) | Trung bình | ArcGIS / ArcPy |
| [GEOG 489 — Advanced Python Programming for GIS](https://www.e-education.psu.edu/geog489/node/1776) | Khó | ArcPy nâng cao |
| [Geographic Data Science (Arribas-Bel)](http://darribas.org/gds18/) | Trung bình | ⚠️ Link là khoá **2018**; nay có sách online mới hơn |
| [Python for GIS Progression Path](https://github.com/AlexArcPy/python-for-gis-progression-path) | — | Danh mục lộ trình |
| [Coursera — Spatial Data Science and Applications](https://www.coursera.org/learn/spatial-data-science) | Trung bình | — |
| [DataCamp — Visualizing Geospatial Data in Python](https://www.datacamp.com/courses/visualizing-geospatial-data-in-python) | Trung bình | Có phí |
| [Introduction to Geospatial Data in Python (DataCamp tutorial)](https://www.datacamp.com/community/tutorials/geospatial-data-python) | Dễ | Miễn phí |
| [Python Scripting for ArcGIS (Esri Press)](https://esripress.esri.com/display/index.cfm?fuseaction=display&websiteID=276&moduleID=0) | — | Sách, hệ ESRI |
| [Geoprocessing with Python (Manning)](https://www.manning.com/books/geoprocessing-with-python) | — | Sách, hệ mở |
| [GeoPySpark](https://github.com/locationtech-labs/geopyspark) | Khó | ⚠️ **Dự án không còn hoạt động** — xem [[Big Geospatial Processing]] |

Note tương ứng: [[GeoPandas]], [[Shapely]], [[Rasterio]], [[GDAL and OGR]], [[ArcPy]].

## 5. "Tôi cần cơ sở dữ liệu"

| Tài nguyên | Độ khó | Engine | Trạng thái |
|---|---|---|---|
| [SQL Zoo](https://sqlzoo.net/) | Trung bình | Nhiều | Còn hoạt động |
| [Stanford — Introduction to Databases](https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about) | Khó | — | ⚠️ **Nền tảng Lagunita đã đóng** — tìm bản trên edX/Stanford Online |
| [CS145 — Data Management and Data Systems](https://cs145-fa18.github.io/course_info.html) | Khó | BigQuery | ⚠️ Bản **fa18** |
| [SQLAlchemy ORM Tutorial](https://docs.sqlalchemy.org/en/latest/orm/tutorial.html) | Trung bình | — | ⚠️ URL cũ; SQLAlchemy 2.0 đổi API đáng kể |

## 6. "Tôi cần Spatial SQL"

| Tài nguyên | Độ khó | Engine |
|---|---|---|
| [Introduction to PostGIS (workshop chính thức)](https://postgis.net/workshops/postgis-intro/) | Trung bình | PostgreSQL/PostGIS |
| [GEOG 868 — Spatial Database Management (Penn State)](https://www.e-education.psu.edu/spatialdb/node/1776) | Trung bình | PostgreSQL/PostGIS |
| [CS145 — Data Management and Data Systems](https://cs145-fa18.github.io/course_info.html) | Khó | BigQuery |
| [GeoAlchemy 2 documentation](https://geoalchemy-2.readthedocs.io/en/latest/) | — | ORM cho PostGIS |

Note tương ứng: [[PostGIS Core Types]], [[Spatial SQL Query Patterns]], [[Spatial Indexing with GiST]].

## 7. "Tôi cần version control"

| Tài nguyên | Độ khó |
|---|---|
| [Git Documentation (chính thức)](https://git-scm.com/doc) | Trung bình |
| [try.github.io](https://try.github.io/) | Trung bình |
| [Atlassian Git Tutorial](https://www.atlassian.com/git) | Trung bình |

> Git là kỹ năng chung, **có nhà ở area DevOps**. Vault GIS chỉ dùng nó ở [[Geospatial Testing and CI]].

## 8. "Tôi cần ETL / data engineering"

| Tài nguyên | Độ khó | Kỹ năng |
|---|---|---|
| [Dataquest Data Engineer Path](https://www.dataquest.io/path/data-engineer) | Khó | Tối ưu CSDL, ETL, quản lý task |
| [FME Workbench Tutorials (Safe Software)](https://knowledge.safe.com/page/tutorials) | Trung bình | FME, Spatial ETL |
| [petl documentation](https://petl.readthedocs.io/en/stable/) | — | ETL Python |
| [geopetl](https://github.com/rbrtmrtn/geopetl) | — | ⚠️ Repo đã chuyển sang tổ chức `CityOfPhiladelphia` |
| [Using Python Script for Data ETL (Codeburst)](https://codeburst.io/using-python-script-for-data-etl-53138c567906) | Dễ | Bài blog |
| [A Beginner's Guide to Data Engineering (Robert Chang)](https://medium.com/@rchang/a-beginners-guide-to-data-engineering-part-i-4227c5c457d7) | Dễ | **Vẫn là bài giới thiệu tốt nhất về tư duy ETL** |
| [Airflow documentation](https://airflow.apache.org/) | — | Orchestration |
| [Luigi documentation](https://luigi.readthedocs.io/en/stable/) | — | ⚠️ Ít dùng cho dự án mới — xem [[Geospatial Pipeline Orchestration]] |

Note tương ứng: [[Spatial ETL Patterns]], [[FME and Spatial ETL Tools]].

## 9. "Tôi cần nền web"

| Tài nguyên | Độ khó | Ngôn ngữ | Trạng thái |
|---|---|---|---|
| [CS50W — Web Programming with Python and JavaScript](https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript) | Trung bình | Python, HTML, CSS, JS, SQL | Còn hoạt động |
| [Colt Steele — Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) | Trung bình | Node, HTML, CSS, JS, NoSQL | Có bản cập nhật mới hơn |
| [The Odin Project](https://www.theodinproject.com/) | Trung bình | Ruby, HTML, CSS, JS | **Miễn phí, cập nhật liên tục** |
| [Colt Steele — Advanced Web Developer Bootcamp](https://www.udemy.com/the-advanced-web-developer-bootcamp/) | Khó | — | Có phí |
| [The 2018 Web Developer Roadmap](https://codeburst.io/the-2018-web-developer-roadmap-826b1b806e8d) | — | — | ⚠️ **2018** — seed dựa vào bài này cho cả frontend lẫn backend. Xem [[Roadmap Half-Life]] |

> Toàn bộ mục này **có nhà ở area Frontend** của vault. GIS chỉ thêm lớp bản đồ lên trên — xem [[Web Mapping Architecture]].

## 10. "Tôi cần Web GIS"

| Tài nguyên | Độ khó | Stack |
|---|---|---|
| [GEOG 585 — Open Web Mapping (Penn State)](https://www.e-education.psu.edu/geog585/node/508) | Trung bình | QGIS, GDAL, OGR, GeoServer, TileMill, Leaflet |
| [GEOG 863 — Web Application Development for Geospatial Professionals](https://www.e-education.psu.edu/geog863/node/1776) | Dễ | HTML, CSS, JS, ArcGIS JS API |
| [GEOG 865 — Cloud and Server GIS](https://www.e-education.psu.edu/geog865/node/25) | — | Cần tài khoản ArcGIS Enterprise + AWS |
| [Leaflet — Official tutorials](https://leafletjs.com/examples.html) | Dễ | Leaflet |
| [MapTime Boston — Leaflet intro](https://maptimeboston.github.io/leaflet-intro/) | Dễ | Leaflet |
| [MIT DUSP — Leaflet workshop](http://duspviz.mit.edu/web-map-workshop/leaflet-js/) | Dễ | Leaflet |
| [MIT DUSP — Leaflet + PostGIS + Node + Express](http://duspviz.mit.edu/web-map-workshop/leaflet_nodejs_postgis/) | Trung bình | Full stack |
| [ArcGIS REST API documentation](https://developers.arcgis.com/documentation/core-concepts/rest-api/) | — | **Seed đánh dấu bắt buộc** |
| [Esri — Publishing a map service](http://enterprise.arcgis.com/en/server/latest/get-started/windows/tutorial-publishing-a-map-service.htm) | — | Seed đánh dấu bắt buộc |
| [Update Hosted Feature Service (arcpy)](https://github.com/arcpy/update-hosted-feature-service) | — | Seed đánh dấu bắt buộc |

> ⚠️ Seed **không nhắc tới vector tile, MapLibre, hay PMTiles** — chúng chưa phổ biến khi seed được viết. Đây là khoảng trống lớn nhất của mục này. Xem [[MapLibre and Vector Tiles]] và [[Map Tiles and Tiling Schemes]].

## 11. "Tôi cần frontend framework"

| Tài nguyên | Độ khó | Framework | Trạng thái |
|---|---|---|---|
| [Tyler McGinnis — Free React Bootcamp](https://tylermcginnis.com/free-react-bootcamp/) | Trung bình | React | ⚠️ Kiểm link còn sống; React đã chuyển sang hook/RSC |
| [Maximilian Schwarzmüller — Angular Complete Guide](https://www.udemy.com/the-complete-guide-to-angular-2/) | Khó | Angular | ⚠️ Seed ghi **"Angular 7"** — đã rất cũ |
| [Maximilian Schwarzmüller — Vue JS 2 Complete Guide](https://www.udemy.com/vuejs-2-the-complete-guide/) | Dễ | Vue | ⚠️ **Vue 2 đã hết vòng đời hỗ trợ** — Vue 3 là hiện hành |

## 12. "Tôi cần backend"

Seed **không đưa khoá học nào**, chỉ trỏ về [2018 Web Developer Roadmap](https://codeburst.io/the-2018-web-developer-roadmap-826b1b806e8d), kèm nhận định *"almost all backend GIS job postings require .Net Core (C#)"* — xem phân tích ở [[GIS Career Paths]] và [[Proprietary vs Open Source GIS]].

| Tài nguyên | Ngôn ngữ |
|---|---|
| [GeoDjango Tutorial](https://docs.djangoproject.com/en/2.1/ref/contrib/gis/tutorial/) | Python — ⚠️ link là **Django 2.1** |
| [Location-Based Web App with Django and GeoDjango (Real Python)](https://realpython.com/location-based-app-with-geodjango-tutorial/) | Python |
| [GeoTools](https://www.geotools.org/) | Java |
| [Hibernate ORM](https://hibernate.org/orm/) | Java |
| [LocationTech Proj4J](https://projects.eclipse.org/projects/locationtech.proj4j) | Java — biến đổi CRS |
| [LocationTech JTS Topology Suite](https://projects.eclipse.org/projects/locationtech.jts) | Java — **thư viện gốc mà GEOS port sang C++** |

> [!note] JTS đáng chú ý hơn vị trí của nó trong seed
> Seed liệt kê JTS như một link Java bình thường ở cuối. Thực ra **JTS là hiện thực tham chiếu** của đại số hình học; GEOS — thứ mà PostGIS, Shapely, QGIS đều dùng — là bản port C++ của nó. Đọc tài liệu JTS thường là cách nhanh nhất để hiểu vì sao một phép overlay hành xử như vậy. Xem [[GIS Software Landscape]].

## 13. Nguồn gốc của seed

| Link | Vai trò |
|---|---|
| [gis-programming-roadmap README](https://github.com/petedannemann/gis-programming-roadmap/blob/master/README.md) | **Seed gốc của toàn bộ vault này** |
| [Open Source Society University — Computer Science](https://github.com/ossu/computer-science#introduction-to-computer-science) | Mô hình mà seed tự nhận lấy cảm hứng |

## Liên kết

[[GIS Learning Path]] · [[GIS Learning Resources]] · [[Roadmap Half-Life]] · [[GIS Career Paths]] · [[Proprietary vs Open Source GIS]] · [[GIS]]
