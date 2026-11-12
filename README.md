# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: 12 Nov 2026, 22.58 WIB.

## Pakai datanya

| File | Isi |
|---|---|
| [`data/live.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/live.json) | Yang sedang live sekarang |
| [`data/recent/latest.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json) | Live selesai dalam bulan UTC berjalan |
| `data/recent/YYYY-MM.json` | Arsip bulan UTC berjalan, contoh [`2026-11.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/2026-11.json) |

```js
const recent = await fetch("https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json").then((r) => r.json());
```

Field tiap live: `id` (`idn:alveeria-N` / `showroom:alveeria-N`), `source_id` (ID asli platform),`platform` (`idn` | `showroom`), `member { name, username, avatar }`, `title`, `url`, `image`,
`started_at`, `ended_at`, `duration_minutes`, `peak_viewers`, `last_viewers`.
Khusus SHOWROOM: `gifts` (gift berbayar), `gift_points`, `stars` (gift gratis), `comments`, `unique_gifters`,
`gift_breakdown` (nama gift → jumlah), `top_gifters` (peringkat stage).
Khusus IDN Live (dari chat live): `comments`, `gifts`, `gift_gold`, `gift_points`, `gift_breakdown`, `unique_gifters`,
`top_gifters` (dihitung dari gift yang terdengar selama live).


## Sedang live

| Member | Platform | Caption | Mulai (WIB) | Penonton |
|---|---|---|---|---|
| Olla | IDN Live | Ayo ngobrol bareng! | 12 Nov 2026, 22.02 | 6.329 |
| Gita | IDN Live | Gits | 12 Nov 2026, 22.02 | 8.355 |
| Nala | IDN Live | hai ehek | 12 Nov 2026, 22.03 | 10.403 |
| Marsha | IDN Live | Plisss | 12 Nov 2026, 22.02 | 10.399 |
| Nachia | IDN Live | hi | 12 Nov 2026, 22.04 | 8.058 |
| Delynn | IDN Live | malms bosku | 12 Nov 2026, 22.04 | 10.409 |
| Eli | IDN Live | KaraokELI | 12 Nov 2026, 22.41 | 1.023 |
| Michie | IDN Live | wow | 12 Nov 2026, 22.41 | 3.112 |
| Fritzy | IDN Live | storytimee | 12 Nov 2026, 22.48 | 1.208 |

## Live terakhir — Nov 2026

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Poin gift | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| Daisy | IDN Live | Hi | 12 Nov 2026, 20.48 | 63m | 1.839 | — | — | — | — |
| Danella | IDN Live | ☺️ | 12 Nov 2026, 20.46 | 66m | 2.302 | — | — | — | — |
| Kathrina | IDN Live | wazzap | 12 Nov 2026, 20.30 | 67m | 7.396 | — | — | — | — |
| Levi | IDN Live | hai | 12 Nov 2026, 20.23 | 74m | 6.216 | — | — | — | — |
| Ribka | IDN Live | nagu mania | 12 Nov 2026, 20.12 | 83m | 6.728 | — | — | — | — |
| Giaa | IDN Live | p  | 12 Nov 2026, 20.04 | 55m | 2.442 | — | — | — | — |
| Jemima | IDN Live | Ayo ngobrol bareng! | 12 Nov 2026, 19.23 | 65m | 5.862 | — | — | — | — |
| Rilly | IDN Live | Geremmmmm | 12 Nov 2026, 19.12 | 69m | 3.118 | — | — | — | — |
| Aralie | IDN Live | hi | 12 Nov 2026, 19.05 | 75m | 12.574 | — | — | — | — |
| Fritzy | IDN Live | gais | 12 Nov 2026, 18.45 | 38m | 4.685 | — | — | — | — |
| JKT48 | IDN Live | Sambil Menggandeng Erat Tanganku - 2026/11/12 | 12 Nov 2026, 18.44 | 165m | 1.831 | — | — | — | — |
| Lily | IDN Live | Hi | 11 Nov 2026, 23.11 | — | — | — | — | — | — |
| Michie | IDN Live | wow | 11 Nov 2026, 23.06 | — | — | — | — | — | — |
| Fritzy | IDN Live | gais | 11 Nov 2026, 22.54 | — | — | — | — | — | — |
| Delynn | IDN Live | Malems | 11 Nov 2026, 22.41 | — | — | — | — | — | — |
| Danella | IDN Live | ☺️ | 11 Nov 2026, 22.33 | — | — | — | — | — | — |
| Rilly | IDN Live | Yukkk | 11 Nov 2026, 15.02 | — | — | — | — | — | — |
| Giaa | IDN Live | p | 11 Nov 2026, 14.59 | — | — | — | — | — | — |
| Intan | IDN Live | Ayo ngobrol bareng! | 11 Nov 2026, 14.47 | — | — | — | — | — | — |
| Jemima | IDN Live | Ayo ngobrol bareng! | 11 Nov 2026, 14.46 | — | — | — | — | — | — |
| Cynthia | IDN Live | Ayo ngobrol bareng! | 10 Nov 2026, 23.00 | — | — | — | — | — | — |
| Lyn | IDN Live | Ayo ngobrol bareng! | 10 Nov 2026, 15.53 | — | — | — | — | — | — |
| Oniel | IDN Live | saya kembali | 9 Nov 2026, 15.19 | — | — | — | — | — | — |
| Lia | IDN Live | Ayo ngobrol bareng! | 9 Nov 2026, 14.43 | — | — | — | — | — | — |
| Jemima | IDN Live | Ayo ngobrol bareng! | 8 Nov 2026, 21.06 | — | — | — | — | — | — |
| Lana | IDN Live | Haii | 8 Nov 2026, 21.01 | — | — | — | — | — | — |
| Maira | IDN Live | Let’s go!!! | 8 Nov 2026, 14.12 | — | — | — | — | — | — |
| Oniel | IDN Live | saya kembali | 8 Nov 2026, 13.18 | — | — | — | — | — | — |
| Michie | IDN Live | grwm | 8 Nov 2026, 12.43 | — | — | — | — | — | — |
| Jessi | IDN Live | hi | 7 Nov 2026, 19.50 | — | — | — | — | — | — |
| Elin | IDN Live | Haaii | 7 Nov 2026, 14.04 | — | — | — | — | — | — |
| Lia | IDN Live | Ayo ngobrol bareng! | 7 Nov 2026, 13.53 | — | — | — | — | — | — |
| Lily | IDN Live | Haii | 7 Nov 2026, 13.52 | — | — | — | — | — | — |
| Gracie | IDN Live | hiii | 7 Nov 2026, 13.38 | — | — | — | — | — | — |
| Fritzy | IDN Live | hii | 7 Nov 2026, 13.16 | — | — | — | — | — | — |
| Nayla | IDN Live | Hai | 7 Nov 2026, 13.13 | — | — | — | — | — | — |
| Michie | IDN Live | grwm | 7 Nov 2026, 13.11 | — | — | — | — | — | — |
| Ekin | IDN Live | hai | 6 Nov 2026, 22.52 | — | — | — | — | — | — |
| Mikaela | IDN Live | Ayo ngobrol bareng! | 5 Nov 2026, 23.22 | — | — | — | — | — | — |
| Delynn | IDN Live | Malming oi | 5 Nov 2026, 23.00 | — | — | — | — | — | — |

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
