---
tags: [audit, quy-trình]
status: evergreen
---
# Manual Review Techniques

> Công cụ tìm được lỗi mẫu. **Bug đắt tiền là bug logic nghiệp vụ**, và cách duy nhất tìm ra nó là đọc — nhưng đọc có phương pháp, không phải đọc từ trên xuống.

## 1. Bốn hướng đọc

| Hướng | Cách làm | Bắt được gì |
|---|---|---|
| **Đi ngược từ tiền** | Tìm mọi `transfer`/`call{value}`, đi ngược lên xem điều kiện nào cho phép | Coded Estate H-01, H-03, H-08 |
| **Theo vòng đời thực thể** | Vẽ máy trạng thái của loan/rental/listing | H-09, H-07, M-05 |
| **So sánh cặp song song** | Đặt hai hàm tương tự cạnh nhau, diff từng dòng | H-04, H-08, M-05 |
| **Đối chiếu spec** | Đọc NatSpec/README trước, code sau | Gondi M-01 |

### Đi ngược từ tiền — kỹ thuật hiệu quả nhất
```bash
grep -rn "transfer\|safeTransfer\|call{value" src/ | wc -l
```
Với mỗi kết quả, hỏi ngược: *ai gọi được hàm này → điều kiện gì → điều kiện đó ai đặt → có đổi được sau khi kiểm không?* Đây là cách nnez tìm ra sáu trong chín High của Coded Estate.

### So sánh cặp song song
Mọi khi codebase có `doXForShortTerm` và `doXForLongTerm`, hoặc `transfer_nft` và `send_nft`, đặt chúng cạnh nhau:

```bash
diff <(sed -n '/fn setreservationforshortterm/,/^}/p' src/execute.rs) \
     <(sed -n '/fn setreservationforlongterm/,/^}/p' src/execute.rs)
```

**Ba finding High của Coded Estate lộ ra chỉ bằng thao tác này.** Chỗ hai hàm khác nhau mà không có lý do là chỗ có bug.

## 2. Bảy câu hỏi cho mỗi hàm

1. Ai gọi được?
2. Gọi ở trạng thái nào được?
3. Mỗi tham số có dải hợp lệ nào? Được kiểm không?
4. Có gọi ra ngoài không? State đã xong trước đó chưa?
5. Có vòng lặp không? Ai điều khiển độ dài?
6. Nếu hàm này revert, cái gì kẹt?
7. Nếu gọi hai lần liên tiếp / gọi cùng block với hàm khác, có gì hỏng không?

## 3. Ba cờ đỏ đọc bằng mắt

> [!warning] Ba dấu hiệu đáng dừng lại ngay
> 1. **Một trường struct không bao giờ được đọc.** Coded Estate H-04: `rental_type` tồn tại và không hàm nào dùng.
> 2. **Một tham số được nhận nhưng không dùng.** Coded Estate M-09: `mint(owner, …)` bỏ qua `owner`.
> 3. **Code chết.** Gondi L-09: `using BytesLib for bytes` không dùng ở đâu. Không phải bug, nhưng chứng tỏ **code chưa được ai đọc lại**.

Cả ba tìm được bằng `grep -c` — đếm số lần xuất hiện của mỗi định danh. Xuất hiện 1–2 lần (khai báo + gán) nghĩa là **không ai đọc nó**.

## 4. Thói quen ghi chép

- **Một file câu hỏi**, không phải file finding. Mỗi dòng: `[file:line] câu hỏi | độ tin | tác động nếu đúng`.
- **Không đuổi theo ngay.** Ghi rồi đi tiếp. Đuổi ở pha 4.
- **Ghi cả giả thuyết bị bác** và lý do — nó ngăn bạn đi lại đúng con đường đó vào ngày thứ tư, và nó thành nội dung cho phần "Analysis" của báo cáo.
- **Đánh dấu `@audit` ngay trong code** như warden trong seed đã làm: `//@audit-info a borrower can pass custom rights`.

## 5. Cạm bẫy

1. **Đọc từ file đầu tới file cuối.** Đọc theo **luồng tiền**, không theo thứ tự thư mục.
2. **Đọc code test trước code chính** — bạn sẽ thừa hưởng đúng những giả định của tác giả.
3. **Bỏ qua file "tiện ích".** Ba High của Kakarot ở hàm chuyển đổi byte.
4. **Tin comment.** Comment là ý định, code là hành vi; chênh lệch giữa chúng là finding.
5. **Đọc mà không chạy.** Một `forge test` với `console.log` trả lời nhanh hơn nửa giờ suy luận.
6. **Không nghỉ.** Sau ~4 giờ đọc liên tục, tỉ lệ bỏ sót tăng mạnh. Chia buổi.

## 6. Checklist áp dụng

- [ ] Đã liệt kê mọi điểm tiền rời khỏi contract và đi ngược từ mỗi điểm chưa?
- [ ] Đã tìm mọi cặp hàm song song và diff chúng chưa?
- [ ] Đã đếm số lần xuất hiện của mỗi trường struct và mỗi tham số chưa? Cái nào chỉ 1–2 lần?
- [ ] Đã trả lời bảy câu hỏi ở mục 2 cho mọi hàm `external`/`public` chưa?
- [ ] Có file câu hỏi riêng, kèm cột độ tin và tác động chưa?
- [ ] Đã đối chiếu NatSpec/README với hành vi thật của code chưa?
- [ ] Đã xem `forge coverage` để biết vùng nào không có test chưa?
- [ ] Đã ghi lại cả những giả thuyết **bị bác** và lý do chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| `forge coverage` | Tìm vùng không test | https://book.getfoundry.sh/ |
| Slither printers | `contract-summary`, `function-summary`, `data-dependency` | https://github.com/crytic/slither |
| Solidity Metrics (VS Code) | Bảng độ phức tạp theo file | https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-metrics |
| Solidity Visual Developer | Tô màu visibility và state mutation | https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor |

## Tham khảo

- [Trail of Bits — Manual review guidelines](https://secure-contracts.com/)
- [Secureum — Audit Techniques & Tools 101](https://secureum.substack.com/p/audit-techniques-and-tools-101)
- [Coded Estate H-04](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/7) — trường struct không ai đọc
- [Solodit](https://solodit.xyz/) — đọc finding của người khác để học cách nhìn

## Liên kết

[[Audit Workflow]] · [[Vulnerability Taxonomy]] · [[Invariant Discovery]] · [[Static Analysis Tools]] · [[Blockchain]]
