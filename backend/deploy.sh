#!/bin/bash

# Production Deployment Script for Agentic Design
# Make sure to run: chmod +x deploy.sh

set -e

echo "🚀 Starting Agentic Design Production Deployment..."

# Check if we should deploy Firecracker API
DEPLOY_FIRECRACKER=${DEPLOY_FIRECRACKER:-false}
echo "🔥 Firecracker API deployment: $DEPLOY_FIRECRACKER"

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
docker compose -f docker-compose.prod.yml --env-file .env.prod down --volumes --remove-orphans

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

# Deploy Firecracker API if requested
if [ "$DEPLOY_FIRECRACKER" = "true" ]; then
    echo "🔥 Deploying Firecracker API..."
    
    # Check if Firecracker setup has been run
    if [ ! -f "/usr/local/bin/firecracker" ]; then
        echo "⚠️  Warning: Firecracker not found. Running setup..."
        echo "Please run the Firecracker setup first:"
        echo "  cd ../api"
        echo "  sudo ./setup_firecracker_production.sh"
        echo "  sudo reboot"
        echo ""
        echo "Then re-run this deployment with DEPLOY_FIRECRACKER=true"
    else
        # Deploy Firecracker API service
        cd ../api
        echo "🚀 Starting Firecracker API containers..."
        docker compose -f docker-compose.firecracker-prod.yml up -d
        
        echo "✅ Firecracker API deployed successfully!"
        echo "🌐 Firecracker API available at: http://localhost:8000"
        echo "🔍 Health check: curl http://localhost:8000/health"
        
        cd ../backend
    fi
fi

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
if [ "$DEPLOY_FIRECRACKER" = "true" ]; then
    echo "   🔥 Firecracker API: http://localhost:8000"
fi
echo "   📱 All HTTP traffic is automatically redirected to HTTPS"
echo ""
echo "📊 Service management:"
echo "   • Main app logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   • Stop main app: docker-compose -f docker-compose.prod.yml down"
if [ "$DEPLOY_FIRECRACKER" = "true" ]; then
    echo "   • Firecracker logs: cd ../api && docker-compose -f docker-compose.firecracker-prod.yml logs -f"
    echo "   • Stop Firecracker: cd ../api && docker-compose -f docker-compose.firecracker-prod.yml down"
fi
echo ""
echo "🔥 To deploy with Firecracker API:"
echo "   DEPLOY_FIRECRACKER=true ./deploy.sh" 
