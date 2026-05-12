# Docker Environment — Bun + Vite + React

## Overview

Docker setup for local development, testing with Vitest, and production deployment via multi-stage build with Nginx.

**Stack:** Bun 1, Vite, React 18, TypeScript, Vitest
**Exclusions:** Playwright/E2E tests run locally only, not in Docker

---

## Architecture

### Multi-Stage Dockerfile

| Stage | Purpose | Base Image |
|-------|---------|------------|
| `base` | Shared Bun runtime | `oven/bun:1` |
| `deps` | Dependency installation (cached) | `oven/bun:1` |
| `dev` | Development with HMR | `deps` |
| `test-runner` | Unit testing only (excludes Storybook/Playwright) | `base` |
| `builder` | Production build | `deps` |
| `production` | Nginx serving `dist/` | `nginx:alpine` |

### Build Targets

```bash
# Development image (default)
docker compose build

# Production image
docker build --target production -t app:prod .

# Specific stage (builder)
docker build --target builder -t app:builder .
```

---

## Services

### Frontend (Development)

- **Port:** 5173
- **Command:** `bun run dev --host`
- **HMR:** Enabled via bind mount
- **Healthcheck:** `bun -e "fetch(...).ok ? 0 : 1"` (Bun-native) with 60s grace period

### Storybook

- **Port:** 6006
- **Command:** `bun run storybook -- --ci --disable-telemetry --port 6006`
- **Volumes:** Shared `node_modules_volume` with frontend

### Test

- **Command:** `bun run test` (Vitest run mode)
- **Volumes:** Bind mount only, ephemeral dependencies
- **Note:** No Playwright, no browser automation

---

## Volumes

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `node_modules_volume` | `/app/node_modules` | Persist container node_modules between recreations |

---

## Usage

### Development

```bash
# Start all services
docker compose up

# Rebuild from scratch
docker compose build --no-cache

# Shell into frontend container
docker compose exec frontend sh

# Stop services
docker compose down
```

### Testing

```bash
# Run Vitest tests in container
docker compose run test

# Watch mode (run inside container)
docker compose exec frontend bun run test:watch
```

### Production Deploy

```bash
# Build production image
docker build --target production -t app:prod .

# Run production container
docker run -p 8080:80 app:prod

# Verify
curl http://localhost:8080
```

---

## Testing Scope

### In Docker (Vitest)

- Unit tests via `bun run test`
- Component tests (jsdom environment)
- ViewModel, store, service, and utility tests
- No browser required

### Local Only (No Docker)

- Playwright E2E tests
- Browser-based component testing
- Visual regression testing

To run E2E tests locally (outside Docker):

```bash
# Requires Playwright installed locally
npx playwright test

# Or with Bun
bunx playwright test
```

---

## Healthchecks

| Service | Check | Grace Period |
|---------|-------|-------------|
| `frontend` | `bun -e "fetch(...).ok ? 0 : 1"` (Bun-native) | 60s start, 30s interval, 5 retries |

---

## Ports

| Service | Container | Host |
|---------|-----------|------|
| Frontend (dev) | 5173 | 5173 |
| Storybook | 6006 | 6006 |
| Production (nginx) | 80 | 8080 (when mapped) |

---

## Dockerfile Targets

### Development (`dev` stage)
- Inherits from `deps` stage
- Exposes ports 5173 (Vite) and 6006 (Storybook)
- HMR via bind mount
- No production assets

### Production (`production` stage)
- Based on `nginx:alpine`
- Serves `dist/` from `builder` stage
- SPA fallback to `/index.html`
- Minimal image, no Bun/Node runtime

---

## Common Issues

### Healthcheck fails during first start
- Vite compilation may take >60s on first run
- `start_period: 60s` provides grace period
- Check logs: `docker compose logs frontend`

### node_modules conflicts
- Use `node_modules_volume` to persist deps
- If corruption occurs: `docker compose down -v && docker compose up`

### Tests fail in container but pass locally
- Ensure same Bun version: `docker compose exec frontend bun --version`
- Check for platform-specific tests in vitest.workspace.ts