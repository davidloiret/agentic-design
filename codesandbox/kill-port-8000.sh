#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

echo "Stopping processes on port $PORT..."

maybe_sudo() {
  if [ "${EUID:-$(id -u)}" -ne 0 ] && command -v sudo >/dev/null 2>&1; then
    sudo "$@"
  else
    "$@"
  fi
}

get_pids() {
  local pids=""

  # 1) Try lsof (macOS & Linux)
  if command -v lsof >/dev/null 2>&1; then
    pids=$(maybe_sudo lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
    if [ -z "$pids" ]; then
      pids=$(maybe_sudo lsof -tiTCP:"$PORT" 2>/dev/null || true)
    fi
  fi

  # 2) fuser (Linux)
  if [ -z "$pids" ] && command -v fuser >/dev/null 2>&1; then
    pids=$(maybe_sudo fuser -n tcp "$PORT" 2>/dev/null || true)
  fi

  # 3) ss (Linux; needs root to show PIDs)
  if [ -z "$pids" ] && command -v ss >/dev/null 2>&1; then
    pids=$(maybe_sudo ss -H -tanp 2>/dev/null \
      | awk -v p=":$PORT" '$4 ~ p {print}' \
      | sed -n 's/.*pid=\([0-9]\+\).*/\1/p' \
      | sort -u || true)
  fi

  echo "$pids"
}

PIDS="$(get_pids)"

if [ -n "$PIDS" ]; then
  echo "Found processes: $PIDS"

  # Graceful shutdown first
  echo "$PIDS" | tr ' ' '\n' | while read -r pid; do
    [ -n "$pid" ] && kill -TERM "$pid" 2>/dev/null || true
  done
  sleep 1

  # Force kill any survivors
  for PID in $PIDS; do
    if kill -0 "$PID" 2>/dev/null; then
      echo "Force killing $PID"
      kill -KILL "$PID" 2>/dev/null || true
    fi
  done

  echo "Port $PORT cleanup completed."
else
  echo "No processes found on port $PORT"
fi
