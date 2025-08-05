# Build stage
FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git make gcc musl-dev

WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o agent ./cmd/agent
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o api ./cmd/api

# Runtime stage
FROM alpine:3.18

RUN apk add --no-cache \
    ca-certificates \
    iptables \
    iproute2 \
    bash \
    sudo \
    curl \
    wget \
    e2fsprogs \
    util-linux

# Install Firecracker
RUN wget -O firecracker.tgz https://github.com/firecracker-microvm/firecracker/releases/download/v1.12.1/firecracker-v1.12.1-x86_64.tgz && \
    tar -xzf firecracker.tgz && \
    mv release-v1.12.1-x86_64/firecracker-v1.12.1-x86_64 /usr/local/bin/firecracker && \
    chmod +x /usr/local/bin/firecracker && \
    rm -rf firecracker.tgz release-v1.12.1-x86_64

WORKDIR /app

# Copy binaries
COPY --from=builder /build/agent /app/agent
COPY --from=builder /build/api /app/api

# Copy scripts
COPY scripts/ /app/scripts/
RUN chmod +x /app/scripts/*.sh

# Volume for rootfs and kernel
VOLUME ["/app/rootfs", "/app/kernel"]

# Environment variables
ENV ROOTFS_PATH=/app/rootfs/rootfs.ext4
ENV KERNEL_PATH=/app/kernel/vmlinux
ENV API_PORT=8000

EXPOSE 8000

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo 'echo "Setting up network..."' >> /app/start.sh && \
    echo '/app/scripts/setup-host-network.sh' >> /app/start.sh && \
    echo 'echo "Starting API server..."' >> /app/start.sh && \
    echo 'exec /app/api' >> /app/start.sh && \
    chmod +x /app/start.sh

# Run as root (required for Firecracker)
USER root

CMD ["/app/start.sh"]