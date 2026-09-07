---
tags: [ml, ứng-dụng, bản-lề, methodology, statistics]
status: evergreen
---
# Prediction vs Inference

> **Note bản lề.** Hai bài báo trong seed gốc nghiên cứu **cùng một đối tượng** — giá bất động sản Việt Nam — nhưng theo hai hệ giá trị chỏi nhau về việc *thế nào là một kết quả tốt*. Note này ghi lại cả hai một cách trung thực, và chỉ ra chỗ chúng va chạm.

## 1. Hai văn hoá

Phân đôi này không phải phát minh của vault này. Leo Breiman đặt tên cho nó năm 2001 trong bài *"Statistical Modeling: The Two Cultures"*, và tranh luận vẫn chưa kết thúc.

| | **Văn hoá mô hình dữ liệu** (inference) | **Văn hoá mô hình thuật toán** (prediction) |
|---|---|---|
| Đại diện trong seed | [[Hedonic Pricing and GIS]] — Chung, Seo & Kim 2018 | [[FADAML Case Study]] — Nguyen et al. 2025 |
| Câu hỏi trung tâm | **Vì sao?** Yếu tố nào tác động và tác động bao nhiêu? | **Cái gì?** Nhãn của mẫu tiếp theo là gì? |
| Sản phẩm | Hệ số, chuẩn sai, p-value | Một hàm dự đoán |
| Thước đo thành công | $R^2$, ý nghĩa thống kê, tính diễn giải | **Accuracy, F1, FPR/FNR trên tập test** |
| Mô hình | Đơn giản, chỉ định trước, có giả định rõ | Phức tạp tuỳ ý, chọn bằng tìm kiếm |
| Số mô hình thử | Ít, được lý thuyết dẫn dắt | **14 mô hình, chọn bằng validation** |
| Giả định | Nêu rõ và kiểm định | Ít, chủ yếu là i.i.d. |
| Kích thước dữ liệu | Nhỏ, thu thập có chủ đích | Lớn, cào từ web |
| Sai lầm sợ nhất | Kết luận sai về cơ chế | Mô hình không tổng quát hoá |

## 2. Vì sao không bên nào bị bác bỏ

**Văn hoá inference vẫn đứng vững** vì có những câu hỏi mà dự đoán không trả lời được. "Xây một tuyến metro sẽ làm giá nhà quanh ga tăng bao nhiêu?" là câu hỏi **can thiệp** — nó hỏi về một thế giới chưa tồn tại. Một mô hình dự đoán học từ dữ liệu quá khứ không có gì để nói. Nhà hoạch định chính sách cần hệ số kèm khoảng tin cậy, không cần một hàm hộp đen chính xác 91.5%.

**Văn hoá prediction vẫn đứng vững** vì phần lớn quyết định thực tế không cần hiểu cơ chế. Để lọc tin rao giả khỏi một sàn thương mại điện tử, bạn cần biết **tin nào giả**, không cần biết *vì sao* thị trường tạo ra tin giả. Và ở đây, đo lường là trung thực và khắc nghiệt: có tập test giữ riêng, có baseline để so, có con số công khai.

## 3. Chỗ hai khung đồng thuận

Nhiều hơn bạn tưởng — và đây là phần hữu ích nhất của note này.

| Điểm chung | Cả hai đều làm |
|---|---|
| Đặc trưng không gian quan trọng | Hedonic: khoảng cách tới trung tâm, tiện ích. FADAML: 3 con đường gần nhất |
| Vị trí là biến mạnh nhất | Cả hai đều xác nhận điều này với dữ liệu Việt Nam |
| Cần biến đổi $\log$ cho giá | Phân phối giá lệch phải nặng ở cả hai |
| Tri thức chuyên gia là đầu vào bắt buộc | Hedonic: chọn biến từ lý thuyết. FADAML: 2 chuyên gia bất động sản thiết kế đặc trưng |
| Dữ liệu bẩn phải làm sạch | Cả hai dành công sức lớn cho khử trùng lặp và outlier |
| Nhà hẻm ≠ nhà mặt tiền | Cả hai coi khả năng tiếp cận là yếu tố định giá bậc nhất |

