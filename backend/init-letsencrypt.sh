#!/usr/bin/env bash
set -e

# ─── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >& /dev/null && pwd)"
CERTBOT_DIR="$SCRIPT_DIR/certbot"
FRONTEND_DOMAIN="agentic-design.ai"
BACKEND_DOMAIN="backend.agentic-design.ai"
PLAUSIBLE_DOMAIN="plausible.agentic-design.ai"
HIGHLIGHT_DOMAIN="highlight.agentic-design.ai"
REASONINGLAYER_DOMAIN="reasoninglayer.ai"
KORTEXYA_DOMAIN="kortexya.com"
RSA_KEY_SIZE=4096
DEFAULT_EMAIL="contact@agentic-design.ai"
EMAIL="${SSL_EMAIL:-$DEFAULT_EMAIL}"

# ─── Load .env.prod (if present) ───────────────────────────────────────────────
if [ -f "$SCRIPT_DIR/.env.prod" ]; then
  echo "🔑 Loading environment from .env.prod..."
  set -o allexport
  source <(grep -v '^\s*#' "$SCRIPT_DIR/.env.prod")
  set +o allexport
  EMAIL="${SSL_EMAIL:-$EMAIL}"
  FRONTEND_DOMAIN="${FRONTEND_DOMAIN:-$FRONTEND_DOMAIN}"
  BACKEND_DOMAIN="${DOMAIN_NAME:-$BACKEND_DOMAIN}"
fi

echo "🔒 Initializing Let's Encrypt for domains:"
echo "   Frontend:        $FRONTEND_DOMAIN (+ www.$FRONTEND_DOMAIN)"
echo "   Backend:         $BACKEND_DOMAIN"
echo "   Plausible:       $PLAUSIBLE_DOMAIN"
echo "   Highlight:       $HIGHLIGHT_DOMAIN"
echo "   ReasoningLayer:  $REASONINGLAYER_DOMAIN (+ www.$REASONINGLAYER_DOMAIN)"
echo "   Kortexya:        $KORTEXYA_DOMAIN (+ www.$KORTEXYA_DOMAIN)"

# ─── Prepare directories ────────────────────────────────────────────────────────
mkdir -p \
  "$CERTBOT_DIR/conf" \
  "$CERTBOT_DIR/lib" \
  "$CERTBOT_DIR/log" \
  "$CERTBOT_DIR/www"

# ─── Certificate expiration check function ─────────────────────────────────────
check_cert_expiry() {
    local DOMAIN=$1
    local CERT_FILE="$CERTBOT_DIR/conf/live/$DOMAIN/fullchain.pem"

    if [ ! -f "$CERT_FILE" ]; then
        return 1  # Certificate doesn't exist
    fi

    EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
    EXPIRY_TIMESTAMP=$(date -d "$EXPIRY_DATE" +%s 2>/dev/null || echo "0")
    CURRENT_TIMESTAMP=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_TIMESTAMP - $CURRENT_TIMESTAMP) / 86400 ))

    echo "📅 $DOMAIN expires in $DAYS_UNTIL_EXPIRY days ($EXPIRY_DATE)"

    if [ $DAYS_UNTIL_EXPIRY -le 30 ]; then
        return 0  # Needs renewal (30 days or less)
    else
        return 2  # No renewal needed
    fi
}

# ─── Existing‐certificate logic with auto-renewal ──────────────────────────────
echo "🔍 Checking certificate status..."
echo ""

FRONTEND_CERT_EXISTS=false
BACKEND_CERT_EXISTS=false
PLAUSIBLE_CERT_EXISTS=false
HIGHLIGHT_CERT_EXISTS=false
REASONINGLAYER_CERT_EXISTS=false
KORTEXYA_CERT_EXISTS=false

FRONTEND_NEEDS_RENEWAL=false
BACKEND_NEEDS_RENEWAL=false
PLAUSIBLE_NEEDS_RENEWAL=false
HIGHLIGHT_NEEDS_RENEWAL=false
REASONINGLAYER_NEEDS_RENEWAL=false
KORTEXYA_NEEDS_RENEWAL=false

# Check frontend domain
if [ -d "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN" ]; then
  FRONTEND_CERT_EXISTS=true
  set +e
  check_cert_expiry "$FRONTEND_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $FRONTEND_DOMAIN needs renewal!"
    FRONTEND_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $FRONTEND_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $FRONTEND_DOMAIN"
