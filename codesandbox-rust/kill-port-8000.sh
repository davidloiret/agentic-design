#!/bin/bash

# Kill any processes running on port 8000
# This matches the Go version functionality

PORT=8000

echo "🔍 Checking for processes on port $PORT..."

# Find processes using the port
PIDS=$(lsof -ti:$PORT 2>/dev/null || true)

if [ -z "$PIDS" ]; then
    echo "✅ No processes found on port $PORT"
    exit 0
fi

echo "Found processes on port $PORT:"
for PID in $PIDS; do
    if ps -p $PID > /dev/null 2>&1; then
        PROCESS_INFO=$(ps -p $PID -o pid,ppid,cmd --no-headers 2>/dev/null || echo "$PID unknown unknown")
        echo "  PID: $PROCESS_INFO"
    fi
done

echo ""
echo "🛑 Terminating processes..."

# First try graceful termination
for PID in $PIDS; do
    if ps -p $PID > /dev/null 2>&1; then
        echo "Sending TERM signal to PID $PID..."
        kill -TERM $PID 2>/dev/null || true
    fi
done

# Give processes time to terminate gracefully
sleep 2

# Force kill any remaining processes
REMAINING_PIDS=$(lsof -ti:$PORT 2>/dev/null || true)
if [ -n "$REMAINING_PIDS" ]; then
    echo "🔨 Force killing remaining processes..."
    for PID in $REMAINING_PIDS; do
        if ps -p $PID > /dev/null 2>&1; then
            echo "Sending KILL signal to PID $PID..."
            kill -KILL $PID 2>/dev/null || true
        fi
    done
fi

# Final check
sleep 1
FINAL_CHECK=$(lsof -ti:$PORT 2>/dev/null || true)
if [ -z "$FINAL_CHECK" ]; then
    echo "✅ Port $PORT is now free"
else
    echo "⚠️  Some processes may still be running on port $PORT"
    exit 1
fi