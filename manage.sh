#!/bin/bash

# Enable BuildKit for all Docker operations
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Navigate to backend directory where docker-compose files are located
cd "$(dirname "$0")/backend"

COMPOSE_FILE="docker-compose.prod.yml"

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

# Function to run command with timing
run_with_timing() {
    local cmd_description="$1"
    shift
    local start_time=$(date +%s)
    
    echo "⏱️  Starting: $cmd_description"
    
    # Run the actual command
    "$@"
    local exit_code=$?
    
    local end_time=$(date +%s)
    local elapsed=$((end_time - start_time))
    
    if [ $exit_code -eq 0 ]; then
        echo "✅ Completed: $cmd_description (Time taken: $(display_time $elapsed))"
    else
        echo "❌ Failed: $cmd_description (Time taken: $(display_time $elapsed))"
    fi
    
    return $exit_code
}

# Function to check if sudo is available and prompt for password if needed
ensure_sudo() {
    if ! sudo -n true 2>/dev/null; then
        echo "🔐 CodeSandbox requires sudo privileges for Firecracker/KVM operations."
        
        # Check if we're in an interactive terminal
        if [ -t 0 ]; then
            echo "Please enter your password to continue:"
            sudo -v || {
                echo "❌ Failed to obtain sudo privileges"
                exit 1
            }
        else
            echo "❌ Non-interactive environment detected."
            echo "Please run 'sudo -v' first to cache your password, or run this script from an interactive terminal."
            exit 1
        fi
    fi
}

# Function to run CodeSandbox commands with sudo
run_codesandbox_with_sudo() {
    local action="$1"
    ensure_sudo
    
    case "$action" in
        "build")
            cd "$(dirname "$0")/../codesandbox"
            run_with_timing "Building CodeSandbox environment" sudo make all
            ;;
        "start")
            echo "🚀 Starting CodeSandbox service with sudo..."
            cd "$(dirname "$0")/../codesandbox"
            if [ -f start.sh ]; then
                nohup sudo ./start.sh > ../codesandbox.log 2>&1 &
                echo $! > ../codesandbox.pid
                echo "✅ CodeSandbox service started in background (PID: $(cat ../codesandbox.pid))"
                echo "📋 Logs available in codesandbox.log"
            else
                echo "❌ start.sh not found in codesandbox directory"
                exit 1
            fi
            ;;
        "rebuild")
            cd "$(dirname "$0")/../codesandbox"
            run_with_timing "Rebuilding CodeSandbox environment" sudo make all
            if [ $? -eq 0 ]; then
                echo "🚀 Starting CodeSandbox service in background..."
                nohup sudo ./start.sh > ../codesandbox.log 2>&1 &
                echo $! > ../codesandbox.pid
                echo "✅ CodeSandbox service started in background (PID: $(cat ../codesandbox.pid))"
                echo "📋 Logs available in codesandbox.log"
            else
                echo "❌ make all failed, not starting service"
                exit 1
            fi
            ;;
    esac
}

show_help() {
    echo "🚀 Agentic Design Management Script"
    echo ""
    echo "Usage: ./manage.sh [COMMAND] [SERVICE]"
    echo ""
    echo "Commands:"
    echo "  up [service]       - Start service(s)"
    echo "  start [service]    - Start service(s) (alias for up)"
    echo "  down [service]     - Stop service(s)"
    echo "  stop [service]     - Stop service(s) (alias for down)"
    echo "  build [service]    - Build service(s)"
    echo "  rebuild [service]  - Rebuild service(s) with no cache"
    echo "  force-rebuild [service] - Force complete rebuild (remove containers, images, volumes)"
    echo "  logs [service]     - Show logs for service(s)"
    echo "  restart [service]  - Restart service(s)"
    echo "  status             - Show running containers"
    echo "  clean              - Clean Docker system"
    echo "  shell [service]    - Enter shell in service container"
    echo ""
    echo "Services:"
    echo "  frontend    - Next.js frontend (port 3002)"
    echo "  backend     - Node.js backend (port 3001)"  
    echo "  nginx       - Nginx reverse proxy (ports 80/443)"
    echo "  codesandbox - CodeSandbox environment (requires sudo for Firecracker/KVM)"
    echo "  all         - All services (default if no service specified)"
    echo ""
    echo "Examples:"
    echo "  ./manage.sh up frontend              # Start only frontend"
    echo "  ./manage.sh rebuild backend          # Rebuild only backend"
    echo "  ./manage.sh logs frontend            # Show frontend logs"
    echo "  ./manage.sh up                       # Start all services"
    echo "  ./manage.sh rebuild codesandbox      # Build and start CodeSandbox service"
    echo "  ./manage.sh start codesandbox        # Start CodeSandbox service"  
    echo "  ./manage.sh stop codesandbox         # Stop CodeSandbox service"
    echo "  ./manage.sh shell frontend           # Enter shell in frontend container"
    echo "  ./manage.sh shell backend            # Enter shell in backend container"
}

