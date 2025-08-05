#!/bin/bash

# Production monitoring script for Code Sandbox

API_URL="http://localhost:8000"
LOG_FILE="/var/log/codesandbox/monitor.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

check_service() {
    if systemctl is-active --quiet codesandbox; then
        echo -e "${GREEN}✓${NC} Service is running"
    else
        echo -e "${RED}✗${NC} Service is not running"
        return 1
    fi
}

check_api_health() {
    if curl -s "${API_URL}/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} API is healthy"
    else
        echo -e "${RED}✗${NC} API is not responding"
        return 1
    fi
}

check_firecracker() {
    FC_PROCS=$(pgrep -c firecracker)
    if [ "$FC_PROCS" -gt 0 ]; then
        echo -e "${GREEN}✓${NC} Firecracker VMs running: $FC_PROCS"
    else
        echo -e "${YELLOW}!${NC} No Firecracker VMs running"
    fi
}

check_network() {
    if ip link show fcbridge &> /dev/null; then
        echo -e "${GREEN}✓${NC} Network bridge is up"
        # Count TAP devices
        TAP_COUNT=$(ip link show | grep -c "master fcbridge")
        echo "  TAP devices: $TAP_COUNT"
    else
        echo -e "${RED}✗${NC} Network bridge is down"
        return 1
    fi
}

check_resources() {
    # CPU usage
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
    echo "CPU Usage: ${CPU_USAGE}%"
    
    # Memory usage
    MEM_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
    printf "Memory Usage: %.1f%%\n" $MEM_USAGE
    
    # Disk usage for rootfs
    if [ -d "/opt/codesandbox" ]; then
        DISK_USAGE=$(df -h /opt/codesandbox | tail -1 | awk '{print $5}')
        echo "Disk Usage (/opt/codesandbox): $DISK_USAGE"
    fi
}

test_execution() {
    echo -e "\nTesting code execution..."
    
    # Test Python
    RESULT=$(curl -s -X POST "${API_URL}/execute" \
        -H "Content-Type: application/json" \
        -d '{"language": "python", "code": "print(\"test\")", "timeout": 5}' 2>/dev/null)
    
    if echo "$RESULT" | grep -q '"success":true'; then
        echo -e "${GREEN}✓${NC} Python execution working"
    else
        echo -e "${RED}✗${NC} Python execution failed"
        echo "  Response: $RESULT"
    fi
}

show_metrics() {
    echo -e "\n=== Performance Metrics ==="
    
    # Get execution statistics from API (if implemented)
    STATS=$(curl -s "${API_URL}/stats" 2>/dev/null || echo "{}")
    
    # Connection count
    CONN_COUNT=$(ss -tan | grep :8000 | grep ESTAB | wc -l)
    echo "Active connections: $CONN_COUNT"
    
    # Recent errors
    if [ -f "/var/log/codesandbox/api-error.log" ]; then
        ERROR_COUNT=$(tail -n 1000 /var/log/codesandbox/api-error.log | grep -c ERROR)
        echo "Recent errors (last 1000 lines): $ERROR_COUNT"
    fi
}

# Main monitoring loop
clear
echo "=== Code Sandbox Production Monitor ==="
echo "Time: $(date)"
echo ""

echo "=== System Status ==="
check_service
check_api_health
check_firecracker
check_network

echo -e "\n=== Resource Usage ==="
check_resources

if [ "$1" == "--test" ]; then
    test_execution
fi

if [ "$1" == "--metrics" ]; then
    show_metrics
fi

# Continuous monitoring mode
if [ "$1" == "--watch" ]; then
    while true; do
        sleep 5
        clear
        $0
    done
fi