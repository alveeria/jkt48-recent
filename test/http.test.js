import test from "node:test";
import assert from "node:assert/strict";
import { createBackoffFetch } from "../src/http.js";

function harness(responses) {
  let time = Date.parse("2026-01-01T00:00:00Z");
  const calls = [];
  const request = createBackoffFetch({
    now: () => time,
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      const next = responses.shift();
      if (next instanceof Error) throw next;
      assert.ok(next, "unexpected fetch");
      return next;
    },
  });
  return { request, calls, advance: (ms) => { time += ms; } };
}

const url = "https://api.idn.app/graphql";

test("successful requests preserve options and response", async () => {
  const h = harness([Response.json({ ok: true })]);
  const init = { method: "POST", body: "query" };
  assert.deepEqual(await (await h.request(url, init)).json(), { ok: true });
  assert.equal(h.calls[0].init, init);
});

test("429 honors Retry-After seconds, blocks same origin, not another platform", async () => {
  const h = harness([
    new Response("limited", { status: 429, headers: { "Retry-After": "600" } }),
    Response.json({}), Response.json({}),
  ]);
  await assert.rejects(h.request(url), /HTTP 429.*cooldown 600s/);
  await assert.rejects(h.request("https://api.idn.app/other"), /Cooldown/);
  assert.equal(h.calls.length, 1);
  await h.request("https://www.showroom-live.com/api/live/onlives");
  h.advance(599_999);
  await assert.rejects(h.request(url), /Cooldown/);
  h.advance(1);
  await h.request(url);
  assert.equal(h.calls.length, 3);
});

test("Retry-After HTTP date is supported", async () => {
  const h = harness([
    new Response(null, { status: 503, headers: { "Retry-After": "Thu, 01 Jan 2026 00:02:00 GMT" } }),
    Response.json({}),
  ]);
  await assert.rejects(h.request(url), /cooldown 120s/);
  h.advance(120_000);
  await h.request(url);
});

test("network/5xx backoff grows, caps at five minutes, resets after recovery", async () => {
  const h = harness([
    new Error("timeout"),
    ...Array.from({ length: 5 }, () => new Response(null, { status: 503, headers: { "Retry-After": "invalid" } })),
    Response.json({}),
    new Response(null, { status: 429 }),
    Response.json({}),
  ]);
  for (const seconds of [30, 60, 120, 240, 300, 300]) {
    await assert.rejects(h.request(url), new RegExp(`cooldown ${seconds}s`));
    const count = h.calls.length;
    await assert.rejects(h.request(url), /Cooldown/);
    assert.equal(h.calls.length, count);
    h.advance(seconds * 1000);
  }
  await h.request(url);
  await assert.rejects(h.request(url), /cooldown 30s/);
  h.advance(30_000);
  await h.request(url);
});

test("non-retryable HTTP errors do not set a cooldown", async () => {
  const h = harness([new Response(null, { status: 404 }), Response.json({})]);
  await assert.rejects(h.request(url), /HTTP 404/);
  await h.request(url);
});

test("a concurrent success does not clear another request's cooldown", async () => {
  let release;
  let calls = 0;
  const request = createBackoffFetch({
    now: () => 0,
    fetchImpl: async () => {
      calls++;
      if (calls === 1) return new Promise((resolve) => { release = resolve; });
      return new Response(null, { status: 429 });
    },
  });
  const first = request(url);
  await assert.rejects(request(url), /HTTP 429/);
  release(Response.json({}));
  await first;
  await assert.rejects(request(url), /Cooldown/);
  assert.equal(calls, 2);
});
