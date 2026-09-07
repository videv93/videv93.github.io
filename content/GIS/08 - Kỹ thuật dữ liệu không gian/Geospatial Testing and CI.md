---
tags: [gis, testing, ci]
status: evergreen
---
# Geospatial Testing and CI

> Test code không gian khó hơn test code thường vì **hình học không so sánh bằng `==` được**: số dấu phẩy động, thứ tự đỉnh, và phiên bản GEOS đều làm hai kết quả "giống nhau" khác nhau ở bit cuối. Cần kỹ thuật riêng.

> Nền tảng CI/CD chung nằm ở area **DevOps**; note này chỉ nói phần **không gian**.

## 1. Bốn vấn đề riêng

| Vấn đề | Biểu hiện | Cách xử lý |
|---|---|---|
| **Float không bằng nhau chính xác** | `assert geom1 == geom2` thất bại dù đúng | So bằng **dung sai** |
| **Hình học tương đương khác biểu diễn** | Cùng polygon, khác thứ tự đỉnh | `ST_Equals` / `normalize()` |
| **Kết quả đổi theo phiên bản GEOS** | Test pass local, fail CI | **Ghim phiên bản** |
| **Dữ liệu test lớn** | Repo phình | Dùng fixture nhỏ, tự sinh |

## 2. So sánh hình học đúng cách

```python
import pytest
from shapely import Point, Polygon, equals_exact, normalize

# ❌ SAI — hầu như luôn thất bại
assert result == expected

# ✅ So về mặt KHÔNG GIAN (bỏ qua thứ tự đỉnh, điểm bắt đầu)
assert result.equals(expected)

# ✅ So có dung sai — cho kết quả tính toán
assert equals_exact(result, expected, tolerance=1e-6)

# ✅ So thuộc tính suy ra thay vì so hình học
assert result.area == pytest.approx(expected.area, rel=1e-9)
assert len(result.geoms) == 3

# ✅ Chuẩn hoá trước khi so byte
assert normalize(result).wkb == normalize(expected).wkb
```

> [!note] Thường nên test **tính chất**, không phải hình học chính xác
> Thay vì "buffer này phải bằng đúng polygon kia", hãy khẳng định: diện tích nằm trong khoảng mong đợi, kết quả chứa hình gốc, số phần bằng 1, hình học hợp lệ. Test tính chất bền vững qua các phiên bản GEOS — test so sánh chính xác thì không.

## 3. Nên test cái gì

| Loại | Ví dụ |
|---|---|
| **Bất biến CRS** | Đầu ra luôn ở SRID mong đợi |
| **Bảo toàn số lượng** | Số feature vào = ra (khi kỳ vọng 1-1) |
| **Bảo toàn diện tích** | Tổng diện tích sau overlay ≈ trước (trong dung sai) |
| **Tính hợp lệ** | Mọi đầu ra `is_valid` |
| **Phạm vi** | Kết quả nằm trong vùng nghiên cứu |
| **Trường hợp biên** | Hình rỗng, NULL, một đỉnh, tự cắt, vượt kinh tuyến 180° |
| **Regression** | Một bug đã sửa không quay lại |

```python
@pytest.fixture
def sample_parcels():
    """Fixture nhỏ, tự sinh — không cần file trong repo."""
    return gpd.GeoDataFrame(
        {"id": [1, 2, 3]},
        geometry=[box(0, 0, 1, 1), box(1, 0, 2, 1), box(0, 1, 1, 2)],
        crs="EPSG:32648",
    )

def test_dissolve_preserves_area(sample_parcels):
    before = sample_parcels.area.sum()
    after  = dissolve_all(sample_parcels).area.sum()
    assert after == pytest.approx(before, rel=1e-9)

def test_output_crs_is_fixed(sample_parcels):
    assert process(sample_parcels).crs.to_epsg() == 4326

@pytest.mark.parametrize("geom", [
    Polygon(),                                    # rỗng
    Polygon([(0,0),(1,1),(1,0),(0,1)]),           # tự cắt
])
def test_handles_degenerate_geometry(geom):
    result = clean_geometry(geom)
    assert result.is_valid
```

