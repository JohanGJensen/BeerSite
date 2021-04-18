FROM node:15

WORKDIR /public

COPY . .

RUN npm install

EXPOSE 5000

# RUN node index.js
CMD ["npm", "run", "start"]