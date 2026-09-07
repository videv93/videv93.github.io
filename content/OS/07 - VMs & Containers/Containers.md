---
tags: [os, virtualization, containers]
status: evergreen
---
# Containers

> Container **không phải máy ảo nhẹ** — nó là một [[Process]] bình thường của Linux, bị giới hạn tầm nhìn (namespace), giới hạn tài nguyên (cgroup), và giới hạn quyền (capability, seccomp, LSM). Không có "container object" nào trong kernel cả.

## 1. Ba trụ cột
| Trụ cột | Vai trò | Cơ chế |
|---|---|---|
| **Namespace** | "**tôi thấy gì**" | cách ly view của tài nguyên |
| **cgroup** | "**tôi dùng được bao nhiêu**" | giới hạn và đo CPU, RAM, I/O, pid |
| **Security** | "**tôi được làm gì**" | capability, seccomp, AppArmor/SELinux, user namespace |

## 2. Các namespace
| Namespace | Cách ly |
|---|---|
| `mnt` | cây thư mục (mỗi container một rootfs) |
| `pid` | bảng pid — process đầu tiên thấy mình là PID 1 |
| `net` | interface, bảng định tuyến, cổng |
| `ipc` | shared memory, semaphore System V |
| `uts` | hostname |
| `user` | ánh xạ uid — **root trong container ≠ root trên host** |
| `cgroup`, `time` | view của cgroup, đồng hồ |

**User namespace là namespace quan trọng nhất về mặt bảo mật** — không có nó, root trong container về cơ bản là root trên host nếu thoát ra được.

## 3. cgroup v2 — các control quan trọng
| Controller | Tham số chính | Ghi chú |
|---|---|---|
| `cpu` | `cpu.weight` (tỉ lệ), `cpu.max` (trần cứng) | xem [[Proportional Share Scheduling]] |
| `memory` | `memory.max` (OOM khi vượt), `memory.high` (**áp lực mềm**, throttle) | `memory.high` nên dùng trước `memory.max` |
| `io` | `io.max`, `io.weight` | hoạt động tốt nhất với thiết bị block trực tiếp |
| `pids` | `pids.max` | chống fork bomb |
| — | `*.pressure` (PSI) | tín hiệu tốt nhất để tự động scale |

## 4. Image và filesystem
- **Layer + union filesystem** (overlayfs): image là chồng các layer read-only, container thêm một layer ghi được.
- **Copy-on-write ở mức file**: sửa một file lớn trong layer dưới → copy **toàn bộ file** lên layer trên. Với DB file thì đây là thảm hoạ → luôn dùng **volume** cho dữ liệu.
- Layer chia sẻ giữa các container → tiết kiệm đĩa và thời gian pull.

## 5. Cạm bẫy
- **Container thấy CPU/RAM của **host**, không phải của cgroup.** JVM cũ, Go `GOMAXPROCS`, `nproc`, thread pool tự động đều bị lừa → tạo quá nhiều thread. Đặt tường minh (`GOMAXPROCS`, `-XX:ActiveProcessorCount`) hoặc dùng runtime có nhận biết cgroup.
- **CPU limit gây throttling** với đuôi latency rất xấu → xem [[Proportional Share Scheduling]] mục 5.
- **PID 1 không reap zombie và không xử lý signal** → dùng `--init`/tini, nếu không container không dừng đúng cách và tích tụ zombie ([[Process]]).
- **Chạy bằng root** trong container mà không có user namespace.
- **Ghi dữ liệu vào layer container** thay vì volume → mất khi container bị xoá, và chậm.
- **`--privileged`** — vô hiệu gần như mọi lớp bảo vệ; gần tương đương cho root trên host.
- **Coi container là ranh giới bảo mật mạnh** — bề mặt tấn công là **toàn bộ syscall của kernel chung**. Với multi-tenant không tin cậy, dùng [[Virtual Machine Monitor]] hoặc gVisor/Kata.

## 6. Checklist áp dụng
- [ ] Container chạy dưới user non-root chưa? User namespace có bật không?
- [ ] `cpu.max` có gây throttling không? (`cat /sys/fs/cgroup/.../cpu.stat` → `nr_throttled`)
- [ ] Runtime có nhận biết giới hạn cgroup không (`GOMAXPROCS`, JVM flags, thread pool)?
- [ ] Có `--init` / tini để reap zombie và forward signal không?
- [ ] Dữ liệu bền có nằm trên volume, không phải trên layer ghi không?
- [ ] Có seccomp profile và drop capability không cần thiết chưa (`--cap-drop=ALL` rồi thêm lại)?
- [ ] Có `--privileged` ở đâu không? Vì sao?

## Tham khảo
- `namespaces(7)`: https://man7.org/linux/man-pages/man7/namespaces.7.html
- cgroup v2: https://docs.kernel.org/admin-guide/cgroup-v2.html
- `capabilities(7)`: https://man7.org/linux/man-pages/man7/capabilities.7.html
- Chris Down — *cgroupv2: Linux's new unified control group system*: https://chrisdown.name/talks/cgroupv2/
- gVisor / Kata Containers — sandbox mạnh hơn: https://gvisor.dev/

## Liên kết
[[Virtual Machine Monitor]] · [[Process]] · [[Access Control]] · [[Proportional Share Scheduling]] · [[OS]]
