---
tags: [dsal, technique, interval]
status: evergreen
---
# Interval

> Khoảng `[start, end]` là pattern bao trùm họ bài calendar / scheduling / booking. Không thể tránh khi phỏng vấn các công ty làm lịch (Google Calendar) và đặt phòng (Airbnb, Booking). Mọi bài interval đều bắt đầu bằng **sort**.

## 1. Bốn thao tác chuẩn trên hai interval

```
A = [a1, a2], B = [b1, b2]

1. Tách rời (disjoint):   A.end < B.start   → A trước B, không giao
2. Chạm điểm (touch):     A.end == B.start  → liền kề, merge hay không tuỳ đề
3. Giao một phần:         A.start < B.start ≤ A.end < B.end
4. Chứa nhau (contain):   A.start ≤ B.start ≤ B.end ≤ A.end
```

## 2. Template code

```python
def merge_two(a, b):
    return [min(a[0], b[0]), max(a[1], b[1])]

def overlaps(a, b) -> bool:
    return a[0] <= b[1] and b[0] <= a[1]      # kể cả chỉ chạm điểm

# Sweep line — khung chung cho mọi bài "đếm overlap tối đa"
events = []
for s, e in intervals:
    events.append((s, +1))      # mở
    events.append((e, -1))      # đóng
events.sort()
cur = peak = 0
for _, delta in events:
    cur += delta
    peak = max(peak, cur)
```

## 3. Convention checklist — đọc trước khi code

1. **Đóng `[s, e]`** hay **nửa mở `[s, e)`**?
   - LeetCode mặc định **đóng**: `[1,3]` và `[3,5]` **chạm nhau** ⇒ merge.
   - Một số bài lịch dùng nửa mở: `[1,3)` và `[3,5)` **không** đè nhau.
2. **Sort theo `start`** (Merge, Insert) hay **sort theo `end`** (Greedy chọn nhiều nhất, Min Arrows)?
3. **Sweep line tie-break** khi hai event cùng thời điểm `t`:
   - Đếm phòng họp: **kết thúc trước, bắt đầu sau** → tránh đếm dư.
   - Skyline (LC 218): start trước end nếu cùng `x`, nhưng cẩn thận chiều cao.

## 4. Cạm bẫy

- **Nhầm quy ước đóng/mở** → sai đúng một đơn vị ở mọi test có điểm chạm.
- **Sort sai khoá**: bài "giữ nhiều interval nhất / xoá ít nhất" phải sort theo **end** (greedy stay-ahead, xem [[Greedy]]), không phải start.
- **Sweep line tie-break sai** → đếm dư một phòng.
- **Insert Interval** quên ba giai đoạn: phần trước (không giao), phần gộp, phần sau.
- **Employee Free Time** quên rằng free time là **phần bù** của busy đã merge, và bỏ khoảng đầu/cuối.

**Employee Free Time — hình dung:**
```
e1: |==1==|       |==3==|
e2:    |==2==|       |==4==|
gộp tất cả → busy: [1∪2] [3∪4]
free = phần bù giữa các khối busy
```

## 5. Bài kinh điển

| LC | Bài | Trick |
| --- | --- | --- |
| [56](https://leetcode.com/problems/merge-intervals/) | Merge Intervals | Sort theo start + gộp ([[Sorting]]) |
| [57](https://leetcode.com/problems/insert-interval/) | Insert Interval | Ba giai đoạn |
| [435](https://leetcode.com/problems/non-overlapping-intervals/) | Non-overlapping Intervals | Sort theo **end**, greedy |
| [253](https://leetcode.com/problems/meeting-rooms-ii/) | Meeting Rooms II | Heap / sweep line ([[Heap]]) |
| [452](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) | Min Arrows to Burst Balloons | Sort theo end + đếm nhóm |
| [759](https://leetcode.com/problems/employee-free-time/) | Employee Free Time | Merge tất cả + lấy phần bù |

**Tự luyện:** LC 252, 986, 1851, 763, 1288.

## 6. Checklist áp dụng

- [ ] Interval đóng hay nửa mở? Điểm chạm có tính là overlap không?
- [ ] Sort theo start hay end? (giữ nhiều nhất → end)
- [ ] Nếu sweep line: tie-break end-trước-start đã đúng chưa?
- [ ] Đã xử lý danh sách rỗng và interval đơn lẻ chưa?
- [ ] Bài có hỏi "lịch cụ thể" không? (→ heap thay vì sweep)

## Tham khảo

- [LeetCode — Intervals tag](https://leetcode.com/tag/line-sweep/)
- [USACO Guide — Sweep Line](https://usaco.guide/plat/sweep-line)
- [Wikipedia — Interval scheduling](https://en.wikipedia.org/wiki/Interval_scheduling) — chứng minh greedy sort-by-end
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 30: Sweep line algorithms

## Liên kết
[[Sorting]] · [[Greedy]] · [[Heap]] · [[System Design Hybrid]] · [[DS&AL]]
