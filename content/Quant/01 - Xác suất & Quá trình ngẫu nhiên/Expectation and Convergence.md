---
tags: [quant, probability]
status: evergreen
---
# Expectation and Convergence

> Kỳ vọng là điều tốt nhất ta làm được trước ngẫu nhiên. Nhưng có những trường hợp **kỳ vọng không tồn tại** — và expected return của cổ phiếu là một trong số đó.

## 1. Ba cách hiểu kỳ vọng

| Cách | Nội dung | Ví dụ |
|---|---|---|
| **Giải tích** | Trung bình có trọng số xác suất của mọi outcome | $\mathbb{E}[\text{xúc xắc}] = 3{,}5$ |
| **Mô phỏng** | Lặp thí nghiệm nhiều lần, lấy trung bình tích luỹ → hội tụ (LLN) | Tung 10.000 lần, trung bình → 3,5 |
| **Theo thời gian** | Xu hướng của **một** hệ qua thời gian dài | Wealth path của một trader |

Ergodicity chính là câu hỏi: cách 2 và cách 3 có bằng nhau không? Xem [[Ergodicity]].

**Lưu ý nền tảng:** kỳ vọng thường **không phải** một outcome khả dĩ. Xúc xắc không bao giờ ra 3,5. Nhưng 3,5 vẫn là giá trị tối thiểu hoá mean squared error trên vô hạn lần tung — nó là "best guess" theo nghĩa toán học chặt.

## 2. Khi kỳ vọng không tồn tại — nghịch lý St. Petersburg

Tung đồng xu tới khi ra mặt ngửa lần đầu ở lần thứ $n$; payoff $2^n$.
$$\mathbb{E} = \sum_{n=1}^{\infty} \frac{1}{2^n}\cdot 2^n = \sum_{n=1}^{\infty} 1 = \infty$$

Mô phỏng nó thì sao? **Không hội tụ gì cả.** Trung bình tích luỹ nhảy giật cục mãi mãi. LLN không áp dụng được. Đây chính là hình ảnh của "kỳ vọng không tồn tại".

Muốn định giá trò này phải kéo utility function vào — cực kỳ không thoả mãn, vì nó phụ thuộc khẩu vị rủi ro của từng người.

## 3. Expected stock return không tồn tại (theo nghĩa hội tụ)

Vẽ **cumulative mean return** của NVDA:
- Toàn bộ lịch sử → trông như sắp hội tụ, nhưng chỉ vì volatility khổng lồ những năm đầu đè xuống.
- Tách riêng 2008 / 2016 / 2024 → **không có hội tụ nào cả**. Giả sử mean = 0,003 thì cuối 2008 bạn sai; 0,00185 thì cuối 2016 bạn sai.
- Chỉ riêng 2025: cumulative mean chạy 0,00216 → 0,00209 → 0,00213, và đầu năm còn âm vì tariffs.

**Hỏi ngược:** cửa sổ nào mới đúng? Toàn thời gian? 1 năm? 1 tháng? Không có câu trả lời phổ quát.

Kết luận: **expected return là một quá trình ngẫu nhiên**, một hàm ngẫu nhiên theo thời gian. Và vì mọi moment bậc cao đều phụ thuộc kỳ vọng, **variance, skewness, kurtosis cũng là quá trình ngẫu nhiên**.

Điều này đáng lo, vì bạn cần expected return cho: portfolio optimization, Value at Risk, CAPM, gần như mọi thứ. Xem [[Efficient Frontier]], [[CAPM Alpha and Beta]].

Hợp lý thôi: phân phối return của NVDA **nên** đổi theo thời gian. NVDA năm 2005 không phải NVDA bây giờ.

## 4. Vậy làm gì?

Không có cách one-size-fits-all. Đây là phần **research** của công việc:
- [[Kalman Filter]] — ước lượng mức kỳ vọng động (fit trên một giai đoạn, roll forward). Lưu ý: ta đang dự báo *expected return*, không phải return.
- Regime-switching model ([[Markov Chains]])
- GARCH biến thể ([[ARCH and GARCH Models]])
- Exponentially weighted moving average — đơn giản nhất, và thường không đủ

Không có cái nào "đúng". Câu hỏi thực tế là: cái nào robust hơn cho quyết định cụ thể của tôi?

## 5. Cạm bẫy
- **Coi historical mean là expected return.** Đây là mặc định trong mọi lớp finance đại học, và nó sai.
- **Dùng LLN/CLT trên chuỗi không dừng.** Xem [[Stationarity and Non-Stationarity]].
- **Nhầm "kỳ vọng" với "dự đoán".** Kỳ vọng nói *nếu status quo tiếp diễn*. Xem [[Filtering Smoothing and Forecasting]].
- **Không phân biệt convergence in probability vs almost sure convergence** rồi vẫn trích dẫn định lý.

## 6. Checklist áp dụng
- [ ] Đại lượng tôi ước lượng có cơ chế hội tụ không? Hay tôi đang áp cấu trúc không tồn tại?
- [ ] Tôi chọn cửa sổ ước lượng dựa trên cái gì? Có defend được không?
- [ ] Nếu đổi cửa sổ, kết luận của tôi có đảo chiều không? (Nếu có → kết luận đó yếu)
- [ ] Model của tôi có xử lý được việc expected return là quá trình ngẫu nhiên không?

## Tham khảo
- Quant Guild — *Expected Stock Returns Don't Exist*: https://youtu.be/tHEOQ4Wq5KU
- Quant Guild — *Central Limit Theorem for Quant Finance*: https://youtu.be/q2era-4pnic
- Bernoulli, D. (1738) — bài gốc về nghịch lý St. Petersburg
- Merton, R. — *On estimating the expected return on the market* (1980) — kinh điển về việc ước lượng mean khó hơn ước lượng vol rất nhiều
- Cochrane, J. — *Asset Pricing*

## Liên kết
[[Ergodicity]] · [[Stationarity and Non-Stationarity]] · [[Kalman Filter]] · [[Efficient Frontier]] · [[Quant]]
