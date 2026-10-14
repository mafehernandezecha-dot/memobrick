#!/bin/bash
# Installs the free Memobrick Mac jobs (launchd, no extra apps):
#   com.memobrick.social-post   every hour at :07 from 8:07 to 21:07, posts approved social kits
#   com.memobrick.chrome-tasks  every day at 21:07, runs approved Google Ads Chrome tasks
#   com.memobrick.data-pull     every day at 7:07, reads Google Ads, Analytics, Search Console,
#                               Meta, TikTok and Pinterest numbers into marketing/data/ (read-only)
#   com.memobrick.collabs       Mondays at 10:07 (and Thursdays at 10:07 from Nov 1 to Dec 15):
#                               María Beatriz reviews Shopify Collabs creator applications and
#                               carries out the owner-approved decisions and messages
# All four run Claude Code with Claude in Chrome on this Mac, signed in with the owner's plan.
#
# Install or update (safe to run again):  bash ~/Documents/GitHub/memobrick/os/scripts/install-mac-tasks.sh
# Stop and remove all jobs:               bash ~/Documents/GitHub/memobrick/os/scripts/install-mac-tasks.sh --uninstall
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
SUPPORT_DIR="$HOME/Library/Application Support/Memobrick"
WRAPPER="$SUPPORT_DIR/run-task.sh"
AGENTS_DIR="$HOME/Library/LaunchAgents"
LOG_DIR="$HOME/Library/Logs"
CLAUDE_BIN="${CLAUDE_BIN:-$HOME/.local/bin/claude}"
DOMAIN="gui/$(id -u)"
JOBS="social-post chrome-tasks data-pull collabs"

unload_job() {
  local label="com.memobrick.$1" plist="$AGENTS_DIR/com.memobrick.$1.plist"
  launchctl bootout "$DOMAIN/$label" >/dev/null 2>&1 || launchctl bootout "$DOMAIN" "$plist" >/dev/null 2>&1 || true
}

if [ "${1:-}" = "--uninstall" ]; then
  for job in $JOBS; do
    unload_job "$job"
    rm -f "$AGENTS_DIR/com.memobrick.$job.plist"
  done
  rm -f "$WRAPPER"
  rm -rf "$SUPPORT_DIR"/*.lock "$SUPPORT_DIR/data-pull-raw"
  echo "Memobrick Mac jobs stopped and removed. Nothing will post, pull data or act in Shopify Collabs automatically now."
  echo "Logs are kept in $LOG_DIR/memobrick-social-post.log, memobrick-chrome-tasks.log, memobrick-data-pull.log and memobrick-collabs.log."
  echo "To turn them back on: bash \"$REPO_DIR/os/scripts/install-mac-tasks.sh\""
  exit 0
fi

if [ -n "${1:-}" ]; then
  echo "Unknown option: $1 (use no option to install, or --uninstall)" >&2
  exit 2
fi

mkdir -p "$SUPPORT_DIR" "$AGENTS_DIR" "$LOG_DIR"

# The wrapper launchd runs. Values from this install are filled in below.
cat > "$WRAPPER" <<'WRAP'
#!/bin/bash
# Memobrick Mac task runner. Usage: run-task.sh social-post | chrome-tasks | data-pull | collabs
# Written by os/scripts/install-mac-tasks.sh; run that script again to update it.
TASK="${1:-}"
REPO="__REPO_DIR__"
CLAUDE="__CLAUDE_BIN__"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# EXTRA: tools only this task needs, on top of the shared list below.
EXTRA=()
case "$TASK" in
  social-post)  SKILL="memobrick-social-post";  LIMIT=3000 ;;
  chrome-tasks) SKILL="memobrick-chrome-tasks"; LIMIT=5400 ;;
  data-pull)    SKILL="memobrick-data-pull";    LIMIT=3000
                EXTRA=("Bash(mv:*)" "Bash(mkdir:*)" "Bash(python3 marketing/tools/clean_csv.py:*)") ;;
  collabs)      SKILL="memobrick-collabs";      LIMIT=5400 ;;
  *) echo "Usage: run-task.sh social-post | chrome-tasks | data-pull | collabs" >&2; exit 2 ;;
esac

LOG="$HOME/Library/Logs/memobrick-$TASK.log"
log() { echo "$(date '+%Y-%m-%d %H:%M:%S') [$TASK] $*" >> "$LOG"; }

# Keep the log under about 5 MB.
if [ -f "$LOG" ] && [ "$(wc -c < "$LOG")" -gt 5000000 ]; then
  tail -n 2000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
fi

# One run at a time; a lock older than 2 hours is left over from a crash.
LOCK="$HOME/Library/Application Support/Memobrick/$TASK.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  if [ -n "$(find "$LOCK" -maxdepth 0 -mmin +120 2>/dev/null)" ]; then
    rm -rf "$LOCK"; mkdir "$LOCK"
  else
    exit 0
  fi
fi
trap 'rm -rf "$LOCK"' EXIT

if ! cd "$REPO" 2>/dev/null; then
  log "Cannot open $REPO. If macOS blocked it (Operation not permitted), allow Terminal/bash in System Settings > Privacy & Security > Full Disk Access, or run the installer again if the folder moved."
  exit 1
fi

if ! git pull -q origin main >> "$LOG" 2>&1; then
  log "git pull failed, not running (check the internet connection and that the memobrick folder has no conflicting changes)."
  exit 1
fi

# Cheap check before starting Claude: is anything ready (and due)?
due=""
if [ "$TASK" = "social-post" ]; then
  now="$(TZ=America/New_York date '+%Y-%m-%d %H:%M')"
  for f in marketing/social/publisher/to-post/*.md; do
    [ -f "$f" ] || continue
    [ "$(head -n 1 "$f" | tr -d '\r')" = "Status: ready" ] || continue
    t="$(grep -m 1 '^Post time (ET):' "$f" | tr -d '\r' | sed 's/^Post time (ET):[[:space:]]*//')"
    t="${t:0:16}"
    if [ -n "$t" ] && [[ ! "$t" > "$now" ]]; then due=1; break; fi
  done
