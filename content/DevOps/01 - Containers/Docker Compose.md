---
tags: [devops, container, docker, local-dev]
status: growing
---
# Docker Compose

> Công cụ để mô tả **một môi trường nhiều service bằng một file YAML** và dựng nó bằng một lệnh. Vũ khí chính cho môi trường dev và integration test — không phải cho production nhiều node (đó là việc của [[Kubernetes Architecture|Kubernetes]]).

## 1. File mẫu đủ dùng
```yaml
services:
  api:
    build:
      context: .
      target: build          # chọn stage trong multi-stage
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
      REDIS_URL: redis://cache:6379
    ports:
      - "8080:3000"
    volumes:
      - ./src:/app/src        # bind mount cho hot reload
    depends_on:
      db:
        condition: service_healthy   # chờ DB sẵn sàng, không chỉ chờ start
      cache:
        condition: service_started
    restart: unless-stopped

  db:
    image: postgres:16.3-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 10

  cache:
    image: redis:7.2-alpine
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```
> Khoá `version:` ở đầu file đã **deprecated** trong Compose Spec — bỏ đi.

## 2. Lệnh hay dùng
```bash
docker compose up -d --build     # dựng và chạy nền
docker compose ps                # trạng thái + health
docker compose logs -f api       # log một service
docker compose exec api sh       # vào container đang chạy
docker compose run --rm api npm test   # chạy one-off, xoá sau khi xong
docker compose down              # dừng + xoá container/network
docker compose down -v           # ⚠️ xoá cả volume → mất dữ liệu DB
docker compose config            # in ra YAML đã merge, để debug override
```
> `docker compose` (V2, plugin Go) đã thay thế `docker-compose` (V1, Python) — V1 hết vòng đời từ 2023.

## 3. Ba cơ chế đáng học
### a. Networking tự động
Compose tạo một user-defined bridge network cho project. Mọi service gọi nhau **bằng tên service** (`db:5432`), không cần biết IP, không cần publish port.
> `ports:` chỉ cần cho service mà **host** phải truy cập được. Service nội bộ (db, cache) thì đừng mở port ra host.

### b. Profiles — bật/tắt nhóm service
```yaml
  mailhog:
    image: mailhog/mailhog
    profiles: ["dev-tools"]
```
`docker compose --profile dev-tools up` mới chạy nó. Giữ `up` mặc định nhẹ.

### c. Override file
`compose.yaml` (chung) + `compose.override.yaml` (tự động merge, cho dev) + `compose.prod.yaml` (chỉ định rõ):
```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```

## 4. Cạm bẫy
- ❌ **`depends_on` không chờ ứng dụng sẵn sàng** — mặc định chỉ chờ container *start*. Phải kèm `healthcheck` + `condition: service_healthy`, hoặc để app tự retry kết nối.
- ❌ **Commit mật khẩu thật vào `compose.yaml`** → dùng `env_file: .env` và `.gitignore` nó. Xem [[Secrets Management]].
- ❌ **Dùng Compose làm production trên nhiều máy** → không có scheduling, self-healing, rolling update thật. Một host duy nhất thì chấp nhận được.
- ❌ **`down -v` theo phản xạ** → xoá volume DB dev, mất dữ liệu seed.
- ❌ **Bind mount `./:/app` rồi `node_modules` host đè lên container** → lỗi kiến trúc native module. Thêm anonymous volume `- /app/node_modules` để chặn.
- ❌ Không ghim version image (`postgres:latest`) → hai máy trong team chạy hai bản Postgres khác nhau.
- ❌ Trên Apple Silicon quên `platform: linux/amd64` với image chỉ có bản x86 → chạy chậm qua emulation hoặc không chạy.

## 5. Checklist một `compose.yaml` tốt
- [ ] Mọi image đều ghim version cụ thể?
- [ ] Service có state đều có named volume?
- [ ] Service phụ thuộc nhau đều có `healthcheck` + `condition: service_healthy`?
- [ ] Chỉ những service cần thiết mới `ports:` ra host?
- [ ] Secret nằm trong `.env` (đã gitignore), không nằm trong YAML?
- [ ] `git clone` + `docker compose up` là chạy được ngay, không cần bước thủ công nào?
- [ ] CI có dùng chính file này để chạy integration test không? → [[CI-CD Pipeline]]

## Tham khảo
- Compose Specification: https://compose-spec.io/
- Docker Docs — Compose overview: https://docs.docker.com/compose/
- Docker Docs — Startup order & healthcheck: https://docs.docker.com/compose/startup-order/
- Docker Docs — Compose profiles: https://docs.docker.com/compose/profiles/
- Docker Docs — Multiple compose files: https://docs.docker.com/compose/multiple-compose-files/

## Liên kết
[[Docker Engine]] · [[Dockerfile & Image Optimization]] · [[Docker Swarm]] · [[Kubernetes Workloads]] · [[CI-CD Pipeline]] · [[DevOps]]
