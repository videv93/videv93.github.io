---
tags: [audit, lỗ-hổng, mev]
status: evergreen
---
# Front-running and MEV

> Mempool là công khai và **thứ tự giao dịch do người khác quyết**. Mọi thiết kế giả định "tôi gửi lệnh rồi lệnh của tôi chạy tiếp theo" đều sai. Câu hỏi rà soát duy nhất: **nếu ai đó nhìn thấy giao dịch này trước và chèn giao dịch của họ vào trước hoặc sau, họ được gì?**

## 1. Bốn hình dạng

| Hình dạng | Cơ chế | Nạn nhân |
|---|---|---|
| **Front-run** | Chèn tx vào **trước** | Người có lệnh sinh lợi (mint, đấu giá, thanh lý) |
| **Back-run** | Chèn vào **sau** | Ai tạo ra cơ hội arbitrage |
| **Sandwich** | Trước **và** sau | Người swap không đặt slippage chặt |
| **Suppression / censorship** | Chặn tx lên block | Người cần gọi trong deadline |

## 2. Ba ví dụ trong seed

### a. Huỷ bid ngay trước khi transfer (Coded Estate H-03, kịch bản 2)
Khi `auto_approve = false`, người bán phải tự gọi `transfer_nft`. Attacker:
1. Đặt bid.
2. **Front-run** giao dịch `transfer_nft` của người bán bằng lệnh huỷ bid.
3. Giao dịch của người bán chạy sau, chuyển NFT — **với số tiền bid bằng 0**.

Đây là mẫu chung: **hai bên phải hành động, và bên hành động sau bị ràng buộc bởi trạng thái mà bên kia đổi được.**

### b. Front-run lệnh đổi liquidator (Gondi L-08)
`liquidateLoan()` là permissionless. `updateLiquidationContract()` là của owner. Attacker front-run lệnh của owner để đẩy một khoản vay vào liquidator sắp bị bỏ ⇒ tài sản thế chấp kẹt ở contract cũ vĩnh viễn.

> [!warning] Mẫu "permissionless + admin setter"
> Mỗi khi tồn tại một hàm ai cũng gọi được và một setter admin đổi tham số hàm đó dùng, hãy hỏi: chuyện gì xảy ra nếu chúng vào cùng một block theo thứ tự xấu nhất?

### c. Đổi denom giữa lúc còn bid (Coded Estate H-06)
Không cần front-run mempool — đủ chậm để làm bằng tay. Nhưng cùng bản chất: **trạng thái mà bên kia dựa vào thì đổi được, còn hành động của họ thì không nguyên tử.**

## 3. Bốn biện pháp

| Biện pháp | Chống được gì | Giá phải trả |
|---|---|---|
| **Slippage / minOut do người dùng đặt** | Sandwich | UX; và mặc định lỏng thì vô dụng |
| **Commit–reveal** | Front-run nội dung | Hai giao dịch, cần chống grief ở pha reveal |
| **Deadline + nonce** | Ý định cũ chạy ở tương lai | Không chống được sandwich |
| **Private mempool** (Flashbots Protect) | Lộ ý định | Tin vào relay; không phải mọi chain có |
| **Nguyên tử hoá** | Cửa sổ giữa hai bước | Thiết kế lại luồng |

Biện pháp mạnh nhất thường là biện pháp cuối: **gộp hai bước thành một transaction** để không còn cửa sổ. Ở Coded Estate H-03, nếu thanh toán và chuyển NFT là nguyên tử thì cả hai kịch bản đều biến mất.

## 4. Cạm bẫy

1. **`minOut = 0` mặc định trong code mẫu** — copy vào production là sandwich miễn phí.
2. **Deadline = `block.timestamp`** không phải deadline; nó luôn đúng.
3. **Commit–reveal không có phạt khi không reveal** ⇒ attacker commit rồi bỏ nếu kết quả bất lợi.
4. **Randomness on-chain**: `blockhash`, `prevrandao` đều biết trước hoặc ảnh hưởng được bởi proposer. Xem [[Units and Global Variables]].
5. **Approve race** — xem [[Token Standards]].
6. **First-come-first-served** cho tài nguyên khan hiếm (mint, whitelist, tên miền) là mời gọi bot.
7. **Front-run lệnh `initialize()`** của proxy vừa deploy. Xem [[Proxy and Upgradeability]].
8. **Thanh lý sinh lợi** ⇒ bot cạnh tranh nhau, và có động cơ **làm cho người khác không thanh lý được**.

## 5. Checklist áp dụng

- [ ] Liệt kê mọi hàm mà **biết trước nội dung** của nó đem lại lợi ích. Với mỗi cái: lợi ích đó là bao nhiêu?
- [ ] Có luồng nào cần **hai giao dịch của hai bên** không? Bên sau có bị ràng buộc bởi trạng thái bên trước đổi được không?
- [ ] Có hàm permissionless nào dùng tham số mà admin đổi được không? Xét thứ tự xấu nhất trong cùng block.
- [ ] Mọi swap/trade có tham số slippage do **người gọi** truyền vào không? Có mặc định nguy hiểm không?
- [ ] Có deadline thật không (không phải `block.timestamp`)?
- [ ] Có nguồn ngẫu nhiên on-chain nào không?
- [ ] Cơ chế phân phối khan hiếm có chống bot không?
- [ ] Có gộp được các bước thành một transaction nguyên tử không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Flashbots Protect | Gửi tx không qua mempool công khai | https://protect.flashbots.net/ |
| MEV-Explore / EigenPhi | Xem MEV thật đã xảy ra | https://eigenphi.io/ |
| Foundry `vm.roll` / `vm.prank` | Dựng PoC thứ tự giao dịch | https://book.getfoundry.sh/ |

## Tham khảo

- [Flashbots documentation](https://docs.flashbots.net/)
- [Daian et al., *Flash Boys 2.0* (2019)](https://arxiv.org/abs/1904.05234) — bài báo gốc định nghĩa MEV
- [Coded Estate H-03](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/12) — front-run huỷ bid
- [Gondi L-08 (Code4rena)](https://code4rena.com/reports/2024-06-gondi) — front-run lệnh đổi liquidator
- [SWC-114: Transaction Order Dependence](https://swcregistry.io/docs/SWC-114)

## Liên kết

[[Transaction Lifecycle]] · [[Economic Attacks]] · [[Oracle Manipulation]] · [[Access Control Patterns]] · [[Blockchain]]
