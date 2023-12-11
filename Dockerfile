FROM node:21-slim

WORKDIR /app

RUN apt update -y
RUN apt install -y openssl

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD [ "node", "app.js" ]
