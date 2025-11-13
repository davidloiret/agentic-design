#!/bin/bash

# Start All Development Services
# Starts: Frontend + Plausible Analytics + Highlight.io

set -e

echo "🚀 Starting All Development Services..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
if ! docker info > /dev/null 2>&1; then
  echo "❌ Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

# Create network if needed
if ! docker network inspect agentic-network > /dev/null 2>&1; then
  echo "📡 Creating Docker network: agentic-network"
  docker network create agentic-network
fi

# Start all services
echo "🔧 Starting all services..."
docker-compose -f docker-compose.dev.yml up -d

echo ""
echo "⏳ Waiting for services to initialize..."
sleep 15

echo ""
echo "🏥 Health Check:"
echo ""

# Check Frontend
if curl -s http://localhost:3002 > /dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} Frontend is ready"
else
  echo -e "  ${YELLOW}⚠${NC} Frontend is starting..."
fi

# Check Plausible
if curl -s http://localhost:8000 > /dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} Plausible is ready"
else
  echo -e "  ${YELLOW}⚠${NC} Plausible is starting..."
fi

# Check Highlight Backend
sleep 5
if curl -s http://localhost:8082/health > /dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} Highlight Backend is ready"
else
  echo -e "  ${YELLOW}⚠${NC} Highlight Backend is starting (may take 30-60s)..."
fi

# Check Highlight Frontend
if curl -s http://localhost:3100 > /dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} Highlight Dashboard is ready"
else
  echo -e "  ${YELLOW}⚠${NC} Highlight Dashboard is starting..."
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ All Services Started!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📱 Your Application:"
echo "   Frontend:           http://localhost:3002"
echo ""
echo "📊 Analytics & Monitoring:"
echo "   Plausible:          http://localhost:8000"
echo "     └─ User: admin@agentic-design.ai"
echo "     └─ Pass: rvTvcxJGuDU722"
echo ""
echo "   Highlight.io:       http://localhost:3100"
echo "     └─ Create account on first visit"
echo ""
echo "🔧 Infrastructure:"
echo "   Highlight Backend:  http://localhost:8082"
echo "   MinIO Console:      http://localhost:9090"
echo "   OpenSearch:         http://localhost:9200"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 Next Steps:"
echo "   1. Visit http://localhost:3100 to create Highlight project"
echo "   2. Copy your Project ID"
echo "   3. Add to .env.local:"
echo "      NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID=your_project_id"
echo "      NEXT_PUBLIC_HIGHLIGHT_ENABLED=true"
echo "      NEXT_PUBLIC_HIGHLIGHT_BACKEND_URL=http://localhost:8082/public"
echo "      HIGHLIGHT_PROJECT_ID=your_project_id"
echo ""
echo "🛑 To stop: ./scripts/stop-dev.sh"
echo "📋 View logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "📋 View specific service: docker-compose -f docker-compose.dev.yml logs -f highlight-backend"
echo ""
