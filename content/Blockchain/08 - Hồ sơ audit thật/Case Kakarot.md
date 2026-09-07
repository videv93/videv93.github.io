---
tags: [audit, case-study, cairo, zkevm]
status: evergreen
---
# Case Kakarot

> **Code4rena, 27/9 – 25/10/2024. Cairo (zkEVM trên Starknet). 63 contract, 15.398 dòng. 23 warden. Judge: LSDan. Mitigation review: Zenith / RadiantLabs.**
> Kết quả: **6 High, 11 Medium, 13 QA**, cộng một vòng mitigation review tìm ra **5/33 bản vá sai hoặc chưa đủ**.
> Đây là ca duy nhất trong seed có mitigation review — và đó là phần giá trị nhất của nó.

## 1. Protocol

Kakarot là **zkEVM**: một cài đặt EVM viết bằng Cairo, chạy trên Starknet. Nghĩa là lỗ hổng không nằm ở logic nghiệp vụ mà ở **tầng dưới ngôn ngữ hợp đồng** — trong chính máy ảo, trong precompile, trong hệ thống chứng minh.

Đó là lý do case này thuộc về vault này dù không có dòng Solidity nào: **nó cho thấy giả định nào của bạn có thể sai khi deploy lên một chain không phải Ethereum.**

## 2. Sáu High, gom thành ba gốc

| Gốc | Finding | Cơ chế |
|---|---|---|
| **Nhầm ngữ cảnh thực thi** | H-01 | Whitelist precompile theo **code address** ⇒ `delegatecall` vào contract đã whitelist là mượn được đặc quyền |
| **Prover cheat được** (đặc thù ZK) | H-02, H-03, H-04 | Dictionary không finalize / underflow ⇒ prover chọn được giá trị đọc ra. H-02 cho phép **giả mạo địa chỉ CREATE/CREATE2** |
| **Lệch spec ở biên** | H-05, H-06 | `ripemd160` off-by-one tại `len == 55`; `ecrecover` chấp nhận `s` ngoài dải ⇒ **ba chữ ký hợp lệ** thay vì hai |

Chi tiết: [[Delegatecall and Context Confusion]], [[Signature Malleability]], [[Factory and CREATE2]].

## 3. Ba bài học cho auditor Solidity

### a. "EVM-compatible" không phải "EVM-equivalent"
Trên Kakarot, một contract đã audit kỹ trên Ethereum vẫn có thể mất tiền, vì:
- `ecrecover` chấp nhận tập chữ ký **rộng hơn**
- `ripemd160` trả hash **sai** cho input độ dài `55 + k·64`
- `blockhash` crash ở biên
- Address aliasing áp cho **cả EOA** (M-02)

**Câu hỏi bắt buộc trong pha scoping: *deploy lên chain nào?*** Xem [[Scoping and Threat Modeling]].

### b. Biện pháp phòng thủ chỉ đúng trong mô hình thực thi của nó
M-07/M-08: một lời gọi panic ở tầng VM chủ làm **cả transaction chết ở mức RPC** — `try/catch` của Solidity và cả `ExcessivelySafeCall` của LayerZero đều **không** bắt được. Bất kỳ ai cũng ép được điều đó bằng một transfer vượt số dư.

Xem [[Denial of Service Patterns]].

### c. Guard phải nằm ở ranh giới, không ở lối vào
M-06: reentrancy check nằm ở `account_contract`, liệt kê những lời gọi bị cấm — và bỏ sót một đường. Khuyến nghị được chấp nhận: **bỏ guard ở tầng account, đặt ở `Kakarot.eth_call`** — chỗ duy nhất mọi thực thi phải đi qua. Xem [[Reentrancy]].

## 4. Mitigation review — phần đáng giá nhất

| Trạng thái | Số lượng |
|---|---|
| 🟢 Confirmed | 28 |
| 🔴 Partially Mitigated / Error | **5** |

Bốn dạng lỗi bản vá (PR 1565 vá một nửa, PR 1566 vá sai chỗ, PR 1584 tạo bug mới, PR 1593 off-by-one trong chính bản vá, PR 1616 phá vỡ hành vi đã hỗ trợ) được phân tích ở [[Mitigation Review]].

> [!warning] Không có pha này thì 5 lỗ hổng vẫn còn nguyên
> Và mọi bên đều đã tin rằng chúng đã được sửa.

## 5. Tranh luận severity đáng đọc

| Finding | Sponsor | Judge |
|---|---|---|
| M-02 (aliasing cho EOA) | *"Severity: Low. Không có rủi ro bảo mật nào"* + viện dẫn "incorrect as to spec" = Low | Giữ Medium: chức năng bị chặn ngoài ý muốn |
| M-03 (không huỷ được message) | *"loss of fees is a LOW"* | Giữ Medium — judge tự nhận **đã tham gia viết quy tắc đó**, giải thích ý định gốc |
| M-05 (`0^0 = 0`) | — | Medium theo quy tắc *speculation on future code* |

Xem [[Severity Classification]] và [[Contest Severity vs Real Risk]].

## 6. Điều đáng khen

- **23 warden, 15.398 dòng** ⇒ ~670 dòng/người. So với Gondi (~2.000). Mật độ mắt cao nhất trong ba case.
- **Có mitigation review độc lập** — dấu hiệu trưởng thành của quy trình mạnh hơn bất kỳ con số finding nào.
- **Sponsor tranh luận công khai bằng dẫn chứng tài liệu**, không phủ nhận suông.
- **H-01: warden ngăn được một quyết định kiến trúc sai** — team đã dự định gỡ bỏ cơ chế whitelist trước khi hiểu ra rủi ro delegatecall.

## 7. Phép kiểm chuyển được sang codebase khác

- [ ] Contract deploy lên chain nào? Chain đó lệch EVM ở chỗ nào? Đã đọc trang "differences" của nó chưa?
- [ ] Có dùng precompile nào không? Cài đặt của chain đích có đúng spec ở **biên** không?
- [ ] Mọi whitelist kiểm **execution address** hay **code address**?
- [ ] Mọi guard đặt ở **ranh giới** hay ở một **lối vào**?
- [ ] Biện pháp phòng thủ (`try/catch`, `ExcessivelySafeCall`) có còn đúng trong mô hình thực thi của chain đích không?
- [ ] Đã lên lịch pha mitigation review chưa? (15% bản vá ở đây là sai)

## Tham khảo

- [Kakarot audit + mitigation review (Code4rena, 9/2024)](https://code4rena.com/reports/2024-09-kakarot) — đầy đủ trong `_archive-seed/Kakarot.md`
- [Kakarot repo](https://github.com/kkrt-labs/kakarot)
- [pwning.eth — Moonbeam `msg.sender` impersonation](https://pwning.mirror.xyz/okyEG4lahAuR81IMabYL5aUdvAsZ8cRCbYBXh8RHFuE)
- [Cairo documentation — default_dict](https://docs.cairo-lang.org/reference/common_library.html)

## Liên kết

[[Mitigation Review]] · [[Delegatecall and Context Confusion]] · [[Signature Malleability]] · [[Cross-domain Message Bugs]] · [[Cross-case Patterns]] · [[Blockchain]]
