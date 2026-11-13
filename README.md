# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: 14 Nov 2026, 05.52 WIB.

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
| Mikaela | IDN Live | Ayo ngobrol bareng! | 14 Nov 2026, 05.17 | 1.941 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
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
| Sona | IDN Live | sm ica | 13 Nov 2026, 14.25 | 25m | 2.019 | 8 | 173 | — | 276 |
| Michie | IDN Live | MICHZELLE pt 1 | 13 Nov 2026, 14.03 | 47m | 6.846 | 9 | 76 | — | 2.910 |
| Ribka | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 13.26 | 65m | 7.543 | 30 | 653 | — | 930 |
| Indah | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 13.26 | 65m | 8.081 | 104 | 1.685 | — | 2.174 |
| Rilly | IDN Live | Hellooo | 13 Nov 2026, 12.29 | 66m | 2.466 | 23 | 241 | — | 1.045 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 13 Nov 2026, 12.13 | 65m | 3.836 | 22 | 570 | — | 1.011 |
| Gracie | IDN Live | hiii | 13 Nov 2026, 11.52 | 65m | 4.332 | 41 | 476 | — | 976 |
| Muthe | IDN Live | Hi | 13 Nov 2026, 10.59 | 64m | 3.565 | 35 | 689 | — | 805 |
| Intan | IDN Live | tmnin mammm | 13 Nov 2026, 10.47 | 70m | 4.835 | 80 | 3.378 | — | 3.680 |
| Fritzy | IDN Live | storytimee | 12 Nov 2026, 22.48 | 44m | 4.461 | 34 | 1.035 | — | 1.448 |
| Michie | IDN Live | wow | 12 Nov 2026, 22.41 | 61m | 9.005 | 83 | 1.370 | — | 4.613 |

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
