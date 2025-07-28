#!/bin/bash

echo "Rebuilding development Docker environment..."

# Stop and remove existing containers
docker-compose -f docker-compose.dev.yml down

# Remove the node_modules volume to ensure fresh dependencies
docker volume rm backend_node_modules 2>/dev/null || true

# Rebuild the image without cache to ensure fresh dependencies
docker-compose -f docker-compose.dev.yml build --no-cache

# Start the services
docker-compose -f docker-compose.dev.yml up -d

# Show logs
echo "Waiting for services to start..."
sleep 5
docker-compose -f docker-compose.dev.yml logs --tail=50

echo "Development environment rebuilt successfully!"