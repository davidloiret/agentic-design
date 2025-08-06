# Multi-stage Dockerfile for Codesandbox Rust

# Build stage
FROM rust:1.70 as builder

WORKDIR /app

# Copy dependency files
COPY Cargo.toml Cargo.lock ./

# Copy source code
COPY src/ src/

# Build the application
RUN cargo build --release

# Runtime stage
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    kvm \
    qemu-kvm \
    libvirt-daemon-system \
    libvirt-clients \
    bridge-utils \
    iptables \
    iproute2 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Firecracker
RUN wget -O firecracker.tgz https://github.com/firecracker-microvm/firecracker/releases/download/v1.4.0/firecracker-v1.4.0-x86_64.tar.gz && \
    tar -xzf firecracker.tgz && \
    mv release-v1.4.0-x86_64/firecracker-v1.4.0-x86_64 /usr/local/bin/firecracker && \
    chmod +x /usr/local/bin/firecracker && \
    rm -rf firecracker.tgz release-v1.4.0-x86_64

# Create app user (but run as root for VM access)
RUN useradd -m -s /bin/bash codesandbox

WORKDIR /app

# Copy built binaries
COPY --from=builder /app/target/release/api /app/target/release/agent ./

# Copy configuration files
COPY rootfs/ rootfs/
COPY kernel/ kernel/
COPY scripts/ scripts/

# Make scripts executable
RUN chmod +x scripts/*.sh

# Expose port
EXPOSE 8000

# Environment variables
ENV ROOTFS_PATH=/app/rootfs/rootfs.ext4
ENV KERNEL_PATH=/app/kernel/vmlinux  
ENV API_PORT=8000
ENV RUST_LOG=info

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run as root (required for KVM/Firecracker)
USER root

# Start the API server
CMD ["./api"]