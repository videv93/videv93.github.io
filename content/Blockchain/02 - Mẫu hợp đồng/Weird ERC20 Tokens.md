---
tags: [solidity, token, lỗ-hổng]
status: evergreen
---
# Weird ERC20 Tokens

> Nếu protocol của bạn nhận **token tuỳ ý**, thì mọi hành vi lệch chuẩn trong bảng dưới đây là một phần đặc tả của bạn — dù bạn có muốn hay không. Nếu bạn dùng allowlist, thì allowlist đó là một cam kết vận hành phải được ghi ra.

## 1. Bảng hành vi lệch chuẩn

| Hành vi | Token ví dụ | Phá cái gì | Cách xử lý |
|---|---|---|---|
| **Không return value** | USDT, BNB | `abi.decode` revert | `SafeERC20` |
| **Return `false` thay vì revert** | ZRX cũ | Code bỏ qua ⇒ "chuyển thành công" mà không có tiền | `SafeERC20` |
| **Fee-on-transfer** | STA, PAXG (tuỳ chế độ) | Nhận ít hơn gửi ⇒ kế toán lệch, vault mất tiền | Đo `balanceOf` **trước và sau** |
| **Rebasing** | stETH, AMPL | Số dư đổi mà không có transfer | Lưu share, không lưu amount |
| **Blocklist** | USDC, USDT | Transfer tới địa chỉ bị chặn revert ⇒ **DoS** | Pull thay vì push |
| **Pausable** | nhiều stablecoin | Toàn bộ protocol đứng | Tính vào kịch bản vận hành |
| **Decimals ≠ 18** | USDC (6), WBTC (8), GUSD (2) | Sai 12 bậc độ lớn | Chuẩn hoá rõ ràng |
| **Decimals đổi được** | vài token upgradeable | Cache decimals thành sai | Không cache |
| **Approve non-zero → non-zero revert** | USDT | `approve` mới thất bại | Set 0 trước |
| **Địa chỉ nhiều entry point** | TUSD (proxy cũ) | Blocklist/kế toán theo địa chỉ bị bypass | |
| **Revert khi transfer 0** | LEND cũ | Đường code hợp lệ bị chặn | Bỏ qua khi `amount == 0` |
| **Revert khi approve/transfer tới `address(0)`** | nhiều | Đường "đốt" fail | |
| **Upgradeable** | USDC, USDT | Hành vi **đổi sau khi bạn audit** | Rủi ro vận hành, phải ghi vào báo cáo |
| **Token có callback** (ERC-777) | imBTC | **Reentrancy trên token fungible** | Guard |

## 2. Bằng chứng từ seed: bảng này là bảng của một audit thật

Kakarot đưa hẳn *"ERC-20 token behaviors in scope"* vào README, và Zenith lập bảng đối chiếu từng hành vi với trạng thái hỗ trợ:

| Hành vi | Kết quả trên Kakarot |
|---|---|
| Missing return values | Hỗ trợ |
| Pausability / blocklist / revert-on-zero / revert-to-zero-address / revert on large approvals | **RPC-level revert** |
| Doesn't revert on failure | Không hỗ trợ (finding riêng) |

Và điều đáng học nhất nằm ở **mitigation review**: bản vá PR-1616 thêm kiểm tra return value để hỗ trợ token "return `false`" — nhưng làm vậy lại **phá vỡ hỗ trợ cho token không return gì cả**. Zenith ghi nhận: muốn đỡ cả hai thì phải kiểm `returndatasize` **trước** khi decode.

> [!warning] Hai hành vi lệch chuẩn có thể loại trừ nhau
> "Hỗ trợ mọi ERC-20" không phải một trạng thái đạt được bằng cách thêm kiểm tra. Nó là một **tập yêu cầu mâu thuẫn** phải được thu hẹp bằng quyết định sản phẩm. Câu trả lời cuối của team Kakarot — *"mọi token dùng cho DualVMToken sẽ được kiểm tra tương thích trước khi deploy"* — là câu trả lời đúng: **chuyển từ đảm bảo kỹ thuật sang quy trình vận hành, và nói rõ ra.**

## 3. Mẫu code an toàn

```solidity
// ✅ đo delta thật nhận được — đúng với fee-on-transfer
uint256 before = token.balanceOf(address(this));
token.safeTransferFrom(msg.sender, address(this), amount);
uint256 received = token.balanceOf(address(this)) - before;

// ✅ pull thay vì push — blocklist không DoS được cả hệ thống
mapping(address => uint256) public claimable;
function claim() external {
    uint256 amt = claimable[msg.sender];
    claimable[msg.sender] = 0;
    token.safeTransfer(msg.sender, amt);
}
```

## 4. Cạm bẫy

1. **`safeTransfer` không cứu được fee-on-transfer.** Nó chỉ xử lý return value.
2. **Đo delta không cứu được rebasing.** Rebasing đổi số dư *giữa hai transaction*, không phải trong transaction.
3. **Allowlist token là bề mặt quản trị.** Ai thêm được token vào list? Có timelock không? Thêm nhầm một token độc = mất tiền. Xem [[Governance Attacks]].
4. **Token độc hại tự viết**: `transfer` có thể re-enter, trả về số liệu giả, hoặc tốn gas tuỳ ý. Nếu ai cũng list được token thì mọi giả định đều mất.
5. **Đổi denom khi còn nghĩa vụ dang dở.** Coded Estate H-06 và H-07 là hai biến thể của cùng một lỗi: contract cho phép đổi **loại token thanh toán** trong khi vẫn còn bid/rental chưa quyết toán, nên attacker đặt cọc bằng token rẻ rồi rút bằng token đắt. *"Loại token"* là một phần của trạng thái, và nó phải bị khoá cùng với phần còn lại.

## 5. Checklist áp dụng

- [ ] Protocol nhận token tuỳ ý hay allowlist? Ai quản allowlist?
- [ ] Mỗi hành vi trong bảng mục 1: protocol có chịu được không? Ghi ra thành bảng như Kakarot đã làm.
- [ ] Có đo delta `balanceOf` trước/sau ở mọi đường nhận token không?
- [ ] Có mẫu push payment nào có thể bị blocklist chặn không? Có chuyển được sang pull không?
- [ ] Loại token thanh toán có bị khoá trong suốt vòng đời một nghĩa vụ không?
- [ ] Có cache `decimals` không?
- [ ] Token trong scope có upgradeable không? Điều đó đã ghi vào báo cáo chưa?

## Tham khảo

- [d-xo/weird-erc20](https://github.com/d-xo/weird-erc20) — danh mục chuẩn ngành
- [OpenZeppelin SafeERC20](https://docs.openzeppelin.com/contracts/api/token/erc20#SafeERC20)
- [Kakarot mitigation review, PR-1616](https://code4rena.com/reports/2024-09-kakarot) — hai hành vi loại trừ nhau
- [Coded Estate H-06](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/5) — đổi denom khi còn bid
- [Trail of Bits — Token integration checklist](https://secure-contracts.com/development-guidelines/token_integration.html)

## Liên kết

[[Token Standards]] · [[Denial of Service Patterns]] · [[Composability Risk]] · [[Broken State Lifecycle]] · [[Blockchain]]
