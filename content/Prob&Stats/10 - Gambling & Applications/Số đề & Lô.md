---
tags: [probability, gambling, application, vietnam]
status: growing
---
# Số đề & Lô

> Trò cờ bạc phổ biến nhất Việt Nam, dựa trên xổ số kiến thiết. Toán học của nó đơn giản đến mức có thể tính EV trong hai dòng — và kết quả là biên nhà cái lớn hơn mọi trò casino.

> ⚠️ Ghi chú: số đề là hoạt động **bất hợp pháp** ở Việt Nam. Note này phân tích cấu trúc xác suất, không hướng dẫn tham gia.

## 1. Cơ chế (từ seed Wikipedia)

Xổ số kiến thiết do các công ty địa phương ("đài") tổ chức, tần suất khác nhau tuỳ nơi, nhưng đều dựa trên **các chữ số tận cùng** (từ 2 đến 5 hoặc 6) của vé số để tính thưởng.

Trò cờ bạc này dựa vào **hai con số cuối** của tất cả các giải:
- **Đề** — hai số cuối của **giải đặc biệt**
- **Lô** — hai số cuối của **các giải còn lại**

Mỗi ngày cả miền Bắc và miền Nam đều có một đài quay số. Miền Bắc quay chung ở Hà Nội (xổ số kiến thiết miền Bắc) nên gọi là đài miền Bắc; miền Nam chơi theo từng đài theo ngày (thứ 2 — TP.HCM, thứ 3 — Vũng Tàu, …).

## 2. Xác suất và EV — đánh đề

Không gian mẫu: 100 cặp số $00$–$99$, đồng khả năng (giả định máy quay công bằng) → [[Naive Definition of Probability]].

$$P(\text{trúng}) = \frac{1}{100} = 1\%$$

Tỉ lệ trả thường gặp: **1 ăn 70** (đặt 1 đồng, trúng nhận 70).

$$EV = \frac{1}{100}\times(+69) + \frac{99}{100}\times(-1) = 0.69 - 0.99 = \boxed{-0.30}$$

**House edge 30%.** Với tỉ lệ 1 ăn 80: $EV = 0.80-0.99 = -0.19$ → 19%.

| Tỉ lệ trả | House edge |
|---|---|
| 1 ăn 70 | 30% |
| 1 ăn 75 | 25% |
| 1 ăn 80 | 20% |
| 1 ăn 99 | 1% (hoà vốn về lý thuyết — không tồn tại thực tế) |

Điểm hoà vốn là **1 ăn 100**. Mọi tỉ lệ dưới đó là biên của chủ đề.

## 3. Đánh lô

Miền Bắc có 27 giải (ngoài đặc biệt), tức 27 cặp số hai chữ số được quay.

$$P(\text{một số cụ thể xuất hiện ít nhất 1 lần}) \approx 1-\left(\frac{99}{100}\right)^{27} \approx 23.6\%$$

(Xấp xỉ, coi 27 lần quay độc lập; thực tế các giải quay không hoàn lại theo cơ chế riêng.)

Số lần xuất hiện kỳ vọng: $27/100 = 0.27$ — dùng [[Linearity of Expectation]] với 27 indicator, không cần độc lập → [[Indicator Random Variables]].

Tỉ lệ chơi lô thường tính theo "điểm": đặt ~23.000đ/điểm, trúng ăn 80.000đ/điểm.
$$EV \approx 0.27\times 80{.}000 - 23{.}000 = 21{.}600 - 23{.}000 = -1{.}400$$
→ house edge $\approx 6\%$ trên mỗi điểm đặt. Thấp hơn đề nhưng vẫn âm — và con số cụ thể thay đổi theo chủ đề.

## 4. So sánh với các trò khác

| Trò | House edge |
|---|---|
| Blackjack tối ưu | 0.5% |
| Roulette châu Âu | 2.70% → [[Roulette]] |
| Roulette Mỹ | 5.26% |
| **Lô** | ~5–8% |
| Slot | 2–15% |
| **Đề (1 ăn 70)** | **~30%** |
| Xổ số kiến thiết chính thức | 40–60% |

Đánh đề tệ hơn mọi trò casino, chỉ đỡ hơn mua vé số.

## 5. Cạm bẫy tư duy

1. **"Số này lâu chưa về".** Gambler's fallacy — các lần quay độc lập, memoryless → [[Expected Value in Gambling]].
2. **Thống kê "cầu", "bạch thủ", "lô gan".** Nếu máy quay công bằng, mọi mẫu hình đều là nhiễu. Nếu **không** công bằng thì chủ đề biết trước bạn.
3. **Bỏ qua rủi ro đối tác.** Chủ đề có thể quỵt, và không có cơ chế pháp lý nào bảo vệ — đây là rủi ro *lớn hơn* cả house edge.
4. **Nhớ lần trúng, quên chuỗi thua.** Availability bias.
5. **Đánh nhiều số để "tăng khả năng trúng".** Đánh 10 số nâng $P$ lên 10%, nhưng EV vẫn $-30\%$ vì [[Linearity of Expectation]] — cộng nhiều cược âm vẫn âm.
6. **Nhồi tiền để gỡ.** Sunk cost + [[Gambler's Ruin]] với vốn nhỏ hơn nhiều lần đối thủ.
7. **Nghĩ "1 ăn 70" là tỉ lệ tốt** vì con số lớn. So với ngưỡng hoà vốn 100 mới thấy được.

## 6. Checklist phân tích bất kỳ trò cược số nào
- [ ] Không gian mẫu có bao nhiêu kết quả? Có đồng khả năng không?
- [ ] Tỉ lệ trả thưởng là bao nhiêu? Ngưỡng hoà vốn là bao nhiêu?
- [ ] EV mỗi đồng cược = ?
- [ ] House edge so với các trò khác thế nào?
- [ ] Có rủi ro đối tác (không trả tiền) không?
- [ ] Có rủi ro pháp lý không?
- [ ] Nếu vẫn chơi: ngân sách coi là chi phí giải trí là bao nhiêu?

## Tham khảo
- Wikipedia (tiếng Việt) — *Số đề*: https://vi.wikipedia.org/wiki/S%E1%BB%91_%C4%91%E1%BB%81
- Wikipedia (tiếng Việt) — *Xổ số kiến thiết miền Bắc*: https://vi.wikipedia.org/wiki/X%E1%BB%95_s%E1%BB%91_ki%E1%BA%BFn_thi%E1%BA%BFt_mi%E1%BB%81n_B%E1%BA%AFc
- Wikipedia — *Numbers game* (trò tương đương ở Mỹ): https://en.wikipedia.org/wiki/Numbers_game
- Wizard of Odds — *Lottery*: https://wizardofodds.com/games/lottery/

## Liên kết
[[Expected Value in Gambling]] · [[Roulette]] · [[Naive Definition of Probability]] · [[Linearity of Expectation]] · [[Indicator Random Variables]] · [[Gambler's Ruin]] · [[Prob&Stats]]
