# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 28 Nov 2026, 21.28 WIB.

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
| Indah | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 20.50 | 9.208 |
| Nayla | IDN Live | (^^) | 28 Nov 2026, 21.16 | 944 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Anindya | IDN Live | hlo | 28 Nov 2026, 20.50 | 32m | 6.478 | 0 | — | — | 0 |
| Lulu | IDN Live | p | 28 Nov 2026, 17.18 | 32m | 2.251 | 0 | — | — | 0 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 16.28 | 61m | 3.044 | 0 | — | — | 0 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 16.12 | 112m | 6.202 | 0 | — | — | 0 |
| JKT48 | IDN Live | JKT48 2nd Generation Special Stage | 28 Nov 2026, 15.44 | 167m | 3.593 | 0 | — | — | 0 |
| Levi | IDN Live | hai | 28 Nov 2026, 14.33 | 0m | 7 | 0 | — | — | 0 |
| Gita | IDN Live | Gits | 28 Nov 2026, 14.20 | 14m | 1.441 | 0 | — | — | 0 |
| Sona | IDN Live | maaf ngaret | 28 Nov 2026, 14.13 | 21m | 727 | 0 | — | — | 0 |
| Rilly | IDN Live | Yassssss | 28 Nov 2026, 13.45 | 48m | 1.368 | 0 | — | — | 0 |
| Rara | IDN Live | Hallloo | 28 Nov 2026, 12.47 | 64m | 1.761 | 0 | — | — | 0 |
| Carissa | IDN Live | Temenin mek ap 😼 | 28 Nov 2026, 12.29 | 77m | 2.637 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 11.54 | 64m | 3.659 | 0 | — | — | 0 |
| Lily | IDN Live | Hii | 28 Nov 2026, 11.32 | 49m | 14.452 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 28 Nov 2026, 11.18 | 65m | 7.462 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 10.00 | 48m | 4.106 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 28 Nov 2026, 09.22 | 37m | 3.701 | 0 | — | — | 0 |
| Jessi | IDN Live | josjis | 28 Nov 2026, 09.21 | 68m | 8.066 | 0 | — | — | 0 |
| Anindya | IDN Live | hlo | 28 Nov 2026, 09.20 | 32m | 5.747 | 0 | — | — | 0 |
| Michie | IDN Live | grwm | 28 Nov 2026, 09.20 | 76m | 12.249 | 0 | — | — | 0 |
| Fahira | IDN Live | ada apa??? | 27 Nov 2026, 20.47 | 5m | 327 | 0 | — | — | 0 |
| Levi | IDN Live | hai | 27 Nov 2026, 20.40 | 12m | 1.533 | 0 | — | — | 0 |
| Sona | IDN Live | haiiii | 27 Nov 2026, 20.30 | 21m | 1.183 | 0 | — | — | 0 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 20.08 | 43m | 4.597 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 27 Nov 2026, 19.58 | 53m | 3.151 | 0 | — | — | 0 |
| Jessi | IDN Live | josjis | 27 Nov 2026, 19.47 | 64m | 6.075 | 0 | — | — | 0 |
| Fera | IDN Live | Ayo masuk | 27 Nov 2026, 19.01 | 73m | 4.027 | 0 | — | — | 0 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 18.03 | 0m | 0 | 0 | — | — | 0 |
| Rara | IDN Live | Haii | 27 Nov 2026, 17.33 | 68m | 3.100 | 0 | — | — | 0 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 17.25 | 38m | 4.301 | 0 | — | — | 0 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 17.24 | 34m | 2.336 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 17.24 | 70m | 3.734 | 0 | — | — | 0 |
| Muthe | IDN Live | Hi | 27 Nov 2026, 16.45 | 62m | 4.979 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 27 Nov 2026, 15.22 | 84m | 3.873 | 0 | — | — | 0 |
| Michie | IDN Live | hello | 27 Nov 2026, 15.21 | 74m | 11.328 | 0 | — | — | 0 |
| Anindya | IDN Live | hlo | 27 Nov 2026, 15.21 | 87m | 7.777 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 15.21 | 87m | 8.950 | 0 | — | — | 0 |
| Indah | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 15.20 | 87m | 11.685 | 0 | — | — | 0 |
| Gita | IDN Live | Gits | 27 Nov 2026, 14.56 | 34m | 4.915 | 0 | — | — | 0 |
| Virgi | IDN Live | iya | 27 Nov 2026, 14.44 | 104m | 8.053 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 27 Nov 2026, 08.37 | 59m | 1.011 | 0 | — | — | 0 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
