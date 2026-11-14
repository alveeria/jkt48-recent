# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 14 Nov 2026, 18.06 WIB.

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


## Sedang live

| Member | Platform | Caption | Mulai (WIB) | Penonton |
|---|---|---|---|---|
| Fera | IDN Live | Ayo masuk | 14 Nov 2026, 17.14 | 2.356 |
| Ralyne | IDN Live | HAIII | 14 Nov 2026, 17.14 | 2.960 |
| Bella | IDN Live | Hellooo | 14 Nov 2026, 17.14 | 3.642 |
| Sona | IDN Live | mam | 14 Nov 2026, 17.14 | 3.386 |
| Jessi | IDN Live | hi | 14 Nov 2026, 17.34 | 2.180 |
| Giaa | IDN Live | p | 14 Nov 2026, 17.52 | 737 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 14 Nov 2026, 17.52 | 1.718 |
| Intan | IDN Live | yu idn | 14 Nov 2026, 17.52 | 2.037 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Anindya | IDN Live | HALO!! | 14 Nov 2026, 16.31 | 65m | 4.755 | 25 | 1.365 | — | 865 |
| Ekin | IDN Live | hai | 14 Nov 2026, 16.31 | 68m | 7.108 | 101 | 3.735 | — | 6.961 |
| Muthe | IDN Live | Hi | 14 Nov 2026, 16.06 | 46m | 3.342 | 17 | 347 | — | 1.182 |
| Fahira | IDN Live | ada apa??? | 14 Nov 2026, 15.35 | 77m | 3.430 | 44 | 1.089 | — | 2.075 |
| Carissa | IDN Live | Sini temenin akuu ✨ | 14 Nov 2026, 15.05 | 70m | 2.919 | 30 | 493 | — | 2.498 |
| Maira | IDN Live | Let’s go!!! | 14 Nov 2026, 14.57 | 106m | 5.067 | 33 | 505 | — | 1.605 |
| Virgi | IDN Live | Ayo ngobrol bareng! | 14 Nov 2026, 14.57 | 106m | 5.688 | 44 | 1.091 | — | 2.036 |
| Lily | IDN Live | Haii | 14 Nov 2026, 14.34 | 35m | 3.727 | 37 | 906 | — | 1.935 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 14 Nov 2026, 13.42 | 64m | 1.927 | 45 | 524 | — | 370 |
| Rara | IDN Live | 💗💗 | 14 Nov 2026, 11.50 | 68m | 1.498 | 35 | 689 | — | 1.415 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 14 Nov 2026, 05.17 | 71m | 2.962 | 54 | 1.147 | — | 4.146 |
| Erine | IDN Live | diroriiiii | 13 Nov 2026, 22.38 | 111m | 17.110 | 47 | 799 | — | 8.176 |
| Nachia | IDN Live | hi | 13 Nov 2026, 22.26 | 42m | 6.708 | 17 | 130 | — | 1.103 |
| Nala | IDN Live | HELO | 13 Nov 2026, 22.25 | 43m | 7.976 | 27 | 549 | — | 2.110 |
| Lily | IDN Live | Buka paket | 13 Nov 2026, 22.18 | 50m | 7.154 | 43 | 1.835 | — | 2.370 |
| Greesel | IDN Live | hi | 13 Nov 2026, 22.11 | 57m | 6.880 | 79 | 1.438 | — | 1.639 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 21.41 | 64m | 4.097 | 25 | 543 | — | 1.200 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 21.36 | 4m | 330 | 0 | — | — | 66 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 21.28 | 7m | 504 | 1 | 3 | — | 80 |
| Fritzy | IDN Live | hai | 13 Nov 2026, 21.01 | 65m | 5.295 | 45 | 720 | — | 2.923 |
| Delynn | IDN Live | WHATSAPPP | 13 Nov 2026, 20.48 | 84m | 12.838 | 112 | 1.681 | — | 3.489 |
| Olla | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 20.35 | 70m | 6.190 | 42 | 460 | — | 1.072 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 20.24 | 59m | 5.901 | 36 | 760 | — | 2.445 |
| Gita | IDN Live | Gits | 13 Nov 2026, 20.23 | 83m | 8.615 | 81 | 988 | — | 1.057 |
| Lia | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 19.36 | 69m | 6.092 | 4 | 14 | — | 30 |
| Aralie | IDN Live | hi | 13 Nov 2026, 19.35 | 71m | 12.788 | 42 | 796 | — | 4.699 |
| Nayla | IDN Live | Manadooo | 13 Nov 2026, 19.35 | 71m | 7.152 | 33 | 593 | — | 875 |
| Elin | IDN Live | Hai | 13 Nov 2026, 19.33 | 72m | 5.541 | 24 | 251 | — | 908 |
| Lana | IDN Live | Hai | 13 Nov 2026, 18.46 | 74m | 7.131 | 45 | 1.098 | — | 2.738 |
| JKT48 | IDN Live | Pajama Drive - 2026/11/13 | 13 Nov 2026, 18.46 | 138m | 380 | 4 | 104 | — | 528 |
| Giaa | IDN Live | p | 13 Nov 2026, 18.32 | 63m | 2.680 | 30 | 369 | — | 865 |
| Fahira | IDN Live | ada apa??? | 13 Nov 2026, 15.42 | 41m | 2.890 | 0 | — | — | 5 |
| Ralyne | IDN Live | HAIII | 13 Nov 2026, 15.41 | 41m | 2.957 | 23 | 1.162 | — | 455 |
| Rara | IDN Live | 💗💗 | 13 Nov 2026, 15.38 | 47m | 1.969 | 12 | 250 | — | 354 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 15.02 | 64m | 2.299 | 24 | 523 | — | 275 |
| Kathrina | IDN Live | wazzap | 13 Nov 2026, 14.47 | 2m | 274 | 0 | — | — | 42 |
| Bella | IDN Live | Hellooo | 13 Nov 2026, 14.33 | 17m | 1.371 | 15 | 486 | — | 191 |
| Fera | IDN Live | Ayo masuk | 13 Nov 2026, 14.33 | 17m | 806 | 8 | 358 | — | 193 |
| Jazzy | IDN Live | semangatin pajama drive nyaaa sini | 13 Nov 2026, 14.29 | 20m | 1.404 | 12 | 192 | — | 474 |
| Carissa | IDN Live | Hello helloo 😚 | 13 Nov 2026, 14.26 | 23m | 1.666 | 17 | 398 | — | 327 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
