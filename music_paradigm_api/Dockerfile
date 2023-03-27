FROM node:16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]
