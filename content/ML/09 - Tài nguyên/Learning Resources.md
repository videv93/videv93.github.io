---
tags: [ml, tài-nguyên, catalogue]
status: evergreen
---
# Learning Resources

> Catalogue nguồn học cho toàn bộ vault. Đây là note **danh mục** — nó không có Checklist hay mục Tham khảo riêng, vì bản thân nó đã là phần tham khảo.

## Sách nền tảng

| Sách                                                                    | Dùng cho                                                                    | Miễn phí | Link                                                                                                             |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| **Machine Learning cơ bản** — Vũ Hữu Tiệp                               | **Xương sống của vault này.** 422 trang, 29 chương, tiếng Việt, có mã nguồn | ✅        | [github](https://github.com/tiepvupsu/ebookMLCB) · [blog](https://machinelearningcoban.com)                      |
| **Pattern Recognition and Machine Learning** — Bishop                   | Nền xác suất, mô hình đồ thị. Chuẩn ngành                                   | ✅        | [Microsoft Research](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/) |
| **The Elements of Statistical Learning** — Hastie, Tibshirani, Friedman | Thống kê, tree ensemble, model selection                                    | ✅        | [hastie.su.domains](https://hastie.su.domains/ElemStatLearn/)                                                    |
| An Introduction to Statistical Learning                                 | Phiên bản dễ hơn của ESL, có code R và Python                               | ✅        | [statlearning.com](https://www.statlearning.com/)                                                                |
| **Deep Learning** — Goodfellow, Bengio, Courville                       | Mạng neuron, tối ưu, lý thuyết                                              | ✅        | [deeplearningbook.org](https://www.deeplearningbook.org)                                                         |
| **Mathematics for Machine Learning**                                    | Toàn bộ toán cần cho `00 - Nền tảng toán`                                   | ✅        | [mml-book.github.io](https://mml-book.github.io/)                                                                |
| **Convex Optimization** — Boyd & Vandenberghe                           | Phần `00` và `04`                                                           | ✅        | [stanford.edu/~boyd](https://web.stanford.edu/~boyd/cvxbook/)                                                    |
| **Reinforcement Learning: An Introduction** — Sutton & Barto            | Phần `08`                                                                   | ✅        | [incompleteideas.net](http://incompleteideas.net/book/the-book-2nd.html)                                         |
| **Mining of Massive Datasets**                                          | Hệ gợi ý, dữ liệu quy mô lớn                                                | ✅        | [mmds.org](http://www.mmds.org/)                                                                                 |
| Probabilistic Machine Learning — Murphy                                 | Sách hiện đại, bao quát rất rộng                                            | ✅        | [probml.github.io](https://probml.github.io/pml-book/)                                                           |
| **Interpretable Machine Learning** — Molnar                             | Đọc kèm [[Prediction vs Inference]]                                         | ✅        | [christophm.github.io](https://christophm.github.io/interpretable-ml-book/)                                      |
| Neural Networks and Deep Learning — Nielsen                             | Dẫn giải backprop rõ nhất từng viết                                         | ✅        | [neuralnetworksanddeeplearning.com](http://neuralnetworksanddeeplearning.com/)                                   |
| The Matrix Cookbook                                                     | Sổ tay tra gradient, để cạnh bàn                                            | ✅        | [PDF](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)                                                |

## Khoá học

| Khoá                                        | Nội dung                                               | Link                                                                               |
| ------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Machine Learning Specialization — Andrew Ng | Nhập môn, rất dễ tiếp cận                              | [Coursera](https://www.coursera.org/specializations/machine-learning-introduction) |
| Deep Learning Specialization — Andrew Ng    | Mạng neuron, CNN, RNN                                  | [Coursera](https://www.coursera.org/specializations/deep-learning)                 |
| **CS229** — Stanford                        | ML nền tảng, nặng toán                                 | [cs229.stanford.edu](https://cs229.stanford.edu/)                                  |
| **CS231n** — Stanford                       | CNN cho thị giác máy tính; ghi chú về backprop rất tốt | [cs231n.github.io](https://cs231n.github.io/)                                      |
| **CS224n** — Stanford                       | NLP với deep learning                                  | [web.stanford.edu/class/cs224n](https://web.stanford.edu/class/cs224n/)            |
| CS246 — Stanford                            | Khai phá dữ liệu quy mô lớn                            | [cs246.stanford.edu](https://web.stanford.edu/class/cs246/)                        |
| EE364A — Stanford                           | Tối ưu lồi, đi kèm sách Boyd                           | [stanford.edu/class/ee364a](https://web.stanford.edu/class/ee364a/)                |
| fast.ai                                     | Thực hành trước, lý thuyết sau                         | [course.fast.ai](https://course.fast.ai/)                                          |
| **fundaml.com**                             | Khoá numpy ngắn, miễn phí, đi kèm sách MLCB            | [fundaml.com](https://fundaml.com)                                                 |
| HuggingFace NLP Course                      | Transformer, fine-tuning, thực dụng                    | [huggingface.co/learn](https://huggingface.co/learn/nlp-course)                    |

## Tài liệu và tham chiếu

| Nguồn | Dùng cho |
|---|---|
| [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html) | **Vừa là tài liệu vừa là giáo trình.** Chất lượng hiếm có |
| [NumPy docs](https://numpy.org/doc/stable/) | Tra cứu hàm |
| [PyTorch docs](https://pytorch.org/docs/stable/index.html) | Deep learning |
| [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course) | Ôn nhanh khái niệm |
| [Distill.pub](https://distill.pub/) | Bài giải thích trực quan xuất sắc (đã ngừng xuất bản, kho vẫn còn) |

## Bài báo nền tảng

| Bài | Chủ đề | Link |
|---|---|---|
| Breiman, "Statistical Modeling: The Two Cultures" (2001) | Nền của [[Prediction vs Inference]] | [doi:10.1214/ss/1009213726](https://doi.org/10.1214/ss/1009213726) |
| Shmueli, "To Explain or to Predict?" (2010) | Cùng chủ đề, cụ thể hơn | [doi:10.1214/10-STS330](https://doi.org/10.1214/10-STS330) |
| Domingos, "A Few Useful Things to Know about ML" (2012) | Bài đọc bắt buộc, 9 trang | [PDF](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf) |
| Sculley et al., "Hidden Technical Debt in ML Systems" (2015) | Vì sao ML trong sản xuất khó | [PDF](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf) |
| Rumelhart, Hinton & Williams (1986) | Backpropagation, bài gốc | [doi:10.1038/323533a0](https://doi.org/10.1038/323533a0) |
| Cortes & Vapnik (1995) | SVM, bài gốc | [doi:10.1007/BF00994018](https://doi.org/10.1007/BF00994018) |
| Silver et al. (2016), (2017) | [[AlphaGo]], AlphaGo Zero | [nature16961](https://doi.org/10.1038/nature16961) · [nature24270](https://doi.org/10.1038/nature24270) |
| Jumper et al. (2021) | [[AlphaFold]] | [doi:10.1038/s41586-021-03819-2](https://doi.org/10.1038/s41586-021-03819-2) |
| Mnih et al. (2015) | DQN | [doi:10.1038/nature14236](https://doi.org/10.1038/nature14236) |
| Grinsztajn et al. (2022) | Vì sao cây thắng deep learning trên dữ liệu bảng | [arXiv:2207.08815](https://arxiv.org/abs/2207.08815) |

## Nguồn tiếng Việt

| Nguồn | Nội dung |
|---|---|
| [machinelearningcoban.com](https://machinelearningcoban.com) | Blog gốc của sách MLCB, hơn một triệu lượt xem |
| [Forum Machine Learning cơ bản](https://www.facebook.com/groups/machinelearningcoban) | Cộng đồng, hỏi đáp |
| [VinAI Research](https://github.com/VinAIResearch) | PhoBERT, BARTpho và các mô hình tiếng Việt khác |
| [underthesea](https://github.com/undertheseanlp/underthesea) | Toolkit NLP tiếng Việt, tài liệu tiếng Việt |
| [VnCoreNLP](https://github.com/vncorenlp/VnCoreNLP) | Tách từ, POS, NER, dependency parsing |

## Dữ liệu để thực hành

| Nguồn | Đặc điểm |
|---|---|
| [scikit-learn datasets](https://scikit-learn.org/stable/datasets.html) | Iris, digits, California housing — có sẵn, không cần tải |
| [MovieLens](https://grouplens.org/datasets/movielens/) | Chuẩn cho hệ gợi ý; 100k để học, 25M để thử quy mô |
| [UCI ML Repository](https://archive.ics.uci.edu/) | Kho dữ liệu cổ điển |
| [Kaggle Datasets](https://www.kaggle.com/datasets) | Đa dạng nhất, kèm notebook tham khảo |
| [HuggingFace Datasets](https://huggingface.co/datasets) | NLP và multimodal |
| [Papers with Code](https://paperswithcode.com/) | Paper + code + leaderboard |
| [AlphaFold DB](https://alphafold.ebi.ac.uk/) | 200 triệu cấu trúc protein, miễn phí |

## Đọc gì tiếp — theo hướng

| Hướng | Bắt đầu từ |
|---|---|
| Thị giác máy tính | CS231n → PyTorch vision tutorials |
| NLP / LLM | CS224n → HuggingFace course |
| Hệ gợi ý sản xuất | Mining of Massive Datasets Ch.9 → `implicit`, LightFM |
| Reinforcement learning | Sutton & Barto → Stable-Baselines3 |
| Suy luận nhân quả | Pearl, *The Book of Why* → Angrist & Pischke, *Mostly Harmless Econometrics* |
| MLOps | Sculley et al. → *Designing Machine Learning Systems* (Chip Huyen) |
| Kinh tế lượng không gian | [[Hedonic Pricing and GIS]] → PySAL, mgwr |

## Liên kết

[[Learning Roadmap]] · [[ML Toolchain]] · [[Prediction vs Inference]] · [[ML]]