fi

# Check backend domain
if [ -d "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN" ]; then
  BACKEND_CERT_EXISTS=true
  set +e
  check_cert_expiry "$BACKEND_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $BACKEND_DOMAIN needs renewal!"
    BACKEND_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $BACKEND_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $BACKEND_DOMAIN"
fi

# Check plausible domain
if [ -d "$CERTBOT_DIR/conf/live/$PLAUSIBLE_DOMAIN" ]; then
  PLAUSIBLE_CERT_EXISTS=true
  set +e
  check_cert_expiry "$PLAUSIBLE_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $PLAUSIBLE_DOMAIN needs renewal!"
    PLAUSIBLE_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $PLAUSIBLE_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $PLAUSIBLE_DOMAIN"
fi

# Check highlight domain
if [ -d "$CERTBOT_DIR/conf/live/$HIGHLIGHT_DOMAIN" ]; then
  HIGHLIGHT_CERT_EXISTS=true
  set +e
  check_cert_expiry "$HIGHLIGHT_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $HIGHLIGHT_DOMAIN needs renewal!"
    HIGHLIGHT_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $HIGHLIGHT_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $HIGHLIGHT_DOMAIN"
fi

# Check reasoninglayer domain
if [ -d "$CERTBOT_DIR/conf/live/$REASONINGLAYER_DOMAIN" ]; then
  REASONINGLAYER_CERT_EXISTS=true
  set +e
  check_cert_expiry "$REASONINGLAYER_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $REASONINGLAYER_DOMAIN needs renewal!"
    REASONINGLAYER_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $REASONINGLAYER_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $REASONINGLAYER_DOMAIN"
fi

# Check kortexya domain
if [ -d "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN" ]; then
  KORTEXYA_CERT_EXISTS=true
  set +e
  check_cert_expiry "$KORTEXYA_DOMAIN"
  result=$?
  set -e
  if [ $result -eq 0 ]; then
    echo "⚠️  Certificate for $KORTEXYA_DOMAIN needs renewal!"
    KORTEXYA_NEEDS_RENEWAL=true
  elif [ $result -eq 2 ]; then
    echo "✅ Certificate for $KORTEXYA_DOMAIN is valid"
  fi
else
  echo "📝 No certificate found for $KORTEXYA_DOMAIN"
fi

echo ""

