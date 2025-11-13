FROM oven/bun:1 AS base

WORKDIR /app

# Dependencias del sistema
RUN apt-get update && \
    apt-get install -y \
        wget \
        libx11-6 \
        libxcomposite1 \
        libxdamage1 \
        libxrandr2 \
        libgbm1 \
        libgtk-3-0 \
        libnss3 \
        libnspr4 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libdrm2 \
        libxkbcommon0 \
        libasound2 \
        libatspi2.0-0 \
        libdbus-1-3 \
    && apt-get clean

COPY package.json bun.lock ./
RUN bun install

COPY . .

EXPOSE 5173
EXPOSE 6006

CMD ["bun", "run", "dev", "--host"]
