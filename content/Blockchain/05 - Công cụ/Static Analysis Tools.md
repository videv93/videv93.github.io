---
tags: [công-cụ, static-analysis]
status: evergreen
---
# Static Analysis Tools

> [!note] Ghi chú nguồn
> Trả một header rỗng trong seed: `Smart Contract Auditing.md` chứa link chết tới `LighChaserv3` — LightChaser, một công cụ static analysis dùng trong các contest Code4rena.

> Static analysis **không tìm bug cho bạn**. Nó dựng bản đồ và lọc bớt lớp lỗi mẫu, để bạn dành thời gian đọc vào chỗ máy không nhìn được. Dùng nó ở pha 2, không phải pha 4.

## 1. Bảng công cụ

| Tên | Loại | Mạnh ở | Yếu ở |
|---|---|---|---|
| **Slither** | Static, Python | Detector phong phú, **printer** để dựng bản đồ | Nhiều false positive; mù với assembly |
| **Aderyn** | Static, Rust | Nhanh, output Markdown gọn | Ít detector hơn Slither |
| **LightChaser** | Static, dùng trong contest | Tối ưu cho báo cáo QA/Gas hàng loạt | Sinh nhiều finding trùng lặp, dễ spam |
| **solhint** | Linter | Style + vài rule bảo mật (pragma floating) | Không phân tích luồng dữ liệu |
| **4naly3er** | Tổng hợp | Báo cáo QA/Gas chuẩn cho contest | Như trên |
| **Semgrep (rules cho Solidity)** | Pattern matching | Viết rule riêng cho một codebase | Cần tự viết rule |

## 2. Slither dùng đúng cách: printer > detector

Giá trị lớn nhất của Slither không phải detector mà là **printer** — chúng dựng bản đồ codebase trong 30 giây:

```bash
slither . --print contract-summary      # mọi hàm, visibility, modifier
slither . --print function-summary      # hàm nào đọc/ghi state nào
slither . --print inheritance-graph     # thứ tự C3 → thứ tự storage slot
slither . --print data-dependency       # biến nào phụ thuộc input nào
slither . --print variable-order         # đối chiếu storage layout khi upgrade
slither . --print human-summary         # tổng quan độ phức tạp
slither . --print modifiers             # hàm nào KHÔNG có modifier ← rất hữu ích
```

Printer cuối là một trong những cách nhanh nhất để tìm hàm thiếu phân quyền — xem [[Access Control Patterns]].

## 3. Detector đáng tin và detector gây nhiễu

| Đáng đọc | Thường là nhiễu |
|---|---|
| `reentrancy-eth`, `reentrancy-no-eth` | `naming-convention` |
| `unchecked-transfer` | `solc-version` (đã biết) |
| `arbitrary-send-eth` | `low-level-calls` |
| `uninitialized-state`, `uninitialized-storage` | `assembly` (chỉ báo có assembly) |
| `incorrect-equality` (`==` với timestamp/balance) | `costly-loop` |
| `shadowing-state` | `dead-code` (nhưng xem cạm bẫy 5) |
| `unused-return` | |

## 4. Cái static analysis **không** tìm được

Đây là phần quan trọng nhất của note. Đối chiếu với các finding trong seed:

| Finding | Công cụ có bắt được không |
|---|---|
| Coded Estate H-04 — `rental_type` không ai đọc | ❌ (`dead-code` có thể gợi ý, nhưng không nói được hậu quả) |
| Coded Estate H-05 — huỷ bid giữ approval | ❌ logic nghiệp vụ |
| Coded Estate M-03/M-04 — `u64` quá hẹp | ❌ cần biết miền giá trị thật |
| Gondi M-01 — revoke sai `rights` | ❌ cần đọc contract bên thứ ba |
| Kakarot H-01 — whitelist theo code address | ❌ |
| Kakarot H-06 — ba chữ ký hợp lệ | ❌ cần biết spec ECDSA |

**Không một finding High nào trong seed tìm được bằng công cụ.** Đó không phải lời chê công cụ — mà là mô tả đúng phân công lao động.

> [!warning] Đừng nộp output công cụ làm finding
> Trong contest, nộp hàng loạt finding sinh máy (LightChaser, 4naly3er) làm loãng hồ sơ và bị judge trừ điểm. Công cụ để **định hướng** việc đọc, không phải để thay việc đọc.

## 5. Cạm bẫy

1. **Chạy công cụ rồi coi như xong pha recon.** Bản đồ ≠ lãnh thổ.
2. **Bỏ qua warning vì "quá nhiều".** Lọc theo detector đáng tin ở mục 3 và đọc hết nhóm đó.
3. **Tin `dead-code` là vô hại.** Gondi L-09 (`using BytesLib` không dùng) là code chết — không phải bug, nhưng là **bằng chứng code chưa được ai đọc lại**, tức là chỉ dấu nên đọc kỹ khu vực đó.
4. **Mù với assembly.** Slither gần như không thấy gì trong block `assembly`. Xem [[Inline Assembly and Yul]].
5. **Không chạy trên toàn bộ dependency.** Bug có thể nằm ở thư viện bạn cho là an toàn.
6. **Không dùng `slither-check-upgradeability`** cho contract proxy — nó bắt được cả một lớp lỗi layout.

## 6. Checklist áp dụng

- [ ] Đã chạy toàn bộ printer của Slither và lưu output làm bản đồ chưa?
- [ ] Đã dùng `--print modifiers` để tìm hàm thiếu phân quyền chưa?
- [ ] Đã lọc detector theo nhóm đáng tin và đọc hết nhóm đó chưa?
- [ ] Với contract upgradeable: đã chạy `slither-check-upgradeability` chưa?
- [ ] Đã đánh dấu mọi block `assembly` là vùng công cụ không thấy chưa?
- [ ] Có finding nào định nộp mà **chỉ** dựa vào output công cụ không? (đừng)
- [ ] Đã đối chiếu vùng công cụ báo sạch với vùng `forge coverage` báo 0% chưa? Giao của hai vùng là chỗ đáng đọc nhất.

## Tham khảo

- [Slither](https://github.com/crytic/slither) và [danh sách detector](https://github.com/crytic/slither/wiki/Detector-Documentation)
- [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation)
- [Aderyn](https://github.com/Cyfrin/aderyn)
- [4naly3er](https://github.com/Picodes/4naly3er)
- [solhint](https://protofire.github.io/solhint/)

## Liên kết

[[Manual Review Techniques]] · [[Foundry for Auditors]] · [[Audit Workflow]] · [[Inline Assembly and Yul]] · [[Blockchain]]
