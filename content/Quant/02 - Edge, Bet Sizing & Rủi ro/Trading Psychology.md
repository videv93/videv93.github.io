---
tags: [quant, risk, psychology]
status: evergreen
---
# Trading Psychology

> Phần lớn cái gọi là "vấn đề tâm lý" thật ra là **thiếu quy trình**. Nhưng có vài cơ chế tâm lý thật, đo được, và trực tiếp phá EV của bạn.

## 1. Luận điểm nền: bạn không có vấn đề tâm lý, bạn không có quy trình

Khi đến lúc vào lệnh mà bạn đóng băng, do dự, overtrade — thường không phải vì bạn yếu đuối, mà vì bạn **không có cách làm rõ ràng, không chủ quan, lặp lại được**.

Ba câu hỏi phải trả lời được **trước** khi ngồi vào bàn:
1. **Ở đâu** tôi giao dịch? (mức nào)
2. **Cái gì** tôi chờ thấy ở mức đó?
3. **Khi nào** tôi giao dịch?

Trả lời được cả ba, không mơ hồ → phần lớn "vấn đề tâm lý" bốc hơi.

Phân biệt hai thứ hay bị gộp:
- **SOP (standard operating procedure)** — mọi thứ **ngoài** entry: routine buổi sáng, cách journal, cách quản rủi ro, cách chuẩn bị. Đây là thứ ít ai nói tới nhưng quan trọng nhất.
- **Chiến lược** — entry model. Cái khiến bạn bóp cò.

Có chiến lược mà không có SOP thì vẫn là một mớ cảm xúc có chiến lược.

## 2. Tilt và revenge trading

**Cơ chế:** một chuỗi xui → quyết định tệ → bet cỡ lớn bất thường → EV âm nghiêm trọng. Trong poker, đối thủ chỉ cần ngồi yên và **thu toàn bộ EV của bạn**. Trong trading, thị trường làm điều tương tự.

> **Biến động ngược chiều không phải lời mời để nổ tài khoản.**

Ngộ nhận cần đập bỏ: "tôi sẽ bắt một cú upside lớn để gỡ lại". Đôi khi nó xảy ra thật. Mặt còn lại là bạn mất nhiều hơn nữa.

Ví dụ đối chứng thực tế: một quant trader mất từ 130k xuống 70k (bị liquidate giữa buổi tập gym). Phản ứng: **tiếp tục giao dịch đúng như cũ.** Mất gần 100 ngày để gỡ, không mở vị thế quá cỡ, không nạp leverage. Kết quả cuối năm: +30% so với vốn đầu năm.

Tilt là dấu hiệu **thiếu hiểu biết lý thuyết về không gian**, không phải dấu hiệu thiếu kỷ luật.

## 3. IKEA effect — cái bẫy của "kế hoạch"

Bạn dựng một kế hoạch công phu → bạn yêu nó vì đã bỏ công vào → khi thị trường đi ngược, bạn **bám vào nó** và gọi đó là "kỷ luật".

Hệ quả dây chuyền:
1. Bỏ qua mọi dấu hiệu mình sai.
2. Chỉ tìm thông tin xác nhận bias.
3. Thua lệnh hoặc bỏ lỡ lệnh thắng, nhưng tự an ủi "tôi đã theo kế hoạch".
4. Kết luận "chiến lược này không chạy" → đổi chiến lược → xem video mới → lặp lại vòng lặp.

**Dữ liệu thực tế** từ hơn 400 lệnh của một trader:
| | Win rate | Profit factor |
|---|---|---|
| Có daily bias | ~55% | ~1,9 |
| **Không** daily bias | **~70%** | **~2,9** |

Anh ta **có lãi hơn khi giao dịch ngược bias của chính mình** — và chỉ phát hiện điều đó nhờ review dữ liệu.

**Kế hoạch đúng nghĩa** là quản rủi ro quanh **nhiều kịch bản**: "nếu thị trường làm X thì tôi làm Y". Không phải "thị trường phải làm X thì tôi mới giao dịch".

## 4. Lindy effect — vì sao lời khuyên tồi vẫn tồn tại

Lời khuyên càng tồn tại lâu, người ta càng mặc định nó đúng, và lặp lại mà không kiểm chứng. Thông điệp gốc bị bóp méo như trò tam sao thất bản: ai đó ban đầu nói "hãy có kịch bản cho việc mình sai" → 10 đời sau thành "phải dự đoán trước mọi thứ, không đúng thì không trade".

## 5. Gỡ bỏ "tầm quan trọng"

Sai lầm sâu nhất: **đặt quá nhiều tầm quan trọng lên việc này phải thành công.**

"Tôi phải có lãi trong 3 tháng", "tôi phải chứng minh với bố mẹ", "tôi không được bỏ việc cho tới khi lãi cả năm" → bạn đã thua trước khi bắt đầu.

Đối lập với nó là **tư duy dồi dào**: bạn sẽ thấy hàng trăm nghìn lệnh nữa. Một lệnh không quan trọng. Nếu kết quả một lệnh quan trọng đến mức đó với bạn, size của bạn sai hoặc bạn hiểu sai không gian.

> Khi trading trở nên **buồn tẻ**, đó là lúc bạn đã tới. Nếu nó còn hào hứng, bạn đang đánh bạc.

## 6. Journal đúng cách

Journal mà chỉ ghi "lãi/lỗ" thì vô dụng. Phải **lọc được dữ liệu**:
- **Setup nào**? (inverted FVG vs order block vs mean reversion — cái nào thực sự có xác suất cao hơn?)
- **Khung giờ nào**? Nếu 9:45–10:00 chiếm một nửa số lỗ của bạn → nghỉ khung đó, bạn lập tức có lãi.
- **Có bias hay không**? (xem mục 3)
- Trạng thái cảm xúc, R multiple thực hiện được.

> Khi tôi có lãi, không phải vì học thêm thứ mới. Là vì **bỏ bớt** thứ.

## 7. Checklist áp dụng
- [ ] Tôi trả lời được **ở đâu / cái gì / khi nào** một cách không mơ hồ chưa?
- [ ] Tôi có SOP viết ra ngoài entry model không?
- [ ] Tôi có đang bám vào một daily bias không? Dữ liệu của tôi nói gì về việc đó?
- [ ] Journal của tôi có tag setup + khung giờ để lọc được không?
- [ ] Lệnh gần nhất tôi thua — tôi có tăng size ngay sau đó không?
- [ ] Tôi có đang đặt "tầm quan trọng" lên kết quả ngắn hạn không?
- [ ] Trading của tôi đã buồn tẻ chưa?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| TradeZella | Journal + phân tích theo setup, khung giờ, R multiple | https://www.tradezella.com |
| Forex Factory | Lịch tin, lọc red folder | https://www.forexfactory.com |
| Bảng tính journal tự làm | Đủ dùng nếu có cột setup / giờ / bias / R | — |

## Tham khảo
- Quant Guild — *Why Poker Pros Make the Best Traders* (tilt, revenge trading): https://youtu.be/JuD3KGQhofw
- Casper SMC — *Easiest Way To Trade ICT in 2026* (IKEA effect, Lindy effect, dữ liệu bias)
- Norton, Mochon & Ariely — *The IKEA effect: When labor leads to love*, J. Consumer Psychology (2012)
- Douglas, M. — *Trading in the Zone*
- Kahneman, D. — *Thinking, Fast and Slow*

## Liên kết
[[Risk Management]] · [[Optimal Policy Function]] · [[Games of Chance vs Games of Incomplete Information]] · [[Quant Critique of ICT]] · [[Quant]]
