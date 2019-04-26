FROM node:6.17.1

RUN mkdir /src
RUN apt-get update
RUN npm install pm2 -g

CMD cd /src && npm install &&\
    pm2 start processes.json && pm2 logs
