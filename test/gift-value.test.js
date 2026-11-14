import test from "node:test";
import assert from "node:assert/strict";
import { giftValue } from "../src/gift-value.js";

const rates = { idn: 2500, showroom: 114.26 };

test("IDN uses Gold, not event count or points", () => {
  assert.deepEqual(giftValue({ platform: "idn", gift_gold: 3735, gift_points: 14940, gifts: 101 }, rates), {
    estimated_gift_value_idr: 9337500, gift_rate_idr: 2500, gift_value_basis: "gold",
  });
});

test("SHOWROOM estimates paid points only; ignores stars", () => {
  assert.deepEqual(giftValue({ platform: "showroom", gift_points: 8445, stars: 64448 }, rates), {
    estimated_gift_value_idr: 964925.7, gift_rate_idr: 114.26, gift_value_basis: "paid_points",
  });
});

test("a known zero is zero, missing or invalid statistics are unknown", () => {
  assert.equal(giftValue({ platform: "showroom", gift_points: 0 }, rates).estimated_gift_value_idr, 0);
  for (const gift_gold of [undefined, null, -1, NaN, Infinity, "100"]) {
    assert.deepEqual(giftValue({ platform: "idn", gift_gold }, rates), {
      estimated_gift_value_idr: null, gift_rate_idr: null, gift_value_basis: null,
    });
  }
});

test("preserves a stored rate; rate changes cannot silently reprice history", () => {
  const row = { platform: "showroom", gift_points: 10, gift_rate_idr: 107.1 };
  assert.equal(giftValue(row, rates).estimated_gift_value_idr, 1071);
  assert.equal(giftValue({ platform: "idn", gift_gold: 1 }, { idn: 2000 }).estimated_gift_value_idr, 2000);
  assert.equal(giftValue({ platform: "other", gift_points: 1 }, rates).estimated_gift_value_idr, null);
});