Nói cách khác: **họ bất đồng về mục tiêu, không bất đồng về thực tế**.

## 4. Chỗ mỗi khung gãy

### ⚠️ Khi văn hoá inference gãy

- **Đa cộng tuyến làm hệ số vô nghĩa.** Diện tích và số phòng tương quan 0.9 → hai hệ số có thể ra dấu ngược nhau, độ lớn khổng lồ, triệt tiêu lẫn nhau. $R^2$ vẫn đẹp. Kết luận "mỗi phòng ngủ tăng giá X" là bịa. Xem [[Linear Regression]].
- **Hệ số phụ thuộc tập biến trong mô hình.** Thêm hay bỏ một biến kiểm soát làm hệ số của biến bạn quan tâm đổi giá trị, đôi khi đổi dấu.
- **p-hacking qua chọn mô hình.** Nếu thử 20 đặc tả rồi báo cáo cái có p < 0.05, p-value đó không còn nghĩa gì. Ít ai công bố số lần đã thử.
- **Không có tập test.** Mô hình hedonic thường báo cáo $R^2$ trên **chính dữ liệu dùng để fit**. Không có ước lượng nào về khả năng tổng quát hoá.
- **Tương quan không phải nhân quả.** Đây là điểm gãy lớn nhất: hệ số hồi quy từ dữ liệu quan sát **không** là hiệu ứng nhân quả, trừ khi có thiết kế nhận dạng (biến công cụ, hồi quy gián đoạn, khác biệt-trong-khác biệt). Rất nhiều bài hedonic diễn giải hệ số như nhân quả mà không có thiết kế đó.

### ⚠️ Khi văn hoá prediction gãy

- **Không nói được gì về can thiệp.** Mô hình 91.5% accuracy không cho biết chính sách nào giảm được tin rao giả.
- **Feature importance không phải hiệu ứng nhân quả.** Permutation importance đo "xáo trộn cột này làm accuracy giảm bao nhiêu" — không đo "thay đổi biến này trong thế giới thực thì sao". Hai đặc trưng tương quan sẽ **chia nhau** importance và cả hai trông có vẻ yếu.
- **Học lại định nghĩa nhãn, không phải sự thật.** FADAML định nghĩa "giả" bằng quy tắc chênh lệch giá do chuyên gia định. Mô hình học **quy tắc đó**. Nếu chuyên gia có thiên kiến hệ thống, mô hình sao chép thiên kiến ấy với accuracy 91.5%.
- **Không bền khi phân phối dịch chuyển.** Chính các tác giả FADAML thừa nhận tin rao giả tiến hoá và hệ thống phải retrain liên tục.
- **Hộp đen khi cần trách nhiệm giải trình.** Ensemble 14 mô hình hai tầng không giải thích được vì sao một tin rao cụ thể bị chặn. Với một người bán thật bị chặn nhầm (FPR 9.8%), "mô hình bảo thế" không phải câu trả lời chấp nhận được.

## 5. Cách dùng cả hai một cách trung thực

| Dùng như | **Không** dùng như |
|---|---|
| Hệ số hedonic → giả thuyết về cơ chế, mô tả tương quan có điều kiện | Hiệu ứng nhân quả, dự báo cho căn nhà cụ thể |
| $R^2$ của mô hình hedonic → mức độ mô tả dữ liệu hiện có | Bằng chứng mô hình sẽ đúng với dữ liệu mới |
| Accuracy của FADAML → hiệu năng trên phân phối test này, thời điểm này | Bằng chứng hệ thống "hiểu" tin rao giả |
| Feature importance → gợi ý đặc trưng nào đáng đầu tư đo đạc | Xếp hạng nguyên nhân |
| Cả hai → đầu vào cho quyết định của con người | Bộ thay thế cho phán đoán |

