#!/bin/bash

# Stop All Development Services

set -e

echo "🛑 Stopping All Development Services..."
echo ""

docker-compose -f docker-compose.dev.yml down

echo ""
echo "✅ All services stopped."
echo ""
echo "💡 Tips:"
echo "   - To remove all data: docker-compose -f docker-compose.dev.yml down -v"
echo "   - To restart: ./scripts/start-dev.sh"
echo "   - To view stopped containers: docker ps -a"
echo ""
