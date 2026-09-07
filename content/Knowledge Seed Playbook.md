---
tags: [meta, workflow, knowledge-seed]
type: playbook
status: evergreen
created: 2026-08-27
updated: 2026-09-02
---
# Knowledge Seed Playbook

> Quy trình biến một **seed** (note thô, rời rạc, nhiều header rỗng, một file `SEEDS.md`, hoặc một đống clipping chưa tiêu hoá) thành một **hệ thống kiến thức** có cấu trúc, có liên kết chéo và có nguồn tham khảo.
> Áp dụng được cho: `Backend/SEEDS.md`, `Database/SEEDS.md`, `DevOps/`, `Frontend/`, `DS&AL/` và mọi Area khác.

## Bảy lần chạy tham chiếu

| | `2. Areas/UIUX/` | `2. Areas/Quant/` | `2. Areas/Physics/` | `2. Areas/Blockchain/` | `2. Areas/Frontend/` | `2. Areas/GIS/` | `2. Areas/SEO/` |
|---|---|---|---|---|---|---|---|
| Ngày chạy | 2026-08-27 | 2026-08-30 | 2026-09-01 | 2026-09-01 | 2026-09-02 | 2026-09-02 | 2026-09-02 |
| Seed vào | 4 file / 292 dòng | 29 file / ~8.000 dòng | **3 file / 3.981 dòng** | **39 file / ~6.600 dòng** — *nằm ở area khác* | **67 file / 3.944 dòng** — *đã có sẵn `_archive-frontend/`* | **1 file / 215 dòng** — *toàn link khoá học* | **0 file / 0 dòng** — *không tồn tại* |
| Loại seed | **Dàn ý** — 12 header rỗng | **Nguyên liệu thô** — transcript YouTube, lesson page, README | **Lai** — 2.400 dòng transcript + 5 header rỗng trong *cùng một file* | **Lai, phân tán** — 3 báo cáo audit + ~30 stub rỗng, rải trong `4. Archived/` | **Danh mục** — 4 index MDN + ~45 stub class list + 3 file MOC toàn wikilink gãy | **Danh mục — biến thể lộ trình**: ~90 link sắp theo thứ tự học, mỗi mục hứa cả một *môn*, không phải một *khái niệm* | **Không có seed** — greenfield thật; `grep` hai vòng toàn vault ra 0 kết quả |
| Kết quả | 43 note / ~32.000 từ / 10 thư mục | 54 note / ~56.000 từ / 10 thư mục | 64 note / 10 thư mục | 68 note / ~63.000 từ / 10 thư mục | 64 note / ~75.000 từ / 10 thư mục | 66 note / ~68.000 từ / 10 thư mục | 67 note / ~71.000 từ / 10 thư mục |
| Nút thắt | Quyết định "khái niệm sống ở note nào" | **Đọc hết seed** + khử trùng lặp | Nhận ra nửa file là header rỗng | **Tìm ra seed** — folder đích rỗng hoàn toàn | **Đặt tên** — tên chung chung sẽ cướp wikilink của area khác | **Nhận ra cái seed *không hề nhắc tới*** — hệ toạ độ và viễn thám | **Chứng minh seed không tồn tại**, rồi dựng dàn ý lĩnh vực từ đầu |
| Đặc thù | Header rỗng = danh sách việc | Xung đột hệ giá trị → cần **note bản lề** | Xung đột **nguồn ↔ chính nguồn đó** → note bản lề | Xung đột **ba bên trong cùng một tài liệu** → **hai** note bản lề | Xung đột **theo trục thời gian** (tài liệu bền vs tài liệu hết hạn) → **hai** note bản lề | Xung đột **theo trục thời gian, trong cùng một bảng** (nguyên lý và giá tiền cạnh nhau, cùng một giọng) → note bản lề | Xung đột **giữa nguồn và động cơ của nguồn** (Google nói ↔ dữ liệu ngành ↔ leak) + xung đột **tốc độ thay đổi** → **hai** note bản lề |

---

## 1. Nguyên tắc nền

1. **Seed là lời hứa, không phải bản nháp.** Với seed dàn ý, mỗi header rỗng là một lời hứa — quy trình này chỉ đơn giản là đi trả hết chúng. Với seed nguyên liệu thô, lời hứa nằm ẩn: mỗi khái niệm được nhắc tới mà chưa được hệ thống hoá là một món nợ. Cả hai đều phải trả.
2. **Không vứt gì của seed đi.** Mọi câu, mọi danh sách best-practice, mọi link trong seed phải xuất hiện lại trong hệ thống mới — được mở rộng, không bị thay thế. Bản gốc lưu ở `_archive-seed/` để đối chiếu.
3. **Một note = một khái niệm tra cứu được.** Nếu một mục cần >100 dòng thì nó là note riêng, không phải một `##` trong note khác.
4. **Khử trùng lặp bằng link.** Khái niệm chỉ được định nghĩa **một chỗ**; mọi nơi khác trỏ `[[link]]` tới. (Ở UIUX, "Design System" từng nằm rải rác trong 3 file.)
5. **Mỗi note phải có nguồn.** Không có link tham khảo = không kiểm chứng được = không dùng để tranh luận được.
6. **Viết cho mình 6 tháng sau**, không viết cho người mới bắt đầu. Bỏ phần định nghĩa hiển nhiên, giữ phần "vì sao" và "cạm bẫy".
7. **Không hoà tan mâu thuẫn.** Nếu seed chứa hai hệ giá trị chỏi nhau, đừng chọn phe và cũng đừng làm mượt đi. Ghi lại cả hai một cách trung thực, rồi viết một **note bản lề** đối chiếu chúng. Xem mục 3.2.

---

## 2. Quy trình 6 bước

### Bước 1 — Đọc toàn bộ seed và kiểm kê
- Đọc **hết** mọi file trong folder trước khi động vào bất cứ thứ gì. **Đọc thật, không skim frontmatter.** Ở lần chạy Quant, chi phí thật của cả dự án nằm ở đây: ~8.000 dòng transcript, ~150k token. Bỏ qua bước này thì bước 3 và 4 sẽ sai.
- Lập bảng kiểm kê: mỗi file có gì / thiếu gì / trùng với file nào.
- Đánh dấu ba nhóm:
  - 🟢 **Có nội dung** — giữ và mở rộng
  - ⚪ **Header rỗng** — đây là danh sách việc chính
  - 🔴 **Trùng lặp** — quyết định note nào là "nhà" của khái niệm đó

**Nhận diện loại seed** — quyết định cách làm bước 1 và 3:

| | Seed **dàn ý** | Seed **nguyên liệu thô** |
|---|---|---|
| Hình dạng | Nhiều header rỗng, ít chữ | Nhiều chữ, không cấu trúc (transcript, clipping) |
| Bước 1 làm gì | Liệt kê header rỗng → thành danh sách việc | **Trích khái niệm** ra khỏi văn xuôi, lập bảng `khái niệm → file` |
| Rủi ro chính | Viết lan man ngoài phạm vi | **Trùng lặp nặng** và bỏ sót ý chôn giữa transcript |
| Ví dụ | UIUX | Quant |

