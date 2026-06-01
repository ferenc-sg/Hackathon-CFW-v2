# CFMS — single-stage image suitable for any container host (Railway, Render,
# Fly.io, Cloud Run, etc.). Uses SQLite; mount a persistent volume and point
# DATABASE_URL at it (e.g. DATABASE_URL=file:/data/dev.db) so data survives
# restarts.
FROM node:22-slim

# OpenSSL is required by Prisma's query engine.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies (postinstall runs `prisma generate`, which needs the
# schema, so copy prisma/ first).
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Build the app.
COPY . .
RUN npm run build

ENV NODE_ENV=production
# Default DB location; override with a path on a mounted volume in production.
ENV DATABASE_URL=file:/data/dev.db
RUN mkdir -p /data

EXPOSE 3000
CMD ["sh", "scripts/docker-start.sh"]
