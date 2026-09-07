---
tags: [uiux, visual, layout]
status: growing
---
# Layout & Composition

> Sắp xếp các khối trên màn hình sao cho mắt người đi đúng thứ tự mình muốn.

## 1. Mắt người quét màn hình thế nào
- **F-pattern** — trang nhiều chữ, ít định dạng (blog, kết quả tìm kiếm). Mắt quét ngang đầu trang, ngang lần hai ngắn hơn, rồi dọc theo lề trái. → Đặt thông tin quan trọng ở đầu dòng.
- **Z-pattern** — trang thưa, ít nội dung (landing page). Trên-trái → trên-phải → chéo xuống dưới-trái → dưới-phải. → Đặt CTA ở điểm kết thúc Z.
- **Layer-cake pattern** — khi có tiêu đề phụ rõ ràng, mắt nhảy giữa các heading. → Đây là pattern *mong muốn*; tạo ra nó bằng heading và spacing tốt.
- **Spotted pattern** — người dùng đang tìm một thứ cụ thể (số điện thoại, giá).

Hệ quả: **không ai đọc, họ quét.** Viết nội dung dạng quét được → [[UX Writing]].

## 2. Các mẫu bố cục phổ biến
| Mẫu | Dùng cho |
|---|---|
| **Single column** | Nội dung dài, form, mobile. Đơn giản nhất, thường tốt nhất |
| **Sidebar + content** | Dashboard, admin, docs |
| **Split screen** | Hai lựa chọn ngang hàng, trang đăng nhập có hình |
| **Card grid** | Duyệt nội dung đồng dạng → [[Card]] |
| **Bento grid** | Trang giới thiệu tính năng, ô kích thước khác nhau |
| **Master–detail** | Email, chat, danh sách + chi tiết |
| **Z-layout / hero** | Landing page |

## 3. Nguyên tắc bố cục
- **Một nhân vật chính mỗi màn hình.** Xác định "nếu người dùng chỉ làm một việc ở đây, đó là gì?" rồi làm việc đó nổi bật nhất.
- **Nhóm theo nhiệm vụ, không theo kiểu dữ liệu.** Người dùng nghĩ theo việc cần làm.
- **Căn lề nhất quán** — giảm số đường căn lề dọc là cách nhanh nhất làm giao diện gọn hơn.
- **Đừng dùng đường kẻ khi khoảng cách đã đủ.** Thứ tự ưu tiên để phân tách: khoảng cách → nền khác màu → viền → đường kẻ.
- **Above the fold** vẫn quan trọng cho việc *tạo động lực cuộn*, không phải để nhét mọi thứ.
- **Nội dung quyết định bố cục**, không phải ngược lại. Thiết kế với nội dung thật (tên dài, ảnh thiếu, số 0).

## 4. Responsive
- **Mobile-first**: thiết kế cột hẹp trước.
- Kỹ thuật chuyển đổi: cột ngang → xếp dọc · sidebar → drawer · table → card list · nav ngang → bottom tab.
- Đừng chỉ nghĩ theo thiết bị, nghĩ theo **container width** (container query).
- Kiểm tra ở 3 mốc tối thiểu: 375px, 768px, 1440px.

## 5. Elevation & chiều sâu
- Shadow biểu thị **độ cao**, không phải để trang trí. Vật càng cao → bóng càng lớn và càng mờ.
- Thang elevation gợi ý: `0` nền · `1` card · `2` dropdown · `3` modal · `4` toast.
- Bóng tốt = **hai lớp**: một lớp nhỏ đậm (tiếp xúc) + một lớp lớn nhạt (khuếch tán).
- Ở dark mode, dùng **bề mặt sáng dần** thay cho bóng → [[Color Theory]].
- Đừng lạm dụng shadow — hầu hết giao diện chỉ cần 3 bậc.

## 6. Checklist
- [ ] Squint test: nheo mắt lại, bố cục còn đọc được thành khối không?
- [ ] Thứ đầu tiên mắt nhìn thấy có phải thứ quan trọng nhất không?
- [ ] Có bao nhiêu đường căn lề? Giảm được không?
- [ ] Đã thử với nội dung dài nhất và ngắn nhất chưa?
- [ ] Ở 375px màn hình còn dùng được không?
- [ ] Có shadow nào không mang thông tin về độ cao không?

## Tham khảo
- NN/g — *Text Scanning Patterns (F, Z, layer-cake)*: https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- Material Design 3 — *Elevation*: https://m3.material.io/styles/elevation/overview
- *Refactoring UI* — chương Layout and Spacing
- Web.dev — *Learn Responsive Design*: https://web.dev/learn/design/
- UI Patterns — thư viện pattern bố cục: https://ui-patterns.com/

## Liên kết
[[Spacing & Grid]] · [[Design Principles]] · [[Card]] · [[Table & Data Display]] · [[UIUX]]
