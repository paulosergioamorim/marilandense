FROM node:lts-slim

WORKDIR /app

RUN apt update -y
RUN apt install -y openssl

COPY package*.json .
RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "build" ]
