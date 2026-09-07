---
tags: [physics, quantum-mechanics]
status: evergreen
---
# The Uncertainty Principle

> $\Delta x \, \Delta p \ge \hbar/2$. Đây **không** phải phát biểu về giới hạn của thiết bị đo. Nó là phát biểu về việc "vị trí xác định" và "động lượng xác định" **không thể cùng tồn tại** ở một hạt.

## 1. Hai cách hiểu — một sai, một đúng

| | ❌ Cách hiểu sai (nhiễu loạn) | ✅ Cách hiểu đúng |
|---|---|---|
| Phát biểu | Hạt *có* $x$ và $p$ xác định, nhưng đo cái này làm hỏng cái kia | Trạng thái có $\Delta x$ nhỏ thì **về mặt toán học** không thể có $\Delta p$ nhỏ |
| Nguồn gốc | Hạn chế kỹ thuật | **Tính chất của hàm sóng** — hệ quả của biến đổi Fourier |
| Cải tiến thiết bị có giúp không? | Trên nguyên tắc là có | Không. Đây là định lý, không phải khó khăn |
| Ai đã tin | Heisenberg lúc đầu (kính hiển vi tia gamma) | Cách hiểu hiện đại |

**Vì sao cách hiểu đúng lại là như vậy.** Trong cơ học lượng tử, động lượng liên hệ với **bước sóng**: $p = h/\lambda$. Một sóng có bước sóng xác định hoàn hảo phải trải dài vô hạn — nên vị trí hoàn toàn không xác định. Một xung định xứ trong một vùng nhỏ phải được tạo bởi **nhiều** bước sóng chồng lên nhau — nên động lượng không xác định.

Đây là một định lý toán học đúng cho **mọi** sóng, kể cả sóng âm và tín hiệu radio. Điều mới trong cơ học lượng tử là: **hạt vật chất cũng là sóng**.

> [!note] Cùng định lý này bạn đã gặp ở nơi khác
> Trong xử lý tín hiệu, nó là giới hạn thời gian–tần số: không thể có tín hiệu vừa ngắn về thời gian vừa hẹp về tần số. Một nốt nhạc rất ngắn không có cao độ xác định. Đó **chính xác** là cùng một bất đẳng thức.

## 2. Các cặp liên hợp

| Cặp | Bất đẳng thức | Ghi chú |
|---|---|---|
| Vị trí – động lượng | $\Delta x \Delta p \ge \hbar/2$ | Cặp chuẩn |
| Năng lượng – thời gian | $\Delta E \Delta t \ge \hbar/2$ | Cho phép hạt ảo trong [[Feynman Diagrams]] |
| Góc – mômen động lượng | $\Delta\phi \Delta L \ge \hbar/2$ | |
| Số hạt – pha | $\Delta N \Delta\phi \ge 1/2$ | Nền của quang lượng tử |

Cặp năng lượng–thời gian đáng chú ý nhất trong vault này: nó cho phép năng lượng "vay mượn" trong thời gian rất ngắn, và đó là cơ sở của các hạt ảo trong [[Quantum Electrodynamics]].

## 3. Hệ quả cụ thể

- **Nguyên tử không sụp đổ.** Nếu electron rơi vào hạt nhân, $\Delta x$ → nhỏ, nên $\Delta p$ → lớn, nên động năng → lớn. Có một bán kính tối ưu cân bằng hai xu hướng. Đó chính là bán kính Bohr, và nó giải thích **vì sao vật chất chiếm chỗ**.
- **Năng lượng điểm không.** Không có trạng thái "đứng yên hoàn toàn". Heli lỏng không đông đặc ở áp suất thường ngay cả ở 0 K — vì dao động điểm không. Xem [[Superfluidity of Helium]].
- **Chiều rộng vạch phổ.** Trạng thái sống ngắn → $\Delta t$ nhỏ → $\Delta E$ lớn → vạch phổ rộng. Đo độ rộng vạch là đo thời gian sống.
- **Giới hạn kính hiển vi.** Muốn định vị chính xác cần photon bước sóng ngắn → năng lượng cao → làm hỏng mẫu. Đây là hệ quả thực tế, không phải định nghĩa.

## 4. Cạm bẫy

> [!warning] "Bất định vì đo thì làm nhiễu"
> Đây là cách hiểu Heisenberg dùng ban đầu và bị bỏ. Bằng chứng: bất đẳng thức đúng **ngay cả khi không ai đo gì cả**. Nó là tính chất của *trạng thái*, không phải của *hành động đo*.

- **Nhầm với hiệu ứng quan sát viên.** Hai chuyện khác nhau: (a) đo làm thay đổi hệ, (b) một số cặp đại lượng không thể cùng xác định. Chỉ (b) là nguyên lý bất định.
- **Dùng "bất định" theo nghĩa đời thường.** Nó là bất đẳng thức định lượng với hằng số cụ thể, không phải "mọi thứ đều mơ hồ".
- **Áp dụng vào chuyện ngoài vật lý.** "Nguyên lý bất định trong quản lý", "trong tâm lý học" — không có nội dung. $\hbar = 1{,}05 \times 10^{-34}$ J·s; ở thang người, ràng buộc này hoàn toàn không có ý nghĩa.
- **Quên nó áp dụng cho cặp *liên hợp*.** $x$ và $p_y$ (vuông góc) đo đồng thời chính xác được. Chỉ các cặp không giao hoán mới bị ràng buộc.
- **Nhầm với ngẫu nhiên lượng tử.** Hai chuyện liên quan nhưng khác. Xem [[Probability and Uncertainty]].

## 5. Checklist áp dụng

- [ ] Tôi giải thích được nguyên lý này bằng biến đổi Fourier, không dùng câu chuyện "photon va vào electron"?
- [ ] Tôi biết cặp nào là liên hợp, cặp nào không?
- [ ] Tôi ước lượng được năng lượng điểm không của electron trong hộp cỡ nguyên tử?
- [ ] Tôi phân biệt được nguyên lý bất định và hiệu ứng quan sát viên?
- [ ] Tôi nhận ra được khi ai đó đang dùng khái niệm này như ẩn dụ rỗng?

## Tham khảo

- [The Feynman Lectures, Vol III Ch. 1-6 — The uncertainty principle](https://www.feynmanlectures.caltech.edu/III_01.html)
- [The Feynman Lectures, Vol III Ch. 2 — The Relation of Wave and Particle Viewpoints](https://www.feynmanlectures.caltech.edu/III_02.html)
- Feynman, *The Character of Physical Law* (MIT Press, 1967), Chương 6
- Heisenberg, "Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik", *Z. Phys.* 43 (1927) — bài gốc, kèm cách diễn giải nhiễu loạn nay đã bị thay thế
- Kennard, "Zur Quantenmechanik einfacher Bewegungstypen", *Z. Phys.* 44 (1927) — dạng bất đẳng thức chính xác

## Liên kết

[[Probability and Uncertainty]] · [[The Double Slit Experiment]] · [[Quantum Electrodynamics]] · [[Feynman Diagrams]] · [[Superfluidity of Helium]] · [[Physics]]
