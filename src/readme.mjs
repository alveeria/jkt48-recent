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
const esc = (s) => String(s || "").replace(/\|/g, "\|").replace(/\n/g, " ");

const live = await read("data/live.json", { lives: [] });
const latest = await read("data/recent/latest.json", []);
const platform = { idn: "IDN Live", showroom: "SHOWROOM" };

const liveRows = live.lives.length
  ? live.lives
      .map(
        (l) =>
          `| ${esc(l.member.name)} | ${platform[l.platform]} | ${esc(l.title)} | ${wib(l.started_at)} | ${num(l.viewers)} |`,
      )
      .join("\n")
  : "| _Belum ada yang live_ | | | | |";

const recentRows = latest
  .slice(0, 40)
  .map((r) => {
    const sr = r.platform === "showroom";
    return `| ${esc(r.member.name)} | ${platform[r.platform]} | ${esc(r.title)} | ${wib(r.started_at)} | ${r.duration_minutes == null ? "—" : `${r.duration_minutes}m`} | ${num(r.peak_viewers)} | ${sr ? num(r.gifts) : "—"} | ${sr ? num(r.gift_points) : "—"} | ${sr ? num(r.stars) : "—"} | ${sr ? num(r.comments) : "—"} |`;
  })
  .join("\n");

const readme = `# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: ${wib(live.updated_at)} WIB.

## Pakai datanya

| File | Isi |
|---|---|
| [\`data/live.json\`](${RAW}/data/live.json) | Yang sedang live sekarang |
| [\`data/recent/latest.json\`](${RAW}/data/recent/latest.json) | 200 live terakhir yang sudah selesai |
| \`data/recent/YYYY-MM.json\` | Semua live per bulan, contoh [\`${new Date().toISOString().slice(0, 7)}.json\`](${RAW}/data/recent/${new Date().toISOString().slice(0, 7)}.json) |

\`\`\`js
const recent = await fetch("${RAW}/data/recent/latest.json").then((r) => r.json());
\`\`\`

Field tiap live: \`id\`, \`platform\` (\`idn\` | \`showroom\`), \`member { name, username, avatar }\`, \`title\`, \`url\`, \`image\`,
\`started_at\`, \`ended_at\`, \`duration_minutes\`, \`peak_viewers\`, \`last_viewers\`.
Khusus SHOWROOM: \`gifts\` (gift berbayar), \`gift_points\`, \`stars\` (gift gratis), \`comments\`, \`unique_gifters\`,
\`gift_breakdown\` (nama gift → jumlah), \`top_gifters\` (peringkat stage).

> IDN tidak membuka data gift lewat API publiknya, jadi untuk IDN hanya penonton dan durasi yang dicatat.
> Live sebelum repo ini aktif diambil dari arsip [rznive/JKT48Live-Record](https://github.com/rznive/JKT48Live-Record) (IDN saja, hanya waktu mulai), ditandai \`source: "rznive/JKT48Live-Record"\` dengan durasi dan penonton \`null\`.
> Waktu dalam UTC (ISO 8601). Durasi dihitung dari waktu mulai sampai terakhir terlihat live (presisi ±30 detik).

## Sedang live

| Member | Platform | Judul | Mulai (WIB) | Penonton |
|---|---|---|---|---|
${liveRows}

## Live terakhir

| Member | Platform | Judul | Mulai (WIB) | Durasi | Penonton puncak | Gift | Poin gift | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
${recentRows || "| _Belum ada data_ | | | | | | | | | |"}

---
Sumber: endpoint publik \`api.idn.app/graphql\` dan \`showroom-live.com/api\`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
`;
await fs.writeFile(path.join(ROOT, "README.md"), readme);
