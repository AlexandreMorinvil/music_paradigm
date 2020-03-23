FROM node:10

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "serve" ]