---
tags: [audit, quy-trình, poc]
status: evergreen
---
# Proof of Concept Discipline

> **Mọi finding High trong seed đều có test chạy được.** Đó không phải trùng hợp — PoC là thứ biến "tôi nghĩ điều này có thể xảy ra" thành "điều này xảy ra, đây là output". Nó thuyết phục judge, và quan trọng hơn: nó **bảo vệ bạn khỏi chính mình**.

## 1. PoC làm ba việc

| Việc | Vì sao quan trọng |
|---|---|
| **Chứng minh với judge** | Sponsor không dispute được một test đang chạy |
| **Bác bỏ giả thuyết sai của chính bạn** | Phần lớn PoC bạn viết sẽ **fail** — đó là giá trị lớn nhất |
| **Đo tác động thật** | Chỉ khi chạy mới biết mất bao nhiêu, tốn bao nhiêu gas |

## 2. Mẫu chuẩn từ seed

Warden `nnez` dùng đúng một mẫu cho cả sáu High của Coded Estate:

> 1. Boilerplate cho PoC [ở đây](gist link).
> 2. Thay toàn bộ `contracts/codedestate/src/multi_tests.rs` bằng boilerplate ở gist trên.
> 3. Chèn test dưới đây: `<code>`
> 4. Chạy `cargo test h6_cancel_bid_did_not_remove_bidder_from_approval -- --nocapture`.
> 5. Quan sát: test pass, chứng tỏ attacker lấy được token của người bán mà không trả gì.

Bốn thành phần bắt buộc, rút ra từ mẫu này:

1. **Boilerplate tách riêng** — người đọc dựng lại môi trường trong một bước.
2. **Tên test mô tả bug**, không phải `test1`.
3. **Lệnh chạy chính xác**, copy-paste được.
4. **Câu nói rõ phải quan sát cái gì** để kết luận bug là thật.

## 3. PoC trong Foundry

```solidity
contract StealApprovalPoC is Test {
    function setUp() public {
        vm.createSelectFork(vm.envString("MAINNET_RPC"), 19_000_000);
        // hoặc deploy sạch
    }

    function test_attackerStealsNFTWithoutPaying() public {
        // 1. ARRANGE — trạng thái ban đầu, ghi lại số dư
        uint256 sellerBefore = token.balanceOf(seller);

        // 2. ACT — từng bước của attack path, có comment đánh số
        vm.startPrank(attacker);
        market.bid(tokenId, price);        // bước 1: được approval
        market.cancelBid(tokenId);         // bước 2: hoàn tiền, GIỮ approval
        market.transferNft(tokenId, attacker); // bước 3: lấy NFT, trả 0
        vm.stopPrank();

        // 3. ASSERT — chứng minh tác động, không chỉ chứng minh không revert
        assertEq(nft.ownerOf(tokenId), attacker, "attacker khong lay duoc NFT");
        assertEq(token.balanceOf(seller), sellerBefore, "seller khong nhan duoc gi");
    }
}
```

> [!warning] Assert phải chứng minh **tác động**, không phải chứng minh code chạy
> `assertTrue(success)` không chứng minh gì. `assertEq(seller_balance_after, seller_balance_before)` chứng minh người bán mất NFT và không nhận đồng nào.

## 4. Cheatcode hay dùng

| Cheatcode | Dùng để |
|---|---|
| `vm.prank` / `startPrank` | Đổi `msg.sender` |
| `vm.deal` / `deal` | Cấp ETH/token |
| `vm.warp` / `vm.roll` | Nhảy thời gian / block — dựng PoC vòng đời |
| `vm.expectRevert` | Chứng minh **nạn nhân không làm được gì** (PoC cho DoS) |
| `vm.createSelectFork` | Chạy trên trạng thái mainnet thật |
| `vm.sign` | PoC chữ ký, malleability |
| `vm.record` / `vm.load` | Đọc slot storage trực tiếp |

**PoC cho DoS ngược với PoC cho trộm cắp:** không chứng minh attacker làm được gì, mà chứng minh **nạn nhân không làm được gì** — `vm.expectRevert` trên hàm rút tiền của nạn nhân.

## 5. Cạm bẫy

1. **PoC chứng minh sai thứ.** Test pass vì lý do khác với giả thuyết. Luôn thử **đảo ngược**: sửa bug rồi chạy lại — test phải fail.
2. **Dùng `deal` để tạo trạng thái không thể đạt được.** Nếu trạng thái đó không tới được qua các hàm public, bug không có thật.
3. **Quên chi phí.** Attack tốn \$50.000 gas để lấy \$100 không phải attack.
4. **Không tính điều kiện tiên quyết.** Nếu cần `auto_approve == true`, PoC phải set nó **qua hàm public**, không phải qua `vm.store`.
5. **PoC chạy trên bản code đã sửa.** Ghim commit hash trong báo cáo.
6. **Không chạy trước khi nộp.** Nghe hiển nhiên; vẫn xảy ra.
7. **Bỏ PoC vì "hiển nhiên".** Coded Estate M-08 cho thấy điều "hiển nhiên" với bạn có thể bị hai người khác phản bác trong bốn vòng tranh luận.

## 6. Checklist áp dụng

- [ ] Mỗi finding High/Medium có PoC chạy được không?
- [ ] Đã chạy PoC trên commit đúng và ghi commit hash chưa?
- [ ] Assert có chứng minh **tác động** (số dư, quyền sở hữu) chứ không chỉ "không revert" không?
- [ ] Đã thử **sửa bug và chạy lại** để xác nhận test fail chưa?
- [ ] Trạng thái ban đầu có đạt được **chỉ bằng các hàm public** không?
- [ ] Đã tính chi phí gas của cuộc tấn công chưa? Nó có lãi không?
- [ ] Báo cáo có kèm lệnh chạy chính xác và output kỳ vọng không?
- [ ] Với DoS: có dùng `vm.expectRevert` trên hành động của **nạn nhân** không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Foundry `forge test -vvvv` | Trace đầy đủ từng lời gọi | https://book.getfoundry.sh/ |
| Foundry cheatcodes | `prank`, `warp`, `deal`, `expectRevert` | https://book.getfoundry.sh/cheatcodes/ |
| `forge test --gas-report` | Đo chi phí cuộc tấn công | https://book.getfoundry.sh/ |
| Tenderly fork | PoC trên trạng thái mainnet, có UI | https://tenderly.co/ |

## Tham khảo

- [Foundry Book — Writing Tests](https://book.getfoundry.sh/forge/writing-tests)
- [Coded Estate — mẫu PoC 5 bước của nnez](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/6)
- [Kakarot H-02 — PoC cần brute-force offset](https://github.com/code-423n4/2024-09-kakarot-findings/issues/118)
- [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/) — luyện viết PoC

## Liên kết

[[Writing a Finding]] · [[Foundry for Auditors]] · [[Fuzzing and Invariant Testing]] · [[Practice Grounds]] · [[Blockchain]]
