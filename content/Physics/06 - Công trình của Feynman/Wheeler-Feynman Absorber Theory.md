---
tags: [physics, electrodynamics, feynman, history]
status: growing
---
# Wheeler-Feynman Absorber Theory

> Một lý thuyết **sai** — và là lý thuyết sai có ảnh hưởng nhất trong sự nghiệp Feynman. Nỗ lực lượng tử hoá nó đã đẻ ra [[Path Integral Formulation]], và qua đó đẻ ra [[Feynman Diagrams]] và [[Quantum Electrodynamics]].

## 1. Vấn đề nó định giải

Trong điện động lực học cổ điển, một electron gia tốc bức xạ năng lượng. Nhưng lực cản bức xạ (radiation reaction) tác dụng lên chính electron đó lại dẫn tới:

- **Năng lượng riêng vô hạn** — electron tương tác với trường của chính nó ở khoảng cách bằng 0.
- **Nghiệm chạy trốn** (runaway solutions) — phương trình Abraham–Lorentz cho nghiệm electron tự gia tốc vô hạn.
- **Tiền gia tốc** (pre-acceleration) — hạt bắt đầu gia tốc *trước khi* lực tác dụng.

**Ý tưởng cực đoan của Wheeler và Feynman:** bỏ hẳn khái niệm trường như một thực thể độc lập. Electron **không** tự tương tác. Chỉ có tương tác trực tiếp giữa các hạt tích điện — nhưng dùng **cả** nghiệm chậm (retarded, lan ra tương lai) **và** nghiệm sớm (advanced, lan về quá khứ), lấy trung bình đối xứng thời gian.

## 2. Lời giải cho tính bất đối xứng thời gian

Nếu dùng nghiệm đối xứng thời gian, vì sao ta chỉ *quan sát* bức xạ lan ra tương lai?

**Trả lời của họ:** vũ trụ chứa đủ vật chất để hấp thụ hoàn toàn mọi bức xạ. Phản ứng của các "vật hấp thụ" trong tương lai gửi lại các sóng sớm, và chúng **triệt tiêu** phần sóng sớm của nguồn, đồng thời **tăng gấp đôi** phần sóng chậm. Kết quả quan sát được: bức xạ hoàn toàn chậm.

Nghĩa là: mũi tên thời gian trong bức xạ không phải tính chất của định luật, mà là **tính chất của điều kiện biên vũ trụ**. Xem [[The Arrow of Time]] — đây đúng là kiểu lời giải mà bài toán mũi tên thời gian cần, và cũng đúng là kiểu lời giải khó kiểm chứng.

> [!note] Seminar đầu tiên của Feynman ở Princeton
> Seed ghi lại người dự: **Einstein, Pauli, von Neumann.** Với một nghiên cứu sinh chưa có bằng tiến sĩ.
> Pauli đưa ra nhận xét hoá ra rất chính xác: lý thuyết này sẽ **cực kỳ khó lượng tử hoá**. Einstein gợi ý thử áp dụng phương pháp tương tự cho hấp dẫn — điều Hoyle và Narlikar làm nhiều năm sau (lý thuyết hấp dẫn Hoyle–Narlikar).
> Nhận xét của Pauli đúng, và chính vì nó đúng mà Feynman phải phát minh ra tích phân đường.

## 3. Vì sao nó thất bại

| Vấn đề | Nội dung |
|---|---|
| **Điều kiện hấp thụ hoàn toàn** | Đòi hỏi vũ trụ hấp thụ hoàn toàn ở mọi tần số. Vũ trụ giãn nở có vẻ không thoả mãn điều này |
| **Không lượng tử hoá được trực tiếp** | Không có Hamiltonian theo nghĩa thông thường — đúng như Pauli cảnh báo |
| **Bị vượt qua** | [[Renormalization]] giải quyết bài toán vô hạn theo cách khác, và cách đó cho ra tiên đoán chính xác 12 chữ số |
| **Nhân quả** | Sóng sớm gây khó chịu về mặt nhân quả, dù về mặt toán học nhất quán |

