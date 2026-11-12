// IDN Live chat listener. Gifts and comments are not in IDN's public API; the
// web player receives them over IRC (wss://chat.idn.app), one channel per live
// ("#" + room_identifier). Comments arrive from the system account IDNLoki
// ({ chat: { message } }) and gifts from IDNOdin ({ gift: { slug, gold, point } }).
//
// Joining needs a logged-in IDN account (a dedicated one): IDN_REFRESH_TOKEN is
// a Cognito refresh token, exchanged for fresh tokens, then for IRC
// credentials via /api/v1/chat/auth-user. This client only listens: it never
// sends messages to a room (the web player announces "X bergabung"; we don't).
// Tokens and passwords are never logged.

const COGNITO = "https://cognito-idp.ap-southeast-1.amazonaws.com/";
const CLIENT_ID = "6gnaj30oomhtl0t3qtkfp2uir9";
const API = "https://api-gumlet.idn.app";
const API_KEY = "123f4c4e-6ce1-404d-8786-d17e46d65b5c"; // public key shipped in idn.app's web player
const IRC_URL = "wss://chat.idn.app/";
const GIFT_BOT = "IDNOdin";
const CHAT_BOT = "IDNLoki";

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), "[idn-chat]", ...a);

function findKey(obj, key, depth = 0) {
  if (!obj || typeof obj !== "object" || depth > 5) return undefined;
  if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
  for (const v of Object.values(obj)) {
    const hit = findKey(v, key, depth + 1);
    if (hit !== undefined) return hit;
  }
  return undefined;
}

export class IdnChat {
  /** onEvent(room_identifier, { type: "gift" | "comment", user, gift? }) */
  constructor(refreshToken, onEvent) {
    this.refreshToken = refreshToken;
    this.onEvent = onEvent;
    this.rooms = new Set(); // rooms we want to be in
    this.joined = new Set();
    this.ws = null;
    this.ready = false;
    this.backoff = 5_000;
    this.stopped = false;
  }

  async tokens() {
    const res = await fetch(COGNITO, {
      method: "POST",
      headers: {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
      },
      body: JSON.stringify({
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: { REFRESH_TOKEN: this.refreshToken },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`cognito refresh HTTP ${res.status}`);
    const r = (await res.json()).AuthenticationResult || {};
    if (!r.IdToken || !r.AccessToken) throw new Error("cognito refresh: no tokens");
    if (r.RefreshToken) log("warning: Cognito rotated the refresh token; update IDN_REFRESH_TOKEN");
    return { id: r.IdToken, access: r.AccessToken };
  }

  async api(method, path, t, sub) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        authorization: `Bearer ${t.id}`,
        "access-token": t.access,
        "x-api-key": API_KEY,
        "session-id": sub,
        "x-request-id": `${sub}_${Date.now()}`,
        "content-type": "application/json",
      },
      body: method === "POST" ? "{}" : undefined,
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`${path.split("?")[0]} HTTP ${res.status}`);
    return res.json();
  }

  async credentials() {
    const t = await this.tokens();
    const sub = JSON.parse(Buffer.from(t.id.split(".")[1], "base64url").toString()).sub;
    const login = await this.api("POST", "/api/v3.2/idn-account/login-by-sso", t, sub);
    const shortId = findKey(login, "short_id");
    if (!shortId) throw new Error("login-by-sso: no short_id");
    const auth = await this.api("GET", `/api/v1/chat/auth-user?short_id=${encodeURIComponent(shortId)}`, t, sub);
    const user = findKey(auth, "chat_user_id");
    const password = findKey(auth, "password");
    if (!user || !password) throw new Error("chat/auth-user: no credentials");
    return { user: String(user), password: String(password), nick: process.env.IDN_CHAT_NICK || `idn-${shortId}-gh` };
  }

