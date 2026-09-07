---
tags: [devops, container, docker, orchestration, swarm]
status: growing
---
# Docker Swarm

> Bộ điều phối (orchestrator) **có sẵn trong Docker Engine**: gom nhiều host thành một cluster, chạy service với rolling update, self-healing, service discovery và load balancing. Nằm giữa [[Docker Compose]] (một máy) và [[Kubernetes Architecture|Kubernetes]] (cluster đầy đủ, phức tạp hơn nhiều). Đổi lấy sự đơn giản bằng hệ sinh thái nhỏ hơn.

## 1. Khi nào chọn Swarm
| Tình huống | Lựa chọn hợp lý |
|---|---|
| 1 host, môi trường dev | [[Docker Compose]] |
| 2–10 host, team nhỏ, không có SRE chuyên trách | **Swarm** |
| Cần autoscaling, operator, CRD, hệ sinh thái Helm/GitOps | [[Kubernetes Architecture\|Kubernetes]] |
| Không muốn quản host nào cả | ECS Fargate / Cloud Run |

Swarm đáng giá khi bạn cần *HA + rolling update* nhưng chi phí vận hành K8s là quá lớn so với quy mô. Docker vẫn duy trì Swarm mode, nhưng tốc độ phát triển tính năng đã chậm — cân nhắc trước khi khoá kiến trúc dài hạn vào nó.

## 2. Kiến trúc
```
        ┌──────────── manager quorum (Raft) ────────────┐
        │  manager-1*   manager-2     manager-3         │   * leader
        │  giữ cluster state, scheduling, API           │
        └───────────────────┬───────────────────────────┘
                            │ (mTLS, tự động xoay cert)
          ┌─────────────────┼─────────────────┐
       worker-1          worker-2          worker-3
       [task]            [task] [task]     [task]
```
- **Manager**: chạy Raft, giữ state cluster, lập lịch. Số manager phải **lẻ** (1/3/5); quorum = `n/2 + 1`. 3 manager chịu được mất 1; 5 chịu được mất 2.
- **Worker**: chỉ chạy task. Manager mặc định cũng chạy task — production nên `docker node update --availability drain <manager>`.
- **Service** = ý định (image, số replica, cấu hình). **Task** = một container cụ thể do scheduler tạo ra để thoả ý định đó.
- Giao tiếp node-to-node mã hoá bằng **mTLS**, cert tự xoay (mặc định 90 ngày).

## 3. Dựng cluster
```bash
# Trên node đầu tiên
docker swarm init --advertise-addr 10.0.0.11

# Lấy token để join
docker swarm join-token worker
docker swarm join-token manager

# Trên node khác
docker swarm join --token SWMTKN-1-xxx 10.0.0.11:2377

docker node ls                                  # xem cluster
docker node update --availability drain node-3  # rút task khỏi node để bảo trì
docker node promote node-2                      # worker -> manager
```
> Cổng cần mở giữa các node: **2377/tcp** (cluster management), **7946/tcp+udp** (gossip), **4789/udp** (overlay VXLAN).

## 4. Deploy bằng stack file
Stack file dùng chính cú pháp Compose, thêm khoá `deploy:`:
```yaml
services:
  api:
    image: registry.example.com/myorg/api:1.4.2   # phải là image đã push, Swarm không build
    ports:
      - target: 3000
        published: 8080
        mode: ingress          # routing mesh: gọi vào node nào cũng tới
    networks: [backend]
    environment:
      DATABASE_URL_FILE: /run/secrets/db_url
    secrets: [db_url]
    configs:
      - source: api_conf
        target: /etc/api/config.yaml
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:3000/healthz"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 20s
    deploy:
      replicas: 4
      placement:
        constraints: [node.role == worker]
        preferences:
          - spread: node.labels.zone       # rải đều theo zone
      resources:
        limits:   {cpus: "1.0", memory: 512M}
        reservations: {cpus: "0.25", memory: 256M}
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first     # khởi động task mới trước khi giết task cũ
        failure_action: rollback
      rollback_config:
        parallelism: 1
        order: stop-first
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  worker:
    image: registry.example.com/myorg/worker:1.4.2
    networks: [backend]
    deploy:
      mode: global             # đúng 1 task trên mỗi node (agent, log shipper)

networks:
  backend:
    driver: overlay
    attachable: false

secrets:
  db_url:
    external: true

configs:
  api_conf:
    file: ./config/api.yaml
```
```bash
docker stack deploy -c stack.yaml --with-registry-auth myapp
docker stack services myapp
docker stack ps myapp --no-trunc      # xem task + lý do lỗi
docker service logs -f myapp_api
docker stack rm myapp
```

