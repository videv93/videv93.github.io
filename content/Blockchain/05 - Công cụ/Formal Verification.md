---
tags: [công-cụ, formal-verification]
status: evergreen
---
# Formal Verification

> Fuzzing trả lời *"tôi thử 100.000 lần và không thấy sai"*. Formal verification trả lời *"không tồn tại đầu vào nào làm sai"*. Khác biệt đó đáng giá — nhưng chỉ ở những chỗ rất cụ thể.

## 1. Ba công cụ

| Tên | Cách hoạt động | Dùng khi |
|---|---|---|
| **Halmos** | Thực thi ký hiệu trên bytecode, viết test bằng Solidity | Rẻ nhất để bắt đầu — biến `forge` test thành chứng minh |
| **Kontrol** (K framework) | Chứng minh trên ngữ nghĩa EVM hình thức | Cần bảo đảm mạnh, kể cả với assembly |
| **Certora Prover** | Ngôn ngữ đặc tả riêng (CVL), thương mại | Protocol lớn, cần chứng minh bất biến toàn hệ |

## 2. Halmos — chi phí thấp nhất

Nếu bạn đã có test Foundry, Halmos chạy được gần như ngay:

```solidity
function check_noOverflowInFeeCalc(uint256 amount, uint256 feeBps) public {
    vm.assume(feeBps <= 10_000);
    uint256 fee = protocol.calcFee(amount, feeBps);
    assert(fee <= amount);            // với MỌI amount, không phải 100k mẫu
}
```
```bash
halmos --function check_
```

Đây là cách chứng minh những mệnh đề mà [[Integer and Precision Bugs]] nêu: không tràn, làm tròn đúng phía, kết quả không vượt giới hạn.

## 3. Dùng ở đâu là đáng công

| Đáng | Không đáng |
|---|---|
| Thư viện toán (`mulDiv`, đường cong AMM, lãi kép) | Logic nghiệp vụ phức tạp nhiều bước |
| Chuyển đổi kiểu / mã hoá / parse | Bất cứ gì phụ thuộc contract ngoài |
| Access control (không đường nào tới hàm X mà không qua modifier Y) | Hành vi thị trường, kinh tế |
| Bất biến kế toán trên một contract | Tương tác nhiều protocol |
| So khớp hai cài đặt (equivalence) | Vấn đề ở tầng vận hành |

**Ba High của Kakarot đều nằm trong cột trái**: chuyển đổi byte, hàm hash, kiểm dải chữ ký. Đó là những chỗ formal verification mạnh nhất — và cũng là nơi đọc bằng mắt yếu nhất.

## 4. Chỗ nó không giúp được

> [!warning] Formal verification chứng minh code khớp với **đặc tả bạn viết**
> Nếu đặc tả sai, chứng minh vẫn thành công. Coded Estate M-05 (huỷ không hoàn tiền) sẽ **qua** mọi chứng minh nếu đặc tả không nói gì về hoàn tiền — mà không tài liệu nào của họ nói cả. Vấn đề gốc là **không có đặc tả**, không phải thiếu công cụ.

Cũng không giúp được với: [[Front-running and MEV]], [[Oracle Manipulation]], [[Composability Risk]], và mọi thứ ở [[Economic Attacks]].

## 5. Cạm bẫy

1. **Đặc tả chỉ mô tả lại code.** Nếu spec là bản dịch của implementation thì chứng minh vô nghĩa.
2. **Vòng lặp không giới hạn** ⇒ phải đặt bound ⇒ chứng minh chỉ đúng trong bound đó. Ghi rõ điều này.
3. **Loop unrolling che mất bug ở lần lặp thứ N+1.**
4. **Timeout được coi là pass.** Kiểm output kỹ: `unknown` ≠ `verified`.
5. **Chi phí thời gian.** Certora cần người chuyên trách; đừng đưa vào một audit hai tuần.
6. **Chứng minh trên code đã sửa** trong khi bản deploy là code khác.

## 6. Checklist áp dụng

- [ ] Có thư viện toán / hàm chuyển đổi / parse nào đáng chứng minh không?
- [ ] Đặc tả có **độc lập** với implementation không, hay chỉ dịch lại code?
- [ ] Có cài đặt tham chiếu để chứng minh tương đương không?
- [ ] Mọi vòng lặp có bound rõ ràng không? Bound đó đã ghi vào báo cáo chưa?
- [ ] Kết quả là `verified` hay `unknown`/`timeout`?
- [ ] Đã chứng minh trên đúng commit sẽ deploy chưa?
- [ ] Những gì **không** được bao phủ bởi chứng minh đã được nêu rõ chưa?

## Tham khảo

- [Halmos](https://github.com/a16z/halmos) — symbolic testing viết bằng Solidity
- [Kontrol](https://docs.runtimeverification.com/kontrol) — K framework cho EVM
- [Certora Prover documentation](https://docs.certora.com/)
- [Trail of Bits — Manticore & symbolic execution](https://secure-contracts.com/program-analysis/)

## Liên kết

[[Fuzzing and Invariant Testing]] · [[Invariant Discovery]] · [[Integer and Precision Bugs]] · [[Inline Assembly and Yul]] · [[Blockchain]]
