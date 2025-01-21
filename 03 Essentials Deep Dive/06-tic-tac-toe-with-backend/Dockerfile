FROM node:22-alpine

USER node
WORKDIR /home/node/app

COPY ./backend/out/app.js .
COPY ./frontend/dist ./public

ENV NODE_ENV=production

EXPOSE 80

CMD [ "node", "app.js" ]
