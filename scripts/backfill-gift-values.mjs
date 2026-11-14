// Add estimates to existing recorded data without changing original statistics.
// Start from an up-to-date checkout; do not run concurrently with a recorder.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { giftValue } from "../src/gift-value.js";
import { stringifyJson } from "../src/json.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enrich = (row) => {
  const estimate = giftValue(row);
  return estimate.estimated_gift_value_idr === null ? row : { ...row, ...estimate };
};
const files = (await fs.readdir(path.join(root, "data/recent")))
  .filter((file) => file.endsWith(".json"))
  .map((file) => `data/recent/${file}`);
files.push("data/live.json", "state/active.json");
for (const file of files) {
  const full = path.join(root, file);
  const original = await fs.readFile(full, "utf8");
  const value = JSON.parse(original);
  const updated = file === "state/active.json"
    ? Object.fromEntries(Object.entries(value).map(([id, row]) => [id, enrich(row)]))
    : Array.isArray(value) ? value.map(enrich) : { ...value, lives: value.lives.map(enrich) };
  const text = stringifyJson(updated);
  if (text !== original) {
    await fs.writeFile(full, text);
    console.log(file);
  }
}
