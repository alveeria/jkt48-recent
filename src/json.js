// Keep records readable, but don't expand every [minute, viewers] pair into
// several lines. This only changes whitespace, not the JSON structure.
export function stringifyJson(value) {
  return `${JSON.stringify(value, null, 2).replace(
    /("viewer_series": )(\[(?:\s|,|\[[\d\s,eE+.\-]*\])*\])/g,
    (match, property, array) => {
      const series = JSON.parse(array);
      if (!series.every((pair) => Array.isArray(pair) && pair.length === 2 && pair.every(Number.isFinite))) {
        return match;
      }
      return `${property}[${series.map(([minute, viewers]) => `[${minute}, ${viewers}]`).join(", ")}]`;
    },
  )}\n`;
}
