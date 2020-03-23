# build stage
FROM node:10 as build-stage

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx as production-stage
COPY --from=build-stage /usr/src/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]