FROM  node:15

WORKDIR /beersiteAPI

COPY package*.json ./

COPY . /beersiteAPI

RUN npm install

EXPOSE 7000

CMD [ "npm", "run", "start" ]