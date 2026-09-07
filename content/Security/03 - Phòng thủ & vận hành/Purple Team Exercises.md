---
tags: [security, phòng-thủ]
status: growing
---
# Purple Team Exercises

> Red team hỏi *"vào được không?"*. Blue team hỏi *"thấy được không?"*. Purple team ghép hai câu lại và biến mỗi kỹ thuật tấn công thành một **detection dùng lại được**. Đây là chỗ hai nửa của vault này — thư mục `01`/`02` và thư mục `03` — đóng thành một vòng.

## 1. Vì sao purple thắng red thuần

| | Red team thuần | Purple team |
|---|---|---|
| Mục tiêu | Chứng minh vào được | Cải thiện khả năng phát hiện |
| Blue biết không | Không (kín) | Có (hợp tác) |
| Kết quả | Báo cáo "đã tới DA" | Danh sách detection mới, đã kiểm chứng |
| Giá trị lâu dài | Ảnh chụp một thời điểm | Năng lực bền vững |

Red team kín có giá trị (kiểm tra phản ứng thật), nhưng purple team **tạo ra nhiều cải thiện phòng thủ hơn trên mỗi giờ**: mỗi kỹ thuật chạy ra, hai bên cùng nhìn xem detection có kêu không, và nếu không thì viết ngay.

## 2. Vòng lặp purple

1. **Chọn kỹ thuật** — từ [[MITRE ATTACK Framework]], ưu tiên kỹ thuật liên quan tới threat actor thật của tổ chức — [[Threat Actor Profiling]].
2. **Red thực thi** — chạy kỹ thuật (thủ công hoặc mô phỏng).
3. **Blue quan sát** — detection có kêu không? Log có ghi không?
4. **Đánh giá cùng nhau** — không phát hiện / phát hiện nhưng không cảnh báo / cảnh báo đúng.
5. **Vá lỗ hổng phát hiện** — viết detection mới hoặc bật log thiếu — [[Detection Engineering]], [[SIEM and Log Analysis]].
6. **Test lại** — xác nhận detection mới hoạt động.
7. **Ghi lại độ phủ** — cập nhật bản đồ ATT&CK.

## 3. Ba kết quả có thể của mỗi kỹ thuật

| Kết quả | Nghĩa là | Hành động |
|---|---|---|
| **Không log** | Không có dữ liệu để phát hiện | Bật log nguồn — điểm mù nghiêm trọng nhất |
| **Log nhưng không cảnh báo** | Có dữ liệu, thiếu detection | Viết detection |
| **Cảnh báo đúng** | Phát hiện hoạt động | Xác nhận và ghi nhận độ phủ |

## 4. Nguyên tắc

1. **Ánh xạ mọi bài tập lên ATT&CK.** Cho biết độ phủ và điểm mù có hệ thống.
2. **Ưu tiên kỹ thuật của kẻ địch thật.** Đừng test mọi kỹ thuật đều nhau; ưu tiên cái threat actor nhắm vào ngành bạn dùng.
3. **Mọi kỹ thuật không phát hiện được phải sinh ra hành động.** Detection mới hoặc log mới — nếu không, bài tập chỉ là biểu diễn.
4. **Test lại sau khi vá.** Detection viết ra chưa test là giả định.
5. **Đây là cách học tấn công tạo ra giá trị phòng thủ.** Trả lời trực tiếp cho [[Offense vs Defense Bias]]: kiến thức thư mục `01`/`02` không phải để tấn công mà để biết cần phát hiện gì.
6. **Dùng mô phỏng để nhân rộng.** Atomic Red Team / Caldera chạy kỹ thuật lặp lại được, không cần red team thủ công mỗi lần.

## 5. Cạm bẫy

- **Biến purple thành red team có khán giả.** Nếu blue chỉ ngồi xem mà không viết detection, không có giá trị bền.
- **Test kỹ thuật không liên quan.** Phủ đều mọi kỹ thuật ATT&CK là bất khả thi và lãng phí; ưu tiên theo threat model.
- **Không đóng vòng.** Tìm ra điểm mù rồi không vá.
- **Chỉ làm một lần.** Môi trường và detection đổi; purple team là hoạt động định kỳ.
- **Bỏ qua "không log".** Đây là kết quả tệ nhất nhưng dễ bị bỏ qua vì "không thấy gì" cảm giác như "không có vấn đề".
- **Không test lại.** Detection mới có thể sai; xác nhận trước khi tin.

## 6. Checklist áp dụng

- [ ] Bài tập có ánh xạ lên kỹ thuật ATT&CK cụ thể không?
- [ ] Kỹ thuật được chọn có liên quan tới threat actor thật của tổ chức không?
- [ ] Với mỗi kỹ thuật: kết quả là không-log / không-cảnh-báo / cảnh-báo-đúng?
- [ ] Mọi điểm mù phát hiện được đã sinh ra detection hoặc log mới chưa?
- [ ] Detection mới đã được test lại chưa?
- [ ] Bản đồ độ phủ ATT&CK có được cập nhật không?
- [ ] Đây có phải hoạt động định kỳ, không chỉ một lần không?

## 7. Công cụ

| Tên | Vai trò |
|---|---|
| **Atomic Red Team** | Thư viện kỹ thuật mô phỏng nhỏ, lặp lại được |
| **MITRE Caldera** | Tự động hoá mô phỏng adversary |
| **MITRE ATT&CK Navigator** | Bản đồ độ phủ |
| **VECTR** | Theo dõi và báo cáo bài tập purple team |
| **Sigma** | Chuyển phát hiện thành detection |

## Tham khảo

- [MITRE ATT&CK](https://attack.mitre.org/) và [Caldera](https://caldera.mitre.org/)
- [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team)
- [SANS — Purple Team resources](https://www.sans.org/)
- [VECTR](https://vectr.io/)

## Liên kết

[[Blue Team Operations]] · [[Detection Engineering]] · [[MITRE ATTACK Framework]] · [[Threat Actor Profiling]] · [[Offense vs Defense Bias]] · [[Penetration Testing Lifecycle]] · [[Security]]
