---
tags: [dsal, foundations, complexity]
status: evergreen
---
# Big-O Analysis

> Big-O không phải bài toán toán học trong phỏng vấn — nó là **công cụ chọn thuật toán**. Nhìn constraint `n` là biết được phép dùng thuật toán nào; đó mới là giá trị thật.

## 1. Khái niệm cốt lõi

`f(n) = O(g(n))` ⟺ tồn tại `c > 0, n₀` sao cho `f(n) ≤ c·g(n)` với mọi `n ≥ n₀`.
Trong phỏng vấn: **bỏ hằng số, bỏ thành phần bậc thấp** — `3n² + 100n + 5 = O(n²)`.

| Notation | Tên | Ví dụ điển hình |
| --- | --- | --- |
| `O(1)` | Constant | Hash lookup, push/pop stack |
| `O(log n)` | Logarithm | [[Binary Search]] |
| `O(n)` | Linear | Duyệt mảng một lượt |
| `O(n log n)` | Linearithmic | Sort, build segment tree |
| `O(n²)` | Quadratic | Hai vòng for lồng nhau |
| `O(2^n)` | Exponential | Liệt kê subset ([[Bitmask DP]]) |
| `O(n!)` | Factorial | Liệt kê hoán vị ([[Backtracking]]) |

## 2. Nguyên tắc tính

1. **Tuần tự** `a(); b();` → `O(a + b)`, thực tế lấy max.
2. **Lồng nhau** → nhân: `O(n × n) = O(n²)`.
3. **Đệ quy**: 1 nhánh chia đôi → `O(log n)`; 2 nhánh chia đôi, mỗi tầng `O(n)` → `O(n log n)`; 2 nhánh không chia → `O(2^n)`.
4. **Master theorem** cho `T(n) = aT(n/b) + f(n)` — xem chi tiết ở [[Divide and Conquer]]:
   - `a = b`, `f = n` → `O(n log n)` (merge sort)
   - `a = 1, b = 2`, `f = 1` → `O(log n)` (binary search)
   - `a = 2, b = 2`, `f = 1` → `O(n)`
5. **Amortized**: một số op đôi khi chậm nhưng trung bình nhanh — `list.append()` là `O(1)` amortized dù có resize; DSU với path compression là `O(α(n))` ([[Union Find]]).

## 3. Bảng constraint → thuật toán được phép

Đây là bảng quan trọng nhất của cả note. Đọc constraint **trước** khi nghĩ thuật toán.

| `n` | Cho phép | Pattern gợi ý |
| --- | --- | --- |
| `n ≤ 10` | `O(n!)` | Brute force hoán vị |
| `n ≤ 20` | `O(2^n)` | [[Bitmask DP]] |
| `n ≤ 5000` | `O(n²)` | DP 2D, brute force cặp |
| `n ≤ 10^5` | `O(n log n)` / `O(n)` | Sort, heap, [[Sliding Window]], [[Binary Search]] |
| `n ≤ 10^7` | `O(n)` strict | Một lượt duyệt, [[Prefix Sum]] |
| `n ≤ 10^9` | `O(log n)` | [[Search on Answer]] |

## 4. Cạm bẫy

- **Quên space complexity.** Recursion stack tính vào space — DFS đệ quy trên grid `1000×1000` có thể vượt limit ([[Island Matrix Traversal]]).
- **Hằng số lớn**: `O(n)` với hằng số 1000 chậm hơn `O(n²)` khi `n` nhỏ. Đừng "tối ưu" một cách máy móc.
- **Nhầm amortized với worst-case.** Hash table `O(1)` là amortized; adversary có thể tấn công collision → worst `O(n)`.
- **Quên chi phí slicing trong Python**: `lst[a:b]` là `O(b-a)` copy, không phải `O(1)`. Nằm trong vòng lặp là biến `O(n)` thành `O(n²)`.
- **Đếm nhầm heap**: `heapify` là `O(n)`, không phải `O(n log n)`; nhưng `n` lần `heappush` thì đúng là `O(n log n)` ([[Heap]]).

## 5. Checklist áp dụng

- [ ] Đã đọc constraint `n` và suy ra "trần" độ phức tạp cho phép chưa?
- [ ] Đã tính cả **time và space** chưa?
- [ ] Recursion stack đã được tính vào space chưa?
- [ ] Có thao tác Python ẩn `O(n)` nào (slicing, `in` trên list, `pop(0)`) nằm trong vòng lặp không?
- [ ] Nếu là amortized, đã nói rõ "amortized" với interviewer chưa?

## Tham khảo

- [Python Wiki — Time Complexity](https://wiki.python.org/moin/TimeComplexity) — chi phí thật của list/dict/set/deque
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) — bảng tra nhanh cấu trúc dữ liệu & sort
- [CLRS — Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — Chương 3 (Growth of Functions) và 4 (Master theorem)
- [Competitive Programming Handbook — Antti Laaksonen](https://cses.fi/book/book.pdf) — Chương 2, phần "Estimating efficiency"

## Liên kết
[[Interview Process UMPIRE]] · [[Divide and Conquer]] · [[Python Interview Toolkit]] · [[Pattern Selection Map]] · [[DS&AL]]
