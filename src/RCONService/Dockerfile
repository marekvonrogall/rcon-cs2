FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install rcon-client express cors

COPY src/RCONService/server.js .

EXPOSE 3000

CMD ["node", "server.js"]
