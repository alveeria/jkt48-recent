# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 17 Nov 2026, 22.19 WIB.

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
| Lana | IDN Live | Hai | 17 Nov 2026, 21.11 | 7.253 |
| Lulu | IDN Live | mlm | 17 Nov 2026, 21.31 | 3.825 |
| Gracie | IDN Live | hiii | 17 Nov 2026, 21.32 | 5.112 |
| Fritzy | IDN Live | g(u)rwm | 17 Nov 2026, 21.37 | 5.057 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 21.50 | 3.077 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Ella | IDN Live | aloo | 17 Nov 2026, 21.50 | 8m | 1.226 | 12 | 45 | — | 1.188 |
| Ella | IDN Live | Haiiiii | 17 Nov 2026, 21.36 | 12m | 2.481 | 2 | 9 | — | 738 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 21.36 | 33m | 1.985 | 30 | 554 | — | 234 |
| Gita | IDN Live | Gits | 17 Nov 2026, 21.05 | 68m | 6.540 | 40 | 635 | — | 1.410 |
| Nayla | IDN Live | N | 17 Nov 2026, 20.58 | 70m | 5.295 | 33 | 605 | — | 1.348 |
| Fiony | SHOWROOM |  | 17 Nov 2026, 19.27 | 102m | 14.948 | 1.058 | 16.171 | 1.058 | 4.564 |
| JKT48 | IDN Live | Temen Main Ep.3 | 17 Nov 2026, 15.53 | 30m | 4.324 | 22 | 607 | — | 337 |
| Olla | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 15.44 | 39m | 3.290 | 26 | 275 | — | 581 |
| Maira | IDN Live | Let’s go!!! | 17 Nov 2026, 15.39 | 43m | 3.725 | 16 | 241 | — | 148 |
| Rilly | IDN Live | Ngobsss | 17 Nov 2026, 15.28 | 55m | 4.381 | 42 | 1.022 | — | 595 |
| Virgi | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 15.14 | 69m | 6.452 | 34 | 1.664 | — | 1.211 |
| Muthe | IDN Live | Hi | 17 Nov 2026, 15.05 | 78m | 8.775 | 52 | 1.199 | — | 3.080 |
| Giaa | IDN Live | p | 17 Nov 2026, 14.49 | 65m | 3.362 | 27 | 551 | — | 521 |
| Ralyne | IDN Live | HAIII | 17 Nov 2026, 14.37 | 87m | 6.088 | 36 | 888 | — | 714 |
| Sona | IDN Live | haihaiahi | 17 Nov 2026, 14.28 | 66m | 3.804 | 51 | 1.262 | — | 1.578 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 14.24 | 68m | 4.723 | 59 | 1.453 | — | 3.072 |
| Greesel | IDN Live | hi | 17 Nov 2026, 14.13 | 64m | 5.259 | 52 | 537 | — | 1.415 |
| Greesel | IDN Live | hi | 17 Nov 2026, 14.11 | 1m | 160 | 0 | — | — | 83 |
| Lily | IDN Live | Hii | 17 Nov 2026, 14.07 | 62m | 6.332 | 60 | 1.038 | — | 1.950 |
| Carissa | IDN Live | Ready ready sama aku siniii 😽 | 17 Nov 2026, 14.03 | 71m | 3.653 | 30 | 672 | — | 1.453 |
| Fera | IDN Live | Ayo masuk | 17 Nov 2026, 13.57 | 77m | 3.924 | 31 | 523 | — | 641 |
| Jazzy | IDN Live | jejita | 17 Nov 2026, 13.56 | 81m | 5.225 | 67 | 1.222 | — | 2.670 |
| Maxine | IDN Live | hi | 17 Nov 2026, 13.46 | 43m | 2.207 | 36 | 517 | — | 1.686 |
| Daisy | IDN Live | haii | 17 Nov 2026, 13.20 | 61m | 2.140 | 13 | 268 | — | 360 |
| Danella | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 13.13 | 67m | 2.444 | 21 | 399 | — | 538 |
| Intan | IDN Live | p | 17 Nov 2026, 12.21 | 67m | 4.630 | 51 | 1.205 | — | 3.908 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 12.07 | 63m | 3.693 | 36 | 1.105 | — | 1.788 |
| Rara | IDN Live | SERIUSAN | 17 Nov 2026, 11.19 | 65m | 1.433 | 23 | 312 | — | 1.020 |
| Lily | IDN Live | Hai | 16 Nov 2026, 22.09 | 32m | 4.980 | 38 | 1.071 | — | 1.064 |
| Trisha | IDN Live | haai | 16 Nov 2026, 22.08 | 32m | 5.021 | 43 | 672 | — | 2.340 |
| Greesel | IDN Live | hi | 16 Nov 2026, 21.43 | 57m | 5.444 | 53 | 1.327 | — | 1.002 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 21.35 | 62m | 4.901 | 42 | 438 | — | 1.457 |
| Lana | IDN Live | Hai | 16 Nov 2026, 21.35 | 65m | 6.167 | 123 | 4.201 | — | 3.256 |
| Lia | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 21.28 | 66m | 4.198 | 39 | 727 | — | 1.417 |
| Erine | IDN Live | erin boss  | 16 Nov 2026, 21.10 | 90m | 18.071 | 88 | 1.515 | — | 13.752 |
| Jessi | IDN Live | hi | 16 Nov 2026, 21.05 | 85m | 6.143 | 47 | 808 | — | 3.202 |
| Aralie | IDN Live | hi | 16 Nov 2026, 21.01 | 73m | 12.944 | 43 | 1.424 | — | 2.972 |
| Danella | IDN Live | ☺️ | 16 Nov 2026, 20.51 | 98m | 4.993 | 63 | 1.011 | — | 846 |
| Eli | IDN Live | KaraokELI | 16 Nov 2026, 20.43 | 117m | 7.698 | 18 | 160 | — | 872 |
| Daisy | IDN Live | Hi | 16 Nov 2026, 20.41 | 62m | 3.319 | 23 | 954 | — | 708 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
