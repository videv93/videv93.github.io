---
tags: [ml, lịch-sử, tổ-chức, deepmind]
status: evergreen
---
# DeepMind

> Sứ mệnh tuyên bố: **"solve intelligence, and then use it to solve everything else"**. Điều đáng học không phải khẩu hiệu mà là **mô hình nghiên cứu** đứng sau nó — chọn những bài toán có thang đo rõ ràng và một cộng đồng độc lập sẵn sàng phán xử kết quả.

## 1. Bối cảnh

| | |
|---|---|
| Thành lập | London, 2010 |
| Đồng sáng lập | [[Demis Hassabis]], **Shane Legg**, **Mustafa Suleyman** |
| Tuyển sớm | **David Silver** — bạn đại học và cộng sự ở Elixir, sau này dẫn dắt AlphaGo |
| Mua lại | **Google, 2014, £400 triệu** |
| Sau mua lại | Phần lớn giữ độc lập tại London; DeepMind Health sáp nhập vào Google Health |

Hassabis gặp Legg khi cả hai làm sau tiến sĩ tại Gatsby Computational Neuroscience Unit, UCL; ông và Suleyman quen nhau qua gia đình.

**Cách tiếp cận tuyên bố:** kết hợp hiểu biết từ **khoa học thần kinh hệ thống** với tiến bộ trong machine learning và phần cứng tính toán, để mở khoá các thuật toán học **đa dụng** ngày càng mạnh, hướng tới **AGI**.

## 2. Các mốc chính

| Năm | Thành tựu |
|---|---|
| **2013** | **DQN** — học chơi game Atari ở mức siêu nhân **chỉ từ pixel thô**. Xem [[Deep Reinforcement Learning]] |
| 2014 | Neural Turing Machine — mạng neuron có bộ nhớ ngoài |
| 2015 | Giảm **40% năng lượng** hệ thống làm mát trung tâm dữ liệu Google |
| 2015 | [[AlphaGo]] thắng Fan Hui 5–0 |
| **2016** | AlphaGo thắng **Lee Sedol 4–1** |
| 2017 | AlphaGo thắng Ke Jie 3–0 |
| **2018** | [[AlphaFold]] thắng CASP13 |
| **2020** | AlphaFold 2 thắng CASP14 — bài toán gập protein được tuyên bố "về cơ bản đã giải" |
| 2021 | Công bố cấu trúc của **200 triệu protein** đã biết, miễn phí và mở |
| 2024 | Nobel Hoá học cho Hassabis và Jumper |

Ghi nhận học thuật: **chín** bài trang bìa *Nature* (2015, 2016, 2019, 2020, hai bài 2021, 2022, 2024, 2026) và một bài trang bìa *Science* (2017).

## 3. Mô hình nghiên cứu — điều đáng học nhất

DeepMind lặp đi lặp lại một công thức, và công thức đó có thể chuyển giao:

| Bước | Cách làm | Vì sao hiệu quả |
|---|---|---|
| **1. Chọn bài toán có thang đo khách quan** | Game có luật rõ, thắng/thua rõ. CASP có ground truth thực nghiệm | Không tranh cãi được về việc ai thắng |
| **2. Có đối thủ/chuẩn mực độc lập** | Vô địch thế giới; cuộc thi CASP tổ chức hai năm một lần | Kết quả được bên thứ ba phán xử |
| **3. Không cần dữ liệu người ở bước cuối** | AlphaZero học **hoàn toàn từ tự chơi** | Thoát khỏi trần hiệu năng của con người |
| **4. Đầu tư vào một bài toán khoa học thật** | Hassabis gọi AlphaFold là *"lighthouse project"* — khoản đầu tư lớn đầu tiên vào một vấn đề khoa học thực tế | Chứng minh phương pháp ra ngoài thế giới game |
| **5. Mở kết quả** | AlphaFold DB miễn phí cho toàn thế giới | Tối đa hoá tác động, tạo thiện chí |

> [!note] Bước 1 quan trọng hơn vẻ ngoài
> Trong hầu hết dự án ML, khó khăn lớn nhất là **định nghĩa thế nào là thành công** — xem [[ML Problem Framing]] và [[Evaluation Metrics]]. DeepMind né được toàn bộ khó khăn đó bằng cách chọn những miền mà thang đo **đã tồn tại và được cộng đồng chấp nhận**. Đó là một lựa chọn chiến lược, không phải may mắn.

## 4. Đóng góp kỹ thuật

DeepMind tiên phong lĩnh vực **deep reinforcement learning** — kết hợp deep learning và reinforcement learning, hai nhánh trước đó phát triển tách biệt. Xem [[Deep Reinforcement Learning]].

Các hướng khác: kiến trúc bộ nhớ ngoài (Neural Turing Machine, Differentiable Neural Computer), nghiên cứu an toàn AI, và ứng dụng vào khoa học vật liệu, dự báo thời tiết, toán học.

## 5. Cạm bẫy khi rút bài học từ DeepMind

- **Điều kiện của họ không phải điều kiện của bạn.** Ngân sách tính toán và nhân lực của DeepMind cao hơn dự án thông thường nhiều bậc độ lớn. "AlphaGo làm được X" không có nghĩa X khả thi với bạn.
- **Game có thang đo hoàn hảo; bài toán của bạn thì không.** Đây là khác biệt cốt lõi, và nó khiến phần lớn bài học không chuyển giao trực tiếp. Bài toán thực tế của bạn giống [[FADAML Case Study]] hơn — nơi ngay cả **định nghĩa nhãn** cũng phải tự tạo ra.
- **Thành công được công bố; thất bại thì không.** Bạn thấy AlphaGo và AlphaFold, không thấy các dự án bị huỷ. Đừng suy ra tỉ lệ thành công từ những gì được đăng.
- **Self-play chỉ hoạt động khi có mô phỏng chính xác.** Cờ vây có luật hoàn hảo. Thị trường bất động sản thì không — bạn không thể tự chơi với chính mình để học cách phát hiện tin rao giả.
- **"Solve intelligence" là tuyên bố sứ mệnh, không phải lộ trình kỹ thuật.** Đọc nó như định hướng tổ chức, đừng đọc như một dự báo.

## 6. Checklist rút ra

- [ ] Bài toán của tôi có thang đo khách quan mà mọi người đồng ý không?
- [ ] Có baseline hoặc chuẩn mực độc lập nào để so không?
- [ ] Tôi có mô phỏng chính xác của môi trường không? (Nếu không, self-play không dùng được.)
- [ ] Tôi đang so sánh dự án của mình với một tổ chức có nguồn lực gấp bao nhiêu lần?
- [ ] Bài học tôi rút ra có phụ thuộc vào điều kiện mà tôi không có không?

## Tham khảo

- Wikipedia, "Demis Hassabis" (mục DeepMind) — [en.wikipedia.org](https://en.wikipedia.org/wiki/Demis_Hassabis)
- Google DeepMind, trang chính thức — [deepmind.google](https://deepmind.google/)
- Mnih et al., "Human-level control through deep reinforcement learning", *Nature* 518, 2015 — [doi:10.1038/nature14236](https://doi.org/10.1038/nature14236)
- AlphaFold Protein Structure Database (DeepMind × EMBL-EBI) — [alphafold.ebi.ac.uk](https://alphafold.ebi.ac.uk/)

## Liên kết

[[Demis Hassabis]] · [[AlphaGo]] · [[AlphaFold]] · [[Deep Reinforcement Learning]] · [[ML Problem Framing]] · [[ML]]
