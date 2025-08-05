#!/bin/bash
# Wrapper script to run Firecracker with proper permissions
export SUDO_ASKPASS=/data/code/agentic-design/codesandbox/askpass.sh
exec sudo -A /usr/local/bin/firecracker "$@"