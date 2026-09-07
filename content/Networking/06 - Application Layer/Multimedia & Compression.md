---
tags: [networking, application, media]
status: seed
---
# Multimedia & Compression

> Video chiếm phần lớn lưu lượng Internet. Nén là **đánh đổi ba chiều: chất lượng ↔ bitrate ↔ độ trễ/CPU** — không có lựa chọn nào tối ưu cả ba.

## 1. Phân loại nén

| | **Lossless** | **Lossy** |
|---|---|---|
| Nguyên lý | Khử dư thừa thống kê (Huffman, LZ77, arithmetic) | Bỏ thông tin mà giác quan ít nhận ra |
| Tỷ lệ | 2–5× | 10–1000× |
| Ví dụ | gzip, Brotli, zstd, PNG, FLAC | JPEG, AVIF, MP3, Opus, H.264/265, AV1 |
| Dùng cho | Text, code, dữ liệu | Ảnh, âm thanh, video |

**Nén text trên web**: `br` (Brotli) tốt hơn gzip ~15–20% cho HTML/CSS/JS; `zstd` nhanh hơn nhiều ở mức nén tương đương → dùng cho log, dữ liệu nội bộ.

## 2. Nén video — khái niệm cần biết
1. **Loại frame**: **I-frame** (độc lập, lớn), **P-frame** (tham chiếu quá khứ), **B-frame** (tham chiếu cả hai chiều — nén tốt nhưng **thêm độ trễ**, nên real-time không dùng).
2. **GOP** (Group of Pictures): khoảng cách giữa các I-frame. GOP ngắn = chuyển kênh/seek nhanh, bitrate cao hơn.
3. **Motion compensation** là nguồn tiết kiệm chính: mô tả "khối này dịch sang phải 5 pixel" thay vì gửi lại pixel.
4. **CBR vs VBR**: bitrate cố định (dễ dự đoán băng thông) vs biến đổi (chất lượng đều hơn).
5. **Codec thế hệ mới** (AV1, H.266) giảm ~30–50% bitrate so với H.264 nhưng tốn CPU mã hoá gấp nhiều lần → cân nhắc chi phí encode vs chi phí băng thông.

## 3. Phân phối video
| Cách | Đặc điểm |
|---|---|
| **Progressive download** | Một file qua HTTP, hỗ trợ `Range` |
| **HLS / DASH** (ABR streaming) | Chia thành segment 2–10 s, nhiều mức chất lượng, client tự chọn theo băng thông đo được |
| **LL-HLS / CMAF low latency** | Segment nhỏ + chunked transfer → trễ 2–5 s |
| **WebRTC** | Trễ <500 ms, dùng cho tương tác thật → [[RTP & Real-Time Transport]] |

**ABR chạy trên HTTP** nên tận dụng được toàn bộ hạ tầng CDN → [[CDN]].

## 4. Cạm bẫy hay gặp
- **Nén lại nội dung đã nén** (gzip cho ảnh JPEG/video) → tốn CPU, kích thước không giảm, đôi khi tăng.
- **Nén dữ liệu có bí mật lẫn dữ liệu do kẻ tấn công điều khiển** → rò rỉ qua kích thước (CRIME/BREACH).
- **Zip bomb / decompression bomb** — luôn giới hạn kích thước sau giải nén.
- **Đo chất lượng bằng PSNR** — dùng **VMAF** hoặc SSIM sát cảm nhận người xem hơn.
- **Chọn ABR ladder tuỳ tiện** → tốn băng thông mà không tăng chất lượng cảm nhận; Netflix dùng ladder theo từng nội dung.
- **Quên fallback codec** — AV1/AVIF chưa được hỗ trợ ở mọi nơi.

## 5. Checklist áp dụng
- [ ] Nội dung nào nên nén, nội dung nào đã nén sẵn?
- [ ] Có giới hạn kích thước sau giải nén không?
- [ ] Ảnh có phục vụ định dạng hiện đại (WebP/AVIF) kèm fallback không?
- [ ] Video có nhiều mức chất lượng phù hợp với mạng thật của người dùng không?
- [ ] Yêu cầu độ trễ là bao nhiêu? Có thực sự cần <1 s không (rất đắt)?

## Tham khảo
- Peterson & Davie — 7.2 Multimedia Data: https://book.systemsapproach.org/data/multimedia.html
- Netflix — *Per-Title Encode Optimization*: https://netflixtechblog.com/per-title-encode-optimization-7e99442b62a2
- Netflix — *VMAF: The Journey Continues*: https://netflixtechblog.com/vmaf-the-journey-continues-44b51ee9ed12
- RFC 8216 — *HTTP Live Streaming*: https://www.rfc-editor.org/rfc/rfc8216
- web.dev — *Serve images in modern formats*: https://web.dev/articles/serve-images-webp

## Liên kết
[[Presentation Formatting]] · [[RTP & Real-Time Transport]] · [[CDN]] · [[HTTP]] · [[Networking]]
