# syntax=docker/dockerfile:1

# Use the official Ubuntu base image
FROM ubuntu:latest

# Install required packages in a single step with cache cleanup
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up Node.js LTS
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Download and install ngrok
RUN curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
    echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list && \
    apt-get update && \
    apt-get install -y ngrok && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install tmux
RUN apt-get update && apt-get install -y tmux && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally using npm
RUN npm install -g pm2
