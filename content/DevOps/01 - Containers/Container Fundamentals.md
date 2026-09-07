---
tags: [devops, container, foundation]
status: growing
---
# Container Fundamentals

> Container **không phải máy ảo nhỏ**. Nó là một process Linux bình thường bị giới hạn tầm nhìn (namespace) và tài nguyên (cgroup), chạy trên filesystem xếp lớp. Hiểu đúng điều này giải thích gần như mọi hành vi lạ của Docker và Kubernetes.

## 1. Container vs Virtual Machine
| | Container | Virtual Machine |
|---|---|---|
| Ảo hoá ở tầng | Hệ điều hành (chia sẻ kernel host) | Phần cứng (mỗi VM một kernel) |
| Khởi động | Mili giây | Chục giây → phút |
| Kích thước | MB | GB |
| Cách ly | Yếu hơn (chung kernel) | Mạnh (hypervisor) |
| Overhead | Gần bằng 0 | 5–15% |
| Dùng khi | Nhiều instance cùng OS, scale nhanh | Cần kernel khác, cách ly bảo mật cứng, multi-tenant không tin nhau |

> Hệ quả quan trọng: **container không chạy được kernel khác host.** Không có chuyện chạy container Windows trên kernel Linux — Docker Desktop trên macOS/Windows thực chất chạy một VM Linux ẩn.

## 2. Ba trụ cột kỹ thuật
### a. Namespaces — giới hạn *nhìn thấy gì*
| Namespace | Cách ly | Hệ quả thực tế |
|---|---|---|
| `pid` | Cây process | Trong container, app là PID 1 |
| `net` | Interface, route, port | Mỗi container có IP riêng |
| `mnt` | Mount point | Filesystem riêng |
| `uts` | Hostname | `hostname` khác host |
| `ipc` | Shared memory, queue | Cách ly IPC |
| `user` | Ánh xạ uid/gid | Root trong container ≠ root host (rootless) |
| `cgroup` | Che cgroup thật | — |

### b. Cgroups — giới hạn *dùng được bao nhiêu*
CPU, memory, disk I/O, số PID. Đây chính là cơ chế phía sau `--memory`, `--cpus` của Docker và `resources.limits` của [[Kubernetes Operations & Security|Kubernetes]].
> Vượt memory limit → kernel **OOM-kill** process, container chết với exit code 137. Vượt CPU limit → chỉ bị **throttle**, không chết.

### c. Union filesystem (OverlayFS) — layer xếp chồng
- Image = nhiều layer **read-only** xếp lên nhau.
- Container = image + một layer **read-write** mỏng ở trên (copy-on-write).
- Xoá container → mất layer ghi. Đây là lý do dữ liệu cần **volume** → [[Docker Engine]].
- Nhiều container cùng image dùng chung layer read-only ⇒ tiết kiệm disk khổng lồ.

### PID 1 — cái bẫy kinh điển
Process PID 1 trong Linux có trách nhiệm đặc biệt: **reap zombie process** và **xử lý signal**. Ứng dụng thường không làm việc đó.
- Triệu chứng: container không dừng khi `docker stop`, phải chờ 10s rồi bị `SIGKILL`; hoặc zombie process tích tụ.
- Cách sửa: dùng `--init` (tini), hoặc `exec` form trong `ENTRYPOINT`, hoặc để app tự bắt `SIGTERM`.

## 3. Chuẩn hoá: OCI và Container Runtime
```
kubectl / docker CLI
        ↓
containerd (high-level runtime: quản lý image, snapshot, lifecycle)
        ↓
runc (low-level runtime: gọi syscall tạo namespace + cgroup)
        ↓
Linux kernel
```
- **OCI (Open Container Initiative)** chuẩn hoá 3 spec: *image-spec*, *runtime-spec*, *distribution-spec* → image build bằng Docker chạy được trên containerd, Podman, CRI-O.
- Kubernetes bỏ hỗ trợ `dockershim` từ v1.24 và nói chuyện trực tiếp với runtime qua **CRI** — điều này **không** làm image Docker hết dùng được, vì image tuân theo chuẩn OCI.

## 4. Cạm bẫy
- ❌ **Coi container là VM** → SSH vào container, cài agent, chạy nhiều service trong một container. Nguyên tắc: *một container, một mối quan tâm*.
- ❌ **Lưu state trong container** → mất khi container bị thay thế. Container là **ephemeral**.
- ❌ **Nghĩ container là ranh giới bảo mật cứng** → chung kernel; một lỗ hổng kernel/`--privileged` là thoát ra host. Multi-tenant không tin nhau thì cần VM hoặc gVisor/Kata.
- ❌ **Chạy root trong container** rồi mount host path → tương đương trao quyền root host.
- ❌ Quên rằng ứng dụng JVM/Go cũ có thể **đọc CPU/RAM của host** thay vì của cgroup → cấp phát sai heap.

## 5. Checklist hiểu đúng container
- [ ] Giải thích được vì sao container khởi động nhanh hơn VM mà không nói "vì nó nhẹ hơn"?
- [ ] Biết container của mình chạy với uid nào không? (`docker exec ... id`)
- [ ] Ứng dụng có xử lý `SIGTERM` để shutdown gracefully chưa?
- [ ] Dữ liệu cần giữ đã nằm trên volume, không nằm trong layer ghi chưa?
- [ ] Có container nào đang chạy `--privileged` không? Vì sao?
- [ ] Runtime của cluster là gì (`containerd`, `CRI-O`)? Biết cách xem log runtime không?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| Docker | Phổ biến nhất, DX tốt | https://docs.docker.com/ |
| Podman | Daemonless, rootless mặc định | https://podman.io/ |
| containerd | Runtime chuẩn của K8s | https://containerd.io/ |
| gVisor / Kata Containers | Cách ly mạnh hơn bằng sandbox/VM nhẹ | https://gvisor.dev/ · https://katacontainers.io/ |
| `lazydocker` | TUI xem container | https://github.com/jesseduffield/lazydocker |

## Tham khảo
- OCI Specifications: https://opencontainers.org/
- Liz Rice — *Container Security* (O'Reilly) và talk "Containers From Scratch": https://www.youtube.com/watch?v=8fi7uSYlOdc
- Linux man7 — namespaces(7): https://man7.org/linux/man-pages/man7/namespaces.7.html
- Kubernetes — Don't Panic: Dockershim Removal: https://kubernetes.io/blog/2022/02/17/dockershim-faq/
- Docker docs — Storage drivers & OverlayFS: https://docs.docker.com/storage/storagedriver/

## Liên kết
[[Docker Engine]] · [[Dockerfile & Image Optimization]] · [[Linux & Networking for DevOps]] · [[Kubernetes Architecture]] · [[DevOps]]
