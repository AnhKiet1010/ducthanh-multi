FROM node:14-alpine3.10

LABEL version="1.0"

WORKDIR /app

COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "start" ]