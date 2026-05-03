#!/bin/bash

# Zero-Downtime Deployment Script for Agentic Design Services
# This script ensures services are updated without interruption

set -e

# Enable BuildKit for all Docker operations
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Navigate to backend directory where docker-compose files are located
cd "$(dirname "$0")/backend"

COMPOSE_FILE="docker-compose.prod.yml"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display elapsed time in human-readable format
display_time() {
    local T=$1
    local D=$((T/60/60/24))
    local H=$((T/60/60%24))
    local M=$((T/60%60))
    local S=$((T%60))

    if [[ $D -gt 0 ]]; then
        printf "%dd %02dh %02dm %02ds" $D $H $M $S
    elif [[ $H -gt 0 ]]; then
        printf "%dh %02dm %02ds" $H $M $S
    elif [[ $M -gt 0 ]]; then
        printf "%dm %02ds" $M $S
    else
        printf "%ds" $S
    fi
}

# Function to log messages
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to wait for service to be healthy
wait_for_healthy() {
    local service=$1
    local max_wait=${2:-120}  # Default 2 minutes
    local interval=5
    local elapsed=0

    log_info "Waiting for $service to be healthy (max ${max_wait}s)..."

    while [ $elapsed -lt $max_wait ]; do
        # Check if container is running and healthy
        health_status=$(docker compose -f $COMPOSE_FILE ps --format json "$service" 2>/dev/null | jq -r '.[0].Health // "none"' 2>/dev/null || echo "none")

        if [ "$health_status" = "healthy" ]; then
            log_success "$service is healthy!"
            return 0
        fi

        # If no healthcheck, just check if running
        if [ "$health_status" = "none" ]; then
            container_status=$(docker compose -f $COMPOSE_FILE ps --format json "$service" 2>/dev/null | jq -r '.[0].State // "none"' 2>/dev/null || echo "none")
            if [ "$container_status" = "running" ]; then
                log_success "$service is running!"
                return 0
            fi
        fi

        sleep $interval
        elapsed=$((elapsed + interval))
        echo -n "."
    done

    echo ""
    log_error "$service did not become healthy within ${max_wait}s"
    return 1
}

# Function to perform zero-downtime deployment for a service
deploy_service() {
    local service=$1
    local start_time=$(date +%s)

    echo ""
    log_info "============================================"
    log_info "Starting zero-downtime deployment for: $service"
    log_info "============================================"

    # Special handling for reasoninglayer
    if [ "$service" = "reasoninglayer" ]; then
        log_info "Syncing ReasoningLayer repository..."
        cd ../reasoninglayer
        ./sync-repo.sh || { log_error "Failed to sync repository"; return 1; }
        cd -
    fi

    # Special handling for kortexya
    if [ "$service" = "kortexya" ]; then
        log_info "Syncing Kortexya repository..."
        cd ../kortexya
        ./sync-repo.sh || { log_error "Failed to sync repository"; return 1; }
        cd -
    fi

    # Step 1: Build the new image
    log_info "Building new image for $service..."
    docker compose -f $COMPOSE_FILE build --pull $service || {
        log_error "Build failed for $service"
        return 1
    }
    log_success "Build completed for $service"

    # Step 2: Get current container status
    old_container=$(docker compose -f $COMPOSE_FILE ps -q $service)

    if [ -z "$old_container" ]; then
        log_warning "No running container found for $service, performing standard deployment..."
        docker compose -f $COMPOSE_FILE up -d $service
        wait_for_healthy $service
        local end_time=$(date +%s)
        local elapsed=$((end_time - start_time))
        log_success "$service deployed in $(display_time $elapsed)"
        return 0
    fi

    # Step 3: Use docker compose's built-in rolling update
    # This will:
    # 1. Start new container
    # 2. Wait for it to be healthy (via healthcheck)
    # 3. Stop old container
    # 4. Remove old container
    log_info "Performing rolling update (new container will start before old one stops)..."

    # Use --wait to wait for healthcheck before considering it done
    docker compose -f $COMPOSE_FILE up -d --wait --no-deps $service || {
        log_error "Rolling update failed for $service"
        return 1
    }

    # Verify service is healthy
    log_info "Verifying service health..."
    wait_for_healthy $service 60 || {
        log_warning "$service may not be fully healthy, please check logs"
    }

    # Clean up old images
    log_info "Cleaning up old images..."
    docker image prune -f > /dev/null 2>&1 || true

    local end_time=$(date +%s)
    local elapsed=$((end_time - start_time))

    log_success "$service deployed successfully with minimal downtime in $(display_time $elapsed)"

    # If frontend or backend was rebuilt, restart nginx to ensure proper routing
    if [ "$service" = "frontend" ] || [ "$service" = "backend" ]; then
        log_info "Restarting nginx to ensure proper routing..."
        docker compose -f $COMPOSE_FILE restart nginx
    fi

    return 0
}

# Show help
show_help() {
    echo "Zero-Downtime Deployment Script"
    echo ""
    echo "Usage: ./zero-downtime-deploy.sh [SERVICE]"
    echo ""
    echo "Services:"
    echo "  frontend       - Next.js frontend"
    echo "  backend        - Node.js backend"
    echo "  reasoninglayer - ReasoningLayer.ai dashboard"
    echo "  kortexya       - Kortexya.com website"
    echo ""
    echo "Examples:"
    echo "  ./zero-downtime-deploy.sh frontend"
    echo "  ./zero-downtime-deploy.sh backend"
    echo "  ./zero-downtime-deploy.sh reasoninglayer"
    echo "  ./zero-downtime-deploy.sh kortexya"
}

# Main script
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

SERVICE=$1

# Validate service name
case "$SERVICE" in
    frontend|backend|reasoninglayer|kortexya)
        deploy_service $SERVICE
        exit $?
        ;;
    help|--help|-h)
        show_help
        exit 0
        ;;
    *)
        log_error "Unknown service: $SERVICE"
        echo ""
        show_help
        exit 1
        ;;
esac
