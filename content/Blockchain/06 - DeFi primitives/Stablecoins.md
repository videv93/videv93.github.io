---
tags: [defi, stablecoin]
status: evergreen
---
# Stablecoins

> Stablecoin là **một lời hứa về giá** cộng với một cơ chế thực thi lời hứa đó. Với auditor, câu hỏi duy nhất là: **cơ chế nào giữ peg, và nó hỏng ở điều kiện thị trường nào?**

## 1. Bốn mô hình

| Mô hình | Ví dụ | Giữ peg bằng | Hỏng khi |
|---|---|---|---|
| **Fiat-backed** | USDC, USDT | Redemption 1:1 với tổ chức phát hành | Ngân hàng dự trữ sập (USDC 3/2023), bị đóng băng |
| **Crypto-overcollateralized** | DAI, LUSD | Thanh lý + thế chấp vượt mức | Giá thế chấp sập nhanh hơn thanh lý kịp |
| **Algorithmic / seigniorage** | UST (đã chết) | Đổi qua token vốn hoá | **Vòng xoáy tử thần** — xem mục 3 |
| **Delta-neutral / synthetic** | USDe | Vị thế short trên sàn phái sinh | Funding rate âm kéo dài, rủi ro đối tác |

## 2. Cái auditor cần kiểm ở mỗi mô hình

| Mô hình | Điểm kiểm |
|---|---|
| Fiat-backed | **Blocklist**, pausable, upgradeable, `decimals` ≠ 18 — xem [[Weird ERC20 Tokens]] |
| Overcollateralized | Oracle, đường thanh lý, tham số thế chấp, nợ xấu — xem [[Lending and Liquidation]] |
| Algorithmic | Cơ chế mint/burn có phản xạ không? Có giới hạn tốc độ không? |
| Synthetic | Rủi ro sàn tập trung, funding, và nó **không** thực sự on-chain |

## 3. Vòng xoáy tử thần, ngắn gọn

```
Giá stable < peg
  → arbitrage burn stable, mint token vốn hoá
    → cung token vốn hoá tăng → giá nó giảm
      → niềm tin vào peg giảm → bán tiếp stable
        → quay lại bước 1, nhanh hơn
```

Cơ chế này **hoạt động đúng** khi thị trường bình tĩnh và **tăng tốc sự sụp đổ** khi không. Đây là ví dụ rõ nhất của [[Economic Attacks]]: code chạy đúng như thiết kế, thiết kế mới là chỗ sai.

## 4. Cạm bẫy khi tích hợp stablecoin

1. **Giả định 1 stable = \$1.** Depeg xảy ra thật (USDC về \$0,87 vào 3/2023). Mọi công thức hardcode `1e18` cho stable là sai.
2. **`decimals` khác nhau**: USDC 6, DAI 18, GUSD 2.
3. **Blocklist** ⇒ push payment DoS. Xem [[Denial of Service Patterns]].
4. **Upgradeable** ⇒ hành vi đổi sau audit.
5. **Không có oracle cho stable.** Nếu protocol giả định peg thay vì đọc giá, depeg thành lỗ hổng.
6. **Rebasing stable** (aUSDC, stETH-like) ⇒ số dư đổi mà không có transfer.
7. **Approve non-zero → non-zero revert** (USDT).
8. **Depeg lên trên** cũng nguy hiểm: nếu protocol cho vay 1:1 thì có arbitrage lấy tiền ra.

## 5. Checklist áp dụng

- [ ] Protocol có giả định stable = \$1 ở đâu không? Có đọc giá thật không?
- [ ] Điều gì xảy ra nếu stable depeg 10%? 50%? Cả hai chiều?
- [ ] Có xử lý `decimals` động không?
- [ ] Stable trong scope có blocklist / pausable / upgradeable không? Đã ghi vào báo cáo chưa?
- [ ] Có push payment nào bị blocklist chặn không?
- [ ] Với stable thuật toán: cơ chế có phản xạ (reflexive) không? Có giới hạn tốc độ mint/burn không?
- [ ] Có kịch bản bank run được mô hình hoá chưa?
- [ ] Thanh khoản thoát trong khủng hoảng đến từ đâu?

## Tham khảo

- [MakerDAO documentation](https://docs.makerdao.com/) — mô hình overcollateralized
- [Liquity whitepaper](https://docs.liquity.org/) — thanh lý không cần oracle liên tục
- [Ethena — USDe documentation](https://docs.ethena.fi/) — mô hình delta-neutral
- [Rekt — Terra / UST](https://rekt.news/luna-terra-collapse/) — vòng xoáy tử thần thực tế
- [Circle — USDC depeg post-mortem (3/2023)](https://www.circle.com/blog/)

## Liên kết

[[Oracles]] · [[Economic Attacks]] · [[Weird ERC20 Tokens]] · [[Lending and Liquidation]] · [[Blockchain]]
