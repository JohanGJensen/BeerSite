FROM  node:15

WORKDIR /beersiteAPI

COPY package*.json ./

COPY . /beersiteAPI

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]