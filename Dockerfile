FROM node:12.12.0-alpine

WORKDIR /usr/src/app/showbox

RUN apk update && \
    npm install -g npm @vue/cli
RUN rm -rf node_modules package-lock.json
RUN npm install

EXPOSE 9050

CMD ["/bin/sh"]