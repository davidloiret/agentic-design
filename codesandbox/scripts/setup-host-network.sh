#!/usr/bin/env bash
set -euo pipefail

# Default config
BRIDGE_DEFAULT="fcbridge"
USER_DEFAULT="dlo"
GROUP_DEFAULT="dlo"

log() { printf '[%s] %s\n' "$(date +'%F %T')" "$*" >&2; }
die() { log "ERROR: $*"; exit 1; }

need_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing command: $1"; }

as_root() {
  if [[ $EUID -eq 0 ]]; then
    "$@"
  else
    sudo -A "$@"
  fi
}

ensure_tun() {
  [[ -e /dev/net/tun ]] || as_root mkdir -p /dev/net && as_root mknod /dev/net/tun c 10 200 || true
  if ! lsmod 2>/dev/null | grep -q '^tun'; then
    as_root modprobe tun || true
  fi
}

ensure_bridge() {
  local br="${1:-$BRIDGE_DEFAULT}"
  need_cmd ip
  if ! ip link show "$br" >/dev/null 2>&1; then
    log "Creating bridge $br"
    as_root ip link add name "$br" type bridge
  fi
  # Turn on STP and bring it up
  as_root ip link set "$br" type bridge stp_state 1 || true
  as_root ip link set "$br" up
  log "Bridge $br is up"
}

tap_exists() {
  local name="$1"
  ip link show "$name" >/dev/null 2>&1
}

delete_tap() {
  local name="$1"
  as_root ip link set "$name" down >/dev/null 2>&1 || true
  # Try both delete paths to be thorough
  as_root ip link delete "$name" >/dev/null 2>&1 || \
  as_root ip tuntap del dev "$name" mode tap >/dev/null 2>&1 || true
}

unique_name() {
  local prefix="${1:-fc-tap}"
  printf "%s-%d-%d-%04d" "$prefix" "$$" "$(date +%s%N)" "$((RANDOM%10000))"
}

create_tap_once() {
  local name="$1" user="$2" group="$3" bridge="$4"

  # Create
  as_root ip tuntap add dev "$name" mode tap user "$user" group "$group"

  # Attach to bridge and bring up
  as_root ip link set "$name" master "$bridge"
  as_root ip link set "$name" up
  as_root ip link set "$name" promisc on || true
}

create_tap_safe() {
  local name="$1" user="$2" group="$3" bridge="$4" fallback="${5:-0}"

  # If exists, delete first
  if tap_exists "$name"; then
    log "TAP $name exists; deleting"
    delete_tap "$name"
    sleep 0.2
  fi

  set +e
  create_tap_once "$name" "$user" "$group" "$bridge"
  local rc=$?
  set -e
  if [[ $rc -ne 0 ]]; then
    # Check if 'busy' and retry once
    log "Create TAP $name failed (rc=$rc). Retrying after cleanup…"
    delete_tap "$name"
    sleep 0.25
    set +e
    create_tap_once "$name" "$user" "$group" "$bridge"
    rc=$?
    set -e
  fi

  if [[ $rc -ne 0 && "$fallback" == "1" ]]; then
    # Fall back to a unique name
    local u
    u="$(unique_name "${name%-*}")"
    log "Still busy; falling back to unique name: $u"
    delete_tap "$u" || true
    sleep 0.15
    create_tap_once "$u" "$user" "$group" "$bridge"
    echo "$u"
    return 0
  fi

  if [[ $rc -ne 0 ]]; then
    die "Failed to create TAP $name (even after retry)."
  fi

  echo "$name"
}

usage() {
  cat <<EOF
Usage:
  $(basename "$0") bridge-setup [BRIDGE]
  $(basename "$0") create-tap NAME [BRIDGE] [USER] [GROUP]
  $(basename "$0") create-tap-unique PREFIX [BRIDGE] [USER] [GROUP]
  $(basename "$0") delete-tap NAME

Notes:
  - Uses sudo if not run as root (honors SUDO_ASKPASS).
  - Idempotent; safely deletes stale devices and retries on "Device or resource busy".
EOF
}

main() {
  [[ $# -ge 1 ]] || { usage; exit 1; }
  need_cmd ip
  ensure_tun

  case "$1" in
    bridge-setup)
      ensure_bridge "${2:-$BRIDGE_DEFAULT}"
      ;;
    create-tap)
      [[ $# -ge 2 ]] || die "Missing NAME"
      name="$2"
      bridge="${3:-$BRIDGE_DEFAULT}"
      user="${4:-$USER_DEFAULT}"
      group="${5:-$GROUP_DEFAULT}"
      ensure_bridge "$bridge"
      create_tap_safe "$name" "$user" "$group" "$bridge" "0" >/dev/stdout
      ;;
    create-tap-unique)
      # Attempts NAME from PREFIX-0, falls back to unique if busy; prints final name
      [[ $# -ge 2 ]] || die "Missing PREFIX"
      prefix="$2"
      bridge="${3:-$BRIDGE_DEFAULT}"
      user="${4:-$USER_DEFAULT}"
      group="${5:-$GROUP_DEFAULT}"
      ensure_bridge "$bridge"
      # prefer a predictable initial name like <prefix>-0
      initial="${prefix}-0"
      create_tap_safe "$initial" "$user" "$group" "$bridge" "1" >/dev/stdout
      ;;
    delete-tap)
      [[ $# -ge 2 ]] || die "Missing NAME"
      delete_tap "$2"
      ;;
    *)
      usage; exit 1;;
  esac
}

main "$@"
