# 📘 Template Frontend – Guía de Uso

Este proyecto es un **template base profesional** para iniciar aplicaciones Frontend modernas utilizando:

- **React + TypeScript**
- **Bun** como runtime
- **Vite** como servidor de desarrollo
- **Storybook** para documentación de componentes
- **Vitest** con proyectos separados
- **Docker + Docker Compose**

---

## 🚀 1. Requisitos

Solo necesitas:

- Git
- Docker Desktop

✔ No es necesario instalar Node  
✔ No es necesario instalar Bun  
✔ No es necesario instalar Vite ni Storybook

---

## 📂 2. Clonar un proyecto basado en este template

```bash
git clone https://github.com/tuusuario/mi-proyecto
cd mi-proyecto
```

---

## 🐳 3. Ejecutar el template con Docker

```bash
docker compose up
```

Servicios disponibles:

| Servicio  | Puerto | URL                   |
| --------- | ------ | --------------------- |
| frontend  | 5173   | http://localhost:5173 |
| storybook | 6006   | http://localhost:6006 |

---

## 🧠 4. Scripts incluidos en package.json

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "format": "prettier --write .",
  "lint": "eslint --ext .ts,.tsx .",
  "lint:fix": "eslint --ext .ts,.tsx --fix .",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "generate": "bun generate-component.ts",
  "test": "vitest",
  "test:watch": "vitest watch",
  "test:ui": "vitest --ui",
  "test:components": "vitest run --project components",
  "test:viewmodels": "vitest run --project viewmodels",
  "test:utils": "vitest run --project utils",
  "test:store": "vitest run --project store",
  "test:services": "vitest run --project services"
}
```

---

## 🧪 5. Ejecutar tests dentro del contenedor

### ✔ Tests generales

```bash
docker compose exec frontend bun run test
```

### ✔ Tests por proyecto

```bash
docker compose exec frontend bun run test:components
docker compose exec frontend bun run test:viewmodels
docker compose exec frontend bun run test:utils
docker compose exec frontend bun run test:store
docker compose exec frontend bun run test:services
```

---

## 🧩 6. Generación automática de componentes

```bash
docker compose exec frontend bun generate
```

---

## 📦 7. Instalar nuevas dependencias

```bash
docker compose exec frontend bun add <paquete>
```

---

## 🚀 8. Build de producción

```bash
docker compose exec frontend bun run build
```

---

## 🧨 9. Reset rápido

```bash
docker compose down -v
docker compose up --build
```

---

## 🎯 Conclusión

Este template te permite:

- Crear proyectos frontend en segundos
- Ejecutar Vite y Storybook dentro de Docker
- Usar testing modular por proyectos
- Mantener una arquitectura profesional y escalable
