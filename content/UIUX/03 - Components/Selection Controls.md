---
tags: [uiux, component, form]
status: growing
---
# Selection Controls

> Checkbox, Radio, Toggle, Select, Segmented control — nhóm component hay bị dùng sai nhất vì trông giống nhau nhưng ngữ nghĩa khác hẳn.

## 1. Chọn đúng control
| Control | Ngữ nghĩa | Số lựa chọn | Áp dụng ngay? |
|---|---|---|---|
| **Checkbox** | Chọn 0..n | Bất kỳ | Không — cần nút Lưu |
| **Radio** | Chọn đúng 1 | 2–5, hiện hết | Không — cần nút Lưu |
| **Toggle / Switch** | Bật/tắt | 1 | **Có — áp dụng ngay lập tức** |
| **Segmented control** | Chọn đúng 1 | 2–4, nhãn ngắn | Có — đổi ngay khung nhìn |
| **Select / Dropdown** | Chọn 1 | 5–15 | Không |
| **Combobox** | Chọn 1, có tìm kiếm | >15 | Không |
| **Chip / Tag filter** | Chọn 0..n, dễ bỏ | 3–12 | Thường có |

**Sai lầm kinh điển:** dùng **Toggle** trong form có nút "Lưu". Toggle hứa hẹn "thay đổi có hiệu lực ngay". Nếu cần bấm Lưu thì đó phải là **Checkbox**.

Sai lầm thứ hai: dùng **Radio** khi chỉ có 2 lựa chọn loại trừ và một trong hai là "không" → dùng Checkbox.

## 2. Quy tắc chung
- **Nhãn phải bấm được** — vùng chạm gồm cả chữ, không chỉ ô vuông nhỏ.
- **Xếp dọc**, không xếp ngang — dễ quét, tránh nhầm nhãn thuộc ô nào.
- **Luôn có giá trị mặc định** cho radio group (hoặc trạng thái "chưa chọn" rõ ràng).
- **Nhãn viết ở thể khẳng định.** ❌ "Không nhận email quảng cáo" (tick = không nhận → gây nhầm) ✅ "Nhận email quảng cáo"
- **Thứ tự lựa chọn** có logic: theo tần suất dùng, theo thứ tự tự nhiên (thời gian, kích cỡ), hoặc A–Z. Không xếp ngẫu nhiên.

## 3. Chi tiết từng loại
**Checkbox**
- Có trạng thái thứ ba: **indeterminate** (–) khi nhóm con chọn một phần.
- Nhóm nhiều checkbox nên có "Chọn tất cả".

**Radio**
- Không cho phép bỏ chọn về rỗng — nếu người dùng cần "không chọn gì" thì phải có lựa chọn "Không áp dụng".
- >5 lựa chọn → chuyển sang Select.

**Toggle / Switch**
- Nhãn mô tả **thứ được điều khiển**, không mô tả trạng thái: ✅ "Thông báo đẩy" ❌ "Bật thông báo đẩy"
- Trạng thái phải nhận biết được **không chỉ bằng màu** (vị trí nút tròn, dấu ✓/✕).
- Phải phản hồi ngay; nếu cần gọi API thì hiện loading trên chính toggle và hoàn nguyên nếu lỗi.

**Select / Dropdown**
- Nhãn mặc định phải là gợi ý, không phải một giá trị thật vô tình được chọn.
- Danh sách dài cần tìm kiếm, nhóm bằng optgroup, và ghim mục hay dùng lên đầu.
- Trên mobile, native select thường tốt hơn custom dropdown.
- **Hick's Law**: cắt bớt lựa chọn quan trọng hơn làm dropdown đẹp.

**Slider** → xem [[Slider & Picker]]

## 4. Multiselect
- Hiện các mục đã chọn dưới dạng **chip có nút ✕** để dễ bỏ.
- Có nút "Xoá tất cả".
- Hiện số lượng đã chọn: "Đã chọn 3".
- Với bộ lọc, hiện kết quả cập nhật ngay hoặc có nút "Áp dụng" rõ ràng — chọn một kiểu và nhất quán.

## 5. Accessibility
- Dùng thẻ gốc `<input type="checkbox|radio">` khi có thể; custom thì cần `role` + `aria-checked` + xử lý phím Space/Arrow.
- Nhóm radio bọc trong `<fieldset>` + `<legend>`.
- Toggle dùng `role="switch"` với `aria-checked`.

## 6. Checklist
- [ ] Control này có khớp ngữ nghĩa (1 vs n, ngay vs cần lưu) không?
- [ ] Bấm vào chữ có chọn được không?
- [ ] Nhãn có ở thể khẳng định không?
- [ ] Trạng thái chọn có nhận ra được khi không nhìn thấy màu không?
- [ ] Danh sách >15 mục đã có tìm kiếm chưa?
- [ ] Điều hướng bằng phím mũi tên có hoạt động không?

## Tham khảo
- NN/g — *Checkboxes vs. Radio Buttons*: https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/
- NN/g — *Toggle-Switch Guidelines*: https://www.nngroup.com/articles/toggle-switch-guidelines/
- NN/g — *Listboxes vs. Dropdown Lists*: https://www.nngroup.com/articles/listbox-dropdown/
- Material Design 3 — *Checkbox / Radio button / Switch*: https://m3.material.io/components
- WAI-ARIA APG — *Checkbox, Radio Group, Switch, Combobox*: https://www.w3.org/WAI/ARIA/apg/patterns/

## Liên kết
[[Input & Form]] · [[Slider & Picker]] · [[Laws of UX]] · [[UIUX]]