## 4. CI — ghim môi trường

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container: ghcr.io/osgeo/gdal:ubuntu-small-3.8.4   # ghim CHÍNH XÁC
    services:
      postgis:
        image: postgis/postgis:16-3.4                   # ghim CHÍNH XÁC
        env: { POSTGRES_PASSWORD: postgres }
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.lock
      - run: projsync --system-directory --all          # grid shift file
      - run: pytest -v
      - run: python -c "import shapely; print(shapely.geos_version)"  # ghi vào log
```

> [!warning] Ghim phiên bản là bắt buộc, không phải best practice
> `ST_MakeValid`, `ST_Simplify`, và các phép overlay **đã đổi hành vi** giữa các phiên bản GEOS. Không ghim thì test sẽ hỏng vào một ngày ngẫu nhiên khi image base được cập nhật, và bạn sẽ mất nhiều giờ tìm nguyên nhân trong code của mình — nơi không có lỗi nào cả.

## 5. Cạm bẫy

- **So hình học bằng `==`** — xem mục 2.
- **Không ghim phiên bản GDAL/GEOS/PROJ.**
- **Dữ liệu test khổng lồ trong repo.** Dùng fixture tự sinh; nếu cần file thật, dùng bản cắt nhỏ.
- **Test phụ thuộc mạng** (gọi API, tải dữ liệu) → chậm và không ổn định. Mock chúng.
- **Không test trường hợp biên** — chỗ code thật sự hỏng.
- **Test chỉ chạy trên máy dev** vì phụ thuộc ArcPy có license. Xem [[ArcPy]].
- **Không kiểm tính hợp lệ đầu ra.**
- **Snapshot bản đồ dựa trên render** — rất dễ vỡ; test dữ liệu thay vì test pixel.
- **Bỏ qua grid shift file trong CI** → kết quả reproject khác giữa local và CI.

## 6. Checklist áp dụng

- [ ] Tôi so hình học bằng `equals`/dung sai, không phải `==` chứ?
- [ ] Phiên bản GDAL/GEOS/PROJ có được ghim trong CI không?
- [ ] Grid shift file có được cài trong CI không?
- [ ] Có test bất biến **CRS** không?
- [ ] Có test **bảo toàn số lượng và diện tích** không?
- [ ] Có test trường hợp biên (rỗng, NULL, tự cắt) không?
- [ ] Fixture có nhỏ và tự sinh được không?
- [ ] Test có chạy được trên máy sạch chỉ với `docker` không?
- [ ] Phiên bản GEOS có được ghi vào log CI không?

## Công cụ

| Công cụ | Việc | Link |
|---|---|---|
| pytest | Framework test | [docs.pytest.org](https://docs.pytest.org/) |
| `shapely.equals_exact` / `normalize` | So hình học có dung sai | [shapely.readthedocs.io](https://shapely.readthedocs.io/) |
| `postgis/postgis` Docker image | PostGIS trong CI | [hub.docker.com/r/postgis/postgis](https://hub.docker.com/r/postgis/postgis) |
| `ghcr.io/osgeo/gdal` | Image GDAL ghim phiên bản | [github.com/OSGeo/gdal](https://github.com/OSGeo/gdal) |
| pgTAP | Test SQL/PostGIS trong CSDL | [pgtap.org](https://pgtap.org/) |

## Tham khảo

- [Shapely — geometry comparison](https://shapely.readthedocs.io/en/stable/manual.html#predicates-and-relationships) — `equals` vs `equals_exact`
- [GEOS — release notes](https://libgeos.org/usage/download/) — theo dõi thay đổi hành vi giữa phiên bản
- [pytest documentation](https://docs.pytest.org/) — fixture, parametrize, approx
- [PROJ — projsync](https://proj.org/en/stable/apps/projsync.html) — grid file trong môi trường tự động

## Liên kết

[[Geospatial Data Quality]] · [[Geospatial Pipeline Orchestration]] · [[Geometry Validity and Topology]] · [[Spatial ETL Patterns]] · [[GDAL and OGR]] · [[GIS]]
