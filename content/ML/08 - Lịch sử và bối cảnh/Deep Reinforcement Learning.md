---
tags: [ml, reinforcement-learning, deep-learning]
status: growing
---
# Deep Reinforcement Learning

> Nhánh ML thứ ba, khác hẳn hai nhánh còn lại trong vault này: không có nhãn, chỉ có **phần thưởng trễ**. Agent phải tự khám phá xem hành động nào dẫn tới kết quả tốt — mà có thể phải chờ hàng trăm bước mới biết.

## 1. Khái niệm cốt lõi

### Khung bài toán

| Thành phần | Ký hiệu | Nghĩa |
|---|---|---|
| **Agent** | — | Thứ ra quyết định |
| **Environment** | — | Thế giới agent tương tác |
| **State** | $s_t$ | Tình trạng hiện tại |
| **Action** | $a_t$ | Hành động agent chọn |
| **Reward** | $r_t$ | Tín hiệu vô hướng từ môi trường |
| **Policy** | $\pi(a\mid s)$ | Chiến lược: trạng thái → hành động |
| **Value** | $V(s)$, $Q(s,a)$ | Kỳ vọng phần thưởng tương lai |
| **Discount** | $\gamma \in [0,1)$ | Phần thưởng xa được coi nhẹ hơn |

Mục tiêu: tìm $\pi$ cực đại hoá **tổng phần thưởng chiết khấu** $\mathbb{E}[\sum_t \gamma^t r_t]$.

### Khác biệt với supervised learning

| | Supervised | Reinforcement |
|---|---|---|
| Tín hiệu học | Nhãn đúng cho mỗi mẫu | **Phần thưởng vô hướng**, thường trễ |
| Dữ liệu | Cố định, i.i.d. | **Agent tự tạo ra** bằng hành động của mình |
| Sai lầm | Được sửa ngay | Có thể chỉ lộ ra sau 100 bước |
| Đánh đổi cốt lõi | Bias–variance | **Exploration vs exploitation** |
| Phân phối dữ liệu | Cố định | **Thay đổi khi policy thay đổi** |

Dòng cuối là lý do RL khó hơn nhiều: bạn đang huấn luyện trên một phân phối dữ liệu do chính mô hình đang học tạo ra. Giả định i.i.d. — nền tảng của gần như mọi thứ ở [[Model Validation]] — bị phá vỡ.

### DQN — bước ngoặt 2013/2015

[[DeepMind]] huấn luyện một mạng neuron chơi game Atari ở mức **siêu nhân, chỉ từ pixel thô** — không đặc trưng thủ công, cùng một kiến trúc cho mọi game.

$Q$-learning kinh điển lưu bảng $Q(s,a)$; với ảnh màn hình thì bảng đó vô hạn. DQN thay bảng bằng một mạng neuron. Hai thủ thuật khiến nó ổn định:

| Thủ thuật | Vấn đề nó giải |
|---|---|
| **Experience replay** | Lưu trải nghiệm vào buffer, lấy mẫu ngẫu nhiên → phá vỡ tương quan thời gian, khôi phục phần nào tính i.i.d. |
| **Target network** | Một bản sao mạng, cập nhật chậm, dùng để tính mục tiêu → tránh "đuổi theo cái đích di chuyển" |

Không có hai thủ thuật này, huấn luyện phân kỳ. Chúng là ví dụ điển hình của việc **kỹ thuật ổn định quan trọng ngang với ý tưởng thuật toán**.

### Ba họ thuật toán

| Họ | Học cái gì | Ví dụ | Phù hợp |
|---|---|---|---|
| **Value-based** | $Q(s,a)$, policy suy ra từ argmax | DQN, Double DQN, Rainbow | Hành động rời rạc |
| **Policy gradient** | Trực tiếp $\pi_\theta(a\mid s)$ | REINFORCE, PPO, TRPO | Hành động liên tục |
| **Actor–critic** | Cả hai | A3C, SAC, DDPG | Mặc định hiện đại |

**PPO** là thuật toán được dùng nhiều nhất trong thực tế — nó giới hạn mức thay đổi của policy mỗi bước, đổi một chút tối ưu lấy rất nhiều ổn định. Đây cũng là thuật toán nền của RLHF, xem [[RL for LLM Reasoning]].

## 2. Nguyên tắc / Best practices

