FROM node:15

WORKDIR /beersite

COPY /server /beersite
COPY /public /beersite/public

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]