FROM node:16

WORKDIR /app

COPY package*.json /app/
RUN npm ci --only=production && npm cache clean --force
COPY . /app/

CMD npm start

EXPOSE 5000