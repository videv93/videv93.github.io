---
tags: [audit, lỗ-hổng, off-chain]
status: evergreen
---
# Metadata and Off-chain Trust

> Contract đúng không đủ nếu hệ thống off-chain đọc nó sai. Nhưng ranh giới trách nhiệm ở đâu? Đây là câu hỏi mà seed **không trả lời được** — và cuộc tranh luận về nó là phần đáng đọc nhất trong cả ba báo cáo.

## 1. Ba loại phụ thuộc off-chain

| Loại | Ví dụ | Rủi ro |
|---|---|---|
| **Metadata** | `tokenURI`, `name`, `symbol` | Giả mạo, injection, nội dung đổi sau khi mua |
| **Event / indexer** | Subgraph, bot thanh lý, dashboard | Thiếu trường ⇒ off-chain sai; xem [[Contract Structure and Visibility]] |
| **Dữ liệu đưa vào** | Oracle, relayer, keeper | Xem [[Oracles]] |

## 2. Coded Estate M-08 — cuộc tranh luận

**Finding (adeolu):** `token_uri` là chuỗi tuỳ ý người dùng đặt. Attacker sao chép nguyên `token_uri` của một bất động sản giá trị cao ⇒ frontend hiển thị y hệt ảnh và thuộc tính ⇒ người dùng thuê nhầm. Thêm nữa, chuỗi chứa `"` hoặc `,` có thể gây **JSON injection**.

**Phản biện (nnez — một warden khác, người tìm ra 6/9 High của chính audit này):**
- Token được nhận diện bằng **ba** thứ: `owner`, `tokenId`, `tokenURI`. Chỉ `tokenURI` trùng không đủ để giả mạo — `owner` không giả được (cần private key), `tokenId` không trùng được.
- Ở protocol này, giá trị nằm ở **bất động sản thật** và **quyền sở hữu**, không ở metadata. Tương tự Airbnb: hai căn giống hệt thì người dùng kiểm tra **chủ nhà**.
- Không có biện pháp nào ở tầng contract giải quyết được: kể cả sinh `tokenURI` bằng code thì `name`, `description`, `image` vẫn là tham số tuỳ ý.
- ⇒ Đây là **vấn đề frontend**, tối đa là QA.

**Judge (Lambda):**
- Đồng ý về phần giả mạo — *"đó là vấn đề mọi NFT đều gặp; không có gì ngăn ai đó tạo contract BAYC giả trỏ tới cùng ảnh"*.
- Nhưng giữ Medium vì phần **JSON injection**: ERC-721 *có* yêu cầu metadata dạng JSON, chuẩn CW-721 cũng vậy, nên giả định "chuỗi này sẽ bị parse và hiển thị" là hợp lý. Đã có tiền lệ thật: [XSS trên OpenSea](https://0xhagen.medium.com/how-opensea-allows-cross-site-scripting-attacks-xss-bc28265ebdf7), [JSON injection trong NFT metadata](https://zokyo.io/blog/under-the-hacker-s-hood-json-injection-in-nft-metadata/).
- Kết luận thẳng thắn: *"Trách nhiệm thuộc về ai thì rõ ràng còn tranh cãi được... nhưng thực tế frontend không phải lúc nào cũng sanitize, và khi đó người dùng sẽ đổ lỗi cho contract của bạn, vì chính contract của bạn đã tạo ra payload độc hại."*

## 3. Ba bài học rút được

1. **"Không có biện pháp ở tầng contract" không tự động biến một vấn đề thành không-phải-vấn-đề.** Nó biến vấn đề thành **một mục phải ghi vào tài liệu tích hợp** — và việc thiếu tài liệu đó là một finding.
2. **Warden giỏi nhất trong audit lại là người phản bác finding này.** Không phải mọi thứ tìm được đều đáng báo cáo, và biết cái gì *không* phải bug cũng là kỹ năng. Xem [[Contest Severity vs Real Risk]].
3. **Tiền lệ được dùng như bằng chứng.** Cả hai bên đều dẫn finding cũ ở audit khác. Đây là cách severity được quyết trên thực tế — xem [[Severity Classification]].

## 4. Cạm bẫy

1. **Chuỗi tuỳ ý đi vào ngữ cảnh có cấu trúc** (JSON, HTML, SVG on-chain, CSV). Nếu contract tự dựng JSON bằng `abi.encodePacked` thì `"` trong tên là injection thật ở tầng contract.
2. **SVG on-chain** là vector XSS trực tiếp — nhiều NFT sinh `data:image/svg+xml` chứa dữ liệu người dùng.
3. **`tokenURI` trỏ tới HTTP có thể đổi nội dung sau khi bán.** IPFS/Arweave có địa chỉ theo nội dung; HTTP thì không.
4. **Off-chain là nguồn sự thật ngầm.** Nếu chỉ frontend chính thức mới hiển thị đúng thông tin, protocol không thực sự phi tập trung — điều này nên nằm trong báo cáo.
5. **Event thiếu trường** ⇒ off-chain không dựng lại được state. Gondi L-01 — xem [[Stale Approval and Delegation]].
6. **Kế toán off-chain dựa vào ID không được xác thực.** Gondi L-05: `offerId` không nằm trong phần chữ ký khi lender là pool contract ⇒ borrower điền tuỳ ý ⇒ event mang ID rác.

## 5. Checklist áp dụng

- [ ] Có chuỗi nào do người dùng cung cấp mà contract ghép vào một cấu trúc (JSON/SVG/URL) không?
- [ ] Có chuỗi nào được kỳ vọng sẽ bị parse/hiển thị off-chain không? Điều đó có ghi trong tài liệu không?
- [ ] Danh tính của một đối tượng gồm những trường nào? Frontend có hiển thị **đủ** các trường đó không?
- [ ] Metadata có bất biến không (IPFS/Arweave) hay đổi được sau khi giao dịch?
- [ ] Mọi event có đủ trường để dựng lại state không? Trường tạo nên khoá lưu trữ có nằm trong event không?
- [ ] Có ID nào chỉ dùng cho off-chain mà không được xác thực on-chain không?
- [ ] Nếu frontend chính thức biến mất, người dùng có tương tác đúng được với protocol không?
- [ ] Những giả định về off-chain đã được viết vào phần "assumptions" của báo cáo chưa?

## Tham khảo

- [Coded Estate M-08 — toàn bộ tranh luận](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/10)
- [EIP-721 — Metadata JSON Schema](https://eips.ethereum.org/EIPS/eip-721)
- [OpenSea XSS via NFT metadata](https://0xhagen.medium.com/how-opensea-allows-cross-site-scripting-attacks-xss-bc28265ebdf7)
- [Zokyo — JSON injection in NFT metadata](https://zokyo.io/blog/under-the-hacker-s-hood-json-injection-in-nft-metadata/)
- [Gondi L-01, L-05 (Code4rena)](https://code4rena.com/reports/2024-06-gondi)

## Liên kết

[[Contest Severity vs Real Risk]] · [[Token Standards]] · [[Severity Classification]] · [[Composability Risk]] · [[Blockchain]]
