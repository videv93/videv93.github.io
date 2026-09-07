---
tags: [solidity, ngôn-ngữ, assembly]
status: evergreen
---
# Inline Assembly and Yul

> [!note] Ghi chú nguồn
> Trả header rỗng `Inline Assembly` (một link chết trong seed) trong `Language Description.md` của seed.

> Assembly **tắt mọi lưới an toàn của Solidity**: không kiểm tra biên mảng, không kiểm tra overflow, không kiểm tra kiểu, không kiểm tra địa chỉ có code. Mỗi block `assembly` trong scope là một vùng phải đọc từng dòng.

## 1. Yul trong 10 dòng

```solidity
assembly {
    let x := sload(slot)                 // đọc storage
    sstore(slot, add(x, 1))              // ghi storage
    let p := mload(0x40)                 // free memory pointer
    mstore(p, value)                     // ghi memory
    mstore(0x40, add(p, 0x20))           // ⚠️ PHẢI cập nhật lại
    let ok := call(gas(), to, 0, p, 0x20, 0, 0)
    if iszero(ok) { revert(0, 0) }
    return(p, 0x20)
}
```

Yul chỉ có một kiểu: `u256`. Không có `if/else` (chỉ `if` và `switch`), không có toán tử trung tố (`add(a,b)` chứ không phải `a+b`).

## 2. Vì sao code dùng assembly

| Lý do | Ví dụ | Rủi ro |
|---|---|---|
| Tiết kiệm gas | Vòng lặp nóng, hash, so sánh | Bug đổi lấy vài trăm gas |
| Truy cập thứ Solidity không cho | `codesize`, `returndatacopy`, `create2`, slot cứng | Cao |
| Proxy / delegatecall thô | Mọi proxy đều có một block assembly | Rất cao |
| Đọc/ghi slot tính bằng tay | EIP-1967, Diamond storage | Cao — sai slot là ghi đè dữ liệu |
| Parse calldata thủ công | Chữ ký, payload nén | **OOB read nếu không kiểm độ dài** |

## 3. Cạm bẫy

1. **Không cập nhật free memory pointer (`0x40`)** sau khi `mstore` — dữ liệu về sau ghi đè lên.
2. **Scratch space `0x00`–`0x3f`** dùng chung; ghi vào đó rồi gọi hàm Solidity là mất dữ liệu.
3. **`call` tới địa chỉ không có code trả về `success = 1`.** Solidity bình thường tự thêm `extcodesize` check; assembly thì **không**. Đây là bug tích hợp phổ biến nhất trong code dùng assembly.
4. **Không kiểm `returndatasize`** trước khi `returndatacopy` → OOB.
5. **Parse độ dài từ calldata mà không kiểm biên.** Kakarot có hai finding đúng dạng này (`parse_storage_keys` OOB read, `data.length`/`pendingWordLen` không kiểm) — cả hai đều được vá sau audit.
6. **Slot tính sai một đơn vị.** Mẫu EIP-1967 dùng `keccak256("...") - 1` có chủ đích; sao chép thiếu `- 1` là đụng slot khác.
7. **`verbatim` và `memory-safe` annotation**: khai `assembly ("memory-safe")` sai làm optimizer sinh code sai. Chỉ khai khi thật sự tuân thủ quy ước bộ nhớ.

> [!warning] Assembly vô hiệu hoá công cụ, không chỉ compiler
> Slither, coverage, và phần lớn static analyzer **nhìn rất kém vào assembly**. Một finding nằm trong block assembly gần như chắc chắn phải tìm bằng mắt. Xem [[Static Analysis Tools]].

## 4. Bài học từ seed: bug ở tầng dưới ngôn ngữ

Ba trong sáu High của Kakarot nằm ở tầng tương đương assembly — cài đặt precompile bằng Cairo:

- `felt_to_bytes_little` **underflow** khi hint trả về byte lớn hơn giá trị còn lại ⇒ prover giả mạo được output ⇒ **giả mạo được địa chỉ CREATE/CREATE2**.
- `ripemd160` off-by-one tại `len == 55` ⇒ hash sai so với Geth.
- Dictionary không finalize ⇒ đọc ra giá trị do prover chọn.

Bài học chuyển được sang Solidity: **khi bạn viết assembly, bạn tự nhận vai trò của compiler — và compiler cũng có bug.** Mọi bất biến mà Solidity vẫn giữ hộ bạn (biên mảng, giá trị mặc định, kiểu) giờ là trách nhiệm của bạn, và phải được chứng minh bằng test biên chứ không bằng đọc.

## 5. Checklist áp dụng

- [ ] Liệt kê **mọi** block `assembly` trong scope. Mỗi block giải quyết vấn đề gì? Có cách viết bằng Solidity không?
- [ ] Mọi `mstore` có cập nhật `0x40` không? Có ghi vào scratch space không?
- [ ] Mọi `call`/`staticcall`/`delegatecall` trong assembly: có kiểm `extcodesize` không? Có kiểm `success` không?
- [ ] Mọi phép đọc calldata/memory theo offset: offset có bị kiểm biên không?
- [ ] Mọi slot cứng: công thức tính từ đâu? Có khớp chuẩn (EIP-1967/2535) không?
- [ ] Có `assembly ("memory-safe")` nào không thực sự memory-safe không?
- [ ] Có test biên cho từng nhánh trong assembly không? (độ dài 0, 31, 32, 55, 56, max)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `forge debug` | Bước qua từng opcode | https://book.getfoundry.sh/ |
| `solc --ir` | Xem Yul trung gian compiler sinh ra | https://docs.soliditylang.org/ |
| Halmos / Kontrol | Kiểm chứng ký hiệu, đọc được assembly | https://github.com/a16z/halmos |
| `heimdall-rs` | Decompile bytecode | https://github.com/Jon-Becker/heimdall-rs |

## Tham khảo

- [Solidity docs — Inline Assembly](https://docs.soliditylang.org/en/latest/assembly.html)
- [Yul specification](https://docs.soliditylang.org/en/latest/yul.html)
- [Solidity docs — Memory-safe assembly](https://docs.soliditylang.org/en/latest/assembly.html#memory-safety)
- [Kakarot H-02: underflow trong `felt_to_bytes_little`](https://github.com/code-423n4/2024-09-kakarot-findings/issues/118)
- [Kakarot H-05: off-by-one RIPEMD-160](https://github.com/code-423n4/2024-09-kakarot-findings/issues/50)

## Liên kết

[[EVM Execution Model]] · [[Storage Layout]] · [[Case Kakarot]] · [[Formal Verification]] · [[Blockchain]]
