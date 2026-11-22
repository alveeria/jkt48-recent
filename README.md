# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 22 Nov 2026, 15.11 WIB.

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
| Lia | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 15.06 | 314 |
| Intan | IDN Live | ama mimaaa | 22 Nov 2026, 15.11 | 46 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 22 Nov 2026, 15.11 | 4 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
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
| Olla | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 21.06 | 68m | 6.066 | 0 | — | — | 0 |
| Aralie | IDN Live | hai  | 21 Nov 2026, 20.42 | 66m | 8.332 | 0 | — | — | 0 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 20.35 | 72m | 6.871 | 0 | — | — | 0 |
| Christy | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 20.27 | 18m | 3.349 | 0 | — | — | 0 |
| Jessi | IDN Live | laper | 21 Nov 2026, 20.24 | 67m | 6.990 | 0 | — | — | 0 |
| Muthe | IDN Live | Bersama JC n CH | 21 Nov 2026, 20.24 | 62m | 6.571 | 0 | — | — | 0 |
| Fritzy | IDN Live | Hi | 21 Nov 2026, 19.49 | 61m | 6.905 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 19.48 | 61m | 3.324 | 0 | — | — | 0 |
| Marsha | IDN Live | Plisss | 21 Nov 2026, 19.46 | 63m | 8.290 | 0 | — | — | 0 |
| Eli | IDN Live | Ngapain ya ? | 21 Nov 2026, 19.18 | 101m | 6.162 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 18.14 | 78m | 3.909 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 21 Nov 2026, 17.59 | 62m | 2.271 | 0 | — | — | 0 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 16.06 | 63m | 1.727 | 0 | — | — | 0 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 14.14 | 6m | 395 | 0 | — | — | 0 |
| Fera | IDN Live | Ayo masuk | 21 Nov 2026, 14.09 | 11m | 598 | 0 | — | — | 0 |
| Intan | IDN Live | ama jemima giaa | 21 Nov 2026, 13.40 | 40m | 3.608 | 0 | — | — | 0 |
| Giaa | IDN Live | p | 21 Nov 2026, 13.39 | 41m | 1.975 | 0 | — | — | 0 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 13.31 | 49m | 3.601 | 0 | — | — | 0 |
| Michie | IDN Live | live  aja | 21 Nov 2026, 12.49 | 34m | 6.549 | 0 | — | — | 0 |
| Lana | IDN Live | Hii | 21 Nov 2026, 12.15 | 81m | 10.429 | 0 | — | — | 0 |
| Rilly | IDN Live | GEREEEMMM | 21 Nov 2026, 12.04 | 68m | 5.441 | 0 | — | — | 0 |
| Indah | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 11.55 | 63m | 6.702 | 0 | — | — | 0 |
| Levi | IDN Live | hai | 21 Nov 2026, 11.21 | 80m | 4.473 | 0 | — | — | 0 |
| Fritzy | IDN Live | grem | 21 Nov 2026, 09.04 | 40m | 2.254 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 08.00 | 19m | 324 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 23.33 | 30m | 1.409 | 0 | — | — | 0 |
| Eli | IDN Live | Ngapain ya ? | 20 Nov 2026, 23.25 | 37m | 1.157 | 0 | — | — | 0 |
| Nayla | IDN Live | N | 20 Nov 2026, 23.22 | 41m | 1.289 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 23.09 | 31m | 1.276 | 0 | — | — | 0 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
