---
tags: [quant, probability, core]
status: evergreen
---
# Ergodicity

> Trải nghiệm của **số đông** không phải trải nghiệm của **một người**. Đây là lý do một hệ thống có EV dương vẫn có thể khiến gần như tất cả người chơi phá sản.

## 1. Định nghĩa hình thức

Cho quá trình ngẫu nhiên $X(t)$ với các quỹ đạo $x_n(t)$:

| Loại trung bình | Cách lấy | Ký hiệu | Trả lời câu hỏi |
|---|---|---|---|
| **Time average** | Cố định hệ $n$, lấy trung bình dọc theo thời gian | $\bar{x}$ | Một hệ tiến hoá thế nào qua thời gian dài? |
| **Ensemble average** | Cố định thời điểm $t$, lấy trung bình ngang qua nhiều hệ | $\langle x \rangle$ | Tổng thể của một tập hợp hệ thế nào? |

> **Quá trình là ergodic ⟺ time average = ensemble average.**

Hai phép này khác nhau về **khái niệm**. Trong kinh tế: time average quan trọng với **cá nhân ra quyết định**; ensemble average quan trọng với **tập thể lớn** (công ty bảo hiểm, quỹ hưu trí). Ergodicity là *trường hợp đặc biệt* mà ta được phép hoán đổi.

Cách nói ngắn gọn: **"cái điển hình có xu hướng tiến về cái trung bình theo thời gian hay không."** Nếu không → non-ergodic. Tệ hơn, trong kinh doanh thực, cái điển hình thường **thấp hơn** trung bình.

## 2. Lịch sử — vì sao khái niệm này bị bỏ quên

- 1650s: biến ngẫu nhiên + expectation value ra đời. Không ai nói gì về việc mẫu lấy từ *một hệ qua nhiều thời điểm* hay *nhiều hệ tại một thời điểm*.
- 200 năm sau, vật lý thống kê phải chọn: diễn giải expectation là ensemble average (rồi xử lý thời gian riêng) hay time average (rồi xử lý hệ riêng). **Vật lý chọn cái đầu.**
- Boltzmann (1870s) đề xuất "mẹo": nếu ergodic hypothesis đúng thì **đẳng thức Birkhoff** cho phép tính time average bằng ensemble average — dễ hơn nhiều.
- Kinh tế học kế thừa expectation value **mà không kế thừa câu hỏi ergodicity**. Đây là lỗ hổng mà Ergodicity Economics (Peters, Adamou — London Mathematical Laboratory) đang lấp.

## 3. Ví dụ

**Ergodic:**
- *Sampling tầm thường*: mỗi thời điểm, mỗi hệ đều rút độc lập từ cùng một biến ngẫu nhiên. Tung đồng xu (1 = ngửa, 0 = sấp): trung bình dọc thời gian và ngang hệ đều = ½.
- *Quá trình mean-reverting / AR*: $x_{t+1} = \phi x_t + \varepsilon$, $|\phi| < 1$. Phụ thuộc đường đi **yếu** — cuối cùng quên điều kiện ban đầu. Ergodic (miễn ensemble average lấy đủ xa khỏi điều kiện ban đầu). Xem [[Ornstein-Uhlenbeck Process]].

**Non-ergodic:**
- *Bình Pólya*: bình có 1 bi đỏ + 1 bi xanh; rút bi nào thì thêm một bi cùng màu. Ensemble average của tỉ lệ bi xanh ổn định ở ½, nhưng **mỗi quỹ đạo hội tụ về một biến ngẫu nhiên uniform(0,1)**. Nguyên nhân: **phụ thuộc đường đi mạnh + reinforcement**. Vài lần rút đầu tiên khoá chặt kết quả.
- *Random multiplicative growth* — "phương trình của sự sống", mô hình chuẩn cho giá tài sản và quần thể tế bào: $x_{t+1} = 1{,}5 x_t$ với xác suất ½, $0{,}6 x_t$ với xác suất ½. Ensemble average **tăng theo hàm mũ**, trong khi **gần như mọi quỹ đạo suy giảm theo hàm mũ**. Ergodicity vỡ hoàn toàn.

## 4. Vì sao điều này quyết định trong trading

