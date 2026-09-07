---
tags: [uiux, content]
status: growing
---
# UX Writing

> Ngôn ngữ và lời thoại trong ứng dụng. Lời nhắn rõ ràng, thân thiện giúp người dùng không bối rối khi gặp lỗi hoặc khi phải thao tác phức tạp.
> UX writing là **thiết kế**, không phải trang trí — nó thường là phần giao diện được đọc nhiều nhất.

## 1. Ba nguyên tắc cốt lõi (Google)
1. **Clear (Rõ ràng)** — người dùng hiểu ngay, không cần đoán.
2. **Concise (Ngắn gọn)** — mỗi từ phải kiếm được chỗ đứng của nó.
3. **Useful (Hữu ích)** — giúp họ đi tiếp bước sau.

Khi ba nguyên tắc xung đột, ưu tiên theo đúng thứ tự trên. **Rõ ràng thắng ngắn gọn; ngắn gọn thắng dí dỏm.**

## 2. Voice & Tone
- **Voice** = tính cách thương hiệu, **không đổi**. (Ví dụ: thân thiện, đáng tin, thẳng thắn.)
- **Tone** = cách thể hiện, **đổi theo ngữ cảnh**. Vui vẻ ở màn hình chúc mừng, nghiêm túc và trấn an ở màn hình lỗi thanh toán.

> Quy tắc: **cảm xúc người dùng càng tiêu cực, tông càng phải trung tính và hữu ích.** Đùa cợt trong thông báo mất dữ liệu là thảm hoạ.

## 3. Viết cho từng loại thành phần
**Nút** → động từ + kết quả: "Lưu thay đổi", "Đặt hàng", "Xoá tệp". Không "OK", "Submit", "Yes/No". → [[Button]]

**Tiêu đề** → nói kết quả hoặc lợi ích, không nói tính năng: ❌ "Tính năng đồng bộ đám mây" ✅ "Ghi chú của bạn ở mọi thiết bị"

**Thông báo lỗi** → *chuyện gì → vì sao → làm gì tiếp*, không đổ lỗi. → [[Empty & Error States]]

**Trạng thái rỗng** → giải thích vùng này để làm gì + một CTA.

**Nhãn form** → dùng từ người dùng biết, kèm ví dụ định dạng khi cần. → [[Input & Form]]

**Xác nhận** → nêu rõ hậu quả: "Xoá 3 tệp? Không khôi phục được." → [[Modal & Dialog]]

**Toast** → thông báo kết quả ngắn gọn: "Đã sao chép liên kết".

## 4. Kỹ thuật viết
- **Ngôi thứ hai** ("bạn"), thể chủ động: ❌ "Tài khoản của bạn đã được cập nhật bởi hệ thống" ✅ "Đã cập nhật tài khoản".
- **Từ trước ra sau theo mức quan trọng** — người dùng quét, không đọc. Đưa thông tin chính lên đầu câu.
- **Tránh thuật ngữ nội bộ** — "gói", "workspace", "entity"… hỏi: người dùng có tự gọi thế không?
- **Số cụ thể thay vì từ mơ hồ**: ❌ "sắp hết dung lượng" ✅ "còn 120MB (5%)".
- **Nhất quán từ vựng** — nếu đã gọi là "Dự án" thì đừng chỗ khác gọi "Project", "Không gian làm việc".
- **Tránh phủ định kép**: ❌ "Không tắt thông báo" ✅ "Bật thông báo".
- **Viết cho bản dịch**: tiếng Việt thường dài hơn tiếng Anh ~20–30%; đừng thiết kế nút vừa khít chữ.

## 5. Đặc thù tiếng Việt
- **Xưng hô**: chọn một chuẩn cho toàn sản phẩm ("bạn" là an toàn nhất cho đa số; "quý khách" cho tài chính/dịch vụ trang trọng). Đừng lẫn lộn.
- **Dấu câu**: không dùng dấu chấm cuối nhãn nút hay label ngắn; dùng cho câu đầy đủ.
- **Viết hoa**: tiếng Việt dùng **sentence case** ("Lưu thay đổi"), không dùng Title Case kiểu Anh ("Lưu Thay Đổi").
- **Số & tiền tệ**: `250.000₫` (dấu chấm phân cách nghìn), ngày `dd/mm/yyyy`.
- **Tránh Anh–Việt lẫn lộn** trừ thuật ngữ đã phổ biến (email, file, link).

## 6. Quy trình
- Viết **content trước hoặc song song** với thiết kế, không phải điền vào cuối.
- Dùng **nội dung thật** trong mockup — lorem ipsum che giấu vấn đề thiết kế.
- Lập **content style guide**: từ vựng chuẩn, cách viết ngày giờ, cách viết lỗi.
- Test microcopy trong [[Usability Testing]] — chỗ người dùng ngập ngừng thường là chỗ chữ chưa rõ.

## 7. Checklist
- [ ] Nhãn nút có nói rõ chuyện gì sẽ xảy ra không?
- [ ] Có từ nào là thuật ngữ nội bộ không?
- [ ] Câu này bỏ được từ nào không?
- [ ] Thông báo lỗi có nói được cách sửa không?
- [ ] Cùng một khái niệm có được gọi cùng một tên ở mọi nơi không?
- [ ] Đọc to lên có tự nhiên không?
- [ ] Nếu chữ dài gấp rưỡi (khi dịch) thì layout có vỡ không?

## Tham khảo
- Google — *Material Design Writing guidelines*: https://m3.material.io/foundations/content-design/overview
- **Shopify Polaris — Content** (tài liệu UX writing tốt nhất công khai): https://polaris.shopify.com/content
- Mailchimp — *Content Style Guide*: https://styleguide.mailchimp.com/
- GOV.UK — *Style guide & writing for user needs*: https://www.gov.uk/guidance/style-guide
- NN/g — *Microcopy*: https://www.nngroup.com/articles/microcopy/
- Kinneret Yifrah — *Microcopy: The Complete Guide*: https://www.microcopybook.com/

## Liên kết
[[Empty & Error States]] · [[Button]] · [[Modal & Dialog]] · [[Accessibility]] · [[UIUX]]
