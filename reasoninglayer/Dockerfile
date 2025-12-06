# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the local repository
# Run sync-repo.sh before building to ensure repo is up to date
COPY repo ./repo

# Move to dashboard directory
WORKDIR /app/repo/dashboard

# Install dependencies
RUN npm ci

# Build the application with SSG pre-rendering
RUN npx vike build

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
