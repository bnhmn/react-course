FROM node:22-alpine

USER node
WORKDIR /home/node/app

ADD ./out .

ENV NODE_ENV=production

EXPOSE 80

CMD [ "node", "app.js" ]
