---
tags: [blockchain, evm, nền-tảng]
status: evergreen
---
# EVM Execution Model

> [!note] Ghi chú nguồn
> Trong seed gốc, đây là một **header rỗng**: file `Blockchain Basics.md` chỉ có dòng `# 7. How do blockchain work` và `# 10. Blockchain Overview`, không nội dung. Note này trả lời hứa đó.

> EVM là máy ảo **stack-based, 256-bit word, không có register**. Bốn vùng nhớ của nó có vòng đời và chi phí khác nhau — và gần như mọi lỗ hổng "lạ" đều nằm ở chỗ lập trình viên nhầm vùng này với vùng kia.

## 1. Bốn vùng dữ liệu

| Vùng | Vòng đời | Ghi được | Chi phí | Cạm bẫy chính |
|---|---|---|---|---|
| **Stack** | 1 call frame | push/pop | rẻ nhất | Tối đa **1024** phần tử → stack-too-deep, và stack depth attack (đã giảm nhờ EIP-150) |
| **Memory** | 1 call frame | có, byte-addressed | rẻ, nhưng **chi phí bậc hai** khi mở rộng | Memory expansion DoS; xem Kakarot #101/#71 |
| **Storage** | Vĩnh viễn, theo contract | có | **đắt nhất** (`SSTORE` 20k gas cho slot mới) | Slot collision khi proxy; xem [[Storage Layout]] |
| **Calldata** | 1 transaction | **read-only** | rất rẻ | ABI decode không kiểm tra độ dài → OOB read |

Ngoài ra: **transient storage** (`TSTORE`/`TLOAD`, EIP-1153) — sống trong một transaction, dùng làm reentrancy guard rẻ tiền. Kakarot H-03 là một bug ở chính transient storage.

## 2. Call frame và bảy loại "gọi"

| Opcode | `msg.sender` bên trong | `address(this)` | Storage bị ghi | `msg.value` |
|---|---|---|---|---|
| `CALL` | contract gọi | contract bị gọi | của contract bị gọi | truyền được |
| `STATICCALL` | contract gọi | contract bị gọi | **cấm ghi** | 0 |
| `DELEGATECALL` | **giữ nguyên** người gọi gốc | **contract gọi** | **của contract gọi** | giữ nguyên |
| `CALLCODE` | contract gọi | contract gọi | của contract gọi | (deprecated) |
| `CREATE` | — | địa chỉ mới | mới | truyền được |
| `CREATE2` | — | địa chỉ **đoán trước được** | mới | truyền được |

`DELEGATECALL` là dòng quan trọng nhất trong bảng: nó là nền tảng của mọi proxy, và cũng là nguồn của cả một lớp lỗ hổng. Xem [[Delegatecall and Context Confusion]] và [[Proxy and Upgradeability]].

> [!warning] Low-level call không revert khi đích không tồn tại
> `address.call()` tới một địa chỉ **không có code** trả về `success = true`. Mọi tích hợp phải kiểm tra `extcodesize > 0` trước, hoặc dùng wrapper (`Address.functionCall` của OpenZeppelin) làm việc đó.

## 3. Opcode cần thuộc mặt

Không cần thuộc cả 150 opcode. Cần thuộc nhóm sau, vì chúng xuất hiện trong finding:

- **Context**: `CALLER`, `ORIGIN`, `ADDRESS`, `CALLVALUE`, `CODESIZE`, `EXTCODESIZE`, `EXTCODEHASH`
- **Control**: `JUMP`, `JUMPI`, `JUMPDEST` — jump chỉ hợp lệ tới `JUMPDEST` trong **runtime code**; Kakarot M-09 là bug đúng ở chỗ này (jump trong *creation code*)
- **Storage**: `SLOAD`, `SSTORE`, `TLOAD`, `TSTORE`
- **Kết thúc**: `RETURN`, `REVERT`, `STOP`, `INVALID`, `SELFDESTRUCT`
- **Số học nguy hiểm**: `ADDMOD`, `MULMOD`, `EXP`, `SIGNEXTEND`, `SHR/SHL/SAR`

## 4. Precompile — nơi lỗi ít ai nhìn

Precompile là contract "giả" ở địa chỉ `0x01`–`0x0a`+: `ecrecover` (0x01), `sha256` (0x02), `ripemd160` (0x03), `identity` (0x04), `modexp` (0x05), các phép trên bn254 (0x06–0x08), `blake2f` (0x09), point evaluation (0x0a).

**Ba trong sáu High của Kakarot nằm ở precompile** (`ripemd160` off-by-one tại `len == 55`, dict không finalize cho phép forge output, `ecrecover` chấp nhận `s` ngoài dải). Bài học: trên **mọi chain không phải Ethereum mainnet**, precompile là code do người khác viết lại, và nó *thường* sai ở biên. Xem [[Case Kakarot]].

## 5. Cạm bẫy

1. **EVM-compatible ≠ EVM-equivalent.** Kakarot, zkSync, Polygon zkEVM, Arbitrum Stylus đều lệch ở chỗ nào đó: giá gas, precompile, `blockhash`, `SELFDESTRUCT`, kích thước contract. Luôn hỏi "chain đích là gì".
2. **`RETURNDATASIZE` không giới hạn** → returndata bomb làm cạn gas của caller. Đây là lý do tồn tại của `ExcessivelySafeCall`.
3. **Revert bubbling.** Ở EVM chuẩn, callee revert thì caller *có thể* bắt được. Kakarot M-07/M-08 cho thấy khi tầng dưới panic ở mức RPC thì **`ExcessivelySafeCall` cũng vô dụng** — một lời nhắc rằng biện pháp phòng thủ chỉ đúng trong mô hình thực thi mà nó được thiết kế cho.
4. **Memory expansion là chi phí bậc hai** — một offset lớn có thể làm cạn gas ngay lập tức.

## 6. Checklist áp dụng

- [ ] Mỗi `delegatecall` trong scope: contract đích có giả định gì về storage layout hoặc `address(this)` không?
- [ ] Mỗi low-level `call`: có kiểm tra `success`? Có kiểm tra đích có code không?
- [ ] Có chỗ nào giới hạn `returndata` khi gọi contract ngoài không?
- [ ] Có dùng precompile nào không? Chain đích cài đặt nó có đúng spec không?
- [ ] Có assembly nào ghi vào memory mà không cập nhật free memory pointer (`0x40`) không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| evm.codes | Tra opcode, gas, và playground thực thi | https://www.evm.codes/ |
| Foundry `forge debug` | Bước từng opcode qua một tx | https://book.getfoundry.sh/ |
| Tenderly debugger | Xem call trace của tx đã lên chain | https://tenderly.co/ |

## Tham khảo

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — định nghĩa hình thức của EVM
- [evm.codes](https://www.evm.codes/) — tham chiếu opcode tương tác (nguồn được ghi thẳng trong seed)
- [EIP-1153: Transient storage opcodes](https://eips.ethereum.org/EIPS/eip-1153)
- [EIP-150: Gas cost changes / 63-64 rule](https://eips.ethereum.org/EIPS/eip-150)
- [LayerZero `ExcessivelySafeCall`](https://github.com/LayerZero-Labs/endpoint-v1-solidity-examples/blob/main/contracts/libraries/ExcessivelySafeCall.sol)

## Liên kết

[[Storage Layout]] · [[Gas Mechanics]] · [[Delegatecall and Context Confusion]] · [[Inline Assembly and Yul]] · [[Case Kakarot]] · [[Blockchain]]
