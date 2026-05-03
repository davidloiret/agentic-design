#!/usr/bin/env bash
set -e

# Simple script to add SSL certificate for kortexya.com only

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >& /dev/null && pwd)"
CERTBOT_DIR="$SCRIPT_DIR/certbot"
KORTEXYA_DOMAIN="kortexya.com"
RSA_KEY_SIZE=4096
DEFAULT_EMAIL="contact@agentic-design.ai"
EMAIL="${SSL_EMAIL:-$DEFAULT_EMAIL}"

echo "🔒 Adding Let's Encrypt certificate for:"
echo "   Kortexya:        $KORTEXYA_DOMAIN (+ www.$KORTEXYA_DOMAIN)"

# Check if certificate already exists
if [ -d "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN" ]; then
  echo "✅ Certificate for $KORTEXYA_DOMAIN already exists!"
  echo "Certificate location: $CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN/"
  exit 0
fi

# DNS check
echo "🔍 Checking DNS configuration..."

echo "Checking $KORTEXYA_DOMAIN..."
KORTEXYA_IP=$(dig +short "$KORTEXYA_DOMAIN")
if [ -z "$KORTEXYA_IP" ]; then
  echo "❌ Error: Domain $KORTEXYA_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain $KORTEXYA_DOMAIN resolves to: $KORTEXYA_IP"

echo "Checking www.$KORTEXYA_DOMAIN..."
WWW_KORTEXYA_IP=$(dig +short "www.$KORTEXYA_DOMAIN")
if [ -z "$WWW_KORTEXYA_IP" ]; then
  echo "❌ Error: Domain www.$KORTEXYA_DOMAIN does not resolve to an IP address!"
  echo "Please configure your DNS to point to this server's IP address."
  exit 1
fi
echo "✅ Domain www.$KORTEXYA_DOMAIN resolves to: $WWW_KORTEXYA_IP"

# Start temporary Nginx for HTTP-01 challenge
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

mkdir -p "$CERTBOT_DIR/www"

cat > "$CERTBOT_DIR/nginx-temp.conf" <<EOF
server {
    listen 80;
    server_name $KORTEXYA_DOMAIN www.$KORTEXYA_DOMAIN;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    location / {
        return 200 'Let'\''s Encrypt challenge server';
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

# Request certificate
echo "📜 Requesting SSL certificate from Let's Encrypt..."
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

CERTBOT_EXIT=$?

# Cleanup
echo "🛑 Stopping temporary web server..."
docker stop temp-nginx >/dev/null
docker rm   temp-nginx >/dev/null
rm "$CERTBOT_DIR/nginx-temp.conf"

# Restart the nginx container if we stopped it earlier
if [ "$RESTART_NGINX" = true ]; then
  echo "🔄 Restarting original nginx container: $NGINX_CONTAINER"
  docker start $NGINX_CONTAINER >/dev/null
fi

# Fix permissions
echo "🔧 Adjusting certificate file ownership..."
sudo chown -R "$(id -u):$(id -g)" "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN" 2>/dev/null || true

# Final outcome
if [ $CERTBOT_EXIT -ne 0 ]; then
  echo "❌ Failed to obtain SSL certificate for $KORTEXYA_DOMAIN!"
  echo "Please check the logs in $CERTBOT_DIR/log for errors."
  exit 1
else
  echo "✅ SSL certificate successfully obtained for $KORTEXYA_DOMAIN!"
  echo ""
  echo "📅 Certificate expires at:"
  openssl x509 -enddate -noout -in "$CERTBOT_DIR/conf/live/$KORTEXYA_DOMAIN/fullchain.pem"
  echo ""
  echo "🚀 You can now:"
  echo "   1. Start kortexya service: cd /data/code/agentic-design && ./manage.sh up kortexya"
  echo "   2. Restart nginx: ./manage.sh restart nginx"
  exit 0
fi
