# docker file for nodejs app
FROM node

MAINTAINER RRVramprasad

RUN mkdir -p /usr/nodeSqlapplicationtest

WORKDIR /usr/nodeSqlapplicationtest

COPY package.json /usr/nodeSqlapplicationtest

RUN npm install

COPY . /usr/nodeSqlapplicationtest

CMD [ "node", "app" ]