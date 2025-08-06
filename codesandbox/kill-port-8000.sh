#!/bin/bash

# Kill processes using port 8000

echo "Stopping processes on port 8000..."

# Find and kill processes using port 8000
PIDS=$(ss -tlnp | grep :8000 | grep -o 'pid=[0-9]*' | cut -d= -f2)

if [ -n "$PIDS" ]; then
    echo "Found processes: $PIDS"
    for PID in $PIDS; do
        echo "Killing process $PID"
        kill -TERM $PID 2>/dev/null || kill -9 $PID 2>/dev/null
    done
    sleep 1
    echo "Port 8000 cleanup completed"
else
    echo "No processes found on port 8000"
fi