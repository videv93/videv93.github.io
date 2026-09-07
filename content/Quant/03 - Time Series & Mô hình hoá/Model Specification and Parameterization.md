---
tags: [quant, modeling, core]
status: evergreen
---
# Model Specification and Parameterization

> Khi model gãy, câu hỏi đúng là: **specification sai hay tham số sai?** Câu trả lời thường là cả hai — và phân biệt được là kỹ năng quyết định.

## 1. Bài toán

Không có crystal ball → phải xây model $M$. Nếu biết dynamics thật thì đã không cần model.

Hầu hết model là **parametric**: $M(\theta)$ với $\theta$ là vector tham số.

| Model | Tham số |
|---|---|
| Linear regression | $\beta$ |
| AR(1) | $\phi$, hằng số, $\sigma$ |
| GARCH | $\omega, \alpha, \beta$ |
| Ornstein-Uhlenbeck | $\kappa, \theta, \sigma$ |

Hai vấn đề tách bạch: **chọn $M$** (specification) và **chọn $\theta$** (parameterization).

## 2. Model specification

**Specification tốt:** quan hệ giữa $X$ và $Y$ tuyến tính → chọn model tuyến tính → bắt được động lực.

**Specification tệ:** có curvature rõ ràng nhưng dùng model tuyến tính thô.

⚠️ Sắc thái quan trọng: model tuyến tính chỉ **tuyến tính trong tham số**. Bạn có thể feature-engineer thoải mái. Nhưng có trường hợp **không cách nào** biến đổi để bắt được động lực mong muốn.

### Neo specification vào lý thuyết

Đây là chỗ lý thuyết học thuật/kinh tế phát huy — **bạn không bốc model ra từ mũ**.

**Ví dụ VIX.** Muốn mô hình hoá implied volatility. Literature đã ghi nhận và chứng minh rộng rãi: **volatility là quá trình mean-reverting**.

|                | Linear model                                                   | Mean-reverting model            |
| -------------- | -------------------------------------------------------------- | ------------------------------- |
| Khi VIX spike  | Forecast ngoại suy ra **vô cực** (hoặc âm vô cực khi slope âm) | Luôn dao động quanh mức dài hạn |
| Giá trị dự báo | Phi lý (VIX > 100 trong 1–2 tháng)                             | Hợp lý                          |

Nếu model của bạn đề xuất những cực trị **không thể xảy ra**, đó là hậu quả của specification sai. Xem [[Ornstein-Uhlenbeck Process]].

## 3. Model parameterization

Neo vào lý thuyết vẫn chưa đủ. Cùng một mean-reversion model, hai bộ tham số:

| Parameterization | Hàm ý |
|---|---|
| **Sai** | Xác suất thấy VIX > 60 nhỏ tới mức phải chờ **65 tỉ năm** |
| **Đúng hơn** | VIX > 60 khoảng **mỗi 4,2 năm** |

Đây là cùng loại lỗi với việc linear model nói VIX có thể ra vô cực — chỉ khác là nó xảy ra **bên trong** một model đã neo vào lý thuyết.

**Hệ quả cho quyết định:** với parameterization sai, bạn **không hề cân nhắc một trạng thái thế giới đáng phải cân nhắc**. Bạn loại nó khỏi bàn vì model nói "65 tỉ năm".

> Specification và parameterization nằm **thượng nguồn** của toàn bộ quá trình ra quyết định. Mọi xác suất, mọi expected value, mọi confidence interval, mọi kiểm định thống kê bạn tạo ra đều là sản phẩm của hai bước này. Sai ở đây thì mọi thứ hạ nguồn sai theo.

**Cách chọn tham số:** method of moments, maximum likelihood estimation, và nhiều kỹ thuật khác. Tất cả đều cho các bảo đảm tiệm cận đẹp **trong lớp học**.

## 4. Khi nào và vì sao model gãy

Specify đúng, parameterize đúng — vẫn không đảm bảo hiệu quả mãi mãi.

**Chẩn đoán:** thường là **cả hai**. Model bạn chọn không bắt được hết động lực cần thiết, **và** tham số được ước lượng từ dữ liệu đã cũ, không phản ánh phân phối sinh dữ liệu hiện tại. Nhưng mức độ nghiêm trọng khác nhau:
- Chỉ cần **re-parameterize** → nhẹ.
- Cần **model mới hoàn toàn** → nặng.
- Cần cả hai → thường gặp nhất.

**Minh hoạ.** Hai model tuyến tính, chỉ khác cách chọn tham số theo thời gian. Sau một cú gap down lớn:
- Model dùng **toàn bộ** dữ liệu: vẫn dự báo downtrend, vì cú gap kéo đường hồi quy xuống.
- Model **thích ứng**: khi regime mới sinh dữ liệu, tham số cập nhật → nhận ra đây là mức mới + uptrend mới.

Model đầu vừa mis-specified vừa mis-parameterized. Model sau vẫn "sai" nhưng hữu ích.

## 5. Câu hỏi không có đáp án đúng: dùng bao nhiêu dữ liệu?

Toàn bộ lịch sử? 2 năm? 1 năm?

- Nếu tất cả đến từ **cùng một phân phối** → dùng hết.
- Nếu không → cửa sổ ngắn hơn bắt được động lực spot tốt hơn, nhưng nhiễu hơn.

Không có đúng/sai. Đây là điều ta vật lộn mỗi khi xây model cho thế giới thực. Và chính vì thế mà các mở rộng cập nhật tham số **online** (dual [[Kalman Filter]]) lại giá trị đến vậy — thay vì ngồi đoán cửa sổ, dùng cách cập nhật tối ưu về mặt thống kê.

## 6. Cạm bẫy
- **Chọn model vì nó quen thuộc.** Neo vào lý thuyết.
- **Chỉ đổ lỗi cho tham số khi model gãy.** Có thể specification mới là vấn đề — và ngược lại: parameterization tệ có thể **trông giống** specification sai.
- **Không kiểm tra tính hợp lý của xác suất model sinh ra.** "1 lần mỗi 65 tỉ năm" là cờ đỏ.
- **Fit một lần rồi để yên.** Xem [[Stationarity and Non-Stationarity]].
- **Chồng model lên model mà quên model trên cũng có tham số.** Kalman filter đặt lên OU model → **hai** bộ tham số, cả hai đều có thể sai.

## 7. Checklist áp dụng
- [ ] Specification của tôi neo vào lý thuyết nào? Trích dẫn được không?
- [ ] Model của tôi có sinh ra giá trị bất khả thi khi ngoại suy không?
- [ ] Xác suất của các sự kiện cực đoan theo model có khớp với tần suất lịch sử không?
- [ ] Tôi calibrate trên cửa sổ nào? Vì sao?
- [ ] Nếu model gãy, tôi có quy trình chẩn đoán specification vs parameterization không?
- [ ] Tôi có đang chồng model lên model mà không đếm hết số tham số không?

## Tham khảo
- Quant Guild — *Kalman Filters for Quant Finance*: https://youtu.be/zVJY_oaVh-0
- Quant Guild — *Why Quant Models Break*: https://youtu.be/brdG1TmsPlw
- Quant Guild — *Trading with Violated Model Assumptions*: https://youtu.be/2ezWtM8J_os
- Burnham & Anderson — *Model Selection and Multimodel Inference*
- Gelman et al. — *Bayesian Data Analysis* (posterior predictive checks)

## Liên kết
[[Kalman Filter]] · [[Stationarity and Non-Stationarity]] · [[All Models Are Wrong]] · [[Ornstein-Uhlenbeck Process]] · [[Backtesting and Overfitting]] · [[Quant]]
