---
tags: [quant, foundation]
status: evergreen
---
# Randomness vs Uncertainty

> Hai hệ đều cho ra kết quả không biết trước. Khác biệt duy nhất — và là khác biệt quyết định tất cả — là **xác suất có đổi theo thời gian hay không**.

## 1. Khái niệm cốt lõi

| | Hệ ngẫu nhiên (random) | Hệ bất định (uncertain) |
|---|---|---|
| Kết quả từng lần | Không biết trước | Không biết trước |
| Phân phối xác suất | **Cố định**, không đổi theo thời gian | **Thay đổi** theo thời gian |
| Hội tụ | Có. LLN đảm bảo tần suất → xác suất lý thuyết | Không. Không có gì để hội tụ về |
| Lặp lại thí nghiệm | Được (quay roulette 10.000 lần) | Không được (một earnings event chỉ xảy ra một lần) |
| Ví dụ | Roulette, craps, xúc xắc, slots | Poker, thị trường tài chính |
| Hệ quả | EV tính được chính xác, cố định | EV phải **ước lượng**, và luôn sai |

**Điểm mấu chốt:** thị trường **không ngẫu nhiên** — nó **bất định**. Đây không phải chuyện chơi chữ. Ngẫu nhiên nghĩa là có một mức xác suất thật, cố định, mà ta có thể hội tụ về bằng cách quan sát đủ nhiều. Bất định nghĩa là mức đó tự nó là một quá trình ngẫu nhiên theo thời gian.

## 2. Cái gì làm một hệ trở nên "ngẫu nhiên"

**Luật số lớn (LLN)** là thứ đảm bảo house edge của casino:
- Quay roulette đủ nhiều → tỉ lệ đỏ/đen/xanh hội tụ về giá trị lý thuyết.
- Cắm giá trị đó vào công thức EV → EV người chơi **luôn** âm (roulette Mỹ: −0,0526 mỗi \$1 cược).
- Không hành động nào của người chơi thay đổi được con số đó. Hành động tối ưu duy nhất là **không chơi**.

## 3. Cái gì làm một hệ trở nên "bất định"

Thử nghiệm tư duy: giả sử thị trường định giá xác suất cổ phiếu tăng sau earnings là 60%. Nếu ta có cỗ máy thời gian và chạy lại đúng sự kiện đó 10.000 lần, tần suất thực tế **sẽ không hội tụ về 60%** — nó hội tụ về một con số hoàn toàn khác, và con số đó cũng đổi theo bối cảnh.

Hệ quả trực tiếp cho trader:
1. Xác suất thắng một lệnh **không hội tụ**. Không có "win rate thật" để đo.
2. Hiệu suất quá khứ không đảm bảo hiệu suất tương lai — đây là phát biểu toán học, không phải disclaimer pháp lý.
3. **Hành động của bạn ảnh hưởng đến EV của chính bạn.** Đây là lý do trading không phải cờ bạc.
4. Mọi công cụ thống kê "kinh điển" (CLT, LLN, khoảng tin cậy) đều được xây trên giả định stationarity — và giả định đó bị vi phạm. Xem [[Stationarity and Non-Stationarity]].

## 4. Cạm bẫy hay gặp

- **Viện dẫn CLT sai chỗ.** "Chiến lược tôi có EV dương nên theo CLT nó sẽ hội tụ về lợi nhuận" — sai. CLT cần dãy i.i.d. từ một phân phối cố định. Hơn nữa nhiều người nói CLT mà không phân biệt được *convergence in probability* và *almost sure convergence*.
- **Coi implied probability là xác suất thật.** Implied probability 80% chỉ nói thị trường đang định giá gì, không nói khả năng thật là bao nhiêu. Xem [[Trading with a Pricing Model]].
- **Nhầm "không dự đoán được" với "ngẫu nhiên thuần".** Ta *mô hình hoá* thị trường bằng biến ngẫu nhiên như một lăng kính, không phải vì tin thị trường thật sự ngẫu nhiên.
- **Kết luận "trading là cờ bạc" từ việc thua tiền.** Bạn có thể chỉ đơn giản là một trader tệ — luôn có thể hành động dưới mức tối ưu và tích luỹ EV âm. Điều đó không biến trading thành game of chance.

## 5. Checklist áp dụng
- [ ] Tôi đang đối mặt hệ ngẫu nhiên hay hệ bất định? (Tôi có lặp lại được thí nghiệm không?)
- [ ] Hành động của tôi có ảnh hưởng đến EV không? Nếu **không** → đừng chơi.
- [ ] Tôi có đang giả định một tham số nào đó cố định trong khi nó là quá trình theo thời gian không?
- [ ] Nếu tôi trích dẫn một định lý hội tụ, giả định của nó có thoả không?
- [ ] Khi chiến lược ngừng chạy, tôi có phân biệt được "xui" với "edge đã chết" không?

## Tham khảo
- Quant Guild — *Quant Busts 3 Trading Myths with Math*: https://youtu.be/wJfIk3VnubE
- Quant Guild — *Is Trading Gambling? Quant Proves It's Not With Math & Logic*: https://youtu.be/GvX8Ragl3ZU
- Knight, F. — *Risk, Uncertainty and Profit* (1921), phân biệt kinh điển risk vs uncertainty
- Taleb, N. — *Fooled by Randomness*
- Quant Guild — *Non-Stationarity and Why Market Timing Fails*: https://youtu.be/7nvjrgqKjJE

## Liên kết
[[Games of Chance vs Games of Incomplete Information]] · [[Edge and Expected Value]] · [[Expectation and Convergence]] · [[Stationarity and Non-Stationarity]] · [[Quant]]
