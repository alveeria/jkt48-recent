// Shared cooldown per origin for polling HTTP requests. Skip, rather than sleep,
// so a throttled platform cannot stall polling of the other platform.
export function createBackoffFetch({ fetchImpl = globalThis.fetch, now = Date.now } = {}) {
  const origins = new Map();
  const baseMs = 30_000;
  const maxMs = 5 * 60_000;

  function defer(state, retryAfter) {
    state.failures = Math.min(state.failures + 1, 5);
    const exponential = Math.min(baseMs * 2 ** (state.failures - 1), maxMs);
    let serverDelay = 0;
    if (retryAfter != null) {
      const value = retryAfter.trim();
      if (/^\d+$/.test(value)) serverDelay = Number(value) * 1000;
      else {
        const date = Date.parse(value);
        if (Number.isFinite(date)) serverDelay = Math.max(0, date - now());
      }
    }
    // Never shorten an existing cooldown or cap a longer server Retry-After.
    state.until = Math.max(state.until, now() + Math.max(exponential, serverDelay));
  }

  return async function fetchWithBackoff(url, init = {}) {
    const origin = new URL(url).origin;
    const state = origins.get(origin) || { failures: 0, until: 0 };
    origins.set(origin, state);
    if (now() < state.until) {
      throw new Error(`Cooldown ${origin}: retry in ${Math.ceil((state.until - now()) / 1000)}s`);
    }

    let res;
    try {
      res = await fetchImpl(url, init);
    } catch (error) {
      defer(state);
      throw new Error(`Network error ${origin}; cooldown ${Math.ceil((state.until - now()) / 1000)}s`, { cause: error });
    }
    if (!res.ok) {
      const retryable = res.status === 429 || res.status >= 500;
      if (retryable) defer(state, res.headers.get("retry-after"));
      await res.body?.cancel().catch(() => {});
      throw new Error(`HTTP ${res.status} ${url}${retryable ? `; cooldown ${Math.ceil((state.until - now()) / 1000)}s` : ""}`);
    }
    // A concurrent successful response must not undo another request's cooldown.
    if (now() >= state.until) {
      state.failures = 0;
      state.until = 0;
    }
    return res;
  };
}

export const fetchWithBackoff = createBackoffFetch();
