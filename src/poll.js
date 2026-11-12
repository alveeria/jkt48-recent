#!/usr/bin/env node
// JKT48 live recorder. Polls IDN Live and SHOWROOM every POLL_SECONDS for
// RUN_MINUTES, keeps open sessions in state/active.json (so the next workflow
// run carries on where this one stopped), and writes ended sessions to
// data/recent/YYYY-MM.json + data/recent/latest.json. Commits are done by the
// workflow run every COMMIT_EVERY_MINUTES (reset to origin/main, re-apply, push).
//
// Only public, unauthenticated endpoints are used:
//   IDN       https://api.idn.app/graphql  (viewers, caption/title, start/end)
//   SHOWROOM  /api/live/onlives, /api/live/gift_log, /api/live/comment_log,
//             /api/live/stage_user_list, /api/live/gift_list (gift point values)

import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POLL_SECONDS = Number(process.env.POLL_SECONDS || 30);
const RUN_MINUTES = Number(process.env.RUN_MINUTES || 340);
const COMMIT_EVERY_MINUTES = Number(process.env.COMMIT_EVERY_MINUTES || 5);
const UA = "jkt48-recent/1.0 (+https://github.com/alveeria/jkt48-recent)";
// data/recent/latest.json keeps this many ended lives; month files keep everything.
const LATEST_MAX = 200;
// A session missing for this long is treated as ended (absorbs one flaky poll).
const END_GRACE_MS = 90_000;

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { "user-agent": UA, accept: "application/json", ...init.headers },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(path.join(ROOT, file), "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(file, value) {
  const full = path.join(ROOT, file);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, `${JSON.stringify(value, null, 2)}\n`);
}

const iso = (v) => {
  if (v === undefined || v === null || v === "") return null;
  const n = typeof v === "number" ? v : /^\d+$/.test(String(v)) ? Number(v) : NaN;
  const d = Number.isNaN(n) ? new Date(String(v)) : new Date(n > 1e11 ? n : n * 1000);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

/* ---------------- IDN ---------------- */

const IDN_QUERY = `query { searchLivestream(query: "", limit: 100) { result { slug title image_url view_count status live_at end_at room_identifier creator { username name avatar } } } }`;

async function idnLives() {
  const data = await getJson("https://api.idn.app/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: IDN_QUERY }),
  });
  const items = data?.data?.searchLivestream?.result;
  if (!Array.isArray(items)) throw new Error("IDN: unexpected response");
  return items
    .filter((i) => /^jkt48[_-]/i.test(i?.creator?.username || ""))
    .filter((i) => !i.status || String(i.status).toLowerCase() === "live")
    .map((i) => ({
      id: `idn:${i.slug}`,
      platform: "idn",
      member: {
        name:
          (i.creator?.name || "").replace(/\s*JKT48\s*$/i, "").trim() ||
          i.creator?.name ||
          i.creator?.username ||
          "",
        username: i.creator?.username,
        avatar: i.creator?.avatar || null,
      },
      title: i.title || "",
      url: `https://www.idn.app/${i.creator?.username}/live/${i.slug}`,
      image: i.image_url || null,
      started_at: iso(i.live_at),
      viewers: Number(i.view_count) || 0,
    }));
}

/* ---------------- SHOWROOM ---------------- */

const SR = "https://www.showroom-live.com/api";
const giftCatalog = new Map(); // gift_id -> { name, point, free, image }

async function loadGiftCatalog(roomId) {
  if (giftCatalog.size) return;
  const data = await getJson(`${SR}/live/gift_list?room_id=${roomId}`);
  for (const g of [...(data.normal || []), ...(data.enquete || [])]) {
    giftCatalog.set(g.gift_id, {
      name: g.gift_name,
      point: Number(g.point) || 0,
      free: !!g.free,
      image: g.image,
    });
  }
}

