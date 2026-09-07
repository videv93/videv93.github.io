---
tags: [ml, ứng-dụng, case-study, econometrics, gis]
status: evergreen
---
# Hedonic Pricing and GIS

> ⚠️ **Đọc [[Prediction vs Inference]] trước khi áp dụng bất kỳ note nào trong thư mục này.**

> Cách tiếp cận **kinh tế lượng** với cùng đối tượng mà [[FADAML Case Study]] nghiên cứu: giá bất động sản Việt Nam. Ở đây mục tiêu không phải dự đoán chính xác mà là **biết yếu tố nào tác động và tác động bao nhiêu** — để nhà hoạch định chính sách và nhà đầu tư ra quyết định.

## 1. Mô hình hedonic

**Ý tưởng gốc (Rosen, 1974):** một ngôi nhà không phải một hàng hoá — nó là **một bó thuộc tính**. Giá thị trường là tổng các "giá ẩn" (implicit price) của từng thuộc tính. Hồi quy giá theo thuộc tính để trích ra những giá ẩn đó.

$$\log(P_i) = \beta_0 + \sum_k \beta_k x_{ik} + \varepsilon_i$$

Dạng **semi-log** ($\log$ ở vế trái, biến gốc ở vế phải) là chuẩn ngành, vì hai lý do:
- Giá bất động sản lệch phải rất mạnh — $\log$ đưa về gần chuẩn
- $\beta_k$ đọc trực tiếp thành **phần trăm thay đổi giá** khi $x_k$ tăng một đơn vị

Về mặt kỹ thuật, đây chỉ là [[Linear Regression]]. Khác biệt nằm ở **mục đích sử dụng đầu ra**.

### Bốn nhóm biến chuẩn

| Nhóm | Ví dụ |
|---|---|
| **Structural** | Diện tích sàn, tuổi nhà, diện tích lô, số phòng, số tầng |
| **Accessibility** | Khoảng cách tới trung tâm, nơi làm việc, trường học, trung tâm thương mại, giao thông công cộng |
| **Neighborhood** | Trình độ học vấn khu dân cư, tình hình an ninh |
| **Environmental** | Gần công viên, không gian mở, mức ồn, chất lượng nước |

## 2. Kết quả từ dữ liệu Việt Nam

Chung, Seo & Kim (2018) so sánh **TP.HCM** và **Hà Nội** bằng mô hình hedonic kết hợp phân tích không gian GIS. Bối cảnh: từ Đổi Mới 1986, thị trường bất động sản Việt Nam tăng trưởng mạnh với dòng vốn FDI, đặc biệt ở phân khúc chung cư cao tầng.

**Phát hiện trung tâm — hai thành phố, hai cơ chế:**

| | **TP.HCM** | **Hà Nội** |
|---|---|---|
| Yếu tố chi phối | **Thuộc tính vị trí**: tiện ích đô thị, mật độ cộng đồng, chương trình | **Thuộc tính nhà ở** |
| Vì sao | **Đô thị hoá thiếu quản lý** | Dự án phát triển dưới **hạ tầng do chính phủ trung ương hỗ trợ** |
| Bản đồ cụm căn hộ | Tương phản rõ rệt giữa hai thành phố | |

Điểm chung: cả hai đều gắn chặt với các yếu tố liên quan tới **khu trung tâm**.

Một quan sát cụ thể đáng nhớ: ở TP.HCM, gần trung tâm thương mại **làm tăng** giá nhà — một phần vì mall đóng vai trò trung tâm văn hoá xã hội, nơi cư dân tận hưởng không gian điều hoà trong khí hậu nhiệt đới. Ở Hà Nội, biến động theo mùa làm giá trị của tiện ích này khác đi.

Kết luận chính sách của bài: **chính sách chính phủ định hình yếu tố quyết định giá nhà** — TP.HCM và Hà Nội khác nhau không phải ngẫu nhiên mà vì mô hình can thiệp của nhà nước khác nhau.

