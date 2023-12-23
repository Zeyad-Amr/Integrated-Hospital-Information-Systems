FROM node:18
WORKDIR /qasr

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .


RUN npx prisma generate


EXPOSE 4000

CMD ["npm","run","start"]