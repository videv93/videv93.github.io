---
tags: [ml, ứng-dụng, nlp, tiếng-việt]
status: evergreen
---
# Vietnamese NLP

> Tiếng Việt là ngôn ngữ **low-resource** trong NLP: corpus nhỏ hơn, cấu trúc từ khác tiếng Anh, và mô hình pre-trained thường được huấn luyện trên Wikipedia — rất xa với văn phong của tin rao bất động sản hay bình luận mạng xã hội.

## 1. Khái niệm cốt lõi

### Ba khó khăn đặc thù

| Khó khăn | Chi tiết |
|---|---|
| **Corpus nhỏ** | Ít dữ liệu hơn tiếng Anh hàng bậc độ lớn |
| **Cấu trúc từ khác biệt** | Tiếng Việt là ngôn ngữ **đơn lập**: từ đa âm tiết được viết cách nhau bằng dấu cách |
| **Lệch miền** | Mô hình pre-trained trên Wikipedia; ứng dụng thật là tin rao, chat, review |

### Tách từ (word segmentation) — bước đầu tiên và quan trọng nhất

Trong tiếng Anh, dấu cách phân tách **từ**. Trong tiếng Việt, dấu cách phân tách **âm tiết**:

| Chuỗi | Tách theo dấu cách | Tách từ đúng |
|---|---|---|
| `mặt tiền` | `mặt` / `tiền` | `mặt_tiền` (một từ: "mặt đường") |
| `bất động sản` | `bất` / `động` / `sản` | `bất_động_sản` (một từ) |
| `hồ chí minh` | 3 token | `hồ_chí_minh` (một tên riêng) |

Tách sai làm hỏng mọi thứ phía sau: `mặt` và `tiền` riêng lẻ có nghĩa hoàn toàn khác (`tiền` = money). Đây là lý do PhoBERT yêu cầu văn bản **đã được tách từ** bằng VnCoreNLP trước khi đưa vào.

### PhoBERT

Mô hình ngôn ngữ pre-trained tiếng Việt dựa trên kiến trúc RoBERTa, có hai biến thể `base` và `large` tương ứng với `BERT-base` và `BERT-large`. Đạt kết quả tốt nhất trên POS tagging, NER, và dependency parsing tiếng Việt.

[[FADAML Case Study]] dùng **PhoBERT-base** làm bộ sinh embedding cho module NER — không dùng nó trực tiếp để phân loại. Đây là cách dùng đáng chú ý: PhoBERT là **thành phần trích đặc trưng** trong một pipeline lớn hơn, không phải mô hình cuối.

### NER cho dữ liệu bất động sản

Kiến trúc trong FADAML: embedding từ PhoBERT → `MishWindowEncoder` → classifier → thực thể.

Bốn thực thể được trích: **price**, **area**, **road**, **district**. Dữ liệu huấn luyện được gán nhãn thủ công bằng **Doccano** trên một tập bất động sản riêng.

### Đặc thù của văn bản tin rao — vì sao nó khó

Từ chính bài báo, hai loại khó khăn được ghi lại cụ thể:

**Viết tắt dày đặc.** Một tin rao thật chứa: `hxh` (hẻm xe hơi — hẻm rộng trên 5m), `q5` (quận 5), `3pn` (3 phòng ngủ), `dt` (diện tích), `dtkv` (diện tích khu vực), `cn` (công nhận), `mt` (mặt tiền), `bđs` (bất động sản), `lh` (liên hệ). Không mô hình pre-trained nào trên Wikipedia biết những từ này.

**Thông tin dư thừa và thiếu.** Một tin rao có thể mô tả **hai bất động sản khác nhau** trong cùng một đoạn (một ở Nguyễn Trãi, một ở An Dương Vương) — hệ thống trích xuất phải phân định được. Ngược lại, có tin **thiếu** thông tin then chốt: không giá, không địa chỉ chính xác, chỉ nói "gần Hồng Bàng, Nguyễn Chí Thanh, Châu Văn Liêm…".

> [!note] `hxh` chứa hai đặc trưng cùng lúc
> Bài báo chỉ ra: từ viết tắt `hxh` suy ra được **cả** `house_type` (nhà hẻm) **lẫn** `road_width` (> 5m). Một từ viết tắt ba chữ cái mã hoá hai đặc trưng có giá trị dự đoán cao — và chỉ người trong ngành mới biết. Đây là lý do cụ thể vì sao [[Data and Feature Engineering]] cần chuyên gia miền, không chỉ cần mô hình lớn hơn.

## 2. Nguyên tắc / Best practices

1. **Tách từ trước, luôn luôn.** Với PhoBERT là bắt buộc (nó được pre-train trên văn bản đã tách). Dùng VnCoreNLP hoặc underthesea.
2. **Xây từ điển viết tắt cho miền của bạn.** Không có shortcut. Ngồi với chuyên gia và liệt kê ra.
3. **Chuẩn hoá Unicode.** Tiếng Việt có hai cách mã hoá dấu (tổ hợp và dựng sẵn — NFC vs NFD). `unicodedata.normalize('NFC', text)` phải là bước đầu tiên, nếu không `"hòa"` và `"hòa"` là hai chuỗi khác nhau.
4. **Cẩn thận với việc hạ chữ thường.** FADAML hạ chữ thường toàn bộ — điều này làm mất ranh giới tên riêng, một tín hiệu hữu ích cho NER. Đó là một đánh đổi có ý thức, không phải mặc định.
5. **Kiểm tra n-gram range.** Với tiếng Việt chưa tách từ, $(1,3)$ n-gram bắt được nhiều từ ghép — đây là lý do FADAML chọn range đó.
6. **Đừng mặc định mô hình đa ngôn ngữ đủ tốt.** mBERT/XLM-R thường thua PhoBERT trên tác vụ tiếng Việt vì dung lượng dành cho tiếng Việt trong chúng rất nhỏ.

