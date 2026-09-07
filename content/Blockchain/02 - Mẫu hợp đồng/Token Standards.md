---
tags: [solidity, token, chuẩn]
status: evergreen
---
# Token Standards

> Chuẩn token định nghĩa **giao diện**, không định nghĩa **hành vi**. Mọi lỗ hổng tích hợp token đều nằm ở khoảng trống giữa hai thứ đó.

## 1. Bốn chuẩn cần thuộc

| Chuẩn | Mô hình | Hàm nguy hiểm nhất | Bẫy chính |
|---|---|---|---|
| **ERC-20** | Số dư fungible | `transferFrom` | Không bắt buộc `return bool`; approve race |
| **ERC-721** | NFT, `tokenId` duy nhất | `safeTransferFrom` | **Callback `onERC721Received` = reentrancy** |
| **ERC-1155** | Nhiều loại, batch | `safeBatchTransferFrom` | Callback + batch làm gas không đoán trước |
| **ERC-4626** | Vault sinh lời | `deposit`/`redeem` | Inflation attack, làm tròn — xem [[Yield Vaults]] |

## 2. Chỗ chuẩn *không* quy định

Đây là bảng quan trọng nhất của note:

| Câu hỏi | ERC-20 nói gì | Thực tế |
|---|---|---|
| `transfer` fail thì làm gì? | "SHOULD throw" | USDT **không** return; một số token return `false` |
| Số token nhận có bằng số gửi không? | Không nói | Fee-on-transfer thì không |
| Số dư có tự đổi không? | Không nói | Rebasing token (stETH, AMPL) thì có |
| `decimals` là bắt buộc? | **Optional** | Nhiều token thiếu → `IERC20Metadata` revert |
| Có ai bị chặn không? | Không nói | USDC/USDT có blocklist |
| `approve` từ non-zero sang non-zero? | Không nói | USDT **revert** |

⇒ Toàn bộ bảng này được triển khai chi tiết ở [[Weird ERC20 Tokens]].

## 3. Callback: tiện lợi đổi lấy reentrancy

`safeTransferFrom` của ERC-721/1155 **gọi vào contract người nhận**. Đó là một lời gọi ra ngoài nằm giữa hàm của bạn:

```solidity
_balances[to] += 1;
_owners[tokenId] = to;
IERC721Receiver(to).onERC721Received(...);   // ← attacker chạy code ở đây
_afterTransfer(tokenId);                      // ← state chưa xong
```

Mọi hàm mint/transfer NFT phải hoàn tất **toàn bộ** thay đổi state trước callback (CEI). Xem [[Reentrancy]].

ERC-777 và ERC-1363 còn thêm hook vào cả token fungible — đây là nguồn của vụ imBTC/Uniswap V1.

## 4. Hai mẫu đi kèm

**Approve → transferFrom** là mẫu hai bước, và giữa hai bước có mempool:
- **Approve race**: đổi allowance từ 100 → 50, người được duyệt front-run để tiêu 100 rồi tiêu thêm 50. Dùng `increaseAllowance`/`decreaseAllowance` hoặc set về 0 trước.
- **Infinite approval** tiện cho UX nhưng biến mọi bug của spender thành bug của bạn. Xem [[Composability Risk]].

**Permit (EIP-2612)** gộp approve vào chữ ký ⇒ chuyển vấn đề sang [[Signatures and EIP-712]].

## 5. Cạm bẫy

1. **Dùng `IERC20.transfer` trần thay vì `SafeERC20.safeTransfer`.** Với token không return, ABI decode revert; với token return `false`, code bỏ qua và **coi như thành công**.
2. **Kế toán bằng `balanceOf(address(this))`** — sai với fee-on-transfer, rebasing, và với ETH gửi cưỡng bức bằng `selfdestruct`.
3. **Giả định `decimals == 18`.** Xem [[Units and Global Variables]].
4. **`tokenURI` tuỳ ý người dùng.** Coded Estate M-08 là một tranh luận dài về đúng điểm này: warden nnez cho rằng đây là vấn đề frontend, judge giữ Medium vì ERC-721 *có* quy định metadata là JSON và các nền tảng lớn đã từng bị XSS/JSON injection qua đó. Xem [[Metadata and Off-chain Trust]].
5. **Không cấm `send_nft`/đường transfer thứ hai.** Coded Estate H-08: contract có hai đường chuyển token (`transfer_nft` có thanh toán, `send_nft` **không có**). Attacker được approve rồi đi cửa sau. **Mỗi khi có hai đường làm cùng một việc, một trong hai sẽ thiếu kiểm tra.**
6. **Ép buộc `supportsInterface`** (ERC-165) không đảm bảo gì — contract có thể trả `true` cho mọi thứ.

## 6. Checklist áp dụng

- [ ] Mọi lời gọi token có qua `SafeERC20` không?
- [ ] Contract có nhận token tuỳ ý người dùng chọn không? Nếu có, đã đọc [[Weird ERC20 Tokens]] chưa?
- [ ] Kế toán dựa vào biến nội bộ hay `balanceOf`? Nếu `balanceOf`, có đo delta trước/sau không?
- [ ] Mọi hàm có callback (`safeTransferFrom`, `onERC721Received`, hook ERC-777): state đã hoàn tất trước callback chưa?
- [ ] Có **bao nhiêu** đường để token rời khỏi contract? Mỗi đường có đủ kiểm tra như nhau không?
- [ ] `tokenURI` do ai đặt? Frontend có sanitize không? Điều đó có được ghi vào tài liệu không?
- [ ] Có giả định `decimals` nào không?

## Tham khảo

- [EIP-20](https://eips.ethereum.org/EIPS/eip-20) · [EIP-721](https://eips.ethereum.org/EIPS/eip-721) · [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) · [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)
- [EIP-2612: Permit](https://eips.ethereum.org/EIPS/eip-2612)
- [OpenZeppelin SafeERC20](https://docs.openzeppelin.com/contracts/api/token/erc20#SafeERC20)
- [d-xo/weird-erc20](https://github.com/d-xo/weird-erc20) — danh mục hành vi lệch chuẩn
- [Coded Estate H-08](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/3) — đường transfer thứ hai thiếu thanh toán

## Liên kết

[[Weird ERC20 Tokens]] · [[Reentrancy]] · [[Yield Vaults]] · [[Metadata and Off-chain Trust]] · [[Blockchain]]
