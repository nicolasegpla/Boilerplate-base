# Documentación del Entorno Docker – Frontend (Bun + Vite + Storybook)

Este documento describe la arquitectura Docker utilizada para el entorno de desarrollo del proyecto frontend, basado en **Bun**, **Vite**, **React**, **Storybook** y **TypeScript**.

Su propósito es permitir que cualquier desarrollador pueda iniciar el entorno local sin necesidad de instalar dependencias globales.

---

## 1. 📂 Estructura de archivos relevantes

```
.dockerignore
docker-compose.yml
Dockerfile
```

---

## 2. 🚫 .dockerignore

Este archivo define qué elementos NO deben copiarse al contenedor durante la construcción de la imagen.

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

---

## 3. 🐳 Dockerfile – Imagen base del frontend

```dockerfile
FROM oven/bun:1 AS base

WORKDIR /app

# Copiar dependencias
COPY package.json bun.lock ./

# Instalar dependencias
RUN bun install

# Copiar el resto del proyecto
COPY . .

# Exponer puertos
EXPOSE 5173
EXPOSE 6006

# Comando principal
CMD ["bun", "run", "dev", "--host"]
```

---

## 4. 🛠️ docker-compose.yml – Orquestación de servicios

```yaml
services:
  frontend:
      build:
          context: .
      container_name: bun_frontend
      ports:
          - '5173:5173'
      volumes:
          - .:/app
          - /app/node_modules
      command: ['bun', 'run', 'dev', '--host']

  storybook:
      build:
          context: .
      container_name: bun_storybook
      ports:
          - '6006:6006'
      volumes:
          - .:/app
          - /app/node_modules
      command: ['bun', 'run', 'storybook', '--', '--ci', '--disable-telemetry', '--port', '6006']
```

---

## 5. ▶️ Comandos para ejecutar el entorno

```bash
docker compose up
docker compose build --no-cache
docker compose exec frontend sh
docker compose down
```

---

## 6. 🌐 Accesos

| Servicio | URL |
|----------|-----|
| Frontend (Vite) | http://localhost:5173 |
| Storybook | http://localhost:6006 |

---

## 7. 🧱 Ventajas

- Entorno completamente reproducible.
- No requiere Node ni Bun instalados localmente.
- Sincronización de archivos en tiempo real.
- Aislamiento entre frontend y Storybook.
- Ideal para flujos de DevOps y CI/CD.
