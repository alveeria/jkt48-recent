# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 23 Nov 2026, 07.15 WIB.

## Interval pembaruan

- **Polling API:** jeda 30 detik setelah siklus selesai; interval aktual ditambah waktu request/proses.
- **Publikasi JSON dan README:** commit/push ke GitHub sekitar tiap 5 menit, bukan tiap 30 detik. Cache GitHub Raw dapat menambah keterlambatan.
- **Jadwal workflow:** tiap jam pada menit ke-7; satu job polling berjalan sekitar 5 jam 40 menit. Job tidak berjalan bersamaan. Jadwal GitHub bisa terlambat sehingga pemantauan tidak dijamin tanpa jeda.
- **Rate limit/error:** request polling ke origin yang mengembalikan HTTP 429/5xx atau error jaringan ditunda secara eksponensial (30 detik hingga 5 menit). Header Retry-After dihormati jika meminta waktu lebih lama. Platform lain tetap dipoll; request yang sudah berjalan bisa tetap selesai. Backoff ini tidak mengatur koneksi chat IDN yang memiliki retry terpisah.
- Batas kuota resmi IDN/SHOWROOM belum diketahui; interval 30 detik bukan jaminan bebas rate limit.

## Pakai datanya

| File | Isi |
|---|---|
| [`data/live.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/live.json) | Yang sedang live sekarang |
| [`data/recent/latest.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json) | Live selesai dalam bulan UTC berjalan |
| `data/recent/YYYY-MM.json` | Arsip bulan UTC berjalan, contoh [`2026-11.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/2026-11.json) |

```js
const recent = await fetch("https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json").then((r) => r.json());
```

Field tiap live: `id` (`idn:alveeria-N` / `showroom:alveeria-N`), `source_id` (ID asli platform), `platform` (`idn` | `showroom`), `member { name, username, avatar }`, `title`, `url`, `image`,
`started_at`, `ended_at`, `duration_minutes`, `peak_viewers`, `last_viewers`.
Khusus SHOWROOM: `gifts` (gift berbayar), `gift_points`, `stars` (gift gratis), `comments`, `unique_gifters`,
`gift_breakdown` (nama gift → jumlah), `top_gifters` (peringkat stage).
Khusus IDN Live (dari chat live): `comments`, `gifts`, `gift_gold`, `gift_points`, `gift_breakdown`, `unique_gifters`,
`top_gifters` (dihitung dari gift yang terdengar selama live).
Semua live: `viewer_series` (`[menit sejak mulai, penonton]`, satu sampel per menit).

### Estimasi nilai gift

Jika statistik tersedia, `estimated_gift_value_idr` berisi estimasi nilai gift dalam rupiah, `gift_rate_idr` rate per unit, dan `gift_value_basis` adalah `gold` (IDN) atau `paid_points` (SHOWROOM).

- IDN: `gift_gold × 2500` (bukan `gift_points`).
- SHOWROOM: `gift_points × 114.26`, hanya gift berbayar; gift gratis/star tidak dikonversi.
- Rate ini asumsi referensi dari [contoh IDN](https://48live.my.id/recent/125470651794648686) dan [contoh SHOWROOM](https://48live.my.id/recent/1794067713510064), bukan harga resmi atau kurs terkini. Rate aktual bisa berbeda antar sesi/paket pembelian.
- Ini **bukan pendapatan bersih member**. Hanya menghitung gift yang berhasil dicatat bot, yang bisa tidak lengkap. Data historis tanpa statistik tidak dianggap nol.
- Rate bisa diatur lewat environment `IDN_GOLD_RATE_IDR` dan `SHOWROOM_POINT_RATE_IDR`; rate tersimpan pada arsip agar asumsi hitungnya jelas.


## Sedang live

| Member | Platform | Caption | Mulai (WIB) | Penonton |
|---|---|---|---|---|
| _Belum ada yang live_ | | | | |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Lyn | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 23.47 | 3m | 89 | 0 | — | — | 0 |
| Delynn | IDN Live | Hello | 22 Nov 2026, 23.17 | 32m | 3.548 | 0 | — | — | 0 |
| Erine | IDN Live | hai | 22 Nov 2026, 23.11 | 38m | 5.917 | 0 | — | — | 0 |
| Anindya | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 23.03 | 46m | 4.335 | 0 | — | — | 0 |
| Ella | IDN Live | yey | 22 Nov 2026, 22.47 | 62m | 6.940 | 0 | — | — | 0 |
| Michie | IDN Live | hello | 22 Nov 2026, 22.40 | 69m | 10.107 | 0 | — | — | 0 |
| Greesel | IDN Live | hi | 22 Nov 2026, 22.38 | 63m | 8.820 | 0 | — | — | 0 |
| Indah | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 22.34 | 62m | 9.109 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 22 Nov 2026, 22.33 | 64m | 9.363 | 0 | — | — | 0 |
| Marsha | IDN Live | Plisss | 22 Nov 2026, 22.32 | 64m | 9.089 | 0 | — | — | 0 |
| Ribka | IDN Live | P | 22 Nov 2026, 21.23 | 68m | 6.163 | 0 | — | — | 0 |
| Nayla | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 21.20 | 72m | 4.185 | 0 | — | — | 0 |
| Gita | IDN Live | Gits | 22 Nov 2026, 20.23 | 62m | 4.146 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 18.57 | 33m | 1.747 | 0 | — | — | 0 |
| Sona | IDN Live | HMMMM | 22 Nov 2026, 18.45 | 61m | 4.056 | 0 | — | — | 0 |
| JKT48 | IDN Live | Pertaruhan Cinta - 2026/11/22 | 22 Nov 2026, 18.44 | 155m | 906 | 0 | — | — | 0 |
| Sona | IDN Live | HMMMM | 22 Nov 2026, 18.44 | 0m | 0 | 0 | — | — | 0 |
| Muthe | IDN Live | Hi | 22 Nov 2026, 18.29 | 66m | 5.833 | 0 | — | — | 0 |
| Jazzy | IDN Live | ehhhh rame nic | 22 Nov 2026, 17.37 | 67m | 3.689 | 0 | — | — | 0 |
| Fahira | IDN Live | ada apa??? | 22 Nov 2026, 17.34 | 78m | 5.457 | 0 | — | — | 0 |
| Maxine | IDN Live | haaaii | 22 Nov 2026, 17.30 | 78m | 5.189 | 0 | — | — | 0 |
| Aralie | IDN Live | hai  | 22 Nov 2026, 16.18 | 68m | 5.333 | 0 | — | — | 0 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 16.00 | 63m | 3.128 | 0 | — | — | 0 |
| Carissa | IDN Live | Lagi apa cuyy | 22 Nov 2026, 15.30 | 46m | 2.956 | 0 | — | — | 0 |
| Fera | IDN Live | Ayo masuk | 22 Nov 2026, 15.29 | 46m | 2.337 | 0 | — | — | 0 |
| Giaa | IDN Live | p | 22 Nov 2026, 15.14 | 66m | 2.849 | 0 | — | — | 0 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 15.11 | 71m | 5.718 | 0 | — | — | 0 |
| Intan | IDN Live | ama mimaaa | 22 Nov 2026, 15.11 | 71m | 5.748 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 15.06 | 59m | 3.248 | 0 | — | — | 0 |
| Lana | IDN Live | Haii | 22 Nov 2026, 14.00 | 63m | 4.554 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 22 Nov 2026, 13.46 | 67m | 3.394 | 0 | — | — | 0 |
| Eli | IDN Live | Get ready with ECEU BUDHE | 22 Nov 2026, 13.23 | 89m | 3.595 | 0 | — | — | 0 |
| Eli | IDN Live | Get ready with ECEU BUDHE | 22 Nov 2026, 13.19 | 4m | 70 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 12.50 | 33m | 2.918 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 12.45 | 4m | 179 | 0 | — | — | 0 |
| Rara | IDN Live | Hihu | 22 Nov 2026, 12.16 | 68m | 2.472 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 10.56 | 67m | 2.620 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 22 Nov 2026, 10.46 | 63m | 2.245 | 0 | — | — | 0 |
| Fritzy | IDN Live | grem in sunday | 22 Nov 2026, 09.02 | 59m | 2.123 | 0 | — | — | 0 |
| Erine | IDN Live | havefunnnnn | 21 Nov 2026, 21.34 | 44m | 7.883 | 0 | — | — | 0 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
