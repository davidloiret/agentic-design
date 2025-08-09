#!/bin/bash

# Navigate to backend directory where docker-compose files are located
cd "$(dirname "$0")/backend"

COMPOSE_FILE="docker-compose.prod.yml"

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
            echo "🏗️  Building CodeSandbox environment with sudo..."
            cd "$(dirname "$0")/../codesandbox"
            sudo make all
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
            echo "🏗️  Rebuilding CodeSandbox environment with sudo..."
            cd "$(dirname "$0")/../codesandbox"
            sudo make all
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
    echo "  logs [service]     - Show logs for service(s)"
    echo "  restart [service]  - Restart service(s)"
    echo "  status             - Show running containers"
    echo "  clean              - Clean Docker system"
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
}

case "$1" in
    up|start)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "🚀 Starting all services..."
            docker compose -f $COMPOSE_FILE up -d
            run_codesandbox_with_sudo "start"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "start"
        else
            echo "🚀 Starting $2..."
            docker compose -f $COMPOSE_FILE up -d $2
        fi
        ;;
    down|stop)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "📦 Stopping all services..."
            docker compose -f $COMPOSE_FILE down
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
            echo "📦 Stopping $2..."
            docker compose -f $COMPOSE_FILE stop $2
        fi
        ;;
    build)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "🔨 Building all services..."
            docker compose -f $COMPOSE_FILE build
            run_codesandbox_with_sudo "build"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "build"
        else
            echo "🔨 Building $2..."
            docker compose -f $COMPOSE_FILE build $2
        fi
        ;;
    rebuild)
        if [ -z "$2" ] || [ "$2" = "all" ]; then
            echo "🔨 Rebuilding all services..."
            docker compose -f $COMPOSE_FILE build --no-cache
            docker compose -f $COMPOSE_FILE up -d
            run_codesandbox_with_sudo "rebuild"
        elif [ "$2" = "codesandbox" ]; then
            run_codesandbox_with_sudo "rebuild"
        else
            echo "🔨 Rebuilding $2 ..."
            docker compose -f $COMPOSE_FILE build --no-cache $2
            docker compose -f $COMPOSE_FILE up -d $2
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
            echo "🔄 Restarting all services..."
            docker compose -f $COMPOSE_FILE restart
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
            echo "🔄 Restarting $2..."
            docker compose -f $COMPOSE_FILE restart $2
        fi
        ;;
    status)
        echo "📊 Container status:"
        docker compose -f $COMPOSE_FILE ps
        ;;
    clean)
        echo "🧹 Cleaning Docker system..."
        docker system prune -f
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