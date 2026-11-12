#!/usr/bin/env bash
# Commit data changes and push; rebase onto anything pushed meanwhile.
set -euo pipefail
cd "$(dirname "$0")/.."
node src/readme.mjs
git add -A data state README.md
if git diff --cached --quiet; then exit 0; fi
git -c user.name="jkt48-recent-bot" -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
  commit -q -m "${1:-data: update live}"
for attempt in 1 2 3; do
  if git push -q; then exit 0; fi
  git pull -q --rebase -X theirs || true
  sleep $((attempt * 5))
done
echo "push failed" >&2
