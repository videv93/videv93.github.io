---
tags: [ml, lịch-sử, reinforcement-learning, deepmind]
status: evergreen
---
# AlphaGo

> Cờ vây từng được coi là **chén thánh của AI**: quá nhiều thế cờ để duyệt, quá tinh tế để lập trình bằng luật. AlphaGo giải nó bằng cách kết hợp ba thứ đã có sẵn — mạng neuron, tìm kiếm cây, và tự chơi — theo một cách chưa ai làm.

## 1. Vì sao cờ vây khó

| | Cờ vua | **Cờ vây** |
|---|---|---|
| Kích thước bàn | 8×8 | **19×19** |
| Số nước đi mỗi lượt | ~35 | **~250** |
| Độ dài ván | ~80 nước | ~150 nước |
| Số thế cờ hợp lệ | $\sim10^{47}$ | $\sim10^{170}$ |
| Hàm đánh giá thủ công | Khả thi (đếm quân, vị trí) | **Cực khó** — "thế" và "hình" khó lượng hoá |

Deep Blue thắng Kasparov năm 1997 chủ yếu bằng **sức mạnh duyệt** cộng hàm đánh giá do chuyên gia viết. Cách đó không mở rộng được sang cờ vây: cây quá rộng, và không ai viết nổi hàm đánh giá tốt.

## 2. Kiến trúc

Ba thành phần, mỗi thành phần giải một phần của vấn đề:

| Thành phần | Trả lời câu hỏi | Giải quyết |
|---|---|---|
| **Policy network** | "Những nước nào đáng xem xét?" | **Bề rộng** cây tìm kiếm |
| **Value network** | "Thế cờ này ai đang thắng?" | **Chiều sâu** — không cần chơi hết ván |
| **MCTS** | Kết hợp hai mạng để chọn nước | Phân bổ ngân sách tìm kiếm |

**Monte Carlo Tree Search** chạy hàng nghìn ván "tưởng tượng" trước mỗi nước thật, ưu tiên các nhánh mà policy network cho là hứa hẹn và value network cho là có lợi.

> [!note] Mối nối với luận án tiến sĩ của Hassabis
> "Mô phỏng các kịch bản để lập kế hoạch tốt hơn" chính là khái niệm **cỗ máy mô phỏng của tâm trí** mà [[Demis Hassabis]] đề xuất trong nghiên cứu khoa học thần kinh của mình. MCTS là hiện thân kỹ thuật của ý tưởng đó — không phải ẩn dụ, mà là cùng một cấu trúc.

### Quy trình huấn luyện AlphaGo (2016)

1. **Supervised learning** — policy network học bắt chước nước đi của kỳ thủ mạnh từ dữ liệu ván cờ người
2. **Reinforcement learning** — policy tự chơi với các phiên bản trước của chính nó, cải thiện bằng policy gradient
3. **Value network** — huấn luyện trên dữ liệu sinh từ các ván tự chơi

### AlphaGo Zero và AlphaZero — bước nhảy thật sự

| | AlphaGo (2016) | **AlphaGo Zero (2017)** | AlphaZero |
|---|---|---|---|
| Dữ liệu người | **Có** — khởi động từ ván cờ người | **Không** — chỉ luật chơi | Không |
| Mạng | Policy + value tách rời | **Một mạng chung** | Một mạng |
| Đặc trưng thủ công | Có | Không — chỉ bàn cờ thô | Không |
| Kết quả | Thắng Lee Sedol 4–1 | **Thắng AlphaGo 100–0** | Cờ vây + cờ vua + shogi |

Bài học lớn nhất **không phải** "AI thắng người". Nó là: **loại bỏ dữ liệu người khiến hệ thống mạnh hơn**. Dữ liệu người là một trần, không phải một sàn. Xem [[DeepMind]] về mô hình nghiên cứu này.

## 3. Các trận đấu

| Năm | Đối thủ | Kết quả |
|---|---|---|
| 10/2015 | **Fan Hui** (vô địch châu Âu) | 5–0 |
| 3/2016 | **Lee Sedol** (cựu vô địch thế giới) | **4–1** |
| 2017 | **Ke Jie** (số 1 thế giới) | 3–0 |

Trận Lee Sedol tại Seoul (giải thưởng 1 triệu USD) được ghi lại trong phim tài liệu *AlphaGo* (2017), đoạt Grand Prix Cannes Lion 2016.

AlphaGo được phong **9 dan danh dự** bởi Hiệp hội Baduk Hàn Quốc (2016), Hiệp hội Cờ vây Trung Quốc (2017), và Nihon Ki-in Nhật Bản (2024).

## 4. Vì sao nó không chuyển giao dễ dàng

Đây là phần quan trọng nhất khi rút bài học cho công việc thật:

| Điều kiện AlphaGo có | Bài toán thực tế của bạn |
|---|---|
| **Luật hoàn hảo, biết trước** | Không có mô hình chính xác của môi trường |
| **Mô phỏng miễn phí, vô hạn** | Mỗi lần thử nghiệm đều tốn tiền hoặc thời gian |
| **Reward rõ ràng, không nhập nhằng** | "Thành công" phải tự định nghĩa — xem [[ML Problem Framing]] |
| **Thông tin hoàn hảo, tất định** | Dữ liệu nhiễu, thiếu, và không đầy đủ |
| **Hai người chơi đối xứng** | Không có đối thủ để tự chơi cùng |
| Ngân sách tính toán khổng lồ | Một laptop hoặc vài GPU |

So sánh cụ thể: [[FADAML Case Study]] không thể dùng self-play vì **không tồn tại mô phỏng nào** của thị trường bất động sản Việt Nam. Nhãn phải do chuyên gia tạo ra thủ công. Đó là hoàn cảnh điển hình hơn nhiều so với cờ vây.

## 5. Checklist rút ra

- [ ] Tôi có mô hình chính xác của môi trường không (luật đầy đủ, tất định)?
- [ ] Mô phỏng có rẻ và nhanh không?
- [ ] Reward của tôi có rõ ràng và không nhập nhằng không?
- [ ] Có cơ chế self-play khả thi không (đối thủ đối xứng)?
- [ ] Tôi đang dùng dữ liệu người như một **sàn** hay đang bị nó làm **trần**?
- [ ] Nếu ba điều kiện đầu không thoả: RL có phải công cụ đúng không?

## Tham khảo

- Silver et al., "Mastering the game of Go with deep neural networks and tree search", *Nature* 529:484–489, 2016 — [doi:10.1038/nature16961](https://doi.org/10.1038/nature16961)
- Silver et al., "Mastering the game of Go without human knowledge" (AlphaGo Zero), *Nature* 550:354–359, 2017 — [doi:10.1038/nature24270](https://doi.org/10.1038/nature24270)
- Silver et al., "A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play" (AlphaZero), *Science* 362, 2018 — [doi:10.1126/science.aar6404](https://doi.org/10.1126/science.aar6404)
- *AlphaGo* (2017), phim tài liệu — [YouTube](https://www.youtube.com/watch?v=WXuK6gekU1Y)

## Liên kết

[[Deep Reinforcement Learning]] · [[DeepMind]] · [[Demis Hassabis]] · [[RL for LLM Reasoning]] · [[ML]]
