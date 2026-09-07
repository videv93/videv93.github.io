---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Solidity Version Pitfalls

> Solidity là ngôn ngữ **phá vỡ tương thích ngược có chủ đích**. Một mẫu code an toàn ở 0.7 có thể sai ở 0.8, và ngược lại. Câu hỏi đầu tiên khi đọc một contract lạ là: **version nào?**

## 1. Các mốc phá vỡ tương thích

| Version | Thay đổi quan trọng nhất | Hệ quả khi audit |
|---|---|---|
| 0.5.0 | Bắt buộc khai `memory`/`storage`; bỏ `years`; `address payable` tách riêng | Code trước 0.5 có storage pointer chưa khởi tạo |
| 0.6.0 | `receive`/`fallback` tách; `virtual`/`override` bắt buộc | Kế thừa mơ hồ trong code cũ |
| 0.8.0 | **Checked arithmetic mặc định**; `abicoder v2` mặc định | SafeMath thành thừa; nhưng **`unchecked` quay lại thành rủi ro** |
| 0.8.4 | Custom error | `require(cond, "string")` → `if (!cond) revert E()` |
| 0.8.13–0.8.16 | Bug optimizer với inline assembly (đã vá) | **Kiểm tra version trong bug list** |
| 0.8.20 | Mặc định EVM version = Shanghai (`PUSH0`) | **Deploy lên chain chưa hỗ trợ PUSH0 sẽ hỏng** |
| 0.8.24 | `transient` storage (`TSTORE`) | Reentrancy guard rẻ, nhưng chỉ trên chain có Cancun |
| 0.8.25+ | Cancun là mặc định | Cùng vấn đề như 0.8.20, ở mức nặng hơn |

> [!warning] Bẫy `PUSH0` là bẫy deploy đa chain phổ biến nhất hiện nay
> Compile bằng 0.8.20+ với target mặc định rồi deploy lên một L2 chưa hỗ trợ Shanghai ⇒ contract deploy thành công nhưng **mọi lời gọi đều revert**. Luôn khai `evm_version` rõ ràng trong `foundry.toml`.

## 2. Checked arithmetic — và mặt sau của nó

Từ 0.8.0, `+ - * /` tự revert khi tràn. Ba điều **không** được bảo vệ:

1. **Ép kiểu hẹp** — `uint128(x)` vẫn cắt bit im lặng.
2. **`unchecked` block** — tắt hoàn toàn.
3. **Assembly** — không bao giờ được kiểm.

Và một tác dụng phụ: khi phép trừ tràn, nó revert bằng **panic `0x11`**, không phải custom error của bạn. Gondi L-02 là finding đúng chỗ này — `NotStrictlyImprovedError()` không bao giờ được ném vì phép trừ underflow trước. Người dùng nhận panic code vô nghĩa thay vì lý do thật.

**Quy tắc:** kiểm điều kiện *trước*, tính *sau*.

## 3. Bug của chính compiler

Solidity duy trì một [danh sách bug theo version](https://docs.soliditylang.org/en/latest/bugs.html) ở dạng JSON máy đọc được. Vài bug đáng nhớ:

- `HeadOverflowWithStaticArrayCleanup` (0.8.16)
- `AbiReencodingHeadOverflowWithStaticArrayCleanup`
- `InlineAssemblyMemorySideEffects` (0.8.13–0.8.15) — optimizer bỏ nhầm `mstore`
- `DirtyBytesArrayToStorage`
- `NestedCalldataArrayAbiReencodingSizeValidation`

Đây là một bước **bắt buộc** trong mọi audit: lấy version chính xác từ metadata, tra vào bug list, kiểm xem code có dùng mẫu bị ảnh hưởng không.

## 4. Cạm bẫy khác

1. **Pragma floating (`^0.8.0`)** — bytecode deploy phụ thuộc máy của người deploy. Xem [[Solidity Source File Layout]].
2. **Optimizer runs khác nhau** cho ra bytecode khác nhau ⇒ verify thất bại, và với contract dùng CREATE2 thì **địa chỉ cũng khác**.
3. **`via_ir = true`** thay đổi pipeline sinh mã hoàn toàn; một số bug chỉ xuất hiện ở một trong hai pipeline. Nếu team bật IR, test cũng phải chạy với IR.
4. **`abicoder v1` trong code cũ** không validate mảng lồng nhau trong calldata.
5. **`immutable` không tồn tại trước 0.6.5**; code cũ dùng `constant` với biểu thức chạy lại mỗi lần đọc.
6. **Kế thừa và C3 linearization**: thứ tự `contract A is B, C` quyết định hàm nào override hàm nào, và **quyết định cả storage layout**. Đổi thứ tự khi upgrade là phá layout. Xem [[Storage Layout]].

## 5. Checklist áp dụng

- [ ] Version chính xác của mọi file trong scope là gì? Có floating pragma không?
- [ ] Version đó có nằm trong bug list không? Code có dùng mẫu bị ảnh hưởng không?
- [ ] `evm_version` được khai rõ chưa? Chain đích có hỗ trợ opcode tương ứng (`PUSH0`, `TSTORE`) không?
- [ ] Optimizer bật chưa, bao nhiêu runs, `via_ir` có bật không? Test chạy cùng cấu hình chưa?
- [ ] Mọi `unchecked` có lập luận kèm theo không?
- [ ] Có phép toán nào revert bằng panic thay vì custom error dự kiến không?
- [ ] Có SafeMath thừa trong code 0.8 không? (không phải bug, nhưng là dấu hiệu code copy không đọc)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `solc-select` / `foundryup` | Đổi version compiler nhanh | https://github.com/crytic/solc-select |
| Solidity bug list (JSON) | Tra bug theo version bằng script | https://docs.soliditylang.org/en/latest/bugs.html |
| `forge build --sizes` | Kiểm giới hạn 24KB | https://book.getfoundry.sh/ |

## Tham khảo

- [Solidity docs — Breaking changes theo từng version](https://docs.soliditylang.org/en/latest/050-breaking-changes.html)
- [Solidity known bugs](https://docs.soliditylang.org/en/latest/bugs.html)
- [EIP-3855: PUSH0 instruction](https://eips.ethereum.org/EIPS/eip-3855)
- [EIP-1153: Transient storage](https://eips.ethereum.org/EIPS/eip-1153)
- [Gondi L-02 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — underflow che mất custom error

## Liên kết

[[Solidity Source File Layout]] · [[Solidity Value Types]] · [[Integer and Precision Bugs]] · [[Storage Layout]] · [[Blockchain]]
