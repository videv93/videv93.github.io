---
tags: [devops, container, docker]
status: growing
---
# Docker Engine

> Docker là lớp trải nghiệm người dùng đặt trên các nguyên thuỷ của Linux mô tả ở [[Container Fundamentals]]. Nắm ba đối tượng — **image, container, volume** — và ba mạng mặc định là đủ dùng 90% thời gian.

## 1. Kiến trúc
```
docker CLI ──REST API──> dockerd (daemon) ──> containerd ──> runc ──> kernel
                              │
                              ├── image store (layer)
                              ├── volume driver
                              └── network driver
```
- CLI chỉ là client. **Daemon giữ toàn bộ state** — daemon chết thì container (mặc định) chết theo.
- Daemon chạy bằng root ⇒ ai vào được group `docker` thì tương đương root trên host. Đây là lý do Podman/rootless mode tồn tại.

## 2. Image vs Container
| | Image | Container |
|---|---|---|
| Bản chất | Template read-only, nhiều layer | Instance đang chạy = image + layer ghi |
| Định danh | `repo:tag` + digest `sha256:…` | ID + tên |
| Vòng đời | Bất biến | created → running → paused → stopped → removed |
| Lệnh | `build`, `pull`, `push`, `tag` | `run`, `exec`, `stop`, `rm`, `logs` |

## 3. Bộ lệnh dùng thật
```bash
# Chạy
docker run -d --name api -p 8080:3000 \
  -e NODE_ENV=production \
  -v api-data:/var/lib/data \
  --memory 512m --cpus 1 \
  --restart unless-stopped \
  myorg/api:1.4.2

# Quan sát
docker ps -a                     # container, kể cả đã dừng
docker logs -f --tail 100 api    # log stdout/stderr
docker stats                     # CPU/RAM realtime
docker inspect api               # toàn bộ config dạng JSON
docker exec -it api sh           # vào trong để debug
docker top api                   # process bên trong

# Dọn dẹp (cẩn thận)
docker system df                 # xem cái gì đang chiếm disk
docker image prune -a            # xoá image không dùng
docker system prune --volumes    # ⚠️ xoá cả volume không gắn container
```

### Debug container chết ngay khi start
1. `docker logs <id>` — 80% trường hợp câu trả lời nằm đây.
2. `docker inspect <id> --format '{{.State.ExitCode}}'` — 137 = OOM/SIGKILL, 139 = segfault, 1 = lỗi app.
3. Ghi đè entrypoint để vào xem: `docker run -it --entrypoint sh myimage`.
4. Sai kiến trúc CPU (build trên Apple Silicon, chạy trên x86) → `exec format error`. Dùng `--platform linux/amd64`.

## 4. Storage — ba kiểu mount
| Kiểu | Cú pháp | Dùng khi |
|---|---|---|
| **Volume** (khuyến nghị) | `-v mydata:/data` | Dữ liệu cần giữ; Docker quản lý, backup được, có driver |
| **Bind mount** | `-v $(pwd)/src:/app/src` | Dev local, hot reload. ⚠️ Phụ thuộc đường dẫn host |
| **tmpfs** | `--tmpfs /tmp` | Dữ liệu nhạy cảm/tạm, chỉ nằm trên RAM |

## 5. Networking — bốn driver
| Driver | Hành vi | Dùng khi |
|---|---|---|
| `bridge` (mặc định) | Mạng ảo riêng, cần `-p` để publish port | Hầu hết trường hợp |
| `host` | Dùng thẳng network stack của host, không cách ly port | Cần hiệu năng mạng tối đa, hoặc app cần nhiều port động |
| `none` | Không mạng | Job xử lý offline |
| `overlay` | Mạng phủ nhiều host | Swarm / multi-host |

- **User-defined bridge** (`docker network create app-net`) cho phép container gọi nhau **bằng tên** qua DNS nội bộ. Bridge mặc định thì không. Đây là nền tảng của [[Docker Compose]].
- `-p 8080:3000` = host **8080** → container **3000**. Nhớ thứ tự: *host trước, container sau*.

## 6. Cạm bẫy
- ❌ `docker system prune --volumes` trên máy có DB dev → mất sạch dữ liệu, không hoàn tác được.
- ❌ Dùng tag `:latest` ở production → không biết đang chạy bản nào, rollback bất khả thi. Dùng tag bất biến hoặc digest → [[Container Registry & Image Security]].
- ❌ `-v /:/host` hay `--privileged` để "cho tiện" → thoát container lên host trong vài lệnh.
- ❌ Ghi log ra file bên trong container → đầy disk và không ai thu thập được. **Ghi ra stdout/stderr** → [[Logging & Log Aggregation]].
- ❌ Không đặt `--memory` → một container leak RAM kéo sập cả host.
- ❌ Cho rằng `docker stop` là tức thì → nó gửi `SIGTERM`, chờ 10s, rồi mới `SIGKILL`.

## 7. Checklist chạy container ở production
- [ ] Image có tag bất biến (không phải `latest`)?
- [ ] Có `--memory` và `--cpus` (hoặc `resources` trong K8s)?
- [ ] Có `--restart` policy phù hợp?
- [ ] Chạy bằng user non-root?
- [ ] Log ra stdout/stderr, có log driver + rotation (`--log-opt max-size=10m`)?
- [ ] Có `HEALTHCHECK` để biết container *sống* khác *sẵn sàng*?
- [ ] Secret truyền qua biến môi trường runtime hay secret manager, **không** nằm trong image? → [[Secrets Management]]
- [ ] Dữ liệu cần giữ đã nằm trên named volume?

## Tham khảo
- Docker Docs — Reference & best practices: https://docs.docker.com/reference/
- Docker Docs — Networking overview: https://docs.docker.com/network/
- Docker Docs — Manage data in Docker: https://docs.docker.com/storage/
- Docker Docs — Runtime metrics & resource constraints: https://docs.docker.com/config/containers/resource_constraints/
- Nigel Poulton — *Docker Deep Dive*

## Liên kết
[[Container Fundamentals]] · [[Dockerfile & Image Optimization]] · [[Docker Compose]] · [[Container Registry & Image Security]] · [[DevOps]]
