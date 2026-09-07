---
tags: [solidity, mẫu, proxy]
status: evergreen
---
# Proxy and Upgradeability

> Upgradeability là câu trả lời của ngành cho nghịch lý mà chính seed nêu ra: **deploy code bất biến lên một nền tảng đang thay đổi**. Nó giải quyết vấn đề đó bằng cách tạo ra ba vấn đề mới: storage collision, hàm khởi tạo, và quyền nâng cấp. Xem note bản lề ⚠️ [[Move Fast vs Immutable]].

## 1. Ba mẫu

| Mẫu | Logic nâng cấp nằm ở | Ưu | Nhược |
|---|---|---|---|
| **Transparent** (EIP-1967) | Proxy | Đơn giản, chín muồi | Tốn gas mỗi call; cần ProxyAdmin |
| **UUPS** | **Implementation** | Rẻ hơn, gọn | Quên `_authorizeUpgrade` hoặc deploy impl mới không có hàm upgrade ⇒ **khoá vĩnh viễn** |
| **Diamond** (EIP-2535) | Proxy, theo từng facet | Vượt giới hạn 24KB, module hoá | Phức tạp; storage phải theo mẫu "diamond storage" |

Cả ba đều đứng trên `delegatecall`: **code của implementation chạy trên storage của proxy**. Xem [[Delegatecall and Context Confusion]].

## 2. Bốn lớp lỗi

### a. Storage collision
Slot của proxy đụng slot của implementation. EIP-1967 giải quyết bằng slot giả ngẫu nhiên. Xem [[Storage Layout]].

### b. Uninitialized implementation
Constructor **không chạy** cho proxy. Trạng thái ban đầu phải đặt trong `initialize()`, và hàm đó phải:
- có `initializer` modifier (chạy đúng một lần),
- được gọi **cùng transaction** với lúc deploy proxy (nếu không thì front-run được),
- và implementation contract phải bị **vô hiệu hoá** bằng `_disableInitializers()` trong constructor của chính nó.

Bỏ bước cuối là lỗ hổng nổi tiếng nhất của mẫu này (vụ Wormhole 2022, Parity multisig 2017): attacker `initialize` implementation trần rồi `selfdestruct` nó, làm mọi proxy trỏ vào đó chết.

### c. Function selector clash
Với Transparent proxy, hàm admin của proxy che mất hàm cùng selector của implementation. Với Diamond, hai facet đăng ký cùng selector.

### d. Quyền nâng cấp
"Upgradeable" nghĩa là **có ai đó thay được toàn bộ logic giữ tiền của bạn**. Đây là rủi ro quản trị, không phải rủi ro kỹ thuật — nhưng nó phải nằm trong báo cáo audit: ai nâng cấp được, có timelock không, người dùng có kịp rút không.

## 3. Cạm bẫy

1. **Thêm biến vào giữa** khi upgrade; thiếu `__gap`. Xem [[Storage Layout]].
2. **`immutable` và `constant` nằm trong bytecode của implementation**, không trong storage proxy ⇒ mỗi lần upgrade là giá trị mới, và proxy cũ không thấy.
3. **Constructor có logic** — với contract upgradeable, nó không bao giờ chạy cho proxy.
4. **`selfdestruct` trong implementation** = khoá mọi proxy trỏ tới. (Sau EIP-6780 đã giảm nhẹ nhưng code cũ vẫn tồn tại.)
5. **Upgrade đổi hành vi mà không đổi giao diện** — mọi integrator đã audit bạn giờ đang audit code không còn tồn tại. Đây là mặt trái của [[Composability Risk]].
6. **Diamond: `delete` một facet không xoá storage của nó** — xem [[Broken State Lifecycle]].
7. **Contract "không upgradeable" nhưng có setter đổi mọi địa chỉ phụ thuộc** — về mặt rủi ro thì tương đương upgradeable. Gondi `updateLiquidationContract()` là ví dụ.

## 4. Checklist áp dụng

- [ ] Contract dùng mẫu proxy nào? Slot hạ tầng có theo EIP-1967 không?
- [ ] Implementation có `_disableInitializers()` trong constructor không?
- [ ] `initialize()` có `initializer` modifier không? Có được gọi atomically với lúc deploy không?
- [ ] Với UUPS: `_authorizeUpgrade` có phân quyền không? Bản mới có còn giữ hàm upgrade không?
- [ ] Đã diff `forge inspect storage-layout` giữa version cũ và mới chưa?
- [ ] Có `__gap` trong mọi contract base không?
- [ ] Ai nâng cấp được? Có timelock không? Bao lâu? Người dùng rút kịp không?
- [ ] Có `selfdestruct` hoặc `delegatecall` tuỳ ý trong implementation không?
- [ ] Nếu contract *không* upgradeable: có setter nào đổi được contract phụ thuộc giữ tiền không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| OpenZeppelin Upgrades | Chặn upgrade phá layout ngay lúc deploy | https://docs.openzeppelin.com/upgrades-plugins/ |
| `forge inspect <C> storage-layout` | Bảng slot để diff | https://book.getfoundry.sh/ |
| slither-check-upgradeability | Kiểm tra tự động giữa hai version | https://github.com/crytic/slither |
| louper.dev | Xem facet của một Diamond đã deploy | https://louper.dev/ |

## Tham khảo

- [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-1822: UUPS](https://eips.ethereum.org/EIPS/eip-1822) · [EIP-2535: Diamonds](https://eips.ethereum.org/EIPS/eip-2535)
- [OpenZeppelin — Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/writing-upgradeable)
- [OpenZeppelin — Uninitialized UUPS proxy vulnerability (2021)](https://blog.openzeppelin.com/uupsupgradeable-vulnerability-post-mortem)
- [Rekt — Wormhole](https://rekt.news/wormhole-rekt/)

## Liên kết

[[Storage Layout]] · [[Delegatecall and Context Confusion]] · [[Access Control Patterns]] · [[Move Fast vs Immutable]] · [[Blockchain]]
