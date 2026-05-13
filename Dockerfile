# --- deps + compile ---
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# --- run ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm install sequelize-cli --no-save

COPY --from=builder /app/dist ./dist
COPY database ./database
COPY .sequelizerc ./

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
# Default subcommand for `docker compose up` (see docker/entrypoint.sh).
CMD ["run"]
