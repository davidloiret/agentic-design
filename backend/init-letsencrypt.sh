#!/usr/bin/env bash
set -e

# ─── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >& /dev/null && pwd)"
CERTBOT_DIR="$SCRIPT_DIR/certbot"
FRONTEND_DOMAIN="agentic-design.ai"
BACKEND_DOMAIN="backend.agentic-design.ai"
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
echo "   Frontend: $FRONTEND_DOMAIN (+ www.$FRONTEND_DOMAIN)"
echo "   Backend:  $BACKEND_DOMAIN"

# ─── Prepare directories ────────────────────────────────────────────────────────
mkdir -p \
  "$CERTBOT_DIR/conf" \
  "$CERTBOT_DIR/lib" \
  "$CERTBOT_DIR/log" \
  "$CERTBOT_DIR/www"

# ─── Existing‐certificate logic ─────────────────────────────────────────────────
FRONTEND_CERT_EXISTS=false
BACKEND_CERT_EXISTS=false

if [ -d "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN" ]; then
  FRONTEND_CERT_EXISTS=true
  echo "⚠️  Certificates for $FRONTEND_DOMAIN already exist!"
fi

if [ -d "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN" ]; then
  BACKEND_CERT_EXISTS=true
  echo "⚠️  Certificates for $BACKEND_DOMAIN already exist!"
fi

if [ "$FRONTEND_CERT_EXISTS" = true ] || [ "$BACKEND_CERT_EXISTS" = true ]; then
  read -p "Do you want to recreate existing certificates? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Using existing certificates. You can now run ./deploy.sh"
    exit 0
  fi
  echo "🗑️  Removing existing certificates..."
  
  if [ "$FRONTEND_CERT_EXISTS" = true ]; then
    sudo rm -rf \
      "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN" \
      "$CERTBOT_DIR/conf/archive/$FRONTEND_DOMAIN" \
      "$CERTBOT_DIR/conf/renewal/$FRONTEND_DOMAIN.conf"
  fi
  
  if [ "$BACKEND_CERT_EXISTS" = true ]; then
    sudo rm -rf \
      "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN" \
      "$CERTBOT_DIR/conf/archive/$BACKEND_DOMAIN" \
      "$CERTBOT_DIR/conf/renewal/$BACKEND_DOMAIN.conf"
  fi
fi

# ─── DNS check ──────────────────────────────────────────────────────────────────
echo "🔍 Checking DNS configuration..."

echo "Checking $FRONTEND_DOMAIN..."
FRONTEND_IP=$(dig +short "$FRONTEND_DOMAIN")
if [ -z "$FRONTEND_IP" ]; then
  echo "❌ Error: Domain $FRONTEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $FRONTEND_DOMAIN resolves to: $FRONTEND_IP"

echo "Checking www.$FRONTEND_DOMAIN..."
WWW_FRONTEND_IP=$(dig +short "www.$FRONTEND_DOMAIN")
if [ -z "$WWW_FRONTEND_IP" ]; then
  echo "❌ Error: Domain www.$FRONTEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain www.$FRONTEND_DOMAIN resolves to: $WWW_FRONTEND_IP"

echo "Checking $BACKEND_DOMAIN..."
BACKEND_IP=$(dig +short "$BACKEND_DOMAIN")
if [ -z "$BACKEND_IP" ]; then
  echo "❌ Error: Domain $BACKEND_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $BACKEND_DOMAIN resolves to: $BACKEND_IP"

# ─── Fire up temporary Nginx for HTTP-01 challenge ─────────────────────────────
echo "🚀 Starting temporary web server for Let's Encrypt challenge..."
cat > "$CERTBOT_DIR/nginx-temp.conf" <<EOF
server {
    listen 80;
    server_name $FRONTEND_DOMAIN www.$FRONTEND_DOMAIN $BACKEND_DOMAIN;
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

# ─── Request certificates for both domains ─────────────────────────────────────
echo "📜 Requesting SSL certificates from Let's Encrypt..."

# Request certificate for frontend domain (including www subdomain)
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

# Request certificate for backend domain
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

# Check if both certificates were obtained successfully
if [ $FRONTEND_CERTBOT_EXIT -ne 0 ] || [ $BACKEND_CERTBOT_EXIT -ne 0 ]; then
  CERTBOT_EXIT=1
else
  CERTBOT_EXIT=0
fi

# ─── Tear down temporary server ────────────────────────────────────────────────
echo "🛑 Stopping temporary web server..."
docker stop temp-nginx >/dev/null
docker rm   temp-nginx >/dev/null
rm "$CERTBOT_DIR/nginx-temp.conf"

# ─── Fix permissions so you can read the cert files ────────────────────────────
echo "🔧 Adjusting certificate file ownership..."
sudo chown -R "$(id -u):$(id -g)" "$CERTBOT_DIR/conf"

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
  exit 1
else
  echo "✅ SSL certificates successfully obtained for both domains!"
  echo ""
  echo "📅 Frontend certificate ($FRONTEND_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$FRONTEND_DOMAIN/fullchain.pem"
  echo ""
  echo "📅 Backend certificate ($BACKEND_DOMAIN) expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$BACKEND_DOMAIN/fullchain.pem"
  echo ""
  echo "🚀 You can now:"
  echo "   1. Ensure your .env.prod is configured"
  echo "   2. chmod +x deploy.sh"
  echo "   3. ./deploy.sh"
  exit 0
fi