# Track overall command start time
OVERALL_START_TIME=$(date +%s)

case "$1" in
    up|start)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            run_with_timing "Starting all Docker services" docker compose -f $COMPOSE_FILE up -d
            run_codesandbox_with_sudo "start"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "start"
        else
            run_with_timing "Starting $2" docker compose -f $COMPOSE_FILE up -d $2
        fi
        ;;
    down|stop)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            run_with_timing "Stopping all Docker services" docker compose -f $COMPOSE_FILE down
            echo "🛑 Stopping CodeSandbox service..."
            SCRIPT_DIR="$(dirname "$0")"
            PID_FILE="$SCRIPT_DIR/codesandbox.pid"
            if [ -f "$PID_FILE" ]; then
                PID=$(cat "$PID_FILE")
                if kill -0 $PID 2>/dev/null; then
                    kill $PID
                    echo "✅ CodeSandbox service stopped (PID: $PID)"
                    rm "$PID_FILE"
                else
                    echo "⚠️  Process $PID not running"
                    rm "$PID_FILE"
                fi
            else
                echo "⚠️  No PID file found. CodeSandbox service may not be running."
            fi
        elif [ "$2" = "codesandbox" ]; then
            echo "🛑 Stopping CodeSandbox service..."
            SCRIPT_DIR="$(dirname "$0")"
            PID_FILE="$SCRIPT_DIR/codesandbox.pid"
            if [ -f "$PID_FILE" ]; then
                PID=$(cat "$PID_FILE")
                if kill -0 $PID 2>/dev/null; then
                    kill $PID
                    echo "✅ CodeSandbox service stopped (PID: $PID)"
                    rm "$PID_FILE"
                else
                    echo "⚠️  Process $PID not running"
                    rm "$PID_FILE"
                fi
            else
                echo "⚠️  No PID file found. CodeSandbox service may not be running."
            fi
        else
            run_with_timing "Stopping $2" docker compose -f $COMPOSE_FILE stop $2
        fi
        ;;
    build)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            run_with_timing "Building all Docker services" docker compose -f $COMPOSE_FILE build
            run_codesandbox_with_sudo "build"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "build"
        else
            run_with_timing "Building $2" docker compose -f $COMPOSE_FILE build $2
        fi
        ;;
    rebuild)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            run_with_timing "Rebuilding all Docker services (smart cache)" docker compose -f $COMPOSE_FILE build --pull
            run_with_timing "Starting all Docker services" docker compose -f $COMPOSE_FILE up -d
            run_codesandbox_with_sudo "rebuild"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "rebuild"
        else
            echo "🔨 Rebuilding $2 with smart caching..."
            run_with_timing "Stopping $2 container" docker compose -f $COMPOSE_FILE stop $2
            echo "🗑️  Removing $2 container..."
            docker compose -f $COMPOSE_FILE rm -f $2
            
            # For frontend, also clear nginx cache
            if [ "$2" = "frontend" ]; then
                echo "🧹 Clearing nginx cache for frontend..."
                docker exec agentic-design-nginx rm -rf /var/cache/nginx/static/* 2>/dev/null || true
            fi
            
            # Use smart caching with BuildKit - only rebuild what changed
            run_with_timing "Building $2 (smart cache)" docker compose -f $COMPOSE_FILE build --pull $2
            run_with_timing "Starting $2" docker compose -f $COMPOSE_FILE up -d $2
            
            # Restart nginx if frontend was rebuilt to ensure cache is cleared
            if [ "$2" = "frontend" ]; then
                run_with_timing "Restarting nginx to clear cache" docker compose -f $COMPOSE_FILE restart nginx
            fi
        fi
        ;;
    quick-rebuild)
        # Quick rebuild using maximum caching
        if [ -z "$2" ]; then
            echo "⚡ Usage: $0 quick-rebuild <service>"
            echo "Available services: frontend, backend, nginx, all"
            exit 1
        fi
        
        if [ "$2" = "all" ]; then
            echo "⚡ Quick rebuilding all services with maximum caching..."
            run_with_timing "Building all services (max cache)" docker compose -f $COMPOSE_FILE build
            run_with_timing "Recreating containers" docker compose -f $COMPOSE_FILE up -d --force-recreate
        else
            echo "⚡ Quick rebuilding $2 with maximum caching..."
            run_with_timing "Building $2 (max cache)" docker compose -f $COMPOSE_FILE build $2
            run_with_timing "Recreating $2 container" docker compose -f $COMPOSE_FILE up -d --force-recreate $2
        fi
        ;;
    force-rebuild)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "🔨 Force rebuilding all services..."
            run_with_timing "Stopping all services" docker compose -f $COMPOSE_FILE down
            run_with_timing "Removing all containers, images, and volumes" docker compose -f $COMPOSE_FILE down --rmi all --volumes --remove-orphans
            run_with_timing "Building all services (no cache)" docker compose -f $COMPOSE_FILE build --no-cache
            run_with_timing "Starting all services" docker compose -f $COMPOSE_FILE up -d
            run_codesandbox_with_sudo "rebuild"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "rebuild"
        else
            echo "🔨 Force rebuilding $2 ..."
            run_with_timing "Stopping $2 container" docker compose -f $COMPOSE_FILE stop $2
            echo "🗑️  Removing $2 container, image, and volumes..."
            docker compose -f $COMPOSE_FILE rm -f $2
            # Get the actual image name from compose config
            IMAGE_NAME=$(docker compose -f $COMPOSE_FILE config --format json | jq -r ".services.$2.image // \"backend-$2\"")
            docker rmi $IMAGE_NAME 2>/dev/null || true
            # Remove any dangling volumes
            docker volume prune -f
            run_with_timing "Building $2 (no cache)" docker compose -f $COMPOSE_FILE build --no-cache $2
            run_with_timing "Starting $2" docker compose -f $COMPOSE_FILE up -d $2
        fi
        ;;
    logs)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "📋 Showing logs for all services..."
            docker compose -f $COMPOSE_FILE logs -f
        elif [ "$2" = "codesandbox" ]; then
            echo "📋 Showing logs for CodeSandbox service..."
            SCRIPT_DIR="$(dirname "$0")"
            LOG_FILE="$SCRIPT_DIR/codesandbox.log"
            if [ -f "$LOG_FILE" ]; then
                tail -f "$LOG_FILE"
            else
                echo "⚠️  No log file found. CodeSandbox service may not have been started yet."
            fi
        else
            echo "📋 Showing logs for $2..."
            docker compose -f $COMPOSE_FILE logs -f $2
        fi
        ;;
    restart)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            run_with_timing "Restarting all services" docker compose -f $COMPOSE_FILE restart
        elif [ "$2" = "codesandbox" ]; then
            echo "🔄 Restarting CodeSandbox service..."
            SCRIPT_DIR="$(dirname "$0")"
            PID_FILE="$SCRIPT_DIR/codesandbox.pid"
            # Stop first
            if [ -f "$PID_FILE" ]; then
                PID=$(cat "$PID_FILE")
                if kill -0 $PID 2>/dev/null; then
                    kill $PID
                    echo "✅ CodeSandbox service stopped (PID: $PID)"
                fi
                rm "$PID_FILE"
            fi
            # Start again with sudo
            run_codesandbox_with_sudo "start"
        else
            run_with_timing "Restarting $2" docker compose -f $COMPOSE_FILE restart $2
        fi
        ;;
    status)
        echo "📊 Container status:"
        docker compose -f $COMPOSE_FILE ps
        ;;
    clean)
        run_with_timing "Cleaning Docker system" docker system prune -a -f --volumes && docker builder prune -af
        ;;
    shell)
        if [ -z "$2" ]; then
            echo "❌ Please specify a service: frontend or backend"
            echo "Usage: ./manage.sh shell [frontend|backend]"
            exit 1
        fi
        
        case "$2" in
            frontend)
                echo "🔧 Entering shell in frontend container..."
                docker compose -f $COMPOSE_FILE exec frontend /bin/sh
                ;;
            backend)
                echo "🔧 Entering shell in backend container..."
                docker compose -f $COMPOSE_FILE exec backend /bin/sh
                ;;
            *)
                echo "❌ Invalid service: $2"
                echo "Available services for shell: frontend, backend"
                exit 1
                ;;
        esac
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

# Display overall execution time for the command
OVERALL_END_TIME=$(date +%s)
OVERALL_ELAPSED=$((OVERALL_END_TIME - OVERALL_START_TIME))

# Only show overall time if command took more than 1 second and wasn't help/status
if [ $OVERALL_ELAPSED -gt 1 ] && [ "$1" != "help" ] && [ "$1" != "--help" ] && [ "$1" != "-h" ] && [ "$1" != "status" ] && [ "$1" != "logs" ]; then
    echo ""
    echo "⏱️  Total execution time: $(display_time $OVERALL_ELAPSED)"
fi