Đây là mấu chốt: **bet sizing quyết định hệ của bạn là ergodic hay không.**

| | Additive betting | Multiplicative betting |
|---|---|---|
| Cách đặt | Cố định \$10 mỗi lệnh | % bankroll mỗi lệnh |
| Thực tế | Có \$1.000 hay \$1.000.000 vẫn cược \$10 — vô lý | Cược tỉ lệ với vốn — cái ai cũng làm |
| Hệ | **Ergodic** | **Non-ergodic** |
| Với EV dương | Gần như mọi path bám sát đường EV lý thuyết | Chỉ vài path tích luỹ khổng lồ; **phần lớn phá sản** |

Mô phỏng đối chứng (cùng EV dương):
- Hệ ergodic: ~60% trader có lãi, phần còn lại bám sát đường EV.
- Hệ non-ergodic: chỉ **~20%** có lãi. EV dương bị chi phối bởi vài sample path cực may.

> **Bạn không được chọn sample path mình đi.** Đó là toàn bộ vấn đề.

Hệ quả: có EV dương **không** đảm bảo bạn kiếm được tiền trên trung bình. Đây là myth 2 trong [[Trading Myths Busted]].

## 5. Làm gì với nó

Tối ưu **cho time average** của wealth thay vì cho ensemble average. Bài toán tối đa hoá đó cho ra **[[Kelly Criterion]]**.

Lưu ý quan trọng: Kelly **không** biến hệ non-ergodic thành ergodic. Nó chỉ cải thiện đáng kể trải nghiệm của ensemble — nhiều path hơn kết thúc trên mức vốn ban đầu. Bạn vẫn đi một path duy nhất, vẫn không chọn được nó.

## 6. Câu đố mở rộng (không chỉ tài chính)

> Một vaccine "hiệu quả 70% trên trung bình". Nghĩa là hiệu quả 70% thời gian ở 100% số người, hay 100% thời gian ở 70% số người?

Ergodicity không phải chuyện của riêng quant.

## 7. Cạm bẫy
- **Dùng NPV / portfolio theory một cách máy móc.** Các phương trình đó chỉ cho hướng dẫn tốt **nếu** hệ là ergodic. Đây là "ergodicity error".
- **Nghĩ tăng trưởng trung bình dương ⇒ tăng trưởng.** Với volatility, hoàn toàn không.
- **Nhầm ergodicity với stationarity.** Khác nhau. Xem [[Stationarity and Non-Stationarity]].
- **Nghĩ Kelly "sửa" được non-ergodicity.** Không.

## 8. Checklist áp dụng
- [ ] Bet sizing của tôi additive hay multiplicative? (Gần như chắc chắn là multiplicative)
- [ ] Tôi đang tối ưu ensemble average hay time average?
- [ ] Chỉ số tôi đang nhìn (EV, expected return) là chỉ số của ensemble hay của một path?
- [ ] Nếu chạy 1.000 mô phỏng chiến lược này, **bao nhiêu %** path kết thúc trên vốn ban đầu? (Không phải: trung bình là bao nhiêu)
- [ ] Có kịch bản nào tôi bị xoá sổ vĩnh viễn không? Non-ergodic thì phá sản là hấp thụ.

## Tham khảo
- Adamou, A. (London Mathematical Laboratory) — *What is ergodicity?*: https://youtu.be/VCb2AMN87cg
- Ergodicity Economics portal: https://ergodicityeconomics.com/
- Peters, O. — *The ergodicity problem in economics*, Nature Physics 15, 1216–1221 (2019)
- Peters & Gell-Mann — *Evaluating gambles using dynamics*, Chaos 26 (2016)
- Quant Guild — *Why Most Traders Lose: Ergodicity for Quant Trading*: https://youtu.be/dryV1qJYUw8 · notebook: `2026 Video Lectures/81/e_ft.ipynb`
- Evolutesix — *What is ergodicity, and why is it the secret to smart investing?*: https://youtu.be/6LfdZbf8jfY

## Liên kết
[[Kelly Criterion]] · [[Volatility Drag]] · [[Gambler's Ruin]] · [[Expectation and Convergence]] · [[Trading Myths Busted]] · [[Quant]]
