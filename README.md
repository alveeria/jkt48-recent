# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: 12 Nov 2026, 18.09 WIB.

## Pakai datanya

| File | Isi |
|---|---|
| [`data/live.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/live.json) | Yang sedang live sekarang |
| [`data/recent/latest.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json) | 200 live terakhir yang sudah selesai |
| `data/recent/YYYY-MM.json` | Semua live per bulan, contoh [`2026-11.json`](https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/2026-11.json) |

```js
const recent = await fetch("https://raw.githubusercontent.com/alveeria/jkt48-recent/main/data/recent/latest.json").then((r) => r.json());
```

Field tiap live: `id`, `platform` (`idn` | `showroom`), `member { name, username, avatar }`, `title`, `url`, `image`,
`started_at`, `ended_at`, `duration_minutes`, `peak_viewers`, `last_viewers`.
Khusus SHOWROOM: `gifts` (gift berbayar), `gift_points`, `stars` (gift gratis), `comments`, `unique_gifters`,
`gift_breakdown` (nama gift → jumlah), `top_gifters` (peringkat stage).

> IDN tidak membuka data gift lewat API publiknya, jadi untuk IDN hanya penonton dan durasi yang dicatat.
> Waktu dalam UTC (ISO 8601). Durasi dihitung dari waktu mulai sampai terakhir terlihat live (presisi ±30 detik).

## Sedang live

| Member | Platform | Judul | Mulai (WIB) | Penonton |
|---|---|---|---|---|
| _Belum ada yang live_ | | | | |

## Live terakhir

| Member | Platform | Judul | Mulai (WIB) | Durasi | Penonton puncak | Gift | Poin gift | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
| _Belum ada data_ | | | | | | | | | |

---
Sumber: endpoint publik `api.idn.app/graphql` dan `showroom-live.com/api`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
