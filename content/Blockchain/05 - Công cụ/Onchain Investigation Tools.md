---
tags: [công-cụ, forensics]
status: evergreen
---
# Onchain Investigation Tools

> [!note] Ghi chú nguồn
> Trả các stub rời trong seed: `Minascan Block Explorer.md` (16 dòng gần rỗng), `Metis.md`, `Hermes.md` (0 dòng), `Protocols.md`, `Zora.md` (0 dòng) — những mảnh về explorer và hệ sinh thái chưa được hệ thống hoá.

> Audit là đọc code **trước khi** nó chạy. Điều tra on-chain là đọc code **sau khi** nó đã chạy — và đó là nơi học được nhiều nhất về những gì thực sự xảy ra.

## 1. Bốn loại công cụ

| Loại | Công cụ | Dùng để |
|---|---|---|
| **Explorer** | Etherscan, Blockscout, Arbiscan, Starkscan, Minascan | Đọc source đã verify, tx, event, holder |
| **Debugger** | Tenderly, `cast run`, Phalcon | Xem call trace từng bước của một tx đã xảy ra |
| **Decompiler** | Dedaub, heimdall-rs, Panoramix | Contract **không verify** |
| **Phân tích luồng tiền** | Arkham, Nansen, Breadcrumbs, MetaSleuth | Theo dấu tiền sau một vụ hack |

## 2. Quy trình đọc một transaction lạ

```bash
cast run <txhash> --rpc-url $RPC --trace-printer   # call trace đầy đủ
cast tx <txhash> --rpc-url $RPC                    # raw tx
cast receipt <txhash> --rpc-url $RPC               # log + gas thật
cast 4byte-decode <calldata>                       # selector là hàm gì
cast storage <addr> <slot> --rpc-url $RPC          # đọc state trực tiếp
cast code <addr> --rpc-url $RPC                    # bytecode, để decompile
```

Với contract chưa verify: đưa bytecode vào [Dedaub](https://app.dedaub.com/decompile) — thường đủ đọc được logic chính trong vài phút.

## 3. Đọc một vụ hack

1. Lấy tx hash (thường từ [Rekt](https://rekt.news/) hoặc Twitter).
2. `cast run` hoặc Tenderly để lấy call trace.
3. Tìm **lời gọi bất thường** — thường là flash loan ở đầu và transfer lớn ở cuối.
4. Xác định contract nạn nhân, đọc source (hoặc decompile).
5. **Dựng lại bằng fork test** ở block trước cuộc tấn công — xem [[Foundry for Auditors]].
6. Phân loại vào một lớp ở [[Vulnerability Taxonomy]].

Bước 5 là bước phân biệt "đọc tin tức" với "học được": nếu bạn tái tạo được cuộc tấn công trên fork, bạn đã hiểu nó.

## 4. Điều cần kiểm khi đánh giá một protocol đã deploy

| Câu hỏi | Cách kiểm |
|---|---|
| Source đã verify chưa? | Explorer — chưa verify là cờ đỏ |
| Có proxy không? Ai upgrade được? | Đọc slot EIP-1967: `cast storage <addr> 0x360894...` |
| Owner là EOA hay multisig? | `cast call <addr> "owner()(address)"` rồi xem địa chỉ đó |
| Có timelock không? Bao lâu? | Đọc contract timelock |
| Bytecode trên chain khớp với repo không? | Build lại và so — khác optimizer runs là khác bytecode |
| Token nào được whitelist? | Đọc event / storage |

Bảng này là phần "audit" mà người dùng bình thường có thể tự làm, và phần lớn không làm.

## 5. Cạm bẫy

1. **Tin source đã verify là source đang chạy.** Với proxy, source ở địa chỉ proxy **không phải** logic đang chạy. Đọc slot implementation.
2. **Explorer hiển thị "Contract" nhưng đó là proxy** — nút *Read as Proxy* dễ bỏ sót.
3. **Event không phải sự thật đầy đủ.** Nếu contract không phát event cho một thay đổi, explorer không hiển thị nó. Xem [[Metadata and Off-chain Trust]].
4. **Decompiler đoán sai kiểu.** Dùng để định hướng, xác nhận bằng `cast storage`.
5. **Chỉ nhìn một chain.** Cùng địa chỉ trên chain khác có thể là contract khác hoàn toàn — xem [[Factory and CREATE2]].
6. **Không ghim block khi tái tạo** ⇒ không tái lập được.

## 6. Checklist áp dụng

- [ ] Source ở địa chỉ này đã verify chưa? Nếu là proxy, đã đọc slot implementation để lấy **logic đang chạy** chưa?
- [ ] Ai upgrade được? Owner là EOA hay multisig? Có timelock không?
- [ ] Bytecode trên chain có khớp với bản build lại từ repo không?
- [ ] Với một tx cần điều tra: đã lấy call trace đầy đủ (`cast run` / Tenderly) chưa?
- [ ] Đã tái tạo được cuộc tấn công bằng fork test ở block trước đó chưa? (nếu chưa thì chưa hiểu nó)
- [ ] Đã ghim block number khi tái tạo chưa?
- [ ] Đã phân loại vụ việc vào một lớp ở [[Vulnerability Taxonomy]] chưa?
- [ ] Có kiểm tra cùng địa chỉ trên các chain khác không? (bytecode có thể khác hoàn toàn)

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Etherscan | Explorer chuẩn cho Ethereum + L2 | https://etherscan.io/ |
| Blockscout | Mã nguồn mở, dùng ở nhiều L2 | https://www.blockscout.com/ |
| Starkscan / Minascan | Starknet / Mina | https://starkscan.co/ · https://minascan.io/ |
| Tenderly | Debugger + simulation + alert | https://tenderly.co/ |
| Dedaub | Decompiler + phân tích bảo mật | https://app.dedaub.com/ |
| heimdall-rs | Decompiler CLI | https://github.com/Jon-Becker/heimdall-rs |
| Arkham / MetaSleuth | Theo dấu luồng tiền | https://intel.arkm.com/ |
| Rekt News | Post-mortem các vụ hack | https://rekt.news/ |
| DefiLlama | TVL, danh sách protocol theo chain | https://defillama.com/ |

## Tham khảo

- [Foundry Book — `cast run`](https://book.getfoundry.sh/reference/cast/cast-run)
- [Tenderly documentation](https://docs.tenderly.co/)
- [Rekt News leaderboard](https://rekt.news/leaderboard/) — các vụ mất tiền lớn nhất, xếp hạng
- [Dedaub decompiler](https://app.dedaub.com/decompile)

## Liên kết

[[Foundry for Auditors]] · [[Case Study Method]] · [[Bridge Risk]] · [[Oracle Manipulation]] · [[Blockchain]]
