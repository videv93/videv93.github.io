---
tags: [backend, language, ruby, rails]
status: growing
---
# Ruby on Rails

> Triết lý **"Convention over Configuration"** — tối ưu hoá *hạnh phúc lập trình viên*. Framework kinh điển để dựng MVP và sản phẩm SaaS nhanh, với ActiveRecord ORM cực kỳ trực quan.

## 1. Những quy ước tạo nên năng suất
| Quy ước | Nội dung |
|---|---|
| **CoC** | Đặt tên đúng chuẩn → không cần cấu hình. `User` ↔ bảng `users` ↔ `users_controller.rb` |
| **DRY** | Một tri thức tồn tại ở một chỗ |
| **Fat model, skinny controller** | Nghiệp vụ ở model/service, controller chỉ điều phối |
| **REST mặc định** | `resources :posts` sinh 7 action chuẩn → [[REST API Design]] |
| **Migration là lịch sử schema** | Không sửa DB bằng tay |

Cái giá: khi ứng dụng lớn, "magic" trở nên khó truy vết; và mọi thứ ngoài quy ước đều tốn công gấp bội.

## 2. Bản đồ thành phần
```
config/routes.rb → Controller → Model (ActiveRecord) → DB
                             ↘ View / Serializer
app/jobs        → ActiveJob → Sidekiq → Redis
lib/tasks/*.rake → Rake      → [[Rake Tasks in Rails]]
```
- **ActiveRecord** — ORM + query builder + validation + callback. Mạnh và nguy hiểm ngang nhau.
- **ActiveJob** — lớp trừu tượng hàng đợi, backend thường là **Sidekiq**.
- **ActionCable** — WebSocket. **ActiveStorage** — file. **ActionMailer** — email.
- **Rails API mode** (`rails new --api`) — bỏ view layer khi chỉ làm JSON API.

## 3. Concurrency & execution
- Application server tiêu chuẩn: **Puma** — hỗ trợ **multi-process (cluster) + multi-thread** để xử lý đồng thời nhiều HTTP request.
- Ruby cũng có GVL (tương tự GIL): thread giúp cho I/O-bound, không giúp CPU-bound; song *process* thì có.
- Cấu hình thường gặp: `WEB_CONCURRENCY` = số core, `RAILS_MAX_THREADS` = 5. **Pool DB phải ≥ số thread mỗi process.**
- Tác vụ nền tiêu chuẩn: **Sidekiq (dựa trên Redis)**. → [[Background Jobs and Queues]]
- So sánh với các mô hình khác: → [[Concurrency Models]]

## 4. Cạm bẫy ActiveRecord
- **N+1 query** — kinh điển. Dùng `includes`/`preload`/`eager_load`, bật `bullet` gem để phát hiện. → [[Database Access and ORM]]
- **Callback chồng chéo** (`after_save` gọi service, gửi mail) → khó test, khó suy luận thứ tự. Đẩy sang service object. → [[Repository Pattern and Service Layer]]
- **`update_all`/`delete_all` bỏ qua validation & callback** — đôi khi là ý muốn, đôi khi là bug.
- **Default scope** — nhiễm vào mọi truy vấn, rất khó gỡ về sau.
- **Migration có khoá bảng** (thêm index không `algorithm: :concurrently` trên Postgres) → downtime. → [[Deployment and Configuration]]
- **Mass assignment** — luôn dùng strong parameters. → [[Backend Security]]

## 5. Checklist một app Rails production
- [ ] `WEB_CONCURRENCY`, `RAILS_MAX_THREADS` và `pool` trong `database.yml` có khớp nhau không?
- [ ] Có gem phát hiện N+1 (`bullet`) trong môi trường dev không?
- [ ] Job nặng có ở Sidekiq và **idempotent** không (worker có thể bị kill giữa chừng)?
- [ ] `credentials.yml.enc` / env var cho secret, không commit key?
- [ ] Migration có an toàn khi chạy song song với version code cũ (deploy 2 bước)?
- [ ] `rubocop` + `brakeman` (quét bảo mật) chạy trong CI?
- [ ] Có test request-level đi qua controller → DB? → [[Testing Backend]]

