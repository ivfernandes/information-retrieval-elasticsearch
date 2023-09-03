FROM node:lts-alpine

WORKDIR /backend

COPY package*.json ./

RUN apk update && apk add --no-cache bash

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:entrypoint:prod"]