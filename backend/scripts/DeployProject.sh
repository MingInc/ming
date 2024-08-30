#!/bin/sh
docker container create -i -t --name $MY_VAR alpine
docker container start $MY_VAR
docker exec -it $MY_VAR sh -c "pwd"