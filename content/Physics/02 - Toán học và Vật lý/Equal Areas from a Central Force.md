---
tags: [physics, mathematics, proof, gravitation]
status: evergreen
---
# Equal Areas from a Central Force

> Chứng minh hình học Feynman dựng lại trên bảng trong bài giảng #2 — mượn thẳng từ *Principia*, "diagram and all". Nó tồn tại trong vault này không phải vì kết quả, mà vì nó là **bằng chứng cụ thể** cho luận điểm rằng toán học nối các phát biểu lại với nhau. Xem [[Mathematics as Language and Reasoning]].

**Định lý.** Nếu lực luôn hướng về Mặt Trời (lực xuyên tâm), thì đường nối Mặt Trời–hành tinh quét những diện tích bằng nhau trong những khoảng thời gian bằng nhau.

Chú ý điều định lý **không** cần: độ lớn của lực. Không cần $1/r^2$, không cần gì cả — chỉ cần **hướng**.

## 1. Chứng minh, từng bước

Ký hiệu: $S$ = Mặt Trời. Các vị trí hành tinh cách nhau những khoảng thời gian bằng nhau (mỗi bước 1 giây).

**Bước 1 — Trường hợp không có lực.**

Hành tinh ở vị trí 1, sau 1 giây tới 2. Nếu không có lực thì theo quán tính, giây tiếp theo nó đi **cùng quãng đường, cùng hướng** tới vị trí 3. Vậy đoạn 1→2 và 2→3 bằng nhau và thẳng hàng.

So sánh hai tam giác $S12$ và $S23$:
- **Đáy bằng nhau** (12 = 23, theo quán tính).
- **Chiều cao bằng nhau** (cùng khoảng cách vuông góc từ $S$ tới đường thẳng 1–2–3).
- → **Diện tích bằng nhau.** ✅

Diện tích tam giác = ½ × đáy × chiều cao. Không có lực thì đã có ngay định luật 2 Kepler.

**Bước 2 — Bật lực xuyên tâm lên.**

Trong khoảng 2→3, Mặt Trời kéo hành tinh. Lấy gần đúng: toàn bộ tác dụng là một cú đẩy tại vị trí trung bình, **hướng về $S$**. Chuyển động thật là tổng của:
- chuyển động quán tính (2→3), và
- độ dời do lực gây ra, **song song với đường 2–$S$**.

Kết quả: hành tinh không tới 3 mà tới **4**.

**Bước 3 — Tam giác mới có cùng diện tích.**

So sánh $S23$ và $S24$:
- **Cùng đáy** — cả hai dùng đoạn $S2$.
- **Cùng chiều cao** — vì 3 và 4 nằm trên một đường **song song** với $S2$ (đó chính là hướng của cú đẩy).
- → **Diện tích bằng nhau.** ✅

**Kết luận.** $[S12] = [S23] = [S24]$. Diện tích thật quét được trong giây thứ hai bằng diện tích quét trong giây thứ nhất. ∎

> Feynman sau khi vẽ xong: *"Ingenious, no? I borrowed this from Newton: it comes right out of the Principia, diagram and all. **The letters are different, that's all — because he wrote in Latin.** (These are Arabic numerals.)"*

> [!note] Mấu chốt nằm ở chữ "song song"
> Toàn bộ chứng minh xoay quanh một điều: lực hướng về $S$ ⟹ độ dời phụ **song song với $S2$** ⟹ chiều cao tam giác không đổi. Nếu lực có thành phần vuông góc với bán kính, chiều cao đổi, diện tích đổi. Đó chính là nội dung vật lý.

## 2. Cùng chứng minh, viết bằng giải tích

Feynman làm lại ngay sau đó bằng ký hiệu hiện đại, để so sánh hai lối viết:

Tốc độ quét diện tích: $\dot{A} \propto r \times v_\perp$ — bán kính nhân thành phần vận tốc vuông góc với bán kính.

