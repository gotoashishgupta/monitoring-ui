FROM node:20-alpine AS dev

USER root
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --dev

COPY . .

EXPOSE 5173
VOLUME "/app/node_modules"

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dev /app/ ./

RUN yarn install && yarn build

FROM nginx:stable-alpine

WORKDIR /app

# Build the project
COPY --from=builder /app/dist/ .

RUN cp -r /app/* /usr/share/nginx/html

EXPOSE 80
