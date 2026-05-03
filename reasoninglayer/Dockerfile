# Stage 1: Build the Vite application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app/repo

# Copy only package files first for better caching
COPY repo/package.json repo/package-lock.json ./

# Install dependencies (this layer will be cached if package*.json don't change)
RUN npm ci

# Copy the rest of the repository
COPY repo ./

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage (Vike generates dist/client for static files)
COPY --from=builder /app/repo/dist/client /usr/share/nginx/html

# Expose port
EXPOSE 3003

# Health check (force IPv4 with -4 flag)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -4 --no-verbose --tries=1 --spider http://localhost:3003/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
