---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# Storage Layout

> Storage của một contract là một mảng `2^256` slot, mỗi slot 32 byte. **Compiler quyết định biến nào ở slot nào theo thứ tự khai báo** — và chính vì quy tắc đó là *ngầm định*, mọi mẫu nâng cấp contract đều đứng trên một quả mìn.

## 1. Quy tắc gán slot

| Loại biến | Vị trí |
|---|---|
| Biến giá trị, theo thứ tự khai báo | slot 0, 1, 2… |
| Nhiều biến nhỏ liền nhau | **gói chung một slot** nếu tổng ≤ 32 byte |
| `mapping m` ở slot `p`, khoá `k` | `keccak256(abi.encode(k, p))` |
| Mảng động `a` ở slot `p` | `p` chứa độ dài; phần tử `i` ở `keccak256(p) + i` |
| Mảng tĩnh | trải liên tiếp từ `p` |
| `struct` | trải liên tiếp, có gói |
| `constant` / `immutable` | **không chiếm slot** (nằm trong bytecode) |
| Biến `transient` (0.8.24+) | không gian riêng, không đụng storage |

**Hệ quả về gas:** sắp xếp lại thứ tự khai báo có thể tiết kiệm cả một `SSTORE` (20.000 gas). Nhưng với auditor, việc gói slot quan trọng vì lý do khác: **đổi thứ tự khai báo khi upgrade = ghi đè dữ liệu**.

## 2. Vì sao đây là vấn đề bảo mật

Proxy dùng `delegatecall`: **code của implementation chạy trên storage của proxy**. Nếu hai contract không đồng thuận về sơ đồ slot thì:

```
Proxy slot 0:  address implementation
Impl  slot 0:  address owner        // ← ghi vào implementation slot
```

Mọi lần set `owner` sẽ đổi địa chỉ implementation. Đây là lý do tồn tại của **EIP-1967**: đặt các biến hạ tầng của proxy ở slot giả ngẫu nhiên (`keccak256("eip1967.proxy.implementation") - 1`) thay vì slot 0.

Xem [[Proxy and Upgradeability]] và [[Delegatecall and Context Confusion]].

## 3. Cạm bẫy

1. **Thêm biến vào *giữa* danh sách khi upgrade.** Chỉ được thêm vào **cuối**. Đây là lỗi upgrade phổ biến số một.
2. **Xoá biến cũ** cũng đẩy mọi biến sau nó lên — không bao giờ xoá, chỉ đánh dấu `__deprecated`.
3. **Đổi kiểu biến** (`uint128` → `uint256`) phá vỡ gói slot.
4. **Kế thừa nhiều tầng**: thứ tự slot theo C3 linearization, không theo thứ tự bạn viết. Thêm một base contract cũng dịch slot.
5. **Quên `__gap`.** Contract base có thể cần thêm biến sau này; để `uint256[50] private __gap;` chừa chỗ.
6. **`delete` một struct chứa mapping không xoá mapping.** Dữ liệu mồ côi ở lại. Đây chính là hình dạng chung của Coded Estate H-09 (burn token nhưng rental data biến mất, tiền kẹt) — xem [[Broken State Lifecycle]].
7. **Đọc storage của contract khác** bằng `eth_getStorageAt` là hợp pháp và ai cũng làm được — **không có gì "private" trên chain**. `private` chỉ chặn contract khác đọc qua Solidity, không chặn con người.

## 4. Checklist áp dụng

- [ ] Contract có upgradeable không? Nếu có, đã chạy `forge inspect <C> storage-layout` cho cả version cũ và mới để diff chưa?
- [ ] Có `__gap` trong mọi contract base upgradeable không?
- [ ] Proxy dùng slot EIP-1967 hay slot 0?
- [ ] Có `delete` struct nào chứa mapping hoặc mảng động không?
- [ ] Có biến `private` nào đang được dùng như bí mật thật sự không? (mật khẩu, seed, commit không hash)
- [ ] Có assembly nào `sstore`/`sload` slot cứng không? Slot đó được tính từ đâu?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `forge inspect <C> storage-layout` | Bảng slot chính xác từ compiler | https://book.getfoundry.sh/ |
| `cast storage <addr> <slot>` | Đọc slot của contract đã deploy | https://book.getfoundry.sh/ |
| OpenZeppelin Upgrades plugin | Tự động chặn upgrade phá layout | https://docs.openzeppelin.com/upgrades-plugins/ |
| slither `--print variable-order` | In thứ tự biến để đối chiếu | https://github.com/crytic/slither |

## Tham khảo

- [Solidity docs — Layout of State Variables in Storage](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)
- [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-2535: Diamonds — Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)
- [OpenZeppelin: Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/writing-upgradeable)

## Liên kết

[[Proxy and Upgradeability]] · [[Delegatecall and Context Confusion]] · [[Broken State Lifecycle]] · [[EVM Execution Model]] · [[Blockchain]]
