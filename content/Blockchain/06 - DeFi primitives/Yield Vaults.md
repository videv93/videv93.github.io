---
tags: [defi, vault, erc4626]
status: evergreen
---
# Yield Vaults

> Vault đổi **asset** lấy **share**. Toàn bộ bảo mật của nó nằm ở một câu: **tỉ lệ share/asset phải không thao túng được**. ERC-4626 chuẩn hoá giao diện — nó không chuẩn hoá được chỗ khó đó.

## 1. ERC-4626 trong một bảng

| Hàm | Nghĩa |
|---|---|
| `deposit(assets)` → shares | Vào theo số asset |
| `mint(shares)` → assets | Vào theo số share muốn có |
| `withdraw(assets)` → shares | Ra theo số asset |
| `redeem(shares)` → assets | Ra theo số share |
| `convertToShares` / `convertToAssets` | **Không** tính phí — chỉ để hiển thị |
| `previewDeposit` / `previewRedeem` | Có tính phí — dùng để tích hợp |
| `totalAssets()` | Tổng tài sản quản lý — **chỗ dễ thao túng nhất** |

Quy tắc làm tròn của chuẩn: **luôn làm tròn có lợi cho vault**, tức bất lợi cho người dùng. `deposit` làm tròn share **xuống**; `withdraw` làm tròn share cần đốt **lên**. Ngược lại là rò rỉ.

## 2. Inflation attack (donation attack)

Kinh điển, và vẫn xuất hiện:

```
1. Vault rỗng. Attacker deposit 1 wei → nhận 1 share.
2. Attacker "donate" 10.000 token thẳng vào vault bằng transfer
   (totalAssets tăng, totalSupply share KHÔNG đổi).
3. Nạn nhân deposit 19.999 token
   → shares = 19.999 × 1 / 10.001 = 1 (làm tròn xuống)
4. Attacker redeem 1 share → lấy ~50% tổng tài sản.
```

Ba biện pháp:

| Biện pháp | Cách |
|---|---|
| **Virtual shares/assets** | Cộng offset ảo vào cả tử và mẫu (OpenZeppelin v4.9+ làm sẵn) |
| **Dead shares** | Mint một lượng share ban đầu cho `address(0)` |
| **Kế toán nội bộ** | `totalAssets()` dùng biến nội bộ, không dùng `balanceOf(this)` |

Biện pháp thứ ba mạnh nhất và cũng chặn được cả donation lẫn ETH gửi cưỡng bức bằng `selfdestruct`. Xem [[Ethereum Account Model]].

## 3. Cạm bẫy

1. **`totalAssets()` = `token.balanceOf(address(this))`** ⇒ mở cửa cho donation.
2. **Làm tròn sai phía** ⇒ rò rỉ từng wei, nhân với hàng triệu giao dịch. Xem [[Integer and Precision Bugs]].
3. **Vault rỗng có tỉ lệ đặc biệt** — đường code `totalSupply == 0` phải được xử lý riêng và test riêng.
4. **Strategy thua lỗ** ⇒ `totalAssets` giảm ⇒ ai chịu? Người rút sau chịu hết là bất công và tạo bank run.
5. **Fee tính trên lãi hay trên tổng?** Fee tính sai làm share dilute âm thầm.
6. **Vault lồng vault** ⇒ mỗi tầng có sai số làm tròn riêng, và mỗi tầng là một [[Composability Risk]].
7. **`preview*` không khớp hành vi thật** ⇒ mọi integrator tính sai. Chuẩn yêu cầu `previewDeposit` phải **≤** số share thật nhận được.
8. **Rút hàng loạt (bank run)** khi strategy không thanh khoản ngay — có hàng đợi rút không?
9. **Token fee-on-transfer trong vault** ⇒ số nhận ≠ số ghi sổ. Xem [[Weird ERC20 Tokens]].

## 4. Checklist áp dụng

- [ ] `totalAssets()` dùng kế toán nội bộ hay `balanceOf`? Donate vào được không?
- [ ] Có bảo vệ inflation attack không (virtual shares / dead shares / kế toán nội bộ)?
- [ ] Mọi phép làm tròn có lợi cho vault chứ không có lợi cho người dùng chứ?
- [ ] Đường code `totalSupply == 0` có được xử lý và test riêng không?
- [ ] `preview*` có khớp chính xác kết quả thật của `deposit`/`redeem` không?
- [ ] Strategy lỗ thì tổn thất phân bổ thế nào? Có tạo động cơ rút chạy trước không?
- [ ] Fee tính trên gì? Có làm dilute share ngoài ý muốn không?
- [ ] Rút hàng loạt có xử lý được không? Có hàng đợi/giới hạn không?
- [ ] Token underlying có fee-on-transfer hoặc rebasing không?
- [ ] Có ai đọc `convertToAssets()` của vault này làm oracle không? (Nếu có: read-only reentrancy — xem [[Reentrancy]])

## Tham khảo

- [EIP-4626: Tokenized Vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [OpenZeppelin — ERC4626 và virtual shares](https://docs.openzeppelin.com/contracts/api/token/erc20#ERC4626)
- [OpenZeppelin — ERC4626 inflation attack](https://docs.openzeppelin.com/contracts/5.x/erc4626)
- [a16z — ERC-4626 rounding and security](https://a16zcrypto.com/posts/article/generalized-erc4626/)

## Liên kết

[[Integer and Precision Bugs]] · [[Token Standards]] · [[Composability Risk]] · [[Reentrancy]] · [[Blockchain]]