## 5. Vận hành hằng ngày
```bash
docker service scale myapp_api=8
docker service update --image myorg/api:1.4.3 myapp_api    # rolling update
docker service rollback myapp_api                          # quay về bản trước
docker service inspect --pretty myapp_api
docker service ps myapp_api                                # task nào ở node nào

# Secret & config (bất biến, phải tạo phiên bản mới rồi update service)
echo -n 'postgres://...' | docker secret create db_url_v2 -
docker service update --secret-rm db_url --secret-add source=db_url_v2,target=db_url myapp_api
```
- **Routing mesh**: publish port `mode: ingress` thì mọi node đều nhận request và forward tới task, kể cả node không chạy task đó. Muốn chỉ nhận trên node có task (giữ client IP thật) → `mode: host` + load balancer bên ngoài.
- **Service discovery**: gọi nhau bằng tên service (`http://api:3000`) qua DNS nội bộ + VIP.
- **Backup**: định kỳ backup `/var/lib/docker/swarm` trên một manager (`docker swarm ca --rotate` để xoay CA). Mất quorum mà không có backup ⇒ dựng lại cluster từ đầu.

## 6. Cạm bẫy
- ❌ **Dùng 2 manager** → quorum = 2, mất 1 node là mất luôn cluster. Tệ hơn 1 manager. Luôn dùng số lẻ.
- ❌ **`docker stack deploy` với `build:`** → Swarm bỏ qua, nó chỉ pull image. Phải build & push lên registry trước ([[Container Registry & Image Security]]).
- ❌ **Quên `--with-registry-auth`** với registry private → worker không pull được, task kẹt `Pending`/`No such image`.
- ❌ **Không có `healthcheck`** → rolling update coi task "up" ngay khi container start, đẩy bản lỗi ra toàn bộ replica.
- ❌ **`order: stop-first` (mặc định)** cho service HTTP → có khoảng downtime. Dùng `start-first` khi app cho phép chạy song song hai version.
- ❌ **Dùng bind mount cho dữ liệu có state** → task được lên lịch lại sang node khác là mất dữ liệu. Cần shared storage (NFS/CSI plugin) hoặc ghim `placement.constraints` vào một node.
- ❌ **Chạy database có state trong Swarm** vì thấy tiện → không có StatefulSet/PVC như K8s. Cân nhắc DB managed hoặc ngoài cluster.
- ❌ **Đặt secret vào `environment:`** → lộ trong `docker service inspect`. Dùng `secrets:` (mount vào `/run/secrets/`) → [[Secrets Management]].
- ❌ **Chặn 7946/4789 giữa các node** → overlay network im lặng không thông, service tưởng chừng chạy nhưng không gọi được nhau.
- ❌ **Không đặt `resources.limits`** → một service rò rỉ bộ nhớ kéo sập cả node.
- ❌ **Manager vừa làm manager vừa gánh task nặng** → Raft trễ, cluster mất ổn định. `drain` manager ở production.

## 7. Checklist production
- [ ] 3 (hoặc 5) manager, đặt ở các AZ/rack khác nhau?
- [ ] Manager đã `drain`, không chạy workload?
- [ ] Mọi service có `healthcheck` + `update_config.failure_action: rollback`?
- [ ] Image ghim tag/digest cụ thể, đã push lên registry riêng?
- [ ] Secret dùng `docker secret`, không nằm trong env hay YAML?
- [ ] Có backup định kỳ `/var/lib/docker/swarm` và đã **thử restore** chưa?
- [ ] `resources.limits` và `reservations` đặt cho mọi service?
- [ ] Có log tập trung + metric (global service chạy agent) chưa? → [[Observability]]
- [ ] Firewall mở đúng 2377/7946/4789 và **chỉ** trong mạng nội bộ?
- [ ] Stack file nằm trong git, deploy qua pipeline chứ không gõ tay? → [[CI-CD Pipeline]]

## Tham khảo
- Docker Docs — Swarm mode overview: https://docs.docker.com/engine/swarm/
- Docker Docs — How nodes work / Raft: https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/
- Docker Docs — Deploy a stack to a swarm: https://docs.docker.com/engine/swarm/stack-deploy/
- Docker Docs — Compose Deploy Specification: https://docs.docker.com/reference/compose-file/deploy/
- Docker Docs — Manage swarm security with PKI: https://docs.docker.com/engine/swarm/how-swarm-mode-works/pki/
- Docker Docs — Manage sensitive data with secrets: https://docs.docker.com/engine/swarm/secrets/

## Liên kết
[[Docker Engine]] · [[Docker Compose]] · [[Container Registry & Image Security]] · [[Kubernetes Architecture]] · [[Kubernetes Workloads]] · [[CI-CD Pipeline]] · [[DevOps]]
