---
tags: [dsal, technique, prefix-sum]
status: evergreen
---
# Prefix Sum

> `P[i] = arr[0] + … + arr[i-1]` cho phép tính tổng đoạn `[l, r]` trong `O(1)`: `P[r+1] - P[l]`. Đây là gateway cho họ bài "đếm subarray theo điều kiện", và là nền của Fenwick Tree ([[Advanced Tree]]).

## 1. Khi nào dùng

- Đếm / tính tổng subarray theo điều kiện — kể cả khi mảng **có số âm** (chỗ [[Sliding Window]] bó tay).
- Range sum query khi mảng **immutable**. Mảng có update → chuyển sang Fenwick/Segment ([[Advanced Tree]]).
- Mở rộng 2D (Range Sum Query 2D).
- Pattern "prefix sum mod K" để đếm subarray chia hết.

## 2. Template code

```python
# 1) Prefix sum 1D — quy ước P[0] = 0
P = [0] * (n + 1)
for i in range(n):
    P[i + 1] = P[i] + arr[i]
sum_lr = P[r + 1] - P[l]              # tổng arr[l..r] inclusive

# 2) Prefix sum + hash: đếm subarray có tổng = K
from collections import defaultdict
def count_subarray_sum_k(arr, k):
    counts = defaultdict(int); counts[0] = 1
    cur = result = 0
    for x in arr:
        cur += x
        result += counts[cur - k]
        counts[cur] += 1
    return result

# 3) Prefix sum 2D
P = [[0] * (cols + 1) for _ in range(rows + 1)]
for r in range(rows):
    for c in range(cols):
        P[r+1][c+1] = mat[r][c] + P[r][c+1] + P[r+1][c] - P[r][c]
# Tổng rect (r1,c1) → (r2,c2):
# P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
```

## 3. Vì sao `P[0] = 0`

```
arr:  [ a0, a1, a2, a3 ]
P:    [  0, a0, a0+a1, a0+a1+a2, a0+a1+a2+a3 ]
       P[0] P[1]  P[2]     P[3]       P[4]
```
Không có `P[0] = 0` thì công thức `P[r+1] - P[l]` phải có case riêng cho `l == 0` — nguồn bug off-by-one kinh điển.

## 4. Cạm bẫy

- **Nhầm inclusive/exclusive** — viết rõ quy ước ra comment trước khi code.
- **Modulo với số âm**: Python `%` luôn trả `[0, k)` nên an toàn; Java/C++ cần `((x % k) + k) % k`. Nói rõ điều này nếu interviewer dùng ngôn ngữ khác ([[Python Interview Toolkit]]).
- **Continuous Subarray Sum (LC 523)**: yêu cầu độ dài `≥ 2` ⇒ chỉ lưu **index đầu tiên** của mỗi giá trị modulo, và so `j - i ≥ 2`.
- **Product Except Self** dùng prefix×suffix **nhân**, không phải trừ — khởi tạo `left = right = 1`, không cần `P[0]` riêng.
- **Prefix sum 2D quên inclusion-exclusion** (cộng lại phần bị trừ hai lần).

## 5. Bài kinh điển

| LC                                                                 | Bài                          | Trick                           |
| ------------------------------------------------------------------ | ---------------------------- | ------------------------------- |
| [303](https://leetcode.com/problems/range-sum-query-immutable/)    | Range Sum Query - Immutable  | Prefix 1D                       |
| [560](https://leetcode.com/problems/subarray-sum-equals-k/)        | Subarray Sum Equals K        | Prefix + hash ([[Hash Table]])  |
| [523](https://leetcode.com/problems/continuous-subarray-sum/)      | Continuous Subarray Sum      | Prefix mod k + index đầu tiên   |
| [304](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Range Sum Query 2D           | Inclusion-exclusion             |
| [238](https://leetcode.com/problems/product-of-array-except-self/) | Product of Array Except Self | Prefix × suffix                 |
| [724](https://leetcode.com/problems/find-pivot-index/)             | Find Pivot Index             | `left == total - left - arr[i]` |

**Tự luyện:** LC 525, 974, 1248, 1314, 1352, 1769, 1989.

## 6. Checklist áp dụng

- [ ] Đã dùng quy ước `P[0] = 0` chưa?
- [ ] Đoạn cần tính là inclusive hay exclusive?
- [ ] Mảng có update không? (có → Fenwick/Segment thay vì prefix)
- [ ] Nếu đếm theo modulo: đã xử lý số âm chưa? Đã lưu index **đầu tiên** chưa?
- [ ] 2D: công thức inclusion-exclusion đã đủ 4 số hạng chưa?

## Tham khảo

- [USACO Guide — Prefix Sums](https://usaco.guide/silver/prefix-sums) và [2D Prefix Sums](https://usaco.guide/silver/more-prefix-sums)
- [Python docs — itertools.accumulate](https://docs.python.org/3/library/itertools.html#itertools.accumulate)
- [cp-algorithms — Fenwick Tree](https://cp-algorithms.com/data_structures/fenwick.html) — bước tiếp theo khi mảng có update
- [Competitive Programming Handbook](https://cses.fi/book/book.pdf) — Chương 9: Range queries

## Liên kết
[[Array]] · [[Hash Table]] · [[Sliding Window]] · [[Advanced Tree]] · [[Binary Search with DP]] · [[DS&AL]]
