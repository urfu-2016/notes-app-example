FROM node:6

COPY app /app
COPY package.json /

RUN npm i --production

ENV PORT 80
EXPOSE 80

CMD node app/index.js
