---
tags: [ml, reinforcement-learning, llm, reasoning]
status: growing
---
# RL for LLM Reasoning

> [!note] Ghi chú nguồn
> Trong seed gốc, file `Xiangqi-R1 Enhancing Spatial Strategic Reasoning in LLMs for Chinese Chess via Reinforcement Learning.md` chỉ có **frontmatter và một dòng tiêu đề** — một **header rỗng**. Note này trả lời lời hứa đó: RL được dùng thế nào để cải thiện khả năng suy luận của mô hình ngôn ngữ, và vì sao cờ tướng lại là môi trường kiểm thử đáng chú ý.

> Vòng lặp lịch sử khép lại: [[AlphaGo]] dùng RL để chơi cờ giỏi hơn người. Mười năm sau, RL được dùng để dạy **mô hình ngôn ngữ** suy luận — và một trong những môi trường kiểm thử lại là **cờ tướng**.

## 1. Ba làn sóng RL cho LLM

| Làn sóng | Tín hiệu reward | Mục tiêu | Ví dụ |
|---|---|---|---|
| **RLHF** | Mô hình phần thưởng học từ **sở thích con người** | Hữu ích, vô hại, đúng phong cách | InstructGPT, ChatGPT, Claude |
| **RLAIF / Constitutional AI** | Phản hồi do **AI** sinh theo một bộ nguyên tắc | Mở rộng quy mô, giảm phụ thuộc người gán nhãn | Constitutional AI |
| **RLVR** — verifiable rewards | **Kiểm chứng tự động**: test chạy đúng, đáp án khớp | **Suy luận** đúng, không chỉ nghe hay | DeepSeek-R1, các reasoning model |

Làn sóng thứ ba là bước ngoặt gần đây, và nó đưa lĩnh vực quay lại rất gần với AlphaGo: **reward khách quan, kiểm chứng được, không cần con người phán xử từng bước**.

### RLHF — quy trình ba giai đoạn

1. **SFT** — fine-tune có giám sát trên dữ liệu minh hoạ chất lượng cao
2. **Reward model** — huấn luyện một mô hình dự đoán con người ưa câu trả lời nào hơn, từ dữ liệu so sánh cặp
3. **RL** — tối ưu policy (chính là LLM) theo reward model, thường bằng **PPO**, kèm phạt KL để không trôi quá xa mô hình SFT

Số hạng phạt KL là chi tiết kỹ thuật quan trọng: không có nó, mô hình sẽ **hack reward model** — tạo ra văn bản đạt điểm cao mà vô nghĩa với người đọc. Xem cạm bẫy reward hacking ở [[Deep Reinforcement Learning]].

### GRPO — thay thế PPO

**Group Relative Policy Optimization**: thay vì huấn luyện một value network riêng (như PPO), sinh **nhiều đáp án** cho cùng một câu hỏi và dùng **điểm trung bình của nhóm** làm baseline.

| | PPO | **GRPO** |
|---|---|---|
| Cần value network | Có | **Không** |
| Bộ nhớ | Cao hơn | Thấp hơn |
| Baseline để tính advantage | Value network dự đoán | **Trung bình của nhóm đáp án** |

Đơn giản hơn, rẻ hơn, và hoạt động tốt khi bạn có thể sinh nhiều đáp án song song — đúng tình huống của LLM.

## 2. Xiangqi-R1 — vì sao cờ tướng

