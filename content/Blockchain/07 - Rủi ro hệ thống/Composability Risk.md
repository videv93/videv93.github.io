---
tags: [defi, rủi-ro, composability]
status: evergreen
---
# Composability Risk

> Seed nói thẳng lợi ích: *"Một trong những lợi ích của việc triển khai dịch vụ trên nền tảng đa dụng như Ethereum là khả năng kết nối các smart contract xuyên dự án, tăng thanh khoản và tiện ích của token."*
> Note này là mặt sau của câu đó: **mỗi kết nối là một giả định bạn không kiểm soát**, và bề mặt tấn công của bạn là hợp của mọi thứ bạn tích hợp.

## 1. Bốn dạng phụ thuộc

| Dạng | Ví dụ | Rủi ro |
|---|---|---|
| **Đọc dữ liệu** | Oracle, `totalSupply`, tỉ lệ vault | Dữ liệu thao túng được — [[Oracle Manipulation]] |
| **Gọi hành động** | Swap qua router, deposit vào vault | Revert, hành vi đổi, phí đổi |
| **Nhận lời gọi** | Là callback/hook cho protocol khác | Bị gọi ở trạng thái bất ngờ |
| **Chia sẻ tài sản** | Cấp approval cho contract khác | Bug của họ = mất tiền của bạn |

## 2. Bốn cách một tích hợp gãy

| Cách | Ví dụ |
|---|---|
| **Đối tác upgrade** | Contract bạn audit không còn là contract đang chạy |
| **Đối tác bị hack** | Tiền bạn approve cho họ bốc hơi |
| **Đối tác đổi hành vi hợp lệ** | Đổi phí, đổi decimals, thêm blocklist |
| **Đối tác dừng** | Pausable ⇒ chức năng của bạn đứng theo |

> [!warning] Approval vô hạn là composability risk lớn nhất và ít được nói nhất
> Cấp approval vô hạn cho một router nghĩa là **mọi lỗ hổng tương lai của router đó là lỗ hổng của người dùng bạn**. Nhiều vụ mất tiền lớn không phải do protocol bị hack mà do một contract mà người dùng đã approve bị hack.

## 3. Bài học từ seed: giả định vận hành thay cho đảm bảo kỹ thuật

Kakarot muốn `DualVmToken` hỗ trợ "mọi ERC-20". Zenith chứng minh điều đó bất khả thi: các hành vi lệch chuẩn **loại trừ nhau** — vá để đỡ token trả `false` thì phá vỡ hỗ trợ token không return gì. Xem [[Weird ERC20 Tokens]].

Câu trả lời cuối của team: *"Với mọi token được deploy dùng DualVmToken, token nền tảng sẽ được kiểm tra trước để đảm bảo tương thích."*

Đây là câu trả lời **đúng**, và nó minh hoạ nguyên tắc chung:

> Khi không thể đảm bảo bằng code, hãy chuyển sang đảm bảo bằng quy trình — **và nói rõ ra**. Một giả định vận hành được ghi thành văn tốt hơn một đảm bảo kỹ thuật không tồn tại.

Nhiệm vụ của auditor: buộc mọi giả định ngầm thành giả định được ghi. Xem [[Scoping and Threat Modeling]].

## 4. Cạm bẫy

1. **Audit contract của mình, không audit ranh giới.** Bug nằm ở chỗ hai hệ gặp nhau.
2. **Giả định đối tác tuân thủ chuẩn.** Chuẩn định nghĩa giao diện, không định nghĩa hành vi. Xem [[Token Standards]].
3. **Không xử lý revert của đối tác** ⇒ chức năng của bạn chết theo. Xem [[Denial of Service Patterns]].
4. **Approval vô hạn cho contract upgradeable.**
5. **Đọc `view` của đối tác giữa lúc họ đang chuyển trạng thái** ⇒ read-only reentrancy.
6. **Không ghim version.** Tích hợp với "Uniswap" là chưa đủ — V2, V3, V4 hành vi khác nhau.
7. **Không có kill switch cho từng tích hợp.** Khi đối tác bị hack, gỡ được nhanh không?

## 5. Checklist áp dụng

- [ ] Liệt kê **mọi** contract bên ngoài mà protocol đọc, gọi, hoặc approve. Vẽ thành sơ đồ.
- [ ] Với mỗi cái: nó upgradeable không? Ai upgrade được?
- [ ] Với mỗi cái: nó pausable không? Nếu nó dừng, chức năng nào của bạn chết?
- [ ] Với mỗi cái: nó revert được không? Có được xử lý không? Có làm hàm bắt buộc-chạy-được chết không?
- [ ] Có approval vô hạn nào không? Cho ai?
- [ ] Có đọc `view` của đối tác không? Có bị đọc giữa lúc state dở dang không?
- [ ] Có kill switch cho từng tích hợp riêng lẻ không?
- [ ] Version của mỗi đối tác đã được ghim và ghi vào báo cáo chưa?
- [ ] Những giả định về đối tác đã được ghi thành văn chưa?

## Tham khảo

- *Mastering Ethereum* — đoạn về composability (trong `_archive-seed/Mastering Ethereum.md`)
- [Kakarot mitigation review PR-1616](https://code4rena.com/reports/2024-09-kakarot) — hai hành vi ERC-20 loại trừ nhau
- [Trail of Bits — Token integration checklist](https://secure-contracts.com/development-guidelines/token_integration.html)
- [Chainsecurity — Read-only reentrancy](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/)

## Liên kết

[[Weird ERC20 Tokens]] · [[Oracles]] · [[Denial of Service Patterns]] · [[Scoping and Threat Modeling]] · [[Blockchain]]
