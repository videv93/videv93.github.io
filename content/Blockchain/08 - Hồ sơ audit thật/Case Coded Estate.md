---
tags: [audit, case-study, cosmwasm, nft]
status: evergreen
---
# Case Coded Estate

> ⚠️ Đọc [[Contest Severity vs Real Risk]] trước — **6/9 High chỉ được sponsor *acknowledged*, không sửa.**

> **Code4rena Invitational, 4–11/10/2024. Rust / CosmWasm trên Nibiru. 13 contract, 2.647 dòng. 4 warden. Judge: Lambda.**
> Kết quả: **9 High, 9 Medium, 3 báo cáo QA** — trong **một tuần**. Đây là hình dạng của một audit trên codebase chưa trưởng thành, và là ca đáng học nhất về lớp lỗi *thiếu kiểm tra*.

## 1. Protocol

Cho thuê bất động sản token hoá: NFT đại diện một bất động sản, có thể **bán**, **cho thuê ngắn hạn**, hoặc **cho thuê dài hạn** — ba luồng chạy trên **cùng một struct**, phân biệt bằng một cờ `rental_type`.

Chính kiến trúc "ba luồng, một struct" là nguyên nhân gốc của gần một nửa số finding.

## 2. Chín High, gom thành bốn gốc

| Gốc | Finding | Cơ chế |
|---|---|---|
| **Approval sống lâu hơn lý do của nó** | H-05, H-08 | Huỷ bid không revoke approval ⇒ lấy NFT miễn phí. H-08 dùng `send_nft` (đường transfer không có thanh toán) |
| **Trạng thái đổi được khi còn nghĩa vụ dở** | H-06, H-07, H-01 | Đổi `denom` khi còn bid/chưa quyết toán ⇒ đặt cọc token rẻ, rút token đắt |
| **Không kiểm tra đầu vào / cờ** | H-02, H-03, H-04 | Không kiểm `islisted`, không kiểm giá khớp, không kiểm `rental_type` |
| **Xoá không sạch** | H-09 | `burn` xoá dữ liệu rental kèm tiền cọc ⇒ **tiền kẹt vĩnh viễn** |

Chi tiết ở [[Missing Input Validation]], [[Stale Approval and Delegation]], [[Broken State Lifecycle]].

## 3. Ba mẫu chuyển được sang mọi codebase

### a. Trường struct không ai đọc (H-04)
`Rental` **có** trường `rental_type` (short/long). **Không hàm nào đọc nó.** Vì hai loại thuê dùng `denom` khác nhau, attacker đặt phòng ngắn hạn bằng TokenX (\$0,01) rồi huỷ bằng hàm dài hạn, nhận hoàn bằng USDC (\$1) — lãi 100 lần, lấy từ tiền người dùng khác.

**Phép kiểm rẻ:** `grep -c "<tên trường>"`. Xuất hiện 1–2 lần (khai báo + gán) nghĩa là không ai đọc nó.

### b. Hai đường làm cùng một việc (H-08)
`transfer_nft` có logic thanh toán. `send_nft` **không**. Attacker được approve rồi đi cửa sau.

**Phép kiểm:** liệt kê **mọi** đường một tài sản rời khỏi contract, so danh sách kiểm tra của từng đường.

### c. Cửa sổ giữa "hết hạn" và "quyết toán" (H-07)
`check_can_edit_short` chỉ kiểm `now > check_out_time`, không kiểm đã `finalize` chưa. Chủ nhà đổi `denom` trong cửa sổ đó rồi mới quyết toán.

**Phép kiểm:** với mỗi điều kiện "được phép sửa", hỏi nó phủ được **toàn bộ vòng đời** hay chỉ một mốc.

## 4. Phản hồi của sponsor — và vì sao nó đáng đọc

| Finding | Sponsor nói | Kết quả |
|---|---|---|
| M-02 (DoS vector không cap) | *"Không ai set mảng dài như vậy"* | Giữ Medium |
| M-03 (`u64` quá hẹp) | *"Chúng tôi dùng token 6 decimals"* | Giữ Medium |
| M-05 (huỷ không hoàn tiền) | *"Đây là logic có chủ đích"* | Giữ Medium — **không có tài liệu nào nói vậy** |
| M-06 (đặt chỗ miễn phí) | *"Chúng tôi có logic từ chối thủ công"* | Giữ Medium |
| M-09 (tham số `owner` bị bỏ qua) | *"Thực ra không gây vấn đề gì"* | Giữ Medium |

Tất cả đều là **giả định vận hành thay cho biện pháp kỹ thuật**. Chúng không sai về mặt vận hành — nhưng chúng không nằm trong code, không nằm trong tài liệu, và người dùng không biết. Xem [[Scoping and Threat Modeling]] mục 1c.

> [!warning] 6/9 High chỉ *acknowledged*
> Báo cáo hoàn tất, thưởng được trả, warden có điểm. Và code vẫn có sáu lỗ hổng High. Một báo cáo audit ghi lại **ai tìm ra gì**, không ghi **cái gì đã được sửa**.

## 5. Ca đáng đọc nhất: M-08 (`tokenURI` tuỳ ý)

Bốn vòng tranh luận giữa hai warden và judge, trong đó **warden giỏi nhất của audit lại lập luận rằng finding nên bị hạ xuống QA**. Toàn bộ ở [[Metadata and Off-chain Trust]] — đây là ca đáng đọc nguyên văn.

## 6. Bài học tổng

- **Kiến trúc "nhiều luồng, một struct" là cờ đỏ.** Nếu một cờ phân biệt các luồng, cờ đó phải được kiểm ở **mọi** hàm.
- **Ngôn ngữ không quan trọng.** Đây là Rust/CosmWasm, không phải Solidity. Cả chín High đều có bản đối ứng trong thế giới EVM. Xem [[Cross-case Patterns]].
- **Audit một tuần trên 2.647 dòng ra 18 finding** — mật độ này nói về codebase, không về warden.

## Tham khảo

- [Coded Estate audit report (Code4rena, 10/2024)](https://code4rena.com/reports/2024-10-coded-estate) — đầy đủ trong `_archive-seed/Coded Estate.md`
- [Repo contest](https://github.com/code-423n4/2024-10-coded-estate)
- [CW-721 spec](https://github.com/public-awesome/cw-nfts/blob/main/packages/cw721/README.md)
- [Nibiru — tokenfactory](https://github.com/NibiruChain/nibiru)

## Liên kết

[[Missing Input Validation]] · [[Broken State Lifecycle]] · [[Metadata and Off-chain Trust]] · [[Cross-case Patterns]] · [[Blockchain]]