> **Loại thứ ba — seed danh mục** (Frontend): index có cấu trúc, mỗi mục một dòng mô tả, không có chiều sâu. Không phải header rỗng vì *có* chữ; không phải nguyên liệu thô vì không có lập luận để trích. Lời giải là **note catalogue sắp lại theo câu hỏi tra cứu**, không phải một note cho mỗi mục. Xem 6.6.

**Với seed nguyên liệu thô**, lập bảng ngược `khái niệm → các file chứa nó` trước khi thiết kế cây. Ở Quant: *ergodicity* nằm rải trong 5 file, *edge/EV* trong 7. Nếu không lập bảng này thì mỗi khái niệm sẽ bị viết lại 5–7 lần ở 5–7 note khác nhau.

> ⚙️ **Lưu ý kỹ thuật:** `cat` nhiều file lớn qua shell sẽ bị cắt và ghi ra file tạm. Đọc từng file bằng công cụ đọc file (Read), hoặc `sed -n` từng khoảng.

### Bước 2 — Kiểm tra backlink trước khi tái cấu trúc
```bash
# quét cả vault, loại chính folder đang xử lý
for f in "<area>"/*.md; do b=$(basename "$f" .md)
  n=$(grep -rl --include="*.md" "\[\[$b" . | grep -v "^./<area>/" | wc -l)
  [ "$n" -gt 0 ] && echo "$n  $b"
done
```
Không có backlink → đổi tên/xoá thoải mái. Có backlink → phải sửa cả nơi trỏ tới.

### Bước 3 — Thiết kế cây thư mục
- Đánh số thư mục `00 -`, `01 -`… để **giữ đúng thứ tự học**, không phải thứ tự bảng chữ cái.
- Sắp theo dòng chảy tự nhiên của lĩnh vực: nền tảng → nghiên cứu/lý thuyết → thành phần cụ thể → hệ thống hoá → công cụ → đo lường.
- 8–10 thư mục, mỗi thư mục 3–11 note. Nhiều hơn thì tách, ít hơn thì gộp.
- **Thư mục cuối = tài nguyên.** Cả hai lần chạy đều cần một thư mục chốt chứa lộ trình học, công cụ nền, và catalogue nguồn. Đặt nó ở số cuối cùng.
- **Tên thư mục tiếng Việt, tên file tiếng Anh.** Thư mục để điều hướng bằng mắt; tên file để `[[link]]` khớp với cách nghĩ khi tra cứu.

### Bước 4 — Viết note theo cấu trúc chuẩn
Xem template ở mục 3. Viết theo **cụm 2–4 note một lần** (dùng heredoc trong Bash), không viết từng file một. Note càng dài thì cụm càng nhỏ — note ~100 dòng thì **2 note/lượt** là vừa.

Thứ tự viết: **MOC trước** (để biết mình sẽ viết gì), rồi lần lượt từng thư mục theo số.

Viết MOC trước có một tác dụng phụ quan trọng: nó **khoá danh sách tên file**. Mọi `[[link]]` viết sau đó đều trỏ tới tên đã có trong MOC, nên bước 6 gần như luôn ra 0 link gãy ngay lần đầu.

### Bước 5 — Tạo MOC (Map of Content)
File `<TênArea>.md` ở gốc thư mục, chứa:
- Cách dùng vault này (quy ước `status`, cách đọc)
- Danh sách toàn bộ note theo nhóm, mỗi dòng có mô tả 5–10 từ
- Bảng **nguồn học nền tảng** dùng chung cho cả area
- Ghi chú về `_archive-seed/`

### Bước 6 — Kiểm tra chất lượng
```bash
# Liệt kê mọi wikilink chưa có note tương ứng.
# LOẠI _archive-seed khỏi CẢ HAI vế, nếu không frontmatter của clipping
# (author: "[[Roman Paolucci]]") sẽ báo link gãy giả.
grep -oh '\[\[[^]|]*' *.md [0-9]*/*.md | sed 's/\[\[//' | sort -u > /tmp/links.txt
find . -name "*.md" -not -path "./_archive-seed/*" -exec basename {} .md \; | sort -u > /tmp/notes.txt
comm -23 /tmp/links.txt /tmp/notes.txt
```
Link gãy → hoặc viết note còn thiếu, hoặc đổi thành text thường. **Mục tiêu: 0 link gãy.**
⚠️ Link tới note **ngoài** folder (ví dụ `[[Knowledge Seed Playbook]]`) sẽ hiện ra ở đây nhưng **không phải lỗi** — Obsidian phân giải toàn vault. Kiểm tra file đó có tồn tại thật không rồi bỏ qua.

**Kiểm tra chất lượng hàng loạt** — chạy sau khi viết xong:
```bash
for f in [0-9]*/*.md; do grep -q '^## Tham khảo' "$f" || echo "thiếu Tham khảo: $f"; done
for f in [0-9]*/*.md; do grep -qi 'checklist'    "$f" || echo "thiếu Checklist:  $f"; done
for f in [0-9]*/*.md; do grep -q '\[\[<MOC>\]\]'  "$f" || echo "thiếu link MOC:   $f"; done
# note có <3 link tham khảo
for f in [0-9]*/*.md; do n=$(sed -n '/^## Tham khảo/,/^## Liên kết/p' "$f" | grep -c '^- ')
  [ "$n" -lt 3 ] && echo "chỉ $n nguồn: $f"; done
```

**Kiểm tra MOC phủ 100% note:**
```bash
grep -oh '\[\[[^]|]*' <MOC>.md | sed 's/\[\[//' | sort -u > /tmp/moc.txt
comm -23 <(grep -v '^<MOC>$' /tmp/notes.txt) /tmp/moc.txt   # phải rỗng
```

---

## 3. Template

### 3.1 — Note khái niệm (mặc định)

```markdown
---
tags: [<area>, <nhóm>]
status: seed | growing | evergreen
---
# Tên khái niệm

> Một câu định nghĩa sắc, nói được *vì sao nó quan trọng*, không chỉ *nó là gì*.

## 1. Khái niệm cốt lõi
Bảng so sánh hoặc danh sách phân loại. Ưu tiên **bảng** hơn đoạn văn.

## 2. Nguyên tắc / Best practices
Có đánh số. Mỗi mục 1–2 dòng. Kèm ví dụ ❌ / ✅ khi nói về cách viết hoặc cách chọn.

## 3. Cạm bẫy / Sai lầm hay gặp
Phần giá trị nhất và hay bị bỏ qua nhất.

## 4. Checklist áp dụng
- [ ] Câu hỏi tự kiểm, dạng có/không, dùng được ngay khi làm việc thật

## Công cụ
Bảng: tên | đặc điểm | link

## Tham khảo
- Nguồn chuẩn ngành (link thật, không bịa)
- Sách / bài viết gốc của khái niệm

## Liên kết
[[note-a]] · [[note-b]] · [[MOC]]
```

