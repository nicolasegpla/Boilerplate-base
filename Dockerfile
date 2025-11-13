FROM oven/bun:1 AS base

WORKDIR /app

# Copiamos lockfile primero para aprovechar cache
COPY bun.lock bun.lock package.json ./

RUN bun install

COPY . .

EXPOSE 5173
EXPOSE 6006

CMD ["bun", "run", "dev", "--host"]