**Kiến trúc thực tế đúng thường dùng cả hai:** một mô hình dự đoán để lọc và xếp hạng ở quy mô lớn, cộng một mô hình diễn giải được để hiểu và để giải trình. Chúng trả lời hai câu hỏi khác nhau; không cái nào thay được cái kia.

Chú ý rằng chính FADAML cũng thừa nhận giới hạn của nó: 91.5% accuracy, 9.8% FPR, 7.4% FNR — và **chưa đủ để triển khai sản xuất**. Một mô hình thành thật về giới hạn của mình là mô hình dùng được.

## 6. Phép kiểm bạn tự chạy được

Biến tranh cãi thành việc làm được. Với bất kỳ mô hình nào của bạn:

1. **Kiểm tra tính ổn định của hệ số.** Bootstrap 100 lần, fit lại, vẽ phân phối từng hệ số. Nếu dấu lật qua lại giữa các lần, đừng diễn giải nó. *Mất 10 phút.*
2. **Tính VIF cho mọi biến.** VIF > 10 nghĩa là hệ số của biến đó không dùng để diễn giải được — dù dự đoán vẫn ổn.
3. **Chạy cùng mô hình với hai tập biến kiểm soát khác nhau.** Hệ số bạn quan tâm đổi bao nhiêu? Nếu đổi nhiều, kết luận của bạn phụ thuộc vào đặc tả, không phụ thuộc dữ liệu.
4. **So feature importance với hệ số hồi quy.** Chạy cả LightGBM và hồi quy tuyến tính trên cùng dữ liệu. Chúng có xếp hạng biến giống nhau không? Bất đồng lớn là dấu hiệu có tương tác hoặc phi tuyến mà mô hình tuyến tính bỏ sót.
5. **Đếm số mô hình bạn đã thử, và ghi lại.** Con số này quyết định mức độ bạn nên tin vào p-value hay điểm validation của mình.
6. **Giữ một tập test theo thời gian.** Fit trên dữ liệu tới tháng $T$, test trên tháng $T+1$ trở đi. Đây là phép kiểm khắt khe nhất và cả hai văn hoá đều nên chạy nó.
7. **Đặt câu hỏi quyết định.** "Nếu mô hình này đúng, tôi sẽ làm gì khác đi?" Nếu câu trả lời là một **can thiệp**, bạn cần inference. Nếu là một **hành động phân loại hàng loạt**, bạn cần prediction.

## Tham khảo

- **Breiman**, "Statistical Modeling: The Two Cultures", *Statistical Science* 16(3):199–231, 2001 — [doi:10.1214/ss/1009213726](https://doi.org/10.1214/ss/1009213726)
- Shmueli, "To Explain or to Predict?", *Statistical Science* 25(3):289–310, 2010 — [doi:10.1214/10-STS330](https://doi.org/10.1214/10-STS330)
- Pearl & Mackenzie, *The Book of Why*, Basic Books 2018 — vì sao dữ liệu quan sát không tự cho ra nhân quả
- Chung, Seo & Kim, "Price Determinants and GIS Analysis of the Housing Market in Vietnam", *Sustainability*, 2018 — [ResearchGate](https://www.researchgate.net/publication/329601072_Price_Determinants_and_GIS_Analysis_of_the_Housing_Market_in_Vietnam_The_Cases_of_Ho_Chi_Minh_City_and_Hanoi)
- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning" — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- Molnar, *Interpretable Machine Learning* — [christophm.github.io/interpretable-ml-book](https://christophm.github.io/interpretable-ml-book/)

## Liên kết

[[FADAML Case Study]] · [[Hedonic Pricing and GIS]] · [[Linear Regression]] · [[AutoML]] · [[Evaluation Metrics]] · [[ML]]
