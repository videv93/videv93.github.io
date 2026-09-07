---
tags: [devops, container, docker, build]
status: growing
---
# Dockerfile & Image Optimization

> Image nhỏ và layer cache tốt không phải chuyện thẩm mỹ: nó quyết định **thời gian CI**, **tốc độ scale-out**, và **diện tích tấn công**. Image 1.2GB pull mất 40s trên mỗi node khi scale — image 80MB mất 2s.

## 1. Cách layer cache hoạt động
Mỗi instruction (`RUN`, `COPY`, `ADD`) tạo một layer. Docker tái dùng cache nếu:
1. Instruction giống hệt, **và**
2. Các layer trước đó đều cache hit, **và**
3. Với `COPY`/`ADD`: nội dung file (checksum) không đổi.

> Một layer miss cache thì **mọi layer sau đều rebuild**. Vì vậy: **thứ ít thay đổi để trên, thứ hay thay đổi để dưới.**

❌ Cách viết làm hỏng cache mỗi lần sửa 1 dòng code:
```dockerfile
COPY . /app
RUN npm ci
```
✅ Tách bước cài dependency ra trước:
```dockerfile
COPY package.json package-lock.json ./
RUN npm ci                 # chỉ chạy lại khi lockfile đổi
COPY . .                   # sửa code không ảnh hưởng layer trên
```

## 2. Multi-stage build — đòn bẩy lớn nhất
```dockerfile
# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# ---------- runtime ----------
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s \
  CMD wget -qO- http://localhost:3000/healthz || exit 1
ENTRYPOINT ["node", "dist/server.js"]
```
Compiler, devDependencies, source code — tất cả nằm lại ở stage `build` và **không vào image cuối**.

### Kết quả điển hình
| Cách làm | Node app | Go app |
|---|---|---|
| `FROM node:20` / `FROM golang:1.22`, copy tất cả | ~1.1 GB | ~900 MB |
| Base `-alpine` | ~180 MB | — |
| Multi-stage + alpine | ~110 MB | ~15 MB |
| Multi-stage + distroless / `scratch` | ~80 MB | ~6 MB |

## 3. Chọn base image
| Base | Size | Đánh đổi |
|---|---|---|
| `ubuntu` / `debian` | 70–120 MB | Đủ tool để debug, nhiều CVE hơn |
| `-slim` | 30–80 MB | Cân bằng tốt, mặc định hợp lý |
| `-alpine` | 5–50 MB | musl libc — có thể vỡ native module, DNS khác biệt, khó debug glibc |
| `gcr.io/distroless/*` | 2–20 MB | Không shell, không package manager → an toàn nhất, debug khó (dùng tag `:debug`) |
| `scratch` | 0 | Chỉ hợp binary tĩnh (Go, Rust); phải tự thêm CA certs, tzdata |

> ⚠️ Alpine + Python có thể **chậm hơn và nặng hơn** slim, vì wheel phải compile lại từ source. Đo trước khi chọn.

## 4. Nguyên tắc viết Dockerfile
1. **`.dockerignore` trước tiên** — không có nó, `COPY . .` kéo cả `.git`, `node_modules`, secret vào build context.
2. **Gộp `RUN` và dọn cache trong cùng layer** — xoá ở layer sau không giảm size, vì layer trước vẫn còn trong image:
   ```dockerfile
   RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
   ```
3. **Ghim version** — `python:3.12.4-slim`, không `python:latest`. Build phải tái lập được.
4. **`COPY` chứ đừng `ADD`** — `ADD` tự giải nén và tải URL, dễ gây bất ngờ.
5. **`USER` non-root** trước `ENTRYPOINT`.
6. **`ENTRYPOINT` dạng exec** `["node","server.js"]`, không dạng shell — để app nhận được `SIGTERM` (xem PID 1 ở [[Container Fundamentals]]).
7. **`HEALTHCHECK`** để runtime phân biệt *đang chạy* và *sẵn sàng nhận traffic*.
8. **Build arg cho biến build, ENV cho biến runtime** — và **không** truyền secret qua `ARG` (nó nằm lại trong lịch sử image, `docker history` đọc được). Dùng `RUN --mount=type=secret`.
9. **BuildKit** (`DOCKER_BUILDKIT=1`, mặc định từ Docker 23) — build song song stage, cache mount cho package manager:
   ```dockerfile
   RUN --mount=type=cache,target=/root/.npm npm ci
   ```
10. **Multi-arch** khi team dùng cả Apple Silicon và server x86: `docker buildx build --platform linux/amd64,linux/arm64`.

## 5. Cạm bẫy
- ❌ Secret trong `ARG`/`ENV`/layer → `docker history` hoặc bung layer là thấy. Coi như đã lộ, phải rotate.
- ❌ `RUN apt-get update` ở layer riêng → cache lâu ngày, cài phải package cũ ("cache-busting" cổ điển).
- ❌ Chạy `npm install` thay vì `npm ci` → không dùng lockfile, build không tái lập được.
- ❌ Ghi đè tag cũ (`:v1.0` build lại) → cùng tag, khác nội dung, không truy vết được.
- ❌ Cài `curl`, `vim`, `net-tools` vào image production "để debug" → tăng diện tích tấn công. Dùng ephemeral debug container (`kubectl debug`) thay thế.
- ❌ Quên `.dockerignore` → build context vài GB, CI chậm, nguy cơ lọt `.env`.

## 6. Checklist review một Dockerfile
- [ ] Có `.dockerignore` loại `.git`, `node_modules`, `.env`, file test?
- [ ] Base image ghim version cụ thể, không `latest`?
- [ ] Dependency cài **trước** khi copy source?
- [ ] Có multi-stage, image cuối không chứa compiler/devDependencies?
- [ ] `USER` non-root?
- [ ] `ENTRYPOINT` dạng exec (JSON array)?
- [ ] Có `HEALTHCHECK`?
- [ ] Không có secret ở bất kỳ layer nào? (`docker history --no-trunc <image>` để kiểm)
- [ ] Đã scan CVE trước khi push? → [[Container Registry & Image Security]]
- [ ] Image cuối bao nhiêu MB? So với lần trước tăng hay giảm?

## Công cụ
| Công cụ | Đặc điểm | Link |
|---|---|---|
| `hadolint` | Lint Dockerfile theo best practice | https://github.com/hadolint/hadolint |
| `dive` | Xem từng layer, tìm file thừa | https://github.com/wagoodman/dive |
| BuildKit / buildx | Build song song, cache mount, multi-arch | https://docs.docker.com/build/buildkit/ |
| Kaniko / Buildah | Build image trong cluster không cần Docker daemon | https://github.com/GoogleContainerTools/kaniko |
| Distroless | Base image tối giản của Google | https://github.com/GoogleContainerTools/distroless |
| `docker-slim` | Tự động thu nhỏ image có sẵn | https://github.com/slimtoolkit/slim |

## Tham khảo
- Docker Docs — Best practices for writing Dockerfiles: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- Docker Docs — Build cache: https://docs.docker.com/build/cache/
- Docker Docs — Build secrets: https://docs.docker.com/build/building/secrets/
- Google — Distroless rationale: https://github.com/GoogleContainerTools/distroless#why-should-i-use-distroless-images
- Snyk — 10 Docker image security best practices: https://snyk.io/blog/10-docker-image-security-best-practices/

## Liên kết
[[Docker Engine]] · [[Container Registry & Image Security]] · [[CI-CD Pipeline]] · [[Container Fundamentals]] · [[DevOps]]
