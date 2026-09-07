---
tags: [quant, foundation]
status: evergreen
---
# Trading Myths Busted

> Ba huyền thoại phổ biến nhất trong cộng đồng trading, và cách bác bỏ chúng bằng toán chứ không bằng cảm tính.

## Myth 1 — "Trading là cờ bạc và thị trường là ngẫu nhiên"

**Busted.** Hai vế đều sai, và sai vì cùng một lý do.

- Cờ bạc (game of chance) = edge âm **cố định** chống lại người chơi, được đảm bảo bởi luật số lớn. Không hành động nào thay đổi được.
- Trading = game of incomplete information. Hành động của bạn **quyết định** EV.
- Thị trường không ngẫu nhiên mà **bất định**: không có xác suất cố định nào để hội tụ về.

Bạn *có thể* thua sạch tiền khi trading. Nhưng đó là do trade tệ — tích luỹ vô hạn phí giao dịch, mua 100 bán 99 mua lại 99 — chứ không phải do có edge âm cố định áp lên bạn.

Chi tiết: [[Randomness vs Uncertainty]], [[Games of Chance vs Games of Incomplete Information]].

## Myth 2 — "Chỉ cần đúng 50,5% số lần là có lãi"

**Busted.** Win rate **một mình** không nói gì cả.

$$\mathbb{E} = \bar{W}\cdot P(W) + \bar{L}\cdot P(L)$$

Kết quả phụ thuộc **cả** win rate **và** bet size / độ lớn winner-loser.

Mô phỏng đối chứng:
- Chiến lược **win rate 50,5%** → tích luỹ lỗ, cháy tài khoản.
- Chiến lược **win rate 30%** → hiệu suất ổn định, đạt mục tiêu.

Bạn hoàn toàn có thể có win rate 90–95% mà vẫn EV âm và mất sạch tiền. Đây là lý do "guru win rate 100%" là con số vô nghĩa.

Vế thứ hai của myth này còn nguy hiểm hơn: **kể cả khi EV dương, bạn vẫn có thể lỗ trên trung bình** nếu hệ thống là non-ergodic. Trong mô phỏng: hệ ergodic có ~60% trader lãi; hệ non-ergodic **cùng EV dương** chỉ có ~20% lãi — vì EV bị chi phối bởi vài sample path cực may. Xem [[Ergodicity]] và [[Kelly Criterion]].

## Myth 3 — "Chiến lược là cố định, luôn chạy, và không ai chia sẻ chiến lược có lãi"

**Busted, cả ba vế.**

**"Cố định"** — không. Trading là công việc toàn thời gian: giám sát, tối ưu, khai tử alpha chết, đôi khi hồi sinh chúng.

**"Luôn chạy"** — không. Cái bạn thực sự tối ưu là một [[Optimal Policy Function]] $\pi^*$, không phải một chiến lược. Model học thuật giúp hiểu return đến từ đâu, nhưng cũng thường gây hiểu lầm.

**"Không ai chia sẻ"** — sai và dễ nhận ra người nói không hiểu không gian:
- Người nói câu đó gần như chắc chắn không có đủ vốn để crowd-out bất kỳ alpha nào.
- Kể cả có vốn, họ có triển khai đúng hệ thống đó để crowd-out không?
- Crowding **là** vấn đề thật ở tầm institution — nên mới có non-compete và garden leave. Nhưng đó là chuyện hạ tầng + vốn.

Các lớp chiến lược thực sự kiếm tiền hàng ngày, được chia sẻ công khai: **mean reversion, bán vol bị định giá quá cao, momentum, sentiment**, mean reversion về một vol surface đã calibrate, cross-sectional social sentiment. Chúng **tăng cường** edge; chúng không tự làm edge dương.

Câu đúng phải là: **"Không ai trade hộ bạn."** Không ai bảo bạn khi nào vào, ra, vì sao, quản rủi ro thế nào, khi nào cắt lỗ.

## Hệ quả: vì sao technical analysis không bị "bác bỏ dứt điểm"

Không thể chạy một backtest đơn giản trên một chỉ báo rồi kết luận nó "không hoạt động", vì trong hệ **bất định** chỉ báo đó là một *thành phần* của $\pi^*$, không phải một quy tắc độc lập. Điều này không có nghĩa TA hiệu quả — nghĩa là câu hỏi "TA có hiệu quả không" bị đặt sai. Xem [[Quant Critique of ICT]].

## Checklist áp dụng
- [ ] Tôi có đang khoe/tin vào win rate như bằng chứng về chất lượng chiến lược không?
- [ ] Tôi có tính được EV đầy đủ (4 thành phần) của hệ thống mình không?
- [ ] Hệ thống của tôi additive hay multiplicative? (Nếu size theo % vốn → non-ergodic)
- [ ] Tôi coi trading là việc phụ hay việc chính? Kỳ vọng của tôi có khớp không?
- [ ] Khi ai đó nói "không ai chia sẻ chiến lược có lãi", tôi hiểu vì sao câu đó sai chưa?

## Tham khảo
- Quant Guild — *Quant Busts 3 Trading Myths with Math*: https://youtu.be/wJfIk3VnubE
- Notebook đi kèm: https://github.com/romanmichaelpaolucci/Quant-Guild-Library (2025 Video Lectures / 56)
- Quant Guild — *Why Trading Metrics are Misleading (Unless This is True)*: https://youtu.be/xziwmju7x2s
- Quant Guild — *Is Trading Luck or Skill? Quant Debunks Trading Gurus with Math*: https://youtu.be/czEyUZabE2U
- Peters, O. — *The ergodicity problem in economics*, Nature Physics 15 (2019)

## Liên kết
[[Randomness vs Uncertainty]] · [[Ergodicity]] · [[Kelly Criterion]] · [[Optimal Policy Function]] · [[Performance Metrics]] · [[Quant]]