**Quy ước:**
- `status`: `seed` (mới gieo) → `growing` (đang mở rộng) → `evergreen` (đã hệ thống hoá)
- Tiếng Việt cho giải thích, **giữ nguyên thuật ngữ tiếng Anh** — vì tài liệu và đồng nghiệp đều dùng tiếng Anh
- Tên file = tên khái niệm bằng tiếng Anh, để `[[link]]` khớp với cách nghĩ khi tra cứu
- Cuối mỗi note **luôn** có dòng Liên kết trỏ về MOC
- **Callout cho cảnh báo**, không phải đoạn văn: `> [!warning]`, `> [!note]`. Mắt bắt được ngay khi lướt.
- **Số cụ thể > tính từ.** "Slope < 1, và thấp hơn nữa ở regime vol cao" đáng giá hơn "thường bị định giá cao". Nếu seed có con số, giữ con số.
- Khi trả một **header rỗng**, mở note bằng ghi chú nguồn để 6 tháng sau còn biết nó đến từ đâu:
  ```markdown
  > [!note] Ghi chú nguồn
  > Trong seed gốc, file `X.md` chỉ có đúng một dòng: *"..."* — một **header rỗng**.
  > Note này trả lời hứa đó, tổng hợp từ các nguồn trong cùng vault.
  ```

### 3.2 — Note bản lề (bridge note)

Dùng khi seed chứa **hai hệ giá trị mâu thuẫn**. Ở Quant: một bên là quant rigor (đòi alpha regression, out-of-sample, đếm số lần thử), một bên là ICT retail (bằng chứng chỉ là screenshot P&L và ví dụ chọn lọc). Câu chuyện "smart money săn stop của bạn" mâu thuẫn trực tiếp với "thị trường không có khả năng quan tâm tới bạn".

**Không vứt đi** (nguyên tắc 2), **không hoà tan** (nguyên tắc 7). Thay vào đó:

1. Ghi lại khung yếu **trung thực và đầy đủ**, bằng chính từ vựng của nó.
2. Viết một note bản lề với cấu trúc:
   - **Vì sao nó không bị bác bỏ dứt điểm** — công bằng với nó trước
   - **Chỗ hai khung đồng thuận** — bảng đối chiếu; thường nhiều hơn bạn tưởng
   - **Chỗ nó gãy** — cụ thể, từng điểm, kèm ⚠️
   - **Cách dùng nó một cách trung thực** — dùng như X, không dùng như Y
   - **Phép kiểm bạn tự chạy được** — biến tranh cãi thành việc làm được
3. Mở **mọi** note của khung yếu bằng một dòng trỏ về note bản lề:
   ```markdown
   > ⚠️ **Đọc [[Note bản lề]] trước khi áp dụng bất kỳ note nào trong thư mục này.**
   ```
4. Đánh dấu nó trong MOC bằng ⚠️ và đặt nó **cuối** cụm.

Note bản lề thường là note giá trị nhất trong cả vault, vì nó là chỗ duy nhất kiến thức thực sự **va chạm** với nhau.

### 3.3 — Note catalogue

Note kiểu danh mục tài nguyên (`Learning Resources`) **được miễn** phần Checklist và Tham khảo — bản thân nó đã là phần tham khảo. Đừng cố nhồi cho đủ template.

---

## 4. Prompt để chạy lại trên area khác

```
Đọc toàn bộ folder <đường dẫn area>. Đây là knowledge seed.

Hãy cấu trúc lại thành một hệ thống kiến thức:
0. TÌM SEED TRƯỚC: `ls` folder đích, rồi `grep -ril` từ khoá của area trên
   TOÀN vault (hai vòng: từ khoá nội dung, rồi wikilink từ file tìm được).
   Ba khả năng: (a) seed ở folder đích, (b) seed bị chôn ở area khác,
   (c) KHÔNG có seed. Chỉ kết luận (c) sau khi đã chạy đủ hai vòng grep.
   Nếu (c): bỏ nguyên tắc 2 và _archive-seed/, dựng cây thư mục hoàn toàn
   từ 3-4 dàn ý lĩnh vực độc lập (lấy HỢP, không lấy giao), và ghi rõ
   trong MOC rằng vault này là greenfield.
   Nếu (a)/(b): ĐỌC HẾT mọi file trước khi động vào bất cứ thứ gì. Đọc thật, không skim.
1. Kiểm kê: file nào có gì, header nào rỗng, chỗ nào trùng lặp.
   Nếu seed là nguyên liệu thô (transcript/clipping), lập thêm bảng ngược
   `khái niệm -> các file chứa nó` để biết chỗ nào trùng.
2. Kiểm tra backlink trong vault trước khi đổi tên/xoá file
3. Tạo cây thư mục đánh số theo thứ tự học, không theo bảng chữ cái.
   Thư mục cuối là tài nguyên/lộ trình.
   BẮT BUỘC trước khi viết: (a) tiền tố định danh cho MỌI tên note dễ trùng
   (`<Area> Learning Resources`, `<Area> Glossary`...), rồi chạy phép kiểm
   va chạm tên toàn vault; (b) grep ra các khái niệm đã có nhà ở area khác
   và ghi mục "Khái niệm có nhà ở area khác" vào MOC.
4. Mở rộng MỌI section — kể cả header rỗng — theo template trong
   [[Knowledge Seed Playbook]]. Viết MOC trước để khoá danh sách tên file.
5. Giữ nguyên 100% nội dung seed cũ, chỉ mở rộng thêm; backup vào _archive-seed/
6. Mỗi note phải có: checklist áp dụng + link tham khảo thật (nguồn chuẩn ngành)
7. Nếu lĩnh vực chứa hai hệ giá trị mâu thuẫn: ghi lại cả hai trung thực,
   viết một note bản lề đối chiếu, và cảnh báo ở đầu các note liên quan.
   KHÔNG chọn phe, KHÔNG làm mượt mâu thuẫn đi.
   Tách thành NHIỀU note bản lề khi các mâu thuẫn có tập note liên quan
   khác nhau HOẶC có trục khác nhau (độ tin cậy vs độ tươi là hai trục).
   Nếu lĩnh vực có chiến thuật đã chết vẫn được khuyên: gom thành một bảng
   "đã chết — chết khi nào — vẫn được khuyên ở đâu".
8. Tạo MOC ở gốc folder, link chéo giữa các note
9. Cuối cùng: kiểm tra 0 wikilink gãy + MOC phủ 100% note

Viết bằng tiếng Việt, giữ nguyên thuật ngữ tiếng Anh.
```

---

## 5. Checklist nghiệm thu