Feynman về sau công khai từ bỏ nó. Trong bài giảng Nobel 1966 ông kể lại toàn bộ hành trình — bao gồm cả những ngõ cụt — và điều đó khiến bài giảng đó là một trong những tài liệu trung thực nhất về cách vật lý lý thuyết thực sự diễn ra.

## 4. Nó để lại gì

Đây là lý do note này tồn tại trong vault:

1. **Tích phân đường.** Vì không lượng tử hoá được theo cách chuẩn, Feynman phải xây một hình thức luận dựa trên **tác dụng** thay vì Hamiltonian. Hình thức luận đó tổng quát hơn nhiều và nay là ngôn ngữ chuẩn của lý thuyết trường lượng tử.
2. **Positron = electron đi lùi thời gian.** Sự thoải mái với các nghiệm ngược thời gian đến thẳng từ đây, và trở thành Feynman propagator. Xem [[Feynman Diagrams]].
3. **Thói quen nghi ngờ khái niệm "trường".** Xem [[Physical Law vs Mechanism]].

> [!warning] Mẫu lặp lại trong sự nghiệp Feynman
> Đây là lần thứ nhất; lần thứ hai là [[Quantum Gravity]], nơi nỗ lực thất bại đẻ ra "ghost" — công cụ nay bắt buộc trong mọi lý thuyết gauge.
> Bài học không phải "thất bại là tốt". Bài học là: **một nỗ lực nghiêm túc vào một bài toán khó thường sinh ra công cụ có giá trị vượt xa bài toán đó** — miễn là ta theo đuổi nó đủ xa để phải chế công cụ mới.

## 5. Cạm bẫy

- **Coi nó là lý thuyết sống được.** Không. Nó bị bỏ, và bị bỏ đúng theo tiêu chuẩn ở [[Why Wrong Theories Are Rejected]].
- **Nhầm sóng sớm với du hành thời gian.** Đây là phát biểu về nghiệm của phương trình sóng, không phải về việc gửi tín hiệu về quá khứ.
- **Tưởng nó chỉ có giá trị lịch sử.** Ý tưởng "tương tác trực tiếp giữa các hạt, không có trường độc lập" vẫn được nghiên cứu, và cách giải thích mũi tên thời gian bằng điều kiện biên vũ trụ vẫn là một hướng sống trong triết học vật lý.
- **Bỏ qua rằng Feynman tự bác bỏ nó.** Ông không bảo vệ nó. Xem [[Cargo Cult Science]] — chính ông đặt tiêu chuẩn về việc báo cáo cả những gì không hoạt động.

## 6. Checklist áp dụng

- [ ] Tôi nêu được ba vấn đề của điện động lực học cổ điển mà lý thuyết này định giải?
- [ ] Tôi giải thích được cơ chế "vật hấp thụ" triệt tiêu sóng sớm?
- [ ] Tôi biết vì sao nó không lượng tử hoá được, và điều đó dẫn tới cái gì?
- [ ] Tôi kể được hai lần trong sự nghiệp Feynman mà một thất bại sinh ra công cụ nền tảng?
- [ ] Với dự án của tôi: nếu nó thất bại, tôi có chế ra được công cụ nào dùng lại được không?

## Tham khảo

- Wheeler & Feynman, "Interaction with the Absorber as the Mechanism of Radiation", *Rev. Mod. Phys.* 17 (1945) 157 — **bài gốc**
- Wheeler & Feynman, "Classical Electrodynamics in Terms of Direct Interparticle Action", *Rev. Mod. Phys.* 21 (1949) 425
- Feynman, "The Development of the Space-Time View of Quantum Electrodynamics", *Science* 153 (1966) — **bài giảng Nobel, ông tự kể cả các ngõ cụt**
- Hoyle & Narlikar, "A New Theory of Gravitation", *Proc. Roy. Soc. A* 282 (1964) — hướng Einstein gợi ý
- Price, *Time's Arrow and Archimedes' Point* (Oxford UP, 1996), Chương 3

## Liên kết

[[Path Integral Formulation]] · [[Feynman Diagrams]] · [[Quantum Electrodynamics]] · [[The Arrow of Time]] · [[Quantum Gravity]] · [[Feynman Biography]] · [[Physics]]
