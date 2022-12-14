FROM node:16

WORKDIR /api

COPY package.json /api

RUN yarn

RUN yarn prisma generate dev

COPY . /api