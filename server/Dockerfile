FROM node:18  
WORKDIR /qasr

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . . 

EXPOSE 4000

CMD ["npm","run","start"]