## 6. Giải phẫu một Gemfile production thật
> Ví dụ dưới đây lấy từ một app Rails 6.1 / Ruby 3.1 kiểu *monolith nghiệp vụ* (admin + API + job + geo + báo cáo). ~130 gem — đọc được một Gemfile là đọc được kiến trúc và cả *nợ kỹ thuật* của hệ thống.

### 6.1 Bản đồ theo mối quan tâm
| Nhóm | Gem | Ghi chú |
|---|---|---|
| **Nền tảng** | `rails ~> 6.1.4`, `ruby 3.1.1`, `puma ~> 4.3`, `bootsnap`, `pg ~> 1.6` | `bootsnap` cache bytecode + đường dẫn require → cứu thời gian boot khi Gemfile phình to |
| **Auth & phân quyền** | `devise 4.9.4`, `devise-jwt`, `responders`, `pundit` | Session (web) **và** JWT (API) song song → hai đường xác thực, phải test cả hai. `pundit` = policy object, hợp với ActiveAdmin |
| **Admin/CMS** | `activeadmin ~> 2.9`, `active_material`, `ckeditor 4.3.0`, `cocoon`, `switchery-rails` (github fork) | Admin sinh sẵn CRUD; `cocoon` cho nested form động |
| **Asset (đời cũ)** | `sass-rails`, `uglifier`, `coffee-rails`, `turbolinks`, `jquery-rails`, `bootstrap 4`, `font-awesome-rails`, `select2`, `momentjs`, `flex-slider`, `toastr` | Sprockets + jQuery — **tiền Hotwire/importmap**. Đây là phần khó nâng cấp nhất khi lên Rails 7 |
| **Geo** | `activerecord-postgis-adapter ~> 6.0`, `geocoder`, `gmaps4rails`, `google_places` | PostGIS → adapter buộc phải khớp major với Rails (6.0 ↔ Rails 6.1) |
| **File & ảnh** | `activestorage` (core) + `active_storage_validations`, `image_processing`, `mini_magick`, `aws-sdk-s3`, `cloudinary` | **Hai** backend lưu ảnh cùng lúc — cần biết cái nào là nguồn sự thật |
| **Background job** | `sidekiq ~> 5.2`, `-failures`, `-limit_fetch`, `-scheduler`, `-unique-jobs` | Bộ tứ plugin: retry UI, giới hạn concurrency theo queue, cron, chống job trùng → [[Background Jobs and Queues]] |
| **Tích hợp ngoài** | `grpc` + `ffi`, `google-cloud-pubsub`, `faraday 0.17.4`, `rest-client`, `telegram-bot-ruby`, `slack-notifier` | **Ba** HTTP client cùng tồn tại (faraday, rest-client, net/http trong sdk) |
| **Search** | `sunspot_rails` + `sunspot_solr` | Solr — thêm một service phải vận hành, backup, reindex |
| **Domain helpers** | `aasm` (state machine), `acts-as-taggable-on`, `amoeba` (deep clone record), `fuzzy_match`, `hashdiff`, `groupdate`, `kaminari`, `unicode_utils`, `validates_serialized` | `aasm` + `paper_trail` là cặp đôi kinh điển cho workflow có audit |
| **Audit & bảo mật biên** | `paper_trail ~> 12.3`, `rack-attack`, `rack-cors` | `rack-attack` = rate limit ở tầng Rack → [[Backend Security]] |
| **API layer** | `jsonapi-serializer`, `jbuilder`, `draper`, `apipie-rails`, `oj` | Hai cách render JSON; `oj` thay JSON encoder mặc định cho nhanh |
| **Báo cáo/Excel/PDF** | `roo`, `rubyXL`, `caxlsx`, `wicked_pdf` + `wkhtmltopdf-binary`, `chartkick` | Đọc (`roo`) và ghi (`caxlsx`) là hai việc khác nhau — nhưng `rubyXL` chồng lấn cả hai |
| **Quan sát & log** | `coverband`, `exception_notification`, `fluent-logger`, `ahoy_matey`, `device_detector` | `coverband` đo **coverage trên production** → công cụ tốt nhất để tìm code chết trước khi refactor |
| **Vận hành** | `pgsync`, `tty-command`, `tzinfo-data`, `net-imap/pop/smtp (require: false)` | Bộ `net-*` phải khai báo tay từ Ruby 3.1 vì chúng bị tách khỏi default gem — thiếu là `mail` gãy |

