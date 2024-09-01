#!/bin/bash

# Set variables
CONTAINER_NAME=$1
IMAGE_NAME=$1
GIT_URL=$2

# Build the Docker image
docker build -t $IMAGE_NAME .

# Run the container
docker run -d --name $CONTAINER_NAME $IMAGE_NAME /bin/bash -c "while true; do sleep 1000; done"
docker container start $CONTAINER_NAME

# Clone the Git repository
docker exec $CONTAINER_NAME git clone $GIT_URL