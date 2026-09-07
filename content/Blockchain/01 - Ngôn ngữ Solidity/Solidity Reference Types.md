---
tags: [solidity, ngôn-ngữ]
status: evergreen
---
# Solidity Reference Types

> [!note] Ghi chú nguồn
> Trả hai header rỗng trong seed: `Reference Types.md` (4 dòng: Data location, Arrays, Array Slices, Structs) và `data-location.md` (3 dòng: `memory`, `storage`, `calldata`).

> Kiểu tham chiếu không được copy khi gán — **chúng được copy hoặc được trỏ tuỳ theo data location**. Nhầm một chữ `memory` thành `storage` là loại bug ghi nhầm dữ liệu mà mắt rất khó bắt.

## 1. Ba data location

| Location | Vòng đời | Ghi được | Gán từ storage |
|---|---|---|---|
| `storage` | Vĩnh viễn | có | **tham chiếu** — sửa là sửa thật |
| `memory` | Trong một call | có | **copy** — sửa không ảnh hưởng storage |
| `calldata` | Trong một call | **read-only** | không áp dụng |

```solidity
// ✅ sửa thật vào storage
Loan storage loan = loans[id];
loan.amount = 0;

// ❌ sửa vào bản copy rồi vứt đi — compile được, im lặng sai
Loan memory loan = loans[id];
loan.amount = 0;
```

> [!warning] Đây là finding "silent" điển hình
> Không revert, không cảnh báo, test happy-path vẫn xanh. Chỉ lộ ra khi ai đó đọc lại giá trị đã "sửa". Khi review, mọi `X memory x = <biến storage>` theo sau bởi một phép gán vào `x` đều phải dừng lại.

**Quy tắc chọn:** tham số `external` dùng `calldata` (rẻ nhất, không copy); tham số `internal` cần sửa thì dùng `memory`; biến cục bộ trỏ vào state thì `storage`.

## 2. Mảng

| Dạng | Ghi chú |
|---|---|
| `T[k]` tĩnh | Độ dài cố định, biết trước gas |
| `T[]` động | `push`/`pop` chỉ ở `storage`; `new T[](n)` ở memory **không đổi kích thước được** |
| `bytes` / `string` | Mảng động đóng gói chặt; `string` **không có** `.length` theo ký tự |
| Array slice | `arr[start:end]`, hiện chỉ hỗ trợ cho `calldata` — rất tiện để parse chữ ký/payload |

**Mảng động trong storage là nguồn DoS số một.** Mọi hàm duyệt một mảng mà attacker làm dài ra được là một Medium chờ sẵn — Coded Estate M-02 chính là vậy: `cancellation` vector không có cap, khiến hàm huỷ đặt phòng vượt gas limit và **nạn nhân không lấy lại được tiền**. Xem [[Denial of Service Patterns]].

## 3. Struct và mapping

- `mapping` **chỉ tồn tại ở storage**, không truyền qua memory được, và **không duyệt được** (không biết có key nào).
- `delete struct` đặt mọi trường về giá trị mặc định — **trừ mapping bên trong nó**. Dữ liệu mồ côi ở lại vĩnh viễn.
- `delete arr[i]` **không** rút ngắn mảng; nó để lại một phần tử zero ở giữa.

Cả hai điều trên gộp lại thành một lớp lỗi riêng: xoá không sạch. Coded Estate H-09 là bản đắt nhất — `burn` token xoá luôn dữ liệu `rentals` kèm số tiền đặt cọc, khiến người thuê **không còn hàm nào để đòi lại tiền**. Xem [[Broken State Lifecycle]].

## 4. Cạm bẫy

1. **`storage` pointer chưa khởi tạo** (trước 0.5.0) trỏ vào slot 0 — nay đã là lỗi compile, nhưng còn gặp trong code cũ và trong assembly.
2. **Copy struct lớn từ storage sang memory** tốn gas theo số slot; trong vòng lặp là DoS tự gây ra.
3. **Mảng lồng nhau trong calldata** cần ABI decode cẩn thận; parse thủ công bằng assembly mà không kiểm độ dài → OOB read (Kakarot PR-1627 vá đúng lỗi này ở `parse_storage_keys`).
4. **`bytes.concat` / `abi.encodePacked`** với hai tham số động cạnh nhau gây **hash collision**: `encodePacked("a","bc") == encodePacked("ab","c")`. Không bao giờ hash `encodePacked` của nhiều biến động.
5. **Trả mảng động từ hàm view** không giới hạn độ dài — client hết RAM, node timeout.

## 5. Checklist áp dụng

- [ ] Mọi biến cục bộ kiểu struct/array: `memory` hay `storage`? Có được gán vào không? Ý định là gì?
- [ ] Mọi mảng động trong storage: ai làm nó dài ra được? Có cap không?
- [ ] Có hàm bắt buộc phải chạy được nào duyệt một mảng như vậy không?
- [ ] Mọi `delete`: struct đó có chứa mapping hoặc mảng động không?
- [ ] Có `keccak256(abi.encodePacked(...))` với ≥2 tham số động không?
- [ ] Tham số `external` đã dùng `calldata` chưa (gas + tránh copy ngoài ý muốn)?

## Tham khảo

- [Solidity docs — Reference Types & Data location](https://docs.soliditylang.org/en/latest/types.html#reference-types)
- [Solidity docs — Mappings](https://docs.soliditylang.org/en/latest/types.html#mapping-types)
- [Solidity docs — ABI encodePacked collision warning](https://docs.soliditylang.org/en/latest/abi-spec.html#non-standard-packed-mode)
- [Coded Estate H-09](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/2) — burn xoá dữ liệu, tiền kẹt
- [Coded Estate M-02](https://github.com/code-423n4/2024-10-coded-estate-findings/issues/35) — mảng không cap gây DoS

## Liên kết

[[Solidity Value Types]] · [[Broken State Lifecycle]] · [[Denial of Service Patterns]] · [[Storage Layout]] · [[Blockchain]]
