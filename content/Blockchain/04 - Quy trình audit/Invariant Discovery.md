---
tags: [audit, quy-trình, invariant]
status: evergreen
---
# Invariant Discovery

> Bất biến là **câu tiếng Việt về protocol mà phải luôn đúng**. Tìm ra chúng là phần khó nhất của audit; viết chúng thành assert chạy được là phần có giá trị lâu dài nhất — vì test bất biến còn sống sau khi audit kết thúc.

## 1. Bốn nguồn bất biến

| Nguồn | Cách khai thác | Ví dụ |
|---|---|---|
| **Tài liệu** | Mọi câu khẳng định trong README/docs | *"NFT mới không thêm được vào vault trừ khi burn vault"* (Gondi L-12) |
| **Kế toán** | Tổng vào = tổng ra + tồn | `sum(balances) == totalSupply` |
| **Máy trạng thái** | Chuyển trạng thái nào hợp lệ | "rental đã finalize thì không sửa được `denom`" |
| **Quan hệ giữa các trường** | Trường nào ràng buộc trường nào | `rental_type` phải khớp hàm được gọi |

## 2. Từ câu tiếng Việt tới assert

**Gondi L-12** là ví dụ hoàn hảo. Tài liệu nói:

> *"new NFTs cannot be added to the vault unless borrower burns the vault and creates a new vaultId with a new bundle of assets"*

Code thì cho **bất kỳ ai** deposit ERC-20/ERC-721 vào một `vaultId` đang tồn tại, ở bất kỳ lúc nào. Bất biến trong tài liệu **không được thực thi**.

Thành test:
```solidity
function invariant_vaultContentsFrozenAfterMint() public {
    // với mọi vaultId đã mint, tập tài sản không đổi
    assertEq(vaultAssetHash(vaultId), snapshotHash[vaultId]);
}
```

Tác động thật của việc vi phạm: người cho vay ký offer dựa trên **một bộ tài sản**, nhưng bộ đó đổi được trong lúc khoản vay đang chạy — và trong lúc đấu giá thanh lý, ai đó nạp thêm tài sản để **thao túng giá đấu**.

## 3. Bất biến rút được từ seed

| Bất biến | Vi phạm ở |
|---|---|
| Token không burn được khi còn nghĩa vụ tài chính | Coded Estate H-09 |
| Approval biến mất cùng lúc với lý do cấp nó | Coded Estate H-05 |
| Loại token thanh toán bị khoá suốt vòng đời một nghĩa vụ | Coded Estate H-06, H-07 |
| Số tiền chuyển ra = giá đã niêm yết | Coded Estate H-03 |
| Hàm short-term chỉ chạy trên rental short-term | Coded Estate H-04 |
| Mọi đường chuyển tài sản đều đi qua cùng bộ kiểm tra | Coded Estate H-08 |
| Nội dung vault bất biến sau khi mint | Gondi L-12 |
| Revoke xoá đúng thứ delegate đã tạo | Gondi M-01 |
| `ecrecover` chấp nhận đúng tập chữ ký như Ethereum | Kakarot H-06 |

**Toàn bộ bảng này chỉ có chín dòng, và nó phủ hầu hết High của cả ba audit.** Đó là lý do bất biến đáng đầu tư hơn checklist.

## 4. Viết test bất biến

```solidity
contract ProtocolInvariants is Test {
    function setUp() public {
        handler = new Handler(protocol);
        targetContract(address(handler));   // fuzzer chỉ gọi qua handler
    }

    function invariant_solvency() public {
        assertGe(token.balanceOf(address(protocol)), protocol.totalObligations());
    }
}
```

**Handler** là phần quan trọng: nó giới hạn fuzzer vào các lời gọi *có nghĩa* (đúng thứ tự, tham số hợp lý). Không có handler, fuzzer tiêu 99% thời gian vào các lời gọi revert ngay.

Xem [[Fuzzing and Invariant Testing]].

## 5. Cạm bẫy

1. **Bất biến quá yếu.** `assertGe(balance, 0)` luôn đúng và vô dụng.
2. **Bất biến quá mạnh** ⇒ fail giả liên tục ⇒ bị tắt đi ⇒ mất luôn.
3. **Chỉ viết bất biến kế toán.** Bất biến về **quyền** và **vòng đời** bắt được nhiều bug hơn.
4. **Không có handler** ⇒ coverage của fuzz thực tế gần 0. Kiểm bằng `forge test --show-metrics`.
5. **Bất biến chỉ kiểm ở cuối.** Nhiều vi phạm chỉ tồn tại **giữa** hai lời gọi — đó chính là read-only reentrancy.
6. **Không lấy bất biến từ tài liệu.** Nguồn giàu nhất và rẻ nhất.

## 6. Checklist áp dụng

- [ ] Đã trích mọi câu khẳng định trong tài liệu thành danh sách bất biến chưa?
- [ ] Với mỗi bất biến: nó được thực thi ở đâu trong code? Nếu không ở đâu, đó là finding.
- [ ] Có bất biến về **kế toán** (tổng vào/ra), **quyền**, và **vòng đời** — cả ba nhóm chưa?
- [ ] Mỗi bất biến đã thành assert chạy được chưa?
- [ ] Có handler giới hạn fuzzer vào lời gọi có nghĩa chưa?
- [ ] Đã kiểm coverage thật của fuzz run chưa?
- [ ] Có bất biến nào cần đúng **giữa** các lời gọi, không chỉ ở cuối không?
- [ ] Test bất biến đã được bàn giao cho sponsor như một sản phẩm của audit chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `forge invariant` | Fuzz bất biến, có handler | https://book.getfoundry.sh/forge/invariant-testing |
| Echidna | Fuzz theo thuộc tính, lâu đời | https://github.com/crytic/echidna |
| Medusa | Fuzz song song, kế nhiệm Echidna | https://github.com/crytic/medusa |
| Certora / Halmos | Chứng minh bất biến thay vì thử | https://www.certora.com/ |

## Tham khảo

- [Foundry Book — Invariant Testing](https://book.getfoundry.sh/forge/invariant-testing)
- [Trail of Bits — Testing properties with Echidna](https://secure-contracts.com/program-analysis/echidna/)
- [Gondi L-12 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — bất biến trong tài liệu không được thực thi
- [Nascent — Invariant testing guide](https://github.com/nascentxyz/simple-security-toolkit)

## Liên kết

[[Fuzzing and Invariant Testing]] · [[Scoping and Threat Modeling]] · [[Formal Verification]] · [[Broken State Lifecycle]] · [[Blockchain]]
