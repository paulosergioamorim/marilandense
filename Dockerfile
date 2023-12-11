FROM node:lts-slim

WORKDIR /app

RUN apt update -y
RUN apt install -y openssl

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD [ "node", "build" ]
