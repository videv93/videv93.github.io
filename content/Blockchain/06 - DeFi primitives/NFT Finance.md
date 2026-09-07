---
tags: [defi, nft, lending]
status: evergreen
---
# NFT Finance

> Cho vay thế chấp NFT lấy toàn bộ vấn đề của [[Lending and Liquidation]] rồi bỏ đi thứ duy nhất làm nó chạy được: **thanh khoản**. Không có giá thị trường liên tục, không bán được ngay, và mỗi tài sản là duy nhất. Gondi trong seed là một cài đặt hoàn chỉnh của bài toán đó.

## 1. Bốn khác biệt so với lending thường

| | Fungible collateral | **NFT collateral** |
|---|---|---|
| Định giá | Oracle liên tục | Thẩm định lúc ký offer, hoặc floor price |
| Thanh lý | Bán ngay trên AMM | **Đấu giá**, có thể không ai mua |
| Khớp lệnh | Pool chung | **Offer ký off-chain** ⇒ xem [[Signatures and EIP-712]] |
| Đơn vị | Chia nhỏ được | Nguyên khối ⇒ khó thanh lý một phần |

## 2. Kiến trúc Gondi (từ seed)

| Thành phần | Vai trò |
|---|---|
| `MultiSourceLoan` | Khoản vay nhiều **tranche** — nhiều lender ở các mức ưu tiên khác nhau |
| `AuctionLoanLiquidator` | Đấu giá NFT khi vỡ nợ |
| `LiquidationHandler` | Trỏ tới liquidator hiện hành |
| `UserVault` | **Bó nhiều tài sản** (ERC-20 + ERC-721) thành một NFT dùng làm thế chấp |
| `delegate()` | Cho borrower uỷ quyền NFT bị khoá để nhận airdrop/vé |
| Refinance / `addNewTranche` | Đổi khoản vay sang điều kiện tốt hơn |

Mỗi thành phần sinh ra một finding trong báo cáo — đó là lý do kiến trúc này đáng học.

## 3. Năm lớp rủi ro đặc thù, kèm finding thật

### a. Uỷ quyền tài sản đang bị khoá
Borrower vẫn muốn dùng NFT (airdrop, vé sự kiện) khi nó đang thế chấp ⇒ `delegate()` qua Delegate.cash. Rủi ro: **thu hồi không đúng khoá** ⇒ borrower cũ giữ quyền trên NFT của borrower mới. **Gondi M-01**, xem [[Stale Approval and Delegation]].

### b. Bó tài sản thay đổi được
`UserVault` bó nhiều tài sản thành một `vaultId`. Tài liệu nói bó là **bất biến sau khi mint**. Code cho **bất kỳ ai** deposit thêm vào bất cứ lúc nào (**Gondi L-12**).

Hai hậu quả: lender ký offer dựa trên một bộ tài sản mà bộ đó đổi được; và trong lúc đấu giá thanh lý, ai đó **nạp thêm tài sản để thao túng giá đấu**. Xem [[Invariant Discovery]].

### c. Đổi liquidator giữa chừng
`updateLiquidationContract()` đổi được khi còn auction đang chạy ⇒ auction cũ không settle được vì `onlyLiquidator` từ chối ⇒ **NFT và tiền đặt giá kẹt ở contract cũ**. Và `liquidateLoan()` permissionless nên front-run được (**Gondi L-08**). Xem [[Front-running and MEV]].

### d. Chữ ký offer dùng chéo hàm
Một `renegotiationOffer` lender ký cho `addNewTranche()` dùng được cho `refinanceFull()` khi khoản vay chỉ có một tranche — điều kiện kiểm của hai hàm trùng nhau (**Gondi L-06**). Lender bị đẩy vào tranche rủi ro hơn cái họ đồng ý.

### e. Tham số không có trần
`minLockPeriod` không có cap ⇒ đặt quá cao thì **không khoản vay nào refinance được nữa** (**Gondi L-07**). Xem [[Access Control Patterns]].

## 4. Cạm bẫy chung

1. **Floor price làm oracle** ⇒ thao túng bằng cách mua/bán vài NFT ở collection mỏng.
2. **Đấu giá không ai tham gia** ⇒ nợ xấu không thanh lý được. Có giá sàn không? Ai chịu lỗ?
3. **Thao túng đấu giá** bằng cách nạp thêm tài sản (c) hoặc bằng bid giả rồi rút.
4. **NFT có royalty / transfer hook** ⇒ transfer revert hoặc tốn gas bất ngờ.
5. **Collection bị đóng băng / metadata đổi** sau khi định giá.
6. **Tranche và thứ tự trả nợ** — bất biến then chốt phải được test.
7. **Bó tài sản chứa token lệch chuẩn** ⇒ toàn bộ [[Weird ERC20 Tokens]] áp dụng.

## 5. Checklist áp dụng

- [ ] NFT được định giá bằng gì? Thao túng tốn bao nhiêu?
- [ ] Đấu giá không ai tham gia thì sao? Có giá sàn không? Ai chịu lỗ?
- [ ] Nội dung của bó tài sản có bất biến sau khi mint không? Ai thêm vào được?
- [ ] Có ai nạp thêm tài sản trong lúc đấu giá để thao túng không?
- [ ] Uỷ quyền tài sản đang khoá: thu hồi có đúng khoá không? Xem [[Stale Approval and Delegation]]
- [ ] Đổi liquidator có bỏ rơi auction đang chạy không? Front-run được không?
- [ ] Mỗi hàm dùng chữ ký có `TYPEHASH` riêng không? Chữ ký dùng chéo hàm được không?
- [ ] Mọi tham số quản trị có min/max không?
- [ ] Thứ tự trả nợ giữa các tranche có bất biến và có test không?
- [ ] NFT thế chấp có royalty/hook làm transfer fail không?

## Tham khảo

- [Gondi audit report (Code4rena, 6/2024)](https://code4rena.com/reports/2024-06-gondi) — nguồn của mọi finding trong note này
- [Delegate.cash — DelegateRegistry](https://github.com/delegatexyz/delegate-registry)
- [EIP-721](https://eips.ethereum.org/EIPS/eip-721) · [EIP-2981: NFT Royalty Standard](https://eips.ethereum.org/EIPS/eip-2981)
- [Blur / NFTfi — mô hình lending NFT khác để đối chiếu](https://docs.nftfi.com/)

## Liên kết

[[Case Gondi]] · [[Lending and Liquidation]] · [[Stale Approval and Delegation]] · [[Signatures and EIP-712]] · [[Blockchain]]
