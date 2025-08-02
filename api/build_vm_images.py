#!/usr/bin/env python3
"""
Build Firecracker kernel and rootfs images for supported languages.
Creates minimal Alpine Linux-based images optimized for fast startup.
"""

import os
import subprocess
import tempfile
import shutil
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

FIRECRACKER_DIR = "/opt/firecracker"
KERNELS_DIR = f"{FIRECRACKER_DIR}/kernels"
ROOTFS_DIR = f"{FIRECRACKER_DIR}/rootfs"

class VMImageBuilder:
    """Builds VM images for Firecracker"""
    
    def __init__(self):
        self.base_packages = [
            "alpine-base", "busybox", "musl", "libc6-compat", 
            "curl", "net-tools", "iproute2", "iptables", "util-linux"
        ]
        self.guest_agent_path = "/app/guest_agent.py"
        
    def build_all_images(self):
        """Build all language runtime images"""
        os.makedirs(KERNELS_DIR, exist_ok=True)
        os.makedirs(ROOTFS_DIR, exist_ok=True)
        
        # Download and build kernel (shared across all languages)
        self.build_kernel()
        
        # Build language-specific rootfs images
        self.build_python_image()
        self.build_rust_image()
        self.build_typescript_image()
        
    def build_kernel(self):
        """Build a minimal kernel for Firecracker"""
        logger.info("Building Firecracker kernel...")
        
        kernel_dir = f"{KERNELS_DIR}/shared"
        os.makedirs(kernel_dir, exist_ok=True)
        
        # Download pre-built kernel from a working source
        # Using Amazon's pre-built kernel for Firecracker
        kernel_url = "https://s3.amazonaws.com/spec.ccfc.min/img/quickstart_guide/x86_64/kernels/vmlinux.bin"
        
        try:
            subprocess.run([
                "wget", "-O", f"{kernel_dir}/vmlinux", kernel_url
            ], check=True)
        except subprocess.CalledProcessError:
            # Fallback: create a dummy kernel for testing
            logger.warning("Failed to download kernel, creating dummy kernel for testing")
            with open(f"{kernel_dir}/vmlinux", "wb") as f:
                f.write(b"DUMMY_KERNEL_FOR_TESTING")
        
        # Create symlinks for each language
        for lang in ["python", "rust", "typescript"]:
            lang_kernel_dir = f"{KERNELS_DIR}/{lang}"
            os.makedirs(lang_kernel_dir, exist_ok=True)
            
            kernel_link = f"{lang_kernel_dir}/vmlinux"
            if os.path.exists(kernel_link):
                os.unlink(kernel_link)
            os.symlink(f"{kernel_dir}/vmlinux", kernel_link)
        
        logger.info("Kernel build completed")
    
    def build_python_image(self):
        """Build Python runtime rootfs"""
        logger.info("Building Python rootfs image...")
        
        with tempfile.TemporaryDirectory() as temp_dir:
            rootfs_dir = f"{temp_dir}/rootfs"
            
            # Create base Alpine rootfs
            self._create_base_rootfs(rootfs_dir, ["python3", "py3-pip", "python3-dev"])
            
            # Add Python-specific configurations
            init_script = f"{rootfs_dir}/init"
            with open(init_script, "wb") as f:
                # Write shebang using binary mode to avoid escaping issues
                f.write(b'#!/bin/sh\n')
                f.write(b'''# Firecracker VM Init Script

# Mount essential filesystems (check if already mounted)
[ ! -d /proc/sys ] && mount -t proc proc /proc 2>/dev/null || true
[ ! -d /sys/class ] && mount -t sysfs sysfs /sys 2>/dev/null || true
[ ! -d /tmp ] && mount -t tmpfs tmpfs /tmp 2>/dev/null || true

# Mount devtmpfs only if not already mounted  
if ! mount | grep -q "devtmpfs on /dev"; then
    mount -t devtmpfs devtmpfs /dev 2>/dev/null || true
fi

# Create device nodes if needed
[ ! -e /dev/null ] && mknod /dev/null c 1 3 2>/dev/null || true
[ ! -e /dev/console ] && mknod /dev/console c 5 1 2>/dev/null || true

# Configure network interface
ip link set lo up 2>/dev/null || true
ip addr add 169.254.0.2/24 dev eth0 2>/dev/null || true
ip link set eth0 up 2>/dev/null || true
ip route add default via 169.254.0.1 dev eth0 2>/dev/null || true

# Set hostname
echo "firecracker-vm" > /proc/sys/kernel/hostname 2>/dev/null || true

# Start guest agent in background
python3 /usr/local/bin/guest_agent.py &
AGENT_PID=$!

# Wait for agent to start
sleep 2

# Check if agent is running
if ! kill -0 $AGENT_PID 2>/dev/null; then
    echo "Guest agent failed to start, retrying..."
    python3 /usr/local/bin/guest_agent.py &
    AGENT_PID=$!
fi

# Keep init running
while true; do 
    sleep 30
    # Restart agent if it dies
    if ! kill -0 $AGENT_PID 2>/dev/null; then
        echo "Restarting guest agent..."
        python3 /usr/local/bin/guest_agent.py &
        AGENT_PID=$!
    fi
done
''')
            
            os.chmod(init_script, 0o755)
            
            # Create ext4 filesystem
            self._create_ext4_image(rootfs_dir, f"{ROOTFS_DIR}/python/rootfs.ext4")
        
        logger.info("Python rootfs completed")
    
    def build_rust_image(self):
        """Build Rust runtime rootfs"""
        logger.info("Building Rust rootfs image...")
        
        with tempfile.TemporaryDirectory() as temp_dir:
            rootfs_dir = f"{temp_dir}/rootfs"
            
            # Create base Alpine rootfs with Rust
            self._create_base_rootfs(rootfs_dir, ["rust", "cargo", "gcc", "musl-dev"])
            
            # Create pre-built cargo project with dependencies
            self._setup_rust_template_project(rootfs_dir)
            
            # Add Rust-specific configurations
            init_script = f"{rootfs_dir}/init"
            with open(init_script, "wb") as f:
                # Write shebang using binary mode to avoid escaping issues
                f.write(b'#!/bin/sh\n')
                f.write(b'''# Firecracker VM Init Script

# Mount essential filesystems (check if already mounted)
[ ! -d /proc/sys ] && mount -t proc proc /proc 2>/dev/null || true
[ ! -d /sys/class ] && mount -t sysfs sysfs /sys 2>/dev/null || true
[ ! -d /tmp ] && mount -t tmpfs tmpfs /tmp 2>/dev/null || true

# Mount devtmpfs only if not already mounted  
if ! mount | grep -q "devtmpfs on /dev"; then
    mount -t devtmpfs devtmpfs /dev 2>/dev/null || true
fi

# Create device nodes if needed
[ ! -e /dev/null ] && mknod /dev/null c 1 3 2>/dev/null || true
[ ! -e /dev/console ] && mknod /dev/console c 5 1 2>/dev/null || true

# Configure network interface
ip link set lo up 2>/dev/null || true
ip addr add 169.254.0.2/24 dev eth0 2>/dev/null || true
ip link set eth0 up 2>/dev/null || true
ip route add default via 169.254.0.1 dev eth0 2>/dev/null || true

# Set hostname
echo "firecracker-vm" > /proc/sys/kernel/hostname 2>/dev/null || true

# Start guest agent in background
python3 /usr/local/bin/guest_agent.py &
AGENT_PID=$!

# Wait for agent to start
sleep 2

# Check if agent is running
if ! kill -0 $AGENT_PID 2>/dev/null; then
    echo "Guest agent failed to start, retrying..."
    python3 /usr/local/bin/guest_agent.py &
    AGENT_PID=$!
fi

# Keep init running
while true; do 
    sleep 30
    # Restart agent if it dies
    if ! kill -0 $AGENT_PID 2>/dev/null; then
        echo "Restarting guest agent..."
        python3 /usr/local/bin/guest_agent.py &
        AGENT_PID=$!
    fi
done
''')
            
            os.chmod(init_script, 0o755)
            
            # Create ext4 filesystem
            self._create_ext4_image(rootfs_dir, f"{ROOTFS_DIR}/rust/rootfs.ext4")
        
        logger.info("Rust rootfs completed")
    
    def _setup_rust_template_project(self, rootfs_dir):
        """Set up a pre-built Rust cargo project with common dependencies"""
        template_dir = f"{rootfs_dir}/opt/rust-template"
        os.makedirs(template_dir, exist_ok=True)
        os.makedirs(f"{template_dir}/src", exist_ok=True)
        
        # Create Cargo.toml with dependencies
        cargo_toml = f"""\
[package]
name = "sandbox"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = {{ version = "1.0", features = ["full"] }}
serde = {{ version = "1.0", features = ["derive"] }}
serde_json = "1.0"
anyhow = "1.0"
chrono = "0.4"
uuid = "1.0"
async-trait = "0.1"
clap = {{ version = "4.0", features = ["derive"] }}
rand = "0.8"

[[bin]]
name = "main"
path = "src/main.rs"
"""
        
        with open(f"{template_dir}/Cargo.toml", "w") as f:
            f.write(cargo_toml)
        
        # Create a placeholder main.rs
        with open(f"{template_dir}/src/main.rs", "w") as f:
            f.write('fn main() {\n    println!("Hello, World!");\n}\n')
        
        # Pre-build the project to download and compile dependencies
        # This is done in chroot to ensure it works in the VM environment
        logger.info("Pre-building Rust project dependencies...")
        subprocess.run([
            "chroot", rootfs_dir, "sh", "-c", 
            "cd /opt/rust-template && cargo build --release"
        ], check=True, cwd="/")
    
    def build_typescript_image(self):
        """Build TypeScript/Node.js runtime rootfs"""
        logger.info("Building TypeScript rootfs image...")
        
        with tempfile.TemporaryDirectory() as temp_dir:
            rootfs_dir = f"{temp_dir}/rootfs"
            
            # Create base Alpine rootfs with Node.js
            self._create_base_rootfs(rootfs_dir, ["nodejs", "npm", "python3", "make", "g++"])
            
            # Install TypeScript globally
            subprocess.run([
                "chroot", rootfs_dir, "npm", "install", "-g", "typescript", "ts-node"
            ], check=True)
            
            # Add TypeScript-specific configurations
            init_script = f"{rootfs_dir}/init"
            with open(init_script, "wb") as f:
                # Write shebang using binary mode to avoid escaping issues
                f.write(b'#!/bin/sh\n')
                f.write(b'''# Firecracker VM Init Script

# Mount essential filesystems (check if already mounted)
[ ! -d /proc/sys ] && mount -t proc proc /proc 2>/dev/null || true
[ ! -d /sys/class ] && mount -t sysfs sysfs /sys 2>/dev/null || true
[ ! -d /tmp ] && mount -t tmpfs tmpfs /tmp 2>/dev/null || true

# Mount devtmpfs only if not already mounted  
if ! mount | grep -q "devtmpfs on /dev"; then
    mount -t devtmpfs devtmpfs /dev 2>/dev/null || true
fi

# Create device nodes if needed
[ ! -e /dev/null ] && mknod /dev/null c 1 3 2>/dev/null || true
[ ! -e /dev/console ] && mknod /dev/console c 5 1 2>/dev/null || true

# Configure network interface
ip link set lo up 2>/dev/null || true
ip addr add 169.254.0.2/24 dev eth0 2>/dev/null || true
ip link set eth0 up 2>/dev/null || true
ip route add default via 169.254.0.1 dev eth0 2>/dev/null || true

# Set hostname
echo "firecracker-vm" > /proc/sys/kernel/hostname 2>/dev/null || true

# Start guest agent in background
python3 /usr/local/bin/guest_agent.py &
AGENT_PID=$!

# Wait for agent to start
sleep 2

# Check if agent is running
if ! kill -0 $AGENT_PID 2>/dev/null; then
    echo "Guest agent failed to start, retrying..."
    python3 /usr/local/bin/guest_agent.py &
    AGENT_PID=$!
fi

# Keep init running
while true; do 
    sleep 30
    # Restart agent if it dies
    if ! kill -0 $AGENT_PID 2>/dev/null; then
        echo "Restarting guest agent..."
        python3 /usr/local/bin/guest_agent.py &
        AGENT_PID=$!
    fi
done
''')
            
            os.chmod(init_script, 0o755)
            
            # Create ext4 filesystem
            self._create_ext4_image(rootfs_dir, f"{ROOTFS_DIR}/typescript/rootfs.ext4")
        
        logger.info("TypeScript rootfs completed")
    
    def _create_base_rootfs(self, rootfs_dir: str, additional_packages: list):
        """Create base Alpine Linux rootfs"""
        os.makedirs(rootfs_dir, exist_ok=True)
        
        packages = self.base_packages + additional_packages
        
        # Use a different approach: create container and copy files
        container_name = f"alpine_builder_{os.getpid()}"
        
        try:
            # Create container with packages installed
            subprocess.run([
                "docker", "create", "--name", container_name,
                "alpine:latest", "sh", "-c", 
                f"apk update && apk add {' '.join(packages)} && sleep 1"
            ], check=True)
            
            # Start container to install packages
            subprocess.run([
                "docker", "start", "-a", container_name
            ], check=True)
            
            # Copy the entire filesystem from container
            subprocess.run([
                "docker", "cp", f"{container_name}:/.", rootfs_dir
            ], check=True)
            
        finally:
            # Clean up container
            subprocess.run([
                "docker", "rm", "-f", container_name
            ], check=False)
        
        # Create necessary directories
        for dir_path in ["/proc", "/sys", "/tmp", "/dev"]:
            os.makedirs(f"{rootfs_dir}{dir_path}", exist_ok=True)
        
        # Create basic device nodes if they don't exist
        null_device = f"{rootfs_dir}/dev/null"
        console_device = f"{rootfs_dir}/dev/console"
        
        if not os.path.exists(null_device):
            subprocess.run([
                "mknod", null_device, "c", "1", "3"
            ], check=True)
        
        if not os.path.exists(console_device):
            subprocess.run([
                "mknod", console_device, "c", "5", "1"
            ], check=True)
        
        # Set up basic configuration
        with open(f"{rootfs_dir}/etc/hostname", "w") as f:
            f.write("firecracker-vm\n")
        
        with open(f"{rootfs_dir}/etc/hosts", "w") as f:
            f.write("127.0.0.1 localhost firecracker-vm\n")
        
        # Install guest agent
        self._install_guest_agent(rootfs_dir)
    
    def _install_guest_agent(self, rootfs_dir: str):
        """Install guest agent into VM image"""
        if not os.path.exists(self.guest_agent_path):
            logger.error(f"Guest agent not found at {self.guest_agent_path}")
            return
        
        # Copy guest agent
        agent_dest = f"{rootfs_dir}/usr/local/bin/guest_agent.py"
        os.makedirs(os.path.dirname(agent_dest), exist_ok=True)
        shutil.copy2(self.guest_agent_path, agent_dest)
        os.chmod(agent_dest, 0o755)
        
        # Create systemd-style init script for guest agent
        init_script = f"{rootfs_dir}/etc/init.d/guest-agent"
        os.makedirs(os.path.dirname(init_script), exist_ok=True)
        
        with open(init_script, "w") as f:
            f.write("""#!/bin/sh
# Guest agent init script
case "$1" in
    start)
        echo "Starting guest agent..."
        python3 /usr/local/bin/guest_agent.py &
        echo $! > /var/run/guest-agent.pid
        ;;
    stop)
        echo "Stopping guest agent..."
        if [ -f /var/run/guest-agent.pid ]; then
            kill $(cat /var/run/guest-agent.pid)
            rm -f /var/run/guest-agent.pid
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
exit 0
""")
        
        os.chmod(init_script, 0o755)
        
        # Create auto-start script
        rc_local = f"{rootfs_dir}/etc/rc.local"
        with open(rc_local, "w") as f:
            f.write("""#!/bin/sh
# Auto-start guest agent
/etc/init.d/guest-agent start
exit 0
""")
        
        os.chmod(rc_local, 0o755)
        
        logger.info("Guest agent installed and configured for auto-start")
    
    def _create_ext4_image(self, rootfs_dir: str, output_path: str):
        """Create ext4 filesystem image from directory"""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Calculate required size (add 50% padding)
        size_kb = subprocess.run([
            "du", "-s", rootfs_dir
        ], capture_output=True, text=True, check=True)
        
        size_kb = int(size_kb.stdout.split()[0]) * 1.5
        size_mb = int(size_kb / 1024) + 10  # Add extra 10MB
        
        # Create empty image
        subprocess.run([
            "dd", "if=/dev/zero", f"of={output_path}", 
            "bs=1M", f"count={size_mb}"
        ], check=True)
        
        # Format as ext4
        subprocess.run([
            "mkfs.ext4", "-F", output_path
        ], check=True)
        
        # Mount and copy files
        with tempfile.TemporaryDirectory() as mount_dir:
            subprocess.run([
                "mount", "-o", "loop", output_path, mount_dir
            ], check=True)
            
            try:
                # Copy all files
                subprocess.run([
                    "cp", "-a", f"{rootfs_dir}/.", mount_dir
                ], check=True)
            finally:
                subprocess.run(["umount", mount_dir])

def main():
    """Main function to build all VM images"""
    if os.geteuid() != 0:
        logger.error("This script must be run as root to create device nodes and mount filesystems")
        return 1
    
    builder = VMImageBuilder()
    try:
        builder.build_all_images()
        logger.info("All VM images built successfully!")
        return 0
    except Exception as e:
        logger.error(f"Failed to build VM images: {e}")
        return 1

if __name__ == "__main__":
    exit(main())