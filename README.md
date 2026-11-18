# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 19 Nov 2026, 01.32 WIB.

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
| Nayla | IDN Live | N | 19 Nov 2026, 00.22 | 58m | 1.177 | 27 | 441 | — | 831 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 22.23 | 80m | 4.654 | 66 | 1.298 | — | 1.812 |
| Lulu | IDN Live | mlm | 18 Nov 2026, 22.22 | 69m | 3.530 | 22 | 1.432 | — | 1.361 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 22.22 | 63m | 2.141 | 47 | 1.052 | — | 946 |
| Christy | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 21.56 | 77m | 13.872 | 85 | 1.484 | — | 3.254 |
| Muthe | IDN Live | Hi | 18 Nov 2026, 21.56 | 76m | 7.617 | 24 | 534 | — | 598 |
| Jessi | IDN Live | hi | 18 Nov 2026, 21.55 | 76m | 5.874 | 43 | 523 | — | 1.003 |
| Olla | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 21.55 | 77m | 9.564 | 34 | 426 | — | 925 |
| Elin | IDN Live | Hai | 18 Nov 2026, 21.49 | 66m | 3.636 | 18 | 349 | — | 912 |
| Gracie | IDN Live | hiii | 18 Nov 2026, 21.01 | 60m | 7.196 | 57 | 672 | — | 1.654 |
| Greesel | IDN Live | hi | 18 Nov 2026, 20.57 | 61m | 8.210 | 44 | 1.553 | — | 1.107 |
| Ella | IDN Live | aloo | 18 Nov 2026, 20.57 | 63m | 8.336 | 65 | 1.158 | — | 2.240 |
| Michie | IDN Live | live  aja | 18 Nov 2026, 20.40 | 75m | 11.374 | 96 | 1.844 | — | 4.821 |
| Eli | IDN Live | Ngapain ya ? | 18 Nov 2026, 20.40 | 98m | 7.340 | 17 | 59 | — | 499 |
| Kathrina | IDN Live | wazzap | 18 Nov 2026, 20.25 | 69m | 8.068 | 63 | 701 | — | 1.866 |
| Danella | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 19.55 | 67m | 3.441 | 6 | 211 | — | 188 |
| JKT48 | IDN Live | Pertaruhan Cinta - 2026/11/18 | 18 Nov 2026, 18.51 | 126m | 596 | 0 | — | — | 84 |
| Sona | IDN Live | haihaiahi | 18 Nov 2026, 16.31 | 19m | 1.078 | 9 | 50 | — | 729 |
| Fahira | IDN Live | ada apa??? | 18 Nov 2026, 16.20 | 30m | 1.511 | 7 | 46 | — | 884 |
| Rilly | IDN Live | GEREEEMMM | 18 Nov 2026, 15.51 | 59m | 2.328 | 12 | 382 | — | 867 |
| Oniel | IDN Live | saya kembali | 18 Nov 2026, 15.36 | 64m | 4.787 | 59 | 1.949 | — | 2.299 |
| Fera | IDN Live | Ayo masuk | 18 Nov 2026, 15.32 | 78m | 3.175 | 33 | 366 | — | 1.607 |
| Jazzy | IDN Live | bogor hujang | 18 Nov 2026, 15.30 | 63m | 3.275 | 56 | 911 | — | 4.398 |
| Ralyne | IDN Live | HAIII | 18 Nov 2026, 14.56 | 69m | 2.712 | 37 | 606 | — | 1.338 |
| Lia | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 13.42 | 60m | 2.384 | 42 | 1.554 | — | 1.003 |
| Daisy | IDN Live | Hi | 18 Nov 2026, 13.03 | 62m | 2.248 | 9 | 393 | — | 555 |
| Intan | IDN Live | bubbb | 18 Nov 2026, 12.19 | 77m | 5.630 | 80 | 3.241 | — | 4.564 |
| Fritzy | IDN Live | GRWM | 18 Nov 2026, 11.24 | 72m | 4.466 | 39 | 1.212 | — | 4.145 |
| Aralie | IDN Live | hi | 18 Nov 2026, 08.58 | 34m | 5.185 | 22 | 556 | — | 1.169 |
| Erine | IDN Live | erin boss  | 18 Nov 2026, 08.58 | 33m | 7.020 | 34 | 410 | — | 2.076 |
| Nala | SHOWROOM |  | 17 Nov 2026, 23.39 | 42m | 3.194 | 601 | 2.027 | 731 | 581 |
| Nachia | SHOWROOM |  | 17 Nov 2026, 23.39 | 65m | 4.188 | 728 | 5.713 | 732 | 1.167 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 22.58 | 7m | 602 | 5 | 8 | — | 177 |
| Ekin | IDN Live | hai | 17 Nov 2026, 22.52 | 84m | 5.830 | 117 | 3.219 | — | 11.061 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 21.50 | 67m | 6.218 | 43 | 1.483 | — | 2.609 |
| Ella | IDN Live | aloo | 17 Nov 2026, 21.50 | 8m | 1.226 | 12 | 45 | — | 1.188 |
| Fritzy | IDN Live | g(u)rwm | 17 Nov 2026, 21.37 | 65m | 6.948 | 76 | 2.161 | — | 3.718 |
| Ella | IDN Live | Haiiiii | 17 Nov 2026, 21.36 | 12m | 2.481 | 2 | 9 | — | 738 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 21.36 | 33m | 1.985 | 30 | 554 | — | 234 |
| Gracie | IDN Live | hiii | 17 Nov 2026, 21.32 | 72m | 7.113 | 44 | 590 | — | 1.639 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
