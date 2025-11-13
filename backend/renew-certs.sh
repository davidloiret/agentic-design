#!/bin/bash

# Renew Let's Encrypt certificates for all domains
# This script should be run periodically (e.g., via cron)
# Add to crontab: 0 3 * * * /path/to/renew-certs.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >& /dev/null && pwd)"
CERTBOT_DIR="$SCRIPT_DIR/certbot"

FRONTEND_DOMAIN="agentic-design.ai"
BACKEND_DOMAIN="backend.agentic-design.ai"
PLAUSIBLE_DOMAIN="plausible.agentic-design.ai"
HIGHLIGHT_DOMAIN="highlight.agentic-design.ai"

echo "🔄 Checking certificate renewal for all domains..."
echo ""

# Function to check certificate expiry
check_cert_expiry() {
    local DOMAIN=$1
    local CERT_FILE="$CERTBOT_DIR/conf/live/$DOMAIN/fullchain.pem"

    if [ ! -f "$CERT_FILE" ]; then
        echo "❌ No certificate found for $DOMAIN"
        return 1
    fi

    EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)

    # Different date command for Linux vs macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        EXPIRY_TIMESTAMP=$(date -j -f "%b %d %T %Y %Z" "$EXPIRY_DATE" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$EXPIRY_DATE" +%s)
    else
        EXPIRY_TIMESTAMP=$(date -d "$EXPIRY_DATE" +%s)
    fi

    CURRENT_TIMESTAMP=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_TIMESTAMP - $CURRENT_TIMESTAMP) / 86400 ))

    echo "📅 $DOMAIN expires in $DAYS_UNTIL_EXPIRY days ($EXPIRY_DATE)"

    if [ $DAYS_UNTIL_EXPIRY -le 30 ]; then
        return 0  # Needs renewal
    else
        return 1  # No renewal needed
    fi
}

# Check all domains
NEEDS_RENEWAL=false

check_cert_expiry "$FRONTEND_DOMAIN" && NEEDS_RENEWAL=true || true
check_cert_expiry "$BACKEND_DOMAIN" && NEEDS_RENEWAL=true || true
check_cert_expiry "$PLAUSIBLE_DOMAIN" && NEEDS_RENEWAL=true || true
check_cert_expiry "$HIGHLIGHT_DOMAIN" && NEEDS_RENEWAL=true || true

echo ""

if [ "$NEEDS_RENEWAL" = false ]; then
    echo "✅ All certificates are valid for more than 30 days. No renewal needed."
    exit 0
fi

echo "🔄 One or more certificates expire soon. Starting renewal process..."
echo ""

# Attempt renewal
docker run --rm \
    -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
    -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
    -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
    -v "$CERTBOT_DIR/www:/var/www/certbot" \
    certbot/certbot renew \
        --config-dir    /etc/letsencrypt \
        --work-dir      /var/lib/letsencrypt \
        --logs-dir      /var/log/letsencrypt \
        --webroot       -w /var/www/certbot \
        --quiet

RENEWAL_EXIT=$?

if [ $RENEWAL_EXIT -eq 0 ]; then
    echo "✅ Certificate renewal successful!"
    echo ""

    # Check if nginx container is running
    NGINX_CONTAINER=$(docker ps --format "{{.Names}}" | grep -E "nginx|agentic-design-nginx" | head -1 || true)

    if [ ! -z "$NGINX_CONTAINER" ]; then
        echo "🔄 Reloading nginx configuration..."
        docker exec "$NGINX_CONTAINER" nginx -s reload
        echo "✅ Nginx reloaded successfully!"
    else
        echo "⚠️  Nginx container not running. You may need to restart your services."
    fi

    echo ""
    echo "🎉 Certificate renewal completed successfully!"
    echo ""
    echo "Updated certificate expiration dates:"
    check_cert_expiry "$FRONTEND_DOMAIN" >/dev/null 2>&1 || true
    check_cert_expiry "$BACKEND_DOMAIN" >/dev/null 2>&1 || true
    check_cert_expiry "$PLAUSIBLE_DOMAIN" >/dev/null 2>&1 || true
    check_cert_expiry "$HIGHLIGHT_DOMAIN" >/dev/null 2>&1 || true
else
    echo "❌ Certificate renewal failed!"
    echo "Check logs in $CERTBOT_DIR/log for details."
    exit 1
fi
