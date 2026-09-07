---
tags: [frontend, nền-tảng, form]
status: evergreen
---
# HTML Forms & Validation

> Form là chỗ duy nhất trên web mà trình duyệt đã làm sẵn 80% việc cho bạn — và cũng là chỗ frontend hay vứt hết đi để viết lại bằng JavaScript.

> [!note] Ghi chú nguồn
> Seed ghi lại lựa chọn của Robin Wieruch: *"Tôi chỉ dùng Zod cho validation phía server, giữ form phía client nhẹ bằng native HTML validation. Nhờ vậy component form không phải gánh thư viện form bên thứ ba nào."* Note này khai triển vì sao lựa chọn đó hợp lý và khi nào nó gãy.

## 1. Khái niệm cốt lõi

### Các `<input>` type đáng dùng

| Type | Được gì miễn phí |
|---|---|
| `email` | Bàn phím có `@`, validation định dạng |
| `tel` | Bàn phím số trên mobile |
| `url` | Validation scheme |
| `number` | Stepper, `min`/`max`/`step` |
| `date` `time` `datetime-local` `month` `week` | Date picker gốc của OS |
| `search` | Nút xoá, kiểu dáng gốc |
| `password` | Che ký tự, tích hợp password manager |
| `file` | Dialog gốc, `accept`, `multiple` |
| `range` | Slider — xem [[Slider & Picker]] bên UIUX |
| `color` | Color picker gốc |

Định dạng giá trị của các type ngày/giờ theo chuẩn ISO — xem bảng trong [[HTML Document Anatomy]].

### Constraint Validation API

Trình duyệt tự kiểm tra và cho bạn truy cập kết quả:

| Attribute | Ràng buộc |
|---|---|
| `required` | Không được rỗng |
| `min` / `max` | Khoảng số hoặc ngày |
| `minlength` / `maxlength` | Độ dài text |
| `pattern` | Regex |
| `step` | Bước nhảy |

API tương ứng: `input.validity` (object cờ), `input.validationMessage`, `input.setCustomValidity()`, `form.checkValidity()`, `form.reportValidity()`.

CSS bắt được trạng thái này: `:valid`, `:invalid`, `:required`, `:user-valid`, `:user-invalid`, `:in-range`, `:out-of-range`, `:placeholder-shown`.

### Ba tầng validation

| Tầng | Chống được gì | Bỏ được không |
|---|---|---|
| **Native HTML** | Lỗi gõ nhầm, phản hồi tức thì | Có, nhưng mất free |
| **Client JS** | Luật phức tạp, liên trường | Có |
| **Server** | Người dùng ác ý, race condition | **Không bao giờ** |

Validation phía client là **trải nghiệm**; validation phía server là **tính đúng đắn**. Client bị bỏ qua chỉ bằng một lệnh `curl`.

## 2. Nguyên tắc

1. **Luôn có `<form>` thật với `action` và `method`.** Nó cho bạn submit bằng Enter, tích hợp password manager, và hoạt động khi JS hỏng — nền tảng của [[React Server Functions]].
2. **Mỗi input có một `<label for>`.** Không placeholder-as-label. Label còn mở rộng vùng click.
3. **`name` là bắt buộc.** Không có `name` thì trường không được gửi đi.
4. **`autocomplete` đúng token** (`email`, `current-password`, `new-password`, `one-time-code`, `street-address`…). Đây là khác biệt lớn nhất về tốc độ điền form trên mobile.
5. **Dùng `:user-invalid` thay `:invalid`.** `:invalid` bắn đỏ ngay khi trang vừa load; `:user-invalid` chỉ bắn sau khi người dùng đã tương tác.
6. **Thông báo lỗi gắn bằng `aria-describedby`** và đặt cạnh trường, không dồn lên đầu form.
7. **Validate cùng schema ở cả hai phía khi có thể.** Zod chạy được ở client lẫn server; giữ một nguồn sự thật.
8. **Đừng disable nút submit khi form invalid.** Người dùng mất manh mối vì sao. Cho bấm, rồi chỉ ra lỗi.

## 3. Cạm bẫy

- **`type="number"` cho những thứ không phải số.** Số điện thoại, mã OTP, số thẻ đều **không** phải `number` — nó cho phép `e`, `+`, dấu mũi tên đổi giá trị khi cuộn, và cắt số 0 đầu. Dùng `type="text"` + `inputmode="numeric"`.
- **Regex email tự viết.** Gần như luôn sai. Dùng `type="email"` rồi xác minh thật bằng email gửi đi.
- **Bỏ qua state "đang gửi".** Double-submit tạo bản ghi trùng. Vô hiệu hoá nút *sau khi* bấm, không phải trước.
- **Validation phía client là tất cả.** Xem bảng ba tầng — server không phải tuỳ chọn.
- **`preventDefault()` rồi quên submit.** Mất luôn hành vi Enter và tích hợp trình duyệt.
- **Thư viện form cho form 3 trường.** React Hook Form + resolver + schema cho một form đăng nhập là 30KB để thay thế thứ trình duyệt làm miễn phí.
- **Nút không có `type`.** `<button>` trong form mặc định là `type="submit"` — một nút "Xoá" sẽ submit form.
- **Reset form xoá luôn dữ liệu người dùng gõ.** `<input type="reset">` gần như không bao giờ là thứ người dùng muốn.

## 4. Checklist áp dụng

- [ ] Có `<form>` thật, không phải `<div>` + onClick?
- [ ] Mọi input có `<label for>` và `name` chưa?
- [ ] `autocomplete` đã đặt token đúng chưa?
- [ ] Lỗi có được gắn `aria-describedby` không?
- [ ] Có validation phía **server** cho mọi trường không?
- [ ] Dùng `:user-invalid` thay `:invalid` chưa?
- [ ] Mọi `<button>` trong form đã có `type` rõ ràng chưa?
- [ ] Submit hai lần liên tiếp có tạo hai bản ghi không?
- [ ] Tắt JS, form có còn gửi được không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| Zod | Schema validation dùng chung client/server | https://zod.dev/ |
| React Hook Form | Khi form thực sự phức tạp | https://react-hook-form.com/ |
| Conform | Progressive enhancement cho form React | https://conform.guide/ |

## Tham khảo

- MDN — *Client-side form validation*: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- MDN — *Constraint Validation API*: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
- WHATWG — *The input element*: https://html.spec.whatwg.org/multipage/input.html
- MDN — *HTML attribute: autocomplete*: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
- W3C — *WAI Forms tutorial*: https://www.w3.org/WAI/tutorials/forms/

## Liên kết

[[Semantic HTML]] · [[Accessible Markup & ARIA]] · [[Input & Form]] · [[React Server Functions]] · [[Frontend]]