Bài báo *"Xiangqi-R1: Enhancing Spatial Strategic Reasoning in LLMs for Chinese Chess via Reinforcement Learning"* (Chen, Liu, Lyu, Zhang, Shi, Xu — [arXiv:2507.12215](https://arxiv.org/abs/2507.12215)) dùng cờ tướng làm môi trường kiểm tra **suy luận không gian và chiến lược** của LLM.

Cờ tướng là lựa chọn có lý cho việc **đánh giá** LLM, vì lý do khác hẳn với lý do cờ vây được chọn cho AlphaGo:

| Đặc điểm | Vì sao hữu ích để kiểm tra LLM |
|---|---|
| **Suy luận không gian** | Bàn cờ 2D với "sông" và "cung" — LLM vốn yếu ở biểu diễn không gian |
| **Luật bất đối xứng theo vùng** | Tướng bị giới hạn trong cung; Tốt đổi cách đi sau khi qua sông |
| **Ít dữ liệu trong corpus tiếng Anh** | Khó "học thuộc" từ dữ liệu pre-train, so với cờ vua |
| **Kiểm chứng tự động được** | Nước đi hợp lệ hay không: có engine phán xử → **reward kiểm chứng được** |
| **Cần lý giải nhiều bước** | Không thể trả lời đúng bằng nhận dạng mẫu bề mặt |

> [!note] Khác biệt cốt lõi so với AlphaGo
> AlphaGo được huấn luyện để **chơi giỏi**. Xiangqi-R1 nhằm cải thiện **năng lực suy luận của một mô hình ngôn ngữ đa dụng**, dùng cờ tướng như một bài kiểm tra. Trò chơi ở đây là **thang đo**, không phải mục tiêu. Nếu chỉ cần chơi cờ tướng giỏi, một engine chuyên dụng sẽ thắng dễ dàng và rẻ hơn nhiều.

## 3. Cạm bẫy

- **Reward hacking, phiên bản LLM.** Mô hình học viết dài dòng, tự tin, có cấu trúc đẹp — vì reward model thích thế — mà không chính xác hơn. Đây là lý do phải có phạt KL và đánh giá độc lập.
- **Reward model kế thừa thiên kiến của người gán nhãn.** Cùng vấn đề đã nêu ở [[ML Problem Framing]]: mô hình học **định nghĩa** về "tốt", không học "tốt".
- **Nhầm suy luận thật với bắt chước lối viết suy luận.** Một mô hình có thể sinh ra chuỗi "hãy suy nghĩ từng bước" trông thuyết phục mà kết luận sai. Đây chính là lý do RLVR — với reward kiểm chứng được — quan trọng hơn nó thoạt nghe.
- **Nhiễm bẩn benchmark.** Nếu môi trường kiểm thử xuất hiện trong dữ liệu pre-train, điểm số vô nghĩa. Đây là một phần lý do cờ tướng đáng chú ý hơn cờ vua cho mục đích này.
- **Variance khổng lồ và chi phí cao.** Mọi vấn đề của [[Deep Reinforcement Learning]] vẫn còn nguyên, cộng thêm chi phí chạy một LLM ở mỗi bước.
- **RLVR chỉ dùng được ở miền kiểm chứng được.** Toán, code, cờ — có. Viết luận, tư vấn, sáng tạo — không có ground truth tự động.

## 4. Checklist áp dụng

- [ ] Reward của tôi là do người phán xử, AI phán xử, hay **kiểm chứng tự động**?
- [ ] Nếu dùng reward model: tôi có phạt KL để chống trôi không?
- [ ] Tôi đánh giá bằng benchmark độc lập với dữ liệu huấn luyện chứ?
- [ ] Benchmark của tôi có khả năng đã nằm trong dữ liệu pre-train không?
- [ ] Tôi phân biệt được "suy luận đúng" với "văn phong suy luận" bằng cách nào?
- [ ] Miền của tôi có kiểm chứng tự động được không? Nếu không, RLVR không áp dụng được.
- [ ] Chi phí tính toán cho mỗi bước RL là bao nhiêu? Ngân sách có đủ không?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| **TRL** (HuggingFace) | SFT, reward modeling, PPO, GRPO cho LLM | [huggingface.co/docs/trl](https://huggingface.co/docs/trl) |
| **veRL** | Framework RL cho LLM quy mô lớn | [github.com/volcengine/verl](https://github.com/volcengine/verl) |
| OpenRLHF | Cài đặt RLHF mã nguồn mở, dễ mở rộng | [github.com/OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) |
| `lm-evaluation-harness` | Đánh giá LLM trên benchmark chuẩn | [github.com/EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) |

## Tham khảo

- Chen et al., "Xiangqi-R1: Enhancing Spatial Strategic Reasoning in LLMs for Chinese Chess via Reinforcement Learning" — [arXiv:2507.12215](https://arxiv.org/abs/2507.12215) *(nguồn seed gốc)*
- Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT/RLHF), NeurIPS 2022 — [arXiv:2203.02155](https://arxiv.org/abs/2203.02155)
- DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" — [arXiv:2501.12948](https://arxiv.org/abs/2501.12948)
- Christiano et al., "Deep Reinforcement Learning from Human Preferences", NeurIPS 2017 — [arXiv:1706.03741](https://arxiv.org/abs/1706.03741)

## Liên kết

[[Deep Reinforcement Learning]] · [[AlphaGo]] · [[ML Problem Framing]] · [[DeepMind]] · [[ML]]
