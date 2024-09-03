# syntax=docker/dockerfile:1
FROM ubuntu:latest
RUN apt-get update && apt-get install -y git curl unzip
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

# Download and install ngrok
RUN curl -s https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-s390x.tgz > ngrok.tgz
RUN tar xvzf ngrok.tgz -C /usr/local/bin

# Install tmux
RUN apt-get update && apt-get install -y tmux

RUN npm i -g pm2