- [ ] **Đã xác định trạng thái seed (a/b/c) bằng hai vòng grep toàn vault chưa?**
- [ ] Mọi header rỗng trong seed đã có nội dung? *(bỏ qua nếu không có seed)*
- [ ] Mọi nội dung seed cũ còn nguyên (đã diff với `_archive-seed/`)? *(bỏ qua nếu không có seed)*
- [ ] Nếu **không có seed**: cây thư mục có đối chiếu với ≥3 dàn ý lĩnh vực độc lập chưa? MOC có ghi rõ đây là greenfield chưa?
- [ ] Đã chạy phép kiểm va chạm tên trên **mọi** tên note dự định chưa?
- [ ] MOC có mục "Khái niệm có nhà ở area khác" chưa?
- [ ] Mỗi khái niệm chỉ được định nghĩa ở **một** note?
- [ ] Mỗi note có checklist áp dụng được ngay?
- [ ] Mỗi note có ≥3 link tham khảo thật?
- [ ] 0 wikilink gãy?
- [ ] MOC liệt kê đủ 100% note?
- [ ] Mở một note bất kỳ — có đi tiếp sang note liên quan được không?
- [ ] Mỗi note có dòng Liên kết trỏ về MOC?
- [ ] Nếu seed có mâu thuẫn nội tại — đã có note bản lề chưa? Các note liên quan đã cảnh báo chưa?
- [ ] Chạy `find` lại lần cuối — số file trong `_archive-seed/` có khớp với lúc bắt đầu không? *(bỏ qua nếu không có seed)*
- [ ] Mọi wikilink hiện ra ở phép kiểm Bước 6 nhưng nằm ngoài folder — đã xác minh **tồn tại thật** chưa?

---

## 6. Bài học

### 6.1 — Đúng cho mọi lần chạy

- **Cái tốn công nhất không phải viết, mà là quyết định "khái niệm này sống ở note nào".** Làm bước 1 và 3 cho kỹ thì bước 4 chạy rất nhanh.
- **Bảng > đoạn văn.** Phần lớn kiến thức "khi nào dùng cái gì" diễn đạt bằng bảng 3 cột là rõ nhất. Ở Quant, gần như mọi note mở đầu bằng một bảng so sánh hai cột.
- **Kiểm tra link gãy tự động** bắt được lỗi mà đọc bằng mắt không thấy.
- **File lạ có thể xuất hiện giữa chừng** (Obsidian sync, clipping mới). Chạy `find` lại ở cuối để đối chiếu, đừng tin snapshot lúc bắt đầu.
- Nên viết **2–4 note mỗi lượt** — đủ để giữ mạch liên kết chéo, không quá lớn để mất kiểm soát. Note dài (~100 dòng) thì 2 note/lượt.
- **Phần "Cạm bẫy" luôn là phần giá trị nhất và luôn bị viết cuối cùng.** Nếu thấy mình đang viết nó qua loa, đó là dấu hiệu chưa đọc seed đủ kỹ.

### 6.2 — Từ lần chạy UIUX (seed dàn ý)

- **Header rỗng là mỏ vàng** — chúng cho biết chính xác cái mình biết là mình chưa biết. UIUX có 12 header rỗng (Button, Input, Form, Selection, Slider, Picker, Progress tracker, Cursors…), tất cả đều thành note đầy đủ.
- 3 link gãy phát hiện được ở bước 6: 2 tên công cụ, 1 khái niệm chưa tách note.

### 6.3 — Từ lần chạy Quant (seed nguyên liệu thô)

- **Bước 1 là toàn bộ chi phí.** 8.000 dòng transcript ≈ 150k token phải đọc thật. Không có đường tắt. Nhưng đọc xong rồi thì cây thư mục hiện ra gần như tự động.
- **Khử trùng lặp quan trọng gấp bội.** Với seed dàn ý, trùng lặp là ngoại lệ. Với clipping, nó là **mặc định** — 5 video cùng nói về ergodicity, 7 video cùng nói về edge. Không lập bảng `khái niệm → file` trước thì sẽ viết lại cùng một thứ 7 lần.
- **Header rỗng vẫn xuất hiện, chỉ ít hơn và kín đáo hơn.** Quant có 3: một file chỉ chứa đúng chữ *"Discretionary Traders"*, một file hoàn toàn rỗng, một clipping Gmail rỗng. Cả ba đều thành note thật. Đừng bỏ qua file 11 dòng.
- **Xung đột hệ giá trị là thứ playbook cũ chưa lường tới.** Seed Quant chứa 28 file quant rigor + 1 file dài 759 dòng bán mentorship trading retail. Giải pháp: note bản lề (mục 3.2). Đây hoá ra là note giá trị nhất trong vault.
- **Viết MOC trước cho ra 0 link gãy ngay lần đầu.** 63 đích link, không cái nào gãy — vì mọi tên file đã được khoá trong MOC trước khi viết note.
- **Cẩn thận với frontmatter của clipping.** `author: "[[Roman Paolucci]]"` sẽ báo link gãy giả nếu không loại `_archive-seed/` ra khỏi cả hai vế của phép kiểm.
- **Quy mô nở ra theo độ dày của seed, không theo số file.** 29 file → 54 note (nở 1,9×); nhưng 8.000 dòng → 56.000 từ (nở ~7×). Ước lượng công theo **số dòng seed**, đừng theo số file.
- **10 thư mục / 4–8 note mỗi thư mục** vẫn là tỉ lệ đúng. Thư mục nào phình quá 8 note (`06 - Quản lý danh mục`) là dấu hiệu nên tách, nhưng nếu các note đó thực sự liên kết chặt thì giữ được.

### 6.4 — Từ lần chạy Physics (seed lai)

- **Một file có thể vừa là nguyên liệu thô vừa là dàn ý.** Playbook cũ giả định seed thuộc *một* trong hai loại. File `The Feynman Messenger Lectures Video Viewer.md` (3.043 dòng) chứa transcript đầy đủ của bài giảng 1–2 **và** năm tiêu đề bài giảng 3–7 chỉ có dòng *"Transcript may not load until video starts playing."* Nếu chỉ đọc 800 dòng đầu, ta kết luận sai rằng đây là seed nguyên liệu thô thuần tuý và **bỏ mất 5 header rỗng** — hơn một phần ba khối lượng công việc.
- **Hệ quả cho Bước 1: phải đọc tới dòng cuối, kể cả khi đã "hiểu" file.** Ở đây phần đáng giá nhất (5 header rỗng) nằm sau 2.400 dòng đã đọc rồi, và trước một khối Lorem ipsum cùng help text của ứng dụng web. Dấu hiệu cần cảnh giác: file clipping từ **web app** thường chứa rác giao diện xen giữa nội dung thật.
- **Nhận ra header rỗng "giả dạng có nội dung".** Ở UIUX, header rỗng nhìn ra ngay (tiêu đề, không có chữ). Ở đây chúng *có* chữ — một câu lỗi kỹ thuật lặp lại 5 lần. Phép kiểm rẻ: `grep -c` một dòng lặp đáng ngờ. Nếu nó xuất hiện đúng bằng số mục trong danh sách, đó là danh sách việc.
- **Seed nhỏ về số file vẫn nở lớn.** 3 file → 64 note (nở 21×). Xác nhận lại bài học 6.3: **ước lượng theo số dòng, không theo số file.** 3.981 dòng ở đây cho ra nhiều note hơn 8.000 dòng ở Quant, vì transcript Quant trùng lặp nặng còn transcript Feynman thì không — mỗi bài giảng nói một chủ đề khác.
- **Xung đột hệ giá trị có thể nằm trong *một* nguồn.** Ở Quant, mâu thuẫn nằm giữa 28 file quant rigor và 1 file ICT retail — hai nguồn khác nhau. Ở đây, **cùng một clipping Wikipedia** vừa dẫn Feynman về liêm chính khoa học (*"you must not fool yourself"*) vừa ghi lại hồ sơ mâu thuẫn trực tiếp với nó. Note bản lề vẫn là lời giải, nhưng dấu hiệu để phát hiện thì khác: đừng chỉ so *giữa* các file, hãy so **các phần trong cùng một file**.
- **Một số note bản lề không cần Checklist mà cần "phép kiểm tự chạy được".** Mục 3.2 đã nêu điều này; lần chạy này xác nhận nó thay thế được phần Checklist hoàn toàn, và phép kiểm quan trọng nhất là loại "tách nội dung khỏi nguồn" — hỏi *"kết luận này có phụ thuộc vào việc tác giả là người thế nào không?"*
- **Cẩn thận với heading đánh số ở note ngoại lệ.** Note bản lề và note hồ sơ hay được viết với `## 1.` `## 2.`… tới cuối, khiến `## 7. Tham khảo` **lọt qua** phép kiểm `grep -q '^## Tham khảo'`. Kiểm bằng `grep -n '^## '` trên các note ngoại lệ, đừng chỉ tin phép kiểm hàng loạt.
- **Viết MOC trước lại cho 0 link gãy ngay lần đầu.** Lần thứ ba liên tiếp. 3 mục hiện ra trong phép kiểm đều là note ngoài folder ([[UIUX]]-style link tới `Math`, `Quant`, `Knowledge Seed Playbook`) — đúng như cảnh báo ở Bước 6.

