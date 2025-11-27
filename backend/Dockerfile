FROM node:20-alpine AS builder

# Install curl for health checks and HEIC/HEIF libraries
RUN apk add --no-cache curl \
    libheif-dev \
    libde265-dev \
    aom-dev \
    libavif-dev

# Increase Node.js memory limit to prevent segfault
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Rebuild Sharp with HEIC/HEIF support
RUN npm rebuild sharp --build-from-source --sharp-libheif

# Copy source code
COPY . .

# Build the application with increased memory
RUN npm run build

# Production stage
FROM node:20-alpine

# Install curl for health checks, tini, and HEIC/HEIF runtime libraries
RUN apk add --no-cache curl tini \
    libheif \
    libde265 \
    aom-libs \
    libavif

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Rebuild Sharp with HEIC/HEIF support in production
RUN npm rebuild sharp --build-from-source --sharp-libheif

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create logs directory
RUN mkdir -p logs

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

RUN mkdir -p /app/.secrets && chown -R nodejs:nodejs /app/.secrets

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Use tini for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application directly with Node
CMD ["node", "dist/src/main.js"]