## 3. Cạm bẫy / Sai lầm hay gặp

- **Đưa văn bản chưa tách từ vào PhoBERT.** Nó vẫn chạy và cho ra vector — chỉ là kết quả kém hơn đáng kể mà không có cảnh báo nào.
- **Chuẩn hoá Unicode không nhất quán giữa train và inference.** Cùng một từ trở thành hai token. Bug này rất khó tìm.
- **Bỏ dấu tiếng Việt để "đơn giản hoá".** `ma` có thể là `mà/má/mã/mạ/mả`. Bỏ dấu là vứt bỏ thông tin, không phải chuẩn hoá.
- **Coi mọi từ viết tắt là nhiễu và lọc bỏ.** Trong tin rao bất động sản, viết tắt **mang tín hiệu cao nhất**. `hxh` là ví dụ.
- **Dùng mô hình pre-trained trên Wikipedia cho văn bản chuyên ngành mà không kiểm chứng.** Bài báo nêu đây là khó khăn thứ ba của tiếng Việt low-resource: lệch miền giữa corpus pre-train và tác vụ downstream.
- **Đặc trưng n-gram trùng lặp nặng.** `mặt tiền` / `nhà mặt tiền` / `mt` cùng nói một điều. Với [[Naive Bayes Classifier]] giả định độc lập, đây là bằng chứng bị đếm ba lần.
- **Quên rằng một tin rao có thể chứa nhiều thực thể.** Trích xuất "giá" đầu tiên tìm thấy là sai khi tin rao mô tả hai bất động sản.

## 4. Checklist áp dụng

- [ ] Tôi đã chuẩn hoá Unicode về NFC chưa?
- [ ] Tôi đã tách từ chưa? Bằng công cụ nào?
- [ ] Nếu dùng PhoBERT: đầu vào đã tách từ chưa?
- [ ] Tôi có từ điển viết tắt cho miền của mình không?
- [ ] Tôi có hạ chữ thường không? Tôi có mất tín hiệu tên riêng không?
- [ ] Tôi có bỏ dấu không? (Đừng.)
- [ ] Corpus pre-train của mô hình có gần với dữ liệu của tôi không?
- [ ] Một mẫu văn bản có thể chứa nhiều thực thể cùng loại không? Pipeline xử lý thế nào?
- [ ] Tôi đã đọc 20 mẫu văn bản thật bằng mắt chưa?

## Công cụ

| Tên | Đặc điểm | Link |
|---|---|---|
| **VnCoreNLP** | Tách từ, POS, NER, dependency parsing; chuẩn cho tiền xử lý PhoBERT | [github.com/vncorenlp/VnCoreNLP](https://github.com/vncorenlp/VnCoreNLP) |
| **underthesea** | Toolkit thuần Python: tách từ, POS, NER, phân loại — dễ dùng nhất | [github.com/undertheseanlp/underthesea](https://github.com/undertheseanlp/underthesea) |
| **PhoBERT** | Mô hình pre-trained; có trên HuggingFace | [github.com/VinAIResearch/PhoBERT](https://github.com/VinAIResearch/PhoBERT) · [huggingface.co/vinai/phobert-base](https://huggingface.co/vinai/phobert-base) |
| **Doccano** | Công cụ gán nhãn NER mã nguồn mở; dùng trong FADAML | [github.com/doccano/doccano](https://github.com/doccano/doccano) |
| `unicodedata` | Chuẩn hoá NFC/NFD — có sẵn trong Python | [docs.python.org](https://docs.python.org/3/library/unicodedata.html) |

## Tham khảo

- Nguyen & Nguyen, "PhoBERT: Pre-trained language models for Vietnamese", *Findings of EMNLP* 2020 — [aclanthology.org/2020.findings-emnlp.92](https://aclanthology.org/2020.findings-emnlp.92/)
- Vu et al., "VnCoreNLP: A Vietnamese Natural Language Processing Toolkit", NAACL 2018 (demo) — [github.com/vncorenlp/VnCoreNLP](https://github.com/vncorenlp/VnCoreNLP)
- Nguyen, Nguyen & Nguyen, "Fake Advertisements Detection Using Automated Multimodal Learning", §2.2, §3 & §4.2.1 — [arXiv:2501.10848](https://arxiv.org/abs/2501.10848)
- VinAI Research, danh mục mô hình tiếng Việt — [github.com/VinAIResearch](https://github.com/VinAIResearch)

## Liên kết

[[FADAML Case Study]] · [[Data and Feature Engineering]] · [[Naive Bayes Classifier]] · [[Multimodal Machine Learning]] · [[ML]]
