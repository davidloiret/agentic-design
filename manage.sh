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

# Pull the latest code for the main repo (the frontend lives at the repo root,
# one level up from this script's working dir of backend/). Guarantees a rebuild
# truly picks up new commits:
#   - --autostash so the pull works even with local uncommitted changes
#     (e.g. nginx.conf tweaks) instead of silently failing on a dirty tree.
#   - returns non-zero on any pull failure so callers abort instead of
#     building/deploying stale code.
#   - reports whether new commits actually arrived.
pull_latest() {
    local label="${1:-code}"
    local before after
    before=$(git -C .. rev-parse HEAD 2>/dev/null)
    if ! run_with_timing "Pulling latest $label" git -C .. pull --rebase --autostash; then
        echo "❌ git pull failed — aborting to avoid building stale code."
        echo "   Resolve the git state in the repo root, then re-run."
        return 1
    fi
    after=$(git -C .. rev-parse HEAD 2>/dev/null)
    if [ "$before" = "$after" ]; then
        echo "ℹ️  Already up to date ($(git -C .. rev-parse --short HEAD)) — no new commits to build."
    else
        echo "✅ Updated $(git -C .. rev-parse --short "$before") → $(git -C .. rev-parse --short "$after"):"
        git -C .. --no-pager log --oneline "$before".."$after"
    fi
    return 0
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
    echo "  setup [service]    - Setup and configure service"
    echo "  status             - Show running containers"
    echo "  clean              - Clean Docker system"
    echo "  shell [service]    - Enter shell in service container"
    echo ""
    echo "Services:"
    echo "  frontend       - Next.js frontend (port 3002)"
    echo "  backend        - Node.js backend (port 3001)"
    echo "  nginx          - Nginx reverse proxy (ports 80/443)"
    echo "  reasoninglayer - ReasoningLayer.ai dashboard (port 3003)"
    echo "  kortexya       - Kortexya.com website (port 3004)"
    echo "  codesandbox    - CodeSandbox environment (requires sudo for Firecracker/KVM)"
    echo "  plausible      - Plausible Analytics (port 8000)"
    echo "  all            - All services (default if no service specified)"
    echo ""
    echo "Examples:"
    echo "  ./manage.sh up frontend              # Start only frontend"
    echo "  ./manage.sh rebuild backend          # Rebuild only backend"
    echo "  ./manage.sh logs frontend            # Show frontend logs"
    echo "  ./manage.sh up                       # Start all services"
    echo "  ./manage.sh rebuild codesandbox      # Build and start CodeSandbox service"
    echo "  ./manage.sh start codesandbox        # Start CodeSandbox service"
    echo "  ./manage.sh stop codesandbox         # Stop CodeSandbox service"
    echo "  ./manage.sh up plausible             # Start Plausible Analytics"
    echo "  ./manage.sh setup plausible          # Setup and configure Plausible"
    echo "  ./manage.sh up reasoninglayer        # Start ReasoningLayer dashboard"
    echo "  ./manage.sh rebuild reasoninglayer   # Rebuild ReasoningLayer (pulls latest code)"
    echo "  ./manage.sh up kortexya              # Start Kortexya website"
    echo "  ./manage.sh rebuild kortexya         # Rebuild Kortexya (pulls latest code)"
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

            # For reasoninglayer, sync the repo first
            if [ "$2" = "reasoninglayer" ]; then
                echo "🔄 Syncing ReasoningLayer repository..."
                ORIGINAL_DIR=$(pwd)
                cd ../reasoninglayer
                run_with_timing "Syncing repository" ./sync-repo.sh
                cd "$ORIGINAL_DIR"
            fi

            # For kortexya, sync the repo first
            if [ "$2" = "kortexya" ]; then
                echo "🔄 Syncing Kortexya repository..."
                ORIGINAL_DIR=$(pwd)
                cd ../kortexya
                run_with_timing "Syncing repository" ./sync-repo.sh
                cd "$ORIGINAL_DIR"
            fi

            # For frontend, pull the latest code from git first
            if [ "$2" = "frontend" ]; then
                pull_latest "frontend code" || exit 1
            fi

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
            echo "Available services: frontend, backend, nginx, reasoninglayer, all"
            exit 1
        fi

        if [ "$2" = "all" ]; then
            echo "⚡ Quick rebuilding all services with maximum caching..."
            run_with_timing "Building all services (max cache)" docker compose -f $COMPOSE_FILE build
            run_with_timing "Recreating containers" docker compose -f $COMPOSE_FILE up -d --force-recreate
        else
            # For reasoninglayer, sync the repo first
            if [ "$2" = "reasoninglayer" ]; then
                echo "🔄 Syncing ReasoningLayer repository..."
                ORIGINAL_DIR=$(pwd)
                cd ../reasoninglayer
                run_with_timing "Syncing repository" ./sync-repo.sh
                cd "$ORIGINAL_DIR"
            fi

            # For kortexya, sync the repo first
            if [ "$2" = "kortexya" ]; then
                echo "🔄 Syncing Kortexya repository..."
                ORIGINAL_DIR=$(pwd)
                cd ../kortexya
                run_with_timing "Syncing repository" ./sync-repo.sh
                cd "$ORIGINAL_DIR"
            fi

            # For frontend, pull the latest code from git first so we never
            # rebuild stale source (Docker would otherwise cache an old tree).
            if [ "$2" = "frontend" ]; then
                pull_latest "frontend code" || exit 1
            fi

            echo "⚡ Quick rebuilding $2 with maximum caching..."
            run_with_timing "Building $2 (max cache)" docker compose -f $COMPOSE_FILE build $2
            run_with_timing "Recreating $2 container" docker compose -f $COMPOSE_FILE up -d --force-recreate $2

            # If backend was rebuilt, wait for it to be healthy then restart nginx
            if [ "$2" = "backend" ]; then
                echo "⏳ Waiting for backend to be healthy..."
                # Wait up to 60 seconds for backend to be ready
                for i in {1..60}; do
                    if docker compose -f $COMPOSE_FILE exec -T backend curl -f http://localhost:3001/api/v1/health >/dev/null 2>&1; then
                        echo "✅ Backend is healthy!"
                        echo "🔄 Restarting nginx to re-establish backend connection..."
                        run_with_timing "Restarting nginx" docker compose -f $COMPOSE_FILE restart nginx
                        break
                    fi
                    if [ $i -eq 60 ]; then
                        echo "⚠️  Backend health check timeout after 60 seconds"
                        echo "⚠️  Restarting nginx anyway..."
                        run_with_timing "Restarting nginx" docker compose -f $COMPOSE_FILE restart nginx
                    else
                        echo "   Waiting for backend health check... ($i/60)"
                        sleep 1
                    fi
                done
            fi

            # Recreating a container gives it a new Docker IP. nginx resolves
            # upstream hostnames once at startup, so without a reload it keeps
            # proxying to the dead old IP -> 502 Bad Gateway. Reload (graceful,
            # zero-downtime) so nginx re-resolves the new IP.
            if [ "$2" = "frontend" ] || [ "$2" = "reasoninglayer" ] || [ "$2" = "kortexya" ]; then
                echo "🔄 Reloading nginx to pick up new $2 container IP..."
                run_with_timing "Reloading nginx" docker exec agentic-design-nginx nginx -s reload
            fi
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
            reasoninglayer)
                echo "🔧 Entering shell in reasoninglayer container..."
                docker compose -f $COMPOSE_FILE exec reasoninglayer /bin/sh
                ;;
            kortexya)
                echo "🔧 Entering shell in kortexya container..."
                docker compose -f $COMPOSE_FILE exec kortexya /bin/sh
                ;;
            *)
                echo "❌ Invalid service: $2"
                echo "Available services for shell: frontend, backend, reasoninglayer, kortexya"
                exit 1
                ;;
        esac
        ;;
    setup)
        case "$2" in
            plausible)
                echo "🚀 Setting up Plausible Analytics..."

                # Start databases first
                run_with_timing "Starting Plausible databases" docker compose -f $COMPOSE_FILE up -d plausible_db plausible_events_db

                # Wait for databases
                echo "⏳ Waiting for databases to be ready..."
                sleep 15

                # Start Plausible
                run_with_timing "Starting Plausible Analytics" docker compose -f $COMPOSE_FILE up -d plausible

                # Wait for Plausible to be ready
                echo "⏳ Waiting for Plausible to initialize..."
                sleep 20

                # Check if accessible
                echo "🔍 Checking Plausible status..."
                for i in {1..30}; do
                    if curl -f http://localhost:8000 >/dev/null 2>&1; then
                        echo "✅ Plausible is ready!"
                        break
                    fi
                    echo "⏳ Waiting for Plausible... ($i/30)"
                    sleep 2
                done

                echo ""
                echo "✅ Plausible Analytics setup complete!"
                echo "📊 Access your analytics at: https://plausible.agentic-design.ai"
                echo "🔑 Login credentials:"
                echo "   Email: admin@agentic-design.ai"
                echo "   Password: rvTvcxJGuDU722"
                echo ""
                echo "⚠️  Important Steps:"
                echo "   1. Change your password after first login"
                echo "   2. Add 'agentic-design.ai' domain in Plausible dashboard"
                echo "   3. Copy the tracking script if needed"
                echo ""
                echo "🔗 Your frontend is already configured to use this instance"
                echo "🛡️  Don't forget to generate SSL certificates with: ./init-letsencrypt.sh"
                ;;
            reasoninglayer)
                echo "🚀 Setting up ReasoningLayer.ai Dashboard..."

                # Build the container (this clones the repo and builds)
                run_with_timing "Building ReasoningLayer container" docker compose -f $COMPOSE_FILE build reasoninglayer

                # Start the service
                run_with_timing "Starting ReasoningLayer service" docker compose -f $COMPOSE_FILE up -d reasoninglayer

                # Wait for it to be ready
                echo "⏳ Waiting for ReasoningLayer to be ready..."
                for i in {1..30}; do
                    if curl -f http://localhost:3003/health >/dev/null 2>&1; then
                        echo "✅ ReasoningLayer is ready!"
                        break
                    fi
                    echo "⏳ Waiting for ReasoningLayer... ($i/30)"
                    sleep 2
                done

                echo ""
                echo "✅ ReasoningLayer.ai setup complete!"
                echo "📊 Access the dashboard at: https://reasoninglayer.ai"
                echo ""
                echo "⚠️  Important Steps:"
                echo "   1. Ensure DNS is configured for reasoninglayer.ai and www.reasoninglayer.ai"
                echo "   2. Generate SSL certificates: ./init-letsencrypt.sh"
                echo "   3. Restart nginx after SSL setup: ./manage.sh restart nginx"
                echo ""
                echo "🔄 To update with latest code: ./manage.sh force-rebuild reasoninglayer"
                ;;
            kortexya)
                echo "🚀 Setting up Kortexya.com Website..."

                # Build the container (this clones the repo and builds)
                run_with_timing "Building Kortexya container" docker compose -f $COMPOSE_FILE build kortexya

                # Start the service
                run_with_timing "Starting Kortexya service" docker compose -f $COMPOSE_FILE up -d kortexya

                # Wait for it to be ready
                echo "⏳ Waiting for Kortexya to be ready..."
                for i in {1..30}; do
                    if curl -f http://localhost:3004/ >/dev/null 2>&1; then
                        echo "✅ Kortexya is ready!"
                        break
                    fi
                    echo "⏳ Waiting for Kortexya... ($i/30)"
                    sleep 2
                done

                echo ""
                echo "✅ Kortexya.com setup complete!"
                echo "📊 Access the website at: https://kortexya.com"
                echo ""
                echo "⚠️  Important Steps:"
                echo "   1. Ensure DNS is configured for kortexya.com and www.kortexya.com"
                echo "   2. Generate SSL certificates: ./init-letsencrypt.sh"
                echo "   3. Restart nginx after SSL setup: ./manage.sh restart nginx"
                echo ""
                echo "🔄 To update with latest code: ./manage.sh rebuild kortexya"
                ;;
            *)
                echo "❌ Setup not available for service: $2"
                echo "Available setup commands: plausible, reasoninglayer, kortexya"
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