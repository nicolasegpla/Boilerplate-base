# Multi-stage Dockerfile for Bun + Vite + React
# Development, build, and production stages

# ─────────────────────────────────────────────
# Stage: base
# Shared base with Bun runtime
# ─────────────────────────────────────────────
FROM oven/bun:1 AS base

WORKDIR /app

# ─────────────────────────────────────────────
# Stage: deps
# Dependency installation (cached layer)
# ─────────────────────────────────────────────
FROM base AS deps

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ─────────────────────────────────────────────
# Stage: dev
# Development with HMR support
# ─────────────────────────────────────────────
FROM deps AS dev

EXPOSE 5173
EXPOSE 6006

# Vite dev server (HMR enabled via bind mount)
CMD ["bun", "run", "dev", "--host"]

# ─────────────────────────────────────────────
# Stage: test-runner
# Unit testing only — excludes Storybook/Playwright
# ─────────────────────────────────────────────
FROM base AS test-runner

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
CMD ["bun", "run", "test"]

# ─────────────────────────────────────────────
# Stage: builder
# Production build of the application
# ─────────────────────────────────────────────
FROM deps AS builder

COPY . .
RUN bun run build

# ─────────────────────────────────────────────
# Stage: production
# Nginx serving static assets from dist/
# ─────────────────────────────────────────────
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Single source of truth: use the project's nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]