---
tags: [công-cụ, fuzzing, invariant]
status: evergreen
---
# Fuzzing and Invariant Testing

> Fuzzing tìm được thứ mà đọc code không tìm được: **ca biên mà không ai nghĩ tới**. Nhưng nó chỉ tìm được cái bạn đã nói cho nó biết là sai — nên chất lượng của fuzz bằng đúng chất lượng của bất biến. Xem [[Invariant Discovery]].

## 1. Ba tầng

| Tầng | Cái gì được sinh ngẫu nhiên | Bắt được gì |
|---|---|---|
| **Fuzz test** (stateless) | Tham số của **một** hàm | Ca biên số học, revert không mong đợi |
| **Invariant test** (stateful) | **Chuỗi lời gọi** nhiều hàm | Lỗi vòng đời, kế toán lệch sau N bước |
| **Differential fuzz** | Đầu vào cho **hai** cài đặt | Lệch spec — xem mục 5 |

Tầng hai là tầng đáng đầu tư nhất, và cũng là tầng đòi hỏi nhiều công nhất.

## 2. Công cụ

| Tên | Đặc điểm |
|---|---|
| **`forge fuzz` / `forge invariant`** | Có sẵn, nhanh nhất để bắt đầu |
| **Echidna** | Lâu đời, corpus tái dùng được, cấu hình sâu |
| **Medusa** | Kế nhiệm Echidna, chạy song song, coverage tốt hơn |

## 3. Handler — phần quyết định

```solidity
contract Handler is Test {
    function deposit(uint256 amount) public {
        amount = bound(amount, 1, 1e24);        // ← giới hạn vào miền có nghĩa
        vm.prank(currentActor());
        protocol.deposit(amount);
        ghost_totalDeposited += amount;          // ← ghost variable để đối chiếu
    }
}

contract Invariants is Test {
    function setUp() public { targetContract(address(handler)); }

    function invariant_solvency() public {
        assertGe(token.balanceOf(address(protocol)), handler.ghost_totalDeposited());
    }
}
```

Ba kỹ thuật trong đoạn trên:
- **`bound()`** thay vì `vm.assume` — không vứt bỏ run, mà ánh xạ vào miền hợp lệ.
- **Ghost variable** — kế toán độc lập do handler tự giữ, để đối chiếu với state của protocol.
- **Actor pool** — nhiều địa chỉ khác nhau, vì phần lớn bug cần **hai** người dùng.

> [!warning] Không có handler thì coverage thật gần 0
> Fuzzer sẽ gọi `withdraw()` khi chưa ai deposit, và 99% run revert ngay. Kiểm bằng `forge test --show-metrics`; nếu tỉ lệ revert cao, handler chưa đủ tốt.

## 4. Bất biến rút từ seed

Chín bất biến ở [[Invariant Discovery]] mục 3 đều viết thành invariant test được. Ba cái dễ nhất để bắt đầu:

```solidity
// Coded Estate H-09: không burn được khi còn nghĩa vụ
function invariant_noBurnWithActiveObligation() public {
    for (uint i; i < handler.burnedTokens(); i++)
        assertEq(handler.escrowedFundsOf(id), 0);
}

// Coded Estate H-03: tiền vào bằng giá niêm yết
function invariant_transferMatchesListedPrice() public {
    assertEq(handler.ghost_paidTotal(), handler.ghost_listedPriceTotal());
}

// Coded Estate H-05: approval biến mất cùng lý do cấp nó
function invariant_noApprovalWithoutBid() public {
    assertTrue(!nft.isApproved(actor, id) || market.hasBid(actor, id));
}
```

## 5. Differential fuzzing — công cụ cho ca Kakarot

Khi có **hai cài đặt của cùng một spec**, fuzz cả hai và so kết quả. Đây chính xác là cách bắt được ba High của Kakarot:

- `ripemd160` off-by-one tại `len == 55` — lộ ra khi so với cài đặt Go của Geth.
- `ecrecover` chấp nhận `s` ngoài dải — lộ ra khi so với Ethereum.
- `0^0 = 0` — lộ ra khi so với định nghĩa toán học.

Áp dụng được cho: cài đặt EVM mới, thư viện toán tự viết vs OpenZeppelin, contract mới vs contract cũ khi migrate, Solidity vs assembly tối ưu.

## 6. Cạm bẫy

1. **Bất biến quá yếu.** `assertGe(x, 0)` luôn đúng.
2. **`fail_on_revert = false`** che mất việc handler đang gọi toàn thứ vô nghĩa. Bật `true` khi handler đã chuẩn.
3. **Chạy quá ít.** 256 run không tìm được gì; cần 100k+ cho fuzz, và invariant nên chạy qua đêm.
4. **Không tái dùng corpus.** Echidna/Medusa lưu được corpus — chạy tiếp từ đó thay vì bắt đầu lại.
5. **Chỉ một actor.** Phần lớn bug cần hai người dùng tương tác.
6. **Không có ghost variable** ⇒ chỉ so state với chính nó ⇒ không phát hiện được lệch kế toán.
7. **Coi fuzz pass là chứng minh.** Fuzz không tìm thấy ≠ không có. Muốn chứng minh thì cần [[Formal Verification]].

## 7. Checklist áp dụng

- [ ] Đã có danh sách bất biến bằng câu tiếng Việt trước khi viết code test chưa?
- [ ] Có handler giới hạn fuzzer vào lời gọi có nghĩa chưa?
- [ ] Có dùng `bound()` thay vì vứt bỏ run bằng `vm.assume` không?
- [ ] Có ghost variable làm kế toán độc lập không?
- [ ] Có nhiều actor không?
- [ ] Đã kiểm tỉ lệ revert và coverage thật của fuzz run chưa?
- [ ] Đã thử `fail_on_revert = true` chưa?
- [ ] Có cài đặt tham chiếu nào để differential fuzz không?
- [ ] Test bất biến đã được bàn giao cho sponsor như sản phẩm của audit chưa?

## Tham khảo

- [Foundry Book — Invariant Testing](https://book.getfoundry.sh/forge/invariant-testing)
- [Echidna](https://github.com/crytic/echidna) · [Medusa](https://github.com/crytic/medusa)
- [Trail of Bits — Program analysis with Echidna](https://secure-contracts.com/program-analysis/echidna/)
- [Kakarot H-05 — off-by-one lộ ra khi so với Geth](https://github.com/code-423n4/2024-09-kakarot-findings/issues/50)

## Liên kết

[[Invariant Discovery]] · [[Foundry for Auditors]] · [[Formal Verification]] · [[Proof of Concept Discipline]] · [[Blockchain]]
