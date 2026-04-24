FROM node:20-slim AS deps

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY . .
RUN pnpm exec nest build

FROM node:20-slim AS production

RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/main.js"]