Đạo hàm thêm một lần: $\ddot{A} \propto (v \times v) + (r \times a)$.
- Số hạng đầu: **bằng 0** — vận tốc cùng phương với chính nó.
- Số hạng sau: $a = F/m$, và nếu $F$ hướng theo $r$ thì $r \times a = 0$.

→ $\ddot{A} = 0$ → tốc độ quét diện tích không đổi. ∎

Feynman bình luận về sự khác biệt, và câu này rất đáng nhớ:

> "This geometrical kind of reasoning requires an ingenuity — to draw the correct triangles, to notice about the areas — you have to be clever. But there have been improvements in the methods of analysis, **so that one can be quite more stupid**."

Đó không phải chê giải tích. Đó là **ưu điểm lớn nhất** của nó: ký hiệu tốt biến sự thông minh thành thủ tục. Newton phải thiên tài mới nghĩ ra hình vẽ; ta chỉ cần đặt dấu chấm đúng chỗ.

## 3. Cạm bẫy

> [!warning] Chứng minh này **không** dùng luật nghịch đảo bình phương
> Đây là chỗ hay bị hiểu nhầm nhất. Kết quả đúng cho **mọi** lực xuyên tâm — kể cả $1/r^3$, kể cả lò xo. Vì thế nó tổng quát hơn định luật hấp dẫn, và vì thế nó sống sót khi hấp dẫn Newton bị thay thế. Xem [[Theorems Beyond Their Derivation]].

- **Tưởng phép xấp xỉ "một cú đẩy tại điểm giữa" làm chứng minh mất chặt.** Cho bước thời gian → 0 thì xấp xỉ thành chính xác. Newton làm đúng như vậy trong *Principia*.
- **Nhầm "cùng đáy" ở bước 3.** Ở bước 1 đáy là các đoạn trên đường thẳng chuyển động; ở bước 3 đáy là đoạn $S2$. Hai bước dùng hai cặp đáy–chiều cao khác nhau. Vẽ hình ra là thấy.
- **Coi phiên bản giải tích "tốt hơn".** Feynman trình bày cả hai vì mỗi cái dạy một thứ: hình học cho thấy *vì sao*, giải tích cho thấy *cách làm nhanh*. Ông không chọn phe.
- **Học kết quả mà bỏ chứng minh.** Nếu vậy thì mất đúng cái Feynman muốn truyền: cảm giác **hai phát biểu rời rạc thực ra là một**.

## 4. Checklist áp dụng

- [ ] Tôi vẽ lại được hình và dựng lại cả ba bước, không nhìn note?
- [ ] Tôi chỉ ra được chỗ nào trong chứng minh dùng đến "lực hướng về $S$"?
- [ ] Tôi giải thích được vì sao kết quả **không** phụ thuộc độ lớn của lực?
- [ ] Tôi làm lại được phiên bản giải tích và biết mỗi số hạng triệt tiêu vì sao?
- [ ] Tôi nói được định lý này tổng quát hoá thành gì? (→ [[Conservation of Angular Momentum]])

## Tham khảo

- [Messenger Lecture #2](https://www.feynmanlectures.caltech.edu/fml.html#2)
- Newton, *Principia* (1687), Book I, Proposition 1, Theorem 1 — bản gốc của hình vẽ này
- Feynman, *Feynman's Lost Lecture: The Motion of Planets Around the Sun* (Vintage, 1997) — ông đẩy lối chứng minh hình học này đi xa hơn nhiều
- [The Feynman Lectures, Vol I Ch. 9-7 — Planetary motions](https://www.feynmanlectures.caltech.edu/I_09.html)

## Liên kết

[[Mathematics as Language and Reasoning]] · [[Kepler's Laws]] · [[Conservation of Angular Momentum]] · [[Theorems Beyond Their Derivation]] · [[Newton's Law of Gravitation]] · [[Physics]]
