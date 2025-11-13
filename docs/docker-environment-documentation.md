# 🐳 Docker Environment Documentation

## Overview
This documentation describes the complete Docker environment for the frontend development stack using Bun, Playwright, Storybook, Vitest, and Vite. It explains how the **Dockerfile**, **docker-compose.yml**, and **.dockerignore** work together to create a stable, reproducible, and professional development environment.

---

# 1. 📄 Dockerfile

The `Dockerfile` builds a complete development environment containing:

- Bun as runtime and package manager  
- Project dependencies  
- Playwright browsers (Chromium, Firefox, WebKit)  
- Vite development server  
- Storybook  
- Vitest with browser mode enabled  

### **Dockerfile**

```dockerfile
FROM oven/bun:1 AS base

WORKDIR /app

# Copy dependency-related files first for cache optimization
COPY package.json bun.lock ./

# Install dependencies with Bun
RUN bun install

# Install Playwright browsers and dependencies
RUN npx playwright install --with-deps

# Copy the rest of the application
COPY . .

# Expose Vite and Storybook ports
EXPOSE 5173
EXPOSE 6006

# Development command
CMD ["bun", "run", "dev", "--host"]
```

### 🔍 Notes

- Installing Playwright inside Docker ensures Vitest browser mode and Storybook testing work.
- Dependencies remain cached unless `package.json` or `bun.lock` change.
- This image is designed for **development**, not production.

---

# 2. 🐳 docker-compose.yml

The `docker-compose.yml` orchestrates two services:

- **frontend** → Vite development server  
- **storybook** → Storybook UI explorer  

We avoid overwriting `/app` and instead mount only the directories and files that change frequently.

### **docker-compose.yml**

```yaml
services:
  frontend:
    build:
      context: .
    container_name: bun_frontend
    ports:
      - "5173:5173"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
      - ./vite.config.ts:/app/vite.config.ts
      - ./tsconfig.json:/app/tsconfig.json
    command: ["bun", "run", "dev", "--host"]

  storybook:
    build:
      context: .
    container_name: bun_storybook
    ports:
      - "6006:6006"
    volumes:
      - ./src:/app/src
      - ./.storybook:/app/.storybook
      - ./tsconfig.json:/app/tsconfig.json
    command: ["bun", "run", "storybook", "--", "--ci", "--disable-telemetry", "--port", "6006"]
```

### 🔍 Notes

- Only source files and configs are mounted into the container.
- The `node_modules` folder inside Docker remains intact.
- Playwright remains installed and available.
- Prevents accidental deletion or overriding of dependencies.

---

# 3. 🛑 .dockerignore

The `.dockerignore` prevents unwanted files from being copied into the image, reducing size and avoiding conflicts.

### **.dockerignore**

```
node_modules
bun.lockb
dist
.storybook-out
.git
.gitignore
.vitest
coverage
docker-compose.yml
Dockerfile
.env
.env.local
.env.production
.env.test
```

### 🔍 Notes

- Keeping `node_modules` out of the image build context is essential.
- Ignoring `.git` improves build speed.
- Ignoring environment files prevents secret leaks.

---

# 4. 🚀 How to Use the Environment

### **Start the environment**

```bash
docker compose up
```

### **Rebuild the image**

```bash
docker compose build --no-cache
```

### **Access the running container**

```bash
docker compose exec frontend sh
```

---

# 5. 🧪 Running Tests

Inside the frontend container:

```bash
docker compose exec frontend bun test
```

Or in watch mode:

```bash
docker compose exec frontend bun test:watch
```

Vitest browser mode will work because Playwright browsers are installed inside Docker.

---

# 6. 🧱 Architecture Summary

| Element | Purpose |
|--------|---------|
| **Dockerfile** | Builds full development environment with Bun + Playwright |
| **docker-compose.yml** | Orchestrates Vite + Storybook containers |
| **.dockerignore** | Prevents non-essential files from bloating the image |

---

# 7. 🎯 Final Notes

This setup provides:

- A professional-grade isolated environment  
- Fast hot reload with Vite  
- Storybook fully working in Docker  
- Browser-based testing (Vitest + Playwright)  
- Reproducible builds  
- No dependency conflicts between host and container  

If necesitas la versión para **producción**, **CI/CD**, o un flujo con **Nginx**, puedo generarlo también.
