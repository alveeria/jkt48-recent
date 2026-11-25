# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 25 Nov 2026, 13.00 WIB.

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
| Virgi | IDN Live | iya | 25 Nov 2026, 11.12 | 9.497 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 25 Nov 2026, 12.02 | 5.377 |
| Muthe | IDN Live | Hi | 25 Nov 2026, 13.00 | 31 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Daisy | IDN Live | Hi | 25 Nov 2026, 12.27 | 31m | 1.184 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 25 Nov 2026, 11.36 | 78m | 5.962 | 0 | — | — | 0 |
| Intan | IDN Live | grwm bntar | 25 Nov 2026, 11.12 | 82m | 8.057 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 25 Nov 2026, 10.24 | 63m | 4.460 | 0 | — | — | 0 |
| Maira | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 18.06 | 30m | 1.160 | 0 | — | — | 0 |
| Muthe | IDN Live | Hi | 24 Nov 2026, 18.01 | 34m | 2.233 | 0 | — | — | 0 |
| Christy | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 17.47 | 49m | 6.640 | 0 | — | — | 0 |
| Kathrina | IDN Live | w nala | 24 Nov 2026, 17.29 | 67m | 6.238 | 0 | — | — | 0 |
| Greesel | IDN Live | temenin icel nugas | 24 Nov 2026, 17.25 | 62m | 5.178 | 0 | — | — | 0 |
| Jessi | IDN Live | baxo | 24 Nov 2026, 17.23 | 73m | 5.699 | 0 | — | — | 0 |
| Muthe | IDN Live | Hi | 24 Nov 2026, 17.21 | 40m | 4.012 | 0 | — | — | 0 |
| Carissa | IDN Live | HAIIII | 24 Nov 2026, 17.05 | 67m | 3.527 | 0 | — | — | 0 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 16.43 | 62m | 3.046 | 0 | — | — | 0 |
| Rara | IDN Live | Sama ralynee | 24 Nov 2026, 16.32 | 66m | 2.096 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 24 Nov 2026, 16.31 | 33m | 1.345 | 0 | — | — | 0 |
| Eli | IDN Live | Get ready with ECEU BUDHE | 24 Nov 2026, 16.29 | 63m | 3.066 | 0 | — | — | 0 |
| Aralie | IDN Live | absen dulu  | 24 Nov 2026, 16.12 | 63m | 6.186 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 16.03 | 61m | 2.811 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 24 Nov 2026, 15.26 | 32m | 2.947 | 0 | — | — | 0 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 15.24 | 62m | 2.668 | 0 | — | — | 0 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 15.02 | 65m | 4.687 | 0 | — | — | 0 |
| Intan | IDN Live | temenin grwm  | 24 Nov 2026, 15.02 | 65m | 5.547 | 0 | — | — | 0 |
| Rilly | IDN Live | GEREEEMMM | 24 Nov 2026, 14.34 | 70m | 2.904 | 0 | — | — | 0 |
| Fera | IDN Live | Ayo masuk | 24 Nov 2026, 14.30 | 70m | 2.911 | 0 | — | — | 0 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 14.16 | 58m | 2.328 | 0 | — | — | 0 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 24 Nov 2026, 14.00 | 13m | 942 | 0 | — | — | 0 |
| Virgi | IDN Live | iya | 23 Nov 2026, 21.29 | 6m | 291 | 0 | — | — | 0 |
| Gracie | IDN Live | hiii | 23 Nov 2026, 21.18 | 17m | 1.770 | 0 | — | — | 0 |
| Jazzy | IDN Live | ehhhh rame nic | 23 Nov 2026, 21.11 | 24m | 1.845 | 0 | — | — | 0 |
| Sona | IDN Live | maap ngaret | 23 Nov 2026, 21.07 | 28m | 1.790 | 0 | — | — | 0 |
| Intan | IDN Live | aku lg pake batik pekalongan? | 23 Nov 2026, 21.06 | 29m | 4.277 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 23 Nov 2026, 20.58 | 37m | 2.194 | 0 | — | — | 0 |
| Ekin | IDN Live | hai | 23 Nov 2026, 20.56 | 40m | 5.461 | 0 | — | — | 0 |
| Maxine | IDN Live | makan | 23 Nov 2026, 20.50 | 45m | 2.798 | 0 | — | — | 0 |
| Carissa | IDN Live | HIHUUUU 👍🏻 | 23 Nov 2026, 20.50 | 45m | 3.119 | 0 | — | — | 0 |
| Rara | IDN Live | Hayy hihu | 23 Nov 2026, 20.45 | 50m | 2.393 | 0 | — | — | 0 |
| Michie | IDN Live | hello | 23 Nov 2026, 20.43 | 52m | 7.679 | 0 | — | — | 0 |
| Fera | IDN Live | Ayo masuk | 23 Nov 2026, 20.36 | 59m | 3.738 | 0 | — | — | 0 |
| Fahira | IDN Live | ada apa??? | 23 Nov 2026, 20.31 | 64m | 4.910 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 23 Nov 2026, 20.00 | 64m | 2.574 | 0 | — | — | 0 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
