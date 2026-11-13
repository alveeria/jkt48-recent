# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: 13 Nov 2026, 19.02 WIB.

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
| Giaa | IDN Live | p | 13 Nov 2026, 18.32 | 1.358 |
| Lana | IDN Live | Hai | 13 Nov 2026, 18.46 | 2.015 |
| JKT48 | IDN Live | Pajama Drive - 2026/11/13 | 13 Nov 2026, 18.46 | 109 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
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
| Eli | IDN Live | KaraokELI | 12 Nov 2026, 22.41 | 128m | 4.690 | 21 | 107 | — | 869 |
| Nachia | IDN Live | hi | 12 Nov 2026, 22.04 | 72m | 11.013 | 75 | 1.517 | — | 1.442 |
| Delynn | IDN Live | malms bosku | 12 Nov 2026, 22.04 | 69m | 12.597 | 65 | 1.398 | — | 1.650 |
| Nala | IDN Live | hai ehek | 12 Nov 2026, 22.03 | 63m | 11.398 | 36 | 843 | — | 1.189 |
| Marsha | IDN Live | Plisss | 12 Nov 2026, 22.02 | 63m | 11.384 | 52 | 581 | — | 1.854 |
| Gita | IDN Live | Gits | 12 Nov 2026, 22.02 | 65m | 9.515 | 40 | 769 | — | 728 |
| Olla | IDN Live | Ayo ngobrol bareng! | 12 Nov 2026, 22.02 | 68m | 7.492 | 54 | 575 | — | 572 |
| Daisy | IDN Live | Hi | 12 Nov 2026, 20.48 | 63m | 1.839 | 13 | 95 | — | 242 |
| Danella | IDN Live | ☺️ | 12 Nov 2026, 20.46 | 66m | 2.302 | 35 | 536 | — | 344 |
| Kathrina | IDN Live | wazzap | 12 Nov 2026, 20.30 | 67m | 7.396 | 64 | 779 | — | 6.474 |
| Levi | IDN Live | hai | 12 Nov 2026, 20.23 | 74m | 6.216 | 9 | 281 | — | 1.526 |
| Ribka | IDN Live | nagu mania | 12 Nov 2026, 20.12 | 83m | 6.728 | 25 | 445 | — | 1.151 |
| Giaa | IDN Live | p  | 12 Nov 2026, 20.04 | 55m | 2.442 | 14 | 194 | — | 315 |
| Jemima | IDN Live | Ayo ngobrol bareng! | 12 Nov 2026, 19.23 | 65m | 5.862 | 0 | — | — | 0 |
| Rilly | IDN Live | Geremmmmm | 12 Nov 2026, 19.12 | 69m | 3.118 | 0 | — | — | 0 |
| Aralie | IDN Live | hi | 12 Nov 2026, 19.05 | 75m | 12.574 | 0 | — | — | 0 |
| Fritzy | IDN Live | gais | 12 Nov 2026, 18.45 | 38m | 4.685 | 0 | — | — | 0 |
| JKT48 | IDN Live | Sambil Menggandeng Erat Tanganku - 2026/11/12 | 12 Nov 2026, 18.44 | 165m | 1.831 | 4 | 9 | — | 723 |
| Lily | IDN Live | Hi | 11 Nov 2026, 23.11 | — | — | — | — | — | — |
| Michie | IDN Live | wow | 11 Nov 2026, 23.06 | — | — | — | — | — | — |

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
