FROM node:18 AS build_stage

WORKDIR /qasr

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .


RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["npm","run","start:prod"]