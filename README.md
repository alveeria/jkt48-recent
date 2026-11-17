# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 17 Nov 2026, 13.22 WIB.

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
| Intan | IDN Live | p | 17 Nov 2026, 12.21 | 4.281 |
| Danella | IDN Live | Ayo ngobrol bareng! | 17 Nov 2026, 13.13 | 359 |
| Daisy | IDN Live | haii | 17 Nov 2026, 13.20 | 85 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
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
| Anindya | IDN Live | HALO!! | 16 Nov 2026, 20.32 | 124m | 10.566 | 53 | 1.531 | — | 5.370 |
| Christy | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 19.36 | 70m | 19.734 | 114 | 3.047 | — | 5.635 |
| Delynn | IDN Live | malms bosku | 16 Nov 2026, 19.35 | 70m | 19.108 | 77 | 3.799 | — | 3.007 |
| Lulu | IDN Live | hi | 16 Nov 2026, 19.04 | 66m | 7.290 | 42 | 619 | — | 2.473 |
| Gita | IDN Live | Gits | 16 Nov 2026, 18.19 | 63m | 4.182 | 52 | 868 | — | 1.414 |
| Olla | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 16.10 | 99m | 4.645 | 32 | 457 | — | 1.658 |
| Nayla | IDN Live | Manadooo | 16 Nov 2026, 16.00 | 75m | 3.226 | 12 | 287 | — | 538 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 15.40 | 46m | 4.090 | 23 | 617 | — | 1.078 |
| Virgi | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 15.39 | 46m | 3.615 | 24 | 855 | — | 553 |
| Giaa | IDN Live | p | 16 Nov 2026, 15.37 | 39m | 2.514 | 20 | 199 | — | 432 |
| Michie | IDN Live | live  aja | 16 Nov 2026, 15.28 | 57m | 6.730 | 87 | 1.333 | — | 4.951 |
| Elin | IDN Live | Hai | 16 Nov 2026, 15.25 | 60m | 2.837 | 18 | 299 | — | 733 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 15.21 | 63m | 3.587 | 19 | 221 | — | 393 |
| Bella | IDN Live | Hellooo | 16 Nov 2026, 15.06 | 34m | 2.557 | 16 | 420 | — | 1.081 |
| Bella | IDN Live | Hellooo | 16 Nov 2026, 15.02 | 3m | 389 | 0 | — | — | 81 |
| Muthe | IDN Live | Hi | 16 Nov 2026, 15.01 | 62m | 4.790 | 22 | 519 | — | 1.082 |
| Ekin | IDN Live | hai | 16 Nov 2026, 14.43 | 85m | 8.477 | 127 | 2.753 | — | 11.035 |
| Rilly | IDN Live | GEREEEMMM | 16 Nov 2026, 14.41 | 69m | 3.692 | 19 | 348 | — | 875 |
| Carissa | IDN Live | hhhhaaaalllloooo🥰 | 16 Nov 2026, 13.59 | 72m | 3.155 | 40 | 786 | — | 2.321 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 16 Nov 2026, 13.24 | 64m | 3.087 | 51 | 1.391 | — | 3.725 |
| Gracie | IDN Live | hiii | 16 Nov 2026, 13.02 | 63m | 3.594 | 51 | 1.718 | — | 2.051 |
| Intan | IDN Live | p | 16 Nov 2026, 10.53 | 66m | 3.319 | 32 | 1.073 | — | 1.434 |
| Lulu | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.35 | 5m | 519 | 0 | — | — | 160 |
| Elin | IDN Live | Yowww | 15 Nov 2026, 22.28 | 12m | 779 | 8 | 174 | — | 130 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.24 | 17m | 2.069 | 4 | 18 | — | 431 |
| Lia | IDN Live | Ayo ngobrol bareng! | 15 Nov 2026, 22.17 | 23m | 2.743 | 18 | 254 | — | 712 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
