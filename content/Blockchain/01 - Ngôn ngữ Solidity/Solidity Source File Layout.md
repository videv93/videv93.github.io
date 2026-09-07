---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Solidity Source File Layout

> [!note] Ghi chú nguồn
> Trong seed gốc, file `Layout of a Solidity Source File.md` chỉ có đúng bốn dòng: `[[Comments]]` · `[[Importing other Source Files]]` · `[[Pragmas]]` · `[[SPDX]]` (viết trong dấu nháy để không tạo link thật) — bốn link tới note không tồn tại. Đây là một **header rỗng** dạng danh sách việc. Note này trả cả bốn.

> Bốn dòng đầu của một file Solidity nói với auditor nhiều hơn người ta tưởng: contract này biên dịch bằng version nào, có bug compiler nào áp dụng, code đến từ đâu, và ai được quyền dùng lại nó.

## 1. Bốn thành phần

### SPDX license identifier
```solidity
// SPDX-License-Identifier: MIT
```
Dòng đầu tiên, dạng comment. Thiếu thì compiler cảnh báo (không lỗi). **Nó đi vào metadata hash của bytecode** — tức là đổi license thì đổi cả bytecode hash, ảnh hưởng verify contract và CREATE2 address.

### Pragma
```solidity
pragma solidity ^0.8.24;    // ≥0.8.24, <0.9.0
pragma solidity 0.8.24;     // đúng 0.8.24 — nên dùng cho code deploy
pragma abicoder v2;         // mặc định từ 0.8.0
pragma experimental SMTChecker;
```

> [!warning] `^` trong code production là một finding
> `^0.8.0` cho phép compile bằng bất kỳ version 0.8.x nào. Mỗi version có tập bug compiler riêng. Contract deploy phải **ghim chính xác** một version, và version đó phải được kiểm tra trong [Solidity bug list](https://docs.soliditylang.org/en/latest/bugs.html). Đây là finding Low tiêu chuẩn trong mọi báo cáo audit.

### Import
```solidity
import "./A.sol";                    // ❌ kéo toàn bộ namespace
import {A, B} from "./A.sol";        // ✅ chỉ định rõ
import * as Lib from "./Lib.sol";
```
Import có chọn lọc giúp thấy ngay contract này thật sự phụ thuộc cái gì. Với auditor: **mọi import từ ngoài repo là code bạn phải quyết định có tin hay không**. Version OpenZeppelin cụ thể là một phần của scope.

### Comment và NatSpec
```solidity
/// @notice Người dùng thấy gì khi ký transaction này
/// @dev    Ghi chú cho lập trình viên
/// @param  amount Số token
/// @return success Có thành công không
```
NatSpec không phải trang trí: `@notice` là thứ ví hiển thị khi người dùng ký. Quan trọng hơn với auditor — **NatSpec là spec**. Chênh lệch giữa NatSpec và code là một finding hợp lệ, và đó chính là lập luận thắng của Gondi M-01: *"code cũng đi ngược đặc tả interface của chính nó, càng củng cố mức Medium"*.

## 2. Thứ tự khai báo chuẩn trong một contract

Solidity style guide quy định thứ tự sau. Lệch thứ tự không phải bug, nhưng **đọc code theo thứ tự này giúp không bỏ sót**:

1. `type` declarations (struct, enum, user-defined value type)
2. State variables — **thứ tự này quyết định storage slot**, xem [[Storage Layout]]
3. Events, Errors
4. Modifiers
5. Functions: `constructor` → `receive` → `fallback` → `external` → `public` → `internal` → `private`

## 3. Cạm bẫy

1. **Pragma floating (`^`) trong contract deploy** — Low tiêu chuẩn.
2. **Pragma của file phụ thuộc rộng hơn file chính** — compiler chọn version thoả cả hai; kiểm tra tất cả file, không chỉ file entry.
3. **Import bằng đường dẫn tuyệt đối tới node_modules** làm build không tái lập được → không verify được bytecode.
4. **NatSpec sao chép từ contract khác** và không cập nhật — mô tả sai còn nguy hiểm hơn không mô tả.
5. **`@inheritdoc` trỏ tới interface đã đổi** — spec và code lệch mà không ai thấy.
6. **Lỗi chính tả trong tên biến/mapping key** vẫn compile được: Gondi L-04 là `renegotiationIf` thay vì `renegotiationId`. Vô hại về logic, nhưng là dấu hiệu code chưa được đọc kỹ.

## 4. Checklist áp dụng

- [ ] Mọi file trong scope có SPDX không?
- [ ] Pragma của file deploy có ghim chính xác version không?
- [ ] Version đó có nằm trong danh sách bug compiler đã biết không?
- [ ] Import có chọn lọc (`import {X} from`) không? Có import nào không dùng tới không?
- [ ] NatSpec của mọi hàm `external`/`public` có khớp với hành vi thật của code không?
- [ ] Có hàm nào trong interface mà implementation làm khác spec không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `solhint` | Lint style + security rule, bắt pragma floating | https://protofire.github.io/solhint/ |
| `forge fmt` | Format theo style guide | https://book.getfoundry.sh/ |
| Solidity bug list | Danh sách bug compiler theo version | https://docs.soliditylang.org/en/latest/bugs.html |

## Tham khảo

- [Solidity docs — Layout of a Source File](https://docs.soliditylang.org/en/latest/layout-of-source-files.html)
- [Solidity docs — Style Guide: Order of Layout](https://docs.soliditylang.org/en/latest/style-guide.html)
- [Solidity docs — NatSpec Format](https://docs.soliditylang.org/en/latest/natspec-format.html)
- [Solidity known bugs by version](https://docs.soliditylang.org/en/latest/bugs.html)
- [SPDX License List](https://spdx.org/licenses/)

## Liên kết

[[Solidity Version Pitfalls]] · [[Contract Structure and Visibility]] · [[Storage Layout]] · [[Blockchain]]
