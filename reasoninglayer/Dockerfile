# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Install git for cloning
RUN apk add --no-cache git openssh-client

# Set working directory
WORKDIR /app

# Clone the repository (using HTTPS for build-time cloning)
# For SSH access, you'd need to mount SSH keys at build time
ARG REPO_URL=https://github.com/kortexya/osfkb.git
ARG BRANCH=main

RUN git clone --depth 1 --branch ${BRANCH} ${REPO_URL} repo

# Move to dashboard directory
WORKDIR /app/repo/dashboard

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/repo/dashboard/dist /usr/share/nginx/html

# Expose port
EXPOSE 3003

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3003/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
