#!/bin/bash
# Website watchdog: checks sailly.de health, reinstalls & restarts if broken

set -euo pipefail

export PATH="/home/charles2/.nvm/versions/node/v20.20.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

WEBSITE_DIR="/home/charles2/sailly-mvp-complete/apps/website"
LOG="/var/log/sailly-website-watchdog.log"
SERVICE="sailly-website.service"
CHECK_URL="https://sailly.de/de"
TIMEOUT=10

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG"
}

check_http() {
    local code
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "$CHECK_URL" 2>/dev/null || echo "000")
    echo "$code"
}

rebuild_and_restart() {
    log "FIXING: Reinstalling dependencies and rebuilding..."
    cd "$WEBSITE_DIR"

    if [ ! -d "node_modules" ] || [ ! -f "node_modules/next/package.json" ]; then
        log "node_modules missing or incomplete — running pnpm install"
        pnpm install --prefer-offline 2>&1 | tee -a "$LOG" || pnpm install 2>&1 | tee -a "$LOG"
    fi

    log "Running next build..."
    NODE_ENV=production pnpm run build 2>&1 | tee -a "$LOG"

    log "Restarting $SERVICE..."
    sudo systemctl restart "$SERVICE"
    sleep 8

    local code
    code=$(check_http)
    if [ "$code" = "200" ] || [ "$code" = "307" ] || [ "$code" = "308" ]; then
        log "RECOVERED: Site is back up (HTTP $code)"
    else
        log "ERROR: Site still down after rebuild (HTTP $code)"
    fi
}

# Main check
HTTP_CODE=$(check_http)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "308" ]; then
    # Also verify the service is actually running
    if ! systemctl is-active --quiet "$SERVICE"; then
        log "WARN: Service not active despite HTTP $HTTP_CODE — restarting"
        sudo systemctl restart "$SERVICE"
    fi
    # Silent success — only log problems
    exit 0
fi

log "ALERT: sailly.de returned HTTP $HTTP_CODE — attempting recovery"

# Check if node_modules are intact
if [ ! -f "$WEBSITE_DIR/node_modules/next/dist/compiled/cookie/index.js" ]; then
    log "CAUSE: node_modules corrupted or missing"
    rebuild_and_restart
elif ! systemctl is-active --quiet "$SERVICE"; then
    log "CAUSE: Service is not running"
    sudo systemctl restart "$SERVICE"
    sleep 5
else
    log "CAUSE: Unknown — restarting service"
    sudo systemctl restart "$SERVICE"
    sleep 8
    HTTP_CODE=$(check_http)
    if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "307" ] && [ "$HTTP_CODE" != "308" ]; then
        log "Still down after restart (HTTP $HTTP_CODE) — running full rebuild"
        rebuild_and_restart
    fi
fi
