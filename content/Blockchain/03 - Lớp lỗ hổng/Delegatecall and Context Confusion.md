---
tags: [audit, lỗ-hổng, delegatecall]
status: evergreen
---
# Delegatecall and Context Confusion

> `delegatecall` chạy **code của người khác trên storage của bạn, với danh tính của bạn**. Mọi proxy đứng trên nó, và mọi phép kiểm phân quyền dựa vào "code nào đang chạy" thay vì "ai đang chạy" đều gãy vì nó.

## 1. Cái gì đổi, cái gì không

| Biến | `CALL` | `DELEGATECALL` |
|---|---|---|
| `msg.sender` | contract gọi | **người gọi gốc, giữ nguyên** |
| `msg.value` | tham số mới | **giữ nguyên** |
| `address(this)` | contract bị gọi | **contract gọi** |
| Storage bị đọc/ghi | của contract bị gọi | **của contract gọi** |
| Balance thao tác | của contract bị gọi | **của contract gọi** |

Đọc bảng này theo hướng tấn công: **contract bị delegatecall không được phép giả định bất cứ điều gì về địa chỉ, storage, hay số dư của chính nó.**

## 2. Kakarot H-01 — whitelist theo sai chiều

Đây là finding có giá trị giáo dục cao nhất trong seed.

Kakarot cho phép một tập contract đã whitelist gọi các "Cairo precompile" đặc quyền. Phép kiểm dùng **`caller_code_address`** — địa chỉ của *code đang chạy* — chứ không phải `caller_address` — địa chỉ *thực thi*.

```
Contract A (không whitelist)
   └─ delegatecall → Contract B (đã whitelist)
        └─ code của B chạy, code_address = B  ⇒ QUA whitelist
           nhưng execution address = A
```

⇒ Bất kỳ contract nào cũng mượn được đặc quyền của một contract đã whitelist.

Warden chỉ ra hệ quả rộng hơn, và đây mới là phần đáng nhớ:

> *"Mọi contract trong allowlist phải được viết với giả định rằng chúng cũng có thể bị delegatecall — tức là chúng không được giả định gì về storage hay về địa chỉ EVM của chính mình (`address(this)`)."*

Và một chi tiết về quy trình: warden ghi rằng **trước khi trao đổi riêng với họ, team đã dự định gỡ bỏ hoàn toàn cơ chế whitelist**. Tức là finding này không chỉ vá một bug — nó ngăn một quyết định kiến trúc sai. Warden dẫn tiền lệ [vụ giả mạo `msg.sender` của Moonbeam](https://pwning.mirror.xyz/okyEG4lahAuR81IMabYL5aUdvAsZ8cRCbYBXh8RHFuE).

Bản vá cuối gồm ba phần: bỏ phụ thuộc vào `code_address`, cấm delegatecall lồng tới precompile ở tầng giao thức, và thêm modifier `noDelegateCall` cho các contract nhạy cảm.

## 3. `noDelegateCall` — mẫu phòng thủ

```solidity
address private immutable original = address(this);

modifier noDelegateCall() {
    require(address(this) == original, "no delegatecall");
    _;
}
```
Hoạt động vì `immutable` nằm trong **bytecode**, không trong storage — nên nó giữ giá trị lúc deploy kể cả khi bị delegatecall. Đây là mẫu của Uniswap V3.

## 4. Cạm bẫy

1. **Storage collision.** Xem [[Storage Layout]].
2. **`delegatecall` tới địa chỉ do người dùng cung cấp** = trao toàn quyền contract. Không bao giờ.
3. **`delegatecall` tới contract có `selfdestruct`** = xoá contract của bạn (giảm nhẹ sau EIP-6780, nhưng chain cũ vẫn dính). Đây là vụ Parity multisig 2017.
4. **Library có hàm `public`/`external`** được gọi bằng `delegatecall` ⇒ library thấy storage của caller. Hàm `internal` thì được inline, an toàn hơn.
5. **`msg.value` lặp lại trong delegatecall lồng** — một khoản ETH được "đếm" nhiều lần nếu logic cộng dồn `msg.value`.
6. **Phân quyền dựa vào `address(this)`** gãy hoàn toàn dưới delegatecall.
7. **`delegatecall` trong vòng lặp `multicall` payable** — mẫu multicall + `msg.value` là một lớp bug riêng.

## 5. Checklist áp dụng

- [ ] Liệt kê mọi `delegatecall` trong scope. Đích là địa chỉ cố định hay biến?
- [ ] Đích có thể do người dùng ảnh hưởng không? Bằng đường nào?
- [ ] Contract đích có `selfdestruct` hoặc `delegatecall` tiếp không?
- [ ] Storage layout của caller và callee có khớp không? Đã diff bằng `forge inspect` chưa?
- [ ] Có phép kiểm phân quyền nào dựa vào `address(this)` hay "code nào đang chạy" thay vì "ai đang chạy" không?
- [ ] Với contract nhạy cảm: có `noDelegateCall` không?
- [ ] Với whitelist: nó kiểm **execution address** hay **code address**?
- [ ] Contract trong whitelist có cho phép callback tới địa chỉ tuỳ ý không? (đường vòng của Kakarot H-01)
- [ ] Có `multicall` payable dùng `msg.value` nhiều lần không?

## Tham khảo

- [Kakarot H-01](https://github.com/code-423n4/2024-09-kakarot-findings/issues/124) — whitelist theo code address
- [pwning.eth — Moonbeam `msg.sender` impersonation](https://pwning.mirror.xyz/okyEG4lahAuR81IMabYL5aUdvAsZ8cRCbYBXh8RHFuE)
- [Solidity docs — delegatecall / Libraries](https://docs.soliditylang.org/en/latest/contracts.html#libraries)
- [Uniswap V3 `NoDelegateCall`](https://github.com/Uniswap/v3-core/blob/main/contracts/NoDelegateCall.sol)
- [SWC-112: Delegatecall to Untrusted Callee](https://swcregistry.io/docs/SWC-112)

## Liên kết

[[Storage Layout]] · [[Proxy and Upgradeability]] · [[Access Control Patterns]] · [[EVM Execution Model]] · [[Blockchain]]
