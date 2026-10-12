#!/bin/bash
# Builds "Memobrick OS.app" in /Applications (or ~/Applications) on the owner's Mac.
# Double-clicking it starts the dashboard in the background if it isn't running
# and opens it in its own window (Chrome app mode, or the default browser).
# Run once from the os folder:  bash scripts/install-mac-app.sh
set -e

OS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_NAME="Memobrick OS"
DEST="${MEMOBRICK_APP_DIR:-/Applications}"
[ -w "$DEST" ] || DEST="$HOME/Applications"
mkdir -p "$DEST"
APP="$DEST/$APP_NAME.app"

rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

# Icon
if command -v iconutil >/dev/null; then
  iconutil -c icns "$OS_DIR/scripts/mac-app/MemobrickOS.iconset" -o "$APP/Contents/Resources/MemobrickOS.icns"
fi

cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>$APP_NAME</string>
  <key>CFBundleDisplayName</key><string>$APP_NAME</string>
  <key>CFBundleIdentifier</key><string>com.memobrick.os</string>
  <key>CFBundleVersion</key><string>1.0</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleExecutable</key><string>launch</string>
  <key>CFBundleIconFile</key><string>MemobrickOS</string>
  <key>LSUIElement</key><false/>
</dict>
</plist>
PLIST

cat > "$APP/Contents/MacOS/launch" <<LAUNCH
#!/bin/bash
# Memobrick OS launcher.
OS_DIR="$OS_DIR"
URL="http://localhost:5173"
LOG="\$HOME/Library/Logs/memobrick-os.log"

running() { curl -s -o /dev/null --max-time 1 "\$URL/api/state"; }

if ! running; then
  # Start the dashboard with the owner's shell settings (Node, keys) in the background.
  /bin/zsh -lic "cd '\$OS_DIR' && nohup npm run os > '\$LOG' 2>&1 &" >/dev/null 2>&1
  for i in \$(seq 1 60); do
    running && break
    sleep 0.5
  done
fi

if ! running; then
  osascript -e 'display dialog "Memobrick OS could not start. Open Terminal, go to the memobrick/os folder, and run: npm run os" buttons {"OK"} with icon caution with title "Memobrick OS"'
  exit 1
fi

# Open in its own window: Chrome app mode if Chrome is installed, else the default browser.
if [ -d "/Applications/Google Chrome.app" ]; then
  open -na "Google Chrome" --args --app="\$URL" --window-size=1440,900
else
  open "\$URL"
fi
LAUNCH
chmod +x "$APP/Contents/MacOS/launch"

# A second small app to stop the dashboard when you want it off.
STOP="$DEST/Stop Memobrick OS.app"
rm -rf "$STOP"
mkdir -p "$STOP/Contents/MacOS"
cat > "$STOP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>Stop Memobrick OS</string>
  <key>CFBundleIdentifier</key><string>com.memobrick.os.stop</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleExecutable</key><string>stop</string>
</dict>
</plist>
PLIST
cat > "$STOP/Contents/MacOS/stop" <<'STOPSH'
#!/bin/bash
PIDS=$(lsof -t -i:5173 -sTCP:LISTEN 2>/dev/null)
if [ -n "$PIDS" ]; then kill $PIDS; MSG="Memobrick OS is stopped."; else MSG="Memobrick OS was not running."; fi
osascript -e "display notification \"$MSG\" with title \"Memobrick OS\""
STOPSH
chmod +x "$STOP/Contents/MacOS/stop"

# Let macOS refresh the icon.
touch "$APP"
echo ""
echo "Installed: $APP"
echo "Open it from Launchpad or Finder > Applications, then right-click its Dock icon > Options > Keep in Dock."
if [ "$(uname)" = Darwin ]; then open -R "$APP"; fi
