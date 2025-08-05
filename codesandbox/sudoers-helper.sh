#!/bin/bash
# Helper script to run commands with sudo using the provided password

export SUDO_ASKPASS=$(cat <<'EOF'
#!/bin/bash
echo "PxwUD3uP"
EOF
)

chmod +x "$SUDO_ASKPASS"
export SUDO_ASKPASS

# Execute the command passed as arguments
exec "$@"