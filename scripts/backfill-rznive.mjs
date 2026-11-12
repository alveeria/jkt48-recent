#!/usr/bin/env node
// One-off backfill of older IDN lives from rznive/JKT48Live-Record
// (https://github.com/rznive/JKT48Live-Record, data/idn/YYYY-MM.json).
// That archive only has start times, so duration/viewers stay null and every
// row carries source: "rznive/JKT48Live-Record". Rows already recorded here
// (same account, start within 10 min) are skipped.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = "https://raw.githubusercontent.com/rznive/JKT48Live-Record/main/data/idn";
const SOURCE = "rznive/JKT48Live-Record";

const read = async (file, fallback) => {
  try {
    return JSON.parse(await fs.readFile(path.join(ROOT, file), "utf8"));
  } catch {
    return fallback;
  }
};
const write = async (file, value) => {
  await fs.mkdir(path.dirname(path.join(ROOT, file)), { recursive: true });
  await fs.writeFile(path.join(ROOT, file), `${JSON.stringify(value, null, 2)}\n`);
};

const months = [];
for (let d = new Date(Date.UTC(2026, 0, 1)); d <= new Date(); d.setUTCMonth(d.getUTCMonth() + 1))
  months.push(d.toISOString().slice(0, 7));

let added = 0;
const all = [];
for (const month of months) {
  const res = await fetch(`${RAW}/${month}.json`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) continue;
  const rows = await res.json();
  const file = `data/recent/${month}.json`;
  const existing = await read(file, []);
  const key = (username, at) => `${String(username).toLowerCase()}@${Math.round(Date.parse(at) / 600000)}`;
  const seen = new Set(existing.map((e) => key(e.member?.username, e.started_at)));
  const fresh = [];
  for (const r of rows) {
    if (!/^jkt48[_-]/i.test(r.username || "") || !r.live_at_unix) continue;
    const started = new Date(r.live_at_unix * 1000).toISOString();
    if (seen.has(key(r.username, started))) continue;
    seen.add(key(r.username, started));
    fresh.push({
      id: `idn:rznive-${r.id}`,
      platform: "idn",
      member: {
        name: String(r.creator_name || r.username).replace(/\s*JKT48\s*$/i, ""),
        username: r.username,
        avatar: null,
      },
      title: r.title || "",
      url: `https://www.idn.app/${r.username}`,
      image: r.image_url || null,
      started_at: started,
      ended_at: null,
      duration_minutes: null,
      peak_viewers: null,
      last_viewers: null,
      source: SOURCE,
    });
  }
  const merged = [...existing, ...fresh].sort((a, b) => b.started_at.localeCompare(a.started_at));
  await write(file, merged);
  all.push(...merged);
  added += fresh.length;
  console.log(month, `+${fresh.length}`, `(total ${merged.length})`);
}

const latest = await read("data/recent/latest.json", []);
const ids = new Set(latest.map((l) => l.id));
const combined = [...latest, ...all.filter((a) => !ids.has(a.id))]
  .sort((a, b) => b.started_at.localeCompare(a.started_at))
  .slice(0, 200);
await write("data/recent/latest.json", combined);
console.log("added", added);
