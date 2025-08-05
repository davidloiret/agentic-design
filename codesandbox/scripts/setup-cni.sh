#!/bin/bash
set -e

# Setup CNI (Container Network Interface) for Firecracker

if [ "$EUID" -ne 0 ]; then 
    echo "Error: This script must be run as root"
    exit 1
fi

CNI_VERSION="v1.1.1"
CNI_DIR="/opt/cni"
CNI_BIN_DIR="$CNI_DIR/bin"
CNI_CONF_DIR="/etc/cni/conf.d"

echo "Setting up CNI for Firecracker..."

# Create directories
mkdir -p $CNI_BIN_DIR
mkdir -p $CNI_CONF_DIR

# Download CNI plugins
echo "Downloading CNI plugins..."
cd /tmp
wget "https://github.com/containernetworking/plugins/releases/download/${CNI_VERSION}/cni-plugins-linux-amd64-${CNI_VERSION}.tgz"
tar -xzf "cni-plugins-linux-amd64-${CNI_VERSION}.tgz" -C $CNI_BIN_DIR
rm -f "cni-plugins-linux-amd64-${CNI_VERSION}.tgz"

# Create CNI configuration for Firecracker
echo "Creating CNI network configuration..."
cat > $CNI_CONF_DIR/fcnet.conflist <<EOF
{
  "cniVersion": "0.4.0",
  "name": "fcnet",
  "plugins": [
    {
      "type": "bridge",
      "bridge": "fcbridge",
      "isGateway": true,
      "ipMasq": true,
      "promiscMode": true,
      "ipam": {
        "type": "host-local",
        "subnet": "172.16.0.0/24",
        "resolvConf": "/etc/resolv.conf",
        "routes": [
          {
            "dst": "0.0.0.0/0"
          }
        ]
      }
    },
    {
      "type": "firewall"
    },
    {
      "type": "tc-redirect-tap"
    }
  ]
}
EOF

# Create the tc-redirect-tap plugin (required for Firecracker)
echo "Creating tc-redirect-tap plugin..."
cat > $CNI_BIN_DIR/tc-redirect-tap <<'EOF'
#!/bin/bash

set -e

# tc-redirect-tap CNI plugin for Firecracker
# This plugin sets up traffic redirection between TAP and veth devices

# Read stdin
stdin=$(cat)

# Extract required fields
CNI_CONTAINERID=$(echo "$stdin" | jq -r '.CNI_CONTAINERID // empty')
CNI_IFNAME=$(echo "$stdin" | jq -r '.CNI_IFNAME // empty')
CNI_NETNS=$(echo "$stdin" | jq -r '.CNI_NETNS // empty')
CNI_PATH=$(echo "$stdin" | jq -r '.CNI_PATH // empty')
CNI_ARGS=$(echo "$stdin" | jq -r '.CNI_ARGS // empty')
CNI_COMMAND=$1

prevResult=$(echo "$stdin" | jq -c '.')

case "$CNI_COMMAND" in
    ADD)
        # Extract TAP device name from CNI_ARGS
        TAP_NAME=$(echo "$CNI_ARGS" | sed 's/.*TAP_NAME=\([^;]*\).*/\1/')
        
        if [ -z "$TAP_NAME" ]; then
            echo '{"cniVersion":"0.4.0","code":7,"msg":"TAP_NAME not provided in CNI_ARGS"}' >&2
            exit 1
        fi
        
        # Set up traffic redirection
        tc qdisc add dev "$TAP_NAME" root handle 1: prio
        tc filter add dev "$TAP_NAME" parent 1: protocol all u32 match u32 0 0 flowid 1:1 action mirred egress redirect dev "$CNI_IFNAME"
        
        tc qdisc add dev "$CNI_IFNAME" root handle 1: prio
        tc filter add dev "$CNI_IFNAME" parent 1: protocol all u32 match u32 0 0 flowid 1:1 action mirred egress redirect dev "$TAP_NAME"
        
        # Return the previous result
        echo "$prevResult"
        ;;
        
    DEL)
        # Cleanup is handled by bridge plugin when interface is deleted
        echo "$prevResult"
        ;;
        
    CHECK)
        echo "$prevResult"
        ;;
        
    VERSION)
        echo '{"cniVersion":"0.4.0","supportedVersions":["0.3.0","0.3.1","0.4.0"]}'
        ;;
        
    *)
        echo '{"cniVersion":"0.4.0","code":3,"msg":"Unknown CNI_COMMAND"}' >&2
        exit 1
        ;;
esac
EOF
chmod +x $CNI_BIN_DIR/tc-redirect-tap

# Set up PATH for CNI
echo "export CNI_PATH=$CNI_BIN_DIR" >> /etc/profile.d/cni.sh
export CNI_PATH=$CNI_BIN_DIR

# Verify CNI plugins
echo ""
echo "✅ CNI setup completed!"
echo ""
echo "CNI Configuration:"
echo "  CNI_PATH: $CNI_BIN_DIR"
echo "  Config dir: $CNI_CONF_DIR"
echo "  Network: fcnet (172.16.0.0/24)"
echo ""
echo "Available CNI plugins:"
ls -la $CNI_BIN_DIR | grep -E "(bridge|host-local|firewall|tc-redirect-tap)"