### 6.2 Chiến lược `group` — điểm sáng của Gemfile này
```ruby
group :development, :test, :deployment do
  gem 'ed25519'        # net-ssh không đọc được SSH key ED25519 nếu thiếu
  gem 'bcrypt_pbkdf'   # → cần cả ở máy local lẫn CI runner
end

group :deployment do   # group tự định nghĩa, CI chỉ bundle nhóm này để deploy
  gem 'capistrano', 'capistrano3-puma', 'capistrano-sidekiq', ...
end
```
- **`group :deployment` là group tự đặt tên**, không phải chuẩn Rails. Rails chỉ tự động load `:default` + `Rails.env`. CI chạy `bundle install --with deployment` (hoặc `BUNDLE_WITH=deployment`) → server production **không** phải cài Capistrano.
- Nguyên tắc: gem nào chỉ dùng lúc dev thì đừng để ở default — mỗi gem ở default là RAM thường trú + một bề mặt tấn công.
- `platforms: %i[mri mingw x64_mingw]` cho `byebug`, `%i[mingw mswin x64_mingw jruby]` cho `tzinfo-data` → tránh cài nhầm trên môi trường không cần.

## 7. Audit phiên bản — phần quan trọng nhất
Đọc Gemfile theo trục **thời gian**, không chỉ theo chức năng:

| Gem | Pin trong Gemfile | Vấn đề |
|---|---|---|
| `rails ~> 6.1.4` | Rails 6.1 | Đã **hết vòng hỗ trợ bảo mật**. Đường nâng cấp: 6.1 → 7.0 → 7.1 → … từng bước một, không nhảy cóc |
| `puma ~> 4.3` | Rails 6.1 mặc định đi với Puma 5 | Puma 4 lỡ nhiều bản vá + cải tiến `wait_for_less_busy_worker` |
| `sidekiq ~> 5.2` | Sidekiq 5 (2018) | Thường bị **ghim ngược** bởi `sidekiq-unique-jobs` / `-limit_fetch`. Muốn lên Sidekiq 7 phải xử lý cả cụm plugin, và `limit_fetch` là thứ khó thay nhất |
| `faraday ~> 0.17.4` | Còn ở 0.x | Ghim 0.x thường vì một gem khác (sdk cũ) yêu cầu. API 0.x → 2.x đổi hoàn toàn phần middleware |
| `selenium-webdriver ~> 3.142` + `webdrivers` | Selenium 3 | Selenium 4 đã có `selenium-manager` tự tải driver → gem `webdrivers` không còn cần. Đây là thứ **gãy CI đầu tiên** khi Chrome tự cập nhật |
| `wkhtmltopdf-binary` | Upstream đã ngừng phát triển | Rủi ro bảo mật + không render CSS hiện đại. Hướng thay: Grover/Puppeteer hoặc dịch vụ PDF ngoài |
| `ckeditor 4.3.0` (CKEditor 4) | CKEditor 4 hết hỗ trợ miễn phí | Cân nhắc ActionText/Trix |
| `switchery-rails` từ `github:` fork cá nhân | Không có trên RubyGems | **Rủi ro chuỗi cung ứng + rủi ro deploy**: build cần quyền truy cập GitHub; repo bị xoá là hỏng deploy. Nên vendor lại hoặc thay bằng CSS thuần |

> Quy tắc: mỗi gem ghim ở phiên bản cũ bất thường đều có một *câu chuyện*. Trước khi nâng cấp, chạy `bundle open <gem>` và `bundle viz` / `gem dependency` để tìm ai đang ghim ai.

