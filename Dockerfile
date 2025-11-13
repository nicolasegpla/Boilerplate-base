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
