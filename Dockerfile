FROM node:6.10.2

RUN mkdir /src
RUN apt-get update
RUN npm install pm2 -g

CMD cd /src && npm install &&\
    pm2 start processes.json && pm2 logs