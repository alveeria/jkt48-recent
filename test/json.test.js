import test from "node:test";
import assert from "node:assert/strict";
import { stringifyJson } from "../src/json.js";

test("viewer series is one line; other fields remain indented", () => {
  const value = { lives: [{ member: { name: "Example" }, viewer_series: [[0, 7], [1, 47], [2, 167]], other: [1, 2] }] };
  const text = stringifyJson(value);
  assert.ok(text.includes('"viewer_series": [[0, 7], [1, 47], [2, 167]]'));
  assert.ok(text.includes('"other": [\n        1,\n        2\n      ]'));
  assert.ok(text.endsWith("\n"));
  assert.deepEqual(JSON.parse(text), value);
});

test("empty, decimal, negative and exponential samples preserve values", () => {
  const value = [
    { viewer_series: [] },
    { viewer_series: [[-1, 0], [0.5, 1e21], [1e-7, 42]] },
  ];
  const text = stringifyJson(value);
  assert.ok(text.includes('"viewer_series": []'));
  assert.ok(text.includes('"viewer_series": [[-1, 0], [0.5, 1e+21], [1e-7, 42]]'));
  assert.deepEqual(JSON.parse(text), value);
});

test("unrelated arrays, string contents and nonstandard series stay unchanged", () => {
  for (const value of [
    { text: '"viewer_series": [[0, 7]]', other: [[0, 7]] },
    { viewer_series: null },
    { viewer_series: [[0, null]] },
    { viewer_series: [[0, 1, 2]] },
    { viewer_series: [[0, 1], []] },
  ]) {
    assert.equal(stringifyJson(value), `${JSON.stringify(value, null, 2)}\n`);
  }
});

test("serialization is stable when an existing JSON file is reformatted", () => {
  const value = { viewer_series: Array.from({ length: 400 }, (_, minute) => [minute, minute * 10]) };
  const text = stringifyJson(value);
  assert.equal(text.split("\n").length, 4);
  assert.equal(stringifyJson(JSON.parse(text)), text);
  assert.deepEqual(JSON.parse(text), value);
});