## 8. Những "mùi" đọc được từ Gemfile này
- **Chồng lấn chức năng** — 3 gem Excel (`roo`, `rubyXL`, `caxlsx`), 2 backend ảnh (`aws-sdk-s3` + `cloudinary`), 2 serializer JSON (`jbuilder` + `jsonapi-serializer`), 3 HTTP client. Dấu hiệu của nhiều đời developer, mỗi người mang theo thư viện quen tay. Chi phí: người mới không biết chọn cái nào, và mỗi cái là một cách xử lý lỗi khác nhau.
- **Comment đã lệch khỏi nội dung** — khối `# Storage` chứa `pundit`, `slack-notifier`; khối `# Log` chứa `aasm`, `rack-attack`; khối `# Read Excel file` chứa `apipie-rails`, `draper`. Comment sai còn tệ hơn không có comment. Nên nhóm lại theo *bounded context* thật.
- **Gemfile phình → boot chậm & RAM cao** — mỗi Sidekiq worker và mỗi Puma process đều nạp toàn bộ default group. Đo bằng `derailed_benchmarks` (`bundle exec derailed bundle:mem`) để biết gem nào ngốn nhất; `bootsnap` chỉ giấu triệu chứng chứ không giảm bộ nhớ.
- **`database_cleaner` cùng RSpec** — thường là di sản. Với transactional fixtures của Rails, chỉ những test dùng driver JS (Capybara + Selenium) mới cần truncation. Cấu hình sai → test chậm gấp nhiều lần.
- **Thiếu `brakeman` và `bundler-audit` trong CI** — có `rubocop-git` (chỉ lint phần diff) nhưng không có quét lỗ hổng. Với Gemfile 130 gem, `bundler-audit` là thứ có tỉ lệ lợi ích/chi phí cao nhất.
- **Thiếu `strong_migrations`** — app dùng PostGIS + bảng lớn, migration khoá bảng là rủi ro downtime thật. → [[Deployment and Configuration]]
- **Điểm sáng đáng học**: `coverband` (coverage production), `pgsync` (kéo dữ liệu thật về local an toàn), `sidekiq-unique-jobs` (idempotency), `paper_trail` + `aasm` (audit trail cho workflow), tách `group :deployment` gọn gàng.

## 9. Checklist review một Gemfile
- [ ] `ruby` version có khớp với `.ruby-version`, Dockerfile và CI image không?
- [ ] Có gem nào ghim ở **0.x** hoặc trễ ≥ 2 major so với upstream? Ai đang ghim nó?
- [ ] Có gem nào lấy từ `github:`/`path:`? Deploy có phụ thuộc mạng ngoài không?
- [ ] Gem chỉ dùng cho dev/test có nằm nhầm ở default group không?
- [ ] Hai gem nào đang làm cùng một việc? Chọn một, viết vào ADR/CLAUDE.md.
- [ ] `bundler-audit` + `brakeman` có trong CI không? `Gemfile.lock` có được commit không?
- [ ] Gem nặng (`grpc`, `ffi`, `sunspot`) có thực sự cần trong **mọi** process, hay chỉ ở worker?
- [ ] Đã đo boot time / RSS bằng `derailed_benchmarks` chưa?

## Công cụ
| Công cụ | Việc | Link |
|---|---|---|
| Puma | App server | https://puma.io/ |
| Sidekiq | Background job | https://sidekiq.org/ |
| Bullet | Bắt N+1 | https://github.com/flyerhzm/bullet |
| Brakeman | Quét lỗ hổng tĩnh | https://brakemanscanner.org/ |
| RuboCop | Lint/format | https://rubocop.org/ |
| strong_migrations | Chặn migration nguy hiểm | https://github.com/ankane/strong_migrations |
| bundler-audit | Quét CVE trong Gemfile.lock | https://github.com/rubysec/bundler-audit |
| derailed_benchmarks | Đo RAM/boot time từng gem | https://github.com/zombocom/derailed_benchmarks |
| Coverband | Coverage trên production, tìm code chết | https://github.com/danmayer/coverband |
| pgsync | Đồng bộ dữ liệu Postgres về local | https://github.com/ankane/pgsync |
| Capistrano | Deploy qua SSH | https://capistranorb.com/ |

## Tham khảo
- Rails Guides: https://guides.rubyonrails.org/
- Rails Doctrine (triết lý framework): https://rubyonrails.org/doctrine
- ActiveRecord Query Interface: https://guides.rubyonrails.org/active_record_querying.html
- Sidekiq Best Practices: https://github.com/sidekiq/sidekiq/wiki/Best-Practices
- *The Rails 7 Way* — Obie Fernandez
- Rails Upgrade Guide (6.1 → 7.x): https://guides.rubyonrails.org/upgrading_ruby_on_rails.html
- Bundler groups & `BUNDLE_WITH`: https://bundler.io/guides/groups.html
- Sidekiq 6/7 upgrade notes: https://github.com/sidekiq/sidekiq/blob/main/docs/6.0-Upgrade.md

## Liên kết
[[Rake Tasks in Rails]] · [[Background Jobs and Queues]] · [[Choosing a Backend Language]] · [[Backend]]
