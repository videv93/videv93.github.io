---
tags: [physics, computation, quantum-computing, feynman]
status: evergreen
---
# Feynman and Computation

> Từ việc quản lý một phòng "máy tính người" ở Los Alamos năm 1943, tới việc đề xuất máy tính lượng tử năm 1981. Một chủ đề chạy suốt sự nghiệp ông, và là chủ đề ông làm việc cho tới những năm cuối đời.

Seed ghi: *"Feynman has been credited with having pioneered the field of quantum computing."*

## 1. Los Alamos: tính toán như một bài toán kỹ thuật

Trước khi có máy tính điện tử, "computer" là **nghề của con người**. Feynman quản lý nhóm đó.

Seed liệt kê cụ thể:

- **Tổ chức dây chuyền.** Với Stanley Frankel và Nicholas Metropolis, ông thiết lập hệ thống dùng **thẻ đục lỗ IBM**. Mỗi người làm một phép toán, chuyền kết quả — đúng nguyên lý pipeline.
- **Thuật toán mới.** *"He invented a new method of computing logarithms that he later used on the Connection Machine."* Cùng thuật toán đó, 40 năm sau, dùng lại trên siêu máy tính song song.
- **Song song hoá.** Chạy nhiều bài toán cùng lúc bằng thẻ màu khác nhau — nhận ra rằng thông lượng quan trọng hơn độ trễ.
- **Và một chi tiết rất Feynman:** *"An avid drummer, Feynman figured out how to get the machine to click in musical rhythms."*

> [!note] Bài học nằm ở đây, không ở giai thoại
> Ông không coi tính toán là việc tay chân. Ông coi nó là một **hệ thống cần thiết kế** — và những nguyên lý ông tìm ra (pipeline, song song hoá, tối ưu thông lượng) là những nguyên lý của kiến trúc máy tính hiện đại, tìm ra bằng cách quan sát con người làm việc.

## 2. Thinking Machines và Connection Machine

Seed: *"In the 1980s he began to spend his summers working at Thinking Machines Corporation, helping to build some of the first parallel supercomputers."*

Connection Machine là máy song song ồ ạt — tới 65.536 bộ xử lý đơn giản. Feynman làm việc thật ở đó, không phải cố vấn danh nghĩa: ông phân tích hiệu năng router bằng phương trình vi phân, và viết mã cho các bài toán QCD trên lưới.

Danny Hillis, người sáng lập công ty, là người Feynman nói câu cuối cùng đáng nhớ nhất — xem [[Feynman Biography]].

## 3. Máy tính lượng tử

**Bài nói 1981**, "Simulating Physics with Computers" (đăng 1982). Lập luận rất đơn giản và rất sắc:

1. Mô phỏng một hệ lượng tử $n$ hạt trên máy tính cổ điển cần theo dõi $2^n$ biên độ.
2. Chi phí đó tăng **theo hàm mũ**. Với 50 hạt đã vượt mọi máy tính có thể chế tạo.
3. Nhưng tự nhiên **làm được** — hệ 50 hạt tiến hoá theo thời gian không gặp khó khăn gì.
4. Vậy: hãy chế tạo máy tính **bản thân nó là lượng tử**.

> "Nature isn't classical, dammit, and if you want to make a simulation of nature, **you'd better make it quantum mechanical**, and by golly it's a wonderful problem, because it doesn't look so easy."

Đây là một ví dụ mẫu về cách đặt câu hỏi của Feynman: không hỏi "làm sao tính nhanh hơn", mà hỏi **"định luật vật lý cho phép tính tới đâu"**. Cùng cấu trúc câu hỏi với [[Plenty of Room at the Bottom]].

Ứng dụng đầu tiên ông nêu — mô phỏng hệ lượng tử — đến nay vẫn là ứng dụng thực tế hứa hẹn nhất của máy tính lượng tử, hơn cả phân tích số nguyên.

## 4. Giới hạn vật lý của tính toán

