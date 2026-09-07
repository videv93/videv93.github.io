---
tags: [defi, amm]
status: evergreen
---
# AMM Mechanics

> AMM thay sổ lệnh bằng một **công thức**. Hệ quả quan trọng nhất với auditor: giá trong pool là **hàm của số dư pool**, và số dư pool thì ai cũng đổi được bằng một giao dịch. Vì vậy **giá pool không bao giờ là oracle**.

## 1. Constant product

`x · y = k`

Đổi `Δx` lấy `Δy`:
```
Δy = (y · Δx · (1 − fee)) / (x + Δx · (1 − fee))
```

| Đại lượng | Ý nghĩa |
|---|---|
| **Spot price** | `y / x` — giá tức thời, **thao túng được trong một tx** |
| **Slippage** | Chênh lệch giữa spot price và giá thực nhận, tăng theo kích thước lệnh |
| **Impermanent loss** | LP lỗ so với hold khi giá lệch |
| **k** | Chỉ tăng nhờ phí; giảm là có bug |

## 2. Ba thế hệ

| Thế hệ | Ví dụ | Đặc điểm ảnh hưởng bảo mật |
|---|---|---|
| Constant product | Uniswap V2 | Đơn giản; có TWAP tích luỹ trong core |
| **Concentrated liquidity** | Uniswap V3 | LP là NFT; **thanh khoản có thể cạn ở một dải giá** ⇒ dễ thao túng hơn V2 ở dải mỏng |
| Hook / custom curve | Uniswap V4, Balancer | **Hook là code bên thứ ba chạy trong luồng swap** ⇒ bề mặt tấn công mới |
| Stableswap | Curve | Curve phẳng quanh peg; lệch peg thì hành vi đổi đột ngột |

## 3. Vì sao spot price không phải oracle

```
1. Flash loan 10.000 ETH
2. Swap toàn bộ vào pool ETH/TOKEN nhỏ  → giá TOKEN tăng 50×
3. Gọi protocol nạn nhân, protocol đọc spot price → định giá tài sản thế chấp sai
4. Vay/rút vượt mức
5. Swap ngược, trả flash loan
```

Toàn bộ trong **một transaction**. Đây là mẫu tấn công phổ biến nhất trong lịch sử DeFi — xem [[Oracle Manipulation]] và [[Flash Loans]].

TWAP làm việc thao túng đắt hơn (phải giữ giá lệch qua nhiều block) nhưng **không** miễn nhiễm, đặc biệt trên chain có block rẻ hoặc pool thanh khoản mỏng.

## 4. Cạm bẫy khi audit contract tích hợp AMM

1. **`amountOutMin = 0`** ⇒ sandwich miễn phí. Tham số slippage phải do **người gọi** truyền, và phải có ý nghĩa.
2. **`deadline = block.timestamp`** ⇒ không phải deadline.
3. **Dùng `getReserves()` hoặc `slot0` làm giá.** `slot0.sqrtPriceX96` của V3 là spot price — thao túng được trong một tx.
4. **Tự tính output thay vì hỏi router** ⇒ sai với pool có fee khác, hoặc với token fee-on-transfer.
5. **Fee-on-transfer token trong swap** ⇒ số nhận khác số tính. Xem [[Weird ERC20 Tokens]].
6. **LP token định giá bằng `totalSupply` và reserve** ⇒ thao túng được; dùng công thức fair LP pricing.
7. **Read-only reentrancy** khi đọc giá/tỉ lệ của pool giữa lúc pool đang chuyển trạng thái. Xem [[Reentrancy]].
8. **Pool thanh khoản mỏng** ⇒ chi phí thao túng thấp hơn lợi ích. Luôn hỏi: *thao túng giá này tốn bao nhiêu, và thu về bao nhiêu?*

## 5. Checklist áp dụng

- [ ] Protocol có đọc giá từ AMM không? Spot hay TWAP? Cửa sổ TWAP bao lâu?
- [ ] Chi phí thao túng nguồn giá đó là bao nhiêu so với lợi ích tối đa thu được?
- [ ] Mọi swap có `amountOutMin` do người gọi truyền không? Có mặc định 0 ở đâu không?
- [ ] Deadline có thật không?
- [ ] Có định giá LP token không? Dùng công thức nào?
- [ ] Có hàm `view` nào của protocol bị bên khác dùng làm giá không? Nó có bị đọc giữa lúc state dở dang không?
- [ ] Token trong pool có fee-on-transfer hoặc rebasing không?
- [ ] Với V3/V4: dải thanh khoản có thể cạn không? Hook nào đang chạy trong luồng swap?

## Tham khảo

- [Uniswap V2 Core whitepaper](https://uniswap.org/whitepaper.pdf)
- [Uniswap V3 whitepaper](https://uniswap.org/whitepaper-v3.pdf) — concentrated liquidity
- [Uniswap — Oracle integration guide](https://docs.uniswap.org/concepts/protocol/oracle)
- [Alpha Finance — Fair LP token pricing](https://blog.alphaventuredao.io/fair-lp-token-pricing/)
- [Chainsecurity — Read-only reentrancy on Curve](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/)

## Liên kết

[[Oracles]] · [[Oracle Manipulation]] · [[Flash Loans]] · [[Front-running and MEV]] · [[Blockchain]]
