#!/bin/bash

# Production Deployment Script for Agentic Design
# Make sure to run: chmod +x deploy.sh

set -e

echo "🚀 Starting Agentic Design Production Deployment..."

if [ ! -f ".env.prod" ]; then
    echo "❌ Error: .env.prod file not found!"
    echo "📋 Please copy env.prod.example to .env.prod and configure your environment variables."
    exit 1
fi

export $(cat .env.prod | grep -v '^#' | xargs)

DOMAIN="${DOMAIN_NAME:-backend.agentic-design.ai}"
if [ ! -f "./certbot/conf/live/$DOMAIN/fullchain.pem" ]; then
    echo "❌ Error: SSL certificates not found for $DOMAIN!"
    echo "🔒 Please run the SSL initialization script first:"
    echo "   chmod +x init-letsencrypt.sh"
    echo "   ./init-letsencrypt.sh"
    echo ""
    echo "📋 Make sure your domain DNS points to this server before running the SSL script."
    exit 1
fi

echo "✅ SSL certificates found for $DOMAIN"

echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.prod.yml --env-file .env.prod down

echo "🧹 Cleaning up old images (optional)..."
read -p "Do you want to remove old images to save space? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker system prune -f
    docker image prune -f
fi

echo "🔨 Building production images..."
docker compose -f docker-compose.prod.yml --env-file .env.prod build --no-cache

echo "🚀 Starting production containers..."
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d

echo "⏳ Waiting for services to be healthy..."
sleep 10

echo "🔍 Checking service status..."
docker compose -f docker-compose.prod.yml --env-file .env.prod ps

echo "📋 Checking logs for any immediate errors..."
docker compose -f docker-compose.prod.yml --env-file .env.prod logs --tail=20

echo "✅ Deployment completed!"
echo "🌐 Your application is available at:"
echo "   🔒 Frontend: https://agentic-design.ai"
echo "   🔒 Backend API: https://backend.agentic-design.ai"
echo "   📱 All HTTP traffic is automatically redirected to HTTPS"
echo ""
echo "📊 To view logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down" 