1. **Chỉ dùng RL khi thật sự cần.** Nếu bạn có nhãn, dùng supervised learning — nó đơn giản hơn, ổn định hơn, rẻ hơn nhiều bậc độ lớn.
2. **RL cần mô phỏng.** Học bằng thử-sai trong thế giới thật quá đắt hoặc quá nguy hiểm. Không có mô phỏng chính xác thì RL thường không khả thi.
3. **Thiết kế reward cực kỳ cẩn thận.** Đây là phần khó nhất và tốn thời gian nhất, không phải phần thuật toán.
4. **Bắt đầu bằng PPO.** Ổn định, ít siêu tham số nhạy, cài đặt tốt có sẵn.
5. **Chạy nhiều seed và báo cáo khoảng.** RL nổi tiếng có variance cực cao — cùng code, cùng siêu tham số, khác seed có thể cho kết quả khác hẳn.
6. **Ghi lại đường cong reward, không chỉ giá trị cuối.** Hình dạng đường cong nói nhiều hơn con số.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Reward hacking.** Agent tìm cách tối đa hoá reward mà **không** làm điều bạn muốn. Ví dụ kinh điển: agent trong game đua thuyền học cách chạy vòng tròn nhặt item thay vì về đích, vì item cho điểm. Nếu reward đo sai thứ, agent sẽ khai thác chính xác chỗ sai đó.
- **Reward thưa (sparse reward).** Nếu chỉ có phần thưởng ở cuối một chuỗi 1000 bước, agent gần như không học được gì. Cần reward shaping, curriculum learning, hoặc học từ minh hoạ.
- **Variance khổng lồ giữa các seed.** Đây là vấn đề tái lập nổi tiếng của RL. Một bài báo báo cáo kết quả một seed thì gần như không có giá trị.
- **Cực kỳ tốn mẫu (sample inefficiency).** DQN cần hàng chục triệu khung hình cho một game Atari. Con người học trong vài phút.
- **Phân phối dữ liệu dịch chuyển trong lúc huấn luyện.** Policy thay đổi → dữ liệu thay đổi → mục tiêu thay đổi. Đây là nguồn của mọi bất ổn trong RL.
- **Khoảng cách sim-to-real.** Policy hoàn hảo trong mô phỏng thường thất bại trên robot thật. Cần domain randomization.
- **Áp RL vào bài toán không có tính tuần tự.** Nếu quyết định của bạn không ảnh hưởng tới trạng thái tiếp theo, đó là bài toán bandit hoặc supervised, không phải RL đầy đủ.

## 4. Checklist áp dụng

- [ ] Bài toán của tôi có thật sự tuần tự không (hành động ảnh hưởng trạng thái tương lai)?
- [ ] Tôi có nhãn không? Nếu có, tại sao không dùng supervised learning?
- [ ] Tôi có mô phỏng chính xác không? Chi phí một bước tương tác là bao nhiêu?
- [ ] Hàm reward của tôi đo **chính xác** thứ tôi muốn chứ? Tôi đã nghĩ cách agent có thể hack nó chưa?
- [ ] Reward có thưa không? Tôi có kế hoạch shaping không?
- [ ] Tôi đã chạy bao nhiêu seed? Khoảng kết quả rộng bao nhiêu?
- [ ] Tôi cần bao nhiêu mẫu tương tác? Ngân sách có đủ không?
- [ ] Nếu triển khai thật: khoảng cách sim-to-real được xử lý thế nào?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| **Gymnasium** | Chuẩn API môi trường RL (kế nhiệm OpenAI Gym) | [gymnasium.farama.org](https://gymnasium.farama.org/) |
| **Stable-Baselines3** | Cài đặt tin cậy của PPO, SAC, DQN, A2C | [stable-baselines3.readthedocs.io](https://stable-baselines3.readthedocs.io/) |
| CleanRL | Cài đặt một-file, dễ đọc, tốt để học | [github.com/vwxyzjn/cleanrl](https://github.com/vwxyzjn/cleanrl) |
| Ray RLlib | RL phân tán, quy mô lớn | [docs.ray.io](https://docs.ray.io/en/latest/rllib/index.html) |

## Tham khảo

- **Sutton & Barto**, *Reinforcement Learning: An Introduction* (2nd ed.) — sách chuẩn ngành, miễn phí — [incompleteideas.net/book](http://incompleteideas.net/book/the-book-2nd.html)
- Mnih et al., "Human-level control through deep reinforcement learning" (DQN), *Nature* 518, 2015 — [doi:10.1038/nature14236](https://doi.org/10.1038/nature14236)
- Schulman et al., "Proximal Policy Optimization Algorithms" — [arXiv:1707.06347](https://arxiv.org/abs/1707.06347)
- Henderson et al., "Deep Reinforcement Learning that Matters", AAAI 2018 — về khủng hoảng tái lập trong RL — [arXiv:1709.06560](https://arxiv.org/abs/1709.06560)

## Liên kết

[[AlphaGo]] · [[DeepMind]] · [[RL for LLM Reasoning]] · [[Gradient Descent Variants]] · [[ML]]
