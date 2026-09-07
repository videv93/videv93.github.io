---
tags: [defi, rủi-ro, bridge]
status: evergreen
---
# Bridge Risk

> [!note] Ghi chú nguồn
> Trả header rỗng `Bridges.md` trong seed — một file 6 dòng chỉ chứa link tới bảy dịch vụ: deBridge, Jumper, Bungee, Stargate (LayerZero), Orbiter, Owlto, Layerswap. Cùng với `Welcome to Hyperlane Docs.md` (11 dòng, gần rỗng).

> Bridge là **mục tiêu số một** trong lịch sử mất tiền của crypto. Lý do cấu trúc: chúng giữ nhiều tiền nhất, và bảo mật của chúng không phải bảo mật của blockchain — mà là bảo mật của **cơ chế xác minh** mà chúng tự chọn.

## 1. Bốn mô hình tin cậy

| Mô hình | Cơ chế xác minh | Tin vào | Ví dụ |
|---|---|---|---|
| **Native / canonical rollup bridge** | Fraud proof hoặc validity proof | Bản thân L1 | Arbitrum, Optimism, zkSync bridge |
| **Light client / IBC** | Xác minh consensus chain kia on-chain | Consensus chain kia | IBC, Hyperlane (tuỳ ISM) |
| **Multisig / MPC** | Một nhóm ký | **N người ký** | Nhiều bridge bị hack nhất |
| **Liquidity network** | Không "bridge" tài sản, chỉ swap hai bên | LP và relayer | Stargate, Orbiter, Owlto, Layerswap |

Bảng này giải thích các link trong seed: **Jumper và Bungee là aggregator** (định tuyến qua bridge khác — rủi ro là hợp của mọi tuyến), còn Orbiter/Owlto/Layerswap là **liquidity network** chứ không phải bridge theo nghĩa khoá-và-mint.

## 2. Bốn lớp rủi ro

| Lớp | Câu hỏi |
|---|---|
| **Xác minh** | Ai chứng thực rằng sự kiện ở chain nguồn đã xảy ra? Bao nhiêu người phải thông đồng? |
| **Ký/khoá** | Multisig m/n bao nhiêu? Key ở đâu? Có HSM không? |
| **Cài đặt** | Bug trong logic verify/mint — xem [[Cross-domain Message Bugs]] |
| **Thanh khoản** | Với liquidity network: LP có đủ không? Rút hết thì sao? |

Lớp thứ nhất là lớp quyết định. **"Bridge được audit" không nói gì về việc nó tin vào 5 người hay tin vào toán học.**

## 3. Cạm bẫy khi audit contract dùng bridge

1. **Không kiểm nguồn message.** Phía nhận phải kiểm `msg.sender == bridge` **rồi mới** đọc "người gửi gốc" từ payload.
2. **Không xử lý aliasing** hoặc xử lý sai. Kakarot M-02 — xem [[Cross-domain Message Bugs]].
3. **Giả định thứ tự message.**
4. **Không có đường thoát khi bridge dừng.** Tiền kẹt bao lâu? Ai mở lại?
5. **Replay giữa các chain** vì thiếu `chainId` trong dữ liệu ký.
6. **Token bridge có nhiều phiên bản wrapped.** USDC.e ≠ USDC — hai token khác nhau, không thay thế cho nhau được.
7. **Giả định EVM-equivalence ở chain đích.** Xem [[EVM Execution Model]].
8. **Phí và cancel.** Kakarot M-03: không huỷ được message ⇒ phí mất vĩnh viễn.

## 4. Checklist áp dụng

- [ ] Bridge dùng mô hình tin cậy nào? Bao nhiêu người phải thông đồng để giả mạo một message?
- [ ] Nếu là multisig: m/n bao nhiêu? Ai giữ key? Đã công khai chưa?
- [ ] Phía nhận có kiểm `msg.sender == bridge` không?
- [ ] Có xử lý aliasing không? Đúng cho contract **và** EOA chứ?
- [ ] Message tới không đúng thứ tự thì sao?
- [ ] Message fail thì tiền/phí đi đâu? Có retry, có cancel không?
- [ ] Bridge dừng vĩnh viễn thì tài sản có lối thoát không?
- [ ] Protocol có phân biệt được các phiên bản wrapped của cùng một token không?
- [ ] Với aggregator: rủi ro là hợp của mọi tuyến — đã liệt kê hết các tuyến chưa?

## Công cụ và dịch vụ (từ seed)

| Tên | Loại | Link |
|---|---|---|
| deBridge | Message + liquidity | https://debridge.finance/ |
| Stargate (LayerZero) | Liquidity network, unified pool | https://stargate.finance/ |
| Jumper | **Aggregator** (LI.FI) | https://jumper.exchange/ |
| Bungee | **Aggregator** (Socket) | https://www.bungee.exchange/ |
| Orbiter / Owlto / Layerswap | Liquidity network cho L2 | https://www.orbiter.finance/ |
| Hyperlane | Framework interoperability, ISM tuỳ chỉnh | https://docs.hyperlane.xyz/ |
| L2Beat | **Đánh giá mô hình tin cậy của từng bridge/L2** | https://l2beat.com/bridges |

L2Beat là công cụ quan trọng nhất trong bảng: nó phân loại từng bridge theo mô hình tin cậy thật, không theo marketing.

## Tham khảo

- [L2Beat — Bridges risk analysis](https://l2beat.com/bridges/summary)
- [Rekt — Ronin Bridge (\$624M)](https://rekt.news/ronin-rekt/) — 5/9 multisig key bị chiếm
- [Rekt — Wormhole (\$326M)](https://rekt.news/wormhole-rekt/) — lỗi verify chữ ký
- [Vitalik — Why the future will be multi-chain but not cross-chain](https://old.reddit.com/r/ethereum/comments/rwojtk/)
- [Hyperlane documentation](https://docs.hyperlane.xyz/)

## Liên kết

[[Cross-domain Message Bugs]] · [[Composability Risk]] · [[Case Kakarot]] · [[Onchain Investigation Tools]] · [[Blockchain]]
