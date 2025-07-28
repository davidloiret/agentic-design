#!/bin/bash

# Backend deployment script for 51.15.191.100

echo "Starting deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create .env file from .env.example"
    exit 1
fi

# Pull latest changes (if using git)
# git pull origin main

# Build and deploy using docker-compose
echo "Building and deploying with Docker Compose..."
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check if services are running
echo "Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo "Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=50

echo "Deployment complete!"
echo "Backend is running on http://51.15.191.100:3001"
echo "Health check: http://51.15.191.100:3001/api/v1/health"