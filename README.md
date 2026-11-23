# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 23 Nov 2026, 21.15 WIB.

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
| Fahira | IDN Live | ada apa??? | 23 Nov 2026, 20.31 | 3.518 |
| Fera | IDN Live | Ayo masuk | 23 Nov 2026, 20.36 | 2.560 |
| Michie | IDN Live | hello | 23 Nov 2026, 20.43 | 5.099 |
| Rara | IDN Live | Hayy hihu | 23 Nov 2026, 20.45 | 1.497 |
| Carissa | IDN Live | HIHUUUU 👍🏻 | 23 Nov 2026, 20.50 | 1.912 |
| Maxine | IDN Live | makan | 23 Nov 2026, 20.50 | 1.625 |
| Ekin | IDN Live | hai | 23 Nov 2026, 20.56 | 2.929 |
| Ralyne | IDN Live | HAIII | 23 Nov 2026, 20.58 | 1.170 |
| Intan | IDN Live | aku lg pake batik pekalongan? | 23 Nov 2026, 21.06 | 1.785 |
| Sona | IDN Live | maap ngaret | 23 Nov 2026, 21.07 | 644 |
| Jazzy | IDN Live | ehhhh rame nic | 23 Nov 2026, 21.11 | 314 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Danella | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 20.00 | 64m | 2.574 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 23 Nov 2026, 19.58 | 66m | 2.711 | 0 | — | — | 0 |
| Lulu | IDN Live | mlm | 23 Nov 2026, 19.41 | 60m | 4.112 | 0 | — | — | 0 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 19.30 | 67m | 6.247 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 23 Nov 2026, 18.50 | 60m | 9.110 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 18.47 | 60m | 5.742 | 0 | — | — | 0 |
| Indah | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 18.46 | 61m | 9.301 | 0 | — | — | 0 |
| Marsha | IDN Live | Plisss | 23 Nov 2026, 18.46 | 65m | 10.626 | 0 | — | — | 0 |
| Nala | IDN Live | MALAMin | 23 Nov 2026, 18.42 | 63m | 9.496 | 0 | — | — | 0 |
| Kathrina | IDN Live | w nala | 23 Nov 2026, 18.41 | 61m | 8.973 | 0 | — | — | 0 |
| Muthe | IDN Live | Hi | 23 Nov 2026, 18.20 | 80m | 6.565 | 0 | — | — | 0 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 17.03 | 79m | 3.747 | 0 | — | — | 0 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.43 | 32m | 2.756 | 0 | — | — | 0 |
| Nayla | IDN Live | Hai | 23 Nov 2026, 16.31 | 96m | 5.174 | 0 | — | — | 0 |
| Levi | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.27 | 98m | 7.479 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.27 | 98m | 7.247 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.24 | 1m | 89 | 0 | — | — | 0 |
| Nayla | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.23 | 0m | 7 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.22 | 1m | 81 | 0 | — | — | 0 |
| Levi | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 16.22 | 2m | 191 | 0 | — | — | 0 |
| Greesel | IDN Live | hi | 23 Nov 2026, 16.08 | 62m | 6.961 | 0 | — | — | 0 |
| Greesel | IDN Live | hi | 23 Nov 2026, 16.07 | 1m | 135 | 0 | — | — | 0 |
| Jessi | IDN Live | hi | 23 Nov 2026, 16.04 | 67m | 6.297 | 0 | — | — | 0 |
| Ella | IDN Live | yey | 23 Nov 2026, 16.01 | 69m | 6.909 | 0 | — | — | 0 |
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

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
