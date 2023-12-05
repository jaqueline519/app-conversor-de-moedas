FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine

VOLUME /var/cache/nginx
COPY --from=angular app/dist/app-conversor-de-moedas/browser /usr/share/nginx/html


