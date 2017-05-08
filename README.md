# To do list
It is a test project. A basic api for a todo list.

For an easy deploy, currently it use Docker, but it is not required. You just need to install Node.js v6.10.0 (LTS), Redis 3.2.8 and MongoDB 3.4.2 manually on your server.

## Installation

### Clone the server
```
sudo apt-get install git
git clone << repository url >>
npm i
```

### Install or upgrade Docker and Docker-compose
To install or upgrade Docker and Docker-compose build applications use the command line and type:

```bash
sudo apt-get update
wget -qO- https://get.docker.com/ | sudo sh
sudo curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-`uname -s`-`uname -m` > sudo /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
*note: Make sure you've always got the correct version of docker and docker-compose:*

```bash
sudo docker --version #requires at least version 1.8.1
sudo docker-compose --version #requires at least version 1.7.1
```

### Start the server

If you are not using docker, you should set environment variables in `.env` file (if needed, define new one):

```bash
cp .env.example .env
nano .env
```

*If you are using docker, then there is a predefined .env.docker file, which is set to the docker compose file, and you don't have to define a new one.*

Before start, build the application:

```bash
sudo docker-compose build
```

Start the application

```bash
sudo docker-compose up
```