# Remove certificates that need renewal
if [ "$FRONTEND_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $FRONTEND_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$FRONTEND_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$FRONTEND_DOMAIN.conf"
  FRONTEND_CERT_EXISTS=false
fi

if [ "$BACKEND_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $BACKEND_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$BACKEND_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$BACKEND_DOMAIN.conf"
  BACKEND_CERT_EXISTS=false
fi

if [ "$PLAUSIBLE_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $PLAUSIBLE_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$PLAUSIBLE_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$PLAUSIBLE_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$PLAUSIBLE_DOMAIN.conf"
  PLAUSIBLE_CERT_EXISTS=false
fi

if [ "$HIGHLIGHT_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $HIGHLIGHT_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$HIGHLIGHT_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$HIGHLIGHT_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$HIGHLIGHT_DOMAIN.conf"
  HIGHLIGHT_CERT_EXISTS=false
fi

if [ "$REASONINGLAYER_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $REASONINGLAYER_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$REASONINGLAYER_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$REASONINGLAYER_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$REASONINGLAYER_DOMAIN.conf"
  REASONINGLAYER_CERT_EXISTS=false
fi

if [ "$KORTEXYA_NEEDS_RENEWAL" = true ]; then
  echo "🗑️  Removing expired certificate for $KORTEXYA_DOMAIN..."
  rm -rf \
    "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN" \
    "$CERTBOT_DIR/conf/archive/$KORTEXYA_DOMAIN" \
    "$CERTBOT_DIR/conf/renewal/$KORTEXYA_DOMAIN.conf"
  KORTEXYA_CERT_EXISTS=false
fi

# Check if all certificates are valid
if [ "$FRONTEND_CERT_EXISTS" = true ] && [ "$BACKEND_CERT_EXISTS" = true ] && [ "$PLAUSIBLE_CERT_EXISTS" = true ] && [ "$HIGHLIGHT_CERT_EXISTS" = true ] && [ "$REASONINGLAYER_CERT_EXISTS" = true ] && [ "$KORTEXYA_CERT_EXISTS" = true ]; then
  echo "✅ All certificates are valid. No action needed."
  exit 0
fi

# ─── DNS check ──────────────────────────────────────────────────────────────────
echo "🔍 Checking DNS configuration..."

# Only check DNS for domains that need certificates
if [ "$FRONTEND_CERT_EXISTS" = false ]; then
echo "Checking $FRONTEND_DOMAIN..."
FRONTEND_IP=$(dig +short "$FRONTEND_DOMAIN")
if [ -z "$FRONTEND_IP" ]; then
  echo "❌ Error: Domain $FRONTEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $FRONTEND_DOMAIN resolves to: $FRONTEND_IP"
fi

if [ "$FRONTEND_CERT_EXISTS" = false ]; then
echo "Checking www.$FRONTEND_DOMAIN..."
WWW_FRONTEND_IP=$(dig +short "www.$FRONTEND_DOMAIN")
if [ -z "$WWW_FRONTEND_IP" ]; then
  echo "❌ Error: Domain www.$FRONTEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain www.$FRONTEND_DOMAIN resolves to: $WWW_FRONTEND_IP"
fi

if [ "$BACKEND_CERT_EXISTS" = false ]; then
echo "Checking $BACKEND_DOMAIN..."
BACKEND_IP=$(dig +short "$BACKEND_DOMAIN")
if [ -z "$BACKEND_IP" ]; then
  echo "❌ Error: Domain $BACKEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $BACKEND_DOMAIN resolves to: $BACKEND_IP"
fi

if [ "$PLAUSIBLE_CERT_EXISTS" = false ]; then
echo "Checking $PLAUSIBLE_DOMAIN..."
PLAUSIBLE_IP=$(dig +short "$PLAUSIBLE_DOMAIN")
if [ -z "$PLAUSIBLE_IP" ]; then
  echo "❌ Error: Domain $PLAUSIBLE_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $PLAUSIBLE_DOMAIN resolves to: $PLAUSIBLE_IP"
fi

if [ "$HIGHLIGHT_CERT_EXISTS" = false ]; then
echo "Checking $HIGHLIGHT_DOMAIN..."
HIGHLIGHT_IP=$(dig +short "$HIGHLIGHT_DOMAIN")
if [ -z "$HIGHLIGHT_IP" ]; then
  echo "❌ Error: Domain $HIGHLIGHT_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $HIGHLIGHT_DOMAIN resolves to: $HIGHLIGHT_IP"
fi

if [ "$REASONINGLAYER_CERT_EXISTS" = false ]; then
echo "Checking $REASONINGLAYER_DOMAIN..."
REASONINGLAYER_IP=$(dig +short "$REASONINGLAYER_DOMAIN")
if [ -z "$REASONINGLAYER_IP" ]; then
  echo "❌ Error: Domain $REASONINGLAYER_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $REASONINGLAYER_DOMAIN resolves to: $REASONINGLAYER_IP"
fi

if [ "$REASONINGLAYER_CERT_EXISTS" = false ]; then
echo "Checking www.$REASONINGLAYER_DOMAIN..."
WWW_REASONINGLAYER_IP=$(dig +short "www.$REASONINGLAYER_DOMAIN")
if [ -z "$WWW_REASONINGLAYER_IP" ]; then
  echo "❌ Error: Domain www.$REASONINGLAYER_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain www.$REASONINGLAYER_DOMAIN resolves to: $WWW_REASONINGLAYER_IP"
fi

if [ "$KORTEXYA_CERT_EXISTS" = false ]; then
echo "Checking $KORTEXYA_DOMAIN..."
KORTEXYA_IP=$(dig +short "$KORTEXYA_DOMAIN")
if [ -z "$KORTEXYA_IP" ]; then
  echo "❌ Error: Domain $KORTEXYA_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $KORTEXYA_DOMAIN resolves to: $KORTEXYA_IP"
fi

if [ "$KORTEXYA_CERT_EXISTS" = false ]; then
echo "Checking www.$KORTEXYA_DOMAIN..."
WWW_KORTEXYA_IP=$(dig +short "www.$KORTEXYA_DOMAIN")
if [ -z "$WWW_KORTEXYA_IP" ]; then
  echo "❌ Error: Domain www.$KORTEXYA_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain www.$KORTEXYA_DOMAIN resolves to: $WWW_KORTEXYA_IP"
fi

# ─── Fire up temporary Nginx for HTTP-01 challenge ─────────────────────────────
echo "🚀 Starting temporary web server for Let's Encrypt challenge..."

# Check if port 80 is in use and stop any conflicting containers
NGINX_CONTAINER=$(docker ps --filter "publish=80" --format "{{.Names}}" | grep -E "nginx|web" || true)
if [ ! -z "$NGINX_CONTAINER" ]; then
  echo "⚠️  Temporarily stopping container using port 80: $NGINX_CONTAINER"
  docker stop $NGINX_CONTAINER >/dev/null
  RESTART_NGINX=true
else
  RESTART_NGINX=false
fi

# Remove any leftover temp-nginx container
if docker ps -a --format "{{.Names}}" | grep -q "^temp-nginx$"; then
  echo "🧹 Cleaning up leftover temp-nginx container..."
  docker rm -f temp-nginx >/dev/null 2>&1
fi

cat > "$CERTBOT_DIR/nginx-temp.conf" <<EOF
server {
    listen 80;
    server_name $FRONTEND_DOMAIN www.$FRONTEND_DOMAIN $BACKEND_DOMAIN $PLAUSIBLE_DOMAIN $HIGHLIGHT_DOMAIN $REASONINGLAYER_DOMAIN www.$REASONINGLAYER_DOMAIN $KORTEXYA_DOMAIN www.$KORTEXYA_DOMAIN;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    location / {
        return 200 'Let\'s Encrypt challenge server';
        add_header Content-Type text/plain;
    }
}
EOF

docker run -d --name temp-nginx \
  -p 80:80 \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  -v "$CERTBOT_DIR/nginx-temp.conf:/etc/nginx/conf.d/default.conf" \
  nginx:alpine

sleep 3

# ─── Request certificates for domains that need them ───────────────────────────
echo "📜 Requesting SSL certificates from Let's Encrypt..."

# Request certificate for frontend domain (including www subdomain)
if [ "$FRONTEND_CERT_EXISTS" = false ]; then
echo "Getting certificate for $FRONTEND_DOMAIN and www.$FRONTEND_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$FRONTEND_DOMAIN" \
    -d "www.$FRONTEND_DOMAIN"
FRONTEND_CERTBOT_EXIT=$?
else
FRONTEND_CERTBOT_EXIT=0
fi

# Request certificate for backend domain
if [ "$BACKEND_CERT_EXISTS" = false ]; then
echo "Getting certificate for $BACKEND_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$BACKEND_DOMAIN"
BACKEND_CERTBOT_EXIT=$?
else
BACKEND_CERTBOT_EXIT=0
fi

# Request certificate for plausible domain
if [ "$PLAUSIBLE_CERT_EXISTS" = false ]; then
echo "Getting certificate for $PLAUSIBLE_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$PLAUSIBLE_DOMAIN"
PLAUSIBLE_CERTBOT_EXIT=$?
else
PLAUSIBLE_CERTBOT_EXIT=0
fi

# Request certificate for highlight domain
if [ "$HIGHLIGHT_CERT_EXISTS" = false ]; then
echo "Getting certificate for $HIGHLIGHT_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$HIGHLIGHT_DOMAIN"
HIGHLIGHT_CERTBOT_EXIT=$?
else
HIGHLIGHT_CERTBOT_EXIT=0
fi

# Request certificate for reasoninglayer domain (including www subdomain)
if [ "$REASONINGLAYER_CERT_EXISTS" = false ]; then
echo "Getting certificate for $REASONINGLAYER_DOMAIN and www.$REASONINGLAYER_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$REASONINGLAYER_DOMAIN" \
    -d "www.$REASONINGLAYER_DOMAIN"
REASONINGLAYER_CERTBOT_EXIT=$?
else
REASONINGLAYER_CERTBOT_EXIT=0
fi

# Request certificate for kortexya domain (including www subdomain)
if [ "$KORTEXYA_CERT_EXISTS" = false ]; then
echo "Getting certificate for $KORTEXYA_DOMAIN and www.$KORTEXYA_DOMAIN..."
docker run --rm \
  -v "$CERTBOT_DIR/conf:/etc/letsencrypt" \
  -v "$CERTBOT_DIR/lib:/var/lib/letsencrypt" \
  -v "$CERTBOT_DIR/log:/var/log/letsencrypt" \
  -v "$CERTBOT_DIR/www:/var/www/certbot" \
  certbot/certbot certonly \
    --config-dir    /etc/letsencrypt \
    --work-dir      /var/lib/letsencrypt \
    --logs-dir      /var/log/letsencrypt \
    --webroot       -w /var/www/certbot \
    --email         "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --rsa-key-size  "$RSA_KEY_SIZE" \
    -d "$KORTEXYA_DOMAIN" \
    -d "www.$KORTEXYA_DOMAIN"
KORTEXYA_CERTBOT_EXIT=$?
else
KORTEXYA_CERTBOT_EXIT=0
fi

# Check if all certificates were obtained successfully
if [ $FRONTEND_CERTBOT_EXIT -ne 0 ] || [ $BACKEND_CERTBOT_EXIT -ne 0 ] || [ $PLAUSIBLE_CERTBOT_EXIT -ne 0 ] || [ $HIGHLIGHT_CERTBOT_EXIT -ne 0 ] || [ $REASONINGLAYER_CERTBOT_EXIT -ne 0 ] || [ $KORTEXYA_CERTBOT_EXIT -ne 0 ]; then
  CERTBOT_EXIT=1
else
  CERTBOT_EXIT=0
fi

# ─── Tear down temporary server ────────────────────────────────────────────────
echo "🛑 Stopping temporary web server..."
docker stop temp-nginx >/dev/null
docker rm   temp-nginx >/dev/null
rm "$CERTBOT_DIR/nginx-temp.conf"

# Restart the nginx container if we stopped it earlier
if [ "$RESTART_NGINX" = true ]; then
  echo "🔄 Restarting original nginx container: $NGINX_CONTAINER"
  docker start $NGINX_CONTAINER >/dev/null
fi

# ─── Fix permissions so you can read the cert files ────────────────────────────
echo "🔧 Adjusting certificate file ownership..."
chown -R "$(id -u):$(id -g)" "$CERTBOT_DIR/conf" 2>/dev/null || true

# ─── Final outcome ──────────────────────────────────────────────────────────────
if [ $CERTBOT_EXIT -ne 0 ]; then
  echo "❌ Failed to obtain SSL certificates!"
  echo "Please check the logs in $CERTBOT_DIR/log for errors."
  if [ $FRONTEND_CERTBOT_EXIT -ne 0 ]; then
    echo "   Frontend domain ($FRONTEND_DOMAIN) failed"
  fi
  if [ $BACKEND_CERTBOT_EXIT -ne 0 ]; then
    echo "   Backend domain ($BACKEND_DOMAIN) failed"
  fi
  if [ $PLAUSIBLE_CERTBOT_EXIT -ne 0 ]; then
    echo "   Plausible domain ($PLAUSIBLE_DOMAIN) failed"
  fi
  if [ $HIGHLIGHT_CERTBOT_EXIT -ne 0 ]; then
    echo "   Highlight domain ($HIGHLIGHT_DOMAIN) failed"
  fi
  if [ $REASONINGLAYER_CERTBOT_EXIT -ne 0 ]; then
    echo "   ReasoningLayer domain ($REASONINGLAYER_DOMAIN) failed"
  fi
  if [ $KORTEXYA_CERTBOT_EXIT -ne 0 ]; then
    echo "   Kortexya domain ($KORTEXYA_DOMAIN) failed"
  fi
  exit 1
else
  echo "✅ SSL certificates successfully obtained for all domains!"
  echo ""
  echo "📅 Frontend certificate ($FRONTEND_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 Backend certificate ($BACKEND_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 Plausible certificate ($PLAUSIBLE_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$PLAUSIBLE_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 Highlight certificate ($HIGHLIGHT_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$HIGHLIGHT_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 ReasoningLayer certificate ($REASONINGLAYER_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$REASONINGLAYER_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 Kortexya certificate ($KORTEXYA_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN/fullchain.pem"
  echo ""
  echo "🚀 You can now:"
  echo "   1. Ensure your .env.prod is configured"
  echo "   2. chmod +x deploy.sh"
  echo "   3. ./deploy.sh"
  exit 0
fi
