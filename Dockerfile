FROM node:lts-slim as build

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf .svelte-kit/output
COPY . .
RUN apt update -y && apt install -y openssl
RUN npm i
RUN npm run build

FROM node:lts-slim as run

WORKDIR /app

ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marilandense"
ENV JWT_AUTH_KEY="9C2B2C6ED54E340F4C880D845A744A3C34533C86B21CE7FCA5B6F7A2E6EAA057"

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.svelte-kit/output ./build

RUN npm i --production

EXPOSE 5173

ENTRYPOINT [ "node", './build' ]
