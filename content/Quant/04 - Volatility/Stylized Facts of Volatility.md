---
tags: [quant, volatility]
status: evergreen
---
# Stylized Facts of Volatility

> Những đặc tính được quan sát nhất quán trên gần như mọi tài sản. Một model volatility tốt phải bắt được càng nhiều càng tốt — một cách **tiết kiệm tham số (parsimonious)**.

## 1. Excess kurtosis / phân phối leptokurtic

Return của cổ phiếu có **đuôi dày hơn** phân phối chuẩn.

**Hậu quả cụ thể:** nếu bạn dùng phân phối chuẩn để mô hình hoá return — cách tiếp cận "parametric" mà lớp finance đại học dạy: lấy mean, lấy standard deviation, cắm vào Gaussian — bạn **đánh giá thấp cực trị ở cả hai phía**.

Đo bằng số: chênh lệch Value at Risk giữa cách parametric (Gaussian) và phân phối thực nghiệm có thể lên tới **~20%**. Kurtosis đôi khi đạt 10, 12, 15, 18, 20+.

**Hệ quả châm biếm:** truyền thông nói về "sự kiện 6-sigma", "10-sigma", "30-sigma" như thể chúng bất khả thi. Chúng xảy ra thường xuyên đến mức đáng ngờ — vì benchmark được dùng để tính sigma đã sai ngay từ đầu.

## 2. Volatility clustering

Giai đoạn vol cao có xu hướng cụm lại; giai đoạn vol thấp cũng vậy. Volatility có **persistence** và **autocorrelation**.

**Ẩn dụ chiếc thuyền:** hồ lặng như gương, ai cũng thả thuyền yên. Rồi một người nổ máy chạy đi. Rồi người thứ hai. Nước bắt đầu gợn. Bạn nghĩ mình cũng nên chạy. Bạn chạy. Mọi thứ thành sóng dữ. Cuối cùng mọi thứ bình thường lại và mặt hồ lại phẳng lặng.

Logic y hệt cho selloff: *"Sao người kia bán? Sao người này cũng bán? Họ biết gì mà mình không biết? Mình rút luôn."* → rơi tự do.

Về mặt kỹ thuật, đây là lý do ta cần **heteroscedasticity có điều kiện** — xem [[ARCH and GARCH Models]].

## 3. Mean reversion

Vol cụm lại, nhưng cũng **hồi về mức trung bình dài hạn**. Giai đoạn vol cực cao và cực thấp không kéo dài vô hạn.

**Kiểm chứng đơn giản nhất:** nhìn biểu đồ VIX. Nó không "lên và sang phải" như AAPL hay NVDA. Nó liên tục quay về một mức.

→ Đây là cơ sở lý thuyết cho việc dùng [[Ornstein-Uhlenbeck Process]] để mô hình hoá vol, và cho [[Kalman Filter]] trên VIX.

## 4. Leverage effect

Volatility tăng **bất cân xứng** sau return âm so với return dương cùng độ lớn.

Ví dụ số quan sát được: return dương → vol giảm khoảng −0,06. Return âm cùng độ lớn → vol tăng tới +0,08.

Điều này khớp với mọi thứ ta biết về **nỗi sợ điều khiển volatility**, và là nền của [[Volatility Risk Premium]]. Cũng là cơ sở cho một dạng edge định tính: giá hồi phục sau khi vol giảm, nhưng **chậm hơn** tốc độ nó rơi. Xem [[Edge and Expected Value]].

## 5. Long memory

Một số nghiên cứu cho thấy volatility có **phụ thuộc tầm xa** — vol ở các độ trễ rất lớn vẫn ảnh hưởng vol tương lai.

Nếu đúng, các model **rough volatility** phù hợp hơn: fractional Brownian motion, Volterra process. Nhưng literature khác cho rằng bằng chứng chưa vững — chuyện thường tình trong quant finance.

## 6. Bảng tổng hợp

| Stylized fact | Model nào bắt được |
|---|---|
| Excess kurtosis | ARCH/GARCH (qua Gaussian innovation với variance biến thiên) |
| Volatility clustering | ARCH/GARCH |
| Mean reversion | OU / Vasicek, GARCH (unconditional variance) |
| Leverage effect | **GJR-GARCH, EGARCH** (GARCH chuẩn *không* bắt được) |
| Long memory | FIGARCH, rough volatility, Volterra |

Lưu ý: GARCH(1,1) chuẩn bắt được clustering, kurtosis, mean reversion — nhưng **không** bắt được leverage effect vì nó dùng bình phương residual (đối xứng). Cần biến thể bất đối xứng.

## 7. Vì sao "parsimonious" quan trọng

Luôn có đánh đổi **complexity ↔ efficiency**. Trước ARCH, không có model đơn lẻ nào bắt được excess kurtosis + clustering + heteroscedasticity cùng lúc một cách gọn gàng. Đóng góp của Engle chính là ở chỗ đó.

## 8. Checklist áp dụng
- [ ] Tôi đã kiểm tra kurtosis của chuỗi return chưa? Nó là bao nhiêu?
- [ ] Model của tôi có bắt được clustering không?
- [ ] Tôi có cần bắt leverage effect không? (Nếu có → GARCH chuẩn không đủ)
- [ ] Tôi có đang dùng cách parametric Gaussian ở đâu để đo rủi ro không?
- [ ] Nếu ai đó nói "sự kiện N-sigma", tôi có kiểm tra benchmark của họ không?
- [ ] Tài sản của tôi có bằng chứng long memory không?

## Tham khảo
- Quant Guild — *Master Volatility with ARCH & GARCH Models*: https://youtu.be/iImtlBRcczA
- Cont, R. — *Empirical properties of asset returns: stylized facts and statistical issues*, Quantitative Finance (2001) — bài tổng hợp kinh điển
- Black, F. — *Studies of Stock Price Volatility Changes* (1976) — nguồn gốc leverage effect
- Gatheral, Jaisson & Rosenbaum — *Volatility is rough*, Quantitative Finance (2018)
- Quant Guild — *How Markovian Lifting Solves the Rough Volatility Problem*: https://youtu.be/Cr7kBSPqD8A

## Liên kết
[[ARCH and GARCH Models]] · [[Realized vs Implied Volatility]] · [[Volatility Risk Premium]] · [[Ornstein-Uhlenbeck Process]] · [[Quant]]
