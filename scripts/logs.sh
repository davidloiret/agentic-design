#!/bin/bash

# View Logs for All Services or Specific Service

SERVICE=$1

if [ -z "$SERVICE" ]; then
  echo "📋 Viewing all service logs..."
  echo "   Press Ctrl+C to exit"
  echo ""
  docker-compose -f docker-compose.dev.yml logs -f --tail=100
else
  echo "📋 Viewing logs for: $SERVICE"
  echo "   Press Ctrl+C to exit"
  echo ""
  docker-compose -f docker-compose.dev.yml logs -f --tail=100 "$SERVICE"
fi
