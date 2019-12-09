FROM node:10
WORKDIR /api
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
