---
tags: [networking, link-layer, wireless]
status: growing
---
# Wireless Networks

> Không dây khác có dây ở ba điểm cốt tử: **môi trường chia sẻ và không tin cậy, tốc độ thay đổi liên tục, và không thể phát hiện va chạm**. Mọi thiết kế Wi-Fi/5G đều xoay quanh ba điểm này.

## 1. Bản đồ công nghệ

| Công nghệ | Chuẩn | Tầm | Đặc điểm |
|---|---|---|---|
| **Wi-Fi** | 802.11 a/b/g/n/ac/ax(6)/be(7) | ~100 m | Không cấp phép (2.4/5/6 GHz), CSMA/CA |
| **Bluetooth / BLE** | 802.15.1 | ~10 m | Rất tiết kiệm năng lượng |
| **Zigbee / LoRa** | 802.15.4 / LoRaWAN | 10 m – 10 km | IoT, băng thông rất thấp |
| **Cellular** | 4G LTE / 5G NR | km | Có cấp phép, có lập lịch tập trung, QoS thật |

**Wi-Fi thế hệ**: 802.11n = Wi-Fi 4, ac = 5, ax = 6/6E (thêm 6 GHz, OFDMA, TWT), be = 7 (320 MHz, MLO).

## 2. Nguyên tắc quan trọng
1. **CSMA/CA chứ không phải CSMA/CD** — bộ thu không thể nghe khi đang phát, nên không phát hiện được va chạm. Thay vào đó: né va chạm bằng backoff + ACK cho **mọi** frame.
2. **Hidden terminal problem**: A và C đều thấy B nhưng không thấy nhau → cùng phát → va chạm ở B. Giải pháp: **RTS/CTS** (ít dùng vì tốn overhead).
3. **Exposed terminal**: né nhau không cần thiết → lãng phí băng thông.
4. **Rate adaptation**: tốc độ tự tụt khi SNR kém. Một client xa làm chậm cả cell (**airtime fairness problem**).
5. **Tốc độ ghi trên hộp là PHY rate**, throughput thực chỉ khoảng **50–60%** vì overhead ACK/contention.
6. **Mất gói do nhiễu, không do congestion** → TCP hiểu nhầm là tắc nghẽn và giảm cửa sổ oan → xem [[Advanced Congestion Control]].

## 3. Cạm bẫy hay gặp
- **Đặt quá nhiều AP cùng kênh 2.4 GHz**: chỉ có 3 kênh không chồng lấn (1, 6, 11). Nhiều AP hơn ≠ nhanh hơn.
- **Đổ lỗi cho "mạng chậm" khi vấn đề là airtime**: một laptop cũ chạy 802.11b có thể chiếm phần lớn airtime của cả AP.
- **Bỏ qua roaming**: chuyển AP làm rớt kết nối nếu không có 802.11r/k/v.
- **Dùng ping để đánh giá Wi-Fi** — jitter và retry ở tầng MAC mới là thứ cần đo.
- **Tin rằng WPA2-PSK là đủ cho môi trường chung**: cùng mật khẩu = ai cũng giải mã được lưu lượng của nhau (trước WPA3). → [[VPN & IPsec]]

## 4. Checklist áp dụng
- [ ] Kênh có chồng lấn với AP hàng xóm không? (khảo sát bằng WiFi analyzer)
- [ ] Băng tần 5/6 GHz đã được ưu tiên, 2.4 GHz chỉ để dự phòng?
- [ ] Client yếu có bị ép rời (band steering / min RSSI) không?
- [ ] Đã bật WPA3 hoặc ít nhất WPA2-Enterprise cho môi trường nhiều người?
- [ ] Đo retry rate và SNR, không chỉ đo tốc độ?

## Tham khảo
- Peterson & Davie — 2.7 Wireless Networks: https://book.systemsapproach.org/direct/wireless.html
- IEEE 802.11: https://standards.ieee.org/ieee/802.11/
- Wi-Fi Alliance — Wi-Fi 6/6E/7: https://www.wi-fi.org/discover-wi-fi
- Grigorik — *HPBN* Ch.6 WiFi: https://hpbn.co/wifi/

## Liên kết
[[Ethernet]] · [[Access Networks]] · [[Mobile IP & Mobility]] · [[Networking]]
