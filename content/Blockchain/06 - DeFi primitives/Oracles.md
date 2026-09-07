---
tags: [defi, oracle]
status: evergreen
---
# Oracles

> Oracle là chỗ dữ liệu ngoài chuỗi đi vào một hệ thống mà mọi thứ khác đều xác định. Nó vừa là **thành phần thiết yếu** vừa là **điểm tin cậy tập trung nhất** của phần lớn protocol DeFi.

## 1. Bốn loại

| Loại | Ví dụ | Độ trễ | Thao túng |
|---|---|---|---|
| **Push feed** | Chainlink Data Feeds | Cập nhật theo deviation/heartbeat | Khó — cần thoả hiệp mạng node |
| **Pull feed** | Pyth, Chainlink Data Streams | Người dùng tự đẩy giá kèm chứng minh | Người dùng chọn **thời điểm** ⇒ chọn giá có lợi |
| **TWAP on-chain** | Uniswap V3 observation | Trung bình theo thời gian | Đắt nhưng khả thi, nhất là pool mỏng |
| **Spot on-chain** | `getReserves()`, `slot0` | Tức thì | **Trong một transaction** — không dùng làm oracle |

## 2. Đọc Chainlink cho đúng

```solidity
(uint80 roundId, int256 answer, , uint256 updatedAt, uint80 answeredInRound)
    = feed.latestRoundData();

require(answer > 0, "gia am/khong hop le");
require(updatedAt != 0, "round chua hoan tat");
require(block.timestamp - updatedAt <= STALENESS_THRESHOLD, "gia cu");
require(answeredInRound >= roundId, "du lieu cu");
```

Bốn phép kiểm này bị bỏ sót trong hầu hết code mới. `latestAnswer()` (API cũ) **không có** thông tin thời gian — không bao giờ dùng.

Thêm: `decimals()` của feed **không phải lúc nào cũng là 8**; và mỗi feed có `heartbeat` riêng, nên `STALENESS_THRESHOLD` phải đặt theo từng feed.

## 3. Cạm bẫy

1. **Dùng spot price của AMM.** Xem [[AMM Mechanics]] và [[Oracle Manipulation]].
2. **Không kiểm staleness.** Feed đứng vì bất kỳ lý do gì ⇒ protocol định giá bằng số cũ.
3. **Không xử lý circuit breaker.** Chainlink có `minAnswer`/`maxAnswer`; khi giá thật vượt ra ngoài, feed trả về **giá cận** chứ không revert. Đây là gốc của vụ Venus/LUNA: LUNA về gần 0 nhưng feed vẫn trả `minAnswer = $0,10`.
4. **Feed L2 không kiểm sequencer uptime.** Trên Arbitrum/Optimism, phải đọc thêm `sequencerUptimeFeed`; sequencer vừa quay lại thì giá cũ vẫn còn.
5. **Trộn nguồn với độ trễ khác nhau** cho tài sản thế chấp và nợ.
6. **Không có fallback.** Feed chính chết thì sao? Fallback có tệ hơn không có không?
7. **Pull oracle cho người dùng chọn thời điểm** ⇒ chọn giá có lợi cho họ trong cửa sổ hợp lệ.
8. **Giả định `decimals == 8`** hoặc `== 18`. Xem [[Units and Global Variables]].

## 4. Thiết kế phòng thủ

| Biện pháp | Chống được gì |
|---|---|
| Nhiều nguồn + lấy trung vị | Một nguồn sai |
| Ngưỡng lệch tối đa giữa hai nguồn ⇒ dừng | Thao túng một nguồn |
| Giới hạn tốc độ đổi giá (circuit breaker riêng) | Nhảy giá đột ngột |
| TWAP thay vì spot khi bắt buộc dùng on-chain | Thao túng trong một tx |
| Staleness threshold theo từng feed | Feed đứng |
| Chế độ khẩn cấp khi mọi nguồn không tin được | Thảm hoạ |

## 5. Checklist áp dụng

- [ ] Nguồn giá là gì cho **từng** tài sản? Liệt kê thành bảng.
- [ ] Có kiểm `answer > 0`, `updatedAt`, staleness, và `answeredInRound` không?
- [ ] `STALENESS_THRESHOLD` đặt theo heartbeat thật của từng feed chứ?
- [ ] Có xử lý `minAnswer`/`maxAnswer` (circuit breaker) không?
- [ ] Trên L2: có kiểm sequencer uptime feed không?
- [ ] `decimals()` có được đọc động không, hay hardcode?
- [ ] Thao túng nguồn giá này tốn bao nhiêu? So với lợi ích tối đa thu được?
- [ ] Có fallback không? Fallback có yếu hơn nguồn chính không?
- [ ] Feed chết vĩnh viễn thì protocol làm gì? Có ai dừng được không?
- [ ] Với pull oracle: người dùng chọn được thời điểm đẩy giá không? Cửa sổ hợp lệ bao lâu?

## Tham khảo

- [Chainlink — Data Feeds API reference](https://docs.chain.link/data-feeds/api-reference)
- [Chainlink — L2 Sequencer Uptime Feeds](https://docs.chain.link/data-feeds/l2-sequencer-feeds)
- [Pyth Network docs](https://docs.pyth.network/)
- [Uniswap V3 Oracle](https://docs.uniswap.org/concepts/protocol/oracle)
- [Rekt — Venus / LUNA](https://rekt.news/venus-blizz-rekt/) — circuit breaker của feed

## Liên kết

[[Oracle Manipulation]] · [[AMM Mechanics]] · [[Lending and Liquidation]] · [[Composability Risk]] · [[Blockchain]]
