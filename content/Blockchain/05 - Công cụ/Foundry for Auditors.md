---
tags: [công-cụ, foundry]
status: evergreen
---
# Foundry for Auditors

> Foundry là công cụ **duy nhất** không thể bỏ. Không phải vì nó chạy test, mà vì nó cho phép dựng một PoC trên trạng thái mainnet thật trong 20 phút — và PoC là thứ biến giả thuyết thành finding.

## 1. Bốn thành phần

| Lệnh | Dùng để |
|---|---|
| `forge` | Build, test, fuzz, invariant, coverage, gas report |
| `cast` | Gọi contract đã deploy, đọc storage, decode calldata |
| `anvil` | Node cục bộ, fork mainnet |
| `chisel` | REPL Solidity — thử một biểu thức trong 2 giây |

## 2. Mười lệnh dùng nhiều nhất khi audit

```bash
forge build --sizes                    # giới hạn 24KB
forge test -vvvv --match-test tenTest  # trace đầy đủ từng opcode-level call
forge coverage --report lcov           # vùng nào không có test = vùng đáng đọc
forge inspect Contract storage-layout  # diff layout khi upgrade
forge inspect Contract methods         # bảng selector
forge test --gas-report                # chi phí thật của một cuộc tấn công
forge fmt --check                      # không đổi code khi review

cast call <addr> "balanceOf(address)(uint256)" <who> --rpc-url $RPC
cast storage <addr> 3 --rpc-url $RPC   # đọc slot trực tiếp
cast 4byte-decode <calldata>           # calldata lạ là hàm gì
cast run <txhash> --rpc-url $RPC       # replay một tx đã xảy ra, có trace
```

`cast run` là lệnh dùng khi điều tra một vụ hack đã xảy ra — xem [[Onchain Investigation Tools]].

## 3. Fork testing — dựng PoC trên trạng thái thật

```solidity
function setUp() public {
    vm.createSelectFork(vm.envString("MAINNET_RPC"), 19_000_000);  // ghim block!
    victim = IProtocol(0x...);
}
```

Ghim block number là bắt buộc: không ghim thì test đổi kết quả theo ngày, và không tái lập được.

```bash
forge test --fork-url $RPC --fork-block-number 19000000
```

## 4. Cheatcode theo mục đích audit

| Mục đích | Cheatcode |
|---|---|
| Giả danh actor | `vm.prank`, `vm.startPrank` |
| Cấp tiền | `deal(token, who, amount)`, `vm.deal` |
| Nhảy thời gian/block | `vm.warp`, `vm.roll` — dựng PoC vòng đời, xem [[Broken State Lifecycle]] |
| Chứng minh nạn nhân bị chặn | `vm.expectRevert` |
| PoC chữ ký | `vm.sign`, `vm.addr` |
| Ghi thẳng storage | `vm.store` — **dùng dè dặt**, xem cạm bẫy |
| Kiểm event | `vm.expectEmit` |
| Bỏ qua fuzz input vô nghĩa | `vm.assume`, `bound()` |

## 5. Fuzz và invariant

```bash
forge test --fuzz-runs 100000
forge test --match-contract Invariant --show-metrics   # kiểm coverage thật của fuzz
```

```toml
# foundry.toml
[invariant]
runs = 256
depth = 500
fail_on_revert = false   # true khi handler đã chuẩn — bắt được nhiều hơn
```

Xem [[Fuzzing and Invariant Testing]] và [[Invariant Discovery]].

## 6. Cạm bẫy

1. **`vm.store` để dựng trạng thái không tới được bằng hàm public** ⇒ PoC chứng minh một bug không tồn tại. Xem [[Proof of Concept Discipline]].
2. **Không ghim block khi fork** ⇒ test không tái lập được.
3. **`fail_on_revert = false` mãi mãi** ⇒ fuzzer tiêu hết thời gian vào lời gọi revert ngay, coverage thật gần 0.
4. **Chỉ chạy test của sponsor.** Chúng viết cho happy path.
5. **Không khai `evm_version`** ⇒ compile với `PUSH0` rồi deploy lên chain chưa hỗ trợ. Xem [[Solidity Version Pitfalls]].
6. **Bỏ qua `forge coverage`** — nó chỉ thẳng vào chỗ đáng đọc nhất.
7. **Test pass vì lý do khác giả thuyết.** Luôn sửa bug rồi chạy lại; test phải fail.

## 7. Checklist áp dụng

- [ ] Repo build và test pass được chưa? Nếu không, hỏi sponsor trước khi làm gì khác.
- [ ] Đã chạy `forge coverage` và ghi lại vùng 0% chưa?
- [ ] Đã chạy `forge inspect storage-layout` cho contract upgradeable chưa?
- [ ] PoC có ghim block number khi fork không?
- [ ] Trạng thái ban đầu của PoC có đạt được **chỉ bằng hàm public** không?
- [ ] Đã đo gas của cuộc tấn công để chứng minh nó có lãi chưa?
- [ ] `foundry.toml` khai `evm_version`, `optimizer_runs`, `via_ir` rõ ràng chưa? Test chạy cùng cấu hình chứ?
- [ ] Đã thử `fail_on_revert = true` cho invariant chưa?

## Tham khảo

- [Foundry Book](https://book.getfoundry.sh/)
- [Foundry cheatcode reference](https://book.getfoundry.sh/cheatcodes/)
- [Foundry — Invariant testing](https://book.getfoundry.sh/forge/invariant-testing)
- [Nascent — simple-security-toolkit](https://github.com/nascentxyz/simple-security-toolkit)

## Liên kết

[[Proof of Concept Discipline]] · [[Fuzzing and Invariant Testing]] · [[Static Analysis Tools]] · [[Onchain Investigation Tools]] · [[Blockchain]]
