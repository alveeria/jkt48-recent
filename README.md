# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 16 Nov 2026, 13.29 WIB.

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
| Gracie | IDN Live | hiii | 16 Nov 2026, 13.02 | 1.774 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 13.24 | 348 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Intan | IDN Live | p | 16 Nov 2026, 10.53 | 66m | 3.319 | 32 | 1.073 | — | 1.434 |
| Lulu | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.35 | 5m | 519 | 0 | — | — | 160 |
| Elin | IDN Live | Yowww | 15 Nov 2026, 22.28 | 12m | 779 | 8 | 174 | — | 130 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.24 | 17m | 2.069 | 4 | 18 | — | 431 |
| Lia | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.17 | 23m | 2.743 | 18 | 254 | — | 712 |
| Nala | IDN Live | MALAMin | 15 Nov 2026, 21.44 | 56m | 10.564 | 100 | 1.735 | — | 6.298 |
| Eli | IDN Live | KaraokELI | 15 Nov 2026, 20.52 | 62m | 3.635 | 24 | 149 | — | 645 |
| Daisy | IDN Live | Hi | 15 Nov 2026, 20.39 | 65m | 2.609 | 31 | 506 | — | 739 |
| Danella | IDN Live | ☺️ | 15 Nov 2026, 20.25 | 33m | 1.183 | 9 | 101 | — | 262 |
| Delynn | IDN Live | Hello | 15 Nov 2026, 19.56 | 96m | 19.133 | 183 | 3.066 | — | 7.733 |
| Aralie | IDN Live | hi | 15 Nov 2026, 19.28 | 78m | 13.910 | 87 | 1.526 | — | 7.293 |
| JKT48 | IDN Live | Pertaruhan Cinta - 2026/11/15 | 15 Nov 2026, 18.44 | 158m | 959 | 6 | 109 | — | 1.006 |
| Levi | IDN Live | hai | 15 Nov 2026, 18.39 | 66m | 8.264 | 52 | 1.142 | — | 2.778 |
| Ribka | IDN Live | nagu mania | 15 Nov 2026, 18.32 | 64m | 6.674 | 19 | 360 | — | 882 |
| Olla | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 18.28 | 50m | 4.886 | 45 | 423 | — | 1.119 |
| Nachia | IDN Live | hi | 15 Nov 2026, 18.13 | 32m | 4.138 | 30 | 647 | — | 1.679 |
| Jessi | IDN Live | hi lg main | 15 Nov 2026, 18.00 | 71m | 7.386 | 44 | 440 | — | 1.138 |
| Olla | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 17.59 | 29m | 3.535 | 34 | 414 | — | 537 |
| Rilly | IDN Live | mau ngobs sm ka nuys | 15 Nov 2026, 17.51 | 69m | 4.771 | 62 | 1.313 | — | 548 |
| Intan | IDN Live | Gantian device ama  rilly😄🙏🏽 | 15 Nov 2026, 17.51 | 75m | 8.863 | 81 | 2.290 | — | 2.301 |
| Nachia | IDN Live | hi | 15 Nov 2026, 17.21 | 33m | 3.773 | 57 | 1.711 | — | 2.530 |
| Greesel | IDN Live | hi | 15 Nov 2026, 17.08 | 64m | 6.627 | 55 | 1.054 | — | 1.445 |
| Lana | IDN Live | Hai | 15 Nov 2026, 17.05 | 71m | 7.018 | 56 | 1.146 | — | 2.394 |
| Ekin | IDN Live | hai | 15 Nov 2026, 17.02 | 65m | 7.597 | 81 | 3.160 | — | 11.045 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 16.58 | 63m | 5.708 | 31 | 510 | — | 1.417 |
| Heidi | IDN Live | wooo | 15 Nov 2026, 16.40 | 60m | 3.214 | 13 | 1.537 | — | 845 |
| Bella | IDN Live | Hellooo | 15 Nov 2026, 16.39 | 63m | 5.135 | 27 | 327 | — | 660 |
| Gita | IDN Live | Gits | 15 Nov 2026, 16.33 | 65m | 6.016 | 23 | 238 | — | 637 |
| Gita | IDN Live | Gits | 15 Nov 2026, 16.31 | 2m | 163 | 0 | — | — | 89 |
| Ralyne | IDN Live | HAIII | 15 Nov 2026, 16.07 | 97m | 6.083 | 31 | 274 | — | 429 |
| Sona | IDN Live | rakitttttt | 15 Nov 2026, 16.07 | 93m | 5.948 | 26 | 417 | — | 801 |
| Maxine | IDN Live | haaaiiii | 15 Nov 2026, 15.30 | 42m | 2.087 | 60 | 605 | — | 2.710 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 15.21 | 51m | 3.549 | 35 | 466 | — | 1.721 |
| Giaa | IDN Live | p | 15 Nov 2026, 15.21 | 51m | 2.335 | 35 | 271 | — | 469 |
| Michie | IDN Live | live  aja | 15 Nov 2026, 13.43 | 61m | 7.388 | 82 | 1.317 | — | 6.593 |
| Rara | IDN Live | temeninnn | 15 Nov 2026, 12.44 | 71m | 2.338 | 56 | 679 | — | 1.237 |
| Jazzy | IDN Live | when ya | 15 Nov 2026, 12.31 | 70m | 3.463 | 68 | 1.187 | — | 5.224 |
| Muthe | IDN Live | Hi | 15 Nov 2026, 12.17 | 63m | 3.485 | 16 | 320 | — | 937 |
| Fritzy | IDN Live | hellooo | 15 Nov 2026, 09.03 | 75m | 4.120 | 58 | 1.866 | — | 3.969 |
| Nala | IDN Live | HELO | 14 Nov 2026, 23.34 | 67m | 5.670 | 55 | 1.092 | — | 2.819 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