  async start() {
    if (this.stopped) return;
    let creds;
    try {
      creds = await this.credentials();
    } catch (e) {
      log("auth failed:", e.message);
      return this.retry();
    }
    // The server drops handshakes without the web player's Origin.
    const ws = new WebSocket(IRC_URL, { headers: { origin: "https://www.idn.app" } });
    this.ws = ws;
    this.ready = false;
    this.joined.clear();
    const send = (line) => ws.readyState === WebSocket.OPEN && ws.send(`${line}\r\n`);
    ws.onopen = () => {
      if (process.env.IDN_CHAT_DEBUG) log("socket open, nick", creds.nick);
      // Same handshake as the web player, under a nick of our own
      // (idn-<short_id>-gh) so the account's web session is not kicked off.
      send("CAP LS 302");
      send(`NICK ${creds.nick}`);
      send(`USER ${creds.nick} 0 * null`);
      send("CAP END");
    };
    ws.binaryType = "arraybuffer";
    ws.onmessage = (e) => {
      // IRC over WebSocket: each frame is a whole message, without a trailing CRLF.
      const text = typeof e.data === "string" ? e.data : Buffer.from(e.data).toString();
      for (const line of text.split(/\r?\n/)) if (line) this.line(line, send, creds);
    };
    ws.onclose = (e) => {
      log("disconnected", e.code);
      this.ready = false;
      this.retry();
    };
    ws.onerror = (e) => process.env.IDN_CHAT_DEBUG && log("socket error", e.message || ""); // onclose follows
  }

  retry() {
    if (this.stopped) return;
    setTimeout(() => this.start(), this.backoff);
    this.backoff = Math.min(this.backoff * 2, 5 * 60_000);
  }

  line(raw, send, creds) {
    const line = raw.replace(/^@\S+ /, "");
    if (process.env.IDN_CHAT_DEBUG && !/IDENTIFY|PRIVMSG #/.test(line)) log("<", line.slice(0, 160));
    if (line.startsWith("PING")) return send(`PONG ${line.slice(5)}`);
    const m = /^:(\S+) (\S+) ?(.*)$/.exec(line);
    if (!m) return;
    const [, prefix, cmd, rest] = m;
    if (cmd === "001") {
      send(`PRIVMSG NickServ :IDENTIFY ${creds.user} ${creds.password}`);
      // Joining does not wait for 900: rooms accept unidentified listeners too.
      this.ready = true;
      this.backoff = 5_000;
      log("connected");
      this.sync();
      return;
    }
    if (cmd === "900") return log("identified");
    if (cmd === "904" || cmd === "433" || cmd === "465") return log("server said", cmd);
    if (cmd !== "PRIVMSG") return;
    const pm = /^(#\S+) :(.*)$/.exec(rest);
    if (!pm) return;
    const sender = prefix.split("!")[0];
    if (sender !== GIFT_BOT && sender !== CHAT_BOT) return;
    let body;
    try {
      body = JSON.parse(pm[2]);
    } catch {
      return;
    }
    const room = pm[1].slice(1);
    if (sender === GIFT_BOT && body.gift) this.onEvent(room, { type: "gift", user: body.user || {}, gift: body.gift });
    else if (sender === CHAT_BOT && body.chat) this.onEvent(room, { type: "comment", user: body.user || {} });
  }

  /** Join wanted rooms and leave ended ones. */
  sync() {
    if (!this.ready) return;
    const send = (l) => this.ws.readyState === WebSocket.OPEN && this.ws.send(`${l}\r\n`);
    for (const room of this.rooms) if (!this.joined.has(room)) (send(`JOIN #${room}`), this.joined.add(room));
    for (const room of [...this.joined]) if (!this.rooms.has(room)) (send(`PART #${room}`), this.joined.delete(room));
  }

  setRooms(rooms) {
    this.rooms = new Set(rooms.filter(Boolean));
    this.sync();
  }

  stop() {
    this.stopped = true;
    try {
      this.ws?.close();
    } catch {}
  }
}
