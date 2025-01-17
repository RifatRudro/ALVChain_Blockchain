FROM node:20 as base

RUN npm install -g pnpm pm2
WORKDIR /var/www/backend
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --prod

FROM base as builder
WORKDIR /var/www/backend
RUN pnpm install --frozen-lockfile
COPY . .
# COPY .env /var/www/backend/
# RUN pnpm tc
RUN pnpm build
# COPY .env /var/www/backend/dist/

FROM base as production
WORKDIR /var/www/backend
COPY --from=builder /var/www/backend/dist /var/www/backend/dist
COPY --from=builder /var/www/backend/.env /var/www/backend/.env

CMD ["node" , "dist/main.js"]
# CMD ["pm2-runtime","-i","max","dist/main.js"]