// Reference estimates, not official prices or member take-home earnings.
// SHOWROOM: paid gift points only, never free gifts/stars.
const positive = (value) => typeof value === "number" && Number.isFinite(value) && value > 0;
const envRate = (name, fallback) => {
  const value = Number(process.env[name]);
  return positive(value) ? value : fallback;
};

export const DEFAULT_GIFT_RATES = Object.freeze({
  idn: envRate("IDN_GOLD_RATE_IDR", 2500),
  showroom: envRate("SHOWROOM_POINT_RATE_IDR", 114.26),
});

export function giftValue(session, rates = DEFAULT_GIFT_RATES) {
  const units = session.platform === "idn" ? session.gift_gold : session.gift_points;
  const basis = session.platform === "idn" ? "gold" : "paid_points";
  const rate = positive(session.gift_rate_idr) ? session.gift_rate_idr : rates[session.platform];
  if (
    !["idn", "showroom"].includes(session.platform) ||
    typeof units !== "number" || !Number.isFinite(units) || units < 0 || !positive(rate)
  ) {
    return { estimated_gift_value_idr: null, gift_rate_idr: null, gift_value_basis: null };
  }
  const amount = Math.round((units * rate + Number.EPSILON) * 100) / 100;
  if (!Number.isFinite(amount)) {
    return { estimated_gift_value_idr: null, gift_rate_idr: null, gift_value_basis: null };
  }
  return { estimated_gift_value_idr: amount, gift_rate_idr: rate, gift_value_basis: basis };
}