Chủ đề thứ ba, và nó nối thẳng với nhiệt động lực học:

- **Tính toán thuận nghịch.** Bennett và Fredkin chỉ ra rằng tính toán *về nguyên tắc* không tốn năng lượng — chỉ có việc **xoá** thông tin mới tốn.
- **Nguyên lý Landauer.** Xoá một bit tiêu tán ít nhất $k_B T \ln 2$ năng lượng. Xem [[Entropy and the Second Law]] mục 3 — đây cũng là lời giải cho con quỷ Maxwell.
- Feynman giảng đầy đủ về những chủ đề này ở Caltech; các bài giảng đó thành cuốn *Feynman Lectures on Computation* (xuất bản 2000, sau khi ông mất).

Trong cuốn đó ông đưa một nhận định về bản chất ngành, trích trong seed:

> "Computer science also differs from physics in that it is not actually a science. **It does not study natural objects.** Neither is it, as you might think, mathematics; although it does use mathematical reasoning pretty extensively. Rather, computer science is like **engineering** — it is all about getting something to do something, rather than just dealing with abstractions."

## 5. Cạm bẫy

> [!warning] Feynman không "phát minh" máy tính lượng tử
> Ông nêu **động cơ** thuyết phục nhất và đặt bài toán đúng. Deutsch (1985) xây mô hình hình thức đầu tiên; Shor (1994) đưa thuật toán khiến ngành bùng nổ. Seed dùng từ "conceive the possibility" — chính xác hơn "phát minh".

- **Tưởng máy tính lượng tử nhanh hơn ở mọi việc.** Chỉ ở một lớp bài toán cụ thể. Với phần lớn tác vụ hàng ngày, không có lợi thế.
- **Bỏ qua rằng ứng dụng gốc là mô phỏng.** Truyền thông tập trung vào việc phá mã hoá; ứng dụng Feynman nêu — mô phỏng hoá học và vật liệu — thực tế hơn nhiều.
- **Nhầm "tính toán không tốn năng lượng" với máy vĩnh cửu.** Chỉ tính toán **thuận nghịch** mới vậy, và xoá thông tin vẫn tốn.
- **Coi công việc ở Los Alamos là chuyện vặt.** Đó là nơi ông học cách nghĩ về tính toán như hệ thống — nền cho mọi thứ sau này.

## 6. Checklist áp dụng

- [ ] Tôi tái dựng được lập luận bốn bước cho máy tính lượng tử?
- [ ] Tôi giải thích được vì sao mô phỏng lượng tử tốn $2^n$ tài nguyên?
- [ ] Tôi biết nguyên lý Landauer phát biểu gì và liên hệ với entropy thế nào?
- [ ] Tôi phân biệt được đóng góp của Feynman, Deutsch và Shor?
- [ ] Tôi đồng ý hay không với nhận định "khoa học máy tính không phải khoa học" — và vì sao?

## Tham khảo

- Feynman, "Simulating Physics with Computers", *Int. J. Theor. Phys.* 21 (1982) 467 — **bài gốc về máy tính lượng tử**
- Feynman, *Feynman Lectures on Computation*, ed. Hey & Allen (Perseus, 2000). ISBN 0-7382-0296-7
- Feynman, "Quantum Mechanical Computers", *Foundations of Physics* 16 (1986)
- Landauer, "Irreversibility and Heat Generation in the Computing Process", *IBM J. Res. Dev.* 5 (1961)
- Deutsch, "Quantum theory, the Church-Turing principle and the universal quantum computer", *Proc. Roy. Soc. A* 400 (1985)
- Hillis, "Richard Feynman and The Connection Machine", *Physics Today* 42 (1989) — hồi ký của người cùng làm

## Liên kết

[[Plenty of Room at the Bottom]] · [[Entropy and the Second Law]] · [[Probability and Uncertainty]] · [[Feynman and the Manhattan Project]] · [[Feynman Biography]] · [[Physics]]
