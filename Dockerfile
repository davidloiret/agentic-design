# Base
FROM node:lts-alpine AS base

# Install deps (including dev deps for build)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Production deps only
FROM base AS prod-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy all config files first
COPY package.json package-lock.json* .env ./
COPY next.config.js* ./
COPY tsconfig.json ./
COPY next-env.d.ts ./
COPY postcss.config.mjs* ./
COPY remotion.config.ts* ./
COPY eslint.config.mjs* ./
# Copy all source and build dependencies
COPY src ./src
COPY public ./public
COPY scripts ./scripts
COPY examples ./examples
COPY server.js ./server.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

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

USER nextjs
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
