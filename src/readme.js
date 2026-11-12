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
    const historical = r.source === "rznive/JKT48Live-Record";
    return `| ${esc(r.member.name)} | ${platform[r.platform]} | ${esc(r.caption ?? r.title)} | ${wib(r.started_at)} | ${historical || r.duration_minutes == null ? "—" : `${r.duration_minutes}m`} | ${historical ? "—" : num(r.peak_viewers)} | ${sr ? num(r.gifts) : "—"} | ${sr ? num(r.gift_points) : "—"} | ${sr ? num(r.stars) : "—"} | ${sr ? num(r.comments) : "—"} |`;
  })
  .join("\n");

const readme = `# jkt48-recent

[AUTO] Riwayat live member JKT48 di **IDN Live** dan **SHOWROOM**, dicatat oleh GitHub Actions tiap 30 detik.
Data publik, bebas dipakai. Terakhir diperbarui: ${wib(live.updated_at)} WIB.

## Pakai datanya

| File | Isi |
|---|---|
| [\`data/live.json\`](${RAW}/data/live.json) | Yang sedang live sekarang |
| [\`data/recent/latest.json\`](${RAW}/data/recent/latest.json) | Live selesai dalam bulan UTC berjalan |
| \`data/recent/YYYY-MM.json\` | Arsip bulan UTC berjalan, contoh [\`${currentMonth}.json\`](${RAW}/data/recent/${currentMonth}.json) |

\`\`\`js
const recent = await fetch("${RAW}/data/recent/latest.json").then((r) => r.json());
\`\`\`

Field tiap live: \`id\` (\`idn:alveeria-N\` / \`showroom:alveeria-N\`), \`source_id\` (ID asli platform),\`platform\` (\`idn\` | \`showroom\`), \`member { name, username, avatar }\`, \`title\`, \`url\`, \`image\`,
\`started_at\`, \`ended_at\`, \`duration_minutes\`, \`peak_viewers\`, \`last_viewers\`.
Khusus SHOWROOM: \`gifts\` (gift berbayar), \`gift_points\`, \`stars\` (gift gratis), \`comments\`, \`unique_gifters\`,
\`gift_breakdown\` (nama gift → jumlah), \`top_gifters\` (peringkat stage).


## Sedang live

| Member | Platform | Caption | Mulai (WIB) | Penonton |
|---|---|---|---|---|
${liveRows}

${recentTitle}

| Member | Platform | Caption | Mulai (WIB) | Durasi | Penonton puncak | Gift | Poin gift | Star | Komentar |
|---|---|---|---|---|---|---|---|---|---|
${recentRows || "| _Belum ada data_ | | | | | | | | | |"}

---
Sumber: endpoint publik \`api.idn.app/graphql\` dan \`showroom-live.com/api\`. Proyek fans, tidak berafiliasi dengan JKT48, IDN, atau SHOWROOM.
`;
await fs.writeFile(path.join(ROOT, "README.md"), readme);