### 6.5 — Từ lần chạy Blockchain (seed phân tán, folder đích rỗng)

- **Folder đích rỗng không có nghĩa là không có seed.** `2. Areas/Blockchain/` rỗng hoàn toàn. Nếu dừng ở đó và coi đây là greenfield, ta sẽ viết một vault chung chung, bỏ mất 3 báo cáo audit thật (6.187 dòng) đang nằm trong `4. Archived/`. **Bước 1 mới phải là: `grep -ril` từ khoá của area trên toàn vault, không chỉ `ls` folder đích.**
- **Seed có thể đã bị chôn theo cách khác.** Ở đây `grep` phải chạy hai vòng: vòng một tìm từ khoá nội dung (`solidity|ethereum|defi|EVM`), vòng hai đi theo **wikilink từ các file tìm được** — đó là cách phát hiện ~20 stub grammar Solidity (`type-name.md`, `uncheck-block.md`, `modifier-definition.md`…) không chứa từ khoá nào cả. Chúng chiếm hơn một nửa số file seed.
- **Đọc báo cáo dài: lọc code block trước.** 6.187 dòng báo cáo Code4rena, trong đó phần lớn là PoC code lặp lại. Một `awk` thay mọi fenced block bằng `<<code N dòng>>` cắt chi phí đọc còn ~40% mà **không mất lập luận nào** — vì lập luận nằm ở văn xuôi. Giữ nguyên bản gốc trong `_archive-seed/` để tra code khi cần.
- **Xung đột hệ giá trị có thể có *ba* bên, không phải hai.** Ở Quant là hai nguồn; ở Physics là hai phần trong một nguồn; ở đây là **ba vai trò trong cùng một tài liệu** — warden tối ưu điểm, judge tối ưu quy tắc, sponsor tối ưu chi phí. Note bản lề vẫn là lời giải, nhưng cấu trúc của nó phải là một **bảng ba cột** thay vì "khung mạnh vs khung yếu". Không có bên nào yếu.
- **Một seed có thể chứa nhiều mâu thuẫn độc lập.** Lần này cần **hai** note bản lề: một về severity (`Contest Severity vs Real Risk`), một về văn hoá (`Move Fast vs Immutable`). Playbook cũ ngầm giả định mỗi seed có tối đa một. Dấu hiệu để tách: hai mâu thuẫn có **tập note liên quan khác nhau** thì phải là hai note.
- **Phép kiểm link gãy phải loại cả inline code span.** Khi note trích lại chính các link chết của seed (`` `[[Pragmas]]` ``), phép kiểm ở Bước 6 báo link gãy giả. Sửa: `sed 's/`[^`]*`//g'` trước khi `grep -oh '\[\[' `. Đây là biến thể của bẫy frontmatter ở 6.3, và nó sẽ còn gặp lại ở mọi area có nhiều tên định danh trong dấu nháy.
- **Note dạng "hồ sơ" cần *phép kiểm chuyển được*, không cần checklist.** `Case Gondi`/`Case Kakarot` là bản ghi một sự kiện; checklist "áp dụng" không có nghĩa. Thay bằng mục **"Phép kiểm chuyển được sang codebase khác"** — biến một case study thành công cụ dùng lại được. Cùng tinh thần với mục 3.2 nhưng cho note hồ sơ chứ không phải note bản lề.
- **Khi seed nằm ở area khác, việc archive là một quyết định phải kiểm backlink trước.** 39 file được chuyển từ `4. Archived/` sang `_archive-seed/`. An toàn vì mọi wikilink giữa chúng là **nội bộ trong cụm** và Obsidian phân giải theo tên file toàn vault — nhưng phải chạy Bước 2 để biết điều đó, không được đoán.
- **Tỉ lệ nở phụ thuộc *mật độ thông tin*, không phải số dòng.** 6.600 dòng → 68 note (nở ~10× theo dòng), thấp hơn Physics (21×) dù nhiều dòng hơn, vì báo cáo audit **đã** có cấu trúc và trùng lặp cao giữa ba báo cáo. Bổ sung cho bài học 6.3/6.4: ước lượng theo **số khái niệm phân biệt được** sau khi lập bảng `khái niệm → file`, không theo số dòng thô.

### 6.6 — Từ lần chạy Frontend (seed danh mục, vault đã đông đúc)

- **Loại seed thứ tư: danh mục.** Playbook cũ có dàn ý, nguyên liệu thô, và lai. Seed Frontend là loại khác hẳn: **index có cấu trúc nhưng không có chiều sâu** — `CSS guides.md` liệt kê ~70 module CSS, mỗi cái một đoạn mô tả; `Web APIs.md` liệt kê ~150 API, không mô tả nào; `CSS reference.md` là index bảng chữ cái 1.141 dòng. Không phải header rỗng (chúng *có* chữ), cũng không phải nguyên liệu thô (không có lập luận nào để trích). **Mỗi mục trong danh mục là một lời hứa**, và số lượng lời hứa lớn hơn seed dàn ý một bậc.
- **Lời giải cho seed danh mục là note catalogue được sắp lại.** Không thể viết 150 note cho 150 API. Cách làm đúng: giữ **toàn bộ** danh sách (nguyên tắc 2) trong một note catalogue, nhưng **sắp lại theo câu hỏi tra cứu** thay vì theo bảng chữ cái, và gắn mỗi mục vào note đã hệ thống hoá. `Web APIs Map` sắp 150 API theo *"tôi đang cần làm gì"*; `CSS Modules Map` sắp 70 module theo nhóm khái niệm. Bảng chữ cái chỉ tra được khi **đã biết tên** — mà đó đúng là thứ người tra cứu chưa có.
- **⚠️ Bước 3 phải có phép kiểm va chạm tên — đây là bài học lớn nhất của lần chạy này.** Obsidian phân giải `[[wikilink]]` theo **tên file trên toàn vault**. Seed Frontend đầy tên chung chung: `Caching`, `Routing`, `Container`, `Isolation`, `Position`, `Display`, `Size`, `Overflow`, `Gap`, `Order`, `Clear`, `Columns`. Kiểm tra cho thấy các area khác **đã trỏ tới đúng những tên đó**: `[[Caching]]` từ Database (20 file), `[[Routing]]` từ Networking (5 file), `[[Container]]` từ DevOps. Đặt note frontend đúng tên đó sẽ **cướp link của area khác một cách âm thầm** — không lỗi, không cảnh báo, chỉ là 20 note Database đột nhiên trỏ sang một note về CSS. Bước 2 cũ chỉ hỏi *"có ai trỏ tới file tôi sắp đổi tên không"*; nó không bắt được chiều ngược lại. Phép kiểm cần thêm:
  ```bash
  # với MỌI tên note dự định tạo, trước khi viết:
  for n in "${PLANNED[@]}"; do
    hit=$(grep -rl --include="*.md" "\[\[$n\]\]" . | grep -cv "^./<area>/")
    [ "$hit" -gt 0 ] && echo "⚠️  $n  — $hit file ngoài area đang trỏ tới tên này"
  done
  ```
  Lời giải: **tiền tố định danh cho mọi note** — `CSS Cascade & Specificity`, `Next.js Caching Layers`, `Tailwind Spacing & Sizing`, `Frontend Learning Resources`. Nó dài hơn nhưng là điều kiện để nhiều area sống chung trong một vault.
- **Hệ quả: bỏ quy ước `Learning Resources` dùng chung.** Năm area đã có file cùng tên `Learning Resources.md`, nên `[[Learning Resources]]` từ Quant.md hiện đã phân giải tuỳ tiện. Lần này dùng `Frontend Learning Resources` thay vì làm cho vấn đề tệ thêm. **Quy ước nhất quán vẫn thua tính đúng đắn** — và bốn lần chạy trước đã âm thầm tạo ra một va chạm năm chiều mà không ai kiểm.
- **Vault càng đông, ranh giới area càng phải tường minh.** UIUX đã sở hữu `Button`, `Input & Form`, `Modal & Dialog`, `Design System`, `Typography`, `Accessibility`. Frontend chạm cùng những khái niệm đó nhưng từ phía cài đặt. Lời giải: **đặt tên theo góc nhìn** (`Accessible Markup & ARIA` vs `Accessibility`, `CSS Typography` vs `Typography`), chỉ link sang chứ không định nghĩa lại, và **ghi rõ trong MOC** danh sách khái niệm "có nhà ở area khác". Không có mục đó thì sáu tháng sau ta sẽ viết trùng.
- **Xung đột hệ giá trị có thể nằm trên trục *thời gian*, không chỉ trục nội dung.** Ở Quant là hai nguồn; ở Physics là hai phần trong một nguồn; ở Blockchain là ba vai trò trong một tài liệu. Ở đây, hai khối seed không mâu thuẫn về *nội dung* mà về **chu kỳ bán rã**: MDN (2.810 dòng, đổi theo thập kỷ) và tài liệu stack (~1.200 dòng, đổi theo năm). Dấu hiệu nhận biết mới: **nguồn tự khai báo là tạm thời** — bài viết tên *"[2025]"* viết tháng 12/2024, tự nói *"tôi sẽ chọn stack khác nếu bắt đầu hôm nay"*, và khuyến nghị một thư viện (Lucia) **đã deprecated ngay lúc viết**. Note bản lề cho loại xung đột này không so hai khung mạnh/yếu mà **phân tầng theo tốc độ thay đổi** và đặt phép kiểm *"kiểm ngày trước khi đọc nội dung"*.
- **Xác nhận lại: hai mâu thuẫn độc lập → hai note bản lề.** Bài học 6.5 nói dấu hiệu tách là "tập note liên quan khác nhau". Lần này đúng y hệt: `Utility-First vs Cascade` phục vụ cụm 04 (Tailwind) và cụm 01 (CSS lõi); `Framework Churn vs Platform Longevity` phục vụ cụm 08–09 (vận hành, lộ trình). Hai tập gần như không giao nhau.
- **Tỉ lệ nở thấp nhất trong năm lần chạy — và đó là đúng.** 3.944 dòng → 8.836 dòng (2,2×), so với Physics 21× và Blockchain 10×. Lý do: seed danh mục **đã có sẵn bề rộng**, cái thiếu là chiều sâu; phần lớn công việc là *thay thế* một dòng link bằng một mục có nội dung, không phải *thêm* mục mới. Nhưng số **từ** thì cao nhất (~75.000). Bổ sung cho 6.5: ước lượng theo **số khái niệm phân biệt được**, và biết rằng seed danh mục cho tỉ lệ dòng thấp nhưng mật độ từ cao nhất.
- **Header rỗng ở loại seed này nằm trong wikilink gãy — nhưng chỉ một nửa.** `Tailwind CSS.md` có ~150 mục; `Routing.md` kết thúc bằng đúng 15 wikilink gãy; `NextJS.md` có 18 mục. Phép kiểm rẻ để tìm chúng — **chạy phép kiểm link gãy của Bước 6 lên chính seed, trước khi bắt đầu**:
  ```bash
  grep -oh '\[\[[^]|]*' _archive-seed/*/*.md | sed 's/\[\[//' | sort -u > /tmp/seed-links.txt
  find _archive-seed -name '*.md' -exec basename {} .md \; | sort -u > /tmp/seed-notes.txt
  comm -23 /tmp/seed-links.txt /tmp/seed-notes.txt   # = một nửa danh sách việc
  ```
  Ở đây nó cho ra **82 mục** ngay lập tức, không cần đọc thủ công.
  > ⚠️ **Nhưng nó bỏ sót đúng một nửa.** Trong cùng hai file MOC đó còn **83 mục viết dạng text thường**, không phải wikilink — `Dark mode`, `Configuring`, `Background attachment`, `Box shadow`, `Fast Refresh`… Chúng là header rỗng y hệt nhưng vô hình với phép kiểm link. Phải đếm riêng:
  > ```bash
  > grep -vc '^\[\[\|^#\|^$' <file MOC của seed>
  > ```
  > Tổng danh sách việc thật ở đây là **82 + 83 = 165 mục**, gấp đôi con số phép kiểm tự động báo. Bài học: với seed danh mục, **phép kiểm link chỉ là bước một** — luôn đối chiếu bằng số dòng của chính file MOC.
- **Clipping từ web app có thể mất sạch code block.** File `How to set up surveys in Next.js - PostHog.md` giữ nguyên toàn bộ văn xuôi nhưng **mọi khối ```` ``` ```` đều rỗng**. Văn xuôi còn đủ để khôi phục lại code, nhưng phải nhận ra điều đó thay vì chép lại một tutorial rỗng. Biến thể của bài học 6.4 về rác giao diện web app: **kiểm `grep -c '^```' ` và đối chiếu với số khối có nội dung**.

### 6.7 — Từ lần chạy GIS (seed lộ trình, và khoảng trống vô hình)

- **⚠️ Bài học lớn nhất: header rỗng đáng giá nhất có thể là một mục *không tồn tại*.** Năm lần chạy trước đều tìm việc *bên trong* seed — header không có chữ (UIUX), câu lỗi lặp lại (Physics), wikilink gãy và dòng text thường (Frontend). Seed GIS không có mục nào rỗng cả: 13 mục đều có mô tả và link đầy đủ. Nhưng nó **không nhắc một lần nào** tới **hệ toạ độ / phép chiếu** và **viễn thám** — hai mảng chiếm trọn hai thư mục (`01`, `06`) và ~20% khối lượng vault. Đây là **khoảng trống im lặng**: không phải mục trống, mà là mục *chưa bao giờ được viết ra*.
  > **Phép kiểm mới, bổ sung cho Bước 1:** đối chiếu seed với một **dàn ý lĩnh vực độc lập** (mục lục một sách giáo khoa chuẩn, chương trình một khoá đại học), không chỉ đối chiếu seed với chính nó. Hỏi: *"một người trong ngành sẽ ngạc nhiên vì thiếu cái gì?"* Phép kiểm link gãy và phép đếm dòng của 6.6 **không thể** bắt được loại này — chúng chỉ thấy được cái seed đã viết ra.
- **Loại seed thứ tư có một biến thể: seed *lộ trình*.** Giống seed danh mục (6.6) ở chỗ toàn link và không có chiều sâu, nhưng khác ở **đơn vị của lời hứa**: `Web APIs.md` hứa ~150 *khái niệm*; `## Databases` của seed GIS hứa cả một *môn học*. Hệ quả cho ước lượng: **215 dòng → 67.950 từ**, tỉ lệ nở theo dòng ~330× — cao gấp 15 lần Physics (21×) và gấp 150 lần Frontend (2,2×). Bổ sung cho 6.5/6.6: **đếm số *môn* seed hứa, không đếm số dòng và cũng không đếm số mục.**
- **Xung đột thời gian có thể nằm trong *một bảng*, không phải giữa hai khối tài liệu.** Ở Frontend, hai khối seed có chu kỳ bán rã khác nhau (MDN vs tài liệu stack) — tách được bằng mắt. Ở đây, **cùng một bảng markdown** đặt cạnh nhau: một nguyên lý bền hàng thập kỷ (PostGIS, SQL), một công cụ đã tắt (ArcMap), một số phiên bản (Angular 7, Django 2.1), và **một cái giá tiền** (`$23–50/month`) — tất cả cùng một giọng, cùng một định dạng, không mục nào có ngày. Dấu hiệu nhận biết mới, rất rẻ: **grep tìm ký hiệu tiền tệ và số phiên bản trong URL** (`/3.4/`, `/2.1/`, `fa18`, `gds18`). Chúng đánh dấu chính xác những dòng có chu kỳ bán rã ngắn nhất.
- **Xác nhận dự báo va chạm tên của 6.6 — và nó đã tệ hơn.** Chạy phép kiểm ở 6.6 trên 65 tên dự định: `Learning Resources` nay va chạm **4 file** (Quant, Math, Physics, Blockchain) đúng như cảnh báo, cộng thêm ba va chạm mới chưa được ghi: `Glossary` (DS&AL), `Performance Tuning` (Database), `Routing` (Networking + Frontend). Tiền tố định danh (`GIS Learning Resources`, `GIS Glossary`, `PostGIS Performance Tuning`, `Network Analysis and Routing`) cho **0 va chạm** trên 65 tên. **Phép kiểm này giờ là bắt buộc ở Bước 3, không phải khuyến nghị.**
- **Nguyên tắc 2 kiểm được bằng máy khi seed toàn link.** Không cần đọc lại để chắc "không vứt gì đi" — trích URL hai bên rồi `comm`:
  ```bash
  grep -oh 'https\?://[^)]*' _archive-seed/*.md | sort -u > /tmp/seed-urls.txt
  grep -oh 'https\?://[^)]*' <note catalogue>.md | sort -u > /tmp/cat-urls.txt
  comm -23 /tmp/seed-urls.txt /tmp/cat-urls.txt   # phải rỗng
  ```
  Ở đây nó xác nhận **68/68 link** được giữ. Rẻ, tuyệt đối, và làm được ngay sau khi viết note catalogue — dùng cho mọi seed danh mục về sau.
- **Note catalogue nên mang thêm cột "Trạng thái".** 6.6 nói giữ toàn bộ danh mục và sắp lại theo câu hỏi tra cứu. Lần này thêm một cột: mỗi mục được đánh dấu *còn hoạt động / ⚠️ kiểm lại / ❌ đã tắt*. Nó thoả nguyên tắc 2 (không xoá gì) mà vẫn không giới thiệu một link chết như thể nó còn mới — và nó là chỗ neo cho note bản lề.
- **Vault đông thì seed mới phải khai báo ranh giới *trước khi viết*, không phải sau.** Trước Bước 4, đã grep ra `Hedonic Pricing and GIS` (ML), `PostgreSQL` và `Performance Tuning` (Database) — ba khái niệm GIS chạm tới nhưng đã có nhà. Mục **"Khái niệm có nhà ở area khác"** trong MOC được viết *trước* các note, nên không note nào định nghĩa lại chúng. 6.6 đề xuất mục này; lần này xác nhận nó phải nằm trong **Bước 3**, cùng phép kiểm va chạm tên.
- **Viết MOC trước lại cho 0 link gãy — lần thứ tư liên tiếp.** 870 wikilink, 78 đích, 0 gãy ngay lần đầu. 11 mục hiện ra trong phép kiểm đều là note ngoài folder và đều tồn tại thật. Một lần duy nhất phải sửa: một `[[GeoParquet]]` viết theo quán tính giữa lúc soạn note — **bắt được ngay vì nó không có trong MOC.** Đó chính là tác dụng "khoá danh sách tên file" của Bước 4, quan sát được trực tiếp.

### 6.8 — Từ lần chạy SEO (không có seed, và động cơ của nguồn)

- **⚠️ Bài học lớn nhất: loại seed thứ năm là *không có seed*.** 6.5 dạy rằng folder đích rỗng không có nghĩa là không có seed — phải `grep` toàn vault. Lần này đã chạy đúng quy trình 6.5: vòng một grep từ khoá nội dung (`seo|serp|backlink|keyword research|core web vitals|sitemap|schema.org|robots\.txt`), vòng hai grep từ khoá lân cận (`content marketing|link building|organic traffic|google analytics`), cộng `find` toàn bộ `0. Inbox/`, `Clippings/`, `0. Readwise/`, `4. Archived/`. **Kết quả: 0 file seed.** Mọi kết quả grep đều là note đã hệ thống hoá ở area khác (Frontend, UIUX, Backend).
  > **Bổ sung cho Bước 1:** phải phân biệt ba trạng thái, không phải hai. (a) *Seed ở folder đích* — UIUX, Quant, Physics, Frontend, GIS. (b) *Seed bị chôn ở nơi khác* — Blockchain. (c) **Không có seed** — SEO. Chỉ kết luận (c) **sau khi** đã chạy đủ hai vòng grep của 6.5; kết luận (c) quá sớm là cách bỏ mất một seed thật.
  > **Và điều quan trọng nhất:** ở trạng thái (c), **nguyên tắc 2 không áp dụng được** — không có gì để "không vứt đi", không có `_archive-seed/` để đối chiếu, phép kiểm URL của 6.7 vô nghĩa. Checklist nghiệm thu mất 3 mục. Rủi ro dịch chuyển hoàn toàn: không phải *bỏ sót seed* mà là **bỏ sót lĩnh vực**.
- **Khi không có seed, phép kiểm "dàn ý lĩnh vực độc lập" của 6.7 chuyển từ *bổ sung* thành *toàn bộ Bước 1*.** Ở GIS nó là phép kiểm chéo để tìm khoảng trống im lặng. Ở đây nó **là** nguồn duy nhất của cây thư mục. Dàn ý được dựng từ bốn nguồn độc lập (Google Search Central docs, Moz Beginner's Guide, chương trình Ahrefs/Semrush academy, mục lục Search Engine Land) rồi lấy hợp của chúng — không lấy giao, vì mỗi nguồn có điểm mù riêng (Google không nói về link building, Ahrefs không nói về chính sách spam).
- **Phép kiểm va chạm tên của 6.6/6.7 lần đầu cho 0 va chạm — và lý do đáng ghi lại.** 67/67 tên sạch, so với GIS (7 va chạm trên 65 tên). Không phải may: mọi tên chung chung đã được **tiền tố hoá ngay từ lúc soạn danh sách** (`SEO Learning Resources`, `SEO Glossary`, `SEO Audit Playbook`, `Core Web Vitals for SEO`, `GA4 for SEO`, `HTTP Status Codes for SEO`). 6.7 nói phép kiểm này là bắt buộc; lần này cho thấy **áp quy ước tiền tệ trước rồi mới kiểm thì phép kiểm trở thành xác nhận, không phải phát hiện** — rẻ hơn nhiều so với sửa sau.
- **Loại xung đột thứ năm: xung đột *động cơ*, không phải xung đột nội dung.** Bốn lần trước, mâu thuẫn nằm giữa hai khung giá trị (Quant), hai phần một nguồn (Physics), ba vai trò (Blockchain), hai chu kỳ bán rã (Frontend/GIS). Ở SEO, ba nguồn **nói về cùng một hệ thống** nhưng mỗi nguồn có động cơ bóp méo riêng: Google không thể mô tả cơ chế mà không tạo ra cách khai thác nó; công cụ SEO bán sản phẩm nên cần kết luận hấp dẫn; tài liệu rò rỉ không có động cơ nhưng cũng không có ngữ cảnh. **Cấu trúc note bản lề phải là bảng "nguồn × động cơ", không phải "khung mạnh vs khung yếu"** — và nó phải có một mục **"nơi ba nguồn đồng thuận"**, vì hoá ra ~80% công việc nằm ở đó và tranh cãi về 20% còn lại làm người đọc quên mất điều này.
- **Hai note bản lề lần này hỏi hai câu hỏi *trực giao*, không phải phục vụ hai cụm note khác nhau.** 6.5/6.6 nói dấu hiệu tách bản lề là "tập note liên quan khác nhau". Ở đây tập note gần như **trùng nhau**, nhưng vẫn phải tách vì hai câu hỏi độc lập: `Google Guidance vs Observed Behavior` hỏi *"nguồn này đáng tin tới đâu?"*; `SEO Tactics Half-Life` hỏi *"nguồn này còn đúng không?"* Một tuyên bố có thể đáng tin mà đã hết hạn, hoặc còn hiệu lực mà không đáng tin. **Bổ sung dấu hiệu tách thứ hai: hai mâu thuẫn có *trục* khác nhau thì phải là hai note, dù phục vụ cùng một tập.**
- **Lĩnh vực có nghĩa địa chiến thuật thì nghĩa địa đó phải thành một bảng.** SEO có một lượng lớn chiến thuật đã chết vẫn được khuyên rộng rãi (`<meta keywords>` chết 2009, `rel=next/prev` 2019, FAQ rich result 8/2023, PageRank sculpting 2009…). Gom chúng thành **một bảng "đã chết — chết khi nào — vẫn được khuyên ở đâu"** trong note bản lề làm được việc mà cảnh báo rải rác không làm được: nó biến "hãy cẩn thận với nội dung cũ" thành một danh sách tra cứu được. Áp dụng lại cho mọi area có chu kỳ bán rã ngắn.
- **Note catalogue có cột Trạng thái (6.7) nên có thêm một *bảng* trạng thái ❌ riêng.** GIS đánh dấu trạng thái trong cùng bảng. Lần này tách hẳn mục **"Đã ngừng hoạt động — đừng tìm nữa"** ra khỏi các bảng chính. Lý do: mục đích khác nhau — bảng chính trả lời *"tôi nên dùng gì"*, bảng ❌ trả lời *"vì sao tôi không tìm thấy thứ tài liệu này nhắc tới"*. Trộn chung thì mục đích thứ hai bị chôn.
- **Viết MOC trước lại cho 0 link gãy — lần thứ năm liên tiếp.** 1.211 wikilink, 68 đích nội bộ, 0 gãy. 19 mục hiện ra trong phép kiểm đều là note ngoài folder và cả 19 đều tồn tại thật. **Hai** lần phải sửa giữa chừng, cả hai đều là wikilink viết theo quán tính không có trong MOC: `[[Google Trends]]` (đang viết về công cụ) và `[[Indexing API]]` (đang viết về tốc độ index tin). Cùng mẫu với `[[GeoParquet]]` ở GIS — **quán tính wikilink xảy ra khi đang liệt kê công cụ hoặc API, không phải khi đang liệt kê khái niệm.** Bắt được ngay nhờ MOC đã khoá danh sách tên.
- **`status` frontmatter làm được việc mà cảnh báo không làm được, khi lĩnh vực có nhiều tầng tốc độ.** 51 `evergreen` / 15 `growing` / 2 `seed` — và phân bố này **không ngẫu nhiên**: `seed` rơi đúng vào hai note AI Search, `growing` rơi vào các note chiến thuật T3/T4. Note bản lề `SEO Tactics Half-Life` chỉ thẳng vào quy ước này (*"đọc `status` trước khi đọc nội dung"*), biến một trường frontmatter trang trí thành **chỉ báo độ tươi dùng được**. Áp dụng lại cho mọi area trộn nhiều tốc độ thay đổi.

## Liên kết
[[UIUX]] · [[Quant]] · [[Physics]] · [[Blockchain]] · [[Frontend]] · [[GIS]] · [[SEO]] — bảy lần chạy tham chiếu, xem kết quả đầy đủ ở đó.