### Các nghiên cứu liên quan trong seed

| Nghiên cứu | Phát hiện |
|---|---|
| **GWR cho quận trung tâm Hà Nội** (2025) | 1.545 bất động sản, 12 quận, 7 biến khả năng tiếp cận. Nhiều biến **không có ý nghĩa** trong HPM lại có tác động rõ **tại vị trí cụ thể** trong GWR |
| **Metro số 1 TP.HCM** (2025) | 356 quan sát trong bán kính 1,5 km. Hedonic bán-log + GIS, $R^2 \approx 62\%$. Giá tăng đáng kể khi khoảng cách tới ga metro giảm |
| **Tín hiệu giá chào** (2024) | 448 người mua. Nhà chào **dưới giá thị trường** không hút khách mà gây **nghi ngờ** → giá giao dịch thấp hơn và thời gian bán lâu hơn. 30 ngày đầu là then chốt |
| **Căn hộ giá rẻ TP.HCM** (2018) | Yếu tố chung: lối vào chung theo chiều đứng, gần trung tâm. Riêng phân khúc giá rẻ: nhiều tháp cao tầng, vốn ngoại, gần đường chính và mall |

> [!note] Nghiên cứu "tín hiệu giá chào" là cầu nối bất ngờ giữa hai văn hoá
> Nó phát hiện rằng **giá chào thấp bất thường gây nghi ngờ** ở người mua. Đây chính là tín hiệu mà [[FADAML Case Study]] khai thác — chênh lệch giữa nội dung tin rao và mức giá đăng. Một bên đo nó bằng khảo sát và mô hình Cox; một bên biến nó thành đặc trưng cho bộ phân loại. **Cùng một hiện tượng, hai ngôn ngữ.**

## 3. GWR — khi một hệ số không đủ

**Hedonic Pricing Model (HPM)** cổ điển giả định hệ số $\beta_k$ **giống nhau trên toàn thành phố**. Điều này gần như chắc chắn sai: "gần công viên" có giá trị rất khác ở quận 1 so với vùng ven.

**Geographically Weighted Regression (GWR)** ước lượng một bộ hệ số **riêng cho từng vị trí**, dùng trọng số theo khoảng cách địa lý.

| | **HPM** | **GWR** |
|---|---|---|
| Hệ số | Một bộ cho toàn vùng | Một bộ cho **mỗi vị trí** |
| Giả định | Quan hệ đồng nhất trong không gian | **Không đồng nhất không gian** |
| Đầu ra | Bảng hệ số | **Bản đồ hệ số** |
| $R^2$ | Thấp hơn | Cao hơn |
| Rủi ro | Bỏ sót biến động không gian | Overfit; hệ số khó diễn giải hàng loạt |

Nghiên cứu GWR Hà Nội kết luận thẳng: **đặc điểm vị trí và biến động không gian chưa được xét đúng mức trong các phương pháp định giá hiện hành ở Việt Nam**.

## 4. Cạm bẫy

- **Đa cộng tuyến giữa các biến khả năng tiếp cận.** "Khoảng cách tới trung tâm", "tới trường", "tới bệnh viện" tương quan mạnh với nhau ở đô thị. Hệ số riêng lẻ trở nên bất ổn — xem [[Linear Regression]].
- **Tự tương quan không gian (spatial autocorrelation).** Nhà gần nhau có giá giống nhau; giả định phần dư độc lập bị vi phạm → chuẩn sai bị đánh giá thấp → p-value quá lạc quan. Kiểm tra bằng **Moran's I**.
- **Biến bị bỏ sót (omitted variable bias).** Chất lượng xây dựng, view, phong thuỷ — khó đo, thường không có trong dữ liệu, và tương quan với các biến khác. Đây là mối đe doạ số một cho việc diễn giải nhân quả.
- **Giá chào ≠ giá giao dịch.** Phần lớn dữ liệu cào từ web là **giá chào**. Nghiên cứu tín hiệu giá chào ở trên cho thấy khoảng cách giữa hai loại giá này không phải hằng số.
- **$R^2$ báo cáo trên chính dữ liệu fit.** Không có tập test → không biết mô hình tổng quát hoá thế nào. Đây là điểm gãy đã nêu ở [[Prediction vs Inference]].
- **Diễn giải hệ số như nhân quả mà không có thiết kế nhận dạng.** "Metro làm giá tăng X%" cần khác biệt-trong-khác biệt hoặc biến công cụ, không chỉ cần hồi quy.
- **So sánh hệ số giữa các thành phố khác nhau.** Chính bài Chung et al. cho thấy TP.HCM và Hà Nội có cơ chế khác nhau — hệ số không chuyển giao được.

