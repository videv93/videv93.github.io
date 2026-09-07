---
tags: [quant, volatility]
status: evergreen
---
# Realized vs Implied Volatility

> Volatility là quá trình **không quan sát được (latent)**. Ta chỉ có hai proxy — một nhìn lui, một nhìn tới — và chúng đến từ hai nguồn hoàn toàn khác nhau.

## 1. Hai proxy

| | Realized / Historic Volatility | Implied Volatility |
|---|---|---|
| Hướng | **Nhìn lui** | **Nhìn tới** |
| Nguồn | Chuỗi return quá khứ | **Đảo ngược model Black-Scholes** từ giá option thị trường |
| Ý nghĩa | Biến động đã thực sự xảy ra | Trader đang **định giá** biến động tương lai ở mức nào |
| Đơn vị quan sát | Một cửa sổ (ví dụ 30 ngày) | Một điểm thời gian, thường theo moneyness + maturity |

## 2. Realized volatility

Cách tính: lấy return, tính trung bình làm benchmark, đo độ lệch bình phương quanh benchmark đó, roll cửa sổ về phía trước.

**Điểm cần chú ý — cửa sổ quyết định kết quả.**
- Cửa sổ 30 ngày → đường mượt hơn.
- Cửa sổ ngắn hơn → benchmark roll nhanh hơn → bắt nhiều dao động mạnh hơn → đường gồ ghề hơn.

Không có "realized vol đúng" — chỉ có realized vol **theo một cửa sổ**. (Có thể đối chiếu với 30-day realized vol từ nhà cung cấp như Interactive Brokers để kiểm tra cách tính của mình; thường lệch nhẹ nhưng bám sát.)

**Vấn đề:** dữ liệu lịch sử không đảm bảo hiệu suất tương lai. Không có gì nói benchmark này còn đúng phía trước. Vol rõ ràng **biến thiên theo thời gian**.

## 3. Implied volatility

Cho model Black-Scholes và **giá option trên thị trường**, giải ngược ra mức volatility cần thiết để model cho ra đúng giá đó. Đó là implied volatility.

Đây là ví dụ đẹp nhất của [[All Models Are Wrong]]: giả định constant volatility là sai một cách bạo lực, nhưng chính vì giả định đó mà ta **đảo ngược được model** và thu được một đại lượng cực kỳ giá trị — **thị trường đang định giá bất định ở mức nào**.

Lưu ý: implied volatility thường được quote cho **một moneyness và một maturity cụ thể**. Nói "IV của cổ phiếu X" là một tổng hợp; bề mặt thật là **implied volatility surface**.

## 4. Mối quan hệ giữa hai đại lượng

Vẽ IV và 30-day realized vol trên cùng biểu đồ:
- Tương quan **thay đổi theo bối cảnh**. Khi bất định và sợ hãi cùng tăng, cả hai cùng tăng → rolling correlation tăng.
- Nhưng có một lệch **hệ thống**: IV có xu hướng **realize thấp hơn** mức nó ngụ ý. Đây là [[Volatility Risk Premium]].

## 5. ARCH/GARCH mô hình hoá cái nào?

**Realized volatility.** Không phải implied.

Lý do: ta đã có IV ngay lập tức từ thị trường option. Cái ta muốn dự báo là **realized volatility trong tương lai** — để so với IV và tìm mispricing. Xem [[ARCH and GARCH Models]].

## 6. Cạm bẫy
- **Coi IV là "dự báo của thị trường về vol tương lai" một cách ngây thơ.** Nó là giá, không phải dự báo — và nó chứa risk premium.
- **So sánh IV với realized vol khác kỳ hạn.** IV 30 ngày phải so với realized vol 30 ngày **phía trước**, không phải phía sau.
- **Dùng một cửa sổ realized vol duy nhất rồi kết luận.** Đổi cửa sổ có thể đảo kết luận.
- **Quên rằng volatility là latent.** Cả hai đều chỉ là proxy; không cái nào là "vol thật".
- **Dùng phương pháp parametric với phân phối chuẩn** để đo rủi ro từ realized vol. Xem [[Stylized Facts of Volatility]].

## 7. Checklist áp dụng
- [ ] Tôi đang dùng proxy nào? Vì sao proxy đó phù hợp bài toán?
- [ ] Cửa sổ realized vol của tôi là bao nhiêu? Kết luận có ổn định khi đổi cửa sổ không?
- [ ] Khi so IV vs realized, tôi có so đúng kỳ hạn và đúng chiều thời gian không?
- [ ] IV tôi dùng là aggregate hay của một điểm cụ thể trên surface?
- [ ] Tôi có đang giả định vol không đổi ở đâu đó trong pipeline không?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| Interactive Brokers TWS API | Lấy historical vol + option chain | https://www.interactivebrokers.com |
| `arch` (Python) | Fit mô hình volatility | https://arch.readthedocs.io |
| CBOE VIX | IV tổng hợp trên option S&P 500 | https://www.cboe.com/tradable_products/vix/ |

## Tham khảo
- Quant Guild — *Master Volatility with ARCH & GARCH Models*: https://youtu.be/iImtlBRcczA
- Quant Guild — *Black-Scholes Implied Volatility in 3 Minutes*: https://youtu.be/8CB22YhioRw
- Quant Guild — *Trading with the Black-Scholes Implied Volatility Surface*: https://youtu.be/YH0tWpBaKGs
- Gatheral, J. — *The Volatility Surface*
- Andersen, Bollerslev, Diebold & Labys — *Modeling and Forecasting Realized Volatility*, Econometrica (2003)

## Liên kết
[[Stylized Facts of Volatility]] · [[ARCH and GARCH Models]] · [[Volatility Risk Premium]] · [[Black-Scholes Model]] · [[Quant]]
