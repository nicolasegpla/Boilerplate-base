FROM oven/bun:1 AS base

WORKDIR /app

# Copiamos archivos que afectan dependencias
COPY package.json bun.lock ./

# Instalamos dependencias
RUN bun install

# Instalamos navegadores para Vitest + Storybook
RUN npx playwright install --with-deps

# Ahora copiamos el resto del proyecto
COPY . .

# Exponemos Vite y Storybook
EXPOSE 5173
EXPOSE 6006

# Comando de desarrollo
CMD ["bun", "run", "dev", "--host"]
