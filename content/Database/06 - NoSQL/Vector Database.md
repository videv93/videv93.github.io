---
tags: [database, nosql, ai]
status: growing
---
# Vector Database

> Lưu **embedding** (vector nhiều chiều) và tìm các vector *gần nhất* theo ngữ nghĩa. Nền tảng của semantic search, RAG, hệ gợi ý, và khử trùng lặp. Điểm khác biệt cốt lõi: kết quả là **xấp xỉ**, và đó là chủ đích.

## 1. Khái niệm nền
- **Embedding**: mô hình biến text/ảnh/audio thành vector (768, 1024, 1536, 3072 chiều). Ý nghĩa gần nhau ⇒ vector gần nhau.
- **Độ đo khoảng cách**: cosine (phổ biến nhất cho text), inner product, L2. **Phải khớp với cách mô hình được huấn luyện** — chọn sai là kết quả sai một cách âm thầm.
- **ANN** (Approximate Nearest Neighbour): tìm chính xác trong không gian nhiều chiều là quá đắt ⇒ đánh đổi một chút **recall** lấy tốc độ hàng trăm lần.

## 2. Các loại index ANN
| Index | Cơ chế | Build | Query | RAM | Ghi chú |
|---|---|---|---|---|---|
| **HNSW** | Đồ thị nhiều tầng | Chậm | **Rất nhanh** | Cao | Mặc định tốt nhất hiện nay |
| **IVFFlat** | Chia cụm, chỉ quét vài cụm | Nhanh | Trung bình | Thấp | Cần dữ liệu **trước** khi build; phải tune `lists`/`probes` |
| **IVF-PQ** | IVF + nén lượng tử | Trung bình | Nhanh | **Rất thấp** | Mất độ chính xác, hợp tập cực lớn |
| **Flat (brute force)** | Quét hết | 0 | Chậm | Thấp | ✅ Đúng 100% — dùng cho <10k vector |

## 3. pgvector — bắt đầu từ đây
```sql
CREATE EXTENSION vector;

ALTER TABLE document ADD COLUMN embedding vector(1536);

CREATE INDEX ON document USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

SET hnsw.ef_search = 100;   -- ↑ recall, ↓ tốc độ

-- ✅ Hybrid: lọc metadata + tìm ngữ nghĩa trong MỘT query
SELECT id, title, 1 - (embedding <=> $1) AS similarity
FROM document
WHERE tenant_id = 7 AND published_at > now() - interval '1 year'
ORDER BY embedding <=> $1        -- <=> cosine, <-> L2, <#> inner product
LIMIT 10;
```
> Ưu thế lớn nhất của pgvector: vector **nằm cùng chỗ** với dữ liệu quan hệ ⇒ lọc theo quyền, tenant, thời gian trong cùng một transaction. Với hệ chuyên dụng, bạn phải đồng bộ metadata sang đó.

| Chọn pgvector khi | Chọn Qdrant/Milvus/Weaviate khi |
|---|---|
| Đã có Postgres; < ~10 triệu vector | Hàng trăm triệu vector trở lên |
| Cần lọc metadata phức tạp + transaction | Cần tính năng chuyên biệt (multi-vector, sparse+dense) |
| Muốn ít hệ thống để vận hành | Đội ngũ ML đã dùng nó |

## 4. Chất lượng kết quả — nơi mọi người bỏ cuộc quá sớm
1. **Chunking** quan trọng hơn cả việc chọn database. Chunk quá lớn ⇒ nhiễu; quá nhỏ ⇒ mất ngữ cảnh. Bắt đầu ~200–500 token, có overlap.
2. **Hybrid search**: kết hợp vector với full-text (BM25) rồi hợp nhất bằng **Reciprocal Rank Fusion**. Gần như luôn tốt hơn chỉ dùng một trong hai — đặc biệt với tên riêng, mã sản phẩm, từ khoá hiếm.
3. **Reranking**: lấy top-50 bằng ANN rồi xếp lại bằng cross-encoder ⇒ cải thiện rõ rệt.
4. **Đo bằng số**: recall@k, MRR, nDCG trên một bộ câu hỏi vàng. Không có bộ đánh giá thì mọi thay đổi chỉ là cảm tính.

## 5. Cạm bẫy hay gặp
1. **Trộn embedding từ hai model khác nhau** trong cùng một index ⇒ kết quả vô nghĩa. Lưu `model_name` + `model_version` cùng vector.
2. **Đổi model mà không re-embed toàn bộ.** Cần kế hoạch backfill và chạy song song hai cột.
3. **Dùng sai độ đo khoảng cách** so với model.
4. **Không normalize vector** khi dùng inner product.
5. **Lọc metadata sau ANN (post-filter)** ⇒ lọc xong còn 2 kết quả trong khi cần 10. pgvector/Qdrant hỗ trợ pre-filter — dùng nó.
6. **Kỳ vọng recall 100%** — ANN là xấp xỉ theo định nghĩa. Đo recall thật và chấp nhận có ý thức.
7. **Index HNSW rất tốn RAM** — ước lượng trước: xấp xỉ `số_vector × chiều × 4 byte × ~1.5`.
8. **Quên rằng embedding là dữ liệu dẫn xuất** — phải re-generate được từ nguồn; đừng để nó thành thứ duy nhất còn lại.
9. **Rò rỉ dữ liệu qua similarity search** — vector vẫn phải chịu kiểm soát quyền truy cập như mọi dữ liệu khác. → [[Database Security]]

## 6. Checklist áp dụng
- [ ] Số vector hiện tại và sau 1 năm là bao nhiêu?
- [ ] Model embedding nào, bao nhiêu chiều, độ đo nào? Đã lưu cùng vector chưa?
- [ ] Có kế hoạch re-embed khi đổi model chưa?
- [ ] Lọc metadata là pre-filter hay post-filter?
- [ ] Đã thử hybrid search (vector + BM25) chưa?
- [ ] Có bộ câu hỏi vàng để đo recall@k không?
- [ ] Chiến lược chunking đã thử nghiệm hay chỉ chọn theo mặc định?
- [ ] RAM cần cho index đã ước lượng chưa?
- [ ] pgvector có đủ dùng không, trước khi thêm một hệ mới?

## Công cụ
| Tên | Đặc điểm | Link |
|---|---|---|
| pgvector | Vector trong PostgreSQL | https://github.com/pgvector/pgvector |
| Qdrant | Chuyên dụng, Rust, filter mạnh | https://qdrant.tech/documentation/ |
| Milvus | Quy mô rất lớn | https://milvus.io/docs |
| Weaviate | Tích hợp sẵn module vector hoá | https://weaviate.io/developers/weaviate |
| FAISS | Thư viện ANN (không phải DB) | https://github.com/facebookresearch/faiss |

## Tham khảo
- pgvector README — index & tuning: https://github.com/pgvector/pgvector
- Malkov & Yashunin — *HNSW* paper: https://arxiv.org/abs/1603.09320
- Qdrant — *Hybrid search & filtering*: https://qdrant.tech/articles/hybrid-search/
- Anthropic — *Contextual Retrieval*: https://www.anthropic.com/news/contextual-retrieval
- Pinecone — *Vector indexes explained*: https://www.pinecone.io/learn/series/faiss/vector-indexes/

## Liên kết
[[Database Paradigms]] · [[PostgreSQL]] · [[Index Fundamentals]] · [[Database Selection Guide]] · [[Database]]