async function showroomLives() {
  const data = await getJson(`${SR}/live/onlives`);
  if (!Array.isArray(data?.onlives)) throw new Error("SHOWROOM: unexpected response");
  const seen = new Set();
  const out = [];
  for (const live of data.onlives.flatMap((g) => g.lives || [])) {
    const key = String(live.room_url_key || "");
    if (!/^jkt48_|^officialjkt48$/i.test(key) || seen.has(live.room_id)) continue;
    seen.add(live.room_id);
    out.push({
      id: `showroom:${live.room_id}:${live.started_at}`,
      platform: "showroom",
      room_id: live.room_id,
      member: {
        name: String(live.main_name || key).split(/[/（(]/)[0].trim(),
        username: key,
        avatar: null,
      },
      title: live.telop || "",
      url: `https://www.showroom-live.com/r/${key}`,
      image: live.image || null,
      started_at: iso(live.started_at),
      viewers: Number(live.view_num) || 0,
    });
  }
  return out;
}

/** Adds gifts, stars, comments and top gifters seen since the last poll. */
async function showroomExtras(session) {
  const roomId = session.room_id;
  await loadGiftCatalog(roomId).catch(() => undefined);
  const [gifts, comments, stage] = await Promise.allSettled([
    getJson(`${SR}/live/gift_log?room_id=${roomId}`),
    getJson(`${SR}/live/comment_log?room_id=${roomId}`),
    getJson(`${SR}/live/stage_user_list?room_id=${roomId}`),
  ]);
  const x = session._seen || (session._seen = { gifts: [], comments: [] });
  const giftSeen = new Set(x.gifts);
  const commentSeen = new Set(x.comments);

  if (gifts.status === "fulfilled") {
    for (const g of gifts.value.gift_log || []) {
      const key = `${g.user_id}:${g.gift_id}:${g.created_at}:${g.num}`;
      if (giftSeen.has(key)) continue;
      giftSeen.add(key);
      const meta = giftCatalog.get(g.gift_id) || { name: g.name, point: 0, free: false };
      const num = Number(g.num) || 1;
      if (meta.free) session.stars += num;
      else {
        session.gifts += num;
        session.gift_points += meta.point * num;
        const label = meta.name || String(g.gift_id);
        session.gift_breakdown[label] = (session.gift_breakdown[label] || 0) + num;
      }
      session.gifters[g.user_id] = g.name || session.gifters[g.user_id] || String(g.user_id);
    }
  }
  if (comments.status === "fulfilled") {
    for (const c of comments.value.comment_log || []) {
      const key = `${c.user_id}:${c.created_at}:${c.comment}`;
      if (commentSeen.has(key)) continue;
      commentSeen.add(key);
      session.comments += 1;
    }
  }
  if (stage.status === "fulfilled" && Array.isArray(stage.value.stage_user_list)) {
    session.top_gifters = stage.value.stage_user_list.slice(0, 10).map((s) => ({
      rank: s.rank,
      name: s.user?.name,
      points: s.point ?? null,
      avatar: s.user?.avatar_url || null,
    }));
  }
  // Keep the dedupe windows small; the logs only return the latest entries.
  x.gifts = [...giftSeen].slice(-500);
  x.comments = [...commentSeen].slice(-500);
}

/* ---------------- sessions ---------------- */

function open(live, now) {
  return {
    ...live,
    last_seen_at: now,
    peak_viewers: live.viewers,
    gifts: 0,
    gift_points: 0,
    stars: 0,
    comments: 0,
    gift_breakdown: {},
    gifters: {},
    top_gifters: [],
  };
}

function close(session) {
  const { _seen, gifters, viewers, ...rest } = session;
  const start = Date.parse(session.started_at || session.last_seen_at);
  const end = Date.parse(session.last_seen_at);
  return {
    ...rest,
    ended_at: session.last_seen_at,
    duration_minutes: Math.max(0, Math.round((end - start) / 60000)),
    last_viewers: viewers,
    unique_gifters: Object.keys(gifters).length,
  };
}

async function archive(ended) {
  const latest = await readJson("data/recent/latest.json", []);
  const ids = new Set(ended.map((e) => e.id));
  const records = [...ended, ...latest.filter((l) => !ids.has(l.id))]
    .sort((a, b) => Date.parse(b.started_at || b.ended_at) - Date.parse(a.started_at || a.ended_at))
    .slice(0, LATEST_MAX);
  await writeJson("data/recent/latest.json", records);

  const months = new Set(ended.map((s) => (s.started_at || s.ended_at).slice(0, 7)));
  for (const month of months) {
    const file = `data/recent/${month}.json`;
    const prev = await readJson(file, []);
    const known = new Set(prev.map((p) => p.id));
    const additions = ended.filter(
      (s) => (s.started_at || s.ended_at).slice(0, 7) === month && !known.has(s.id),
    );
    if (additions.length) await writeJson(file, [...additions, ...prev]);
  }
}

async function writeSnapshot(active, now = new Date().toISOString()) {
  await writeJson("data/live.json", {
    updated_at: now,
    lives: Object.values(active).map(({ _seen, gifters, ...s }) => s),
  });
  await writeJson("state/active.json", active);
}

async function tick(active) {
  const now = new Date().toISOString();
  const results = await Promise.allSettled([idnLives(), showroomLives()]);
  const failed = new Set();
  const lives = [];
  results.forEach((r, i) => {
    const platform = i === 0 ? "idn" : "showroom";
    if (r.status === "fulfilled") lives.push(...r.value);
    else {
      failed.add(platform);
      log(`${platform} failed:`, r.reason?.message);
    }
  });

  for (const live of lives) {
    const s = active[live.id] || (active[live.id] = open(live, now));
    if (!s.gifts && s.gifts !== 0) Object.assign(s, open(live, now)); // older state shape
    s.viewers = live.viewers;
    s.peak_viewers = Math.max(s.peak_viewers || 0, live.viewers);
    s.title = live.title || s.title;
    s.image = live.image || s.image;
    s.last_seen_at = now;
    if (s.platform === "showroom") await showroomExtras(s).catch((e) => log("extras:", e.message));
  }

  const ended = [];
  for (const [id, s] of Object.entries(active)) {
    if (failed.has(s.platform)) continue;
    if (Date.now() - Date.parse(s.last_seen_at) < END_GRACE_MS) continue;
    ended.push(close(s));
    delete active[id];
  }
  await archive(ended);
  for (const e of ended) log("ended", e.platform, e.member.name, `${e.duration_minutes}m`);

  await writeSnapshot(active, now);
  return ended;
}

const git = (...args) => execFileSync("git", args, { cwd: ROOT, stdio: "pipe" }).toString();
const BOT = ["-c", "user.name=jkt48-recent-bot", "-c", "user.email=41898282+github-actions[bot]@users.noreply.github.com"];

/**
 * Sync with origin/main, re-apply what this run knows, commit and push.
 * Resetting first means manual pushes (backfills, code changes) are never
 * overwritten by this run's stale copy of the data files.
 */
async function commit(active, ended, message) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      git("fetch", "-q", "origin", "main");
      git("reset", "-q", "--hard", "origin/main");
      await archive(ended);
      await writeSnapshot(active);
      execFileSync("node", [path.join(ROOT, "src/readme.js")], { cwd: ROOT, stdio: "inherit" });
      git("add", "-A", "data", "state", "README.md");
      try {
        git("diff", "--cached", "--quiet");
        return true; // nothing to commit
      } catch {}
      git(...BOT, "commit", "-q", "-m", message);
      git("push", "-q", "origin", "HEAD:main");
      log("pushed:", message);
      return true;
    } catch (e) {
      log(`commit attempt ${attempt} failed:`, String(e.stderr || e.message).trim());
      await sleep(attempt * 5000);
    }
  }
  return false;
}

async function main() {
  const once = process.argv.includes("--once");
  const active = await readJson("state/active.json", {});
  const stopAt = Date.now() + RUN_MINUTES * 60_000;
  let lastCommit = Date.now();
  let pending = [];
  do {
    try {
      pending.push(...(await tick(active)));
    } catch (e) {
      log("tick failed:", e.message);
    }
    if (once) break;
    if (Date.now() - lastCommit > COMMIT_EVERY_MINUTES * 60_000) {
      const msg = pending.length ? `data: ${pending.length} live selesai` : "data: update live";
      if (await commit(active, pending, msg)) pending = [];
      lastCommit = Date.now();
    }
    await sleep(POLL_SECONDS * 1000);
  } while (Date.now() < stopAt);
  if (!once) {
    const msg = pending.length ? `data: ${pending.length} live selesai` : "data: update live";
    await commit(active, pending, msg);
  }
}

main();
