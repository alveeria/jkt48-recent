# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: 21 Nov 2026, 09.53 WIB.

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
| Fritzy | IDN Live | grem | 21 Nov 2026, 09.04 | 40m | 2.254 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 21 Nov 2026, 08.00 | 19m | 324 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 23.33 | 30m | 1.409 | 0 | — | — | 0 |
| Eli | IDN Live | Ngapain ya ? | 20 Nov 2026, 23.25 | 37m | 1.157 | 0 | — | — | 0 |
| Nayla | IDN Live | N | 20 Nov 2026, 23.22 | 41m | 1.289 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 23.09 | 31m | 1.276 | 0 | — | — | 0 |
| Olla | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 23.01 | 32m | 1.738 | 0 | — | — | 0 |
| Elin | IDN Live | Hai | 20 Nov 2026, 22.58 | 64m | 2.741 | 0 | — | — | 0 |
| Erine | IDN Live | havefunnnnn | 20 Nov 2026, 21.50 | 65m | 8.643 | 0 | — | — | 0 |
| Fritzy | IDN Live | hi gaiss | 20 Nov 2026, 21.06 | 73m | 5.582 | 0 | — | — | 0 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 19.42 | 67m | 3.563 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 19.35 | 69m | 1.800 | 0 | — | — | 0 |
| Rilly | IDN Live | Ngobss sma kannuy | 20 Nov 2026, 19.30 | 65m | 2.496 | 0 | — | — | 0 |
| Heidi | IDN Live | malemmm | 20 Nov 2026, 19.20 | 74m | 4.679 | 0 | — | — | 0 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 19.18 | 72m | 5.350 | 0 | — | — | 0 |
| Intan | IDN Live | aku sendirian | 20 Nov 2026, 18.45 | 110m | 8.737 | 0 | — | — | 0 |
| JKT48 | IDN Live | Pajama Drive - 2026/11/20 | 20 Nov 2026, 18.45 | 135m | 270 | 0 | — | — | 0 |
| Gracie | IDN Live | hiii | 20 Nov 2026, 18.14 | 64m | 6.135 | 0 | — | — | 0 |
| Nala | IDN Live | MALAMin | 20 Nov 2026, 18.12 | 62m | 8.474 | 0 | — | — | 0 |
| Raisha | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 18.12 | 65m | 6.768 | 0 | — | — | 0 |
| Carissa | IDN Live | P lagi ngapain nihh | 20 Nov 2026, 17.30 | 75m | 4.604 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 20 Nov 2026, 15.29 | 16m | 698 | 0 | — | — | 0 |
| Michie | IDN Live | live  aja | 20 Nov 2026, 14.41 | 64m | 13.440 | 0 | — | — | 0 |
| Greesel | IDN Live | hi | 20 Nov 2026, 14.39 | 63m | 9.799 | 0 | — | — | 0 |
| Jazzy | IDN Live | before pujumjum | 20 Nov 2026, 14.37 | 36m | 2.519 | 0 | — | — | 0 |
| Sona | IDN Live | hii | 20 Nov 2026, 14.34 | 51m | 4.126 | 0 | — | — | 0 |
| Bella | IDN Live | Hellooo | 20 Nov 2026, 14.30 | 47m | 4.172 | 0 | — | — | 0 |
| Ralyne | IDN Live | HAIII | 20 Nov 2026, 14.30 | 37m | 3.291 | 0 | — | — | 0 |
| Maxine | IDN Live | dordordor | 20 Nov 2026, 14.30 | 54m | 3.757 | 0 | — | — | 0 |
| Lia | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 14.28 | 38m | 3.358 | 0 | — | — | 0 |
| Aralie | IDN Live | hi | 20 Nov 2026, 14.27 | 78m | 12.733 | 0 | — | — | 0 |
| Lyn | IDN Live | Ayo ngobrol bareng! | 20 Nov 2026, 14.00 | 62m | 3.819 | 0 | — | — | 0 |
| Lana | IDN Live | Haii | 20 Nov 2026, 13.22 | 67m | 4.252 | 0 | — | — | 0 |
| Oniel | IDN Live | saya kembali | 20 Nov 2026, 12.09 | 62m | 3.895 | 0 | — | — | 0 |
| Muthe | IDN Live | #GRWM | 20 Nov 2026, 11.39 | 64m | 3.373 | 0 | — | — | 0 |
| Danella | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 22.58 | 63m | 1.522 | 0 | — | — | 0 |
| Daisy | IDN Live | Hi | 19 Nov 2026, 22.55 | 61m | 1.529 | 0 | — | — | 0 |
| Fahira | IDN Live | ada apa??? | 19 Nov 2026, 20.42 | 41m | 2.272 | 0 | — | — | 0 |
| Anindya | IDN Live | HALO!! | 19 Nov 2026, 20.24 | 34m | 1.968 | 0 | — | — | 0 |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 19 Nov 2026, 19.41 | 82m | 5.440 | 0 | — | — | 0 |

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
