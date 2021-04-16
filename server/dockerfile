FROM node:15

WORKDIR /beersite

COPY package*.json ./

COPY . /beersite

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]