# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 20 Nov 2026, 15.28 WIB.

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
| Aralie | IDN Live | hi | 20 Nov 2026, 14.27 | 10.293 |
| Greesel | IDN Live | hi | 20 Nov 2026, 14.39 | 8.272 |
| Michie | IDN Live | live  aja | 20 Nov 2026, 14.41 | 10.940 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Jazzy | IDN Live | before pujumjum | 20 Nov 2026, 14.37 | 36m | 2.519 | 0 | — | — | 0 |
| Sona | IDN Live | hii | 20 Nov 2026, 14.34 | 51m | 4.126 | 0 | — | — | 0 |
| Bella | IDN Live | Hellooo | 20 Nov 2026, 14.30 | 47m | 4.172 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 20 Nov 2026, 14.30 | 37m | 3.291 | 0 | — | — | 0 |
| Maxine | IDN Live | dordordor | 20 Nov 2026, 14.30 | 54m | 3.757 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 14.28 | 38m | 3.358 | 0 | — | — | 0 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 14.00 | 62m | 3.819 | 0 | — | — | 0 |
| Lana | IDN Live | Haii | 20 Nov 2026, 13.22 | 67m | 4.252 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 20 Nov 2026, 12.09 | 62m | 3.895 | 0 | — | — | 0 |
| Muthe | IDN Live | #GRWM | 20 Nov 2026, 11.39 | 64m | 3.373 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 22.58 | 63m | 1.522 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 19 Nov 2026, 22.55 | 61m | 1.529 | 0 | — | — | 0 |
| Fahira | IDN Live | ada apa??? | 19 Nov 2026, 20.42 | 41m | 2.272 | 0 | — | — | 0 |
| Anindya | IDN Live | HALO!! | 19 Nov 2026, 20.24 | 34m | 1.968 | 0 | — | — | 0 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 19.41 | 82m | 5.440 | 0 | — | — | 0 |
| Indah | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 19.34 | 32m | 3.424 | 0 | — | — | 0 |
| Elin | IDN Live | Hai | 19 Nov 2026, 19.33 | 63m | 2.886 | 0 | — | — | 0 |
| Nayla | IDN Live | N | 19 Nov 2026, 19.32 | 64m | 4.284 | 0 | — | — | 0 |
| Gracie | IDN Live | hiii | 19 Nov 2026, 19.32 | 48m | 4.248 | 0 | — | — | 0 |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 19.26 | 61m | 4.103 | 0 | — | — | 0 |
| JKT48 | IDN Live | Sambil Menggandeng Erat Tanganku - 2026/11/19 | 19 Nov 2026, 18.46 | 155m | 509 | 0 | — | — | 0 |
| Sona | IDN Live | makan | 19 Nov 2026, 16.04 | 6m | 322 | 1 | 5 | — | 103 |
| Rilly | IDN Live | Ngobss sma kannuy | 19 Nov 2026, 15.59 | 11m | 803 | 2 | 51 | — | 110 |
| Intan | IDN Live | ayo temeninn aku sm bonggg | 19 Nov 2026, 15.59 | 12m | 1.723 | 6 | 38 | — | 532 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 14.59 | 68m | 2.588 | 16 | 188 | — | 408 |
| Rara | IDN Live | Halloo | 19 Nov 2026, 14.31 | 64m | 2.615 | 29 | 489 | — | 663 |
| Lia | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 14.22 | 61m | 2.930 | 28 | 429 | — | 793 |
| Giaa | IDN Live | p  | 19 Nov 2026, 14.18 | 62m | 2.315 | 36 | 306 | — | 249 |
| Muthe | IDN Live | Hi | 19 Nov 2026, 14.16 | 34m | 2.938 | 21 | 268 | — | 766 |
| Bella | IDN Live | Hellooo | 19 Nov 2026, 14.13 | 66m | 3.577 | 41 | 1.576 | — | 377 |
| Ralyne | IDN Live | HAIII | 19 Nov 2026, 14.13 | 65m | 3.801 | 23 | 686 | — | 262 |
| Virgi | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 13.59 | 80m | 5.823 | 25 | 905 | — | 1.110 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 13.59 | 81m | 6.474 | 34 | 793 | — | 1.866 |
| Lulu | IDN Live | hi | 19 Nov 2026, 13.22 | 37m | 2.484 | 8 | 200 | — | 553 |
| Fritzy | IDN Live | barbang | 19 Nov 2026, 13.06 | 60m | 5.465 | 20 | 943 | — | 2.732 |
| Muthe | IDN Live | Hi | 19 Nov 2026, 12.43 | 34m | 3.174 | 25 | 276 | — | 412 |
| Gracie | IDN Live | hiii | 19 Nov 2026, 12.16 | 46m | 4.909 | 43 | 1.133 | — | 1.600 |
| Michie | IDN Live | live  aja | 19 Nov 2026, 11.28 | 61m | 6.622 | 83 | 1.192 | — | 3.102 |
| Nayla | IDN Live | N | 19 Nov 2026, 00.22 | 58m | 1.177 | 27 | 441 | — | 831 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 18 Nov 2026, 22.23 | 80m | 4.654 | 66 | 1.298 | — | 1.812 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
