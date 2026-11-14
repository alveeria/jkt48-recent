#!/usr/bin/env node
// Rebuilds README.md: what the repo is, how to use the JSON, and the latest lives.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = async (file, fallback) => {
  try {
    return JSON.parse(await fs.readFile(path.join(ROOT, file), "utf8"));
  } catch {
    return fallback;
  }
};
const RAW = "https://raw.githubusercontent.com/alveeria/jkt48-recent/main";
const wib = (v) =>
  v
    ? new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Jakarta",
      }).format(new Date(v))
    : "—";
const num = (n) => (n || n === 0 ? new Intl.NumberFormat("id-ID").format(n) : "—");
const esc = (s) => String(s || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const liveCaption = (live) => live.caption ?? live.title ?? "";

const live = await read("data/live.json", { lives: [] });
const latestAll = await read("data/recent/latest.json", []);
const currentMonth = new Date().toISOString().slice(0, 7);
const shortMonth = new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric", timeZone: "UTC" });
const recentTitle = `## Live terakhir — ${shortMonth.format(new Date(`${currentMonth}-01T00:00:00Z`))}`;
const latest = latestAll.filter((r) => (r.started_at || r.ended_at || "").slice(0, 7) === currentMonth);
const platform = { idn: "IDN Live", showroom: "SHOWROOM" };

const liveRows = live.lives.length
  ? live.lives
      .map(
        (l) =>
          `| ${esc(l.member.name)} | ${platform[l.platform]} | ${esc(liveCaption(l))} | ${wib(l.started_at)} | ${num(l.viewers)} |`,
      )
      .join("\n")
  : "| _Belum ada yang live_ | | | | |";

const recentRows = latest
  .slice(0, 40)
  .map((r) => {
    const sr = r.platform === "showroom";
    // IDN gifts/comments come from the live chat; older IDN rows have none.
    const stat = (v) => (historical || v == null ? "—" : num(v));
    const historical = r.source === "rznive/JKT48Live-Record";
    return `| ${esc(r.member.name)} | ${platform[r.platform]} | ${esc(r.caption ?? r.title)} | ${wib(r.started_at)} | ${historical || r.duration_minutes == null ? "—" : `${r.duration_minutes}m`} | ${historical ? "—" : num(r.peak_viewers)} | ${stat(r.gifts)} | ${stat(sr ? r.gift_points : r.gift_gold)} | ${sr ? stat(r.stars) : "—"} | ${stat(r.comments)} |`;
  })
  .join("\n");

const readme = `# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dipantau oleh program di GitHub Actions dengan jeda 30 detik setelah tiap siklus polling.
Data publik, bebas dipakai. Terakhir diperbarui: ${wib(live.updated_at)} WIB.

## Interval pembaruan

- **Polling API:** jeda 30 detik setelah siklus selesai; interval aktual ditambah waktu request/proses.
- **Publikasi JSON dan README:** commit/push ke GitHub sekitar tiap 5 menit, bukan tiap 30 detik. Cache GitHub Raw dapat menambah keterlambatan.
- **Jadwal workflow:** tiap jam pada menit ke-7; satu job polling berjalan sekitar 5 jam 40 menit. Job tidak berjalan bersamaan. Jadwal GitHub bisa terlambat sehingga pemantauan tidak dijamin tanpa jeda.
- **Rate limit/error:** request polling ke origin yang mengembalikan HTTP 429/5xx atau error jaringan ditunda secara eksponensial (30 detik hingga 5 menit). Header Retry-After dihormati jika meminta waktu lebih lama. Platform lain tetap dipoll; request yang sudah berjalan bisa tetap selesai. Backoff ini tidak mengatur koneksi chat IDN yang memiliki retry terpisah.
- Batas kuota resmi IDN/SHOWROOM belum diketahui; interval 30 detik bukan jaminan bebas rate limit.

## Pakai datanya

| File | Isi |
|---|---|
| [\`data/live.json\`](${RAW}/data/live.json) | Yang sedang live sekarang |
| [\`data/recent/latest.json\`](${RAW}/data/recent/latest.json) | Live selesai dalam bulan UTC berjalan |
| \`data/recent/YYYY-MM.json\` | Arsip bulan UTC berjalan, contoh [\`${currentMonth}.json\`](${RAW}/data/recent/${currentMonth}.json) |

\`\`\`js
const recent = await fetch("${RAW}/data/recent/latest.json").then((r) => r.json());
\`\`\`

Field tiap live: \`id\` (\`idn:alveeria-N\` / \`showroom:alveeria-N\`), \`source_id\` (ID asli platform), \`platform\` (\`idn\` | \`showroom\`), \`member { name, username, avatar }\`, \`title\`, \`url\`, \`image\`,
\`started_at\`, \`ended_at\`, \`duration_minutes\`, \`peak_viewers\`, \`last_viewers\`.
Khusus SHOWROOM: \`gifts\` (gift berbayar), \`gift_points\`, \`stars\` (gift gratis), \`comments\`, \`unique_gifters\`,
\`gift_breakdown\` (nama gift → jumlah), \`top_gifters\` (peringkat stage).
Khusus IDN Live (dari chat live): \`comments\`, \`gifts\`, \`gift_gold\`, \`gift_points\`, \`gift_breakdown\`, \`unique_gifters\`,
\`top_gifters\` (dihitung dari gift yang terdengar selama live).
Semua live: \`viewer_series\` (\`[menit sejak mulai, penonton]\`, satu sampel per menit).

### Estimasi nilai gift

Jika statistik tersedia, \`estimated_gift_value_idr\` berisi estimasi nilai gift dalam rupiah, \`gift_rate_idr\` rate per unit, dan \`gift_value_basis\` adalah \`gold\` (IDN) atau \`paid_points\` (SHOWROOM).

- IDN: \`gift_gold × 2500\` (bukan \`gift_points\`).
- SHOWROOM: \`gift_points × 114.26\`, hanya gift berbayar; gift gratis/star tidak dikonversi.
- Rate ini asumsi referensi dari [contoh IDN](https://48live.my.id/recent/125470651794648686) dan [contoh SHOWROOM](https://48live.my.id/recent/1794067713510064), bukan harga resmi atau kurs terkini. Rate aktual bisa berbeda antar sesi/paket pembelian.
- Ini **bukan pendapatan bersih member**. Hanya menghitung gift yang berhasil dicatat bot, yang bisa tidak lengkap. Data historis tanpa statistik tidak dianggap nol.
- Rate bisa diatur lewat environment \`IDN_GOLD_RATE_IDR\` dan \`SHOWROOM_POINT_RATE_IDR\`; rate tersimpan pada arsip agar asumsi hitungnya jelas.


## Sedang live

| Member | Platform | Caption | Mulai (WIB) | Penonton |
|---|---|---|---|---|
${liveRows}

${recentTitle}

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Gold / Poin | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
${recentRows || "| _Belum ada data_ | | | | | | | | | |"}

## Lisensi

Kode proyek ini menggunakan [MIT License](LICENSE). Lisensi ini tidak memberikan hak atas konten pihak ketiga, termasuk foto, video, merek, dan konten dari platform sumber.

---
Sumber: endpoint publik \`api.idn.app/graphql\` dan \`showroom-live.com/api\`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
`;
await fs.writeFile(path.join(ROOT, "README.md"), readme);
