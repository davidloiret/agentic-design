#!/usr/bin/env bash
set -e

# ─── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >& /dev/null && pwd)"
CERTBOT_DIR="$SCRIPT_DIR/certbot"

echo "🔒 Zero-Downtime SSL Certificate Renewal"
echo "📅 $(date)"
echo ""

# ─── Certificate expiration check function ─────────────────────────────────────
check_cert_expiry() {
    local DOMAIN=$1
    local CERT_FILE="$CERTBOT_DIR/conf/live/$DOMAIN/fullchain.pem"

    if [ ! -f "$CERT_FILE" ]; then
        echo "⚠️  No certificate found for $DOMAIN - skipping"
        return 1  # Certificate doesn't exist
    fi

    EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
    EXPIRY_TIMESTAMP=$(date -d "$EXPIRY_DATE" +%s 2>/dev/null || echo "0")
    CURRENT_TIMESTAMP=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_TIMESTAMP - $CURRENT_TIMESTAMP) / 86400 ))

    echo "📅 $DOMAIN expires in $DAYS_UNTIL_EXPIRY days ($EXPIRY_DATE)"

    if [ $DAYS_UNTIL_EXPIRY -le 30 ]; then
        echo "  ⚠️  Certificate needs renewal (expires in $DAYS_UNTIL_EXPIRY days)"
        return 0  # Needs renewal (30 days or less)
    else
        echo "  ✅ Certificate is valid"
        return 2  # No renewal needed
    fi
}

# ─── Check all certificates ─────────────────────────────────────────────────────
echo "🔍 Checking certificate status..."
echo ""

DOMAINS=(
    "agentic-design.ai"
    "backend.agentic-design.ai"
    "plausible.agentic-design.ai"
    "highlight.agentic-design.ai"
    "reasoninglayer.ai"
    "kortexya.com"
)

NEEDS_RENEWAL=false

for DOMAIN in "${DOMAINS[@]}"; do
    set +e
    check_cert_expiry "$DOMAIN"
    result=$?
    set -e

    if [ $result -eq 0 ]; then
        NEEDS_RENEWAL=true
    fi
done

echo ""

# ─── Renew certificates if needed ───────────────────────────────────────────────
if [ "$NEEDS_RENEWAL" = false ]; then
    echo "✅ All certificates are valid. No renewal needed."
    exit 0
fi

echo "🔄 Renewing certificates using certbot renew..."
echo ""

# Use certbot renew with webroot method - works with running nginx
# The nginx config already has /.well-known/acme-challenge/ location configured
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot renew \
    --config-dir /etc/letsencrypt \
    --work-dir /var/lib/letsencrypt \
    --logs-dir /var/log/letsencrypt \
    --webroot -w /var/www/certbot

CERTBOT_EXIT=$?

# ─── Fix permissions ────────────────────────────────────────────────────────────
chown -R "$(id -u):$(id -g)" "$CERTBOT_DIR/conf" 2>/dev/null || true

# ─── Reload nginx to pick up new certificates ───────────────────────────────────
if [ $CERTBOT_EXIT -eq 0 ]; then
    echo ""
    echo "✅ Certificate renewal successful!"
    echo ""

    # Find and reload nginx container (graceful reload, no downtime)
    NGINX_CONTAINER=$(docker ps --filter "name=nginx" --format "{{.Names}}" | head -1)
    if [ ! -z "$NGINX_CONTAINER" ]; then
        echo "🔄 Reloading nginx configuration (zero downtime)..."
        docker exec $NGINX_CONTAINER nginx -s reload
        echo "✅ Nginx reloaded successfully"
    else
        echo "⚠️  Warning: Could not find nginx container to reload"
    fi

    echo ""
    echo "📅 Certificate expiration dates:"
    for DOMAIN in "${DOMAINS[@]}"; do
        CERT_FILE="$CERTBOT_DIR/conf/live/$DOMAIN/fullchain.pem"
        if [ -f "$CERT_FILE" ]; then
            EXPIRY=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
            echo "  - $DOMAIN: $EXPIRY"
        fi
    done

    exit 0
else
    echo ""
    echo "❌ Certificate renewal failed!"
    echo "Please check the logs in $CERTBOT_DIR/log for errors."
    exit 1
fi