elif [ "$TASK" = "chrome-tasks" ]; then
  for f in marketing/analytics/ads-analyst/chrome-tasks/*.md; do
    [ -f "$f" ] || continue
    if [ "$(head -n 1 "$f" | tr -d '\r')" = "Status: ready" ]; then due=1; break; fi
  done
elif [ "$TASK" = "collabs" ]; then
  # Mondays always (and any day it is started by hand); Thursdays only from Nov 1 to Dec 15.
  md="$(date '+%m%d')"
  if [ "$(date '+%u')" != "4" ] || { [[ ! "$md" < "1101" ]] && [[ ! "$md" > "1215" ]]; }; then due=1; fi
else
  # data-pull: once a day; skip when latest.md already says it was updated today.
  if [ "$(head -n 1 marketing/data/latest.md 2>/dev/null | tr -d '\r' | cut -c 1-19)" != "Updated: $(date '+%Y-%m-%d')" ]; then
    due=1
    # Raw downloads (may hold personal data) stay outside the repo and are kept 14 days.
    RAW="$HOME/Library/Application Support/Memobrick/data-pull-raw"
    mkdir -p "$RAW/$(date '+%Y-%m-%d')"
    find "$RAW" -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} + 2>/dev/null
  fi
fi
[ -n "$due" ] || exit 0

if [ ! -x "$CLAUDE" ]; then
  log "Claude Code not found at $CLAUDE. Install it, then run the installer again."
  exit 1
fi

log "Starting Claude ($SKILL)"
# Signed-in plan, not an API key. perl alarm stops a run that hangs.
env -u ANTHROPIC_API_KEY perl -e 'alarm shift; exec @ARGV' "$LIMIT" \
  "$CLAUDE" -p "Follow the $SKILL skill in this folder." --chrome \
  --allowedTools "mcp__claude-in-chrome__*" "Bash(git:*)" \
  "Bash(python3 marketing/tools/check.py:*)" "Bash(TZ=America/New_York date:*)" "Bash(date:*)" "Bash(ls:*)" \
  "Read" "Edit" "Write" "Glob" "Grep" ${EXTRA[@]+"${EXTRA[@]}"} \
  < /dev/null >> "$LOG" 2>&1
log "Finished (exit $?)"
WRAP

# Fill in this Mac's paths (escape for sed).
esc() { printf '%s' "$1" | sed -e 's/[\/&|]/\\&/g'; }
sed -i.bak -e "s|__REPO_DIR__|$(esc "$REPO_DIR")|" -e "s|__CLAUDE_BIN__|$(esc "$CLAUDE_BIN")|" "$WRAPPER"
rm -f "$WRAPPER.bak"
chmod 755 "$WRAPPER"

xml_escape() { printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'; }

# write_plist <job> "<hours>" ["<weekdays>"]: runs at :07 of each hour, on the given
# weekdays only (1 = Monday ... 7 = Sunday) when weekdays are given, else every day.
write_plist() {
  local job="$1" hours="$2" days="${3:-}" plist="$AGENTS_DIR/com.memobrick.$1.plist" intervals="" h d
  for h in $hours; do
    if [ -n "$days" ]; then
      for d in $days; do
        intervals="$intervals    <dict><key>Weekday</key><integer>$d</integer><key>Hour</key><integer>$h</integer><key>Minute</key><integer>7</integer></dict>
"
      done
    else
      intervals="$intervals    <dict><key>Hour</key><integer>$h</integer><key>Minute</key><integer>7</integer></dict>
"
    fi
  done
  cat > "$plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.memobrick.$job</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$(xml_escape "$WRAPPER")</string>
    <string>$job</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
$intervals  </array>
  <key>RunAtLoad</key><false/>
  <key>StandardOutPath</key><string>$(xml_escape "$LOG_DIR/memobrick-$job.log")</string>
  <key>StandardErrorPath</key><string>$(xml_escape "$LOG_DIR/memobrick-$job.log")</string>
</dict>
</plist>
PLIST
  if command -v plutil >/dev/null 2>&1; then plutil -lint -s "$plist"; fi
  unload_job "$job"
  launchctl bootstrap "$DOMAIN" "$plist" 2>/dev/null || { sleep 2; launchctl bootstrap "$DOMAIN" "$plist"; }
}

write_plist social-post "8 9 10 11 12 13 14 15 16 17 18 19 20 21"
write_plist chrome-tasks "21"
write_plist data-pull "7"
write_plist collabs "10" "1 4"

cat <<NEXT

Memobrick Mac jobs installed.
  Social posts:       every hour at :07 from 8:07 to 21:07 (posts approved kits when their time arrives)
  Google Ads tasks:   every day at 21:07 (runs approved Chrome tasks)
  Data pull:          every day at 7:07 (reads Google Ads, Analytics, Search Console, Meta,
                      TikTok and Pinterest numbers into marketing/data/, changes nothing)
  Collabs creators:   Mondays at 10:07, and Thursdays at 10:07 from Nov 1 to Dec 15
                      (María Beatriz reviews Shopify Collabs applications; acts only on
                      what you approved)
  Memobrick folder:   $REPO_DIR
NEXT

if [ ! -x "$CLAUDE_BIN" ]; then
  echo
  echo "WARNING: Claude Code was not found at $CLAUDE_BIN. Install it and sign in, then run this script again."
fi

cat <<NEXT

Next steps:
  1. Keep the Mac awake and on power from 7 am to 9 pm, with Google Chrome open and the
     Claude in Chrome extension signed in. Stay logged in, in that Chrome, to:
     Google Ads, Google Analytics and Search Console (with the Google account that owns
     them), Meta Business Suite (Instagram and Facebook), TikTok, Pinterest, and Shopify
     admin for the Memobrick store with the Shopify Collabs app (also Instagram, TikTok and
     YouTube, so creators' profiles open without a login wall).
     If Chrome asks whether the site may download multiple files, click Allow.
     (System Settings > Battery or Energy: prevent automatic sleeping when on power.)
  2. Try it once now (posts only kits that are approved and due):
       bash "$WRAPPER" social-post
     If macOS asks to let bash access the Documents folder, click Allow.
     Also check that 'git push' works from Terminal in the memobrick folder.
     To test the data pull now:  bash "$WRAPPER" data-pull
     To run María Beatriz's Collabs review now:  bash "$WRAPPER" collabs
  3. Logs:
       $LOG_DIR/memobrick-social-post.log
       $LOG_DIR/memobrick-chrome-tasks.log
       $LOG_DIR/memobrick-data-pull.log
       $LOG_DIR/memobrick-collabs.log
     Anything that needs you shows up as 'Status: needs owner' in the kit and in the
     publisher's report, for the data pull under 'Needs owner' in marketing/data/latest.md,
     and for Collabs under 'Blocked or unknown' in María Beatriz's report.
  4. To stop all four jobs:
       bash "$REPO_DIR/os/scripts/install-mac-tasks.sh" --uninstall
NEXT
