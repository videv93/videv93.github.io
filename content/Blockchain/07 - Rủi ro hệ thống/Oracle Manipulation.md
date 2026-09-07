---
tags: [defi, rủi-ro, oracle]
status: evergreen
---
# Oracle Manipulation

> Lớp tấn công **làm mất nhiều tiền nhất** trong lịch sử DeFi, và cũng là lớp mà không công cụ static analysis nào tìm được — vì code hoàn toàn đúng. Sai nằm ở việc **tin vào một con số mà kẻ tấn công đặt được**.

## 1. Công thức chung

```
1. Vay vốn lớn (flash loan — không cần vốn thật)
2. Đẩy giá của nguồn mà protocol nạn nhân đọc
3. Gọi protocol nạn nhân → nó định giá sai
4. Rút giá trị (vay quá mức, mint quá nhiều share, thanh lý sai)
5. Đẩy giá về, trả flash loan
```

Toàn bộ trong một transaction ⇒ **không có rủi ro giá cho attacker** và không có cửa sổ cho ai can thiệp.

## 2. Ba nguồn hay bị thao túng

| Nguồn | Cách thao túng | Chi phí |
|---|---|---|
| **Spot price AMM** | Một swap lớn | Chỉ phí swap + slippage — rất rẻ ở pool mỏng |
| **TWAP cửa sổ ngắn** | Giữ giá lệch qua vài block | Đắt hơn, nhưng khả thi; rẻ trên L2 |
| **Tỉ lệ share/asset của vault** | Donate thẳng vào vault | Xem [[Yield Vaults]] |

Nguồn thứ ba hay bị bỏ sót: nếu protocol A đọc `convertToAssets()` của vault B làm giá, thì mọi cách thao túng kế toán của B trở thành cách thao túng A.

## 3. Phép tính phải làm mỗi lần

> [!warning] Câu hỏi định lượng
> **Chi phí thao túng nguồn giá × thời gian cần giữ, so với lợi ích tối đa rút ra được.**
> Nếu chi phí < lợi ích, đó là finding — bất kể "đây là Chainlink/TWAP/tiêu chuẩn ngành".

Ví dụ tính nhanh cho TWAP 30 phút của một pool \$500k:
- Cần đẩy giá 2× và giữ 30 phút ⇒ chi phí vốn + arbitrage ăn lại ⇒ ước tính vài chục nghìn đô.
- Nếu protocol cho vay tối đa \$5 triệu dựa vào giá đó ⇒ **finding High**.

## 4. Bốn biến thể ngoài mẫu cơ bản

| Biến thể | Cơ chế |
|---|---|
| **Read-only reentrancy** | Đọc giá của pool giữa lúc pool đang chuyển trạng thái (Curve) |
| **Circuit breaker của feed** | Giá thật vượt `minAnswer` ⇒ feed trả giá cận, không revert (Venus/LUNA) |
| **Sequencer L2 down** | Feed cũ vẫn đọc được sau khi sequencer quay lại |
| **Chọn thời điểm với pull oracle** | Người dùng đẩy giá có lợi trong cửa sổ hợp lệ |

## 5. Phòng thủ

1. **Nhiều nguồn độc lập + lấy trung vị**, cộng ngưỡng lệch tối đa ⇒ vượt ngưỡng thì dừng.
2. **Không bao giờ dùng spot on-chain.**
3. **TWAP với cửa sổ đủ dài cho pool đủ sâu** — cả hai điều kiện.
4. **Giới hạn tốc độ đổi giá** ở tầng protocol, không phụ thuộc feed.
5. **Giới hạn giá trị rút ra được trên một block/khoảng thời gian.**
6. **Kiểm staleness, `minAnswer`/`maxAnswer`, sequencer uptime.** Xem [[Oracles]].
7. **Chế độ khẩn cấp** khi mọi nguồn bất thường.

## 6. Checklist áp dụng

- [ ] Liệt kê **mọi** nguồn giá, kể cả gián tiếp (tỉ lệ vault, `totalSupply`, LP token).
- [ ] Với mỗi nguồn: chi phí thao túng là bao nhiêu? Lợi ích tối đa là bao nhiêu? Viết ra con số.
- [ ] Có nguồn nào là spot on-chain không?
- [ ] TWAP cửa sổ bao lâu? Pool sâu bao nhiêu? Trên chain nào (block time)?
- [ ] Có hàm `view` nào của protocol bị bên ngoài dùng làm giá không? Có bị đọc giữa lúc state dở dang không?
- [ ] Có ngưỡng lệch giữa các nguồn không? Vượt ngưỡng thì làm gì?
- [ ] Có giới hạn giá trị rút ra trên một block không?
- [ ] Đã kiểm staleness / circuit breaker / sequencer uptime chưa?
- [ ] Có chế độ dừng khẩn cấp không? Ai kích hoạt được?

## Tham khảo

- [Chainsecurity — Curve read-only reentrancy post-mortem](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/)
- [Rekt — Mango Markets](https://rekt.news/mango-markets-rekt/) — thao túng giá oracle trên sàn perp
- [Rekt — Venus / LUNA](https://rekt.news/venus-blizz-rekt/) — circuit breaker của feed
- [Uniswap — Oracle integration guide](https://docs.uniswap.org/concepts/protocol/oracle)
- [Euler — Oracle risk framework](https://docs.euler.finance/)

## Liên kết

[[Oracles]] · [[Flash Loans]] · [[AMM Mechanics]] · [[Economic Attacks]] · [[Blockchain]]
