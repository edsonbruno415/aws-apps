FROM node:16-slim

USER node

WORKDIR /src

COPY --chown=node:node package.json package-lock.json /src/

RUN npm ci --silent

COPY --chown=node:node . .

CMD npm start