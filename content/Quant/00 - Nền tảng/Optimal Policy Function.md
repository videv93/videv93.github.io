---
tags: [quant, foundation]
status: evergreen
---
# Optimal Policy Function

> Trader và poker pro không học một *chiến lược*. Họ học một **hàm chính sách** $\pi^*$ — một tập hợp hành động phụ thuộc môi trường, được cập nhật liên tục. Đây là lý do "dạy bạn trade" là bất khả thi.

## 1. Khái niệm cốt lõi

Mục tiêu không phải maximize P&L thô, mà:
$$\pi^* = \arg\max_{\pi} \; \text{Risk-Adjusted Return}(\pi)$$

$\pi$ **không phải** một chiến lược. Nó là:
- một tập hợp các lớp chiến lược (mean reversion, overstated vol, momentum, sentiment),
- cộng cách chọn cái nào, khi nào,
- cộng cách vào/ra lệnh, size, hedge, cắt lỗ,
- cộng cách nghỉ không giao dịch.

## 2. Vì sao không tồn tại "golden goose strategy"

| Niềm tin | Thực tế |
|---|---|
| "Tìm 1 chiến lược, bật lên, in tiền" | Chiến lược cần giám sát và tối ưu liên tục; phải **khai tử alpha chết**, đôi khi **hồi sinh** khi nó ổn định trở lại |
| "Không ai chia sẻ chiến lược có lãi" | Chia sẻ một *lớp* chiến lược không làm crowd-out edge của ai cả — trừ khi bạn có vốn cỡ institution |
| "Chiến lược tốt thì luôn chạy" | Metagame đổi. Model đổi. Regime đổi |

Câu người ta *nên* nói thay vì "không ai chia sẻ chiến lược có lãi" là: **"không ai trade hộ bạn cả."** Tôi có thể nói với bạn chiến thuật bóng chày là đánh trúng fastball — nếu bạn không vung được gậy thì tôi không giúp được.

Ở institution thì crowding **là** vấn đề thật — nên mới có non-compete và garden leave. Đó là chuyện của vốn và hạ tầng, không phải chuyện video YouTube.

## 3. Policy hiệu quả vs không hiệu quả

Hình dung 2 năm giao dịch (backtest, hoặc discretionary trading thật) rồi nhìn giai đoạn forward:

**Policy hiệu quả** → hiệu suất ổn định về phía trước, vì:
- liên tục cập nhật chiến lược, khai tử alpha chết, chỉ trade cái đang ổn định,
- model discretionary robust qua nhiều regime.

**Policy không hiệu quả** → out-of-sample tệ, vì:
- alpha decay do crowding,
- overfit backtest vào noise ([[Backtesting and Overfitting]]),
- bám vào một setup kỹ thuật không hợp regime hiện tại.

## 4. Bằng chứng từ machine learning

Reinforcement learning agent học chơi poker và học trade **đều đang học đúng thứ này**: một optimal policy function tối đa hoá EV. Không có tranh cãi trong literature về điểm này.

Nhưng RL agent bị giới hạn bởi dữ liệu nó nạp được. Con người tiếp cận thông tin liên tục hơn, hành động linh hoạt hơn, và có "intangibles". Đây là lập luận hình thức cho việc **không phải mọi thứ đều quy được về hệ thống thuật toán**.

## 5. Ví dụ: pocket aces

Texas Hold'em, 5 đối thủ, bạn có đôi Át.
- Xác suất thắng **vô điều kiện** < 50% → "chiến lược chung" nói: hơn nửa số lần nên fold.
- Nhưng $\pi^*$ — bluff hợp lý, biết ai chơi tight/loose, đếm chip — có thể đẩy tỉ lệ thực tế lên ~60/40, bằng cách ép người khác fold dù họ có bài mạnh hơn.

Đây chính xác là lý do một chiến lược cố định ("luôn raise X với pocket aces") thua một policy. Chiến lược **tăng cường** edge; nó không tự làm edge dương.

## 6. Cạm bẫy
- **Coi $\pi^*$ là thứ mua được.** Không broker, không news outlet, không guru nào tặng bạn được hàm này. Nó đến từ kiến thức + kinh nghiệm.
- **Đóng băng policy.** Set-and-forget là cách nhanh nhất để policy hiệu quả biến thành không hiệu quả.
- **Nghĩ policy = nhiều chỉ báo hơn.** Ngược lại: phần lớn tiến bộ đến từ **bớt** thứ, không phải thêm.
- **Coi trading là việc bán thời gian.** Giám sát, tối ưu, khai tử, hồi sinh chiến lược là **công việc toàn thời gian**.

## 7. Checklist áp dụng
- [ ] Policy hiện tại của tôi gồm mấy lớp chiến lược? Nếu chỉ 1 → tôi đang đặt hết trứng một giỏ.
- [ ] Lần cuối tôi *khai tử* một chiến lược là khi nào? Nếu chưa bao giờ → tôi chưa có policy.
- [ ] Tôi có quy tắc rõ ràng cho "không giao dịch" không?
- [ ] Tôi đánh giá policy bằng risk-adjusted return hay bằng return thô?
- [ ] Hiệu suất của tôi có **ổn định** qua một chuỗi dài không? Đó mới là thứ đo được kỹ năng.

## Tham khảo
- Quant Guild — *Quant Busts 3 Trading Myths with Math*: https://youtu.be/wJfIk3VnubE
- Quant Guild — *Why Poker Pros Make the Best Traders*: https://youtu.be/JuD3KGQhofw
- Quant Guild — *Quant Proves Trading Can't Be Taught (But You CAN Learn This)*: https://youtu.be/uivlsPk0WLQ
- Sutton & Barto — *Reinforcement Learning: An Introduction* (định nghĩa policy, optimal policy)
- Brown & Sandholm — *Superhuman AI for multiplayer poker*, Science 365 (2019)

## Liên kết
[[Edge and Expected Value]] · [[Games of Chance vs Games of Incomplete Information]] · [[Backtesting and Overfitting]] · [[Quant vs Discretionary Trading]] · [[Quant]]