## 5. Checklist áp dụng

- [ ] Biến mục tiêu của tôi là $\log(\text{giá})$ chứ?
- [ ] Tôi có đủ bốn nhóm biến (structural, accessibility, neighborhood, environmental) không?
- [ ] Tôi đã tính VIF cho mọi biến chưa? Có biến nào > 10 không?
- [ ] Tôi đã kiểm tra tự tương quan không gian của phần dư (Moran's I) chưa?
- [ ] Dữ liệu của tôi là giá chào hay giá giao dịch? Tôi đã nói rõ trong báo cáo chưa?
- [ ] Tôi có biến quan trọng nào bị bỏ sót không? Tôi đã liệt kê chúng chưa?
- [ ] Tôi có giữ tập test không, hay chỉ báo cáo $R^2$ trên dữ liệu fit?
- [ ] Nếu tôi diễn giải nhân quả: tôi có thiết kế nhận dạng gì?
- [ ] Quan hệ có đồng nhất trong không gian không? Tôi đã thử GWR chưa?
- [ ] Tôi đã chạy các phép kiểm ở mục 6 của [[Prediction vs Inference]] chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `statsmodels` | OLS kèm chuẩn sai, p-value, chẩn đoán — cần cho inference | [statsmodels.org](https://www.statsmodels.org/) |
| **GeoPandas** | Dữ liệu không gian: join theo vùng, khoảng cách, bản đồ | [geopandas.org](https://geopandas.org/) |
| **PySAL / spreg** | Kinh tế lượng không gian: Moran's I, spatial lag/error model | [pysal.org](https://pysal.org/) |
| **mgwr** | Geographically Weighted Regression trong Python | [github.com/pysal/mgwr](https://github.com/pysal/mgwr) |
| QGIS | GIS mã nguồn mở để khám phá và làm bản đồ | [qgis.org](https://qgis.org/) |

## Tham khảo

- Chung, Seo & Kim, "Price Determinants and GIS Analysis of the Housing Market in Vietnam: The Cases of Ho Chi Minh City and Hanoi", *Sustainability*, 2018 — [ResearchGate](https://www.researchgate.net/publication/329601072_Price_Determinants_and_GIS_Analysis_of_the_Housing_Market_in_Vietnam_The_Cases_of_Ho_Chi_Minh_City_and_Hanoi)
- Rosen, "Hedonic Prices and Implicit Markets: Product Differentiation in Pure Competition", *Journal of Political Economy* 82(1), 1974 — [doi:10.1086/260169](https://doi.org/10.1086/260169)
- Fotheringham, Brunsdon & Charlton, *Geographically Weighted Regression*, Wiley 2002
- Seo & Kwon, "Price Determinants of Affordable Apartments in Vietnam: Toward the Public–Private Partnerships for Sustainable Housing Development", 2018 — [ResearchGate](https://www.researchgate.net/publication/322515408_Price_Determinants_of_Affordable_Apartments_in_Vietnam_Toward_the_Public-Private_Partnerships_for_Sustainable_Housing_Development)

## Liên kết

[[Prediction vs Inference]] · [[Linear Regression]] · [[FADAML Case Study]] · [[Data and Feature Engineering]] · [[Evaluation Metrics]] · [[ML]]
