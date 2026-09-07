---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Contract Structure and Visibility

> [!note] Ghi chú nguồn
> Trả header rỗng `Structure of a Contract.md` trong seed (6 link chết: State Variables, Functions, Function Modifiers, Events, Errors, Struct/Enum Types) cùng các stub grammar `modifier-definition.md`, `modifier-invocation.md`, `receive-function-definition.md`, `library-definition.md`.

> Visibility là **hàng phòng thủ đầu tiên và rẻ nhất**. Nó cũng là hàng bị bỏ sót nhiều nhất, vì `public` là thứ compiler chấp nhận không phàn nàn.

## 1. Sáu thành phần của một contract

| Thành phần | Điểm cần soi |
|---|---|
| **State variable** | Thứ tự khai báo = storage slot ([[Storage Layout]]); `public` sinh getter tự động |
| **Function** | Visibility + mutability + ai gọi được |
| **Modifier** | Chạy **trước** thân hàm; `_;` ở đâu quyết định thứ tự |
| **Event** | Không ảnh hưởng logic on-chain, nhưng **hệ thống off-chain sống nhờ nó** |
| **Error** | `revert MyError(x)` rẻ hơn `require` với string |
| **Struct / Enum** | Kiểu dữ liệu; xem [[Solidity Reference Types]] |

## 2. Bảng visibility

| | Contract này | Contract kế thừa | Contract khác | Tx bên ngoài |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| `internal` | ✅ | ✅ | ❌ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |
| `external` | (qua `this.`) | ❌ | ✅ | ✅ |

**State mutability**: `pure` (không đọc state) < `view` (đọc, không ghi) < mặc định (ghi) < `payable` (nhận ETH).

> [!warning] `private` không có nghĩa là bí mật
> Mọi slot storage đọc được bằng `eth_getStorageAt`. `private` chỉ là ràng buộc lúc biên dịch.

## 3. Modifier — chỗ hay giấu bug

```solidity
modifier onlyLiquidator() {
    if (msg.sender != _loanLiquidator) revert InvalidCaller();
    _;
}
```

Ba câu hỏi cho mỗi modifier:

1. **`_;` nằm ở đâu?** Sau `_;` là code chạy *sau* thân hàm — chỗ đặt reentrancy guard.
2. **Modifier có gọi ra ngoài không?** Nếu có, reentrancy xảy ra *trước* khi thân hàm chạy.
3. **Modifier đọc state nào?** Nếu state đó **đổi được giữa chừng**, modifier bảo vệ hụt.

**Ví dụ thật (Gondi L-08):** `onlyLiquidator` so `msg.sender` với `_loanLiquidator`, mà `updateLiquidationContract()` đổi được biến đó bất cứ lúc nào. Kết quả: mọi auction đang chạy ở liquidator cũ **không settle được nữa** — tài sản thế chấp và tiền đặt giá kẹt lại. Tệ hơn, `liquidateLoan()` là permissionless nên attacker **front-run** được lệnh đổi để cố tình đẩy khoản vay vào liquidator sắp bị bỏ.

Đây là mẫu **"đổi địa chỉ vai trò trong khi còn việc dở"** — kiểm tra nó ở mọi setter dạng `setXContract()`. Xem [[Access Control Patterns]] và [[Broken State Lifecycle]].

## 4. `receive`, `fallback`, và library

```solidity
receive() external payable { }              // ETH trần, không calldata
fallback() external payable { }             // calldata không khớp hàm nào
```
- Không có `receive` mà nhận ETH trần ⇒ revert ⇒ vector DoS.
- `fallback` là nơi proxy `delegatecall` xuống implementation — xem [[Proxy and Upgradeability]].
- **`library`**: hàm `internal` được inline; hàm `public`/`external` chạy bằng `delegatecall` từ contract dùng nó ⇒ library có storage layout của caller.
- **`using L for T`** gắn hàm library vào kiểu; tiện nhưng che mất chỗ nào đang gọi cái gì. Gondi L-09 chỉ ra một `using BytesLib for bytes` hoàn toàn không dùng tới — code chết là dấu hiệu code chưa được rà.

## 5. Event — không phải trang trí

Event là API cho indexer, bot thanh lý, dashboard kế toán. **Thiếu một trường trong event = hệ thống off-chain sai.**

Gondi L-01 là finding đúng dạng này: `Delegated` và `RevokeDelegate` **không phát `bytes32 _rights`**, trong khi `_rights` là một phần của khoá lưu trữ delegation. Off-chain không thể theo dõi delegation nào đang tồn tại. Một finding Low nhưng đúng bản chất: **on-chain đúng không đủ nếu off-chain không quan sát được**.

Quy tắc: mọi tham số dùng để **tra cứu** phải `indexed`; mọi tham số **tham gia vào khoá lưu trữ** phải có trong event.

## 6. Checklist áp dụng

- [ ] Mọi hàm `public` có thực sự cần `public` không? Cái nào nên là `internal`?
- [ ] Hàm nào thay đổi state mà **không có** modifier phân quyền?
- [ ] Mọi modifier: `_;` ở đâu? Có gọi ra ngoài trước `_;` không?
- [ ] Mọi setter đổi địa chỉ vai trò: có việc đang dở nào phụ thuộc địa chỉ cũ không?
- [ ] Setter đó có front-run được không?
- [ ] Mọi hàm thay đổi state có phát event không? Event có đủ trường để dựng lại state không?
- [ ] Có code chết (`using` không dùng, import thừa, biến không đọc) không?
- [ ] Contract có `receive`/`fallback` không? Nếu không, nhận ETH cưỡng bức có phá gì không?

## Tham khảo

- [Solidity docs — Contracts](https://docs.soliditylang.org/en/latest/contracts.html)
- [Solidity docs — Function Modifiers](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)
- [Solidity docs — Libraries](https://docs.soliditylang.org/en/latest/contracts.html#libraries)
- [Gondi L-01 & L-08 (Code4rena)](https://code4rena.com/reports/2024-06-gondi)
- [SWC-100: Function Default Visibility](https://swcregistry.io/docs/SWC-100)

## Liên kết

[[Access Control Patterns]] · [[Solidity Reference Types]] · [[Broken State Lifecycle]] · [[Front-running and MEV]] · [[Blockchain]]
