# syntax=docker/dockerfile:1.5
# Base
FROM node:lts-alpine AS base

# Install deps (including dev deps for build)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Only copy package files for dependency installation
COPY package.json package-lock.json* ./
# Use cache mount for npm cache and separate layer for node_modules
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.npm \
    npm ci --cache /app/.npm

# Production deps only
FROM base AS prod-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Only copy package files for dependency installation
COPY package.json package-lock.json* ./
# Use cache mount for npm cache
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.npm \
    npm ci --omit=dev --cache /app/.npm

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Layer 1: Copy only package files and configs (rarely change)
COPY package.json package-lock.json* ./
COPY next.config.js tsconfig.json next-env.d.ts ./
COPY postcss.config.mjs* remotion.config.ts* eslint.config.mjs* ./

# Layer 2: Copy public assets (change less frequently)
COPY public ./public

# Layer 3: Copy source code (changes most frequently)
COPY .env* ./
COPY src ./src
COPY scripts ./scripts
COPY examples ./examples
COPY server.js ./server.js

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Cache mounts for multiple build caches
# - /app/.next/cache: Next.js build cache  
# - /app/node_modules/.cache: Webpack persistent cache
# - /root/.npm: NPM cache
# - /tmp: Temp directory for build artifacts
RUN --mount=type=cache,target=/app/.next/cache \
    --mount=type=cache,target=/app/node_modules/.cache \
    --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/tmp \
    npm run build && \
    # Ensure .next/static exists even if empty
    mkdir -p .next/static

# Runtime
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create user early in the process to maximize cache
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy static files first (these change less frequently)
COPY --from=builder /app/package.json ./package.json
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy build artifacts (these change when source changes)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create secrets directory with proper permissions
RUN mkdir -p /app/.secrets && chown -R nextjs:nodejs /app/.secrets

USER nextjs
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
